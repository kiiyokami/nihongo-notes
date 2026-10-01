// Shared helpers for the end-to-end checks. They drive the system Firefox through
// WebDriver BiDi, because Playwright's own browser download isn't available here.
import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';

export const BASE = 'http://localhost:4173';
const FIREFOX = process.env.FIREFOX ?? '/usr/bin/firefox';

// Serves build/ like the real server would. The offline test starts a second one on its own port.
export async function startPreview(port = 4173) {
	const base = `http://localhost:${port}`;
	const server = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort'], { stdio: 'ignore' });
	for (let i = 0; i < 150; i++) {
		try {
			if ((await fetch(base + '/')).ok) return server;
		} catch {}
		await new Promise((r) => setTimeout(r, 200));
	}
	server.kill();
	throw new Error('vite preview did not start on ' + base);
}

export function launch() {
	return puppeteer.launch({ browser: 'firefox', executablePath: FIREFOX, headless: true });
}

export async function openPage(browser, { width = 1280, height = 900 } = {}) {
	const page = await browser.newPage();
	await page.setViewport({ width, height });
	page.errors = [];
	page.on('pageerror', (e) => page.errors.push(String(e)));
	page.on('console', (m) => {
		if (m.type() === 'error') page.errors.push(m.text());
	});
	return page;
}

export function suite(name) {
	let fails = 0;
	return {
		check(label, ok, detail = '') {
			if (!ok) fails++;
			console.log(`${ok ? 'PASS' : 'FAIL'} [${name}] ${label}${detail ? ` (${detail})` : ''}`);
		},
		get fails() {
			return fails;
		}
	};
}

export const text = (page, sel) =>
	page.$eval(sel, (e) => e.textContent.replace(/\s+/g, ' ').trim()).catch(() => '');

export const visible = (page, sel) =>
	page.$eval(sel, (e) => e.getClientRects().length > 0 && getComputedStyle(e).visibility !== 'hidden').catch(() => false);

// Replaces speechSynthesis before the page loads. With voices: [] the device "has no Japanese voice".
// Everything the app asks to say is pushed to window.__said; cancel() pushes '<cancel>'.
export function stubSpeech(page, { voices = [{ lang: 'ja-JP', name: 'Stub Japanese' }] } = {}) {
	return page.evaluateOnNewDocument((voices) => {
		const said = (window.__said = []);
		Object.defineProperty(window, 'speechSynthesis', {
			configurable: true,
			value: {
				getVoices: () => voices,
				speak: (u) => {
					said.push(u.text);
					setTimeout(() => u.onend && u.onend(), 30);
				},
				cancel: () => said.push('<cancel>'),
				speaking: false,
				addEventListener() {},
				removeEventListener() {}
			}
		});
		window.SpeechSynthesisUtterance = function (t) {
			this.text = t;
		};
	}, voices);
}
