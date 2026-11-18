import { ANIMALS, SCENES, TIMES, WEATHERS, BADGES, RANCH } from './data.js';
import { animalSVG, sceneSVG, badgeSVG } from './art.js';
import { loadLiveContext, liveContext } from './context.js';
import * as store from './store.js';
import { startScan, stopScan } from './scan.js';
import { PHOTOS } from './photos.js';
import { Q2, QUIZ, SORT, REACT } from './extra.js';

const view = document.getElementById('view');
const scanner = document.getElementById('scanner');
const arBox = document.getElementById('ar');
const scanStatus = document.getElementById('scan-status');
const scanSheet = document.getElementById('scan-sheet');
const scanFrame = document.getElementById('scan-frame');
const ctxLabel = document.getElementById('ctx');
const scanCtx = document.getElementById('scan-ctx');

const byId = Object.fromEntries(ANIMALS.map(a => [a.id, a]));
const timeLabel = id => TIMES.find(t => t.id === id).label;
const weatherLabel = id => WEATHERS.find(w => w.id === id).label;
const sceneKey = c => `${c.time}-${c.weather}`;

let chosen = null;
let play = null;

function currentCtx() {
  return chosen || { time: liveContext().time, weather: liveContext().weather };
}

function photoTag(name, extra = '') {
  return `<img class="photo ${extra}" src="assets/scenes/${name}.webp" alt="" decoding="async">`;
}

function photoName(id, ctx) {
  const exact = `${id}-${sceneKey(ctx)}`;
  if (PHOTOS.has(exact)) return exact;
  const pose = SCENES[id][sceneKey(ctx)].pose;
  const keys = Object.keys(SCENES[id]).filter(k => SCENES[id][k].pose === pose && PHOTOS.has(`${id}-${k}`));
  const best = keys.find(k => k.startsWith(ctx.time + '-')) || keys.find(k => k.endsWith('-' + ctx.weather)) || keys[0];
  return best ? `${id}-${best}` : exact;
}

function thumbHTML(id, extra = '') {
  const n = photoName(id, { time: 'morning', weather: 'cool' });
  return PHOTOS.has(n) ? `<div class="thumb-photo ${extra}">${photoTag(n)}</div>` : animalFigure(id, 'active', `thumb ${extra}`);
}

function animalFigure(id, pose, extra = '') {
  return `<div class="figure figure-${id} ${pose === 'rest' ? 'is-rest' : ''} ${extra}">${animalSVG(id)}</div>`;
}

function poseFor(id, ctx) {
  return SCENES[id][sceneKey(ctx)].pose;
}

function updateHeaderCtx() {
  const c = liveContext();
  const temp = c.temp != null ? ` ${c.temp}°C` : '';
  ctxLabel.textContent = `${RANCH.place}　${timeLabel(c.time)}・${weatherLabel(c.weather)}${temp}`;
}

function setTabs(name) {
  document.querySelectorAll('.tabs a').forEach(a => a.classList.toggle('on', a.dataset.tab === name));
}

function homeView() {
  const c = liveContext();
  const ctx = { time: c.time, weather: c.weather };
  setTabs('home');
  view.innerHTML = `
  <section class="hero">
    <p class="eyebrow">飛牛牧場 × 互動遊戲</p>
    <h1>動物作息<br>大挑戰</h1>
    <p class="lead">早晨、正午、傍晚，動物們在做的事都不一樣。掃描觀察牌，看看牠們現在正在做什麼。</p>
  </section>
  ${PHOTOS.has('hero') ? `<div class="stage stage-hero has-photo">${photoTag('hero')}</div>` : `<div class="stage stage-hero">
    ${sceneSVG(ctx.time, ctx.weather)}
    ${animalFigure('cow', poseFor('cow', ctx), 'pos-cow')}
    ${animalFigure('goat', poseFor('goat', ctx), 'pos-goat')}
    ${animalFigure('rabbit', poseFor('rabbit', ctx), 'pos-rabbit')}
  </div>`}
  <section class="block">
    <p class="now">現在的牧場　${timeLabel(ctx.time)}・${weatherLabel(ctx.weather)}${c.temp != null ? `　體感 ${c.temp}°C` : ''}${c.source === 'estimate' ? '　（離線，依季節估計）' : ''}</p>
    <a class="btn btn-primary" href="#/scan">開始觀察</a>
  </section>
  <section class="block how">
    <h2>怎麼玩</h2>
    <ol class="steps">
      <li><span class="num">01</span><div><h3>選時間</h3><p>早晨、正午、傍晚。預設是現在的時間，也可以自己切換。</p></div></li>
      <li><span class="num">02</span><div><h3>看天氣</h3><p>炎熱或涼爽。預設抓飛牛牧場附近的即時天氣。</p></div></li>
      <li><span class="num">03</span><div><h3>掃描圖案</h3><p>用手機對準動物觀察牌，動物會出現在牌子上，告訴你牠現在在做什麼。</p></div></li>
      <li><span class="num">04</span><div><h3>觀察與選擇</h3><p>判斷動物現在的狀態，選出最適合的做法。</p></div></li>
      <li><span class="num">05</span><div><h3>回饋與徽章</h3><p>了解背後的原因，收集動物圖鑑和徽章。</p></div></li>
    </ol>
  </section>
  <section class="block">
    <h2>更多玩法</h2>
    <a class="more-row" href="#/games"><span>快問快答</span><span class="more-sub">每種動物 6 題是非題，10 秒內作答</span></a>
    <a class="more-row" href="#/games"><span>作息排排看</span><span class="more-sub">把動物的活動放到早晨、正午、傍晚</span></a>
  </section>
  <section class="block print">
    <h2>手上沒有觀察牌？</h2>
    <p>下載三張觀察牌，用 A4 列印後就能試玩。</p>
    <a class="btn" href="assets/cards.pdf" download="動物觀察牌.pdf">下載觀察牌 PDF</a>
  </section>
  <footer class="foot">
    <p>第十二組　動物作息大挑戰</p>
    <p>遊戲內容僅供教學展示，實際動物照護以牧場專業人員的指引為準。</p>
  </footer>`;
}

function stageHTML(id, ctx, withBubble = true) {
  const s = SCENES[id][sceneKey(ctx)];
  const pn = photoName(id, ctx);
  if (PHOTOS.has(pn)) {
    return `<div class="stage stage-play has-photo">${photoTag(pn)}${withBubble ? `<p class="bubble">${s.state}</p>` : ''}</div>`;
  }
  return `<div class="stage stage-play">
    ${sceneSVG(ctx.time, ctx.weather)}
    ${withBubble ? `<p class="bubble">${s.state}</p>` : ''}
    ${animalFigure(id, s.pose, 'pos-solo')}
  </div>`;
}

function segHTML(name, items, current) {
  return `<div class="seg" role="radiogroup" aria-label="${name === 'time' ? '時段' : '天氣'}">
    ${items.map(i => `<button type="button" role="radio" aria-checked="${i.id === current}" data-${name}="${i.id}" class="${i.id === current ? 'on' : ''}">${i.label}</button>`).join('')}
  </div>`;
}

function playView(id, forcedKey) {
  const a = byId[id];
  if (!a) return notFound();
  setTabs('scan');
  store.markSeen(id);
  if (forcedKey && SCENES[id][forcedKey]) {
    const [time, weather] = forcedKey.split('-');
    chosen = { time, weather };
  }
  play = { id, phase: 'intro', choice: null, qi: 0 };
  renderPlay();
}

function roundQuestions(id, key) {
  const s = SCENES[id][key];
  return [{ question: s.question, options: s.options }, Q2[id][key]];
}

function buzz(ok) {
  try { navigator.vibrate && navigator.vibrate(ok ? 18 : [30, 60, 30]); } catch {}
}

function reactionFor(id) {
  const list = REACT[id];
  return list[Math.floor(Math.random() * list.length)];
}

function photoStage(id, ctx, bubble, extra = '') {
  const pn = photoName(id, ctx);
  if (PHOTOS.has(pn)) return `<div class="stage stage-play has-photo ${extra}">${photoTag(pn)}${bubble ? `<p class="bubble">${bubble}</p>` : ''}</div>`;
  return stageHTML(id, ctx);
}

function dotsHTML(qi, total) {
  return `<div class="dots" aria-label="第 ${qi + 1} 題，共 ${total} 題">${Array.from({ length: total }, (_, i) => `<i class="${i < qi ? 'done' : i === qi ? 'on' : ''}"></i>`).join('')}<span>第 ${qi + 1} / ${total} 題</span></div>`;
}

function moreGamesHTML(a) {
  const best = store.quizBest(a.id);
  return `<div class="more">
    <p class="more-title">${a.name}的其他玩法</p>
    <a class="more-row" href="#/quiz/${a.id}"><span>快問快答</span><span class="more-sub">${best == null ? '6 題是非題，限時作答' : `最佳 ${best} / 6`}</span></a>
    <a class="more-row" href="#/sort/${a.id}"><span>作息排排看</span><span class="more-sub">${store.sortDone(a.id) ? '已完成' : '把活動放到對的時段'}</span></a>
  </div>`;
}

function renderPlay() {
  const a = byId[play.id];
  const ctx = currentCtx();
  const key = sceneKey(ctx);
  const s = SCENES[a.id][key];
  const qs = roundQuestions(a.id, key);
  const head = `<p class="eyebrow">No.${a.no}　${a.name}</p>`;
  if (play.phase === 'intro') {
    view.innerHTML = `
    <section class="play">
      ${head}
      <h1 class="title-sm">${timeLabel(ctx.time)}・${weatherLabel(ctx.weather)}的${a.name}</h1>
      ${photoStage(a.id, ctx, s.state)}
      <div class="controls">
        <div class="control"><span class="control-label">時段</span>${segHTML('time', TIMES, ctx.time)}</div>
        <div class="control"><span class="control-label">天氣</span>${segHTML('weather', WEATHERS, ctx.weather)}</div>
        <p class="hint">${chosen ? '已切換成你選的情境。' : '依照現在的時間和牧場天氣選好情境，也可以自己切換。'}${store.isCorrect(a.id, key) ? '　這個情境你已經完成了。' : ''}</p>
      </div>
      <p class="situation">${s.situation}</p>
      <p class="tip-line"><span>小知識</span>${s.tip}</p>
      <button type="button" class="btn btn-primary" data-act="start">開始挑戰（2 題）</button>
    </section>`;
  } else if (play.phase === 'question') {
    const q = qs[play.qi];
    view.innerHTML = `
    <section class="play">
      ${head}
      ${dotsHTML(play.qi, qs.length)}
      ${photoStage(a.id, ctx, s.state, 'stage-mini')}
      <h1 class="question">${q.question}</h1>
      <div class="options">
        ${q.options.map((o, i) => `<button type="button" class="option" data-opt="${i}"><span class="letter">${'ABC'[i]}</span><span>${o.text}</span></button>`).join('')}
      </div>
      <button type="button" class="link" data-act="back">回到情境</button>
    </section>`;
  } else {
    const q = qs[play.qi];
    const o = q.options[play.choice];
    const ok = !!o.correct;
    const last = play.qi === qs.length - 1;
    const badges = play.newBadges || [];
    view.innerHTML = `
    <section class="play result ${ok ? 'is-ok' : 'is-no'}">
      ${head}
      ${dotsHTML(play.qi, qs.length)}
      ${photoStage(a.id, ctx, ok ? play.reaction : s.state, ok ? 'stage-mini cheer' : 'stage-mini')}
      <p class="verdict">${ok ? (last ? '這一回合完成了' : '答對了') : '再想想看'}</p>
      <p class="result-q">${q.question}</p>
      <div class="answer">
        <p class="answer-label">你的選擇</p>
        <p class="answer-text">${o.text}</p>
        <p class="answer-note">${o.note}</p>
      </div>
      ${ok ? '' : `<p class="retry-hint">想一想${a.name}在${timeLabel(ctx.time)}、${weatherLabel(ctx.weather)}的時候需要什麼，再試一次。</p>`}
      ${badges.map(b => `<div class="earned">${badgeSVG(b.icon, true)}<div><p class="earned-label">獲得新徽章</p><p class="earned-name">${b.name}</p></div></div>`).join('')}
      <div class="actions">
        ${!ok ? `<button type="button" class="btn btn-primary" data-act="retry">再試一次</button>`
          : !last ? `<button type="button" class="btn btn-primary" data-act="next-q">下一題</button>`
          : `<button type="button" class="btn btn-primary" data-act="next">換一個情境</button><a class="btn" href="#/scan">回到觀察</a>`}
      </div>
      ${ok && last ? moreGamesHTML(a) : ''}
    </section>`;
  }
  window.scrollTo(0, 0);
}

function nextScene(id) {
  const ctx = currentCtx();
  const order = [];
  for (const t of TIMES) for (const w of WEATHERS) order.push(`${t.id}-${w.id}`);
  const start = order.indexOf(sceneKey(ctx));
  for (let i = 1; i <= order.length; i++) {
    const k = order[(start + i) % order.length];
    if (!store.isCorrect(id, k)) return k;
  }
  return order[(start + 1) % order.length];
}

view.addEventListener('click', e => {
  const t = e.target.closest('button');
  if (!t) return;
  if (quiz && view.querySelector('.quiz')) return onQuizClick(t);
  if (sorter && view.querySelector('.sorter')) return onSortClick(t);
  if (!play || !view.querySelector('.play')) return;
  if (t.dataset.time) { chosen = { ...currentCtx(), time: t.dataset.time }; renderPlay(); return; }
  if (t.dataset.weather) { chosen = { ...currentCtx(), weather: t.dataset.weather }; renderPlay(); return; }
  if (t.dataset.opt != null) {
    const key = sceneKey(currentCtx());
    const q = roundQuestions(play.id, key)[play.qi];
    const i = parseInt(t.dataset.opt, 10);
    if (!(i >= 0 && i < q.options.length)) return;
    const ok = !!q.options[i].correct;
    play.choice = i;
    play.reaction = reactionFor(play.id);
    play.newBadges = ok && play.qi === 1 ? store.recordCorrect(play.id, key) : [];
    buzz(ok);
    play.phase = 'result';
    renderPlay();
    return;
  }
  const act = t.dataset.act;
  if (act === 'start') { play.qi = 0; play.phase = 'question'; renderPlay(); }
  if (act === 'retry') { play.phase = 'question'; renderPlay(); }
  if (act === 'next-q') { play.qi += 1; play.phase = 'question'; renderPlay(); }
  if (act === 'back') { play.phase = 'intro'; renderPlay(); }
  if (act === 'next') {
    const [time, weather] = nextScene(play.id).split('-');
    chosen = { time, weather };
    play.qi = 0;
    play.phase = 'intro';
    renderPlay();
  }
});

let quiz = null;
let quizTimer = null;
const QUIZ_SECONDS = 10;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function stopQuizTimer() {
  if (quizTimer) { clearTimeout(quizTimer); quizTimer = null; }
}

function quizView(id) {
  const a = byId[id];
  if (!a) return notFound();
  setTabs('games');
  quiz = { id, items: shuffle(QUIZ[id]), i: 0, score: 0, streak: 0, best: 0, phase: 'q', answer: null };
  renderQuiz();
}

function renderQuiz() {
  stopQuizTimer();
  const a = byId[quiz.id];
  const n = quiz.items.length;
  if (quiz.phase === 'end') {
    const stars = quiz.score >= 6 ? 3 : quiz.score >= 4 ? 2 : quiz.score >= 2 ? 1 : 0;
    view.innerHTML = `
    <section class="quiz page">
      <p class="eyebrow">快問快答　${a.name}</p>
      <div class="score"><span class="big">${quiz.score}</span><span> / ${n}</span></div>
      <div class="stars" aria-label="${stars} 顆星">${[0, 1, 2].map(i => `<svg viewBox="0 0 24 24" class="${i < stars ? 'on' : ''}" aria-hidden="true"><path d="M12 3.5 L14.6 9 L20.5 9.6 L16 13.6 L17.3 19.5 L12 16.5 L6.7 19.5 L8 13.6 L3.5 9.6 L9.4 9 Z"/></svg>`).join('')}</div>
      <p class="lead">${quiz.score === n ? `全對！你是${a.name}專家。` : quiz.score >= 4 ? '很不錯，再玩一次挑戰全對。' : '多看幾次圖鑑，再來挑戰。'}最高連續答對 ${quiz.best} 題。</p>
      ${(quiz.newBadges || []).map(b => `<div class="earned">${badgeSVG(b.icon, true)}<div><p class="earned-label">獲得新徽章</p><p class="earned-name">${b.name}</p></div></div>`).join('')}
      <div class="actions">
        <button type="button" class="btn btn-primary" data-q="again">再玩一次</button>
        <a class="btn" href="#/games">換一種動物</a>
      </div>
      <a class="link" href="#/book/${a.id}">看${a.name}圖鑑</a>
    </section>`;
    return;
  }
  const item = quiz.items[quiz.i];
  const answered = quiz.phase === 'a';
  const ok = answered && quiz.answer === item.answer;
  const timeout = answered && quiz.answer === null;
  view.innerHTML = `
  <section class="quiz page">
    <p class="eyebrow">快問快答　${a.name}</p>
    ${dotsHTML(quiz.i, n)}
    <div class="timer ${answered ? 'stopped' : ''}"><span style="animation-duration:${QUIZ_SECONDS}s"></span></div>
    <p class="streak">${quiz.streak >= 2 ? `連續答對 ${quiz.streak} 題` : '&nbsp;'}</p>
    <h1 class="statement">${item.text}</h1>
    <div class="ox">
      <button type="button" class="ox-btn ${answered && item.answer === true ? 'is-answer' : ''} ${answered && quiz.answer === true && !ok ? 'is-wrong' : ''}" data-q="o" ${answered ? 'disabled' : ''}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7.5"/></svg><span>對</span></button>
      <button type="button" class="ox-btn ${answered && item.answer === false ? 'is-answer' : ''} ${answered && quiz.answer === false && !ok ? 'is-wrong' : ''}" data-q="x" ${answered ? 'disabled' : ''}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6 L18 18 M18 6 L6 18"/></svg><span>錯</span></button>
    </div>
    ${answered ? `<div class="quiz-feedback ${ok ? 'is-ok' : 'is-no'}"><p class="verdict-sm">${ok ? '答對了' : timeout ? '時間到' : '答錯了'}</p><p>${item.note}</p></div>
    <button type="button" class="btn btn-primary" data-q="next">${quiz.i === n - 1 ? '看成績' : '下一題'}</button>` : ''}
  </section>`;
  if (!answered) {
    quizTimer = setTimeout(() => { if (quiz && quiz.phase === 'q') answerQuiz(null); }, QUIZ_SECONDS * 1000);
  }
  window.scrollTo(0, 0);
}

function answerQuiz(value) {
  const item = quiz.items[quiz.i];
  const ok = value === item.answer;
  quiz.answer = value;
  quiz.phase = 'a';
  if (ok) { quiz.score += 1; quiz.streak += 1; quiz.best = Math.max(quiz.best, quiz.streak); } else { quiz.streak = 0; }
  buzz(ok);
  renderQuiz();
}

function onQuizClick(t) {
  const q = t.dataset.q;
  if (!q) return;
  if (q === 'o' && quiz.phase === 'q') answerQuiz(true);
  if (q === 'x' && quiz.phase === 'q') answerQuiz(false);
  if (q === 'next') {
    if (quiz.i === quiz.items.length - 1) {
      quiz.phase = 'end';
      quiz.newBadges = store.recordQuiz(quiz.id, quiz.score);
    } else {
      quiz.i += 1;
      quiz.phase = 'q';
      quiz.answer = null;
    }
    renderQuiz();
  }
  if (q === 'again') quizView(quiz.id);
}

let sorter = null;

function sortView(id) {
  const a = byId[id];
  if (!a) return notFound();
  setTabs('games');
  let cards = shuffle(SORT[id].map((c, i) => ({ ...c, k: i })));
  while (cards.every((c, i) => c.time === TIMES[i].id)) cards = shuffle(cards);
  sorter = { id, cards, place: { morning: null, noon: null, evening: null }, pick: null, checked: false };
  renderSort();
}

const SUN = {
  morning: '<path d="M3 17 H21"/><path d="M7 17 A5 5 0 0 1 17 17"/><path d="M12 8 V10 M5.5 11 L7 12.3 M18.5 11 L17 12.3"/>',
  noon: '<circle cx="12" cy="12" r="4"/><path d="M12 3 V5 M12 19 V21 M3 12 H5 M19 12 H21 M5.6 5.6 L7 7 M17 17 L18.4 18.4 M5.6 18.4 L7 17 M17 7 L18.4 5.6"/>',
  evening: '<path d="M3 17 H21"/><path d="M8 17 A4 4 0 0 1 16 17"/><path d="M4 20.5 H20"/>'
};

function renderSort() {
  const a = byId[sorter.id];
  const placed = new Set(Object.values(sorter.place).filter(v => v != null));
  const allPlaced = placed.size === 3;
  const allRight = sorter.checked && TIMES.every(t => sorter.place[t.id] != null && sorter.cards[sorter.place[t.id]].time === t.id);
  view.innerHTML = `
  <section class="sorter page">
    <p class="eyebrow">作息排排看　${a.name}</p>
    <h1 class="title-sm">${a.name}一天會做什麼？</h1>
    <p class="hint">先點一張卡片，再點它該放的時段。點已放好的卡片可以拿回來。</p>
    <div class="slots">
      ${TIMES.map(t => {
        const ci = sorter.place[t.id];
        const state = sorter.checked && ci != null ? (sorter.cards[ci].time === t.id ? 'right' : 'wrong') : '';
        return `<button type="button" class="slot ${ci != null ? 'filled' : ''} ${state}" data-slot="${t.id}">
          <span class="slot-head"><svg viewBox="0 0 24 24" aria-hidden="true">${SUN[t.id]}</svg>${t.label}</span>
          <span class="slot-body">${ci != null ? sorter.cards[ci].text : '放在這裡'}</span>
        </button>`;
      }).join('')}
    </div>
    <div class="cards">
      ${sorter.cards.map((c, i) => placed.has(i) ? '' : `<button type="button" class="card ${sorter.pick === i ? 'picked' : ''}" data-card="${i}">${c.text}</button>`).join('')}
    </div>
    ${allRight ? `<div class="quiz-feedback is-ok"><p class="verdict-sm">全部正確</p><p>${a.name}的作息會跟著時間和溫度改變：涼爽的時候活動，最熱的時候休息。</p></div>
      ${(sorter.newBadges || []).map(b => `<div class="earned">${badgeSVG(b.icon, true)}<div><p class="earned-label">獲得新徽章</p><p class="earned-name">${b.name}</p></div></div>`).join('')}
      <div class="actions"><a class="btn btn-primary" href="#/games">玩其他動物</a><a class="btn" href="#/quiz/${a.id}">挑戰快問快答</a></div>`
      : sorter.checked ? `<div class="quiz-feedback is-no"><p class="verdict-sm">還差一點</p><p>標示錯誤的卡片再換個位置試試看。</p></div>`
      : ''}
    ${!allRight ? `<button type="button" class="btn btn-primary" data-s="check" ${allPlaced ? '' : 'disabled'}>檢查答案</button>` : ''}
  </section>`;
}

function onSortClick(t) {
  if (t.dataset.card != null) {
    const i = parseInt(t.dataset.card, 10);
    sorter.pick = sorter.pick === i ? null : i;
    renderSort();
    return;
  }
  if (t.dataset.slot) {
    const slot = t.dataset.slot;
    if (!(slot in sorter.place)) return;
    sorter.checked = false;
    if (sorter.pick != null) {
      sorter.place[slot] = sorter.pick;
      sorter.pick = null;
    } else if (sorter.place[slot] != null) {
      sorter.place[slot] = null;
    }
    renderSort();
    return;
  }
  if (t.dataset.s === 'check') {
    sorter.checked = true;
    const ok = TIMES.every(x => sorter.cards[sorter.place[x.id]].time === x.id);
    buzz(ok);
    sorter.newBadges = ok ? store.recordSort(sorter.id) : [];
    renderSort();
  }
}

function gamesView() {
  setTabs('games');
  view.innerHTML = `
  <section class="page">
    <p class="eyebrow">遊戲</p>
    <h1 class="title">更多玩法</h1>
    <p class="lead">除了掃描觀察牌的情境挑戰，還可以用快問快答和作息排排看，複習三種動物的作息。</p>
    <ul class="game-list">
      ${ANIMALS.map(a => {
        const best = store.quizBest(a.id);
        return `<li class="game-row">
          ${thumbHTML(a.id)}
          <div class="game-text">
            <p class="book-no">No.${a.no}</p>
            <p class="book-name">${a.name}</p>
            <div class="game-links">
              <a href="#/quiz/${a.id}" class="chip">快問快答<span>${best == null ? '' : `${best}/6`}</span></a>
              <a href="#/sort/${a.id}" class="chip">作息排排看<span>${store.sortDone(a.id) ? '完成' : ''}</span></a>
              <a href="#/play/${a.id}" class="chip">情境挑戰<span>${store.correctCount(a.id)}/6</span></a>
            </div>
          </div>
        </li>`;
      }).join('')}
    </ul>
  </section>`;
}

function bookView() {
  setTabs('book');
  view.innerHTML = `
  <section class="page">
    <p class="eyebrow">圖鑑</p>
    <h1 class="title">牧場動物圖鑑</h1>
    <p class="lead">掃描觀察牌就能解鎖，完成的情境會記錄在這裡。</p>
    <ul class="book-list">
      ${ANIMALS.map(a => {
        const seen = store.isSeen(a.id);
        return `<li><a href="#/book/${a.id}" class="book-row ${seen ? '' : 'locked'}">
          ${thumbHTML(a.id)}
          <div class="book-text">
            <p class="book-no">No.${a.no}</p>
            <p class="book-name">${a.name}</p>
            <p class="book-sub">${seen ? `完成 ${store.correctCount(a.id)} / 6 個情境` : '尚未觀察'}</p>
          </div>
        </a></li>`;
      }).join('')}
    </ul>
  </section>`;
}

function bookDetail(id) {
  const a = byId[id];
  if (!a) return notFound();
  setTabs('book');
  const seen = store.isSeen(a.id);
  if (!seen) {
    view.innerHTML = `
    <section class="page">
      <a class="link back" href="#/book">← 圖鑑</a>
      <p class="eyebrow">No.${a.no}</p>
      <h1 class="title">還沒遇見${a.name}</h1>
      <div class="detail-art locked">${thumbHTML(a.id, 'wide')}</div>
      <p class="lead">掃描 No.${a.no} 觀察牌，就能解鎖${a.name}的圖鑑。</p>
      <div class="actions">
        <a class="btn btn-primary" href="#/scan">去掃描</a>
        <a class="btn" href="#/play/${a.id}">沒有觀察牌，直接開始</a>
      </div>
    </section>`;
    return;
  }
  view.innerHTML = `
  <section class="page">
    <a class="link back" href="#/book">← 圖鑑</a>
    <p class="eyebrow">No.${a.no}　<i>${a.latin}</i></p>
    <h1 class="title">${a.name}</h1>
    <div class="detail-art">${thumbHTML(a.id, 'wide')}</div>
    <p class="lead">${a.intro}</p>
    <ol class="facts">
      ${a.facts.map((f, i) => `<li><span class="num">0${i + 1}</span><div><h3>${f.title}</h3><p>${f.text}</p></div></li>`).join('')}
    </ol>
    <h2>情境紀錄</h2>
    <p class="hint">點一下格子，就能玩那個情境。</p>
    <div class="grid" role="table">
      <div class="g-head" role="row"><span></span>${WEATHERS.map(w => `<span role="columnheader">${w.label}</span>`).join('')}</div>
      ${TIMES.map(t => `<div class="g-row" role="row"><span class="g-label" role="rowheader">${t.label}</span>${WEATHERS.map(w => {
        const k = `${t.id}-${w.id}`;
        const done = store.isCorrect(a.id, k);
        return `<a role="cell" class="cell ${done ? 'done' : ''}" href="#/play/${a.id}/${k}" aria-label="${t.label}${w.label}${done ? '，已答對' : '，尚未答對'}">${done ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 L10 17 L19 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}</a>`;
      }).join('')}</div>`).join('')}
    </div>
    <a class="btn btn-primary" href="#/play/${a.id}">開始${a.name}情境挑戰</a>
    ${moreGamesHTML(a)}
  </section>`;
}

function badgesView() {
  setTabs('badges');
  const earned = store.earnedBadges();
  const n = store.correctCount();
  view.innerHTML = `
  <section class="page">
    <p class="eyebrow">徽章</p>
    <h1 class="title">我的徽章</h1>
    <div class="progress">
      <p><span class="big">${n}</span> / ${store.TOTAL_SCENES} 個情境完成</p>
      <div class="bar"><span style="width:${Math.round(n / store.TOTAL_SCENES * 100)}%"></span></div>
    </div>
    <ul class="badges">
      ${BADGES.map(b => `<li class="${earned.has(b.id) ? 'earned-b' : ''}">${badgeSVG(b.icon, earned.has(b.id))}<p class="b-name">${b.name}</p><p class="b-rule">${earned.has(b.id) ? '已獲得' : b.rule}</p></li>`).join('')}
    </ul>
    <button type="button" class="link danger" id="reset">清除我的紀錄</button>
  </section>`;
  const btn = document.getElementById('reset');
  btn.addEventListener('click', () => {
    if (btn.dataset.armed) {
      store.resetProgress();
      badgesView();
    } else {
      btn.dataset.armed = '1';
      btn.textContent = '再按一次確認清除（無法復原）';
    }
  });
}

function notFound() {
  setTabs('');
  view.innerHTML = `<section class="page"><h1 class="title">找不到這一頁</h1><a class="btn" href="#/">回首頁</a></section>`;
}

const overlayEls = {};

function buildOverlay(a) {
  const el = document.createElement('div');
  el.className = 'ar-card';
  el.style.visibility = 'hidden';
  el.innerHTML = `<div class="ar-panel"><p class="ar-bubble"></p><div class="ar-figure"></div><div class="ar-tip"><span>小知識</span><p></p></div></div>`;
  overlayEls[a.id] = el;
  return el;
}

function fillOverlay(a, el) {
  const ctx = currentCtx();
  const s = SCENES[a.id][sceneKey(ctx)];
  el.querySelector('.ar-bubble').textContent = s.state;
  el.querySelector('.ar-tip p').textContent = s.tip;
  const pn = photoName(a.id, ctx);
  const hasPhoto = PHOTOS.has(pn);
  el.classList.toggle('has-photo', hasPhoto);
  el.querySelector('.ar-figure').innerHTML = hasPhoto ? photoTag(pn) : animalFigure(a.id, s.pose);
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
}

let lastFound = null;

function showSheet(html) {
  scanSheet.innerHTML = html;
  scanSheet.hidden = false;
}

function hideSheet() {
  scanSheet.hidden = true;
  scanSheet.innerHTML = '';
}

function renderScanCtx() {
  const ctx = currentCtx();
  scanCtx.innerHTML = segHTML('time', TIMES, ctx.time) + segHTML('weather', WEATHERS, ctx.weather);
}

function foundSheet(a) {
  const ctx = currentCtx();
  const s = SCENES[a.id][sceneKey(ctx)];
  showSheet(`
    <p class="eyebrow">No.${a.no}　${timeLabel(ctx.time)}・${weatherLabel(ctx.weather)}</p>
    <p class="sheet-title">${a.name}</p>
    <p class="sheet-state">「${s.state}」</p>
    <div class="actions">
      <a class="btn btn-primary" href="#/play/${a.id}">開始挑戰</a>
      <button type="button" class="btn" data-sheet="close">繼續掃描</button>
    </div>`);
}

function onFound(a, el) {
  fillOverlay(a, el);
  lastFound = a.id;
  scanFrame.classList.add('found');
  scanStatus.textContent = '';
  foundSheet(a);
  store.markSeen(a.id);
}

function onLost() {
  scanFrame.classList.remove('found');
  if (scanSheet.hidden) scanStatus.textContent = '把觀察牌放進框內';
}

function pickerHTML(msg) {
  return `
    ${msg ? `<p class="sheet-msg">${msg}</p>` : ''}
    <p class="eyebrow">直接選動物</p>
    <div class="pick">
      ${ANIMALS.map(a => `<a href="#/play/${a.id}" class="pick-item">${thumbHTML(a.id)}<span>${a.name}</span></a>`).join('')}
    </div>
    ${msg ? '' : '<button type="button" class="link" data-sheet="close">返回掃描</button>'}`;
}

const ERRORS = {
  insecure: '這個網址沒有使用 HTTPS，瀏覽器不允許開啟相機。請改用 https:// 開頭的網址。',
  unsupported: '這個瀏覽器不支援相機。iPhone 請用 Safari，Android 請用 Chrome。',
  denied: '相機權限被拒絕了。請到瀏覽器設定允許這個網站使用相機，再重新整理。',
  nocamera: '找不到可以使用的相機。',
  busy: '相機正被其他 App 使用，請關掉其他使用相機的 App 再試一次。',
  failed: '相機或辨識功能沒有成功啟動，請重新整理再試一次。'
};

scanner.addEventListener('click', e => {
  const c = e.target.closest('[data-time], [data-weather]');
  if (c && scanCtx.contains(c)) {
    chosen = { ...currentCtx(), ...(c.dataset.time ? { time: c.dataset.time } : { weather: c.dataset.weather }) };
    renderScanCtx();
    if (lastFound && overlayEls[lastFound] && overlayEls[lastFound].style.visibility === 'visible') {
      fillOverlay(byId[lastFound], overlayEls[lastFound]);
      if (!scanSheet.hidden && scanSheet.querySelector('.sheet-title')) foundSheet(byId[lastFound]);
    }
    return;
  }
  const b = e.target.closest('[data-sheet]');
  if (!b) return;
  if (b.dataset.sheet === 'close') {
    hideSheet();
    scanStatus.textContent = '把觀察牌放進框內';
  }
  if (b.dataset.sheet === 'pick') showSheet(pickerHTML());
});

async function openScanner() {
  setTabs('scan');
  document.body.classList.add('scanning');
  scanner.hidden = false;
  hideSheet();
  scanFrame.classList.remove('found');
  lastFound = null;
  renderScanCtx();
  scanStatus.textContent = '正在開啟相機…';
  const r = await startScan(arBox, { buildOverlay, onFound, onLost });
  if (r === 'cancelled') return;
  if (route().name !== 'scan') { stopScan(); return; }
  if (r === 'ok') {
    scanStatus.textContent = '把觀察牌放進框內';
  } else {
    scanStatus.textContent = '';
    showSheet(pickerHTML(ERRORS[r] || ERRORS.failed));
  }
}

function closeScanner() {
  if (scanner.hidden) return;
  stopScan();
  scanner.hidden = true;
  document.body.classList.remove('scanning');
  hideSheet();
}

function route() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  return { name: parts[0] || 'home', args: parts.slice(1) };
}

function render() {
  const r = route();
  if (r.name !== 'scan') closeScanner();
  if (r.name !== 'play') play = null;
  if (r.name !== 'quiz') { quiz = null; stopQuizTimer(); }
  if (r.name !== 'sort') sorter = null;
  if (r.name === 'home') homeView();
  else if (r.name === 'scan') openScanner();
  else if (r.name === 'play') playView(r.args[0], r.args[1]);
  else if (r.name === 'book' && r.args[0]) bookDetail(r.args[0]);
  else if (r.name === 'book') bookView();
  else if (r.name === 'badges') badgesView();
  else if (r.name === 'games') gamesView();
  else if (r.name === 'quiz') quizView(r.args[0]);
  else if (r.name === 'sort') sortView(r.args[0]);
  else notFound();
  if (r.name !== 'scan') window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
updateHeaderCtx();
render();
loadLiveContext().then(() => {
  updateHeaderCtx();
  if (route().name === 'home') homeView();
  if (route().name === 'play' && play && play.phase === 'intro' && !chosen) renderPlay();
});
