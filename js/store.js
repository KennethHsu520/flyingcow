import { ANIMALS, BADGES, SCENES, TIMES } from './data.js';
import { REWARDS } from './rewards.js';

const VALID_REWARDS = new Set(REWARDS.map(r => r.id));
const CODE_RE = /^[A-Z0-9]{4}-[A-Z0-9]{4}$/;

const KEY = 'fnr-progress-v1';
const VALID_ANIMALS = new Set(ANIMALS.map(a => a.id));
const VALID_SCENES = new Set(Object.keys(SCENES.cow));

function empty() {
  return { seen: {}, correct: {}, quiz: {}, sort: {}, vouchers: {}, name: '' };
}

function sanitize(raw) {
  const out = empty();
  if (!raw || typeof raw !== 'object') return out;
  if (raw.seen && typeof raw.seen === 'object') {
    for (const k of Object.keys(raw.seen)) if (VALID_ANIMALS.has(k) && raw.seen[k] === true) out.seen[k] = true;
  }
  if (raw.correct && typeof raw.correct === 'object') {
    for (const k of Object.keys(raw.correct)) {
      const [a, s] = k.split(':');
      if (VALID_ANIMALS.has(a) && VALID_SCENES.has(s) && raw.correct[k] === true) out.correct[k] = true;
    }
  }
  if (raw.quiz && typeof raw.quiz === 'object') {
    for (const k of Object.keys(raw.quiz)) {
      const v = raw.quiz[k];
      if (VALID_ANIMALS.has(k) && Number.isInteger(v) && v >= 0 && v <= 6) out.quiz[k] = v;
    }
  }
  if (raw.sort && typeof raw.sort === 'object') {
    for (const k of Object.keys(raw.sort)) if (VALID_ANIMALS.has(k) && raw.sort[k] === true) out.sort[k] = true;
  }
  if (raw.vouchers && typeof raw.vouchers === 'object') {
    for (const k of Object.keys(raw.vouchers)) {
      const v = raw.vouchers[k];
      if (!VALID_REWARDS.has(k) || !v || typeof v !== 'object') continue;
      if (typeof v.code !== 'string' || !CODE_RE.test(v.code)) continue;
      if (typeof v.issued !== 'number' || !Number.isFinite(v.issued)) continue;
      out.vouchers[k] = { code: v.code, issued: v.issued, used: typeof v.used === 'number' && Number.isFinite(v.used) ? v.used : null };
    }
  }
  if (typeof raw.name === 'string') out.name = cleanName(raw.name);
  return out;
}

let state = load();

function load() {
  try {
    return sanitize(JSON.parse(localStorage.getItem(KEY)));
  } catch {
    return empty();
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

export function cleanName(v) {
  return String(v || '').replace(/[<>&"'`\\/]/g, '').replace(/\s+/g, ' ').trim().slice(0, 12);
}

export function getName() {
  return state.name;
}

export function setName(v) {
  state.name = cleanName(v);
  save();
  return state.name;
}

function makeCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const buf = new Uint32Array(8);
  crypto.getRandomValues(buf);
  const c = [...buf].map(n => chars[n % chars.length]).join('');
  return c.slice(0, 4) + '-' + c.slice(4);
}

export function voucher(id) {
  return state.vouchers[id] || null;
}

export function issueVoucher(id) {
  const r = REWARDS.find(x => x.id === id);
  if (!r || earnedBadges().size < r.need) return null;
  if (!state.vouchers[id]) {
    state.vouchers[id] = { code: makeCode(), issued: Date.now(), used: null };
    save();
  }
  return state.vouchers[id];
}

export function redeemVoucher(id) {
  const v = state.vouchers[id];
  if (!v || v.used) return v;
  v.used = Date.now();
  save();
  return v;
}

export function markSeen(animalId) {
  if (!VALID_ANIMALS.has(animalId) || state.seen[animalId]) return;
  state.seen[animalId] = true;
  save();
}

export function isSeen(animalId) {
  return !!state.seen[animalId];
}

export function isCorrect(animalId, sceneKey) {
  return !!state.correct[`${animalId}:${sceneKey}`];
}

export function correctCount(animalId) {
  return Object.keys(state.correct).filter(k => !animalId || k.startsWith(animalId + ':')).length;
}

export function earnedBadges() {
  const keys = Object.keys(state.correct);
  const earned = new Set();
  for (const a of ANIMALS) if (keys.filter(k => k.startsWith(a.id + ':')).length >= 3) earned.add(a.id);
  if (TIMES.every(t => keys.some(k => k.split(':')[1].startsWith(t.id + '-')))) earned.add('allday');
  if (keys.length >= ANIMALS.length * VALID_SCENES.size) earned.add('master');
  if (Object.values(state.quiz).some(v => v >= 6)) earned.add('quiz');
  if (ANIMALS.every(a => state.sort[a.id])) earned.add('sort');
  return earned;
}

function diff(before) {
  const after = earnedBadges();
  return BADGES.filter(b => after.has(b.id) && !before.has(b.id));
}

export function quizBest(animalId) {
  return state.quiz[animalId] ?? null;
}

export function recordQuiz(animalId, score) {
  if (!VALID_ANIMALS.has(animalId) || !Number.isInteger(score) || score < 0 || score > 6) return [];
  const before = earnedBadges();
  if (state.quiz[animalId] == null || score > state.quiz[animalId]) {
    state.quiz[animalId] = score;
    save();
  }
  return diff(before);
}

export function sortDone(animalId) {
  return !!state.sort[animalId];
}

export function recordSort(animalId) {
  if (!VALID_ANIMALS.has(animalId)) return [];
  const before = earnedBadges();
  state.sort[animalId] = true;
  save();
  return diff(before);
}

export function recordCorrect(animalId, sceneKey) {
  const before = earnedBadges();
  const k = `${animalId}:${sceneKey}`;
  if (!VALID_ANIMALS.has(animalId) || !VALID_SCENES.has(sceneKey)) return [];
  state.correct[k] = true;
  save();
  const after = earnedBadges();
  return BADGES.filter(b => after.has(b.id) && !before.has(b.id));
}

export function resetProgress() {
  state = empty();
  save();
}

export const TOTAL_SCENES = ANIMALS.length * VALID_SCENES.size;
