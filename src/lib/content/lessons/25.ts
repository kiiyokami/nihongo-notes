import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 25,
	title: "If and even if",
	goal: "Talk about conditions: if something happens, once it happens, and even if it happens.",
	patterns: [
		{
			title: "If …",
			formula: "{Plain past}ら、…",
			meaning: "If (something), …",
			examples: [
				["あした あめ[が] ふったら、うち[に] います。", "If it rains tomorrow, I'll stay home."],
				["もし おかね[が] たくさん あったら、なに[を] かいたいですか？", "If you had lots of money, what would you want to buy?"],
				["ひまだったら、てつだって ください。", "If you're free, please help me."]
			],
			table: {
				head: ["type", "if"],
				rows: [
					["verb", "ふった → ふったら"],
					["verb", "ふらなかった → ふらなかったら"],
					["い", "やすかった → やすかったら"],
					["な", "ひまだった → ひまだったら"],
					["noun", "あめだった → あめだったら"]
				]
			},
			note: "もし at the start makes it clear a condition is coming."
		},
		{
			title: "Once …",
			formula: "{Verb た}ら、…",
			meaning: "Once (something) happens, … (it's sure to happen).",
			examples: [
				["10じ[に] なったら、でかけましょう。", "Let's leave once it's ten."],
				["えき[に] ついたら、でんわ[を] ください。", "Call me when you get to the station."]
			]
		},
		{
			title: "Even if",
			formula: "{Verb て}も、… ・ {い-adj}くても、…",
			meaning: "Even if (something), …",
			examples: [
				["あめ[が] ふって[も]、サッカー[の] しあい[が] あります。", "Even if it rains, the soccer match is on."],
				["たかくて[も]、この くつ[が] かいたいです。", "Even if they're expensive, I want these shoes."],
				["いくら かんがえて[も]、わかりません。", "However much I think about it, I don't get it."]
			],
			table: {
				head: ["type", "even if"],
				rows: [
					["verb", "ふって → ふっても"],
					["い", "やすくて → やすくても"],
					["な", "しずかで → しずかでも"],
					["noun", "あめで → あめでも"]
				]
			},
			note: "いくら …ても: however much …"
		},
		{
			title: "Saying goodbye",
			formula: "いろいろ おせわに なりました。",
			meaning: "Thank you for everything.",
			examples: [
				["いろいろ おせわに なりました。", "Thank you for everything."],
				["どうぞ おげんきで。", "Take care."]
			]
		}
	],
	words: [
		["かんがえます", "think about, consider"],
		["つきます", "arrive"],
		["としを とります", "get older"],
		["たります", "be enough"],
		["がんばります", "do your best"],
		["いなか", "the countryside, hometown"],
		["チャンス", "chance"],
		["〜おく", "hundred million"],
		["もし", "if"],
		["いみ", "meaning"],
		["てんきん", "job transfer"],
		["こと", "thing, matter"],
		["ひま", "free time"],
		["もしもし", "hello (on the phone)"],
		["いろいろ おせわに なりました", "Thank you for everything."],
		["どうぞ おげんきで", "Take care."]
	]
};
