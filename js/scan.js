import { ANIMALS } from './data.js';

let mod = null;
let mind = null;
let session = 0;

export function cameraSupport() {
  if (!window.isSecureContext) return 'insecure';
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return 'unsupported';
  return 'ok';
}

async function probeCamera() {
  try {
    const s = await navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: 'environment' } });
    s.getTracks().forEach(t => t.stop());
    return 'ok';
  } catch (e) {
    const n = e && e.name;
    if (n === 'NotAllowedError' || n === 'SecurityError') return 'denied';
    if (n === 'NotFoundError' || n === 'OverconstrainedError') return 'nocamera';
    if (n === 'NotReadableError') return 'busy';
    return 'failed';
  }
}

async function loadModules() {
  if (mod) return mod;
  const [{ MindARThree }, { CSS3DObject }] = await Promise.all([
    import('../vendor/mindar-image-three.prod.js'),
    import('../vendor/CSS3DRenderer.js')
  ]);
  mod = { MindARThree, CSS3DObject };
  return mod;
}

function teardown(m) {
  if (!m) return;
  try { m.renderer.setAnimationLoop(null); } catch {}
  try { m.stop(); } catch {}
  try { m.renderer.dispose(); } catch {}
  [m.renderer && m.renderer.domElement, m.cssRenderer && m.cssRenderer.domElement, m.video].forEach(el => {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  });
}

export async function startScan(container, { buildOverlay, onFound, onLost }) {
  const my = ++session;
  const support = cameraSupport();
  if (support !== 'ok') return support;
  const probe = await probeCamera();
  if (probe !== 'ok') return probe;
  if (my !== session) return 'cancelled';
  let m = null;
  try {
    const { MindARThree, CSS3DObject } = await loadModules();
    if (my !== session) return 'cancelled';
    teardown(mind);
    container.innerHTML = '';
    m = new MindARThree({
      container,
      imageTargetSrc: 'assets/targets.mind',
      maxTrack: 1,
      uiLoading: 'no',
      uiScanning: 'no',
      uiError: 'no',
      filterMinCF: 0.0001,
      filterBeta: 0.001
    });
    mind = m;
    ANIMALS.forEach((a, i) => {
      const anchor = m.addCSSAnchor(i);
      const el = buildOverlay(a);
      anchor.group.add(new CSS3DObject(el));
      anchor.onTargetFound = () => { if (mind === m) onFound(a, el); };
      anchor.onTargetLost = () => { if (mind === m) onLost(a, el); };
    });
    await m.start();
    if (my !== session || mind !== m) { teardown(m); return 'cancelled'; }
    m.renderer.setAnimationLoop(() => m.cssRenderer.render(m.cssScene, m.camera));
    return 'ok';
  } catch {
    teardown(m);
    if (mind === m) mind = null;
    return 'failed';
  }
}

export function stopScan() {
  session++;
  teardown(mind);
  mind = null;
}
