// Spaced repetition with six boxes: each right answer moves a word up a box and waits longer
// before it comes back; a wrong answer sends it back to box 1, due tomorrow.
import type { VocabItem } from '$lib/content';

// days to wait after a right answer, by the box the word lands in (index 0 is unused)
export const GAPS = [0, 1, 3, 7, 14, 30, 60] as const;
const TOP = GAPS.length - 1;
const MAX_CARDS = 20;
const MAX_NEW = 10;

// [box, the day it is due]
export type Due = [number, number];
export type Schedule = Record<string, Due>;

// local calendar days since 1970-01-01, so "today" turns over at the learner's midnight
export function dayNumber(d: Date = new Date()): number {
	return Math.floor((d.getTime() - d.getTimezoneOffset() * 60_000) / 86_400_000);
}

export function grade(rec: Due | undefined, ok: boolean, today: number): Due {
	if (!ok) return [1, today + 1];
	// right again before it was due (or after missing it earlier today): it keeps its place
	if (rec && rec[1] > today) return rec;
	// a word you knew the first time you saw it skips box 1
	const box = rec ? Math.min(TOP, rec[0] + 1) : 2;
	return [box, today + GAPS[box]];
}

export function reviewDeck(words: readonly VocabItem[], schedule: Schedule, known: ReadonlySet<string>, lastLesson: number, today: number) {
	const seen = new Set<string>();
	const once = words.filter((w) => (seen.has(w.jp) ? false : (seen.add(w.jp), true)));
	const due = once
		.filter((w) => schedule[w.jp] && schedule[w.jp][1] <= today)
		.sort((a, b) => schedule[a.jp][1] - schedule[b.jp][1] || schedule[a.jp][0] - schedule[b.jp][0])
		.slice(0, MAX_CARDS);
	const fresh = once
		.filter((w) => w.n <= lastLesson && !schedule[w.jp] && !known.has(w.jp))
		.sort((a, b) => a.n - b.n)
		.slice(0, Math.min(MAX_NEW, MAX_CARDS - due.length));
	return { due, fresh, cards: [...due, ...fresh] };
}
