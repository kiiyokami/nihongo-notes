import { describe, it, expect } from 'vitest';
import { filterWords } from './words';
import type { Word } from '$lib/content/types';

const words: Word[] = [['げつようび', 'Monday'], ['でんしゃ', 'train'], ['ロシア', 'Russia']];

describe('filterWords', () => {
	it('returns everything for an empty filter', () => {
		expect(filterWords(words, '  ')).toEqual(words);
	});
	it('matches English without caring about case', () => {
		expect(filterWords(words, 'DAY')).toEqual([['げつようび', 'Monday']]);
	});
	it('matches kana, including half-width katakana typed by some keyboards', () => {
		expect(filterWords(words, 'でんしゃ')).toEqual([['でんしゃ', 'train']]);
		expect(filterWords(words, 'ﾛｼｱ')).toEqual([['ロシア', 'Russia']]);
	});
	it('returns nothing when nothing matches', () => {
		expect(filterWords(words, 'zzz')).toEqual([]);
	});
});
