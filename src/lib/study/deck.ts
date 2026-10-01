import type { VocabItem } from '$lib/content';
import { shuffle, type Rng } from './random';

export type Card = VocabItem;

export function buildDeck(cards: readonly Card[], picked: ReadonlySet<number>, skip: ReadonlySet<string> | null, rng: Rng = Math.random): Card[] {
	return shuffle(cards.filter((c) => picked.has(c.n) && !(skip && skip.has(c.jp))), rng);
}

// "Again": the card comes back 3 to 5 places later, if anything is left after it.
export function putBack(deck: readonly Card[], index: number, rng: Rng = Math.random): Card[] {
	const out = deck.slice();
	if (deck.length - index <= 1) return out;
	out.splice(Math.min(out.length, index + 3 + Math.floor(rng() * 3)), 0, deck[index]);
	return out;
}

export function roundResult(deck: readonly Card[], known: ReadonlySet<string>) {
	const words = new Set(deck.map((c) => c.jp));
	return { known: [...words].filter((w) => known.has(w)).length, total: words.size };
}
