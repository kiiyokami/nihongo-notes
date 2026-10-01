import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 17,
	title: "Don't, must, needn't",
	goal: "Make the ない-form, ask someone not to do something, and say what you must or don't have to do.",
	patterns: [
		{
			title: "Making the ない-form",
			formula: "かかない ・ たべない ・ しない ・ こない",
			meaning: "The plain negative of a verb.",
			table: {
				head: ["group", "ます-form", "ない-form"],
				rows: [
					["I", "かきます", "かかない"],
					["I", "いきます", "いかない"],
					["I", "いそぎます", "いそがない"],
					["I", "のみます", "のまない"],
					["I", "よびます", "よばない"],
					["I", "つくります", "つくらない"],
					["I", "かいます", "かわない"],
					["I", "まちます", "またない"],
					["I", "はなします", "はなさない"],
					["II", "たべます", "たべない"],
					["II", "みます", "みない"],
					["III", "します", "しない"],
					["III", "きます", "こない"]
				]
			},
			note: "Group I: change the い-sound before ます to an あ-sound and add ない (かき → かか). A plain い becomes わ (かい → かわ). Group II: drop ます, add ない. します → しない, きます → こない."
		},
		{
			title: "Please don't",
			formula: "{Verb ない}で ください。",
			meaning: "Please don't (verb).",
			examples: [
				["ここ[に] くるま[を] とめないで ください。", "Please don't park here."],
				["びじゅつかん[の] なか[で] しゃしん[を] とらないで ください。", "Please don't take photos inside the museum."],
				["しんぱいしないで ください。", "Please don't worry."]
			]
		},
		{
			title: "Must",
			formula: "{Verb ない-stem}なければ なりません。",
			meaning: "I have to (verb).",
			examples: [
				["くすり[を] のまなければ なりません。", "I have to take medicine."],
				["あした[から] しゅっちょうしなければ なりません。", "I have to go on a business trip from tomorrow."],
				["レポート[は] きんようび[までに] ださなければ なりません。", "I have to hand in the report by Friday."]
			],
			note: "Drop the い of ない and add ければ なりません: いかない → いかなければ なりません. In speech you'll also hear いかないと いけません."
		},
		{
			title: "Don't have to",
			formula: "{Verb ない-stem}なくても いいです。",
			meaning: "You don't have to (verb).",
			examples: [
				["あした[は] こなくても いいです。", "You don't have to come tomorrow."],
				["くつ[を] ぬがなければ なりませんか？", "Do I have to take my shoes off?"],
				["いいえ、ぬがなくても いいです。", "No, you don't have to."]
			]
		},
		{
			title: "By and until",
			formula: "{Time}までに ・ {Time}まで",
			meaning: "までに: by (a deadline) · まで: until",
			examples: [
				["5じ[までに] かえらなければ なりません。", "I have to be home by 5."],
				["まいにち 5じ[まで] はたらきます。", "I work until 5 every day."]
			]
		},
		{
			title: "The object as the topic",
			formula: "{Object}は {Verb}ます。",
			meaning: "Put the object first with は to make it the topic.",
			examples: [
				["レポート[は] あした かきます。", "As for the report, I'll write it tomorrow."]
			]
		},
		{
			title: "At the doctor",
			formula: "どう しましたか。",
			meaning: "What seems to be the problem?",
			examples: [
				["どう しましたか？", "What seems to be the problem?"],
				["きのう[から] のど[が] いたいです。", "My throat has hurt since yesterday."],
				["ねつ[も] あります。", "I have a fever too."],
				["2、3にち おふろ[に] はいらないで ください。", "Please don't take a bath for two or three days."],
				["おだいじに。", "Take care of yourself."]
			]
		}
	],
	words: [
		["おぼえます", "memorize"],
		["わすれます", "forget"],
		["なくします", "lose"],
		["はらいます", "pay"],
		["かえします", "give back"],
		["でかけます", "go out"],
		["ぬぎます", "take off (clothes, shoes)"],
		["もって いきます", "take (a thing)"],
		["もって きます", "bring (a thing)"],
		["しんぱいします", "worry"],
		["ざんぎょうします", "work overtime"],
		["しゅっちょうします", "go on a business trip"],
		["くすりを のみます", "take medicine"],
		["おふろに はいります", "take a bath"],
		["たいせつ", "important"],
		["だいじょうぶ", "all right, OK"],
		["あぶない", "dangerous"],
		["きんえん", "no smoking"],
		["ほけんしょう", "health insurance card"],
		["ねつ", "fever"],
		["びょうき", "illness"],
		["くすり", "medicine"],
		["おふろ", "bath"],
		["うわぎ", "jacket"],
		["したぎ", "underwear"],
		["のど", "throat"],
		["いたい", "painful, it hurts"],
		["2、3にち", "two or three days"],
		["〜までに", "by (a deadline)"],
		["ですから", "so, therefore"],
		["それから", "after that"],
		["どう しましたか", "What's the matter?"],
		["おだいじに", "Take care of yourself."]
	]
};
