import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 2,
	title: "This, that, whose",
	goal: "Point at things, ask what they are and who they belong to.",
	patterns: [
		{
			title: "This / that / that over there",
			formula: "これ ・ それ ・ あれ",
			meaning: "this (near me) · that (near you) · that (over there)",
			examples: [
				["この ほん", "this book (この/その/あの go before a noun)"]
			]
		},
		{
			title: "What is this?",
			formula: "これは なんですか？",
			meaning: "What is this?",
			examples: [
				["これ[は] ほんですか？", "Is this a book?"]
			]
		},
		{
			title: "A or B?",
			formula: "{A}ですか、{B}ですか。",
			meaning: "Is it A or B?",
			examples: [
				["これ[は] ほんですか、しんぶんですか。", "Is this a book or a newspaper?"]
			]
		},
		{
			title: "What kind of …?",
			formula: "これは なんの{Noun}ですか？",
			meaning: "What kind of (noun) is this?",
			examples: [
				["これ[は] なん[の] ほんですか？", "What kind of book is this?"],
				["えいご[の] ほんです。", "It's an English book."]
			]
		},
		{
			title: "Whose is it?",
			formula: "これは だれの{Noun}ですか？",
			meaning: "Whose (noun) is this?",
			examples: [
				["これ[は] だれ[の] くつですか？", "Whose shoes are these?"],
				["ジョンさん[の] くつです。", "They're John's shoes."],
				["この くつ[は] ジョンさん[の]です。", "These shoes are John's."]
			],
			note: "の shows who owns it. You can drop the noun after の when it's obvious."
		}
	],
	words: [
		["ほん", "book"],
		["しんぶん", "newspaper"],
		["ざっし", "magazine"],
		["くつ", "shoes"],
		["さいふ", "wallet"],
		["えんぴつ", "pencil"],
		["シャーペン", "mechanical pencil"],
		["チョコ", "chocolate"],
		["えいご", "English (language)"],
		["これ", "this"],
		["それ", "that (near you)"],
		["あれ", "that (over there)"],
		["この", "this (+ noun)"],
		["その", "that (+ noun)"],
		["あの", "that over there (+ noun)"]
	]
};
