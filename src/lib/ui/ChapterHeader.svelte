<script lang="ts">
	import Markup from './Markup.svelte';
	let { num, title, kicker }: { num: number; title: string; kicker?: string } = $props();
</script>

<header class="chapter">
	{#if kicker}<p class="kicker"><Markup text={kicker} /></p>{/if}
	<h1><span class="num">{String(num).padStart(2, '0')}</span> <Markup text={title} /></h1>
</header>

<style>
	.chapter {
		padding-bottom: 10px;
		border-bottom: 2px solid var(--ink);
	}
	.kicker {
		margin: 0;
		color: var(--soft);
	}
	h1 {
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		column-gap: 14px;
	}
	.num {
		font-size: 1.3em;
	}
</style>
