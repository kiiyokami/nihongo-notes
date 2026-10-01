// Runs every tests/e2e/*.e2e.mjs against `vite preview`. Pass names to run a subset: node run.mjs lesson quiz
import { readdirSync } from 'node:fs';
import { startPreview, launch } from './harness.mjs';

const dir = new URL('.', import.meta.url);
const only = process.argv.slice(2);
const files = readdirSync(dir)
	.filter((f) => f.endsWith('.e2e.mjs'))
	.filter((f) => !only.length || only.includes(f.replace('.e2e.mjs', '')))
	.sort();

const server = await startPreview();
const browser = await launch();
let fails = 0;
try {
	for (const f of files) {
		try {
			fails += await (await import(new URL(f, dir).href)).default(browser);
		} catch (e) {
			fails++;
			console.log(`FAIL [${f}] crashed: ${String(e.message).split('\n')[0]}`);
		}
	}
} finally {
	await browser.close();
	server.kill();
}
console.log(fails ? `${fails} FAILED` : 'ALL PASSED');
process.exit(fails ? 1 : 0);
