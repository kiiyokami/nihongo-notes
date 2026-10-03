// Today's page: three tasks, done in order. Each links to its place with a flag, so that place
// can offer "Next on today's page" when it is finished.
export type Task = 'review' | 'lesson' | 'quiz';
export type Tasks = Record<Task, boolean>;
export const TASKS: readonly Task[] = ['review', 'lesson', 'quiz'];

export function nextTask(done: Tasks): Task | null {
	return TASKS.find((t) => !done[t]) ?? null;
}

export function taskHref(task: Task | null, lastLesson: number): string {
	if (task === 'review') return '/flashcards/?review';
	if (task === 'lesson') return `/lessons/${lastLesson}/?today`;
	if (task === 'quiz') return '/quiz/?today';
	return '/';
}

// the quick quiz covers the last lesson opened and the two before it
export function recentLessons(last: number): number[] {
	return Array.from({ length: Math.min(3, last) }, (_, i) => last - Math.min(3, last) + 1 + i);
}
