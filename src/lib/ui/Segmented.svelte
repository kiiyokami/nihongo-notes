<script lang="ts" generics="T extends string">
	let {
		legend,
		name,
		options,
		value = $bindable(),
		onchange
	}: { legend: string; name: string; options: { value: T; label: string; lang?: string }[]; value: T; onchange?: (v: T) => void } = $props();
</script>

<fieldset>
	<legend>{legend}</legend>
	<div class="opts">
		{#each options as o (o.value)}
			<label>
				<input
					type="radio"
					{name}
					value={o.value}
					checked={value === o.value}
					onchange={() => {
						value = o.value;
						onchange?.(o.value);
					}}
				/>
				<span lang={o.lang}>{o.label}</span>
			</label>
		{/each}
	</div>
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
	.opts {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	label {
		position: relative;
	}
	input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		opacity: 0;
		cursor: pointer;
	}
	span {
		display: flex;
		align-items: center;
		min-height: 44px;
		padding: 4px 14px;
		border: 1px solid var(--ink);
	}
	input:checked + span {
		background: var(--ink);
		color: var(--paper);
		font-weight: 700;
	}
	input:focus-visible + span {
		outline: 3px solid var(--ink);
		outline-offset: 3px;
	}
</style>
