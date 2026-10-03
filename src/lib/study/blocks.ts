// Each run of five lessons has its own washi-tape colour (classes .b-indigo and so on in app.css).
export type Block = 'indigo' | 'matcha' | 'sakura' | 'yamabuki' | 'fuji';
export const BLOCKS: readonly Block[] = ['indigo', 'matcha', 'sakura', 'yamabuki', 'fuji'];

export function blockOf(n: number): Block {
	return BLOCKS[Math.min(BLOCKS.length - 1, Math.floor((n - 1) / 5))];
}

// how many words of each block of five lessons are marked known
export function blockProgress(words: readonly { jp: string; n: number }[], known: ReadonlySet<string>, lessonCount: number) {
	return Array.from({ length: Math.ceil(lessonCount / 5) }, (_, i) => {
		const first = i * 5 + 1;
		const last = Math.min(lessonCount, first + 4);
		const inBlock = new Set(words.filter((w) => w.n >= first && w.n <= last).map((w) => w.jp));
		return { block: blockOf(first), first, last, known: [...inBlock].filter((w) => known.has(w)).length, total: inBlock.size };
	});
}
