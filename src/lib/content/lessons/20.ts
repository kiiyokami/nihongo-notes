import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 20,
	title: "Plain style",
	goal: "Talk casually with friends and family using plain forms.",
	patterns: [
		{
			title: "Polite and plain forms",
			formula: "いく ・ おおきい ・ ひまだ ・ あめだ",
			meaning: "Every polite form has a plain partner.",
			table: {
				head: ["type", "polite", "plain"],
				rows: [
					["verb", "いきます", "いく"],
					["verb", "いきません", "いかない"],
					["verb", "いきました", "いった"],
					["verb", "いきませんでした", "いかなかった"],
					["verb", "いきたいです", "いきたい"],
					["verb", "いかなければ なりません", "いかなければ ならない"],
					["い", "おおきいです", "おおきい"],
					["い", "おおきくないです", "おおきくない"],
					["い", "おおきかったです", "おおきかった"],
					["い", "おおきくなかったです", "おおきくなかった"],
					["な", "ひまです", "ひまだ"],
					["な", "ひまじゃ ありません", "ひまじゃ ない"],
					["な", "ひまでした", "ひまだった"],
					["な", "ひまじゃ ありませんでした", "ひまじゃ なかった"],
					["noun", "あめです", "あめだ"],
					["noun", "あめじゃ ありません", "あめじゃ ない"],
					["noun", "あめでした", "あめだった"],
					["noun", "あめじゃ ありませんでした", "あめじゃ なかった"]
				]
			},
			note: "Plain style is for friends and family. い-adjectives just drop です; な-adjectives and nouns use だ."
		},
		{
			title: "Casual questions",
			formula: "{Plain}？",
			meaning: "No か: the question is in the rising voice.",
			examples: [
				["コーヒー のむ？", "Want some coffee?"],
				["うん、のむ。", "Yeah, I'll have some."],
				["あした ひま？", "Are you free tomorrow?"],
				["ううん、いそがしい。", "No, I'm busy."],
				["きのう やまださん[に] あった？", "Did you see Yamada yesterday?"]
			],
			note: "Particles like を, が and へ are often dropped, and so is だ in questions (ひま？). はい → うん, いいえ → ううん."
		},
		{
			title: "Casual invitations",
			formula: "{Verb ない}？",
			meaning: "Want to (verb)? (casual)",
			examples: [
				["いっしょに いかない？", "Want to go together?"],
				["うん、いいね。", "Yeah, sounds good."]
			]
		},
		{
			title: "But (casual)",
			formula: "{Plain}けど、…",
			meaning: "…, but … (casual が)",
			examples: [
				["この へや[は] せまい[けど]、やすい。", "This room is small, but it's cheap."],
				["なにか たべる？", "Want to eat something?"],
				["いま おなか[が] いっぱいだ[から]、なに[も] たべたくない。", "I'm full now, so I don't want anything."]
			]
		}
	],
	words: [
		["いります", "need"],
		["しらべます", "look up, check"],
		["しゅうりします", "repair"],
		["ぼく", "I (casual, used by men)"],
		["きみ", "you (casual, used by men)"],
		["〜くん", "(after a boy's name)"],
		["うん", "yeah"],
		["ううん", "no, nah"],
		["ことば", "word, language"],
		["きもの", "kimono"],
		["ビザ", "visa"],
		["はじめ", "beginning"],
		["おわり", "end"],
		["こっち", "this way (casual こちら)"],
		["そっち", "that way (casual そちら)"],
		["あっち", "over there (casual あちら)"],
		["どっち", "which way, which one (casual どちら)"],
		["みんなで", "all together"],
		["〜けど", "but (casual が)"],
		["おなかが いっぱいです", "I'm full."],
		["よかったら", "if you like"],
		["いろいろ", "various"]
	]
};
