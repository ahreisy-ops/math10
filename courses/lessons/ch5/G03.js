/* درس مهارت G03 — محاسبهٔ طول ضلع در مثلث قائم‌الزاویه (فصل ۵) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.G03 = {
  needs: ['utils'],
  setup: function (K0) {
var ML = window.MathLite, fa = ML.fa, rr = ML.renderRich, abs = Math.abs, df = K0.df;
var _u = K0._u, R = _u.R, M = _u.M, shuffle = _u.shuffle;
var K = Object.create(K0);   // K0 = هستهٔ مشترک؛ K = همان + ابزارهای اختصاصی این درس
var T = String.raw;
var INK = '#14213d', TEAL = '#0e8f7e', PINK = '#d6457a', BLUE = '#4c5fd5', AMB = '#e08a00', YEL = '#ffc233', MINT = '#7fd0c3', RED = '#c62f2f', GREY = '#5a6a85';
var D2R = Math.PI / 180;
var pick = function (a) { return a[R(0, a.length - 1)]; };
var f2 = function (n) { return Math.round(n * 100) / 100; };
var nf = function (v) { var s = String(+(+v).toFixed(2)); return s === '-0' ? '0' : s; };
var fan = function (v) { return fa(nf(v)).replace('.', '٫'); };
function uniqBy(arr, key) { var s = {}; return arr.filter(function (x) { var k = key(x); if (s[k]) { return false; } s[k] = 1; return true; }); }
var refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };
var fig1 = function (inner, cap) { return '<div class="figs one"><figure>' + inner + (cap ? '<figcaption>' + cap + '</figcaption>' : '') + '</figure></div>'; };



/* ---------- ابزارهای SVG ---------- */
function sv(W, H) { return '<svg class="gsv" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-hidden="true">'; }
function stx(t, x, y, o) { o = o || {}; return '<text x="' + f2(x) + '" y="' + f2(y + (o.fs || 13) * 0.34) + '" text-anchor="' + (o.a || 'middle') + '" font-size="' + (o.fs || 13) + '"' + (o.b ? ' font-weight="bold"' : '') + ' fill="' + (o.c || INK) + '" font-family="Tahoma,sans-serif">' + t + '</text>'; }
function sln(a, b, c, w, d) { return '<line x1="' + f2(a[0]) + '" y1="' + f2(a[1]) + '" x2="' + f2(b[0]) + '" y2="' + f2(b[1]) + '" stroke="' + (c || INK) + '" stroke-width="' + (w || 2) + '"' + (d ? ' stroke-dasharray="5 4"' : '') + ' stroke-linecap="round"/>'; }
function unit(a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy) || 1; return [dx / l, dy / l]; }
function rmark(V, A, B, r, c) { var u1 = unit(V, A), u2 = unit(V, B), p1 = [V[0] + u1[0] * r, V[1] + u1[1] * r], p3 = [V[0] + u2[0] * r, V[1] + u2[1] * r], p2 = [p1[0] + u2[0] * r, p1[1] + u2[1] * r]; return '<polyline points="' + f2(p1[0]) + ',' + f2(p1[1]) + ' ' + f2(p2[0]) + ',' + f2(p2[1]) + ' ' + f2(p3[0]) + ',' + f2(p3[1]) + '" fill="none" stroke="' + (c || INK) + '" stroke-width="1.8"/>'; }
function arcP(V, A, B, r, c, fill) {
  var u1 = unit(V, A), u2 = unit(V, B), p1 = [V[0] + u1[0] * r, V[1] + u1[1] * r], p2 = [V[0] + u2[0] * r, V[1] + u2[1] * r], cr = u1[0] * u2[1] - u1[1] * u2[0], sw = cr > 0 ? 1 : 0;
  if (abs(cr) < 1e-6 && u1[0] * u2[0] + u1[1] * u2[1] < 0) { sw = 1; }
  return '<path d="' + (fill ? 'M' + f2(V[0]) + ' ' + f2(V[1]) + ' L' + f2(p1[0]) + ' ' + f2(p1[1]) : 'M' + f2(p1[0]) + ' ' + f2(p1[1])) + ' A' + r + ' ' + r + ' 0 0 ' + sw + ' ' + f2(p2[0]) + ' ' + f2(p2[1]) + (fill ? ' Z' : '') + '" fill="' + (fill || 'none') + '" stroke="' + (c || INK) + '" stroke-width="1.8"/>';
}
/* زاویه: o={deg, rot, l1, l2, lab, W, H, mark(قائمه), fill} — شکل با مختصات ریاضی ساخته و در کادر وسط‌چین می‌شود */
/* نقاله: o={deg, base:'R'|'L', hi(true: مقیاس درست پررنگ)} — مقیاس بیرونی صفرش سمت راست، مقیاس درونی صفرش سمت چپ */
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
/* نوار لغزندهٔ بومی با درجه‌بندیِ KaTeX (الگوی فصل اول) — ticks: [{v, t}] */

/* مثلث با زاویه‌های a در رأس 0 و b در رأس 1 (مختصات ریاضی) */
function triFromAng(a, b, L) { var c = 180 - a - b, ac = L * Math.sin(b * D2R) / Math.sin(c * D2R); return [[0, 0], [L, 0], [ac * Math.cos(a * D2R), ac * Math.sin(a * D2R)]]; }
/* مثلث با ضلع‌های AB=a ، BC=b ، CA=c (مختصات ریاضی) */

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


var TRP = [[3, 4, 5], [6, 8, 10], [9, 12, 15], [12, 16, 20], [5, 12, 13], [10, 24, 26], [8, 15, 17], [7, 24, 25], [15, 20, 25]];
var NAMES = [['A', 'B', 'C'], ['K', 'L', 'M'], ['P', 'Q', 'R'], ['D', 'E', 'F']];
var X = function (s) { return M(s); };
/* ---------- آزمایشگاه ۱: مربع روی ضلع‌ها ---------- */
K.sqLab = function (host) {
  var TR = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [4, 5, 6]], idx = 0;
  host.innerHTML = rr('<p class="ask">یک مثلث را انتخاب کن و مساحت مربع‌های روی ضلع‌هایش را ببین:</p><div class="chips" id="sqc"></div><div id="sqf"></div><div class="gval" id="sqv"></div><p class="legend" id="sql"></p>');
  function geom(t) { var a = t[0], b = t[1], c = t[2], x = (a * a + b * b - c * c) / (2 * a), y = Math.sqrt(Math.max(0, b * b - x * x)); return [[0, 0], [a, 0], [x, y]]; }
  function paint() {
    var t = TR[idx], a = t[0], b = t[1], c = t[2], P = geom(t), sides = [[0, 1, 2], [0, 2, 1], [1, 2, 0]], fills = ['#e6f6f3', '#fde7ef', '#fff1bd'], lens = [a, b, c], sq = [], all = P.slice(), i;
    sides.forEach(function (z) {
      var U = P[z[0]], V = P[z[1]], Wd = P[z[2]], d = [V[0] - U[0], V[1] - U[1]], n = [-d[1], d[0]];
      if ((Wd[0] - U[0]) * n[0] + (Wd[1] - U[1]) * n[1] > 0) { n = [-n[0], -n[1]]; }
      var q = [U, V, [V[0] + n[0], V[1] + n[1]], [U[0] + n[0], U[1] + n[1]]]; sq.push(q); all = all.concat(q);
    });
    var xs = all.map(function (p) { return p[0]; }), ys = all.map(function (p) { return p[1]; }), x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys), W = 300, H = 270, pd = 12, k = Math.min((W - 2 * pd) / (x1 - x0), (H - 2 * pd) / (y1 - y0)), ox = (W - (x1 - x0) * k) / 2, oy = (H - (y1 - y0) * k) / 2;
    var S = function (p) { return [ox + (p[0] - x0) * k, oy + (y1 - p[1]) * k]; }, s = sv(W, H), isR = a * a + b * b === c * c;
    sq.forEach(function (q, j) {
      var Q = q.map(S);
      s += '<polygon points="' + Q.map(function (p) { return f2(p[0]) + ',' + f2(p[1]); }).join(' ') + '" fill="' + fills[j] + '" stroke="' + INK + '" stroke-width="2"/>';
      if (c <= 6) { var m; for (m = 1; m < lens[j]; m++) { var f = m / lens[j]; s += sln([Q[0][0] + (Q[1][0] - Q[0][0]) * f, Q[0][1] + (Q[1][1] - Q[0][1]) * f], [Q[3][0] + (Q[2][0] - Q[3][0]) * f, Q[3][1] + (Q[2][1] - Q[3][1]) * f], 'rgba(20,33,61,.35)', 1) + sln([Q[0][0] + (Q[3][0] - Q[0][0]) * f, Q[0][1] + (Q[3][1] - Q[0][1]) * f], [Q[1][0] + (Q[2][0] - Q[1][0]) * f, Q[1][1] + (Q[2][1] - Q[1][1]) * f], 'rgba(20,33,61,.35)', 1); } }
      var cx = (Q[0][0] + Q[2][0]) / 2, cy = (Q[0][1] + Q[2][1]) / 2;
      s += '<rect x="' + f2(cx - 17) + '" y="' + f2(cy - 11) + '" width="34" height="22" rx="6" fill="#fff" stroke="' + INK + '" stroke-width="1.5"/>' + stx(fa(lens[j] * lens[j]), cx, cy, { fs: 13, b: 1 });
    });
    var PS = P.map(S);
    s += '<polygon points="' + PS.map(function (p) { return f2(p[0]) + ',' + f2(p[1]); }).join(' ') + '" fill="#fff" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/>';
    if (isR) { s += rmark(PS[0], PS[1], PS[2], 12, INK); }
    host.querySelector('#sqf').innerHTML = s + '</svg>';
    host.querySelector('#sqc').innerHTML = TR.map(function (z, j) { return '<button type="button" class="chip' + (j === idx ? ' on' : '') + '" data-i="' + j + '">' + fa(z[0]) + '، ' + fa(z[1]) + '، ' + fa(z[2]) + '</button>'; }).join('');
    host.querySelector('#sqv').innerHTML = isR ? '<i class="g">' + fa(a * a) + '</i> + <i class="p">' + fa(b * b) + '</i> = <i class="y">' + fa(c * c) + '</i>' : '<i class="g">' + fa(a * a) + '</i> + <i class="p">' + fa(b * b) + '</i> = ' + fa(a * a + b * b) + ' ≠ <i class="y">' + fa(c * c) + '</i>';
    host.querySelector('#sql').innerHTML = isR ? 'مثلث قائم‌الزاویه است و مجموع مساحتِ دو مربعِ کوچک‌تر دقیقاً برابر مساحتِ مربعِ روی وتر شد.' : 'این مثلث قائم‌الزاویه نیست؛ پس مجموع دو مربع کوچک‌تر با مربع بزرگ برابر نشد.';
  }
  host.addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (!b) { return; } idx = +b.dataset.i; paint(); });
  paint();
};
function rtFig(a, b, c, r, rot, nm, unk) {
  var P = rightPts(a, b, r, rot), sl = ['', '', ''];
  sl[r] = unk === 'a' ? 'x' : fa(a); sl[(r + 1) % 3] = unk === 'c' ? 'x' : fa(c); sl[(r + 2) % 3] = unk === 'b' ? 'x' : fa(b);
  return '<div class="figs one"><figure>' + triSVG({ pts: P, names: nm, right: r, sl: sl, slc: BLUE }) + '</figure></div>';
}
/* ---------- تمرین عددی: ضلع گمشده ---------- */
function genFD() {
  var t = pick(TRP), a = t[0], b = t[1], c = t[2], r = R(0, 2), rot = R(0, 359), nm = pick(NAMES), hyp = R(0, 1);
  if (R(0, 1)) { var z = a; a = b; b = z; }
  return {
    ask: hyp ? 'در مثلث قائم‌الزاویهٔ زیر، طول وتر (x) چند واحد است؟' : 'در مثلث قائم‌الزاویهٔ زیر، طول ضلع قائمِ x چند واحد است؟',
    fig: rtFig(a, b, c, r, rot, nm, hyp ? 'c' : 'a'), ans: hyp ? c : a, unit: 'واحد',
    hint: hyp ? 'یادآوری: مربعِ وتر برابر است با مجموعِ مربع‌های دو ضلع قائم. بعد از جمع، جذر هم بگیر.' : 'ضلع قائم را از «مربعِ وتر منهای مربعِ ضلع قائمِ دیگر» پیدا کن؛ جمع نمی‌کنیم. آخرش جذر بگیر.',
    expl: function () { return hyp ? '<p>مربعِ وتر برابر مجموعِ مربع‌های دو ضلع قائم است:</p>' + K.dm('x^2=' + a + '^2+' + b + '^2=' + a * a + '+' + b * b + '=' + c * c) + K.dm('x=\\sqrt{' + c * c + '}=' + c) : '<p>مربعِ ضلع قائم برابر است با مربعِ وتر منهای مربعِ ضلع قائمِ دیگر:</p>' + K.dm('x^2=' + c + '^2-' + b + '^2=' + c * c + '-' + b * b + '=' + a * a) + K.dm('x=\\sqrt{' + a * a + '}=' + a); }
  };
}
/* ================= تولید سؤال ================= */
function genC1() {
  var t = pick(TRP), a = t[0], b = t[1], c = t[2], r = R(0, 2), rot = R(0, 359), nm = pick(NAMES);
  return {
    ask: 'در مثلث قائم‌الزاویهٔ زیر، طول وتر (' + X('x') + ') را پیدا کن.', fig: rtFig(a, b, c, r, rot, nm, 'c'), cq: '', cls: 'm2',
    opts: numO(c, [{ v: a + b, m: 'این مجموعِ دو ضلع قائم است. باید مربع‌ها را جمع کنی و بعد جذر بگیری.' }, { v: c * c, m: 'این ' + X('x^2') + ' است؛ برای ' + X('x') + ' باید جذر هم بگیری.' }, { v: abs(a - b), m: 'اختلاف دو ضلع، وتر نیست.' }, { v: a * a + b, m: 'مربع را روی هر دو ضلع بگیر و بعد جذر.' }]),
    expl: function () { return '<p>' + X('x^2=' + a + '^2+' + b + '^2=' + (a * a) + '+' + (b * b) + '=' + (c * c)) + '، پس ' + X('x=\\sqrt{' + c * c + '}=' + c) + '.</p>'; }
  };
}
function genC2() {
  var t = pick(TRP), a = t[0], b = t[1], c = t[2], r = R(0, 2), rot = R(0, 359), nm = pick(NAMES);
  return {
    ask: 'در مثلث قائم‌الزاویهٔ زیر، طول ضلع قائمِ ' + X('x') + ' را پیدا کن.', fig: rtFig(a, b, c, r, rot, nm, 'a'), cq: '', cls: 'm2',
    opts: numO(a, [{ v: c - b, m: 'اختلافِ طول‌ها جواب نیست؛ باید مربع‌ها را از هم کم کنی.' }, { v: a * a, m: 'این ' + X('x^2') + ' است؛ جذر را فراموش کرده‌ای.' }, { v: c + b, m: 'ضلع قائم از وتر کوتاه‌تر است؛ جمع نمی‌کنیم.' }, { v: Math.round(Math.sqrt(c * c + b * b)), m: 'وتر را با ضلع قائم قاطی کرده‌ای: مربعِ وتر را از مربعِ ضلع دیگر کم کن.' }]),
    expl: function () { return '<p>' + X('x^2=' + c + '^2-' + b + '^2=' + (c * c) + '-' + (b * b) + '=' + (a * a)) + '، پس ' + X('x=' + a) + '.</p>'; }
  };
}
function genC3() {
  if (R(0, 1)) {
    var t = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]]), nm = ['A', 'B', 'C'], a = t[0], b = t[1], c = t[2], r = R(0, 2), hyp = R(0, 1), rot = R(0, 359);
    var fig = rtFig(hyp ? a : c, hyp ? b : b, hyp ? c : c, r, rot, nm, hyp ? 'c' : 'a'), ok = hyp ? 'x^2=' + a + '^2+' + b + '^2' : 'x^2=' + c + '^2-' + b + '^2';
    var wr = hyp ? [{ t: 'x=' + a + '+' + b, m: 'مربع‌ها را جمع می‌کنیم، نه خودِ طول‌ها را.' }, { t: a + '^2=x^2+' + b + '^2', m: 'وتر باید تنها در یک سمت و با مربعش باشد: وتر در سمت دیگر مجموع مربع‌هاست.' }, { t: 'x^2=' + b + '^2-' + a + '^2', m: 'مربع وتر برابر مجموع مربع‌های دو ضلع قائم است، نه تفاضل.' }] : [{ t: 'x^2=' + c + '^2+' + b + '^2', m: 'x ضلع قائم است؛ پس باید مربع ضلع دیگر را از مربع وتر کم کنی.' }, { t: 'x=' + c + '-' + b, m: 'مربع‌ها را از هم کم می‌کنیم، نه طول‌ها را.' }, { t: c + '^2=x^2-' + b + '^2', m: 'مربع وتر برابر مجموع مربع‌های دو ضلع قائم است: ' + c + '^2=x^2+' + b + '^2.' }];
    return {
      ask: 'در مثلث قائم‌الزاویهٔ زیر، کدام رابطه برای پیداکردن ' + X('x') + ' درست است؟', fig: fig, cq: '', cls: 'm1',
      opts: mkO({ t: M(ok) }, wr.map(function (w) { return { t: M(w.t), m: w.m.replace(/\d+\^2/g, function (z) { return z; }) }; }), true),
      expl: function () { return '<p>' + (hyp ? 'x وتر است؛ پس مربعش برابر مجموع مربع‌های دو ضلع قائم است.' : 'x ضلع قائم است؛ پس مربعش برابر مربع وتر منهای مربع ضلع قائم دیگر است.') + '</p>' + K.dm(ok); }
    };
  }
  var u = pick([[5, 7], [6, 9], [4, 7], [5, 8]]), A = pick([55, 60, 70, 75]), B = pick([60, 65, 50]), pts = triFromAng(A, 180 - A - B, 120);
  return {
    ask: 'در مثلث زیر، زاویهٔ ' + M('A') + ' برابر ' + M(A + '^\\circ') + ' است. دربارهٔ پیداکردن ' + X('x') + ' کدام نتیجه‌گیری درست است؟', fig: '<div class="figs one"><figure>' + triSVG({ pts: pts, names: ['A', 'B', 'C'], al: [fa(A) + '°', '', ''], arcs: true, sl: [fa(u[0]), 'x', fa(u[1])], slc: BLUE, W: 300, H: 200 }) + '</figure></div>', cq: '', cls: 'm1',
    opts: mkO({ t: 'نمی‌توان از رابطهٔ فیثاغورس استفاده کرد؛ چون مثلث قائم‌الزاویه نیست' }, [{ t: M('x^2=' + u[0] + '^2+' + u[1] + '^2') + '، چون هر مثلثی این رابطه را دارد', m: 'رابطهٔ فیثاغورس فقط برای مثلث قائم‌الزاویه است.' }, { t: M('x=' + u[0] + '+' + u[1]), m: 'جمع طول‌ها، رابطهٔ فیثاغورس نیست و برای این مثلث جواب نمی‌دهد.' }, { t: M('x^2=' + u[1] + '^2-' + u[0] + '^2'), m: 'حتی با تفاضل مربع‌ها هم نمی‌شود؛ مثلث قائم‌الزاویه نیست.' }], true),
    expl: function () { return '<p>هیچ زاویهٔ قائمه‌ای در این مثلث نیست؛ رابطهٔ فیثاغورس فقط وقتی کار می‌کند که یکی از زاویه‌ها ' + M('90^\\circ') + ' باشد.</p>'; }
  };
}
var TFP = [
  { h: 'در مثلث قائم‌الزاویه، مربعِ وتر برابر مجموعِ مربع‌های دو ضلع قائم است.', ok: 1, e: '<p>این همان رابطهٔ فیثاغورس است: ' + M('c^2=a^2+b^2') + '.</p>' },
  { h: 'رابطهٔ ' + M('a^2+b^2=c^2') + ' برای هر مثلثی برقرار است.', ok: 0, e: '<p>فقط برای مثلثِ قائم‌الزاویه، و آن‌هم وقتی ' + M('c') + ' وتر باشد.</p>' },
  { h: M('3^2+4^2=5^2') + ' است؛ پس مثلثی با ضلع‌های ' + M('3') + ' ، ' + M('4') + ' و ' + M('5') + ' قائم‌الزاویه است.', ok: 1, e: '<p>' + M('9+16=25') + '؛ رابطه برقرار است.</p>' },
  { h: 'اگر ' + M('x^2=25') + ' باشد، آنگاه ' + M('x=25') + ' است.', ok: 0, e: '<p>باید جذر بگیری: ' + M('x=\\sqrt{25}=5') + '.</p>' },
  { h: 'مثلثی با ضلع‌های ' + M('5') + ' ، ' + M('12') + ' و ' + M('13') + ' قائم‌الزاویه است.', ok: 1, e: '<p>' + M('25+144=169=13^2') + '.</p>' },
  { h: 'در مثلث قائم‌الزاویه‌ای با وتر ' + M('10') + ' و یک ضلع قائم ' + M('6') + '، ضلع قائم دیگر ' + M('4') + ' است.', ok: 0, e: '<p>' + M('x^2=100-36=64') + '؛ پس ' + M('x=8') + '. نه ' + M('10-6=4') + '.</p>' },
  { h: 'مثلثی با ضلع‌های ' + M('4') + ' ، ' + M('5') + ' و ' + M('6') + ' قائم‌الزاویه است.', ok: 0, e: '<p>' + M('16+25=41') + ' با ' + M('36') + ' برابر نیست.</p>' },
  { h: 'وتر از هر دو ضلع قائم بلندتر است.', ok: 1, e: '<p>وتر روبه‌روی بزرگ‌ترین زاویه است؛ بلندترین ضلع می‌شود.</p>' },
  { h: 'در مثلث قائم‌الزاویه، مجموع طول دو ضلع قائم برابر وتر است.', ok: 0, e: '<p>مجموعِ مربع‌ها برابر مربعِ وتر است، نه مجموعِ طول‌ها: ' + M('3+4=7\\ne5') + '.</p>' },
  { h: 'برای پیداکردن یک ضلع قائم، مربعِ ضلع قائم دیگر را از مربعِ وتر کم می‌کنیم.', ok: 1, e: '<p>' + M('a^2=c^2-b^2') + ' و در آخر جذر.</p>' },
  { h: 'در مثلثی که فقط ' + M('70^\\circ') + ' ، ' + M('60^\\circ') + ' و ' + M('50^\\circ') + ' زاویه دارد، می‌توان با ضلع‌های ' + M('5') + ' و ' + M('7') + ' ضلع سوم را از ' + M('x^2=5^2+7^2') + ' به دست آورد.', ok: 0, e: '<p>این مثلث قائمه ندارد؛ رابطهٔ فیثاغورس برایش کار نمی‌کند.</p>' },
  { h: 'مثلثی با ضلع‌های ' + M('6') + ' ، ' + M('8') + ' و ' + M('10') + ' قائم‌الزاویه است و وترش ' + M('10') + ' است.', ok: 1, e: '<p>' + M('36+64=100') + '.</p>' }
];
return {
  html: function () {
    var ladder = (function () { var s = sv(280, 200); s += '<rect x="30" y="170" width="230" height="10" fill="#e6f6f3" stroke="' + INK + '" stroke-width="2"/><rect x="30" y="10" width="14" height="170" fill="#eceffd" stroke="' + INK + '" stroke-width="2"/>'; s += sln([84, 170], [44, 50], BLUE, 6) + rmark([44, 170], [44, 90], [150, 170], 14, INK); s += stx('نردبان ' + fa(10), 78, 104, { fs: 12, b: 1, c: BLUE }) + stx(fa(6) + ' (پای نردبان)', 130, 195, { fs: 12 }) + stx('؟', 60, 130, { fs: 18, b: 1, c: PINK }); return s + '</svg>'; })();
    return [
      K.sn('۱', 'مربع روی ضلع‌های مثلث قائم‌الزاویه'),
      '<p>روی هر ضلع مثلث یک مربع می‌سازیم. در مثلث قائم‌الزاویه، مجموعِ مساحتِ دو مربعِ روی ضلع‌های قائم دقیقاً برابر مساحتِ مربعِ روی وتر است. باور نمی‌کنی؟ سه مثلث قائم‌الزاویه و یک مثلث دیگر را امتحان کن:</p><div class="cover g-act" id="sq" style="animation:none"></div>',
      K.box('note', 'رابطهٔ فیثاغورس', '<p>در مثلث قائم‌الزاویه با ضلع‌های قائم ' + M('a') + ' و ' + M('b') + ' و وتر ' + M('c') + ':</p>' + K.dm('c^2=a^2+b^2')),

      K.sn('۲', 'پیداکردن وتر'),
      '<p>اگر دو ضلع قائم را بدانی، وتر را با جمعِ مربع‌ها و بعد جذر پیدا می‌کنی. مثلاً ضلع‌های قائم ' + M('3') + ' و ' + M('4') + ':</p>', K.dm('x^2=3^2+4^2=9+16=25'), K.dm('x=\\sqrt{25}=5'),
      K.box('err', '⚠ دو خطای رایج', '<p>۱) جمع‌کردن خودِ طول‌ها: ' + M('3+4=7') + ' وتر نیست. ۲) نیمه‌کاره‌گذاشتن: ' + M('x^2=25') + ' یعنی ' + M('x=5') + '، نه ' + M('25') + '. جذر را فراموش نکن.</p>'),

      K.sn('۳', 'پیداکردن ضلع قائم'),
      '<p>اگر وتر و یک ضلع قائم را بدانی، مربعِ ضلع قائمِ دیگر را از «مربعِ وتر منهای مربعِ ضلع معلوم» می‌گیری. مثلاً وتر ' + M('10') + ' و یک ضلع ' + M('6') + ':</p>', K.dm('x^2=10^2-6^2=100-36=64'), K.dm('x=\\sqrt{64}=8'),
      K.box('note', 'وتر همیشه بلندترین ضلع است', '<p>اگر در جوابت ضلع قائم از وتر بزرگ‌تر شد، جایی را اشتباه کرده‌ای. وتر را از روی جای زاویهٔ قائمه پیدا کن.</p>'),
      '<p>خودت حل کن؛ هر بار یک مثلث چرخیده و عددهای تازه می‌آید:</p><div class="cover g-act" id="fd" style="animation:none"></div>',

      K.sn('۴', 'فقط برای مثلث قائم‌الزاویه'),
      '<p>رابطهٔ فیثاغورس فقط وقتی کار می‌کند که یکی از زاویه‌ها قائمه باشد. اگر مثلثی ' + M('70^\\circ') + ' و ' + M('60^\\circ') + ' و ' + M('50^\\circ') + ' داشته باشد، خبری از رابطه نیست. برعکسش هم درست است: اگر سه ضلع در رابطهٔ ' + M('a^2+b^2=c^2') + ' صدق کنند (با ' + M('c') + ' بلندترین)، مثلث قائم‌الزاویه است:</p>', K.dm('5^2+12^2=25+144=169=13^2\\ \\Rightarrow\\ \\text{قائم‌الزاویه}', 1), K.dm('4^2+5^2=41\\ne6^2=36\\ \\Rightarrow\\ \\text{قائم‌الزاویه نیست}', 1),

      K.sn('۵', 'کاربرد: نردبان و مستطیل'),
      '<p>نردبانی به طول ' + M('10') + ' متر به دیوار تکیه داده و پایش ' + M('6') + ' متر از دیوار فاصله دارد. نوک نردبان تا زمین چند متر است؟ دیوار و زمین زاویهٔ قائمه می‌سازند و نردبان وتر است:</p>', fig1(ladder), K.dm('x^2=10^2-6^2=64\\ \\Rightarrow\\ x=8'),
      '<p>قطر مستطیلی به ابعاد ' + M('12') + ' و ' + M('5') + ' هم وتر یک مثلث قائم‌الزاویه است:</p>', K.dm('d^2=12^2+5^2=169\\ \\Rightarrow\\ d=13'),

      K.sn('۶', 'کارت مرجع'),
      refs([{ c: 'r1', t: 'رابطهٔ فیثاغورس', r: 'فقط برای مثلث قائم‌الزاویه.', e: 'c^2=a^2+b^2' }, { c: 'r2', t: 'پیداکردن وتر', r: 'مربع‌ها را جمع کن، جذر بگیر.', e: 'c=\\sqrt{a^2+b^2}' }, { c: 'r3', t: 'پیداکردن ضلع قائم', r: 'مربع‌ها را از هم کم کن، جذر بگیر.', e: 'a=\\sqrt{c^2-b^2}' }, { c: 'r4', t: 'سه‌تایی‌های آشنا', r: 'ضلع‌های درست و سرراست.', e: '3,4,5\\quad 5,12,13' }, { c: 'r1', t: 'بررسی قائمه‌بودن', r: 'بلندترین ضلع را وتر بگیر.', e: 'a^2+b^2\\overset{?}{=}c^2' }, { c: 'r3', t: 'جذر را فراموش نکن', r: 'x² = ۲۵ یعنی x = ۵.', e: 'x=\\sqrt{25}=5' }]),

      K.sn('۷', 'ضلع‌یاب'),
      '<p>هر مرحله با دو پاسخ درست تمام می‌شود. بعد از هر پاسخ، دلیلش را می‌بینی.</p><div class="cover g-act" id="ss" style="animation:none"></div>',
      K.sn('۸', 'درست یا نادرست؟'),
      '<p>شش جمله را بسنج. به تله‌ها دقت کن.</p><div class="cover g-act" id="tf" style="animation:none"></div>',
      K.sn('۹', 'تمرین پایانی'),
      '<p>پنج سؤال با مثلث‌ها و عددهای تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover g-act" id="fn" style="animation:none"></div>',
      K.box('sum', 'بعد از این درس باید بتوانی', T`<ul><li>رابطهٔ $c^2=a^2+b^2$ را برای مثلث قائم‌الزاویه بنویسی.</li><li>وتر را با جمع مربع‌ها و جذر، و ضلع قائم را با تفاضل مربع‌ها و جذر پیدا کنی.</li><li>بدانی این رابطه فقط برای مثلث قائم‌الزاویه به کار می‌رود.</li><li>با رابطه تشخیص بدهی سه ضلع داده‌شده مثلث قائم‌الزاویه می‌سازند یا نه.</li></ul>`)
    ].join('');
  },
  init: function (panel) {
    K.sqLab(panel.querySelector('#sq')); K.numLab(panel.querySelector('#fd'), genFD);
    K.stepRun(panel.querySelector('#ss'), [{ n: 'پیداکردن وتر', gen: genC1 }, { n: 'پیداکردن ضلع قائم', gen: genC2 }, { n: 'رابطه و شرط آن', gen: genC3 }], { done: 'حالا برو سراغ تله‌ها.' });
    K.tfRun(panel.querySelector('#tf'), TFP);
    K.finalRun(panel.querySelector('#fn'), [genC1, genC1, genC2, genC3, genC3], { top: 'عالی بود! فیثاغورس را کاملاً فهمیده‌ای.' });
  }
};

  }
};
