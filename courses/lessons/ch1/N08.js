/* درس مهارت N08 — قدرمطلق و فاصله روی محور (فصل ۱) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.N08 = {
  needs: ['utils'],
  setup: function (K0) {
var ML = window.MathLite, fa = ML.fa, rr = ML.renderRich, abs = Math.abs, df = K0.df;
var _u = K0._u, R = _u.R, M = _u.M, shuffle = _u.shuffle;
var K = Object.create(K0);   // K0 = هستهٔ مشترک؛ K = همان + ابزارهای اختصاصی این درس

/* ---- استایل اختصاصی این درس؛ فقط از رنگ‌ها و قالب‌های موجود پروژه ---- */
(function () {
  if (document.getElementById('css-N08')) { return; }
  var s = document.createElement('style'); s.id = 'css-N08';
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
    '.lv.lo .ax{top:94px}.lv.lo .tk{top:87px}.lv.lo .tk.mn{top:90px}.lv.lo .tk.z{top:83px}.lv.lo .tn{top:107px}.lv.lo .dot{top:85px}.lv.lo .hit{top:50px;height:80px}',
    '.lv.lo .stem{bottom:41px}',
    '.lv .ax{position:absolute;left:-16px;right:-16px;top:140px;border-top:2.5px solid var(--ink)}',
    '.lv .ax:before,.lv .ax:after{content:"";position:absolute;top:-7px;border:6px solid transparent}',
    '.lv .ax:after{right:-2px;border-left:9px solid var(--ink);border-right:0}',
    '.lv .ax:before{left:-2px;border-right:9px solid var(--ink);border-left:0}',
    '.lv .tk{position:absolute;top:133px;height:14px;border-left:2px solid var(--ink)}',
    '.lv .tk.mn{top:136px;height:8px;border-color:#aab4c4}',
    '.lv .tk.z{top:129px;height:22px;border-left-width:3px}',
    '.lv .tn{position:absolute;top:153px;transform:translateX(-50%);font:bold .84rem Tahoma,sans-serif;white-space:nowrap}',
    '.lv .hit{position:absolute;top:50px;height:110px;cursor:pointer;border-radius:8px}',
    '.lv .hit:hover{background:transparent}',
    '.lv .hit.ok,.lv .hit.no{background:transparent}',
    '.lv .dot{position:absolute;top:131px;width:18px;height:18px;border-radius:50%;border:2.5px solid var(--ink);transform:translateX(-50%);background:var(--c,var(--accent));box-shadow:0 2px 0 rgba(20,33,61,.3);pointer-events:none}',
    '.lv .dot.gh{background:#fff;border-style:dashed;box-shadow:none;width:12px;height:12px;margin-top:3px}',
    '.lv .stem{position:absolute;bottom:47px;width:0;margin-left:-1px;border-left:2px solid var(--ink);pointer-events:none}',
    '.lv .tip{position:absolute;transform:translateX(-50%);background:var(--ink);color:#fff;border-radius:9px;padding:3px 10px;line-height:1.25;white-space:nowrap;z-index:2;pointer-events:none;font-weight:bold}',
    '.lv .tip:after{content:"";position:absolute;left:50%;bottom:-6px;margin-left:-6px;border:6px solid transparent;border-top-color:var(--ink);border-bottom:0}',
    '.lv .arc{position:absolute;top:104px;height:24px;border:2px solid var(--pink);border-bottom:0;border-radius:16px 16px 0 0;pointer-events:none}',
    '.lv.lo .arc{top:60px}',
    '.lv .arc i{position:absolute;left:50%;top:-24px;transform:translateX(-50%);font:bold .76rem Tahoma,sans-serif;font-style:normal;color:var(--pink);white-space:nowrap;background:#fff;padding:0 3px}',
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
    /* تاکردن محور */
    '.fold{position:relative;height:156px;direction:ltr;margin:8px 34px 0;perspective:900px}',
    '.fold .layer{position:absolute;top:0;bottom:0;width:50%}',
    '.fold .fr{left:50%}.fold .fl{left:0;transform-origin:100% 50%;background:linear-gradient(90deg,rgba(214,69,122,.04),rgba(214,69,122,.14));border-radius:8px 0 0 8px}',
    '.fold .fb{left:50%;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(270deg,rgba(214,69,122,.04),rgba(214,69,122,.14));border-radius:0 8px 8px 0}',
    '.fold .ax{position:absolute;left:0;right:0;top:104px;border-top:2.5px solid var(--ink)}',
    '.fold .fb .ax{border-color:var(--pink)}',
    '.fold .tk{position:absolute;top:97px;height:14px;border-left:2px solid var(--ink)}.fold .fb .tk{border-color:var(--pink)}.fold .tk.z{top:93px;height:22px;border-left-width:3px}',
    '.fold .tn{position:absolute;top:116px;transform:translateX(-50%);font:bold .8rem Tahoma,sans-serif;white-space:nowrap}.fold .fb .tn{color:var(--pink)}',
    '.fold .dot{position:absolute;top:95px;width:18px;height:18px;border-radius:50%;border:2.5px solid var(--ink);transform:translateX(-50%);background:var(--c,var(--accent));box-shadow:0 2px 0 rgba(20,33,61,.3)}',
    '.fold .tip{position:absolute;bottom:60px;transform:translateX(-50%);background:var(--ink);color:#fff;border-radius:9px;padding:3px 10px;line-height:1.25;white-space:nowrap;font-weight:bold;z-index:2}',
    '.fold .tip:after{content:"";position:absolute;left:50%;bottom:-6px;margin-left:-6px;border:6px solid transparent;border-top-color:var(--ink);border-bottom:0}',
    '.fold .side{position:absolute;top:2px;font:bold .74rem Tahoma,sans-serif;color:var(--ink-soft)}',
    '.pn{display:inline-block;direction:ltr}',
    '.snt{display:block;direction:rtl;font-size:1rem;line-height:1.9;text-align:center}.snt .katex{font-size:1.1em}',
    '.trow{display:flex;gap:10px;align-items:center;justify-content:center;margin:6px 0;direction:ltr}.trow .tm{font:bold 1.1rem Tahoma;flex:none}.trow .tm.oky{color:var(--accent-dark)}.trow .tm.nox{color:#b23a3a}',
    '.nleq .or{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#fff;border:2px solid var(--line);font:bold .8rem Tahoma,sans-serif;direction:rtl;color:var(--ink-soft);vertical-align:middle}',
    '.fold .ghost{position:absolute;left:0;width:50%;top:0;bottom:0;border:2px dashed var(--line);border-radius:8px 0 0 8px}',
    '.hist>span{border:2px solid var(--line);border-radius:10px;padding:2px 10px;font-size:.9rem;background:#fff}',
    '.sgnrow{display:flex;gap:12px;justify-content:center;margin:10px 0;direction:ltr}.sgnrow .btn{min-width:84px;min-height:54px;font-size:1.1rem;font-weight:bold}',
    '.sgnrow .btn.right{background:#d2f0e9;border-color:var(--accent)}.sgnrow .btn.wrong{background:#fbd5d5;border-color:#b23a3a}.sgnrow .btn:disabled{opacity:1}',
    '.nleq.wrap{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 2px}.nleq.sm{font-size:1rem}.nleq.sm i{min-height:32px;padding:2px 8px}',
    '@media(max-width:520px){.lv{margin:6px 30px 0}.mc.m3{gap:6px}.dgs .t{width:38px;height:44px}}',
    '.n8-steps-options{display:grid!important;grid-template-columns:minmax(180px,300px)!important;justify-content:center;gap:8px}.n8-steps-options .opt{min-height:44px;font-size:1rem}',
    '.n8-nav{display:flex!important;direction:rtl;justify-content:space-between!important;width:100%}.n8-nav .btn{min-width:120px;min-height:36px;height:auto;padding:5px 12px;font-size:.88rem}',
    '.n8-tf .sgnrow .btn{min-width:120px;min-height:44px;font-size:1rem;font-weight:600;padding:5px 12px;box-shadow:2px 2px 0 var(--ink)}.n8-tf .sgnrow .btn:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}',
    '.n8-radar-new .btn{min-height:36px;font-size:.88rem;padding:5px 12px}',
    '.lv .hit:hover,.lvv .hit:hover{background:transparent!important}.lv .hover-dot{position:absolute;top:131px;width:22px;height:22px;border:2px dashed var(--ink);border-radius:50%;transform:translate(-50%,-2px);pointer-events:none;z-index:5;background:rgba(20,33,61,.08)}.lv .hover-tip{position:absolute;top:89px;transform:translateX(-50%);background:var(--ink);border-radius:9px;color:white;padding:3px 8px;white-space:nowrap;pointer-events:none;z-index:6;font-size:.82rem}.lv .hover-tip:after{content:"";position:absolute;left:50%;bottom:-6px;transform:translateX(-50%);border:6px solid transparent;border-top-color:var(--ink);border-bottom:0}'
  ].join('\n');
  document.head.appendChild(s);
})();

/* ================= ابزارهای مشترک ================= */
var gcd = function (a, b) { a = abs(a); b = abs(b); while (b) { var t = a % b; a = b; b = t; } return a; };
var nf = function (v) { var s = String(+(+v).toFixed(6)); return s === '-0' ? '0' : s; };
var lab = function (v) { var s = nf(abs(v)); return (v < -1e-9 ? '\u2212' : '') + fa(s); };
var tx = function (v) { return nf(v); };
var AL = function (lines) { return K.dm('\\begin{aligned}' + lines.join('\\\\') + '\\end{aligned}'); };
var verdict = function (parts, cls) { return '<div class="nleq vd ' + (cls || '') + '">' + parts.map(function (p) { return '<i class="' + p[0] + '">$' + p[1] + '$</i>'; }).join('') + '</div>'; };
var CL = ['var(--accent)', 'var(--pink)', '#4c5fd5', '#e08a00', 'var(--mark)'];
var pn = function (v) { return v < 0 ? '(' + tx(v) + ')' : tx(v); };            // عدد منفی داخل پرانتز
var AB = function (s) { return '\\left|' + s + '\\right|'; };                   // قدرمطلق
var fixK = function (root) { [].forEach.call(root.querySelectorAll('.opt .katex svg'), function (v) { v.style.height = 'inherit'; v.style.maxWidth = 'none'; v.style.width = '100%'; }); };

/* ---- محور افقی HTML ---- */
/* o: {min,max,ticks:[{v,t,mn,z}], hits:[{v,c}] , hw, arcs:[{a,b,t,g}], cls}؛ marks: [{v,c,h,lv,gh}] */
function axisHTML(o, marks) {
  var sp = o.max - o.min, pc = function (v) { return (v - o.min) / sp * 100; }, h = '<div class="lv ' + (o.cls || '') + '"><i class="ax"></i>';
  (o.arcs || []).forEach(function (a) { h += '<span class="arc' + (a.g ? ' g' : '') + '" style="left:' + pc(a.a) + '%;width:' + (pc(a.b) - pc(a.a)) + '%">' + (a.t ? '<i>' + a.t + '</i>' : '') + '</span>'; });
  (o.ticks || []).forEach(function (t) { h += '<i class="tk' + (t.mn ? ' mn' : '') + (t.z ? ' z' : '') + '" style="left:' + pc(t.v) + '%"></i>' + (t.t ? '<span class="tn" dir="ltr" style="left:' + pc(t.v) + '%">' + t.t + '</span>' : ''); });
  (o.hits || []).forEach(function (x, i) { h += '<b class="hit' + (x.k ? ' ' + x.k : '') + '" data-i="' + i + '" data-label="' + lab(x.v) + '" style="left:' + (pc(x.v) - 50 * o.hw / sp) + '%;width:' + (100 * o.hw / sp) + '%"></b>'; });
  (marks || []).forEach(function (m) {
    var hs = m.lv ? 66 : 10, low = (o.cls || '').indexOf('lo') >= 0;
    if (m.lv && m.h) { h += '<i class="stem" style="left:' + pc(m.v) + '%;height:' + (hs + 4) + 'px"></i>'; }
    h += '<i class="dot' + (m.gh ? ' gh' : '') + '" style="left:' + pc(m.v) + '%;--c:' + m.c + '"></i>';
    if (m.h) { h += '<span class="tip" style="left:' + pc(m.v) + '%;bottom:' + (55 + hs - 10 - (low ? 6 : 0)) + 'px">' + m.h + '</span>'; }
  });
  return h + '</div>';
}
/* محور ساده با قدم مشخص: o={lo,step,n,lab:[اندیس‌های دارای برچسب]|'all',pts:[{i,c,h,lv}],arcs:[{a,b,t}] (به اندیس),cap,cls,f} */
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
/* ---- تاکردن محور: نیمهٔ منفی روی نیمهٔ مثبت می‌افتد ---- */
K.absFold = function (host) {
  var X = -4, t = 0, timer = null, out, caps;
  var W = 7, pc = function (v) { return (v + W) / (2 * W) * 100; };
  function layerL() {
    var h = '<i class="ax"></i>', k;
    for (k = -W; k <= 0; k++) { h += '<i class="tk' + (k === 0 ? ' z' : '') + '" style="left:' + (k + W) / W * 100 + '%"></i><span class="tn" dir="ltr" style="left:' + (k + W) / W * 100 + '%">' + lab(k) + '</span>'; }
    h += '<i class="dot" style="left:' + (X + W) / W * 100 + '%;--c:' + CL[1] + '"></i><span class="tip" style="left:' + (X + W) / W * 100 + '%">' + M(tx(X)) + '</span>';
    return h;
  }
  function layerR() {
    var h = '<i class="ax"></i>', k;
    for (k = 0; k <= W; k++) { h += '<i class="tk' + (k === 0 ? ' z' : '') + '" style="left:' + k / W * 100 + '%"></i><span class="tn" dir="ltr" style="left:' + k / W * 100 + '%">' + lab(k) + '</span>'; }
    h += '<i class="dot" style="left:' + abs(X) / W * 100 + '%;--c:' + CL[0] + '"></i>';
    return h;
  }
  function layerB() {
    var h = '<i class="ax"></i>', k;
    for (k = 0; k <= W; k++) { h += '<i class="tk' + (k === 0 ? ' z' : '') + '" style="left:' + k / W * 100 + '%"></i>'; }
    h += '<i class="dot" style="left:' + abs(X) / W * 100 + '%;--c:' + CL[1] + '"></i><span class="tip" style="left:' + abs(X) / W * 100 + '%">' + M(AB(tx(X)) + '=' + abs(X)) + '</span>';
    return h;
  }
  function build() {
    var h = '<div class="chips" id="fc">' + [-6, -5, -4, -3, -2, -1].map(function (v) { return '<button type="button" class="chip' + (v === X ? ' on' : '') + '" data-x="' + v + '">' + M(tx(v)) + '</button>'; }).join('') + '</div>';
    h += '<div class="fold"><div class="ghost"></div><div class="layer fr">' + layerR() + '</div><div class="layer fl">' + layerL() + '</div><div class="layer fb">' + layerB() + '</div></div>';
    h += '<div class="rng"><span>عدد منفی</span><input type="range" min="0" max="100" value="' + Math.round(t * 100) + '" aria-label="تاکردن"><span>تاشده</span></div><div class="opts"><button type="button" class="btn primary" data-play="1">▶ تا کن</button><button type="button" class="btn" data-back="1">برگردان</button></div><div class="fcap"></div>';
    host.innerHTML = rr(h); upd();
  }
  function upd() {
    var fl = host.querySelector('.fl'), fb = host.querySelector('.fb'), c = host.querySelector('.fcap'), s;
    if (t <= 0.5) { fl.style.transform = 'scaleX(' + (1 - 2 * t) + ')'; fb.style.transform = 'scaleX(0)'; fl.style.opacity = 1; }
    else { fl.style.transform = 'scaleX(0)'; fb.style.transform = 'scaleX(' + (2 * t - 1) + ')'; }
    if (t < 0.03) { s = '<p class="legend" style="font-size:.95rem;color:var(--ink)">عدد ' + M(tx(X)) + ' در سمت چپ صفر است و ' + fa(abs(X)) + ' واحد از آن فاصله دارد. دکمهٔ «تا کن» را بزن.</p>'; }
    else if (t > 0.97) { s = K.dm(AB(tx(X)) + '=' + abs(X) + '=' + AB(String(abs(X)))) + '<p class="legend" style="font-size:.95rem;color:var(--ink)">نیمهٔ منفی روی نیمهٔ مثبت افتاد: ' + M(tx(X)) + ' و ' + M(String(abs(X))) + ' هر دو ' + fa(abs(X)) + ' واحد از صفر فاصله دارند.</p>'; }
    else { s = '<p class="legend">در حال تاشدن…</p>'; }
    c.innerHTML = rr(s);
  }
  function anim(to) {
    clearInterval(timer);
    if (Math.abs(t - to) < 0.001) { t = to; upd(); return; }
    var dir = to > t ? 1 : -1;
    timer = setInterval(function () { t += dir * 0.025; if ((dir > 0 && t >= to) || (dir < 0 && t <= to)) { t = to; clearInterval(timer); timer = null; } host.querySelector('input').value = Math.round(t * 100); upd(); }, 16);
  }
  host.addEventListener('input', function (e) { if (e.target.matches('input')) { clearInterval(timer); t = +e.target.value / 100; upd(); } });
  host.addEventListener('click', function (e) {
    var c = e.target.closest('.chip'), b = e.target.closest('button');
    if (c && c.dataset.x) { X = +c.dataset.x; t = 0; build(); } else if (b && b.dataset.play) { anim(1); } else if (b && b.dataset.back) { anim(0); }
  }); build();
};

/* ---- فاصله‌سنج: فاصلهٔ دو نقطه روی محور ---- */
K.distMeter = function (host) {
  var MIN = -8, MAX = 8, a = -3, b = 5, act = 0, ticks = [], hits = [], v;
  for (v = MIN; v <= MAX; v++) { ticks.push({ v: v, t: lab(v), z: v === 0 }); hits.push({ v: v }); }
  function paint() {
    var d = abs(a - b), h, arcs = [];
    if (d > 0) { arcs.push({ a: Math.min(a, b), b: Math.max(a, b), t: fa(d) + ' واحد', g: 1 }); }
    h = '<div class="n8-distance-choices"><button type="button" class="btn opt' + (act === 0 ? ' on' : '') + '" data-a="0"><span style="color:var(--accent)">●</span> نقطهٔ اول</button><button type="button" class="btn opt' + (act === 1 ? ' on' : '') + '" data-a="1"><span style="color:var(--pink)">●</span> نقطهٔ دوم</button></div>';
    h += axisHTML({ min: MIN - .5, max: MAX + .5, ticks: ticks, hits: hits, hw: 1, arcs: arcs }, [{ v: a, c: CL[0], h: M(tx(a)), lv: 1 }, { v: b, c: CL[1], h: M(tx(b)), lv: 1 }]);
    h += AL(['|' + pn(a) + '-' + pn(b) + '|&=|' + tx(a - b) + '|=' + d, '|' + pn(b) + '-' + pn(a) + '|&=|' + tx(b - a) + '|=' + d]).replace(/\|/g, '|');
    h += '<p class="legend" style="font-size:.92rem;color:var(--ink)">تفاضل ' + M(pn(b) + '-' + pn(a) + '=' + tx(b - a)) + ' می‌تواند منفی شود، اما فاصله هیچ‌وقت منفی نیست و به ترتیب دو نقطه بستگی ندارد.</p>';
    h += '<div class="n8-distance-action"><button type="button" class="btn" data-sw="1">جابه‌جا کردن دو نقطه</button></div><p class="legend">یک نقطه را انتخاب کن و روی عددی از محور بزن.</p>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) {
    var c = e.target.closest('button[data-a]'), hit = e.target.closest('.hit'), s = e.target.closest('[data-sw]');
    if (c) { act = +c.dataset.a; paint(); } else if (hit) { var x = hits[+hit.dataset.i].v; if (act === 0) { a = x; } else { b = x; } paint(); } else if (s) { var t = a; a = b; b = t; paint(); }
  }); paint();
};

/* ---- رادار: همهٔ نقطه‌هایی که فاصله‌شان از مرکز مشخص است ---- */
K.ringFind = function (host) {
  var c, d, sel, done, MIN = -10, MAX = 10, ticks = [], hits = [], v, none;
  for (v = MIN; v <= MAX; v++) { ticks.push({ v: v, t: v % 2 === 0 ? lab(v) : '', mn: v % 2 !== 0, z: v === 0 }); hits.push({ v: v }); }
  function nw() { none = Math.random() < 0.2; c = R(-4, 4); d = none ? R(1, 4) * -1 : R(1, 5); sel = {}; done = false; }
  function sol() { return none ? [] : [c - d, c + d]; }
  function paint() {
    var s = sol(), chosen = Object.keys(sel).filter(function (k) { return sel[k]; }).map(Number).sort(function (x, y) { return x - y; }), h, marks = [], arcs = [], ok, i, hx = [];
    chosen.forEach(function (x) { marks.push({ v: x, c: CL[1], h: done ? M(tx(x)) : '', lv: 0 }); });
    if (c !== undefined) { marks.push({ v: c, c: CL[4], h: M(tx(c)), lv: 1 }); }
    if (done && !none) { s.forEach(function (x) { arcs.push({ a: Math.min(c, x), b: Math.max(c, x), t: fa(d) + ' واحد', g: 1 }); }); }
    hits.forEach(function (x, k) { hx.push({ v: x.v, k: done ? (s.indexOf(x.v) > -1 ? 'ok' : sel[x.v] ? 'no' : '') : '' }); });
    h = '<p class="ask">همهٔ نقطه‌هایی را علامت بزن که فاصله‌شان از نقطهٔ زرد برابر ' + fa(none ? d : d) + ' است. (اگر هیچ نقطه‌ای نیست، چیزی علامت نزن.)</p><div class="cq">' + M(c === 0 ? '|x|=' + tx(d) : '|x-' + pn(c) + '|=' + tx(d)) + '</div>';
    h += axisHTML({ min: MIN - .5, max: MAX + .5, ticks: ticks, hits: hx, hw: 1, arcs: arcs }, marks);
    if (done) {
      ok = chosen.length === s.length && chosen.every(function (x, k) { return x === s[k]; });
      h += '<div class="fb ' + (ok ? 'ok' : 'bad') + '">' + (ok ? '✓ درست است!' : 'درست نبود.') + '</div><div class="ex">' + (none ? '<p>فاصله هیچ‌وقت منفی نیست؛ پس هیچ نقطه‌ای با فاصلهٔ ' + M(tx(d)) + ' از ' + M(tx(c)) + ' وجود ندارد.</p>' : '<p>از ' + M(tx(c)) + ' به هر دو سمت ' + fa(d) + ' واحد می‌رویم:</p>' + AL([tx(c) + '-' + d + '&=' + tx(c - d), tx(c) + '+' + d + '&=' + tx(c + d)]) + '<div class="nleq vd sm"><i class="a">$' + tx(c - d) + '$</i><span class="or">و</span><i class="m">$' + tx(c + d) + '$</i></div>') + '</div>';
    }
    h += '<div class="opts n8-radar-new">' + (done ? '' : '<button type="button" class="btn primary" data-go="1">بررسی</button>') + '<button type="button" class="btn' + (done ? ' primary' : '') + '" data-nw="1">' + (done ? 'مسئلهٔ بعدی' : 'مسئلهٔ دیگر') + '</button></div>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) {
    var hit = e.target.closest('.hit'), b = e.target.closest('button');
    if (hit && !done) { var x = hits[+hit.dataset.i].v; sel[x] = !sel[x]; paint(); }
    else if (b && b.dataset.go) { done = true; paint(); } else if (b && b.dataset.nw) { nw(); paint(); }
  }); nw(); paint();
};
/* ================= تولید سؤال ================= */
var fr = function (n, d) { var g = gcd(n, d); n /= g; d /= g; return d === 1 ? String(n) : (n < 0 ? '-' : '') + '\\dfrac{' + abs(n) + '}{' + d + '}'; };
var VAL = [{ t: '3', v: 3, n: 3, d: 1 }, { t: '7', v: 7, n: 7, d: 1 }, { t: '12', v: 12, n: 12, d: 1 }, { t: '5', v: 5, n: 5, d: 1 }, { t: '9', v: 9, n: 9, d: 1 }, { t: '2.5', v: 2.5, n: 5, d: 2 }, { t: '1.5', v: 1.5, n: 3, d: 2 }, { t: '3.2', v: 3.2, n: 16, d: 5 }, { t: '\\dfrac{2}{3}', v: 2 / 3, n: 2, d: 3 }, { t: '\\dfrac{3}{4}', v: 0.75, n: 3, d: 4 }, { t: '\\dfrac{5}{2}', v: 2.5, n: 5, d: 2 }];
var sg = function (x, neg) { return neg ? '-' + x.t : x.t; };
var nv = function (x) { return fr(x.n, x.d); };
function uniq(list) { var s = {}; return list.filter(function (x) { var k = nf(x.v); if (s[k]) { return false; } s[k] = 1; return true; }); }
function valTex(v) { var f = [[1, 2], [3, 2], [5, 2], [2, 3], [3, 4], [16, 5]], i; for (i = 0; i < f.length; i++) { if (abs(abs(v) - f[i][0] / f[i][1]) < 1e-9 && Math.round(v * 10) / 10 !== v) { return (v < 0 ? '-' : '') + fr(f[i][0], f[i][1]); } } return tx(v); }
function genA1() {   // قدرمطلق یک عدد
  var x = VAL[R(0, VAL.length - 1)], ty = R(0, 3), neg = ty !== 0 && Math.random() < 0.8 || ty === 1, q, c, cand, notes = {}, v = x.v;
  if (ty === 0) { neg = Math.random() < 0.3 ? false : true; }
  var sgn = neg ? -1 : 1, a = sgn * v, outer = ty === 1 || ty === 3;   // ty 1,3: با منفی بیرون
  q = (outer ? '-' : '') + AB(sg(x, neg)); c = (outer ? -1 : 1) * abs(a);
  cand = uniq([{ v: c, ok: 1 }, { v: -c, m: outer ? 'منفی بیرونِ قدرمطلق می‌ماند؛ اول قدرمطلق را حساب کن و بعد منفی را بگذار.' : 'قدرمطلق هیچ‌وقت منفی نیست.' }, { v: a, m: 'قدرمطلق علامت منفیِ داخلش را برمی‌دارد.' }, { v: -a, m: 'این گزینه درست نیست.' }, { v: c + 1, m: 'این گزینه درست نیست.' }].filter(function (z) { return !(z.v === 0 && c !== 0); }));
  var wr = shuffle(cand.slice(1)).slice(0, 3);
  return { q: q, x: x, neg: neg, outer: outer, c: c, a: a, opts: shuffle([cand[0]].concat(wr).map(function (z) { return { h: M(valTex(z.v)), ok: !!z.ok, m: z.m || '' }; })) };
}
function exA1(g) {
  var a = g.a, lo = Math.min(0, Math.ceil(a) - 1), hi = Math.max(0, Math.floor(a) + 1), h;
  h = '<p>قدرمطلق یعنی فاصلهٔ عدد از صفر روی محور:</p>' + AL(['|' + sg(g.x, g.neg) + '|&=' + valTex(abs(a))]) + (g.outer ? '<p>منفیِ بیرون از قدرمطلق سر جایش می‌ماند:</p>' + K.dm('-|' + sg(g.x, g.neg) + '|=-' + valTex(abs(a))) : '');
  return h + verdict([['a', g.q], ['b', '='], ['m', valTex(g.c)]]);
}
function genA2() {   // محاسبهٔ عبارت
  var f = R(0, 3), a, b, q, c, steps, wrong = [];
  if (f === 0) { do { a = R(-9, 9); b = R(-9, 9); } while (a >= b || a - b > -3); q = AB(a + '-' + pn(b)); steps = [AB(a + '-' + pn(b)) + '&=' + AB(tx(a - b)) + '=' + abs(a - b)]; c = abs(a - b); wrong = [{ v: a - b, m: 'اول داخل قدرمطلق را حساب کردی، اما بعد قدرمطلق را نگرفتی.' }, { v: abs(a) + abs(b), m: 'قدرمطلق را روی هر عدد جدا نگیر؛ اول داخل را حساب کن.' }, { v: a + b, m: 'این گزینه درست نیست.' }]; }
  else if (f === 1) { do { a = R(-9, -2); b = R(2, 9); } while (false); q = AB(tx(a)) + '+' + AB(tx(b)); steps = [q + '&=' + abs(a) + '+' + abs(b) + '=' + (abs(a) + abs(b))]; c = abs(a) + abs(b); wrong = [{ v: a + b, m: 'قدرمطلق هر عدد را جدا حساب کن، بعد جمع کن.' }, { v: -abs(a) + abs(b), m: 'قدرمطلقِ هر عدد نامنفی است.' }, { v: abs(a) - abs(b), m: 'این گزینه درست نیست.' }]; }
  else if (f === 2) { do { a = R(-9, -1); b = R(-9, 9); } while (abs(a) === abs(b) || b === 0); q = AB(tx(a)) + '-' + AB(pn(b)); steps = [q + '&=' + abs(a) + '-' + abs(b) + '=' + (abs(a) - abs(b))]; c = abs(a) - abs(b); wrong = [{ v: a - b, m: 'قدرمطلق هر عدد را جدا حساب کن، بعد تفریق کن.' }, { v: abs(abs(a) - abs(b)), m: 'پس از تفریقِ قدرمطلق‌ها دیگر قدرمطلقی نمانده؛ جواب می‌تواند منفی باشد.' }, { v: abs(a) + abs(b), m: 'این گزینه درست نیست.' }]; }
  else { do { a = R(-9, -1); b = R(1, 9); } while (abs(a) === b); q = AB(a + '+' + b); steps = [AB(a + '+' + b) + '&=' + AB(tx(a + b)) + '=' + abs(a + b)]; c = abs(a + b); wrong = [{ v: a + b, m: 'اول داخل را حساب کردی، اما قدرمطلق را نگرفتی.' }, { v: abs(a) + abs(b), m: 'قدرمطلق روی جمع پخش نمی‌شود؛ اول داخل را حساب کن.' }, { v: abs(a) - abs(b), m: 'این گزینه درست نیست.' }]; }
  var cand = uniq([{ v: c, ok: 1 }].concat(wrong)), wr = cand.slice(1);
  var extra = [c + 2, c - 2, c + 1].map(function (v) { return { v: v, m: 'این گزینه درست نیست.' }; });
  cand = uniq(cand.concat(extra));
  return { q: q, c: c, steps: steps, opts: shuffle([cand[0]].concat(shuffle(cand.slice(1)).slice(0, 3)).map(function (z) { return { h: M(tx(z.v)), ok: !!z.ok, m: z.m || '' }; })) };
}
function exA2(g) { return '<p>اول داخل را حساب می‌کنیم، بعد قدرمطلق می‌گیریم (یا قدرمطلق هر عدد را جدا می‌گیریم):</p>' + AL(g.steps) + verdict([['a', g.q], ['b', '='], ['m', tx(g.c)]]); }
function figDist(a, b) {
  var lo = Math.min(a, b, 0) - 1, hi = Math.max(a, b, 0) + 1, n = hi - lo, labs = [0 - lo, a - lo, b - lo];
  return ax({ lo: lo, step: 1, n: n, lab: labs, pts: [{ i: a - lo, c: CL[0], h: M(tx(a)), lv: 1 }, { i: b - lo, c: CL[1], h: M(tx(b)), lv: 1 }], arcs: [{ a: Math.min(a, b) - lo, b: Math.max(a, b) - lo, t: fa(abs(a - b)) + ' واحد', g: 1 }] });
}
function genA3() {   // فاصلهٔ دو نقطه
  var a, b, c, cand;
  do { a = R(-9, 9); b = R(-9, 9); } while (a === b || abs(a - b) < 2);
  c = abs(a - b);
  cand = uniq([{ v: c, ok: 1 }, { v: a - b, m: 'تفاضل می‌تواند منفی شود، اما فاصله نامنفی است.' }, { v: abs(a) + abs(b), m: 'این روش فقط وقتی درست است که دو نقطه دو طرف صفر باشند؛ قاعدهٔ کلی ' + M('|a-b|') + ' است.' }, { v: a + b, m: 'فاصله را با جمع حساب نمی‌کنیم؛ باید تفاضل را بگیری.' }, { v: abs(abs(a) - abs(b)), m: 'این روش فقط وقتی درست است که دو نقطه یک طرف صفر باشند؛ قاعدهٔ کلی ' + M('|a-b|') + ' است.' }, { v: c + 1, m: 'این گزینه درست نیست.' }, { v: c - 1, m: 'این گزینه درست نیست.' }].filter(function (z) { return z.v >= -30; }));
  return { a: a, b: b, c: c, opts: shuffle([cand[0]].concat(shuffle(cand.slice(1)).slice(0, 3)).map(function (z) { return { h: M(tx(z.v)), ok: !!z.ok, m: z.m || '' }; })) };
}
function exA3(g) { return '<p>فاصلهٔ دو نقطه برابر قدرمطلق تفاضل آن‌هاست:</p>' + AL(['|' + pn(g.a) + '-' + pn(g.b) + '|&=|' + tx(g.a - g.b) + '|=' + g.c]) + figDist(g.a, g.b); }

/* ---- تمرین مرحله‌ای ---- */
K.absSteps = function (host) {
  var ST = ['قدرمطلق یک عدد', 'قدرمطلق عبارت', 'فاصلهٔ دو نقطه'], si = 0, ok = 0, q, pick = null, fin = false;
  function nw() {
    pick = null;
    if (si === 0) { var g = genA1(); q = { ask: 'حاصل را پیدا کن:', cq: M(g.q), opts: g.opts, fig: '', expl: function () { return exA1(g); } }; }
    else if (si === 1) { var s = genA2(); q = { ask: 'حاصل را پیدا کن:', cq: M(s.q), opts: s.opts, fig: '', expl: function () { return exA2(s); } }; }
    else { var t = genA3(); q = { ask: 'فاصلهٔ دو نقطهٔ ' + M(tx(t.a)) + ' و ' + M(tx(t.b)) + ' روی محور چقدر است؟', cq: '', opts: t.opts, fig: figDist(t.a, t.b).replace(/<span class="arc[^>]*>.*?<\/span>/, ''), expl: function () { return exA3(t); } }; }
  }
  function paint() {
    var h = '<div class="stg">' + ST.map(function (s, i) { return '<span class="' + (i < si || fin ? 'dn' : i === si ? 'cu' : '') + '">' + (i < si || fin ? '✓ ' : '') + s + '</span>'; }).join('') + '</div>', oh = '', o;
    if (fin) { host.innerHTML = rr(h + '<div class="fb ok"><b>همهٔ مرحله‌ها را گذراندی!</b> حالا برو سراغ رادار.</div><div class="opts"><button type="button" class="btn" data-r="1">از اول، با عددهای جدید</button></div>'); return; }
    h += '<p class="stage-progress-meta">مرحلهٔ ' + fa(si + 1) + ' — پاسخ‌های درست: ' + fa(ok) + ' از ۲</p><p class="ask" style="font-weight:normal">' + q.ask + '</p>' + (q.cq ? '<div class="cq">' + q.cq + '</div>' : '') + q.fig + '<div class="mc m2 n8-steps-options" id="asm"></div>';
    q.opts.forEach(function (op, k) { var c = pick === null ? '' : op.ok ? ' right' : k === pick ? ' wrong' : ''; oh += '<button type="button" class="btn opt' + c + '" data-o="' + k + '"' + (pick === null ? '' : ' disabled') + '>' + op.h + '</button>'; });
    if (pick !== null) { o = q.opts[pick]; h += '<div class="fb ' + (o.ok ? 'ok' : 'bad') + '">' + (o.ok ? '✓ درست است!' : o.m || 'این گزینه درست نیست.') + '</div><div class="ex">' + q.expl() + '</div><div class="opts"><button type="button" class="btn primary" data-n="1">' + (o.ok && ok >= 2 ? (si === 2 ? 'پایان' : 'مرحلهٔ بعد') : 'مرحلهٔ بعدی') + '</button></div>'; }
    host.innerHTML = rr(h); host.querySelector('#asm').innerHTML = rr(oh); fixK(host);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.o !== undefined) { pick = +b.dataset.o; if (q.opts[pick].ok) { ok++; } paint(); }
    else if (b.dataset.n) { if (ok >= 2) { ok = 0; si++; if (si > 2) { fin = true; paint(); return; } } nw(); paint(); }
    else if (b.dataset.r) { si = 0; ok = 0; fin = false; nw(); paint(); }
  }); nw(); paint();
};

/* ---- درست یا نادرست؟ ---- */
var TF = [
  { h: M('|-7|=7'), ok: 1, e: '<p>فاصلهٔ ' + M('-7') + ' از صفر برابر ' + M('7') + ' است.</p>' },
  { h: M('|-7|=-7'), ok: 0, e: '<p>قدرمطلق فاصله است و فاصله منفی نمی‌شود: ' + M('|-7|=7') + '.</p>' },
  { h: M('-|-7|=-7'), ok: 1, e: '<p>اول قدرمطلق: ' + M('|-7|=7') + '؛ بعد منفیِ بیرونی: ' + M('-7') + '.</p>' },
  { h: M('-|5|=5'), ok: 0, e: '<p>' + M('|5|=5') + ' است و منفیِ بیرونی آن را ' + M('-5') + ' می‌کند.</p>' },
  { h: M('|3-8|=|3|-|8|'), ok: 0, e: '<p>سمت چپ ' + M('|-5|=5') + ' و سمت راست ' + M('3-8=-5') + ' است. قدرمطلق روی تفریق پخش نمی‌شود.</p>' },
  { h: M('|2|+|-5|=|2+(-5)|'), ok: 0, e: '<p>سمت چپ ' + M('2+5=7') + ' و سمت راست ' + M('|-3|=3') + ' است.</p>' },
  { h: M('|-2|+|-3|=|-2+(-3)|'), ok: 1, e: '<p>هر دو طرف ۵ است؛ وقتی دو عدد هم‌علامت‌اند این تساوی برقرار است.</p>' },
  { h: M('|-4|\\times|3|=|-4\\times3|'), ok: 1, e: '<p>هر دو طرف ۱۲ است؛ قدرمطلق روی ضرب پخش می‌شود.</p>' },
  { h: M('|-5|\\lt|3|'), ok: 0, e: '<p>' + M('|-5|=5') + ' و ' + M('|3|=3') + ' است؛ پس ' + M('|-5|\\gt|3|') + '، هرچند ' + M('-5\\lt3') + '.</p>' },
  { h: M('|0|=0'), ok: 1, e: '<p>صفر فاصله‌ای از خودش ندارد.</p>' },
  { h: 'فاصلهٔ ' + M('-3') + ' و ' + M('4') + ' روی محور برابر ' + M('1') + ' است', ok: 0, e: '<p>' + M('|-3-4|=|-7|=7') + '؛ باید از ' + M('-3') + ' تا ' + M('4') + ' را بشماری.</p>' },
  { h: 'فاصلهٔ ' + M('-5') + ' و ' + M('-2') + ' روی محور برابر ' + M('3') + ' است', ok: 1, e: '<p>' + M('|-5-(-2)|=|-3|=3') + '.</p>' },
  { h: M('|a-b|=|b-a|') + ' برای هر دو عدد ' + M('a') + ' و ' + M('b'), ok: 1, e: '<p>فاصله به ترتیب دو نقطه بستگی ندارد.</p>' },
  { h: 'اگر ' + M('|x|=4') + ' آنگاه حتماً ' + M('x=4'), ok: 0, e: '<p>هم ' + M('4') + ' و هم ' + M('-4') + ' فاصلهٔ ' + M('4') + ' از صفر دارند.</p>' },
  { h: 'عددی مثل ' + M('x') + ' هست که ' + M('|x|=-3'), ok: 0, e: '<p>قدرمطلق نامنفی است؛ پس هیچ عددی نیست.</p>' }
];
K.tfAbs = function (host) {
  var L, i, answers;
  function nw() { L = shuffle(TF.slice()).slice(0, 6); i = 0; answers = Array(L.length).fill(null); }
  function paint() {
    var h, q, ans = answers[i], finished = answers.every(function(x){return x !== null;});
    if (i >= L.length) {
      var sc = answers.filter(function(x,k){return x === L[k].ok;}).length;
      host.innerHTML = rr('<div class="fb ' + (sc >= 5 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(sc) + ' از ' + fa(L.length) + '</b><br>' + (sc === L.length ? 'همهٔ پاسخ‌ها درست بودند!' : 'قدرمطلق فاصله است و نامنفی؛ روی جمع و تفریق پخش نمی‌شود.') + '</div><div class="opts n8-nav end-actions"><button type="button" class="btn" data-p="1">مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1">سؤال‌های جدید</button></div>'); return;
    }
    q = L[i];
    h = '<div class="stg">' + L.map(function(x,k){return '<span class="' + (answers[k] !== null ? (answers[k] === x.ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k+1) + '</span>';}).join('') + '</div><p class="ask">این جمله درست است؟</p><div class="cq">' + q.h + '</div><div class="sgnrow"><button type="button" class="btn' + (ans === null ? '' : q.ok === 1 ? ' right' : ans === 1 ? ' wrong' : '') + '" data-a="1"' + (ans === null ? '' : ' disabled') + '>درست</button><button type="button" class="btn' + (ans === null ? '' : q.ok === 0 ? ' right' : ans === 0 ? ' wrong' : '') + '" data-a="0"' + (ans === null ? '' : ' disabled') + '>نادرست</button></div>';
    if (ans !== null) { h += '<div class="fb ' + (ans === q.ok ? 'ok' : 'bad') + '">' + (ans === q.ok ? '✓ درست است!' : 'پاسخ نادرست است.') + '</div><div class="ex">' + q.e + '</div>'; }
    h += '<div class="opts n8-nav"><button type="button" class="btn" data-p="1"' + (i === 0 ? ' disabled' : '') + '>سؤال قبلی</button><button type="button" class="btn primary" data-n="1"' + (ans === null ? ' disabled' : '') + '>' + (i === L.length - 1 ? 'مشاهدهٔ نتیجه':'سؤال بعدی') + '</button></div>';
    host.innerHTML = rr(h);
  }
  host.classList.add('n8-tf');
  host.addEventListener('click', function(e){var b=e.target.closest('button');if(!b||b.disabled)return;
    if(b.dataset.a !== undefined && answers[i] === null){answers[i]=+b.dataset.a;paint();}
    else if(b.dataset.n){i++;paint();}
    else if(b.dataset.p){i=Math.max(0,i-1);paint();}
    else if(b.dataset.r){nw();paint();}
  }); nw();paint();
};

/* ---- تمرین پایانی ---- */
function qSet() {
  var c = R(-4, 4), d = R(1, 5), s = [c - d, c + d].sort(function (x, y) { return x - y; }), cand = [{ s: s, ok: 1 }, { s: [c + d], m: 'فاصله به هر دو طرفِ مرکز اندازه می‌شود؛ یک نقطه کم است.' }, { s: [-d, d], m: 'مرکز ' + M(tx(c)) + ' است، نه صفر.' }, { s: [c - d], m: 'فاصله به هر دو طرفِ مرکز اندازه می‌شود؛ یک نقطه کم است.' }, { s: [c, c + d], m: 'خودِ مرکز فاصله‌اش از مرکز صفر است.' }], seen = {}, f = function (a) { return a.map(function (x) { return tx(x); }).join('\\ \\text{،}\\ ').replace(/\\ \\text\{،\}\\ /g, ',\\ '); };
  cand = cand.filter(function (z) { var k = z.s.join(','); if (seen[k]) { return false; } seen[k] = 1; return true; });
  return {
    ask: 'همهٔ نقطه‌هایی را پیدا کن که فاصله‌شان از ' + M(tx(c)) + ' برابر ' + fa(d) + ' است:', cls: 'm2', cq: M('|x-' + pn(c) + '|=' + d),
    opts: shuffle(cand.slice(0, 4).map(function (z) { return { h: M(f(z.s)), ok: !!z.ok, m: z.m || '' }; })),
    expl: function () { return '<p>از ' + M(tx(c)) + ' به هر دو سمت ' + fa(d) + ' واحد می‌رویم:</p>' + AL([tx(c) + '-' + d + '&=' + tx(c - d), tx(c) + '+' + d + '&=' + tx(c + d)]); }
  };
}
function qTrue() {
  var T1 = TF.filter(function (x) { return x.ok; }), F = TF.filter(function (x) { return !x.ok; }), t = T1[R(0, T1.length - 1)], f = shuffle(F.slice()).slice(0, 3), all = shuffle([t].concat(f));
  return { ask: 'کدام جمله درست است؟', cls: 'm1', opts: all.map(function (x) { return { h: '<span class="snt">' + x.h + '</span>', ok: x === t, m: 'این جمله درست نیست.' }; }), expl: function () { return all.map(function (x) { return '<div class="trow"><span class="tm ' + (x === t ? 'oky' : 'nox') + '">' + (x === t ? '✓' : '✗') + '</span><span class="snt">' + x.h + '</span></div>'; }).join('') + t.e; } };
}
K.absFinal = function (host) {
  var qs, i, ans;
  function m1() { var g = genA1(); g.opts = shuffle([g.opts.find(function(o){return o.ok;}),g.opts.find(function(o){return !o.ok;})]); return { ask: 'حاصل را پیدا کن:', cls: 'm2', cq: M(g.q), opts: g.opts, expl: function () { return exA1(g); } }; }
  function m2() { var g = genA2(); return { ask: 'حاصل را پیدا کن:', cls: 'm2', cq: M(g.q), opts: g.opts, expl: function () { return exA2(g); } }; }
  function m3() { var t = genA3(); return { ask: 'فاصلهٔ دو نقطهٔ ' + M(tx(t.a)) + ' و ' + M(tx(t.b)) + ' چقدر است؟', cls: 'm2', cq: '', opts: t.opts, expl: function () { return exA3(t); } }; }
  function build() { qs = [m1(), m2(), m3(), qSet(), qTrue()]; i = 0; ans = []; }
  var fb = function (ok, html) { return '<div class="fb ' + (ok ? 'ok' : 'bad') + '">' + html + '</div>'; };
  function paint() {
    var q = qs[i], a = ans[i], h, oh = '', s, o;
    if (i === 5) {
      s = ans.filter(function (x, k) { return qs[k].opts[x].ok; }).length;
      host.innerHTML = rr('<div class="fb ' + (s >= 4 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(s) + ' از ۵</b><br>' + (s === 5 ? 'عالی بود! قدرمطلق و فاصله را کاملاً فهمیده‌ای.' : s >= 3 ? 'خوب بود. بخش‌هایی را که اشتباه کردی دوباره مرور کن.' : 'یک بار دیگر درس را مرور کن؛ بعد با عددهای جدید امتحان کن.') + '</div><div class="opts end-actions"><button type="button" class="btn" data-pv="1">مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1">سؤال‌های جدید</button></div>'); return;
    }
    h = '<div class="stg">' + qs.map(function (x, k) { return '<span class="' + (ans[k] !== undefined ? (qs[k].opts[ans[k]].ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">' + q.ask + '</p>' + (q.cq ? '<div class="cq">' + q.cq + '</div>' : '') + '<div class="mc ' + q.cls + '" id="mcx"></div>';
    q.opts.forEach(function (op, k) { oh += '<button type="button" class="btn opt' + (a !== undefined ? (op.ok ? ' right' : k === a ? ' wrong' : '') : '') + '" data-o="' + k + '"' + (a !== undefined ? ' disabled' : '') + '>' + op.h + '</button>'; });
    if (a !== undefined) { o = q.opts[a]; h += fb(o.ok, o.ok ? '✓ درست است!' : (o.m || 'این گزینه درست نیست.')) + '<div class="ex">' + q.expl() + '</div>'; }
    h += '<div class="opts n8-nav"><button type="button" class="btn" data-p="1"' + (i ? '' : ' disabled') + '>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (a === undefined ? ' disabled' : '') + '>' + (i === 4 ? 'مشاهدهٔ نتیجه':'سؤال بعدی') + '</button></div>';
    host.innerHTML = rr(h); host.querySelector('#mcx').innerHTML = rr(oh); fixK(host);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.o) { ans[i] = +b.dataset.o; paint(); } else if (b.dataset.nx) { i++; paint(); } else if (b.dataset.p) { i--; paint(); } else if (b.dataset.pv) { i = 0; paint(); } else if (b.dataset.r) { build(); paint(); }
  }); build(); paint();
};
var cards3 = function (cells) { return '<div class="sg sg3">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.h + '</b><span>' + c.t + '</span></div>'; }).join('') + '</div>'; };
var cards2 = function (cells) { return '<div class="sg">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + (c.e ? K.dm(c.e) : '') + '</div>'; }).join('') + '</div>'; };
var refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };
var one = function (a, b, c, d) { return ax({ lo: a, step: 1, n: b - a, lab: c, pts: d.pts, arcs: d.arcs, cap: d.cap }); };

return {
  html: function () {
    var T = String.raw;
    return [
      K.sn('۱', 'چقدر از صفر دورم؟'),
      '<p>یک غواص ' + M('30') + ' متر زیر سطح دریا است و یک پرنده ' + M('30') + ' متر بالای آن. جای آن‌ها با ' + M('-30') + ' و ' + M('+30') + ' نشان داده می‌شود، اما هر دو دقیقاً به یک اندازه از سطح دریا (یعنی صفر) فاصله دارند: ' + fa(30) + ' متر.</p>',
      cards2([{ c: 'n', t: 'غواص', r: 'زیر صفر؛ فاصله ۳۰ متر', e: '|-30|=30' }, { c: 'p', t: 'پرنده', r: 'بالای صفر؛ فاصله ۳۰ متر', e: '|30|=30' }]),
      T`<p>«فاصلهٔ یک عدد از صفر» را <b>قدرمطلق</b> آن عدد می‌نامیم و با $|\ \ |$ نشان می‌دهیم. برای دیدن اینکه چرا $-4$ و $4$ قدرمطلق یکسانی دارند، محور را از صفر تا کن:</p><div class="cover" id="af" style="animation:none"></div>`,
      K.box('note', 'نکته', '<p>قدرمطلق یعنی «فاصله». فاصله هیچ‌وقت منفی نیست؛ پس قدرمطلق هر عدد صفر یا مثبت است.</p>'),

      K.sn('۲', 'قدرمطلق یک عدد'),
      '<p>برای هر عدد، سه حالت داریم:</p>',
      cards3([{ c: 'p', h: M('|5|=5'), t: 'عدد مثبت: خودش' }, { c: 'r3', h: M('|0|=0'), t: 'صفر: صفر' }, { c: 'n', h: M('|-5|=5'), t: 'عدد منفی: قرینه‌اش' }]),
      '<p>پس قدرمطلق، علامتِ منفیِ خودِ عدد را برمی‌دارد. این برای هر نوع عددی (اعشاری، کسر و ...) درست است:</p>', AL(['|-3.5|&=3.5', '\\left|-\\dfrac{2}{3}\\right|&=\\dfrac{2}{3}', '|7|&=7']),
      K.box('err', '⚠ خطای رایج', '<p>«قدرمطلق یعنی علامت منفی را بردار» فقط برای خودِ یک عدد درست است. اگر داخل قدرمطلق عبارت باشد، اول باید حسابش کنی:</p>' + AL(['|3-8|&=|-5|=5', '|3-8|&\\neq3-8']) + '<p>اگر علامت منفیِ ' + M('3-8') + ' را «حذف» کنی، چیز اشتباهی می‌گیری.</p>'),

      K.sn('۳', 'حساب با قدرمطلق'),
      '<p>برای محاسبه سه قدم را به ترتیب بردار:</p><ol><li>داخل قدرمطلق را حساب کن.</li><li>قدرمطلق بگیر (فاصله از صفر).</li><li>بقیهٔ عملیات را انجام بده.</li></ol>',
      '<h4>مثال اول</h4>', AL(['|3-8|&=|-5|=5', '|-2|+|3|&=2+3=5']),
      '<h4>مثال دوم: منفیِ بیرون</h4><p>علامت منفیِ بیرونِ قدرمطلق بعد از گرفتن قدرمطلق می‌آید:</p>', K.dm('-|-4|=-4'),
      '<h4>مثال سوم: قدرمطلق روی جمع پخش نمی‌شود</h4><p>این دو را مقایسه کن:</p>', AL(['|2|+|-5|&=2+5=7', '|2+(-5)|&=|-3|=3']), '<p>پس داریم:</p>', K.dm('\\lvert2\\rvert+\\lvert-5\\rvert\\neq\\lvert2+(-5)\\rvert'),
      K.box('note', 'چرا فرق دارند؟', T`<p>$|a+b|$ و $|a|+|b|$ فقط وقتی برابرند که $a$ و $b$ هم‌علامت باشند. اگر یکی مثبت و دیگری منفی باشد، آن دو یکدیگر را «خنثی» می‌کنند و $|a+b|$ کوچک‌تر می‌شود.</p>`),

      K.sn('۴', 'فاصله روی محور'),
      T`<p>فاصلهٔ دو نقطه روی محور هم همان «قدرمطلق» است؛ ولی این بار فاصله از صفر نیست، فاصله از نقطهٔ دیگر است. قاعده این است:</p>`,
      K.box('note', 'قاعدهٔ فاصله', '<p>فاصلهٔ دو نقطهٔ ' + M('a') + ' و ' + M('b') + ' برابر ' + M('|a-b|') + ' است، که با ' + M('|b-a|') + ' یکی است.</p>'),
      '<h4>مثال اول: دو نقطهٔ مثبت</h4>', one(1, 10, [2, 7], { pts: [{ i: 2, c: CL[0], h: M('3'), lv: 1 }, { i: 7, c: CL[1], h: M('8'), lv: 1 }], arcs: [{ a: 2, b: 7, t: '۵ واحد', g: 1 }] }), K.dm('|3-8|=|-5|=5'),
      '<h4>مثال دوم: دو طرف صفر</h4>', ax({ lo: -5, step: 1, n: 9, lab: [0, 1, 5, 8], pts: [{ i: 1, c: CL[0], h: M('-4'), lv: 1 }, { i: 8, c: CL[1], h: M('3'), lv: 1 }], arcs: [{ a: 1, b: 8, t: '۷ واحد', g: 1 }] }), K.dm('|-4-3|=|-7|=7'),
      '<h4>مثال سوم: دو نقطهٔ منفی</h4>', ax({ lo: -7, step: 1, n: 7, lab: [0, 1, 5, 7], pts: [{ i: 1, c: CL[0], h: M('-6'), lv: 1 }, { i: 5, c: CL[1], h: M('-2'), lv: 1 }], arcs: [{ a: 1, b: 5, t: '۴ واحد', g: 1 }] }), K.dm('|-6-(-2)|=|-4|=4'),
      K.box('err', '⚠ خطای رایج', '<p>جمعِ قدرمطلق‌ها فقط وقتی فاصله می‌دهد که دو نقطه دو طرف صفر باشند. در مثال سوم دو نقطه در یک طرف‌اند و ' + M('|-6|+|-2|=8') + ' جواب غلطی است؛ فاصله ' + M('4') + ' بود. قاعدهٔ کلی ' + M('|a-b|') + ' همیشه درست است.</p>'),
      '<p>خودت امتحان کن. دو نقطه را جابه‌جا کن و فاصله را بسنج:</p><div class="cover" id="dm" style="animation:none"></div>',

      K.sn('۵', 'نقطه‌هایی با فاصلهٔ معین'),
      T`<p>گاهی فاصله را می‌دانیم و دنبال نقطه‌ها می‌گردیم. مثلاً $|x|=4$ یعنی «فاصلهٔ $x$ از صفر برابر ۴ است». هم $4$ و هم $-4$ همین‌طورند:</p>`,
      ax({ lo: -6, step: 1, n: 12, lab: [0, 2, 6, 10, 12], pts: [{ i: 2, c: CL[1], h: M('-4'), lv: 1 }, { i: 10, c: CL[0], h: M('4'), lv: 1 }], arcs: [{ a: 2, b: 6, t: '۴', g: 1 }, { a: 6, b: 10, t: '۴', g: 1 }] }),
      T`<p>و $|x-2|=3$ یعنی «فاصلهٔ $x$ از ۲ برابر ۳ است». از ۲ به هر دو سمت، ۳ واحد می‌رویم:</p>`, AL(['2-3&=-1', '2+3&=5']),
      ax({ lo: -2, step: 1, n: 8, lab: [0, 2, 4, 7], pts: [{ i: 1, c: CL[1], h: M('-1'), lv: 1 }, { i: 7, c: CL[0], h: M('5'), lv: 1 }, { i: 4, c: CL[4], h: M('2'), lv: 0 }], arcs: [{ a: 1, b: 4, t: '۳', g: 1 }, { a: 4, b: 7, t: '۳', g: 1 }] }),
      K.box('note', 'دو حالت خاص', T`<ul><li>$|x|=0$ فقط یک جواب دارد: خودِ صفر.</li><li>$|x|=-2$ هیچ جوابی ندارد؛ چون فاصله منفی نمی‌شود.</li></ul>`),

      K.sn('۶', 'قدرمطلق و مقایسه'),
      '<p>ترتیبِ عددها با ترتیبِ قدرمطلق‌شان فرق دارد:</p>', K.dm('-5\\lt3\\qquad\\text{اما}\\qquad|-5|\\gt|3|').replace('\\text{اما}', '\\text{ }'),
      '<p>برای مرتب‌کردن عددها بر اساس «دوری از صفر» ' + K.info('n8-distance-order', 'تفاوت ترتیب عددها و دوری از صفر', '<p>مرتب‌کردن بر اساس بزرگیِ عددها یعنی از کوچک‌ترین عدد روی محور به بزرگ‌ترین برویم. اما مرتب‌کردن بر اساس دوری از صفر یعنی مقدار قدرمطلق را مقایسه کنیم؛ علامت عدد تعیین‌کننده نیست.</p><p>مثلاً در ترتیب عددی، ' + M('-5\\lt2') + ' است، ولی از نظر فاصله از صفر، ' + M('\\lvert-5\\rvert=5\\gt2=\\lvert2\\rvert') + '؛ پس ۲ به صفر نزدیک‌تر است.</p>') + '، قدرمطلق هر کدام را بنویس:</p>', AL(['|-2|&=2', '|3|&=3', '|5|&=5', '|-7|&=7']), '<p>پس از نزدیک‌ترین به دورترین نسبت به صفر:</p>', verdict([['n', '-2'], ['b', ','], ['n', '3'], ['b', ','], ['n', '5'], ['b', ','], ['n', '-7']], 'sm'),

      K.sn('۷', 'راهنمای سریع قدرمطلق و فاصله روی محور'),
      refs([{ c: 'r1', t: 'قدرمطلق', r: 'فاصلهٔ عدد از صفر؛ همیشه نامنفی.', e: '|-5|=5' }, { c: 'r2', t: 'عبارت', r: 'اول داخل را حساب کن، بعد قدرمطلق بگیر.', e: '|3-8|=5' }, { c: 'r3', t: 'منفیِ بیرون', r: 'بعد از گرفتن قدرمطلق می‌آید.', e: '-|-4|=-4' }, { c: 'r4', t: 'فاصلهٔ دو نقطه', r: 'قدرمطلق تفاضل.', e: '|a-b|=|b-a|' }, { c: 'r1', t: 'جواب‌های |x−c|=d', r: 'از c به دو سمت d واحد برو (اگر d منفی بود، هیچ).', e: 'c-d,\\ c+d' }, { c: 'r3', t: 'تلهٔ جمع', r: 'قدرمطلق روی جمع پخش نمی‌شود.', e: '|2+(-5)|\\neq|2|+|-5|' }]),

      K.sn('۸', 'فاصله‌یاب'),
      '<p>هر مرحله با دو پاسخ درست تمام می‌شود. بعد از هر پاسخ، دلیلش را قدم‌به‌قدم می‌بینی.</p><div class="cover" id="as" style="animation:none"></div>',
      K.sn('۹', 'رادار'),
      '<p>یک مرکز و یک فاصله داده می‌شود؛ همهٔ نقطه‌هایی را که آن فاصله را دارند روی محور علامت بزن.</p><div class="cover" id="rf" style="animation:none"></div>',
      K.sn('۱۰', 'درست یا نادرست؟'),
      '<p>شش جمله را بسنج. به تله‌ها دقت کن.</p><div class="cover" id="tf" style="animation:none"></div>',
      K.sn('۱۱', 'تمرین پایانی'),
      '<p>پنج سؤال با عددهای تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover" id="fz" style="animation:none"></div>',
      K.box('sum', 'بعد از این درس باید بتوانی', T`<ul><li>بدانی قدرمطلق یعنی فاصلهٔ عدد از صفر و همیشه نامنفی است.</li><li>عبارت‌هایی مثل $|3-8|$ و $-|-4|$ را درست حساب کنی.</li><li>فاصلهٔ دو نقطه را با $|a-b|$ پیدا کنی.</li><li>نقطه‌هایی با فاصلهٔ معین از یک مرکز را روی محور بیابی.</li><li>از خطای $|a+b|=|a|+|b|$ دوری کنی.</li></ul><p>این مهارت پایهٔ کار با فاصله روی محور و در دستگاه مختصات است.</p>`)
    ].join('');
  },
  init: function (panel) {
    panel.classList.add('standard-n6-10');
    K.absFold(panel.querySelector('#af')); K.distMeter(panel.querySelector('#dm')); K.absSteps(panel.querySelector('#as')); K.ringFind(panel.querySelector('#rf')); K.tfAbs(panel.querySelector('#tf')); K.absFinal(panel.querySelector('#fz'));
  }
};
  }
};
