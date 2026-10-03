import { describe, it, expect } from 'vitest';
import { blockOf, blockProgress, BLOCKS } from './blocks';

describe('blockOf', () => {
	it('gives each run of five lessons its own washi colour', () => {
		expect([1, 5, 6, 10, 11, 14, 15, 16, 20, 21, 25].map(blockOf)).toEqual(['indigo', 'indigo', 'matcha', 'matcha', 'sakura', 'sakura', 'sakura', 'yamabuki', 'yamabuki', 'fuji', 'fuji']);
	});
	it('keeps any lesson after 25 in the last colour', () => {
		expect(blockOf(30)).toBe('fuji');
		expect(BLOCKS.length).toBe(5);
	});
});

describe('blockProgress', () => {
	const words = [
		{ jp: 'わたし', en: 'I', n: 1 },
		{ jp: 'ほん', en: 'book', n: 3 },
		{ jp: 'いきます', en: 'go', n: 5 },
		{ jp: 'たべます', en: 'eat', n: 6 },
		{ jp: 'わたし', en: 'I', n: 7 }
	];
	it('counts known words in each block of five lessons, each word once per block', () => {
		const p = blockProgress(words, new Set(['わたし', 'ほん']), 10);
		expect(p).toEqual([
			{ block: 'indigo', first: 1, last: 5, known: 2, total: 3 },
			{ block: 'matcha', first: 6, last: 10, known: 1, total: 2 }
		]);
	});
	it('stops at the last lesson in the book', () => {
		expect(blockProgress(words, new Set(), 25).map((b) => b.last)).toEqual([5, 10, 15, 20, 25]);
	});
});
