import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 9,
	title: "Likes, skills, reasons",
	goal: "Say what you like, what you're good at, what you understand, and why.",
	patterns: [
		{
			title: "Like / dislike",
			formula: "{Noun}が すきです ・ きらいです",
			meaning: "I like / dislike (noun).",
			examples: [
				["すし[が] すきです。", "I like sushi."],
				["さかな[が] きらいです。", "I don't like fish."],
				["どんな たべもの[が] すきですか？", "What kind of food do you like?"]
			]
		},
		{
			title: "How much you like it",
			formula: "とても すき → とても きらい",
			meaning: "",
			table: {
				head: ["", "meaning"],
				rows: [
					["とても すきです", "I really like it"],
					["すきです", "I like it"],
					["きらいじゃありません", "I don't dislike it"],
					["まあまあです", "It's so-so"],
					["あまり すきじゃありません", "I don't really like it"],
					["きらいです", "I dislike it"],
					["とても きらいです", "I really dislike it"]
				]
			}
		},
		{
			title: "Good / bad at",
			formula: "{Noun}が じょうずです ・ へたです",
			meaning: "(person) is good / bad at (noun).",
			examples: [
				["マリアさん[は] りょうり[が] じょうずです。", "Maria is good at cooking."],
				["わたし[は] カラオケ[が] へたです。", "I'm bad at karaoke."]
			]
		},
		{
			title: "How well you understand",
			formula: "{Noun}が わかります",
			meaning: "",
			examples: [
				["ひらがな[が] よく わかります。", "I understand hiragana well."]
			],
			table: {
				head: ["", "meaning"],
				rows: [
					["よく わかります", "I understand well"],
					["だいたい わかります", "I mostly understand"],
					["すこし わかります", "I understand a little"],
					["あまり わかりません", "I don't understand much"],
					["ぜんぜん わかりません", "I don't understand at all"]
				]
			}
		},
		{
			title: "Have",
			formula: "{Noun}が あります",
			meaning: "I have (noun).",
			examples: [
				["じかん[が] あります。", "I have time."],
				["ようじ[が] あります。", "I have something to do."],
				["おかね[が] ぜんぜん ありません。", "I have no money at all."]
			],
			note: "たくさん = a lot · すこし = a little"
		},
		{
			title: "Because …",
			formula: "{Reason}から、{Result}。",
			meaning: "Because (reason), (result).",
			examples: [
				["コーヒー[が] すきです[から]、まいにち のみます。", "I like coffee, so I drink it every day."]
			]
		},
		{
			title: "Why?",
			formula: "どうしてですか？",
			meaning: "Why? Answer with 〜から.",
			examples: [
				["どうして にほんご[を] べんきょうしますか？", "Why do you study Japanese?"],
				["たのしいです[から]。", "Because it's fun."]
			],
			note: "どうして = neutral · なぜ = formal · なんで = casual"
		}
	],
	words: [
		["すき", "like"],
		["きらい", "dislike"],
		["じょうず", "good at"],
		["へた", "bad at"],
		["わかります", "understand"],
		["あります", "have"],
		["りょうり", "cooking"],
		["のみもの", "drinks"],
		["スポーツ", "sports"],
		["やきゅう", "baseball"],
		["ダンス", "dance"],
		["カラオケ", "karaoke"],
		["うた", "song"],
		["え", "picture"],
		["こまかい おかね", "small change"],
		["じかん", "time"],
		["ようじ", "errand, plans"],
		["やくそく", "appointment"],
		["ひらがな", "hiragana"],
		["かんじ", "kanji"],
		["しゅじん", "my husband"],
		["ごしゅじん", "(someone's) husband"],
		["つま", "my wife"],
		["おくさん", "(someone's) wife"],
		["よく", "well"],
		["だいたい", "mostly"],
		["すこし", "a little"],
		["ぜんぜん", "not at all"],
		["たくさん", "a lot"],
		["どうして", "why"]
	]
};
