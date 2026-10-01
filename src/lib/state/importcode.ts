// The old site exports known words as base64 of the UTF-8 JSON {v: 1, known: string[], lesson: number}.
export type ImportResult = { ok: true; known: string[]; lesson?: number } | { ok: false };

export function decodeImport(code: string): ImportResult {
	try {
		const bytes = Uint8Array.from(atob(code.replace(/\s+/g, '')), (c) => c.charCodeAt(0));
		const data = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
		if (data?.v !== 1 || !Array.isArray(data.known) || !data.known.every((w: unknown) => typeof w === 'string')) return { ok: false };
		return Number.isInteger(data.lesson) ? { ok: true, known: data.known, lesson: data.lesson } : { ok: true, known: data.known };
	} catch {
		return { ok: false };
	}
}

// Importing only ever adds: a word already marked known stays known.
export function mergeKnown(current: readonly string[], incoming: readonly string[]) {
	const have = new Set(current);
	const fresh = [...new Set(incoming)].filter((w) => !have.has(w));
	return { known: [...current, ...fresh], added: fresh.length };
}
