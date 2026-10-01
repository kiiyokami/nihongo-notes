// Permanent sanity checks on the notes, so a typo in a lesson file fails `npm test`.
import { describe, it, expect } from 'vitest';
import { lessons, particles, qa, getLesson } from './index';

const balanced = (s: string) =>
	s.split('[').length === s.split(']').length && s.split('{').length === s.split('}').length;

describe('lessons', () => {
	it('are numbered 1, 2, 3 … in order', () => {
		expect(lessons.map((l) => l.n)).toEqual(lessons.map((_, i) => i + 1));
	});
	for (const l of lessons) {
		describe(`lesson ${l.n}`, () => {
			it('has a title, a goal, patterns and words', () => {
				expect(l.title && l.goal).toBeTruthy();
				expect(l.patterns.length).toBeGreaterThan(0);
				expect(l.words.length).toBeGreaterThan(0);
			});
			// Each check collects problems and asserts the list is empty, so lessons without
			// tables or notes still make one assertion (the scaffold sets requireAssertions).
			it('has balanced [particle] and {slot} marks', () => {
				const bad = l.patterns.flatMap((p) => [p.formula, p.note ?? '', ...(p.examples ?? []).map((e) => e[0])]).filter((s) => !balanced(s));
				expect(bad).toEqual([]);
			});
			it('has examples with both sides filled in', () => {
				const bad = l.patterns.flatMap((p) => (p.examples ?? []).filter(([jp, en]) => !jp || !en).map(([jp]) => `${p.title}: ${jp}`));
				expect(bad).toEqual([]);
			});
			it('has tables whose rows and quiz lines fit the header', () => {
				const bad: string[] = [];
				for (const p of l.patterns) {
					if (!p.table) continue;
					for (const r of p.table.rows) if (r.length !== p.table.head.length) bad.push(`${p.title}: row ${r[0]}`);
					if (p.table.quiz && p.table.quiz.length !== p.table.head.length - 1) bad.push(`${p.title}: quiz line`);
				}
				expect(bad).toEqual([]);
			});
			it('has words with Japanese and English and no leftover separators', () => {
				const bad = l.words.filter(([jp, en]) => !jp || !en || /[=;]/.test(jp + en)).map(([jp, en]) => `${jp}=${en}`);
				expect(bad).toEqual([]);
			});
		});
	}
});

describe('particle questions', () => {
	it('each has one gap and the answer among its choices', () => {
		const bad = particles.filter(([s, ans, choices]) => s.split('＿').length !== 2 || !choices.includes(ans)).map(([s]) => s);
		expect(bad).toEqual([]);
	});
});

describe('question-and-answer pairs', () => {
	it('point at real lessons and read as a question and an answer', () => {
		const bad = qa.filter(([n, q, a, en]) => !getLesson(n) || !q.endsWith('？') || !a.endsWith('。') || !en).map(([, q]) => q);
		expect(bad).toEqual([]);
	});
});
