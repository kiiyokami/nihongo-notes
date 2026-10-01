import { describe, it, expect } from 'vitest';
import { shuffle, seeded } from './random';

describe('shuffle', () => {
	it('returns a new array with the same items', () => {
		const a = [1, 2, 3, 4, 5];
		const b = shuffle(a, seeded(1));
		expect(b).not.toBe(a);
		expect([...b].sort()).toEqual(a);
		expect(a).toEqual([1, 2, 3, 4, 5]);
	});
	it('is repeatable with the same seed', () => {
		expect(shuffle([1, 2, 3, 4, 5, 6], seeded(7))).toEqual(shuffle([1, 2, 3, 4, 5, 6], seeded(7)));
	});
});

describe('seeded', () => {
	it('gives numbers in [0, 1)', () => {
		const r = seeded(42);
		for (let i = 0; i < 1000; i++) {
			const x = r();
			expect(x >= 0 && x < 1).toBe(true);
		}
	});
});
