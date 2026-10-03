<script lang="ts">
	import { tick, untrack } from 'svelte';
	import { page } from '$app/state';
	import { lessons, vocab } from '$lib/content';
	import { app, save, gradeWord, forget, logToday } from '$lib/state/app.svelte';
	import { reviewNow } from '$lib/state/today.svelte';
	import { buildDeck, putBack, roundResult, type Card } from '$lib/study/deck';
	import { shuffle } from '$lib/study/random';
	import { lessonsText } from '$lib/study/text';
	import LessonPicker from '$lib/ui/LessonPicker.svelte';
	import Segmented from '$lib/ui/Segmented.svelte';
	import Speak from '$lib/ui/Speak.svelte';
	import Markup from '$lib/ui/Markup.svelte';
	import TodayNext from '$lib/ui/TodayNext.svelte';

	let picked = $state<number[]>([]);
	let dir = $state<'jp' | 'en'>('jp');
	let skipKnown = $state(false);
	let deck = $state<Card[]>([]);
	let i = $state(0);
	let flipped = $state(false);
	let started = $state(false);
	let stageEl = $state<HTMLElement>();
	// 'review' is today's review (/flashcards/?review); 'pick' is cards from the lessons you tick
	let mode = $state<'review' | 'pick' | null>(null);
	let fresh = $state(new Set<string>());
	let dueCount = $state(0);
	let logged = $state(false);

	const known = $derived(new Set(app.known));
	const which = $derived(lessonsText(picked, lessons.length));
	const card = $derived(deck[i]);
	const anyWords = $derived(vocab.some((v) => picked.includes(v.n)));
	const result = $derived(roundResult(deck, known));
	const jpShown = $derived((dir === 'jp') !== flipped);

	$effect(() => {
		if (!app.ready) return;
		const want = page.url.searchParams.has('review') ? 'review' : 'pick';
		if (want === mode) return;
		untrack(() => {
			mode = want;
			picked = app.cards.lessons.length ? [...app.cards.lessons] : [app.lastLesson];
			dir = app.cards.dir;
			skipKnown = app.cards.skipKnown;
			rebuild();
			started = true;
		});
	});
	// a finished round counts as studying today; finishing today's review ticks it off
	$effect(() => {
		if (!started || logged || !deck.length || i < deck.length) return;
		logged = true;
		untrack(() => {
			logToday('cards');
			if (mode === 'review') logToday('review');
		});
	});

	function persist() {
		app.cards = { dir, skipKnown, lessons: [...picked] };
		save('cards');
	}
	function rebuild() {
		if (mode === 'review') {
			const r = reviewNow();
			deck = [...shuffle(r.due), ...shuffle(r.fresh)];
			fresh = new Set(r.fresh.map((c) => c.jp));
			dueCount = r.due.length;
		} else {
			deck = buildDeck(vocab, new Set(picked), skipKnown ? known : null);
			fresh = new Set();
		}
		i = 0;
		flipped = false;
		logged = false;
	}
	// keep keyboard users on the card after it changes
	async function keepFocus(had: boolean) {
		if (!had) return;
		await tick();
		(stageEl?.querySelector<HTMLElement>('.card') ?? stageEl?.querySelector<HTMLElement>('button'))?.focus();
	}
	const focusInStage = () => !!stageEl?.contains(document.activeElement);
	function flip() {
		const had = focusInStage();
		flipped = !flipped;
		keepFocus(had);
	}
	function mark(ok: boolean) {
		const had = focusInStage();
		gradeWord(card.jp, ok);
		if (!ok) deck = putBack(deck, i);
		i++;
		flipped = false;
		keepFocus(had);
	}
	function setSkip(on: boolean) {
		skipKnown = on;
		persist();
		rebuild();
	}
	function onkey(e: KeyboardEvent) {
		const t = e.target as HTMLElement;
		if (e.altKey || e.ctrlKey || e.metaKey || !card || t.closest('input, select, textarea')) return;
		const free = t === document.body || t.id === 'main';
		if (e.key === ' ' && free) {
			e.preventDefault();
			flip();
		} else if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && (free || stageEl?.contains(t))) {
			e.preventDefault();
			mark(e.key === 'ArrowRight');
		}
	}
</script>

<svelte:window onkeydown={onkey} />
<svelte:head><title>Flashcards · Nihongo Notes</title></svelte:head>

<div class="split">
	<h1 class="view-title">Flashcards</h1>

	<section class="stage" bind:this={stageEl} aria-label="Cards">
		{#if !started}
			<p class="status">Getting your cards ready…</p>
		{:else if mode === 'review' && !deck.length}
			<div class="status">
				<p>Nothing to review today. Every word you've seen is waiting for a later day.</p>
				<TodayNext />
			</div>
		{:else if !deck.length}
			<div class="status">
				{#if anyWords}
					<p>Every word in {which} is marked as known.</p>
					<div class="actions">
						<button type="button" class="btn" id="include-known" onclick={() => setSkip(false)}>Include known words</button>
						<button
							type="button"
							class="btn outline"
							id="forget"
							onclick={() => {
								forget(vocab.filter((v) => picked.includes(v.n)).map((v) => v.jp));
								rebuild();
							}}>Forget the marks for {which}</button
						>
					</div>
				{:else}
					<p>There are no words in {which} yet.</p>
				{/if}
			</div>
		{:else if i >= deck.length}
			<div class="status">
				<p class="meta">{mode === 'review' ? "Today's review finished" : 'Round finished'}</p>
				<p>You marked {result.known} of {result.total} words as known.</p>
				{#if mode === 'review'}
					<p>Words you missed come back tomorrow. The rest wait longer each time you get them right.</p>
					<TodayNext />
				{:else}
					<div class="actions">
						<button type="button" class="btn" onclick={rebuild}>Go through again</button>
						{#if result.known < result.total}
							<button type="button" class="btn outline" onclick={() => setSkip(true)}>Only the {result.total - result.known} not known yet</button>
						{/if}
					</div>
				{/if}
			</div>
		{:else}
			<p class="meta">Card {i + 1} of {deck.length}</p>
			<button type="button" class="card" onclick={flip}>
				<span class="head"><span>Lesson {card.n}</span><span>{fresh.has(card.jp) ? 'new word' : known.has(card.jp) ? 'marked known' : ''}</span></span>
				<!-- keyed on the flip, so the answer pops in each time it is revealed -->
				{#key flipped}<span class="face" class:pop={flipped}>
					{#if jpShown}
						<span class="big" lang="ja">{card.jp}</span>
						{#if flipped}<span class="small"><Markup text={card.en} /></span>{/if}
					{:else}
						<span class="big en"><Markup text={card.en} /></span>
						{#if flipped}<span class="small" lang="ja">{card.jp}</span>{/if}
					{/if}
				</span>{/key}
				<span class="hint">{flipped ? 'Hide the answer' : 'Show the answer'}</span>
			</button>
			<div class="actions">
				<button type="button" class="btn outline" id="again" onclick={() => mark(false)}>Again</button>
				<button type="button" class="btn" id="got-it" onclick={() => mark(true)}>Got it</button>
				{#if jpShown || flipped}<Speak text={card.jp} />{/if}
			</div>
			<p class="keys">Space shows the answer · ← again · → got it</p>
		{/if}
	</section>

	<div class="setup">
		{#if started && mode === 'review'}
			<div class="review-note">
				<p><span class="k">Today's review</span>{dueCount} due, {fresh.size} new</p>
				<p class="hint">Words come back after 1, 3, 7, 14, 30 and 60 days as you keep getting them right. A miss brings a word back tomorrow.</p>
				<a class="btn outline" href="/flashcards/">Choose lessons instead</a>
			</div>
			<Segmented
				legend="Show first"
				name="dir"
				options={[
					{ value: 'jp', label: 'Japanese' },
					{ value: 'en', label: 'English' }
				]}
				bind:value={dir}
				onchange={() => {
					persist();
					flipped = false;
				}}
			/>
		{:else if started}
			<LessonPicker
				bind:picked
				current={app.lastLesson}
				onchange={() => {
					persist();
					rebuild();
				}}
			/>
			<Segmented
				legend="Show first"
				name="dir"
				options={[
					{ value: 'jp', label: 'Japanese' },
					{ value: 'en', label: 'English' }
				]}
				bind:value={dir}
				onchange={() => {
					persist();
					flipped = false;
				}}
			/>
			<label class="check"><input type="checkbox" checked={skipKnown} onchange={(e) => setSkip(e.currentTarget.checked)} /> Skip words I've marked as known</label>
		{/if}
	</div>
</div>

<style>
	/* an index card taped to the page, with the red margin line under its heading */
	.card {
		position: relative;
		width: 100%;
		max-width: 34rem;
		min-height: 17rem;
		margin-top: 22px;
		display: flex;
		flex-direction: column;
		padding: 0 20px 14px;
		background: var(--sheet) repeating-linear-gradient(transparent 0 33px, var(--line) 33px 34px) 0 46px / 100% calc(100% - 46px) no-repeat;
		border: 1px solid var(--line);
		box-shadow: 0 8px 18px var(--shadow);
		text-align: center;
	}
	.card::before {
		content: '';
		position: absolute;
		top: -11px;
		left: 50%;
		width: 96px;
		height: 22px;
		margin-left: -48px;
		background: var(--t-sakura) repeating-linear-gradient(-45deg, transparent 0 6px, var(--stripe) 6px 9px);
		transform: rotate(2deg);
	}
	.head {
		display: flex;
		justify-content: space-between;
		padding: 12px 0 10px;
		border-bottom: 2px solid var(--red);
		color: var(--soft);
		font-size: 0.9rem;
	}
	.face {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 20px 0;
	}
	.pop {
		animation: pop 0.18s ease-out;
	}
	@keyframes pop {
		from {
			transform: scale(0.92);
			opacity: 0.4;
		}
	}
	.big {
		font-size: clamp(1.9rem, 1.4rem + 3vw, 2.75rem);
		line-height: 1.3;
		overflow-wrap: anywhere;
	}
	.big.en {
		font-size: clamp(1.4rem, 1.2rem + 1.5vw, 1.9rem);
	}
	.small {
		color: var(--soft);
	}
	.hint {
		color: var(--soft);
		font-size: 0.88rem;
	}
	.actions {
		align-items: center;
	}
	.keys {
		margin: 12px 0 0;
		color: var(--soft);
		font-size: 0.85rem;
	}
	@media (hover: none) {
		.keys {
			display: none;
		}
	}
	.status p {
		margin: 0 0 8px;
	}
	.review-note p {
		margin: 0;
		font-family: var(--f-hand);
		font-weight: 600;
		font-size: 1.2rem;
	}
	.review-note .k {
		display: block;
		font-family: var(--f-ui);
		font-weight: 400;
		font-size: 0.85rem;
		color: var(--soft);
	}
	.review-note .hint {
		margin: 6px 0 12px;
		font-family: var(--f-ui);
		font-weight: 400;
		font-size: 0.9rem;
	}
</style>
