import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 7,
	title: "Tools, giving and receiving",
	goal: "Say what you use, and who gives, lends or teaches what to whom.",
	patterns: [
		{
			title: "With a tool",
			formula: "{Tool}で{Verb}ます。",
			meaning: "I (verb) with (tool).",
			examples: [
				["はし[で] さかな[を] たべます。", "I eat fish with chopsticks."],
				["なに[で] たべますか？", "What do you eat it with?"]
			],
			note: "で = the means or method."
		},
		{
			title: "In a language",
			formula: "{Language}で{Verb}ます。",
			meaning: "I (verb) in (language).",
			examples: [
				["にほんご[で] レポート[を] かきます。", "I write reports in Japanese."],
				["なにご[で] かきますか？", "What language do you write in?"]
			]
		},
		{
			title: "What is it in …?",
			formula: "{Word}は{Language}で なんですか？",
			meaning: "What is (word) in (language)?",
			examples: [
				["「ありがとう」[は] えいご[で] なんですか？", "What is arigatou in English?"],
				["「Thank you」です。", "It's Thank you."]
			]
		},
		{
			title: "Give and receive",
			formula: "{Person}に あげます ・ もらいます",
			meaning: "give to (person) · receive from (person)",
			examples: [
				["かのじょ[は] かれ[に] プレゼント[を] あげます。", "She gives him a present."],
				["かのじょ[は] かれ[に] プレゼント[を] もらいます。", "She gets a present from him."]
			]
		},
		{
			title: "Pairs that work the same way",
			formula: "に = to (giving) ・ に = from (receiving)",
			meaning: "",
			examples: [
				["ともだち[に] おかね[を] かします。", "I lend money to a friend."],
				["ともだち[に] にほんご[を] ならいます。", "I learn Japanese from a friend."]
			],
			table: {
				head: ["giving (に = to)", "receiving (に = from)"],
				rows: [
					["あげます give", "もらいます receive"],
					["かします lend", "かります borrow"],
					["おしえます teach", "ならいます learn"],
					["でんわを かけます call", "でんわを もらいます get a call"]
				]
			}
		},
		{
			title: "Already / not yet",
			formula: "もう{Verb}ましたか？",
			meaning: "Have you (verb)ed yet?",
			examples: [
				["もう ばんごはん[を] たべましたか？", "Have you eaten dinner yet?"],
				["はい、もう たべました。", "Yes, I already ate."],
				["いいえ、まだです。", "No, not yet."]
			]
		}
	],
	words: [
		["あげます", "give"],
		["もらいます", "receive"],
		["かします", "lend"],
		["かります", "borrow"],
		["おしえます", "teach"],
		["ならいます", "learn"],
		["おくります", "send"],
		["きります", "cut"],
		["かけます", "make (a call)"],
		["て", "hand"],
		["はし", "chopsticks"],
		["スプーン", "spoon"],
		["フォーク", "fork"],
		["ナイフ", "knife"],
		["はさみ", "scissors"],
		["パソコン", "computer"],
		["かみ", "paper"],
		["はな", "flower"],
		["シャツ", "shirt"],
		["プレゼント", "present"],
		["にもつ", "luggage"],
		["おかね", "money"],
		["チケット", "ticket"],
		["りょこう", "trip"],
		["おみやげ", "souvenir"],
		["おかあさん", "(someone's) mother"],
		["おとうさん", "(someone's) father"],
		["けしゴム", "eraser"],
		["ホッチキス", "stapler"],
		["セロテープ", "sticky tape"],
		["いただきます", "said before eating"],
		["もう", "already"],
		["まだ", "not yet"],
		["なにご", "what language"]
	]
};
