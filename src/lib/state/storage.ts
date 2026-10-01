// Every saved setting goes through here. Reads and writes never throw: private mode,
// a full disk or pre-rendering on the server just mean nothing is kept.
const PREFIX = 'nn.';

export interface Store {
	ok: boolean;
	get(key: string, fallback: unknown): unknown;
	set(key: string, value: unknown): void;
}

export function createStorage(backend?: Storage | null): Store {
	let store: Storage | null = backend ?? null;
	if (backend === undefined) {
		// with cookies blocked, merely touching window.localStorage throws
		try {
			store = typeof localStorage === 'undefined' ? null : localStorage;
		} catch {}
	}
	let ok = false;
	if (store) {
		try {
			store.setItem(PREFIX + 'probe', '1');
			store.removeItem(PREFIX + 'probe');
			ok = true;
		} catch {}
	}
	return {
		ok,
		get(key, fallback) {
			if (!ok) return fallback;
			try {
				const v = store!.getItem(PREFIX + key);
				return v === null ? fallback : JSON.parse(v);
			} catch {
				return fallback;
			}
		},
		set(key, value) {
			if (!ok) return;
			try {
				store!.setItem(PREFIX + key, JSON.stringify(value));
			} catch {}
		}
	};
}
