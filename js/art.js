const INK = '#2B2620';

function cow() {
  return `
<svg class="animal animal-cow" viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <clipPath id="cowBodyClip"><path d="M112 92 C112 72 132 63 162 63 L262 65 C292 66 306 82 306 106 L306 140 C306 164 292 176 266 176 L152 177 C126 177 112 165 112 146 Z"/></clipPath>
    <clipPath id="cowHeadClip"><path d="M122 80 C104 68 74 70 62 86 L48 120 C44 134 52 144 66 144 L92 142 C106 140 114 130 118 117 Z"/></clipPath>
  </defs>
  <ellipse class="shadow" cx="190" cy="236" rx="132" ry="8" fill="${INK}" opacity=".08"/>
  <g class="legs-active">
    <path d="M128 160 L128 222 Q128 228 134 228 L142 228 Q148 228 148 222 L148 160 Z" fill="#FDFCF8" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M128 216 L148 216 L148 222 Q148 228 142 228 L134 228 Q128 228 128 222 Z" fill="${INK}"/>
    <path d="M156 160 L156 222 Q156 228 162 228 L170 228 Q176 228 176 222 L176 160 Z" fill="#FDFCF8" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M156 216 L176 216 L176 222 Q176 228 170 228 L162 228 Q156 228 156 222 Z" fill="${INK}"/>
    <path d="M250 160 L250 222 Q250 228 256 228 L264 228 Q270 228 270 222 L270 160 Z" fill="#FDFCF8" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M250 216 L270 216 L270 222 Q270 228 264 228 L256 228 Q250 228 250 222 Z" fill="${INK}"/>
    <path d="M278 156 L278 222 Q278 228 284 228 L292 228 Q298 228 298 222 L298 156 Z" fill="#2F2B27" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  </g>
  <g class="legs-rest">
    <path d="M118 214 Q118 200 140 200 L176 202 Q188 204 186 214 Q184 224 170 224 L130 224 Q118 224 118 214 Z" fill="#FDFCF8" stroke="${INK}" stroke-width="3"/>
    <path d="M246 214 Q246 200 268 200 L298 202 Q310 204 308 214 Q306 224 292 224 L258 224 Q246 224 246 214 Z" fill="#FDFCF8" stroke="${INK}" stroke-width="3"/>
  </g>
  <g class="torso">
    <g class="tail">
      <path d="M304 96 C318 104 320 130 318 160" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
      <path d="M318 156 C326 160 328 176 318 182 C308 176 310 160 318 156 Z" fill="#2F2B27"/>
    </g>
    <path d="M112 92 C112 72 132 63 162 63 L262 65 C292 66 306 82 306 106 L306 140 C306 164 292 176 266 176 L152 177 C126 177 112 165 112 146 Z" fill="#FDFCF8"/>
    <g clip-path="url(#cowBodyClip)" fill="#2F2B27">
      <path d="M150 58 C176 56 196 74 190 96 C184 118 156 120 144 104 C134 90 132 62 150 58 Z"/>
      <path d="M232 60 C262 58 284 66 296 88 C304 104 288 122 266 116 C246 110 230 96 226 80 C224 70 226 62 232 60 Z"/>
      <path d="M206 134 C222 126 244 136 246 152 C248 170 228 184 208 180 C190 176 188 144 206 134 Z"/>
      <path d="M296 136 C306 132 316 140 314 160 L306 180 L284 180 C280 160 284 142 296 136 Z"/>
    </g>
    <path d="M112 92 C112 72 132 63 162 63 L262 65 C292 66 306 82 306 106 L306 140 C306 164 292 176 266 176 L152 177 C126 177 112 165 112 146 Z" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path class="udder" d="M240 174 Q242 192 256 192 Q270 192 272 174" fill="#E9B7A6" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <g class="head">
      <ellipse class="ear" cx="122" cy="80" rx="15" ry="7" transform="rotate(-24 122 80)" fill="#2F2B27" stroke="${INK}" stroke-width="3"/>
      <path d="M122 80 C104 68 74 70 62 86 L48 120 C44 134 52 144 66 144 L92 142 C106 140 114 130 118 117 Z" fill="#FDFCF8"/>
      <g clip-path="url(#cowHeadClip)" fill="#2F2B27">
        <path d="M70 70 C96 66 118 74 120 96 C122 110 106 118 92 112 C80 106 74 96 70 86 Z"/>
      </g>
      <path d="M122 80 C104 68 74 70 62 86 L48 120 C44 134 52 144 66 144 L92 142 C106 140 114 130 118 117 Z" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M44 124 C42 112 54 108 66 110 C80 112 86 122 84 132 C82 142 72 146 60 145 C50 144 45 136 44 124 Z" fill="#E9B7A6" stroke="${INK}" stroke-width="3"/>
      <ellipse cx="56" cy="124" rx="2.6" ry="3.6" fill="${INK}"/>
      <ellipse cx="68" cy="122" rx="2.6" ry="3.6" fill="${INK}"/>
      <g class="eye"><circle cx="86" cy="98" r="4.6" fill="#FDFCF8"/><circle cx="85" cy="98" r="3.2" fill="${INK}"/><rect class="lid" x="80" y="92" width="12" height="12" fill="#2F2B27" transform="scale(1 0)"/></g>
      <path d="M96 76 Q100 66 108 64" fill="none" stroke="#C8B79B" stroke-width="5" stroke-linecap="round"/>
    </g>
  </g>
</svg>`;
}

function goat() {
  return `
<svg class="animal animal-goat" viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse class="shadow" cx="180" cy="236" rx="110" ry="8" fill="${INK}" opacity=".08"/>
  <g class="legs-active">
    <path d="M124 150 L122 222 Q122 228 128 228 L134 228 Q139 228 139 222 L140 150 Z" fill="#B88B60" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M122 218 L139 218 L139 222 Q139 228 134 228 L128 228 Q122 228 122 222 Z" fill="${INK}"/>
    <path d="M146 150 L148 222 Q148 228 154 228 L160 228 Q165 228 165 222 L162 150 Z" fill="#C9A27A" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M148 218 L165 218 L165 222 Q165 228 160 228 L154 228 Q148 228 148 222 Z" fill="${INK}"/>
    <path d="M220 150 L216 222 Q216 228 222 228 L228 228 Q233 228 233 222 L236 150 Z" fill="#B88B60" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M216 218 L233 218 L233 222 Q233 228 228 228 L222 228 Q216 228 216 222 Z" fill="${INK}"/>
    <path d="M242 148 L242 222 Q242 228 248 228 L254 228 Q259 228 259 222 L258 148 Z" fill="#C9A27A" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M242 218 L259 218 L259 222 Q259 228 254 228 L248 228 Q242 228 242 222 Z" fill="${INK}"/>
  </g>
  <g class="legs-rest">
    <path d="M112 216 Q112 204 132 204 L166 206 Q176 208 174 216 Q172 226 160 226 L122 226 Q112 226 112 216 Z" fill="#C9A27A" stroke="${INK}" stroke-width="3"/>
    <path d="M210 216 Q210 204 230 204 L262 206 Q272 208 270 216 Q268 226 256 226 L220 226 Q210 226 210 216 Z" fill="#C9A27A" stroke="${INK}" stroke-width="3"/>
  </g>
  <g class="torso">
    <g class="tail">
      <path d="M262 92 C272 84 278 72 276 62 C268 66 262 76 258 88 Z" fill="#8A6A4A" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    </g>
    <path d="M110 98 C112 80 128 74 150 76 L236 78 C258 80 270 94 268 116 L266 140 C264 158 250 164 232 164 L142 164 C120 164 108 152 108 134 Z" fill="#C9A27A" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M150 100 C180 108 210 110 240 104" fill="none" stroke="#A9825C" stroke-width="3" stroke-linecap="round"/>
    <path d="M146 124 C172 132 206 134 236 128" fill="none" stroke="#A9825C" stroke-width="3" stroke-linecap="round"/>
        <g class="head">
      <path d="M118 84 C116 66 104 52 92 46" fill="none" stroke="#8A7A66" stroke-width="7" stroke-linecap="round"/>
      <path d="M118 84 C116 66 104 52 92 46" fill="none" stroke="${INK}" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>
      <path d="M128 92 C124 72 104 62 86 66 C70 70 58 82 54 98 L50 114 C48 124 54 130 64 128 L86 124 C104 122 118 116 124 106 Z" fill="#C9A27A" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M86 68 C92 82 90 104 74 120" fill="none" stroke="#F4EEE4" stroke-width="10" stroke-linecap="round"/>
      <path class="ear" d="M116 78 C130 76 142 80 146 88 C136 92 124 90 114 86 Z" fill="#B88B60" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path class="beard" d="M66 126 C64 138 68 150 74 156 C78 146 80 134 80 124 Z" fill="#8A6A4A" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="57" cy="108" rx="2.4" ry="3.2" fill="${INK}"/>
      <path d="M54 118 Q60 122 66 119" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
      <g class="eye"><ellipse cx="94" cy="88" rx="6" ry="5" fill="#E8C66A" stroke="${INK}" stroke-width="2"/><rect x="90" y="86.6" width="8" height="2.8" rx="1.2" fill="${INK}"/><rect class="lid" x="87" y="82" width="14" height="12" fill="#C9A27A" transform="scale(1 0)"/></g>
    </g>
  </g>
</svg>`;
}

function rabbit() {
  return `
<svg class="animal animal-rabbit" viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse class="shadow" cx="182" cy="236" rx="96" ry="8" fill="${INK}" opacity=".08"/>
  <g class="torso">
    <g class="ears">
      <path class="ear-back" d="M196 98 C204 60 222 30 236 28 C248 28 244 54 232 80 C224 96 214 106 204 108 Z" fill="#BFA78D" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <g class="ear-front">
        <path d="M176 96 C178 56 190 22 204 18 C218 16 218 44 210 74 C204 94 196 104 186 106 Z" fill="#CDB8A0" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M188 92 C190 62 198 36 204 32 C210 34 208 56 202 76 C198 88 194 94 188 92 Z" fill="#E8B9A8"/>
      </g>
    </g>
    <path class="tail" d="M262 176 C276 170 290 178 288 192 C286 204 270 206 262 198 Z" fill="#F4EEE4" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path class="body" d="M150 142 C152 112 178 98 212 102 C250 106 276 132 278 170 C280 206 262 228 226 228 L170 228 C140 228 128 212 132 190 C134 172 146 158 150 142 Z" fill="#CDB8A0" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M150 196 C156 214 176 222 196 220" fill="none" stroke="#F1E8DC" stroke-width="12" stroke-linecap="round"/>
    <path d="M236 186 C250 190 262 204 260 224" fill="none" stroke="#B49B80" stroke-width="3" stroke-linecap="round"/>
    <path d="M160 222 C160 214 168 210 178 212 L196 216 C204 218 204 228 196 228 L166 228 C162 228 160 226 160 222 Z" fill="#F1E8DC" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <g class="head">
      <path d="M118 140 C116 116 134 98 160 98 C186 98 202 116 200 138 C198 160 180 172 156 172 C134 172 120 160 118 140 Z" fill="#CDB8A0" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M128 150 C132 162 146 168 160 166" fill="none" stroke="#F1E8DC" stroke-width="9" stroke-linecap="round"/>
      <g class="nose"><path d="M118 136 Q122 132 126 136 Q122 141 118 136 Z" fill="#D98E86" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/></g>
      <path d="M122 142 Q126 150 134 148" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M126 140 L104 134 M126 143 L102 146" stroke="${INK}" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>
      <g class="eye"><circle cx="150" cy="128" r="6" fill="${INK}"/><circle cx="148" cy="126" r="1.8" fill="#FDFCF8"/><rect class="lid" x="142" y="120" width="16" height="16" fill="#CDB8A0" transform="scale(1 0)"/></g>
    </g>
  </g>
</svg>`;
}

export const ANIMAL_ART = { cow, goat, rabbit };

export function animalSVG(id) {
  return ANIMAL_ART[id]();
}

export function sceneSVG(time, weather) {
  const sky = { morning: '#F4EBDD', noon: '#EEF1EC', evening: '#F1DFCB' }[time];
  const [sunX, sunY] = { morning: [250, 96], noon: [318, 54], evening: [92, 118] }[time];
  const sunCol = weather === 'hot' ? '#E9A25F' : '#EED7A6';
  const sunR = weather === 'hot' ? 22 : 17;
  const rays = weather === 'hot'
    ? Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = sunX + Math.cos(a) * (sunR + 7), y1 = sunY + Math.sin(a) * (sunR + 7);
        const x2 = sunX + Math.cos(a) * (sunR + 15), y2 = sunY + Math.sin(a) * (sunR + 15);
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${sunCol}" stroke-width="2.6" stroke-linecap="round"/>`;
      }).join('')
    : '';
  const air = weather === 'cool'
    ? `<g fill="none" stroke="#9FB2A8" stroke-width="2" stroke-linecap="round">
        <path d="M120 150 Q146 142 168 150 T212 148"/>
        <path d="M250 170 Q270 163 290 170"/>
      </g>
      <path d="M150 116 C150 106 162 101 170 106 C175 98 190 98 195 108 C205 106 212 113 208 121 L154 121 C150 121 150 118 150 116 Z" fill="#FBF9F4" stroke="#D9D2C4" stroke-width="1.8"/>`
    : `<g fill="none" stroke="#E2B98C" stroke-width="1.8" stroke-linecap="round" opacity=".85">
        <path d="M70 236 q5 -7 0 -14 q-5 -7 0 -14"/>
        <path d="M300 240 q5 -7 0 -14 q-5 -7 0 -14"/>
        <path d="M336 244 q5 -7 0 -14 q-5 -7 0 -14"/>
      </g>`;
  return `
<svg class="scene" viewBox="0 0 400 320" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="400" height="320" fill="${sky}"/>
  <circle cx="${sunX}" cy="${sunY}" r="${sunR}" fill="${sunCol}"/>
  ${rays}
  <path d="M0 214 C70 196 140 202 210 210 C280 218 340 196 400 202 L400 320 L0 320 Z" fill="#C7D0B0"/>
  <g>
    <rect x="352" y="150" width="8" height="66" fill="#8A6A4A"/>
    <circle cx="356" cy="142" r="30" fill="#8FA56F"/>
    <circle cx="334" cy="158" r="20" fill="#7F9762"/>
    <circle cx="380" cy="156" r="22" fill="#7F9762"/>
  </g>
  <g stroke="#B08A62" stroke-width="4" stroke-linecap="round">
    <line x1="16" y1="206" x2="16" y2="238"/><line x1="54" y1="204" x2="54" y2="238"/><line x1="92" y1="206" x2="92" y2="238"/>
    <line x1="8" y1="216" x2="100" y2="214"/><line x1="8" y1="229" x2="100" y2="227"/>
  </g>
  ${air}
  <path d="M0 262 C90 252 200 258 290 254 C340 252 372 256 400 254 L400 320 L0 320 Z" fill="#A9B98A"/>
</svg>`;
}

export function badgeSVG(kind, earned) {
  const col = earned ? '#5E7A4C' : '#C9C3B6';
  const icons = {
    cow: '<path d="M46 40 C46 34 52 32 60 32 C68 32 74 34 74 40 L76 62 C76 72 70 80 60 80 C50 80 44 72 44 62 Z"/><path d="M46 44 C38 42 32 44 30 48 C36 52 42 52 46 50 M74 44 C82 42 88 44 90 48 C84 52 78 52 74 50"/><path d="M48 34 C46 28 46 24 48 22 M72 34 C74 28 74 24 72 22"/><ellipse cx="60" cy="70" rx="11" ry="7"/><circle cx="56" cy="70" r="1"/><circle cx="64" cy="70" r="1"/><path d="M52 40 C56 46 62 46 64 40"/>',
    goat: '<path d="M44 46 C44 40 50 36 60 36 C70 36 76 40 76 46 L74 64 C72 72 66 76 60 76 C54 76 48 72 46 64 Z"/><path d="M48 40 C44 32 36 30 32 32 M72 40 C76 32 84 30 88 32"/><path d="M56 76 L60 86 L64 76"/>',
    rabbit: '<ellipse cx="60" cy="62" rx="16" ry="14"/><path d="M52 50 C48 38 48 28 52 26 C58 28 58 40 56 50 M68 50 C72 38 72 28 68 26 C62 28 62 40 64 50"/>',
    clock: '<circle cx="60" cy="58" r="20"/><path d="M60 46 L60 58 L70 64"/>',
    leaf: '<path d="M40 74 C40 50 56 38 80 38 C80 62 66 76 42 76 Z"/><path d="M44 72 L68 48"/>',
    bolt: '<path d="M64 34 L46 62 L60 62 L54 86 L76 54 L62 54 Z"/>',
    sun: '<circle cx="60" cy="60" r="11"/><path d="M60 38 V44 M60 76 V82 M38 60 H44 M76 60 H82 M45 45 L49 49 M71 71 L75 75 M45 75 L49 71 M71 49 L75 45"/>'
  };
  return `
<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="60" cy="60" r="54" fill="none" stroke="${col}" stroke-width="2"/>
  <circle cx="60" cy="60" r="47" fill="none" stroke="${col}" stroke-width="1" stroke-dasharray="2 4"/>
  <g fill="none" stroke="${col}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${icons[kind]}</g>
</svg>`;
}
