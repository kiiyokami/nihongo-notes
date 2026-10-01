import { describe, it, expect } from 'vitest';
import { findJapaneseVoice } from './voice';

describe('findJapaneseVoice', () => {
	it('prefers ja-JP', () => {
		const v = [{ lang: 'en-US', name: 'A' }, { lang: 'ja', name: 'B' }, { lang: 'ja-JP', name: 'C' }];
		expect(findJapaneseVoice(v)?.name).toBe('C');
	});
	it('accepts other spellings of Japanese', () => {
		expect(findJapaneseVoice([{ lang: 'ja_JP', name: 'D' }])?.name).toBe('D');
		expect(findJapaneseVoice([{ lang: 'JA', name: 'E' }])?.name).toBe('E');
	});
	it('finds nothing on a device without a Japanese voice', () => {
		expect(findJapaneseVoice([{ lang: 'en-GB', name: 'F' }])).toBeUndefined();
		expect(findJapaneseVoice([])).toBeUndefined();
	});
});
