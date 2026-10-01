import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 14,
	title: "Asking, offering, doing now",
	goal: "Make the て-form, ask someone to do something, offer to help, and say what's happening right now.",
	patterns: [
		{
			title: "Making the て-form",
			formula: "かいて ・ のんで ・ たべて ・ して",
			meaning: "The linking form of a verb. Many patterns from here on are built on it.",
			table: {
				head: ["group", "ます-form", "て-form"],
				rows: [
					["I", "かきます", "かいて"],
					["I", "いきます", "いって (exception)"],
					["I", "いそぎます", "いそいで"],
					["I", "のみます", "のんで"],
					["I", "よびます", "よんで"],
					["I", "しにます", "しんで"],
					["I", "つくります", "つくって"],
					["I", "かいます", "かって"],
					["I", "まちます", "まって"],
					["I", "はなします", "はなして"],
					["II", "たべます", "たべて"],
					["II", "みます", "みて"],
					["III", "します", "して"],
					["III", "きます", "きて"]
				]
			},
			note: "Group I goes by the sound before ます: き → いて, ぎ → いで, み・び・に → んで, り・い・ち → って, し → して. Group II (most verbs with an え-sound before ます, plus a few like みます, おきます, かります) and group III just drop ます and add て."
		},
		{
			title: "Please do",
			formula: "{Verb て} ください。",
			meaning: "Please (verb).",
			examples: [
				["ちょっと まって ください。", "Please wait a moment."],
				["ここ[に] じゅうしょ[を] かいて ください。", "Please write your address here."],
				["すみませんが、しお[を] とって ください。", "Excuse me, could you pass the salt?"],
				["もう すこし ゆっくり はなして ください。", "Please speak a little more slowly."]
			]
		},
		{
			title: "Shall I …?",
			formula: "{Verb stem}ましょうか。",
			meaning: "Shall I (verb) for you?",
			examples: [
				["エアコン[を] つけましょうか？", "Shall I turn on the air conditioner?"],
				["ええ、おねがいします。", "Yes, please."],
				["タクシー[を] よびましょうか？", "Shall I call a taxi?"],
				["いいえ、けっこうです。", "No, thank you."]
			]
		},
		{
			title: "Happening now",
			formula: "{Verb て} います。",
			meaning: "(Someone) is (verb)ing right now.",
			examples: [
				["いま なに[を] して いますか？", "What are you doing now?"],
				["てがみ[を] かいて います。", "I'm writing a letter."],
				["こども[は] こうえん[で] あそんで います。", "The kids are playing in the park."],
				["そと[は] あめ[が] ふって います。", "It's raining outside."]
			]
		},
		{
			title: "In a taxi",
			formula: "{Place}まで おねがいします。",
			meaning: "To (place), please.",
			examples: [
				["えき[まで] おねがいします。", "To the station, please."],
				["つぎ[の] しんごう[を] みぎ[へ] まがって ください。", "Turn right at the next light, please."],
				["まっすぐ いって ください。", "Go straight on, please."],
				["あの みせ[の] まえ[で] とめて ください。", "Please stop in front of that shop."],
				["これ[で] おねがいします。", "Here you are (handing over money)."]
			]
		}
	],
	words: [
		["あけます", "open"],
		["しめます", "close"],
		["つけます", "turn on"],
		["けします", "turn off"],
		["いそぎます", "hurry"],
		["まちます", "wait"],
		["もちます", "hold, carry"],
		["とります", "take, pass"],
		["てつだいます", "help"],
		["よびます", "call"],
		["はなします", "speak, talk"],
		["つかいます", "use"],
		["とめます", "stop, park"],
		["みせます", "show"],
		["すわります", "sit down"],
		["たちます", "stand up"],
		["ふります", "fall (rain, snow)"],
		["コピーします", "copy"],
		["でんき", "light, electricity"],
		["エアコン", "air conditioner"],
		["パスポート", "passport"],
		["なまえ", "name"],
		["じゅうしょ", "address"],
		["ちず", "map"],
		["しお", "salt"],
		["さとう", "sugar"],
		["もんだい", "question, problem"],
		["こたえ", "answer"],
		["よみかた", "how to read"],
		["〜かた", "how to (verb)"],
		["まっすぐ", "straight"],
		["ゆっくり", "slowly"],
		["すぐ", "right away"],
		["また", "again"],
		["あとで", "later"],
		["もう すこし", "a little more"],
		["もう〜", "another, one more"],
		["さあ", "right then, come on"],
		["あれ？", "Huh? (surprise)"],
		["おつり", "change (money)"]
	]
};
