import { describe, it, expect } from 'vitest';
import { lessons } from '$lib/content';
import { buildNums, numRound, numOptions, say } from './numbers';
import { seeded } from './random';

const NUMS = buildNums(lessons);
const find = (en: string) => NUMS.find((x) => x.en === en);

describe('say', () => {
	it('fills # and picks the singular side for 1', () => {
		expect(say('# person|# people', '1')).toBe('1 person');
		expect(say('# person|# people', '3')).toBe('3 people');
		expect(say('once|# times', '1')).toBe('once');
		expect(say('the #', '20th')).toBe('the 20th');
		expect(say("# o'clock", '4')).toBe("4 o'clock");
	});
});

describe('buildNums', () => {
	it('covers every kind of number in the notes', () => {
		const kinds = new Set(NUMS.map((x) => x.kind));
		for (const k of ['clock', 'Hours', 'Minutes', 'Months', 'Dates', 'What floor?', 'Counters', 'How long', 'How often']) expect(kinds.has(k), k).toBe(true);
	});
	it('builds clock readings, with はん and さんじゅっぷん both right at :30', () => {
		expect([find('4:30')?.jp, ...(find('4:30')?.alts ?? [])]).toEqual(['よじ はん', 'よじ さんじゅっぷん']);
		expect(find('9:15')?.jp).toBe('くじ じゅうごふん');
		expect(find('7:00')?.jp).toBe('しちじ');
		expect(find('12:05')?.jp).toBe('じゅうにじ ごふん');
	});
	it('reads naturally in English', () => {
		expect(find('1 person')?.jp).toBe('ひとり');
		expect(find('3 people')?.jp).toBe('さんにん');
		expect(find('once')?.jp).toBe('いっかい');
		expect(find('the 20th')?.jp).toBe('はつか');
		expect(find('April')?.jp).toBe('しがつ');
	});
	it('never lists the same English prompt twice', () => {
		expect(new Set(NUMS.map((x) => x.en)).size).toBe(NUMS.length);
	});
	it('skips the ? rows', () => {
		expect(NUMS.some((x) => x.en.includes('?'))).toBe(false);
	});
});

describe('rounds and options (40 rounds)', () => {
	it('mix kinds, never repeat a question, and never offer a second right answer', () => {
		const problems: string[] = [];
		const kinds = new Set<string>();
		for (let r = 1; r <= 40; r++) {
			const rng = seeded(r);
			const round = numRound(NUMS, rng);
			if (round.length !== 10) problems.push(`round ${r} has ${round.length}`);
			if (new Set(round.map((x) => x.en)).size !== round.length) problems.push(`round ${r} repeats`);
			for (const x of round) {
				kinds.add(x.kind);
				const opts = numOptions(x, NUMS, rng);
				if (opts.filter((o) => o === x.jp).length !== 1) problems.push(`answer not once: ${x.en}`);
				if (new Set(opts).size !== opts.length) problems.push(`duplicate option: ${x.en}`);
				if ((x.alts ?? []).some((a) => opts.includes(a))) problems.push(`second right answer: ${x.en}`);
				if (opts.length < 3) problems.push(`only ${opts.length} options: ${x.en}`);
			}
		}
		expect(problems).toEqual([]);
		expect(kinds.size).toBeGreaterThanOrEqual(6);
	});
	it('only uses the lessons in the pool', () => {
		const pool = NUMS.filter((x) => x.n === 11);
		expect(numRound(pool, seeded(3)).every((x) => x.n === 11)).toBe(true);
	});
});
