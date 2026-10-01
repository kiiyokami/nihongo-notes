import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 10,
	title: "Where things are",
	goal: "Say what or who is somewhere, and describe positions.",
	patterns: [
		{
			title: "There is …",
			formula: "{Place}に{Noun}が います ・ あります",
			meaning: "います for people and animals · あります for things",
			examples: [
				["いえ[に] おかあさん[が] います。", "My mother is at home."],
				["いえ[に] テレビ[が] あります。", "There's a TV at home."]
			]
		},
		{
			title: "Who / what is there?",
			formula: "だれが いますか？ ・ なにが ありますか？",
			meaning: "After a question word, always use が.",
			examples: [
				["こうえん[に] だれ[が] いますか？", "Who is in the park?"],
				["こうえん[に] いぬ[が] います。", "There's a dog in the park."],
				["だれも いません。", "Nobody is here."],
				["なにも ありません。", "There's nothing."]
			]
		},
		{
			title: "Positions",
			formula: "{Noun}の{Position}",
			meaning: "on / under / next to … (noun)",
			examples: [
				["つくえ[の] うえ[に] ねこ[が] います。", "There's a cat on the desk."],
				["ゆうびんきょく[は] ぎんこう[の] となり[に] あります。", "The post office is next to the bank."],
				["ほんや[は] はなやと スーパー[の] あいだ[に] あります。", "The bookstore is between the florist and the supermarket."]
			]
		},
		{
			title: "Where is it?",
			formula: "{Noun}は どこに ありますか ・ いますか？",
			meaning: "Where is (noun)?",
			examples: [
				["ねこ[は] どこ[に] いますか？", "Where is the cat?"]
			]
		},
		{
			title: "に or で?",
			formula: "に = where it is ・ で = where you do something",
			meaning: "",
			examples: [
				["えき[の] ちかく[に] ぎんこう[が] あります。", "There's a bank near the station."],
				["えき[の] ちかく[で] ともだち[に] あいました。", "I met a friend near the station."]
			]
		}
	],
	words: [
		["います", "exist (people, animals)"],
		["あります", "exist (things)"],
		["うえ", "on, above"],
		["した", "under"],
		["まえ", "in front"],
		["うしろ", "behind"],
		["みぎ", "right"],
		["ひだり", "left"],
		["なか", "inside"],
		["そと", "outside"],
		["となり", "next to"],
		["ちかく", "near"],
		["あいだ", "between"],
		["おとこのひと", "man"],
		["おんなのひと", "woman"],
		["おとこのこ", "boy"],
		["おんなのこ", "girl"],
		["こども", "child"],
		["いぬ", "dog"],
		["ねこ", "cat"],
		["き", "tree"],
		["はこ", "box"],
		["でんち", "battery"],
		["ドア", "door"],
		["まど", "window"],
		["ポスト", "mailbox"],
		["たな", "shelf"],
		["つくえ", "desk"],
		["テーブル", "table"],
		["ベッド", "bed"],
		["れいぞうこ", "fridge"],
		["スイッチ", "switch"],
		["ビル", "building"],
		["こうえん", "park"],
		["きっさてん", "café"],
		["ほんや", "bookstore"],
		["のりば", "taxi/bus stand"],
		["えき", "station"],
		["いろいろな", "various"]
	]
};
