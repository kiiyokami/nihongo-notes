import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 12,
	title: "Past and comparing",
	goal: "Talk about the past with adjectives and nouns, and compare things.",
	patterns: [
		{
			title: "Past of nouns and adjectives",
			formula: "でした ・ かったです",
			meaning: "",
			examples: [
				["きのう[は] あめでした。", "It rained yesterday."],
				["きのう[は] あつかったです。", "It was hot yesterday."]
			],
			table: {
				head: ["", "was", "wasn't"],
				rows: [
					["noun", "あめでした", "あめじゃありませんでした"],
					["な", "ひまでした", "ひまじゃありませんでした"],
					["い", "あつかったです", "あつくなかったです"],
					["い", "よかったです", "よくなかったです (いい is irregular)"]
				]
			}
		},
		{
			title: "How was it?",
			formula: "{Noun}は どうでしたか？",
			meaning: "How was (noun)?",
			examples: [
				["きのう[の] えいが[は] どうでしたか？", "How was yesterday's movie?"],
				["おもしろかったです。", "It was interesting."]
			]
		},
		{
			title: "A is more … than B",
			formula: "{A}は{B}より{Adj}です。",
			meaning: "A is more (adj) than B.",
			examples: [
				["にほん[は] ちゅうごく[より] ちいさいです。", "Japan is smaller than China."]
			]
		},
		{
			title: "Which one is more …?",
			formula: "{A}と{B}と どちらが{Adj}ですか？",
			meaning: "Which is more (adj), A or B?",
			examples: [
				["いぬ[と] ねこ[と] どちら[が] すきですか？", "Which do you like more, dogs or cats?"],
				["いぬ[の] ほう[が] すきです。", "I prefer dogs."],
				["どちらも すきです。", "I like both."]
			]
		},
		{
			title: "The most …",
			formula: "{Group}で{X}が いちばん{Adj}です。",
			meaning: "Among (group), X is the most (adj).",
			examples: [
				["にほんりょうり[で] なに[が] いちばん おいしいですか？", "What's the most delicious Japanese food?"],
				["てんぷら[が] いちばん おいしいです。", "Tempura is the most delicious."]
			],
			note: "Question words: なに what · どこ where · だれ who · いつ when. The group can also be 〜の なかで."
		}
	],
	words: [
		["かんたん", "easy, simple"],
		["ちかい", "near"],
		["とおい", "far"],
		["はやい", "fast, early"],
		["おそい", "slow, late"],
		["おおい", "many"],
		["すくない", "few"],
		["あたたかい", "warm"],
		["すずしい", "cool"],
		["おもい", "heavy"],
		["かるい", "light"],
		["きせつ", "season"],
		["はる", "spring"],
		["なつ", "summer"],
		["あき", "autumn"],
		["ふゆ", "winter"],
		["てんき", "weather"],
		["あめ", "rain"],
		["ゆき", "snow"],
		["くもり", "cloudy"],
		["はれ", "sunny"],
		["ホテル", "hotel"],
		["くうこう", "airport"],
		["うみ", "sea"],
		["パーティー", "party"],
		["おまつり", "festival"],
		["しけん", "exam"],
		["すし", "sushi"],
		["てんぷら", "tempura"],
		["すきやき", "sukiyaki"],
		["さしみ", "sashimi"],
		["もみじ", "autumn leaves"],
		["より", "than"],
		["どちら", "which (of two)"],
		["いちばん", "the most"]
	]
};
