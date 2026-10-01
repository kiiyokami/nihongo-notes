export interface VoiceLike {
	lang: string;
	name: string;
}

export function findJapaneseVoice<V extends VoiceLike>(voices: readonly V[]): V | undefined {
	const lang = (v: V) => v.lang.replace('_', '-').toLowerCase();
	return voices.find((v) => lang(v) === 'ja-jp') ?? voices.find((v) => lang(v) === 'ja' || lang(v).startsWith('ja-'));
}
