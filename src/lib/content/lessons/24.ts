import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 24,
	title: "Giving, receiving and favours",
	goal: "Say who gave you what, and who did what for whom.",
	patterns: [
		{
			title: "Someone gives me",
			formula: "{Person}は わたしに {Thing}を くれます。",
			meaning: "(Person) gives me (thing).",
			examples: [
				["ともだち[が] わたし[に] ほん[を] くれました。", "A friend gave me a book."],
				["おばあちゃん[は] いつも おかし[を] くれます。", "Grandma always gives me sweets."]
			],
			note: "あげます is giving away from you; くれます is giving to you or your family. もらいます is the same event from the receiver's side."
		},
		{
			title: "Doing a favour",
			formula: "{Verb て} あげます ・ もらいます ・ くれます",
			meaning: "Who does the favour, and for whom.",
			table: {
				head: ["form", "meaning"],
				rows: [
					["〜て あげます", "I do it for someone"],
					["〜て もらいます", "I get someone to do it for me"],
					["〜て くれます", "someone does it for me"]
				]
			},
			examples: [
				["わたし[は] いもうと[に] しゅくだい[を] おしえて あげました。", "I helped my younger sister with her homework."],
				["わたし[は] ともだち[に] ひっこし[を] てつだって もらいました。", "I had a friend help me move."],
				["さとうさん[が] まち[を] あんないして くれました。", "Ms Sato showed me around the town."],
				["ぜんぶ じぶん[で] つくりましたか？", "Did you make it all yourself?"],
				["いいえ、はは[に] てつだって もらいました。", "No, my mum helped me."]
			],
			note: "With もらいます, the helper takes に: ともだちに てつだって もらいました."
		},
		{
			title: "Offering to help",
			formula: "{Verb stem}に いきましょうか。",
			meaning: "Shall I come and (verb)?",
			examples: [
				["ひっこし[を] てつだい[に] いきましょうか？", "Shall I come and help you move?"],
				["くるま[で] えき[まで] おくりましょうか？", "Shall I drive you to the station?"]
			]
		}
	],
	words: [
		["くれます", "give (to me)"],
		["なおします", "fix, correct"],
		["つれて いきます", "take (a person)"],
		["つれて きます", "bring (a person)"],
		["ひとを おくります", "take someone home, see someone off"],
		["しょうかいします", "introduce"],
		["あんないします", "show around"],
		["せつめいします", "explain"],
		["おじいさん", "grandfather, old man"],
		["おばあさん", "grandmother, old woman"],
		["おじいちゃん", "grandpa"],
		["おばあちゃん", "grandma"],
		["じゅんび", "preparation"],
		["ひっこし", "moving house"],
		["おかし", "sweets, snacks"],
		["ホームステイ", "homestay"],
		["ぜんぶ", "all"],
		["じぶんで", "by yourself"],
		["ほかに", "besides, anything else"]
	]
};
