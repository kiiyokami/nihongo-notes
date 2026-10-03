<script lang="ts">
	import { speech, toggleSpeak } from '$lib/speech/speech.svelte';
	import Segmented from '$lib/ui/Segmented.svelte';

	const H = 'あいうえお かきくけこ さしすせそ たちつてと なにぬねの はひふへほ まみむめも や_ゆ_よ らりるれろ わ___を ん____ がぎぐげご ざじずぜぞ だぢづでど ばびぶべぼ ぱぴぷぺぽ';
	const K = 'アイウエオ カキクケコ サシスセソ タチツテト ナニヌネノ ハヒフヘホ マミムメモ ヤ_ユ_ヨ ラリルレロ ワ___ヲ ン____ ガギグゲゴ ザジズゼゾ ダヂヅデド バビブベボ パピプペポ';
	const R = 'a i u e o|ka ki ku ke ko|sa shi su se so|ta chi tsu te to|na ni nu ne no|ha hi fu he ho|ma mi mu me mo|ya _ yu _ yo|ra ri ru re ro|wa _ _ _ o|n _ _ _ _|ga gi gu ge go|za ji zu ze zo|da ji zu de do|ba bi bu be bo|pa pi pu pe po'
		.split('|')
		.map((r) => r.split(' '));

	let script = $state<'h' | 'k'>('h');
	let hide = $state(false);
	let shown = $state<string[]>([]);
	const rows = $derived((script === 'h' ? H : K).split(' ').map((r) => [...r]));

	function tap(c: string) {
		if (hide) shown = shown.includes(c) ? shown.filter((x) => x !== c) : [...shown, c];
		if (speech.voiceReady) toggleSpeak(c);
	}
</script>

<svelte:head><title>Kana chart · Nihongo Notes</title></svelte:head>

<div class="split">
	<h1 class="view-title">Kana chart</h1>
	<div class="setup">
		<Segmented
			legend="Script"
			name="script"
			options={[
				{ value: 'h', label: 'ひらがな', lang: 'ja' },
				{ value: 'k', label: 'カタカナ', lang: 'ja' }
			]}
			bind:value={script}
		/>
		<label class="check"><input type="checkbox" bind:checked={hide} onchange={() => (shown = [])} /> Hide the sounds, tap a letter to check it</label>
	</div>

	<div class="stage grid">
		{#each rows as row, i}
			{#if i === 0}<p class="label">Basic sounds</p>{:else if i === 11}<p class="label">With dakuten <span lang="ja">゛</span> and handakuten <span lang="ja">゜</span></p>{/if}
			{#each row as c, j}
				{#if c === '_'}
					<span class="k gap" aria-hidden="true"></span>
				{:else if hide || speech.voiceReady}
					<button type="button" class="k" class:hidden={hide && !shown.includes(c)} aria-pressed={hide ? shown.includes(c) : undefined} onclick={() => tap(c)}>
						<span lang="ja">{c}</span><small>{R[i][j]}</small>
					</button>
				{:else}
					<span class="k"><span lang="ja">{c}</span><small>{R[i][j]}</small></span>
				{/if}
			{/each}
		{/each}
	</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 6px;
		max-width: 32rem;
	}
	.label {
		grid-column: 1 / -1;
		margin: 16px 0 2px;
		color: var(--soft);
		font-weight: 700;
	}
	.label:first-child {
		margin-top: 0;
	}
	.k {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 64px;
		padding: 6px 2px;
		border: 1px solid var(--line);
		/* genkō yōshi: a writing square with faint centre guides */
		background:
			linear-gradient(to right, transparent calc(50% - 0.5px), var(--line) calc(50% - 0.5px) calc(50% + 0.5px), transparent calc(50% + 0.5px)),
			linear-gradient(transparent calc(42% - 0.5px), var(--line) calc(42% - 0.5px) calc(42% + 0.5px), transparent calc(42% + 0.5px)),
			var(--sheet);
	}
	button.k {
		border-color: var(--soft);
		border-radius: 4px;
	}
	button.k:hover {
		border-color: var(--ink);
	}
	button.k[aria-pressed='true'] {
		border-color: var(--red);
	}
	.k [lang='ja'] {
		font-size: 1.8rem;
		line-height: 1.3;
	}
	small {
		min-height: 1.35em;
		color: var(--soft);
		font-size: 0.85rem;
	}
	.hidden small {
		visibility: hidden;
	}
	.gap {
		visibility: hidden;
	}
</style>
