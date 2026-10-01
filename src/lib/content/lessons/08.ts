import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 8,
	title: "Adjectives",
	goal: "Describe things, and tell い-adjectives from な-adjectives.",
	patterns: [
		{
			title: "Two kinds",
			formula: "い-adjective ・ な-adjective",
			meaning: "い-adjectives end in い: おいしい, たかい. The rest are な: しずか, ひま.",
			note: "Watch out: きれい and ゆうめい end in い but are な-adjectives."
		},
		{
			title: "Describe something",
			formula: "{Noun}は{Adj}です。",
			meaning: "(noun) is (adj).",
			examples: [
				["この コーヒー[は] あついです。", "This coffee is hot."],
				["この へや[は] きれいです。", "This room is clean."]
			]
		},
		{
			title: "Negative",
			formula: "い → くないです ・ な → じゃありません",
			meaning: "",
			table: {
				head: ["", "is", "isn't"],
				rows: [
					["い", "おおきいです", "おおきくないです"],
					["い", "いいです", "よくないです (irregular)"],
					["な", "しずかです", "しずかじゃありません"],
					["な", "きれいです", "きれいじゃありません"]
				]
			}
		},
		{
			title: "Before a noun",
			formula: "{Adj}＋{Noun}",
			meaning: "な-adjectives keep な before a noun.",
			examples: [
				["おいしい ごはん", "delicious food"],
				["しずか[な] まち", "a quiet town"],
				["きれい[な] やま", "a beautiful mountain"]
			]
		},
		{
			title: "Very / not very",
			formula: "とても ・ あまり〜ない",
			meaning: "とても = very · あまり + negative = not very",
			examples: [
				["とても ゆうめい[な] えいがです。", "It's a very famous movie."],
				["あまり さむくないです。", "It's not very cold."]
			]
		},
		{
			title: "How is it?",
			formula: "{Noun}は どうですか？",
			meaning: "How is (noun)? / What do you think of it?",
			examples: [
				["にほん[の] コンビニ[は] どうですか？", "How are Japanese convenience stores?"],
				["べんりです。", "They're convenient."]
			],
			note: "そうですね… at the start of an answer means Hmm, let me think."
		},
		{
			title: "And / but",
			formula: "そして ・ 〜が",
			meaning: "そして = and · が = but",
			examples: [
				["でんしゃ[は] きれいです。そして べんりです。", "The trains are clean. And convenient."],
				["くるま[は] たかいです[が]、いいです。", "The car is expensive, but good."]
			]
		},
		{
			title: "What kind of …?",
			formula: "{A}は どんな{B}ですか？",
			meaning: "What kind of B is A?",
			examples: [
				["ふじさん[は] どんな やまですか？", "What kind of mountain is Mt. Fuji?"],
				["たかい やまです。", "It's a tall mountain."]
			]
		}
	],
	words: [
		["おおきい", "big"],
		["ちいさい", "small"],
		["あたらしい", "new"],
		["ふるい", "old (things)"],
		["いい", "good"],
		["わるい", "bad"],
		["あつい", "hot"],
		["さむい", "cold (weather)"],
		["つめたい", "cold (to touch)"],
		["むずかしい", "difficult"],
		["やさしい", "easy"],
		["たかい", "expensive, tall"],
		["やすい", "cheap"],
		["ひくい", "low"],
		["おもしろい", "interesting"],
		["おいしい", "delicious"],
		["いそがしい", "busy"],
		["たのしい", "fun"],
		["しろい", "white"],
		["くろい", "black"],
		["あかい", "red"],
		["あおい", "blue"],
		["きいろい", "yellow"],
		["ハンサム", "handsome"],
		["きれい", "beautiful, clean"],
		["しずか", "quiet"],
		["にぎやか", "lively"],
		["ゆうめい", "famous"],
		["しんせつ", "kind"],
		["げんき", "healthy, cheerful"],
		["ひま", "free (time)"],
		["べんり", "convenient"],
		["すてき", "wonderful"],
		["あまい", "sweet"],
		["からい", "spicy"],
		["しおからい", "salty"],
		["すっぱい", "sour"],
		["にがい", "bitter"],
		["こい", "strong (taste)"],
		["うすい", "weak (taste)"],
		["やま", "mountain"],
		["さくら", "cherry blossom"],
		["たべもの", "food"],
		["まち", "town"],
		["とても", "very"],
		["あまり", "not very"],
		["どんな", "what kind of"]
	]
};
