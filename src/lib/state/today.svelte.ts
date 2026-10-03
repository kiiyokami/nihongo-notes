// Today's review deck and ticks, worked out from the saved state. Read inside $derived to stay live.
import { getLesson, vocab } from '$lib/content';
import { reviewDeck, dayNumber } from '$lib/study/srs';
import { todayTasks } from '$lib/study/days';
import { nextTask, type Task } from '$lib/study/today';
import { app } from './app.svelte';

export function reviewNow() {
	return reviewDeck(vocab, app.srs, new Set(app.known), app.lastLesson, dayNumber());
}

export function tasksNow() {
	return todayTasks(app.days, dayNumber(), reviewNow().cards.length);
}

export function nextNow(): Task | null {
	return nextTask(tasksNow());
}

export function taskLabel(task: Task): string {
	if (task === 'review') return 'Review cards';
	if (task === 'quiz') return 'Quick quiz';
	return `Lesson ${app.lastLesson}: ${getLesson(app.lastLesson)?.title ?? ''}`;
}
