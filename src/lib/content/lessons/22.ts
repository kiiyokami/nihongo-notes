import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 22,
	title: "Describing with a sentence",
	goal: "Put a whole sentence before a noun to describe it, and talk about clothes and plans.",
	patterns: [
		{
			title: "A sentence before a noun",
			formula: "{Plain} {Noun}",
			meaning: "A plain-form sentence placed before a noun describes it.",
			examples: [
				["これ[は] わたし[が] とった しゃしんです。", "This is a photo I took."],
				["あそこ[に] いる ひと[は] だれですか？", "Who is the person over there?"],
				["せんしゅう ならった かんじ[を] わすれました。", "I forgot the kanji I learned last week."],
				["はは[が] よく つくる りょうり[は] カレーです。", "The dish my mum often makes is curry."]
			],
			note: "Inside the describing sentence, the subject takes が, not は: わたしが とった しゃしん."
		},
		{
			title: "Time, plans, things to do",
			formula: "{Verb dict.} じかん ・ やくそく ・ ようじが あります。",
			meaning: "I have time to (verb) · plans to (verb) · something to do.",
			examples: [
				["あさごはん[を] たべる じかん[が] ありません。", "I don't have time to eat breakfast."],
				["きょう[は] ともだち[に] あう やくそく[が] あります。", "Today I have plans to meet a friend."]
			]
		},
		{
			title: "Wearing clothes",
			formula: "きます ・ はきます ・ かぶります ・ かけます ・ します",
			meaning: "Each kind of clothing has its own verb for wear.",
			examples: [
				["あの ぼうし[を] かぶって いる ひと[が] やまださんです。", "The person wearing that hat is Mr Yamada."],
				["めがね[を] かけて いる ひと[は] だれですか？", "Who's the person wearing glasses?"]
			],
			table: {
				head: ["what", "verb"],
				rows: [
					["シャツ, セーター, コート", "きます"],
					["くつ", "はきます"],
					["ぼうし", "かぶります"],
					["めがね", "かけます"],
					["ネクタイ", "します"]
				]
			}
		},
		{
			title: "Looking for a flat",
			formula: "どんな {Noun}が いいですか。",
			meaning: "What kind of (noun) would you like?",
			examples: [
				["どんな へや[が] いいですか？", "What kind of flat would you like?"],
				["えき[から] ちかくて、やちん[が] やすい へや[が] いいです。", "One that's close to the station with cheap rent."]
			]
		}
	],
	words: [
		["シャツを きます", "wear (a shirt)"],
		["はきます", "wear (shoes, trousers)"],
		["かぶります", "wear (a hat)"],
		["めがねを かけます", "wear glasses"],
		["ネクタイを します", "wear a tie"],
		["うまれます", "be born"],
		["わたしたち", "we"],
		["コート", "coat"],
		["セーター", "sweater"],
		["スーツ", "suit"],
		["ぼうし", "hat"],
		["めがね", "glasses"],
		["ケーキ", "cake"],
		["おべんとう", "boxed lunch"],
		["ロボット", "robot"],
		["ユーモア", "humour"],
		["つごう", "convenience (whether a time suits you)"],
		["よく", "often"],
		["えーと", "um, let me see"],
		["おめでとう ございます", "Congratulations."],
		["やちん", "rent"],
		["わしつ", "Japanese-style room"],
		["おしいれ", "closet (for futons)"],
		["ふとん", "futon"],
		["ダイニングキッチン", "kitchen with a dining area"],
		["では", "well then"],
		["おさがしですか", "Are you looking for something?"]
	]
};
