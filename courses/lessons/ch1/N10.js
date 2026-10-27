/* درس مهارت N10 — مضرب مشترک و مخرج مشترک کسرها (فصل ۱) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.N10 = {
  needs: ['utils', 'frac'],
  setup: function (K0) {
var ML = window.MathLite, fa = ML.fa, rr = ML.renderRich, abs = Math.abs, df = K0.df;
var _u = K0._u, R = _u.R, M = _u.M, shuffle = _u.shuffle;
var gcd = K0._f.gcd, lcm = K0._f.lcm, divs = K0._f.divisors;
var K = Object.create(K0);   // K0 = هستهٔ مشترک؛ K = همان + ابزارهای اختصاصی این درس

/* ---- استایل اختصاصی این درس؛ فقط از رنگ‌ها و قالب‌های موجود پروژه ---- */
(function () {
  if (document.getElementById('css-N10')) { return; }
  var s = document.createElement('style'); s.id = 'css-N10';
  s.textContent = [
    '.sg.sg3{grid-template-columns:repeat(3,1fr)}.sg.sg3>div{text-align:center;padding:8px 4px}.sg.sg3 b .katex{font-size:1.3em}',
    '.sg.sg3>div>span{display:block;font-size:.84rem;color:var(--ink-soft);line-height:1.6;margin-top:2px}',
    '.nleq i{display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:3px 11px;line-height:1.3;margin:2px;vertical-align:middle}',
    '.nleq i.n{background:#fff}.nleq.vd{margin:8px 0 12px}.nleq.sm{font-size:1rem}.nleq.sm i{min-height:32px;padding:2px 8px}',
    '.nleq.wrap{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 2px}',
    '.nleq .tg{display:inline-block;font:bold .85rem Tahoma,sans-serif;color:var(--ink-soft);margin:0 6px;direction:rtl;vertical-align:middle}',
    '.nleq .or{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#fff;border:2px solid var(--line);font:bold .8rem Tahoma,sans-serif;direction:rtl;color:var(--ink-soft);vertical-align:middle}',
    '.chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:6px 0 4px;direction:ltr}',
    '.chip{min-width:48px;min-height:42px;border:2px solid var(--ink);border-radius:12px;background:#fff;cursor:pointer;font:inherit;color:var(--ink);padding:2px 10px;box-shadow:2px 2px 0 var(--ink)}',
    '.chip:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}.chip.on{background:var(--mark)}.chip.star{border-color:var(--accent);background:#e6f6f3}.chip.on.star{background:var(--mark)}.chip:disabled{opacity:.5;cursor:default}',
    '.mc.m1{grid-template-columns:1fr}.mc.m3{grid-template-columns:repeat(3,1fr)}.mc.m2{grid-template-columns:repeat(2,1fr)}',
    '.cq{direction:ltr;text-align:center;margin:8px 0}.cq .katex{font-size:1.4em}',
    '.legend{text-align:center;font-size:.84rem;color:var(--ink-soft);margin:2px 0 8px}',
    '.standard-n6-10 .sgnrow{display:flex;gap:12px;justify-content:center;margin:10px 0;direction:rtl;flex-wrap:wrap}.standard-n6-10 .sgnrow button.btn{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:132px;min-width:132px;height:54px;min-height:54px;padding:8px 14px;font-family:inherit;font-size:1.04rem;font-weight:700;line-height:1.4;border-radius:12px;box-shadow:2px 2px 0 var(--ink);transform:none}',
    '.standard-n6-10 .sgnrow button.btn.right{background:#d2f0e9;border-color:var(--accent)}.standard-n6-10 .sgnrow button.btn.wrong{background:#fbd5d5;border-color:#b23a3a}.standard-n6-10 .sgnrow button.btn:disabled{opacity:1}',
    '.standard-n6-10 .sgnrow button.btn:not(:disabled):active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}',
    '.snt{display:block;direction:rtl;font-size:1rem;line-height:1.9;text-align:center}.snt .katex{font-size:1.1em}',
    '.trow{display:flex;gap:10px;align-items:center;justify-content:center;margin:6px 0;direction:ltr}.trow .tm{font:bold 1.1rem Tahoma;flex:none}.trow .tm.oky{color:var(--accent-dark)}.trow .tm.nox{color:#b23a3a}',
    /* تجزیه */
    '.ftr{direction:ltr;margin:8px auto;max-width:420px}',
    '.ftr .stp{display:flex;align-items:center;justify-content:center;gap:8px;margin:6px 0}',
    '.ftr .stp .katex{font-size:1.2em}',
    '.ftr .pr{display:inline-flex;align-items:center;justify-content:center;min-width:38px;height:38px;border-radius:50%;background:var(--pink);color:#fff;border:2px solid var(--ink);font-weight:bold;box-shadow:2px 2px 0 var(--ink)}',
    '.ftr .pr .katex{font-size:1.1em}',
    '.ftr .rm{display:inline-flex;align-items:center;justify-content:center;min-width:52px;height:40px;border-radius:10px;background:var(--accent);color:#fff;border:2px solid var(--ink);font-weight:bold;box-shadow:2px 2px 0 var(--ink)}',
    '.ftr .ar{font:bold 1.2rem Tahoma;color:var(--ink-soft)}',
    '.ftr .dbox{display:flex;align-items:center;justify-content:center;gap:10px;min-height:50px;padding:8px 12px;border:2px dashed #bcc9de;border-radius:14px;background:#fff;margin:0 auto;max-width:340px}',
    '.ftr .dbox .katex{font-size:1.18em}',
    '.ftr .stepTag{display:flex;align-items:center;justify-content:center;width:56px;min-height:28px;padding:2px 8px;border-radius:999px;background:var(--accent);color:#fff;border:2px solid var(--ink);font:bold 1.2rem Tahoma,sans-serif;box-shadow:2px 2px 0 var(--ink);margin:8px auto}',
    '.ftr .stepTag .katex{font-size:1.02em;color:inherit}',
    '.n10-fact-actions .btn{box-shadow:2px 2px 0 var(--ink);font-weight:bold}',
    '.n10-fact-actions .btn:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}',
    '.n10-ladder-actions .btn{min-height:42px;font-size:.88rem;font-weight:700;box-shadow:2px 2px 0 var(--ink)}',
    '.n10-ladder-actions .btn:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}',
    '.n10-ladder-work{text-align:center;margin:8px auto 12px;max-width:420px}.n10-ladder-work .dm{margin:4px auto}',
    '.pk{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;direction:ltr;margin:8px 0}.pk .chip{min-width:52px;font-weight:bold}',
    /* نردبان تقسیم */
    '.dv{direction:ltr;margin:8px auto;display:grid;grid-template-columns:48px 1px auto;max-width:260px;justify-content:center;align-items:center}',
    '.dv .p{grid-column:1;text-align:right;padding:2px 8px 2px 0;font-weight:bold;color:var(--pink)}',
    '.dv .vl{grid-column:2;background:var(--ink);align-self:stretch}',
    '.dv .nn{grid-column:3;display:flex;gap:26px;padding:2px 12px;font-weight:bold}',
    '.dv .nn span{min-width:44px;text-align:center}',
    '.dv .ln{grid-column:1 / span 3;height:2px;background:var(--ink);margin:2px 0}',
    '.n10-progress{direction:rtl!important}.n10-progress span{cursor:default}',
    '.n10-explain{border-style:dashed!important}',
    '.n10-final-nav{display:flex;justify-content:space-between;direction:rtl}',
    '.n10-restart{font-weight:700;box-shadow:2px 2px 0 var(--ink)}.n10-restart:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}',
    '@media(max-width:520px){.mc.m3{gap:6px}}'
  ].join('\n');
  document.head.appendChild(s);
})();

/* ================= ابزارهای مشترک ================= */
var AL = function (lines) { return K.dm('\\begin{aligned}' + lines.join('\\\\') + '\\end{aligned}'); };
var verdict = function (parts, cls) { return '<div class="nleq vd ' + (cls || '') + '">' + parts.map(function (p) { return '<i class="' + p[0] + '">$' + p[1] + '$</i>'; }).join('') + '</div>'; };
var CL = ['var(--accent)', 'var(--pink)', '#4c5fd5', '#e08a00', 'var(--mark)'];
var PR = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
var isPrime = function (n) { var i; if (n < 2) { return false; } for (i = 2; i * i <= n; i++) { if (n % i === 0) { return false; } } return true; };
var pf = function (n) { var o = [], p = 2; while (n > 1) { while (n % p === 0) { o.push(p); n /= p; } p++; } return o; };
var pfm = function (n) { var m = {}; pf(n).forEach(function (p) { m[p] = (m[p] || 0) + 1; }); return m; };
var fexp = function (n) { var m = pfm(n), k = Object.keys(m).map(Number).sort(function (a, b) { return a - b; }); return k.map(function (p) { return m[p] > 1 ? p + '^{' + m[p] + '}' : String(p); }).join('\\times'); };
var fprod = function (n) { return pf(n).join('\\times'); };
var tg = function (label, inner) { return '<div class="nleq vd"><span class="tg">' + label + '</span>' + inner + '</div>'; };
var gv = function (a, b, g) { return tg('ب.م.م', '<i class="n">$(' + a + ',\\,' + b + ')$</i><i class="b">$=$</i><i class="a">$' + g + '$</i>'); };
var lv = function (a, b, l) { return tg('ک.م.م', '<i class="n">$[' + a + ',\\,' + b + ']$</i><i class="b">$=$</i><i class="m">$' + l + '$</i>'); };
var uniq = function (arr) { var s = {}; return arr.filter(function (x) { var k = String(x.v); if (s[k]) { return false; } s[k] = 1; return true; }); };
function genPair(r1) {
  var g = [2, 3, 4, 5, 6, 8, 9, 10, 12][R(0, 8)], r, s;
  if (r1 && Math.random() < 0.15) { return [g, g * R(2, 6)]; }
  do { r = R(2, 9); s = R(2, 9); } while (gcd(r, s) !== 1 || r === s);
  return [g * r, g * s];
}
/* نوارهای مخرج مشترک */
function bars(a, b) {
  var L = lcm(a[1], b[1]), W = 288, w = W / L, n1 = a[0] * L / a[1], n2 = b[0] * L / b[1], s = '', rows = [[a, n1, '#7fd0c3', 14], [b, n2, '#f2a6c0', 78]], i;
  rows.forEach(function (rw) {
    var x = rw[0], nn = rw[1], y = rw[3], step = L / x[1], label = '‫از ' + fa(L) + ' قسمت، ' + fa(nn) + ' قسمت‬';
    s += '<text x="146" y="' + (y - 4) + '" text-anchor="middle" direction="rtl" unicode-bidi="bidi-override" font-size="13" font-weight="bold" font-family="Tahoma" fill="#14213d">' + label + '</text><rect x="2" y="' + y + '" width="' + (nn * w) + '" height="38" fill="' + rw[2] + '"/>';
    for (i = 0; i <= L; i++) { s += '<line x1="' + (2 + i * w) + '" y1="' + y + '" x2="' + (2 + i * w) + '" y2="' + (y + 38) + '" stroke="#14213d" stroke-width="' + (i % step === 0 ? 2.6 : 1) + '" ' + (i % step === 0 ? '' : 'stroke-opacity=".45"') + '/>'; }
    s += '<rect x="2" y="' + y + '" width="' + W + '" height="38" fill="none" stroke="#14213d" stroke-width="2.5"/>';
  });
  return '<div class="figs one"><figure><svg viewBox="0 0 296 130" aria-hidden="true">' + s + '</svg><figcaption>خط‌های پررنگ، تقسیم‌بندی اصلی است؛ با تکه‌های ' + M('\\dfrac{1}{' + L + '}') + ' هر دو نوار را می‌شماریم.</figcaption></figure></div>';
}

/* ---- تجزیه: عددی را با تقسیم بر عددهای اول بشکن ---- */
K.factorTree = function (host) {
  var NS = [12, 18, 20, 24, 28, 30, 36, 40, 45, 48, 50, 60, 72, 84, 90, 100, 126, 150], n, cur, steps, msg;
  function nw() { n = NS[R(0, NS.length - 1)]; cur = n; steps = []; msg = ''; }
  function divisionBox(before, divisor, after) {
    return '<div class="dbox">' + M(String(before) + '\\div' + divisor + '=' + after) + '</div>';
  }
  function paint() {
    var h = '<p class="ask">عدد ' + M(String(n)) + ' را با تقسیم بر عددهای اول بشکن:</p><div class="ftr">', i, done = cur === 1, prev = n;
    for (i = 0; i < steps.length; i++) {
      if (i > 0) { h += '<div class="stepTag" aria-hidden="true">↓</div>'; }
      h += divisionBox(prev, steps[i].p, steps[i].r);
      prev = steps[i].r;
    }
    h += '</div>';
    if (!done) {
      h += '<div class="pk">' + PR.slice(0, 5).map(function (p) { return '<button type="button" class="chip" data-p="' + p + '">' + M(String(p)) + '</button>'; }).join('') + '</div>';
      h += '<p class="legend" style="font-size:.92rem;color:var(--ink)">' + (msg || 'یک عدد اول انتخاب کن که ' + M(String(cur)) + ' بر آن بخش‌پذیر باشد.') + '</p>';
    } else {
      h += '<div class="fb ok"><b>✓ درست تجزیه کردی!</b> تمام عامل‌های اولِ ' + M(String(n)) + ' پیدا شدند.</div>' + '<div class="ex" style="border-style:dashed">' + K.dm(n + '=' + fprod(n) + '=' + fexp(n)) + '</div>';
    }
    h += '<div class="opts n10-fact-actions"><button type="button" class="btn" data-nw="1">' + (done ? 'عدد بعدی' : 'عدد دیگر') + '</button>' + (steps.length && !done ? '<button type="button" class="btn" data-un="1">یک قدم عقب</button>' : '') + '</div>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) { return; }
    if (b.dataset.p) { var p = +b.dataset.p; if (cur % p === 0) { cur /= p; steps.push({ p: p, r: cur }); msg = ''; } else { msg = M(String(cur)) + ' بر ' + M(String(p)) + ' بخش‌پذیر نیست؛ عدد اول دیگری را امتحان کن.'; } paint(); }
    else if (b.dataset.nw) { nw(); paint(); } else if (b.dataset.un) { var st = steps.pop(); if (st) { cur *= st.p; } msg = ''; paint(); }
  }); nw(); paint();
};


/* ---- کاشی‌کاری: بزرگ‌ترین کاشی مربعی = ب.م.م ---- */
K.tileDemo = function (host) {
  var P = [[12, 18], [8, 12], [15, 20], [9, 12], [12, 16], [10, 15]], pi = 0, s = 3;
  function paint() {
    var a = P[pi][0], b = P[pi][1], g = gcd(a, b), unit = Math.min(300 / b, 200 / a), W = b * unit, H = a * unit, svg, i, j, fw = Math.floor(b / s) * s, fh = Math.floor(a / s) * s, ok = a % s === 0 && b % s === 0, h, opts = [];
    svg = '<svg viewBox="-4 -4 ' + (W + 8) + ' ' + (H + 8) + '" style="max-width:360px;width:100%" aria-hidden="true"><rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#fde7ef"/>';
    for (i = 0; i < Math.floor(a / s); i++) { for (j = 0; j < Math.floor(b / s); j++) { svg += '<rect x="' + j * s * unit + '" y="' + i * s * unit + '" width="' + s * unit + '" height="' + s * unit + '" fill="' + (ok ? '#bfe8e0' : '#ffe8a3') + '" stroke="#14213d" stroke-width="1.6"/>'; } }
    svg += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="none" stroke="#14213d" stroke-width="3"/></svg>';
    for (i = 1; i <= Math.min(a, b, 12); i++) { opts.push('<button type="button" class="chip' + (i === s ? ' on' : '') + (i === g ? ' star' : '') + '" data-s="' + i + '">' + fa(i) + '</button>'); }
    h = '<p class="ask" style="text-align:center">ابعاد زمین را انتخاب کن:</p><div class="chips">' + P.map(function (p, k) { return '<button type="button" class="chip' + (k === pi ? ' on' : '') + '" data-p="' + k + '"><span dir="ltr">' + fa(p[0]) + '×' + fa(p[1]) + '</span></button>'; }).join('') + '</div>';
    h += '<div class="figs one"><figure>' + svg + '<figcaption>زمین ' + fa(a) + ' در ' + fa(b) + '</figcaption></figure></div><p class="ask" style="text-align:center;margin-top:16px">ضلع کاشی مربعی را انتخاب کن:</p><div class="chips">' + opts.join('') + '</div>';
    h += '<div class="fb ' + (ok ? 'ok' : 'bad') + '">' + (ok
      ? '✓ درست است؛ کاشی ' + M(s + '\\times' + s) + ' زمین را کامل می‌پوشاند. تعداد کاشی‌ها: ' + M(String(a / s * (b / s))) + '.' + (s === g ? ' این بزرگ‌ترین کاشیِ ممکن است و ضلع آن ' + M(String(g)) + ' (ب.م.م ' + M(String(a)) + ' و ' + M(String(b)) + ') است.' : ' اما کاشی بزرگ‌تری هم ممکن است؛ کاشی ' + M(g + '\\times' + g) + ' نیز جا می‌شود.')
      : 'کاشی ' + M(s + '\\times' + s) + ' بدون برش جا نمی‌شود؛ ' + (a % s ? M(String(a % s)) + ' واحد از طول ' : '') + (b % s ? M(String(b % s)) + ' واحد از عرض ' : '') + 'باقی می‌ماند (قسمت صورتی).') + '</div>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) { var c = e.target.closest('.chip'); if (!c) { return; } if (c.dataset.p !== undefined) { pi = +c.dataset.p; s = Math.min(s, Math.min(P[pi][0], P[pi][1], 12)); } else { s = +c.dataset.s; } paint(); });
  paint();
};

/* ---- چراغ‌های چشمک‌زن: اولین هم‌زمانی = ک.م.م ---- */
K.lightsDemo = function (host) {
  var P = [[4, 6], [6, 9], [8, 12], [3, 5], [6, 8], [10, 15]], pi = 0;
  function paint() {
    var p = P[pi][0], q = P[pi][1], l = lcm(p, q), T = Math.max(36, l * 2), x = function (t) { return 18 + t / T * 324; }, svg, t, com = [], h;
    svg = '<svg viewBox="0 0 360 120" style="width:100%;max-width:400px" aria-hidden="true"><line x1="10" y1="92" x2="352" y2="92" stroke="#14213d" stroke-width="2.5"/>';
    for (t = 0; t <= T; t++) { if (t % Math.max(1, Math.round(T / 12)) === 0) { svg += '<line x1="' + x(t) + '" y1="88" x2="' + x(t) + '" y2="96" stroke="#14213d" stroke-width="2"/><text x="' + x(t) + '" y="110" text-anchor="middle" font-size="10" font-family="Tahoma" fill="#14213d">' + fa(t) + '</text>'; } }
    for (t = p; t <= T; t += p) { svg += '<circle cx="' + x(t) + '" cy="32" r="6" fill="#0e8f7e" stroke="#14213d" stroke-width="2"/>'; }
    for (t = q; t <= T; t += q) { svg += '<circle cx="' + x(t) + '" cy="62" r="6" fill="#d6457a" stroke="#14213d" stroke-width="2"/>'; }
    for (t = l; t <= T; t += l) { com.push(t); svg += '<line x1="' + x(t) + '" y1="22" x2="' + x(t) + '" y2="92" stroke="#ffc233" stroke-width="5" stroke-opacity=".75"/><circle cx="' + x(t) + '" cy="32" r="6" fill="#0e8f7e" stroke="#14213d" stroke-width="2"/><circle cx="' + x(t) + '" cy="62" r="6" fill="#d6457a" stroke="#14213d" stroke-width="2"/>'; }
    svg += '</svg>';
    h = '<p class="ask" style="text-align:center">فاصلهٔ زمانی چشمک‌زدن دو چراغ را انتخاب کن:</p><div class="chips">' + P.map(function (c, k) { return '<button type="button" class="chip' + (k === pi ? ' on' : '') + '" data-p="' + k + '"><span dir="ltr">(' + fa(c[0]) + '، ' + fa(c[1]) + ')</span></button>'; }).join('') + '</div>';
    h += '<div class="figs one"><figure>' + svg + '<figcaption>ردیف بالا (سبز): هر ' + fa(p) + ' ثانیه. ردیف پایین (صورتی): هر ' + fa(q) + ' ثانیه. نوار زرد: هم‌زمانی.</figcaption></figure></div>';
    h += '<div class="fb ok">اولین هم‌زمانی در ثانیهٔ ' + fa(l) + ' است؛ بعد از آن در ' + com.slice(1, 3).map(fa).join(' و ') + '، یعنی مضرب‌های ' + fa(l) + '.</div>' + lv(p, q, l);
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) { var c = e.target.closest('.chip'); if (c) { pi = +c.dataset.p; paint(); } });
  paint();
};

/* ---- نردبان تقسیم: هر دو عدد را با هم بشکن ---- */
K.divLadder = function (host) {
  var a, b, rows, used, msg;
  function nw() { var p = genPair(); do { p = genPair(); } while (p[0] > 90 || p[1] > 90 || gcd(p[0], p[1]) < 4); a = p[0]; b = p[1]; rows = []; used = []; msg = ''; }
  function cur() { return rows.length ? rows[rows.length - 1] : [a, b]; }
  function paint() {
    var c = cur(), done = gcd(c[0], c[1]) === 1, h = '<p class="ask">یک عدد اول انتخاب کن که هر دو عدد بر آن بخش‌پذیر باشند. سپس هر دو را بر آن تقسیم کن.</p><div class="dv"><span class="p"></span><span class="vl"></span><span class="nn"><span>' + fa(a) + '</span><span>' + fa(b) + '</span></span>', g = 1, i;
    rows.forEach(function (r, k) { g *= used[k]; h += '<span class="ln"></span><span class="p">' + fa(used[k]) + '</span><span class="vl"></span><span class="nn"><span>' + fa(r[0]) + '</span><span>' + fa(r[1]) + '</span></span>'; });
    h += '</div>';
    if (!done) { h += '<div class="pk">' + PR.slice(0, 6).map(function (p) { return '<button type="button" class="chip" data-p="' + p + '">' + fa(p) + '</button>'; }).join('') + '</div><p class="legend" style="font-size:.92rem;color:var(--ink)">' + (msg || 'عددهای ردیف آخر: ' + M(c[0] + ',\\ ' + c[1])) + '</p>'; }
    else {
      var redFactors = used.length ? used.map(function (x) { return M('\\color{crimson}{' + x + '}'); }).join(' و ') : M('1');
      h += '<div class="fb ok">✓ <b>درست انجام دادی!</b> دو عدد ردیف آخر دیگر عامل مشترکی ندارند.</div>';
      h += '<div class="ex n10-ladder-explanation">';
      h += '<p>ب.م.م برابر حاصل‌ضرب عددهای اولِ ستون کناری (یعنی ' + redFactors + ') است؛ لذا:</p>' + gv(a, b, g);
      h += '<p>ک.م.م را هم با ضرب‌کردنِ آن در دو عدد ردیف آخر (یعنی ' + M(String(c[0])) + ' و ' + M(String(c[1])) + ') می‌گیریم:</p>' + lv(a, b, g * c[0] * c[1]);
      h += '</div>';
    }
    h += '<div class="opts n10-ladder-actions"><button type="button" class="btn" data-nw="1">' + (done ? 'دو عدد بعدی' : 'دو عدد دیگر') + '</button>' + (rows.length && !done ? '<button type="button" class="btn" data-un="1">یک قدم عقب</button>' : '') + '</div>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) {
    var b2 = e.target.closest('button'); if (!b2) { return; }
    if (b2.dataset.p) {
      var p = +b2.dataset.p, c = cur();
      if (c[0] % p === 0 && c[1] % p === 0) { rows.push([c[0] / p, c[1] / p]); used.push(p); msg = ''; }
      else if (c[0] % p === 0 || c[1] % p === 0) { msg = M(String(p)) + ' فقط یکی از دو عدد را می‌شمارد؛ در این روش باید هر دو را بشمارد.'; }
      else { msg = M(String(p)) + ' هیچ‌کدام را نمی‌شمارد.'; }
      paint();
    } else if (b2.dataset.nw) { nw(); paint(); } else if (b2.dataset.un) { rows.pop(); used.pop(); msg = ''; paint(); }
  }); nw(); paint();
};
/* ================= تولید سؤال و توضیح ================= */
var minE = function (a, b) { var A = pfm(a), B = pfm(b), o = [], g = 1; Object.keys(A).map(Number).sort(function (x, y) { return x - y; }).forEach(function (p) { if (B[p]) { var e = Math.min(A[p], B[p]); o.push(e > 1 ? p + '^{' + e + '}' : String(p)); g *= Math.pow(p, e); } }); return { t: o.join('\\times') || '1', v: g }; };
var maxE = function (a, b) { var A = pfm(a), B = pfm(b), ps = {}, o = [], l = 1; Object.keys(A).concat(Object.keys(B)).forEach(function (p) { ps[p] = 1; }); Object.keys(ps).map(Number).sort(function (x, y) { return x - y; }).forEach(function (p) { var e = Math.max(A[p] || 0, B[p] || 0); o.push(e > 1 ? p + '^{' + e + '}' : String(p)); l *= Math.pow(p, e); }); return { t: o.join('\\times'), v: l }; };
function exGcd(a, b) {
  var m = minE(a, b);
  return '<p>هر دو عدد را به عامل‌های اول می‌شکنیم:</p>' + AL([a + '&=' + fexp(a), b + '&=' + fexp(b)]) + '<p>از هر عاملِ مشترک، توانِ کوچک‌تر را برمی‌داریم:</p>' + K.dm(m.t + '=' + m.v) + gv(a, b, m.v);
}
function exLcm(a, b) {
  var m = maxE(a, b), g = gcd(a, b);
  return '<p>هر دو عدد را به عامل‌های اول می‌شکنیم:</p>' + AL([a + '&=' + fexp(a), b + '&=' + fexp(b)]) + '<p>از هر عامل (مشترک یا غیرمشترک)، توانِ بزرگ‌تر را برمی‌داریم:</p>' + K.dm(m.t + '=' + m.v) + '<p>برای وارسی: حاصل‌ضرب دو عدد برابر حاصل‌ضرب ب.م.م و ک.م.م آن‌هاست، پس ک.م.م = حاصل‌ضرب ÷ ب.م.م:</p>' + K.dm('\\dfrac{' + a + '\\times' + b + '}{' + g + '}=' + a * b / g) + lv(a, b, m.v);
}
function mk(cand, pick) {
  // Some generated distractors coincide with the correct answer or each other.
  // Always return exactly four distinct numerical choices.
  var valid = [], seen = {}, correct = cand[0].v, delta = 1;
  cand.forEach(function (z) { var key = String(z.v); if (!seen[key]) { seen[key] = true; valid.push(z); } });
  while (valid.length < 4) {
    var candidate = Number(correct) + delta;
    if (candidate > 0 && !seen[String(candidate)]) {
      seen[String(candidate)] = true;
      valid.push({ v: candidate, m: 'این مقدار پاسخ درست نیست؛ شرط مسئله را دوباره بررسی کن.' });
    }
    delta++;
  }
  return shuffle([valid[0]].concat(shuffle(valid.slice(1)).slice(0, 3)).map(function (z) {
    return { h: M(String(z.v)), ok: !!z.ok, m: z.m || 'این گزینه درست نیست.' };
  }));
}
function genS1() {
  var t = R(0, 2), k, c, o, n, i, d;
  if (t === 0) {
    k = [3, 4, 6, 7, 8, 9][R(0, 5)]; c = k * R(3, 9);
    return { ask: 'کدام عدد مضرب ' + fa(k) + ' است؟', cq: '', opts: mk(uniq([{ v: c, ok: 1 }, { v: c + 1 }, { v: c - 1 }, { v: c + 2 }, { v: c - 2 }].map(function (z) { z.m = z.ok ? '' : 'این عدد مضرب ' + fa(k) + ' نیست؛ باقی‌ماندهٔ تقسیمش بر ' + fa(k) + ' صفر نمی‌شود.'; return z; })), 0), expl: function () { return '<p>مضرب‌های ' + M(String(k)) + ' از ضرب‌کردن آن در ' + M('1,\\ 2,\\ 3,\\ \\ldots') + ' به دست می‌آیند:</p>' + K.dm(k + '\\times' + c / k + '=' + c); } };
  }
  if (t === 1) {
    var pr = [11, 13, 17, 19, 23, 29, 31, 37][R(0, 7)], cp = shuffle([21, 27, 33, 35, 39, 49, 51, 57, 63, 77, 91]).slice(0, 3);
    return { ask: 'کدام عدد اول است؟', cq: '', opts: shuffle([{ h: M(String(pr)), ok: true, m: '' }].concat(cp.map(function (x) { d = pf(x)[0]; return { h: M(String(x)), ok: false, m: M(String(x)) + ' بر ' + M(String(d)) + ' بخش‌پذیر است؛ پس اول نیست.' }; }))), expl: function () { return '<p>عدد اول فقط دو مقسوم‌علیه دارد: ' + M('1') + ' و خودش. ' + M(String(pr)) + ' بر هیچ عدد اولِ کوچک‌تر از ' + M('\\sqrt{' + pr + '}') + ' بخش‌پذیر نیست؛ پس اول است.</p>' + K.dm(pr + '=1\\times' + pr); } };
  }
  n = [24, 36, 48, 60, 72][R(0, 4)]; var dv = divs(n), nd = []; for (i = 2; i < n; i++) { if (n % i) { nd.push(i); } }
  var bad = nd[R(0, nd.length - 1)];
  return { ask: 'کدام عدد مقسوم‌علیه ' + fa(n) + ' نیست؟', cq: '', opts: shuffle([{ h: M(String(bad)), ok: true, m: '' }].concat(shuffle(dv.filter(function (x) { return x > 1 && x < n; })).slice(0, 3).map(function (x) { return { h: M(String(x)), ok: false, m: M(String(x)) + ' مقسوم‌علیه ' + M(String(n)) + ' است: ' + M(String(n) + '\\div' + x + '=' + n / x) + '.' }; }))), expl: function () { return '<p>مقسوم‌علیه‌های ' + M(String(n)) + ':</p>' + K.dm(dv.join(',\\ ')) + '<p>' + M(String(bad)) + ' در این فهرست نیست.</p>'; } };
}
function genS2() { var p = genPair(true), a = p[0], b = p[1], g = gcd(a, b), l = lcm(a, b), sd = pf(g)[0], c = uniq([{ v: g, ok: 1 }, { v: l, m: 'این ک.م.م است؛ ب.م.م باید دو عدد را بشمارد و از هر دو کوچک‌تر (یا مساوی) باشد.' }, { v: g / sd, m: 'این یک شمارندهٔ مشترک است، اما بزرگ‌ترین نیست.' }, { v: Math.min(a, b), m: 'باید هر دو عدد را بشمارد.' }, { v: g * 2, m: M(String(g * 2)) + ' هر دو عدد را نمی‌شمارد.' }].filter(function (z) { return z.v >= 1; })); return { a: a, b: b, ask: 'ب.م.م دو عدد زیر چند است؟', cq: M('(' + a + ',\\,' + b + ')'), opts: mk(c), expl: function () { return exGcd(a, b); } }; }
function genS3() { var p = genPair(true), a = p[0], b = p[1], g = gcd(a, b), l = lcm(a, b), c = uniq([{ v: l, ok: 1 }, { v: a * b, m: 'حاصل‌ضرب همیشه کوچک‌ترین مضرب مشترک نیست؛ ب.م.م این دو عدد ' + fa(g) + ' است و باید بر آن تقسیم شود.' }, { v: g, m: 'این ب.م.م است؛ ک.م.م باید مضرب هر دو عدد باشد.' }, { v: Math.max(a, b), m: 'باید مضرب هر دو عدد باشد.' }, { v: l + Math.max(a, b), m: 'این یک مضرب مشترک است، اما کوچک‌ترین نیست.' }]); return { a: a, b: b, ask: 'ک.م.م دو عدد زیر چند است؟', cq: M('[' + a + ',\\,' + b + ']'), opts: mk(c), expl: function () { return exLcm(a, b); } }; }
function genS4() {
  var p = genPair(), b = p[0], d = p[1], n1, n2, l, g, cand, k1, k2, h;
  b = Math.min(b, 36); d = Math.min(d, 36); if (b === d) { d = b + 2; }
  do { n1 = R(1, b - 1); } while (gcd(n1, b) !== 1); do { n2 = R(1, d - 1); } while (gcd(n2, d) !== 1);
  l = lcm(b, d); g = gcd(b, d); k1 = l / b; k2 = l / d;
  cand = uniq([{ v: l, ok: 1 }, { v: b * d, m: 'این هم یک مخرج مشترک است و کار می‌کند، اما کوچک‌ترین نیست؛ محاسبه‌ها را بزرگ می‌کند.' }, { v: g, m: 'این ب.م.م مخرج‌هاست؛ مخرج مشترک باید مضرب هر دو مخرج باشد.' }, { v: Math.max(b, d), m: 'این عدد مضرب مخرجِ دیگر نیست.' }]);
  return {
    ask: 'کوچک‌ترین مخرج مشترکِ این دو کسر چند است؟', cq: M('\\dfrac{' + n1 + '}{' + b + '}') + ' و ' + M('\\dfrac{' + n2 + '}{' + d + '}'), opts: mk(cand),
    expl: function () { var cc = function (n, dd, k) { var c = '{\\color{crimson}\\scriptsize\\times' + k + '}'; return '\\dfrac{' + n + c + '}{' + dd + c + '}'; }; return '<p>ک.م.م دو مخرج را می‌گیریم:</p>' + lv(b, d, l) + '<p>هر کسر را طوری بزرگ می‌کنیم که مخرجش ' + M(String(l)) + ' شود:</p>' + AL([cc(n1, b, k1) + '&=\\dfrac{' + n1 * k1 + '}{' + l + '}', cc(n2, d, k2) + '&=\\dfrac{' + n2 * k2 + '}{' + l + '}']) + (l <= 24 ? bars([n1, b], [n2, d]) : ''); }
  };
}
var G = [genS1, genS2, genS3, genS4];

/* ---- تمرین مرحله‌ای ---- */
K.gcmSteps = function (host) {
  var ST = ['مضرب و مقسوم‌علیه', 'ب.م.م', 'ک.م.م', 'مخرج مشترک'], si = 0, ok = 0, asked = 0, q, pick = null, fin = false;
  function nw() { q = G[si](); pick = null; }
  function paint() {
    var h = '<div class="stg n10-progress">' + ST.map(function (s, i) { return '<span class="' + (i < si || fin ? 'dn' : i === si ? 'cu' : '') + '">' + (i < si || fin ? '✓ ' : '') + s + '</span>'; }).join('') + '</div>', oh = '', o;
    if (fin) { host.innerHTML = rr(h + '<div class="fb ok"><b>همهٔ مرحله‌ها را گذراندی!</b> حالا برو سراغ تله‌ها.</div><div class="opts"><button type="button" class="btn" data-r="1">از اول، با عددهای جدید</button></div>'); return; }
    h += '<p class="stage-progress-meta">مرحلهٔ ' + fa(si + 1) + ' — پاسخ‌های درست: ' + fa(ok) + ' از ۲</p><p class="ask" style="font-weight:normal">' + q.ask + '</p>' + (q.cq ? '<div class="cq">' + q.cq + '</div>' : '') + '<div class="mc m2" id="gm"></div>';
    q.opts.forEach(function (op, k) { var c = pick === null ? '' : op.ok ? ' right' : k === pick ? ' wrong' : ''; oh += '<button type="button" class="btn opt' + c + '" data-o="' + k + '"' + (pick === null ? '' : ' disabled') + '>' + op.h + '</button>'; });
    if (pick !== null) { o = q.opts[pick]; h += '<div class="fb ' + (o.ok ? 'ok' : 'bad') + '">' + (o.ok ? '✓ درست است!' : o.m) + '</div><div class="ex">' + q.expl() + '</div><div class="opts"><button type="button" class="btn primary" data-n="1">' + (asked >= 2 ? (si === 3 ? 'پایان' : 'مرحلهٔ بعد') : 'سؤال بعدی') + '</button></div>'; }
    host.innerHTML = rr(h); host.querySelector('#gm').innerHTML = rr(oh);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.o !== undefined) { pick = +b.dataset.o; asked++; if (q.opts[pick].ok) { ok++; } paint(); }
    else if (b.dataset.n) { if (asked >= 2) { ok = 0; asked = 0; si++; if (si > 3) { fin = true; paint(); return; } } nw(); paint(); }
    else if (b.dataset.r) { si = 0; ok = 0; asked = 0; fin = false; nw(); paint(); }
  }); nw(); paint();
};

/* ---- درست یا نادرست؟ ---- */
var TF = [
  { h: 'ب.م.م ' + M('12') + ' و ' + M('18') + ' برابر ' + M('6') + ' است.', ok: 1, e: '<p>' + M('12=2^2\\times3') + ' و ' + M('18=2\\times3^2') + '؛ عاملِ مشترک با کمترین توان ' + M('2\\times3=6') + '.</p>' },
  { h: 'ک.م.م ' + M('6') + ' و ' + M('10') + ' برابر ' + M('60') + ' است.', ok: 0, e: '<p>' + M('60=6\\times10') + ' یک مضرب مشترک است، اما کوچک‌ترین نیست: ' + M('30') + ' هم مضرب ' + M('6') + ' است و هم مضرب ' + M('10') + '.</p>' },
  { h: 'ک.م.م دو عدد همیشه برابر حاصل‌ضرب آن دو است.', ok: 0, e: '<p>فقط وقتی که ب.م.م آن‌ها ' + M('1') + ' باشد. مثلاً ' + M('[4,\\,6]=12') + ' است، نه ' + M('24') + '.</p>' },
  { h: 'حاصل‌ضرب دو عدد برابر حاصل‌ضرب ب.م.م و ک.م.م آن‌هاست.', ok: 1, e: '<p>' + M('12\\times18=216') + ' و ' + M('6\\times36=216') + '.</p>' },
  { h: 'ب.م.م دو عدد از هر دوی آن‌ها بزرگ‌تر است.', ok: 0, e: '<p>ب.م.م باید هر دو را بشمارد؛ پس از هر دو کوچک‌تر یا مساوی است.</p>' },
  { h: 'ک.م.م دو عدد از هر دوی آن‌ها کوچک‌تر است.', ok: 0, e: '<p>ک.م.م مضرب هر دو است؛ پس از هر دو بزرگ‌تر یا مساوی است.</p>' },
  { h: 'اگر یک عدد مضرب عدد دیگر باشد، ک.م.م آن‌ها همان عدد بزرگ‌تر است.', ok: 1, e: '<p>مثلاً ' + M('[6,\\,18]=18') + '؛ چون ' + M('18') + ' مضرب ' + M('6') + ' است.</p>' },
  { h: 'ب.م.م ' + M('8') + ' و ' + M('15') + ' برابر ' + M('1') + ' است.', ok: 1, e: '<p>' + M('8=2^3') + ' و ' + M('15=3\\times5') + ' عامل مشترک ندارند.</p>' },
  { h: 'عدد ' + M('1') + ' عددی اول است.', ok: 0, e: '<p>عدد اول دو مقسوم‌علیهٔ متفاوت دارد؛ ' + M('1') + ' فقط یکی دارد.</p>' },
  { h: 'عدد ' + M('2') + ' تنها عدد اولِ زوج است.', ok: 1, e: '<p>هر عدد زوجِ دیگر بر ' + M('2') + ' بخش‌پذیر است و اول نیست.</p>' },
  { h: 'تجزیهٔ ' + M('36') + ' برابر ' + M('2\\times18') + ' است.', ok: 0, e: '<p>' + M('18') + ' اول نیست. تجزیهٔ درست: ' + M('36=2^2\\times3^2') + '.</p>' },
  { h: 'کسر ' + M('\\dfrac{18}{24}') + ' با تقسیم صورت و مخرج بر ' + M('6') + ' به ' + M('\\dfrac{3}{4}') + ' ساده می‌شود.', ok: 1, e: '<p>ب.م.م ' + M('18') + ' و ' + M('24') + ' برابر ' + M('6') + ' است.</p>' },
  { h: 'برای هم‌مخرج‌کردن ' + M('\\dfrac{1}{4}') + ' و ' + M('\\dfrac{1}{6}') + ' فقط ' + M('24') + ' می‌تواند مخرج مشترک باشد.', ok: 0, e: '<p>' + M('24') + ' کار می‌کند، اما ' + M('12') + ' کوچک‌ترین مخرج مشترک است.</p>' },
  { h: 'ب.م.م ' + M('24') + ' و ' + M('36') + ' برابر ' + M('12') + ' و ک.م.م‌شان ' + M('72') + ' است.', ok: 1, e: '<p>' + M('12\\times72=864=24\\times36') + '.</p>' }
];
K.tfGcm = function (host) {
  var L, i, ans, sc, answers;
  function nw() { L = shuffle(TF.slice()).slice(0, 6); i = 0; ans = null; sc = 0; answers = Array(L.length).fill(null); }
  function paint() {
    var h, q;
    if (i >= L.length) { host.innerHTML = rr('<div class="fb ' + (sc >= 5 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(sc) + ' از ' + fa(L.length) + '</b><br>' + (sc === L.length ? 'عالی! از هیچ تله‌ای رد نشدی.' : 'یادت باشد: ب.م.م کوچک‌تر یا مساوی و ک.م.م بزرگ‌تر یا مساوی هر دو عدد است.') + '</div><div class="opts"><button type="button" class="btn n10-restart" data-r="1">دوباره با جمله‌های جدید</button></div>'); return; }
    q = L[i]; ans = answers[i];
    h = '<div class="stg n10-progress">' + L.map(function (x, k) { return '<span class="' + (answers[k] !== null ? (answers[k] === x.ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">این جمله درست است؟</p><div class="cq" style="font-size:1rem"><span class="snt">' + q.h + '</span></div><div class="sgnrow"><button type="button" class="btn' + (ans === null ? '' : q.ok === 1 ? ' right' : ans === 1 ? ' wrong' : '') + '" data-a="1"' + (ans === null ? '' : ' disabled') + '>درست</button><button type="button" class="btn' + (ans === null ? '' : q.ok === 0 ? ' right' : ans === 0 ? ' wrong' : '') + '" data-a="0"' + (ans === null ? '' : ' disabled') + '>نادرست</button></div>';
    if (ans !== null) { h += '<div class="fb ' + (ans === q.ok ? 'ok' : 'bad') + '">' + (ans === q.ok ? '✓ درست است!' : 'اشتباه بود؛ توضیح:') + '</div><div class="ex n10-explain">' + q.e + '</div>'; }
    h += '<div class="opts n10-tf-nav"><button type="button" class="btn" data-p="1"' + (i === 0 ? ' disabled' : '') + '>سؤال قبلی</button><button type="button" class="btn primary" data-n="1"' + (ans === null ? ' disabled' : '') + '>' + (i === L.length - 1 ? 'مشاهدهٔ نتیجه':'سؤال بعدی') + '</button></div>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.a !== undefined && answers[i] === null) { ans = +b.dataset.a; answers[i] = ans; if (ans === L[i].ok) { sc++; } paint(); } else if (b.dataset.n) { i++; paint(); } else if (b.dataset.p) { i = Math.max(0, i - 1); paint(); } else if (b.dataset.r) { nw(); paint(); }
  }); nw(); paint();
};

/* ---- تمرین پایانی ---- */
function qSimp() {
  var g = [4, 6, 8, 9, 10, 12][R(0, 5)], r, s, a, b, ps, p, cand;
  do { r = R(1, 8); s = R(2, 9); } while (gcd(r, s) !== 1 || r >= s);
  a = g * r; b = g * s; ps = pf(g); p = ps[0];
  cand = uniq([{ v: r + '/' + s, ok: 1, t: '\\dfrac{' + r + '}{' + s + '}' }, { v: (a / p) + '/' + (b / p), m: 'هنوز می‌شود ساده‌ترش کرد؛ باید بر ب.م.م (' + fa(g) + ') تقسیم کنی.', t: '\\dfrac{' + a / p + '}{' + b / p + '}' }, { v: r + '/' + b, m: 'صورت و مخرج را باید بر یک عدد تقسیم کنی، نه فقط صورت را.', t: '\\dfrac{' + r + '}{' + b + '}' }, { v: a + '/' + s, m: 'صورت و مخرج را باید بر یک عدد تقسیم کنی، نه فقط مخرج را.', t: '\\dfrac{' + a + '}{' + s + '}' }]);
  if (g === p) { cand = cand.filter(function (z) { return z.v !== (a / p) + '/' + (b / p) || z.ok; }); }
  return { ask: 'کسر ' + M('\\dfrac{' + a + '}{' + b + '}') + ' را کاملاً ساده کن:', cls: 'm2', cq: '', opts: shuffle(cand.slice(0, 4).map(function (z) { return { h: M(z.t), ok: !!z.ok, m: z.m || '' }; })), expl: function () { return exGcd(a, b) + '<p>صورت و مخرج را بر ' + M(String(g)) + ' تقسیم می‌کنیم:</p>' + K.dm('\\dfrac{' + a + '{\\color{crimson}\\div' + g + '}}{' + b + '{\\color{crimson}\\div' + g + '}}=\\dfrac{' + r + '}{' + s + '}'); } };
}
function qWord() {
  var p = genPair(), a = p[0], b = p[1], g = gcd(a, b), l = lcm(a, b), lights = Math.random() < 0.5, cand;
  if (lights) { cand = uniq([{ v: l, ok: 1 }, { v: g, m: 'دنبال اولین زمانی هستیم که هر دو هم‌زمان بزنند؛ باید مضرب مشترک بگیری، نه شمارندهٔ مشترک.' }, { v: a * b, m: 'این عدد درست است که یک زمان هم‌زمانی است، اما اولین نیست؛ ک.م.م کوچک‌تر است.' }, { v: a + b, m: 'جمع دو زمان معنایی ندارد؛ باید ک.م.م را بگیری.' }]); return { ask: 'دو چراغ هر ' + fa(a) + ' و هر ' + fa(b) + ' ثانیه یک‌بار چشمک می‌زنند و همین حالا با هم زده‌اند. بعد از چند ثانیه دوباره هم‌زمان می‌زنند؟', cls: 'm2', cq: '', opts: mk(cand, 0), expl: function () { return exLcm(a, b); } }; }
  cand = uniq([{ v: g, ok: 1 }, { v: l, m: 'کاشی نمی‌تواند از خودِ زمین بزرگ‌تر باشد؛ باید ب.م.م را بگیری.' }, { v: Math.min(a, b), m: 'این عدد ضلعِ دیگر را نمی‌شمارد و کاشی دقیقاً جا نمی‌شود.' }, { v: g / pf(g)[0], m: 'این کاشی هم جا می‌شود، اما بزرگ‌ترین نیست.' }].filter(function (z) { return z.v >= 1; }));
  return { ask: 'زمینی ' + fa(a) + ' در ' + fa(b) + ' متر را می‌خواهیم با کاشی‌های مربعی هم‌اندازه، بدون برش، فرش کنیم. ضلع بزرگ‌ترین کاشیِ ممکن چند متر است؟', cls: 'm2', cq: '', opts: mk(cand, 0), expl: function () { return exGcd(a, b); } };
}
K.gcmFinal = function (host) {
  var qs, i, ans;
  function mkq(g) {
    var q = g(), ask = q.ask;
    if (q.cq) {
      if (ask.indexOf('دو عدد زیر') >= 0) {
        ask = ask.replace('دو عدد زیر', 'دو عدد ' + q.cq);
      } else if (ask.indexOf('این دو کسر') >= 0) {
        ask = ask.replace('این دو کسر', 'دو کسر ' + q.cq);
      } else {
        ask += ' ' + q.cq;
      }
    }
    return { ask: ask, cls: 'm2', cq: '', opts: q.opts, expl: q.expl };
  }
  function build() { qs = [mkq(genS2), mkq(genS3), qSimp(), mkq(genS4), qWord()]; i = 0; ans = []; }
  var fb = function (ok, html) { return '<div class="fb ' + (ok ? 'ok' : 'bad') + '">' + html + '</div>'; };
  function paint() {
    var q = qs[i], a = ans[i], h, oh = '', s, o;
    if (i === 5) {
      s = ans.filter(function (x, k) { return qs[k].opts[x].ok; }).length;
      host.innerHTML = rr('<div class="fb ' + (s >= 4 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(s) + ' از ۵</b><br>' + (s === 5 ? 'عالی بود! ب.م.م و ک.م.م را کاملاً فهمیده‌ای.' : s >= 3 ? 'خوب بود. بخش‌هایی را که اشتباه کردی دوباره مرور کن.' : 'یک بار دیگر درس را مرور کن؛ بعد با عددهای جدید امتحان کن.') + '</div><div class="opts end-actions"><button type="button" class="btn" data-pv="1">مرور سؤال‌ها</button><button type="button" class="btn n10-restart" data-r="1">سؤال‌های جدید</button></div>'); return;
    }
    h = '<div class="stg n10-progress">' + qs.map(function (x, k) { return '<span class="' + (ans[k] !== undefined ? (qs[k].opts[ans[k]].ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">' + q.ask + '</p>' + (q.cq ? '<div class="cq">' + q.cq + '</div>' : '') + '<div class="mc ' + q.cls + '" id="mcx"></div>';
    q.opts.forEach(function (op, k) { oh += '<button type="button" class="btn opt' + (a !== undefined ? (op.ok ? ' right' : k === a ? ' wrong' : '') : '') + '" data-o="' + k + '"' + (a !== undefined ? ' disabled' : '') + '>' + op.h + '</button>'; });
    if (a !== undefined) { o = q.opts[a]; h += fb(o.ok, o.ok ? '✓ درست است!' : (o.m || 'این گزینه درست نیست.')) + '<div class="ex n10-explain">' + q.expl() + '</div>'; }
    h += '<div class="opts n10-final-nav"><button type="button" class="btn" data-p="1"' + (i ? '' : ' disabled') + '>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (a === undefined ? ' disabled' : '') + '>' + (i === 4 ? 'مشاهدهٔ نتیجه':'سؤال بعدی') + '</button></div>';
    host.innerHTML = rr(h); host.querySelector('#mcx').innerHTML = rr(oh);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.o !== undefined && ans[i] === undefined) { ans[i] = +b.dataset.o; paint(); } else if (b.dataset.nx) { i++; paint(); } else if (b.dataset.p) { i--; paint(); } else if (b.dataset.pv) { i = 0; paint(); } else if (b.dataset.r) { build(); paint(); }
  }); build(); paint();
};
var cards2 = function (cells) { return '<div class="sg">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + (c.e ? K.dm(c.e) : '') + '</div>'; }).join('') + '</div>'; };
var refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };
var primeChips = function () { return '<div class="nleq wrap sm">' + PR.map(function (p) { return '<i class="n">$' + p + '$</i>'; }).join('') + '</div>'; };

return {
  html: function () {
    var T = String.raw;
    return [
      K.sn('۱', 'مضرب‌ها، مقسوم‌علیه‌ها و عددهای اول'),
      '<p>این درس با دو واژه شروع می‌شود. هر دو را دقیق بشناس؛ بقیهٔ درس روی آن‌ها سوار است:</p>',
      cards2([{ c: 'p', t: 'مضرب', r: 'عدد را در ۱، ۲، ۳، … ضرب می‌کنیم.', e: '6,\\ 12,\\ 18,\\ 24,\\ \\ldots' }, { c: 'n', t: 'مقسوم‌علیه (شمارنده)', r: 'عددهایی که بدون باقی‌مانده بر آن بخش می‌شوند.', e: '1,\\ 2,\\ 3,\\ 4,\\ 6,\\ 12' }]),
      '<p>سمت راست، چند مضربِ ' + M('6') + ' است و سمت چپ همهٔ مقسوم‌علیه‌های ' + M('12') + '. برای پیداکردن مقسوم‌علیه‌ها، جفت‌جفت فکر کن: هر ضربی که ' + M('12') + ' بدهد، دو مقسوم‌علیه می‌دهد:</p>', K.dm('12=1\\times12=2\\times6=3\\times4'),
      '<h4>قاعده‌های سریع بخش‌پذیری</h4><p>برای اینکه نیازی به تقسیم‌کردنِ کامل نباشد:</p>',
      refs([{ c: 'r1', t: 'بخش‌پذیری بر ۲', r: 'رقم یکان زوج باشد.', e: '138\\to8' }, { c: 'r2', t: 'بخش‌پذیری بر ۳', r: 'جمع رقم‌ها بر ۳ بخش‌پذیر باشد.', e: '1+3+8=12' }, { c: 'r3', t: 'بخش‌پذیری بر ۵', r: 'رقم یکان ۰ یا ۵ باشد.', e: '745\\to5' }, { c: 'r4', t: 'بخش‌پذیری بر ۹', r: 'جمع رقم‌ها بر ۹ بخش‌پذیر باشد.', e: '4+5+9=18' }, { c: 'r1', t: 'بخش‌پذیری بر ۴', r: 'دو رقم آخر بر ۴ بخش‌پذیر باشد.', e: '316\\to16=4\\times4' }, { c: 'r3', t: 'بخش‌پذیری بر ۱۰', r: 'رقم یکان ۰ باشد.', e: '380\\to0' }]),
      '<h4>عدد اول</h4><p>عدد اول، عددی بزرگ‌تر از ' + M('1') + ' است که فقط دو مقسوم‌علیه دارد: ' + M('1') + ' و خودش. اولین عددهای اول:</p>', primeChips(),
      K.box('note', 'دو نکته', T`<ul><li>عدد $1$ اول نیست؛ فقط یک مقسوم‌علیه دارد.</li><li>$2$ تنها عدد اولِ زوج است.</li></ul>`),

      K.sn('۲', 'تجزیه به عامل‌های اول'),
      '<p>هر عدد بزرگ‌تر از ' + M('1') + ' را می‌توان به صورت حاصل‌ضرب عددهای اول نوشت، و این نوشتن (جدا از ترتیب) یکتاست. برای تجزیه، عدد را به‌ترتیب بر کوچک‌ترین عددهای اولِ ممکن تقسیم می‌کنیم تا به ' + M('1') + ' برسیم:</p>',
      AL(['36\\div{\\color{red}{2}}&=18', '18\\div{\\color{blue}{2}}&=9', '9\\div{\\color{green}{3}}&=3', '3\\div{\\color{purple}{3}}&=1']), '<p>پس:</p>', K.dm('36={\\color{red}{2}}\\times{\\color{blue}{2}}\\times{\\color{green}{3}}\\times{\\color{purple}{3}}=2^2\\times3^2'),
      '<p>توان یعنی تعداد دفعاتی که یک عامل تکرار شده. یک مثال بزرگ‌تر:</p>', K.dm('180=2\\times2\\times3\\times3\\times5=2^2\\times3^2\\times5'),
      '<p>خودت امتحان کن. عددها را با تقسیم بر عددهای اول بشکن:</p><div class="cover" id="ft" style="animation:none"></div>',

      K.sn('۳', 'ب.م.م: بزرگ‌ترین شمارندهٔ مشترک'),
      '<p>می‌خواهیم زمینی به اندازهٔ ' + M('12') + ' متر در ' + M('18') + ' متر را با کاشی‌های مربعیِ هم‌اندازه و بدون برش فرش کنیم. کدام اندازه‌های کاشی مناسب‌اند؟ بزرگ‌ترین اندازهٔ ممکن کدام است؟</p><p>ابتدا همین زمین را بررسی کن. سپس با انتخاب ابعاد دیگر، ببین پاسخ چگونه تغییر می‌کند.</p><div class="cover" id="td" style="animation:none"></div>',
      K.box('note', 'تعریف', '<p><b>ب.م.م</b> (بزرگ‌ترین مقسوم‌علیه مشترک) دو عدد، بزرگ‌ترین عددی است که هر دو عدد را بشمارد؛ یعنی هر دو بر آن بخش‌پذیر باشند. آن را با ' + M('(a,\\,b)') + ' نشان می‌دهیم. در مثال کاشی، ' + M('(12,\\,18)=6') + ' است.</p>'),
      '<h4>روش اول: فهرست مقسوم‌علیه‌ها</h4><p>مقسوم‌علیه‌های هر عدد را می‌نویسیم و بزرگ‌ترین عضوِ مشترک را برمی‌داریم:</p>', AL(['12&:\\ 1,\\ 2,\\ 3,\\ 4,\\ 6,\\ 12', '18&:\\ 1,\\ 2,\\ 3,\\ 6,\\ 9,\\ 18']), '<p>مشترک‌ها ' + M('1,\\ 2,\\ 3,\\ 6') + ' هستند و بزرگ‌ترینشان ' + M('6') + ':</p>', gv(12, 18, 6),
      '<h4>روش دوم: تجزیهٔ عامل‌های اول</h4><p>هر دو عدد را تجزیه می‌کنیم و از هر عاملِ مشترک، توانِ <b>کوچک‌تر</b> را برمی‌داریم:</p>', AL(['12&=2^2\\times3^1', '18&=2^1\\times3^2']), K.dm('2^{1}\\times3^{1}=6'),
      '<p>این روش برای عددهای بزرگ بهتر از فهرست‌کردن است. مثلاً ' + M('(60,\\,84)') + ':</p>', AL(['60&=2^2\\times3^1\\times5^1', '84&=2^2\\times3^1\\times7^1']), K.dm('2^2\\times3=12'), gv(60, 84, 12),
      K.box('note', 'ویژگی‌های ب.م.م', T`<ul><li>ب.م.م از هر دو عدد کوچک‌تر یا مساوی است.</li><li>اگر یک عدد مضرب دیگری باشد، ب.م.م همان عدد کوچک‌تر است: $(6,\,18)=6$.</li><li>اگر ب.م.م دو عدد $1$ باشد، آن‌ها را «نسبت به هم اول» می‌نامیم: $(8,\,15)=1$.</li></ul>`),

      K.sn('۴', 'ک.م.م: کوچک‌ترین مضرب مشترک'),
      '<p>دو چراغ، یکی هر ' + M('4') + ' ثانیه و دیگری هر ' + M('6') + ' ثانیه یک‌بار چشمک می‌زنند و در ثانیهٔ صفر با هم روشن شده‌اند. کِی دوباره با هم می‌زنند؟ زمان‌ها را ببین (نوار زرد = هم‌زمانی):</p><p>ابتدا همین دو چراغ را بررسی کن. سپس با انتخاب زمان‌های دیگر، ببین اولین هم‌زمانی چگونه تغییر می‌کند.</p><div class="cover" id="lt" style="animation:none"></div>',
      K.box('note', 'تعریف', '<p><b>ک.م.م</b> (کوچک‌ترین مضرب مشترک) دو عدد، کوچک‌ترین عدد مثبتی است که مضرب هر دو باشد. آن را با ' + M('[a,\\,b]') + ' نشان می‌دهیم. در مثال چراغ‌ها ' + M('[4,\\,6]=12') + ' است.</p>'),
      '<h4>روش اول: فهرست مضرب‌ها</h4><p>مضرب‌های هر عدد را می‌نویسیم تا به اولین عضوِ مشترک برسیم:</p>', AL(['4&:\\ 4,\\ 8,\\ \\underline{12},\\ 16,\\ 20,\\ 24', '6&:\\ 6,\\ \\underline{12},\\ 18,\\ 24']), lv(4, 6, 12),
      '<h4>روش دوم: تجزیهٔ عامل‌های اول</h4><p>از هر عامل (چه مشترک و چه غیرمشترک)، توانِ <b>بزرگ‌تر</b> را برمی‌داریم:</p>', AL(['12&=2^2\\times3', '18&=2\\times3^2']), K.dm('2^2\\times3^2=36'), lv(12, 18, 36),
      '<h4>رابطهٔ ب.م.م و ک.م.م</h4><p>حاصل‌ضرب دو عدد برابر حاصل‌ضرب ب.م.م و ک.م.م آن‌هاست. پس با دانستنِ ب.م.م، ک.م.م را هم داریم:</p>', K.dm('(a,\\,b)\\times[a,\\,b]=a\\times b'), K.dm('[12,\\,18]=\\dfrac{12\\times18}{(12,\\,18)}=\\dfrac{216}{6}=36'),
      K.box('note', 'ویژگی‌های ک.م.م', T`<ul><li>ک.م.م از هر دو عدد بزرگ‌تر یا مساوی است.</li><li>اگر یک عدد مضرب دیگری باشد، ک.م.م همان عدد بزرگ‌تر است: $[6,\,18]=18$.</li><li>اگر دو عدد نسبت به هم اول باشند، ک.م.م برابر حاصل‌ضرب آن‌هاست: $[8,\,15]=120$. در حالت کلی این‌طور نیست: $[4,\,6]=12$ و $4\times6=24$.</li></ul>`),

      K.sn('۵', 'نردبان تقسیم: هر دو عدد با هم'),
      '<p>روش سوم هر دو را یک‌جا می‌دهد. هر دو عدد را کنار هم می‌نویسیم و هر بار بر یک عدد اولی که <b>هر دو</b> را بشمارد، تقسیم می‌کنیم؛ این‌قدر ادامه می‌دهیم تا دو عددِ آخر عامل مشترکی نداشته باشند:</p>',
      '<p>ب.م.م برابر حاصل‌ضرب عددهای اولِ ستون کناری است. ک.م.م را هم با ضرب‌کردنِ ب.م.م در دو عددِ باقی‌ماندهٔ ردیف آخر به دست می‌آوریم. خودت امتحان کن:</p><div class="cover" id="dl" style="animation:none"></div>',

      K.sn('۶', 'ب.م.م بزنم یا ک.م.م؟'),
      '<p>در مسئله‌های کلامی، واژه‌ها راهنمایت‌اند:</p>',
      cards2([{ c: 'p', t: 'ب.م.م', r: '«بزرگ‌ترین»، «حداکثر اندازه»، «تقسیم به تکه‌های مساوی و بزرگ»، «بدون برش». جواب از هر دو عدد کوچک‌تر یا مساوی است.', e: '(12,\\,18)=6' }, { c: 'n', t: 'ک.م.م', r: '«اولین بار هم‌زمان»، «دوباره با هم»، «کوچک‌ترین مضرب»، «مخرج مشترک». جواب از هر دو عدد بزرگ‌تر یا مساوی است.', e: '[4,\\,6]=12' }]),

      K.sn('۷', 'ساده‌کردن کسر با ب.م.م'),
      '<p>یک کسر وقتی «کاملاً ساده» است که صورت و مخرجش عامل مشترکی نداشته باشند، یعنی ب.م.م آن‌ها ' + M('1') + ' باشد. برای ساده‌کردن، صورت و مخرج را بر ب.م.م تقسیم می‌کنیم. مثلاً ' + M('\\dfrac{18}{24}') + ':</p>', K.dm('(18,\\,24)=6'), K.dm('\\dfrac{18{\\color{crimson}\\div6}}{24{\\color{crimson}\\div6}}=\\dfrac{3}{4}'),
      '<p>اگر بر عددی کوچک‌تر از ب.م.م تقسیم کنی هم درست است، اما باید دوباره ساده کنی. مثلاً ' + M('\\dfrac{45}{60}') + ' (ب.م.م ' + M('15') + ' است):</p>', K.dm('\\dfrac{45}{60}=\\dfrac{9}{12}=\\dfrac{3}{4}'), '<p>با تقسیم بر ' + M('15') + ' همان ' + M('\\dfrac{3}{4}') + ' را یک‌جا می‌گیریم.</p>',

      K.sn('۸', 'مخرج مشترک با ک.م.م'),
      '<p>برای جمع، تفریق یا مقایسهٔ دو کسر باید مخرج‌هایشان برابر باشد. بهترین مخرج مشترک، ک.م.م مخرج‌هاست. مثلاً ' + M('\\dfrac{1}{4}') + ' و ' + M('\\dfrac{1}{6}') + ':</p>', K.dm('[4,\\,6]=12'), bars([1, 4], [1, 6]),
      '<p>هر کسر را طوری بزرگ می‌کنیم که مخرجش ' + M('12') + ' شود:</p>', AL(['\\dfrac{1{\\color{crimson}\\times3}}{4{\\color{crimson}\\times3}}&=\\dfrac{3}{12}', '\\dfrac{1{\\color{crimson}\\times2}}{6{\\color{crimson}\\times2}}&=\\dfrac{2}{12}']), '<p>حالا جمعشان آسان است:</p>', K.dm('\\dfrac{1}{4}+\\dfrac{1}{6}=\\dfrac{3}{12}+\\dfrac{2}{12}=\\dfrac{5}{12}'),
      '<h4>مقایسه با مخرج مشترک</h4><p>کدام بزرگ‌تر است: ' + M('\\dfrac{5}{6}') + ' یا ' + M('\\dfrac{7}{9}') + '؟ می‌دانیم ' + M('[6,\\,9]=18') + ':</p>', K.dm('\\dfrac{5{\\color{crimson}\\times3}}{6{\\color{crimson}\\times3}}=\\dfrac{15}{18}\\; ,\\; \\dfrac{7{\\color{crimson}\\times2}}{9{\\color{crimson}\\times2}}=\\dfrac{14}{18}'), '<p>چون ' + M('15\\gt14') + ' است:</p>', K.dm('\\dfrac{5}{6}\\gt\\dfrac{7}{9}'),
      K.box('note', 'چرا کوچک‌ترین؟', '<p>حاصل‌ضرب مخرج‌ها (در مثال بالا ' + M('4\\times6=24') + ') هم مخرج مشترک است و کار می‌کند، اما عددها را بزرگ می‌کند و بعداً باید دوباره ساده کنی:</p>' + K.dm('\\dfrac{1{\\color{crimson}\\times6}}{4{\\color{crimson}\\times6}}+\\dfrac{1{\\color{crimson}\\times4}}{6{\\color{crimson}\\times4}}=\\dfrac{6}{24}+\\dfrac{4}{24}=\\dfrac{10}{24}=\\dfrac{10{\\color{crimson}\\div2}}{24{\\color{crimson}\\div2}}=\\dfrac{5}{12}') + '<p>ک.م.م از اول کار را کوچک نگه می‌دارد.</p>'),

      K.sn('۹', 'راهنمای سریع ب.م.م و ک.م.م'),
      refs([{ c: 'r1', t: 'تجزیه', r: 'عدد را بر عددهای اول بشکن.', e: '36=2^2\\times3^2' }, { c: 'r2', t: 'ب.م.م', r: 'عاملِ مشترک، توانِ کوچک‌تر.', e: '(12,\\,18)=2\\times3=6' }, { c: 'r3', t: 'ک.م.م', r: 'همهٔ عامل‌ها، توانِ بزرگ‌تر.', e: '[12,\\,18]=2^2\\times3^2=36' }, { c: 'r4', t: 'رابطه', r: 'ک.م.م را از ب.م.م هم می‌توان گرفت.', e: '(a,b)\\times[a,b]=a\\times b' }, { c: 'r1', t: 'ساده‌کردن', r: 'صورت و مخرج را بر ب.م.م تقسیم کن.', e: '\\dfrac{18}{24}=\\dfrac{3}{4}' }, { c: 'r3', t: 'مخرج مشترک', r: 'ک.م.م مخرج‌ها را بگیر.', e: '[4,\\,6]=12' }]),

      K.sn('۱۰', 'تمرین مرحله‌ای'),
      '<p>هر مرحله با دو پاسخ درست تمام می‌شود. بعد از هر پاسخ، دلیلش را می‌بینی.</p><div class="cover" id="gs" style="animation:none"></div>',
      K.sn('۱۱', 'درست یا نادرست؟'),
      '<p>شش جمله را بسنج. به تله‌ها دقت کن.</p><div class="cover" id="tg" style="animation:none"></div>',
      K.sn('۱۲', 'تمرین پایانی'),
      '<p>پنج سؤال با عددهای تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover" id="gf" style="animation:none"></div>',
      K.box('sum', 'بعد از این درس باید بتوانی', T`<ul><li>مضرب، مقسوم‌علیه و عدد اول را تشخیص بدهی و عددی را به عامل‌های اول بشکنی.</li><li>ب.م.م دو عدد را با فهرست مقسوم‌علیه‌ها، تجزیه یا نردبان تقسیم پیدا کنی.</li><li>ک.م.م دو عدد را با فهرست مضرب‌ها، تجزیه، نردبان یا رابطهٔ $(a,b)\times[a,b]=a\times b$ پیدا کنی.</li><li>مسئله‌های کلامی را درست به ب.م.م یا ک.م.م ربط بدهی.</li><li>کسر را با ب.م.م ساده کنی و کسرها را با ک.م.م هم‌مخرج کنی.</li></ul>`)
    ].join('');
  },
  init: function (panel) {
    panel.classList.add('standard-n6-10');
    K.factorTree(panel.querySelector('#ft')); K.tileDemo(panel.querySelector('#td')); K.lightsDemo(panel.querySelector('#lt')); K.divLadder(panel.querySelector('#dl')); K.gcmSteps(panel.querySelector('#gs')); K.tfGcm(panel.querySelector('#tg')); K.gcmFinal(panel.querySelector('#gf'));
  }
};
  }
};
