import { describe, it, expect } from 'vitest';
import { nextTask, taskHref, recentLessons } from './today';

describe('nextTask', () => {
	it('goes through review, lesson, quiz in order, skipping what is done', () => {
		expect(nextTask({ review: false, lesson: false, quiz: false })).toBe('review');
		expect(nextTask({ review: true, lesson: false, quiz: false })).toBe('lesson');
		expect(nextTask({ review: true, lesson: true, quiz: false })).toBe('quiz');
		expect(nextTask({ review: false, lesson: true, quiz: true })).toBe('review');
	});
	it('is null when the page is done', () => {
		expect(nextTask({ review: true, lesson: true, quiz: true })).toBe(null);
	});
});

describe('taskHref', () => {
	it('links each task to its place, marked as part of today', () => {
		expect(taskHref('review', 14)).toBe('/flashcards/?review');
		expect(taskHref('lesson', 14)).toBe('/lessons/14/?today');
		expect(taskHref('quiz', 14)).toBe('/quiz/?today');
		expect(taskHref(null, 14)).toBe('/');
	});
});

describe('recentLessons', () => {
	it('is the last lesson opened and the two before it', () => {
		expect(recentLessons(14)).toEqual([12, 13, 14]);
		expect(recentLessons(2)).toEqual([1, 2]);
		expect(recentLessons(1)).toEqual([1]);
	});
});
