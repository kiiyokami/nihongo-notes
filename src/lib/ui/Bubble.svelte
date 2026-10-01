<script lang="ts">
	import Markup from './Markup.svelte';
	import Speak from './Speak.svelte';

	let { jp, en }: { jp: string; en?: string } = $props();
</script>

<div class="wrap">
	<p class="bubble" lang="ja"><Markup text={jp} /></p>
	<div class="under">
		{#if en}<p class="en"><Markup text={en} /></p>{/if}
		<Speak text={jp} />
	</div>
</div>

<style>
	.wrap {
		display: grid;
		gap: 6px;
	}
	.bubble {
		position: relative;
		margin: 0 0 12px;
		padding: 12px 20px;
		border: 1.5px solid var(--ink);
		border-radius: 2em / 1.6em;
		font-size: 1.15rem;
		line-height: 1.6;
		text-align: center;
		overflow-wrap: anywhere;
	}
	.bubble::after {
		content: '';
		position: absolute;
		left: 32px;
		bottom: -12px;
		border: 7px solid transparent;
		border-top: 11px solid var(--ink);
		border-bottom: 0;
	}
	.under {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}
	.en {
		margin: 0;
		color: var(--soft);
		font-size: 0.95rem;
	}
</style>
