import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 4,
	title: "Time and verbs",
	goal: "Tell the time, give opening hours, and use verbs in four tenses.",
	patterns: [
		{
			title: "What time is it?",
			formula: "いま なんじですか？",
			meaning: "What time is it now?",
			examples: [
				["ごご 6じはんです。", "It's 6:30 p.m."],
				["2じ 30ぷんです。", "It's 2:30."]
			],
			note: "じ = o'clock · ふん/ぷん = minutes · はん = half · ごぜん = a.m. · ごご = p.m."
		},
		{
			title: "Hours",
			formula: "〜じ",
			meaning: "o'clock",
			table: {
				head: ["#", "o'clock"],
				rows: [
					["1", "いちじ"],
					["2", "にじ"],
					["3", "さんじ"],
					["4", "よじ"],
					["5", "ごじ"],
					["6", "ろくじ"],
					["7", "しちじ"],
					["8", "はちじ"],
					["9", "くじ"],
					["10", "じゅうじ"],
					["11", "じゅういちじ"],
					["12", "じゅうにじ"],
					["?", "なんじ"]
				],
				quiz: ["# o'clock"],
				clock: "h"
			},
			note: "Watch 4, 7 and 9: よじ, しちじ, くじ."
		},
		{
			title: "Minutes",
			formula: "〜ふん ・ 〜ぷん",
			meaning: "Minutes, counted in fives.",
			table: {
				head: ["#", "minutes"],
				rows: [
					["5", "ごふん"],
					["10", "じゅっぷん"],
					["15", "じゅうごふん"],
					["20", "にじゅっぷん"],
					["25", "にじゅうごふん"],
					["30", "さんじゅっぷん"],
					["35", "さんじゅうごふん"],
					["40", "よんじゅっぷん"],
					["45", "よんじゅうごふん"],
					["50", "ごじゅっぷん"],
					["55", "ごじゅうごふん"],
					["?", "なんぷん"]
				],
				quiz: ["# minutes"],
				clock: "m"
			},
			note: "At :30 you can also say はん: 4じ はん."
		},
		{
			title: "From … until …",
			formula: "{Noun}は なんじから なんじまでですか？",
			meaning: "From what time until what time is (noun) open?",
			examples: [
				["ぎんこう[は] ごぜん 9じ[から] ごご 3じ[まで]です。", "The bank is open 9 a.m. to 3 p.m."],
				["げつようび[から] きんようび[まで]です。", "Monday to Friday."]
			],
			note: "から = from · まで = until"
		},
		{
			title: "At what time do you …?",
			formula: "なんじに{Verb}ますか？",
			meaning: "What time do you (verb)?",
			examples: [
				["なんじ[に] おきますか？", "What time do you wake up?"],
				["6じ[に] おきます。", "I wake up at 6."]
			],
			note: "に marks an exact time."
		},
		{
			title: "Verb tenses",
			formula: "ます ・ ません ・ ました ・ ませんでした",
			meaning: "do · don't · did · didn't",
			table: {
				head: ["", "do", "don't", "did", "didn't"],
				rows: [
					["sleep", "ねます", "ねません", "ねました", "ねませんでした"],
					["wake up", "おきます", "おきません", "おきました", "おきませんでした"],
					["rest", "やすみます", "やすみません", "やすみました", "やすみませんでした"],
					["work", "はたらきます", "はたらきません", "はたらきました", "はたらきませんでした"],
					["go home", "かえります", "かえりません", "かえりました", "かえりませんでした"],
					["study", "べんきょうします", "べんきょうしません", "べんきょうしました", "べんきょうしませんでした"]
				]
			},
			note: "There's no future form: use ます. あした べんきょうします = I will study tomorrow."
		}
	],
	words: [
		["いま", "now"],
		["なんじ", "what time"],
		["ごぜん", "a.m."],
		["ごご", "p.m."],
		["はん", "half past"],
		["げつようび", "Monday"],
		["かようび", "Tuesday"],
		["すいようび", "Wednesday"],
		["もくようび", "Thursday"],
		["きんようび", "Friday"],
		["どようび", "Saturday"],
		["にちようび", "Sunday"],
		["なんようび", "what day"],
		["おととい", "day before yesterday"],
		["きのう", "yesterday"],
		["きょう", "today"],
		["あした", "tomorrow"],
		["あさって", "day after tomorrow"],
		["まいばん", "every night"],
		["よる", "night"],
		["ねます", "sleep"],
		["おきます", "wake up"],
		["やすみます", "rest"],
		["はたらきます", "work"],
		["かえります", "go home"],
		["べんきょうします", "study"],
		["ゆうびんきょく", "post office"],
		["まん", "ten thousand"]
	]
};
