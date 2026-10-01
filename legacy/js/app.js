/* Nihongo Notes: lessons, flashcards, quiz and kana chart. All content lives in data.js. */

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
// [は] marks a particle, {Noun} a slot for your own word
const fmt = s => esc(s).replace(/\[([^\]]+)\]/g, '<mark class="p">$1</mark>').replace(/\{([^}]+)\}/g, '<span class="slot">$1</span>');
// English text with Japanese inside it: tag the Japanese runs so they get the Japanese font
const txt = s => fmt(s).replace(/[　-ヿ一-鿿＀-￯]+/g, '<span lang="ja">$&</span>');
const ja = (s, cls) => `<span lang="ja"${cls ? ` class="${cls}"` : ""}>${fmt(s)}</span>`;
const hasJa = s => /[぀-ヿ一-鿿]/.test(s);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};

/* ---------- theme ---------- */
const root = document.documentElement, darkQuery = matchMedia("(prefers-color-scheme: dark)"), themeBtn = $("#theme");
const theme = () => root.dataset.theme || (darkQuery.matches ? "dark" : "light");
const syncTheme = () => { themeBtn.textContent = theme() === "dark" ? "Switch to light" : "Switch to dark"; };
themeBtn.onclick = () => { root.dataset.theme = theme() === "dark" ? "light" : "dark"; store.set("jn-theme", root.dataset.theme); syncTheme(); };
darkQuery.addEventListener("change", syncTheme);
syncTheme();

/* ---------- boot: stop with a clear message if data.js is missing or broken ---------- */
let dataOk = false;
try { dataOk = Array.isArray(L) && L.length > 0 && Array.isArray(ALLV) && Array.isArray(PART); } catch (e) {}
if (!dataOk) {
  $("#boot").classList.add("error");
  $("#boot").textContent = "The lessons didn't load. js/data.js is missing or has a typing mistake in it. Open the browser console (F12) to see which line.";
  throw new Error("Nihongo Notes: data.js did not load");
}
$("#boot").remove();

/* ---------- mode tabs ---------- */
const VIEWS = ["lessons", "cards", "quiz", "kana"];
const tabs = $$('[role="tab"]');
function showView(v, focusTab) {
  if (!VIEWS.includes(v)) v = "lessons";
  tabs.forEach(t => {
    const on = t.dataset.view === v;
    t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1;
    if (on && focusTab) t.focus();
  });
  VIEWS.forEach(x => { $("#v-" + x).hidden = x !== v; });
  pickers.forEach(p => p.sync());
  store.set("jn-view", v); window.scrollTo(0, 0);
  if (v === "cards" && !deck) buildDeck();
}
tabs.forEach((t, i) => {
  t.onclick = () => showView(t.dataset.view);
  t.onkeydown = e => {
    const step = {ArrowRight: 1, ArrowLeft: -1}[e.key];
    const j = step ? (i + step + tabs.length) % tabs.length : e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : -1;
    if (j < 0) return;
    e.preventDefault(); showView(tabs[j].dataset.view, true);
  };
});

/* ---------- lesson checkboxes, shared by flashcards and quiz ---------- */
const pickers = [];
function lessonPicker(box, hint, set, onchange) {
  box.innerHTML = L.map(l => `<label class="tick" title="${esc(l.t)}"><input type="checkbox" value="${l.n}"><span><span class="sr">Lesson </span>${l.n}</span></label>`).join("")
    + `<button type="button" class="all"></button>`;
  const sync = () => {
    box.querySelectorAll("input").forEach(i => { i.checked = set.has(+i.value); });
    box.querySelector(".all").textContent = set.size === L.length ? `Only lesson ${cur}` : "All lessons";
  };
  box.onchange = e => {
    const n = +e.target.value;
    if (e.target.checked) set.add(n);
    else if (set.size > 1) set.delete(n);
    else { e.target.checked = true; hint.textContent = "Keep at least one lesson ticked."; return; }
    hint.textContent = ""; sync(); onchange();
  };
  box.onclick = e => {
    if (!e.target.closest(".all")) return;
    if (set.size === L.length) { set.clear(); set.add(cur); } else L.forEach(l => set.add(l.n));
    hint.textContent = ""; sync(); onchange();
  };
  const p = {sync}; pickers.push(p); return p;
}
function lessonsText(set) {
  const ns = [...set].sort((a, b) => a - b);
  if (ns.length === L.length) return "all lessons";
  if (ns.length === 1) return `lesson ${ns[0]}`;
  return `lessons ${ns.slice(0, -1).join(", ")} and ${ns.at(-1)}`;
}

/* ---------- lessons ---------- */
let cur = store.get("jn-lesson", L[0].n); if (!L.some(l => l.n === cur)) cur = L[0].n;
$("#toc").innerHTML = L.map(l => `<li><button type="button" data-n="${l.n}"><span class="toc-n"><span class="sr">Lesson </span>${l.n}</span><span class="toc-t">${txt(l.t)}</span></button></li>`).join("");
$("#toc").onclick = e => { const b = e.target.closest("button"); if (b) openLesson(+b.dataset.n); };

function openLesson(n, focusTitle) {
  cur = n; renderLesson(); window.scrollTo(0, 0);
  if (focusTitle) $("#lesson h1").focus({preventScroll: true});
}
function cell(tag, s, scope) {
  return `<${tag}${scope ? ` scope="${scope}"` : ""}${hasJa(s) ? ' lang="ja"' : ""}>${esc(s)}</${tag}>`;
}
function table(tb, label) {
  return `<div class="table-scroll" tabindex="0" role="region" aria-label="${esc(label)}"><table>
    <thead><tr>${tb.h.map(h => cell("th", h, "col")).join("")}</tr></thead>
    <tbody>${tb.r.map(r => `<tr>${cell("th", r[0], "row")}${r.slice(1).map(c => cell("td", c)).join("")}</tr>`).join("")}</tbody></table></div>`;
}
function renderLesson() {
  store.set("jn-lesson", cur);
  $$("#toc button").forEach(b => { if (+b.dataset.n === cur) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });
  const l = L.find(x => x.n === cur), i = L.indexOf(l), prev = L[i - 1], next = L[i + 1];
  $("#lesson").innerHTML = `
    <header>
      <p class="kicker"><span lang="ja">第${l.n}課</span>Lesson ${l.n} of ${L.length}</p>
      <h1 tabindex="-1">${txt(l.t)}</h1>
      <p class="goal">${txt(l.g)}</p>
      <ul class="legend"><li><mark class="p" lang="ja">は</mark> particle</li><li><span class="slot">Noun</span> put your own word here</li></ul>
    </header>
    <h2>Patterns <span class="count">${l.p.length}</span></h2>
    <ol class="entries">${l.p.map((p, k) => `
      <li class="entry"><span class="entry-n" aria-hidden="true">${k + 1}</span><div>
        <h3>${txt(p.t)}</h3>
        <p class="formula" lang="ja">${fmt(p.f)}</p>
        ${p.m ? `<p class="meaning">${txt(p.m)}</p>` : ""}
        ${p.tb ? table(p.tb, p.t) : ""}
        ${p.ex ? `<ul class="examples">${p.ex.map(e => `<li>${ja(e[0])}<span class="en">${txt(e[1])}</span></li>`).join("")}</ul>` : ""}
        ${p.n ? `<p class="note">${txt(p.n)}</p>` : ""}
      </div></li>`).join("")}</ol>
    <h2>Words <span class="count" id="w-count"></span></h2>
    <div class="word-tools">
      <input type="search" id="w-filter" placeholder="Filter by kana or English" aria-label="Filter words">
      <button class="btn" type="button" id="w-study">Study lesson ${l.n} words as flashcards</button>
    </div>
    <div class="status" id="w-empty" hidden></div>
    <ul class="words" id="w-list"></ul>
    <nav class="pager" aria-label="Previous and next lesson">
      ${prev ? `<button type="button" data-n="${prev.n}"><small>← Lesson ${prev.n}</small>${txt(prev.t)}</button>` : "<span></span>"}
      ${next ? `<button type="button" class="next" data-n="${next.n}"><small>Lesson ${next.n} →</small>${txt(next.t)}</button>` : ""}
    </nav>`;
  drawWords(l, "");
}
function drawWords(l, q) {
  q = q.trim().toLowerCase();
  const list = l.vocab.filter(v => !q || v.jp.includes(q) || v.en.toLowerCase().includes(q));
  $("#w-list").innerHTML = list.map(v => `<li>${ja(v.jp)}<span class="en">${txt(v.en)}</span></li>`).join("");
  $("#w-count").textContent = q ? `${list.length} of ${l.vocab.length}` : l.vocab.length;
  const empty = $("#w-empty");
  empty.hidden = list.length > 0;
  empty.innerHTML = list.length ? "" : `<p class="goal">No words in lesson ${l.n} match “${esc(q)}”.</p><button class="btn quiet" type="button" id="w-clear">Clear the filter</button>`;
}
$("#lesson").oninput = e => { if (e.target.id === "w-filter") drawWords(L.find(x => x.n === cur), e.target.value); };
$("#lesson").onclick = e => {
  const t = e.target.closest("button"); if (!t) return;
  if (t.id === "w-clear") { const f = $("#w-filter"); f.value = ""; drawWords(L.find(x => x.n === cur), ""); f.focus(); }
  else if (t.id === "w-study") { cSel.clear(); cSel.add(cur); buildDeck(); showView("cards"); }
  else if (t.closest(".pager")) openLesson(+t.dataset.n, true);
};

/* ---------- flashcards ---------- */
let cSel = new Set([cur]), cDir = "jp", deck = null, di = 0, flipped = false;
const known = new Set(store.get("jn-known", []));
lessonPicker($("#c-lessons"), $("#c-hint"), cSel, () => buildDeck());
$$('input[name="c-dir"]').forEach(r => { r.onchange = () => { cDir = r.value; flipped = false; if (deck) drawCard(); }; });
$("#c-skip").onchange = () => buildDeck();

function buildDeck() {
  let pool = ALLV.filter(v => cSel.has(v.n));
  if ($("#c-skip").checked) pool = pool.filter(v => !known.has(v.jp));
  deck = shuffle(pool); di = 0; flipped = false; drawCard();
}
function drawCard() {
  const st = $("#c-stage"), refocus = st.contains(document.activeElement);
  const which = lessonsText(cSel);
  if (!deck.length) {
    const anyWords = ALLV.some(v => cSel.has(v.n));
    st.innerHTML = anyWords
      ? `<div class="status done"><p>Every word in ${which} is marked as known.</p><div class="card-actions"><button class="btn" type="button" id="c-showall">Include known words</button><button class="btn quiet" type="button" id="c-forget">Forget the marks for ${which}</button></div></div>`
      : `<div class="status done"><p>There are no words in ${which} yet. Add them to the <code>v</code> list in js/data.js.</p></div>`;
  } else if (di >= deck.length) {
    const words = [...new Map(deck.map(v => [v.jp, v])).values()], k = words.filter(v => known.has(v.jp)).length;
    st.innerHTML = `<div class="sheet done"><p class="q-meta">Round finished</p><p>You marked ${k} of ${words.length} words as known.</p>
      <div class="card-actions"><button class="btn" type="button" id="c-again">Go through again</button>${k < words.length ? `<button class="btn quiet" type="button" id="c-rest">Only the ${words.length - k} not known yet</button>` : ""}</div></div>`;
  } else {
    const v = deck[di], jpFirst = cDir === "jp";
    const front = jpFirst ? `<span lang="ja" class="big">${esc(v.jp)}</span>` : `<span class="big en">${txt(v.en)}</span>`;
    const back = jpFirst ? `<span class="big en">${txt(v.en)}</span><span lang="ja" class="small">${esc(v.jp)}</span>`
                         : `<span lang="ja" class="big">${esc(v.jp)}</span><span class="small">${txt(v.en)}</span>`;
    st.innerHTML = `<p class="q-meta">Card ${di + 1} of ${deck.length}</p>
      <button class="card" id="card" type="button">
        <span class="card-head"><span>Lesson ${v.n}</span><span>${known.has(v.jp) ? "marked known" : ""}</span></span>
        <span class="card-face">${flipped ? back : front}</span>
        <span class="card-hint">${flipped ? "Hide the answer" : "Show the answer"}</span>
      </button>
      <div class="card-actions"><button class="btn quiet" type="button" id="c-no">Again</button><button class="btn" type="button" id="c-yes">Got it</button></div>
      <p class="keys">Space shows the answer · ← again · → got it</p>`;
  }
  if (refocus) (st.querySelector("#card") || st.querySelector("button"))?.focus();
}
function flip() { flipped = !flipped; drawCard(); }
function mark(ok) {
  const v = deck[di];
  if (ok) known.add(v.jp);
  else { known.delete(v.jp); if (deck.length - di > 1) deck.splice(Math.min(deck.length, di + 3 + Math.floor(Math.random() * 3)), 0, v); }
  store.set("jn-known", [...known]); di++; flipped = false; drawCard();
}
$("#c-stage").onclick = e => {
  const t = e.target.closest("button"); if (!t) return;
  if (t.id === "card") flip();
  else if (t.id === "c-yes") mark(true);
  else if (t.id === "c-no") mark(false);
  else if (t.id === "c-again") buildDeck();
  else if (t.id === "c-rest" || t.id === "c-showall") { $("#c-skip").checked = t.id === "c-rest"; buildDeck(); }
  else if (t.id === "c-forget") { ALLV.forEach(v => { if (cSel.has(v.n)) known.delete(v.jp); }); store.set("jn-known", [...known]); buildDeck(); }
};

/* ---------- quiz ---------- */
const QA_LIST = (() => { try { return QA; } catch (e) { return []; } })();
const PARTICLES = ["は", "を", "に", "で", "へ", "と", "が", "の", "から", "まで", "も"];
// "でんしゃ[で] かいしゃ[へ] いきます。" -> でんしゃ, で, かいしゃ, へ, いきます
// です is split off as its own tile so short answers (べんりです) still need putting in order
function toTiles(s) {
  return s.replace(/[。？]$/, "").split(/\s+|(?=\[)|(?<=\])|(?<=、)/)
    .map(t => t.replace(/[[\]]/g, "")).filter(Boolean)
    .flatMap(t => { const m = t.match(/^(.+?)(ですか|でしたか|です|でした)$/); return m ? [m[1], m[2]] : [t]; });
}
// typed answers: ignore spaces, punctuation and full-width/half-width differences
const norm = s => s.normalize("NFKC").replace(/[[\]\s。、？?！!.,「」]/g, "");
const sameAnswer = (given, ans) => norm(given) === norm(ans);
// example sentences long enough to build; "Same question, polite." lines aren't translations, so they're left out
const SENT = L.flatMap(l => l.p.flatMap(p => (p.ex || [])
  .filter(e => /[。？]$/.test(e[0]) && !/^Same question/.test(e[1]) && toTiles(e[0]).length >= 3)
  .map(e => ({n: l.n, jp: e[0], en: e[1]}))));
// numbers: every table with a quiz line, plus clock times built from the hours and minutes tables.
// In a quiz line # is the row's first cell, and "# person|# people" uses the left side for 1.
const say = (tmpl, x) => { const [one, many] = tmpl.split("|"); return (x === "1" || many === undefined ? one : many).replace("#", x); };
const NUMS = (() => {
  const out = [], hours = [], minutes = [];
  const add = x => { if (!out.some(y => y.en === x.en)) out.push(x); };
  L.forEach(l => l.p.forEach(p => {
    const tb = p.tb; if (!tb) return;
    const rows = tb.r.filter(r => r[0] !== "?");
    (tb.quiz || []).forEach((tmpl, c) => { if (tmpl) rows.forEach(r => { if (r[c + 1]) add({n: l.n, kind: p.t, row: r[0], col: c + 1, en: say(tmpl, r[0]), jp: r[c + 1]}); }); });
    if (tb.clock === "h") rows.forEach(r => hours.push({n: l.n, h: r[0], jp: r[1]}));
    if (tb.clock === "m") rows.forEach(r => minutes.push({m: r[0], jp: r[1]}));
  }));
  hours.forEach(h => {
    add({n: h.n, kind: "clock", en: `${h.h}:00`, jp: h.jp});
    // :30 is taught as はん, and さんじゅっぷん is right too
    minutes.forEach(m => add(m.m === "30"
      ? {n: h.n, kind: "clock", en: `${h.h}:30`, jp: `${h.jp} はん`, alts: [`${h.jp} ${m.jp}`]}
      : {n: h.n, kind: "clock", en: `${h.h}:${m.m.padStart(2, "0")}`, jp: `${h.jp} ${m.jp}`}));
  });
  return out;
})();

let qSel = new Set(L.map(l => l.n)), qType = "vocab", qInput = "tiles", qs = [], qi = 0, qScore = 0, misses = [], answered = false;
lessonPicker($("#q-lessons"), $("#q-hint"), qSel, () => syncStart());
$$('input[name="q-type"]').forEach(r => { r.onchange = () => {
  qType = r.value;
  $("#q-lessonset").hidden = qType === "part"; $("#q-partnote").hidden = qType !== "part";
  $("#q-inputset").hidden = !["sent", "qa", "num"].includes(qType);
  $('.radio input[value="tiles"] + span').textContent = qType === "num" ? "Choices" : "Word tiles";
  $("#q-markhint").hidden = qType === "num";
  syncStart();
}; });
$$('input[name="q-input"]').forEach(r => { r.onchange = () => { qInput = r.value; }; });
const quizPool = () => ALLV.filter(v => qSel.has(v.n));
function quizCount() {
  if (qType === "part") return PART.length;
  if (qType === "sent") return SENT.filter(s => qSel.has(s.n)).length;
  if (qType === "qa") return QA_LIST.filter(x => qSel.has(x[0])).length;
  if (qType === "num") return NUMS.filter(x => qSel.has(x.n)).length;
  return quizPool().length;
}
function syncStart() {
  const total = quizCount(), n = Math.min(10, total), enough = total >= (qType === "vocab" || qType === "rev" ? 2 : 1);
  $("#q-start").textContent = `Start ${n} question${n === 1 ? "" : "s"}`;
  $("#q-start").disabled = !enough;
  $("#q-none").textContent = enough ? ""
    : qType === "qa" ? `There are no question-and-answer pairs for ${lessonsText(qSel)} yet. Add them to the QA list in js/data.js.`
    : qType === "sent" ? `There are no example sentences in ${lessonsText(qSel)} yet.`
    : qType === "num" ? `There are no number tables in ${lessonsText(qSel)}. Numbers are in ${lessonsText(new Set(NUMS.map(x => x.n)))}.`
    : `There aren't enough words in ${lessonsText(qSel)} yet.`;
}
$("#q-start").onclick = startQuiz;

function buildQ(n, jp, extra) {
  const words = toTiles(jp), pieces = [...words, ...shuffle(PARTICLES.filter(p => !words.includes(p))).slice(0, 2)];
  let order = shuffle(pieces);
  for (let k = 0; k < 5 && order.join() === pieces.join(); k++) order = shuffle(pieces);
  return {build: true, input: qInput, meta: `Lesson ${n}`, ans: jp, tiles: order.map(t => ({t})), line: [], ...extra};
}
// one question from each kind in turn, so 156 clock times don't crowd out the 10 floors
function numRound(pool) {
  const byKind = {}; pool.forEach(x => (byKind[x.kind] ||= []).push(x));
  const bags = Object.values(byKind).map(shuffle), picked = [];
  while (picked.length < 10 && bags.some(b => b.length)) shuffle(bags).forEach(b => { if (b.length && picked.length < 10) picked.push(b.pop()); });
  return shuffle(picked);
}
// wrong options are real readings from the same table: another number, or the same number with another counter
function numOptions(x) {
  const right = [x.jp, ...(x.alts || [])];
  const [h, m] = x.en.split(":");
  const near = NUMS.filter(y => y.kind === x.kind && !right.includes(y.jp) && !(y.alts || []).some(a => right.includes(a))
    && (x.kind !== "clock" || y.en.startsWith(h + ":") || y.en.endsWith(":" + m)));
  return shuffle([x.jp, ...[...new Set(shuffle(near).map(y => y.jp))].slice(0, 3)]);
}
function startQuiz() {
  if (qType === "num") {
    qs = numRound(NUMS.filter(x => qSel.has(x.n))).map(x => {
      const q = {kind: x.kind, prompt: x.en, meta: `Lesson ${x.n}`, ans: x.jp, alts: x.alts, review: [x.jp, x.en]};
      return qInput === "typing" ? {...q, build: true, input: "typing", hint: "Write the reading in kana (よじ, not 4じ). Spaces don't matter."}
                                 : {...q, opts: numOptions(x), optsJa: true};
    });
  } else if (qType === "part") {
    qs = shuffle(PART).slice(0, 10).map(p => ({prompt: p[0], promptJa: true, sub: p[3], ans: p[1], opts: shuffle(p[2]), optsJa: true,
      review: [p[0].replace("＿", "[" + p[1] + "]"), p[3]]}));
  } else if (qType === "sent") {
    qs = shuffle(SENT.filter(s => qSel.has(s.n))).slice(0, 10).map(s => buildQ(s.n, s.jp, {prompt: s.en, review: [s.jp, s.en]}));
  } else if (qType === "qa") {
    qs = shuffle(QA_LIST.filter(x => qSel.has(x[0]))).slice(0, 10)
      .map(([n, q, a, en]) => buildQ(n, a, {prompt: q, promptJa: true, sub: `Answer so it means “${en}”`, review: [q, a, en]}));
  } else {
    const pool = quizPool(), key = qType === "vocab" ? "en" : "jp";
    qs = shuffle(pool).slice(0, 10).map(v => {
      // wrong options must differ in both Japanese and English, or a question could have two right answers
      const others = [...new Set(shuffle(pool.filter(o => o.jp !== v.jp && o.en !== v.en)).map(o => o[key]))].filter(o => o !== v[key]).slice(0, 3);
      return {prompt: qType === "vocab" ? v.jp : v.en, promptJa: qType === "vocab", meta: `Lesson ${v.n}`, ans: v[key],
        opts: shuffle([v[key], ...others]), optsJa: key === "jp", review: [v.jp, v.en]};
    });
  }
  qi = 0; qScore = 0; misses = []; drawQ();
}
function answerArea(q) {
  if (!q.build) return `<div class="choices" role="group" aria-label="Choices">${q.opts.map((o, i) =>
    `<button type="button" class="choice" data-i="${i}"><kbd aria-hidden="true">${i + 1}</kbd><span class="choice-text"${q.optsJa ? ' lang="ja"' : ""}>${esc(o)}</span></button>`).join("")}</div>`;
  if (q.input === "tiles") return `
    <div class="answer-line" id="q-line" role="group" aria-label="Your answer"></div>
    <div class="tile-bank" id="q-bank" role="group" aria-label="Word tiles"></div>
    <div class="q-actions"><button class="btn quiet" type="button" id="q-reset">Start over</button><button class="btn" type="button" id="q-check">Check</button></div>`;
  return `<form class="typed" id="q-form" autocomplete="off">
    <label for="q-typed">Your answer in Japanese</label>
    <span class="typed-wrap"><input id="q-typed" lang="ja" autocapitalize="off" spellcheck="false" aria-describedby="q-focus"></span>
    <p class="hint">${q.hint || "Kana is fine. Spaces and punctuation don't matter."}</p>
    <div class="q-actions"><button class="btn" type="submit" id="q-check">Check</button></div></form>`;
}
function drawQ() {
  const st = $("#q-stage");
  if (qi >= qs.length) {
    const n = qs.length, m = misses.length;
    st.innerHTML = `<div class="sheet"><p class="q-meta">Round finished</p>
      <p class="score" id="q-focus" tabindex="-1"><span><span class="sr">Score: </span>${qScore} / ${n}</span></p>
      <p class="verdict">${m ? `Go over the ${m === 1 ? "one" : m} you missed, then try another round.` : "Every answer right."}</p>
      ${m ? `<h2>To go over</h2><ul class="review">${misses.map(q => `<li>${q.review.slice(0, -1).map(s => ja(s)).join("")}<span class="en">${txt(q.review.at(-1))}</span></li>`).join("")}</ul>` : ""}
      <div class="q-actions"><button class="btn" type="button" id="q-again">Another round</button></div></div>`;
  } else {
    const q = qs[qi];
    const prompt = q.promptJa
      ? `<span lang="ja">${fmt(q.prompt).replace("＿", '<span class="slot"><span aria-hidden="true">&nbsp;</span><span class="sr">blank</span></span>')}</span>`
      : esc(q.prompt);
    answered = false;
    st.innerHTML = `<div class="sheet">
      <p class="q-meta">Question ${qi + 1} of ${qs.length}${q.meta ? ` · ${q.meta}` : ""}</p>
      <p class="prompt" id="q-focus" tabindex="-1">${prompt}</p>
      ${q.sub ? `<p class="sub">${esc(q.sub)}</p>` : ""}
      ${answerArea(q)}
      <p class="feedback" id="q-fb" aria-live="polite"></p>
      <div class="q-actions"><button class="btn" type="button" id="q-next" hidden>${qi + 1 < qs.length ? "Next question" : "See your score"}</button></div>
    </div>`;
    if (q.build && q.input === "tiles") drawTiles();
  }
  // typing questions start in the text box, so you can type straight away
  ($("#q-typed") || $("#q-focus")).focus();
}
function answer(i) {
  if (answered) return;
  answered = true;
  const q = qs[qi], ok = q.opts[i] === q.ans;
  $$("#q-stage .choice").forEach((b, j) => {
    b.disabled = true;
    if (q.opts[j] === q.ans) { b.classList.add("is-right"); b.insertAdjacentHTML("beforeend", '<span class="tag">answer</span>'); }
    else if (j === i) { b.classList.add("is-wrong"); b.insertAdjacentHTML("beforeend", '<span class="tag">your pick</span>'); }
  });
  if (ok) qScore++; else misses.push(q);
  $("#q-fb").innerHTML = ok ? "Right." : `Not this one. The answer is <span${q.optsJa ? ' lang="ja"' : ""}>${esc(q.ans)}</span>.`;
  showNext();
}
function showNext() { const next = $("#q-next"); next.hidden = false; next.focus(); }

/* building a sentence: tiles move between the bank and the answer line */
function drawTiles() {
  const q = qs[qi], placed = new Set(q.line);
  const tile = i => `<button type="button" class="tile" lang="ja" data-t="${i}"${answered ? " disabled" : ""}>${esc(q.tiles[i].t)}</button>`;
  $("#q-line").innerHTML = q.line.length ? `<span class="built">${q.line.map(tile).join("")}</span>` : '<span class="line-hint">Tap the tiles below in order</span>';
  $("#q-bank").innerHTML = q.tiles.map((_, i) => placed.has(i) ? "" : tile(i)).join("");
}
function moveTile(btn) {
  const q = qs[qi], i = +btn.dataset.t, fromLine = !!btn.closest("#q-line");
  const group = fromLine ? "#q-line" : "#q-bank", pos = $$(group + " .tile").indexOf(btn);
  if (fromLine) q.line.splice(q.line.indexOf(i), 1); else q.line.push(i);
  $("#q-fb").textContent = "";
  drawTiles();
  // keep keyboard focus where it was working, so tapping through tiles doesn't jump around
  const left = $$(group + " .tile");
  (left[Math.min(pos, left.length - 1)] || $("#q-check")).focus();
}
function checkBuild() {
  if (answered) return;
  const q = qs[qi], tiles = q.input === "tiles";
  const given = tiles ? q.line.map(i => q.tiles[i].t).join("") : $("#q-typed").value;
  if (!norm(given)) { $("#q-fb").textContent = tiles ? "Put some tiles on the answer line first." : "Type your answer first."; return; }
  answered = true;
  const ok = [q.ans, ...(q.alts || [])].some(a => sameAnswer(given, a));
  (tiles ? $("#q-line") : $(".typed-wrap")).classList.add(ok ? "is-right" : "is-wrong");
  if (tiles) { drawTiles(); $("#q-reset").hidden = true; } else $("#q-typed").readOnly = true;
  $("#q-check").hidden = true;
  if (ok) qScore++; else misses.push(q);
  $("#q-fb").innerHTML = ok ? "Right." : `Not this one. Your notes have:<span class="fb-ans">${ja(q.ans)}</span>`;
  showNext();
}
$("#q-stage").onclick = e => {
  const t = e.target.closest("button"); if (!t) return;
  if (t.classList.contains("choice")) answer(+t.dataset.i);
  else if (t.classList.contains("tile")) moveTile(t);
  else if (t.id === "q-check" && t.type === "button") checkBuild();
  else if (t.id === "q-reset") { qs[qi].line = []; $("#q-fb").textContent = ""; drawTiles(); ($("#q-bank .tile") || $("#q-check")).focus(); }
  else if (t.id === "q-next") { qi++; drawQ(); }
  else if (t.id === "q-again") startQuiz();
};
$("#q-stage").onsubmit = e => { e.preventDefault(); checkBuild(); };

/* ---------- keyboard shortcuts for flashcards and quiz ---------- */
document.addEventListener("keydown", e => {
  const t = e.target;
  if (e.altKey || e.ctrlKey || e.metaKey || t.matches("input, select, textarea, [role=tab]")) return;
  const free = t === document.body || t.id === "main";
  if (!$("#v-cards").hidden && $("#card") && (free || $("#c-stage").contains(t))) {
    if (e.key === " " && free) { e.preventDefault(); flip(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); mark(true); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); mark(false); }
  }
  if (!$("#v-quiz").hidden && !answered && /^[1-9]$/.test(e.key)) {
    const b = $$("#q-stage .choice")[+e.key - 1];
    if (b) { e.preventDefault(); answer(+b.dataset.i); }
  }
});

/* ---------- kana ---------- */
const H = "あいうえお かきくけこ さしすせそ たちつてと なにぬねの はひふへほ まみむめも や_ゆ_よ らりるれろ わ___を ん____ がぎぐげご ざじずぜぞ だぢづでど ばびぶべぼ ぱぴぷぺぽ";
const K = "アイウエオ カキクケコ サシスセソ タチツテト ナニヌネノ ハヒフヘホ マミムメモ ヤ_ユ_ヨ ラリルレロ ワ___ヲ ン____ ガギグゲゴ ザジズゼゾ ダヂヅデド バビブベボ パピプペポ";
const R = "a i u e o|ka ki ku ke ko|sa shi su se so|ta chi tsu te to|na ni nu ne no|ha hi fu he ho|ma mi mu me mo|ya _ yu _ yo|ra ri ru re ro|wa _ _ _ o|n _ _ _ _|ga gi gu ge go|za ji zu ze zo|da ji zu de do|ba bi bu be bo|pa pi pu pe po".split("|").map(r => r.split(" "));
let kset = "h";
function drawKana() {
  const hide = $("#k-hide").checked;
  $("#kgrid").innerHTML = (kset === "h" ? H : K).split(" ").map((row, i) =>
    (i === 0 ? '<p class="kana-label">Basic sounds</p>' : i === 11 ? '<p class="kana-label">With dakuten <span lang="ja">゛</span> and handakuten <span lang="ja">゜</span></p>' : "")
    + [...row].map((c, j) => c === "_" ? '<span class="k k-gap" aria-hidden="true"></span>'
      : hide ? `<button type="button" class="k" aria-pressed="false"><span lang="ja">${c}</span><small>${R[i][j]}</small></button>`
      : `<span class="k"><span lang="ja">${c}</span><small>${R[i][j]}</small></span>`).join("")
  ).join("");
}
$$('input[name="k-set"]').forEach(r => { r.onchange = () => { kset = r.value; drawKana(); }; });
$("#k-hide").onchange = drawKana;
$("#kgrid").onclick = e => { const k = e.target.closest("button.k"); if (k) k.setAttribute("aria-pressed", k.getAttribute("aria-pressed") !== "true"); };

/* ---------- export for the new app ---------- */
// The new app lives at a different address and can't read this site's storage,
// so known words travel as a code: base64 of the UTF-8 JSON {v:1, known, lesson}.
function exportCode() {
  const json = JSON.stringify({ v: 1, known: [...known], lesson: cur });
  return btoa(String.fromCharCode(...new TextEncoder().encode(json)));
}
$("#c-export").onclick = () => {
  const code = exportCode();
  $("#c-export-out").innerHTML = `<label for="c-export-code">Your code</label><textarea id="c-export-code" readonly rows="3">${esc(code)}</textarea>`;
  $("#c-export-code").select();
  const done = msg => { $("#c-export-msg").textContent = msg; };
  (navigator.clipboard ? navigator.clipboard.writeText(code) : Promise.reject()).then(
    () => done("Copied. Paste it into the import box on the new app's home page."),
    () => done("Copy the code above and paste it into the import box on the new app's home page."));
};

/* ---------- start ---------- */
renderLesson(); drawKana(); syncStart();
showView(store.get("jn-view", "lessons"));
