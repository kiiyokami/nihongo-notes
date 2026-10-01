import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 11,
	title: "Counting",
	goal: "Count things and people, say how long and how often.",
	patterns: [
		{
			title: "How many?",
			formula: "{Noun}が いくつ ありますか？",
			meaning: "How many (noun) are there?",
			examples: [
				["つくえ[の] うえ[に] みかん[が] いくつ ありますか？", "How many oranges are on the desk?"],
				["よっつ あります。", "There are four."]
			],
			note: "The number goes after the particle: りんご[を] みっつ かいました."
		},
		{
			title: "Counters",
			formula: "つ ・ にん ・ まい ・ だい",
			meaning: "things · people · flat things · machines and vehicles",
			examples: [
				["かぞく[は] なんにん いますか？", "How many people are in your family?"],
				["くるま[が] にだい あります。", "There are two cars."]
			],
			table: {
				head: ["#", "things", "people", "flat ～まい", "machines ～だい"],
				rows: [
					["1", "ひとつ", "ひとり", "いちまい", "いちだい"],
					["2", "ふたつ", "ふたり", "にまい", "にだい"],
					["3", "みっつ", "さんにん", "さんまい", "さんだい"],
					["4", "よっつ", "よにん", "よんまい", "よんだい"],
					["5", "いつつ", "ごにん", "ごまい", "ごだい"],
					["6", "むっつ", "ろくにん", "ろくまい", "ろくだい"],
					["7", "ななつ", "ななにん", "ななまい", "ななだい"],
					["8", "やっつ", "はちにん", "はちまい", "はちだい"],
					["9", "ここのつ", "きゅうにん", "きゅうまい", "きゅうだい"],
					["10", "とお", "じゅうにん", "じゅうまい", "じゅうだい"],
					["?", "いくつ", "なんにん", "なんまい", "なんだい"]
				],
				quiz: ["# thing|# things", "# person|# people", "# flat thing|# flat things", "# machine|# machines"]
			},
			note: "Also: 〜ほん for long things (pens, bottles), 〜こ for small objects."
		},
		{
			title: "How long",
			formula: "ふん ・ じかん ・ にち ・ しゅうかん ・ かげつ ・ ねん",
			meaning: "minutes · hours · days · weeks · months · years",
			examples: [
				["2じかん べんきょうしました。", "I studied for two hours."]
			],
			table: {
				head: ["#", "minutes", "hours", "days", "weeks", "months", "years"],
				rows: [
					["1", "いっぷん", "いちじかん", "いちにち", "いっしゅうかん", "いっかげつ", "いちねん"],
					["2", "にふん", "にじかん", "ふつか", "にしゅうかん", "にかげつ", "にねん"],
					["3", "さんぷん", "さんじかん", "みっか", "さんしゅうかん", "さんかげつ", "さんねん"],
					["4", "よんぷん", "よじかん", "よっか", "よんしゅうかん", "よんかげつ", "よねん"],
					["5", "ごふん", "ごじかん", "いつか", "ごしゅうかん", "ごかげつ", "ごねん"],
					["6", "ろっぷん", "ろくじかん", "むいか", "ろくしゅうかん", "ろっかげつ", "ろくねん"],
					["7", "ななふん", "ななじかん", "なのか", "ななしゅうかん", "ななかげつ", "ななねん"],
					["8", "はっぷん", "はちじかん", "ようか", "はっしゅうかん", "はちかげつ", "はちねん"],
					["9", "きゅうふん", "くじかん", "ここのか", "きゅうしゅうかん", "きゅうかげつ", "きゅうねん"],
					["10", "じゅっぷん", "じゅうじかん", "とおか", "じゅっしゅうかん", "じゅっかげつ", "じゅうねん"]
				],
				quiz: ["# minute|# minutes", "# hour|# hours", "# day|# days", "# week|# weeks", "# month|# months", "# year|# years"]
			}
		},
		{
			title: "How long does it take?",
			formula: "どのくらい かかりますか？",
			meaning: "How long / how much does it take?",
			examples: [
				["にほん[から] イギリス[まで] どのくらい かかりますか？", "How long from Japan to the UK?"],
				["14じかん ぐらい かかります。", "About 14 hours."],
				["60,000えん ぐらい かかります。", "It costs about 60,000 yen."]
			],
			note: "ぐらい (or くらい) = about"
		},
		{
			title: "How often",
			formula: "{Period}に{Number}かい",
			meaning: "(number) times per (period)",
			examples: [
				["いっしゅうかん[に] さんかい べんきょうします。", "I study three times a week."],
				["いちにち[に] いっかい", "once a day"]
			],
			table: {
				head: ["#", "times"],
				rows: [
					["1", "いっかい"],
					["2", "にかい"],
					["3", "さんかい"],
					["4", "よんかい"],
					["5", "ごかい"],
					["6", "ろっかい"],
					["7", "ななかい"],
					["8", "はっかい"],
					["9", "きゅうかい"],
					["10", "じゅっかい"],
					["?", "なんかい"]
				],
				quiz: ["once|# times"]
			}
		}
	],
	words: [
		["いくつ", "how many"],
		["どのくらい", "how long, how much"],
		["ぐらい", "about"],
		["かかります", "take (time), cost"],
		["やすみます", "take a day off"],
		["りんご", "apple"],
		["みかん", "mandarin orange"],
		["カレーライス", "curry rice"],
		["きって", "stamp"],
		["はがき", "postcard"],
		["ふうとう", "envelope"],
		["こうくうびん", "airmail"],
		["ふなびん", "sea mail"],
		["りょうしん", "parents"],
		["きょうだい", "siblings"],
		["ちち", "my father"],
		["はは", "my mother"],
		["あに", "my older brother"],
		["おにいさん", "(someone's) older brother"],
		["あね", "my older sister"],
		["おねえさん", "(someone's) older sister"],
		["おとうと", "my younger brother"],
		["おとうとさん", "(someone's) younger brother"],
		["いもうと", "my younger sister"],
		["いもうとさん", "(someone's) younger sister"],
		["〜かい", "times"]
	]
};
