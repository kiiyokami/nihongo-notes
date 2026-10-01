import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 21,
	title: "I think, they said",
	goal: "Give your opinion, report what someone said, and check that someone agrees.",
	patterns: [
		{
			title: "I think",
			formula: "{Plain}と おもいます。",
			meaning: "I think (that) …",
			examples: [
				["あした[は] いい てんきだ[と] おもいます。", "I think it'll be nice weather tomorrow."],
				["かいぎ[は] たぶん 3じ[に] おわる[と] おもいます。", "I think the meeting will probably finish at 3."],
				["さとうさん[は] もう かえった[と] おもいます。", "I think Ms Sato has already gone home."]
			],
			note: "Nouns and な-adjectives need だ before と: げんきだと おもいます."
		},
		{
			title: "What do you think?",
			formula: "{Topic}に ついて どう おもいますか。",
			meaning: "What do you think about (topic)?",
			examples: [
				["にほん[の] こうつう[に] ついて どう おもいますか？", "What do you think about transport in Japan?"],
				["べんりだ[と] おもいます。", "I think it's convenient."],
				["わたし[も] そう おもいます。", "I think so too."],
				["わたし[は] そう おもいません。", "I don't think so."]
			]
		},
		{
			title: "Quoting",
			formula: "「…」と いいます ・ {Plain}と いいました",
			meaning: "say 「…」 · said that …",
			examples: [
				["ねる まえ[に] 「おやすみなさい」[と] いいます。", "Before bed you say 「おやすみなさい」."],
				["かちょう[に] あした やすみたい[と] いいました。", "I told the section manager I want tomorrow off."],
				["ミラーさん[は] パーティー[に] いかない[と] いいました。", "Mr Miller said he isn't going to the party."]
			]
		},
		{
			title: "…, right?",
			formula: "{Plain}でしょう？",
			meaning: "…, right? (checking the listener agrees)",
			examples: [
				["きのう[の] しあい[は] すごかった でしょう？", "Yesterday's match was amazing, right?"],
				["ええ、ほんとうに すごかったです。", "Yes, it really was."],
				["あした パーティー[に] くる でしょう？", "You're coming to the party tomorrow, right?"]
			]
		},
		{
			title: "Events happen",
			formula: "{Place}で {Event}が あります。",
			meaning: "(Event) is held in (place).",
			examples: [
				["7がつ[に] きょうと[で] おまつり[が] あります。", "There's a festival in Kyoto in July."],
				["こんばん テレビ[で] サッカー[の] しあい[が] あります。", "There's a soccer match on TV tonight."]
			]
		}
	],
	words: [
		["おもいます", "think"],
		["いいます", "say"],
		["かちます", "win"],
		["まけます", "lose (a game)"],
		["うごきます", "move, work (machine)"],
		["やめます", "quit (a job)"],
		["やくに たちます", "be useful"],
		["りゅうがくします", "study abroad"],
		["むだ", "wasteful"],
		["ふべん", "inconvenient"],
		["すごい", "amazing"],
		["ほんとう", "true"],
		["うそ", "lie"],
		["じどうしゃ", "car, automobile"],
		["こうつう", "transport, traffic"],
		["ぶっか", "prices"],
		["ほうそう", "broadcast"],
		["ニュース", "news"],
		["アニメ", "anime"],
		["マンガ", "manga, comics"],
		["デザイン", "design"],
		["ゆめ", "dream"],
		["てんさい", "genius"],
		["しあい", "match, game"],
		["いけん", "opinion"],
		["はなし", "talk, story"],
		["ちきゅう", "the earth"],
		["つき", "the moon"],
		["さいきん", "recently"],
		["たぶん", "probably"],
		["きっと", "surely"],
		["ほんとうに", "really"],
		["そんなに", "(not) that much"],
		["〜に ついて", "about"],
		["ひさしぶりですね", "Long time no see."],
		["もちろん", "of course"],
		["もう かえらないと", "I have to go home now."]
	]
};
