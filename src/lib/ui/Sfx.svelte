<script lang="ts">
	let { kind }: { kind: 'right' | 'wrong' } = $props();
</script>

<span class="sfx" class:wrong={kind === 'wrong'} lang="ja" aria-hidden="true">{kind === 'right' ? 'ピンポーン' : 'ブブー'}</span>

<style>
	.sfx {
		display: inline-block;
		margin-left: auto;
		padding-left: 8px;
		font-family: var(--f-title);
		font-size: 1rem;
		white-space: nowrap;
		transform: rotate(6deg);
		animation: stamp 0.2s ease-out;
	}
	.wrong {
		transform: rotate(-6deg);
	}
	@keyframes stamp {
		from {
			transform: scale(1.6);
			opacity: 0;
		}
	}
</style>
