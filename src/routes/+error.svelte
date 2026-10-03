<script lang="ts">
	import { page } from '$app/state';
	const missing = $derived(page.status === 404);
</script>

<svelte:head><title>{missing ? 'Page not found' : 'Something went wrong'} · Nihongo Notes</title></svelte:head>

<section class="error">
	<p class="huh" lang="ja" aria-hidden="true">あれ？</p>
	<h1>{missing ? 'Page not found' : 'Something went wrong'}</h1>
	<p>{missing ? `There's nothing at ${page.url.pathname}.` : (page.error?.message ?? 'Try going back to the home page.')}</p>
	<a class="btn" href="/">Go to the home page</a>
</section>

<style>
	.error {
		max-width: 36rem;
		padding: 32px 0;
	}
	.huh {
		margin: 0;
		color: var(--red);
		font-size: 2.5rem;
		transform: rotate(-4deg);
		display: inline-block;
	}
</style>
