import { describe, it, expect } from 'vitest';
import { lessons, vocab, qa } from '$lib/content';
import { buildRound, isRight, startState, SENTENCES, QUIZ_TYPES, type Question, type QuizType } from './quiz';
import { toTiles } from './tiles';
import { seeded } from './random';

const all = new Set(lessons.map((l) => l.n));
const types = QUIZ_TYPES.map((t) => t.value);

function rounds(type: QuizType, input: 'tiles' | 'typing', picked = all, n = 40): Question[][] {
	return Array.from({ length: n }, (_, i) => buildRound(type, input, picked, seeded(i + 1)));
}

describe('every type', () => {
	it('builds rounds of the size startState promises, without repeating a prompt', () => {
		const problems: string[] = [];
		for (const type of types) {
			const size = startState(type, all).size;
			for (const r of rounds(type, 'tiles')) {
				if (r.length !== size) problems.push(`${type}: ${r.length} not ${size}`);
				if (new Set(r.map((q) => q.prompt)).size !== r.length) problems.push(`${type}: repeated prompt`);
			}
		}
		expect(problems).toEqual([]);
	});
});

describe('choice questions', () => {
	it('show the answer once, no duplicates, and never a second right answer', () => {
		const problems: string[] = [];
		for (const type of ['vocab', 'rev', 'part', 'num'] as QuizType[]) {
			for (const q of rounds(type, 'tiles').flat()) {
				if (q.mode !== 'choice') {
					problems.push(`${type}: not a choice question`);
					continue;
				}
				if (q.options.filter((o) => o === q.ans).length !== 1) problems.push(`${type} ${q.prompt}: answer not once`);
				if (new Set(q.options).size !== q.options.length) problems.push(`${type} ${q.prompt}: duplicate option`);
				if ((q.alts ?? []).some((a) => q.options.includes(a))) problems.push(`${type} ${q.prompt}: alt offered`);
				if (q.options.length < 2) problems.push(`${type} ${q.prompt}: too few options`);
			}
		}
		expect(problems).toEqual([]);
	});
	it('never offers another meaning of the same Japanese word as a wrong option', () => {
		// やすみます is "rest" in lesson 4 and "take a day off" in lesson 11
		const problems: string[] = [];
		for (const q of rounds('vocab', 'tiles').flat()) {
			if (q.mode !== 'choice') continue;
			const meanings = vocab.filter((v) => v.jp === q.prompt).map((v) => v.en);
			for (const o of q.options) if (o !== q.ans && meanings.includes(o)) problems.push(`${q.prompt}: ${o}`);
		}
		expect(problems).toEqual([]);
	});
	it('mark only the right option as right', () => {
		const q = buildRound('vocab', 'tiles', all, seeded(5))[0];
		expect(q.mode).toBe('choice');
		if (q.mode !== 'choice') return;
		for (const o of q.options) expect(isRight(q, o)).toBe(o === q.ans);
	});
});

describe('particles', () => {
	it('show the sentence with a gap and review it with the particle filled in', () => {
		const q = buildRound('part', 'tiles', all, seeded(2))[0];
		expect(q.prompt.split('＿').length).toBe(2);
		expect(q.review.ja[0]).toBe(q.prompt.replace('＿', `[${q.ans}]`));
	});
});

describe('sentence building', () => {
	it('uses example sentences of three or more tiles that have a real translation', () => {
		expect(SENTENCES.length).toBeGreaterThan(80);
		expect(SENTENCES.filter((s) => /^Same question/.test(s.en) || toTiles(s.jp).length < 3)).toEqual([]);
	});
	it('accepts the tiles in order and rejects them reversed', () => {
		const q = buildRound('sent', 'tiles', all, seeded(9))[0];
		expect(q.mode).toBe('tiles');
		const words = toTiles(q.ans);
		expect(isRight(q, words.join(''))).toBe(true);
		expect(isRight(q, [...words].reverse().join(''))).toBe(false);
	});
	it('every QA answer has at least two tiles', () => {
		expect(qa.filter(([, , a]) => toTiles(a).length < 2)).toEqual([]);
	});
	it('QA prompts are the Japanese question with the English of the answer underneath', () => {
		const q = buildRound('qa', 'tiles', all, seeded(4))[0];
		expect(q.promptJa).toBe(true);
		expect(q.sub).toMatch(/^Answer so it means “.+”$/);
		expect(q.review.ja.length).toBe(2);
	});
	it('typing mode accepts a typed answer with no spaces', () => {
		const q = buildRound('sent', 'typing', all, seeded(3))[0];
		expect(q.mode).toBe('typing');
		expect(isRight(q, q.ans.replace(/[[\]\s。？]/g, ''))).toBe(true);
	});
});

describe('numbers', () => {
	it('typing accepts さんじゅっぷん for :30 and refuses digits', () => {
		const picked = new Set([4]);
		const qs = Array.from({ length: 30 }, (_, i) => buildRound('num', 'typing', picked, seeded(i + 1))).flat();
		const half = qs.find((q) => q.prompt.endsWith(':30'));
		expect(half).toBeDefined();
		expect(isRight(half!, half!.alts![0])).toBe(true);
		expect(isRight(half!, half!.prompt.replace(':30', 'じはん'))).toBe(false);
	});
});

describe('startState', () => {
	it('explains why there is nothing to ask', () => {
		const s = startState('num', new Set([1]));
		expect(s.ok).toBe(false);
		expect(s.reason).toBe('There are no number tables in lesson 1. Numbers are in lessons 3, 4, 5 and 11.');
	});
	it('offers fewer than 10 when that is all there is', () => {
		expect(startState('qa', new Set([9]))).toEqual({ size: 1, ok: true, reason: '' });
	});
	it('needs two words for meaning questions', () => {
		expect(startState('vocab', all).ok).toBe(true);
	});
});
