<script lang="ts">
	import { goto } from '$app/navigation';
	import { lessons } from '$lib/content';
	import { app, save } from '$lib/state/app.svelte';
	import { filterWords } from '$lib/study/words';
	import { blockOf } from '$lib/study/blocks';
	import ChapterHeader from '$lib/ui/ChapterHeader.svelte';
	import LessonTabs from '$lib/ui/LessonTabs.svelte';
	import Markup from '$lib/ui/Markup.svelte';
	import Example from '$lib/ui/Example.svelte';
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

<div class="lesson b-{blockOf(lesson.n)}">
	<div class="tabs"><LessonTabs current={lesson.n} /></div>

	<!-- on a computer: the left page of the notebook, with the lesson's contents -->
	<aside class="intro">
		<div class="intro-in">
			<ChapterHeader num={lesson.n} title={lesson.title} kicker={`第${lesson.n}課 · Lesson ${lesson.n} of ${lessons.length}`} />
			<p class="goal"><Markup text={lesson.goal} /></p>
			<ul class="legend">
				<li><mark class="p" lang="ja">は</mark> particle</li>
				<li><span class="slot">Noun</span> your own word goes here</li>
			</ul>
			<nav class="contents" aria-label="In this lesson">
				<ol>
					{#each lesson.patterns as p, i (lesson.n + ':' + i)}
						<li><a href="#p{i + 1}"><span class="n">{i + 1}</span><span><Markup text={p.title} /></span></a></li>
					{/each}
					<li><a href="#words"><span class="n">W</span>Words</a></li>
				</ol>
			</nav>
		</div>
	</aside>

	<div class="pages">
		<h2 class="patterns-title">Patterns <span class="count">{lesson.patterns.length}</span></h2>
		<ol class="panels">
			{#each lesson.patterns as p, i (lesson.n + ':' + i)}
				<li class="sheet" id="p{i + 1}" tabindex="-1">
					<span class="tape"><span>{i + 1} · <Markup text={p.title} /></span></span>
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
						<div class="examples">
							{#each p.examples as [jp, en]}<Example {jp} {en} />{/each}
						</div>
					{/if}
					{#if p.note}<p class="note"><Markup text={p.note} /></p>{/if}
				</li>
			{/each}
		</ol>

		<section class="sheet words-sheet" aria-labelledby="words">
			<span class="tape">Words</span>
			<h2 id="words" tabindex="-1">Words <span class="count">{query.trim() ? `${shown.length} of ${lesson.words.length}` : lesson.words.length}</span></h2>
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
		</section>

		<nav class="pager" aria-label="Previous and next lesson">
			{#if prev}<a href="/lessons/{prev.n}/" rel="prev"><small>← Lesson {prev.n}</small><Markup text={prev.title} /></a>{:else}<span></span>{/if}
			{#if next}<a href="/lessons/{next.n}/" rel="next" class="next"><small>Lesson {next.n} →</small><Markup text={next.title} /></a>{/if}
		</nav>
	</div>
</div>

<style>
	.lesson {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 16px;
	}
	.tabs {
		min-width: 0;
	}
	.goal {
		margin: 10px 0 0;
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
	.contents {
		display: none;
	}
	.panels {
		list-style: none;
		margin: 24px 0 0;
		padding: 0;
		display: grid;
		gap: 30px;
	}
	.panels > li {
		/* a grid item grows to fit a wide table unless allowed to shrink, so the table scrolls inside instead */
		min-width: 0;
		padding-top: 28px;
	}
	.tape :global(span) {
		font-weight: inherit;
	}
	.formula {
		margin: 4px 0 0;
		font-size: clamp(1.3rem, 1.15rem + 0.8vw, 1.6rem);
		line-height: 1.6;
		overflow-wrap: anywhere;
	}
	.meaning {
		margin: 2px 0 0;
		color: var(--soft);
	}
	.examples {
		margin-top: 10px;
		border-top: 1px dashed var(--line);
	}
	.examples :global(.ex) {
		border-bottom: 1px dashed var(--line);
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
		border-bottom: 1px solid var(--line);
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
	.patterns-title {
		margin: 8px 0 0;
	}
	.words-sheet {
		margin-top: 30px;
		padding-top: 28px;
	}
	.words-sheet h2 {
		margin-top: 0;
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
		border: 1px solid var(--soft);
		border-radius: 6px;
		background: var(--sheet);
	}
	input[type='search']::placeholder {
		color: var(--soft);
	}
	.words {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
		column-gap: 32px;
	}
	.words li {
		display: flex;
		align-items: center;
		gap: 12px;
		min-height: 52px;
		border-bottom: 1px dashed var(--line);
	}
	.words .jp {
		font-size: 1.15rem;
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
		margin-top: 32px;
	}
	.pager a {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-height: 44px;
		padding: 10px 0;
		font-family: var(--f-hand);
		font-weight: 600;
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
		font-family: var(--f-ui);
		font-weight: 400;
		color: var(--soft);
	}

	/* on a computer: an open notebook, contents on the left page, patterns on the right, index tabs on the edge */
	@media (min-width: 1000px) {
		.lesson {
			grid-template-columns: 17rem minmax(0, 1fr) auto;
			gap: 0;
			align-items: start;
		}
		.intro,
		.pages {
			background: var(--sheet);
			align-self: stretch;
		}
		.intro {
			grid-column: 1;
			grid-row: 1;
			padding: 32px 28px;
			box-shadow:
				inset -16px 0 18px -16px var(--shadow),
				0 10px 26px var(--shadow);
		}
		.intro-in {
			position: sticky;
			top: 88px;
		}
		.pages {
			grid-column: 2;
			grid-row: 1;
			padding: 32px 40px 40px;
			box-shadow:
				inset 16px 0 18px -16px var(--shadow),
				0 10px 26px var(--shadow);
		}
		.tabs {
			grid-column: 3;
			grid-row: 1;
			padding-top: 24px;
		}
		.contents {
			display: block;
			margin-top: 24px;
		}
		.contents ol {
			list-style: none;
			margin: 0;
			padding: 0;
		}
		.contents a {
			display: flex;
			gap: 10px;
			align-items: baseline;
			min-height: 44px;
			padding: 10px 8px;
			border-radius: 6px;
			text-decoration: none;
		}
		.contents a:hover {
			background: var(--subtle);
		}
		.contents .n {
			flex: none;
			width: 1.4em;
			font-family: var(--f-hand);
			font-weight: 600;
			color: var(--soft);
		}
		/* inside the open notebook the patterns share one page, divided by their tape */
		.panels > li.sheet,
		.words-sheet.sheet {
			box-shadow: none;
			background: none;
			padding-left: 0;
			padding-right: 0;
		}
		.panels > li > .tape:first-child,
		.words-sheet > .tape:first-child {
			left: 0;
		}
		.patterns-title {
			display: none;
		}
	}
</style>
