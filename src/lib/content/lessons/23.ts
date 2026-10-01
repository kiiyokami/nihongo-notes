import type { Lesson } from '../types';

export const lesson: Lesson = {
	n: 23,
	title: "When, and if you do this",
	goal: "Say when something happens, say what always follows an action, and give directions.",
	patterns: [
		{
			title: "When …",
			formula: "{Plain} とき、…",
			meaning: "When (something), …",
			examples: [
				["ひまな とき、うち[へ] あそび[に] きて ください。", "Come and visit when you're free."],
				["こども[の] とき、よく かわ[で] およぎました。", "When I was a child, I often swam in the river."],
				["からだ[の] ちょうし[が] わるい とき、この くすり[を] のみます。", "I take this medicine when I don't feel well."]
			],
			table: {
				head: ["type", "when"],
				rows: [
					["verb", "かりる とき"],
					["い", "さむい とき"],
					["な", "ひまな とき"],
					["noun", "こどもの とき"]
				]
			}
		},
		{
			title: "Before or after?",
			formula: "{Verb dict.} とき ・ {Verb た} とき",
			meaning: "Dictionary form: before it happens. た-form: once it has happened.",
			examples: [
				["くに[へ] かえる とき、おみやげ[を] かいます。", "When I go back to my country, I buy presents (before leaving)."],
				["くに[へ] かえった とき、ともだち[に] あいます。", "When I'm back in my country, I see my friends."],
				["うち[へ] かえった とき、「ただいま」[と] いいます。", "When I get home, I say 「ただいま」."]
			]
		},
		{
			title: "Do this and that happens",
			formula: "{Verb dict.}と、…",
			meaning: "When you do A, B always happens.",
			examples: [
				["ここ[を] おす[と]、おゆ[が] でます。", "Press here and hot water comes out."],
				["これ[を] まわす[と]、おと[が] おおきく なります。", "Turn this and the sound gets louder."],
				["この みち[を] まっすぐ いく[と]、みぎ[に] こうえん[が] あります。", "Go straight along this road and there's a park on the right."]
			],
			note: "The second half is something that just happens, never a request or a wish."
		},
		{
			title: "Giving directions",
			formula: "{Place}を まがります ・ わたります",
			meaning: "Moving through or along a place takes を.",
			examples: [
				["つぎ[の] かど[を] ひだり[へ] まがって ください。", "Turn left at the next corner."],
				["はし[を] わたって、まっすぐ いきます。", "Cross the bridge and go straight on."],
				["ふたつめ[の] しんごう[を] みぎ[へ] まがります。", "Turn right at the second traffic light."]
			]
		}
	],
	words: [
		["せんせいに ききます", "ask (the teacher)"],
		["まわします", "turn"],
		["ひきます", "pull"],
		["かえます", "change"],
		["さわります", "touch"],
		["おつりが でます", "the change comes out"],
		["あるきます", "walk"],
		["わたります", "cross"],
		["まがります", "turn (a corner)"],
		["さびしい", "lonely"],
		["おゆ", "hot water"],
		["おと", "sound"],
		["サイズ", "size"],
		["こしょう", "breakdown"],
		["みち", "road, way"],
		["こうさてん", "crossroads"],
		["しんごう", "traffic light"],
		["かど", "corner"],
		["はし", "bridge"],
		["ちゅうしゃじょう", "car park"],
		["たてもの", "building"],
		["なんかいも", "many times"],
		["〜め", "-th (ふたつめ: the second)"]
	]
};
