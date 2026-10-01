// Typed answers: ignore spaces, punctuation, [particle] brackets and full-width/half-width differences.
export function norm(s: string): string {
	return s.normalize('NFKC').replace(/[[\]\s。、？?！!.,「」]/g, '');
}

export function sameAnswer(given: string, answers: string | readonly string[]): boolean {
	const g = norm(given);
	if (!g) return false;
	return (typeof answers === 'string' ? [answers] : answers).some((a) => norm(a) === g);
}
