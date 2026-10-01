import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 5,
	title: "Going places",
	goal: "Say where you go, when, how, and with whom.",
	patterns: [
		{
			title: "Go to a place",
			formula: "{Place}へ いきます。",
			meaning: "I go to (place).",
			examples: [
				["コンビニ[へ] いきます。", "I go to the convenience store."],
				["きのう デパート[へ] いきました。", "I went to the department store yesterday."]
			],
			note: "へ is read え here. に also works."
		},
		{
			title: "Where are you going?",
			formula: "どこへ いきますか？",
			meaning: "Where are you going?",
			examples: [
				["らいしゅう どこ[へ] いきますか？", "Where are you going next week?"]
			]
		},
		{
			title: "By (transport)",
			formula: "{Vehicle}で いきます。",
			meaning: "I go by (vehicle).",
			examples: [
				["でんしゃ[で] かいしゃ[へ] いきます。", "I go to work by train."],
				["なに[で] いきますか？", "How do you get there?"],
				["あるいて いきます。", "I walk there."]
			]
		},
		{
			title: "With someone",
			formula: "{Person}と いきます。",
			meaning: "I go with (person).",
			examples: [
				["かぞく[と] いきます。", "I go with my family."],
				["だれ[と] いきますか？", "Who are you going with?"],
				["ひとりで いきます。", "I go alone."]
			]
		},
		{
			title: "When?",
			formula: "いつ いきますか？",
			meaning: "When are you going?",
			examples: [
				["4がつ とおか[に] いきます。", "I'm going on April 10."],
				["たんじょうび[は] いつですか？", "When is your birthday?"],
				["8がつ 17にちです。", "It's August 17."]
			]
		},
		{
			title: "Months",
			formula: "〜がつ",
			meaning: "",
			table: {
				head: ["", "month"],
				rows: [
					["January", "いちがつ"],
					["February", "にがつ"],
					["March", "さんがつ"],
					["April", "しがつ"],
					["May", "ごがつ"],
					["June", "ろくがつ"],
					["July", "しちがつ"],
					["August", "はちがつ"],
					["September", "くがつ"],
					["October", "じゅうがつ"],
					["November", "じゅういちがつ"],
					["December", "じゅうにがつ"],
					["?", "なんがつ"]
				],
				quiz: ["#"]
			},
			note: "Watch April, July and September: しがつ, しちがつ, くがつ."
		},
		{
			title: "Dates",
			formula: "〜にち",
			meaning: "Days of the month. The first ten have their own words.",
			table: {
				head: ["", "date"],
				rows: [
					["1st", "ついたち"],
					["2nd", "ふつか"],
					["3rd", "みっか"],
					["4th", "よっか"],
					["5th", "いつか"],
					["6th", "むいか"],
					["7th", "なのか"],
					["8th", "ようか"],
					["9th", "ここのか"],
					["10th", "とおか"],
					["14th", "じゅうよっか"],
					["20th", "はつか"],
					["24th", "にじゅうよっか"],
					["?", "なんにち"]
				],
				quiz: ["the #"]
			},
			note: "Other dates are the number + にち: 11th = じゅういちにち."
		},
		{
			title: "When to use に with time",
			formula: "{Time}に",
			meaning: "Only some time words take に.",
			table: {
				head: ["", "examples"],
				rows: [
					["Always に", "げつようびに · 10じに · 9がつに"],
					["Never に", "きょう · あした · きのう · まいにち · いつ"],
					["Either way", "あさ(に) · しゅうまつ(に)"]
				]
			}
		}
	],
	words: [
		["いきます", "go"],
		["きます", "come"],
		["かえります", "return"],
		["らいしゅう", "next week"],
		["せんしゅう", "last week"],
		["せんげつ", "last month"],
		["でんしゃ", "train"],
		["バス", "bus"],
		["くるま", "car"],
		["あるいて", "on foot"],
		["かぞく", "family"],
		["ひとりで", "alone"],
		["いつ", "when"],
		["たんじょうび", "birthday"],
		["〜がつ", "month"],
		["コンビニ", "convenience store"],
		["ショッピングモール", "shopping mall"],
		["かいしゃ", "company, office"]
	]
};
