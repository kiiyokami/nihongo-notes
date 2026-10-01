// The notes mark particles as [は] and learner slots as {Noun}. Text tokens are split into
// Japanese and non-Japanese runs so the page can tag Japanese with lang="ja" (font and voice).
export interface Token {
	kind: 'text' | 'particle' | 'slot';
	text: string;
	ja: boolean;
}

const JA_CHAR = /[　-ヿ一-鿿＀-￯]/;
const JA_RUN = /[　-ヿ一-鿿＀-￯]+/g;
const MARK = /\[([^\]]+)\]|\{([^}]+)\}/g;

export function hasJapanese(s: string): boolean {
	return JA_CHAR.test(s);
}

function pushText(out: Token[], s: string) {
	let last = 0;
	for (const m of s.matchAll(JA_RUN)) {
		if (m.index > last) out.push({ kind: 'text', text: s.slice(last, m.index), ja: false });
		out.push({ kind: 'text', text: m[0], ja: true });
		last = m.index + m[0].length;
	}
	if (last < s.length) out.push({ kind: 'text', text: s.slice(last), ja: false });
}

export function parse(s: string): Token[] {
	const out: Token[] = [];
	let last = 0;
	for (const m of s.matchAll(MARK)) {
		if (m.index > last) pushText(out, s.slice(last, m.index));
		if (m[1] !== undefined) out.push({ kind: 'particle', text: m[1], ja: true });
		else out.push({ kind: 'slot', text: m[2], ja: false });
		last = m.index + m[0].length;
	}
	if (last < s.length) pushText(out, s.slice(last));
	return out;
}

export function speechText(s: string): string {
	return parse(s)
		.filter((t) => t.kind !== 'slot')
		.map((t) => t.text)
		.join('')
		.replace(/\s+/g, ' ')
		.trim();
}
