<script lang="ts">
	// The teacher's red pen: a circle (まる) for a right answer, a cross for a wrong one.
	let { kind }: { kind: 'right' | 'wrong' } = $props();
</script>

<svg class="mark {kind}" data-mark={kind} viewBox="0 0 48 48" aria-hidden="true">
	{#if kind === 'right'}
		<path d="M29 7C15 4 5 14 6 26c1 12 13 18 24 14 11-4 14-18 7-27-3-4-8-6-12-5" />
	{:else}
		<path d="M13 12 36 36M36 11 12 37" />
	{/if}
</svg>

<style>
	.mark {
		flex: none;
		width: 40px;
		height: 40px;
		margin-left: auto;
		fill: none;
		stroke: var(--red);
		stroke-width: 3.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-dasharray: 140;
		animation: draw 0.3s ease-out;
	}
	@keyframes draw {
		from {
			stroke-dashoffset: 140;
		}
	}
</style>
