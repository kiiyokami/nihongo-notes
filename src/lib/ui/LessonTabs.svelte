<script lang="ts">
	import { lessons } from '$lib/content';
	import { blockOf } from '$lib/study/blocks';

	let { current }: { current: number } = $props();
	let row = $state<HTMLElement>();

	// on a phone the tabs are one scrolling row, so bring the current lesson into view
	$effect(() => {
		current;
		const tab = row?.querySelector<HTMLElement>('[aria-current="page"]');
		if (row && tab && row.scrollWidth > row.clientWidth) row.scrollLeft = tab.offsetLeft - row.clientWidth / 2 + tab.offsetWidth / 2;
	});
</script>

<nav class="index-tabs" aria-label="Lessons">
	<ol bind:this={row}>
		{#each lessons as l (l.n)}
			<li class="b-{blockOf(l.n)}">
				<a href="/lessons/{l.n}/" aria-current={l.n === current ? 'page' : undefined} title={l.title}
					><span class="sr">{'Lesson '}</span>{l.n}<span class="sr">: {l.title}</span></a
				>
			</li>
		{/each}
	</ol>
</nav>

<style>
	ol {
		position: relative;
		list-style: none;
		margin: 0;
		padding: 0 0 6px;
		display: flex;
		gap: 4px;
		overflow-x: auto;
		scrollbar-width: thin;
		scrollbar-color: var(--line) transparent;
	}
	a {
		display: grid;
		place-items: center;
		min-width: 44px;
		min-height: 44px;
		background: var(--tint);
		color: var(--ink);
		font-weight: 700;
		text-decoration: none;
		border-radius: 6px 6px 0 0;
	}
	a:hover {
		text-decoration: underline;
	}
	a[aria-current='page'] {
		background: var(--red);
		color: var(--on-red);
	}
	/* on a computer they're index tabs down the notebook's right edge */
	@media (min-width: 1000px) {
		ol {
			flex-direction: column;
			overflow: visible;
			padding: 0;
		}
		a {
			min-width: 48px;
			border-radius: 0 6px 6px 0;
		}
		a[aria-current='page'] {
			min-width: 60px;
		}
	}
</style>
