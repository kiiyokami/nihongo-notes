// Reads Japanese aloud with the device's own voice (Web Speech API). If the device has
// no Japanese voice, voiceReady stays false and the play buttons are not rendered at all.
import { findJapaneseVoice } from './voice';

export const speech = $state({ checked: false, voiceReady: false, current: null as string | null });

let voice: SpeechSynthesisVoice | undefined;

export function initSpeech(): void {
	if (typeof speechSynthesis === 'undefined') {
		speech.checked = true;
		return;
	}
	const pick = () => {
		voice = findJapaneseVoice(speechSynthesis.getVoices());
		speech.voiceReady = !!voice;
		if (voice) speech.checked = true;
	};
	pick();
	speechSynthesis.addEventListener('voiceschanged', pick);
	// some browsers fill the voice list late; give them a moment before saying there's none
	setTimeout(() => (speech.checked = true), 1500);
}

export function stopSpeech(): void {
	if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
	speech.current = null;
}

export function toggleSpeak(text: string): void {
	if (!voice) return;
	if (speech.current === text) return stopSpeech();
	speechSynthesis.cancel();
	const u = new SpeechSynthesisUtterance(text);
	u.voice = voice;
	u.lang = voice.lang;
	u.rate = 0.9;
	u.onend = u.onerror = () => {
		if (speech.current === text) speech.current = null;
	};
	speech.current = text;
	speechSynthesis.speak(u);
}
