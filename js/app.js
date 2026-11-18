import { ANIMALS, SCENES, TIMES, WEATHERS, BADGES, RANCH } from './data.js';
import { animalSVG, sceneSVG, badgeSVG } from './art.js';
import { loadLiveContext, liveContext } from './context.js';
import * as store from './store.js';
import { startScan, stopScan } from './scan.js';
import { PHOTOS } from './photos.js';

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
  play = { id, phase: 'intro', choice: null };
  renderPlay();
}

function renderPlay() {
  const a = byId[play.id];
  const ctx = currentCtx();
  const key = sceneKey(ctx);
  const s = SCENES[a.id][key];
  const head = `<p class="eyebrow">No.${a.no}　${a.name}</p>`;
  if (play.phase === 'intro') {
    view.innerHTML = `
    <section class="play">
      ${head}
      <h1 class="title-sm">${timeLabel(ctx.time)}・${weatherLabel(ctx.weather)}的${a.name}</h1>
      ${stageHTML(a.id, ctx)}
      <div class="controls">
        <div class="control"><span class="control-label">時段</span>${segHTML('time', TIMES, ctx.time)}</div>
        <div class="control"><span class="control-label">天氣</span>${segHTML('weather', WEATHERS, ctx.weather)}</div>
        <p class="hint">${chosen ? '已切換成你選的情境。' : '依照現在的時間和牧場天氣選好情境，也可以自己切換。'}${store.isCorrect(a.id, key) ? '　這個情境你已經答對過了。' : ''}</p>
      </div>
      <p class="situation">${s.situation}</p>
      <button type="button" class="btn btn-primary" data-act="start">開始判斷</button>
    </section>`;
  } else if (play.phase === 'question') {
    view.innerHTML = `
    <section class="play">
      ${head}
      <p class="meta">${timeLabel(ctx.time)}・${weatherLabel(ctx.weather)}</p>
      <h1 class="question">${s.question}</h1>
      <div class="options">
        ${s.options.map((o, i) => `<button type="button" class="option" data-opt="${i}"><span class="letter">${'ABC'[i]}</span><span>${o.text}</span></button>`).join('')}
      </div>
      <button type="button" class="link" data-act="back">回到情境</button>
    </section>`;
  } else {
    const o = s.options[play.choice];
    const ok = !!o.correct;
    const badges = play.newBadges || [];
    view.innerHTML = `
    <section class="play result ${ok ? 'is-ok' : 'is-no'}">
      ${head}
      <p class="verdict">${ok ? '答對了' : '再想想看'}</p>
      <h1 class="question">${s.question}</h1>
      <div class="answer ${ok ? 'right' : 'wrong'}">
        <p class="answer-label">你的選擇</p>
        <p class="answer-text">${o.text}</p>
        <p class="answer-note">${o.note}</p>
      </div>
      ${ok ? '' : `<p class="retry-hint">想一想${a.name}在${timeLabel(ctx.time)}、${weatherLabel(ctx.weather)}的時候需要什麼，再試一次。</p>`}
      ${badges.map(b => `<div class="earned">${badgeSVG(b.icon, true)}<div><p class="earned-label">獲得新徽章</p><p class="earned-name">${b.name}</p></div></div>`).join('')}
      <div class="actions">
        ${ok ? `<button type="button" class="btn btn-primary" data-act="next">換一個情境</button>` : `<button type="button" class="btn btn-primary" data-act="retry">再試一次</button>`}
        <a class="btn" href="#/scan">回到觀察</a>
      </div>
      <a class="link" href="#/book/${a.id}">查看${a.name}圖鑑</a>
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
  if (!t || !play || !view.querySelector('.play')) return;
  if (t.dataset.time) { chosen = { ...currentCtx(), time: t.dataset.time }; renderPlay(); return; }
  if (t.dataset.weather) { chosen = { ...currentCtx(), weather: t.dataset.weather }; renderPlay(); return; }
  if (t.dataset.opt != null) {
    const i = parseInt(t.dataset.opt, 10);
    const s = SCENES[play.id][sceneKey(currentCtx())];
    if (!(i >= 0 && i < s.options.length)) return;
    play.choice = i;
    play.newBadges = s.options[i].correct ? store.recordCorrect(play.id, sceneKey(currentCtx())) : [];
    play.phase = 'result';
    renderPlay();
    return;
  }
  const act = t.dataset.act;
  if (act === 'start' || act === 'retry') { play.phase = 'question'; renderPlay(); }
  if (act === 'back') { play.phase = 'intro'; renderPlay(); }
  if (act === 'next') {
    const [time, weather] = nextScene(play.id).split('-');
    chosen = { time, weather };
    play.phase = 'intro';
    renderPlay();
  }
});

function bookView() {
  setTabs('book');
  view.innerHTML = `
  <section class="page">
    <p class="eyebrow">圖鑑</p>
    <h1 class="title">牧場動物圖鑑</h1>
    <p class="lead">掃描觀察牌就能解鎖，答對的情境會記錄在這裡。</p>
    <ul class="book-list">
      ${ANIMALS.map(a => {
        const seen = store.isSeen(a.id);
        return `<li><a href="#/book/${a.id}" class="book-row ${seen ? '' : 'locked'}">
          ${thumbHTML(a.id)}
          <div class="book-text">
            <p class="book-no">No.${a.no}</p>
            <p class="book-name">${a.name}</p>
            <p class="book-sub">${seen ? `答對 ${store.correctCount(a.id)} / 6 個情境` : '尚未觀察'}</p>
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
    <a class="btn btn-primary" href="#/play/${a.id}">開始${a.name}挑戰</a>
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
      <p><span class="big">${n}</span> / ${store.TOTAL_SCENES} 個情境答對</p>
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
  if (r.name === 'home') homeView();
  else if (r.name === 'scan') openScanner();
  else if (r.name === 'play') playView(r.args[0], r.args[1]);
  else if (r.name === 'book' && r.args[0]) bookDetail(r.args[0]);
  else if (r.name === 'book') bookView();
  else if (r.name === 'badges') badgesView();
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
