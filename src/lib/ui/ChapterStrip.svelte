<script lang="ts">
	import { lessons } from '$lib/content';
	let { current }: { current: number } = $props();
</script>

<nav class="strip" aria-label="Lessons">
	<ol>
		{#each lessons as l (l.n)}
			<li>
				<a href="/lessons/{l.n}/" aria-current={l.n === current ? 'page' : undefined} title={l.title}>
					<span class="sr">{'Lesson '}</span>{String(l.n).padStart(2, '0')}<span class="sr">: {l.title}</span>
				</a>
			</li>
		{/each}
	</ol>
</nav>

<style>
	ol {
		list-style: none;
		margin: 0 0 24px;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}
	a {
		display: grid;
		place-items: center;
		min-width: 44px;
		min-height: 44px;
		font-family: var(--f-title);
		text-decoration: none;
		color: var(--soft);
	}
	a:hover {
		color: var(--ink);
	}
	a[aria-current='page'] {
		background: var(--ink);
		color: var(--paper);
	}
</style>
