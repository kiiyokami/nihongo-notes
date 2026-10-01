// @ts-nocheck: one-off Node script; the type check only sees it because the migration test imports it
// One-off: turns legacy/js/data.js into typed files under src/lib/content/.
// Run once with `node scripts/migrate-content.mjs`; deleted after the migration test passes.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';

export function loadLegacy(path = 'legacy/js/data.js') {
	return vm.runInNewContext(readFileSync(path, 'utf8') + '\n;({ L, PART, QA })');
}

export function toLesson(l) {
	return {
		n: l.n,
		title: l.t,
		goal: l.g,
		patterns: l.p.map((p) => ({
			title: p.t,
			formula: p.f,
			meaning: p.m ?? '',
			...(p.ex ? { examples: p.ex } : {}),
			...(p.tb
				? {
						table: {
							head: p.tb.h,
							rows: p.tb.r,
							...(p.tb.quiz ? { quiz: p.tb.quiz } : {}),
							...(p.tb.clock ? { clock: p.tb.clock } : {})
						}
					}
				: {}),
			...(p.n ? { note: p.n } : {})
		})),
		words: l.v.split(';').map((s) => {
			const i = s.indexOf('=');
			return [s.slice(0, i), s.slice(i + 1)];
		})
	};
}

// Readable TypeScript literals: short arrays of plain values stay on one line.
const plain = (v) => v === null || typeof v !== 'object';
export function lit(v, indent = '') {
	if (plain(v)) return JSON.stringify(v);
	const inner = indent + '\t';
	if (Array.isArray(v)) {
		if (v.every(plain)) return '[' + v.map((x) => JSON.stringify(x)).join(', ') + ']';
		return '[\n' + v.map((x) => inner + lit(x, inner)).join(',\n') + '\n' + indent + ']';
	}
	const key = (k) => (/^[A-Za-z_]\w*$/.test(k) ? k : JSON.stringify(k));
	return '{\n' + Object.entries(v).map(([k, x]) => `${inner}${key(k)}: ${lit(x, inner)}`).join(',\n') + '\n' + indent + '}';
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	const { L, PART, QA } = loadLegacy();
	mkdirSync('src/lib/content/lessons', { recursive: true });
	for (const l of L) {
		const file = `src/lib/content/lessons/${String(l.n).padStart(2, '0')}.ts`;
		writeFileSync(file, `import type { Lesson } from '../types';\n\nexport const lesson: Lesson = ${lit(toLesson(l))};\n`);
	}
	writeFileSync('src/lib/content/particles.ts', `import type { ParticleQuestion } from './types';\n\n// Sentence with ＿ for the gap, the answer, the choices, the English.\nexport const particles: ParticleQuestion[] = ${lit(PART)};\n`);
	writeFileSync('src/lib/content/qa.ts', `import type { QAPair } from './types';\n\n// Answer-the-question pairs, copied from the lesson examples: [lesson, question, answer, English of the answer].\nexport const qa: QAPair[] = ${lit(QA)};\n`);
	console.log(`Wrote ${L.length} lessons, ${PART.length} particle questions, ${QA.length} QA pairs.`);
}
