# Nihongo Notes

My own study app for Minna no Nihongo, lessons 1 to 25: simplified patterns, word lists, flashcards, six kinds of quiz, a kana chart, and a play button that reads Japanese aloud with your device's voice. It works offline and installs like an app.

## Using it

The home page has a button back to the lesson you were last on. The tabs (at the bottom on a phone) lead to:

- **Lessons**: the patterns, example sentences and word list for each lesson. ▶ reads a sentence aloud.
- **Flashcards**: tick the lessons you want, tap the card to see the answer, then press Got it or Again. Again brings the card back a few cards later.
- **Quiz**: pick a question type and the lessons, then Start. Sentence questions can be answered with word tiles or by typing.
- **Kana**: the hiragana and katakana chart. Tap a letter to hear it.

Your known words, last lesson and settings are saved in the browser you study in. A different browser or device starts fresh.

On a keyboard:

- Flashcards: Space shows the answer, → marks the word as known, ← puts it back in the pile.
- Quiz: 1 to 4 pick an answer, Enter goes to the next question.

## Editing your notes

Each lesson is one file: `src/lib/content/lessons/05.ts` is lesson 5. Open it, change the text, save. If the app is running (see below), the page updates as soon as you save.

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

Two marks do most of the work in Japanese text:

- `[は]` marks a particle. It shows highlighted.
- `{Noun}` is a blank for your own word.

Put spaces between words in example sentences. The word-tile quiz cuts sentences at the spaces and the `[ ]` marks, so a sentence without spaces becomes one big tile.

A pattern can also have a `note` (a grey box under it) and a `table`:

```ts
table: {
	head: ['number', 'people'],
	rows: [['1', 'ひとり'], ['2', 'ふたり']],
	quiz: ['# person|# people']
}
```

Add a `quiz` line and the table joins the Numbers quiz. It has one English prompt per column after the first. `#` stands for the row's first cell, and the part before `|` is used when that cell is 1 ("1 person", "2 people"). Rows starting with `?` are shown but never asked. The hours and minutes tables in lesson 4 also have `clock: 'h'` and `clock: 'm'`, which is how the quiz builds times like 4:30.

Two more files hold quiz questions:

- `src/lib/content/particles.ts`: `['sentence with ＿', 'answer', ['four', 'choices'], 'English']`
- `src/lib/content/qa.ts`: `[lesson, 'question？', 'answer。', 'English of the answer']`

After editing, run `npm test` and `npm run check`. If a file has a mistake, such as a missing bracket or a table row with the wrong number of cells, they say which lesson and which entry.

## Running it on your computer

The first time:

```bash
npm install
```

Then, whenever you want to study or edit:

```bash
npm run dev
```

Open the address it prints.

## Putting it online

```bash
npm run build
```

Upload everything inside `build/` to your web server's folder for the site. Every page is a plain HTML file, so the server doesn't need Node.

Then, on the server:

1. Answer unknown addresses with `404.html`. On nginx: `error_page 404 /404.html;`. On Apache: `ErrorDocument 404 /404.html`.
2. Turn on HTTPS. Installing the app and using it offline only work over HTTPS. A free certificate from Let's Encrypt is enough.

To try the build first, `npm run preview` serves `build/` the way your server will.

## Checks

```bash
npm test            # the study logic and the notes
npm run check       # type check
npm run test:e2e    # builds the app, then clicks through every page in Firefox
```

`npm run test:e2e` uses the Firefox at `/usr/bin/firefox`. Set `FIREFOX` to use a different one.

## Where everything is

| Path | What's in it |
| --- | --- |
| `src/lib/content/lessons/` | Your notes, one file per lesson |
| `src/lib/content/particles.ts`, `qa.ts` | Particle and "answer the question" quiz questions |
| `src/lib/study/` | How quizzes and flashcard decks are built |
| `src/routes/` | The pages |
| `src/app.css` | Colors and fonts. The light and dark colors are at the top. |
| `static/icons/` | App icons. These are placeholders: replace the PNGs with your own at the same sizes. |
