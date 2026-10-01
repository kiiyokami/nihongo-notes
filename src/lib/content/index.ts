import type { Lesson } from './types';
import { lesson as l01 } from './lessons/01';
import { lesson as l02 } from './lessons/02';
import { lesson as l03 } from './lessons/03';
import { lesson as l04 } from './lessons/04';
import { lesson as l05 } from './lessons/05';
import { lesson as l06 } from './lessons/06';
import { lesson as l07 } from './lessons/07';
import { lesson as l08 } from './lessons/08';
import { lesson as l09 } from './lessons/09';
import { lesson as l10 } from './lessons/10';
import { lesson as l11 } from './lessons/11';
import { lesson as l12 } from './lessons/12';
import { lesson as l13 } from './lessons/13';
import { lesson as l14 } from './lessons/14';
import { lesson as l15 } from './lessons/15';
import { lesson as l16 } from './lessons/16';
import { lesson as l17 } from './lessons/17';
import { lesson as l18 } from './lessons/18';
import { lesson as l19 } from './lessons/19';
import { lesson as l20 } from './lessons/20';
import { lesson as l21 } from './lessons/21';

export type { Lesson, Pattern, Table, Word, Example, ParticleQuestion, QAPair } from './types';
export { particles } from './particles';
export { qa } from './qa';

export const lessons: Lesson[] = [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20, l21];

export function getLesson(n: number): Lesson | undefined {
	return lessons.find((l) => l.n === n);
}

export interface VocabItem {
	jp: string;
	en: string;
	n: number;
}

export const vocab: VocabItem[] = lessons.flatMap((l) => l.words.map(([jp, en]) => ({ jp, en, n: l.n })));
