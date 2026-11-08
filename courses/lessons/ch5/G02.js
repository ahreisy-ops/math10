/* درس مهارت G02 — اجزای مثلث و تشخیص مثلث قائم‌الزاویه (فصل ۵) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.G02 = {
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
var dg = function (n) { return '<bdi style="direction:ltr;unicode-bidi:isolate">' + fa(n) + '°</bdi>'; };
var fan = function (v) { return fa(nf(v)).replace('.', '٫'); };
function uniqBy(arr, key) { var s = {}; return arr.filter(function (x) { var k = key(x); if (s[k]) { return false; } s[k] = 1; return true; }); }
var refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };
var fig1 = function (inner, cap) { return '<div class="figs one"><figure>' + inner + (cap ? '<figcaption>' + cap + '</figcaption>' : '') + '</figure></div>'; };



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
function gslider(id, min, max, val, step, ticks, label) {
  var tot = max - min, h = '<div class="g-sl graduated-range" style="--gr-total:' + tot + '">' + (label ? '<div class="lab"><span>' + label + '</span></div>' : '') + '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '" aria-label="' + (label || id) + '"><div class="graduated-ticks">';
  ticks.forEach(function (t) { h += '<span style="--gr-step:' + (t.v - min) + '"><i></i>' + (t.t === undefined ? M(String(t.v)) : t.t) + '</span>'; });
  return h + '</div></div>';
}

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


var NAMES = [['A', 'B', 'C'], ['K', 'L', 'M'], ['P', 'Q', 'R'], ['D', 'E', 'F'], ['X', 'Y', 'Z']];
var sideNm = function (nm, i) { return nm[i] + nm[(i + 1) % 3]; };
var oppIdx = function (v) { return (v + 1) % 3; };       // ضلعِ روبه‌رو به رأس v
function randTri() { var rot = R(0, 359); return rotPts([[0, 0], [R(70, 105), 0], [R(15, 85), R(48, 90)]], rot); }
function randRight() { var t = pick([[3, 4], [4, 3], [5, 3], [3, 5], [6, 4], [4, 6]]), k = R(18, 24); return { a: t[0] * k / 3, b: t[1] * k / 3, r: R(0, 2), rot: R(0, 359) }; }

/* ---------- آزمایشگاه ۱: رأس و ضلعِ روبه‌رو ---------- */
K.vertLab = function (host) {
  var v = 0, nm = ['A', 'B', 'C'], P = rotPts([[0, 0], [100, 0], [34, 72]], 0);
  host.innerHTML = rr('<p class="ask">یک رأس را انتخاب کن تا ضلعِ روبه‌رویش را ببینی:</p><div class="chips" id="vch"></div><div id="vfg"></div><p class="legend" id="vlg"></p>');
  function paint() {
    host.querySelector('#vch').innerHTML = nm.map(function (x, i) { return '<button type="button" class="chip' + (i === v ? ' on' : '') + '" data-v="' + i + '">' + x + '</button>'; }).join('');
    host.querySelector('#vfg').innerHTML = triSVG({ pts: P, names: nm, hl: { side: oppIdx(v), c: TEAL }, arcs: false, sl: [0, 1, 2].map(function (i) { return i === oppIdx(v) ? sideNm(nm, i) : ''; }), slc: TEAL });
    host.querySelector('#vlg').innerHTML = 'ضلعِ روبه‌رو به رأس <b>' + nm[v] + '</b> همان <b>' + sideNm(nm, oppIdx(v)) + '</b> است؛ دو سرِ آن دو رأس دیگرند و به رأس ' + nm[v] + ' نمی‌رسد.';
  }
  host.addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (!b) { return; } v = +b.dataset.v; paint(); });
  paint();
};
/* ---------- آزمایشگاه ۲: مثلثِ زنده (مجموع زاویه‌ها) ---------- */
K.liveTri = function (host) {
  var A = [40, 168], B = [260, 168], C = [112, 60];
  host.innerHTML = rr('<p class="ask">رأس بالایی (C) را بکش یا با کلیدهای جهت‌نما حرکت بده:</p><div id="ltf"></div><div class="gval" id="ltv"></div><p class="legend" id="ltl"></p><div class="opts g-ops"><button type="button" class="btn" data-sn="1">قائمه‌اش کن</button><button type="button" class="btn" data-nw="1" data-scroll>مثلث دیگر</button></div>');
  var box = host.querySelector('#ltf');
  function ang(P, Q, S) { var u = unit(P, Q), w = unit(P, S); return Math.acos(Math.max(-1, Math.min(1, u[0] * w[0] + u[1] * w[1]))) / D2R; }
  function paint() {
    var a = Math.round(ang(A, B, C)), b = Math.round(ang(B, C, A)), c = 180 - a - b, cc = ang(C, A, B), isR = abs(cc - 90) < 1.6 || abs(ang(A, B, C) - 90) < 1.6 || abs(ang(B, C, A) - 90) < 1.6, s = sv(300, 200), ctr = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
    s += '<polygon points="' + [A, B, C].map(function (p) { return p.join(','); }).join(' ') + '" fill="' + (isR ? '#d2f0e9' : '#eef4ff') + '" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/>';
    [[A, B, C, a, 'A'], [B, C, A, b, 'B'], [C, A, B, c, 'C']].forEach(function (z) {
      var P = z[0], Q = z[1], S = z[2], u = unit(P, ctr), isr = abs(ang(P, Q, S) - 90) < 1.6;
      s += isr ? rmark(P, Q, S, 13, INK) : arcP(P, Q, S, 18, PINK);
      s += stx(fa(z[3]) + '°', P[0] + u[0] * 40, P[1] + u[1] * 40, { fs: 12, b: 1, c: PINK }) + stx(z[4], P[0] - u[0] * 27, P[1] - u[1] * 27, { fs: 14, b: 1 });
    });
    s += '<circle id="ltc" cx="' + C[0] + '" cy="' + C[1] + '" r="13" fill="rgba(255,194,51,.55)" stroke="' + INK + '" stroke-width="2" tabindex="0" role="slider" aria-label="رأس C" style="cursor:grab;touch-action:none"/>';
    box.innerHTML = s + '</svg>';
    host.querySelector('#ltv').innerHTML = '<i>A: ' + dg(a) + '</i><i>B: ' + dg(b) + '</i><i>C: ' + dg(c) + '</i><i class="' + (isR ? 'g' : 'y') + '">مجموع: ' + dg(a + b + c) + '</i>';
    host.querySelector('#ltl').innerHTML = rr(isR ? 'یکی از زاویه‌ها ' + M('90^\\circ') + ' شد؛ مثلث <b>قائم‌الزاویه</b> است.' : 'هر جا ببری، مجموع سه زاویه ' + M('180^\\circ') + ' می‌ماند.');
  }
  function setC(x, y) { C = [Math.max(24, Math.min(276, x)), Math.max(30, Math.min(150, y))]; var d = dist(C, A); if (d < 30 || dist(C, B) < 30) { return; } paint(); }
  var drag = false;
  host.addEventListener('pointerdown', function (e) { if (e.target.id === 'ltc') { drag = true; e.target.setPointerCapture && e.target.setPointerCapture(e.pointerId); e.preventDefault(); } });
  host.addEventListener('pointermove', function (e) { if (!drag) { return; } var r = box.querySelector('svg').getBoundingClientRect(), k = 300 / r.width; setC((e.clientX - r.left) * k, (e.clientY - r.top) * k); });
  host.addEventListener('pointerup', function () { drag = false; }); host.addEventListener('pointercancel', function () { drag = false; });
  host.addEventListener('keydown', function (e) { var d = { ArrowLeft: [-5, 0], ArrowRight: [5, 0], ArrowUp: [0, -5], ArrowDown: [0, 5] }[e.key]; if (d && e.target.id === 'ltc') { e.preventDefault(); setC(C[0] + d[0], C[1] + d[1]); box.querySelector('#ltc').focus(); } });
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) { return; }
    if (b.dataset.sn) { var M0 = [150, 168], u = unit(M0, C); if (u[1] > -0.2) { u = [u[0] < 0 ? -0.98 : 0.98, -0.2]; } C = [M0[0] + 110 * u[0], M0[1] + 110 * u[1]]; paint(); }
    else if (b.dataset.nw) { C = [R(60, 240), R(48, 110)]; paint(); }
  });
  paint();
};
/* ---------- آزمایشگاه ۳: وترشناس ---------- */
K.hypLab = function (host) {
  var q, picked;
  function nw() { var t = randRight(); q = { P: rightPts(t.a, t.b, t.r, t.rot), r: t.r, nm: pick(NAMES) }; picked = null; }
  function paint() {
    var hy = oppIdx(q.r), col = [INK, INK, INK], ok = picked === hy, h = '<p class="ask">روی ضلعِ «وتر» بزن:</p>';
    if (picked !== null) { col[hy] = TEAL; if (!ok) { col[picked] = RED; } }
    h += triSVG({ pts: q.P, names: q.nm, right: q.r, col: col, hit: picked === null, hl: picked !== null ? { side: hy, c: TEAL } : null, sl: picked !== null ? [0, 1, 2].map(function (i) { return sideNm(q.nm, i); }) : null });
    if (picked !== null) {
      h += '<div class="fb ' + (ok ? 'ok' : 'bad') + '">' + (ok ? '✓ درست است!' : 'این ضلع وتر نیست.') + '</div><div class="ex"><p>وتر روبه‌روی زاویهٔ قائمه است؛ اینجا قائمه در رأس ' + q.nm[q.r] + ' است، پس وتر ' + M(sideNm(q.nm, hy)) + ' است. دو ضلع دیگر «ضلع قائم» نام دارند.</p></div>';
    }
    h += '<div class="opts g-ops"><button type="button" class="btn" data-nw="1" data-scroll>شکل دیگر</button></div>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) { var l = e.target.closest('.hitline'), b = e.target.closest('button'); if (l && picked === null) { picked = +l.dataset.s; paint(); } else if (b && b.dataset.nw) { nw(); paint(); } });
  host.addEventListener('keydown', function (e) { var l = e.target.closest && e.target.closest('.hitline'); if (l && (e.key === 'Enter' || e.key === ' ') && picked === null) { e.preventDefault(); picked = +l.dataset.s; paint(); } });
  nw(); paint();
};
/* ---------- آزمایشگاه ۴: زاویهٔ سوم ---------- */
K.thirdLab = function (host) {
  host.innerHTML = rr('<p class="ask">دو زاویه را تنظیم کن؛ زاویهٔ سوم را مثلث خودش حساب می‌کند:</p><div id="tkf"></div><div class="gval" id="tkv"></div><p class="legend" id="tkl"></p>' + gslider('tka', 10, 85, 40, 5, [10, 25, 40, 55, 70, 85].map(function (v) { return { v: v }; }), 'زاویهٔ A') + gslider('tkb', 10, 85, 50, 5, [10, 25, 40, 55, 70, 85].map(function (v) { return { v: v }; }), 'زاویهٔ B'));
  var ia = host.querySelector('#tka'), ib = host.querySelector('#tkb');
  function paint() {
    var a = +ia.value, b = +ib.value, c = 180 - a - b, r = a === 90 || b === 90 || c === 90, ri = c === 90 ? 2 : -1;
    host.querySelector('#tkf').innerHTML = triSVG({ pts: triFromAng(a, b, 100), names: ['A', 'B', 'C'], al: [fa(a) + '°', fa(b) + '°', fa(c) + '°'], right: ri < 0 ? undefined : ri, arcs: ri < 0, fill: r ? '#d2f0e9' : '#eef4ff', W: 300, H: 200 });
    host.querySelector('#tkv').innerHTML = '<i>' + dg(a) + ' + ' + dg(b) + ' = ' + dg(a + b) + '</i><i class="' + (r ? 'g' : 'y') + '">زاویهٔ سوم: ' + dg(c) + '</i>';
    host.querySelector('#tkl').innerHTML = rr(r ? 'مجموع دو زاویه ' + M('90^\\circ') + ' است؛ پس زاویهٔ سوم ' + M('90^\\circ') + ' می‌شود و مثلث <b>قائم‌الزاویه</b> است (حتی اگر علامت قائمه نکشیده باشند).' : 'زاویهٔ سوم ' + M('180-' + (a + b) + '=' + c) + ' است؛ ' + M('90^\\circ') + ' نیست، پس قائم‌الزاویه نیست.');
  }
  ia.addEventListener('input', paint); ib.addEventListener('input', paint); paint();
};

/* ================= تولید سؤال ================= */
function genB1() {
  var nm = pick(NAMES), P = randTri(), v = R(0, 2), a = nm[v], b = nm[(v + 1) % 3], c = nm[(v + 2) % 3];
  return {
    ask: 'در مثلث زیر، ضلع روبه‌رو به رأس ' + M(a) + ' کدام است؟', fig: '<div class="figs one"><figure>' + triSVG({ pts: P, names: nm }) + '</figure></div>', cq: '', cls: 'm2',
    opts: mkO({ t: M(b + c) }, [{ t: M(a + b), m: 'ضلع ' + a + b + ' به رأس ' + a + ' می‌رسد؛ پس کنار آن است، نه روبه‌رویش.' }, { t: M(a + c), m: 'ضلع ' + a + c + ' به رأس ' + a + ' می‌رسد؛ پس کنار آن است، نه روبه‌رویش.' }, { t: M(a + b) + ' و ' + M(a + c), m: 'این دو ضلع، ضلع‌های کنار رأس ' + a + ' هستند.' }], true),
    expl: function () { return '<p>ضلع روبه‌رو به رأس ' + M(a) + ' ضلعی است که به آن رأس نمی‌رسد؛ دو سرش دو رأس دیگر (' + M(b) + ' و ' + M(c) + ') است: ' + M(b + c) + '.</p>'; }
  };
}
function genB2() {
  var t = randRight(), nm = pick(NAMES), P = rightPts(t.a, t.b, t.r, t.rot), hy = oppIdx(t.r), s = [0, 1, 2].map(function (i) { return sideNm(nm, i); });
  var wr = [0, 1, 2].filter(function (i) { return i !== hy; }).map(function (i) { return { t: M(s[i]), m: 'این ضلع کنار زاویهٔ قائمه است (ضلع قائم)؛ وتر روبه‌روی زاویهٔ قائمه است.' }; });
  wr.push({ t: 'نمی‌توان تعیین کرد', m: 'می‌توان: علامت قائمه در رأس ' + nm[t.r] + ' است و وتر روبه‌روی آن قرار دارد.' });
  return {
    ask: 'در مثلث قائم‌الزاویهٔ زیر، وتر کدام است؟', fig: '<div class="figs one"><figure>' + triSVG({ pts: P, names: nm, right: t.r }) + '</figure></div>', cq: '', cls: 'm2',
    opts: mkO({ t: M(s[hy]) }, wr, true),
    expl: function () { return '<p>زاویهٔ قائمه در رأس ' + M(nm[t.r]) + ' است. وتر، ضلعِ روبه‌رو به آن است: ' + M(s[hy]) + '. وضع قرارگرفتن یا چرخش مثلث در این تشخیص اثری ندارد.</p>'; }
  };
}
function genB3() {
  var isR = R(0, 1), numv = R(0, 1), pr = pick([[40, 50], [35, 55], [30, 60], [25, 65], [20, 70], [45, 45]]), pn = pick([[40, 60], [50, 60], [30, 50], [35, 45], [40, 65], [55, 55], [25, 50]]), pp = (isR && !numv) ? pr : pn, a = pp[0], b = pp[1], c = 180 - a - b, nm = ['A', 'B', 'C'];
  var fig = '<div class="figs one"><figure>' + triSVG({ pts: triFromAng(a, b, 100), names: nm, al: [fa(a) + '°', fa(b) + '°', ''], arcs: true, W: 300, H: 200 }) + '</figure></div>';
  if (!numv) {
    var wr = isR ? [{ t: 'خیر؛ چون علامت زاویهٔ قائمه روی شکل نیست', m: 'نبودنِ علامت دلیل نمی‌شود؛ زاویهٔ سوم را حساب کن.' }, { t: 'خیر؛ چون هیچ‌کدام از این دو زاویه ' + fa(90) + ' نیست', m: 'ممکن است زاویهٔ سوم قائمه باشد؛ باید آن را حساب کنی.' }, { t: 'نمی‌توان تعیین کرد؛ زاویهٔ سوم معلوم نیست', m: 'معلوم است: مجموع زاویه‌های مثلث ۱۸۰ درجه است.' }] : [{ t: 'بله؛ چون مجموع دو زاویه از ۱۸۰ کمتر است', m: 'این برای هر مثلثی درست است و دلیلِ قائمه بودن نیست.' }, { t: 'بله؛ چون هر مثلثی یک زاویهٔ قائمه دارد', m: 'همهٔ مثلث‌ها قائمه ندارند.' }, { t: 'نمی‌توان تعیین کرد؛ زاویهٔ سوم معلوم نیست', m: 'معلوم است: مجموع زاویه‌های مثلث ۱۸۰ درجه است.' }];
    return {
      ask: 'در مثلث زیر، دو زاویهٔ ' + M(a + '^\\circ') + ' و ' + M(b + '^\\circ') + ' داده شده و زاویهٔ سوم نوشته نشده. آیا این مثلث قائم‌الزاویه است؟', fig: fig, cq: '', cls: 'm1',
      opts: mkO({ t: isR ? 'بله؛ چون زاویهٔ سوم ' + fa(90) + ' درجه می‌شود' : 'خیر؛ چون زاویهٔ سوم ' + fa(c) + ' درجه می‌شود، نه ' + fa(90) }, wr, true),
      expl: function () { return '<p>زاویهٔ سوم: ' + M('180-(' + a + '+' + b + ')=' + c) + '. ' + (isR ? 'این زاویه ' + M('90^\\circ') + ' است، پس مثلث قائم‌الزاویه است؛ علامتش را روی شکل نکشیده‌اند.' : 'این زاویه ' + M('90^\\circ') + ' نیست و دو زاویهٔ دیگر هم ' + M('90^\\circ') + ' نیستند؛ پس قائم‌الزاویه نیست.') + '</p>'; }
    };
  }
  return {
    ask: 'در مثلث زیر، دو زاویهٔ ' + M(a + '^\\circ') + ' و ' + M(b + '^\\circ') + ' داده شده‌اند. زاویهٔ سوم چند درجه است؟', fig: fig, cq: '', cls: 'm2',
    opts: numO(c, [{ v: a + b, m: 'این مجموع دو زاویه است؛ باید آن را از ۱۸۰ کم کنی.' }, { v: 360 - a - b, m: 'مجموع زاویه‌های مثلث ۱۸۰ است، نه ۳۶۰.' }, { v: 90, m: 'مثلث لزوماً قائم‌الزاویه نیست؛ زاویهٔ سوم را حساب کن.' }, { v: 90 - a, m: 'مجموع را ۱۸۰ بگیر، نه ۹۰.' }], '^\\circ'),
    expl: function () { return '<p>مجموع زاویه‌های هر مثلث ' + M('180^\\circ') + ' است:</p>' + K.dm('180-' + a + '-' + b + '=' + c); }
  };
}
var TFP = [
  { h: 'ضلع روبه‌رو به یک رأس، ضلعی است که به آن رأس نمی‌رسد.', ok: 1, e: '<p>دو سرِ ضلعِ روبه‌رو، دو رأس دیگرند.</p>' },
  { h: 'در مثلث ' + M('ABC') + ' ، ضلع ' + M('AB') + ' روبه‌روی رأس ' + M('A') + ' است.', ok: 0, e: '<p>ضلع ' + M('AB') + ' به رأس ' + M('A') + ' می‌رسد. ضلع روبه‌رو به ' + M('A') + ' ، ' + M('BC') + ' است.</p>' },
  { h: 'مجموع زاویه‌های هر مثلث ' + M('180^\\circ') + ' است.', ok: 1, e: '<p>مثلث تند یا باز یا قائم‌الزاویه، مجموع همیشه ' + M('180^\\circ') + ' است.</p>' },
  { h: 'وتر ضلعی است که روبه‌روی زاویهٔ قائمه قرار دارد.', ok: 1, e: '<p>وتر فقط در مثلث قائم‌الزاویه تعریف می‌شود و روبه‌روی زاویهٔ قائمه است.</p>' },
  { h: 'وتر همیشه ضلعی است که کنار زاویهٔ قائمه قرار دارد.', ok: 0, e: '<p>ضلع‌های کنار زاویهٔ قائمه، ضلع‌های قائم‌اند؛ وتر روبه‌روی آن است.</p>' },
  { h: 'مثلثی با زاویه‌های ' + M('40^\\circ') + ' و ' + M('50^\\circ') + ' قائم‌الزاویه است.', ok: 1, e: '<p>زاویهٔ سوم ' + M('180-40-50=90') + ' می‌شود.</p>' },
  { h: 'اگر روی شکل علامت زاویهٔ قائمه نباشد، مثلث قائم‌الزاویه نیست.', ok: 0, e: '<p>ممکن است زاویهٔ سوم از روی دو زاویهٔ دیگر ' + M('90^\\circ') + ' درآید و فقط علامتش را نکشیده باشند.</p>' },
  { h: 'یک مثلث می‌تواند دو زاویهٔ قائمه داشته باشد.', ok: 0, e: '<p>دو زاویهٔ قائمه با هم ' + M('180^\\circ') + ' می‌شوند و جایی برای زاویهٔ سوم نمی‌ماند.</p>' },
  { h: 'در مثلث قائم‌الزاویه، دو زاویهٔ دیگر تندند و مجموعشان ' + M('90^\\circ') + ' است.', ok: 1, e: '<p>' + M('180-90=90') + ' باید بین آن دو تقسیم شود.</p>' },
  { h: 'در مثلث قائم‌الزاویه، وتر بلندترین ضلع است.', ok: 1, e: '<p>وتر روبه‌روی بزرگ‌ترین زاویه (قائمه) است.</p>' },
  { h: 'اگر مثلثی را بچرخانیم، وتر آن عوض می‌شود.', ok: 0, e: '<p>چرخاندن، شکل را تغییر نمی‌دهد؛ وتر باز هم روبه‌روی زاویهٔ قائمه است.</p>' },
  { h: 'مثلثی با زاویه‌های ' + M('40^\\circ') + ' ، ' + M('60^\\circ') + ' و ' + M('70^\\circ') + ' وجود دارد.', ok: 0, e: '<p>مجموعشان ' + M('170^\\circ') + ' می‌شود، نه ' + M('180^\\circ') + '.</p>' }
];
return {
  html: function () {
    var T0 = [[0, 0], [100, 0], [34, 72]];
    return [
      K.sn('۱', 'اجزای مثلث'),
      '<p>هر مثلث سه «رأس»، سه «ضلع» و سه «زاویه» دارد. رأس‌ها را با حرف بزرگ می‌نامیم و ضلع را با حرفِ دو رأسش؛ مثلاً ' + M('AB') + ' ضلعی است که از ' + M('A') + ' به ' + M('B') + ' می‌رود.</p>',
      fig1(triSVG({ pts: T0, names: ['A', 'B', 'C'], arcs: true, al: ['', '', ''] }), 'مثلث ' + 'ABC'),
      '<p>هر ضلع «روبه‌روی» یک رأس است: ضلعی که به آن رأس نمی‌رسد. یک رأس انتخاب کن و ضلع روبه‌رویش را ببین:</p><div class="cover g-act" id="ve" style="animation:none"></div>',
      K.box('err', '⚠ خطای رایج: ضلعِ کنار با ضلعِ روبه‌رو قاطی نشود', '<p>ضلع ' + M('AB') + ' و ' + M('AC') + ' به رأس ' + M('A') + ' می‌رسند و «کنار» آن‌اند. ضلع روبه‌روی ' + M('A') + ' فقط ' + M('BC') + ' است.</p>'),

      K.sn('۲', 'مجموع زاویه‌ها'),
      '<p>هر شکلی که برای مثلث بکشی، مجموع سه زاویه‌اش ' + M('180^\\circ') + ' است. رأس بالایی را جابه‌جا کن و خودت ببین:</p><div class="cover g-act" id="lv" style="animation:none"></div>',
      K.box('note', 'مجموع زاویه‌های مثلث', '<p>' + M('\\hat A+\\hat B+\\hat C=180^\\circ') + '</p>'),

      K.sn('۳', 'مثلث قائم‌الزاویه'),
      '<p>مثلثی که یک زاویهٔ قائمه (' + M('90^\\circ') + ') دارد «قائم‌الزاویه» است. ضلع روبه‌روی زاویهٔ قائمه «وتر» نام دارد؛ دو ضلع دیگر «ضلع‌های قائم» اند.</p>',
      fig1(triSVG({ pts: rightPts(70, 50, 0, 0), names: ['B', 'C', 'A'], right: 0, sl: ['ضلع قائم', 'وتر', 'ضلع قائم'], hl: { side: 1, c: TEAL }, W: 300, H: 190 }), 'زاویهٔ قائمه در رأس B است؛ وتر روبه‌روی آن (CA).'),
      K.box('note', 'دو زاویهٔ دیگر', '<p>در مثلث قائم‌الزاویه، دو زاویهٔ دیگر تندند و جمعشان ' + M('90^\\circ') + ' است؛ چون ' + M('180-90=90') + '. وتر هم بلندترین ضلع است.</p>'),
      '<p>وتر را فقط از روی جای زاویهٔ قائمه تشخیص بده، نه از روی افقی یا کج بودن مثلث. چند شکل چرخیده را امتحان کن:</p><div class="cover g-act" id="hy" style="animation:none"></div>',

      K.sn('۴', 'آیا قائم‌الزاویه است؟'),
      '<p>سه راه برای قضاوت داری: علامت مربع کوچک روی شکل؛ داشتنِ یک زاویهٔ ' + M('90^\\circ') + '؛ یا اینکه مجموع دو زاویهٔ داده‌شده ' + M('90^\\circ') + ' شود (آن‌وقت زاویهٔ سوم ' + M('90^\\circ') + ' است). دو زاویه را تنظیم کن:</p><div class="cover g-act" id="tk" style="animation:none"></div>',
      K.box('err', '⚠ خطای رایج: «علامت قائمه ندارد، پس قائم‌الزاویه نیست»', '<p>اگر دو زاویه ' + M('40^\\circ') + ' و ' + M('50^\\circ') + ' باشند، زاویهٔ سوم ' + M('90^\\circ') + ' می‌شود؛ حتی اگر علامتش نکشیده شده باشد. همیشه زاویهٔ سوم را حساب کن.</p>'),

      K.sn('۵', 'مسئله‌های کامل'),
      '<h4>مثال اول: ضلع روبه‌رو</h4><p>در مثلث ' + M('KLM') + ' ، ضلع روبه‌رو به رأس ' + M('L') + ' کدام است؟ ضلعی که به ' + M('L') + ' نمی‌رسد:</p>', K.dm('KM'),
      '<h4>مثال دوم: وتر</h4><p>زاویهٔ قائمه در رأس ' + M('P') + ' است. وتر ضلع روبه‌رو به ' + M('P') + ' ، یعنی:</p>', K.dm('QR'),
      '<h4>مثال سوم: زاویهٔ سوم</h4><p>دو زاویهٔ ' + M('35^\\circ') + ' و ' + M('55^\\circ') + ' داریم:</p>', K.dm('180-35-55=90'), '<p>پس مثلث قائم‌الزاویه است.</p>',

      K.sn('۶', 'کارت مرجع'),
      refs([{ c: 'r1', t: 'ضلع روبه‌رو', r: 'ضلعی که به آن رأس نمی‌رسد.', e: 'BC\\ \\text{روبه‌روی}\\ A' }, { c: 'r2', t: 'مجموع زاویه‌ها', r: 'در هر مثلث ۱۸۰ درجه.', e: '\\hat A+\\hat B+\\hat C=180^\\circ' }, { c: 'r3', t: 'وتر', r: 'ضلعِ روبه‌رو به زاویهٔ قائمه.', e: 'BC' }, { c: 'r4', t: 'زاویه‌های تند', r: 'در قائم‌الزاویه، دو زاویهٔ دیگر جمعشان ۹۰.', e: '\\hat B+\\hat C=90^\\circ' }, { c: 'r1', t: 'زاویهٔ سوم', r: 'از ۱۸۰ کم کن.', e: '180-a-b' }, { c: 'r3', t: 'قائم‌الزاویه؟', r: 'یا یک زاویه ۹۰، یا مجموع دو زاویه ۹۰.', e: 'a+b=90^\\circ' }]),

      K.sn('۷', 'مثلث‌شناس'),
      '<p>هر مرحله با دو پاسخ درست تمام می‌شود. بعد از هر پاسخ، دلیلش را می‌بینی.</p><div class="cover g-act" id="ss" style="animation:none"></div>',
      K.sn('۸', 'درست یا نادرست؟'),
      '<p>شش جمله را بسنج. به تله‌ها دقت کن.</p><div class="cover g-act" id="tf" style="animation:none"></div>',
      K.sn('۹', 'تمرین پایانی'),
      '<p>پنج سؤال با شکل‌های تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover g-act" id="fn" style="animation:none"></div>',
      K.box('sum', 'بعد از این درس باید بتوانی', T`<ul><li>رأس، ضلع و زاویهٔ مثلث را بشناسی و ضلعِ روبه‌رو به یک رأس را پیدا کنی.</li><li>بدانی مجموع زاویه‌های هر مثلث $180^\circ$ است و زاویهٔ سوم را حساب کنی.</li><li>وتر و ضلع‌های قائم را، حتی در شکل چرخیده، تشخیص بدهی.</li><li>با حساب‌کردن زاویهٔ سوم بفهمی مثلث قائم‌الزاویه است یا نه، حتی وقتی علامت قائمه کشیده نشده.</li></ul>`)
    ].join('');
  },
  init: function (panel) {
    K.vertLab(panel.querySelector('#ve')); K.liveTri(panel.querySelector('#lv')); K.hypLab(panel.querySelector('#hy')); K.thirdLab(panel.querySelector('#tk'));
    K.stepRun(panel.querySelector('#ss'), [{ n: 'ضلعِ روبه‌رو', gen: genB1 }, { n: 'وتر', gen: genB2 }, { n: 'زاویهٔ سوم', gen: genB3 }], { done: 'حالا برو سراغ تله‌ها.' });
    K.tfRun(panel.querySelector('#tf'), TFP);
    K.finalRun(panel.querySelector('#fn'), [genB1, genB2, genB2, genB3, genB3], { top: 'عالی بود! مثلث و قائم‌الزاویه را کاملاً فهمیده‌ای.' });
  }
};

  }
};
