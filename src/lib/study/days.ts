// Which days the learner studied, and what they did: the hanko stamps, the streak and today's ticks.
export type Kind = 'review' | 'lesson' | 'quiz' | 'cards';
export const KINDS: readonly Kind[] = ['review', 'lesson', 'quiz', 'cards'];
export type Days = Record<number, Kind[]>;
export const KEEP_DAYS = 60;

const LABELS = ['月', '火', '水', '木', '金', '土', '日'];
const NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function logDay(days: Days, today: number, kind: Kind): Days {
	const out: Days = {};
	for (const [k, v] of Object.entries(days)) if (Number(k) > today - KEEP_DAYS) out[Number(k)] = v;
	const now = out[today] ?? [];
	out[today] = now.includes(kind) ? now : [...now, kind];
	return out;
}

const studied = (days: Days, d: number) => (days[d]?.length ?? 0) > 0;

// days in a row with a stamp; today without one yet doesn't break it
export function streak(days: Days, today: number): number {
	let d = studied(days, today) ? today : today - 1;
	let n = 0;
	while (studied(days, d)) {
		n++;
		d--;
	}
	return n;
}

export function weekOf(days: Days, today: number) {
	// day 0 (1 January 1970) was a Thursday, so Monday is 3 days before it
	const monday = today - ((today + 3) % 7);
	return LABELS.map((label, i) => ({ label, name: NAMES[i], day: monday + i, done: studied(days, monday + i), today: monday + i === today }));
}

export function todayTasks(days: Days, today: number, toReview: number) {
	const did = days[today] ?? [];
	return { review: toReview === 0 || did.includes('review'), lesson: did.includes('lesson'), quiz: did.includes('quiz') };
}
