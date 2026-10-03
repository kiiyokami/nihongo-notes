// The app's saved state. Pre-rendered pages start from the defaults; loadApp() swaps in what
// this browser saved once the page is running (called from the root layout's onMount).
import { lessons } from '$lib/content';
import { createStorage, type Store } from './storage';
import { cleanCards, cleanDays, cleanKnown, cleanLesson, cleanQuiz, cleanSchedule, cleanTheme } from './prefs';
import { dayNumber, grade, type Schedule } from '$lib/study/srs';
import { logDay, type Days, type Kind } from '$lib/study/days';

const valid = lessons.map((l) => l.n);

export const app = $state({
	ready: false,
	storageOk: true,
	theme: cleanTheme(null),
	known: [] as string[],
	lastLesson: valid[0],
	quiz: cleanQuiz(null, valid),
	cards: cleanCards(null, valid),
	srs: {} as Schedule,
	days: {} as Days
});

let store: Store = createStorage(null);

export function loadApp(): void {
	store = createStorage();
	app.storageOk = store.ok;
	app.theme = cleanTheme(store.get('theme', null));
	app.known = cleanKnown(store.get('known', []));
	app.lastLesson = cleanLesson(store.get('lastLesson', null), valid);
	app.quiz = cleanQuiz(store.get('quiz', null), valid);
	app.cards = cleanCards(store.get('cards', null), valid);
	app.srs = cleanSchedule(store.get('srs', null));
	app.days = cleanDays(store.get('days', null));
	app.ready = true;
}

export function save(key: 'theme' | 'known' | 'lastLesson' | 'quiz' | 'cards' | 'srs' | 'days'): void {
	store.set(key, $state.snapshot(app[key]));
}

export function setKnown(jp: string, yes: boolean): void {
	const s = new Set(app.known);
	if (yes) s.add(jp);
	else s.delete(jp);
	app.known = [...s];
	save('known');
}

export function forget(words: Iterable<string>): void {
	const drop = new Set(words);
	app.known = app.known.filter((w) => !drop.has(w));
	app.srs = Object.fromEntries(Object.entries(app.srs).filter(([w]) => !drop.has(w)));
	save('known');
	save('srs');
}

// a flashcard answer: marks the word known or not, and schedules when it comes back
export function gradeWord(jp: string, ok: boolean): void {
	setKnown(jp, ok);
	app.srs = { ...app.srs, [jp]: grade(app.srs[jp], ok, dayNumber()) };
	save('srs');
}

export function logToday(kind: Kind): void {
	app.days = logDay(app.days, dayNumber(), kind);
	save('days');
}
