<script lang="ts">
	import { lessons } from '$lib/content';

	let { picked = $bindable(), current, onchange }: { picked: number[]; current: number; onchange?: () => void } = $props();
	let hint = $state('');
	const all = $derived(picked.length === lessons.length);

	function toggle(n: number, input: HTMLInputElement) {
		if (!input.checked && picked.length === 1) {
			input.checked = true;
			hint = 'Keep at least one lesson ticked.';
			return;
		}
		hint = '';
		picked = input.checked ? [...picked, n].sort((a, b) => a - b) : picked.filter((x) => x !== n);
		onchange?.();
	}
	function allOrOne() {
		hint = '';
		picked = all ? [current] : lessons.map((l) => l.n);
		onchange?.();
	}
</script>

<fieldset>
	<legend>Lessons</legend>
	<div class="ticks">
		{#each lessons as l (l.n)}
			<label class="tick" title={l.title}>
				<input type="checkbox" checked={picked.includes(l.n)} onchange={(e) => toggle(l.n, e.currentTarget)} />
				<span><span class="sr">{'Lesson '}</span>{l.n}</span>
			</label>
		{/each}
		<button type="button" class="all" onclick={allOrOne}>{all ? `Only lesson ${current}` : 'All lessons'}</button>
	</div>
	<p class="hint" aria-live="polite">{hint}</p>
</fieldset>

<style>
	fieldset {
		border: 0;
		margin: 0;
		padding: 0;
		min-width: 0;
	}
	legend {
		padding: 0;
		margin-bottom: 8px;
		font-weight: 700;
	}
	.ticks {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.tick {
		position: relative;
	}
	.tick input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		opacity: 0;
		cursor: pointer;
	}
	/* several lessons can be ticked at once, so a tick is a solid outline and bold number,
	   not a fill; unticked is dashed and soft */
	.tick > span {
		display: grid;
		place-items: center;
		min-width: 44px;
		min-height: 44px;
		border: 1px dashed var(--soft);
		color: var(--soft);
		font-variant-numeric: tabular-nums;
	}
	.tick input:checked + span {
		border: 2px solid var(--ink);
		color: var(--ink);
		font-weight: 900;
	}
	.tick input:focus-visible + span {
		outline: 3px solid var(--ink);
		outline-offset: 3px;
	}
	.all {
		min-height: 44px;
		padding: 4px 12px;
		background: none;
		border: 1px solid var(--ink);
		font-size: 0.9rem;
	}
</style>
