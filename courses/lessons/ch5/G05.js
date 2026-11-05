/* درس مهارت G05 — مساحت مثلث با قاعده و ارتفاع (فصل ۵) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.G05 = {
  needs: ['utils'],
  setup: function (K0) {
var ML = window.MathLite, fa = ML.fa, rr = ML.renderRich, abs = Math.abs, df = K0.df;
var _u = K0._u, R = _u.R, M = _u.M, shuffle = _u.shuffle;
var K = Object.create(K0);   // K0 = هستهٔ مشترک؛ K = همان + ابزارهای اختصاصی این درس
var T = String.raw;
function css(id, txt) { if (document.getElementById(id)) { return; } var s = document.createElement('style'); s.id = id; s.textContent = txt; document.head.appendChild(s); }
var INK = '#14213d', TEAL = '#0e8f7e', PINK = '#d6457a', BLUE = '#4c5fd5', AMB = '#e08a00', YEL = '#ffc233', MINT = '#7fd0c3', RED = '#c62f2f', GREY = '#5a6a85';
var D2R = Math.PI / 180;
var pick = function (a) { return a[R(0, a.length - 1)]; };
var f2 = function (n) { return Math.round(n * 100) / 100; };
var nf = function (v) { var s = String(+(+v).toFixed(2)); return s === '-0' ? '0' : s; };
var dg = function (n) { return '<bdi style="direction:ltr;unicode-bidi:isolate">' + fa(n) + '°</bdi>'; };
var fan = function (v) { return fa(nf(v)).replace('.', '٫'); };
var gcd = function (a, b) { a = abs(a); b = abs(b); while (b) { var t = a % b; a = b; b = t; } return a; };
function uniqBy(arr, key) { var s = {}; return arr.filter(function (x) { var k = key(x); if (s[k]) { return false; } s[k] = 1; return true; }); }
var cards3 = function (cells) { return '<div class="sg sg3">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.h + '</b><span>' + c.t + '</span></div>'; }).join('') + '</div>'; };
var cards2 = function (cells) { return '<div class="sg">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + (c.e ? K.dm(c.e) : '') + '</div>'; }).join('') + '</div>'; };
var refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };
var fig1 = function (inner, cap) { return '<div class="figs one"><figure>' + inner + (cap ? '<figcaption>' + cap + '</figcaption>' : '') + '</figure></div>'; };
var figs2 = function (a, ca, b, cb) { return '<div class="figs"><figure>' + a + '<figcaption>' + ca + '</figcaption></figure><figure>' + b + '<figcaption>' + cb + '</figcaption></figure></div>'; };



/* ---------- ابزارهای SVG ---------- */
function sv(W, H) { return '<svg class="gsv" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-hidden="true">'; }
function stx(t, x, y, o) { o = o || {}; return '<text x="' + f2(x) + '" y="' + f2(y + (o.fs || 13) * 0.34) + '" text-anchor="' + (o.a || 'middle') + '" font-size="' + (o.fs || 13) + '"' + (o.b ? ' font-weight="bold"' : '') + ' fill="' + (o.c || INK) + '" font-family="Tahoma,sans-serif">' + t + '</text>'; }
function sln(a, b, c, w, d) { return '<line x1="' + f2(a[0]) + '" y1="' + f2(a[1]) + '" x2="' + f2(b[0]) + '" y2="' + f2(b[1]) + '" stroke="' + (c || INK) + '" stroke-width="' + (w || 2) + '"' + (d ? ' stroke-dasharray="5 4"' : '') + ' stroke-linecap="round"/>'; }
function unit(a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy) || 1; return [dx / l, dy / l]; }
function dist(a, b) { return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])); }
function rmark(V, A, B, r, c) { var u1 = unit(V, A), u2 = unit(V, B), p1 = [V[0] + u1[0] * r, V[1] + u1[1] * r], p3 = [V[0] + u2[0] * r, V[1] + u2[1] * r], p2 = [p1[0] + u2[0] * r, p1[1] + u2[1] * r]; return '<polyline points="' + f2(p1[0]) + ',' + f2(p1[1]) + ' ' + f2(p2[0]) + ',' + f2(p2[1]) + ' ' + f2(p3[0]) + ',' + f2(p3[1]) + '" fill="none" stroke="' + (c || INK) + '" stroke-width="1.8"/>'; }
function arcP(V, A, B, r, c, fill) {
  var u1 = unit(V, A), u2 = unit(V, B), p1 = [V[0] + u1[0] * r, V[1] + u1[1] * r], p2 = [V[0] + u2[0] * r, V[1] + u2[1] * r], cr = u1[0] * u2[1] - u1[1] * u2[0], sw = cr > 0 ? 1 : 0;
  if (abs(cr) < 1e-6 && u1[0] * u2[0] + u1[1] * u2[1] < 0) { sw = 1; }
  return '<path d="' + (fill ? 'M' + f2(V[0]) + ' ' + f2(V[1]) + ' L' + f2(p1[0]) + ' ' + f2(p1[1]) : 'M' + f2(p1[0]) + ' ' + f2(p1[1])) + ' A' + r + ' ' + r + ' 0 0 ' + sw + ' ' + f2(p2[0]) + ' ' + f2(p2[1]) + (fill ? ' Z' : '') + '" fill="' + (fill || 'none') + '" stroke="' + (c || INK) + '" stroke-width="1.8"/>';
}
/* زاویه: o={deg, rot, l1, l2, lab, W, H, mark(قائمه), fill} — شکل با مختصات ریاضی ساخته و در کادر وسط‌چین می‌شود */
function angSVG(o) {
  var W = o.W || 300, H = o.H || 170, rot = o.rot || 0, l1 = o.l1 || 110, l2 = o.l2 || 110, a2 = rot + o.deg, d1 = [Math.cos(rot * D2R), Math.sin(rot * D2R)], d2 = [Math.cos(a2 * D2R), Math.sin(a2 * D2R)];
  var E1 = [d1[0] * l1, d1[1] * l1], E2 = [d2[0] * l2, d2[1] * l2], xs = [0, E1[0], E2[0]], ys = [0, E1[1], E2[1]], x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
  var ox = (W - (x1 - x0)) / 2 - x0, oy = (H - (y1 - y0)) / 2 + y1;
  function S(p) { return [ox + p[0], oy - p[1]]; }
  var V = S([0, 0]), A = S(E1), B = S(E2), s = sv(W, H), rad = Math.min(30, Math.min(l1, l2) * 0.4);
  if (o.fill !== false) { s += arcP(V, A, B, rad + 6, 'none', o.fill || '#fde7ef'); }
  s += sln(V, A, o.c1 || INK, 3) + sln(V, B, o.c2 || INK, 3) + '<circle cx="' + f2(V[0]) + '" cy="' + f2(V[1]) + '" r="4" fill="' + INK + '"/>';
  if (o.deg === 90 && o.mark !== false) { s += rmark(V, A, B, 16, INK); }
  else if (o.deg >= 180) { s += arcP(V, A, B, rad, PINK); }
  else { s += arcP(V, A, B, rad, PINK); }
  if (o.lab) { var mid = (rot + a2) / 2, lp = S([Math.cos(mid * D2R) * (rad + 22), Math.sin(mid * D2R) * (rad + 22)]); s += stx(o.lab, lp[0], lp[1], { fs: 13, b: 1, c: PINK }); }
  if (o.nameA) { s += stx(o.nameA, A[0] + (A[0] > V[0] ? 10 : -10), A[1], { fs: 12 }); }
  return s + '</svg>';
}
/* نقاله: o={deg, base:'R'|'L', hi(true: مقیاس درست پررنگ)} — مقیاس بیرونی صفرش سمت راست، مقیاس درونی صفرش سمت چپ */
function protSVG(o) {
  var W = 340, H = 196, cx = 170, cy = 170, r0 = 150, s = sv(W, H), t, i, a, p, q, base = o.base || 'R', th2 = base === 'R' ? o.deg : 180 - o.deg;
  s += '<path d="M' + (cx - r0) + ' ' + cy + ' A' + r0 + ' ' + r0 + ' 0 0 1 ' + (cx + r0) + ' ' + cy + ' Z" fill="#eaf4ff" stroke="' + INK + '" stroke-width="2"/>';
  s += '<path d="M' + (cx - 54) + ' ' + cy + ' A54 54 0 0 1 ' + (cx + 54) + ' ' + cy + '" fill="none" stroke="#b7c7dc" stroke-width="1"/>';
  for (i = 0; i <= 180; i += 5) {
    a = i * D2R; var len = i % 10 === 0 ? 11 : 6;
    p = [cx + r0 * Math.cos(a), cy - r0 * Math.sin(a)]; q = [cx + (r0 - len) * Math.cos(a), cy - (r0 - len) * Math.sin(a)];
    s += sln(p, q, INK, i % 10 === 0 ? 1.3 : 0.9);
    if (i % 10 === 0) {
      var po = [cx + 124 * Math.cos(a), cy - 124 * Math.sin(a)], pi = [cx + 100 * Math.cos(a), cy - 100 * Math.sin(a)], ho = o.hi && base === 'R', hi2 = o.hi && base === 'L';
      s += stx(fa(i), po[0], po[1], { fs: 10, c: ho ? TEAL : INK, b: ho });
      s += stx(fa(180 - i), pi[0], pi[1], { fs: 9, c: hi2 ? TEAL : GREY, b: hi2 });
    }
  }
  s += sln([cx - r0 - 8, cy], [cx + r0 + 8, cy], INK, 2);
  var e1 = base === 'R' ? [cx + 168, cy] : [cx - 168, cy], e2 = [cx + 168 * Math.cos(th2 * D2R), cy - 168 * Math.sin(th2 * D2R)];
  s += sln([cx, cy], e1, RED, 3) + sln([cx, cy], e2, RED, 3) + '<circle cx="' + cx + '" cy="' + cy + '" r="4" fill="' + RED + '"/>';
  if (o.zero) { s += stx(fa(0), base === 'R' ? cx + r0 + 2 : cx - r0 - 2, cy + 14, { fs: 11, c: TEAL, b: 1 }); }
  return s + '</svg>';
}
/* مثلث: o={pts:[A,B,C] مختصات ریاضی, names, sl:[برچسب AB,BC,CA], al:[برچسب زاویه در A,B,C], right:اندیس رأس قائمه, arcs, alt:{from,base,l}, hl:{side:i,c}, col:[رنگ ضلع‌ها], fill, W, H} */
function triSVG(o) {
  var W = o.W || 290, H = o.H || 190, pad = o.pad || 40, names = o.names || ['A', 'B', 'C'], i, s, pts = o.pts.slice(), all = pts.slice();
  var altInfo = null, foot = null;
  if (o.alt) {
    var vi = o.alt.from, b0 = pts[o.alt.base], b1 = pts[(o.alt.base + 1) % 3], dx = b1[0] - b0[0], dy = b1[1] - b0[1], tt = ((pts[vi][0] - b0[0]) * dx + (pts[vi][1] - b0[1]) * dy) / (dx * dx + dy * dy);
    foot = [b0[0] + tt * dx, b0[1] + tt * dy]; all.push(foot); altInfo = { t: tt };
  }
  (o.dots || []).forEach(function (d) { all.push(d.p); });
  var xs = all.map(function (p) { return p[0]; }), ys = all.map(function (p) { return p[1]; }), x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
  var k = Math.min((W - 2 * pad) / ((x1 - x0) || 1), (H - 2 * pad) / ((y1 - y0) || 1));
  var ox = pad + ((W - 2 * pad) - (x1 - x0) * k) / 2, oy = pad + ((H - 2 * pad) - (y1 - y0) * k) / 2;
  function S(p) { return [ox + (p[0] - x0) * k, oy + (y1 - p[1]) * k]; }
  var P = pts.map(S), C = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3];
  s = sv(W, H);
  s += '<polygon points="' + P.map(function (p) { return f2(p[0]) + ',' + f2(p[1]); }).join(' ') + '" fill="' + (o.fill || '#eef4ff') + '" stroke="none"/>';
  if (o.alt) {
    var F = S(foot), V = P[o.alt.from], B0 = P[o.alt.base], B1 = P[(o.alt.base + 1) % 3];
    if (altInfo.t < -0.001 || altInfo.t > 1.001) { var far = altInfo.t < 0 ? B0 : B1; s += sln(far, F, INK, 1.8, 1); }
    s += sln(V, F, o.alt.c || PINK, 2.2, 1);
    var ref = altInfo.t < 0 ? B1 : (altInfo.t > 1 ? B0 : B1);
    s += rmark(F, V, altInfo.t < 0 || altInfo.t > 1 ? (altInfo.t < 0 ? B0 : B1) : B1, 10, INK);
    if (o.alt.l) { var m = [(V[0] + F[0]) / 2, (V[1] + F[1]) / 2], nn = unit(V, F), nrm = [-nn[1], nn[0]], sd = ((m[0] - C[0]) * nrm[0] + (m[1] - C[1]) * nrm[1]) >= 0 ? 1 : -1; s += stx(o.alt.l, m[0] + nrm[0] * sd * 14, m[1] + nrm[1] * sd * 14, { fs: 13, b: 1, c: PINK }); }
  }
  for (i = 0; i < 3; i++) { var a = P[i], b = P[(i + 1) % 3], isH = o.hl && o.hl.side === i; s += sln(a, b, isH ? o.hl.c : (o.col && o.col[i]) || INK, isH ? 4.5 : 2.6); }
  if (typeof o.right === 'number') { s += rmark(P[o.right], P[(o.right + 1) % 3], P[(o.right + 2) % 3], 12, INK); }
  if (o.arcs) { for (i = 0; i < 3; i++) { if (i !== o.right) { s += arcP(P[i], P[(i + 1) % 3], P[(i + 2) % 3], 17, PINK); } } }
  (o.extra || []).forEach(function (e) { s += sln(S(e.a), S(e.b), e.c || INK, e.w || 2, e.d); });
  (o.dots || []).forEach(function (d) { var q = S(d.p), uu = unit(C, q); s += '<circle cx="' + f2(q[0]) + '" cy="' + f2(q[1]) + '" r="3.5" fill="' + INK + '"/>' + stx(d.n, q[0] + (d.dx === undefined ? uu[0] * 15 : d.dx), q[1] + (d.dy === undefined ? uu[1] * 15 : d.dy), { fs: 14, b: 1 }); if (d.rm) { s += rmark(q, S(d.rm[0]), S(d.rm[1]), 10, INK); } });
  for (i = 0; i < 3; i++) {
    var u = unit(C, P[i]);
    s += stx(names[i], P[i][0] + u[0] * 15, P[i][1] + u[1] * 15, { fs: 14, b: 1 });
    if (o.al && o.al[i]) { var u2 = unit(P[i], C); s += stx(o.al[i], P[i][0] + u2[0] * 34, P[i][1] + u2[1] * 34, { fs: 11.5, b: 1, c: PINK }); }
    if (o.sl && o.sl[i]) {
      var a1 = P[i], b1 = P[(i + 1) % 3], mid = [(a1[0] + b1[0]) / 2, (a1[1] + b1[1]) / 2], dd = unit(a1, b1), nr = [-dd[1], dd[0]], sg = ((mid[0] - C[0]) * nr[0] + (mid[1] - C[1]) * nr[1]) >= 0 ? 1 : -1;
      s += stx(o.sl[i], mid[0] + nr[0] * sg * 14, mid[1] + nr[1] * sg * 14, { fs: 13, b: 1, c: o.slc || INK });
    }
  }
  if (o.hit) { for (i = 0; i < 3; i++) { var hp = P[i], hq = P[(i + 1) % 3]; s += '<line class="hitline" data-s="' + i + '" x1="' + f2(hp[0]) + '" y1="' + f2(hp[1]) + '" x2="' + f2(hq[0]) + '" y2="' + f2(hq[1]) + '" stroke="rgba(0,0,0,0.001)" stroke-width="24" stroke-linecap="round" tabindex="0" role="button" aria-label="ضلع ' + (i + 1) + '"/>'; } }
  return s + '</svg>';
}
function rotPts(pts, deg) { var c = Math.cos(deg * D2R), s = Math.sin(deg * D2R); return pts.map(function (p) { return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; }); }
/* مثلث قائم‌الزاویه با ضلع‌های قائم a و b؛ رأس قائمه روی اندیس r و چرخش دلخواه (هر سه رأس به ترتیب ساعت‌گرد یا پادساعت‌گرد) */
function rightPts(a, b, r, rot) {
  var base = [[0, 0], [a, 0], [0, b]], pts = [], i;   // رأس 0 قائمه
  for (i = 0; i < 3; i++) { pts[(r + i) % 3] = base[i]; }
  return rotPts(pts, rot || 0);
}
function angOf(P, i) { var u = unit(P[i], P[(i + 1) % 3]), v = unit(P[i], P[(i + 2) % 3]); return Math.acos(Math.max(-1, Math.min(1, u[0] * v[0] + u[1] * v[1]))) / D2R; }
/* نوار لغزندهٔ بومی با درجه‌بندیِ KaTeX (الگوی فصل اول) — ticks: [{v, t}] */
function gslider(id, min, max, val, step, ticks, label) {
  var tot = max - min, h = '<div class="g-sl graduated-range" style="--gr-total:' + tot + '">' + (label ? '<div class="lab"><span>' + label + '</span></div>' : '') + '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '" aria-label="' + (label || id) + '"><div class="graduated-ticks">';
  ticks.forEach(function (t) { h += '<span style="--gr-step:' + (t.v - min) + '"><i></i>' + (t.t === undefined ? M(String(t.v)) : t.t) + '</span>'; });
  return h + '</div></div>';
}

/* مثلث با زاویه‌های a در رأس 0 و b در رأس 1 (مختصات ریاضی) */
function triFromAng(a, b, L) { var c = 180 - a - b, ac = L * Math.sin(b * D2R) / Math.sin(c * D2R); return [[0, 0], [L, 0], [ac * Math.cos(a * D2R), ac * Math.sin(a * D2R)]]; }
/* مثلث با ضلع‌های AB=a ، BC=b ، CA=c (مختصات ریاضی) */
function triFromSides(a, b, c) { var x = (a * a + c * c - b * b) / (2 * a), y = Math.sqrt(Math.max(0, c * c - x * x)); return [[0, 0], [a, 0], [x, y]]; }

K.stepRun = function (host, stages, o) {
  o = o || {}; var si = 0, ok = 0, q, pick = null, fin = false;
  function nw() { q = stages[si].gen(); pick = null; }
  function paint() {
    var h = '<div class="stg">' + stages.map(function (s, i) { return '<span class="' + (i < si || fin ? 'dn' : i === si ? 'cu' : '') + '">' + (i < si || fin ? '✓ ' : '') + s.n + '</span>'; }).join('') + '</div>', oh = '', op, last = stages.length - 1;
    if (fin) { host.innerHTML = rr(h + '<div class="fb ok"><b>✓ همهٔ مرحله‌ها را گذراندی!</b> ' + (o.done || '') + '</div><div class="opts"><button type="button" class="btn" data-r="1" data-scroll>از اول، با مسئله‌های جدید</button></div>'); return; }
    h += '<p class="stage-progress-meta">مرحلهٔ ' + fa(si + 1) + ' — پاسخ‌های درست: ' + fa(ok) + ' از ۲</p><p class="ask">' + q.ask + '</p>' + (q.fig || '') + (q.cq ? '<div class="cq">' + q.cq + '</div>' : '') + '<div class="mc ' + (q.cls || 'm2') + '" id="smc"></div>';
    q.opts.forEach(function (x, k) { var c = pick === null ? '' : x.ok ? ' right' : k === pick ? ' wrong' : ''; oh += '<button type="button" class="btn opt' + c + '" data-o="' + k + '"' + (pick === null ? '' : ' disabled') + '>' + x.h + '</button>'; });
    if (pick !== null) { op = q.opts[pick]; h += '<div class="fb ' + (op.ok ? 'ok' : 'bad') + '">' + (op.ok ? '✓ درست است!' : op.m || 'این گزینه درست نیست.') + '</div><div class="ex">' + q.expl() + '</div><div class="opts"><button type="button" class="btn primary" data-n="1" data-scroll>' + (op.ok && ok >= 2 && si === last ? 'پایان' : 'مرحلهٔ بعدی') + '</button></div>'; }
    host.innerHTML = rr(h); host.querySelector('#smc').innerHTML = rr(oh);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.o !== undefined) { if (pick !== null) { return; } pick = +b.dataset.o; if (q.opts[pick].ok) { ok++; } paint(); }
    else if (b.dataset.n) { if (ok >= 2) { ok = 0; si++; if (si >= stages.length) { fin = true; paint(); return; } } nw(); paint(); }
    else if (b.dataset.r) { si = 0; ok = 0; fin = false; nw(); paint(); }
  }); nw(); paint();
};
/* gens: آرایه‌ای از ۵ تابع (هر کدام یک سؤال می‌دهد) */
K.finalRun = function (host, gens, msgs) {
  msgs = msgs || {}; var qs, i, ans;
  function build() { qs = gens.map(function (g) { return g(); }); i = 0; ans = []; }
  var fb = function (ok, html) { return '<div class="fb ' + (ok ? 'ok' : 'bad') + '">' + html + '</div>'; };
  function paint() {
    var q = qs[i], a = ans[i], h, oh = '', s, o, N = qs.length;
    if (i === N) {
      s = ans.filter(function (x, k) { return qs[k].opts[x].ok; }).length;
      host.innerHTML = rr('<div class="fb ' + (s >= N - 1 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(s) + ' از ' + fa(N) + '</b><br>' + (s === N ? (msgs.top || 'عالی بود!') : s >= 3 ? 'خوب بود. بخش‌هایی را که اشتباه کردی دوباره مرور کن.' : 'یک بار دیگر درس را مرور کن؛ بعد با سؤال‌های جدید امتحان کن.') + '</div><div class="opts end-actions"><button type="button" class="btn" data-pv="1" data-scroll>مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1" data-scroll>سؤال‌های جدید</button></div>'); return;
    }
    h = '<div class="stg">' + qs.map(function (x, k) { return '<span class="' + (ans[k] !== undefined ? (qs[k].opts[ans[k]].ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">' + q.ask + '</p>' + (q.fig || '') + (q.cq ? '<div class="cq">' + q.cq + '</div>' : '') + '<div class="mc ' + (q.cls || 'm2') + '" id="mcx"></div>';
    q.opts.forEach(function (op, k) { oh += '<button type="button" class="btn opt' + (a !== undefined ? (op.ok ? ' right' : k === a ? ' wrong' : '') : '') + '" data-o="' + k + '"' + (a !== undefined ? ' disabled' : '') + '>' + op.h + '</button>'; });
    if (a !== undefined) { o = q.opts[a]; h += fb(o.ok, o.ok ? '✓ درست است!' : (o.m || 'این گزینه درست نیست.')) + '<div class="ex">' + q.expl() + '</div>'; }
    h += '<div class="opts"><button type="button" class="btn" data-p="1"' + (i ? '' : ' disabled') + ' data-scroll>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (a === undefined ? ' disabled' : '') + ' data-scroll>' + (i === N - 1 ? 'مشاهدهٔ نتیجه' : 'سؤال بعدی') + '</button></div>';
    host.innerHTML = rr(h); host.querySelector('#mcx').innerHTML = rr(oh);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.o !== undefined) { if (ans[i] !== undefined) { return; } ans[i] = +b.dataset.o; paint(); } else if (b.dataset.nx) { i++; paint(); } else if (b.dataset.p) { i--; paint(); } else if (b.dataset.pv) { i = 0; paint(); } else if (b.dataset.r) { build(); paint(); }
  }); build(); paint();
};
/* pool: [{h(html), ok(1/0), e(html), fig?}] */
K.tfRun = function (host, pool, msgs) {
  msgs = msgs || {}; var L, i, answers;
  function nw() { L = shuffle(pool.slice()).slice(0, 6); i = 0; answers = L.map(function () { return null; }); }
  function paint() {
    var h, q, ans = answers[i], sc;
    if (i >= L.length) {
      sc = answers.filter(function (x, k) { return x === L[k].ok; }).length;
      host.innerHTML = rr('<div class="fb ' + (sc >= 5 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(sc) + ' از ' + fa(L.length) + '</b><br>' + (sc === L.length ? 'عالی! از هیچ تله‌ای رد نشدی.' : (msgs.bad || 'پیش از جواب‌دادن، جمله را با دقت با داده‌ها بسنج.')) + '</div><div class="opts end-actions"><button type="button" class="btn" data-pv="1" data-scroll>مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1" data-scroll>سؤال‌های جدید</button></div>'); return;
    }
    q = L[i];
    h = '<div class="stg">' + L.map(function (x, k) { return '<span class="' + (answers[k] !== null ? (answers[k] === x.ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">این جمله درست است؟</p>' + (q.fig || '') + '<div class="cq" style="font-size:1rem"><span class="snt">' + q.h + '</span></div><div class="sgnrow"><button type="button" class="btn' + (ans === null ? '' : q.ok === 1 ? ' right' : ans === 1 ? ' wrong' : '') + '" data-a="1"' + (ans === null ? '' : ' disabled') + '>درست</button><button type="button" class="btn' + (ans === null ? '' : q.ok === 0 ? ' right' : ans === 0 ? ' wrong' : '') + '" data-a="0"' + (ans === null ? '' : ' disabled') + '>نادرست</button></div>';
    if (ans !== null) { h += '<div class="fb ' + (ans === q.ok ? 'ok' : 'bad') + '">' + (ans === q.ok ? '✓ درست است!' : 'پاسخ نادرست است.') + '</div><div class="ex">' + q.e + '</div>'; }
    h += '<div class="opts"><button type="button" class="btn" data-p="1"' + (i === 0 ? ' disabled' : '') + ' data-scroll>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (ans === null ? ' disabled' : '') + ' data-scroll>' + (i === L.length - 1 ? 'مشاهدهٔ نتیجه' : 'سؤال بعدی') + '</button></div>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.a !== undefined) { if (answers[i] !== null) { return; } answers[i] = +b.dataset.a; paint(); }
    else if (b.dataset.nx) { i++; paint(); }
    else if (b.dataset.p) { i = Math.max(0, i - 1); paint(); }
    else if (b.dataset.pv) { i = 0; paint(); }
    else if (b.dataset.r) { nw(); paint(); }
  }); nw(); paint();
};

/* ---------- گزینه‌ساز مشترک ---------- */
/* correct/wrongs: {t, m} — t: عبارت TeX (یا HTML وقتی raw=true) */
function mkO(correct, wrongs, raw) {
  var list = uniqBy([{ t: correct.t, ok: 1, m: '' }].concat(wrongs.map(function (w) { return { t: w.t, ok: 0, m: w.m }; })), function (x) { return x.t; }), w = shuffle(list.slice(1)).slice(0, 3);
  return shuffle([list[0]].concat(w).map(function (z) { return { h: raw ? z.t : M(z.t), ok: !!z.ok, m: z.m || 'این گزینه درست نیست.' }; }));
}
/* گزینه‌های عددی: ans عدد درست؛ wrongs: [{v, m}]؛ suf پسوند TeX مثل ^\circ */
function numO(ans, wrongs, suf) {
  suf = suf || ''; var seen = {}, w = [], offs = [2, -2, 3, -3, 1, -1, 5, -5, 10], i = 0, v, k;
  seen[nf(ans)] = 1;
  wrongs.forEach(function (x) { k = nf(x.v); if (x.v > 0 && !seen[k]) { seen[k] = 1; w.push(x); } });
  while (w.length < 3 && i < offs.length) { v = ans + offs[i++]; k = nf(v); if (v > 0 && !seen[k]) { seen[k] = 1; w.push({ v: v, m: 'این عدد درست نیست؛ یک بار دیگر محاسبه کن.' }); } }
  return mkO({ t: nf(ans) + suf }, w.map(function (x) { return { t: nf(x.v) + suf, m: x.m }; }));
}

/* ---------- تمرین عددیِ مشترک: بنویس، بررسی کن، مسئلهٔ دیگر ---------- */
/* gen() → {ask, fig, cq, ans, unit, hint, expl()} */
K.numLab = function (host, gen, o) {
  o = o || {}; var q, done, tries, fbh, val;
  function nw() { q = gen(); done = false; tries = 0; fbh = ''; val = ''; }
  function parseNum(s) {
    s = (s || '').replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 1776; }).replace(/[٠-٩]/g, function (d) { return d.charCodeAt(0) - 1632; }).replace(/[٫,،]/g, '.').replace(/[−–—]/g, '-').replace(/\s/g, '');
    return /^-?\d+(\.\d+)?$/.test(s) ? +s : null;
  }
  function paint() {
    var h = '<p class="ask">' + q.ask + '</p>' + (q.fig || '') + (q.cq ? '<div class="cq">' + q.cq + '</div>' : '');
    h += '<div class="numrow"><input class="numin" id="gin" type="text" inputmode="decimal" autocomplete="off" aria-label="پاسخ"' + (done ? ' disabled' : '') + '><span class="unit">' + (q.unit || '') + '</span></div>' + fbh;
    if (done) { h += '<div class="ex">' + q.expl() + '</div>'; }
    h += done ? '<div class="opts g-ops"><button type="button" class="btn" data-nw="1" data-scroll>مسئلهٔ دیگر</button></div>' : '<div class="opts g-pair"><button type="button" class="btn primary" data-go="1">بررسی</button><button type="button" class="btn" data-nw="1" data-scroll>مسئلهٔ دیگر</button></div>';
    host.innerHTML = rr(h); var inp = host.querySelector('#gin'); inp.value = val;
  }
  function check() {
    var inp = host.querySelector('#gin'), v; val = inp.value; v = parseNum(val);
    if (v === null) { fbh = '<div class="fb bad">یک عدد بنویس (فقط عدد، بدون واحد).</div>'; paint(); host.querySelector('#gin').focus(); return; }
    tries++;
    if (abs(v - q.ans) < 1e-6) { done = true; fbh = '<div class="fb ok">' + (o.ok || '✓ آفرین، درست حل کردی!') + '</div>'; }
    else if (tries >= 2) { done = true; fbh = '<div class="fb bad">پاسخ درست ' + fan(q.ans) + ' است؛ راه‌حل را ببین.</div>'; }
    else { fbh = '<div class="fb bad">' + (q.hint || 'درست نیست؛ دوباره امتحان کن.') + '</div>'; }
    paint(); if (!done) { host.querySelector('#gin').focus(); }
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.go) { check(); } else if (b.dataset.nw) { nw(); paint(); }
  });
  host.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.id === 'gin' && !done) { e.preventDefault(); check(); } });
  nw(); paint();
};


/* ---------- آزمایشگاه ۱: رأس را روی خط موازی بلغزان ---------- */
K.apexLab = function (host) {
  host.innerHTML = rr('<p class="ask">رأس بالایی را روی خط نقطه‌چین بلغزان؛ قاعده ' + M('6') + ' و ارتفاع ' + M('4') + ' است:</p><div id="apf"></div><div class="gval" id="apv"></div><p class="legend" id="apl"></p>' + gslider('apr', -3, 9, 2, 1, [-3, 0, 3, 6, 9].map(function (v) { return { v: v, t: M(String(v)) }; }), 'جای رأس نسبت به نقطهٔ B'));
  var inp = host.querySelector('#apr');
  function paint() {
    var x = +inp.value, u = 24, B = [92, 188], C = [92 + 6 * u, 188], A = [92 + x * u, 188 - 4 * u], F = [A[0], 188], out = x < 0 || x > 6, s = sv(340, 220);
    s += '<line x1="6" y1="' + A[1] + '" x2="334" y2="' + A[1] + '" stroke="#9aa9c0" stroke-width="1.5" stroke-dasharray="2 5"/>';
    s += '<polygon points="' + [A, B, C].map(function (p) { return p.join(','); }).join(' ') + '" fill="rgba(76,95,213,.14)" stroke="none"/>';
    if (out) { s += sln(x < 0 ? B : C, F, INK, 1.8, 1); }
    s += sln(A, F, PINK, 2.4, 1) + rmark(F, A, x < 0 ? B : (x > 6 ? C : C), 10, INK);
    s += sln(A, B, INK, 3) + sln(B, C, TEAL, 5) + sln(A, C, INK, 3);
    s += '<circle cx="' + A[0] + '" cy="' + A[1] + '" r="5" fill="' + INK + '"/>' + stx('B', B[0] - 14, B[1] + 6, { b: 1, fs: 14 }) + stx('C', C[0] + 14, C[1] + 6, { b: 1, fs: 14 }) + stx('A', A[0], A[1] - 14, { b: 1, fs: 14 });
    s += stx(fa(6), (B[0] + C[0]) / 2, 208, { fs: 13, b: 1, c: TEAL }) + stx(fa(4), A[0] + (x < 3 ? 14 : -14), (A[1] + 188) / 2, { fs: 13, b: 1, c: PINK });
    host.querySelector('#apf').innerHTML = s + '</svg>';
    host.querySelector('#apv').innerHTML = '<i class="y">' + fa(1) + '/' + fa(2) + ' × ' + fa(6) + ' × ' + fa(4) + ' = ' + fa(12) + '</i>';
    host.querySelector('#apl').innerHTML = out ? 'پای ارتفاع <b>بیرون از قاعده</b> و روی امتدادِ آن افتاد؛ ولی ارتفاع هنوز ' + fa(4) + ' و مساحت هنوز ' + fa(12) + ' است.' : 'پای ارتفاع روی قاعده افتاده. جای رأس هرجا باشد، تا وقتی روی این خط است، مساحت ' + fa(12) + ' می‌ماند.';
  }
  inp.addEventListener('input', paint); paint();
};
/* ---------- آزمایشگاه ۲: قاعده را انتخاب کن ---------- */
K.baseLab = function (host) {
  var s = 0, P = [[0, 6], [0, 0], [8, 0]], HT = [8, 6, 4.8], LN = [6, 8, 10], NM = ['AB', 'BC', 'CA'];
  host.innerHTML = rr('<p class="ask">یک ضلع را قاعده انتخاب کن؛ ارتفاعِ مربوط و مساحت را ببین:</p><div class="chips" id="bsc"></div><div id="bsf"></div><div class="gval" id="bsv"></div><p class="legend" id="bsl"></p>');
  function paint() {
    var from = (s + 2) % 3, h = HT[s], l = LN[s], sl = ['', '', ''];
    host.querySelector('#bsc').innerHTML = [0, 1, 2].map(function (i) { return '<button type="button" class="chip' + (i === s ? ' on' : '') + '" data-s="' + i + '">' + NM[i] + '</button>'; }).join('');
    sl[s] = fa(l);
    host.querySelector('#bsf').innerHTML = triSVG({ pts: P, names: ['A', 'B', 'C'], right: 1, hl: { side: s, c: TEAL }, alt: { from: from, base: s, c: PINK, l: fan(h) }, sl: sl, slc: TEAL, W: 300, H: 210 });
    host.querySelector('#bsv').innerHTML = '<i class="g">قاعده: ' + fa(l) + '</i><i class="p">ارتفاع: ' + fan(h) + '</i><i class="y">' + fa(1) + '/' + fa(2) + ' × ' + fa(l) + ' × ' + fan(h) + ' = ' + fa(24) + '</i>';
    host.querySelector('#bsl').innerHTML = 'ارتفاعِ مربوط به قاعدهٔ ' + NM[s] + '، پاره‌خطی است از رأسِ روبه‌رو که بر این قاعده عمود می‌شود. با هر سه قاعده مساحت یکی می‌شود: ' + fa(24) + '.';
  }
  host.addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (!b) { return; } s = +b.dataset.s; paint(); });
  paint();
};
/* ---------- ساخت شکل ---------- */
function areaFig(kind, d) {
  var pts, o = { names: ['A', 'B', 'C'], W: 300, H: 200, slc: BLUE };
  if (kind === 'right') { pts = [[0, d.a], [0, 0], [d.b, 0]]; o.right = 1; o.sl = [fa(d.a), fa(d.b), d.c ? fa(d.c) : '']; }
  else if (kind === 'obt') { pts = [[-d.t, d.h], [0, 0], [d.b, 0]]; o.sl = ['', fa(d.b), '']; o.alt = { from: 0, base: 1, c: PINK, l: fa(d.h) }; }
  else { pts = [[d.px, d.h], [0, 0], [d.b, 0]]; o.sl = [d.slant ? fa(d.slant) : '', fa(d.b), '']; o.alt = { from: 0, base: 1, c: PINK, l: fa(d.h) }; }
  o.pts = pts; return '<div class="figs one"><figure>' + triSVG(o) + '</figure></div>';
}
function areaData() {
  var k = R(0, 2), d = {}, t;
  if (k === 0) { d.b = pick([6, 8, 10, 12]); d.h = pick([3, 4, 5, 6]); d.px = R(1, d.b - 1); if (R(0, 1)) { d.px = 3; d.h = 4; d.slant = 5; d.b = pick([8, 10, 12]); } d.area = d.b * d.h / 2; d.kind = 'acute'; }
  else if (k === 1) { t = pick([[6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [3, 4, 5], [6, 8, 10]]); d.a = t[0]; d.b = t[1]; d.c = t[2]; if (R(0, 1)) { var z = d.a; d.a = d.b; d.b = z; } d.area = d.a * d.b / 2; d.kind = 'right'; }
  else { d.b = pick([4, 6, 8]); d.h = pick([3, 4, 5]); d.t = pick([2, 3]); d.area = d.b * d.h / 2; d.kind = 'obt'; }
  return d;
}
function areaExpl(d) {
  if (d.kind === 'right') { return '<p>در مثلث قائم‌الزاویه، دو ضلع قائم بر هم عمودند؛ یکی قاعده و دیگری ارتفاع است. وتر نقشی ندارد:</p>' + K.dm('S=\\dfrac{1}{2}\\times' + d.a + '\\times' + d.b + '=' + d.area); }
  return '<p>مساحت = نصفِ قاعده ضرب در ارتفاع. قاعده ' + M(String(d.b)) + ' و ارتفاعِ عمود بر آن ' + M(String(d.h)) + ' است' + (d.kind === 'obt' ? ' (ارتفاع روی امتداد قاعده فرود آمده)' : '') + (d.slant ? '؛ ضلع کج ' + M(String(d.slant)) + ' ارتفاع نیست' : '') + ':</p>' + K.dm('S=\\dfrac{1}{2}\\times' + d.b + '\\times' + d.h + '=' + d.area);
}
function genAR() {
  var d = areaData();
  return { ask: d.kind === 'right' ? 'مساحت مثلث قائم‌الزاویهٔ زیر را بر حسب سانتی‌متر مربع بنویس (فقط عدد).' : 'مساحت مثلث ABC را با قاعدهٔ BC بر حسب سانتی‌متر مربع بنویس (فقط عدد). اندازه‌ها بر حسب سانتی‌متر است.', fig: areaFig(d.kind === 'right' ? 'right' : d.kind === 'obt' ? 'obt' : 'acute', d), ans: d.area, unit: 'سانتی‌متر مربع', hint: 'مساحت مثلث = نصفِ قاعده ضرب در ارتفاع. ارتفاع بر قاعده عمود است؛ ضلع کج را به‌جای آن نگذار و «نصف» را فراموش نکن.', expl: function () { return areaExpl(d); } };
}
/* ================= تولید سؤال ================= */
function genE1() {
  var d = areaData(), w = [{ v: d.kind === 'right' ? d.a * d.b : d.b * d.h, m: 'این حاصل‌ضرب قاعده و ارتفاع است؛ مساحت مثلث نصفِ آن است.' }];
  if (d.kind === 'right') { w.push({ v: d.a + d.b, m: 'مساحت جمع نیست؛ نصفِ حاصل‌ضرب دو ضلع قائم است.' }, { v: d.a * d.c / 2, m: 'وتر قاعده و ارتفاع نیست؛ دو ضلع قائم قاعده و ارتفاع‌اند.' }, { v: d.a * d.b / 4, m: 'یک بار نصف کن، نه دو بار.' }); }
  else { w.push({ v: d.b + d.h, m: 'مساحت جمع نیست؛ نصفِ حاصل‌ضرب قاعده و ارتفاع است.' }, { v: d.b * d.h / 4, m: 'یک بار نصف کن، نه دو بار.' }); if (d.slant) { w.push({ v: d.b * d.slant / 2, m: 'ضلع کج ارتفاع نیست؛ ارتفاع بر قاعده عمود است.' }); } else { w.push({ v: d.b * d.h / 2 + d.h, m: 'فرمول فقط نصفِ قاعده ضرب در ارتفاع است.' }); } }
  return { ask: d.kind === 'right' ? 'مساحت مثلث قائم‌الزاویهٔ زیر چند سانتی‌متر مربع است؟' : 'مساحت مثلث ABC را با قاعدهٔ BC بر حسب سانتی‌متر مربع بنویس. ' + (d.kind === 'obt' ? '<small>(ارتفاع از رأس A بر امتداد BC فرود آمده است.)</small>' : ''), fig: areaFig(d.kind, d), cq: '', cls: 'm2', opts: numO(d.area, w), expl: function () { return areaExpl(d); } };
}
function genE2() {
  var obt = R(0, 1), b = pick([6, 8, 10]), h = pick([4, 5, 6]), px = obt ? -pick([2, 3]) : pick([2, 3, 4]), ex = obt ? pick([2, 3]) : (px >= b / 2 ? 1 : b - 1), pts = [[px, h], [0, 0], [b, 0]];
  var extra = [{ a: [px, h], b: [px, 0], c: PINK, d: 1, w: 2.2 }, { a: [px, h], b: [ex, 0], c: BLUE, d: 1, w: 2.2 }];
  if (obt) { extra.push({ a: [0, 0], b: [px, 0], c: INK, d: 1, w: 1.8 }); }
  var D = { p: [px, 0], n: 'D', dx: 0, dy: 17, rm: [[px, h], [obt ? 0 : b, 0]] }, E = { p: [ex, 0], n: 'E', dx: 0, dy: 17 };
  return {
    ask: 'در مثلث ABC قاعدهٔ BC افقی است. کدام پاره‌خط، ارتفاع مثلث نسبت به قاعدهٔ BC است؟', fig: '<div class="figs one"><figure>' + triSVG({ pts: pts, names: ['A', 'B', 'C'], extra: extra, dots: [D, E], W: 300, H: 200 }) + '</figure></div>', cq: '', cls: 'm2',
    opts: mkO({ t: M('AD') }, [{ t: M('AE'), m: 'AE به قاعده می‌رسد ولی بر آن عمود نیست؛ ارتفاع باید زاویهٔ قائمه بسازد.' }, { t: M('AB'), m: 'AB یک ضلع مثلث است و بر BC عمود نیست.' }, { t: M('AC'), m: 'AC یک ضلع مثلث است و بر BC عمود نیست.' }], true),
    expl: function () { return '<p>ارتفاع از رأس ' + M('A') + ' بر قاعده (یا امتداد آن) عمود می‌شود؛ علامتِ قائمه در ' + M('D') + ' است' + (obt ? ' و پای ارتفاع روی امتدادِ ' + M('BC') + ' افتاده' : '') + '. پس ارتفاع ' + M('AD') + ' است.</p>'; }
  };
}
function genE3() {
  var d = areaData(); if (d.kind === 'acute') { d.kind = 'obt'; d.t = pick([2, 3]); d.slant = 0; }
  var ok = d.area, w = d.kind === 'right' ? [{ v: d.a * d.b, m: 'نصف را فراموش کرده‌ای.' }, { v: d.a + d.b, m: 'مساحت، جمع دو ضلع نیست.' }, { v: d.a * d.c / 2, m: 'وتر نباید در فرمول بیاید؛ قاعده و ارتفاع دو ضلع قائم‌اند.' }] : [{ v: d.b * d.h, m: 'نصف را فراموش کرده‌ای.' }, { v: d.b + d.h, m: 'مساحت، جمع نیست.' }, { v: d.b * d.h / 2 + d.t, m: 'فاصلهٔ پای ارتفاع تا قاعده در فرمول نمی‌آید.' }];
  return { ask: d.kind === 'right' ? 'مساحت مثلث قائم‌الزاویهٔ زیر چند سانتی‌متر مربع است؟' : 'مساحت مثلث ABC را با قاعدهٔ BC بر حسب سانتی‌متر مربع بنویس. <small>(ارتفاع از رأس A بر امتداد BC فرود آمده است.)</small>', fig: areaFig(d.kind, d), cq: '', cls: 'm2', opts: numO(ok, w), expl: function () { return areaExpl(d); } };
}
var TFP = [
  { h: 'مساحت مثلث برابر است با نصفِ حاصل‌ضربِ قاعده در ارتفاع.', ok: 1, e: '<p>' + M('S=\\dfrac{1}{2}\\times\\text{قاعده}\\times\\text{ارتفاع}') + '.</p>' },
  { h: 'مساحت مثلث برابر است با قاعده ضرب در ارتفاع.', ok: 0, e: '<p>قاعده ضرب در ارتفاع مساحتِ مستطیل (یا متوازی‌الاضلاع) است؛ مثلث نصفِ آن است.</p>' },
  { h: 'ارتفاع مثلث بر قاعده عمود است.', ok: 1, e: '<p>ارتفاع با قاعده (یا امتدادش) زاویهٔ ' + M('90^\\circ') + ' می‌سازد.</p>' },
  { h: 'ارتفاع مثلث همیشه داخل مثلث قرار می‌گیرد.', ok: 0, e: '<p>در مثلث منفرجه ارتفاعِ دو رأس روی امتداد ضلع‌ها و بیرون مثلث می‌افتد.</p>' },
  { h: 'مثلثی با قاعدهٔ ' + M('6') + ' و ارتفاع ' + M('4') + ' مساحتی برابر ' + M('12') + ' دارد.', ok: 1, e: '<p>' + M('\\dfrac{1}{2}\\times6\\times4=12') + '.</p>' },
  { h: 'در مثلث قائم‌الزاویه، دو ضلع قائم می‌توانند قاعده و ارتفاع باشند.', ok: 1, e: '<p>این دو ضلع بر هم عمودند؛ پس یکی ارتفاعِ دیگری است.</p>' },
  { h: 'برای مساحت مثلث می‌توان ضلعِ کج را به‌جای ارتفاع به کار برد.', ok: 0, e: '<p>ضلع کج بر قاعده عمود نیست؛ باید ارتفاعِ عمود را به کار ببری.</p>' },
  { h: 'مساحت را بر حسب سانتی‌متر می‌نویسیم.', ok: 0, e: '<p>مساحت بر حسب سانتی‌متر مربع (' + M('\\text{cm}^2') + ') است؛ سانتی‌متر واحد طول است.</p>' },
  { h: 'هر ضلع مثلث را می‌توان قاعده گرفت؛ هر بار ارتفاعِ مربوط به همان ضلع را به کار می‌بریم.', ok: 1, e: '<p>با هر قاعده، مساحت همان عدد می‌شود.</p>' },
  { h: 'اگر رأس بالایی را روی خطی موازی قاعده جابه‌جا کنیم، مساحتِ مثلث عوض می‌شود.', ok: 0, e: '<p>قاعده و ارتفاع ثابت می‌مانند؛ پس مساحت هم ثابت است.</p>' },
  { h: 'در مثلث قائم‌الزاویه با ضلع‌های قائم ' + M('6') + ' و ' + M('8') + ' ، مساحت ' + M('24') + ' است.', ok: 1, e: '<p>' + M('\\dfrac{1}{2}\\times6\\times8=24') + '.</p>' },
  { h: 'در مثلث قائم‌الزاویه مساحت از نصفِ حاصل‌ضربِ وتر در یک ضلع قائم به دست می‌آید.', ok: 0, e: '<p>وتر بر ضلع قائم عمود نیست؛ باید دو ضلع قائم را به کار ببری.</p>' }
];
return {
  html: function () {
    var rect = (function () { var s = sv(300, 170); s += '<rect x="40" y="30" width="220" height="110" fill="rgba(76,95,213,.10)" stroke="' + INK + '" stroke-width="2.5"/>'; s += '<polygon points="40,140 260,140 120,30" fill="rgba(214,69,122,.30)" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/>' + sln([120, 30], [120, 140], PINK, 2.2, 1) + rmark([120, 140], [120, 30], [260, 140], 10, INK) + stx(fa(6) + ' (قاعده)', 150, 158, { fs: 12, b: 1 }) + stx(fa(4), 108, 85, { fs: 12, b: 1, c: PINK, a: 'end' }); return s + '</svg>'; })();
    return [
      K.sn('۱', 'مساحت مثلث: نصفِ مستطیل'),
      '<p>مستطیلی به عرض ' + M('6') + ' و ارتفاع ' + M('4') + ' مساحتش ' + M('24') + ' است. هر مثلثی که قاعده‌اش همان ضلع افقی و رأسش روی ضلعِ بالای مستطیل باشد، دقیقاً نصفِ مستطیل را می‌پوشاند:</p>', fig1(rect, 'مثلث، نصفِ مستطیلِ هم‌قاعده و هم‌ارتفاع است'),
      K.box('note', 'مساحت مثلث', '<p>مساحت = نصفِ قاعده ضرب در ارتفاع</p>' + K.dm('S=\\dfrac{1}{2}\\times b\\times h')),
      '<p>رأس بالایی را روی خط نقطه‌چین بلغزان. جای رأس عوض می‌شود، ولی قاعده و ارتفاع نه؛ مساحت را زیر نظر بگیر (حتی وقتی رأس از بالای قاعده بیرون می‌زند):</p><div class="cover g-act" id="ap" style="animation:none"></div>',

      K.sn('۲', 'ارتفاع کدام است؟'),
      '<p>«ارتفاع» پاره‌خطی است که از یک رأس بر ضلعِ روبه‌رو (یا امتدادِ آن) عمود می‌شود؛ زاویهٔ ' + M('90^\\circ') + ' می‌سازد. هر ضلعی را می‌شود قاعده گرفت و هر بار ارتفاعِ مربوط به همان قاعده را به کار برد. یک مثلث قائم‌الزاویه را با هر سه قاعده امتحان کن:</p><div class="cover g-act" id="bs" style="animation:none"></div>',
      K.box('err', '⚠ خطای رایج: ضلعِ کج را ارتفاع گرفتن', '<p>اگر مثلث کج است، ضلع‌های کج ارتفاع نیستند. ارتفاع همیشه بر قاعده <b>عمود</b> است و علامت قائمه دارد.</p>'),

      K.sn('۳', 'وقتی ارتفاع بیرون می‌افتد'),
      '<p>در مثلثی که یک زاویهٔ باز دارد، اگر قاعده را ضلعِ کنارِ آن زاویه بگیری، ارتفاع بیرون از مثلث و روی امتدادِ قاعده فرود می‌آید. فرمول عوض نمی‌شود؛ فقط قاعده و ارتفاع را درست بخوان:</p>', fig1(triSVG({ pts: [[-3, 4], [0, 0], [6, 0]], names: ['A', 'B', 'C'], alt: { from: 0, base: 1, c: PINK, l: fa(4) }, sl: ['', fa(6), ''], slc: TEAL, W: 300, H: 190 }), 'قاعدهٔ BC برابر ' + '۶' + ' و ارتفاعِ AD برابر ' + '۴'),
      K.dm('S=\\dfrac{1}{2}\\times6\\times4=12'),

      K.sn('۴', 'مثلث قائم‌الزاویه'),
      '<p>در مثلث قائم‌الزاویه دو ضلع قائم بر هم عمودند؛ پس هر کدام ارتفاعِ دیگری است. لازم نیست ارتفاع جداگانه بکشی:</p>', K.dm('S=\\dfrac{1}{2}\\times6\\times8=24'),
      K.box('note', 'وتر را به کار نبر', '<p>در مثلث قائم‌الزاویه، قاعده و ارتفاعِ ساده دو ضلع قائم‌اند؛ وتر برای مساحت لازم نیست.</p>'),

      K.sn('۵', 'مسئله‌های کامل'),
      '<h4>مثال اول: مثلث تند</h4><p>قاعده ' + M('6') + ' و ارتفاع ' + M('4') + ':</p>', K.dm('S=\\dfrac{1}{2}\\times6\\times4=12'),
      '<h4>مثال دوم: ارتفاع روی امتداد</h4><p>قاعده ' + M('BC=6') + ' و ارتفاعِ AD برابر ' + M('4') + ' روی امتداد ' + M('BC') + ' (مثل شکل بالا). ضلعِ کج را به کار نمی‌بریم:</p>', K.dm('S=\\dfrac{1}{2}\\times6\\times4=12'),
      '<h4>مثال سوم: ارتفاع نامعلوم</h4><p>مساحت مثلثی ' + M('20') + ' و قاعده‌اش ' + M('5') + ' است. ارتفاع:</p>', K.dm('20=\\dfrac{1}{2}\\times5\\times h\\ \\Rightarrow\\ h=\\dfrac{20\\times2}{5}=8'),
      '<p>خودت حل کن؛ هر بار شکل و عددها تازه‌اند:</p><div class="cover g-act" id="ar" style="animation:none"></div>',

      K.sn('۶', 'کارت مرجع'),
      refs([{ c: 'r1', t: 'مساحت مثلث', r: 'نصفِ قاعده ضرب در ارتفاع.', e: 'S=\\dfrac{1}{2}bh' }, { c: 'r2', t: 'ارتفاع', r: 'از رأس بر قاعده (یا امتدادش) عمود.', e: 'h\\perp b' }, { c: 'r3', t: 'ضلع کج', r: 'ارتفاع نیست.', e: 'AB\\ne h' }, { c: 'r4', t: 'قائم‌الزاویه', r: 'دو ضلع قائم، قاعده و ارتفاع‌اند.', e: 'S=\\dfrac{1}{2}ab' }, { c: 'r1', t: 'ارتفاع بیرونی', r: 'روی امتداد قاعده؛ فرمول همان است.', e: 'S=\\dfrac{1}{2}\\times6\\times4' }, { c: 'r3', t: 'واحد', r: 'مساحت بر حسب مربع.', e: '\\text{cm}^2' }]),

      K.sn('۷', 'مساحت‌یاب'),
      '<p>هر مرحله با دو پاسخ درست تمام می‌شود. بعد از هر پاسخ، دلیلش را می‌بینی.</p><div class="cover g-act" id="ss" style="animation:none"></div>',
      K.sn('۸', 'درست یا نادرست؟'),
      '<p>شش جمله را بسنج. به تله‌ها دقت کن.</p><div class="cover g-act" id="tf" style="animation:none"></div>',
      K.sn('۹', 'تمرین پایانی'),
      '<p>پنج سؤال با شکل‌ها و عددهای تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover g-act" id="fn" style="animation:none"></div>',
      K.box('sum', 'بعد از این درس باید بتوانی', T`<ul><li>مساحت مثلث را با $\frac{1}{2}\times$ قاعده $\times$ ارتفاع حساب کنی و واحدش را مربع بنویسی.</li><li>ارتفاعِ مربوط به یک قاعده را از میان پاره‌خط‌ها تشخیص بدهی، حتی وقتی بیرون از مثلث و روی امتداد قاعده است.</li><li>بدانی ضلعِ کج به‌جای ارتفاع به کار نمی‌رود.</li><li>در مثلث قائم‌الزاویه، دو ضلع قائم را قاعده و ارتفاع بگیری.</li></ul>`)
    ].join('');
  },
  init: function (panel) {
    K.apexLab(panel.querySelector('#ap')); K.baseLab(panel.querySelector('#bs')); K.numLab(panel.querySelector('#ar'), genAR);
    K.stepRun(panel.querySelector('#ss'), [{ n: 'محاسبهٔ مساحت', gen: genE1 }, { n: 'شناختن ارتفاع', gen: genE2 }, { n: 'قائمه و ارتفاع بیرونی', gen: genE3 }], { done: 'حالا برو سراغ تله‌ها.' });
    K.tfRun(panel.querySelector('#tf'), TFP);
    K.finalRun(panel.querySelector('#fn'), [genE1, genE2, genE1, genE3, genE3], { top: 'عالی بود! مساحت مثلث را کاملاً فهمیده‌ای.' });
  }
};

  }
};
