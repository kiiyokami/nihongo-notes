<script lang="ts">
	import { lessons, getLesson } from '$lib/content';
	import { app, save } from '$lib/state/app.svelte';
	import { speech } from '$lib/speech/speech.svelte';
	import { decodeImport, mergeKnown } from '$lib/state/importcode';
	import Markup from '$lib/ui/Markup.svelte';

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

<!-- hidden until saved progress is loaded, so it never flashes lesson 1 for a returning learner -->
<section class="hero" class:waiting={!app.ready} aria-labelledby="continue">
	<p class="kicker" id="continue"><span lang="ja">続き</span> Continue</p>
	<p class="chapter"><span class="num">{pad(current.n)}</span> <Markup text={current.title} /></p>
	<a class="btn" href="/lessons/{current.n}/">Open lesson {current.n}</a>
</section>

<nav class="ways" aria-label="Ways to study">
	<a class="btn outline" href="/flashcards/">Flashcards</a>
	<a class="btn outline" href="/quiz/">Quiz</a>
	<a class="btn outline" href="/kana/">Kana chart</a>
</nav>

<h2>Lessons</h2>
<ol class="chapters">
	{#each lessons as l (l.n)}
		<li>
			<a href="/lessons/{l.n}/"><span class="num">{pad(l.n)}</span><span><Markup text={l.title} /></span></a>
		</li>
	{/each}
</ol>

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

<style>
	.hero {
		padding: 16px 0 24px;
		border-bottom: 2px solid var(--ink);
	}
	.waiting {
		visibility: hidden;
	}
	.kicker {
		margin: 0;
		color: var(--soft);
		font-weight: 700;
	}
	.chapter {
		margin: 4px 0 16px;
		font-family: var(--f-title);
		font-size: clamp(1.8rem, 1.3rem + 2.4vw, 2.6rem);
		line-height: 1.2;
	}
	.chapter .num {
		font-size: 1.3em;
		margin-right: 10px;
	}
	.ways {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 24px;
	}
	.chapters {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		column-gap: 32px;
	}
	.chapters a {
		display: flex;
		align-items: baseline;
		gap: 14px;
		min-height: 52px;
		padding: 12px 0;
		border-bottom: 1px solid var(--subtle);
		text-decoration: none;
	}
	.chapters a:hover {
		text-decoration: underline;
	}
	.chapters .num {
		font-family: var(--f-title);
		font-size: 1.2rem;
	}
	.import {
		margin-top: 40px;
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
		border: 1px solid var(--ink);
		background: var(--paper);
		font-size: 0.85rem;
		word-break: break-all;
	}
</style>
