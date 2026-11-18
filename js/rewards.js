export const MEDAL_PHOTO = {
  cow: 'cow-morning-cool',
  goat: 'goat-morning-cool',
  rabbit: 'rabbit-morning-cool',
  allday: 'cow-evening-cool',
  master: 'hero',
  quiz: 'goat-evening-hot',
  sort: 'rabbit-noon-cool',
  cards: 'cow-noon-hot'
};

export const REWARDS = [
  { id: 'cert1', need: 1, type: 'cert', name: '電子「小小觀察員」證書', desc: '存到手機的數位證書，可以分享給家人。', icon: 'cert' },
  { id: 'yogurt', need: 3, type: 'voucher', name: '飲優格 1 瓶', desc: '到牧場服務台出示兌換券，由工作人員核銷。', icon: 'yogurt' },
  { id: 'pudding', need: 5, type: 'voucher', name: '飛牛白布丁 1 個', desc: '到牧場服務台出示兌換券，由工作人員核銷。', icon: 'pudding' },
  { id: 'diy', need: 8, type: 'voucher', name: '彩繪肥牛 DIY 體驗折扣券', desc: '折扣內容依牧場公告，到 DIY 教室出示兌換券。', icon: 'diy' },
  { id: 'cert2', need: 8, type: 'cert', name: '電子「飛牛小牧場主」證書', desc: '集滿全部徽章才拿得到的最高榮譽。', icon: 'crown' }
];

export const CERTS = {
  cert1: { title: '小小觀察員', line: '認真觀察牧場動物，了解牠們在不同時間與天氣的需求。' },
  cert2: { title: '飛牛小牧場主', line: '集滿全部八枚徽章，是乳牛、山羊和兔子最好的朋友。' }
};

const ICONS = {
  cert: '<rect x="14" y="10" width="36" height="44" rx="3"/><path d="M22 22 H42 M22 29 H42 M22 36 H34"/><circle cx="42" cy="46" r="6"/><path d="M39 51 L37 58 L42 55.5 L47 58 L45 51"/>',
  yogurt: '<path d="M24 14 H40 L38 22 C44 26 46 32 46 40 V52 C46 55 44 56 41 56 H23 C20 56 18 55 18 52 V40 C18 32 20 26 26 22 Z"/><path d="M24 14 L25 9 H39 L40 14"/><path d="M18 40 H46"/>',
  pudding: '<path d="M16 50 H48"/><path d="M20 50 L24 26 C26 22 38 22 40 26 L44 50"/><path d="M24 26 C27 30 37 30 40 26"/><path d="M28 23 C29 19 35 19 36 23"/>',
  diy: '<path d="M18 40 C18 32 24 28 32 28 H42 C48 28 50 32 50 36 V40 C50 44 46 46 42 46 H26 C21 46 18 44 18 40 Z"/><path d="M24 46 V53 M44 46 V53 M30 46 V51 M38 46 V51"/><path d="M50 34 L56 30"/><circle cx="32" cy="36" r="3"/><circle cx="42" cy="37" r="2"/><path d="M14 18 L24 28 M14 18 L12 14 L16 16"/>',
  crown: '<path d="M14 46 L18 22 L28 32 L32 16 L36 32 L46 22 L50 46 Z"/><path d="M14 52 H50"/><circle cx="32" cy="38" r="3"/>'
};

export function rewardIcon(name) {
  return `<svg viewBox="0 0 64 64" aria-hidden="true">${ICONS[name]}</svg>`;
}
