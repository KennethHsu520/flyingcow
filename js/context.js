import { RANCH } from './data.js';

const CACHE_KEY = 'fnr-weather-v1';
const CACHE_MS = 30 * 60 * 1000;
const HOT_AT = 28;

export function taipeiHour(date = new Date()) {
  const h = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hourCycle: 'h23', timeZone: 'Asia/Taipei' }).format(date);
  return parseInt(h, 10);
}

export function taipeiMonth(date = new Date()) {
  return parseInt(new Intl.DateTimeFormat('en-GB', { month: 'numeric', timeZone: 'Asia/Taipei' }).format(date), 10);
}

export function timeOfDay(hour) {
  if (hour < 10) return 'morning';
  if (hour < 15) return 'noon';
  return 'evening';
}

function estimate(time) {
  const m = taipeiMonth();
  const summer = m >= 5 && m <= 10;
  return { weather: summer && time !== 'morning' ? 'hot' : 'cool', temp: null, source: 'estimate' };
}

function readCache() {
  try {
    const c = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (c && typeof c.t === 'number' && Date.now() - c.t < CACHE_MS && typeof c.temp === 'number' && Number.isFinite(c.temp)) return c;
  } catch {}
  return null;
}

async function fetchTemp() {
  const cached = readCache();
  if (cached) return cached.temp;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${RANCH.lat}&longitude=${RANCH.lon}&current=apparent_temperature&timezone=Asia%2FTaipei`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 6000);
  try {
    const res = await fetch(url, { signal: ctrl.signal, credentials: 'omit', referrerPolicy: 'no-referrer' });
    if (!res.ok) throw new Error('weather ' + res.status);
    const data = await res.json();
    const temp = Number(data && data.current && data.current.apparent_temperature);
    if (!Number.isFinite(temp) || temp < -30 || temp > 60) throw new Error('weather data');
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), temp })); } catch {}
    return temp;
  } finally {
    clearTimeout(timer);
  }
}

let live = null;

export async function loadLiveContext() {
  const time = timeOfDay(taipeiHour());
  try {
    const temp = await fetchTemp();
    live = { time, weather: temp >= HOT_AT ? 'hot' : 'cool', temp: Math.round(temp), source: 'live' };
  } catch {
    live = { time, ...estimate(time) };
  }
  return live;
}

export function liveContext() {
  if (live) return live;
  const time = timeOfDay(taipeiHour());
  return { time, ...estimate(time) };
}
