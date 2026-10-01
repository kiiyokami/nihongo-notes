<script lang="ts">
	import { tick } from 'svelte';
	import { lessons } from '$lib/content';
	import { app, save } from '$lib/state/app.svelte';
	import { QUIZ_TYPES, buildRound, isRight, startState, usesInput, usesLessons, type InputMode, type Question, type QuizType } from '$lib/study/quiz';
	import LessonPicker from '$lib/ui/LessonPicker.svelte';
	import Segmented from '$lib/ui/Segmented.svelte';
	import Markup from '$lib/ui/Markup.svelte';
	import Speak from '$lib/ui/Speak.svelte';
	import Sfx from '$lib/ui/Sfx.svelte';

	let type = $state<QuizType>('vocab');
	let input = $state<InputMode>('tiles');
	let picked = $state<number[]>([]);
	let loaded = $state(false);

	let round = $state<Question[]>([]);
	let qi = $state(0);
	let score = $state(0);
	let misses = $state<Question[]>([]);
	let playing = $state(false);
	let answered = $state(false);
	let correct = $state(false);
	let chosen = $state(-1);
	let line = $state<number[]>([]);
	let typed = $state('');
	let nudge = $state('');

	let promptEl = $state<HTMLElement>();
	let typedEl = $state<HTMLInputElement>();
	let nextEl = $state<HTMLButtonElement>();
	let scoreEl = $state<HTMLElement>();
	let lineEl = $state<HTMLElement>();
	let bankEl = $state<HTMLElement>();

	const start = $derived(startState(type, new Set(picked)));
	const q = $derived(round[qi]);
	const done = $derived(playing && qi >= round.length);
	const bank = $derived(q?.mode === 'tiles' ? q.tiles.map((_, k) => k).filter((k) => !line.includes(k)) : []);

	$effect(() => {
		if (!app.ready || loaded) return;
		type = app.quiz.type;
		input = app.quiz.input;
		picked = app.quiz.lessons.length ? [...app.quiz.lessons] : lessons.map((l) => l.n);
		loaded = true;
	});

	function persist() {
		app.quiz = { type, input, lessons: [...picked] };
		save('quiz');
	}
	async function begin() {
		round = buildRound(type, input, new Set(picked));
		qi = 0;
		score = 0;
		misses = [];
		playing = true;
		await show();
	}
	async function show() {
		answered = false;
		correct = false;
		chosen = -1;
		line = [];
		typed = '';
		nudge = '';
		await tick();
		if (done) scoreEl?.focus();
		else if (q?.mode === 'typing') typedEl?.focus();
		else promptEl?.focus();
	}
	async function finish(ok: boolean) {
		nudge = '';
		answered = true;
		correct = ok;
		if (ok) score++;
		else misses = [...misses, q];
		await tick();
		nextEl?.focus();
	}
	function choose(k: number) {
		if (answered || q.mode !== 'choice') return;
		chosen = k;
		finish(isRight(q, q.options[k]));
	}
	function check() {
		if (answered || q.mode === 'choice') return;
		const given = q.mode === 'tiles' ? line.map((k) => q.tiles[k]).join('') : typed;
		if (!given.trim()) {
			nudge = q.mode === 'tiles' ? 'Put some tiles on the answer line first.' : 'Type your answer first.';
			return;
		}
		finish(isRight(q, given));
	}
	// after a tile moves, keep keyboard focus at the same place in the group it left
	async function moveFocus(group: HTMLElement | undefined, pos: number) {
		await tick();
		const tiles = group ? [...group.querySelectorAll<HTMLElement>('.tile')] : [];
		(tiles[Math.min(pos, tiles.length - 1)] ?? document.getElementById('q-check'))?.focus();
	}
	function place(k: number, pos: number) {
		if (answered) return;
		nudge = '';
		line = [...line, k];
		moveFocus(bankEl, pos);
	}
	function unplace(pos: number) {
		if (answered) return;
		nudge = '';
		line = line.filter((_, j) => j !== pos);
		moveFocus(lineEl, pos);
	}
	async function next() {
		qi++;
		await show();
	}
	function onkey(e: KeyboardEvent) {
		const t = e.target as HTMLElement;
		if (!playing || answered || !q || q.mode !== 'choice' || e.altKey || e.ctrlKey || e.metaKey || t.closest('input, select, textarea')) return;
		const n = Number(e.key);
		if (n >= 1 && n <= q.options.length) {
			e.preventDefault();
			choose(n - 1);
		}
	}
</script>

<svelte:window onkeydown={onkey} />
<svelte:head><title>Quiz · Nihongo Notes</title></svelte:head>

<div class="split">
	<h1 class="view-title">Quiz</h1>

	<div class="setup">
		{#if !loaded}
			<p class="status">Loading your settings…</p>
		{:else}
			<Segmented legend="Question type" name="qtype" options={QUIZ_TYPES} bind:value={type} onchange={persist} />
			{#if usesInput(type)}
				<Segmented
					legend="Answer with"
					name="qinput"
					options={[
						{ value: 'tiles', label: type === 'num' ? 'Choices' : 'Word tiles' },
						{ value: 'typing', label: 'Typing' }
					]}
					bind:value={input}
					onchange={persist}
				/>
				{#if type !== 'num'}<p class="hint">Answers are marked against the sentence in your notes, so a different correct wording counts as wrong.</p>{/if}
			{/if}
			{#if usesLessons(type)}
				<LessonPicker bind:picked current={app.lastLesson} onchange={persist} />
			{:else}
				<p class="hint">Particle questions are one mixed set, so the lesson choice doesn't apply.</p>
			{/if}
			<div>
				<button type="button" class="btn" disabled={!start.ok} onclick={begin}>Start {start.size} question{start.size === 1 ? '' : 's'}</button>
				<p class="hint" aria-live="polite">{start.reason}</p>
			</div>
		{/if}
	</div>

	<section class="stage" aria-label="Question">
		{#if done}
			<p class="meta">Round finished</p>
			<p class="score" tabindex="-1" bind:this={scoreEl}><span class="sr">{'Score: '}</span>{score} / {round.length}</p>
			<p>{misses.length ? `Go over the ${misses.length === 1 ? 'one' : misses.length} you missed, then try another round.` : 'Every answer right.'}</p>
			{#if misses.length}
				<h2>To go over</h2>
				<ul class="review">
					{#each misses as m}
						<li>
							{#each m.review.ja as s}<span class="ja" lang="ja"><Markup text={s} /></span>{/each}
							<span class="en"><Markup text={m.review.en} /></span>
						</li>
					{/each}
				</ul>
			{/if}
			<div class="actions"><button type="button" class="btn" onclick={begin}>Another round</button></div>
		{:else if playing && q}
			<p class="meta">Question {qi + 1} of {round.length}{q.meta ? ` · ${q.meta}` : ''}</p>
			<div class="ask">
				<p class="prompt" class:en={!q.promptJa} id="q-prompt" tabindex="-1" bind:this={promptEl}>
					{#if q.promptJa}
						<span lang="ja">{#each q.prompt.split('＿') as part, k}{#if k}<span class="slot"><span aria-hidden="true">&nbsp;</span><span class="sr">blank</span></span>{/if}<Markup text={part} />{/each}</span>
					{:else}
						{q.prompt}
					{/if}
				</p>
				{#if q.promptJa}<Speak text={q.prompt.replace('＿', '')} />{/if}
			</div>
			{#if q.sub}<p class="sub"><Markup text={q.sub} /></p>{/if}

			{#if q.mode === 'choice'}
				<div class="choices" role="group" aria-labelledby="q-prompt">
					{#each q.options as o, k}
						{@const isAns = answered && o === q.ans}
						{@const isPick = answered && k === chosen && o !== q.ans}
						<button type="button" class="choice" class:right={isAns} class:wrong={isPick} disabled={answered} onclick={() => choose(k)}>
							<kbd aria-hidden="true">{k + 1}</kbd>
							<span class="text" lang={q.optionsJa ? 'ja' : undefined}>{o}</span>
							{#if isAns}<Sfx kind="right" /><span class="sr">(the answer)</span>{/if}
							{#if isPick}<Sfx kind="wrong" /><span class="sr">(your pick)</span>{/if}
						</button>
					{/each}
				</div>
			{:else if q.mode === 'tiles'}
				<div class="line" class:right={answered && correct} class:wrong={answered && !correct} role="group" aria-label="Your answer" bind:this={lineEl}>
					{#each line as k, pos (k)}
						<button type="button" class="tile" lang="ja" disabled={answered} onclick={() => unplace(pos)}>{q.tiles[k]}</button>
					{:else}
						<span class="line-hint">Tap the tiles below in order</span>
					{/each}
					{#if answered}<Sfx kind={correct ? 'right' : 'wrong'} />{/if}
				</div>
				<div class="bank" role="group" aria-label="Word tiles" bind:this={bankEl}>
					{#each bank as k, pos (k)}
						<button type="button" class="tile" lang="ja" disabled={answered} onclick={() => place(k, pos)}>{q.tiles[k]}</button>
					{/each}
				</div>
				{#if !answered}
					<div class="actions">
						<button type="button" class="btn outline" onclick={() => ((line = []), (nudge = ''))}>Start over</button>
						<button type="button" class="btn" id="q-check" onclick={check}>Check</button>
					</div>
				{/if}
			{:else}
				<form
					class="typed"
					autocomplete="off"
					onsubmit={(e) => {
						e.preventDefault();
						check();
					}}
				>
					<label for="q-typed">Your answer in Japanese</label>
					<span class="typed-wrap" class:right={answered && correct} class:wrong={answered && !correct}>
						<input id="q-typed" lang="ja" bind:this={typedEl} bind:value={typed} oninput={() => (nudge = '')} readonly={answered} autocapitalize="off" spellcheck="false" aria-describedby="q-prompt" />
						{#if answered}<Sfx kind={correct ? 'right' : 'wrong'} />{/if}
					</span>
					<p class="hint">{q.hint}</p>
					{#if !answered}<div class="actions"><button type="submit" class="btn" id="q-check">Check</button></div>{/if}
				</form>
			{/if}

			<p class="feedback" aria-live="polite">
				{#if nudge}{nudge}{:else if answered}{#if correct}Right.{:else if q.mode === 'choice' || q.type === 'num'}Not this one. The answer is <span lang={(q.mode === 'choice' && q.optionsJa) || q.type === 'num' ? 'ja' : undefined}>{q.ans}</span>.{:else}Not this one. Your notes have:<span class="fb-ans" lang="ja"><Markup text={q.ans} /></span>{/if}{/if}
			</p>
			{#if answered}
				<div class="actions"><button type="button" class="btn" bind:this={nextEl} onclick={next}>{qi + 1 < round.length ? 'Next question' : 'See your score'}</button></div>
			{/if}
		{/if}
	</section>
</div>

<style>
	.ask {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
	}
	.prompt {
		margin: 12px 0 4px;
		font-size: clamp(1.6rem, 1.2rem + 2.4vw, 2.25rem);
		line-height: 1.4;
		text-align: center;
		overflow-wrap: anywhere;
	}
	.prompt.en {
		font-family: var(--f-title);
	}
	.prompt :global(.slot) {
		font-size: 0.5em;
		min-width: 3.5em;
	}
	.sub {
		margin: 0;
		color: var(--soft);
		text-align: center;
	}
	.choices {
		display: grid;
		gap: 10px;
		margin-top: 20px;
	}
	@media (min-width: 520px) {
		.choices {
			grid-template-columns: 1fr 1fr;
		}
	}
	.choice {
		display: flex;
		align-items: center;
		gap: 12px;
		min-height: 52px;
		padding: 10px 14px;
		background: var(--paper);
		border: 1px solid var(--ink);
		text-align: left;
		font-size: 1.05rem;
	}
	.choice:hover:not(:disabled) {
		outline: 1px solid var(--ink);
	}
	.choice:disabled {
		cursor: default;
		color: var(--ink);
	}
	.choice.right {
		background: var(--accent);
		color: var(--on-accent);
	}
	.choice.wrong .text,
	.line.wrong .tile,
	.typed-wrap.wrong input {
		text-decoration: line-through;
		text-decoration-thickness: 2px;
	}
	kbd {
		flex: none;
		min-width: 1.6rem;
		border: 1px solid var(--soft);
		font: inherit;
		font-size: 0.8rem;
		color: var(--soft);
		text-align: center;
	}
	.choice.right kbd {
		color: var(--on-accent);
		border-color: var(--on-accent);
	}
	.text {
		overflow-wrap: anywhere;
	}
	.line {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		min-height: 64px;
		margin-top: 20px;
		padding: 8px 4px;
		border-bottom: 2px solid var(--ink);
	}
	.line.right {
		background: var(--accent);
		color: var(--on-accent);
	}
	.line-hint {
		color: var(--soft);
		font-size: 0.95rem;
	}
	.bank {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 8px;
		min-height: 52px;
		margin-top: 16px;
	}
	.tile {
		min-width: 44px;
		min-height: 44px;
		padding: 4px 12px;
		background: var(--paper);
		border: 1px solid var(--ink);
		font-size: 1.15rem;
	}
	.line.right .tile {
		background: transparent;
		color: var(--on-accent);
		border-color: var(--on-accent);
	}
	.tile:disabled {
		cursor: default;
	}
	.typed {
		display: grid;
		gap: 8px;
		margin-top: 20px;
	}
	.typed label {
		font-weight: 700;
	}
	.typed .hint {
		margin: 0;
	}
	.typed-wrap {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.typed-wrap.right {
		background: var(--accent);
		color: var(--on-accent);
	}
	input {
		flex: 1;
		min-width: 0;
		min-height: 52px;
		padding: 8px 12px;
		border: 1px solid var(--ink);
		background: var(--paper);
		color: var(--ink);
		font-size: 1.25rem;
	}
	.feedback {
		min-height: 1.6em;
		margin: 18px 0 0;
		font-weight: 700;
	}
	.fb-ans {
		display: block;
		margin-top: 6px;
		font-weight: 400;
		font-size: 1.2rem;
	}
	.score {
		margin: 8px 0;
		font-family: var(--f-title);
		font-size: 2.75rem;
		font-variant-numeric: tabular-nums;
	}
	.review {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.review li {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 16px;
		padding: 8px 0;
		border-bottom: 1px solid var(--subtle);
	}
	.review .ja {
		font-size: 1.1rem;
	}
	.review .en {
		color: var(--soft);
	}
</style>
