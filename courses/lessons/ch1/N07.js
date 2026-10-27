/* درس مهارت N07 — جذر و ریشهٔ دوم (فصل ۱) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.N07 = {
  needs: ['utils'],
  setup: function (K0) {
var ML = window.MathLite, fa = ML.fa, rr = ML.renderRich, abs = Math.abs, df = K0.df;
var _u = K0._u, R = _u.R, M = _u.M, shuffle = _u.shuffle;
var K = Object.create(K0);   // K0 = هستهٔ مشترک؛ K = همان + ابزارهای اختصاصی این درس

/* ---- استایل اختصاصی این درس؛ فقط از رنگ‌ها و قالب‌های موجود پروژه ---- */
(function () {
  if (document.getElementById('css-N07')) { return; }
  var s = document.createElement('style'); s.id = 'css-N07';
  s.textContent = [
    '.sg.sg3{grid-template-columns:repeat(3,1fr)}.sg.sg3>div{text-align:center;padding:8px 4px}.sg.sg3 b .katex{font-size:1.4em}',
    '.sg.sg3>div>span{display:block;font-size:.84rem;color:var(--ink-soft);line-height:1.6;margin-top:2px}',
    '.nleq i{display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:3px 11px;line-height:1.3;margin:2px;vertical-align:middle}',
    '.nleq i.n{background:#fff}.nleq.vd{margin:8px 0 12px}.nleq.sm{font-size:1rem}.nleq.sm i{min-height:32px;padding:2px 8px}',
    '.nleq.wrap{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 2px}',
    /* مربع‌ها */
    '.sqw{text-align:center;margin:8px 0}',
    '.sqg{display:grid;gap:2px;direction:ltr;margin:4px auto;width:max-content;padding:5px;border:2.5px solid var(--ink);border-radius:8px;background:#fff}',
    '.sqg i{width:var(--c);height:var(--c);background:#bfe8e0;border:1.5px solid var(--accent);border-radius:3px}',
    '.sqs{font:bold .86rem Tahoma,sans-serif;color:var(--ink-soft);margin:2px 0}',
    '.machine{display:flex;justify-content:center;align-items:center;gap:6px;flex-wrap:wrap;direction:ltr;margin:8px 0}',
    '.machine .ar{font:bold 1.3rem Tahoma;color:var(--ink-soft)}',
    /* محور */
    '.lv{position:relative;height:178px;direction:ltr;margin:6px 34px 0}.lv.lo{height:132px}',
    '.lv.lo .ax{top:94px}.lv.lo .tk{top:87px}.lv.lo .tk.mn{top:90px}.lv.lo .tk.z{top:83px}.lv.lo .tn{top:107px}.lv.lo .dot{top:85px}.lv.lo .stem{bottom:41px}',
    '.lv .ax{position:absolute;left:-16px;right:-16px;top:140px;border-top:2.5px solid var(--ink)}',
    '.lv .ax:before,.lv .ax:after{content:"";position:absolute;top:-7px;border:6px solid transparent}',
    '.lv .ax:after{right:-2px;border-left:9px solid var(--ink);border-right:0}.lv .ax:before{left:-2px;border-right:9px solid var(--ink);border-left:0}',
    '.lv .tk{position:absolute;top:133px;height:14px;border-left:2px solid var(--ink)}.lv .tk.mn{top:136px;height:8px;border-color:#aab4c4}.lv .tk.z{top:129px;height:22px;border-left-width:3px}',
    '.lv .tn{position:absolute;top:153px;transform:translateX(-50%);font:bold .84rem Tahoma,sans-serif;white-space:nowrap}',
    '.lv .dot{position:absolute;top:131px;width:18px;height:18px;border-radius:50%;border:2.5px solid var(--ink);transform:translateX(-50%);background:var(--c,var(--accent));box-shadow:0 2px 0 rgba(20,33,61,.3);pointer-events:none}',
    '.lv .stem{position:absolute;bottom:47px;width:0;margin-left:-1px;border-left:2px solid var(--ink);pointer-events:none}',
    '.lv .tip{position:absolute;transform:translateX(-50%);background:var(--ink);color:#fff;border-radius:9px;padding:3px 10px;line-height:1.25;white-space:nowrap;z-index:2;pointer-events:none;font-weight:bold}',
    '.lv .tip:after{content:"";position:absolute;left:50%;bottom:-6px;margin-left:-6px;border:6px solid transparent;border-top-color:var(--ink);border-bottom:0}',
    '.chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:6px 0 4px;direction:ltr}',
    '.chip{min-width:52px;min-height:42px;border:2px solid var(--ink);border-radius:12px;background:#fff;cursor:pointer;font:inherit;color:var(--ink);padding:2px 10px;box-shadow:2px 2px 0 var(--ink)}',
    '.chip:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}.chip.on{background:var(--mark)}',
    '.rng{display:flex;align-items:center;gap:10px;direction:ltr;margin:6px 8px;font-size:.85rem;color:var(--ink-soft)}.rng input{flex:1;accent-color:var(--accent);height:30px}.rng.sq{display:grid;grid-template-columns:auto 1fr auto;align-items:start;gap:10px}.rng.sq .mid{display:flex;flex-direction:column;gap:4px}.rng.sq .ticks{display:grid;grid-template-columns:repeat(11,1fr);font:.72rem Tahoma,sans-serif;color:var(--ink-soft)}.rng.sq .ticks span{text-align:center}.rng.sq .ticks span:before{content:"";display:block;width:1px;height:6px;background:#aab4c4;margin:0 auto 2px}',
    '.mc.m1{grid-template-columns:1fr}.mc.m3{grid-template-columns:repeat(3,1fr)}.mc.m2{grid-template-columns:repeat(2,1fr)}',
    '.cq{direction:ltr;text-align:center;margin:8px 0}.cq .katex{font-size:1.45em}',
    '.legend{text-align:center;font-size:.84rem;color:var(--ink-soft);margin:2px 0 8px}',
    '.hist{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;direction:ltr;margin:8px 0}',
    '.hist>span{border:2px solid var(--line);border-radius:10px;padding:2px 10px;font-size:.9rem;background:#fff}.hist>span.lo{background:#d2f0e9;border-color:var(--accent)}.hist>span.hi{background:#fde7ef;border-color:var(--pink)}',
    '.step6{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;direction:ltr;margin:8px 0}.step6 .btn{min-height:44px;font-weight:bold;padding:2px}',
    '.sgnrow{display:flex;gap:12px;justify-content:center;margin:10px 0;direction:ltr}.sgnrow .btn{min-width:84px;min-height:54px;font-size:1.3rem;font-weight:bold}',
    '.sgnrow .btn.right{background:#d2f0e9;border-color:var(--accent)}.sgnrow .btn.wrong{background:#fbd5d5;border-color:#b23a3a}.sgnrow .btn:disabled{opacity:1}', '.n7-bet{max-width:300px;margin:8px auto 10px;display:grid;grid-template-columns:1fr auto 1fr auto 1fr;row-gap:2px;column-gap:6px;direction:ltr;align-items:center}', '.n7-bet .tag{justify-self:center;display:inline-flex;align-items:center;justify-content:center;min-width:60px;height:26px;padding:0 10px;border-radius:999px;background:#4c5fd5;color:#fff;font:bold .84rem Tahoma,sans-serif;box-shadow:1px 1px 0 var(--ink)}', '.n7-bet .tag .katex{font-size:1em;color:#fff}', '.n7-bet .bar{justify-self:center;color:#8091aa;font:bold 1.15rem/1 Tahoma,sans-serif;letter-spacing:-1px}', '.n7-bet .num{justify-self:center;font:bold 1.15rem Tahoma,sans-serif}', '.n7-bet .mid{justify-self:center;font:bold 1.15rem Tahoma,sans-serif;white-space:nowrap}', '.n7-rel{display:flex;justify-content:center;align-items:center;gap:4px;flex-wrap:wrap;direction:ltr;margin:8px 0 10px}', '.n7-rel i{display:inline-flex;align-items:center;justify-content:center;min-height:32px;padding:2px 10px;border:2px solid var(--ink);border-radius:10px;font-style:normal;background:#fff}', '.n7-rel i.g{background:var(--accent);color:#fff}', '.n7-rel i.y{background:var(--mark);color:var(--ink)}', '.n7-rel i.p{background:var(--pink);color:#fff}', '.n7-rel i.w{background:#fff}', '.n7-rel.sm i{min-height:30px;padding:2px 8px}',
    '.n7-hunt-controls{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;max-width:400px;margin:10px auto;direction:ltr}', '.n7-hunt-controls .btn{min-height:44px;font-size:1rem;padding:5px 8px;box-shadow:2px 2px 0 var(--ink)}', '.n7-hunt-controls .btn:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}', '.n7-hunt-new{display:flex;justify-content:center;margin:12px auto 0}', '.standard-n6-10 .n7-hunt-new .btn{min-height:36px;font-size:.88rem;padding:5px 12px}', '.n7-axis-cap .katex{margin:0!important}', '.n7-hunt-modes{display:flex;gap:8px;justify-content:center;margin:10px 0}', '.n7-hunt-visual{max-width:520px;margin:10px auto 18px;text-align:center}', '.n7-hunt-grid{display:grid;grid-template-columns:auto 26px max-content 26px auto;justify-content:center;column-gap:10px;row-gap:4px;align-items:center}', '.n7-hunt-grid .cap{display:inline-flex;align-items:center;justify-content:center;border:2px dashed #c8d4e6;border-radius:10px;padding:4px 10px;background:#fff;min-height:30px;box-sizing:border-box;justify-self:center;white-space:nowrap}', '.n7-hunt-grid .arrow{color:#71809b;line-height:1;justify-self:center;font-size:1.18rem}', '.n7-hunt-box{min-width:104px;box-sizing:border-box;border:2px solid var(--ink);border-radius:10px;padding:7px 10px;background:var(--mark);font-weight:bold;transition:background .15s,opacity .15s;text-align:center;justify-self:center}', '.n7-hunt-box.dim{background:#edf0f4;color:#526177;border-color:#8a98a9}', '.n7-hunt-box.solved{background:#bfe8e0!important;border-color:#15947e!important;color:var(--ink)!important;opacity:1}', '.n7-hunt-less{color:var(--ink)}', '.n7-hunt-radicand{font-size:1.2rem}', '.n7-hunt-feedback{max-width:460px;margin:10px auto}', '.n7-hunt-result{max-width:460px;margin:10px auto;border:2px dashed #c8d4e6;border-radius:12px;padding:10px}', '.n7-hunt-controls{grid-template-columns:repeat(2,minmax(0,92px));justify-content:center;max-width:210px}',
    '#rs .mc .opt{min-height:44px;height:auto;font-size:1rem;padding:5px 10px;font-weight:600;white-space:normal;overflow-wrap:anywhere}',
    '#tf .sgnrow .btn{min-width:120px;min-height:36px;height:auto;font-size:.88rem;font-weight:600;padding:5px 12px;box-shadow:2px 2px 0 var(--ink)}',
    '#tf .sgnrow .btn:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}',
    '#tf .n7-tf-nav{display:flex;direction:rtl;justify-content:space-between;width:100%;gap:12px}',
    '#tf .n7-tf-nav .btn{min-width:120px;min-height:36px;height:auto;font-size:.88rem;padding:5px 12px}',
    '@media(max-width:520px){.lv{margin:6px 30px 0}.mc.m3{gap:6px}}', '.n7-scale{max-width:390px;margin:10px auto;direction:ltr}', '.n7-scale .row,.n7-scale .step{display:grid;grid-template-columns:1.8fr .75fr .9fr;gap:8px;align-items:center}', '.n7-scale .row{margin:0 auto 6px}', '.n7-scale .step{margin:-2px auto 6px}', '.n7-scale .c{border:2px dashed #c8d4e6;border-radius:16px;min-height:42px;padding:8px 12px;background:#fff;display:flex;align-items:center;justify-content:center;text-align:center}', '.n7-scale .tag{display:inline-flex;align-items:center;justify-content:center;min-width:58px;height:26px;padding:0 10px;border-radius:999px;background:var(--accent);color:#fff;font:bold .82rem Tahoma,sans-serif;justify-self:center}', '.n7-scale .skip{min-height:1px}'
  ].join('\n');
  document.head.appendChild(s);
})();

/* ================= ابزارهای مشترک ================= */
var nf = function (v) { var s = String(+(+v).toFixed(6)); return s === '-0' ? '0' : s; };
var lab = function (v) { var s = nf(abs(v)); return (v < -1e-9 ? '\u2212' : '') + fa(s); };
var AL = function (lines) { return K.dm('\\begin{aligned}' + lines.join('\\\\') + '\\end{aligned}'); };
var verdict = function (parts, cls) { return '<div class="nleq vd ' + (cls || '') + '">' + parts.map(function (p) { return '<i class="' + p[0] + '">$' + p[1] + '$</i>'; }).join('') + '</div>'; };
var CL = ['var(--accent)', 'var(--pink)', '#4c5fd5', '#e08a00', 'var(--mark)'];
var gcd = function (a, b) { a = abs(a); b = abs(b); while (b) { var t = a % b; a = b; b = t; } return a; };
var SQ = function (n) { return '\\sqrt{' + n + '}'; };
var fr = function (n, d) { return '\\dfrac{' + n + '}{' + d + '}'; };
/* قانون .opt svg در style.css اندازهٔ علامت ریشهٔ KaTeX را خراب می‌کند؛ اندازهٔ اصلی را برمی‌گردانیم */
var fixK = function (root) { [].forEach.call(root.querySelectorAll('.opt .katex svg'), function (v) { v.style.height = 'inherit'; v.style.maxWidth = 'none'; v.style.width = '100%'; }); };
var isSq = function (n) { var r = Math.round(Math.sqrt(n)); return r * r === n; };

/* ---- محور افقی HTML ---- */
function axisHTML(o, marks) {
  var sp = o.max - o.min, pc = function (v) { return (v - o.min) / sp * 100; }, h = '<div class="lv ' + (o.cls || '') + '"><i class="ax"></i>';
  (o.ticks || []).forEach(function (t) { h += '<i class="tk' + (t.mn ? ' mn' : '') + (t.z ? ' z' : '') + '" style="left:' + pc(t.v) + '%"></i>' + (t.t ? '<span class="tn" dir="ltr" style="left:' + pc(t.v) + '%">' + t.t + '</span>' : ''); });
  (marks || []).forEach(function (m) {
    var hs = m.lv ? 66 : 10, low = (o.cls || '').indexOf('lo') >= 0;
    if (m.lv && m.h) { h += '<i class="stem" style="left:' + pc(m.v) + '%;height:' + (hs + 4) + 'px"></i>'; }
    h += '<i class="dot" style="left:' + pc(m.v) + '%;--c:' + m.c + '"></i>';
    if (m.h) { h += '<span class="tip" style="left:' + pc(m.v) + '%;bottom:' + (55 + hs - 10 - (low ? 6 : 0)) + 'px">' + m.h + '</span>'; }
  });
  return h + '</div>';
}
function ax(o) {
  var ticks = [], marks = [], i, v, st = o.step;
  for (i = 0; i <= o.n; i++) { v = o.lo + i * st; ticks.push({ v: v, mn: (o.lab || []).indexOf(i) < 0, t: (o.lab || []).indexOf(i) > -1 ? lab(v) : '' }); }
  (o.pts || []).forEach(function (p) { marks.push({ v: o.lo + p.i * st, c: p.c || CL[4], h: p.h, lv: p.lv }); });
  return '<div class="nl">' + axisHTML({ min: o.lo - .5 * st, max: o.lo + (o.n + .5) * st, ticks: ticks, cls: (o.pts && o.pts.some(function (p) { return p.lv; })) ? '' : 'lo' }, marks) + (o.cap ? '<p class="legend n7-axis-cap">' + o.cap + '</p>' : '') + '</div>';
}
/* مربع‌شمار: n×n خانه */
function grid(n, big) {
  var c = Math.max(10, Math.min(big ? 26 : 22, Math.floor(250 / n) - 2)), h = '<div class="sqg" style="grid-template-columns:repeat(' + n + ',' + c + 'px);--c:' + c + 'px">', i;
  for (i = 0; i < n * n; i++) { h += '<i></i>'; }
  return h + '</div>';
}
/* سه مربع تو در تو: k × k، مربعِ مساحت N، (k+1)×(k+1) */
function nested(N) {
  var k = Math.floor(Math.sqrt(N)), S = 220, X = 10, Y = 10, sk = k / (k + 1) * S, sn = Math.sqrt(N) / (k + 1) * S, svg;
  svg = '<svg viewBox="0 0 ' + (S + 2 * X) + ' ' + (S + 2 * Y) + '" aria-hidden="true" style="max-width:260px">' +
    '<rect x="' + X + '" y="' + Y + '" width="' + S + '" height="' + S + '" fill="var(--pink)" stroke="#14213d" stroke-width="2.5"/>' +
    '<rect x="' + X + '" y="' + Y + '" width="' + sn + '" height="' + sn + '" fill="var(--mark)" stroke="#14213d" stroke-width="2.5" stroke-dasharray="6 4"/>' +
    '<rect x="' + X + '" y="' + Y + '" width="' + sk + '" height="' + sk + '" fill="var(--accent)" stroke="#14213d" stroke-width="2.5"/></svg>';
  return '<div class="figs one"><figure>' + svg
    + '<figcaption><div class="n7-rel sm"><i class="g">' + M(String(k) + '^{2}=' + (k * k)) + '</i><i class="w">' + M('\\lt') + '</i><i class="y">' + M(String(N)) + '</i><i class="w">' + M('\\lt') + '</i><i class="p">' + M(String(k + 1) + '^{2}=' + ((k + 1) * (k + 1))) + '</i></div>'
    + 'مربع سبز، مربع زردِ خط‌چین (مساحت ' + fa(N) + ') را در خود جا می‌دهد و خودش در مربع صورتی جا می‌شود.</figcaption></figure></div>';
}
function rootRange(n, a, b) {
  return '<div class="n7-rel sm"><i class="g">' + M(String(a)) + '</i><i class="w">' + M('\\lt') + '</i><i class="y">' + M('\\sqrt{' + n + '}') + '</i><i class="w">' + M('\\lt') + '</i><i class="p">' + M(String(b)) + '</i></div>';
}
function scaleSqrt() {
  var rows = [[36, 6], [3600, 60], [360000, 600]], h = '<div class="n7-scale">';
  rows.forEach(function (r, i) {
    h += '<div class="row"><div class="c">' + M('\\sqrt{' + r[0] + '}=' + r[1]) + '</div><div class="c">' + M(String(r[1])) + '</div><div class="c">' + M(String(r[0])) + '</div></div>';
    if (i < rows.length - 1) { h += '<div class="step"><div class="skip"></div><div class="tag">↓ ' + M('\\times 10') + '</div><div class="tag">↓ ' + M('\\times 100') + '</div></div>'; }
  });
  return h + '</div>';
}
function betweenSq(k, n) {
  return '<div class="n7-bet">'
    + '<span class="tag">' + M(String(k) + '^{2}') + '</span><span></span><span></span><span></span><span class="tag">' + M(String(k + 1) + '^{2}') + '</span>'
    + '<span class="bar">||</span><span></span><span></span><span></span><span class="bar">||</span>'
    + '<span class="num">' + M(String(k * k)) + '</span><span>' + M('\\lt') + '</span><span class="mid">' + M(String(n)) + '</span><span>' + M('\\lt') + '</span><span class="num">' + M(String((k + 1) * (k + 1))) + '</span>'
    + '</div>';
}

/* ---- مربع زنده: ضلع ← مساحت، و برعکس ---- */
K.squareDemo = function (host) {
  var n = 7, back = false, out;
  host.innerHTML = '<div class="chips" style="direction:rtl"><button type="button" class="chip on" data-m="0">ضلع را بده، مساحت را بگیر</button><button type="button" class="chip" data-m="1">مساحت را بده، ضلع را بگیر</button></div><div class="lz"></div><div class="rng sq"><span>کوچک</span><div class="mid"><input type="range" min="2" max="12" step="1" value="7" aria-label="ضلع"><div class="ticks">' + [2,3,4,5,6,7,8,9,10,11,12].map(function(x){ return '<span>' + fa(x) + '</span>'; }).join('') + '</div></div><span>بزرگ</span></div>';
  out = host.querySelector('.lz');
  function paint() {
    var a = n * n, h;
    h = '<div class="sqw"><div class="sqs">ضلع ' + fa(n) + '</div>' + grid(n, true) + '</div>';
    h += '<div class="nleq vd">' + (back ? '<i class="m">$' + a + '$</i><i class="b">$\\sqrt{\\ \\ }$</i><i class="a">$' + n + '$</i>' : '<i class="a">$' + n + '$</i><i class="b">$^2$</i><i class="m">$' + a + '$</i>') + '</div>';
    h += K.dm(back ? '\\sqrt{' + a + '}=' + n : n + '^2=' + a);
    h += '<p class="legend" style="font-size:.95rem;color:var(--ink)">' + (back ? 'مساحت ' + fa(a) + ' است؛ ضلعی که در خودش ضرب شود و ' + fa(a) + ' بشود، ' + fa(n) + ' است.' : 'ضلع ' + fa(n) + ' را در خودش ضرب کردیم و مساحت ' + fa(a) + ' شد.') + '</p>';
    out.innerHTML = rr(h);
    host.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('on', (+c.dataset.m === 1) === back); });
  }
  host.addEventListener('click', function (e) { var c = e.target.closest('.chip'); if (c) { back = c.dataset.m === '1'; paint(); } });
  host.addEventListener('input', function (e) { if (e.target.matches('input')) { n = +e.target.value; paint(); } });
  paint();
};
/* ---- شکار جذر: عدد را بین دو عدد با یک رقم اعشار قرار بده ---- */
K.rootHunt = function (host) {
  var N, low, high, selected, message, touched;
  function tenth(x) { return +(x / 10).toFixed(1); }
  function square(x) { return +(x * x).toFixed(4); }
  function targets() {
    var k = Math.floor(Math.sqrt(N) * 10);
    return { low: tenth(k), high: tenth(k + 1) };
  }
  function complete(side) { var t = targets(); return side === 'low' ? low === t.low : high === t.high; }
  function nw() {
    do { N = R(15, 90); } while (isSq(N));
    var r = Math.sqrt(N), lo = Math.floor(r), hi = Math.ceil(r);
    low = Math.max(0, lo - R(2, 4)); high = hi + R(2, 4);
    selected = 'high'; message = ''; touched = false;
  }
  function fmt(v) { return nf(v); }
  function box(side) {
    var v = side === 'low' ? low : high, active = side === selected, ok = complete(side);
    return '<div class="n7-hunt-box' + (active ? ' chosen' : ' dim') + (ok ? ' solved' : '') + '">' + M(fmt(v)) + '</div>';
  }
  function paint() {
    var both = complete('low') && complete('high'), h = '';
    h += '<div class="n7-hunt-modes" dir="rtl"><button type="button" class="chip' + (selected === 'high' ? ' on' : '') + '" data-side="high">کران بالا</button><button type="button" class="chip' + (selected === 'low' ? ' on' : '') + '" data-side="low">کران پایین</button></div>';
    h += '<p class="ask">جذر عدد زیر را بین دو عدد اعشاریِ پشت‌سرهم پیدا کن. ابتدا کران موردنظر را انتخاب کن و با دکمه‌ها مقدارش را تغییر بده:</p>';
    h += '<div class="n7-hunt-visual" dir="ltr">';
    h += '<div class="n7-hunt-grid">';
    h += '<span class="cap" style="grid-column:1;grid-row:1">' + M(fmt(low) + '^{2}=' + fmt(square(low))) + '</span>';
    h += '<span class="cap" style="grid-column:5;grid-row:1">' + M(fmt(high) + '^{2}=' + fmt(square(high))) + '</span>';
    h += '<span class="arrow" style="grid-column:1;grid-row:2">⇓</span>';
    h += '<span class="arrow" style="grid-column:5;grid-row:2">⇓</span>';
    h += '<span style="grid-column:1;grid-row:3">' + box('low') + '</span>';
    h += '<span class="n7-hunt-less" style="grid-column:2;grid-row:3">' + M('\\lt') + '</span>';
    h += '<span class="n7-hunt-radicand" style="grid-column:3;grid-row:3">' + M('\\sqrt{' + N + '}') + '</span>';
    h += '<span class="n7-hunt-less" style="grid-column:4;grid-row:3">' + M('\\lt') + '</span>';
    h += '<span style="grid-column:5;grid-row:3">' + box('high') + '</span></div></div>';
    h += '<div class="n7-hunt-controls" dir="ltr"><button type="button" class="btn" data-d="-0.1">' + M('-0.1') + '</button><button type="button" class="btn" data-d="0.1">' + M('+0.1') + '</button><button type="button" class="btn" data-d="-1">' + M('-1') + '</button><button type="button" class="btn" data-d="1">' + M('+1') + '</button></div>';
    if (touched && message) { h += '<div class="fb ' + (both || complete(selected) ? 'ok' : 'bad') + ' n7-hunt-feedback">' + message + '</div>'; }
    if (both) { h += '<div class="ex n7-hunt-result"><p>هر دو کران درست پیدا شدند:</p>' + K.dm(fmt(low) + '\\lt\\sqrt{' + N + '}\\lt' + fmt(high)) + '<p>' + M(fmt(square(low))) + ' از ' + M(String(N)) + ' کوچک‌تر و ' + M(fmt(square(high))) + ' از آن بزرگ‌تر است.</p></div>'; }
    h += '<div class="n7-hunt-new"><button type="button" class="btn primary" data-nw="1">عدد جدید</button></div>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) { return; }
    if (b.dataset.nw) { nw(); paint(); return; }
    if (b.dataset.side) { selected = b.dataset.side; message = ''; touched = false; paint(); return; }
    if (b.dataset.d === undefined) { return; }
    touched = true;
    if (complete(selected)) { message = 'این کران درست پیدا شده و قفل است. کران دیگر را انتخاب کن.'; paint(); return; }
    var delta = +b.dataset.d, v = selected === 'low' ? low : high;
    var next = +((v + delta).toFixed(1));
    if (selected === 'low' && (next < 0 || square(next) >= N || next >= high)) {
      message = 'این مقدار دیگر کران پایین نیست؛ مربع آن باید از ' + M(String(N)) + ' کوچک‌تر باشد.';
    } else if (selected === 'high' && (next <= 0 || square(next) <= N || next <= low)) {
      message = 'این مقدار دیگر کران بالا نیست؛ مربع آن باید از ' + M(String(N)) + ' بزرگ‌تر باشد.';
    } else {
      if (selected === 'low') { low = next; } else { high = next; }
      message = complete(selected) ? 'کران ' + (selected === 'low' ? 'پایین' : 'بالا') + ' را درست پیدا کردی!' : 'این کران هنوز دقیق نیست؛ آن را به جذر نزدیک‌تر کن.';
    }
    paint();
  });
  nw(); paint();
};

/* ================= تولید سؤال ================= */
var wrongNote = function (v) { return 'با مربع‌کردن امتحان کن؛ حاصلِ این گزینه در خودش ضرب نمی‌شود و ' + M(String(v)) + ' نمی‌دهد.'; };
function genS1() {   // جذر عدد صحیح کامل‌مربع
  var n = Math.random() < 0.3 ? R(2, 9) * 10 : R(2, 20), v = n * n, c = [n, n + 1, n - 1], m = [ '', 'نزدیک است، اما ' + 'مربعِ آن ' + 'با ' + '', ''], out;
  var cand = [{ x: n, ok: 1 }, { x: n + 1 }, { x: n - 1 }, { x: v / 2, note: 'جذر یعنی نصف‌کردن نیست؛ جذر ' + fa(v) + ' عددی است که در خودش ضرب شود و ' + fa(v) + ' بشود.' }, { x: v / 10 > 1 && v % 10 === 0 ? v / 10 : n * 2 }];
  var seen = {}; cand = cand.filter(function (c) { var k = c.x; if (seen[k] || c.x < 1) { return false; } seen[k] = 1; return true; });
  var wr = shuffle(cand.slice(1)).slice(0, 3);
  return { v: v, n: n, opts: shuffle([cand[0]].concat(wr).map(function (c) { return { h: M(String(c.x)), ok: !!c.ok, m: c.note || wrongNote(v) }; })) };
}
function genS2() {   // جذر کسر یا اعشاری
  var t = R(0, 1), a, b, x, v, q, ok, d1, d2, d3;
  if (!t) {
    do { a = R(1, 9); b = R(2, 10); } while (gcd(a, b) !== 1);
    q = '\\sqrt{' + fr(a * a, b * b) + '}'; ok = fr(a, b);
    d1 = fr(a, b * b); d2 = fr(a * a, b); d3 = fr(a, 2 * b);
    return { q: q, ok: ok, d: [d1, d2, d3], expl: '<p>جذر صورت و مخرج را جدا می‌گیریم:</p>' + K.dm('\\sqrt{' + fr(a * a, b * b) + '}=\\dfrac{\\sqrt{' + a * a + '}}{\\sqrt{' + b * b + '}}=' + fr(a, b)), notes: ['جذر را فقط برای مخرج یا فقط صورت نگیر؛ هر دو باید جذر گرفته شوند.', 'جذر را فقط برای مخرج یا فقط صورت نگیر؛ هر دو باید جذر گرفته شوند.', 'جذر یعنی نصف‌کردن نیست؛ با مربع‌کردن امتحان کن.'] };
  }
  x = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.1, 1.2, 1.3, 1.5, 0.05, 0.02, 0.03][R(0, 15)]; v = +(x * x).toFixed(4);
  return { q: '\\sqrt{' + nf(v) + '}', ok: nf(x), d: [nf(+(x / 10).toFixed(4)), nf(+(x * 10).toFixed(4)), nf(+(v / 2).toFixed(4))], expl: '<p>با مربع‌کردن امتحان می‌کنیم:</p>' + AL([nf(x) + '^2&=' + nf(v), '\\sqrt{' + nf(v) + '}&=' + nf(x)]), notes: ['اعشار را جابه‌جا کردی؛ ' + 'جذر عددهای اعشاری، نصفِ تعداد رقم‌های اعشار را دارد: ' + M(nf(x) + '^2') + ' دو برابرِ رقم‌های اعشار دارد.', 'جذر ' + 'عددی کوچک‌تر از ۱ هم عددی کوچک‌تر از ۱ است؛ با مربع‌کردن امتحان کن.', 'جذر یعنی نصف‌کردن نیست؛ با مربع‌کردن امتحان کن.'] };
}
function genS3() {   // بین کدام دو عدد صحیح؟
  var N, k, c;
  do { N = R(2, 99); } while (isSq(N)); k = Math.floor(Math.sqrt(N));
  c = [[k, k + 1, 1], [k + 1, k + 2], [Math.max(1, k - 1), k], [Math.floor(N / 2), Math.floor(N / 2) + 1]];
  var seen = {}; c = c.filter(function (x) { var s = x[0] + ',' + x[1]; if (seen[s]) { return false; } seen[s] = 1; return true; });
  return { N: N, k: k, opts: shuffle(c.map(function (x) { return { h: fa(x[0]) + '، ' + fa(x[1]), ok: !!x[2], m: x[0] === Math.floor(N / 2) ? 'جذر نصف‌کردن نیست؛ ' + M(String(x[0]) + '^2') + ' و ' + M(String(x[1]) + '^2') + ' را با ' + M(String(N)) + ' بسنج.' : 'مربعِ این دو عدد را حساب کن و ببین ' + M(String(N)) + ' بینشان هست یا نه.' }; })) };
}
function exS3(q) {
  var k = q.k, N = q.N;
  return '<p>مربع‌های کامل اطراف ' + M(String(N)) + ':</p>' + K.dm(k + '^2=' + k * k + '\\ \\lt\\ ' + N + '\\ \\lt\\ ' + (k + 1) + '^2=' + (k + 1) * (k + 1)) + '<p>پس جذرها هم به همین ترتیب‌اند:</p>' + verdict([['a', String(k)], ['b', '\\lt'], ['n', SQ(N)], ['b', '\\lt'], ['m', String(k + 1)]], 'sm') + nested(N);
}

/* ---- تمرین مرحله‌ای ---- */
K.rootSteps = function (host) {
  var ST = ['جذر عدد کامل‌مربع', 'کسر و اعشاری', 'بین کدام دو عدد؟'], si = 0, ok = 0, q, pick = null, fin = false;
  function nw() {
    pick = null;
    if (si === 0) { var g = genS1(); q = { ask: 'جذر عدد زیر چند است؟', cq: M(SQ(g.v)), opts: g.opts, expl: function () { return '<p>دنبال عددی هستیم که در خودش ضرب شود و ' + fa(g.v) + ' بشود:</p>' + K.dm(g.n + '\\times' + g.n + '=' + g.v) + verdict([['a', SQ(g.v)], ['b', '='], ['m', String(g.n)]]); } }; }
    else if (si === 1) { var s = genS2(); q = { ask: 'جذر عدد زیر چند است؟', cq: M(s.q), opts: shuffle([{ h: M(s.ok), ok: true, m: '' }].concat(s.d.map(function (d, i) { return { h: M(d), ok: false, m: s.notes[i] }; }))), expl: function () { return s.expl + verdict([['a', s.q], ['b', '='], ['m', s.ok]]); } }; }
    else { var t = genS3(); q = { ask: 'جذر عدد زیر بین کدام دو عدد صحیحِ پشت‌سرهم است؟', cq: M(SQ(t.N)), opts: t.opts, expl: function () { return exS3(t); } }; }
  }
  function paint() {
    var h = '<div class="stg">' + ST.map(function (s, i) { return '<span class="' + (i < si || fin ? 'dn' : i === si ? 'cu' : '') + '">' + (i < si || fin ? '✓ ' : '') + s + '</span>'; }).join('') + '</div>', oh = '', o;
    if (fin) { host.innerHTML = rr(h + '<div class="fb ok"><b>همهٔ مرحله‌ها را گذراندی!</b> حالا برو سراغ تله‌های جذر.</div><div class="opts"><button type="button" class="btn" data-r="1">از اول، با عددهای جدید</button></div>'); return; }
    h += '<p class="stage-progress-meta">مرحلهٔ ' + fa(si + 1) + ' — پاسخ‌های درست: ' + fa(ok) + ' از ۲</p><p class="ask" style="font-weight:normal">' + q.ask + '</p><div class="cq">' + q.cq + '</div><div class="mc m2" id="rsm"></div>';
    q.opts.forEach(function (op, k) { var c = pick === null ? '' : op.ok ? ' right' : k === pick ? ' wrong' : ''; oh += '<button type="button" class="btn opt' + c + '" data-o="' + k + '"' + (pick === null ? '' : ' disabled') + '>' + op.h + '</button>'; });
    if (pick !== null) { o = q.opts[pick]; h += '<div class="fb ' + (o.ok ? 'ok' : 'bad') + '">' + (o.ok ? '✓ درست است!' : o.m) + '</div><div class="ex">' + q.expl() + '</div><div class="opts"><button type="button" class="btn primary" data-n="1">' + (o.ok && ok >= 2 ? (si === 2 ? 'پایان' : 'مرحلهٔ بعد') : 'مرحلهٔ بعدی') + '</button></div>'; }
    host.innerHTML = rr(h); host.querySelector('#rsm').innerHTML = rr(oh); fixK(host);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.o !== undefined) { pick = +b.dataset.o; if (q.opts[pick].ok) { ok++; } paint(); }
    else if (b.dataset.n) { if (ok >= 2) { ok = 0; si++; if (si > 2) { fin = true; paint(); return; } } nw(); paint(); }
    else if (b.dataset.r) { si = 0; ok = 0; fin = false; nw(); paint(); }
  }); nw(); paint();
};

/* ---- درست یا نادرست؟ (تله‌های جذر) ---- */
var TF = [
  { t: '\\sqrt{9+16}=\\sqrt{9}+\\sqrt{16}', ok: 0, e: '<p>سمت چپ ' + '$\\sqrt{25}=5$' + ' است، اما سمت راست ' + '$3+4=7$' + '. جذر روی جمع پخش نمی‌شود.</p>' },
  { t: '\\sqrt{100-36}=\\sqrt{100}-\\sqrt{36}', ok: 0, e: '<p>سمت چپ ' + '$\\sqrt{64}=8$' + ' و سمت راست ' + '$10-6=4$' + ' است. جذر روی تفریق هم پخش نمی‌شود.</p>' },
  { t: '\\sqrt{4\\times9}=\\sqrt{4}\\times\\sqrt{9}', ok: 1, e: '<p>هر دو طرف ۶ است؛ جذر روی ضرب پخش می‌شود: ' + '$\\sqrt{36}=6$' + ' و ' + '$2\\times3=6$' + '.</p>' },
  { t: '\\sqrt{49}=\\pm7', ok: 0, e: '<p>علامت جذر فقط یک مقدار را نشان می‌دهد: ' + '$\\sqrt{49}=7$' + '. اما معادلهٔ ' + '$x^2=49$' + ' دو جواب ' + '$7$' + ' و ' + '$-7$' + ' دارد.</p>' },
  { t: '\\sqrt{-25}=-5', ok: 0, e: '<p>مربعِ هر عدد (مثبت یا منفی) نامنفی است؛ پس عددی نیست که مربعش ' + '$-25$' + ' شود و ' + '$\\sqrt{-25}$' + ' در این سطح معنی ندارد.</p>' },
  { t: '\\sqrt{0.16}=0.4', ok: 1, e: '<p>' + '$0.4^2=0.16$' + ' است؛ پس درست است.</p>' },
  { t: '\\sqrt{0.16}=0.04', ok: 0, e: '<p>' + '$0.04^2=0.0016$' + ' است نه ' + '$0.16$' + '. جذر عدد اعشاری، نصفِ رقم‌های اعشار را دارد.</p>' },
  { t: '\\sqrt{\\dfrac{1}{4}}=\\dfrac{1}{2}', ok: 1, e: '<p>' + '$\\left(\\dfrac{1}{2}\\right)^2=\\dfrac{1}{4}$' + ' است؛ پس درست است.</p>' },
  { t: '\\sqrt{\\dfrac{1}{4}}=\\dfrac{1}{16}', ok: 0, e: '<p>جذر صورت و مخرج هر دو گرفته می‌شود: ' + '$\\dfrac{\\sqrt{1}}{\\sqrt{4}}=\\dfrac{1}{2}$' + '.</p>' },
  { t: '\\sqrt{12}=6', ok: 0, e: '<p>' + '$6^2=36$' + ' است نه ' + '$12$' + '. جذر نصف‌کردن نیست؛ ' + '$\\sqrt{12}$' + ' کمی کمتر از ۳.۵ است.</p>' },
  { t: '3\\lt\\sqrt{10}\\lt4', ok: 1, e: '<p>' + '$3^2=9\\lt10\\lt16=4^2$' + ' است؛ پس درست است.</p>' },
  { t: '8\\lt\\sqrt{80}\\lt9', ok: 1, e: '<p>' + '$8^2=64\\lt80\\lt81=9^2$' + ' است؛ پس درست است.</p>' },
  { t: '\\left(\\sqrt{7}\\right)^2=7', ok: 1, e: '<p>مربع‌کردن و جذر یکدیگر را خنثی می‌کنند؛ پس حاصل ' + '$7$' + ' است.</p>' },
  { t: '\\sqrt{3^2}=3', ok: 1, e: '<p>' + '$3^2=9$' + ' و ' + '$\\sqrt{9}=3$' + ' است.</p>' }
];
K.tfTraps = function (host) {
  var L, i, answers;
  function nw() { L = shuffle(TF.slice()).slice(0, 6); i = 0; answers = Array(L.length).fill(null); }
  function paint() {
    var h, q, ans = answers[i], score = answers.reduce(function(n,a,k){return n+(a!==null && a===L[k].ok?1:0);},0);
    if (i >= L.length) {
      host.innerHTML = rr('<div class="fb ' + (score >= 5 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(score) + ' از ' + fa(L.length) + '</b><p>' + (score === L.length ? 'همهٔ سؤال‌ها را درست پاسخ دادی.' : 'سؤال‌هایی را که اشتباه کردی مرور کن.') + '</p></div><div class="opts n7-tf-nav"><button type="button" class="btn" data-p="1">سؤال قبلی</button><button type="button" class="btn primary" data-r="1">دوباره با جمله‌های جدید</button></div>'); return;
    }
    q = L[i];
    h = '<div class="stg">' + L.map(function (x,k) { return '<span class="' + (answers[k]!==null?'dn':k===i?'cu':'') + '">' + fa(k+1) + '</span>'; }).join('') + '</div><p class="ask">این تساوی (یا نامساوی) درست است؟</p><div class="cq">' + M(q.t) + '</div><div class="sgnrow"><button type="button" class="btn' + (ans===null?'':q.ok===1?' right':ans===1?' wrong':'') + '" data-a="1"' + (ans===null?'':' disabled') + '>درست</button><button type="button" class="btn' + (ans===null?'':q.ok===0?' right':ans===0?' wrong':'') + '" data-a="0"' + (ans===null?'':' disabled') + '>نادرست</button></div>';
    if (ans!==null) { h += '<div class="fb ' + (ans===q.ok?'ok':'bad') + '">' + (ans===q.ok?'✓ درست است!':'پاسخ نادرست است.') + '</div><div class="ex">' + q.e + '</div>'; }
    h += '<div class="opts n7-tf-nav"><button type="button" class="btn" data-p="1"' + (i===0?' disabled':'') + '>سؤال قبلی</button><button type="button" class="btn primary" data-n="1"' + (ans===null?' disabled':'') + '>' + (i===L.length-1?'مشاهدهٔ نتیجه':'سؤال بعدی') + '</button></div>';
    host.innerHTML=rr(h);
  }
  host.addEventListener('click',function(e){var b=e.target.closest('button');if(!b||b.disabled)return;
    if(b.dataset.a!==undefined){if(answers[i]===null)answers[i]=+b.dataset.a;paint();}
    else if(b.dataset.n){i++;paint();}
    else if(b.dataset.p){i=Math.max(0,i-1);paint();}
    else if(b.dataset.r){nw();paint();}
  });nw();paint();
};

/* ---- تمرین پایانی ---- */
function qCompare() {
  var n, m, c, base, v;
  do { n = R(5, 90); } while (isSq(n));
  base = Math.sqrt(n); m = Math.random() < 0.5 ? Math.round(base) : +(Math.round(base * 10) / 10 + [-0.1, 0, 0.1][R(0, 2)]).toFixed(1);
  if (m <= 0 || abs(m * m - n) < 1e-9) { m = Math.round(base) + 1; }
  c = m * m < n ? 1 : -1;
  return {
    ask: 'کدام علامت درست است؟', cls: 'm2', cq: M(SQ(n) + '\\;\\square\\;' + nf(m)),
    opts: [-1, 1].map(function (s) { return { h: M(s < 0 ? '\\lt' : '\\gt'), ok: s === c, m: 'هر دو طرف مثبت‌اند؛ پس مربعشان را مقایسه کن: ' + M(String(n)) + ' با ' + M(nf(m) + '^2=' + nf(+(m * m).toFixed(4))) + '.' }; }),
    expl: function () { return '<p>هر دو طرف مثبت‌اند؛ پس می‌توانیم هر دو را مربع کنیم و مربع‌ها را مقایسه کنیم:</p>' + AL(['(' + SQ(n) + ')^2&=' + n, '(' + nf(m) + ')^2&=' + nf(+(m * m).toFixed(4))]) + verdict([['a', SQ(n)], ['b', c > 0 ? '\\gt' : '\\lt'], ['m', nf(m)]]); }
  };
}
function qTrue() {
  var T1 = TF.filter(function (x) { return x.ok; }), F = TF.filter(function (x) { return !x.ok; }), t = T1[R(0, T1.length - 1)], f = shuffle(F.slice()).slice(0, 3), all = shuffle([t].concat(f));
  return {
    ask: 'کدام تساوی (یا نامساوی) درست است؟', cls: 'm1', opts: all.map(function (x) { return { h: M(x.t), ok: x === t, m: 'این گزینه درست نیست.' + '' }; }),
    expl: function () { return all.map(function (x) { return '<p>' + M(x.t) + ': ' + (x === t ? '✓' : '✗') + '</p>'; }).join('') + t.e; }
  };
}
K.rootFinal = function (host) {
  var qs, i, ans;
  function mk1() { var g = genS1(); return { ask: 'جذر عدد زیر چند است؟', cls: 'm2', cq: M(SQ(g.v)), opts: g.opts, expl: function () { return K.dm(g.n + '\\times' + g.n + '=' + g.v) + verdict([['a', SQ(g.v)], ['b', '='], ['m', String(g.n)]]); } }; }
  function mk2() { var s = genS2(); return { ask: 'جذر عدد زیر چند است؟', cls: 'm2', cq: M(s.q), opts: shuffle([{ h: M(s.ok), ok: true, m: '' }].concat(s.d.map(function (d, i) { return { h: M(d), ok: false, m: s.notes[i] }; }))), expl: function () { return s.expl + verdict([['a', s.q], ['b', '='], ['m', s.ok]]); } }; }
  function mk3() { var t = genS3(); return { ask: 'جذر عدد زیر بین کدام دو عدد صحیحِ پشت‌سرهم است؟', cls: 'm2', cq: M(SQ(t.N)), opts: t.opts, expl: function () { return exS3(t); } }; }
  function build() { qs = [mk1(), mk2(), mk3(), qCompare(), qTrue()]; i = 0; ans = []; }
  var fb = function (ok, html) { return '<div class="fb ' + (ok ? 'ok' : 'bad') + '">' + html + '</div>'; };
  function paint() {
    var q = qs[i], a = ans[i], h, oh = '', s, o;
    if (i === 5) {
      s = ans.filter(function (x, k) { return qs[k].opts[x].ok; }).length;
      host.innerHTML = rr('<div class="fb ' + (s >= 4 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(s) + ' از ۵</b><br>' + (s === 5 ? 'عالی بود! جذر را کاملاً فهمیده‌ای.' : s >= 3 ? 'خوب بود. بخش‌هایی را که اشتباه کردی دوباره مرور کن.' : 'یک بار دیگر درس را مرور کن؛ بعد با عددهای جدید امتحان کن.') + '</div><div class="opts end-actions"><button type="button" class="btn" data-pv="1">مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1">سؤال‌های جدید</button></div>'); return;
    }
    h = '<div class="stg">' + qs.map(function (x, k) { return '<span class="' + (ans[k] !== undefined ? (qs[k].opts[ans[k]].ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">' + q.ask + '</p>' + (q.cq ? '<div class="cq">' + q.cq + '</div>' : '') + '<div class="mc ' + q.cls + '" id="mcx"></div>';
    q.opts.forEach(function (op, k) { oh += '<button type="button" class="btn opt' + (a !== undefined ? (op.ok ? ' right' : k === a ? ' wrong' : '') : '') + '" data-o="' + k + '"' + (a !== undefined ? ' disabled' : '') + '>' + op.h + '</button>'; });
    if (a !== undefined) { o = q.opts[a]; h += fb(o.ok, o.ok ? '✓ درست است!' : (o.m || 'این گزینه درست نیست.')) + '<div class="ex">' + q.expl() + '</div>'; }
    h += '<div class="opts"><button type="button" class="btn" data-p="1"' + (i ? '' : ' disabled') + '>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (a === undefined ? ' disabled' : '') + '>' + (i === 4 ? 'مشاهدهٔ نتیجه':'سؤال بعدی') + '</button></div>';
    host.innerHTML = rr(h); host.querySelector('#mcx').innerHTML = rr(oh); fixK(host);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.o) { ans[i] = +b.dataset.o; paint(); } else if (b.dataset.nx) { i++; paint(); } else if (b.dataset.p) { i--; paint(); } else if (b.dataset.pv) { i = 0; paint(); } else if (b.dataset.r) { build(); paint(); }
  }); build(); paint();
};
var cards2 = function (cells) { return '<div class="sg">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + (c.e ? K.dm(c.e) : '') + '</div>'; }).join('') + '</div>'; };
var refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };
var sqChips = function () { var h = '<div class="nleq wrap sm">', k; for (k = 1; k <= 15; k++) { h += '<i class="n">$' + k + '^2=' + k * k + '$</i>'; } return h + '</div>'; };

return {
  html: function () {
    var T = String.raw;
    return [
      K.sn('۱', 'جذر، برگشتِ مربع'),
      T`<p>یک کاشی مربع‌شکل با مساحت ۴۹ سانتی‌متر مربع داریم. ضلعش چند سانتی‌متر است؟ باید عددی را پیدا کنیم که در خودش ضرب شود و ۴۹ بشود؛ یعنی ۷. به این کار «جذر گرفتن» می‌گوییم. با کشیدن اسلایدر، رفت و برگشت را ببین:</p><div class="cover" id="sq" style="animation:none"></div>`,
      cards2([{ c: 'p', t: 'مربع‌کردن', r: 'ضلع ← مساحت', e: '7^2=49' }, { c: 'n', t: 'جذر', r: 'مساحت ← ضلع', e: '\\sqrt{49}=7' }]),
      '<p>پس جذر و مربع‌کردن مثل «رفت و برگشت» هستند و هر کدام کار دیگری را خنثی می‌کند:</p>', AL(['\\sqrt{7^{2}}&=7', '(\\sqrt{49})^{2}&=49']),
      K.box('note', 'نکته', T`<p>علامت $\sqrt{\ \ }$ را می‌خوانیم «جذر». $\sqrt{49}$ یعنی «جذر ۴۹». حاصل جذر همیشه عددی نامنفی (صفر یا مثبت) است.</p>`),

      K.sn('۲', 'مربع‌های کامل'),
      '<p>عددی که مربعِ یک عدد صحیح باشد، «مربع کامل» نام دارد. این مربع‌ها را خوب است از بر باشی:</p>', sqChips(),
      '<p>برای عددهای بزرگ‌تر، صفرها کمک می‌کنند. هر بار که عدد را ده برابر کنیم، مربعش صد برابر می‌شود:</p>', scaleSqrt(),
      K.box('note', 'یک آزمون سریع', '<p>مربع کامل هیچ‌وقت به رقم ' + M('2') + '، ' + M('3') + '، ' + M('7') + ' یا ' + M('8') + ' ختم نمی‌شود. پس ' + M('147') + ' مربع کامل نیست. (ختم‌شدن به رقم‌های دیگر هنوز تضمین نمی‌کند.)</p>'),

      K.sn('۳', 'جذر عددهای کامل‌مربع'),
      '<p>برای پیداکردن جذر یک مربع کامل، از خودت بپرس: «چه عددی در خودش ضرب شود تا این عدد بشود؟»</p>',
      '<h4>مثال اول</h4><p>جذر ' + M('64') + ' چند است؟ می‌دانیم ' + M('8\\times8=64') + '، پس:</p>', verdict([['a', '\\sqrt{64}'], ['b', '='], ['m', '8']]),
      '<h4>مثال دوم</h4><p>جذر ' + M('169') + ' چند است؟ ' + M('12^2=144') + ' کم است و ' + M('13^2=169') + ' درست است:</p>', verdict([['a', '\\sqrt{169}'], ['b', '='], ['m', '13']]),
      '<h4>مثال سوم: عدد بزرگ</h4><p>جذر ' + M('3600') + ' چند است؟ ' + M('3600=36\\times100') + ' و ' + M('\\sqrt{36}=6') + ' و ' + M('\\sqrt{100}=10') + ' است:</p>', K.dm('\\sqrt{3600}=\\sqrt{36}\\times\\sqrt{100}=6\\times10=60'),
      K.box('err', '⚠ خطای رایج', '<p>جذر ' + M('16') + ' نصفِ ' + M('16') + ' (یعنی ' + M('8') + ') نیست. با مربع‌کردن امتحان کن:</p>' + K.dm('8^2=64\\neq16\\qquad4^2=16\\ \\checkmark') + '<p>جذر گرفتن «نصف‌کردن» نیست؛ «برگشتِ مربع» است.</p>'),

      K.sn('۴', 'جذر کسر و عدد اعشاری'),
      '<p>برای کسر، جذر صورت و جذر مخرج را جدا می‌گیریم:</p>', K.dm('\\sqrt{\\dfrac{9}{16}}=\\dfrac{\\sqrt{9}}{\\sqrt{16}}=\\dfrac{3}{4}'),
      '<p>برای عدد اعشاری، آن را اول به کسر با مخرج ' + M('10') + '، ' + M('100') + '، ... می‌نویسیم:</p>', AL(['\\sqrt{0.49}&=\\sqrt{\\dfrac{49}{100}}=\\dfrac{7}{10}=0.7', '\\sqrt{0.0025}&=\\sqrt{\\dfrac{25}{10000}}=\\dfrac{5}{100}=0.05']),
      K.box('note', 'ترفند', '<p>تعداد رقم‌های اعشار در جذر، نصفِ تعداد رقم‌های اعشار خودِ عدد است: ' + M('0.49') + ' دو رقم اعشار دارد و ' + M('0.7') + ' یک رقم.</p>'),
      K.box('err', '⚠ خطای رایج', '<p>' + M('\\sqrt{0.09}') + ' برابر ' + M('0.03') + ' نیست. همیشه با مربع‌کردن امتحان کن:</p>' + K.dm('0.03^2=0.0009\\neq0.09\\qquad0.3^2=0.09\\ \\checkmark')),

      K.sn('۵', 'وقتی کامل‌مربع نیست'),
      '<p>بیشتر عددها مربع کامل نیستند؛ مثلاً ' + M('20') + '. جذرشان عدد صحیح نیست، اما می‌توانیم بگوییم میان کدام دو عدد صحیح است. مربع‌های کامل اطراف ' + M('20') + ' را پیدا می‌کنیم:</p>', betweenSq(4, 20),
      '<p>پس ضلعِ مربعی به مساحت ' + M('20') + ' میان ' + M('4') + ' و ' + M('5') + ' است:</p>', nested(20), rootRange(20, 4, 5),
      '<p>برای دقیق‌تر شدن، ده‌دهم‌ها را امتحان می‌کنیم و مربع آن‌ها را با ' + M('20') + ' می‌سنجیم:</p>', AL(['4.4^2&=19.36\\ \\lt\\ 20', '4.5^2&=20.25\\ \\gt\\ 20']), '<p>پس ' + M('4.4\\lt\\sqrt{20}\\lt4.5') + ' است:</p>',
      ax({ lo: 4, step: 0.1, n: 10, lab: [0, 4, 5, 10], pts: [{ i: 4.721, h: M('\\sqrt{20}'), c: CL[1], lv: 0 }], cap: 'روی محور، ' + M('\\sqrt{20}') + ' میان ' + M('4.4') + ' و ' + M('4.5') + ' قرار می‌گیرد.' }),
      '<p>خودت امتحان کن. حدس را با دکمه‌ها عوض کن تا جذر عدد را میان دو عدد اعشاریِ پشت‌سرهم بگیری:</p><div class="cover" id="rh" style="animation:none"></div>',
      K.box('note', 'مثال: جذر ۵۰', '<p>' + M('7^2=49\\lt50\\lt64=8^2') + ' است؛ پس ' + M('7\\lt\\sqrt{50}\\lt8') + '. چون ' + M('50') + ' خیلی به ' + M('49') + ' نزدیک است، ' + M('\\sqrt{50}') + ' کمی بیشتر از ' + M('7') + ' است.</p>'),

      K.sn('۶', 'مقایسهٔ جذر با یک عدد'),
      '<p>وقتی دو طرف مثبت‌اند، مربع‌کردنِ دو طرف ترتیب را عوض نمی‌کند. پس برای مقایسهٔ جذر با یک عدد، مربع هر دو را مقایسه می‌کنیم.</p>',
      '<h4>مثال اول</h4><p>کدام بزرگ‌تر است:</p>', K.dm('\\sqrt{50}\\quad\\square\\quad7'), AL(['(\\sqrt{50})^2&=50', '7^2&=49']), '<p>' + M('50') + ' بزرگ‌تر از ' + M('49') + ' است؛ پس:</p>', verdict([['a', '\\sqrt{50}'], ['b', '\\gt'], ['m', '7']]),
      '<h4>مثال دوم</h4><p>کدام بزرگ‌تر است:</p>', K.dm('\\sqrt{5}\\quad\\square\\quad2.3'), AL(['(\\sqrt{5})^2&=5', '2.3^2&=5.29']), '<p>' + M('5') + ' کمتر از ' + M('5.29') + ' است؛ پس:</p>', verdict([['a', '\\sqrt{5}'], ['b', '\\lt'], ['m', '2.3']]),
      '<h4>مثال سوم: مرتب‌کردن</h4><p>عددهای ' + M('\\sqrt{10},\\ 3.2,\\ 3') + ' را از کوچک به بزرگ مرتب کن. مربع‌ها را می‌نویسیم:</p>', AL(['3^2&=9', '(\\sqrt{10})^2&=10', '3.2^2&=10.24']), '<p>پس:</p>', verdict([['n', '3'], ['b', '\\lt'], ['n', '\\sqrt{10}'], ['b', '\\lt'], ['n', '3.2']], 'sm'),

      K.sn('۷', 'جمع زیر جذر و دیگر تله‌ها'),
      '<p>مهم‌ترین خطا این است که جذر را روی جمع (یا تفریق) پخش کنیم. جذر فقط روی ضرب پخش می‌شود:</p>',
      cards2([{ c: 'n', t: 'جمع: نادرست', r: 'جذر روی جمع پخش نمی‌شود.', e: '\\sqrt{9+16}\\neq\\sqrt{9}+\\sqrt{16}' }, { c: 'p', t: 'ضرب: درست', r: 'جذر روی ضرب پخش می‌شود.', e: '\\sqrt{4\\times9}=\\sqrt{4}\\times\\sqrt{9}' }]),
      '<p>برای دیدن تفاوت، هر دو طرف را حساب می‌کنیم:</p>', AL(['\\sqrt{9+16}&=\\sqrt{25}=5', '\\sqrt{9}+\\sqrt{16}&=3+4=7']),
      '<p>پس اول داخل جذر را حساب کن، بعد جذر بگیر. همین در هندسه هم کاربرد دارد؛ مثلاً در مثلث قائم‌الزاویه:</p>', K.dm('\\sqrt{\\vphantom{3^{2}+4^{2}}3^{2}+4^{2}}=\\sqrt{25}=5'),
      K.box('note', 'دو نکتهٔ دیگر', T`<ul><li>$\sqrt{49}=7$ است، نه $\pm7$. اما معادلهٔ $x^2=49$ دو جواب $7$ و $-7$ دارد.</li><li>جذر عدد منفی (مثل $\sqrt{-25}$) در این سطح معنی ندارد؛ چون مربع هر عدد، نامنفی است.</li></ul>`),

      K.sn('۸', 'راهنمای سریع جذر و ریشهٔ دوم'),
      refs([{ c: 'r1', t: 'جذر', r: 'برگشتِ مربع: عددی که در خودش ضرب شود.', e: '\\sqrt{49}=7' }, { c: 'r2', t: 'کسر و اعشاری', r: 'جذر صورت و مخرج را جدا بگیر؛ اعشاری را اول به کسر بنویس.', e: '\\sqrt{0.49}=0.7' }, { c: 'r3', t: 'کامل‌مربع نیست', r: 'بین دو مربع کامل جایش بده.', e: '4\\lt\\sqrt{20}\\lt5' }, { c: 'r4', t: 'مقایسه', r: 'دو طرف مثبت: مربعشان را مقایسه کن.', e: '\\sqrt{50}\\gt7' }, { c: 'r1', t: 'تلهٔ جمع', r: 'اول داخل جذر را حساب کن.', e: '\\sqrt{9+16}=5' }, { c: 'r3', t: 'امتحان', r: 'جوابت را همیشه با مربع‌کردن بسنج.', e: '0.3^2=0.09' }]),

      K.sn('۹', 'جذر دقیق'),
      '<p>هر مرحله با دو پاسخ درست تمام می‌شود. بعد از هر پاسخ، دلیلش را قدم‌به‌قدم می‌بینی.</p><div class="cover" id="rs" style="animation:none"></div>',
      K.sn('۱۰', 'درست یا نادرست؟'),
      '<p>شش جمله را بسنج. به تله‌ها دقت کن.</p><div class="cover" id="tf" style="animation:none"></div>',
      K.sn('۱۱', 'تمرین پایانی'),
      '<p>پنج سؤال با عددهای تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover" id="rf" style="animation:none"></div>',
      K.box('sum', 'بعد از این درس باید بتوانی', T`<ul><li>بدانی جذر برگشتِ مربع‌کردن است و $\sqrt{49}=7$ یعنی $7^2=49$.</li><li>جذر مربع‌های کامل، کسرها و عددهای اعشاری مناسب را پیدا کنی.</li><li>جذر عددی را که مربع کامل نیست، میان دو عدد صحیح (و دو عدد اعشاری) قرار بدهی.</li><li>جذر را با یک عدد از راه مربع‌کردن مقایسه کنی.</li><li>از خطای $\sqrt{a+b}=\sqrt{a}+\sqrt{b}$ دوری کنی.</li></ul><p>این مهارت پایهٔ محاسبهٔ طول ضلع در مثلث قائم‌الزاویه است.</p>`)
    ].join('');
  },
  init: function (panel) {
    panel.classList.add('standard-n6-10');
    K.squareDemo(panel.querySelector('#sq')); K.rootHunt(panel.querySelector('#rh')); K.rootSteps(panel.querySelector('#rs')); K.tfTraps(panel.querySelector('#tf')); K.rootFinal(panel.querySelector('#rf'));
  }
};
  }
};