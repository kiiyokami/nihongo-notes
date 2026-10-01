import type { Lesson } from '$lib/content/types';
import { shuffle, type Rng } from './random';

export interface NumItem {
	n: number;
	kind: string;
	en: string;
	jp: string;
	alts?: string[];
	row?: string;
	col?: number;
}

// In a table's quiz line, # is the row's first cell, and "# person|# people" uses the left side for 1.
export function say(tmpl: string, x: string): string {
	const [one, many] = tmpl.split('|');
	return (x === '1' || many === undefined ? one : many).replace('#', x);
}

// Every table with a quiz line, plus clock times built from the hours and minutes tables.
export function buildNums(lessons: readonly Lesson[]): NumItem[] {
	const out: NumItem[] = [];
	const hours: { n: number; h: string; jp: string }[] = [];
	const minutes: { m: string; jp: string }[] = [];
	const add = (x: NumItem) => {
		if (!out.some((y) => y.en === x.en)) out.push(x);
	};
	for (const l of lessons) {
		for (const p of l.patterns) {
			const tb = p.table;
			if (!tb) continue;
			const rows = tb.rows.filter((r) => r[0] !== '?');
			(tb.quiz ?? []).forEach((tmpl, c) => {
				if (tmpl) for (const r of rows) if (r[c + 1]) add({ n: l.n, kind: p.title, row: r[0], col: c + 1, en: say(tmpl, r[0]), jp: r[c + 1] });
			});
			if (tb.clock === 'h') for (const r of rows) hours.push({ n: l.n, h: r[0], jp: r[1] });
			if (tb.clock === 'm') for (const r of rows) minutes.push({ m: r[0], jp: r[1] });
		}
	}
	for (const h of hours) {
		add({ n: h.n, kind: 'clock', en: `${h.h}:00`, jp: h.jp });
		for (const m of minutes) {
			// :30 is taught as はん, and さんじゅっぷん is right too
			add(
				m.m === '30'
					? { n: h.n, kind: 'clock', en: `${h.h}:30`, jp: `${h.jp} はん`, alts: [`${h.jp} ${m.jp}`] }
					: { n: h.n, kind: 'clock', en: `${h.h}:${m.m.padStart(2, '0')}`, jp: `${h.jp} ${m.jp}` }
			);
		}
	}
	return out;
}

// One question from each kind in turn, so 156 clock times don't crowd out the 10 floors.
export function numRound(pool: readonly NumItem[], rng: Rng, size = 10): NumItem[] {
	const byKind = new Map<string, NumItem[]>();
	for (const x of pool) byKind.set(x.kind, [...(byKind.get(x.kind) ?? []), x]);
	const bags = [...byKind.values()].map((b) => shuffle(b, rng));
	const picked: NumItem[] = [];
	while (picked.length < size && bags.some((b) => b.length)) {
		for (const b of shuffle(bags, rng)) if (b.length && picked.length < size) picked.push(b.pop()!);
	}
	return shuffle(picked, rng);
}

// Wrong options are real readings from the same table: another number, or the same number with
// another counter. For clock times: same hour or same minutes, so the choice is about one part.
export function numOptions(item: NumItem, all: readonly NumItem[], rng: Rng): string[] {
	const right = [item.jp, ...(item.alts ?? [])];
	const [h, m] = item.en.split(':');
	const near = all.filter(
		(y) =>
			y.kind === item.kind &&
			!right.includes(y.jp) &&
			!(y.alts ?? []).some((a) => right.includes(a)) &&
			(item.kind !== 'clock' || y.en.startsWith(h + ':') || y.en.endsWith(':' + m))
	);
	return shuffle([item.jp, ...[...new Set(shuffle(near, rng).map((y) => y.jp))].slice(0, 3)], rng);
}
