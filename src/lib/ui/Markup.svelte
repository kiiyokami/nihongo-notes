<script lang="ts">
	import { parse } from '$lib/study/markup';
	let { text }: { text: string } = $props();
	const tokens = $derived(parse(text));
</script>

{#each tokens as t}{#if t.kind === 'particle'}<mark class="p" lang="ja">{t.text}</mark>{:else if t.kind === 'slot'}<span class="slot">{t.text}</span>{:else if t.ja}<span lang="ja">{t.text}</span>{:else}{t.text}{/if}{/each}
