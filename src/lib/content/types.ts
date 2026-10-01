// Japanese text may use [は] to mark a particle and {Noun} for a slot the learner fills.
export type Example = [jp: string, en: string];
export type Word = [jp: string, en: string];

export interface Table {
	head: string[];
	rows: string[][];
	/** One English prompt per column after the first: "#" is the row's first cell, "one|many" picks by count. */
	quiz?: string[];
	/** Marks the hours ("h") and minutes ("m") tables that clock-time questions are built from. */
	clock?: 'h' | 'm';
}

export interface Pattern {
	title: string;
	formula: string;
	meaning: string;
	examples?: Example[];
	table?: Table;
	note?: string;
}

export interface Lesson {
	n: number;
	title: string;
	goal: string;
	patterns: Pattern[];
	words: Word[];
}

export type ParticleQuestion = [sentence: string, answer: string, choices: string[], en: string];
export type QAPair = [lesson: number, question: string, answer: string, en: string];
