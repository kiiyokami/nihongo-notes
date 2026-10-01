import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 16,
	title: "Linking actions and describing",
	goal: "Join actions in order, say what you do after something, describe people and places, and ask how to get somewhere.",
	patterns: [
		{
			title: "Doing things in order",
			formula: "{Verb て}、{Verb て}、{Verb}ます。",
			meaning: "I do A, then B, then C.",
			examples: [
				["あさ おきて、シャワー[を] あびて、かいしゃ[へ] いきます。", "In the morning I get up, have a shower and go to work."],
				["きのう[は] デパート[へ] いって、くつ[を] かって、うち[へ] かえりました。", "Yesterday I went to a department store, bought shoes and went home."]
			],
			note: "Only the last verb shows the tense."
		},
		{
			title: "After doing",
			formula: "{Verb て}から、{Verb}ます。",
			meaning: "After (verb), I …",
			examples: [
				["ばんごはん[を] たべて[から]、しゅくだい[を] します。", "I do my homework after dinner."],
				["おかね[を] いれて[から]、ボタン[を] おします。", "Put the money in, then press the button."]
			]
		},
		{
			title: "Describing a part",
			formula: "{Topic}は {Part}が {Adj}です。",
			meaning: "(Topic)'s (part) is (adj).",
			examples: [
				["ぞう[は] はな[が] ながいです。", "Elephants have long noses."],
				["あに[は] せ[が] たかいです。", "My older brother is tall."],
				["おおさか[は] たべもの[が] おいしいです。", "The food in Osaka is good."]
			]
		},
		{
			title: "Two adjectives together",
			formula: "{い-adj}くて、… ・ {な-adj}で、…",
			meaning: "(adj) and (adj)",
			examples: [
				["わたし[の] へや[は] せまくて、くらいです。", "My room is small and dark."],
				["きょうと[は] しずかで、きれいな まちです。", "Kyoto is a quiet, pretty city."]
			],
			table: {
				head: ["type", "joining form"],
				rows: [
					["い", "あかるい → あかるくて"],
					["い", "いい → よくて"],
					["な", "しずか → しずかで"],
					["noun", "がくせい → がくせいで"]
				]
			}
		},
		{
			title: "How do I get there?",
			formula: "どうやって いきますか。",
			meaning: "How do I get there?",
			examples: [
				["だいがく[まで] どうやって いきますか？", "How do you get to the university?"],
				["2ばん[の] バス[に] のって、びょういん[の] まえ[で] おります。", "Take bus number 2 and get off in front of the hospital."]
			],
			note: "Getting on takes に (バスに のります); getting off takes を (バスを おります)."
		},
		{
			title: "Which one?",
			formula: "どれ ・ どの {Noun}",
			meaning: "which one · which (noun), out of three or more",
			examples: [
				["あなた[の] かさ[は] どれですか？", "Which umbrella is yours?"],
				["あの あおくて、あたらしい かさです。", "That new blue one."],
				["さとうさん[は] どの ひとですか？", "Which one is Mr Sato?"],
				["あの かみ[が] みじかい ひとです。", "The one with short hair."]
			]
		}
	],
	words: [
		["のります", "get on"],
		["おります", "get off"],
		["のりかえます", "change (trains)"],
		["あびます", "take (a shower)"],
		["いれます", "put in"],
		["だします", "take out, hand in"],
		["おろします", "withdraw (money)"],
		["おします", "press, push"],
		["はじめます", "start"],
		["けんがくします", "visit (to look around)"],
		["でんわします", "phone"],
		["わかい", "young"],
		["ながい", "long"],
		["みじかい", "short"],
		["あかるい", "bright"],
		["くらい", "dark"],
		["みどり", "green"],
		["からだ", "body"],
		["あたま", "head"],
		["かみ", "hair"],
		["かお", "face"],
		["め", "eye"],
		["みみ", "ear"],
		["はな", "nose"],
		["くち", "mouth"],
		["は", "tooth"],
		["おなか", "stomach"],
		["あし", "leg, foot"],
		["せ", "height (せが たかい: tall)"],
		["おてら", "temple"],
		["じんじゃ", "shrine"],
		["シャワー", "shower"],
		["ジョギング", "jogging"],
		["キャッシュカード", "bank card"],
		["あんしょうばんごう", "PIN"],
		["きんがく", "amount (of money)"],
		["かくにん", "check, confirmation"],
		["ボタン", "button"],
		["〜ばん", "number (16ばん: number 16)"],
		["どうやって", "how (by what means)"],
		["どれ", "which one"],
		["どの〜", "which (noun)"],
		["まず", "first of all"],
		["つぎに", "next"],
		["すごいですね", "That's amazing."],
		["まだまだです", "I've still got a long way to go."]
	]
};
