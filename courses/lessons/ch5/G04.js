/* درس مهارت G04 — تشابه مثلث‌ها و تناسب ضلع‌های متناظر (فصل ۵) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.G04 = {
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
var fan = function (v) { return fa(nf(v)).replace('.', '٫'); };
function uniqBy(arr, key) { var s = {}; return arr.filter(function (x) { var k = key(x); if (s[k]) { return false; } s[k] = 1; return true; }); }
var refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };
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


css('css-G04', '.pcard{display:flex;flex-direction:column;align-items:center;gap:0;width:100%}.pcard b{font-size:.95rem}.g-act .mc .opt.on{background:var(--mark)}.g-act .mc .opt{height:auto;padding:6px 4px}');
var BASES = [[3, 4, 5], [4, 5, 6], [2, 3, 4], [5, 6, 7], [3, 5, 6], [4, 6, 8], [6, 8, 10], [3, 4, 6]];
var ANGS = [[40, 60, 80], [30, 60, 90], [50, 60, 70], [45, 45, 90], [35, 55, 90], [40, 50, 90], [30, 70, 80], [50, 50, 80], [35, 65, 80], [20, 60, 100]];
/* ---------- آزمایشگاه ۱: بزرگ‌نمایی ---------- */
K.zoomLab = function (host) {
  host.innerHTML = rr('<p class="ask">مثلث آبی را بزرگ و کوچک کن؛ ضلع‌ها و زاویه‌ها را زیر نظر بگیر:</p><div id="zmf"></div><div class="gval" id="zmv"></div><p class="legend" id="zml"></p>' + gslider('zmr', 50, 200, 100, 10, [50, 100, 150, 200].map(function (v) { return { v: v, t: M(String(v / 100)) }; }), 'ضریب بزرگ‌نمایی'));
  var inp = host.querySelector('#zmr');
  function paint() {
    var k = +inp.value / 100, u = 30, ox = 44, oy = 244, s = sv(300, 262), O = [ox, oy], pa = [ox + 3 * u, oy], pb = [ox, oy - 4 * u], qa = [ox + 3 * u * k, oy], qb = [ox, oy - 4 * u * k];
    s += '<polygon points="' + [O, qa, qb].map(function (p) { return f2(p[0]) + ',' + f2(p[1]); }).join(' ') + '" fill="rgba(214,69,122,.14)" stroke="' + PINK + '" stroke-width="3" stroke-linejoin="round"/>';
    s += '<polygon points="' + [O, pa, pb].map(function (p) { return p.join(','); }).join(' ') + '" fill="rgba(76,95,213,.14)" stroke="' + BLUE + '" stroke-width="3" stroke-linejoin="round"/>';
    s += rmark(O, qa, qb, 12, INK) + arcP(qa, qb, O, 20, PINK) + arcP(qb, O, qa, 20, PINK);
    s += stx(fan(3 * k), (O[0] + qa[0]) / 2, oy + 14, { fs: 12, b: 1, c: PINK }) + stx(fan(4 * k), ox - 17, (O[1] + qb[1]) / 2, { fs: 12, b: 1, c: PINK });
    s += stx(fa(53) + '°', qa[0] - 36, qa[1] - 10, { fs: 11, b: 1, c: PINK }) + stx(fa(37) + '°', qb[0] + 26, qb[1] + 28, { fs: 11, b: 1, c: PINK });
    host.querySelector('#zmf').innerHTML = s + '</svg>';
    host.querySelector('#zmv').innerHTML = '<i class="b">' + fa(3) + ' ← ' + fan(3 * k) + '</i><i class="b">' + fa(4) + ' ← ' + fan(4 * k) + '</i><i class="b">' + fa(5) + ' ← ' + fan(5 * k) + '</i>';
    host.querySelector('#zml').innerHTML = rr('هر ضلع در ' + M(nf(k)) + ' ضرب شد؛ پس نسبت هر ضلعِ جدید به ضلعِ قدیمی همان ' + M(nf(k)) + ' است. زاویه‌ها ' + M('37^\\circ') + ' و ' + M('53^\\circ') + ' و ' + M('90^\\circ') + ' ماندند.');
  }
  inp.addEventListener('input', paint); paint();
};
/* ---------- آزمایشگاه ۲: جفتِ متشابه ---------- */
K.pairLab = function (host) {
  var T, sel, done, ans, NAMS = ['P', 'Q', 'R', 'S'];
  function nw() {
    var b = shuffle(pick(ANGS).slice()), a = b[0], c = b[1], d = b[2], tr = [], used = {}, k = function (z) { return z.slice().sort().join(); };
    used[k(b)] = 1; var s2 = shuffle(b.slice()); tr.push(b, s2);
    var y = pick([30, 35, 40, 45, 50, 55, 60, 65, 70, 75]); var z1 = [a, y, 180 - a - y]; if (used[k(z1)] || y === c || y === d || 180 - a - y < 20) { y = pick([25, 85]); z1 = [a, y, 180 - a - y]; }
    used[k(z1)] = 1; tr.push(z1);
    var z2 = [c + 10, d - 10, a]; if (used[k(z2)] || z2.some(function (v) { return v < 20; })) { z2 = [a + 5, c + 5, d - 10]; }
    tr.push(z2);
    T = shuffle(tr.map(function (v, i) { return { a: v, sim: i < 2 }; })); sel = []; done = false; ans = T.map(function (t, i) { return t.sim ? i : -1; }).filter(function (i) { return i >= 0; });
  }
  function paint() {
    var h = '<p class="ask">دو مثلثی را که متشابه‌اند انتخاب کن:</p><div class="mc m2" id="plg">';
    T.forEach(function (t, i) {
      var cls = done ? (ans.indexOf(i) > -1 ? ' right' : (sel.indexOf(i) > -1 ? ' wrong' : '')) : (sel.indexOf(i) > -1 ? ' on' : '');
      h += '<button type="button" class="btn opt' + cls + '" data-i="' + i + '"' + (done ? ' disabled' : '') + '><span class="pcard"><b>مثلث ' + NAMS[i] + '</b>' + triSVG({ pts: rotPts(triFromAng(t.a[0], t.a[1], 100), 12 * (i + 1)), names: ['', '', ''], al: t.a.map(function (v) { return fa(v) + '°'; }), arcs: true, W: 200, H: 150, pad: 36 }).replace('<svg class="gsv"', '<svg class="gsv" style="width:100%;max-width:190px"') + '</span></button>';
    });
    h += '</div>';
    if (done) { var ok = sel.slice().sort().join() === ans.slice().sort().join(); h += '<div class="fb ' + (ok ? 'ok' : 'bad') + '">' + (ok ? '✓ درست است!' : 'این دو متشابه نیستند.') + '</div><div class="ex"><p>مثلث ' + NAMS[ans[0]] + ' و ' + NAMS[ans[1]] + ' زاویه‌های یکسان دارند (فقط ترتیبشان فرق می‌کند)، پس متشابه‌اند. برابر بودنِ یک زاویه کافی نیست؛ همهٔ زاویه‌ها باید پشت‌سرهم یکی شوند (دو زاویهٔ برابر کافی است، چون سومی خودکار برابر می‌شود).</p></div>'; }
    h += '<div class="opts g-ops"><button type="button" class="btn" data-nw="1" data-scroll>مجموعهٔ دیگر</button></div>';
    host.innerHTML = rr(h);
    host.querySelectorAll('.opt.on').forEach(function (b) { b.style.background = 'var(--mark)'; });
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.nw) { nw(); paint(); return; }
    if (b.dataset.i !== undefined && !done) { var i = +b.dataset.i, p = sel.indexOf(i); if (p > -1) { sel.splice(p, 1); } else { sel.push(i); } if (sel.length === 2) { done = true; } paint(); }
  });
  nw(); paint();
};
/* ---------- آزمایشگاه ۳: ضلعِ متناظر ---------- */
K.corrLab = function (host) {
  var base, k, rot, s = 0;
  function nw() { base = pick(BASES); k = pick([2, 3]); rot = R(30, 330); s = 0; }
  function paint() {
    var cols = [TEAL, PINK, BLUE], n1 = ['A', 'B', 'C'], n2 = ['D', 'E', 'F'], a = base, b = a.map(function (v) { return v * k; });
    var f1 = triSVG({ pts: triFromSides(a[0], a[1], a[2]), names: n1, hl: { side: s, c: cols[s] }, sl: a.map(fa), slc: INK, hit: true, W: 220, H: 170, pad: 34 });
    var f2_ = triSVG({ pts: rotPts(triFromSides(b[0], b[1], b[2]), rot), names: n2, hl: { side: s, c: cols[s] }, sl: b.map(fa), slc: INK, W: 220, H: 170, pad: 34 });
    var nm = ['AB↔DE', 'BC↔EF', 'CA↔FD'];
    host.innerHTML = rr('<p class="ask">روی یکی از ضلع‌های مثلث ABC بزن؛ ضلعِ متناظرش در DEF روشن می‌شود:</p><div class="figs"><figure>' + f1 + '<figcaption>مثلث ABC</figcaption></figure><figure>' + f2_ + '<figcaption>مثلث DEF</figcaption></figure></div><div class="gval"><i class="' + (s === 0 ? 'g' : s === 1 ? 'p' : 'b') + '">' + [sideNmL(0), sideNmL(1), sideNmL(2)][s] + '</i><i>' + fa(a[s]) + ' ← ' + fa(b[s]) + '</i></div><p class="legend">حرف‌ها به ترتیب متناظرند: ABC ~ DEF؛ پس AB با DE ، BC با EF و CA با FD متناظرند. نسبتِ هر دو ضلعِ متناظر برابر ' + fa(k) + ' است.</p>');
  }
  function sideNmL(i) { return ['AB متناظر DE', 'BC متناظر EF', 'CA متناظر FD'][i]; }
  host.addEventListener('click', function (e) { var l = e.target.closest('.hitline'); if (l) { s = +l.dataset.s; paint(); } });
  host.addEventListener('keydown', function (e) { var l = e.target.closest && e.target.closest('.hitline'); if (l && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); s = +l.dataset.s; paint(); } });
  nw(); paint();
};
/* ---------- آزمایشگاه ۴: سایه‌سنج ---------- */
K.shadowLab = function (host) {
  host.innerHTML = rr('<p class="ask">ارتفاع خورشید را عوض کن؛ میله‌ای به ارتفاع ' + M('2') + ' متر و درختی به ارتفاع ' + M('8') + ' متر را ببین:</p><div id="shf"></div><div class="gval" id="shv"></div><p class="legend" id="shl"></p>' + gslider('shr', 35, 70, 50, 5, [35, 45, 55, 70].map(function (v) { return { v: v, t: M(v + '^\\circ') }; }), 'زاویهٔ تابش خورشید'));
  var inp = host.querySelector('#shr');
  function scene(h, sh, px, W, H) {
    var g = H - 24, s = sv(W, H), x0 = 40, top = [x0, g - h * px], end = [x0 + sh * px, g];
    s += sln([6, g], [W - 6, g], INK, 3) + sln([x0, g], top, INK, 5) + sln(top, end, '#e08a00', 2.2, 1) + sln([x0, g], end, BLUE, 5) + rmark([x0, g], top, end, 11, INK);
    s += '<circle cx="' + top[0] + '" cy="' + top[1] + '" r="4" fill="' + INK + '"/>' + stx(fa(h) + ' متر', x0 + 12, g - h * px / 2, { fs: 12, b: 1, c: INK, a: 'start' }) + stx(fan(sh) + ' متر', x0 + sh * px / 2, g + 15, { fs: 12, b: 1, c: BLUE });
    return s + '</svg>';
  }
  function paint() {
    var th = +inp.value, t = Math.tan(th * D2R), s1 = 2 / t, s2 = 8 / t, px = 17;
    host.querySelector('#shf').innerHTML = scene(2, s1, px, 330, 92) + scene(8, s2, px, 330, 178);
    host.querySelector('#shv').innerHTML = '<i class="g">' + fa(2) + ' ÷ ' + fan(s1) + ' = ' + fan(2 / s1) + '</i><i class="p">' + fa(8) + ' ÷ ' + fan(s2) + ' = ' + fan(8 / s2) + '</i>';
    host.querySelector('#shl').innerHTML = 'هر دو مثلثِ سایه با پرتوی خورشید زاویه‌های یکسان دارند؛ پس متشابه‌اند و نسبتِ ارتفاع به سایه در هر دو یکی است (اینجا ' + fan(t) + ').';
  }
  inp.addEventListener('input', paint); paint();
};
/* ---------- تمرین عددی: ضلع گمشده در دو مثلث متشابه ---------- */
function simData() {
  var base = pick(BASES), k = pick([2, 3]), flip = R(0, 1), a = base.map(function (v) { return v * k; }), b = base.slice(), i = R(0, 2), j = (i + R(1, 2)) % 3, T1 = flip ? a : b, T2 = flip ? b : a;
  return { T1: T1, T2: T2, i: i, j: j, rot: R(30, 330) };
}
function simFig(d) {
  var n1 = ['A', 'B', 'C'], n2 = ['D', 'E', 'F'], s1 = ['', '', ''], s2 = ['', '', ''];
  s1[d.i] = fa(d.T1[d.i]); s1[d.j] = fa(d.T1[d.j]); s2[d.i] = fa(d.T2[d.i]); s2[d.j] = 'x';
  return figs2(triSVG({ pts: triFromSides(d.T1[0], d.T1[1], d.T1[2]), names: n1, sl: s1, slc: BLUE, W: 220, H: 170, pad: 34 }), 'مثلث ABC', triSVG({ pts: rotPts(triFromSides(d.T2[0], d.T2[1], d.T2[2]), d.rot), names: n2, sl: s2, slc: BLUE, W: 220, H: 170, pad: 34 }), 'مثلث DEF');
}
var SN1 = ['AB', 'BC', 'CA'], SN2 = ['DE', 'EF', 'FD'];
function genPP() {
  var d = simData(), x = d.T2[d.j];
  return {
    ask: 'دو مثلث ABC و DEF متشابه‌اند (رأس‌ها به همین ترتیب متناظرند). طول x را بنویس.', fig: simFig(d), ans: x, unit: 'واحد',
    hint: 'اول ضلع‌های متناظر را بنویس؛ سپس نسبتِ ' + SN1[d.i] + ' به ' + SN2[d.i] + ' را برابر نسبتِ ' + SN1[d.j] + ' به ' + SN2[d.j] + ' بگذار. به‌جای جمع‌وتفریق، ضرب و تقسیم.',
    expl: function () { return '<p>ضلع‌های متناظر: ' + M(SN1[d.i]) + ' با ' + M(SN2[d.i]) + ' و ' + M(SN1[d.j]) + ' با ' + M(SN2[d.j]) + '.</p>' + K.dm('\\dfrac{' + d.T1[d.i] + '}{' + d.T2[d.i] + '}=\\dfrac{' + d.T1[d.j] + '}{x}') + K.dm('x=\\dfrac{' + d.T1[d.j] + '\\times' + d.T2[d.i] + '}{' + d.T1[d.i] + '}=' + x); }
  };
}
/* ================= تولید سؤال ================= */
function genD1() {
  var b = pick(ANGS), a = b[0], c = b[1], d = b[2], sh = shuffle(b.slice()), y = pick([30, 35, 40, 45, 50, 55, 60, 65, 70]);
  var z1 = [a, y, 180 - a - y]; if (y === c || y === d || z1.some(function (v) { return v < 20; })) { y = 25; z1 = [a, y, 180 - a - y]; }
  var z2 = [c + 10, d - 10, a]; if (z2.some(function (v) { return v < 20; })) { z2 = [a + 5, c + 5, d - 10]; }
  var rows = shuffle([{ v: b, s: 1 }, { v: sh, s: 1 }, { v: z1, s: 0 }, { v: z2, s: 0 }]), N = ['P', 'Q', 'R', 'S'], sim = rows.map(function (r, i) { return r.s ? i : -1; }).filter(function (i) { return i >= 0; });
  var tbl = K.tbl(['مثلث', 'زاویهٔ اول', 'زاویهٔ دوم', 'زاویهٔ سوم'], rows.map(function (r, i) { return [M(N[i])].concat(r.v.map(function (v) { return M(v + '^\\circ'); })); }));
  var pairs = [], i, j; for (i = 0; i < 4; i++) { for (j = i + 1; j < 4; j++) { pairs.push([i, j]); } }
  var ok = pairs.filter(function (p) { return p[0] === sim[0] && p[1] === sim[1]; })[0], wr = shuffle(pairs.filter(function (p) { return p !== ok; })).slice(0, 3);
  return {
    ask: 'اندازهٔ زاویه‌های چهار مثلث در جدول داده شده است. کدام دو مثلث با هم متشابه‌اند؟', fig: tbl, cq: '', cls: 'm2',
    opts: mkO({ t: M(N[ok[0]]) + ' و ' + M(N[ok[1]]) }, wr.map(function (p) { return { t: M(N[p[0]]) + ' و ' + M(N[p[1]]), m: rows[p[0]].v.slice().sort().join() === rows[p[1]].v.slice().sort().join() ? '' : 'زاویه‌های این دو مثلث یکی نیستند؛ فقط بعضی‌هایشان برابر است و برای تشابه همهٔ زاویه‌ها باید برابر شوند.' }; }), true),
    expl: function () { return '<p>مثلث‌های ' + M(N[ok[0]]) + ' و ' + M(N[ok[1]]) + ' هر سه زاویهٔ یکسان دارند؛ فقط ترتیب نوشتنشان فرق می‌کند. پس متشابه‌اند. دو مثلثی که فقط یک زاویهٔ برابر دارند متشابه نیستند.</p>'; }
  };
}
function genD2() {
  var a = pick([[50, 60], [40, 70], [45, 65], [35, 75]]), k = pick([1.6, 2, 2.4]), rot = R(20, 340), n1 = pick([['A', 'B', 'C'], ['K', 'L', 'M']]), n2 = pick([['D', 'E', 'F'], ['P', 'Q', 'R']]);
  var p1 = triFromAng(a[0], a[1], 100), p2 = rotPts(triFromAng(a[0], a[1], 100 * k), rot);
  var s = [0, 1, 2].map(function (i) { return n1[i] + n1[(i + 1) % 3]; }), t = [0, 1, 2].map(function (i) { return n2[i] + n2[(i + 1) % 3]; });
  var fr = function (x, y) { return '\\dfrac{' + x + '}{' + y + '}'; };
  return {
    ask: 'دو مثلث ' + M(n1.join('')) + ' و ' + M(n2.join('')) + ' متشابه‌اند (رأس‌ها به همین ترتیب متناظرند). کدام تناسب درست است؟', fig: figs2(triSVG({ pts: p1, names: n1, W: 220, H: 170, pad: 34 }), 'مثلث ' + n1.join(''), triSVG({ pts: p2, names: n2, W: 220, H: 170, pad: 34 }), 'مثلث ' + n2.join('')), cq: '', cls: 'm1',
    opts: mkO({ t: M(fr(s[0], t[0]) + '=' + fr(s[1], t[1])) }, [{ t: M(fr(s[0], t[0]) + '=' + fr(t[1], s[1])), m: 'یک طرف تناسب را وارونه نوشته‌ای؛ باید در هر دو نسبت ضلعِ مثلثِ اول بالا باشد.' }, { t: M(fr(s[0], t[1]) + '=' + fr(s[1], t[0])), m: s[0] + ' با ' + t[0] + ' متناظر است، نه ' + t[1] + ' (ترتیب حرف‌ها).' }, { t: M(fr(s[0], t[0]) + '=' + fr(s[2], t[1])), m: s[2] + ' با ' + t[2] + ' متناظر است، نه ' + t[1] + '.' }], true),
    expl: function () { return '<p>چون رأس‌ها به ترتیب متناظرند، ' + M(s[0]) + ' با ' + M(t[0]) + ' و ' + M(s[1]) + ' با ' + M(t[1]) + ' متناظرند؛ نسبتِ این ضلع‌های متناظر با هم برابر است.</p>' + K.dm(fr(s[0], t[0]) + '=' + fr(s[1], t[1])); }
  };
}
function genD3() {
  if (R(0, 1)) {
    var d = simData(), x = d.T2[d.j], i = d.i, j = d.j, a1 = d.T1[i], a2 = d.T2[i], b1 = d.T1[j];
    return {
      ask: 'دو مثلث ABC و DEF متشابه‌اند (رأس‌ها به همین ترتیب متناظرند). طول x را بنویس.', fig: simFig(d), cq: '', cls: 'm2',
      opts: numO(x, [{ v: b1 + (a2 - a1), m: 'اختلافِ طول‌ها را اضافه کرده‌ای؛ تشابه یعنی ضرب‌شدن ضلع‌ها در یک عدد، نه افزودن.' }, { v: Math.round(b1 * a1 / a2), m: 'نسبت را وارونه گذاشته‌ای (ضلع‌های متناظر باید روی هم قرار بگیرند).' }, { v: a1 + a2 + b1 - a1, m: 'ضلع‌ها را جمع نمی‌کنیم؛ تناسب می‌نویسیم.' }, { v: a2 - a1 + b1 + 1, m: 'تناسب بنویس و ضرب‌درضرب کن.' }]),
      expl: function () { return '<p>' + M(SN1[i]) + ' با ' + M(SN2[i]) + ' و ' + M(SN1[j]) + ' با ' + M(SN2[j]) + ' متناظرند:</p>' + K.dm('\\dfrac{' + a1 + '}{' + a2 + '}=\\dfrac{' + b1 + '}{x}\\ \\Rightarrow\\ x=\\dfrac{' + b1 + '\\times' + a2 + '}{' + a1 + '}=' + x); }
    };
  }
  var h1 = pick([2, 3, 4]), s1 = pick([3, 4, 5]), k = pick([3, 4, 5]), s2 = s1 * k, h2 = h1 * k;
  return {
    ask: 'سایهٔ میله‌ای به ارتفاع ' + M(h1) + ' متر روی زمین ' + M(s1) + ' متر است. در همان لحظه سایهٔ یک درخت ' + M(s2) + ' متر است. ارتفاع درخت چند متر است؟ <small>(پرتوهای خورشید در یک لحظه موازی‌اند.)</small>', fig: '', cq: '', cls: 'm2',
    opts: numO(h2, [{ v: h1 + (s2 - s1), m: 'اختلاف سایه‌ها را به ارتفاع اضافه کرده‌ای؛ تشابه یعنی ضرب، نه جمع.' }, { v: Math.round(s2 * s1 / h1), m: 'نسبت را وارونه یا نادرست گذاشته‌ای؛ ارتفاع با ارتفاع و سایه با سایه متناظر است.' }, { v: s2 + h1, m: 'جمع‌کردن عددها تناسب نیست.' }, { v: s2, m: 'این طول سایهٔ درخت است، نه ارتفاعش.' }]),
    expl: function () { return '<p>میله و سایه‌اش با درخت و سایه‌اش دو مثلث قائم‌الزاویهٔ متشابه می‌سازند (زاویهٔ خورشید یکی است):</p>' + K.dm('\\dfrac{' + h1 + '}{' + s1 + '}=\\dfrac{h}{' + s2 + '}\\ \\Rightarrow\\ h=\\dfrac{' + h1 + '\\times' + s2 + '}{' + s1 + '}=' + h2); }
  };
}
var TFP = [
  { h: 'در دو مثلث متشابه، زاویه‌های متناظر برابرند.', ok: 1, e: '<p>این اولین ویژگی مثلث‌های متشابه است.</p>' },
  { h: 'مثلث‌های متشابه حتماً ضلع‌های هم‌اندازه دارند.', ok: 0, e: '<p>متشابه یعنی هم‌شکل، نه هم‌اندازه؛ مثل یک عکس و بزرگ‌شدهٔ آن.</p>' },
  { h: 'اگر دو زاویهٔ یک مثلث با دو زاویهٔ مثلثی دیگر برابر باشند، آن دو مثلث متشابه‌اند.', ok: 1, e: '<p>زاویهٔ سوم هر دو از ' + M('180') + ' کم‌کردن به دست می‌آید و آن‌هم برابر است.</p>' },
  { h: 'مثلثی با زاویه‌های ' + M('40^\\circ') + ' ، ' + M('60^\\circ') + ' و ' + M('80^\\circ') + ' با مثلثی با زاویه‌های ' + M('40^\\circ') + ' ، ' + M('70^\\circ') + ' و ' + M('70^\\circ') + ' متشابه است.', ok: 0, e: '<p>فقط یک زاویه برابر است؛ بقیه فرق دارند.</p>' },
  { h: 'مثلثی با ضلع‌های ' + M('3') + ' ، ' + M('4') + ' و ' + M('5') + ' با مثلثی با ضلع‌های ' + M('6') + ' ، ' + M('8') + ' و ' + M('10') + ' متشابه است.', ok: 1, e: '<p>هر ضلع ' + M('2') + ' برابر شده است.</p>' },
  { h: 'در دو مثلث متشابه، نسبتِ هر دو ضلعِ متناظر عددی ثابت است.', ok: 1, e: '<p>این عدد همان «ضریب بزرگ‌نمایی» است.</p>' },
  { h: 'در دو مثلث متشابه، تفاضلِ طولِ ضلع‌های متناظر ثابت است.', ok: 0, e: '<p>نسبت ثابت است، نه تفاضل. مثلاً ' + M('3\\to6') + ' و ' + M('4\\to8') + '؛ تفاضل‌ها ' + M('3') + ' و ' + M('4') + ' هستند.</p>' },
  { h: 'اگر مثلث‌های ' + M('ABC') + ' و ' + M('DEF') + ' متشابه باشند و رأس‌ها به همین ترتیب متناظر، آنگاه ' + M('AB') + ' با ' + M('DE') + ' متناظر است.', ok: 1, e: '<p>ترتیب حرف‌ها تعیین می‌کند چه چیزی با چه چیزی متناظر است.</p>' },
  { h: 'اگر ' + M('ABC\\sim DEF') + ' باشد، آنگاه ' + M('AB') + ' با ' + M('EF') + ' متناظر است.', ok: 0, e: '<p>' + M('AB') + ' با ' + M('DE') + ' و ' + M('BC') + ' با ' + M('EF') + ' متناظر است.</p>' },
  { h: 'همهٔ مثلث‌های متساوی‌الاضلاع با هم متشابه‌اند.', ok: 1, e: '<p>هر سه زاویه‌شان ' + M('60^\\circ') + ' است.</p>' },
  { h: 'اگر نسبتِ دو ضلعِ متناظر ' + M('2') + ' باشد، نسبتِ سایر ضلع‌های متناظر هم ' + M('2') + ' است.', ok: 1, e: '<p>نسبتِ همهٔ ضلع‌های متناظر یکی است.</p>' },
  { h: 'برای حل تناسب باید طول‌ها را با هم جمع کنیم.', ok: 0, e: '<p>تناسب را ضرب‌درضرب می‌کنیم؛ جمع‌وتفریق ما را به جواب نمی‌رساند.</p>' }
];
return {
  html: function () {
    return [
      K.sn('۱', 'متشابه یعنی هم‌شکل'),
      '<p>عکسی را که روی صفحه بزرگ یا کوچک می‌کنی، شکلش عوض نمی‌شود؛ فقط اندازه‌اش عوض می‌شود. دو مثلثِ «متشابه» هم همین‌طورند: هم‌شکل، ولی لزوماً هم‌اندازه نیستند. مثلث آبی را بزرگ و کوچک کن (ضریب بزرگ‌نمایی را عوض کن) و ببین چه چیزهایی می‌ماند و چه چیزهایی تغییر می‌کند:</p><div class="cover g-act" id="zm" style="animation:none"></div>',
      K.box('note', 'دو ویژگیِ مثلث‌های متشابه', '<p>۱) زاویه‌های متناظرشان برابرند. ۲) نسبتِ ضلع‌های متناظرشان با هم برابر است (همان ضریب بزرگ‌نمایی).</p>'),

      K.sn('۲', 'تشخیص تشابه با زاویه‌ها'),
      '<p>برای فهمیدن متشابه‌بودن دو مثلث کافی است زاویه‌ها را مقایسه کنیم. اگر دو زاویه برابر باشند، زاویهٔ سوم هم برابر می‌شود (چون مجموع ' + M('180^\\circ') + ' است). ترتیبِ نوشتنِ زاویه‌ها مهم نیست؛ مثلاً ' + M('40,60,80') + ' و ' + M('80,60,40') + ' یک مثلث‌اند. دو مثلثِ متشابه را از بین چهار مثلث پیدا کن:</p><div class="cover g-act" id="mt" style="animation:none"></div>',
      K.box('err', '⚠ خطای رایج: «یک زاویهٔ برابر کافی است»', '<p>فقط وقتی مثلث‌ها متشابه‌اند که همهٔ زاویه‌هایشان برابر شوند. اگر فقط یکی را برابر ببینی، مثلاً ' + M('40^\\circ') + ' و ' + M('40^\\circ') + ' ، نمی‌شود نتیجه گرفت.</p>'),

      K.sn('۳', 'ضلع‌های متناظر'),
      '<p>ضلع‌های متناظر آن‌هایی‌اند که روبه‌روی زاویه‌های برابرند. وقتی می‌نویسیم ' + M('ABC\\sim DEF') + ' ، حرف‌ها به ترتیب متناظرند: ' + M('A\\leftrightarrow D') + ' ، ' + M('B\\leftrightarrow E') + ' ، ' + M('C\\leftrightarrow F') + '. پس ' + M('AB') + ' با ' + M('DE') + ' ، ' + M('BC') + ' با ' + M('EF') + ' و ' + M('CA') + ' با ' + M('FD') + ' متناظرند. مثلث دوم چرخیده است ولی تناظر عوض نمی‌شود. یک ضلع انتخاب کن:</p><div class="cover g-act" id="co" style="animation:none"></div>',

      K.sn('۴', 'نوشتن و حل تناسب'),
      '<p>نسبتِ ضلع‌های متناظر برابر است؛ پس از دو جفت ضلع متناظر یک تناسب می‌سازیم. اگر ' + M('AB=4') + ' ، ' + M('DE=6') + ' ، ' + M('BC=10') + ' و ' + M('EF=x') + ' باشد:</p>', K.dm('\\dfrac{AB}{DE}=\\dfrac{BC}{EF}\\ \\Rightarrow\\ \\dfrac{4}{6}=\\dfrac{10}{x}'), K.dm('x=\\dfrac{10\\times6}{4}=15'),
      K.box('err', '⚠ دو خطای رایج', '<p>۱) به‌جای ضرب، جمع‌وتفریق کردن: ضلع ' + M('4') + ' شد ' + M('6') + ' ، پس ' + M('10') + ' نمی‌شود ' + M('12') + '. ۲) وارونه‌گذاشتنِ یکی از نسبت‌ها: در هر دو نسبت ضلعِ مثلثِ اول بالا و ضلعِ مثلثِ دوم پایین باشد.</p>'),
      '<p>خودت حل کن؛ هر بار مثلث‌ها و عددها تازه‌اند:</p><div class="cover g-act" id="pp" style="animation:none"></div>',

      K.sn('۵', 'کاربرد: اندازه‌گیری با سایه'),
      '<p>پرتوهای خورشید در یک لحظه موازی‌اند. پس هر جسمی (میله، درخت، ساختمان) با سایه‌اش یک مثلث قائم‌الزاویه می‌سازد و همهٔ این مثلث‌ها زاویه‌های یکسان دارند؛ یعنی متشابه‌اند. خورشید را بالا و پایین ببر و نسبت ارتفاع به سایه را در میله و درخت مقایسه کن:</p><div class="cover g-act" id="sh" style="animation:none"></div>',
      '<p>مثلاً سایهٔ میله‌ای به ارتفاع ' + M('2') + ' متر برابر ' + M('3') + ' متر است و سایهٔ درخت ' + M('12') + ' متر. ارتفاع درخت:</p>', K.dm('\\dfrac{2}{3}=\\dfrac{h}{12}\\ \\Rightarrow\\ h=\\dfrac{2\\times12}{3}=8'),

      K.sn('۶', 'کارت مرجع'),
      refs([{ c: 'r1', t: 'متشابه', r: 'هم‌شکل؛ نه لزوماً هم‌اندازه.', e: 'ABC\\sim DEF' }, { c: 'r2', t: 'زاویه‌ها', r: 'زاویه‌های متناظر برابرند.', e: '\\hat A=\\hat D' }, { c: 'r3', t: 'ضلع‌ها', r: 'نسبت ضلع‌های متناظر ثابت است.', e: '\\dfrac{AB}{DE}=\\dfrac{BC}{EF}' }, { c: 'r4', t: 'ترتیب حرف‌ها', r: 'تناظر را مشخص می‌کند.', e: 'AB\\leftrightarrow DE' }, { c: 'r1', t: 'حل تناسب', r: 'ضرب‌درضرب، نه جمع.', e: 'x=\\dfrac{10\\times6}{4}' }, { c: 'r3', t: 'سایه', r: 'ارتفاع ÷ سایه ثابت است.', e: '\\dfrac{h_1}{s_1}=\\dfrac{h_2}{s_2}' }]),

      K.sn('۷', 'هم‌شکل‌یاب'),
      '<p>هر مرحله با دو پاسخ درست تمام می‌شود. بعد از هر پاسخ، دلیلش را می‌بینی.</p><div class="cover g-act" id="ss" style="animation:none"></div>',
      K.sn('۸', 'درست یا نادرست؟'),
      '<p>شش جمله را بسنج. به تله‌ها دقت کن.</p><div class="cover g-act" id="tf" style="animation:none"></div>',
      K.sn('۹', 'تمرین پایانی'),
      '<p>پنج سؤال با مثلث‌ها و عددهای تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover g-act" id="fn" style="animation:none"></div>',
      K.box('sum', 'بعد از این درس باید بتوانی', T`<ul><li>بگویی متشابه یعنی هم‌شکل و بدانی زاویه‌های متناظر برابرند و نسبت ضلع‌های متناظر ثابت است.</li><li>با مقایسهٔ زاویه‌ها تشخیص بدهی دو مثلث متشابه‌اند یا نه.</li><li>از روی ترتیب حرف‌ها، ضلع‌های متناظر را پیدا کنی و تناسب درست بنویسی.</li><li>تناسب را ضرب‌درضرب حل کنی و در مسئله‌ای مثل سایه به کار ببری.</li></ul>`)
    ].join('');
  },
  init: function (panel) {
    K.zoomLab(panel.querySelector('#zm')); K.pairLab(panel.querySelector('#mt')); K.corrLab(panel.querySelector('#co')); K.numLab(panel.querySelector('#pp'), genPP); K.shadowLab(panel.querySelector('#sh'));
    K.stepRun(panel.querySelector('#ss'), [{ n: 'تشخیص تشابه', gen: genD1 }, { n: 'نوشتن تناسب', gen: genD2 }, { n: 'حل تناسب', gen: genD3 }], { done: 'حالا برو سراغ تله‌ها.' });
    K.tfRun(panel.querySelector('#tf'), TFP);
    K.finalRun(panel.querySelector('#fn'), [genD1, genD2, genD3, genD3, genD3], { top: 'عالی بود! تشابه را کاملاً فهمیده‌ای.' });
  }
};

  }
};
