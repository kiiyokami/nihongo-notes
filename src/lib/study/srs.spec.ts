import { describe, it, expect } from 'vitest';
import { dayNumber, grade, reviewDeck, GAPS, type Schedule } from './srs';
import type { VocabItem } from '$lib/content';

describe('dayNumber', () => {
	it('counts local calendar days, so late evening and early morning are different days', () => {
		const evening = new Date(2026, 9, 3, 23, 59);
		const morning = new Date(2026, 9, 4, 0, 1);
		expect(dayNumber(morning) - dayNumber(evening)).toBe(1);
	});
	it('is the same all day long', () => {
		expect(dayNumber(new Date(2026, 9, 3, 0, 0))).toBe(dayNumber(new Date(2026, 9, 3, 23, 59)));
	});
});

describe('grade', () => {
	const today = 1000;
	it('a brand-new word you know starts in box 2', () => {
		expect(grade(undefined, true, today)).toEqual([2, today + GAPS[2]]);
	});
	it('a right answer moves up one box and waits longer', () => {
		expect(grade([2, today], true, today)).toEqual([3, today + 7]);
		expect(grade([4, today], true, today)).toEqual([5, today + 30]);
	});
	it('stays in the top box', () => {
		expect(grade([6, today], true, today)).toEqual([6, today + 60]);
	});
	it('getting it right before it is due changes nothing, so a word missed earlier today stays in box 1', () => {
		expect(grade([1, today + 1], true, today)).toEqual([1, today + 1]);
		expect(grade([3, today + 5], true, today)).toEqual([3, today + 5]);
	});
	it('a wrong answer drops to box 1, back tomorrow', () => {
		expect(grade([5, today], false, today)).toEqual([1, today + 1]);
		expect(grade(undefined, false, today)).toEqual([1, today + 1]);
	});
});

describe('reviewDeck', () => {
	const today = 500;
	const words: VocabItem[] = [
		{ jp: 'わたし', en: 'I', n: 1 },
		{ jp: 'あなた', en: 'you', n: 1 },
		{ jp: 'ほん', en: 'book', n: 2 },
		{ jp: 'じしょ', en: 'dictionary', n: 2 },
		{ jp: 'いきます', en: 'go', n: 5 },
		{ jp: 'わたし', en: 'I (again)', n: 5 },
		{ jp: 'たべます', en: 'eat', n: 6 }
	];
	it('puts due words first, most overdue then lowest box, and leaves the rest alone', () => {
		const s: Schedule = { ほん: [3, today - 1], じしょ: [1, today - 1], いきます: [2, today - 5], あなた: [2, today + 1] };
		const d = reviewDeck(words, s, new Set(['わたし']), 5, today);
		expect(d.due.map((c) => c.jp)).toEqual(['いきます', 'じしょ', 'ほん']);
		expect(d.fresh).toEqual([]);
	});
	it('adds new words from lessons up to the last one opened, in lesson order, skipping known ones', () => {
		const d = reviewDeck(words, {}, new Set(['あなた']), 2, today);
		expect(d.fresh.map((c) => c.jp)).toEqual(['わたし', 'ほん', 'じしょ']);
	});
	it('shows a word once, even when two lessons have it', () => {
		const d = reviewDeck(words, {}, new Set(), 6, today);
		expect(d.fresh.filter((c) => c.jp === 'わたし')).toHaveLength(1);
	});
	it('caps new words at 10 and the deck at 20, due words first', () => {
		const many: VocabItem[] = Array.from({ length: 40 }, (_, i) => ({ jp: `w${i}`, en: `e${i}`, n: 1 }));
		const s: Schedule = Object.fromEntries(many.slice(0, 15).map((w) => [w.jp, [1, today] as [number, number]]));
		const d = reviewDeck(many, s, new Set(), 1, today);
		expect(d.due).toHaveLength(15);
		expect(d.fresh).toHaveLength(5);
		expect(d.cards).toEqual([...d.due, ...d.fresh]);
		const none = reviewDeck(many, {}, new Set(), 1, today);
		expect(none.fresh).toHaveLength(10);
	});
	it('is empty when nothing is due and every word is known or scheduled', () => {
		const d = reviewDeck(words.slice(0, 2), { わたし: [2, today + 3] }, new Set(['あなた']), 1, today);
		expect(d.cards).toEqual([]);
	});
});
