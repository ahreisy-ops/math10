/* درس مهارت P01 — احتمال ساده در حالت‌های هم‌شانس (فصل ۷) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.P01 = {
  needs: ['utils'],
  setup: function (K0) {
var ML = window.MathLite, fa = ML.fa, rr = ML.renderRich, abs = Math.abs, df = K0.df;
var _u = K0._u, R = _u.R, M = _u.M, shuffle = _u.shuffle;
var K = Object.create(K0);   // K0 = هستهٔ مشترک؛ K = همان + ابزارهای اختصاصی این درس
var T = String.raw;
function css(id, txt) { if (document.getElementById(id)) { return; } var s = document.createElement('style'); s.id = id; s.textContent = txt; document.head.appendChild(s); }
var CL = ['var(--accent)', 'var(--pink)', '#4c5fd5', '#e08a00', 'var(--mark)'], HX = ['#0e8f7e', '#d6457a', '#4c5fd5', '#e08a00', '#ffc233'];
var gcd = function (a, b) { a = abs(a); b = abs(b); while (b) { var t = a % b; a = b; b = t; } return a; };
var pick = function (a) { return a[R(0, a.length - 1)]; };
var tg = function (label, inner) { return '<div class="nleq vd"><span class="tg">' + label + '</span>' + inner + '</div>'; };
var cards3 = function (cells) { return '<div class="sg sg3">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.h + '</b><span>' + c.t + '</span></div>'; }).join('') + '</div>'; };
var refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };
var fr = function (n, d) { var g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : '\\dfrac{' + n + '}{' + d + '}'; };
var frU = function (n, d) { return '\\dfrac{' + n + '}{' + d + '}'; };
var nf = function (v) { var s = String(+(+v).toFixed(4)); return s === '-0' ? '0' : s; };
function uniqBy(arr, key) { var s = {}; return arr.filter(function (x) { var k = key(x); if (s[k]) { return false; } s[k] = 1; return true; }); }
/* جدول فراوانی/داده جمع‌وجور؛ rows: آرایهٔ ردیف‌ها (ردیف اول سرستون) — hl: اندیس ستون برجسته */
/* نمودار ستونی SVG: o={labels,vals,max,step,w,h,hi(اندیس برجسته),showVals,ylab,title,interactive} */

/* ---------- موتورهای تمرین (مشترک بین درس‌ها) ---------- */
/* stages: [{n, gen}] ؛ gen() → {ask, cq, fig, opts:[{h,ok,m}], expl(), cls} */
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

/* ---- استایل اختصاصی؛ فقط از رنگ‌ها و قالب‌های موجود پروژه ---- */
css('css-P01', ['.sg.sg3{grid-template-columns:repeat(3,1fr)}.sg.sg3>div{text-align:center;padding:8px 4px}.sg.sg3 b .katex{font-size:1.3em}','.sg.sg3>div>span{display:block;font-size:.84rem;color:var(--ink-soft);line-height:1.6;margin-top:2px}','.nleq i{display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:3px 11px;line-height:1.3;margin:2px;vertical-align:middle;box-shadow:2px 2px 0 var(--ink)}','.nleq i.n{background:#fff}.nleq.vd{margin:8px 0 12px}.nleq.sm{font-size:1rem}.nleq.sm i{min-height:32px;padding:2px 8px}','.nleq.wrap{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 2px}','.nleq .tg{display:inline-block;font:bold .85rem Tahoma,sans-serif;color:var(--ink-soft);margin:0 6px;direction:rtl;vertical-align:middle}','.nleq .or{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#fff;border:2px solid var(--line);font:bold .8rem Tahoma,sans-serif;direction:rtl;color:var(--ink-soft);vertical-align:middle}','.chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:6px 0 4px;direction:ltr}','.chip{min-width:48px;min-height:42px;border:2px solid var(--ink);border-radius:12px;background:#fff;cursor:pointer;font:inherit;color:var(--ink);padding:2px 10px;box-shadow:2px 2px 0 var(--ink)}','.chip:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}.chip.on{background:var(--mark)}.chip.ok{background:#d2f0e9;border-color:var(--accent)}.chip.no{background:#fbd5d5;border-color:#b23a3a}.chip:disabled{opacity:.55;cursor:default}','.mc.m1{grid-template-columns:1fr}.mc.m3{grid-template-columns:repeat(3,1fr)}.mc.m2{grid-template-columns:repeat(2,1fr)}','.opt svg{display:inline-block;width:auto;max-width:none;height:auto}','.cq{direction:ltr;text-align:center;margin:8px 0}.cq .katex{font-size:1.4em}','.legend{text-align:center;font-size:.84rem;color:var(--ink-soft);margin:2px 0 8px}','.sgnrow{display:flex;gap:12px;justify-content:center;margin:10px 0;direction:ltr}.sgnrow .btn{min-width:84px;min-height:54px;font-size:1.1rem;font-weight:bold}','.sgnrow .btn.right{background:#d2f0e9;border-color:var(--accent)}.sgnrow .btn.wrong{background:#fbd5d5;border-color:#b23a3a}.sgnrow .btn:disabled{opacity:1}','.snt{display:block;direction:rtl;font-size:1rem;line-height:1.9;text-align:center}.snt .katex{font-size:1.1em}','.trow{display:flex;gap:10px;align-items:center;justify-content:center;margin:6px 0;direction:ltr}.trow .tm{font:bold 1.1rem Tahoma;flex:none}.trow .tm.oky{color:var(--accent-dark)}.trow .tm.nox{color:#b23a3a}','.ft{border-collapse:separate;border-spacing:0;margin:8px auto;direction:rtl;font-size:.92rem;max-width:100%}','.ft th,.ft td{border:2px solid var(--ink);padding:4px 10px;text-align:center;background:#fff;min-width:42px}','.ft th{background:#e6f6f3;font-weight:bold;color:var(--ink)}.ft td.hl{background:var(--amber)}.ft th.hl{background:var(--mark)}','.ft tr:first-child th:first-child{border-top-right-radius:10px}.ft tr:first-child th:last-child{border-top-left-radius:10px}.ft tr:last-child td:first-child,.ft tr:last-child th:first-child{border-bottom-right-radius:10px}.ft tr:last-child td:last-child{border-bottom-left-radius:10px}','.tblw{overflow-x:auto;direction:ltr;text-align:center}','.ico{display:inline-block;vertical-align:middle}','@media(max-width:520px){.mc.m3{gap:6px}}','.pbar{position:relative;height:16px;border:2.5px solid var(--ink);border-radius:10px;background:linear-gradient(90deg,#fde7ef,#e6f6f3);margin:70px 30px 34px;direction:ltr}','.pbar .pm{position:absolute;bottom:28px;transform:translateX(-50%);background:var(--ink);color:#fff;border-radius:9px;padding:2px 9px;font-weight:bold;white-space:nowrap;line-height:1.3}','.pbar .pm:after{content:"";position:absolute;left:50%;bottom:-6px;margin-left:-6px;border:6px solid transparent;border-top-color:var(--ink);border-bottom:0}','.pbar .pd{position:absolute;top:-3px;width:16px;height:16px;border-radius:50%;border:2.5px solid var(--ink);transform:translateX(-50%);background:var(--c,var(--mark))}','.pbar .pe{position:absolute;top:24px;font:bold .74rem Tahoma,sans-serif;color:var(--ink-soft);white-space:nowrap}','.wheelw{position:relative;width:230px;margin:6px auto}','.wheelw .ptr{position:absolute;left:50%;top:-6px;margin-left:-11px;width:0;height:0;border:11px solid transparent;border-top:20px solid var(--ink);border-bottom:0;z-index:2}','.wheelw svg{display:block;width:100%;height:auto}','.stp{direction:ltr;display:flex;align-items:center;justify-content:center;gap:8px;margin:6px 0}.stp .chip{min-width:42px;font-weight:bold}.stp b{min-width:96px;text-align:center}','.die{display:inline-block;margin:2px}'].join('\n'));
/* ---- شکل‌ها ---- */
function dieFace(n, sz, fill) {
  var P = { 1: [[2, 2]], 2: [[1, 1], [3, 3]], 3: [[1, 1], [2, 2], [3, 3]], 4: [[1, 1], [3, 1], [1, 3], [3, 3]], 5: [[1, 1], [3, 1], [2, 2], [1, 3], [3, 3]], 6: [[1, 1], [3, 1], [1, 2], [3, 2], [1, 3], [3, 3]] }[n], s = '<svg class="ico die" viewBox="0 0 40 40" width="' + sz + '" height="' + sz + '"><rect x="2" y="2" width="36" height="36" rx="7" fill="' + (fill || '#fff') + '" stroke="#14213d" stroke-width="2.5"/>';
  P.forEach(function (p) { s += '<circle cx="' + p[0] * 10 + '" cy="' + p[1] * 10 + '" r="3.6" fill="#14213d"/>'; });
  return s + '</svg>';
}
var MCOL = { 'قرمز': '#d6457a', 'آبی': '#4c5fd5', 'سبز': '#0e8f7e', 'زرد': '#ffc233' };
function marbles(list) {   // list: [{c:'قرمز', n:3}, ...]
  var all = [], s, i, per = 5;
  list.forEach(function (x) { for (i = 0; i < x.n; i++) { all.push(MCOL[x.c]); } });
  var rows = Math.ceil(all.length / per), W = per * 34 + 16, H = rows * 34 + 16;
  s = '<svg viewBox="0 0 ' + W + ' ' + H + '" style="max-width:240px;display:block;margin:4px auto" aria-hidden="true"><rect x="2" y="2" width="' + (W - 4) + '" height="' + (H - 4) + '" rx="14" fill="#f3f6fa" stroke="#14213d" stroke-width="2.5"/>';
  all.forEach(function (c, k) { s += '<circle cx="' + (24 + (k % per) * 34) + '" cy="' + (24 + Math.floor(k / per) * 34) + '" r="13" fill="' + c + '" stroke="#14213d" stroke-width="2"/>'; });
  return s + '</svg>';
}
function wheelSVG(parts, cols) {   // parts: اندازهٔ نسبی هر قسمت؛ cols: رنگ هر قسمت
  var tot = parts.reduce(function (a, b) { return a + b; }, 0), a0 = -Math.PI / 2, s = '<svg viewBox="0 0 240 240" aria-hidden="true">', i, a1, x0, y0, x1, y1, big;
  if (parts.length === 1) { s += '<circle cx="120" cy="120" r="108" fill="' + cols[0] + '" stroke="#14213d" stroke-width="3"/>'; }
  else {
    parts.forEach(function (p, k) { a1 = a0 + p / tot * 2 * Math.PI; x0 = 120 + 108 * Math.cos(a0); y0 = 120 + 108 * Math.sin(a0); x1 = 120 + 108 * Math.cos(a1); y1 = 120 + 108 * Math.sin(a1); big = (a1 - a0) > Math.PI ? 1 : 0; s += '<path d="M120 120 L' + x0 + ' ' + y0 + ' A108 108 0 ' + big + ' 1 ' + x1 + ' ' + y1 + ' Z" fill="' + cols[k] + '" stroke="#14213d" stroke-width="3" stroke-linejoin="round"/>'; a0 = a1; });
  }
  return s + '<circle cx="120" cy="120" r="9" fill="#fff" stroke="#14213d" stroke-width="3"/></svg>';
}
var pbar = function (marks) {   // marks: [{p, h, c}]
  var h = '<div class="pbar"><span class="pe" style="left:-6px">۰ ناممکن</span><span class="pe" style="left:50%;transform:translateX(-50%)">نصف‌نصف</span><span class="pe" style="right:-6px">۱ قطعی</span>';
  marks.forEach(function (m) { h += '<i class="pd" style="left:' + m.p * 100 + '%;--c:' + (m.c || HX[4]) + '"></i><span class="pm" style="left:' + m.p * 100 + '%">' + m.h + '</span>'; });
  return h + '</div>';
};

/* ---- چرخ شانس ---- */
K.probWheel = function (host) {
  var n = 6, k = 2, rot = 0, spins = 0, hits = 0, busy = false;
  function paint() {
    var parts = [], cols = [], i, g = gcd(k, n) || 1, ps = k === 0 ? '0' : fr(k, n), h, a = 360 / n;
    for (i = 0; i < n; i++) { parts.push(1); cols.push(i < k ? '#7fd0c3' : '#fde7ef'); }
    h = '<div class="stp"><button type="button" class="chip" data-t="-1">−</button><b>قسمت‌ها: ' + fa(n) + '</b><button type="button" class="chip" data-t="1">+</button></div><div class="stp"><button type="button" class="chip" data-k="-1">−</button><b>مطلوب (سبز): ' + fa(k) + '</b><button type="button" class="chip" data-k="1">+</button></div>';
    h += '<div class="wheelw"><i class="ptr"></i><div id="wh" style="transform:rotate(' + rot + 'deg)">' + wheelSVG(parts, cols) + '</div></div>';
    h += K.dm('P=\\dfrac{' + k + '}{' + n + '}' + (k > 0 && g > 1 ? '=' + ps : '')) + pbar([{ p: k / n, h: M(k === 0 ? '0' : k === n ? '1' : fr(k, n)), c: HX[0] }]);
    h += '<div class="opts p7-pair"><button type="button" class="btn primary" data-spin="1"' + (busy ? ' disabled' : '') + '>بچرخان</button><button type="button" class="btn" data-clr="1">از اول</button></div><p class="legend">' + (spins ? 'از ' + fa(spins) + ' چرخش، ' + fa(hits) + ' بار روی قسمت سبز ایستاد.' : 'تعداد قسمت‌ها و قسمت‌های سبز را عوض کن و چرخ را بچرخان.') + '</p>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.t) { n = Math.max(2, Math.min(12, n + +b.dataset.t)); k = Math.min(k, n); spins = 0; hits = 0; paint(); }
    else if (b.dataset.k) { k = Math.max(0, Math.min(n, k + +b.dataset.k)); spins = 0; hits = 0; paint(); }
    else if (b.dataset.clr) { spins = 0; hits = 0; paint(); }
    else if (b.dataset.spin) {
      var r = R(0, n - 1), a = 360 / n, tgt = -(r + 0.5) * a, d = (((tgt - rot) % 360) + 360) % 360, w = host.querySelector('#wh'); rot = rot + 360 * 3 + d; busy = true; b.disabled = true;
      w.style.transition = 'transform 1.5s cubic-bezier(.15,.7,.2,1)'; w.style.transform = 'rotate(' + rot + 'deg)';
      setTimeout(function () { spins++; if (r < k) { hits++; } busy = false; paint(); }, 1600);
    }
  }); paint();
};

/* ---- پرتاب سکه: نسبت رو در درازمدت ---- */
K.coinSim = function (host) {
  var flips = [], last = null;
  function add(c) { var i; for (i = 0; i < c; i++) { last = Math.random() < 0.5 ? 1 : 0; flips.push(last); } }
  function paint() {
    var n = flips.length, up = flips.filter(function (x) { return x; }).length, W = 330, H = 150, L = 34, Rr = 10, Tp = 10, B = 24, N = Math.max(20, n), x = function (i) { return L + (i / N) * (W - L - Rr); }, y = function (p) { return Tp + (1 - p) * (H - Tp - B); }, s, pts = [], run = 0, i, h;
    s = '<svg viewBox="0 0 ' + W + ' ' + H + '" style="max-width:100%;display:block;margin:6px auto;direction:ltr" aria-hidden="true"><rect x="' + L + '" y="' + Tp + '" width="' + (W - L - Rr) + '" height="' + (H - Tp - B) + '" fill="#fff" stroke="#14213d" stroke-width="2"/>';
    [0, 0.5, 1].forEach(function (p) { s += '<line x1="' + L + '" y1="' + y(p) + '" x2="' + (W - Rr) + '" y2="' + y(p) + '" stroke="' + (p === 0.5 ? '#d6457a' : '#d5dde8') + '" stroke-width="' + (p === 0.5 ? 2 : 1) + '" ' + (p === 0.5 ? 'stroke-dasharray="6 4"' : '') + '/><text x="' + (L - 5) + '" y="' + (y(p) + 4) + '" text-anchor="end" font-size="11" font-family="Tahoma" fill="#14213d">' + fa(p === 0.5 ? '0.5' : p) + '</text>'; });
    for (i = 0; i < n; i++) { run += flips[i]; pts.push(x(i + 1).toFixed(1) + ',' + y(run / (i + 1)).toFixed(1)); }
    if (n) { s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="#0e8f7e" stroke-width="2.4" stroke-linejoin="round"/><circle cx="' + x(n) + '" cy="' + y(up / n) + '" r="4.5" fill="#ffc233" stroke="#14213d" stroke-width="2"/>'; }
    s += '<text x="' + (W / 2) + '" y="' + (H - 6) + '" text-anchor="middle" font-size="11" font-family="Tahoma" fill="#5a6a85">تعداد پرتاب‌ها: ' + fa(n) + '</text></svg>';
    h = '<div class="opts p7-ops"><button type="button" class="btn" data-c="1">۱ پرتاب</button><button type="button" class="btn" data-c="10">۱۰ پرتاب</button><button type="button" class="btn" data-c="100">۱۰۰ پرتاب</button><button type="button" class="btn" data-clr="1">از اول</button></div>' + s;
    h += '<div class="nleq vd sm"><i class="a">' + (n ? 'رو: ' + fa(up) : 'رو: ۰') + '</i><i class="m">' + (n ? 'پشت: ' + fa(n - up) : 'پشت: ۰') + '</i></div>';
    h += '<p class="legend" style="font-size:.92rem;color:var(--ink)">' + (n ? 'نسبت «رو» تا اینجا: ' + M('\\dfrac{' + up + '}{' + n + '}=' + nf(up / n)) + (last === null ? '' : ' — آخرین پرتاب: ' + (last ? 'رو' : 'پشت')) : 'چند بار سکه بینداز و ببین نسبت «رو» به کجا نزدیک می‌شود.') + '</p>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) { return; } if (b.dataset.c) { add(+b.dataset.c); if (flips.length > 600) { flips = flips.slice(0, 600); } paint(); } else if (b.dataset.clr) { flips = []; last = null; paint(); } });
  paint();
};

/* ================= تولید سؤال ================= */
var CN = ['قرمز', 'آبی', 'سبز', 'زرد'];
function mkOpts(correct, wrongs) {   // correct/wrongs: {t(tex), m}
  var list = uniqBy([{ t: correct.t, ok: 1, m: '' }].concat(wrongs.map(function (w) { return { t: w.t, ok: 0, m: w.m }; })), function (x) { return x.t; }), w = shuffle(list.slice(1)).slice(0, 3);
  return shuffle([list[0]].concat(w).map(function (z) { return { h: M(z.t), ok: !!z.ok, m: z.m || 'این گزینه درست نیست.' }; }));
}
function genB1() {   // مهره‌ها از روی شکل
  var cs = shuffle(CN.slice()).slice(0, 3), cnt = cs.map(function () { return R(1, 6); }), tot = cnt.reduce(function (a, b) { return a + b; }), ti = R(0, 2), x = cnt[ti], list = cs.map(function (c, i) { return { c: c, n: cnt[i] }; });
  return {
    ask: 'در کیسه‌ای مهره‌های زیر هم‌اندازه و هم‌جنس‌اند. یک مهره را بدون نگاه‌کردن بیرون می‌آوریم. احتمال اینکه ' + cs[ti] + ' باشد چقدر است؟', fig: marbles(list), cq: '', cls: 'm2',
    opts: mkOpts({ t: fr(x, tot) }, [{ t: fr(x, tot - x), m: 'مخرج باید تعداد کلِ مهره‌ها باشد، نه تعداد مهره‌های «غیر ' + cs[ti] + '».' }, { t: '\\dfrac{1}{3}', m: 'فقط به تعداد رنگ‌ها نگاه کرده‌ای؛ مهره‌ها هم‌تعداد نیستند.' }, { t: frU(1, tot), m: 'در صورت باید تعداد مهره‌های ' + cs[ti] + ' بیاید، نه ۱.' }, { t: fr(tot - x, tot), m: 'این احتمالِ «' + cs[ti] + ' نبودن» است.' }]),
    expl: function () { return '<p>تعداد مهره‌های ' + cs[ti] + ': ' + fa(x) + '. تعداد کل مهره‌ها: ' + cnt.map(fa).join(' + ') + ' = ' + fa(tot) + '.</p>' + K.dm('P=\\dfrac{' + x + '}{' + tot + '}' + (gcd(x, tot) > 1 ? '=' + fr(x, tot) : '')); }
  };
}
function genB2() {   // تاس، سکه، بلیت
  var t = R(0, 3), ev, fav, tot, ask, desc;
  if (t === 0) { tot = 6; var T0 = [{ n: 'زوج', f: [2, 4, 6] }, { n: 'اول', f: [2, 3, 5] }, { n: 'مضرب ۳', f: [3, 6] }, { n: 'فرد', f: [1, 3, 5] }, { n: 'بزرگ‌تر از ۴', f: [5, 6] }, { n: 'کوچک‌تر از ۳', f: [1, 2] }]; ev = pick(T0); fav = ev.f; ask = 'یک تاس سالم پرتاب می‌شود. احتمال اینکه عددِ رو شده «' + ev.n + '» باشد چقدر است؟'; desc = 'حالت‌های مطلوب: ' + M(fav.join(',\\ ')) + ' (' + fa(fav.length) + ' حالت از ' + fa(6) + ' حالت).'; }
  else if (t === 1) { tot = 20; var T1 = [{ n: 'مضرب ۵', f: [5, 10, 15, 20] }, { n: 'مضرب ۴', f: [4, 8, 12, 16, 20] }, { n: 'عددی بزرگ‌تر از ۱۶', f: [17, 18, 19, 20] }, { n: 'مضرب ۱۰', f: [10, 20] }]; ev = pick(T1); fav = ev.f; ask = 'روی ' + fa(20) + ' بلیت عددهای ' + fa(1) + ' تا ' + fa(20) + ' نوشته شده است. یک بلیت را تصادفی برمی‌داریم. احتمال اینکه عدد آن «' + ev.n + '» باشد چقدر است؟'; desc = 'حالت‌های مطلوب: ' + M(fav.join(',\\ ')) + ' (' + fa(fav.length) + ' حالت از ' + fa(20) + ' حالت).'; }
  else if (t === 2) { tot = R(5, 12); var r = R(1, tot - 1); fav = new Array(r); ask = 'در یک جعبه ' + fa(r) + ' توپ سفید و ' + fa(tot - r) + ' توپ سیاه (هم‌اندازه) هست. یک توپ را تصادفی بیرون می‌آوریم. احتمال سفید بودنش چقدر است؟'; desc = 'تعداد توپ‌های سفید: ' + fa(r) + '، تعداد کل: ' + fa(r) + ' + ' + fa(tot - r) + ' = ' + fa(tot) + '.'; }
  else { tot = 52; ask = 'یک دسته کارت ' + fa(10) + 'تایی با شماره‌های ' + fa(1) + ' تا ' + fa(10) + ' داریم. یکی را تصادفی برمی‌داریم. احتمال اینکه شمارهٔ آن زوج باشد چقدر است؟'; tot = 10; fav = [2, 4, 6, 8, 10]; desc = 'حالت‌های مطلوب: ' + M('2,\\ 4,\\ 6,\\ 8,\\ 10') + ' (' + fa(5) + ' حالت از ' + fa(10) + ' حالت).'; }
  var x = fav.length;
  return {
    ask: ask, fig: '', cq: '', cls: 'm2',
    opts: mkOpts({ t: fr(x, tot) }, [{ t: fr(x, tot - x), m: 'مخرج باید تعداد همهٔ حالت‌ها باشد.' }, { t: frU(1, tot), m: 'صورت باید تعداد حالت‌های مطلوب باشد، نه ۱.' }, { t: fr(tot - x, tot), m: 'این احتمالِ پیشامدِ مخالف است.' }, { t: frU(x, tot + 1), m: 'تعداد کلِ حالت‌ها را درست نشمرده‌ای.' }]),
    expl: function () { return '<p>' + desc + '</p>' + K.dm('P=\\dfrac{' + x + '}{' + tot + '}' + (gcd(x, tot) > 1 ? '=' + fr(x, tot) : '')); }
  };
}
function genB3() {   // ناممکن / قطعی / محتمل‌تر
  var t = R(0, 2);
  if (t === 0) {
    var A = [{ n: 'عددِ رو شده ۷ باشد', p: 0 }, { n: 'عددِ رو شده کمتر از ۷ باشد', p: 1 }, { n: 'عددِ رو شده بیشتر از ۶ باشد', p: 0 }, { n: 'عددِ رو شده از ۱ تا ۶ باشد', p: 1 }], a = pick(A);
    return { ask: 'یک تاس سالم پرتاب می‌شود. احتمال اینکه «' + a.n + '» چقدر است؟', fig: '', cq: '', cls: 'm3', opts: [{ h: M('0'), ok: a.p === 0, m: 'این پیشامد در تاس همیشه رخ می‌دهد؛ پس احتمالش ۱ است.' }, { h: M('\\dfrac{1}{6}'), ok: false, m: 'یک حالتِ مطلوب نداریم؛ یا هیچ‌کدام یا همهٔ حالت‌ها مطلوب‌اند.' }, { h: M('1'), ok: a.p === 1, m: 'این پیشامد هیچ‌وقت رخ نمی‌دهد؛ پس احتمالش ۰ است.' }], expl: function () { return '<p>' + (a.p ? 'هر شش وجه تاس این پیشامد را برآورده می‌کنند: ' : 'هیچ‌یک از شش وجه تاس این پیشامد را برآورده نمی‌کنند: ') + M(a.p ? '\\dfrac{6}{6}=1' : '\\dfrac{0}{6}=0') + '.</p>'; } };
  }
  if (t === 1) {
    var n1 = R(1, 4), d1 = R(n1 + 1, 8), n2, d2; do { n2 = R(1, 5); d2 = R(n2 + 1, 9); } while (n1 * d2 === n2 * d1);
    var cmpv = n1 * d2 > n2 * d1 ? 0 : 1;
    return { ask: 'احتمال پیشامد الف برابر ' + M(frU(n1, d1)) + ' و احتمال پیشامد ب برابر ' + M(frU(n2, d2)) + ' است. کدام پیشامد محتمل‌تر است؟', fig: '', cq: '', cls: 'm3', opts: [{ h: 'الف', ok: cmpv === 0, m: 'دو کسر را با تبدیل به اعشار یا مخرج مشترک مقایسه کن.' }, { h: 'ب', ok: cmpv === 1, m: 'دو کسر را با تبدیل به اعشار یا مخرج مشترک مقایسه کن.' }, { h: 'برابرند', ok: false, m: 'این دو کسر برابر نیستند.' }], expl: function () { return '<p>احتمال بزرگ‌تر یعنی پیشامد محتمل‌تر. دو کسر را مقایسه می‌کنیم:</p>' + K.dm(frU(n1, d1) + '=' + nf(n1 / d1) + '\\qquad' + frU(n2, d2) + '=' + nf(n2 / d2)) + '<p>پس پیشامد ' + (cmpv ? 'ب' : 'الف') + ' محتمل‌تر است.</p>'; } };
  }
  var B = [{ t: '\\dfrac{3}{4}', ok: 1 }, { t: '1.2', ok: 0, m: 'احتمال هیچ‌وقت از ۱ بیشتر نمی‌شود.' }, { t: '-0.3', ok: 0, m: 'احتمال هیچ‌وقت منفی نمی‌شود.' }, { t: '\\dfrac{7}{5}', ok: 0, m: 'این کسر از ۱ بزرگ‌تر است و احتمال نمی‌تواند باشد.' }];
  return { ask: 'کدام عدد می‌تواند احتمالِ یک پیشامد باشد؟', fig: '', cq: '', cls: 'm2', opts: shuffle(B.map(function (z) { return { h: M(z.t), ok: !!z.ok, m: z.m || '' }; })), expl: function () { return '<p>احتمال همیشه بین ' + M('0') + ' و ' + M('1') + ' است (خودِ ' + M('0') + ' و ' + M('1') + ' هم ممکن‌اند).</p>' + pbar([{ p: 0.75, h: M('\\dfrac{3}{4}'), c: HX[0] }]); } };
}
var TFP = [
  { h: 'اگر یک تاس سالم را ' + M('6') + ' بار انداخته باشیم و ' + M('6') + ' نیامده باشد، بار هفتم حتماً ' + M('6') + ' می‌آید.', ok: 0, e: '<p>تاس «حافظه» ندارد؛ در هر پرتاب احتمال ' + M('\\dfrac{1}{6}') + ' است.</p>' },
  { h: 'احتمال زوج آمدن یک تاس سالم ' + M('\\dfrac{1}{2}') + ' است.', ok: 1, e: '<p>سه حالت مطلوب ' + M('\\{2,4,6\\}') + ' از شش حالت: ' + M('\\dfrac{3}{6}=\\dfrac{1}{2}') + '.</p>' },
  { h: 'در کیسه‌ای با ' + M('3') + ' مهرهٔ قرمز و ' + M('1') + ' مهرهٔ آبی، احتمال بیرون‌آمدن آبی ' + M('\\dfrac{1}{2}') + ' است، چون دو رنگ داریم.', ok: 0, e: '<p>مهره‌ها چهارتا هستند و یکی آبی است: ' + M('\\dfrac{1}{4}') + '. تعداد رنگ‌ها مهم نیست؛ تعداد مهره‌ها مهم است.</p>' },
  { h: 'احتمال یک پیشامد می‌تواند ' + M('1.2') + ' باشد.', ok: 0, e: '<p>احتمال همیشه بین ' + M('0') + ' و ' + M('1') + ' است.</p>' },
  { h: 'احتمال پیشامدی که حتماً رخ می‌دهد برابر ' + M('1') + ' است.', ok: 1, e: '<p>همهٔ حالت‌ها مطلوب‌اند: ' + M('\\dfrac{n}{n}=1') + '.</p>' },
  { h: 'احتمال پیشامدی که هرگز رخ نمی‌دهد برابر ' + M('0') + ' است.', ok: 1, e: '<p>حالت مطلوبی نداریم: ' + M('\\dfrac{0}{n}=0') + '.</p>' },
  { h: 'چون یک تیم فقط دو حالتِ «می‌برد» یا «می‌بازد» دارد، احتمال بردنش همیشه ' + M('\\dfrac{1}{2}') + ' است.', ok: 0, e: '<p>فرمول فقط وقتی کار می‌کند که حالت‌ها «هم‌شانس» باشند؛ توانایی دو تیم می‌تواند فرق کند.</p>' },
  { h: 'اگر ' + M('\\dfrac{3}{8}') + ' و ' + M('\\dfrac{2}{5}') + ' احتمال دو پیشامد باشند، پیشامد دوم محتمل‌تر است.', ok: 1, e: '<p>' + M('0.375\\lt0.4') + '؛ احتمال بزرگ‌تر یعنی محتمل‌تر.</p>' },
  { h: 'اگر یک سکهٔ سالم را ' + M('1000') + ' بار بیندازیم، تقریباً نیمی از آن‌ها «رو» می‌آید.', ok: 1, e: '<p>در پرتاب‌های زیاد، نسبت «رو» به ' + M('\\dfrac{1}{2}') + ' نزدیک می‌شود (نه اینکه دقیقاً نصف شود).</p>' },
  { h: 'اگر دو چرخ شانس یکی با ' + M('4') + ' قسمت مساوی و دیگری با ' + M('4') + ' قسمت نامساوی داشته باشیم، فرمول «مطلوب ÷ کل» برای هر دو درست است.', ok: 0, e: '<p>این فرمول فقط وقتی کار می‌کند که حالت‌ها هم‌شانس باشند؛ قسمت‌های نامساوی هم‌شانس نیستند.</p>' }
];
return {
  html: function () {
    var dice = function (set, fill) { var h = '<div style="text-align:center;direction:ltr">', i; for (i = 1; i <= 6; i++) { h += dieFace(i, 44, set.indexOf(i) > -1 ? fill : '#fff'); } return h + '</div>'; };
    return [
      K.sn('۱', 'شانس را بشمار'),
      '<p>یک تاس سالم می‌اندازیم. می‌خواهیم بدانیم احتمال اینکه عدد رو شده «زوج» باشد چقدر است. تاس شش حالت دارد و سه‌تایشان زوج‌اند:</p>', dice([2, 4, 6], '#7fd0c3'),
      K.box('note', 'احتمال در حالت‌های هم‌شانس', '<p>احتمال یک پیشامد = تعداد حالت‌های مطلوب ÷ تعداد همهٔ حالت‌ها</p>' + K.dm('P=\\dfrac{\\text{}}{}'.replace('\\dfrac{\\text{}}{}', '\\dfrac{3}{6}=\\dfrac{1}{2}'))),
      '<p>کسر ' + M('\\dfrac{3}{6}') + ' را می‌توان ساده کرد؛ احتمال را معمولاً به‌صورت کسر ساده‌شده می‌نویسیم. با چرخ شانس بازی کن: تعداد قسمت‌ها و قسمت‌های سبز را عوض کن و ببین احتمال چطور تغییر می‌کند:</p><div class="cover p7-act" id="pw" style="animation:none"></div>',

      K.sn('۲', 'هم‌شانس یعنی چه؟'),
      '<p>این فرمول فقط وقتی کار می‌کند که همهٔ حالت‌ها شانسِ برابر داشته باشند؛ مثل وجه‌های یک تاس سالم یا مهره‌های هم‌اندازه و هم‌جنس در یک کیسه. مثلاً:</p>',
      marbles([{ c: 'قرمز', n: 3 }, { c: 'آبی', n: 5 }, { c: 'سبز', n: 2 }]),
      '<p>در این کیسه ' + M('10') + ' مهره است و ' + M('5') + ' تا آبی‌اند. برای احتمال آبی‌بودن:</p>', K.dm('P=\\dfrac{5}{10}=\\dfrac{1}{2}'),
      '<p>به تعداد مهره‌ها نگاه کن، نه به تعداد رنگ‌ها. اگر ' + M('\\dfrac{1}{3}') + ' بنویسی (چون سه رنگ داریم) اشتباه کرده‌ای؛ چون مهره‌ها از هر رنگ هم‌تعداد نیستند.</p>',
      K.box('err', '⚠ خطای رایج: «دو حالت دارد، پس نصف‌نصف است»', '<p>تیم الف یا می‌برد یا می‌بازد؛ اما این دو حالت لزوماً هم‌شانس نیستند. در چرخ سمت راست قسمت سبز بزرگ‌تر است و فرمول «مطلوب ÷ کل» را نمی‌شود با شمردن قسمت‌ها به کار برد:</p>' + '<div class="figs"><figure><div class="wheelw" style="width:150px"><i class="ptr"></i>' + wheelSVG([1, 1, 1, 1], ['#7fd0c3', '#fde7ef', '#fde7ef', '#fde7ef']) + '</div><figcaption>۴ قسمت مساوی: هم‌شانس</figcaption></figure><figure><div class="wheelw" style="width:150px"><i class="ptr"></i>' + wheelSVG([3, 1, 1, 1], ['#7fd0c3', '#fde7ef', '#fde7ef', '#fde7ef']) + '</div><figcaption>۴ قسمت نامساوی: هم‌شانس نیست</figcaption></figure></div>'),

      K.sn('۳', 'صفر، یک و بین آن‌ها'),
      '<p>احتمال همیشه عددی بین ' + M('0') + ' و ' + M('1') + ' است. اگر پیشامد هرگز رخ ندهد احتمالش ' + M('0') + ' و اگر حتماً رخ بدهد احتمالش ' + M('1') + ' است. روی تاس سالم:</p>',
      pbar([{ p: 0, h: M('7'), c: HX[1] }, { p: 0.5, h: M('\\dfrac{1}{2}'), c: HX[4] }, { p: 1, h: M('<7'), c: HX[0] }]).replace('$7$', '$7$'),
      cards3([{ c: 'n', h: M('P=0'), t: 'ناممکن: عدد رو شده ۷ باشد' }, { c: 'r3', h: M('P=\\dfrac{1}{2}'), t: 'نصف‌نصف: زوج بودن' }, { c: 'p', h: M('P=1'), t: 'قطعی: عدد رو شده کمتر از ۷ باشد' }]),
      K.box('err', '⚠ خطای رایج', '<p>عددهایی مثل ' + M('1.2') + ' ، ' + M('\\dfrac{7}{5}') + ' یا ' + M('-0.3') + ' هرگز احتمال نیستند: احتمال نه منفی می‌شود و نه از ' + M('1') + ' بیشتر.</p>'),

      K.sn('۴', 'احتمال در درازمدت'),
      '<p>احتمال ' + M('\\dfrac{1}{2}') + ' برای «رو» یعنی چه؟ یعنی اگر سکه را خیلی زیاد بیندازیم، نسبتِ «رو» به ' + M('\\dfrac{1}{2}') + ' نزدیک می‌شود. در چند پرتاب اول ممکن است نوسان زیاد باشد. امتحان کن:</p><div class="cover p7-act" id="cs" style="animation:none"></div>',
      K.box('note', 'سکه و تاس حافظه ندارند', '<p>اگر پنج بار پشت‌سرهم «رو» آمده باشد، پرتاب ششم باز هم ' + M('\\dfrac{1}{2}') + ' «رو» است. گذشته روی آینده اثری ندارد.</p>'),

      K.sn('۵', 'مسئله‌های کامل'),
      '<h4>مثال اول: تاس</h4><p>احتمال اینکه عدد رو شده بیشتر از ' + M('4') + ' باشد:</p>', dice([5, 6], '#7fd0c3'), K.dm('\\{5,6\\}\\ \\Rightarrow\\ P=\\dfrac{2}{6}=\\dfrac{1}{3}'),
      '<h4>مثال دوم: بلیت‌ها</h4><p>روی ' + M('20') + ' بلیت عددهای ' + M('1') + ' تا ' + M('20') + ' نوشته شده. احتمال اینکه عدد بلیتی که برمی‌داریم مضرب ' + M('5') + ' باشد:</p>', K.dm('\\{5,10,15,20\\}\\ \\Rightarrow\\ P=\\dfrac{4}{20}=\\dfrac{1}{5}'),
      '<h4>مثال سوم: کدام محتمل‌تر است؟</h4><p>احتمال پیشامد الف ' + M('\\dfrac{3}{8}') + ' و پیشامد ب ' + M('\\dfrac{2}{5}') + ' است. با تبدیل به اعشار:</p>', K.dm('\\dfrac{3}{8}=0.375\\ \\lt\\ 0.4=\\dfrac{2}{5}'), '<p>پیشامد ب محتمل‌تر است.</p>',

      K.sn('۶', 'کارت مرجع'),
      refs([{ c: 'r1', t: 'احتمال', r: 'مطلوب ÷ کل (در حالت هم‌شانس).', e: 'P=\\dfrac{3}{6}=\\dfrac{1}{2}' }, { c: 'r2', t: 'هم‌شانس', r: 'تعداد حالت‌ها را بشمار، نه تعداد رنگ‌ها را.', e: '\\dfrac{5}{10}' }, { c: 'r3', t: 'ناممکن و قطعی', r: 'ناممکن ۰ و قطعی ۱.', e: '0\\le P\\le1' }, { c: 'r4', t: 'درازمدت', r: 'نسبت به احتمال نزدیک می‌شود.', e: '\\dfrac{\\text{رو}}{n}\\to\\dfrac{1}{2}'.replace('\\text{رو}', 'k') }, { c: 'r1', t: 'ساده‌کردن', r: 'احتمال را به کسر ساده بنویس.', e: '\\dfrac{4}{20}=\\dfrac{1}{5}' }, { c: 'r3', t: 'مقایسه', r: 'احتمال بزرگ‌تر یعنی محتمل‌تر.', e: '0.4\\gt0.375' }]),

      K.sn('۷', 'شانس‌سنج'),
      '<p>هر مرحله با دو پاسخ درست تمام می‌شود. بعد از هر پاسخ، دلیلش را می‌بینی.</p><div class="cover p7-act" id="ss" style="animation:none"></div>',
      K.sn('۸', 'درست یا نادرست؟'),
      '<p>شش جمله را بسنج. به تله‌ها دقت کن.</p><div class="cover p7-act" id="tf" style="animation:none"></div>',
      K.sn('۹', 'تمرین پایانی'),
      '<p>پنج سؤال با عددهای تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover p7-act" id="fn" style="animation:none"></div>',
      K.box('sum', 'بعد از این درس باید بتوانی', T`<ul><li>احتمال یک پیشامد را در حالت هم‌شانس با «مطلوب ÷ کل» حساب کنی و ساده بنویسی.</li><li>تشخیص بدهی کِی حالت‌ها هم‌شانس نیستند و فرمول جواب نمی‌دهد.</li><li>بدانی احتمال بین $0$ و $1$ است و ناممکن و قطعی را بشناسی.</li><li>احتمال‌ها را با هم مقایسه کنی.</li><li>معنی احتمال در پرتاب‌های زیاد را بفهمی.</li></ul>`)
    ].join('');
  },
  init: function (panel) {
    K.probWheel(panel.querySelector('#pw')); K.coinSim(panel.querySelector('#cs'));
    K.stepRun(panel.querySelector('#ss'), [{ n: 'شمردن از روی شکل', gen: genB1 }, { n: 'تاس، سکه و بلیت', gen: genB2 }, { n: 'ناممکن، قطعی و مقایسه', gen: genB3 }], { done: 'حالا برو سراغ تله‌ها.' });
    K.tfRun(panel.querySelector('#tf'), TFP);
    K.finalRun(panel.querySelector('#fn'), [genB1, genB2, genB2, genB3, genB3], { top: 'عالی بود! احتمال ساده را کاملاً فهمیده‌ای.' });
  }
};

  }
};
