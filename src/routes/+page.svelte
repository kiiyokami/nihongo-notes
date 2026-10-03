<script lang="ts">
	import { lessons, getLesson } from '$lib/content';
	import { app, save } from '$lib/state/app.svelte';
	import { speech } from '$lib/speech/speech.svelte';
	import { decodeImport, mergeKnown } from '$lib/state/importcode';
	import Markup from '$lib/ui/Markup.svelte';
	import { blockOf } from '$lib/study/blocks';

	const current = $derived(getLesson(app.lastLesson) ?? lessons[0]);
	const pad = (n: number) => String(n).padStart(2, '0');

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

<svelte:head><title>Nihongo Notes</title></svelte:head>

<h1 class="sr">Nihongo Notes</h1>

<div class="home">
	<div class="left">
		<!-- hidden until saved progress is loaded, so it never flashes lesson 1 for a returning learner -->
		<section class="sheet hero b-{blockOf(current.n)}" class:waiting={!app.ready} aria-labelledby="continue">
			<span class="tape" id="continue"><span><span lang="ja">続き</span> · Continue</span></span>
			<p class="chapter"><span class="num">{pad(current.n)}</span> <Markup text={current.title} /></p>
			<p class="goal"><Markup text={current.goal} /></p>
			<a class="btn" href="/lessons/{current.n}/">Open lesson {current.n}</a>
		</section>

		<nav class="ways" aria-label="Ways to study">
			<a class="btn outline" href="/flashcards/">Flashcards</a>
			<a class="btn outline" href="/quiz/">Quiz</a>
			<a class="btn outline" href="/kana/">Kana chart</a>
		</nav>

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

	<section class="sheet right" aria-labelledby="lessons-title">
		<h2 id="lessons-title">Lessons</h2>
		<ol class="chapters">
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
	.hero {
		padding-top: 30px;
	}
	.waiting {
		visibility: hidden;
	}
	.chapter {
		margin: 0;
		font-family: var(--f-hand);
		font-weight: 600;
		font-size: clamp(1.7rem, 1.3rem + 2vw, 2.4rem);
		line-height: 1.2;
	}
	.chapter .num {
		font-size: 1.4em;
		margin-right: 10px;
	}
	.goal {
		margin: 8px 0 18px;
		color: var(--soft);
	}
	.ways {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}
	.right h2 {
		margin-top: 0;
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
	/* on a computer: an open notebook, what to do next on the left, every lesson on the right */
	@media (min-width: 1000px) {
		.home {
			grid-template-columns: 22rem minmax(0, 1fr);
			gap: 0;
			box-shadow: 0 10px 26px var(--shadow);
		}
		.left {
			background: var(--sheet);
			padding: 36px 30px;
			box-shadow: inset -16px 0 18px -16px var(--shadow);
		}
		.left .hero.sheet {
			box-shadow: none;
			padding: 30px 0 0;
		}
		.left .hero > .tape:first-child {
			left: 0;
		}
		.right.sheet {
			padding: 36px 40px;
			box-shadow: inset 16px 0 18px -16px var(--shadow);
		}
	}
</style>
