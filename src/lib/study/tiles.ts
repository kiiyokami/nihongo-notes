import { shuffle, type Rng } from './random';

export const PARTICLES: readonly string[] = ['は', 'を', 'に', 'で', 'へ', 'と', 'が', 'の', 'から', 'まで', 'も'];

// "でんしゃ[で] かいしゃ[へ] いきます。" -> でんしゃ, で, かいしゃ, へ, いきます.
// です is split off as its own tile so short answers (べんりです) still need putting in order.
export function toTiles(s: string): string[] {
	return s
		.replace(/[。？]$/, '')
		.split(/\s+|(?=\[)|(?<=\])|(?<=、)/)
		.map((t) => t.replace(/[[\]]/g, ''))
		.filter(Boolean)
		.flatMap((t) => {
			const m = t.match(/^(.+?)(ですか|でしたか|です|でした)$/);
			return m ? [m[1], m[2]] : [t];
		});
}

// The answer's tiles plus two particles it doesn't use, so the learner has to choose, not just sort.
export function tileSet(answer: string, rng: Rng = Math.random): string[] {
	const words = toTiles(answer);
	const pieces = [...words, ...shuffle(PARTICLES.filter((p) => !words.includes(p)), rng).slice(0, 2)];
	let order = shuffle(pieces, rng);
	for (let k = 0; k < 5 && order.join() === pieces.join(); k++) order = shuffle(pieces, rng);
	return order;
}
