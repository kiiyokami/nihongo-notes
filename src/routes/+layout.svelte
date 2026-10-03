<script lang="ts">
	import '../app.css';
	import '@fontsource/klee-one/600.css';
	import '@fontsource/zen-kaku-gothic-new/400.css';
	import '@fontsource/zen-kaku-gothic-new/700.css';
	import { onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { app, loadApp } from '$lib/state/app.svelte';
	import { initSpeech, stopSpeech } from '$lib/speech/speech.svelte';
	import ThemeToggle from '$lib/ui/ThemeToggle.svelte';

	let { children } = $props();

	onMount(() => {
		loadApp();
		initSpeech();
	});
	// leaving a page stops anything being read aloud
	beforeNavigate(() => stopSpeech());

	const modes = $derived([
		{ href: `/lessons/${app.lastLesson}/`, base: '/lessons/', label: 'Lessons' },
		{ href: '/flashcards/', base: '/flashcards/', label: 'Flashcards' },
		{ href: '/quiz/', base: '/quiz/', label: 'Quiz' },
		{ href: '/kana/', base: '/kana/', label: 'Kana' }
	]);
</script>

<a class="skip" href="#main">Skip to content</a>
<header class="top">
	<div class="top-in">
		<a class="wordmark" href="/" lang="ja" aria-label="Nihongo Notes, home">にほんご帳</a>
		<nav class="modes" aria-label="Study modes">
			{#each modes as m (m.base)}
				<a href={m.href} aria-current={page.url.pathname.startsWith(m.base) ? 'page' : undefined}>{m.label}</a>
			{/each}
		</nav>
		<ThemeToggle />
	</div>
</header>
<main id="main" tabindex="-1">
	{@render children()}
</main>

<style>
	.skip {
		position: absolute;
		left: 16px;
		top: -100px;
		z-index: 20;
		background: var(--sheet);
		border: 2px solid var(--ink);
		padding: 10px 14px;
	}
	.skip:focus {
		top: 8px;
	}
	.top {
		position: sticky;
		top: 0;
		z-index: 10;
		background: var(--sheet);
		border-bottom: 1px solid var(--line);
		box-shadow: 0 2px 10px var(--shadow);
		padding-top: env(safe-area-inset-top);
	}
	.top-in {
		max-width: 72rem;
		margin: 0 auto;
		padding: 0 var(--gutter);
		min-height: 56px;
		display: flex;
		align-items: center;
		gap: 8px 24px;
	}
	.wordmark {
		font-family: var(--f-hand);
		font-weight: 600;
		font-size: 1.4rem;
		text-decoration: none;
		min-height: 44px;
		display: inline-flex;
		align-items: center;
	}
	.modes {
		display: flex;
		gap: 4px;
	}
	.modes a {
		min-height: 44px;
		display: inline-flex;
		align-items: center;
		padding: 0 12px;
		font-weight: 700;
		text-decoration: none;
		color: var(--soft);
	}
	.modes a:hover {
		color: var(--ink);
	}
	/* the page you're on is underlined in red pen */
	.modes a[aria-current='page'] {
		color: var(--red);
		text-decoration: underline 2px;
		text-underline-offset: 8px;
	}
	main {
		max-width: 72rem;
		margin: 0 auto;
		padding: 28px var(--gutter) 64px;
	}
	/* on phones the four modes move to a bottom bar, one thumb away */
	@media (max-width: 719.98px) {
		.modes {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 10;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 0;
			background: var(--sheet);
			border-top: 1px solid var(--line);
			box-shadow: 0 -2px 10px var(--shadow);
			padding-bottom: env(safe-area-inset-bottom);
		}
		.modes a {
			justify-content: center;
			min-height: 56px;
			padding: 0 4px;
			font-size: 0.9rem;
		}
		main {
			padding-top: 20px;
			padding-bottom: calc(96px + env(safe-area-inset-bottom));
		}
	}
</style>
