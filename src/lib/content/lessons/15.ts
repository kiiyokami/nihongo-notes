import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 15,
	title: "May I, must not, and ongoing states",
	goal: "Ask for and give permission, say what isn't allowed, and talk about where you live, what you know and what you do for a living.",
	patterns: [
		{
			title: "May I …?",
			formula: "{Verb て}も いいですか。",
			meaning: "May I (verb)?",
			examples: [
				["ここ[で] しゃしん[を] とって[も] いいですか？", "May I take photos here?"],
				["ええ、いいですよ。", "Sure, go ahead."],
				["この じしょ[を] つかって[も] いいですか？", "May I use this dictionary?"],
				["すみません、いま つかって います。", "Sorry, I'm using it right now."]
			]
		},
		{
			title: "Must not",
			formula: "{Verb て}は いけません。",
			meaning: "You must not (verb).",
			examples: [
				["ここ[で] たばこ[を] すって[は] いけません。", "You must not smoke here."],
				["この へや[に] はいって[は] いけません。", "You must not go into this room."]
			],
			note: "This is a firm rule, said by someone in charge. To turn down a request politely, say すみません、ちょっと…… instead."
		},
		{
			title: "Ongoing states",
			formula: "{Verb て} います。",
			meaning: "A state that continues: where you live, what you have, what you know.",
			examples: [
				["わたし[は] おおさか[に] すんで います。", "I live in Osaka."],
				["あに[は] けっこんして います。", "My older brother is married."],
				["でんしじしょ[を] もって いますか？", "Do you have an electronic dictionary?"],
				["しやくしょ[の] でんわばんごう[を] しって いますか？", "Do you know the city office's phone number?"],
				["いいえ、しりません。", "No, I don't."]
			],
			note: "The negative of しって います is しりません, not しって いません."
		},
		{
			title: "Jobs and habits",
			formula: "{Place}で {Verb て} います。",
			meaning: "What someone does for a living, or does regularly.",
			examples: [
				["こうこう[で] えいご[を] おしえて います。", "I teach English at a high school."],
				["ぎんこう[で] はたらいて います。", "I work at a bank."],
				["だいがく[で] けいざい[を] けんきゅうして います。", "I do research in economics at a university."],
				["あの みせ[で] でんしじしょ[を] うって います。", "That shop sells electronic dictionaries."]
			]
		}
	],
	words: [
		["すみます", "live"],
		["しります", "get to know"],
		["しって います", "know"],
		["つくります", "make"],
		["うります", "sell"],
		["けんきゅうします", "do research"],
		["おもいだします", "remember, recall"],
		["いらっしゃいます", "be (polite of います)"],
		["でんしじしょ", "electronic dictionary"],
		["カタログ", "catalogue"],
		["じこくひょう", "timetable"],
		["ふく", "clothes"],
		["せいひん", "product"],
		["ソフト", "software"],
		["けいざい", "economics"],
		["しやくしょ", "city office"],
		["こうこう", "high school"],
		["はいしゃ", "dentist"],
		["どくしん", "single (not married)"],
		["しりょう", "materials, documents"],
		["みなさん", "everyone"]
	]
};
