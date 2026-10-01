import { describe, it, expect } from 'vitest';
import { createStorage } from './storage';

function memory(): Storage {
	const m = new Map<string, string>();
	return {
		getItem: (k: string) => m.get(k) ?? null,
		setItem: (k: string, v: string) => void m.set(k, v),
		removeItem: (k: string) => void m.delete(k),
		clear: () => m.clear(),
		key: () => null,
		get length() {
			return m.size;
		}
	};
}

function blocked(): Storage {
	const no = () => {
		throw new DOMException('blocked', 'SecurityError');
	};
	return { ...memory(), getItem: no, setItem: no };
}

describe('createStorage', () => {
	it('saves and reads JSON under the nn. prefix', () => {
		const backend = memory();
		const s = createStorage(backend);
		s.set('known', ['いきます']);
		expect(backend.getItem('nn.known')).toBe('["いきます"]');
		expect(s.get('known', [])).toEqual(['いきます']);
		expect(s.ok).toBe(true);
	});
	it('returns the fallback for missing keys and broken JSON', () => {
		const backend = memory();
		backend.setItem('nn.quiz', '{not json');
		const s = createStorage(backend);
		expect(s.get('theme', null)).toBe(null);
		expect(s.get('quiz', 'fallback')).toBe('fallback');
	});
	it('reports blocked storage and never throws', () => {
		const s = createStorage(blocked());
		expect(s.ok).toBe(false);
		expect(() => s.set('theme', 'dark')).not.toThrow();
		expect(s.get('theme', null)).toBe(null);
	});
	it('works with no storage at all (pre-rendering)', () => {
		const s = createStorage(null);
		expect(s.ok).toBe(false);
		expect(s.get('x', 1)).toBe(1);
	});
});
