/* درس مهارت G01 — انواع زاویه و اندازه‌گیری زاویه (فصل ۵) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.G01 = {
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
var cards3 = function (cells) { return '<div class="sg sg3">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.h + '</b><span>' + c.t + '</span></div>'; }).join('') + '</div>'; };
var refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };
var fig1 = function (inner, cap) { return '<div class="figs one"><figure>' + inner + (cap ? '<figcaption>' + cap + '</figcaption>' : '') + '</figure></div>'; };
var figs2 = function (a, ca, b, cb) { return '<div class="figs"><figure>' + a + '<figcaption>' + ca + '</figcaption></figure><figure>' + b + '<figcaption>' + cb + '</figcaption></figure></div>'; };



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
/* مثلث قائم‌الزاویه با ضلع‌های قائم a و b؛ رأس قائمه روی اندیس r و چرخش دلخواه (هر سه رأس به ترتیب ساعت‌گرد یا پادساعت‌گرد) */
/* نوار لغزندهٔ بومی با درجه‌بندیِ KaTeX (الگوی فصل اول) — ticks: [{v, t}] */
function gslider(id, min, max, val, step, ticks, label) {
  var tot = max - min, h = '<div class="g-sl graduated-range" style="--gr-total:' + tot + '">' + (label ? '<div class="lab"><span>' + label + '</span></div>' : '') + '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '" aria-label="' + (label || id) + '"><div class="graduated-ticks">';
  ticks.forEach(function (t) { h += '<span style="--gr-step:' + (t.v - min) + '"><i></i>' + (t.t === undefined ? M(String(t.v)) : t.t) + '</span>'; });
  return h + '</div></div>';
}

/* مثلث با زاویه‌های a در رأس 0 و b در رأس 1 (مختصات ریاضی) */
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


/* ---------- آزمایشگاه ۱: زاویه‌ساز ---------- */
var TYN = ['تند', 'قائمه', 'باز', 'مستقیم'];
var TYI = ['از ۹۰ درجه کوچک‌تر است', 'دقیقاً ۹۰ درجه است (گوشهٔ کاغذ)', 'از ۹۰ درجه بزرگ‌تر و از ۱۸۰ درجه کوچک‌تر است', 'دقیقاً ۱۸۰ درجه است (دو ضلع در یک راستا)'];
function tyOf(d) { return d < 90 ? 0 : d === 90 ? 1 : d < 180 ? 2 : 3; }
K.angLab = function (host) {
  host.innerHTML = rr('<p class="ask">نوار را حرکت بده و نوع زاویه را ببین:</p><div id="amf"></div><div class="gval" id="amt"></div><p class="legend" id="aml"></p>' + gslider('amr', 10, 180, 40, 5, [30, 60, 90, 120, 150, 180].map(function (v) { return { v: v }; }), 'اندازهٔ زاویه'));
  var inp = host.querySelector('#amr');
  function paint() {
    var d = +inp.value, t = tyOf(d);
    host.querySelector('#amf').innerHTML = angSVG({ deg: d, rot: 90 - d / 2, l1: 120, l2: 120, lab: fa(d) + '°', fill: t === 1 ? '#d2f0e9' : '#fde7ef' });
    host.querySelector('#amt').innerHTML = TYN.map(function (n, i) { return '<i class="' + (i === t ? 'y' : '') + '">' + n + '</i>'; }).join('');
    host.querySelector('#aml').innerHTML = 'زاویهٔ <b>' + dg(d) + '</b> «' + TYN[t] + '» است: ' + TYI[t] + '.';
  }
  inp.addEventListener('input', paint); paint();
};
/* ---------- آزمایشگاه ۲: ساعت ---------- */
K.clockLab = function (host) {
  host.innerHTML = rr('<p class="ask">عقربهٔ ساعت‌شمار را روی ساعت‌های تمام بچرخان:</p><div id="ckf"></div><div class="gval" id="ckt"></div>' + gslider('ckr', 1, 12, 3, 1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (v) { return { v: v }; }), 'ساعت'));
  var inp = host.querySelector('#ckr');
  function paint() {
    var h = +inp.value, ang = h === 12 ? 0 : Math.min(30 * h, 360 - 30 * h), cx = 105, cy = 105, i, s = sv(210, 210), th = 30 * h * D2R, tip = [cx + 62 * Math.sin(th), cy - 62 * Math.cos(th)], mt = [cx, cy - 86];
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="96" fill="#fff" stroke="' + INK + '" stroke-width="3"/>';
    for (i = 1; i <= 12; i++) { var a = i * 30 * D2R; s += sln([cx + 88 * Math.sin(a), cy - 88 * Math.cos(a)], [cx + 94 * Math.sin(a), cy - 94 * Math.cos(a)], INK, 2) + stx(fa(i), cx + 76 * Math.sin(a), cy - 76 * Math.cos(a), { fs: 12, c: i === h ? RED : INK, b: i === h }); }
    if (ang > 0) { s += arcP([cx, cy], mt, tip, 26, PINK, 'rgba(214,69,122,.18)'); }
    s += sln([cx, cy], mt, BLUE, 3.5) + sln([cx, cy], tip, RED, 5) + '<circle cx="' + cx + '" cy="' + cy + '" r="5" fill="' + INK + '"/>';
    host.querySelector('#ckf').innerHTML = s + '</svg>';
    host.querySelector('#ckt').innerHTML = ang === 0 ? '<i>هر دو عقربه روی هم‌اند؛ زاویه صفر</i>' : '<i class="' + (ang === 90 ? 'g' : 'y') + '">زاویه: ' + dg(ang) + '</i><i>' + TYN[tyOf(ang)] + '</i>';
  }
  inp.addEventListener('input', paint); paint();
};
/* ---------- آزمایشگاه ۳: نقاله ---------- */
K.protLab = function (host) {
  var base = 'R';
  host.innerHTML = rr('<p class="ask">پرتوی پایه را انتخاب کن و پرتوی دوم را بچرخان:</p><div class="chips g-fa" id="plc"></div><div id="plf"></div><div class="gval" id="plt"></div><p class="legend" id="pll"></p>' + gslider('plr', 5, 175, 65, 5, [0, 30, 60, 90, 120, 150, 180].map(function (v) { return { v: Math.max(5, Math.min(175, v)), t: M(String(v)) }; }), 'اندازهٔ زاویه'));
  var inp = host.querySelector('#plr');
  function chips() { host.querySelector('#plc').innerHTML = [['R', 'پرتوی پایه: راست'], ['L', 'پرتوی پایه: چپ']].map(function (x) { return '<button type="button" class="chip' + (base === x[0] ? ' on' : '') + '" data-b="' + x[0] + '">' + x[1] + '</button>'; }).join(''); }
  function paint() {
    var d = +inp.value, w = 180 - d;
    host.querySelector('#plf').innerHTML = protSVG({ deg: d, base: base, hi: true, zero: true });
    host.querySelector('#plt').innerHTML = '<i class="g">مقیاس درست: ' + dg(d) + '</i><i class="p">مقیاس دیگر: ' + dg(w) + '</i>';
    host.querySelector('#pll').innerHTML = base === 'R' ? 'صفرِ <b>سمت راست</b> زیر پرتوی پایه است؛ پس از <b>مقیاس بیرونی</b> می‌خوانیم.' : 'صفرِ <b>سمت چپ</b> زیر پرتوی پایه است؛ پس از <b>مقیاس درونی</b> می‌خوانیم.';
  }
  host.addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (!b) { return; } base = b.dataset.b; chips(); paint(); });
  inp.addEventListener('input', paint); chips(); paint();
};
/* ---------- آزمایشگاه ۴: روی هم بگذار ---------- */
K.overLab = function (host) {
  var a, b, la, lb, over;
  function nw() { a = pick([35, 40, 45, 50, 55]); b = a + pick([20, 25, 30]); if (R(0, 1)) { var t = a; a = b; b = t; } la = a < b ? R(110, 135) : R(60, 80); lb = a < b ? R(60, 80) : R(110, 135); over = false; }
  function sep(deg, l, lab) { return angSVG({ deg: deg, rot: 0, l1: l, l2: l, lab: lab, W: 200, H: 150, fill: '#fde7ef' }); }
  function ovr() {
    var V = [30, 130], s = sv(300, 160), e = function (d, l) { return [V[0] + l * Math.cos(d * D2R), V[1] - l * Math.sin(d * D2R)]; }, A1 = e(0, 230), A2 = e(a, la), B2 = e(b, lb);
    s += arcP(V, A1, e(a, 10), 38, 'none', 'rgba(214,69,122,.22)') + arcP(V, A1, e(b, 10), 52, BLUE) + arcP(V, A1, e(a, 10), 38, PINK);
    s += sln(V, A1, INK, 3) + sln(V, A2, PINK, 4) + sln(V, B2, BLUE, 4) + '<circle cx="' + V[0] + '" cy="' + V[1] + '" r="4" fill="' + INK + '"/>';
    s += stx('الف', A2[0] + 14, A2[1] - 6, { fs: 13, b: 1, c: PINK }) + stx('ب', B2[0] + 12, B2[1] - 6, { fs: 13, b: 1, c: BLUE });
    return s + '</svg>';
  }
  function paint() {
    var h = '<p class="ask">دو زاویهٔ الف و ب را مقایسه کن:</p>';
    h += over ? ovr() : '<div class="figs"><figure>' + sep(a, la, 'الف') + '<figcaption>زاویهٔ الف</figcaption></figure><figure>' + sep(b, lb, 'ب') + '<figcaption>زاویهٔ ب</figcaption></figure></div>';
    h += '<p class="legend">' + (over ? 'یک ضلع را روی هم گذاشتیم؛ ضلع دوم هر کدام که بازتر باشد، زاویه‌اش بزرگ‌تر است: <b>زاویهٔ ' + (a > b ? 'الف' : 'ب') + '</b>.' : 'اول با چشم حدس بزن، بعد دکمه را بزن.') + '</p>';
    h += '<div class="opts g-ops"><button type="button" class="btn" data-t="1">' + (over ? 'جدا کن' : 'روی هم بگذار') + '</button><button type="button" class="btn" data-nw="1" data-scroll>زاویه‌های دیگر</button></div>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) { var x = e.target.closest('button'); if (!x) { return; } if (x.dataset.t) { over = !over; paint(); } else if (x.dataset.nw) { nw(); paint(); } });
  nw(); paint();
};

/* ================= تولید سؤال ================= */
function genA1() {
  var c = R(0, 3), d = c === 0 ? pick([20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75]) : c === 1 ? 90 : c === 2 ? pick([105, 110, 120, 125, 135, 140, 150, 160]) : 180;
  var rot = c === 3 ? pick([0, 30, 150, 210]) : R(0, 359), wr = [0, 1, 2, 3].filter(function (j) { return j !== c; }).map(function (j) { return { t: TYN[j], m: 'زاویهٔ «' + TYN[j] + '» یعنی ' + TYI[j] + '؛ اما این زاویه ' + TYI[c] + '.' }; });
  return {
    ask: 'نوع زاویهٔ زیر چیست؟', fig: '<div class="figs one"><figure>' + angSVG({ deg: d, rot: rot, l1: R(75, 120), l2: R(75, 120), mark: true }) + '</figure></div>', cq: '', cls: 'm2',
    opts: mkO({ t: TYN[c] }, wr, true),
    expl: function () { return '<p>اندازهٔ این زاویه ' + M(d + '^\\circ') + ' است؛ یعنی ' + TYI[c] + '. پس نوعش «' + TYN[c] + '» است.</p>'; }
  };
}
function genA2() {
  var base = R(0, 1) ? 'R' : 'L', d = pick([15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160]);
  var w = [{ v: 180 - d, m: 'از مقیاس اشتباه خوانده‌ای: صفر باید روی پرتوی پایه باشد. این زاویه ' + (d < 90 ? 'تند است، پس عدد باید کوچک‌تر از ۹۰ باشد.' : 'باز است، پس عدد باید بزرگ‌تر از ۹۰ باشد.') }, { v: d + 5, m: 'یک خط کوچک اضافه شمرده‌ای؛ هر خط کوچک ۵ درجه است.' }, { v: d - 5, m: 'یک خط کوچک کم شمرده‌ای؛ هر خط کوچک ۵ درجه است.' }, { v: d + 10, m: 'دو خط کوچک اضافه شمرده‌ای.' }, { v: d - 10, m: 'دو خط کوچک کم شمرده‌ای.' }];
  return {
    ask: 'اندازهٔ زاویه‌ای که با دو پرتوی قرمز ساخته شده چند درجه است؟ <small>(هر خط کوچک روی نقاله ۵ درجه است.)</small>', fig: '<div class="figs one"><figure>' + protSVG({ deg: d, base: base }) + '</figure></div>', cq: '', cls: 'm2',
    opts: numO(d, w, '^\\circ'),
    expl: function () { return '<p>پرتوی پایه روی صفرِ ' + (base === 'R' ? '<b>سمت راست</b> است، پس از <b>مقیاس بیرونی</b>' : '<b>سمت چپ</b> است، پس از <b>مقیاس درونی</b>') + ' می‌خوانیم.</p><p>جواب: ' + M(d + '^\\circ') + '. اگر از مقیاس دیگر بخوانی، ' + M((180 - d) + '^\\circ') + ' می‌شود که با نوع زاویه نمی‌خواند.</p>'; }
  };
}
function genA3() {
  if (R(0, 1)) {
    var a = pick([35, 40, 45, 50, 55]), b = a + pick([20, 25, 30]), sw = R(0, 1), da = sw ? b : a, db = sw ? a : b, la = da < db ? R(110, 135) : R(60, 80), lb = da < db ? R(60, 80) : R(110, 135), big = da > db ? 0 : 1;
    return {
      ask: 'کدام زاویه بزرگ‌تر است؟', fig: figs2(angSVG({ deg: da, rot: 0, l1: la, l2: la, lab: 'الف', W: 200, H: 150 }), 'زاویهٔ الف', angSVG({ deg: db, rot: 0, l1: lb, l2: lb, lab: 'ب', W: 200, H: 150 }), 'زاویهٔ ب'), cq: '', cls: 'm2',
      opts: mkO({ t: big ? 'زاویهٔ ب' : 'زاویهٔ الف' }, [{ t: big ? 'زاویهٔ الف' : 'زاویهٔ ب', m: 'به طول ضلع‌ها نگاه کرده‌ای؛ اندازهٔ زاویه به میزان باز بودن دو ضلع بستگی دارد.' }, { t: 'هر دو هم‌اندازه‌اند', m: 'دهانهٔ این دو زاویه فرق دارد.' }, { t: 'نمی‌شود فهمید', m: 'می‌شود: دهانهٔ دو ضلع را مقایسه کن (یا یکی را روی دیگری بگذار).' }], true),
      expl: function () { return '<p>زاویهٔ الف حدود ' + M(da + '^\\circ') + ' و زاویهٔ ب حدود ' + M(db + '^\\circ') + ' است. طول ضلع‌ها در اندازهٔ زاویه اثری ندارد.</p>'; }
    };
  }
  var x = pick([30, 40, 50, 55, 65, 70, 110, 120, 125, 130, 140]), V = [150, 130], s = sv(300, 160), E = function (d, l) { return [V[0] + l * Math.cos(d * D2R), V[1] - l * Math.sin(d * D2R)]; };
  s += sln([20, 130], [280, 130], INK, 3) + sln(V, E(x, 105), INK, 3) + arcP(V, E(0, 10), E(x, 10), 30, PINK) + arcP(V, E(x, 10), E(180, 10), 40, BLUE) + '<circle cx="150" cy="130" r="4" fill="' + INK + '"/>' + stx(fa(x) + '°', E(x / 2, 52)[0], E(x / 2, 52)[1], { fs: 13, b: 1, c: PINK }) + stx('؟', E((x + 180) / 2, 62)[0], E((x + 180) / 2, 62)[1], { fs: 15, b: 1, c: BLUE });
  return {
    ask: 'دو زاویهٔ کنار هم روی یک خط راست قرار دارند. یکی ' + M(x + '^\\circ') + ' است؛ دیگری چند درجه است؟', fig: '<div class="figs one"><figure>' + s + '</svg></figure></div>', cq: '', cls: 'm2',
    opts: numO(180 - x, [{ v: 90 - x, m: 'این‌ها مکمل ۹۰ درجه بودند؛ روی خط راست مجموع ۱۸۰ درجه است.' }, { v: x, m: 'دو زاویه لزوماً هم‌اندازه نیستند.' }, { v: 360 - x, m: 'مجموع روی خط راست ۱۸۰ است، نه ۳۶۰.' }, { v: 180 + x, m: 'باید از ۱۸۰ کم کنی، نه اینکه اضافه کنی.' }], '^\\circ'),
    expl: function () { return '<p>دو زاویه کنار هم روی خط راست، با هم یک زاویهٔ مستقیم (' + M('180^\\circ') + ') می‌سازند:</p>' + K.dm('180-' + x + '=' + (180 - x)); }
  };
}
var TFP = [
  { h: 'زاویه‌ای که دقیقاً ' + M('90^\\circ') + ' باشد «قائمه» نام دارد.', ok: 1, e: '<p>قائمه یعنی گوشهٔ کاغذ؛ دقیقاً ' + M('90^\\circ') + '.</p>' },
  { h: 'هر چه ضلع‌های یک زاویه بلندتر کشیده شوند، اندازهٔ زاویه بزرگ‌تر می‌شود.', ok: 0, e: '<p>اندازهٔ زاویه فقط به میزان باز بودن دو ضلع بستگی دارد؛ ضلع‌ها را می‌شود هرچقدر بلند کرد و زاویه عوض نمی‌شود.</p>' },
  { h: 'زاویهٔ ' + M('100^\\circ') + ' یک زاویهٔ باز است.', ok: 1, e: '<p>' + M('90^\\circ\\lt100^\\circ\\lt180^\\circ') + ' است.</p>' },
  { h: 'زاویهٔ ' + M('180^\\circ') + ' را «باز» می‌نامیم.', ok: 0, e: '<p>زاویهٔ ' + M('180^\\circ') + ' «مستقیم» است؛ دو ضلعش در یک راستا قرار دارند.</p>' },
  { h: 'زاویهٔ ' + M('89^\\circ') + ' قائمه است.', ok: 0, e: '<p>' + M('89^\\circ') + ' یک درجه از قائمه کم دارد؛ زاویهٔ تند است. قائمه دقیقاً ' + M('90^\\circ') + ' است.</p>' },
  { h: 'اگر پرتوی پایه روی صفرِ سمت راست نقاله باشد، باید از مقیاسی بخوانیم که صفرش سمت راست است.', ok: 1, e: '<p>همیشه از همان مقیاسی می‌خوانیم که صفرش زیر پرتوی پایه است.</p>' },
  { h: 'زاویهٔ ' + M('115^\\circ') + ' زاویهٔ تند است.', ok: 0, e: '<p>تند یعنی کوچک‌تر از ' + M('90^\\circ') + '. ' + M('115^\\circ') + ' باز است.</p>' },
  { h: 'دو زاویهٔ کنار هم روی یک خط راست، با هم ' + M('180^\\circ') + ' می‌شوند.', ok: 1, e: '<p>این دو زاویه با هم یک زاویهٔ مستقیم می‌سازند.</p>' },
  { h: 'ساعت ' + M('3') + ' تمام، زاویهٔ بین دو عقربه قائمه است.', ok: 1, e: '<p>' + M('3\\times30^\\circ=90^\\circ') + '.</p>' },
  { h: 'ساعت ' + M('6') + ' تمام، دو عقربه زاویهٔ ' + M('90^\\circ') + ' می‌سازند.', ok: 0, e: '<p>' + M('6\\times30^\\circ=180^\\circ') + '؛ دو عقربه در یک راستا هستند و زاویه مستقیم است.</p>' },
  { h: 'اگر دو زاویه دهانهٔ برابر داشته باشند، هم‌اندازه‌اند، حتی اگر ضلع‌هایشان طول‌های متفاوتی داشته باشد.', ok: 1, e: '<p>طول ضلع‌ها در اندازهٔ زاویه نقشی ندارد.</p>' },
  { h: 'زاویهٔ تند همیشه از زاویهٔ قائمه بزرگ‌تر است.', ok: 0, e: '<p>تند یعنی از قائمه کوچک‌تر.</p>' }
];
return {
  html: function () {
    var tc = function (d, mk) { return angSVG({ deg: d, rot: d === 180 ? 0 : 90 - d / 2, l1: 52, l2: 52, W: 130, H: 84, mark: mk, fill: false }); };
    return [
      K.sn('۱', 'زاویه یعنی چه؟'),
      '<p>دو پرتو که از یک نقطه شروع شوند یک زاویه می‌سازند. آن نقطه «رأس» و دو پرتو «ضلع‌های» زاویه‌اند. اندازهٔ زاویه می‌گوید دهانهٔ دو ضلع چقدر باز است و آن را با «درجه» می‌سنجیم. دهانه را باز و بسته کن و ببین نوع زاویه چطور عوض می‌شود:</p><div class="cover g-act" id="am" style="animation:none"></div>',
      K.box('note', 'درجه', '<p>یک دور کامل ' + M('360^\\circ') + ' و نیم‌دور ' + M('180^\\circ') + ' است. نشانهٔ درجه همان دایرهٔ کوچک ' + M('^\\circ') + ' بالای عدد است.</p>'),

      K.sn('۲', 'چهار نوع زاویه'),
      '<div class="sg sg4"><div class="r1">' + tc(40) + '<b>تند</b><span>کوچک‌تر از ' + M('90^\\circ') + '</span></div><div class="r2">' + tc(90, true) + '<b>قائمه</b><span>دقیقاً ' + M('90^\\circ') + '</span></div><div class="r3">' + tc(130) + '<b>باز</b><span>بین ' + M('90^\\circ') + ' و ' + M('180^\\circ') + '</span></div><div class="r4">' + tc(180) + '<b>مستقیم</b><span>دقیقاً ' + M('180^\\circ') + '</span></div></div>',
      '<p>زاویه‌ها همه‌جا هستند؛ مثلاً بین دو عقربهٔ ساعت. ساعت‌های تمام را امتحان کن (ساعت ' + M('3') + ' قائمه و ساعت ' + M('6') + ' مستقیم است):</p><div class="cover g-act" id="ck" style="animation:none"></div>',
      K.box('err', '⚠ خطای رایج: «تقریباً قائمه» همان قائمه نیست', '<p>زاویهٔ قائمه را با مربع کوچکِ رأس نشان می‌دهند. زاویه‌ای که فقط «به قائمه شبیه است» را قائمه نگیر؛ ' + M('88^\\circ') + ' و ' + M('92^\\circ') + ' قائمه نیستند.</p>'),

      K.sn('۳', 'اندازه گرفتن با نقاله'),
      '<p>نقاله دو ردیف عدد دارد: یکی از راست شروع می‌شود و دیگری از چپ. سه گام ساده:</p>',
      cards3([{ c: 'r1', h: M('1'), t: 'اول با چشم حدس بزن: تند است یا باز؟' }, { c: 'r2', h: M('2'), t: 'ببین کدام پرتو روی صفر است.' }, { c: 'r3', h: M('3'), t: 'از همان مقیاسی بخوان که صفرش زیر آن پرتوست.' }]),
      fig1(protSVG({ deg: 65, base: 'R', hi: true, zero: true }), 'پرتوی پایه روی صفرِ راست است؛ از مقیاس بیرونی می‌خوانیم: ' + M('65^\\circ')),
      '<p>خودت امتحان کن: پرتوی پایه را عوض کن و ببین کدام مقیاس درست است:</p><div class="cover g-act" id="pl" style="animation:none"></div>',
      K.box('err', '⚠ خطای رایج: خواندن از مقیاس اشتباه', '<p>اگر زاویه تند است و عددی بزرگ‌تر از ' + M('90') + ' خوانده‌ای (یا برعکس)، حتماً از مقیاس دیگر خوانده‌ای. حدس اولیه با چشم، بهترین بازبین توست؛ مثلاً ' + M('65^\\circ') + ' و ' + M('115^\\circ') + ' با هم جمعشان ' + M('180') + ' می‌شود.</p>'),

      K.sn('۴', 'کدام زاویه بزرگ‌تر است؟'),
      '<p>اندازهٔ زاویه به میزان باز بودن دو ضلع بستگی دارد، نه به طول آن‌ها. این دو زاویه هر دو ' + M('50^\\circ') + ' هستند، با ضلع‌هایی کوتاه و بلند:</p>',
      figs2(angSVG({ deg: 50, rot: 0, l1: 70, l2: 70, W: 190, H: 120 }), 'ضلع‌های کوتاه', angSVG({ deg: 50, rot: 0, l1: 125, l2: 125, W: 190, H: 120 }), 'ضلع‌های بلند'),
      '<p>برای مقایسهٔ دو زاویه، یکی را روی دیگری می‌گذاریم: رأس‌ها و یک ضلع روی هم، و ضلع دوم هر کدام بازتر باشد، زاویه‌اش بزرگ‌تر است:</p><div class="cover g-act" id="ov" style="animation:none"></div>',

      K.sn('۵', 'مسئله‌های کامل'),
      '<h4>مثال اول: خواندن نقاله</h4><p>پرتوی پایه روی صفر سمت چپ است و پرتوی دوم روی عدد ' + M('50') + ' مقیاس درونی افتاده. اندازهٔ زاویه:</p>', K.dm('50^\\circ\\ \\Rightarrow\\ \\text{تند}'),
      '<h4>مثال دوم: روی خط راست</h4><p>اگر یک زاویه ' + M('65^\\circ') + ' باشد، زاویهٔ کنارش روی خط راست:</p>', K.dm('180-65=115'), '<p>و آن ' + M('115^\\circ') + ' یک زاویهٔ باز است.</p>',
      '<h4>مثال سوم: ساعت ' + M('4') + '</h4><p>هر ساعت ' + M('30^\\circ') + ' است؛ پس در ساعت ' + M('4') + ':</p>', K.dm('4\\times30=120'), '<p>' + M('120^\\circ') + ' یعنی زاویهٔ باز.</p>',

      K.sn('۶', 'کارت مرجع'),
      refs([{ c: 'r1', t: 'تند', r: 'کوچک‌تر از قائمه.', e: '0^\\circ\\lt x\\lt90^\\circ' }, { c: 'r2', t: 'قائمه', r: 'گوشهٔ کاغذ، با مربع کوچک.', e: 'x=90^\\circ' }, { c: 'r3', t: 'باز', r: 'بازتر از قائمه، کم‌تر از خط راست.', e: '90^\\circ\\lt x\\lt180^\\circ' }, { c: 'r4', t: 'مستقیم', r: 'دو ضلع در یک راستا.', e: 'x=180^\\circ' }, { c: 'r1', t: 'نقاله', r: 'از مقیاسِ صفرِ زیر پرتوی پایه بخوان.', e: '65^\\circ\\ \\text{نه}\\ 115^\\circ' }, { c: 'r3', t: 'روی خط راست', r: 'مجموع دو زاویهٔ کنار هم ۱۸۰ است.', e: 'x+y=180^\\circ' }]),

      K.sn('۷', 'زاویه‌یاب'),
      '<p>هر مرحله با دو پاسخ درست تمام می‌شود. بعد از هر پاسخ، دلیلش را می‌بینی.</p><div class="cover g-act" id="ss" style="animation:none"></div>',
      K.sn('۸', 'درست یا نادرست؟'),
      '<p>شش جمله را بسنج. به تله‌ها دقت کن.</p><div class="cover g-act" id="tf" style="animation:none"></div>',
      K.sn('۹', 'تمرین پایانی'),
      '<p>پنج سؤال با اندازه‌ها و شکل‌های تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover g-act" id="fn" style="animation:none"></div>',
      K.box('sum', 'بعد از این درس باید بتوانی', T`<ul><li>تند، قائمه، باز و مستقیم را از روی شکل و از روی اندازه تشخیص بدهی.</li><li>با نقاله، از مقیاسِ صفرِ زیر پرتوی پایه، اندازهٔ زاویه را بخوانی.</li><li>بدانی اندازهٔ زاویه به طول ضلع‌ها بستگی ندارد و دو زاویه را با دهانه‌شان مقایسه کنی.</li><li>بدانی دو زاویهٔ کنار هم روی خط راست، مجموعشان $180^\circ$ است.</li></ul>`)
    ].join('');
  },
  init: function (panel) {
    K.angLab(panel.querySelector('#am')); K.clockLab(panel.querySelector('#ck')); K.protLab(panel.querySelector('#pl')); K.overLab(panel.querySelector('#ov'));
    K.stepRun(panel.querySelector('#ss'), [{ n: 'نوع زاویه', gen: genA1 }, { n: 'خواندن نقاله', gen: genA2 }, { n: 'مقایسه و خط راست', gen: genA3 }], { done: 'حالا برو سراغ تله‌ها.' });
    K.tfRun(panel.querySelector('#tf'), TFP);
    K.finalRun(panel.querySelector('#fn'), [genA1, genA2, genA2, genA3, genA3], { top: 'عالی بود! زاویه‌ها را کاملاً می‌شناسی.' });
  }
};

  }
};
