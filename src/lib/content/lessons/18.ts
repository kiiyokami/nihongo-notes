import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 18,
	title: "Can, hobbies, before",
	goal: "Make the dictionary form, say what you can do, talk about hobbies, and say what you do before something.",
	patterns: [
		{
			title: "Making the dictionary form",
			formula: "かく ・ たべる ・ する ・ くる",
			meaning: "The plain present form, as it appears in a dictionary.",
			table: {
				head: ["group", "ます-form", "dictionary form"],
				rows: [
					["I", "かきます", "かく"],
					["I", "いきます", "いく"],
					["I", "いそぎます", "いそぐ"],
					["I", "のみます", "のむ"],
					["I", "よびます", "よぶ"],
					["I", "しにます", "しぬ"],
					["I", "つくります", "つくる"],
					["I", "かいます", "かう"],
					["I", "まちます", "まつ"],
					["I", "はなします", "はなす"],
					["II", "たべます", "たべる"],
					["II", "みます", "みる"],
					["III", "します", "する"],
					["III", "きます", "くる"]
				]
			},
			note: "Group I: change the い-sound before ます to an う-sound (かき → かく). Group II: drop ます, add る. します → する, きます → くる."
		},
		{
			title: "Can do",
			formula: "{Verb dict.} ことが できます。",
			meaning: "I can (verb).",
			examples: [
				["わたし[は] ピアノ[を] ひく こと[が] できます。", "I can play the piano."],
				["ここ[で] おかね[を] かえる こと[が] できますか？", "Can I change money here?"],
				["いいえ、できません。", "No, you can't."],
				["スキー[が] できますか？", "Can you ski?"]
			],
			note: "With a noun or a する-verb noun, just use が できます: にほんごが できます, うんてんが できます."
		},
		{
			title: "My hobby is",
			formula: "しゅみは {Verb dict.} ことです。",
			meaning: "My hobby is (verb)ing.",
			examples: [
				["しゅみ[は] なんですか？", "What are your hobbies?"],
				["わたし[の] しゅみ[は] え[を] かく ことです。", "My hobby is drawing."],
				["しゅみ[は] にっき[を] かく ことです。", "My hobby is keeping a diary."]
			]
		},
		{
			title: "Before",
			formula: "{Verb dict.} まえに、…",
			meaning: "Before (verb), …",
			examples: [
				["うち[へ] かえる まえ[に]、スーパー[へ] いきます。", "Before going home I go to the supermarket."],
				["しょくじ[の] まえ[に]、て[を] あらいます。", "I wash my hands before meals."],
				["3ねん まえ[に] けっこんしました。", "I got married three years ago."]
			],
			note: "With a noun, add の: しょくじの まえに. After a length of time, まえに means ago: 3ねん まえに."
		}
	],
	words: [
		["できます", "can do"],
		["あらいます", "wash"],
		["ひきます", "play (an instrument)"],
		["うたいます", "sing"],
		["あつめます", "collect"],
		["すてます", "throw away"],
		["かえます", "exchange (money)"],
		["うんてんします", "drive"],
		["よやくします", "reserve, book"],
		["ピアノ", "piano"],
		["〜メートル", "metre(s)"],
		["げんきん", "cash"],
		["しゅみ", "hobby"],
		["にっき", "diary"],
		["おいのり", "prayer"],
		["かちょう", "section manager"],
		["ぶちょう", "department head"],
		["しゃちょう", "company president"],
		["どうぶつ", "animal"],
		["うま", "horse"],
		["インターネット", "internet"],
		["とくに", "especially"],
		["なかなか", "not easily (with a negative)"],
		["ぜひ", "by all means"],
		["へえ", "Really? Wow."],
		["ほんとうですか", "Really?"],
		["それは おもしろいですね", "That's interesting."]
	]
};
