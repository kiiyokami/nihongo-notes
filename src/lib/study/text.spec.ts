import { describe, it, expect } from 'vitest';
import { lessonsText } from './text';

describe('lessonsText', () => {
	it('names one lesson, several, or all', () => {
		expect(lessonsText([3], 12)).toBe('lesson 3');
		expect(lessonsText([5, 1, 2], 12)).toBe('lessons 1, 2 and 5');
		expect(lessonsText([1, 2, 3], 3)).toBe('all lessons');
	});
	it('says so when nothing is picked', () => {
		expect(lessonsText([], 12)).toBe('no lessons');
	});
});
