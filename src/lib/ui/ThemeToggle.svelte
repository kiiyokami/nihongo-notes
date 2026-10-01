<script lang="ts">
	import { app, save } from '$lib/state/app.svelte';

	let systemDark = $state(false);
	$effect(() => {
		const q = matchMedia('(prefers-color-scheme: dark)');
		systemDark = q.matches;
		const f = () => (systemDark = q.matches);
		q.addEventListener('change', f);
		return () => q.removeEventListener('change', f);
	});
	const dark = $derived(app.theme ? app.theme === 'dark' : systemDark);
	// wait for the saved theme, so the head script's choice isn't undone on load
	$effect(() => {
		if (!app.ready) return;
		if (app.theme) document.documentElement.dataset.theme = app.theme;
		else delete document.documentElement.dataset.theme;
	});
	function toggle() {
		app.theme = dark ? 'light' : 'dark';
		save('theme');
	}
</script>

<button type="button" class="theme" onclick={toggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
	{dark ? 'Light' : 'Dark'}
</button>

<style>
	.theme {
		margin-left: auto;
		min-height: 44px;
		min-width: 44px;
		padding: 0 12px;
		background: none;
		border: 1px solid var(--ink);
		font-weight: 700;
		font-size: 0.9rem;
	}
	.theme:hover {
		background: var(--subtle);
	}
</style>
