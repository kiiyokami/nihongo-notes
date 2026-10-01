import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 13,
	title: "Wants and going to do",
	goal: "Say what you want, what you want to do, and that you're going somewhere to do something.",
	patterns: [
		{
			title: "Wanting a thing",
			formula: "{Noun}が ほしいです。",
			meaning: "I want (noun).",
			examples: [
				["いま なに[が] いちばん ほしいですか？", "What do you want most right now?"],
				["あたらしい くるま[が] ほしいです。", "I want a new car."],
				["いま[は] なに[も] ほしくないです。", "I don't want anything right now."]
			],
			note: "ほしい works like an い-adjective: ほしくないです (don't want), ほしかったです (wanted)."
		},
		{
			title: "Wanting to do",
			formula: "{Verb stem}たいです。",
			meaning: "I want to (verb).",
			examples: [
				["なつやすみ[は] どこ[へ] いきたいですか？", "Where do you want to go in the summer holidays?"],
				["おきなわ[へ] いきたいです。", "I want to go to Okinawa."],
				["きょう[は] つかれました[から]、なに[も] したくないです。", "I'm tired today, so I don't want to do anything."]
			],
			table: {
				head: ["ます-form", "want to", "don't want to"],
				rows: [
					["たべます", "たべたいです", "たべたくないです"],
					["いきます", "いきたいです", "いきたくないです"],
					["します", "したいです", "したくないです"]
				]
			},
			note: "Take off ます and add たい. The object can take が instead of を: すしが たべたいです."
		},
		{
			title: "Going to do something",
			formula: "{Place}へ {Verb stem}に いきます。",
			meaning: "I go to (place) to (verb).",
			examples: [
				["しゅうまつ[は] うみ[へ] およぎ[に] いきます。", "This weekend I'm going to the sea to swim."],
				["えき[まで] ともだち[を] むかえ[に] いきます。", "I'm going to the station to meet a friend."],
				["こうえん[へ] さんぽ[に] いきませんか？", "Shall we go for a walk in the park?"]
			],
			note: "For a する-verb, use the noun: かいものに, しょくじに, さんぽに いきます. きます and かえります work the same way."
		},
		{
			title: "Something, somewhere",
			formula: "なにか ・ どこか",
			meaning: "something · somewhere",
			examples: [
				["ふゆやすみ[は] どこか いきましたか？", "Did you go anywhere in the winter holidays?"],
				["のど[が] かわきました[から]、なにか のみたいです。", "I'm thirsty, so I want to drink something."]
			],
			note: "を and へ are usually dropped after なにか and どこか."
		},
		{
			title: "Ordering food",
			formula: "{Food}を ください。",
			meaning: "(Food), please.",
			examples: [
				["ごちゅうもん[は]？", "What would you like?"],
				["ぎゅうどん[を] ふたつ ください。", "Two beef bowls, please."],
				["しょうしょう おまち ください。", "Just a moment, please."],
				["べつべつに おねがいします。", "Separate bills, please."]
			]
		}
	],
	words: [
		["ほしい", "want"],
		["あそびます", "play, have fun"],
		["およぎます", "swim"],
		["むかえます", "meet, pick up"],
		["つかれます", "get tired"],
		["けっこんします", "get married"],
		["かいものします", "go shopping"],
		["しょくじします", "have a meal"],
		["さんぽします", "take a walk"],
		["たいへん", "hard, tough"],
		["ひろい", "wide, spacious"],
		["せまい", "narrow, small (room)"],
		["プール", "swimming pool"],
		["かわ", "river"],
		["びじゅつ", "fine art"],
		["つり", "fishing"],
		["スキー", "skiing"],
		["しゅうまつ", "weekend"],
		["〜ごろ", "around (a time)"],
		["なにか", "something"],
		["どこか", "somewhere"],
		["のどが かわきます", "get thirsty"],
		["おなかが すきます", "get hungry"],
		["そう しましょう", "Let's do that."],
		["ごちゅうもんは？", "What would you like to order?"],
		["ていしょく", "set meal"],
		["ぎゅうどん", "beef bowl"],
		["しょうしょう おまち ください", "Just a moment, please."],
		["べつべつに", "separately"]
	]
};
