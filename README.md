# Nihongo Notes

My own study app for Minna no Nihongo, lessons 1 to 25: simplified patterns, word lists, flashcards, six kinds of quiz, a kana chart, and a play button that reads Japanese aloud with your device's voice. It works offline and installs like an app.

## Run it while working on it

```bash
npm install
npm run dev
```

Open the address it prints. The page reloads every time you save.

## Put it on your server

```bash
npm run build
```

Upload everything inside `build/` to your web server's folder for the site. Every page is a plain HTML file, so no Node process is needed.

- **Unknown addresses:** set your server to answer them with `404.html`. On nginx: `error_page 404 /404.html;`. On Apache: `ErrorDocument 404 /404.html`.
- **HTTPS is required** for "Add to Home Screen" and offline use. A free certificate from Let's Encrypt works.
- **Check the build locally first:** `npm run preview` serves `build/` the way your server will.

## Checks

```bash
npm test            # unit tests for the study logic and the notes
npm run check       # type check
npm run test:e2e    # builds, then clicks through every page in Firefox
```

`npm run test:e2e` uses the Firefox at `/usr/bin/firefox`; point `FIREFOX` at another one if needed.

## Where things are

| Path | What's in it |
| --- | --- |
| `src/lib/content/lessons/01.ts` … `25.ts` | **Your notes, one lesson per file.** Edit these to add or fix content. |
| `src/lib/content/particles.ts` | Particle quiz questions |
| `src/lib/content/qa.ts` | "Answer the question" pairs |
| `src/lib/study/` | Quiz, flashcard, tile and number logic (no UI) |
| `src/routes/` | The pages |
| `src/app.css` | Colors and type. Light and dark colors are at the top. |
| `static/icons/` | App icons (placeholders: replace the PNGs with your own, same sizes) |

## Adding content

A lesson file looks like this:

```ts
export const lesson: Lesson = {
	n: 5,
	title: 'Going places',
	goal: 'Say where you go, when, how, and with whom.',
	patterns: [
		{
			title: 'By (transport)',
			formula: '{Vehicle}で いきます。',
			meaning: 'I go by (vehicle).',
			examples: [['でんしゃ[で] かいしゃ[へ] いきます。', 'I go to work by train.']]
		}
	],
	words: [['いきます', 'go']]
};
```

- In Japanese text, `[は]` marks a particle and `{Noun}` is a blank for your own word.
- Write example sentences with spaces between words and particles in `[ ]`: that's where the word tiles are cut.
- A pattern can have a `table` (`head`, `rows`) and a `note`.
- A table with a `quiz` line joins the Numbers quiz. Write one English prompt per column after the first: `#` is the row's first cell, and the part before `|` is used for 1, for example `quiz: ['# person|# people']`. Rows starting with `?` are shown but not asked. The hours and minutes tables also have `clock: 'h'` and `clock: 'm'`, which is how the quiz builds times like 4:30.
- `particles.ts` entries: `['sentence with ＿', 'answer', ['four', 'choices'], 'English']`.
- `qa.ts` entries: `[lesson, 'question？', 'answer。', 'English of the answer']`.

If a lesson file has a mistake, `npm run check` and `npm test` say which file and line, and `npm run build` refuses to build.

## Keyboard

- **Flashcards:** Space shows the answer, → marks a word as known, ← puts it back in the pile.
- **Quiz:** keys 1 to 4 pick an answer; Enter goes to the next question.
