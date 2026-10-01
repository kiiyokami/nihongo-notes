import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 3,
	title: "Here, there, where",
	goal: "Talk about places and find things in a building.",
	patterns: [
		{
			title: "Here / there / over there",
			formula: "ここ ・ そこ ・ あそこ",
			meaning: "here · there · over there",
			examples: [
				["こちら ・ そちら ・ あちら", "polite versions"]
			]
		},
		{
			title: "This place is …",
			formula: "ここは{Place}です。",
			meaning: "This is (place).",
			examples: [
				["ここ[は] デパートです。", "This is a department store."],
				["ここ[は] なんですか？", "What is this place?"]
			]
		},
		{
			title: "Where is it?",
			formula: "{Noun}は どこですか？",
			meaning: "Where is (noun)?",
			examples: [
				["トイレ[は] どこですか？", "Where is the toilet?"],
				["あそこです。", "It's over there."]
			],
			note: "Polite: どちらですか？"
		},
		{
			title: "What floor?",
			formula: "{Noun}は なんがいですか？",
			meaning: "What floor is (noun) on?",
			examples: [
				["レストラン[は] なんがいですか？", "What floor is the restaurant?"],
				["3がいです。", "The 3rd floor."]
			],
			table: {
				head: ["#", "floor"],
				rows: [
					["1", "いっかい"],
					["2", "にかい"],
					["3", "さんがい"],
					["4", "よんかい"],
					["5", "ごかい"],
					["6", "ろっかい"],
					["7", "ななかい"],
					["8", "はっかい"],
					["9", "きゅうかい"],
					["10", "じゅっかい"],
					["?", "なんがい"]
				],
				quiz: ["floor #"]
			},
			note: "Basement = ちか"
		}
	],
	words: [
		["ここ", "here"],
		["そこ", "there"],
		["あそこ", "over there"],
		["どこ", "where"],
		["こちら", "here (polite)"],
		["デパート", "department store"],
		["トイレ", "toilet"],
		["タバコ", "cigarettes"],
		["ちか", "basement"],
		["〜かい", "floor (counter)"],
		["なんがい", "what floor"]
	]
};
