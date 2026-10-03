// Each run of five lessons has its own washi-tape colour (classes .b-indigo and so on in app.css).
export type Block = 'indigo' | 'matcha' | 'sakura' | 'yamabuki' | 'fuji';
export const BLOCKS: readonly Block[] = ['indigo', 'matcha', 'sakura', 'yamabuki', 'fuji'];

export function blockOf(n: number): Block {
	return BLOCKS[Math.min(BLOCKS.length - 1, Math.floor((n - 1) / 5))];
}
