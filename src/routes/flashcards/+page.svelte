<script lang="ts">
	import { tick } from 'svelte';
	import { lessons, vocab } from '$lib/content';
	import { app, save, setKnown, forget } from '$lib/state/app.svelte';
	import { buildDeck, putBack, roundResult, type Card } from '$lib/study/deck';
	import { lessonsText } from '$lib/study/text';
	import LessonPicker from '$lib/ui/LessonPicker.svelte';
	import Segmented from '$lib/ui/Segmented.svelte';
	import Speak from '$lib/ui/Speak.svelte';
	import Markup from '$lib/ui/Markup.svelte';

	let picked = $state<number[]>([]);
	let dir = $state<'jp' | 'en'>('jp');
	let skipKnown = $state(false);
	let deck = $state<Card[]>([]);
	let i = $state(0);
	let flipped = $state(false);
	let started = $state(false);
	let stageEl = $state<HTMLElement>();

	const known = $derived(new Set(app.known));
	const which = $derived(lessonsText(picked, lessons.length));
	const card = $derived(deck[i]);
	const anyWords = $derived(vocab.some((v) => picked.includes(v.n)));
	const result = $derived(roundResult(deck, known));
	const jpShown = $derived((dir === 'jp') !== flipped);

	$effect(() => {
		if (!app.ready || started) return;
		picked = app.cards.lessons.length ? [...app.cards.lessons] : [app.lastLesson];
		dir = app.cards.dir;
		skipKnown = app.cards.skipKnown;
		rebuild();
		started = true;
	});

	function persist() {
		app.cards = { dir, skipKnown, lessons: [...picked] };
		save('cards');
	}
	function rebuild() {
		deck = buildDeck(vocab, new Set(picked), skipKnown ? known : null);
		i = 0;
		flipped = false;
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
		setKnown(card.jp, ok);
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
				<p class="meta">Round finished</p>
				<p>You marked {result.known} of {result.total} words as known.</p>
				<div class="actions">
					<button type="button" class="btn" onclick={rebuild}>Go through again</button>
					{#if result.known < result.total}
						<button type="button" class="btn outline" onclick={() => setSkip(true)}>Only the {result.total - result.known} not known yet</button>
					{/if}
				</div>
			</div>
		{:else}
			<p class="meta">Card {i + 1} of {deck.length}</p>
			<button type="button" class="card" onclick={flip}>
				<span class="head"><span>Lesson {card.n}</span><span>{known.has(card.jp) ? 'marked known' : ''}</span></span>
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
		{#if started}
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
	@media (min-width: 1000px) {
		.stage {
			grid-column: 2;
			grid-row: 2;
		}
		.setup {
			grid-column: 1;
			grid-row: 2;
		}
	}
	.card {
		width: 100%;
		max-width: 34rem;
		min-height: 16rem;
		margin-top: 8px;
		display: flex;
		flex-direction: column;
		padding: 0 20px 14px;
		background: var(--paper);
		border: 2px solid var(--ink);
		text-align: center;
	}
	.head {
		display: flex;
		justify-content: space-between;
		padding: 10px 0;
		border-bottom: 1px solid var(--ink);
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
</style>
