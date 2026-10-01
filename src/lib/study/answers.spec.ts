import { describe, it, expect } from 'vitest';
import { norm, sameAnswer } from './answers';

describe('norm', () => {
	it('drops spaces, punctuation and particle brackets, and folds full-width forms', () => {
		expect(norm('６じに　おきます。')).toBe('6じにおきます');
		expect(norm('でんしゃ[で] いきます。')).toBe('でんしゃでいきます');
		expect(norm('「ありがとう」は？')).toBe('ありがとうは');
	});
});

describe('sameAnswer', () => {
	it('matches regardless of spacing and full-width digits', () => {
		expect(sameAnswer('６じに　おきます', '6じ[に] おきます。')).toBe(true);
	});
	it('accepts any of several right answers', () => {
		expect(sameAnswer('よじさんじゅっぷん', ['よじ はん', 'よじ さんじゅっぷん'])).toBe(true);
	});
	it('rejects digits where a reading is expected', () => {
		expect(sameAnswer('4じはん', ['よじ はん', 'よじ さんじゅっぷん'])).toBe(false);
	});
	it('rejects a wrong particle', () => {
		expect(sameAnswer('6じをおきます', '6じ[に] おきます。')).toBe(false);
	});
	it('never accepts an empty answer', () => {
		expect(sameAnswer('  。', '')).toBe(false);
	});
});
