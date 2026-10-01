import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 1,
	title: "Introducing yourself",
	goal: "Say who you are, where you're from, what you do, and ask the same.",
	patterns: [
		{
			title: "I am …",
			formula: "わたしは{Noun}です。",
			meaning: "I am (noun).",
			examples: [
				["わたし[は] がくせいです。", "I'm a student."],
				["わたし[は] にほんじんです。", "I'm Japanese."]
			]
		},
		{
			title: "I am not …",
			formula: "わたしは{Noun}じゃありません。",
			meaning: "I am not (noun).",
			examples: [
				["わたし[は] かんこくじんじゃありません。", "I'm not Korean."]
			]
		},
		{
			title: "Asking a question",
			formula: "…ですか？",
			meaning: "Add か to the end to make a question.",
			examples: [
				["おなまえ[は] なんですか？", "What's your name?"],
				["なにじんですか？", "What's your nationality?"],
				["おしごと[は] なんですか？", "What's your job?"]
			],
			note: "Answer with わたしは … です."
		},
		{
			title: "Who is that?",
			formula: "あのひとは だれですか？",
			meaning: "Who is that person? (casual)",
			examples: [
				["あのかた[は] どなたですか？", "Same question, polite."],
				["トムさんです。", "That's Tom."]
			]
		},
		{
			title: "Noun の Noun",
			formula: "{A}の{B}です。",
			meaning: "B of / belonging to A.",
			examples: [
				["たなかさん[は] とうきょうだいがく[の] がくせいです。", "Tanaka is a Tokyo University student."],
				["キムさん[は] ソニー[の] かいしゃいんです。", "Kim is a Sony employee."]
			]
		},
		{
			title: "How old are you?",
			formula: "なんさいですか？",
			meaning: "How old are you? (casual)",
			examples: [
				["おいくつですか？", "Same question, polite."],
				["25さいです。", "I'm 25."]
			]
		}
	],
	words: [
		["なまえ", "name"],
		["しごと", "job"],
		["がくせい", "student"],
		["かいしゃいん", "company employee"],
		["ぎんこういん", "bank employee"],
		["ぎんこう", "bank"],
		["せんせい", "teacher"],
		["がっこう", "school"],
		["いしゃ", "doctor"],
		["びょういん", "hospital"],
		["だれ", "who"],
		["どなた", "who (polite)"],
		["〜じん", "person from (country)"],
		["〜さい", "years old"],
		["〜さん", "Mr./Ms."],
		["にほん", "Japan"],
		["かんこく", "Korea"],
		["ちゅうごく", "China"],
		["ロシア", "Russia"],
		["ベトナム", "Vietnam"],
		["タイ", "Thailand"],
		["インド", "India"],
		["インドネシア", "Indonesia"],
		["オーストラリア", "Australia"],
		["イギリス", "UK"],
		["フランス", "France"],
		["ドイツ", "Germany"],
		["オランダ", "Netherlands"],
		["イタリア", "Italy"],
		["スペイン", "Spain"],
		["ポルトガル", "Portugal"],
		["アメリカ", "USA"],
		["カナダ", "Canada"],
		["メキシコ", "Mexico"],
		["ブラジル", "Brazil"]
	]
};
