<script lang="ts">
	import Markup from './Markup.svelte';
	import Speak from './Speak.svelte';

	let { jp, en }: { jp: string; en?: string } = $props();
</script>

<div class="ex">
	<div class="txt">
		<p class="jp" lang="ja"><Markup text={jp} /></p>
		{#if en}<p class="en"><Markup text={en} /></p>{/if}
	</div>
	<Speak text={jp} />
</div>

<style>
	.ex {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 8px 0;
	}
	.txt {
		flex: 1;
		min-width: 0;
	}
	.jp {
		margin: 0;
		font-size: 1.2rem;
		line-height: 1.5;
		overflow-wrap: anywhere;
	}
	.en {
		margin: 0;
		color: var(--soft);
		font-size: 0.92rem;
	}
</style>
