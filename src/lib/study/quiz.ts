import { lessons, vocab, particles, qa, type VocabItem } from '$lib/content';
import { shuffle, type Rng } from './random';
import { toTiles, tileSet } from './tiles';
import { sameAnswer } from './answers';
import { buildNums, numRound, numOptions } from './numbers';
import { lessonsText } from './text';

export type QuizType = 'vocab' | 'rev' | 'part' | 'num' | 'sent' | 'qa';
export type InputMode = 'tiles' | 'typing';

export const QUIZ_TYPES: { value: QuizType; label: string }[] = [
	{ value: 'vocab', label: 'Japanese to English' },
	{ value: 'rev', label: 'English to Japanese' },
	{ value: 'part', label: 'Particles' },
	{ value: 'num', label: 'Numbers' },
	{ value: 'sent', label: 'Build the sentence' },
	{ value: 'qa', label: 'Answer the question' }
];
export const usesInput = (t: QuizType) => t === 'num' || t === 'sent' || t === 'qa';
export const usesLessons = (t: QuizType) => t !== 'part';

export const TYPING_HINT = "Kana is fine. Spaces and punctuation don't matter.";
export const NUM_TYPING_HINT = "Write the reading in kana (よじ, not 4じ). Spaces don't matter.";

export interface Review {
	ja: string[];
	en: string;
}
interface Base {
	type: QuizType;
	prompt: string;
	promptJa: boolean;
	sub?: string;
	meta?: string;
	ans: string;
	alts?: string[];
	review: Review;
	hint?: string;
}
export interface ChoiceQuestion extends Base {
	mode: 'choice';
	options: string[];
	optionsJa: boolean;
}
export interface TilesQuestion extends Base {
	mode: 'tiles';
	tiles: string[];
}
export interface TypingQuestion extends Base {
	mode: 'typing';
}
export type Question = ChoiceQuestion | TilesQuestion | TypingQuestion;

const ROUND = 10;

// Example sentences long enough to build. "Same question, polite." lines aren't translations, so they're left out.
export const SENTENCES = lessons.flatMap((l) =>
	l.patterns.flatMap((p) =>
		(p.examples ?? [])
			.filter(([jp, en]) => /[。？]$/.test(jp) && !/^Same question/.test(en) && toTiles(jp).length >= 3)
			.map(([jp, en]) => ({ n: l.n, jp, en }))
	)
);
export const NUMS = buildNums(lessons);

function available(type: QuizType, picked: ReadonlySet<number>): number {
	if (type === 'part') return particles.length;
	if (type === 'num') return NUMS.filter((x) => picked.has(x.n)).length;
	if (type === 'sent') return SENTENCES.filter((s) => picked.has(s.n)).length;
	if (type === 'qa') return qa.filter((x) => picked.has(x[0])).length;
	return uniqueBy(vocab.filter((v) => picked.has(v.n)), (v) => (type === 'vocab' ? v.jp : v.en)).length;
}

export function startState(type: QuizType, picked: ReadonlySet<number>) {
	const total = available(type, picked);
	const ok = total >= (type === 'vocab' || type === 'rev' ? 2 : 1);
	const which = lessonsText(picked, lessons.length);
	const reason = ok
		? ''
		: type === 'qa'
			? `There are no question-and-answer pairs for ${which} yet. Add them to the list in src/lib/content/qa.ts.`
			: type === 'sent'
				? `There are no example sentences in ${which} yet.`
				: type === 'num'
					? `There are no number tables in ${which}. Numbers are in ${lessonsText(new Set(NUMS.map((x) => x.n)), lessons.length)}.`
					: `There aren't enough words in ${which} yet.`;
	return { size: Math.min(ROUND, total), ok, reason };
}

function uniqueBy<T>(items: readonly T[], key: (x: T) => string): T[] {
	const seen = new Set<string>();
	return items.filter((x) => (seen.has(key(x)) ? false : (seen.add(key(x)), true)));
}

function wordQuestion(type: 'vocab' | 'rev', v: VocabItem, pool: readonly VocabItem[], rng: Rng): ChoiceQuestion {
	const key = type === 'vocab' ? 'en' : 'jp';
	// wrong options must differ in both Japanese and English, or a question could have two right answers
	const others = [...new Set(shuffle(pool.filter((o) => o.jp !== v.jp && o.en !== v.en), rng).map((o) => o[key]))]
		.filter((o) => o !== v[key])
		.slice(0, 3);
	return {
		mode: 'choice',
		type,
		prompt: type === 'vocab' ? v.jp : v.en,
		promptJa: type === 'vocab',
		meta: `Lesson ${v.n}`,
		ans: v[key],
		options: shuffle([v[key], ...others], rng),
		optionsJa: key === 'jp',
		review: { ja: [v.jp], en: v.en }
	};
}

export function buildRound(type: QuizType, input: InputMode, picked: ReadonlySet<number>, rng: Rng = Math.random): Question[] {
	if (type === 'part') {
		return shuffle(particles, rng)
			.slice(0, ROUND)
			.map(([s, ans, choices, en]): Question => ({
				mode: 'choice',
				type,
				prompt: s,
				promptJa: true,
				sub: en,
				ans,
				options: shuffle(choices, rng),
				optionsJa: true,
				review: { ja: [s.replace('＿', `[${ans}]`)], en }
			}));
	}
	if (type === 'num') {
		return numRound(NUMS.filter((x) => picked.has(x.n)), rng).map((x): Question => {
			const base = { type, prompt: x.en, promptJa: false, meta: `Lesson ${x.n}`, ans: x.jp, alts: x.alts, review: { ja: [x.jp], en: x.en } };
			return input === 'typing'
				? { ...base, mode: 'typing', hint: NUM_TYPING_HINT }
				: { ...base, mode: 'choice', options: numOptions(x, NUMS, rng), optionsJa: true };
		});
	}
	if (type === 'sent' || type === 'qa') {
		const items =
			type === 'sent'
				? SENTENCES.filter((s) => picked.has(s.n)).map((s) => ({ n: s.n, ans: s.jp, prompt: s.en, promptJa: false, sub: undefined as string | undefined, review: { ja: [s.jp], en: s.en } }))
				: qa.filter(([n]) => picked.has(n)).map(([n, q, a, en]) => ({ n, ans: a, prompt: q, promptJa: true, sub: `Answer so it means “${en}”` as string | undefined, review: { ja: [q, a], en } }));
		return shuffle(items, rng)
			.slice(0, ROUND)
			.map(({ n, ...x }): Question =>
				input === 'typing'
					? { ...x, type, meta: `Lesson ${n}`, mode: 'typing', hint: TYPING_HINT }
					: { ...x, type, meta: `Lesson ${n}`, mode: 'tiles', tiles: tileSet(x.ans, rng) }
			);
	}
	const pool = vocab.filter((v) => picked.has(v.n));
	// a word in two lessons (やすみます) must not be asked twice in one round
	return uniqueBy(shuffle(pool, rng), (v) => (type === 'vocab' ? v.jp : v.en))
		.slice(0, ROUND)
		.map((v) => wordQuestion(type, v, pool, rng));
}

export function isRight(q: Question, given: string): boolean {
	return q.mode === 'choice' ? given === q.ans : sameAnswer(given, [q.ans, ...(q.alts ?? [])]);
}
