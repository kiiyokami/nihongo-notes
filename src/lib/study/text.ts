export function lessonsText(picked: Iterable<number>, total: number): string {
	const ns = [...new Set(picked)].sort((a, b) => a - b);
	if (!ns.length) return 'no lessons';
	if (ns.length === total) return 'all lessons';
	if (ns.length === 1) return `lesson ${ns[0]}`;
	return `lessons ${ns.slice(0, -1).join(', ')} and ${ns.at(-1)}`;
}
