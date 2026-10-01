// Temporary: proves the converted files hold exactly what data.js held. Deleted with legacy/ in Task 19.
import { describe, it, expect } from 'vitest';
import { loadLegacy, toLesson } from '../../../scripts/migrate-content.mjs';
import { lessons, particles, qa, vocab } from './index';

const legacy = loadLegacy();

describe('content migration', () => {
	it('keeps the 12 lessons in order', () => {
		expect(lessons.map((l) => l.n)).toEqual(legacy.L.map((l: { n: number }) => l.n));
	});
	legacy.L.forEach((l: { n: number }, i: number) => {
		it(`lesson ${l.n} matches data.js`, () => expect(lessons[i]).toEqual(toLesson(l)));
	});
	it('keeps every word data.js counted', () => {
		const old = legacy.L.reduce((s: number, l: { vocab: unknown[] }) => s + l.vocab.length, 0);
		expect(vocab.length).toBe(old);
	});
	it('keeps every example sentence', () => {
		const count = (ps: { ex?: unknown[]; examples?: unknown[] }[]) => ps.reduce((s, p) => s + (p.ex ?? p.examples ?? []).length, 0);
		expect(lessons.reduce((s, l) => s + count(l.patterns), 0)).toBe(legacy.L.reduce((s: number, l: { p: { ex?: unknown[] }[] }) => s + count(l.p), 0));
	});
	it('keeps the number tables and their quiz lines', () => {
		const hours = lessons[3].patterns.find((p) => p.title === 'Hours')!.table!;
		expect(hours.rows[3]).toEqual(['4', 'よじ']);
		expect(hours.clock).toBe('h');
		const counters = lessons[10].patterns.find((p) => p.title === 'Counters')!.table!;
		expect(counters.quiz).toEqual(['# thing|# things', '# person|# people', '# flat thing|# flat things', '# machine|# machines']);
	});
	it('keeps particles and QA unchanged', () => {
		expect(particles).toEqual(legacy.PART);
		expect(qa).toEqual(legacy.QA);
	});
});
