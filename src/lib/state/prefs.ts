// Saved settings are checked on the way in, so an old or damaged value falls back to the default.
import type { QuizType, InputMode } from '$lib/study/quiz';

export type Theme = 'light' | 'dark' | null;
export interface QuizPrefs {
	type: QuizType;
	input: InputMode;
	lessons: number[];
}
export interface CardPrefs {
	dir: 'jp' | 'en';
	skipKnown: boolean;
	lessons: number[];
}

const TYPES: readonly string[] = ['vocab', 'rev', 'part', 'num', 'sent', 'qa'];
const obj = (v: unknown) => (v && typeof v === 'object' ? (v as Record<string, unknown>) : {});

export function cleanTheme(v: unknown): Theme {
	return v === 'light' || v === 'dark' ? v : null;
}

export function cleanKnown(v: unknown): string[] {
	return Array.isArray(v) ? [...new Set(v.filter((x): x is string => typeof x === 'string' && x.length > 0))] : [];
}

export function cleanLesson(v: unknown, valid: readonly number[]): number {
	return typeof v === 'number' && valid.includes(v) ? v : valid[0];
}

function cleanLessons(v: unknown, valid: readonly number[]): number[] {
	return Array.isArray(v) ? [...new Set(v.filter((n): n is number => typeof n === 'number' && valid.includes(n)))].sort((a, b) => a - b) : [];
}

export function cleanQuiz(v: unknown, valid: readonly number[]): QuizPrefs {
	const o = obj(v);
	return {
		type: TYPES.includes(o.type as string) ? (o.type as QuizType) : 'vocab',
		input: o.input === 'typing' ? 'typing' : 'tiles',
		lessons: cleanLessons(o.lessons, valid)
	};
}

export function cleanCards(v: unknown, valid: readonly number[]): CardPrefs {
	const o = obj(v);
	return { dir: o.dir === 'en' ? 'en' : 'jp', skipKnown: o.skipKnown === true, lessons: cleanLessons(o.lessons, valid) };
}
