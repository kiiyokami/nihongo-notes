import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 6,
	title: "Doing things (を)",
	goal: "Say what you eat, drink, watch, and invite someone to join you.",
	patterns: [
		{
			title: "Object + verb",
			formula: "{Noun}を{Verb}ます。",
			meaning: "I (verb) (noun).",
			examples: [
				["パン[を] たべます。", "I eat bread."],
				["みず[を] のみます。", "I drink water."],
				["テレビ[を] みます。", "I watch TV."]
			],
			note: "を marks the thing the action is done to."
		},
		{
			title: "Noun + します",
			formula: "{Noun}を します。",
			meaning: "Many activities use します.",
			examples: [
				["サッカー[を] します。", "I play soccer."],
				["しゅくだい[を] します。", "I do homework."],
				["でんわ[を] します。", "I make a phone call."]
			]
		},
		{
			title: "Meet someone",
			formula: "{Person}に あいます。",
			meaning: "I meet (person).",
			examples: [
				["ともだち[に] あいます。", "I meet a friend."],
				["だれ[と] あいますか？", "Who are you meeting?"]
			]
		},
		{
			title: "Did you …?",
			formula: "…ましたか？",
			meaning: "Yes: ました · No: ませんでした",
			examples: [
				["きのう あさごはん[を] たべましたか？", "Did you eat breakfast yesterday?"],
				["はい、たべました。", "Yes, I did."],
				["いいえ、たべませんでした。", "No, I didn't."]
			]
		},
		{
			title: "What do you …?",
			formula: "なにを{Verb}ますか？",
			meaning: "What do you (verb)?",
			examples: [
				["なに[を] のみますか？", "What will you drink?"],
				["なにも たべません。", "I don't eat anything."],
				["だれとも あいません。", "I don't meet anyone."]
			]
		},
		{
			title: "Where you do it",
			formula: "{Place}で{Noun}を{Verb}ます。",
			meaning: "I (verb) (noun) at (place).",
			examples: [
				["いえ[で] べんきょう[を] します。", "I study at home."],
				["どこ[で] ひるごはん[を] たべますか？", "Where do you eat lunch?"]
			]
		},
		{
			title: "Always / sometimes",
			formula: "いつも ・ ときどき",
			meaning: "always · sometimes",
			examples: [
				["いつも がっこう[で] べんきょうします。", "I always study at school."]
			]
		},
		{
			title: "Invite someone",
			formula: "いっしょに{Verb}ませんか？",
			meaning: "Would you like to (verb) together?",
			examples: [
				["いっしょに こうちゃ[を] のみませんか？", "Shall we have some tea?"],
				["ええ、のみましょう。", "Sure, let's."],
				["すみません、ちょっと…", "Sorry, that's a bit… (a polite no)"]
			],
			note: "〜ましょう = let's. Japanese speakers rarely say a direct no."
		},
		{
			title: "And then",
			formula: "それから",
			meaning: "after that, then",
			examples: [
				["にほんご[を] べんきょうします。それから デパート[へ] いきます。", "I'll study Japanese, then go to the department store."]
			]
		},
		{
			title: "なん or なに?",
			formula: "なん ・ なに",
			meaning: "Both mean what.",
			table: {
				head: ["use", "when"],
				rows: [
					["なん", "before た・だ・な sounds: なんですか · なんの"],
					["なん", "before counters: なんさい · なんじ"],
					["なに", "everything else: なにを · なにで"]
				]
			},
			note: "なんで can mean how or why."
		}
	],
	words: [
		["たべます", "eat"],
		["のみます", "drink"],
		["みます", "watch, see"],
		["ききます", "listen"],
		["よみます", "read"],
		["かきます", "write"],
		["かいます", "buy"],
		["すいます", "smoke"],
		["とります", "take (a photo)"],
		["あいます", "meet"],
		["します", "do"],
		["ごはん", "meal, rice"],
		["あさごはん", "breakfast"],
		["ひるごはん", "lunch"],
		["ばんごはん", "dinner"],
		["パン", "bread"],
		["たまご", "egg"],
		["さかな", "fish"],
		["にく", "meat"],
		["やさい", "vegetables"],
		["ぎゅうにく", "beef"],
		["ぶたにく", "pork"],
		["とりにく", "chicken"],
		["くだもの", "fruit"],
		["みず", "water"],
		["おちゃ", "green tea"],
		["こうちゃ", "black tea"],
		["ぎゅうにゅう", "milk"],
		["ビール", "beer"],
		["おさけ", "alcohol"],
		["ジュース", "juice"],
		["えいが", "movie"],
		["おんがく", "music"],
		["てがみ", "letter"],
		["しゅくだい", "homework"],
		["しゃしん", "photo"],
		["テニス", "tennis"],
		["サッカー", "soccer"],
		["みせ", "shop"],
		["レストラン", "restaurant"],
		["いえ", "house, home"],
		["けさ", "this morning"],
		["まいあさ", "every morning"],
		["まいにち", "every day"],
		["いつも", "always"],
		["ときどき", "sometimes"],
		["いっしょに", "together"],
		["それから", "after that"]
	]
};
