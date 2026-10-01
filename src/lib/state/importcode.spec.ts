import { describe, it, expect } from 'vitest';
import { decodeImport, mergeKnown } from './importcode';

// what the old site's exportCode() produces
const encode = (o: unknown) => btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(o))));

describe('decodeImport', () => {
	it('reads a code from the old site, Japanese included', () => {
		expect(decodeImport(encode({ v: 1, known: ['いきます', 'でんしゃ'], lesson: 5 }))).toEqual({ ok: true, known: ['いきます', 'でんしゃ'], lesson: 5 });
	});
	it('still reads a code pasted with line breaks and spaces', () => {
		const code = encode({ v: 1, known: ['いきます'], lesson: 2 });
		const wrapped = ' ' + code.slice(0, 10) + '\n' + code.slice(10, 20) + '\r\n  ' + code.slice(20) + '\n';
		expect(decodeImport(wrapped)).toEqual({ ok: true, known: ['いきます'], lesson: 2 });
	});
	it('rejects anything that is not an old-site code', () => {
		expect(decodeImport('')).toEqual({ ok: false });
		expect(decodeImport('hello there')).toEqual({ ok: false });
		expect(decodeImport(encode({ v: 2, known: [] }))).toEqual({ ok: false });
		expect(decodeImport(encode({ v: 1, known: 'いきます' }))).toEqual({ ok: false });
		expect(decodeImport(encode({ v: 1, known: ['ok', 3] }))).toEqual({ ok: false });
	});
	it('ignores a missing or odd lesson', () => {
		expect(decodeImport(encode({ v: 1, known: [] }))).toEqual({ ok: true, known: [] });
		expect(decodeImport(encode({ v: 1, known: [], lesson: 'x' }))).toEqual({ ok: true, known: [] });
	});
});

describe('mergeKnown', () => {
	it('adds new words, keeps existing ones, and counts only the new', () => {
		expect(mergeKnown(['a', 'b'], ['b', 'c', 'c'])).toEqual({ known: ['a', 'b', 'c'], added: 1 });
		expect(mergeKnown(['a'], [])).toEqual({ known: ['a'], added: 0 });
	});
});
