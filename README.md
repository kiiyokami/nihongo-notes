# Nihongo Notes

A study site for Minna no Nihongo lessons 1 to 12: simplified patterns, word lists, flashcards, quizzes and a kana chart.

## Open it

- Double-click `index.html` to open it in your browser, or
- In VS Code, install the **Live Server** extension, right-click `index.html` and pick **Open with Live Server**. The page reloads every time you save.

## Files

| File | What's in it |
| --- | --- |
| `index.html` | Page layout (mode tabs, the four views) |
| `css/style.css` | Colors, fonts, layout. Light and dark colors are at the top, with a note on why each one is used. |
| `js/data.js` | **All lesson content.** Edit this to add or fix notes. |
| `js/app.js` | How the lessons, flashcards, quiz and kana chart work |
| `DESIGN.md` | The design direction the page follows |

## Adding a lesson

Copy one lesson object in `js/data.js` (the `L` list) and change it:

- `n` lesson number, `t` title, `g` one-line goal
- `p` patterns: `t` name, `f` formula, `m` meaning, `ex` examples as `["Japanese","English"]`, optional `n` note and `tb` table
- `v` words as `かな=English;かな=English;...`

Inside Japanese text, `[は]` highlights a particle and `{Noun}` shows a blank for your own word.

Particle quiz questions are in the `PART` list at the bottom of `data.js`: `["sentence with ＿", "answer", ["4","choices"], "English"]`.

"Answer the question" pairs are in the `QA` list after it: `[lesson, "question？", "answer。", "English of the answer"]`. Write the Japanese like the lesson examples, with spaces between words and particles in `[ ]`, because that's where the word tiles are cut. "Build the sentence" needs no list: it uses the lesson examples directly.

The "Numbers" quiz reads tables that have a `quiz` line, one English prompt per column, where `#` is the row's first cell: `quiz:["# thing|# things","# person|# people"]`. The part before `|` is used for 1. Rows starting with `?` are shown but not asked. The hours and minutes tables in lesson 4 also carry `clock:"h"` and `clock:"m"`, which is how the quiz builds clock times like 4:30.

If `data.js` has a typing mistake, the page says so instead of showing the lessons. Open the browser console (F12) to see which line.

## Keyboard

- Mode tabs: left and right arrow keys move between Lessons, Flashcards, Quiz and Kana.
- Flashcards: Space shows the answer, → marks a word as known, ← puts it back in the pile.
- Quiz: keys 1 to 4 pick an answer, Enter goes to the next question.
