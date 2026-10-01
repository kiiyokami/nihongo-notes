import type { Word } from '$lib/content/types';

export function filterWords(words: readonly Word[], query: string): Word[] {
	const q = query.trim().normalize('NFKC').toLowerCase();
	if (!q) return [...words];
	return words.filter(([jp, en]) => jp.normalize('NFKC').includes(q) || en.toLowerCase().includes(q));
}
