import { describe, it, expect } from 'vitest';
import { blockOf, BLOCKS } from './blocks';

describe('blockOf', () => {
	it('gives each run of five lessons its own washi colour', () => {
		expect([1, 5, 6, 10, 11, 14, 15, 16, 20, 21, 25].map(blockOf)).toEqual(['indigo', 'indigo', 'matcha', 'matcha', 'sakura', 'sakura', 'sakura', 'yamabuki', 'yamabuki', 'fuji', 'fuji']);
	});
	it('keeps any lesson after 25 in the last colour', () => {
		expect(blockOf(30)).toBe('fuji');
		expect(BLOCKS.length).toBe(5);
	});
});
