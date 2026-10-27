/* درس مهارت N05 — نمایش و خواندن عدد روی محور (فصل ۱) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.N05 = {
  needs: ['utils'],
  setup: function (K0) {
var ML = window.MathLite, fa = ML.fa, rr = ML.renderRich, abs = Math.abs, df = K0.df;
var _u = K0._u, R = _u.R, M = _u.M, shuffle = _u.shuffle;
var K = Object.create(K0);   // K0 = هستهٔ مشترک؛ K = همان + ابزارهای اختصاصی این درس

/* ---- استایل اختصاصی این درس؛ فقط از رنگ‌ها و قالب‌های موجود پروژه ---- */
(function () {
  if (document.getElementById('css-N05')) { return; }
  var s = document.createElement('style'); s.id = 'css-N05';
  s.textContent = [
    '.sg.sg3{grid-template-columns:repeat(3,1fr)}',
    '.sg.sg3>div{text-align:center;padding:8px 4px}',
    '.sg.sg3 b .katex{font-size:1.5em}',
    '.sg.sg3>div>span{display:block;font-size:.84rem;color:var(--ink-soft);line-height:1.6;margin-top:2px}',
    '.nleq i{display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:3px 12px;line-height:1.3;margin:0 2px;vertical-align:middle}',
    '.nleq i.n{background:#fff}.nleq.vd{margin:8px 0 12px}',
    /* محور افقی */
    '.lv{position:relative;height:178px;direction:ltr;margin:6px 34px 0}',
    '.lv.lo{height:132px;margin-top:6px}',
    '.lv.lo .ax{top:94px}.lv.lo .tk{top:87px}.lv.lo .tk.mn{top:90px}.lv.lo .tk.z{top:83px}.lv.lo .tn{top:100px;line-height:1}.lv.lo .dot{top:85px}.lv.lo .hit{top:50px;height:80px}',
    '.lv.lo .stem{bottom:41px}',
    '.lv .ax{position:absolute;left:-16px;right:-16px;top:140px;border-top:2.5px solid var(--ink)}',
    '.lv .ax:before,.lv .ax:after{content:"";position:absolute;top:-7px;border:6px solid transparent}',
    '.lv .ax:after{right:-2px;border-left:9px solid var(--ink);border-right:0}',
    '.lv .ax:before{left:-2px;border-right:9px solid var(--ink);border-left:0}',
    '.lv .tk{position:absolute;top:133px;height:14px;border-left:2px solid var(--ink)}',
    '.lv .tk.mn{top:136px;height:8px;border-color:#aab4c4}',
    '.lv .tk.z{top:129px;height:22px;border-left-width:3px}',
    '.lv .tn{position:absolute;top:146px;transform:translateX(-50%);font:bold .84rem Tahoma,sans-serif;white-space:nowrap;line-height:1}',
    '.lv .hit{position:absolute;top:50px;height:110px;cursor:pointer;border-radius:8px}',
    '.lv .hit:hover{background:transparent}',,
    '.lv .hit.ok{background:rgba(14,143,126,.18)}.lv .hit.no{background:rgba(214,69,122,.18)}',
    '.lv .dot{position:absolute;top:131px;width:18px;height:18px;border-radius:50%;border:2.5px solid var(--ink);transform:translateX(-50%);background:var(--c,var(--accent));box-shadow:0 2px 0 rgba(20,33,61,.3);pointer-events:none}',
    '.lv .dot.gh{background:#fff;border-style:dashed;box-shadow:none;width:12px;height:12px;margin-top:3px}',
    '.lv .stem{position:absolute;bottom:47px;width:0;margin-left:-1px;border-left:2px solid var(--ink);pointer-events:none}',
    '.lv .tip{position:absolute;transform:translateX(-50%);background:var(--ink);color:#fff;border-radius:9px;padding:3px 10px;line-height:1.25;white-space:nowrap;z-index:2;pointer-events:none;font-weight:bold}',
    '.lv .tip:after{content:"";position:absolute;left:50%;bottom:-6px;margin-left:-6px;border:6px solid transparent;border-top-color:var(--ink);border-bottom:0}',
    '.lv .arc{position:absolute;top:92px;height:32px;border:2px solid var(--pink);border-bottom:0;border-radius:999px 999px 0 0;pointer-events:none}',
    '.lv.lo .arc{top:50px}',
    '.lv .arc i{position:absolute;left:50%;top:-26px;transform:translateX(-50%);font:bold .76rem Tahoma,sans-serif;font-style:normal;color:var(--pink);white-space:nowrap;background:#fff;padding:0 4px}',
    '.lv .arc.g{border-color:var(--accent)}.lv .arc.g i{color:var(--accent-dark)}',
    /* محور عمودی */
    '.lvv{position:relative;height:250px;width:190px;margin:8px auto;direction:ltr}',
    '.lvv .ax{position:absolute;left:92px;top:-4px;bottom:-4px;border-left:2.5px solid var(--ink)}',
    '.lvv .ax:before{content:"";position:absolute;left:-7px;top:-4px;border:6px solid transparent;border-bottom:9px solid var(--ink);border-top:0}',
    '.lvv .tk{position:absolute;left:84px;width:16px;border-top:2px solid var(--ink)}',
    '.lvv .tk.mn{left:87px;width:10px;border-color:#aab4c4}',
    '.lvv .tn{position:absolute;left:0;width:76px;text-align:right;transform:translateY(-50%);font:bold .84rem Tahoma,sans-serif}',
    '.lvv .dot{position:absolute;left:92px;width:18px;height:18px;border-radius:50%;border:2.5px solid var(--ink);transform:translate(-50%,-50%);background:var(--c,var(--mark));box-shadow:0 2px 0 rgba(20,33,61,.3)}',
    '.lvv .tip{position:absolute;left:112px;transform:translateY(-50%);background:var(--ink);color:#fff;border-radius:9px;padding:2px 10px;font-weight:bold;white-space:nowrap}',
    '.lvv .tip:before{content:"";position:absolute;left:-6px;top:50%;margin-top:-6px;border:6px solid transparent;border-right-color:var(--ink);border-left:0}',
    '.lvv .hit{position:absolute;left:30px;width:150px;cursor:pointer;border-radius:8px}',
    '.lvv .hit:hover{background:transparent}',
    '.chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:6px 0 4px;direction:ltr}',
    '.chip{min-width:56px;min-height:42px;border:2px solid var(--ink);border-radius:12px;background:#fff;cursor:pointer;font:inherit;color:var(--ink);padding:2px 10px;box-shadow:2px 2px 0 var(--ink)}',
    '.chip:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}',
    '.chip.on{background:var(--mark)}.chip.bad{background:#fbd5d5;border-color:#b23a3a}.chip:disabled{opacity:.6;cursor:default}',
    '.rng{display:flex;align-items:center;gap:10px;direction:ltr;margin:6px 8px;font-size:.85rem;color:var(--ink-soft)}',
    '.rng input{flex:1;accent-color:var(--accent);height:30px}',
    '.mc.m1{grid-template-columns:1fr}.mc.m3{grid-template-columns:repeat(3,1fr)}.mc.m2{grid-template-columns:repeat(2,1fr)}',
    '.cq{direction:ltr;text-align:center;margin:8px 0}.cq .katex{font-size:1.4em}',
    '.legend{text-align:center;font-size:.84rem;color:var(--ink-soft);margin:2px 0 8px}',
    '.dgs{display:flex;gap:6px;justify-content:center;align-items:flex-end;direction:ltr;margin:8px 0}',
    '.dgs .t{width:44px;height:50px;border-radius:10px;border:2px solid var(--line);background:#f3f6fa;display:grid;place-items:center;font:bold 1.4rem Tahoma,sans-serif;color:#b9c2d0}',
    '.dgs .t.on{background:var(--amber);border-color:var(--amber-d);color:var(--ink)}.dgs .t.dn{background:#e6f6f3;border-color:var(--accent);color:var(--accent-dark)}',
    '.dgs .p{font:bold 1.6rem/1 Tahoma;padding-bottom:6px}',
    '.dgs small{display:block;text-align:center;font:.7rem Tahoma;color:var(--ink-soft);margin-bottom:2px}',
    '@media(max-width:520px){.lv{margin:6px 30px 0}.mc.m3{gap:6px}.dgs .t{width:38px;height:44px}}',
    '.opts:has([data-p="1"]):has([data-nx="1"]){display:flex;justify-content:space-between;direction:rtl;gap:12px;width:100%}',
    '.opts:has([data-p="1"]):has([data-nx="1"]) .btn{min-height:36px}'
  ].join('\n');
  document.head.appendChild(s);
})();

/* ================= ابزارهای مشترک ================= */
var gcd = function (a, b) { a = abs(a); b = abs(b); while (b) { var t = a % b; a = b; b = t; } return a; };
var nf = function (v) { var s = String(+(+v).toFixed(6)); return s === '-0' ? '0' : s; };            // رشتهٔ اعشاری تمیز
var lab = function (v) { var s = nf(abs(v)); return (v < -1e-9 ? '\u2212' : '') + fa(s); };         // برچسب فارسی (محور)
var tx = function (v) { return nf(v); };                                                              // برای KaTeX (علامت - ASCII)
var frT = function (n, d) { var g = gcd(n, d); n /= g; d /= g; return d === 1 ? String(n) : (n < 0 ? '-' : '') + '\\dfrac{' + abs(n) + '}{' + d + '}'; };
var AL = function (lines) { return K.dm('\\begin{aligned}' + lines.join('\\\\') + '\\end{aligned}'); };
var verdict = function (parts) { return '<div class="nleq vd">' + parts.map(function (p) { return '<i class="' + p[0] + '">$' + p[1] + '$</i>'; }).join('') + '</div>'; };
var CL = ['var(--accent)', 'var(--pink)', '#4c5fd5', '#e08a00', 'var(--mark)'];

/* برچسب گام روی قوس: تبدیل ارقام فارسی و کسر یک‌چهارم به فرمول KaTeX */
function arcMathLabel(t) {
  var digits = '۰۱۲۳۴۵۶۷۸۹';
  var tex = String(t).replace(/[۰-۹]/g, function (d) { return String(digits.indexOf(d)); })
    .replace(/−/g, '-').replace(/٫/g, '.').replace(/¼/g, '\\frac{1}{4}');
  return M(tex);
}
/* ---- محور افقی HTML ---- */
/* o: {min,max,ticks:[{v,t,mn,z}], hits:[{v,c}] , hw, arcs:[{a,b,t,g}], cls}؛ marks: [{v,c,h,lv,gh}] */
function axisHTML(o, marks) {
  var sp = o.max - o.min, pc = function (v) { return (v - o.min) / sp * 100; }, h = '<div class="lv ' + (o.cls || '') + '"><i class="ax"></i>';
  (o.arcs || []).forEach(function (a) { h += '<span class="arc' + (a.g ? ' g' : '') + '" style="left:' + pc(a.a) + '%;width:' + (pc(a.b) - pc(a.a)) + '%">' + (a.t ? '<i>' + arcMathLabel(a.t) + '</i>' : '') + '</span>'; });
  (o.ticks || []).forEach(function (t) { h += '<i class="tk' + (t.mn ? ' mn' : '') + (t.z ? ' z' : '') + '" style="left:' + pc(t.v) + '%"></i>' + (t.t ? '<span class="tn" dir="ltr" style="left:' + pc(t.v) + '%">' + t.t + '</span>' : ''); });
  (o.hits || []).forEach(function (x, i) { h += '<b class="hit' + (x.k ? ' ' + x.k : '') + '" data-i="' + i + '" data-v="' + x.v + '" data-label="' + lab(x.v) + '" style="left:' + (pc(x.v) - 50 * o.hw / sp) + '%;width:' + (100 * o.hw / sp) + '%"></b>'; });
  (marks || []).forEach(function (m) {
    var hs = m.lv ? 66 : 10, low = (o.cls || '').indexOf('lo') >= 0;
    if (m.lv && m.h) { h += '<i class="stem" style="left:' + pc(m.v) + '%;height:' + (hs + 14) + 'px"></i>'; }
    h += '<i class="dot' + (m.gh ? ' gh' : '') + '" style="left:' + pc(m.v) + '%;--c:' + m.c + '"></i>';
    if (m.h) { h += '<span class="tip" style="left:' + pc(m.v) + '%;bottom:' + (60 + hs - (low ? 4 : 0)) + 'px">' + m.h + '</span>'; }
  });
  return h + '</div>';
}
/* محور ساده با گام مشخص: o={lo,step,n,lab:[اندیس‌های دارای برچسب]|'all',pts:[{i,c,h,lv}],arcs:[{a,b,t}] (به اندیس),cap,cls,f} */
function ax(o) {
  var ticks = [], marks = [], arcs = [], i, v, all = o.lab === 'all', st = o.step;
  for (i = 0; i <= o.n; i++) { v = o.lo + i * st; ticks.push({ v: v, mn: !(all || (o.lab || []).indexOf(i) > -1 || abs(v) < 1e-9), z: abs(v) < 1e-9, t: (all || (o.lab || []).indexOf(i) > -1 || abs(v) < 1e-9) ? (o.f ? o.f(v) : lab(v)) : '' }); }
  var hasArc = (o.arcs || []).length > 0 && (o.pts || []).length > 0;
  (o.pts || []).forEach(function (p) { marks.push({ v: o.lo + p.i * st, c: p.c || CL[4], h: p.h, lv: hasArc && p.lv === undefined ? 1 : p.lv, gh: p.gh }); });
  (o.arcs || []).forEach(function (a) { arcs.push({ a: o.lo + a.a * st, b: o.lo + a.b * st, t: a.t, g: a.g }); });
  return '<div class="nl">' + axisHTML({ min: o.lo - .5 * st, max: o.lo + (o.n + .5) * st, ticks: ticks, arcs: arcs, cls: o.cls !== undefined ? o.cls : (hasArc || (o.pts && o.pts.some(function (p) { return p.lv; })) ? '' : 'lo') }, marks) + (o.cap ? '<p class="legend">' + o.cap + '</p>' : '') + '</div>';
}
/* محور عمودی (بالا = مثبت): o={lo,step,n,lab,pt:{i,h}} */
function vax(o) {
  var h = '<div class="lvv"><i class="ax"></i>', H = 250, pad = 14, yy = function (i) { return pad + (1 - i / o.n) * (H - 2 * pad); }, i, v, all = o.lab === 'all';
  for (i = 0; i <= o.n; i++) {
    v = o.lo + i * o.step; var l = all || (o.lab || []).indexOf(i) > -1;
    h += '<i class="tk' + (l ? '' : ' mn') + '" style="top:' + yy(i) + 'px"></i>' + (l ? '<span class="tn" dir="ltr" style="top:' + yy(i) + 'px">' + lab(v) + '</span>' : '');
  }
  if (o.pt) { h += '<i class="dot" style="top:' + yy(o.pt.i) + 'px;--c:' + (o.pt.c || CL[4]) + '"></i>' + (o.pt.h ? '<span class="tip" style="top:' + yy(o.pt.i) + 'px">' + o.pt.h + '</span>' : ''); }
  return h + '</div>';
}
/* ---- نمایش: یک نقطه، چند مقیاس ---- */
K.scaleDemo = function (host) {
  var S = [0.5, 1, 2, 5], k = 0;
  function paint() {
    var s = S[k], h = '<div class="chips" style="direction:rtl">' + S.map(function (x, i) { return '<button type="button" class="chip' + (i === k ? ' on' : '') + '" data-k="' + i + '"><span dir="rtl">هر گام: ' + M(tx(x)) + '</span></button>'; }).join('') + '</div>';
    h += ax({ lo: 0, step: s, n: 5, lab: 'all', pts: [{ i: 3, h: M(tx(3 * s)), c: CL[4] }] });
    h += '<p class="legend" style="font-size:.95rem;color:var(--ink)">نقطه سه خانه بعد از صفر است؛ پس عددش ' + M('3\\times' + tx(s) + '=' + tx(3 * s)) + ' است.</p><p class="legend">یکی از گام‌ها را انتخاب کن؛ جای نقطه عوض نمی‌شود، اما عددش عوض می‌شود.</p>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) { var c = e.target.closest('.chip'); if (c) { k = +c.dataset.k; paint(); } }); paint();
};

/* ---- تولید محور برای خواندن ---- */
function pickStep(list) { return list[R(0, list.length - 1)]; }
function genRead(stage, forceV) {
  var L = [[1, 2, 5, 10], [1, 2, 5, 10, 20], [1, 2, 5, 0.5, 10], [0.1, 0.2, 0.25, 0.5, 0.05]][stage], st = pickStep(L), n = 8, lo, a, b, p, k, vert, i;
  if (stage <= 1) { lo = 0; } else if (stage === 2) { lo = Math.random() < 0.6 ? -st * R(2, 6) : st * R(2, 8); } else { lo = st * R(-5, 3); }
  a = R(0, 3); b = a + R(2, 4); if (b > n) { b = n; } k = b - a;
  do { p = R(0, n); } while (p === a || p === b);
  vert = forceV !== undefined ? forceV : (stage >= 2 && Math.random() < 0.4);
  return { lo: +lo.toFixed(6), st: st, n: n, a: a, b: b, k: k, p: p, vert: vert, va: +(lo + a * st).toFixed(6), vb: +(lo + b * st).toFixed(6), vp: +(lo + p * st).toFixed(6) };
}
function readFig(g, o) {   // o: {show:true → نمایش مقدار نقطه، arcs:true}
  var pt = o && o.nopt ? null : { i: g.p, c: CL[4], h: o && o.show ? M(tx(g.vp)) : '؟' }, arcs = [], i, lo, hi;
  if (o && o.arcs) { for (i = g.a; i < g.b; i++) { arcs.push({ a: i, b: i + 1, t: i === g.a ? '+' + lab(g.st) : '' }); } }
  if (o && o.arcsP) { lo = Math.min(g.a, g.p); hi = Math.max(g.a, g.p); for (i = lo; i < hi; i++) { arcs.push({ a: i, b: i + 1, g: 1, t: i === lo ? (g.p > g.a ? '+' : '\u2212') + lab(g.st) : '' }); } }
  if (g.vert) { return vax({ lo: g.lo, step: g.st, n: g.n, lab: [g.a, g.b], pt: pt }); }
  return ax({ lo: g.lo, step: g.st, n: g.n, lab: [g.a, g.b], pts: pt ? [pt] : [], arcs: arcs });
}
function readOpts(g, ask) {   // ask = 'step' | 'val'
  var cand = [], seen = {}, out = [], ok, add = function (v, m) { var s = nf(v), x; if (seen[s]) { return; } seen[s] = 1; cand.push({ v: v, m: m }); };
  if (ask === 'step') {
    add(g.st, '');
    add(g.k * g.st, 'این اختلاف دو عدد برچسب‌دار است؛ باید آن را بر تعداد فاصله‌ها تقسیم کنی.');
    add(g.k * g.st / (g.k + 1), 'فاصله‌ها را با شمردن خط‌ها اشتباه گرفتی؛ باید «فاصله‌ها» را بشماری، نه «خط‌ها» را.');
    if (g.k > 1) { add(g.k * g.st / (g.k - 1), 'یکی از فاصله‌ها را کم شمرده‌ای.'); }
    add(1, 'هر خانه را یک واحد حساب نکن؛ گام از برچسب‌ها به دست می‌آید.');
    add(g.st * 2, 'گام را دوبرابر گرفتی؛ دوباره تقسیم را حساب کن.');
    add(g.st / 2, 'گام را نصف گرفتی؛ دوباره تقسیم را حساب کن.');
  } else {
    add(g.vp, '');
    add(g.va + (g.p - g.a) * 1, 'هر خانه را یک واحد گرفتی؛ باید از گام محور استفاده کنی.');
    add(g.va + (g.p - g.a) * g.k * g.st / (g.k + 1), 'گام را با شمردن خط‌ها اشتباه محاسبه کردی.');
    add(g.va - (g.p - g.a) * g.st, 'جهت را اشتباه رفتی؛ سمت راست (یا بالا) عدد بزرگ‌تر می‌شود.');
    add(g.vp + g.st, 'یک خانه جلوتر یا عقب‌تر خوانده‌ای؛ خانه‌ها را دوباره بشمار.');
    add(g.vp - g.st, 'یک خانه جلوتر یا عقب‌تر خوانده‌ای؛ خانه‌ها را دوباره بشمار.');
    add(g.lo + g.p, 'شمارهٔ خط را عدد گرفتی؛ نه، باید گام را حساب کنی.');
  }
  out = [cand[0]].concat(shuffle(cand.slice(1)).slice(0, 3));
  return shuffle(out.map(function (c, i) { return { h: M(tx(c.v)), ok: i === 0, m: c.m || 'این گزینه درست نیست.' }; }));
}
function readExpl(g, ask) {
  var h = '<p>ابتدا گام را پیدا می‌کنیم: بین دو عدد برچسب‌دار ' + fa(g.k) + ' فاصله است.</p>' + K.dm('\\dfrac{' + tx(g.vb) + '-' + (g.va < 0 ? '(' + tx(g.va) + ')' : tx(g.va)) + '}{' + g.k + '}=' + tx(g.st));
  if (ask === 'step') { return h + readFig(g, { arcs: 1, nopt: 1 }) + verdict([['a', tx(g.st)]]); }
  var cnt = g.p - g.a;
  h += '<p>نقطه ' + fa(abs(cnt)) + ' خانه ' + (cnt > 0 ? 'بعد از' : 'قبل از') + ' عدد ' + M(tx(g.va)) + ' است:</p>' + AL([tx(g.va) + (cnt > 0 ? '+' : '-') + abs(cnt) + '\\times' + tx(g.st) + '&=' + tx(g.vp)]);
  return h + readFig(g, { show: 1, arcsP: abs(cnt) <= 6 }) + verdict([['b', tx(g.vp)]]);
}

/* ---- تمرین مرحله‌ای: خواندن مقیاس و عدد ---- */
K.scaleRead = function (host) {
  var ST = ['گام محور', 'خواندن نقطه', 'منفی و شروع غیرصفر', 'اعشاری و عمودی'], si = 0, ok = 0, asked = 0, g, opts, pick = null, fin = false;
  function nw() { g = genRead(si); opts = readOpts(g, si === 0 ? 'step' : 'val'); pick = null; }
  function paint() {
    var h = '<div class="stg">' + ST.map(function (s, i) { return '<span class="' + (i < si || fin ? 'dn' : i === si ? 'cu' : '') + '">' + (i < si || fin ? '✓ ' : '') + s + '</span>'; }).join('') + '</div>', i, cls, o;
    if (fin) { host.innerHTML = rr(h + '<div class="fb ok"><b>همهٔ مرحله‌ها را گذراندی!</b> حالا برو سراغ جاگذاری.</div><div class="opts"><button type="button" class="btn" data-r="1">از اول، با محورهای جدید</button></div>'); return; }
    h += '<p class="stage-progress-meta">مرحلهٔ ' + fa(si + 1) + ' — پاسخ‌های درست: ' + fa(ok) + ' از ۲</p><p class="ask" style="font-weight:normal">' + (si === 0 ? 'گام این محور (فاصلهٔ هر دو خط کنار هم) چند است؟' : 'نقطهٔ زرد چه عددی را نشان می‌دهد؟') + '</p>' + readFig(g, pick === null ? null : { show: 1 }) + '<div class="mc m2" id="rm"></div>';
    h += '';
    var oh = ''; opts.forEach(function (op, k) { cls = pick === null ? '' : op.ok ? ' right' : k === pick ? ' wrong' : ''; oh += '<button type="button" class="btn opt' + cls + '" data-o="' + k + '"' + (pick === null ? '' : ' disabled') + '>' + op.h + '</button>'; });
    if (pick !== null) { o = opts[pick]; h += '<div class="fb ' + (o.ok ? 'ok' : 'bad') + '">' + (o.ok ? 'درست است! ✓' : o.m) + '</div><div class="ex">' + readExpl(g, si === 0 ? 'step' : 'val') + '</div><div class="opts"><button type="button" class="btn primary" data-n="1">' + (asked >= 2 ? (si === 3 ? 'پایان' : 'مرحلهٔ بعد') : 'سؤال بعدی') + '</button></div>'; }
    host.innerHTML = rr(h); host.querySelector('#rm').innerHTML = rr(oh);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.o !== undefined) { pick = +b.dataset.o; asked++; if (opts[pick].ok) { ok++; } paint(); }
    else if (b.dataset.n) { if (asked >= 2) { ok = 0; asked = 0; si++; if (si > 3) { fin = true; paint(); return; } } nw(); paint(); }
    else if (b.dataset.r) { si = 0; ok = 0; asked = 0; fin = false; nw(); paint(); }
  }); nw(); paint();
};

/* ---- جاگذاری: اول تقسیم‌بندی، بعد نقطه ---- */
function genPlace(stage) {
  var d, n, v, num, den, lo, hi, dc = false, t;
  if (stage === 0) { den = [3, 4, 5, 6, 8][R(0, 4)]; do { num = R(1, den - 1); } while (gcd(num, den) !== 1); lo = 0; hi = 1; v = num / den; }
  else if (stage === 1) { den = [2, 3, 4, 5][R(0, 3)]; do { num = R(1, 2 * den - 1); } while (gcd(num, den) !== 1 || num === den); if (Math.random() < 0.5) { num = -num; } lo = num < 0 ? -2 : 0; hi = num < 0 ? 0 : 2; if (abs(num) < den) { lo = num < 0 ? -1 : 0; hi = num < 0 ? 0 : 1; } v = num / den; }
  else { dc = true; var k = R(1, 19); if (k % 10 === 0) { k++; } if (Math.random() < 0.5) { k = -k; } num = k; den = 10; var g = gcd(abs(num), den); num /= g; den /= g; v = k / 10; lo = k < 0 ? (abs(k) <= 10 ? -1 : -2) : (k <= 10 ? 0 : 2) * (k <= 10 ? 1 : 1); if (k > 0) { lo = 0; hi = k <= 10 ? 1 : 2; } else { hi = 0; lo = abs(k) <= 10 ? -1 : -2; } }
  return { v: v, num: num, den: den, lo: lo, hi: hi, dc: dc, u: hi - lo, tex: dc ? tx(v) : frT(num, den) };
}
K.placer = function (host) {
  var ST = ['کسر بین ۰ و ۱', 'کسر منفی یا بزرگ‌تر از ۱', 'عدد اعشاری'], si = 0, ok = 0, q, np, phase, mist, msg, done, fin = false;
  function nw() { q = genPlace(si); np = null; phase = 'parts'; mist = 0; msg = ''; done = false; }
  function axisFor() {
    var o, ticks = [], hits = [], i, v, stepv, n = np || 1, marks = [], arcs = [], tot = q.u * n;
    for (i = 0; i <= tot; i++) { v = q.lo + i / n; ticks.push({ v: v, mn: i % n !== 0, z: abs(v) < 1e-9, t: i % n === 0 ? lab(v) : '' }); if (phase === 'tap' && !done) { hits.push({ v: v, k: '' }); } }
    if (done) { var i0 = Math.round((0 - q.lo) * n), i1 = Math.round((q.v - q.lo) * n), a, b; for (i = Math.min(i0, i1); i < Math.max(i0, i1) && abs(i1 - i0) <= 12; i++) { arcs.push({ a: q.lo + i / n, b: q.lo + (i + 1) / n, g: 1 }); } marks.push({ v: q.v, c: CL[4], h: M(q.tex), lv: 0 }); }
    return axisHTML({ min: q.lo - 0.08 * q.u, max: q.hi + 0.08 * q.u, ticks: ticks, hits: hits, hw: 1 / n, arcs: arcs, cls: 'lo' }, marks);
  }
  function paint() {
    var h = '<div class="stg">' + ST.map(function (s, i) { return '<span class="' + (i < si || fin ? 'dn' : i === si ? 'cu' : '') + '">' + (i < si || fin ? '✓ ' : '') + s + '</span>'; }).join('') + '</div>', opts, i;
    if (fin) { host.innerHTML = rr(h + '<div class="fb ok"><b>همهٔ مرحله‌ها را گذراندی!</b></div><div class="opts"><button type="button" class="btn" data-r="1">از اول، با عددهای جدید</button></div>'); return; }
    h += '<p class="stage-progress-meta">مرحلهٔ ' + fa(si + 1) + ' — پاسخ‌های درست: ' + fa(ok) + ' از ۲</p><div class="cq">' + M('\\text{} ' + q.tex).replace('\\text{} ', '') + '</div>';
    h += '<p class="ask" style="font-weight:normal">' + (phase === 'parts' ? 'هر واحد را به چند قسمتِ مساوی تقسیم کنیم تا این عدد روی یکی از خط‌ها بیفتد؟' : done ? '' : 'حالا روی جای درست عدد بزن.') + '</p>';
    h += axisFor();
    if (phase === 'parts' && !done) {
      opts = [10, 8, 6, 5, 4, 3, 2].filter(function (x) { return q.u * x <= 24; });
      h += '<div class="chips" style="direction:ltr">' + opts.map(function (x) { return '<button type="button" class="chip' + (x === np ? ' bad' : '') + '" data-p="' + x + '"><span dir="rtl">' + fa(x) + ' قسمت</span></button>'; }).join('') + '</div>';
    }
    if (msg) { h += '<div class="fb ' + (done ? 'ok' : 'bad') + '">' + msg + '</div>'; }
    if (done) { h += '<div class="ex"><p>مخرج ' + M(String(q.den)) + ' یعنی هر واحد را به ' + fa(q.den) + ' قسمت مساوی تقسیم کنیم؛ سپس ' + fa(abs(q.num)) + ' گام از صفر به ' + (q.v > 0 ? 'راست' : 'چپ') + ' می‌رویم:</p>' + K.dm(q.dc ? tx(q.v) + '=' + (q.v < 0 ? '-' : '') + tx(abs(q.v) * 10) + '\\times0.1' : q.tex + '=' + (q.num < 0 ? '-' : '') + abs(q.num) + '\\times\\dfrac{1}{' + q.den + '}') + '</div><div class="opts"><button type="button" class="btn primary" data-n="1">' + (mist === 0 && ok >= 2 ? (si === 2 ? 'پایان' : 'مرحلهٔ بعد') : 'سؤال بعدی') + '</button></div>'; }
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) {
    var c = e.target.closest('.chip'), hit = e.target.closest('.hit'), b = e.target.closest('button'), v, i;
    if (c && c.dataset.p) {
      np = +c.dataset.p;
      if (np % q.den === 0) { phase = 'tap'; msg = ''; } else { mist++; msg = 'با ' + fa(np) + ' قسمت، این عدد روی هیچ خطی نمی‌افتد؛ مخرج عدد ' + M(String(q.den)) + ' است. تقسیم‌بندی دیگری انتخاب کن.'; }
      paint();
    } else if (hit && phase === 'tap' && !done) {
      i = +hit.dataset.i; v = +(q.lo + i / np).toFixed(6);
      if (abs(v - q.v) < 1e-6) { done = true; if (!mist) { ok++; } msg = 'درست است! ✓'; } else { mist++; msg = 'این نقطه عدد ' + M(q.dc ? tx(v) : frT(Math.round((v - q.lo) * np) + q.lo * np, np)) + ' را نشان می‌دهد. جای ' + M(q.tex) + ' را دوباره پیدا کن.'; }
      paint();
    } else if (b && b.dataset.n) { if (ok >= 2) { ok = 0; si++; if (si > 2) { fin = true; paint(); return; } } nw(); paint(); }
    else if (b && b.dataset.r) { si = 0; ok = 0; fin = false; nw(); paint(); }
  }); nw(); paint();
};
/* ---- ذره‌بین: خواندن عدد رقم‌به‌رقم ---- */
K.lensRead = function (host) {
  var t, lo, d1, d2, lv, out;
  function nw() { lo = R(1, 4); d1 = R(1, 8); d2 = R(1, 9); t = +(lo + d1 / 10 + d2 / 100).toFixed(2); lv = 0; }
  host.innerHTML = '<div class="chips" id="lc"></div><div class="lz"></div>';
  out = host.querySelector('.lz');
  function paint() {
    var ticks = [], i, a, b, st, f, h, dg, tt = tx(t), marks = [], cap, names = ['نگاه کلی', 'ذره‌بین ×۱۰', 'نتیجه'];
    host.querySelector('#lc').style.direction = 'rtl'; host.querySelector('#lc').innerHTML = names.map(function (n, k) { return '<button type="button" class="chip' + (k === lv ? ' on' : '') + '" data-l="' + k + '">' + n + '</button>'; }).join('') + '<button type="button" class="chip" data-nw="1">عدد جدید</button>';
    if (lv === 0) {
      for (i = 0; i <= 10; i++) { ticks.push({ v: lo + i / 10, mn: i % 5 !== 0, t: i % 5 === 0 ? lab(lo + i / 10) : '' }); }
      marks.push({ v: t, c: CL[4], h: '؟', lv: 0 }); a = lo; b = lo + 1;
      cap = 'نقطه میان ' + M(String(lo)) + ' و ' + M(String(lo + 1)) + ' است و میان دو خط ریزتر افتاده. هر خانه یک دهم است. ذره‌بین را بزن.';
    } else {
      a = +(lo + d1 / 10).toFixed(2); b = +(a + 0.1).toFixed(2);
      for (i = 0; i <= 10; i++) { ticks.push({ v: a + i / 100, mn: i % 5 !== 0, t: i % 5 === 0 ? lab(+(a + i / 100).toFixed(2)) : '' }); }
      marks.push({ v: t, c: CL[4], h: lv === 2 ? M(tt) : '؟', lv: 0 });
      cap = lv === 1 ? 'بین ' + M(String(a)) + ' و ' + M(String(b)) + ' را ده برابر بزرگ کردیم؛ هر خانه یک صدم است.' : 'نقطه روی خط ' + fa(d2) + 'ام بعد از ' + M(String(a)) + ' است؛ یعنی ' + M(tt) + '.';
    }
    dg = '<div class="dgs"><div><small>بخش صحیح</small><span class="t dn" style="display:grid">' + lo + '</span></div><span class="p">.</span><div><small>دهم</small><span class="t ' + (lv >= 1 ? 'dn' : 'on') + '" style="display:grid">' + (lv >= 1 ? d1 : '؟') + '</span></div><div><small>صدم</small><span class="t ' + (lv === 2 ? 'dn' : lv === 1 ? 'on' : '') + '" style="display:grid">' + (lv === 2 ? d2 : '؟') + '</span></div></div>';
    h = axisHTML({ min: a - .06 * (b - a), max: b + .06 * (b - a), ticks: ticks, cls: 'lo' }, marks) + dg + '<p class="legend" style="font-size:.92rem;color:var(--ink)">' + cap + '</p>';
    var prior=out.querySelector('.dot'),prevX=prior?prior.getBoundingClientRect().left:null;out.innerHTML = rr(h);out.querySelectorAll('.dot,.tip').forEach(function(el){var x=el.getBoundingClientRect().left,dx=prevX===null?0:Math.max(-500,Math.min(500,prevX-x));el.animate([{opacity:.4,translate:dx+'px 0'},{opacity:1,translate:'0px 0'}],{duration:400,easing:'ease-out'});});
  }
  host.addEventListener('click', function (e) { var c = e.target.closest('.chip'); if (!c) { return; } if (c.dataset.nw) { nw(); } else if (c.dataset.l) { lv = +c.dataset.l; } paint(); });
  nw(); paint();
};

/* ---- انتخاب مقیاس مناسب ---- */
function genPick() {
  var S = [[1, 2], [1, 4], [1, 5], [1, 10]][R(0, 3)], sn = S[0], sd = S[1], ks, num = [], i, g, s = sn / sd, valid = function (st) { return num.every(function (x) { var r = x / st; return abs(r - Math.round(r)) < 1e-9; }); }, opts, cand, w;
  do { ks = shuffle([-4, -3, -2, -1, 1, 2, 3, 4, 5, 6]).slice(0, 3); g = abs(ks[0]); ks.forEach(function (k) { g = gcd(g, abs(k)); }); } while (g !== 1 || ks.every(function (k) { return k % 2 === 0; }) || (S[1] === 4 && ks.every(function (k) { return k % 2 === 0; })));
  num = ks.map(function (k) { return +(k * s).toFixed(6); });
  w = [s];
  w.push(+(s / 2).toFixed(6));
  cand = shuffle([1, 0.5, 0.25, 0.2, 0.1, 2 * s, 3 * s, 5 * s, 0.3, 2, 0.4]).filter(function (c) { return !valid(c) && nf(c) !== nf(s) && nf(c) !== nf(s / 2); });
  w = w.concat(cand.slice(0, 2));
  opts = shuffle(w.map(function (x, i) { return { st: x, ok: i === 0, fine: i === 1, h: M(tx(x)), m: i === 1 ? 'این گام هم کار می‌کند، اما بزرگ‌ترین گام نیست؛ محور بی‌دلیل شلوغ می‌شود.' : 'با این گام بعضی عددها روی خط نمی‌افتند (بین دو خط می‌مانند).' }; }));
  return { num: num, s: s, opts: opts, valid: valid };
}
function pickFig(q) {
  var mn = Math.min.apply(null, q.num), mx = Math.max.apply(null, q.num), n = Math.round((mx - mn) / q.s) + 2, lo = mn - q.s, lab2 = [], pts = [];
  q.num.forEach(function (x, i) { lab2.push(Math.round((x - lo) / q.s)); pts.push({ i: (x - lo) / q.s, c: CL[i], h: M(tx(x)), lv: i % 2 }); });
  return ax({ lo: +lo.toFixed(6), step: q.s, n: n, lab: lab2, pts: pts });
}
K.scalePick = function (host) {
  var q, pick = null;
  function nw() { q = genPick(); pick = null; }
  function paint() {
    var h = '<p class="ask">می‌خواهیم این سه عدد را دقیقاً روی خط‌های یک محور بگذاریم. کدام «گام» مناسب‌ترین است؟</p><div class="cq">' + M(q.num.map(tx).join(',\\quad ')) + '</div><div class="mc m2" id="sp"></div>', oh = '', o;
    q.opts.forEach(function (x, k) { var c = pick === null ? '' : x.ok ? ' right' : k === pick ? ' wrong' : ''; oh += '<button type="button" class="btn opt' + c + '" data-o="' + k + '"' + (pick === null ? '' : ' disabled') + '>' + x.h + '</button>'; });
    if (pick !== null) {
      o = q.opts[pick];
      h += '<div class="fb ' + (o.ok ? 'ok' : 'bad') + '">' + (o.ok ? 'درست است! ✓' : o.m) + '</div><div class="ex"><p>گام باید عددهای ' + q.num.map(function (x) { return M(tx(x)); }).join('، ') + ' را بشمارد؛ یعنی هر عدد باید مضرب صحیحی از گام باشد. بزرگ‌ترین گامِ ممکن:</p>' + AL(q.num.map(function (x) { return tx(x) + '&=' + Math.round(x / q.s) + '\\times' + tx(q.s); })) + pickFig(q) + '</div>';
    }
    h += '<div class="opts"><button type="button" class="btn primary" data-n="1">' + (pick === null ? 'مسئلهٔ دیگر' : 'مسئلهٔ بعدی') + '</button></div>';
    host.innerHTML = rr(h); host.querySelector('#sp').innerHTML = rr(oh);
  }
  host.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b || b.disabled) { return; } if (b.dataset.o !== undefined) { pick = +b.dataset.o; paint(); } else if (b.dataset.n) { nw(); paint(); } });
  nw(); paint();
};

/* ---- تمرین پایانی: ۵ سؤال ---- */
function qLetters() {   // کدام نقطه این عدد است؟
  var tv = [1, 2, 3, 5, 6, 7][R(0, 5)], idx = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8].filter(function (x) { return x !== tv; })).slice(0, 3), tgt = R(0, 3), L = ['A', 'B', 'C', 'D'], v = (tv - 4) / 4, tex2, pts = [], i, as = nf(v), fr = frT(Math.round(v * 4), 4);
  tex2 = Math.random() < 0.5 && abs(v * 4) % 4 !== 0 ? fr : tx(v);
  idx.splice(tgt, 0, tv);
  idx.forEach(function (k, i) { pts.push({ i: k, c: CL[i], h: L[i], lv: i % 2 }); });
  return {
    ask: 'کدام نقطه عدد ' + M(tex2) + ' را نشان می‌دهد؟', cls: 'm2', cq: ax({ lo: -1, step: 0.25, n: 8, lab: [0, 4, 8], pts: pts, cls: '' }),
    opts: idx.map(function (k, i) { return { h: L[i], ok: i === tgt, m: 'هر خانهٔ این محور ' + M('\\dfrac{1}{4}') + ' است. جای ' + M(tex2) + ' را از صفر بشمار.' }; }),
    expl: function () { return '<p>هر خانه ' + M('\\dfrac{1}{4}') + ' است. از صفر ' + fa(abs(Math.round(v * 4))) + ' خانه به ' + (v > 0 ? 'راست' : 'چپ') + ' می‌رویم؛ به نقطهٔ ' + L[tgt] + ' می‌رسیم.</p>' + verdict([['a', L[tgt]], ['b', '='], ['n', tex2]]); }
  };
}
function qRead(stage, vert, ask) {
  var g = genRead(stage, vert), op = readOpts(g, ask);
  return { ask: ask === 'step' ? 'گام این محور (فاصلهٔ دو خط کنار هم) چند است؟' : 'نقطهٔ زرد چه عددی را نشان می‌دهد؟', cls: 'm2', cq: readFig(g), opts: op, expl: function () { return readExpl(g, ask); } };
}
function qPick() {
  var q = genPick();
  return {
    ask: 'کدام «گام» عددهای زیر را دقیقاً روی خط‌های محور می‌گذارد و بزرگ‌ترین است؟', cls: 'm2', cq: M(q.num.map(tx).join(',\\quad ')),
    opts: q.opts.map(function (x) { return { h: x.h, ok: x.ok, m: x.m }; }),
    expl: function () { return AL(q.num.map(function (x) { return tx(x) + '&=' + Math.round(x / q.s) + '\\times' + tx(q.s); })) + pickFig(q); }
  };
}
K.scaleFinal = function (host) {
  var qs, i, ans;
  function build() { qs = [qRead(0, false, 'step'), qRead(1, false, 'val'), qLetters(), qPick(), qRead(3, true, 'val')]; i = 0; ans = []; }
  var fb = function (ok, html) { return '<div class="fb ' + (ok ? 'ok' : 'bad') + '">' + html + '</div>'; };
  function paint() {
    var q = qs[i], a = ans[i], h, oh = '', s, o;
    if (i === 5) {
      s = ans.filter(function (x, k) { return qs[k].opts[x].ok; }).length;
      host.innerHTML = rr('<div class="fb ' + (s >= 4 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(s) + ' از ۵</b><br>' + (s === 5 ? 'عالی بود! محور برایت زبان آشنایی است.' : s >= 3 ? 'خوب بود. بخش‌هایی را که اشتباه کردی دوباره مرور کن.' : 'یک بار دیگر درس را مرور کن؛ بعد با محورهای جدید امتحان کن.') + '</div><div class="opts end-actions"><button type="button" class="btn" data-pv="1">مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1">سؤال‌های جدید</button></div>'); return;
    }
    h = '<div class="stg">' + qs.map(function (x, k) { return '<span class="' + (ans[k] !== undefined ? (qs[k].opts[ans[k]].ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">' + q.ask + '</p>' + (q.cq ? '<div class="cq" style="font-size:1rem">' + q.cq + '</div>' : '') + '<div class="mc ' + q.cls + '" id="mcx"></div>';
    q.opts.forEach(function (op, k) { oh += '<button type="button" class="btn opt' + (a !== undefined ? (op.ok ? ' right' : k === a ? ' wrong' : '') : '') + '" data-o="' + k + '"' + (a !== undefined ? ' disabled' : '') + '>' + op.h + '</button>'; });
    if (a !== undefined) { o = q.opts[a]; h += fb(o.ok, o.ok ? 'درست است! ✓' : (o.m || 'این گزینه درست نیست.')) + '<div class="ex">' + q.expl() + '</div>'; }
    h += '<div class="opts"><button type="button" class="btn" data-p="1"' + (i ? '' : ' disabled') + '>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (a === undefined ? ' disabled' : '') + '>' + (i === 4 ? 'مشاهدهٔ نتیجه':'سؤال بعدی') + '</button></div>';
    host.innerHTML = rr(h); host.querySelector('#mcx').innerHTML = rr(oh);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.o) { ans[i] = +b.dataset.o; paint(); } else if (b.dataset.nx) { i++; paint(); } else if (b.dataset.p) { i--; paint(); } else if (b.dataset.pv) { i = 0; paint(); } else if (b.dataset.r) { build(); paint(); }
  }); build(); paint();
};
var cards3 = function (cells) { return '<div class="sg sg3">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.h + '</b><span>' + c.t + '</span></div>'; }).join('') + '</div>'; };
var refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };
var arcsRange = function (a, b, t, g) { var o = [], i; for (i = a; i < b; i++) { o.push({ a: i, b: i + 1, t: i === a ? t : '', g: g }); } return o; };
var fig1 = function (inner, cap) { return '<div class="figs one"><figure>' + inner + '<figcaption>' + cap + '</figcaption></figure></div>'; };

return {
  html: function () {
    var T = String.raw;
    return [
      K.sn('۱', 'محور؛ یک خط‌کش با سه رکن'),
      '<p>فرض کن فقط یک نقطه روی یک خط کشیده‌ام و می‌پرسم: «این نقطه چه عددی است؟» نمی‌توانی جواب بدهی؛ چون خطِ تنها اطلاعات کافی ندارد. محور اعداد سه چیز لازم دارد:</p>',
      cards3([{ c: 'p', h: M('0'), t: 'مبدأ: جایی که صفر است و شمردن از آن شروع می‌شود.' }, { c: 'n', h: M('\\rightarrow'), t: 'جهت: به سمت راست عدد بزرگ‌تر می‌شود.' }, { c: 'r3', h: M('\\times'), t: 'مقیاس: هر خانه (گام) چند واحد است.' }]),
      '<p>مقیاس را امتحان کن. نقطه سه خانه بعد از صفر است و همان‌جا می‌ماند؛ اما عددش با گام عوض می‌شود:</p><div class="cover" id="sd" style="animation:none"></div>',
      K.box('note', 'این درس در ادامهٔ مقایسه است', '<p>در درس مقایسه دیدی که عدد راست‌تر بزرگ‌تر است. اینجا یاد می‌گیریم عددِ دقیقِ یک نقطه را از روی محور بخوانیم و عددی را که به ما داده‌اند دقیق روی محور بگذاریم.</p>'),

      K.sn('۲', 'اندازهٔ هر گام روی محور را پیدا کن'),
      '<p>خط‌های محور با فاصلهٔ مساوی کشیده می‌شوند، ولی معمولاً فقط چند خط برچسب دارند. از روی دو برچسب می‌توانیم گام را حساب کنیم:</p>',
      K.box('note', 'قاعدهٔ گام', '<p>گام = (اختلاف دو عدد برچسب‌دار) ÷ (تعداد فاصله‌ها بین آن‌ها)</p>'),
      '<h4>مثال اول</h4><p>بین ' + M('10') + ' و ' + M('20') + ' پنج فاصله می‌بینیم (فاصله‌ها را می‌شماریم، نه خط‌ها را):</p>', K.dm('\\dfrac{20-10}{5}=2'),
      ax({ lo: 6, step: 2, n: 9, lab: [2, 7], arcs: arcsRange(2, 7, '+۲'), cap: 'هر خانه ۲ واحد است.' }),
      '<h4>مثال دوم</h4><p>بین ' + M('0') + ' و ' + M('1') + ' چهار فاصله داریم:</p>', K.dm('\\dfrac{1-0}{4}=0.25'),
      ax({ lo: -0.25, step: 0.25, n: 7, lab: [1, 5], arcs: arcsRange(1, 5, '+۰.۲۵'), cap: 'هر خانه ' + M('0.25') + ' است.' }),
      '<h4>مثال سوم: با عدد منفی</h4><p>بین ' + M('-2') + ' و ' + M('1') + ' شش فاصله داریم:</p>', K.dm('\\dfrac{1-(-2)}{6}=\\dfrac{3}{6}=0.5'),
      ax({ lo: -3, step: 0.5, n: 10, lab: [2, 8], arcs: arcsRange(2, 8, '+۰.۵'), cap: 'هر خانه ' + M('0.5') + ' است.' }),
      K.box('err', '⚠ خطای رایج', T`<p>به‌جای فاصله‌ها، خط‌ها را می‌شمارند. بین ۱۰ و ۲۰ در مثال اول شش خط هست (با خودِ ۱۰ و ۲۰)، اما فقط پنج فاصله. اگر بر ۶ تقسیم کنی، گام $\dfrac{10}{6}$ می‌شود که با محور جور درنمی‌آید. همیشه «فاصله‌ها» را بشمار.</p>`),

      K.sn('۳', 'خواندن عدد از روی محور'),
      '<p>وقتی گام را داری، خواندن نقطه آسان است:</p><ol><li>گام را پیدا کن.</li><li>نزدیک‌ترین عدد برچسب‌دار را انتخاب کن.</li><li>از یک عددِ مشخص روی محور شروع کن و فاصله‌ها را تا نقطه بشمار. اگر به سمت راست می‌روی، اندازهٔ گام‌ها را جمع کن؛ اگر به سمت چپ می‌روی، آن‌ها را کم کن.</li></ol>',
      '<h4>مثال اول</h4><p>گام ' + M('2') + ' است و نقطه سه خانه بعد از ' + M('10') + ' قرار دارد:</p>', K.dm('10+3\\times2=16'),
      ax({ lo: 6, step: 2, n: 9, lab: [2, 7], pts: [{ i: 5, h: M('16'), c: CL[4] }], arcs: arcsRange(2, 5, '+۲', 1) }),
      '<h4>مثال دوم: سمت راست صفر و چپ آن</h4><p>گام ' + M('0.5') + ' است. نقطه، دو خانه بعد از ' + M('-2') + ' قرار دارد:</p>', K.dm('-2+2\\times0.5=-1'),
      ax({ lo: -3, step: 0.5, n: 10, lab: [2, 8], pts: [{ i: 4, h: M('-1'), c: CL[4] }], arcs: arcsRange(2, 4, '+۰.۵', 1) }),
      '<p>و اگر نقطه، دو خانه قبل از ' + M('-2') + ' باشد، باید گام‌ها را کم کنیم:</p>', K.dm('-2-2\\times0.5=-3'),
      ax({ lo: -3, step: 0.5, n: 10, lab: [2, 8], pts: [{ i: 0, h: M('-3'), c: CL[4] }], arcs: arcsRange(0, 2, '−۰.۵', 1) }),
      K.box('err', '⚠ خطای رایج', '<p>در سمت چپ، با هر خانه که جلو می‌روی، عدد کوچک‌تر می‌شود. اگر نقطه‌ای را که دو خانه چپِ ' + M('-2') + ' است، ' + M('-1') + ' بخوانی، جهت را اشتباه رفته‌ای؛ ' + M('-1') + ' سمت راستِ ' + M('-2') + ' است.</p>'),

      K.sn('۴', 'وقتی صفر دیده نمی‌شود: شروع دیگر و محور عمودی'),
      '<p>محور لازم نیست از صفر شروع شود یا افقی باشد. قاعده‌ها همان است: گام را از دو برچسب بگیر و خانه‌ها را بشمار. در این محور، گام ' + M('10') + ' است:</p>',
      ax({ lo: 90, step: 10, n: 8, lab: [1, 6], pts: [{ i: 4, h: M('130'), c: CL[4] }], cap: 'نقطه سه خانه بعد از ' + M('100') + ' است: ' + M('100+3\\times10=130') }),
      '<p>روی محور عمودی، بالا یعنی بزرگ‌تر، مثل دماسنج:</p>',
      fig1(vax({ lo: 0, step: 5, n: 8, lab: [0, 4, 8], pt: { i: 5, h: M('25'), c: CL[4] } }), 'گام ' + M('5') + ' است؛ نقطه پنج خانه بالاتر از صفر قرار دارد.'),
      K.box('note', 'پیش‌نگاه', '<p>وقتی محور افقی و عمودی کنار هم قرار می‌گیرند (دستگاه مختصات)، هر محور مقیاس خودش را دارد؛ پس برای هر محور جداگانه گام را حساب کن.</p>'),

      K.sn('۵', 'گذاشتن یک عدد روی محور'),
      '<p>حالا برعکس: عدد را داده‌اند و باید جایش را پیدا کنیم. برای کسر دو مرحله داریم:</p>',
      K.box('note', 'قاعدهٔ جاگذاری', '<p>برای عدد ' + M('\\dfrac{n}{d}') + ': هر واحد را به <b>d</b> قسمت مساوی تقسیم کن، بعد <b>n</b> گام از صفر برو؛ اگر عدد مثبت است به راست، اگر منفی است به چپ.</p>'),
      '<h4>مثال اول</h4><p>جای ' + M('\\dfrac{3}{4}') + ' را پیدا کن. هر واحد را به چهار قسمت تقسیم می‌کنیم و سه گام می‌رویم:</p>',
      ax({ lo: 0, step: 0.25, n: 4, lab: [0, 4], pts: [{ i: 3, h: M('\\dfrac{3}{4}'), c: CL[4], lv: 0 }], arcs: arcsRange(0, 3, '+¼', 1), cls: '', cap: 'سه گامِ یک‌چهارم از صفر.' }),
      '<h4>مثال دوم: بزرگ‌تر از یک</h4><p>جای ' + M('\\dfrac{7}{4}') + ' را پیدا کن. هر گام ' + M('\\dfrac{1}{4}') + ' است و هفت گام لازم داریم. چون ' + M('7\\div4') + ' یعنی یک و سه‌چهارم، نقطه بین ' + M('1') + ' و ' + M('2') + ' می‌افتد:</p>',
      ax({ lo: 0, step: 0.25, n: 8, lab: [0, 4, 8], pts: [{ i: 7, h: M('\\dfrac{7}{4}'), c: CL[4], lv: 0 }], cls: '', cap: 'هفتمین خط بعد از صفر.' }),
      '<h4>مثال سوم: کسر منفی</h4><p>جای ' + M('-\\dfrac{5}{3}') + ' را پیدا کن. هر واحد را به سه قسمت تقسیم می‌کنیم و پنج گام به چپ می‌رویم:</p>',
      ax({ lo: -2, step: 1 / 3, n: 6, lab: [0, 3, 6], f: function (v) { return lab(Math.round(v)); }, pts: [{ i: 1, h: M('-\\dfrac{5}{3}'), c: CL[4], lv: 0 }], arcs: arcsRange(1, 6, '', 1), cls: '', cap: 'پنج گام یک‌سوم به سمت چپِ صفر؛ بین ' + M('-2') + ' و ' + M('-1') + '.' }),
      '<h4>مثال چهارم: عدد اعشاری</h4><p>جای ' + M('1.7') + ' را پیدا کن. اعشاری یعنی تقسیم هر واحد به ده قسمت؛ ' + M('1.7') + ' یعنی هفده دهم و باید هفده گام یک‌دهمی برویم:</p>',
      ax({ lo: 0, step: 0.1, n: 20, lab: [0, 10, 20], pts: [{ i: 17, h: M('1.7'), c: CL[4], lv: 0 }], cls: '', cap: 'بین ' + M('1') + ' و ' + M('2') + '، هفتمین خط بعد از ' + M('1') + '.' }),

      K.sn('۶', 'ذره‌بین: خواندن رقم‌به‌رقم'),
      '<p>گاهی نقطه بین دو خط افتاده و برای خواندنش باید بزرگ‌نمایی کنیم. ابتدا بخش صحیح را از خط‌های بزرگ می‌خوانیم، بعد رقم دهم را، بعد با ذره‌بین رقم صدم را:</p><div class="cover" id="lr" style="animation:none"></div>',
      '<p>این همان کاری است که در درس مقایسه دربارهٔ ' + M('\\pi') + ' کردیم: هر بار پنجره را ده برابر کوچک می‌کنیم و رقم بعدی پیدا می‌شود.</p>',

      K.sn('۷', 'انتخاب مقیاس مناسب'),
      '<p>گاهی ما خودمان باید محور را بکشیم. گام را باید طوری انتخاب کنیم که همهٔ عددها دقیقاً روی خط‌ها بیفتند. اگر عددهای ' + M('-0.3,\\ 0.4,\\ 0.8') + ' را روی محور با گام ' + M('0.5') + ' بگذاریم، هر سه بین دو خط می‌مانند:</p>',
      ax({ lo: -0.5, step: 0.5, n: 4, lab: [0, 1, 2, 3, 4], pts: [{ i: 0.4, h: M('-0.3'), c: CL[0], lv: 0 }, { i: 1.8, h: M('0.4'), c: CL[1], lv: 1 }, { i: 2.6, h: M('0.8'), c: CL[2], lv: 0 }], cls: '', cap: 'گام ' + M('0.5') + ': نقطه‌ها روی خط‌ها نمی‌افتند ✗' }),
      '<p>با گام ' + M('0.1') + ' هر سه عدد دقیقاً روی خط می‌افتند:</p>',
      ax({ lo: -0.4, step: 0.1, n: 13, lab: [1, 8, 12], pts: [{ i: 1, h: M('-0.3'), c: CL[0], lv: 0 }, { i: 8, h: M('0.4'), c: CL[1], lv: 1 }, { i: 12, h: M('0.8'), c: CL[2], lv: 0 }], cls: '', cap: 'گام ' + M('0.1') + ': هر سه عدد روی خط‌ها می‌نشینند ✓' }),
      K.box('note', 'چطور گام را انتخاب کنیم؟', '<p>هر عدد باید مضرب صحیحی از گام باشد. از میان گام‌هایی که این شرط را دارند، بزرگ‌ترین را انتخاب می‌کنیم تا محور شلوغ نشود. برای کسرها هم از مخرج مشترک استفاده می‌کنیم: عددهای ' + M('\\dfrac{1}{4},\\ \\dfrac{3}{4},\\ -\\dfrac{1}{2}') + ' با گام ' + M('\\dfrac{1}{4}') + ' جا می‌شوند.</p>'),

      K.sn('۸', 'وقتی عدد روی خط نمی‌افتد: تخمین'),
      '<p>بعضی عددها هرگز دقیقاً روی خط‌های یک محورِ معمولی نمی‌افتند، مثل ' + M('\\dfrac{2}{3}') + ' یا ' + M('\\pi') + '. برای پیداکردن جایشان آن‌ها را اعشاری می‌کنیم و می‌بینیم بین کدام دو خط هستند:</p>',
      ax({ lo: 0, step: 0.1, n: 10, lab: [0, 5, 10], pts: [{ i: 20 / 3, h: M('\\dfrac{2}{3}'), c: CL[4], lv: 0 }], cls: '', cap: M('\\dfrac{2}{3}=0.666\\ldots') + ' است؛ بین ' + M('0.6') + ' و ' + M('0.7') + '، کمی نزدیک‌تر به ' + M('0.7') + '.' }),
      ax({ lo: 3, step: 0.1, n: 4, lab: [0, 2, 4], pts: [{ i: 1.4159265, h: M('\\pi'), c: CL[1], lv: 0 }], cls: '', cap: M('\\pi=3.14159\\ldots') + ': بین ' + M('3.1') + ' و ' + M('3.2') + '، نزدیک‌تر به ' + M('3.1') + '.' }),
      K.box('note', 'ترفند', '<p>اگر نقطه‌ای دقیقاً وسط دو خط بود، عدد آن برابر میانگین دو خط است. مثلاً وسطِ ' + M('2') + ' و ' + M('3') + ' عدد ' + M('2.5') + ' است.</p>'),

      K.sn('۹', 'راهنمای سریع خواندن و نمایش اعداد روی محور'),
      refs([{ c: 'r1', t: 'گام محور', r: 'اختلاف دو برچسب را بر تعداد فاصله‌ها تقسیم کن.', e: '\\dfrac{20-10}{5}=2' }, { c: 'r2', t: 'خواندن نقطه', r: 'از یک برچسب شروع کن؛ به راست جمع کن، به چپ کم کن.', e: '10+3\\times2=16' }, { c: 'r3', t: 'گذاشتن کسر', r: 'هر واحد را به مخرج قسمت کن و صورت گام برو.', e: '\\dfrac{3}{4}=3\\times\\dfrac{1}{4}' }, { c: 'r4', t: 'عدد منفی', r: 'همان کار، ولی گام‌ها به چپ.', e: '-\\dfrac{5}{3}=-5\\times\\dfrac{1}{3}' }, { c: 'r1', t: 'ذره‌بین', r: 'بخش صحیح، دهم، صدم؛ هر بار ده برابر بزرگ‌تر.', e: '2.37=2+0.3+0.07' }, { c: 'r3', t: 'مقیاس مناسب', r: 'بزرگ‌ترین گامی که همهٔ عددها مضرب صحیحش باشند.', e: '0.3,\\ 0.4,\\ 0.8\\to0.1' }]),

      K.sn('۱۰', 'گام و خواندن'),
      '<p>هر مرحله با دو پاسخ درست تمام می‌شود. بعد از هر پاسخ، گام‌به‌گام می‌بینی چرا.</p><div class="cover" id="sr" style="animation:none"></div>',
      K.sn('۱۱', 'جاگذاری دقیق'),
      '<p>اول تقسیم‌بندی هر واحد را انتخاب کن، بعد روی جای عدد بزن. اگر تقسیم‌بندی‌ات مناسب نباشد، می‌گوییم چرا.</p><div class="cover" id="pl" style="animation:none"></div>',
      K.sn('۱۲', 'کدام مقیاس؟'),
      '<p>سه عدد داده می‌شود؛ بزرگ‌ترین گامی را که همه را دقیقاً روی خط‌ها می‌گذارد انتخاب کن.</p><div class="cover" id="pk" style="animation:none"></div>',
      K.sn('۱۳', 'تمرین پایانی'),
      '<p>پنج سؤال با محورهای تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover" id="fn" style="animation:none"></div>',
      K.box('sum', 'بعد از این درس باید بتوانی', T`<ul><li>سه رکن محور را بشناسی: مبدأ، جهت و مقیاس.</li><li>گام محور را از دو عدد برچسب‌دار و تعداد فاصله‌ها حساب کنی.</li><li>عدد یک نقطه را روی محور افقی یا عمودی، با هر شروع و هر گامی بخوانی.</li><li>کسر، عدد اعشاری و عدد منفی را دقیق روی محور بگذاری.</li><li>مقیاس مناسب را برای نمایش چند عدد انتخاب کنی.</li><li>جای عددهایی مثل $\dfrac{2}{3}$ و $\pi$ را تقریباً پیدا کنی.</li></ul><p>این مهارت پایهٔ درس‌های قدرمطلق و فاصله روی محور، دستگاه مختصات و نمایش جواب نامعادله روی محور است.</p>`)
    ].join('');
  },
  init: function (panel) {
    K.scaleDemo(panel.querySelector('#sd')); K.lensRead(panel.querySelector('#lr')); K.scaleRead(panel.querySelector('#sr')); K.placer(panel.querySelector('#pl')); K.scalePick(panel.querySelector('#pk')); K.scaleFinal(panel.querySelector('#fn'));
  }
};
  }
};
