import { describe, it, expect } from 'vitest';
import { buildDeck, putBack, roundResult, type Card } from './deck';
import { seeded } from './random';

const cards: Card[] = [
	{ jp: 'いきます', en: 'go', n: 5 },
	{ jp: 'きます', en: 'come', n: 5 },
	{ jp: 'たべます', en: 'eat', n: 6 },
	{ jp: 'のみます', en: 'drink', n: 6 },
	{ jp: 'みます', en: 'watch', n: 6 },
	{ jp: 'ききます', en: 'listen', n: 6 },
	{ jp: 'よみます', en: 'read', n: 6 }
];

describe('buildDeck', () => {
	it('keeps only the picked lessons', () => {
		expect(buildDeck(cards, new Set([5]), null, seeded(1)).map((c) => c.jp).sort()).toEqual(['いきます', 'きます']);
	});
	it('skips known words when asked', () => {
		expect(buildDeck(cards, new Set([5]), new Set(['いきます']), seeded(1)).map((c) => c.jp)).toEqual(['きます']);
	});
});

describe('putBack', () => {
	it('brings the card back 3 to 5 places later', () => {
		for (let s = 1; s <= 30; s++) {
			const out = putBack(cards, 0, seeded(s));
			expect(out.length).toBe(cards.length + 1);
			const again = out.indexOf(cards[0], 1);
			expect(again >= 3 && again <= 5).toBe(true);
		}
	});
	it('leaves the last card alone, since nothing comes after it', () => {
		expect(putBack(cards, cards.length - 1, seeded(1))).toEqual(cards);
	});
	it('does not change the deck it was given', () => {
		const copy = [...cards];
		putBack(cards, 1, seeded(2));
		expect(cards).toEqual(copy);
	});
});

describe('roundResult', () => {
	it('counts each word once, even if it came back', () => {
		const deck = [...cards.slice(0, 3), cards[0]];
		expect(roundResult(deck, new Set(['いきます', 'たべます']))).toEqual({ known: 2, total: 3 });
	});
});
