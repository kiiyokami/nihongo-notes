import { error } from '@sveltejs/kit';
import { lessons, getLesson } from '$lib/content';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => lessons.map((l) => ({ n: String(l.n) }));

export const load: PageLoad = ({ params }) => {
	const lesson = getLesson(Number(params.n));
	if (!lesson) error(404, `There's no lesson ${params.n}.`);
	return { lesson };
};
