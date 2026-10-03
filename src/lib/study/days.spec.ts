import { describe, it, expect } from 'vitest';
import { logDay, streak, weekOf, todayTasks, KEEP_DAYS, type Days } from './days';
import { dayNumber } from './srs';

describe('logDay', () => {
	it('adds a kind once', () => {
		const d = logDay(logDay({}, 100, 'quiz'), 100, 'quiz');
		expect(d).toEqual({ 100: ['quiz'] });
	});
	it('keeps other days and kinds', () => {
		expect(logDay({ 99: ['cards'], 100: ['lesson'] }, 100, 'quiz')).toEqual({ 99: ['cards'], 100: ['lesson', 'quiz'] });
	});
	it(`forgets days more than ${KEEP_DAYS} days old`, () => {
		const d = logDay({ 10: ['quiz'], 100: ['quiz'] }, 100 + KEEP_DAYS - 1, 'cards');
		expect(Object.keys(d).map(Number)).toEqual([100, 100 + KEEP_DAYS - 1]);
	});
	it('does not change the log it was given', () => {
		const days: Days = { 100: ['lesson'] };
		logDay(days, 100, 'quiz');
		expect(days).toEqual({ 100: ['lesson'] });
	});
});

describe('streak', () => {
	it('counts days in a row ending today', () => {
		expect(streak({ 98: ['quiz'], 99: ['cards'], 100: ['lesson'] }, 100)).toBe(3);
	});
	it('still counts when today is not done yet', () => {
		expect(streak({ 98: ['quiz'], 99: ['cards'] }, 100)).toBe(2);
	});
	it('a missed day breaks it', () => {
		expect(streak({ 97: ['quiz'], 99: ['cards'], 100: ['quiz'] }, 100)).toBe(2);
		expect(streak({ 97: ['quiz'] }, 100)).toBe(0);
	});
});

describe('weekOf', () => {
	it('runs Monday to Sunday and marks studied days and today', () => {
		const sat = dayNumber(new Date(2026, 9, 3, 12));
		const mon = sat - 5;
		const week = weekOf({ [mon]: ['quiz'], [sat]: ['cards'] }, sat);
		expect(week.map((d) => d.label)).toEqual(['月', '火', '水', '木', '金', '土', '日']);
		expect(week.map((d) => d.done)).toEqual([true, false, false, false, false, true, false]);
		expect(week.findIndex((d) => d.today)).toBe(5);
		expect(week[0].name).toBe('Monday');
	});
	it('starts a new week on Monday', () => {
		const sun = dayNumber(new Date(2026, 9, 4, 12));
		expect(weekOf({}, sun).findIndex((d) => d.today)).toBe(6);
		expect(weekOf({}, sun + 1).findIndex((d) => d.today)).toBe(0);
	});
});

describe('todayTasks', () => {
	it('ticks off what the log says was done today', () => {
		expect(todayTasks({ 100: ['lesson', 'cards'] }, 100, 5)).toEqual({ review: false, lesson: true, quiz: false });
		expect(todayTasks({ 100: ['review', 'quiz'] }, 100, 5)).toEqual({ review: true, lesson: false, quiz: true });
	});
	it('the review counts as done when there is nothing to review', () => {
		expect(todayTasks({}, 100, 0).review).toBe(true);
	});
	it('yesterday does not count', () => {
		expect(todayTasks({ 99: ['review', 'lesson', 'quiz'] }, 100, 5)).toEqual({ review: false, lesson: false, quiz: false });
	});
});
