import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 19,
	title: "Experiences, lists, becoming",
	goal: "Make the た-form, talk about things you've done before, list a few activities, and say how things change.",
	patterns: [
		{
			title: "Making the た-form",
			formula: "かいた ・ のんだ ・ たべた ・ した",
			meaning: "The plain past form of a verb.",
			table: {
				head: ["group", "て-form", "た-form"],
				rows: [
					["I", "かいて", "かいた"],
					["I", "いって", "いった"],
					["I", "いそいで", "いそいだ"],
					["I", "のんで", "のんだ"],
					["I", "つくって", "つくった"],
					["I", "かって", "かった"],
					["I", "はなして", "はなした"],
					["II", "たべて", "たべた"],
					["II", "みて", "みた"],
					["III", "して", "した"],
					["III", "きて", "きた"]
				]
			},
			note: "Take the て-form and change て to た, で to だ."
		},
		{
			title: "Have done before",
			formula: "{Verb た} ことが あります。",
			meaning: "I have (verb)ed before.",
			examples: [
				["おきなわ[へ] いった こと[が] ありますか？", "Have you ever been to Okinawa?"],
				["はい、いちど あります。", "Yes, once."],
				["うま[に] のった こと[が] ありますか？", "Have you ever ridden a horse?"],
				["いいえ、いちど[も] ありません。", "No, never."]
			],
			note: "This is about experience. For a single event at a known time, use the plain past: きょねん おきなわへ いきました."
		},
		{
			title: "Things like A and B",
			formula: "{Verb た}り、{Verb た}り します。",
			meaning: "I do things like A and B.",
			examples: [
				["にちようび[は] そうじしたり、せんたくしたり します。", "On Sundays I do things like cleaning and laundry."],
				["ふゆやすみ[は] なに[を] しましたか？", "What did you do in the winter holidays?"],
				["おてら[を] みたり、ともだち[と] ゴルフ[を] したり しました。", "I saw temples, played golf with friends, that kind of thing."]
			],
			note: "The tense goes on the final します."
		},
		{
			title: "Becoming",
			formula: "{い-adj}く なります ・ {な-adj / Noun}に なります",
			meaning: "(Something) becomes (adj or noun).",
			examples: [
				["これから だんだん さむく なります。", "It's going to get colder from now on."],
				["にほんご[が] じょうずに なりましたね。", "Your Japanese has got good."],
				["なに[に] なりたいですか？", "What do you want to be?"],
				["いしゃ[に] なりたいです。", "I want to be a doctor."]
			],
			table: {
				head: ["type", "becomes"],
				rows: [
					["い", "さむい → さむく なります"],
					["い", "いい → よく なります"],
					["な", "げんき → げんきに なります"],
					["noun", "25さい → 25さいに なります"]
				]
			}
		},
		{
			title: "How are you feeling?",
			formula: "からだの ちょうしは どうですか。",
			meaning: "How are you feeling?",
			examples: [
				["からだ[の] ちょうし[は] どうですか？", "How are you feeling?"],
				["おかげさまで よく なりました。", "Much better, thank you."]
			]
		}
	],
	words: [
		["のぼります", "climb"],
		["とまります", "stay (at a hotel)"],
		["そうじします", "clean"],
		["せんたくします", "do the laundry"],
		["なります", "become"],
		["ねむい", "sleepy"],
		["つよい", "strong"],
		["よわい", "weak"],
		["むり", "impossible, too much"],
		["れんしゅう", "practice"],
		["ゴルフ", "golf"],
		["すもう", "sumo"],
		["ひ", "day"],
		["ちょうし", "condition"],
		["いちど", "once"],
		["いちども", "never (with a negative)"],
		["だんだん", "gradually"],
		["もうすぐ", "soon"],
		["おかげさまで", "Thanks to you (I'm well)."],
		["かんぱい", "Cheers!"],
		["からだに いい", "good for your health"],
		["ダイエット", "diet"],
		["でも", "but"]
	]
};
