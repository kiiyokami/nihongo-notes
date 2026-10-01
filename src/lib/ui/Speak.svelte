<script lang="ts">
	import { speech, toggleSpeak } from '$lib/speech/speech.svelte';
	import { speechText } from '$lib/study/markup';

	let { text }: { text: string } = $props();
	const plain = $derived(speechText(text));
	const playing = $derived(speech.current === plain);
</script>

{#if speech.voiceReady && plain}
	<button type="button" class="speak" onclick={() => toggleSpeak(plain)} aria-label={playing ? 'Stop' : `Play ${plain}`} aria-pressed={playing}>
		<span aria-hidden="true">{playing ? '■' : '▶'}</span>
	</button>
{/if}

<style>
	.speak {
		flex: none;
		width: 44px;
		height: 44px;
		display: inline-grid;
		place-items: center;
		background: none;
		border: 1px solid var(--ink);
		border-radius: 50%;
		font-size: 0.85rem;
	}
	.speak[aria-pressed='true'] {
		background: var(--ink);
		color: var(--paper);
	}
</style>
