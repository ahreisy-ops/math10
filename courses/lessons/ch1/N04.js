/* درس مهارت N04 — مقایسه و مرتب‌کردن اعداد (فصل ۱) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.N04 = {
  needs: ['utils'],
  setup: function (K0) {
var ML = window.MathLite, fa = ML.fa, rr = ML.renderRich, abs = Math.abs, df = K0.df;
var _u = K0._u, R = _u.R, M = _u.M, shuffle = _u.shuffle;
var K = Object.create(K0);   // K0 = هستهٔ مشترک؛ K = همان + ابزارهای اختصاصی این درس

/* ---- استایل اختصاصی این درس؛ فقط از رنگ‌ها و قالب‌های موجود پروژه استفاده شده ---- */
(function () {
  if (document.getElementById('css-N04')) { return; }
  var s = document.createElement('style'); s.id = 'css-N04';
  s.textContent = [
    /* کارت‌های سه‌تایی (نمادها) */
    '.sg.sg3{grid-template-columns:repeat(3,1fr)}',
    '.sg.sg3>div{text-align:center;padding:8px 4px}',
    '.sg.sg3 b .katex{font-size:1.5em}',
    '.sg.sg3>div>span{display:block;font-size:.84rem;color:var(--ink-soft);line-height:1.6;margin-top:2px}',
    /* دوئل و حکم */
    '.nleq.duel{display:flex;justify-content:center;align-items:center;gap:10px;flex-wrap:wrap;margin:10px 0 12px}',
    '.nleq i{display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:3px 12px;line-height:1.3;margin:0 2px;vertical-align:middle}',
    '.nleq i.n{background:#fff}.nleq i.k2{background:#4c5fd5;color:#fff}.nleq i.k3{background:#e08a00;color:#fff}',
    '.nleq .or{display:inline-grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#fff;border:2px solid var(--line);font:bold .76rem Tahoma,sans-serif;direction:rtl;color:var(--ink-soft)}',
    '.nleq.vd{margin:8px 0 12px}.nleq.sm{font-size:1rem}.nleq.sm i{min-height:32px;padding:2px 7px;margin:0 1px}',
    /* ریل رقم‌ها (اسکن) */
    '.scw{margin:12px 0}',
    '.scan{display:inline-grid;direction:ltr;gap:6px;align-items:center;justify-items:center;padding:4px 2px}',
    '.scan .ph{font:.72rem/1.3 Tahoma,sans-serif;color:var(--ink-soft);padding:2px 4px;border-radius:6px;text-align:center}',
    '.scan .ph.dc{background:var(--mark);color:var(--ink);font-weight:bold}',
    '.scan .rl i{display:inline-block;border:2px solid var(--ink);border-radius:8px;padding:0 8px;line-height:1.55;color:#fff;font-weight:bold;white-space:nowrap;background:var(--accent)}',
    '.scan .rl i.k1{background:var(--pink)}.scan .rl i.k2{background:#4c5fd5}.scan .rl i.k3{background:#e08a00}',
    '.scan .t{width:44px;height:48px;border-radius:10px;border:2px solid var(--line);background:#f3f6fa;display:grid;place-items:center;font:bold 1.4rem Tahoma,sans-serif;color:var(--ink-soft)}',
    '.scan .t.pd{border-style:dashed}',
    '.scan .pt{width:10px;height:48px;display:grid;align-items:end;font:bold 1.6rem/.9 Tahoma,sans-serif;color:var(--ink)}',
    '.scan.go .t{animation:scq .32s forwards;animation-delay:calc(var(--i)*.42s)}',
    '.scan.go .t.dc{animation-name:scd;animation-duration:.55s}',
    '.scan.go .t.af{animation-name:scf}',
    '@keyframes scq{to{background:#e6f6f3;border-color:var(--accent);color:var(--accent-dark)}}',
    '@keyframes scd{55%{transform:scale(1.25)}to{transform:scale(1);background:var(--amber);border-color:var(--amber-d);color:var(--ink)}}',
    '@keyframes scf{to{background:#fff;border-color:var(--line);color:#b9c2d0}}',
    '.scan.go .t.dc.w{animation-name:scw}',
    '@keyframes scw{55%{transform:scale(1.25)}to{transform:scale(1);background:var(--mark);border-color:var(--ink);color:var(--ink)}}',
    '@media(prefers-reduced-motion:reduce){.scan .t.q{background:#e6f6f3;border-color:var(--accent)}.scan .t.dc{background:var(--amber);border-color:var(--amber-d)}.scan .t.dc.w{background:var(--mark)}.scan.go .t{animation:none}}',
    '.sccap{display:flex;gap:8px;justify-content:center;align-items:center;flex-wrap:wrap;font-size:.88rem;color:var(--ink-soft);margin-top:4px}',
    '.rp{border:2px solid var(--line);background:#fff;border-radius:50%;width:28px;height:28px;cursor:pointer;font:bold 1rem/1 Tahoma;color:var(--ink-soft)}',
    '.rp:hover{border-color:var(--ink);color:var(--ink)}',
    /* محور HTML */
    '.lv{position:relative;height:178px;direction:ltr;margin:6px 34px 0}',
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
    '.lv .dot{position:absolute;top:131px;width:18px;height:18px;border-radius:50%;border:2.5px solid var(--ink);transform:translateX(-50%);background:var(--c,var(--accent));box-shadow:0 2px 0 rgba(20,33,61,.3);pointer-events:none}',
    '.lv .dot.gh{background:#fff;border-style:dashed;box-shadow:none;width:12px;height:12px;margin-top:3px}',
    '.lv .stem{position:absolute;bottom:47px;width:0;margin-left:-1px;border-left:2px solid var(--ink);pointer-events:none}',
    '.lv .tip{position:absolute;transform:translateX(-50%);background:var(--ink);color:#fff;border-radius:9px;padding:3px 10px;line-height:1.25;white-space:nowrap;z-index:2;pointer-events:none;font-weight:bold}',
    '.lv .tip:after{content:"";position:absolute;left:50%;bottom:-6px;margin-left:-6px;border:6px solid transparent;border-top-color:var(--ink);border-bottom:0}',
    '.lv .edge{position:absolute;top:104px;background:#fff;border:2px dashed var(--line);border-radius:9px;padding:1px 9px;color:var(--ink-soft);font-weight:bold;white-space:nowrap}',
    '.lv.lo{margin-top:-52px}.lv.lo .hit{top:80px;height:84px}',
    '.chips.n04-compare{position:relative;z-index:3}',
    '.lv .mark-result{position:absolute;transform:translateX(-50%);font:bold 1.35rem/1 Tahoma,sans-serif;pointer-events:none;z-index:4;text-shadow:0 1px 2px #fff,0 -1px 2px #fff}',
    /* چیپ‌ها و کارت‌های ترتیب */
    '.chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:6px 0 4px;direction:ltr}',
    '.chip{min-width:66px;min-height:44px;border:2px solid var(--ink);border-radius:12px;background:#fff;cursor:pointer;font:inherit;color:var(--ink);padding:2px 10px;box-shadow:2px 2px 0 var(--ink)}',
    '.chip:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}',
    '.chip.on{background:var(--mark)}',
    '.chip.put{background:#f3f6fa;box-shadow:none;color:var(--ink-soft)}',
    '.chip .dtag{display:block;font-size:.7rem;color:var(--ink-soft)}',
    '.lad4{display:flex;gap:6px;justify-content:center;direction:ltr;margin:10px 0 4px}',
    '.lad4 .sl{flex:1;max-width:96px;min-height:70px;border:2px dashed #9aa6b8;border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;background:#fff;position:relative}',
    '.lad4 .sl .no{position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:#fff;border:2px solid var(--line);border-radius:999px;font:bold .7rem Tahoma;padding:0 7px;color:var(--ink-soft)}',
    '.lad4 .sl.fill{background:#fbe4ec;border-style:solid;border-color:var(--ink);box-shadow:2px 2px 0 var(--ink)}',
    '.lad4 .sl.ok{background:#d2f0e9;border-color:var(--accent);box-shadow:2px 2px 0 var(--accent)}',
    '.lad4 .sl.bd{background:#fbd5d5;border-color:#b23a3a;box-shadow:2px 2px 0 #b23a3a}',
    '.ladn{display:flex;justify-content:space-between;align-items:center;direction:ltr;font-size:.8rem;color:var(--ink-soft);margin:0 4px 8px}.ladn a{color:var(--accent-dark);text-decoration:underline;cursor:pointer}',
    /* اسلایدر */
    '.rng{display:flex;align-items:center;gap:10px;direction:ltr;margin:6px 8px;font-size:.85rem;color:var(--ink-soft)}',
    '.quiz44-zoom .nl{transition:opacity .24s ease,transform .24s ease}.quiz44-zoom.changing .nl{opacity:.4;transform:scale(.97)}',
    '.rng input{flex:1;accent-color:var(--accent);height:30px}',
    /* علامت‌ها */
    '.sgnrow{display:flex;gap:12px;justify-content:center;margin:10px 0;direction:ltr}',
    '.sgnrow .btn{min-width:84px;min-height:54px;font-size:1.4rem;font-weight:bold;box-shadow:2px 2px 0 var(--ink)}',
    '.sgnrow .btn:not(:disabled):active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}',
    '.sgnrow .btn.right{background:#d2f0e9;border-color:var(--accent)}.sgnrow .btn.wrong{background:#fbd5d5;border-color:#b23a3a}.sgnrow .btn:disabled{opacity:1}',
    '.mc.m1{grid-template-columns:1fr}.mc.m3{grid-template-columns:repeat(3,1fr)}',
    '.cq{direction:ltr;text-align:center;margin:8px 0}.cq .katex{font-size:1.5em}',
    '.legend{text-align:center;font-size:.84rem;color:var(--ink-soft);margin:2px 0 8px}',
    '.irow{display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;direction:ltr;margin:6px 0;padding:4px 6px;border-bottom:1px dashed var(--line)}.irow:last-child{border:0}.irow b.y{color:var(--accent-dark)}.irow b.x{color:#b23a3a}.irow .v{font:bold .8rem Tahoma;padding:1px 10px;border-radius:999px;direction:rtl}.irow .v.y{background:#d2f0e9;color:var(--accent-dark)}.irow .v.x{background:#fbd5d5;color:#b23a3a}',
    '.pickr{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:10px 0;direction:rtl}',
    '.pickr .btn{min-width:0;min-height:54px;font-size:1.1rem;font-weight:bold;padding:4px 2px}.pickr .btn:disabled{opacity:1}',
    '.pickr .btn.on{background:var(--mark)}.pickr .btn.right{background:#d2f0e9;border-color:var(--accent)}.pickr .btn.wrong{background:#fbd5d5;border-color:#b23a3a}',
    '@media(max-width:520px){.lv{margin:6px 30px 0}.mc.m3{gap:6px}.scan .t{width:38px;height:44px;font-size:1.25rem}.scan{gap:4px}}'
  ].join('\n');
  document.head.appendChild(s);
})();

/* ================= مدل عدد و ابزارهای مشترک ================= */
var gcd = function (a, b) { a = abs(a); b = abs(b); while (b) { var t = a % b; a = b; b = t; } return a; };
var lcm = function (a, b) { return a / gcd(a, b) * b; };
var SG = function (c) { return c < 0 ? '\\lt' : c > 0 ? '\\gt' : '='; };
var cmp = function (x, y) { var l = x.n * y.d, r = y.n * x.d; return l < r ? -1 : l > r ? 1 : 0; };
function dec(s) { var ng = s.charAt(0) === '-', t = ng ? s.slice(1) : s, p = t.split('.'), f = p[1] || '', n = parseInt(p[0] + f, 10), d = Math.pow(10, f.length); return { n: ng ? -n : n, d: d, s: s, v: (ng ? -1 : 1) * n / d }; }
function fra(n, d, raw) { var g = raw ? 1 : gcd(n, d) || 1; n /= g; d /= g; return { n: n, d: d, v: n / d }; }
var tex = function (x) { return x.s !== undefined ? x.s : (x.n < 0 ? '-' : '') + '\\dfrac{' + abs(x.n) + '}{' + x.d + '}'; };
var neg = function (x) { return x.s !== undefined ? dec(x.s.charAt(0) === '-' ? x.s.slice(1) : '-' + x.s) : fra(-x.n, x.d, 1); };
function dexp(x, pl) {   // بسط اعشاری (کوتاه‌شده)؛ برای منفی هم کار می‌کند
  var n = abs(x.n), d = x.d, ip = Math.floor(n / d), r = n % d, ds = '', i = 0, s;
  while (r && i < pl) { r *= 10; ds += Math.floor(r / d); r %= d; i++; }
  s = (x.n < 0 ? '-' : '') + ip + (ds ? '.' + ds : '');
  return { s: s, exact: r === 0, tex: s + (r === 0 ? '' : '\\ldots') };
}
var dtx = function (x, pl) { return x.s !== undefined ? x.s : dexp(x, pl || 4).tex; };
var lab = function (v, p) { var s = String(+abs(v).toFixed(p === undefined ? 4 : p)); return (v < 0 && +s !== 0 ? '\u2212' : '') + fa(s); };
var AL = function (lines) { return K.dm('\\begin{aligned}' + lines.join('\\\\') + '\\end{aligned}'); };
var KC = ['a', 'm', 'n', 'b'];
/* دوئل: دو عدد کنار هم؛ حکم: رابطهٔ نهایی. رنگ هر عدد در کل مثال یکسان می‌ماند */
var duel = function (a, b, w) { return '<div class="nleq duel"><i class="a">$' + a + '$</i><span class="or">' + (w || 'یا') + '</span><i class="m">$' + b + '$</i></div>'; };
var verdict = function (parts) { return '<div class="nleq vd">' + parts.map(function (p) { return '<i class="' + p[0] + '">$' + p[1] + '$</i>'; }).join('') + '</div>'; };
var vd2 = function (a, s, b) { return verdict([['a', a], ['b', s], ['m', b]]); };
var chainV = function (L, s) { var o = []; L.forEach(function (x, i) { if (i) { o.push(['b', s || '\\lt']); } o.push(['n', tex(x)]); }); return verdict(o).replace('nleq vd', 'nleq vd sm'); };

/* ---- ریل رقم‌ها: رقم‌ها را زیر هم می‌گذارد و اولین رقم متفاوت را با انیمیشن پیدا می‌کند ---- */
var PLACES = ['دهم', 'صدم', 'هزارم', 'ده‌هزارم', 'صدهزارم', 'میلیونیم', 'ده‌میلیونیم', 'صدمیلیونیم'];
function scan(list, labels, o) {
  o = o || {};
  var P = list.map(function (s) { var p = s.split('.'); return { s: s, i: p[0], f: p[1] || '' }; }), mf, mi, col = -2, k, win = -1, best = -1, h, cls, ci;
  mf = Math.max.apply(null, P.map(function (x) { return x.f.length; })); mi = Math.max.apply(null, P.map(function (x) { return x.i.length; }));
  P.forEach(function (x) { x.ip = new Array(mi - x.i.length + 1).join('0') + x.i; x.fp = x.f + new Array(mf - x.f.length + 1).join('0'); });
  if (P.some(function (x) { return x.ip !== P[0].ip; })) { col = -1; }
  else { for (k = 0; k < mf; k++) { if (P.some(function (x) { return x.fp.charAt(k) !== P[0].fp.charAt(k); })) { col = k; break; } } }
  if (col !== -2) { P.forEach(function (x, i) { var v = col === -1 ? +x.ip : +x.fp.charAt(col); if (v > best) { best = v; win = i; } }); }
  h = '<div class="scw dm"><div class="scan' + (o.go ? ' go' : '') + '" style="grid-template-columns:auto auto 10px repeat(' + mf + ',auto)"><span></span><span class="ph' + (col === -1 ? ' dc' : '') + '">بخش صحیح</span><span></span>';
  for (k = 0; k < mf; k++) { h += '<span class="ph' + (col === k ? ' dc' : '') + '">' + PLACES[k] + '</span>'; }
  P.forEach(function (x, r) {
    h += '<span class="rl"><i class="k' + r + '">' + M(labels && labels[r] ? labels[r] : x.s) + '</i></span>';
    cls = col === -1 ? 'dc' + (r === win ? ' w' : '') : 'q'; h += '<span class="t ' + cls + '" style="--i:0">' + x.i + '</span><span class="pt">.</span>';
    for (k = 0; k < mf; k++) {
      cls = col === -2 || k < col ? 'q' : k === col ? 'dc' + (r === win ? ' w' : '') : 'af';
      h += '<span class="t ' + cls + (k >= x.f.length ? ' pd' : '') + '" style="--i:' + (k + 1) + '">' + x.fp.charAt(k) + '</span>';
    }
  });
  h += '</div><div class="sccap"><button type="button" class="rp" aria-label="دوباره">↻</button><span>' + (col === -2 ? 'همهٔ رقم‌ها یکی است' : 'اولین تفاوت: ' + (col === -1 ? 'بخش صحیح' : 'رقم ' + PLACES[col])) + '</span></div></div>';
  return { html: h, col: col, place: col === -1 ? 'بخش صحیح' : col >= 0 ? 'رقم ' + PLACES[col] : '', win: win };
}
function armScans(root) {
  var els = [].slice.call(root.querySelectorAll('.scan:not(.go)')), io;
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('go'); }); return; }
  io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('go'); io.unobserve(e.target); } }); }, { threshold: 0.6 });
  els.forEach(function (e) { io.observe(e); });
}
function wireReplay(root) {
  root.addEventListener('click', function (e) {
    var b = e.target.closest('.rp'), sc; if (!b) { return; }
    sc = b.closest('.scw').querySelector('.scan'); sc.classList.remove('go'); void sc.offsetWidth; sc.classList.add('go');
  });
}

/* ================= محور HTML ================= */
/* o: {min,max,ticks:[{v,t,mn,z}], hits:[v...], hw, cls}؛ marks: [{v,c,h,lv,gh,id}] */
function axisHTML(o, marks) {
  var sp = o.max - o.min, pc = function (v) { return (v - o.min) / sp * 100; }, h = '<div class="lv ' + (o.cls || '') + '"><i class="ax"></i>';
  (o.ticks || []).forEach(function (t) { h += '<i class="tk' + (t.mn ? ' mn' : '') + (t.z ? ' z' : '') + '" style="left:' + pc(t.v) + '%"></i>' + (t.t ? '<span class="tn" dir="ltr" style="left:' + pc(t.v) + '%">' + t.t + '</span>' : ''); });
  (o.hits || []).forEach(function (v) { h += '<b class="hit" data-v="' + v + '" data-label="' + lab(v,1) + '" style="left:' + (pc(v) - 50 * o.hw / sp) + '%;width:' + (100 * o.hw / sp) + '%"></b>'; });
  (marks || []).forEach(function (m, i) {
    var hs = m.lv ? 66 : 10, d = m.id !== undefined ? ' data-m="' + m.id + '"' : '';
    if (m.lv && m.h) { h += '<i class="stem"' + d + ' style="left:' + pc(m.v) + '%;height:' + (hs + 4) + 'px"></i>'; }
    h += '<i class="dot' + (m.gh ? ' gh' : '') + '"' + d + ' style="left:' + pc(m.v) + '%;--c:' + m.c + '"></i>';
    if (m.h) { h += '<span class="tip"' + d + ' style="left:' + pc(m.v) + '%;bottom:' + (55 + hs - 10) + 'px">' + m.h + '</span>'; }
    if (m.result) { h += '<span class="mark-result" style="left:' + pc(m.v) + '%;bottom:' + (55 + hs - 10 + 35) + 'px;color:' + (m.result === 'ok' ? '#198754' : '#c53030') + '">' + (m.result === 'ok' ? '✓' : '✗') + '</span>'; }
  });
  return h + '</div>';
}
/* محور ثابت بزرگ‌نمایی‌شده */
K.zoom = function (lo, hi, tks, pts, cap) {
  return '<div class="nl">' + axisHTML({ min: lo, max: hi, ticks: tks.map(function (v) { return { v: v, t: lab(v) }; }) }, pts.map(function (p) { return { v: p.v, h: p.h, c: p.c, lv: p.lv }; })) + (cap ? '<p class="legend">' + cap + '</p>' : '') + '</div>';
};
var CL = ['var(--accent)', 'var(--pink)', '#4c5fd5', '#e08a00', 'var(--mark)'];
/* دماسنج ثابت */
K.thermo = function () {
  var top = 10, h = 12, y = function (v) { return 20 + (4 - v) * 20; }, s = '', v;
  s += '<line x1="90" y1="14" x2="90" y2="' + (y(-8) + 8) + '" stroke="#14213d" stroke-width="2.5"/><path d="M84 20 L90 8 L96 20" fill="#14213d"/>';
  for (v = 4; v >= -8; v -= 2) { s += '<line x1="84" y1="' + y(v) + '" x2="96" y2="' + y(v) + '" stroke="#14213d" stroke-width="2"/><text x="72" y="' + (y(v) + 5) + '" text-anchor="end" font-size="14" font-family="Tahoma" fill="#14213d">' + lab(v, 0) + '</text>'; }
  s += '<line x1="84" y1="' + y(0) + '" x2="150" y2="' + y(0) + '" stroke="#aab4c4" stroke-width="1.5" stroke-dasharray="4 3"/>';
  s += '<circle cx="90" cy="' + y(-2) + '" r="8" fill="#0e8f7e" stroke="#14213d" stroke-width="2.5"/><text x="108" y="' + (y(-2) + 5) + '" font-size="15" font-weight="bold" font-family="Tahoma" fill="#14213d">شهر اول: ' + lab(-2, 0) + '°</text>';
  s += '<circle cx="90" cy="' + y(-5) + '" r="8" fill="#d6457a" stroke="#14213d" stroke-width="2.5"/><text x="108" y="' + (y(-5) + 5) + '" font-size="15" font-weight="bold" font-family="Tahoma" fill="#14213d">شهر دوم: ' + lab(-5, 0) + '°</text>';
  s += '<path d="M200 ' + (y(-5) - 6) + ' L200 ' + (y(-2) + 8) + '" stroke="#0e8f7e" stroke-width="3" fill="none"/><path d="M193 ' + (y(-2) + 14) + ' L200 ' + (y(-2) + 2) + ' L207 ' + (y(-2) + 14) + '" fill="#0e8f7e"/><text x="214" y="' + ((y(-2) + y(-5)) / 2 + 4) + '" font-size="13" font-family="Tahoma" fill="#0e8f7e">گرم‌تر</text>';
  return '<div class="figs one"><figure><svg viewBox="0 0 290 ' + (y(-8) + 20) + '" aria-hidden="true">' + s + '</svg><figcaption>روی دماسنج هر چه بالاتر برویم عدد بزرگ‌تر است؛ ' + M('-2') + ' بالاتر از ' + M('-5') + ' قرار دارد.</figcaption></figure></div>';
};
/* نوارهای مخرج مشترک: دو کسر را روی یک نوار با تکه‌های هم‌اندازه نشان می‌دهد */
K.bars = function (a, b) {
  var L = lcm(a.d, b.d), W = 288, w = W / L, n1 = a.n * L / a.d, n2 = b.n * L / b.d, s = '', r, i, rows = [[a, n1, '#7fd0c3', 14], [b, n2, '#f2a6c0', 78]];
  rows.forEach(function (rw) {
    var x = rw[0], nn = rw[1], y = rw[3], step = L / x.d;
    s += '<text x="0" y="' + (y - 4) + '" font-size="13" font-weight="bold" font-family="Tahoma" fill="#14213d">' + fa(nn) + ' از ' + fa(L) + ' قسمت</text>';
    s += '<rect x="2" y="' + y + '" width="' + (nn * w) + '" height="38" fill="' + rw[2] + '"/>';
    for (i = 0; i <= L; i++) { s += '<line x1="' + (2 + i * w) + '" y1="' + y + '" x2="' + (2 + i * w) + '" y2="' + (y + 38) + '" stroke="#14213d" stroke-width="' + (i % step === 0 ? 2.6 : 1) + '" ' + (i % step === 0 ? '' : 'stroke-opacity=".45"') + '/>'; }
    s += '<rect x="2" y="' + y + '" width="' + W + '" height="38" fill="none" stroke="#14213d" stroke-width="2.5"/>';
  });
  return '<div class="figs one"><figure><svg viewBox="0 0 296 130" aria-hidden="true">' + s + '</svg><figcaption>خط‌های پررنگ، تقسیم‌بندی اصلی است. با تکه‌های ' + M('\\dfrac{1}{' + L + '}') + ' هر دو نوار را می‌شمریم: ' + M(tex(a) + '=\\dfrac{' + n1 + '}{' + L + '}') + ' و ' + M(tex(b) + '=\\dfrac{' + n2 + '}{' + L + '}') + '</figcaption></figure></div>';
};

/* ---- محور مقایسهٔ دو عدد (بخش ۲) ---- */
K.cmpLine = function (host) {
  var MIN = -6, MAX = 6, a = -2, b = -5, act = 0, ticks = [], hits = [], v;
  for (v = MIN; v <= MAX; v++) { ticks.push({ v: v, t: lab(v), z: v === 0 }); hits.push(v); }
  function paint() {
    var c = a === b ? 0 : a > b ? 1 : -1, h, why;
    h = '<div class="chips n04-compare" style="direction:rtl"><button type="button" class="chip' + (act === 0 ? ' on' : '') + '" data-a="0"><span style="color:var(--accent)">●</span> عدد اول</button><button type="button" class="chip' + (act === 1 ? ' on' : '') + '" data-a="1"><span style="color:var(--pink)">●</span> عدد دوم</button></div>';
    h += axisHTML({ min: MIN - .5, max: MAX + .5, ticks: ticks, hits: hits, hw: 1, cls: 'lo' }, [{ v: a, c: CL[0], h: M(a), lv: 0 }, { v: b, c: CL[1], h: M(b), lv: a === b ? 1 : 0 }]);
    why = c === 0 ? 'هر دو عدد روی یک نقطه‌اند؛ پس برابرند.' : M(c > 0 ? a : b) + ' در سمت راستِ ' + M(c > 0 ? b : a) + ' قرار دارد؛ پس ' + M(c > 0 ? a : b) + ' بزرگ‌تر است.';
    h += vd2(String(a), SG(c), b < 0 ? String(b) : String(b)) + '<p class="legend" style="font-size:.95rem;color:var(--ink)">' + why + '</p><p class="legend">یکی از دو دکمه را انتخاب کن و روی عددی از محور بزن؛ نقطه‌اش همان‌جا می‌رود.</p>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) {
    var t = e.target.closest('.chip'), hit = e.target.closest('.hit');
    if (t) { act = +t.dataset.a; paint(); }
    else if (hit) { if (act === 0) { a = +hit.dataset.v; } else { b = +hit.dataset.v; } paint(); }
  }); paint();
};

/* ---- آینهٔ صفر: ترتیبِ اندازه‌ها در آینه برعکس می‌شود ---- */
K.mirror = function (host) {
  var PR = [[fra(-3, 5), fra(-2, 3)], [fra(-1, 2), fra(-3, 4)], [dec('-0.4'), dec('-0.45')]], pi = 0, t = 0, ticks = [], k, v;
  for (k = 0; k <= 20; k++) { v = +((k - 10) / 10).toFixed(1); ticks.push({ v: v, mn: k % 5 !== 0, z: v === 0, t: k % 5 === 0 ? lab(v, 1) : '' }); }
  function build() {
    var P = PR[pi], marks = [], h, i;
    h = '<div class="chips" style="direction:rtl">' + PR.map(function (p, i) { return '<button type="button" class="chip' + (i === pi ? ' on' : '') + '" data-p="' + i + '">' + M(tex(p[0]) + '\\,,\\,' + tex(p[1])) + '</button>'; }).join('') + '</div>';
    P.forEach(function (x, i) { marks.push({ v: x.v, c: CL[i], h: '<span class="tg" data-t="n">' + M(tex(x)) + '</span><span class="tg" data-t="p" hidden>' + M(tex(neg(x))) + '</span>', lv: i, id: i }); });
    h += axisHTML({ min: -1.05, max: 1.05, ticks: ticks, cls: 'fl' }, marks);
    h += '<div class="rng" style="direction:rtl"><span>عددها</span><input type="range" style="direction:rtl" min="0" max="100" value="0" aria-label="آینه"><span>در آینه</span></div><div class="mrst"></div>';
    host.innerHTML = rr(h); upd();
  }
  function upd() {
    var P = PR[pi], sl = host.querySelector('input'), lv = host.querySelector('.lv'), sp = 2.1, i, x, st = host.querySelector('.mrst'), p;
    t = +sl.value / 100;
    P.forEach(function (n, i) {
      x = n.v * (1 - 2 * t); p = (x + 1.05) / sp * 100;
      host.querySelectorAll('[data-m="' + i + '"]').forEach(function (e) { e.style.left = p + '%'; });
      host.querySelectorAll('[data-m="' + i + '"] .tg').forEach(function (e) { e.hidden = (e.dataset.t === 'p') !== (t > 0.5); });
    });
    if (t < 0.03) { st.innerHTML = rr('<p class="legend" style="color:var(--ink)">عددها: ' + M(tex(P[1]) + '\\lt' + tex(P[0]) + ' ') + '</p>' + '<p class="legend">' + M(tex(P[1])) + ' سمت چپ‌تر است، پس کوچک‌تر است.</p>'); }
    else if (t > 0.97) { st.innerHTML = rr('<p class="legend" style="color:var(--ink)">در آینه، اندازه‌ها: ' + M(tex(neg(P[0])) + '\\lt' + tex(neg(P[1]))) + '</p><p class="legend">ترتیب اندازه‌ها برعکسِ ترتیب خود عددها شد.</p>'); }
    else { st.innerHTML = '<p class="legend">اسلایدر را تا آخر بکش…</p>'; }
  }
  host.addEventListener('input', function (e) { if (e.target.matches('input')) { upd(); } });
  host.addEventListener('click', function (e) { var c = e.target.closest('.chip'); if (c) { pi = +c.dataset.p; build(); } });
  build();
};

/* ---- ذره‌بین π ---- */
K.lens = function (host) {
  var PI = 3.14159265358979, LV = [[3.1, 3.2, 1], [3.14, 3.15, 2], [3.141, 3.142, 3], [3.1415, 3.1416, 4], [3.14159, 3.1416, 5]], CA = [3.14, 3.15, 3.1415, 3.1416], z = 2, out;
  host.innerHTML = '<div class="lz"></div><div class="rng"><span>کم</span><input type="range" min="1" max="5" step="1" value="2" aria-label="بزرگ‌نمایی"><span>زیاد</span></div>';
  out = host.querySelector('.lz');
  function paint() {
    var w = LV[z - 1], lo = w[0], hi = w[1], d = w[2] + 1, ticks = [], marks = [], edges = '', i, st = (hi - lo) / 5, h, sh;
    for (i = 0; i <= 5; i++) { ticks.push({ v: lo + i * st, t: (i === 0 || i === 5 || i === 3) ? fa((lo + i * st).toFixed(d)) : '', mn: i !== 0 && i !== 5 }); }
    marks.push({ v: PI, c: CL[1], h: M('\\pi'), lv: 1, id: 'pi' });
    CA.forEach(function (c) {
      if ((String(c).split('.')[1] || '').length > z + 1) { return; }
      if (c >= lo - 1e-9 && c <= hi + 1e-9) { marks.push({ v: c, c: CL[0], h: M(String(c)), lv: 0, id: 'c' + String(c).replace('.', '-') }); }
      else if (z <= 3) { edges += '<span class="edge" style="' + (c < lo ? 'left:-26px' : 'right:-26px') + '">' + (c < lo ? '◂ ' : '') + M(String(c)) + (c > hi ? ' ▸' : '') + '</span>'; }
    });
    h = axisHTML({ min: lo, max: hi, ticks: ticks }, marks).replace('<i class="ax">', edges + '<i class="ax">');
    h += K.dm(String(lo) + '\\lt\\pi\\lt' + String(hi));
    sh = z >= 4 ? 'پنجره بسیار کوچک شد؛ ' + M('3.14') + ' و ' + M('3.15') + ' دیگر دیده نمی‌شوند، ولی π هنوز میان دو تقریب است و با هیچ‌کدام برابر نیست.' : 'هر بار پنجره ده برابر کوچک‌تر می‌شود. π همیشه جایی میان دو تقریب می‌ماند.';
    // FLIP: match each marker to its own previous position, not to the first dot.
    var previous = {};
    out.querySelectorAll('.dot[data-m],.tip[data-m]').forEach(function (el) {
      previous[el.dataset.m + ':' + (el.classList.contains('dot') ? 'dot' : 'tip')] = el.getBoundingClientRect().left;
    });
    out.innerHTML = rr(h + '<p class="legend">' + sh + '</p>');
    out.querySelectorAll('.dot[data-m],.tip[data-m]').forEach(function (el) {
      if (!el.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }
      var key = el.dataset.m + ':' + (el.classList.contains('dot') ? 'dot' : 'tip');
      var from = previous[key], to = el.getBoundingClientRect().left;
      if (from !== undefined) {
        el.animate([{ transform: 'translateX(calc(-50% + ' + (from - to) + 'px))', opacity: 0.7 },
                    { transform: 'translateX(-50%)', opacity: 1 }],
          { duration: 1050, easing: 'cubic-bezier(.22,1,.36,1)' });
      } else {
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 700, easing: 'ease-in-out' });
      }
    });
  }
  host.addEventListener('input', function (e) { if (e.target.matches('input')) { z = +e.target.value; paint(); } });
  paint();
};

/* ---- تعامل ۲: محور زنده (جاگذاری تقریبی؛ دقت و مقیاس در درس N05) ---- */
K.liveLine = function (host) {
  var SETS = [
    [{ t: '-\\dfrac{2}{3}', v: -2 / 3, a: '-0.666\\ldots' }, { t: '-0.5', v: -0.5, a: '-0.5' }, { t: '0', v: 0, a: '0' }, { t: '\\dfrac{3}{4}', v: 0.75, a: '0.75' }],
    [{ t: '-0.9', v: -0.9, a: '-0.9' }, { t: '-\\dfrac{3}{5}', v: -0.6, a: '-0.6' }, { t: '\\dfrac{1}{5}', v: 0.2, a: '0.2' }, { t: '\\dfrac{7}{10}', v: 0.7, a: '0.7' }],
    [{ t: '-\\dfrac{4}{5}', v: -0.8, a: '-0.8' }, { t: '-0.3', v: -0.3, a: '-0.3' }, { t: '0', v: 0, a: '0' }, { t: '0.45', v: 0.45, a: '0.45' }]
  ], si = 0, S = SETS[0], pos, act, res, ticks = [], hits = [], k, v;
  for (k = 0; k <= 20; k++) { v = +((k - 10) / 10).toFixed(1); hits.push(v); ticks.push({ v: v, mn: k % 5 !== 0, z: v === 0, t: k % 5 === 0 ? lab(v, 1) : '' }); }
  function reset() { S = SETS[si]; pos = [null, null, null, null]; act = 0; res = null; }
  function paint() {
    var h = '<div class="chips">', marks = [], all = pos.every(function (p) { return p !== null; });
    S.forEach(function (it, i) { h += '<button type="button" class="chip' + (act === i ? ' on' : '') + (pos[i] !== null ? ' put' : '') + '" data-c="' + i + '">' + M(it.t) + '</button>'; if (pos[i] !== null) { marks.push({ v: pos[i], c: CL[i], h: M(it.t), lv: i % 2, result: res ? (abs(pos[i] - it.v) <= .1001 ? 'ok' : 'bad') : null }); } });
    if (res) { S.forEach(function (it, i) { marks.push({ v: it.v, c: CL[i], gh: 1 }); }); }
    h += '</div>' + axisHTML({ min: -1.05, max: 1.05, ticks: ticks, hits: hits, hw: .1 }, marks);
    if (res) { h += '<p class="legend">تیک سبز یا ضربدر قرمز بالای برچسب هر عدد، نتیجهٔ همان عدد را نشان می‌دهد. دایرهٔ توخالی جای دقیق هر عدد است.</p>' + res; }
    else { h += '<p class="legend">' + (act === null ? 'همهٔ عددها جا افتاده‌اند؛ می‌توانی یکی را دوباره انتخاب کنی و جایش را عوض کنی.' : 'عددِ زردشده را روی محور بگذار؛ جای تقریبی کافی است.') + '</p>'; }
    h += '<div class="opts"><button type="button" class="btn primary" data-go="1"' + (all ? '' : ' disabled') + '>بررسی ترتیب</button><button type="button" class="btn" data-clr="1">پاک‌کردن</button><button type="button" class="btn" data-nx="1">مجموعهٔ دیگر</button></div>';
    host.innerHTML = rr(h);
  }
  function check() {
    var bad = [], order = S.map(function (x, i) { return i; }), tie = false, ok, m;
    S.forEach(function (it, i) { if (abs(pos[i] - it.v) > 0.1001) { bad.push(i); } });
    order.sort(function (x, y) { return S[x].v - S[y].v; });
    order.forEach(function (x, i) { if (i && !(pos[x] > pos[order[i - 1]])) { tie = true; } });
    ok = !bad.length && !tie;
    m = ok ? '<div class="fb ok"><b>درست است!</b> از چپ به راست، یعنی از کوچک به بزرگ:</div>' + chainV(order.map(function (x) { return { s: S[x].t }; })) :
      '<div class="fb bad">' + (bad.length ? 'این عددها جایشان کمی دور است: ' + bad.map(function (i) { return M(S[i].t) + ' (تقریباً ' + M(S[i].a) + ')'; }).join('، ') + '. ' : '') + (tie ? 'دو عدد را روی یک نقطه یا برعکسِ ترتیب‌شان گذاشته‌ای؛ عددِ بزرگ‌تر باید سمت راست باشد. ' : '') + 'جای دقیق را با دایرهٔ توخالی ببین.</div>';
    res = m; act = null; paint();
  }
  host.addEventListener('click', function (e) {
    var c = e.target.closest('.chip'), hit = e.target.closest('.hit'), b = e.target.closest('button'), i;
    if (c) { act = +c.dataset.c; res = null; paint(); }
    else if (hit) { if (act === null) { return; } pos[act] = +hit.dataset.v; res = null; act = null; for (i = 0; i < 4; i++) { if (pos[i] === null) { act = i; break; } } paint(); }
    else if (b && b.dataset.go) { check(); } else if (b && b.dataset.clr) { reset(); paint(); } else if (b && b.dataset.nx) { si = (si + 1) % SETS.length; reset(); paint(); }
  }); reset(); paint();
};

/* ================= تولید سؤال ================= */
var FP = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6], [3, 8], [5, 8], [7, 8], [2, 7], [3, 7], [4, 7], [3, 10], [7, 10], [4, 9], [5, 9], [5, 7], [6, 7]];
var DP = ['0.35', '0.45', '0.55', '0.65', '0.7', '0.6', '0.25', '0.75', '0.8', '0.62', '0.66', '0.4', '0.9'];
function pool() { var P = []; FP.forEach(function (f) { P.push(fra(f[0], f[1])); }); DP.forEach(function (s) { P.push(dec(s)); }); return P; }
function pickN(n, sep) { var P = pool(), out = [], t = 0, c; while (out.length < n && t++ < 400) { c = P[R(0, P.length - 1)]; if (out.every(function (o) { return abs(o.v - c.v) >= sep; })) { out.push(c); } } return out; }
function genDD() {   // دو اعشاری
  var i = R(0, 4), A = [], Bb = [], p = R(0, 2), j, la, lb, sa, sb, fix = function (s) { s = s.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, ''); return s.indexOf('.') < 0 ? s + '.0' : s; };
  if (Math.random() < 0.12) { sa = i + '.' + R(1, 9) + (Math.random() < 0.5 ? R(1, 9) : ''); return { a: dec(sa), b: dec(sa + '0'), kind: 'dd' }; }
  for (j = 0; j < 3; j++) { A.push(R(1, 9)); }
  Bb = A.slice(); do { Bb[p] = R(0, 9); } while (Bb[p] === A[p]);
  la = R(p + 1, 3); lb = R(p + 1, 3); if (la === lb && Math.random() < 0.7) { lb = la < 3 ? la + 1 : Math.max(p + 1, la - 1); }
  return { a: dec(fix(i + '.' + A.slice(0, la).join(''))), b: dec(fix(i + '.' + Bb.slice(0, lb).join(''))), kind: 'dd' };
}
function genFD() {   // کسر و اعشاری
  var ds = [3, 4, 5, 6, 8, 20, 25], d = ds[R(0, ds.length - 1)], n, f, h, s, db, q;
  do { n = R(1, d + 2); } while (n % d === 0 || gcd(n, d) !== 1);
  f = fra(n, d); h = Math.round(f.v * 100) + [-2, -1, 0, 0, 1, 2][R(0, 5)]; if (h < 1) { h = 1; }
  s = Math.floor(h / 100) + '.' + ('0' + h % 100).slice(-2); s = s.replace(/0$/, ''); if (s.charAt(s.length - 1) === '.') { s += '0'; }
  db = dec(s); q = { f: f, d: db, kind: 'fd' }; if (Math.random() < 0.5) { q.a = f; q.b = db; } else { q.a = db; q.b = f; }
  return q;
}
function genFF() {   // دو کسر
  var d1 = R(2, 9), d2, n1, n2, a, b;
  do { d2 = R(2, 9); } while (d2 === d1);
  do { n1 = R(1, d1 + 1); } while (n1 % d1 === 0); do { n2 = R(1, d2 + 1); } while (n2 % d2 === 0);
  a = fra(n1, d1); b = fra(n2, d2); if (Math.random() < 0.1) { b = fra(a.n * 2, a.d * 2, 1); }
  return { a: a, b: b, kind: 'ff' };
}
/* توضیح مرحله‌ای مقایسهٔ a و b (مثبت) */
function explain(q) {
  var c = cmp(q.a, q.b), r, h = '', ta = tex(q.a), tb = tex(q.b), x, L, na, nb;
  if (q.kind === 'dd') {
    r = scan([q.a.s, q.b.s], null, { go: 1 }); h += '<p>رقم‌ها را از چپ به راست و هم‌جایگاه مقایسه می‌کنیم (رقم‌های کم‌رنگ، صفرهای اضافه‌اند):</p>' + r.html;
    if (c === 0) { h += '<p>صفرهای انتهایی مقدار را عوض نمی‌کنند؛ پس دو عدد برابرند.</p>'; }
  } else if (q.kind === 'fd') {
    x = dexp(q.f, 5); h += '<p>کسر را به اعشار تبدیل می‌کنیم (صورت تقسیم بر مخرج):</p>' + K.dm(tex(q.f) + '=' + x.tex);
    r = scan([x.s, q.d.s], [tex(q.f), q.d.s], { go: 1 }); if (q.a !== q.f) { r = scan([q.d.s, x.s], [q.d.s, tex(q.f)], { go: 1 }); } h += r.html;
  } else {
    L = lcm(q.a.d, q.b.d); na = q.a.n * L / q.a.d; nb = q.b.n * L / q.b.d;
    h += '<p>مخرج مشترک ' + fa(L) + ' را می‌گیریم:</p>' + AL([ta + '&=\\dfrac{' + na + '}{' + L + '}', tb + '&=\\dfrac{' + nb + '}{' + L + '}']) + '<p>مخرج‌ها برابر شد؛ صورت بزرگ‌تر یعنی کسر بزرگ‌تر.</p>';
  }
  return h + vd2(ta, SG(c), tb);
}

/* ---- تعامل ۳: کدام بزرگ‌تر است؟ (مرحله‌ای) ---- */
K.cmpSteps = function (host) {
  var ST = [['دو عدد اعشاری', genDD], ['کسر و اعشاری', genFD], ['دو کسر', genFF]], si = 0, ok = 0, q, fin = false, pick = null;
  function newQ() { q = ST[si][1](); pick = null; }
  function paint() {
    var h = '<div class="stg">' + ST.map(function (s, i) { return '<span class="' + (i < si || fin ? 'dn' : i === si ? 'cu' : '') + '">' + (i < si || fin ? '✓ ' : '') + s[0] + '</span>'; }).join('') + '</div>', c, cls, msg;
    if (fin) { host.innerHTML = rr(h + '<div class="fb ok"><b>همهٔ مرحله‌ها را گذراندی!</b> حالا برو سراغ تلهٔ علامت منفی.</div><div class="opts"><button type="button" class="btn" data-r="1">از اول، با عددهای جدید</button></div>'); return; }
    c = cmp(q.a, q.b);
    h += '<p class="stage-progress-meta">مرحلهٔ ' + fa(si + 1) + ' — پاسخ‌های درست: ' + fa(ok) + ' از ۲</p><div class="cq">' + M(tex(q.a) + '\\;\\square\\;' + tex(q.b)) + '</div><div class="sgnrow">';
    [-1, 0, 1].forEach(function (s) { cls = pick === null ? '' : s === c ? ' right' : s === pick ? ' wrong' : ''; h += '<button type="button" class="btn' + cls + '" data-s="' + s + '"' + (pick === null ? '' : ' disabled') + '>' + M(SG(s)) + '</button>'; });
    h += '</div>';
    if (pick !== null) {
      if (pick === c) { h += '<div class="fb ok">درست است! ✓</div>'; }
      else {
        msg = q.kind === 'dd' ? (pick === 0 ? 'این دو عدد برابر نیستند؛ فقط صفرِ انتهایی مقدار را عوض نمی‌کند.' : 'رقم‌ها را از چپ به راست و هم‌جایگاه مقایسه کن؛ تعداد رقم‌های اعشار تعیین‌کننده نیست.') : q.kind === 'fd' ? 'اول کسر را به اعشار تبدیل کن، بعد دو عدد اعشاری را مقایسه کن.' : 'مخرج‌ها فرق دارند؛ اول هم‌مخرج‌شان کن، بعد صورت‌ها را مقایسه کن.';
        h += '<div class="fb bad">' + msg + '</div>';
      }
      h += '<div class="ex">' + explain(q) + '</div><div class="opts"><button type="button" class="btn primary" data-n="1">' + (pick === c && ok >= 2 ? (si === 2 ? 'پایان' : 'مرحلهٔ بعد') : 'سؤال بعدی') + '</button></div>';
    }
    host.innerHTML = rr(h); armScans(host);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.s !== undefined) { pick = +b.dataset.s; if (pick === cmp(q.a, q.b)) { ok++; } paint(); }
    else if (b.dataset.n) { if (ok >= 2) { ok = 0; si++; if (si > 2) { fin = true; paint(); return; } } newQ(); paint(); }
    else if (b.dataset.r) { si = 0; ok = 0; fin = false; newQ(); paint(); }
  }); wireReplay(host); newQ(); paint();
};

/* ---- تعامل ۴: تلهٔ علامت منفی ---- */
var zl = function (r) { return Math.floor(Math.min(r[0].v, r[1].v) * 10 - 1) / 10; };
var zh = function (r) { return Math.min(0, Math.ceil(Math.max(r[0].v, r[1].v) * 10 + 1) / 10); };
var zt = function (r) { var t = [], v; for (v = zl(r); v <= zh(r) + 1e-9; v += 0.1) { t.push(+v.toFixed(1)); } return t; };
K.negTrap = function (host) {
  var rounds, ri, pick, done, answers;
  function build() {
    var pairs = [], i, j, a, b;
    for (i = 0; i < FP.length; i++) { for (j = i + 1; j < FP.length; j++) { a = FP[i]; b = FP[j]; if (a[1] !== b[1] && abs(a[0] / a[1] - b[0] / b[1]) < 0.12) { pairs.push([a, b]); } } }
    shuffle(pairs); rounds = pairs.slice(0, 4).map(function (p) { var x = fra(-p[0][0], p[0][1]), y = fra(-p[1][0], p[1][1]); return Math.random() < 0.5 ? [x, y] : [y, x]; }); ri = 0; pick = null; done = 0; answers = Array(rounds.length).fill(null);
  }
  function paint() {
    var r, bigger, h, i, cls, lo, hi, okk;
    if (ri >= rounds.length) { host.innerHTML = rr('<div class="fb ' + (done >= 3 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(done) + ' از ' + fa(rounds.length) + '</b><br>' + (done === rounds.length ? 'عالی! تلهٔ علامت منفی را دور زدی.' : 'یادت باشد: بعد از مقایسهٔ اندازه‌ها، ترتیب برعکس می‌شود.') + '</div><div class="opts"><button type="button" class="btn primary" data-r="1">دوباره با جفت‌های جدید</button></div>'); return; }
    r = rounds[ri]; pick = answers[ri]; bigger = cmp(r[0], r[1]) > 0 ? 0 : 1;
    h = '<div class="stg">' + rounds.map(function (x, i) { return '<span class="' + (i < ri ? 'dn' : i === ri ? 'cu' : '') + '">' + fa(i + 1) + '</span>'; }).join('') + '</div><p class="ask">کدام عدد بزرگ‌تر است؟</p><div class="mc m2 n4-neg-choices">';
    for (i = 0; i < 2; i++) { cls = pick === null ? '' : i === bigger ? ' right' : i === pick ? ' wrong' : ''; h += '<button type="button" class="btn opt' + cls + '" data-o="' + i + '"' + (pick === null ? '' : ' disabled') + '>' + M(tex(r[i])) + '</button>'; }
    h += '</div>';
    if (pick !== null) {
      okk = pick === bigger; lo = abs(r[0].v) < abs(r[1].v) ? 0 : 1; hi = 1 - lo;
      h += '<div class="fb ' + (okk ? 'ok' : 'bad') + '">' + (okk ? 'درست است! ✓' : 'این همان تله است: اندازهٔ ' + M(tex(r[hi])) + ' بزرگ‌تر است، ولی چون هر دو منفی‌اند ترتیب برعکس می‌شود.') + '</div>';
      h += '<div class="ex"><p>اندازه‌ها (بدون علامت):</p>' + AL([tex(neg(r[0])) + '&=' + dtx(neg(r[0])), tex(neg(r[1])) + '&=' + dtx(neg(r[1]))]) + '<p>اندازهٔ ' + M(tex(neg(r[lo]))) + ' کوچک‌تر است؛ یعنی ' + M(tex(r[lo])) + ' به صفر نزدیک‌تر و در نتیجه بزرگ‌تر است:</p>' + vd2(tex(r[bigger]), '\\gt', tex(r[1 - bigger])) +
        K.zoom(zl(r), zh(r), zt(r), [{ v: r[lo].v, h: M(tex(r[lo])), c: CL[0], lv: 0 }, { v: r[hi].v, h: M(tex(r[hi])), c: CL[1], lv: 1 }], 'سمت راست‌تر، بزرگ‌تر است.') + '</div>';
    }
    h += '<div class="opts n4-neg-nav"><button type="button" class="btn" data-p="1"' + (ri === 0 ? ' disabled' : '') + '>سؤال قبلی</button><button type="button" class="btn primary" data-n="1"' + (pick === null ? ' disabled' : '') + '>' + (ri === rounds.length - 1 ? 'مشاهدهٔ نتیجه':'سؤال بعدی') + '</button></div>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.o !== undefined && answers[ri] === null) { pick = +b.dataset.o; answers[ri] = pick; var r = rounds[ri]; if (pick === (cmp(r[0], r[1]) > 0 ? 0 : 1)) { done++; } paint(); }
    else if (b.dataset.n) { ri++; paint(); } else if (b.dataset.p) { ri = Math.max(0, ri - 1); paint(); } else if (b.dataset.r) { build(); paint(); }
  }); build(); paint();
};

/* ---- تعامل ۱: نردبان ترتیب ---- */
function setLad(level) {
  var L = pickN(level ? 5 : 4, 0.05);
  if (level) { L = L.map(function (x, i) { return i < 2 ? neg(x) : x; }); if (Math.random() < 0.5) { L[4] = dec('0'); } }
  return L;
}
K.ladder = function (host) {
  var level = 0, L, slots, sel, res;
  function start() { L = shuffle(setLad(level)); slots = L.map(function () { return null; }); sel = null; res = null; }
  function paint() {
    var h = '<div class="chips" style="direction:rtl"><button type="button" class="chip' + (!level ? ' on' : '') + '" data-lv="0">ساده</button><button type="button" class="chip' + (level ? ' on' : '') + '" data-lv="1">با عددهای منفی</button></div>', free = [], i;
    L.forEach(function (x, i) { if (slots.indexOf(i) < 0) { free.push(i); } });
    h += '<p class="ask">عددها را از کوچک‌ترین به بزرگ‌ترین بچین</p><div class="chips">' + (free.length ? free.map(function (i) { return '<button type="button" class="chip' + (sel === i ? ' on' : '') + '" data-c="' + i + '">' + M(tex(L[i])) + '</button>'; }).join('') : '<span class="legend">همهٔ کارت‌ها چیده شدند.</span>') + '</div>';
    h += '<div class="lad4">' + slots.map(function (s, k) { var c = res ? (res[k] ? ' ok' : ' bd') : ''; return '<div class="sl' + (s !== null ? ' fill' : '') + c + '" data-s="' + k + '"><span class="no">' + fa(k + 1) + '</span>' + (s !== null ? M(tex(L[s])) : '') + '</div>'; }).join('') + '</div><div class="ladn"><span>◂ کوچک‌ترین</span><a href="#" data-resetlad="1">پاک‌کردن ترتیب</a><span>بزرگ‌ترین ▸</span></div>';
    h += '<p class="legend">یک کارت را انتخاب کن، بعد روی خانه‌ای بزن. کارتِ داخل خانه را بزنی به جایش برمی‌گردد.</p>';
    if (res) { h += res.msg; }
    h += '<div class="opts"><button type="button" class="btn primary" data-go="1"' + (free.length ? ' disabled' : '') + '>بررسی</button><button type="button" class="btn" data-nw="1">ست جدید</button></div>';
    host.innerHTML = rr(h);
  }
  function check() {
    var order = L.map(function (x, i) { return i; }).sort(function (a, b) { return L[a].v - L[b].v; }), ok = [], all = true, asc;
    slots.forEach(function (s, k) { ok[k] = s === order[k] || (s !== null && L[s].v === L[order[k]].v); if (!ok[k]) { all = false; } });
    asc = order.map(function (i) { return L[i]; });
    ok.msg = all ? '<div class="fb ok"><b>درست چیدی!</b></div>' + chainV(asc) :
      '<div class="fb bad">خانه‌های قرمز جابه‌جا هستند. همه را به اعشار ببر و مقایسه کن:</div>' + AL(asc.map(function (x) { return tex(x) + '&=' + dtx(x); })) + '<p class="legend">ترتیب درست:</p>' + chainV(asc);
    res = ok; paint();
  }
  host.addEventListener('click', function (e) {
    var c = e.target.closest('.chip'), s = e.target.closest('.sl'), b = e.target.closest('button'), k, resetLink = e.target.closest('[data-resetlad]'); if (resetLink) { e.preventDefault(); slots = L.map(function(){return null;}); sel=null;res=null;paint();return; }
    if (c && c.dataset.lv !== undefined) { level = +c.dataset.lv; start(); paint(); }
    else if (c && c.dataset.c !== undefined) { sel = sel === +c.dataset.c ? null : +c.dataset.c; res = null; paint(); }
    else if (s) { k = +s.dataset.s; if (slots[k] !== null && sel === null) { slots[k] = null; res = null; } else if (sel !== null) { slots[k] = sel; sel = null; res = null; } paint(); }
    else if (b && b.dataset.go) { check(); } else if (b && b.dataset.nw) { start(); paint(); }
  }); start(); paint();
};

/* ---- تعامل ۵: کدام عددها قبول‌اند؟ (≥، ≤ و نامساوی دوتایی) ---- */
var OPS = { '\\gt': function (p, q) { return p > q; }, '\\ge': function (p, q) { return p >= q; }, '\\lt': function (p, q) { return p < q; }, '\\le': function (p, q) { return p <= q; } };
function genIneq() {
  var a = R(-3, 1), b = a + R(2, 4), k = R(0, 7), vals, parts, title, kinds = [
    [['x', '\\gt', a]], [['x', '\\ge', a]], [['x', '\\lt', b]], [['x', '\\le', b]],
    [[a, '\\lt', 'x'], ['x', '\\lt', b]], [[a, '\\lt', 'x'], ['x', '\\le', b]], [[a, '\\le', 'x'], ['x', '\\lt', b]], [[a, '\\le', 'x'], ['x', '\\le', b]]
  ];
  parts = kinds[k]; title = parts.length === 1 ? 'x' + parts[0][1] + ' ' + parts[0][2] : a + parts[0][1] + ' x ' + parts[1][1] + ' ' + b;
  if (parts.length === 1) { title = parts[0][0] === 'x' ? 'x' + parts[0][1] + ' ' + parts[0][2] : title; }
  var ev = function (v) { return parts.map(function (p) { var L = p[0] === 'x' ? v : p[0], Rr = p[2] === 'x' ? v : p[2]; return { t: L + p[1] + ' ' + Rr, ok: OPS[p[1]](L, Rr) }; }); };
  vals = [a, b, a - 1, b + 1, (a + b) / 2, a + 0.5, b - 0.5, a - 0.5, b + 0.5, a + 1, b - 1];
  vals = shuffle(vals.filter(function (v, i) { return vals.indexOf(v) === i; })).slice(0, 6);
  if (vals.indexOf(a) < 0 && vals.indexOf(b) < 0) { vals[0] = Math.random() < 0.5 ? a : b; }
  return { title: title, vals: vals.map(function (v) { var e = ev(v); return { v: v, t: String(v), e: e, ok: e.every(function (x) { return x.ok; }) }; }) };
}
K.ineqPick = function (host) {
  var q, sel, done;
  function nw() { q = genIneq(); sel = q.vals.map(function () { return false; }); done = false; }
  function paint() {
    var h = '<p class="ask">کدام عددها در این شرط صدق می‌کنند؟</p><div class="cq">' + M(q.title) + '</div><div class="pickr">', allok = true;
    q.vals.forEach(function (x, i) { var cls = done ? (x.ok ? ' right' : sel[i] ? ' wrong' : '') : sel[i] ? ' on' : ''; if (!!sel[i] !== x.ok) { allok = false; } h += '<button type="button" class="btn' + cls + '" data-i="' + i + '"' + (done ? ' disabled' : '') + '>' + M('x=' + x.t) + '</button>'; });
    h += '</div>';
    if (done) {
      h += '<div class="fb ' + (allok ? 'ok' : 'bad') + '">' + (allok ? '<b>درست است!</b> همهٔ انتخاب‌هایت درست بود.' : 'بعضی انتخاب‌ها درست نبود. هر عدد را در شرط جایگذاری کن و ببین هر دو شرط برقرارند یا نه:') + '</div><div class="ex">' +
        q.vals.map(function (x) { return '<div class="irow"><span>' + M('x=' + x.t) + '</span>' + x.e.map(function (r) { return '<span>' + M(r.t) + ' ' + (r.ok ? '<b class="y">✓</b>' : '<b class="x">✗</b>') + '</span>'; }).join('') + '<span class="v ' + (x.ok ? 'y' : 'x') + '">' + (x.ok ? 'قبول' : 'رد') + '</span></div>'; }).join('')+ '</div>';
    }
    h += '<div class="opts">' + (done ? '' : '<button type="button" class="btn primary" data-go="1">بررسی</button>') + '<button type="button" class="btn" data-nw="1">شرط جدید</button></div>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.i !== undefined) { sel[+b.dataset.i] = !sel[+b.dataset.i]; paint(); } else if (b.dataset.go) { done = true; paint(); } else if (b.dataset.nw) { nw(); paint(); }
  }); nw(); paint();
};

/* ---- تمرین پایانی (۵ سؤال چهارگزینه‌ای با عددهای تصادفی) ---- */
var PIS = '3.14159265';
function need2(c) { var f = c.split('.')[1], p = PIS.split('.')[1], i; for (i = 0; i < 8; i++) { if ((p.charAt(i) || '0') !== (f.charAt(i) || '0')) { return i; } } return 8; }
var chain = function (L, s) { return L.map(tex).join(s || '\\lt '); };
function qDec() {
  var i = R(0, 2), ts = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4), L, best = -1, longest = 0;
  L = ts.map(function (t) { var e = R(0, 2), s = '' + t, j; for (j = 0; j < e; j++) { s += R(1, 9); } return dec(i + '.' + s); });
  L.forEach(function (x, k) { if (best < 0 || x.v > L[best].v) { best = k; } if (x.s.length > L[longest].s.length) { longest = k; } });
  return {
    ask: 'کدام عدد از همه بزرگ‌تر است؟', cls: '', opts: L.map(function (x, k) { return { h: M(x.s), ok: k === best, m: k === longest ? 'رقم‌های بیشتر، عدد را بزرگ‌تر نمی‌کند؛ از رقم دهم شروع کن.' : 'رقم‌ها را از چپ به راست مقایسه کن؛ اول رقم دهم.' }; }),
    expl: function () { return '<p>رقم‌ها را زیر هم می‌نویسیم:</p>' + scan(L.map(function (x) { return x.s; }), null, { go: 1 }).html + '<p>اولین ستونی که رقم‌ها در آن فرق دارند تصمیم می‌گیرد؛ بزرگ‌ترین عدد:</p>' + verdict([['a', L[best].s]]); }
  };
}
function qMix() {
  var q = genFD(), c = cmp(q.a, q.b);
  return {
    ask: 'کدام علامت درست است؟', cls: 'm3', cq: M(tex(q.a) + '\\;\\square\\;' + tex(q.b)),
    opts: [-1, 0, 1].map(function (s) { return { h: M(SG(s)), ok: s === c, m: s === 0 ? 'این دو عدد برابر نیستند؛ کسر را به اعشار تبدیل کن و مقایسه کن.' : 'کسر را به اعشار تبدیل کن، بعد دو عدد اعشاری را مقایسه کن.' }; }),
    expl: function () { return explain(q); }
  };
}
function qNeg() {
  var L = pickN(4, 0.03).map(neg), mn = 0, mx = 0;
  L.forEach(function (x, k) { if (x.v < L[mn].v) { mn = k; } if (x.v > L[mx].v) { mx = k; } });
  return {
    ask: 'کدام عدد از همه کوچک‌تر است؟', cls: '', opts: L.map(function (x, k) { return { h: M(tex(x)), ok: k === mn, m: k === mx ? 'این عدد از همه بزرگ‌تر است (به صفر نزدیک‌تر). در عددهای منفی، اندازهٔ بزرگ‌تر یعنی عدد کوچک‌تر.' : 'کوچک‌ترین عدد، بزرگ‌ترین اندازه را دارد؛ اندازه‌ها را مقایسه کن.' }; }),
    expl: function () { return '<p>همه را به اعشار تبدیل می‌کنیم:</p>' + AL(L.map(function (x) { return tex(x) + '&=' + dtx(x); })) + '<p>منفی‌ترین مقدار، همان است که از همه سمت چپ‌تر قرار می‌گیرد:</p>' + verdict([['m', tex(L[mn])]]); }
  };
}
function qPi() {
  var cs = ['3.14', '3.15', '3.1416', '3.141', '3.1415', '3.142'], c = cs[R(0, cs.length - 1)], r = cmp(dec(PIS), dec(c)), n = need2(c);
  return {
    ask: 'کدام رابطه درست است؟', cls: 'm1',
    opts: [-1, 0, 1].map(function (s) { return { h: M('\\pi' + SG(s) + c), ok: s === r, m: s === 0 ? M(c) + ' فقط تقریبی از π است؛ π با هیچ عدد اعشاریِ پایان‌پذیری برابر نیست.' : 'رقم‌های π را تا اولین تفاوت با ' + M(c) + ' مقایسه کن.' }; }),
    expl: function () { return '<p>رقم‌ها را تا اولین تفاوت مقایسه می‌کنیم:</p>' + scan([PIS.slice(0, 2 + n + 1), c], ['\\pi', c], { go: 1 }).html + vd2('\\pi', SG(r), c); }
  };
}
function qSort() {
  var L = pickN(4, 0.05).map(function (x, i) { return i < 2 ? neg(x) : x; }), asc, desc, ab, sw, i, key = function (a) { return a.map(function (x) { return x.v.toFixed(5); }).join(); }, opts, tries = 0, seen = {};
  if (Math.random() < 0.3) { L[3] = dec('0'); }
  asc = L.slice().sort(function (a, b) { return a.v - b.v; }); desc = asc.slice().reverse(); ab = L.slice().sort(function (a, b) { return abs(a.v) - abs(b.v); });
  do { sw = asc.slice(); i = R(0, 2); var t = sw[i]; sw[i] = sw[i + 1]; sw[i + 1] = t; } while ((key(sw) === key(ab) || key(sw) === key(desc)) && tries++ < 20);
  opts = [{ L: asc, ok: 1 }, { L: desc, m: 'این ترتیب نزولی است؛ سؤال ترتیب صعودی (از کوچک به بزرگ) خواسته.' }, { L: ab, m: 'اندازه‌ها را مرتب کردی و علامت را نادیده گرفتی؛ عددِ منفی با اندازهٔ بزرگ‌تر، کوچک‌تر است.' }, { L: sw, m: 'دو عددِ کنار هم جابه‌جا شده‌اند؛ مقدارشان را دقیق‌تر مقایسه کن.' }];
  opts = opts.filter(function (o) { var k2 = key(o.L); if (seen[k2]) { return false; } seen[k2] = 1; return true; });
  return {
    ask: 'عددهای زیر را از کوچک‌ترین به بزرگ‌ترین مرتب کن:', cls: 'm1', cq: M(L.map(tex).join(',\\quad ')),
    opts: opts.map(function (o) { return { h: M(chain(o.L)), ok: !!o.ok, m: o.m }; }),
    expl: function () { return '<p>همه را به اعشار تبدیل می‌کنیم:</p>' + AL(L.map(function (x) { return tex(x) + '&=' + dtx(x); })) + '<p>ترتیب صعودی:</p>' + chainV(asc); }
  };
}
K.cmpFinal = function (host) {
  var qs, i, ans;
  function build() { qs = [qDec(), qMix(), qNeg(), qPi(), qSort()].map(function (q) { q.opts = shuffle(q.opts); return q; }); i = 0; ans = []; }
  var fb = function (ok, html) { return '<div class="fb ' + (ok ? 'ok' : 'bad') + '">' + html + '</div>'; };
  function paint() {
    var q = qs[i], a = ans[i], h, oh = '', s, o;
    if (i === 5) {
      s = ans.filter(function (x, k) { return qs[k].opts[x].ok; }).length;
      host.innerHTML = rr('<div class="fb ' + (s >= 4 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(s) + ' از ۵</b><br>' + (s === 5 ? 'عالی بود! به همهٔ سؤال‌ها درست جواب دادی.' : s >= 3 ? 'خوب بود. سؤال‌هایی را که اشتباه کردی دوباره مرور کن.' : 'یک بار دیگر درس را مرور کن؛ بعد با عددهای جدید امتحان کن.') + '</div><div class="opts end-actions"><button type="button" class="btn" data-pv="1">مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1">سؤال‌های جدید</button></div>'); return;
    }
    h = '<div class="stg">' + qs.map(function (x, k) { return '<span class="' + (ans[k] !== undefined ? (qs[k].opts[ans[k]].ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">' + q.ask + '</p>' + (q.cq ? '<div class="cq">' + q.cq + '</div>' : '') + '<div class="mc ' + q.cls + '" id="mcx"></div>';
    q.opts.forEach(function (op, k) { oh += '<button type="button" class="btn opt' + (a !== undefined ? (op.ok ? ' right' : k === a ? ' wrong' : '') : '') + '" data-o="' + k + '"' + (a !== undefined ? ' disabled' : '') + '>' + op.h + '</button>'; });
    if (a !== undefined) { o = q.opts[a]; h += fb(o.ok, o.ok ? 'درست است! ✓' : (o.m || 'این گزینه درست نیست.')) + '<div class="ex">' + q.expl() + '</div>'; }
    h += '<div class="opts" style="direction:rtl;justify-content:space-between"><button type="button" class="btn" data-p="1"' + (i ? '' : ' disabled') + '>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (a === undefined ? ' disabled' : '') + '>' + (i === 4 ? 'مشاهدهٔ نتیجه':'سؤال بعدی') + '</button></div>';
    host.innerHTML = rr(h); host.querySelector('#mcx').innerHTML = rr(oh); armScans(host);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.o) { ans[i] = +b.dataset.o; paint(); } else if (b.dataset.nx) { i++; paint(); } else if (b.dataset.p) { i--; paint(); } else if (b.dataset.pv) { i = 0; paint(); } else if (b.dataset.r) { build(); paint(); }
  }); wireReplay(host); build(); paint();
};
var cards3 = function (cells, cls) { return '<div class="sg ' + (cls || 'sg3') + '">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + M(c.h) + '</b><span>' + c.t + '</span>' + (c.e ? '<span>' + M(c.e) + '</span>' : '') + '</div>'; }).join('') + '</div>'; };
var refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };

return {
  html: function () {
    var T = String.raw, tm = '\\times';
    var C = function (n, d, k) { var c = '{\\color{crimson}\\scriptsize' + tm + k + '}'; return '\\frac{' + n + c + '}{' + d + c + '}'; };
    return [
      K.sn('۱', 'بزرگ‌تر، کوچک‌تر یا مساوی؟'),
      '<p>هر دو عددی را که کنار هم بگذاری، فقط یکی از سه حالت رخ می‌دهد: اولی بزرگ‌تر است، دومی بزرگ‌تر است، یا هر دو برابرند. هر حالت علامتی دارد:</p>',
      cards3([{ c: 'p', h: '\\gt', t: 'بزرگ‌تر از', e: '8\\gt3' }, { c: 'n', h: '\\lt', t: 'کوچک‌تر از', e: '2\\lt6' }, { c: 'r3', h: '=', t: 'برابر با', e: '0.5=\\dfrac{1}{2}' }]),
      T`<p>دهانهٔ علامت همیشه به طرف عدد بزرگ‌تر باز است. مثلاً در $4\gt2$ دهانه به سمت ۴ باز می‌شود.</p>`,
      T`<p>برای نمونه، دو لیوان آب داریم: یکی $0.7$ لیتر و دیگری $0.5$ لیتر. رقم دهمِ اولی بزرگ‌تر است (۷ دهم در برابر ۵ دهم)، پس:</p>`, vd2('0.7', '\\gt', '0.5'),
      K.box('note', 'نکته: شکل عدد مهم نیست، مقدارش مهم است', '<p>ممکن است دو عدد شکل‌های متفاوتی داشته باشند، اما برابر باشند:</p>' + K.dm('\\dfrac{1}{2}=0.5=0.50') + '<p>پس پیش از مقایسه، باید مطمئن شویم مقدار هر عدد را درست می‌فهمیم.</p>'),

      K.sn('۲', 'محور اعداد: راست‌تر، بزرگ‌تر'),
      '<p>روی محور اعداد، هر چه به راست برویم عدد بزرگ‌تر می‌شود. دو نقطه را جابه‌جا کن و ببین رابطهٔ دو عدد چطور تغییر می‌کند:</p><div class="nl" id="cl"></div>',
      '<p>پس عددهای سمت راست بزرگ‌ترند. برای مثال:</p>', K.dm('-3\\lt-2\\lt-1\\lt0\\lt1\\lt2\\lt3'),
      '<p>از همین ترتیب سه نتیجه می‌گیریم:</p>',
      cards3([{ c: 'p', h: 'a\\gt0', t: 'هر عدد مثبت از صفر بزرگ‌تر است.' }, { c: 'n', h: 'a\\lt0', t: 'هر عدد منفی از صفر کوچک‌تر است.' }, { c: 'r3', h: '+\\gt-', t: 'هر عدد مثبت از هر عدد منفی بزرگ‌تر است.' }]),
      '<h4>چرا عددهای منفی گیج‌کننده‌اند؟</h4>',
      '<p>در عددهای مثبت، هر چه عدد از صفر دورتر باشد بزرگ‌تر است. اما در عددهای منفی برعکس است: هر چه از صفر دورتر شویم، عدد کوچک‌تر می‌شود. دمای هوا مثال خوبی است:</p>', K.thermo(),
      '<p>اگر دمای شهر اول ' + M('-2') + ' درجه و دمای شهر دوم ' + M('-5') + ' درجه باشد، شهر اول گرم‌تر است. به زبان ریاضی:</p>', vd2('-2', '\\gt', '-5'),
      K.box('note', 'قاعدهٔ مهم', '<p>از میان دو عدد منفی، عددی بزرگ‌تر است که به صفر نزدیک‌تر باشد.</p>'),

      K.sn('۳', 'مقایسهٔ عددهای اعشاری'),
      '<p>مقایسهٔ اعشاری‌ها شبیه پیداکردن یک اسم در فرهنگ لغت است: از اولین حرف شروع می‌کنی و همان جا که دو کلمه فرق کردند، تصمیم می‌گیری. اینجا هم به‌جای حرف، رقم داریم:</p><ol><li>ابتدا بخش صحیح را مقایسه می‌کنیم.</li><li>اگر برابر بود، رقم دهم را مقایسه می‌کنیم.</li><li>اگر باز هم برابر بود، به رقم صدم می‌رویم و همین‌طور جلو می‌رویم.</li></ol>',
      '<h4>مثال اول</h4><p>کدام بزرگ‌تر است:</p>', duel('0.8', '0.65'),
      T`<p>$0.8$ را به شکل $0.80$ می‌نویسیم تا رقم‌ها هم‌جایگاه شوند. رقم‌ها را از چپ به راست می‌خوانیم:</p>`, scan(['0.80', '0.65']).html,
      '<p>بخش صحیح یکی است؛ اما رقم دهم ۸ از ۶ بزرگ‌تر است. پس:</p>', vd2('0.8', '\\gt', '0.65'),
      '<p>اضافه‌کردن صفر به انتهای قسمت اعشاری، مقدار عدد را عوض نمی‌کند.</p>',
      '<h4>مثال دوم</h4><p>کدام بزرگ‌تر است:</p>', duel('2.47', '2.5'),
      '<p>دومی را ' + M('2.50') + ' می‌نویسیم. دهم‌ها فرق دارند (۵ در برابر ۴) و همین‌جا تصمیم گرفته می‌شود:</p>', scan(['2.47', '2.50']).html, '<p>بنابراین:</p>', vd2('2.47', '\\lt', '2.5'),
      '<h4>مثال سوم</h4><p>کدام کوچک‌تر است:</p>', duel('0.405', '0.45'),
      '<p>دهم‌ها برابرند (هر دو ۴)، پس به صدم‌ها می‌رویم:</p>', scan(['0.405', '0.450']).html, '<p>در رقم صدم، اولی ۰ و دومی ۵ دارد. پس عدد اول کوچک‌تر است:</p>', vd2('0.405', '\\lt', '0.45'),
      K.box('err', '⚠ خطای رایج', '<p>تعداد رقم‌های اعشار، بزرگی عدد را تعیین نمی‌کند. ' + M('0.9') + ' از ' + M('0.125') + ' بزرگ‌تر است، با اینکه دومی رقم‌های بیشتری دارد:</p>' + scan(['0.900', '0.125']).html),

      K.sn('۴', 'کسر با اعشاری و کسر با کسر'),
      '<p>وقتی دو عدد شکل‌های متفاوتی دارند، باید هر دو را به یک «زبان» ببریم. دو راه داریم: هر دو را اعشاری کنیم، یا هر دو را کسر با مخرج مشترک.</p>',
      '<h4>روش اول: اعشاری کردن</h4><p>کسر را با تقسیم صورت بر مخرج به اعشار می‌بریم. کدام بزرگ‌تر است:</p>', duel('\\dfrac{3}{5}', '0.55'),
      '<p>می‌دانیم:</p>', K.dm('\\dfrac{3}{5}=3\\div5=0.6'), '<p>حالا دو عدد اعشاری را مقایسه می‌کنیم؛ دهم‌ها ۶ و ۵ هستند:</p>', vd2('\\dfrac{3}{5}', '\\gt', '0.55'),
      '<h4>روش دوم: مخرج مشترک</h4><p>مخرج مشترک را در درس کسرها دیدی. کدام بزرگ‌تر است:</p>', duel('\\dfrac{3}{4}', '\\dfrac{2}{3}'),
      '<p>مخرج مشترک ' + M('12') + ' را می‌گیریم؛ هر دو نوار را به ' + M('12') + ' تکهٔ هم‌اندازه تقسیم می‌کنیم:</p>', K.bars(fra(3, 4), fra(2, 3)),
      '<p><b>یادآوری:</b> در بخش پایانی همین فصل با کوچک‌ترین مضرب مشترک (ک.م.م) آشنا می‌شویم؛ با آن می‌توانیم مخرج مشترک را بدون رسم این شکل‌های طولانی پیدا کنیم.</p>',
      '<p>با ضرب‌کردن صورت و مخرج در یک عدد:</p>', AL([C(3, 4, 3) + '&=\\dfrac{9}{12}', C(2, 3, 4) + '&=\\dfrac{8}{12}']), '<p>مخرج‌ها برابر شد، پس صورتِ بزرگ‌تر یعنی کسرِ بزرگ‌تر:</p>', vd2('\\dfrac{3}{4}', '\\gt', '\\dfrac{2}{3}'),
      '<h4>دو ترفند سریع</h4>',
      T`<p><b>صورت‌های برابر:</b> اگر صورت دو کسر یکی باشد، کسری که مخرجش بزرگ‌تر است، کوچک‌تر است؛ چون تکه‌هایش ریزتر است. مثلاً $\dfrac{3}{7}\lt\dfrac{3}{5}$.</p>`,
      T`<p><b>مقایسه با نصف:</b> کسر $\dfrac{4}{9}$ از نصف کمتر است (چون $2\times4=8$ کمتر از ۹ است) و $\dfrac{5}{8}$ از نصف بیشتر است (چون $2\times5=10$ بیشتر از ۸ است). پس:</p>`, vd2('\\dfrac{4}{9}', '\\lt', '\\dfrac{5}{8}'),
      K.box('note', 'کسری که اعشارش تمام نمی‌شود', T`<p>$\dfrac{1}{3}=0.3333\ldots$ است؛ پس $\dfrac{1}{3}$ از $0.3$ بزرگ‌تر است. برای مقایسه معمولاً همان چند رقم اول کافی است، به شرط اینکه اولین رقم متفاوت پیدا شده باشد.</p>`),

      K.sn('۵', 'کسرهای منفی: آینهٔ صفر'),
      '<p>بیشترین اشتباه‌ها همین‌جا اتفاق می‌افتد. صفر را مثل یک آینه تصور کن: هر عدد منفی، تصویری مثبت در آینه دارد. اما ترتیبِ تصویرها برعکسِ ترتیبِ خود عددهاست. اسلایدر را بکش و ببین:</p><div class="nl" id="mr"></div>',
      '<p>پس برای مقایسهٔ دو عدد منفی دو کار می‌کنیم:</p>',
      '<div class="sg"><div class="r1"><b>۱. اندازه‌ها را مقایسه کن</b><span>علامت منفی را کنار بگذار و دو عدد مثبت را مقایسه کن.</span></div><div class="r2"><b>۲. ترتیب را برعکس کن</b><span>هر که اندازهٔ بزرگ‌تری دارد، کوچک‌تر است.</span></div></div>',
      '<h4>مثال اول</h4><p>کدام بزرگ‌تر است:</p>', duel('-\\dfrac{3}{5}', '-\\dfrac{2}{3}'),
      '<p>اندازه‌ها را مقایسه می‌کنیم:</p>', AL(['\\dfrac{3}{5}&=0.6', '\\dfrac{2}{3}&=0.666\\ldots']), '<p>اندازهٔ اولی کوچک‌تر است. چون هر دو منفی‌اند، ترتیب برعکس می‌شود:</p>', vd2('-\\dfrac{3}{5}', '\\gt', '-\\dfrac{2}{3}'),
      '<h4>مثال دوم: چهار عدد منفی</h4><p>کدام عدد از همه کوچک‌تر است:</p>', K.dm('-\\dfrac{3}{5},\\quad-0.65,\\quad-\\dfrac{5}{8},\\quad-\\dfrac{2}{3}'),
      '<p>کسرها را به اعشار می‌بریم:</p>', K.ord([[{ t: '-\\frac{3}{5}', l: M('3\\div5'), c: 'b' }, ',', '-0.65', ',', { t: '-\\frac{5}{8}', l: M('5\\div8'), c: 'r' }, ',', { t: '-\\frac{2}{3}', l: M('2\\div3'), c: 'g' }], ['=', '-0.6', ',', '-0.65', ',', '-0.625', ',', '-0.666\\ldots']]),
      '<p>روی محور (بزرگ‌نمایی‌شده) جای‌شان این‌طور است:</p>',
      K.zoom(-0.7, -0.55, [-0.7, -0.65, -0.6, -0.55], [{ v: -2 / 3, h: M('-\\dfrac{2}{3}'), c: CL[1], lv: 0 }, { v: -0.65, h: M('-0.65'), c: CL[2], lv: 1 }, { v: -0.625, h: M('-\\dfrac{5}{8}'), c: CL[3], lv: 0 }, { v: -0.6, h: M('-\\dfrac{3}{5}'), c: CL[0], lv: 1 }], 'سمت چپ‌ترین نقطه، کوچک‌ترین عدد است.'),
      '<p>کوچک‌ترین عدد، همان است که از همه چپ‌تر است:</p>', verdict([['m', '-\\dfrac{2}{3}']]),
      K.box('err', '⚠ خطای رایج', '<p>این رابطه نادرست است:</p>' + K.dm('-\\dfrac{2}{3}\\gt-\\dfrac{3}{5}') + T`<p>چون $\dfrac{2}{3}\gt\dfrac{3}{5}$ است، علامت $\gt$ را همان‌طور نگه داشته‌اند؛ اما با منفی‌شدن هر دو عدد، ترتیب برعکس می‌شود. رابطهٔ درست:</p>` + K.dm('-\\dfrac{2}{3}\\lt-\\dfrac{3}{5}')),

      K.sn('۶', 'عدد پی و تقریب‌های اعشاری'),
      T`<p>عدد $\pi$ تقریباً $3.14159\ldots$ است و رقم‌های اعشارش هیچ‌وقت تمام نمی‌شود. با این حال می‌توانیم آن را با عددهای دیگر مقایسه کنیم. ذره‌بین را زیاد کن و ببین $\pi$ کجا می‌نشیند:</p><div class="nl" id="ln"></div>`,
      '<h4>مثال اول: π و ۳.۱۴</h4><p>می‌دانیم:</p>', K.dm('\\pi=3.14159\\ldots'),
      '<p>عدد ' + M('3.14') + ' را مثل ' + M('3.14000\\ldots') + ' در نظر می‌گیریم و رقم‌ها را مقایسه می‌کنیم:</p>', scan(['3.14159', '3.14000'], ['\\pi', '3.14']).html,
      '<p>سه رقم اول (۳، ۱ و ۴) برابرند؛ در رقم هزارم، π رقم ۱ و ' + M('3.14') + ' رقم ۰ دارد. پس:</p>', vd2('\\pi', '\\gt', '3.14'),
      '<h4>مثال دوم: π و ۳.۱۵</h4>', scan(['3.14159', '3.15000'], ['\\pi', '3.15']).html, '<p>رقم صدمِ π برابر ۴ و رقم صدمِ ' + M('3.15') + ' برابر ۵ است. پس:</p>', vd2('\\pi', '\\lt', '3.15'),
      '<h4>مثال سوم: π و ۳.۱۴۱۶</h4><p>این عدد دقیق‌تر است، پس باید تا رقم‌های بیشتری جلو برویم:</p>', scan(['3.14159', '3.14160'], ['\\pi', '3.1416']).html, '<p>اولین تفاوت در رقم ده‌هزارم است (۵ در برابر ۶). پس:</p>', vd2('\\pi', '\\lt', '3.1416'),
      K.box('err', '⚠ هشدار دربارهٔ تقریب', T`<p>$3.14$ و $3.1416$ هیچ‌کدام خودِ $\pi$ نیستند؛ فقط تقریب‌اند. همچنین اگر چند رقم اول دو عدد یکی باشد، هنوز نمی‌توان نتیجه گرفت؛ باید تا اولین رقم متفاوت جلو رفت. مثلاً $\pi$ و $3.1415$ تا چهار رقم اعشار یکی‌اند، اما $\pi=3.14159\ldots\gt3.1415$ است.</p>`),

      K.sn('۷', 'علامت‌های ≥ و ≤ و نامساوی دوتایی'),
      T`<p>گاهی «مساوی» هم قبول است. مثلاً در «حداقل سن برای ثبت‌نام ۱۸ سال است»، خودِ ۱۸ هم قبول است. برای این‌جور حالت‌ها دو علامت داریم:</p>`,
      refs([{ c: 'r1', t: 'بزرگ‌تر یا مساوی', r: 'خودِ ۳ هم قبول است (یعنی «حداقل ۳»).', e: 'x\\ge3' }, { c: 'r2', t: 'کوچک‌تر یا مساوی', r: 'خودِ ۳ هم قبول است (یعنی «حداکثر ۳»).', e: 'x\\le3' }, { c: 'r3', t: 'بزرگ‌تر از', r: 'خودِ ۳ قبول نیست.', e: 'x\\gt3' }, { c: 'r4', t: 'کوچک‌تر از', r: 'خودِ ۳ قبول نیست.', e: 'x\\lt3' }]),
      '<p>برای سنجیدن یک نامساوی، دو طرف را مقایسه می‌کنیم و می‌پرسیم «درست است یا نه؟». دقت کن که با ≤ و ≥ حالت مساوی هم درست حساب می‌شود:</p>',
      AL(['5\\ge5&\\quad{\\color{teal}\\checkmark}', '5\\gt5&\\quad{\\color{crimson}\\times}', '-2\\le-2&\\quad{\\color{teal}\\checkmark}', '3\\le2&\\quad{\\color{crimson}\\times}']),
      '<h4>نامساوی دوتایی</h4><p>گاهی یک عدد باید هم‌زمان از دو مرز رد شود. این نوشته را در نظر بگیر:</p>', K.dm('-1\\lt x\\le3'),
      T`<p>یعنی هم $-1\lt x$ و هم $x\le3$؛ یعنی $x$ «میان» $-1$ و ۳ است، ولی ۳ را هم قبول داریم و $-1$ را نه. برای آزمودن یک عدد، آن را در هر دو قسمت می‌گذاریم:</p>`,
      AL(['x=3:\\quad&-1\\lt3\\ {\\color{teal}\\checkmark}\\quad\\text{و}\\quad3\\le3\\ {\\color{teal}\\checkmark}', 'x=-1:\\quad&-1\\lt-1\\ {\\color{crimson}\\times}']),
      '<p>پس ' + M('x=3') + ' قبول است و ' + M('x=-1') + ' قبول نیست.</p>',
      K.box('note', 'این علامت‌ها بعداً به کارت می‌آیند', '<p>در درس حل نامعادله از همین علامت‌ها و همین آزمودنِ عددها استفاده می‌کنیم؛ حتی وقتی بخواهیم همهٔ عددهای قبول را روی محور نشان بدهیم. اینجا فقط باید بدانی هر علامت چه می‌گوید و بتوانی یک عدد را در آن آزمود.</p>'),

      K.sn('۸', 'مرتب‌کردن چند عدد'),
      '<p>برای مرتب‌کردن چند عدد، یک روش منظم داشته باشیم تا اشتباه نکنیم:</p><ol><li>اگر شکل عددها متفاوت است، همه را به یک شکل ببر (معمولاً اعشاری).</li><li>عددهای منفی را مرتب کن؛ منفی‌ترین عدد اول می‌آید.</li><li>اگر صفر هست، بعد از منفی‌ها بگذار.</li><li>عددهای مثبت را از کوچک به بزرگ بنویس.</li></ol>',
      '<h4>مثال اول</h4><p>عددهای زیر را از کوچک به بزرگ مرتب کن:</p>', K.dm('0.75,\\quad\\dfrac{1}{3},\\quad0.5,\\quad\\dfrac{3}{5}'),
      K.ord([['0.75', ',', { t: '\\frac{1}{3}', l: '۱÷۳', c: 'b' }, ',', '0.5', ',', { t: '\\frac{3}{5}', l: '۳÷۵', c: 'r' }], ['=', '0.75', ',', '0.333\\ldots', ',', '0.5', ',', '0.6']]),
      '<p>ترتیب صعودی، با همان شکل اصلی عددها:</p>', chainV([dec('0.5'), fra(3, 5), dec('0.75')].length ? [fra(1, 3), dec('0.5'), fra(3, 5), dec('0.75')] : []),
      '<h4>مثال دوم: مثبت و منفی</h4><p>این عددها را مرتب کن:</p>', K.dm('-\\dfrac{3}{4},\\quad0.2,\\quad-0.5,\\quad\\dfrac{1}{3},\\quad0'),
      '<p>منفی‌ها: ' + M('-0.75') + ' و ' + M('-0.5') + '؛ سپس صفر؛ سپس مثبت‌ها: ' + M('0.2') + ' و ' + M('0.333\\ldots') + '. پس:</p>', chainV([fra(-3, 4), dec('-0.5'), dec('0'), dec('0.2'), fra(1, 3)]),
      '<h4>ترتیب نزولی</h4><p>برای مرتب‌کردن از بزرگ به کوچک، همان ترتیب را برعکس می‌کنیم و علامت‌ها هم از ' + M('\\lt') + ' به ' + M('\\gt') + ' تبدیل می‌شوند:</p>', K.dm('-2\\lt-1\\lt0\\lt3\\lt5'), K.dm('5\\gt3\\gt0\\gt-1\\gt-2'),

      K.sn('۹', 'راهنمای سریع مقایسه و ترتیب اعداد'),
      refs([{ c: 'r1', t: 'دو اعشاری', r: 'رقم‌ها را هم‌جایگاه و از چپ به راست مقایسه کن؛ اولین تفاوت تصمیم می‌گیرد.', e: '0.405\\lt0.45' }, { c: 'r2', t: 'کسر و اعشاری یا کسر و کسر', r: 'هر دو را اعشاری کن یا مخرج مشترک بگیر.', e: '\\dfrac{3}{4}\\gt\\dfrac{2}{3}' }, { c: 'r3', t: 'عددهای منفی', r: 'اندازه‌ها را مقایسه کن، بعد ترتیب را برعکس کن.', e: '-\\dfrac{3}{5}\\gt-\\dfrac{2}{3}' }, { c: 'r4', t: 'عددی مثل π', r: 'تقریب اعشاری بساز و تا اولین رقم متفاوت جلو برو.', e: '\\pi\\lt3.1416' }, { c: 'r1', t: 'چند عدد', r: 'اول یک شکل کن؛ منفی‌ها، صفر، مثبت‌ها.', e: '-0.5\\lt0\\lt\\dfrac{1}{3}' }, { c: 'r3', t: '≥ و ≤', r: 'عدد را جایگذاری کن؛ مرز با علامت مساوی قبول است.', e: '-1\\lt x\\le3' }]),

      K.sn('۱۰', 'نردبان ترتیب'),
      '<p>کارت‌ها را در خانه‌ها بچین؛ از کوچک‌ترین تا بزرگ‌ترین. اگر اشتباه کنی، همه را به اعشار می‌بریم و ترتیب درست را می‌بینی.</p><div class="cover" id="ld" style="animation:none"></div>',
      K.sn('۱۱', 'محور زنده'),
      '<p>این بار عددها را روی محور بگذار. جای تقریبی کافی است؛ خواندن دقیق عدد از روی محور موضوع درسِ خودش است. فقط ترتیبِ نقطه‌ها باید درست باشد.</p><div class="cover" id="ll" style="animation:none"></div>',
      K.sn('۱۲', 'کدام بزرگ‌تر است؟'),
      '<p>هر مرحله با دو پاسخ درست تمام می‌شود. بعد از هر پاسخ، رقم‌به‌رقم می‌بینی چرا.</p><div class="cover" id="cs" style="animation:none"></div>',
      K.sn('۱۳', 'تلهٔ علامت منفی'),
      '<p>چند جفت کسر منفی می‌بینی. اگر فقط اندازه‌ها را مقایسه کنی و ترتیب را برعکس نکنی، می‌گوییم کجا گیر کردی.</p><div class="cover" id="nt" style="animation:none"></div>',
      K.sn('۱۴', 'کدام عددها قبول‌اند؟'),
      '<p>شرط را بخوان و عددهایی را که در آن صدق می‌کنند انتخاب کن. به عددهای مرزی دقت کن.</p><div class="cover" id="ip" style="animation:none"></div>',
      K.sn('۱۵', 'تمرین پایانی'),
      '<p>پنج سؤال با عددهای تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover" id="cf" style="animation:none"></div>',
      K.box('sum', 'بعد از این درس باید بتوانی', T`<ul><li>رابطهٔ بزرگ‌تر، کوچک‌تر یا مساوی را تشخیص بدهی و با علامت درست بنویسی.</li><li>اعشاری‌ها را رقم‌به‌رقم و کسرها را با اعشاری‌کردن یا مخرج مشترک مقایسه کنی.</li><li>در عددهای منفی، بعد از مقایسهٔ اندازه‌ها ترتیب را برعکس کنی.</li><li>عددی مثل $\pi$ را با تقریب اعشاری مقایسه کنی.</li><li>چند عدد را به ترتیب صعودی یا نزولی مرتب کنی.</li><li>معنی $\ge$، $\le$ و نامساوی دوتایی را بدانی و یک عدد را در آن‌ها بیازمایی.</li></ul><p>این مهارت پایهٔ درس‌های نمایش و خواندن عدد روی محور و حل نامعادلهٔ خطی است.</p>`)
    ].join('');
  },
  init: function (panel) {
    K.cmpLine(panel.querySelector('#cl')); K.mirror(panel.querySelector('#mr')); K.lens(panel.querySelector('#ln'));
    K.ladder(panel.querySelector('#ld')); K.liveLine(panel.querySelector('#ll')); K.cmpSteps(panel.querySelector('#cs')); K.negTrap(panel.querySelector('#nt')); K.ineqPick(panel.querySelector('#ip')); K.cmpFinal(panel.querySelector('#cf'));
    armScans(panel); wireReplay(panel);
  }
};
  }
};
