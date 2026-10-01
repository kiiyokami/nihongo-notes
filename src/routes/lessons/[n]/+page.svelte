<script lang="ts">
	import { goto } from '$app/navigation';
	import { lessons } from '$lib/content';
	import { app, save } from '$lib/state/app.svelte';
	import { filterWords } from '$lib/study/words';
	import ChapterHeader from '$lib/ui/ChapterHeader.svelte';
	import ChapterStrip from '$lib/ui/ChapterStrip.svelte';
	import Markup from '$lib/ui/Markup.svelte';
	import Bubble from '$lib/ui/Bubble.svelte';
	import Speak from '$lib/ui/Speak.svelte';

	let { data } = $props();
	const lesson = $derived(data.lesson);
	const index = $derived(lessons.indexOf(lesson));
	const prev = $derived(lessons[index - 1]);
	const next = $derived(lessons[index + 1]);

	let query = $state('');
	let searchEl = $state<HTMLInputElement>();
	const shown = $derived(filterWords(lesson.words, query));

	$effect(() => {
		if (!app.ready) return;
		app.lastLesson = lesson.n;
		save('lastLesson');
	});
	// a new lesson starts with an empty filter
	$effect(() => {
		lesson.n;
		query = '';
	});

	function studyWords() {
		app.cards = { ...app.cards, lessons: [lesson.n] };
		save('cards');
		goto('/flashcards/');
	}
	function clearFilter() {
		query = '';
		searchEl?.focus();
	}
</script>

<svelte:head><title>Lesson {lesson.n}: {lesson.title} · Nihongo Notes</title></svelte:head>

<ChapterStrip current={lesson.n} />
<ChapterHeader num={lesson.n} title={lesson.title} kicker={`第${lesson.n}課 · Lesson ${lesson.n} of ${lessons.length}`} />
<p class="goal"><Markup text={lesson.goal} /></p>
<ul class="legend">
	<li><mark class="p" lang="ja">は</mark> particle</li>
	<li><span class="slot">Noun</span> your own word goes here</li>
</ul>

<h2>Patterns <span class="count">{lesson.patterns.length}</span></h2>
<ol class="panels">
	{#each lesson.patterns as p, i (lesson.n + ':' + i)}
		<li>
			<h3><span class="num" aria-hidden="true">{i + 1}</span> <Markup text={p.title} /></h3>
			<p class="formula" lang="ja"><Markup text={p.formula} /></p>
			{#if p.meaning}<p class="meaning"><Markup text={p.meaning} /></p>{/if}
			{#if p.table}
				<!-- a table that scrolls sideways must take keyboard focus, or keyboard users can't scroll it -->
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<div class="table-scroll" tabindex="0" role="region" aria-label={p.title}>
					<table>
						<thead><tr>{#each p.table.head as h}<th scope="col"><Markup text={h} /></th>{/each}</tr></thead>
						<tbody>
							{#each p.table.rows as row}
								<tr>
									<th scope="row"><Markup text={row[0]} /></th>
									{#each row.slice(1) as cell}<td><Markup text={cell} /></td>{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
			{#if p.examples}
				<div class="bubbles">
					{#each p.examples as [jp, en]}<Bubble {jp} {en} />{/each}
				</div>
			{/if}
			{#if p.note}<p class="note"><Markup text={p.note} /></p>{/if}
		</li>
	{/each}
</ol>

<h2 id="words">Words <span class="count">{query.trim() ? `${shown.length} of ${lesson.words.length}` : lesson.words.length}</span></h2>
<div class="word-tools">
	<input type="search" bind:this={searchEl} bind:value={query} placeholder="Filter by kana or English" aria-label="Filter words" />
	<button type="button" class="btn" onclick={studyWords}>Study lesson {lesson.n} words as flashcards</button>
</div>
{#if shown.length}
	<ul class="words">
		{#each shown as [jp, en]}
			<li><span class="jp" lang="ja">{jp}</span><span class="en"><Markup text={en} /></span><Speak text={jp} /></li>
		{/each}
	</ul>
{:else}
	<div class="status words-empty">
		<p>No words in lesson {lesson.n} match “{query.trim()}”.</p>
		<button type="button" class="btn outline" onclick={clearFilter}>Clear the filter</button>
	</div>
{/if}

<nav class="pager" aria-label="Previous and next lesson">
	{#if prev}<a href="/lessons/{prev.n}/" rel="prev"><small>← Lesson {prev.n}</small><Markup text={prev.title} /></a>{:else}<span></span>{/if}
	{#if next}<a href="/lessons/{next.n}/" rel="next" class="next"><small>Lesson {next.n} →</small><Markup text={next.title} /></a>{/if}
</nav>

<style>
	.goal {
		margin: 12px 0 0;
		color: var(--soft);
		max-width: 60ch;
	}
	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 24px;
		margin: 12px 0 0;
		padding: 0;
		list-style: none;
		font-size: 0.9rem;
		color: var(--soft);
	}
	.panels {
		list-style: none;
		margin: 0;
		padding: 0;
		max-width: 46rem;
	}
	.panels > li {
		padding: 20px 0;
		border-top: 1px solid var(--ink);
	}
	h3 {
		margin: 0;
		font-size: 1rem;
		display: flex;
		gap: 10px;
		align-items: baseline;
	}
	.num {
		font-family: var(--f-title);
	}
	.formula {
		margin: 6px 0 0;
		font-size: clamp(1.25rem, 1.1rem + 0.8vw, 1.5rem);
		line-height: 1.6;
		overflow-wrap: anywhere;
	}
	.meaning {
		margin: 2px 0 0;
		color: var(--soft);
	}
	.bubbles {
		display: grid;
		gap: 8px;
		margin-top: 16px;
		max-width: 34rem;
	}
	.note {
		margin: 14px 0 0;
		padding: 10px 14px;
		background: var(--subtle);
		font-size: 0.95rem;
	}
	.table-scroll {
		margin-top: 12px;
		overflow-x: auto;
	}
	table {
		border-collapse: collapse;
		font-size: 0.95rem;
	}
	th,
	td {
		padding: 6px 16px 6px 0;
		border-bottom: 1px solid var(--subtle);
		text-align: left;
		white-space: nowrap;
	}
	thead th {
		font-size: 0.85rem;
		color: var(--soft);
		border-bottom-color: var(--ink);
	}
	tbody th {
		font-weight: 400;
		color: var(--soft);
	}
	.word-tools {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin: 8px 0 16px;
	}
	input[type='search'] {
		flex: 1 1 16rem;
		min-width: 0;
		min-height: 44px;
		padding: 8px 12px;
		border: 1px solid var(--ink);
		background: var(--paper);
	}
	input[type='search']::placeholder {
		color: var(--soft);
	}
	.words {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
		column-gap: 32px;
	}
	.words li {
		display: flex;
		align-items: center;
		gap: 12px;
		min-height: 52px;
		border-bottom: 1px solid var(--subtle);
	}
	.words .jp {
		font-size: 1.1rem;
		overflow-wrap: anywhere;
	}
	.words .en {
		margin-left: auto;
		color: var(--soft);
		font-size: 0.92rem;
		text-align: right;
	}
	.words-empty p {
		margin: 0 0 12px;
	}
	.pager {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		margin-top: 48px;
		padding-top: 24px;
		border-top: 2px solid var(--ink);
	}
	.pager a {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-height: 44px;
		padding: 10px 0;
		text-decoration: none;
	}
	.pager a:hover {
		text-decoration: underline;
	}
	.pager .next {
		grid-column: 2;
		align-items: flex-end;
		text-align: right;
	}
	.pager small {
		color: var(--soft);
	}
</style>
