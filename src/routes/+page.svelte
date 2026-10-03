<script lang="ts">
	import { lessons, getLesson, vocab } from '$lib/content';
	import { app, save } from '$lib/state/app.svelte';
	import { speech } from '$lib/speech/speech.svelte';
	import { decodeImport, mergeKnown } from '$lib/state/importcode';
	import { reviewNow, tasksNow } from '$lib/state/today.svelte';
	import { dayNumber } from '$lib/study/srs';
	import { streak, weekOf } from '$lib/study/days';
	import { nextTask, recentLessons, taskHref } from '$lib/study/today';
	import { blockOf, blockProgress } from '$lib/study/blocks';
	import { lessonsText } from '$lib/study/text';
	import Markup from '$lib/ui/Markup.svelte';
	import Mark from '$lib/ui/Mark.svelte';
	import Hanamaru from '$lib/ui/Hanamaru.svelte';

	const current = $derived(getLesson(app.lastLesson) ?? lessons[0]);
	// the date and the day's numbers only mean something in the browser, once saved progress is loaded
	const today = $derived(app.ready ? dayNumber() : 0);
	const dateText = $derived(app.ready ? new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }) : '');
	const review = $derived(reviewNow());
	const done = $derived(tasksNow());
	const next = $derived(nextTask(done));
	const started = $derived(done.lesson || done.quiz || (done.review && review.cards.length > 0));
	const week = $derived(weekOf(app.days, today));
	const inARow = $derived(streak(app.days, today));
	const progress = $derived(blockProgress(vocab, new Set(app.known), lessons.length));
	const streakText = $derived.by(() => {
		const days = `${inARow} ${inARow === 1 ? 'day' : 'days'} in a row`;
		if (!inARow) return 'A stamp goes here for each day you study.';
		return app.days[today]?.length ? `${days}.` : `${days} so far. Study today to keep it going.`;
	});
	const quizLessons = $derived(lessonsText(recentLessons(current.n), lessons.length));

	let code = $state('');
	let importMsg = $state('');

	function runImport(e: SubmitEvent) {
		e.preventDefault();
		const r = decodeImport(code);
		if (!r.ok) {
			importMsg = "That code isn't from the old site.";
			return;
		}
		const m = mergeKnown(app.known, r.known);
		app.known = m.known;
		save('known');
		if (r.lesson !== undefined && getLesson(r.lesson)) {
			app.lastLesson = r.lesson;
			save('lastLesson');
		}
		importMsg = `Imported ${m.added} ${m.added === 1 ? 'word' : 'words'}.`;
		code = '';
	}
</script>

<svelte:head><title>Today · Nihongo Notes</title></svelte:head>

<div class="home">
	<div class="left">
		<!-- hidden until saved progress is loaded, so it never flashes an empty day for a returning learner -->
		<section class="sheet today b-{blockOf(current.n)}" class:waiting={!app.ready} aria-labelledby="today-title">
			<span class="tape"><span><span lang="ja">今日</span> · {dateText}</span></span>
			<h1 id="today-title">Today's page</h1>
			<ol class="tasks">
				<li class:done={done.review}>
					<a href={taskHref('review', current.n)}>
						<span class="box">{#if done.review}<Mark kind="right" />{/if}</span>
						<span class="what">
							<span class="t">Review cards</span>
							<span class="d">{review.cards.length ? `${review.due.length} due, ${review.fresh.length} new` : 'Nothing due today'}</span>
						</span>
						<span class="sr">{done.review ? '(done)' : ''}</span>
					</a>
				</li>
				<li class:done={done.lesson}>
					<a href={taskHref('lesson', current.n)}>
						<span class="box">{#if done.lesson}<Mark kind="right" />{/if}</span>
						<span class="what">
							<span class="t">Lesson {current.n}: <Markup text={current.title} /></span>
							<span class="d"><Markup text={current.goal} /></span>
						</span>
						<span class="sr">{done.lesson ? '(done)' : ''}</span>
					</a>
				</li>
				<li class:done={done.quiz}>
					<a href={taskHref('quiz', current.n)}>
						<span class="box">{#if done.quiz}<Mark kind="right" />{/if}</span>
						<span class="what">
							<span class="t">Quick quiz</span>
							<span class="d">10 words from {quizLessons}</span>
						</span>
						<span class="sr">{done.quiz ? '(done)' : ''}</span>
					</a>
				</li>
			</ol>
			{#if next}
				<a class="btn start" href={taskHref(next, current.n)}>{started ? 'Carry on with today' : "Start today's page"}</a>
			{:else}
				<div class="all-done">
					<Hanamaru />
					<p>Today's page is done. See you tomorrow.</p>
				</div>
			{/if}
		</section>

		{#if app.ready && !app.storageOk}
			<p class="notice">Your browser isn't saving progress (private mode or storage full).</p>
		{/if}
		{#if speech.checked && !speech.voiceReady}
			<p class="notice">This device has no Japanese voice, so the play buttons are hidden.</p>
		{/if}

		<details class="import">
			<summary>Import from the old site</summary>
			<form onsubmit={runImport}>
				<label for="import-code">Paste the code from “Export my progress” on the old site</label>
				<textarea id="import-code" rows="3" bind:value={code}></textarea>
				<button class="btn" type="submit" disabled={!code.trim()}>Import</button>
			</form>
			<p class="hint" aria-live="polite">{importMsg}</p>
		</details>
	</div>

	<section class="sheet right" aria-label="Your progress">
		<div class:waiting={!app.ready}>
			<h2>This week</h2>
			<ol class="week">
				{#each week as d (d.day)}
					<li class:done={d.done} class:now={d.today}>
						<span class="hanko" lang="ja" aria-hidden="true">{d.label}</span>
						<span class="sr">{d.name}{d.today ? ' (today)' : ''}: {d.done ? 'studied' : 'not studied'}</span>
					</li>
				{/each}
			</ol>
			<p class="streak">{streakText}</p>

			<h2>Words you know</h2>
			<ul class="blocks">
				{#each progress as b (b.first)}
					<li class="b-{b.block}">
						<span class="label">Lessons {b.first} to {b.last}</span>
						<span class="bar" aria-hidden="true"><i style:width="{b.total ? (100 * b.known) / b.total : 0}%"></i></span>
						<span class="count">{b.known} of {b.total}</span>
					</li>
				{/each}
			</ul>
		</div>

		<h2 id="lessons-title">Lessons</h2>
		<ol class="chapters" aria-labelledby="lessons-title">
			{#each lessons as l (l.n)}
				<li class="b-{blockOf(l.n)}">
					<a href="/lessons/{l.n}/" aria-current={l.n === current.n ? 'true' : undefined}><span class="num">{l.n}</span><span class="t"><Markup text={l.title} /></span></a>
				</li>
			{/each}
		</ol>
	</section>
</div>

<style>
	.home {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 24px;
	}
	.left {
		display: grid;
		gap: 20px;
		align-content: start;
	}
	.today {
		padding-top: 30px;
	}
	.waiting {
		visibility: hidden;
	}
	h1 {
		margin: 0 0 8px;
	}
	.tasks {
		list-style: none;
		margin: 0 0 20px;
		padding: 0;
	}
	.tasks a {
		display: flex;
		align-items: flex-start;
		gap: 14px;
		min-height: 52px;
		padding: 12px 0;
		border-bottom: 1px dashed var(--line);
		text-decoration: none;
	}
	.tasks a:hover .t {
		text-decoration: underline;
	}
	/* an empty box, circled in red pen once it's done */
	.box {
		flex: none;
		position: relative;
		width: 26px;
		height: 26px;
		margin: 3px 2px 0;
		border: 2px solid var(--soft);
		border-radius: 4px;
	}
	.box :global(.mark) {
		position: absolute;
		left: -17px;
		top: -16px;
		width: 58px;
		height: 58px;
		stroke-width: 3;
		margin: 0;
	}
	.what {
		display: grid;
		gap: 2px;
		min-width: 0;
	}
	.t {
		font-family: var(--f-hand);
		font-weight: 600;
		font-size: 1.15rem;
		line-height: 1.35;
	}
	.d {
		color: var(--soft);
		font-size: 0.92rem;
	}
	.done .t {
		color: var(--soft);
	}
	.all-done {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.all-done p {
		margin: 0;
		font-family: var(--f-hand);
		font-weight: 600;
		font-size: 1.2rem;
	}
	.all-done :global(.hanamaru) {
		flex: none;
		width: 80px;
		height: 80px;
	}
	.right h2:first-child {
		margin-top: 0;
	}
	/* a hanko stamp for each day studied this week */
	.week {
		list-style: none;
		margin: 8px 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 44px));
		gap: 6px;
	}
	.hanko {
		display: grid;
		place-items: center;
		width: 100%;
		aspect-ratio: 1;
		border: 2px dashed var(--line);
		border-radius: 50%;
		color: var(--soft);
		font-size: 1.05rem;
	}
	.now .hanko {
		border: 2px solid var(--soft);
		color: var(--ink);
	}
	.done .hanko {
		border: 2.5px solid var(--red);
		color: var(--red);
		transform: rotate(-10deg);
	}
	.streak {
		margin: 10px 0 0;
		color: var(--soft);
	}
	.blocks {
		list-style: none;
		margin: 8px 0 0;
		padding: 0;
		display: grid;
		gap: 10px;
	}
	.blocks li {
		display: grid;
		grid-template-columns: 8.5rem minmax(0, 1fr) 5.5rem;
		align-items: center;
		gap: 12px;
		font-size: 0.92rem;
	}
	.bar {
		height: 12px;
		/* an outlined track on the page colour: every block colour reads at 3.4:1 or more against it */
		background: var(--sheet);
		box-shadow: inset 0 0 0 1px var(--line);
		border-radius: 6px;
		overflow: hidden;
	}
	.bar i {
		display: block;
		height: 100%;
		background: var(--block);
	}
	.count {
		color: var(--soft);
		font-variant-numeric: tabular-nums;
		text-align: right;
	}
	@media (max-width: 420px) {
		.blocks li {
			grid-template-columns: minmax(0, 1fr) 5.5rem;
		}
		.bar {
			grid-column: 1 / -1;
			grid-row: 2;
		}
	}
	.chapters {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
		column-gap: 28px;
	}
	.chapters a {
		display: flex;
		align-items: center;
		gap: 14px;
		min-height: 52px;
		padding: 6px 0;
		border-bottom: 1px dashed var(--line);
		text-decoration: none;
	}
	.chapters a:hover .t {
		text-decoration: underline;
	}
	.chapters .num {
		flex: none;
		display: grid;
		place-items: center;
		width: 2.4rem;
		height: 2rem;
		background: var(--tint);
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}
	.chapters a[aria-current] .num {
		background: var(--red);
		color: var(--on-red);
	}
	.import {
		max-width: 36rem;
	}
	summary {
		min-height: 44px;
		display: flex;
		align-items: center;
		font-weight: 700;
		cursor: pointer;
	}
	form {
		display: grid;
		gap: 8px;
		justify-items: start;
	}
	textarea {
		width: 100%;
		padding: 8px;
		border: 1px solid var(--soft);
		border-radius: 6px;
		background: var(--sheet);
		font-size: 0.85rem;
		word-break: break-all;
	}
	/* on a computer: an open notebook, today's page on the left, your progress and the lessons on the right */
	@media (min-width: 1000px) {
		.home {
			grid-template-columns: 24rem minmax(0, 1fr);
			gap: 0;
			box-shadow: 0 10px 26px var(--shadow);
		}
		.left {
			background: var(--sheet);
			padding: 36px 30px;
			box-shadow: inset -16px 0 18px -16px var(--shadow);
		}
		.left .today.sheet {
			box-shadow: none;
			padding: 30px 0 0;
		}
		.left .today > .tape:first-child {
			left: 0;
		}
		.right.sheet {
			padding: 36px 40px;
			box-shadow: inset 16px 0 18px -16px var(--shadow);
		}
	}
</style>
