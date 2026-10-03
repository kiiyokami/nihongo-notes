<script lang="ts">
	// shown when a task from today's page is finished: the next one, or the page is done
	import { app } from '$lib/state/app.svelte';
	import { nextNow, taskLabel } from '$lib/state/today.svelte';
	import { taskHref } from '$lib/study/today';
	import Markup from './Markup.svelte';

	const next = $derived(nextNow());
</script>

<div class="today-next">
	{#if next}
		<p><span class="k">Next on today's page</span> <Markup text={taskLabel(next)} /></p>
		<a class="btn" href={taskHref(next, app.lastLesson)}>Go to {next === 'lesson' ? `lesson ${app.lastLesson}` : taskLabel(next).toLowerCase()}</a>
	{:else}
		<p><span class="k">Today's page</span> All done for today.</p>
		<a class="btn outline" href="/">Back to today</a>
	{/if}
</div>

<style>
	.today-next {
		margin-top: 20px;
		padding: 14px 16px;
		border: 1.5px dashed var(--soft);
		border-radius: 8px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 10px 16px;
	}
	p {
		margin: 0;
		font-family: var(--f-hand);
		font-weight: 600;
		font-size: 1.1rem;
	}
	.k {
		display: block;
		font-family: var(--f-ui);
		font-weight: 400;
		font-size: 0.85rem;
		color: var(--soft);
	}
</style>
