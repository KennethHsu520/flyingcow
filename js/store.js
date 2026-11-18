import { ANIMALS, BADGES, SCENES, TIMES } from './data.js';

const KEY = 'fnr-progress-v1';
const VALID_ANIMALS = new Set(ANIMALS.map(a => a.id));
const VALID_SCENES = new Set(Object.keys(SCENES.cow));

function empty() {
  return { seen: {}, correct: {} };
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
  return earned;
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
