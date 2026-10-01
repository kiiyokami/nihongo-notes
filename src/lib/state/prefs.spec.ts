import { describe, it, expect } from 'vitest';
import { cleanTheme, cleanKnown, cleanLesson, cleanQuiz, cleanCards } from './prefs';

const valid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

describe('old or corrupted settings fall back to defaults', () => {
	it('theme', () => {
		expect(cleanTheme('dark')).toBe('dark');
		expect(cleanTheme('purple')).toBe(null);
		expect(cleanTheme(3)).toBe(null);
	});
	it('known words', () => {
		expect(cleanKnown(['a', 'a', '', 4, null, 'b'])).toEqual(['a', 'b']);
		expect(cleanKnown('a,b')).toEqual([]);
	});
	it('last lesson', () => {
		expect(cleanLesson(7, valid)).toBe(7);
		expect(cleanLesson(99, valid)).toBe(1);
		expect(cleanLesson('7', valid)).toBe(1);
	});
	it('quiz settings', () => {
		expect(cleanQuiz({ type: 'num', input: 'typing', lessons: [4, 4, 99, 'x', 3] }, valid)).toEqual({ type: 'num', input: 'typing', lessons: [3, 4] });
		expect(cleanQuiz({ type: 'foo', input: 'voice' }, valid)).toEqual({ type: 'vocab', input: 'tiles', lessons: [] });
		expect(cleanQuiz('nonsense', valid)).toEqual({ type: 'vocab', input: 'tiles', lessons: [] });
	});
	it('flashcard settings', () => {
		expect(cleanCards({ dir: 'en', skipKnown: true, lessons: [2] }, valid)).toEqual({ dir: 'en', skipKnown: true, lessons: [2] });
		expect(cleanCards({ dir: 'up', skipKnown: 'yes', lessons: 'all' }, valid)).toEqual({ dir: 'jp', skipKnown: false, lessons: [] });
	});
});
