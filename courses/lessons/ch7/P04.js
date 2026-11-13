/* درس مهارت P04 — محاسبه و تفسیر درصد (فصل ۷) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.P04 = {
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
var AL = function (lines) { return K.dm('\\begin{aligned}' + lines.join('\\\\') + '\\end{aligned}'); };
var verdict = function (parts, cls) { return '<div class="nleq vd ' + (cls || '') + '">' + parts.map(function (p) { return '<i class="' + p[0] + '">$' + p[1] + '$</i>'; }).join('') + '</div>'; };
var tg = function (label, inner) { return '<div class="nleq vd"><span class="tg">' + label + '</span>' + inner + '</div>'; };
var refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };
var fr = function (n, d) { var g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : '\\dfrac{' + n + '}{' + d + '}'; };
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
css('css-P04', ['.sg.sg3{grid-template-columns:repeat(3,1fr)}.sg.sg3>div{text-align:center;padding:8px 4px}.sg.sg3 b .katex{font-size:1.3em}','.sg.sg3>div>span{display:block;font-size:.84rem;color:var(--ink-soft);line-height:1.6;margin-top:2px}','.nleq i{display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:3px 11px;line-height:1.3;margin:2px;vertical-align:middle;box-shadow:2px 2px 0 var(--ink)}','.nleq i.n{background:#fff}.nleq.vd{margin:8px 0 12px}.nleq.sm{font-size:1rem}.nleq.sm i{min-height:32px;padding:2px 8px}','.nleq.wrap{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 2px}','.nleq .tg{display:inline-block;font:bold .85rem Tahoma,sans-serif;color:var(--ink-soft);margin:0 6px;direction:rtl;vertical-align:middle}','.nleq .or{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#fff;border:2px solid var(--line);font:bold .8rem Tahoma,sans-serif;direction:rtl;color:var(--ink-soft);vertical-align:middle}','.chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:6px 0 4px;direction:ltr}','.chip{min-width:48px;min-height:42px;border:2px solid var(--ink);border-radius:12px;background:#fff;cursor:pointer;font:inherit;color:var(--ink);padding:2px 10px;box-shadow:2px 2px 0 var(--ink)}','.chip:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}.chip.on{background:var(--mark)}.chip.ok{background:#d2f0e9;border-color:var(--accent)}.chip.no{background:#fbd5d5;border-color:#b23a3a}.chip:disabled{opacity:.55;cursor:default}','.mc.m1{grid-template-columns:1fr}.mc.m3{grid-template-columns:repeat(3,1fr)}.mc.m2{grid-template-columns:repeat(2,1fr)}','.opt svg{display:inline-block;width:auto;max-width:none;height:auto}','.cq{direction:ltr;text-align:center;margin:8px 0}.cq .katex{font-size:1.4em}','.legend{text-align:center;font-size:.84rem;color:var(--ink-soft);margin:2px 0 8px}','.sgnrow{display:flex;gap:12px;justify-content:center;margin:10px 0;direction:ltr}.sgnrow .btn{min-width:84px;min-height:54px;font-size:1.1rem;font-weight:bold}','.sgnrow .btn.right{background:#d2f0e9;border-color:var(--accent)}.sgnrow .btn.wrong{background:#fbd5d5;border-color:#b23a3a}.sgnrow .btn:disabled{opacity:1}','.snt{display:block;direction:rtl;font-size:1rem;line-height:1.9;text-align:center}.snt .katex{font-size:1.1em}','.trow{display:flex;gap:10px;align-items:center;justify-content:center;margin:6px 0;direction:ltr}.trow .tm{font:bold 1.1rem Tahoma;flex:none}.trow .tm.oky{color:var(--accent-dark)}.trow .tm.nox{color:#b23a3a}','.ft{border-collapse:separate;border-spacing:0;margin:8px auto;direction:rtl;font-size:.92rem;max-width:100%}','.ft th,.ft td{border:2px solid var(--ink);padding:4px 10px;text-align:center;background:#fff;min-width:42px}','.ft th{background:#e6f6f3;font-weight:bold;color:var(--ink)}.ft td.hl{background:var(--amber)}.ft th.hl{background:var(--mark)}','.ft tr:first-child th:first-child{border-top-right-radius:10px}.ft tr:first-child th:last-child{border-top-left-radius:10px}.ft tr:last-child td:first-child,.ft tr:last-child th:first-child{border-bottom-right-radius:10px}.ft tr:last-child td:last-child{border-bottom-left-radius:10px}','.tblw{overflow-x:auto;direction:ltr;text-align:center}','.ico{display:inline-block;vertical-align:middle}','@media(max-width:520px){.mc.m3{gap:6px}}','.hg{display:grid;grid-template-columns:repeat(10,1fr);gap:2px;max-width:280px;margin:8px auto;direction:ltr;border:2.5px solid var(--ink);padding:3px;border-radius:8px;background:#fff}','.hg i{aspect-ratio:1;border-radius:3px;background:#f3f6fa;border:1px solid var(--line)}.hg i.on{background:#7fd0c3;border-color:var(--accent)}','.pdb{position:relative;direction:ltr;margin:46px 26px 52px}','.pdb .bar{height:26px;border:2.5px solid var(--ink);border-radius:10px;background:#fff;position:relative;overflow:hidden}','.pdb .fill{position:absolute;left:0;top:0;bottom:0;background:#7fd0c3;border-right:2.5px solid var(--ink)}','.pdb .tk{position:absolute;top:30px;width:0;height:8px;border-left:2px solid var(--ink)}','.pdb .tn{position:absolute;top:40px;transform:translateX(-50%);font:bold .76rem Tahoma,sans-serif;white-space:nowrap}','.pdb .tu{position:absolute;top:-40px;transform:translateX(-50%);background:var(--ink);color:#fff;border-radius:9px;padding:2px 9px;font-weight:bold;white-space:nowrap}','.pdb .tu:after{content:"";position:absolute;left:50%;bottom:-6px;margin-left:-6px;border:6px solid transparent;border-top-color:var(--ink);border-bottom:0}','.pdb .lbl{position:absolute;right:-4px;top:-16px;font:.72rem Tahoma;color:var(--ink-soft)}','.stp{direction:ltr;display:flex;align-items:center;justify-content:center;gap:8px;margin:6px 0}.stp .chip{min-width:42px;font-weight:bold}.stp b{min-width:110px;text-align:center}'].join('\n'));
/* ---- شبکهٔ صدتایی ---- */
K.hundredGrid = function (host) {
  var p = 35, out;
  host.innerHTML = '<div class="lz"></div><div class="rng" style="display:flex;align-items:center;gap:10px;direction:ltr;margin:6px 8px"><span>۰٪</span><input type="range" min="0" max="100" value="35" aria-label="درصد" style="flex:1;accent-color:#078b80;height:30px"><span>۱۰۰٪</span></div>';
  out = host.querySelector('.lz');
  function paint() {
    var h = '<div class="hg">', i;
    for (i = 0; i < 100; i++) { h += '<i class="' + (i < p ? 'on' : '') + '"></i>'; }
    h += '</div>' + K.dm(p + '\\%=\\dfrac{' + p + '}{100}' + (gcd(p, 100) > 1 && p > 0 ? '=' + fr(p, 100) : ''));
    h += '<p class="legend" style="font-size:.93rem;color:var(--ink)">' + (p === 0 ? 'هیچ خانه‌ای رنگی نیست.' : p === 100 ? 'همهٔ خانه‌ها رنگی‌اند؛ یعنی «کلِ مقدار».' : 'از هر ' + fa(100) + ' خانه، ' + fa(p) + ' خانه رنگی است.') + '</p>';
    out.innerHTML = rr(h);
  }
  host.addEventListener('input', function (e) { if (e.target.matches('input')) { p = +e.target.value; paint(); } });
  paint();
};

/* ---- نوار دوتایی: مقدار و درصد ---- */
K.pctBar = function (host) {
  var N = 80, p = 25, out;
  host.innerHTML = '<div class="chips" id="pn"></div><div class="lz"></div><div class="rng" style="display:flex;align-items:center;gap:10px;direction:ltr;margin:6px 8px"><span>۰٪</span><input type="range" min="0" max="100" step="5" value="25" aria-label="درصد" style="flex:1;accent-color:#078b80;height:30px"><span>۱۰۰٪</span></div>';
  out = host.querySelector('.lz');
  function chips() { host.querySelector('#pn').innerHTML = [40, 80, 120, 200].map(function (n) { return '<button type="button" class="chip' + (n === N ? ' on' : '') + '" data-n="' + n + '">کل = ' + fa(n) + '</button>'; }).join(''); }
  function paint() {
    var v = N * p / 100, h = '<div class="pdb"><span class="lbl">مقدار</span><div class="bar"><i class="fill" style="width:' + p + '%"></i></div><span class="tu" style="left:' + p + '%">' + M(nf(v)) + '</span>';
    [0, 25, 50, 75, 100].forEach(function (t) { h += '<i class="tk" style="left:' + t + '%"></i><span class="tn" style="left:' + t + '%">' + fa(nf(N * t / 100)) + '<br><span style="color:var(--pink)">' + fa(t) + '٪</span></span>'; });
    h += '</div>' + K.dm(p + '\\%\\times' + N + '=\\dfrac{' + p + '}{100}\\times' + N + '=' + nf(v));
    out.innerHTML = rr(h);
  }
  host.addEventListener('input', function (e) { if (e.target.matches('input')) { p = +e.target.value; paint(); } });
  host.addEventListener('click', function (e) { var c = e.target.closest('.chip'); if (c) { N = +c.dataset.n; chips(); paint(); } });
  chips(); paint();
};

/* ================= تولید سؤال ================= */
function pctOpts(correct, wrongs) { var list = uniqBy([{ v: correct, ok: 1, m: '', t: null }].concat(wrongs), function (x) { return String(x.v); }), w = shuffle(list.slice(1)).slice(0, 3); return shuffle([list[0]].concat(w).map(function (z) { return { h: z.t || M(String(z.v)), ok: !!z.ok, m: z.m || 'این گزینه درست نیست.' }; })); }
function genE1() {   // چند درصد؟ (بخش از کل)
  var tot = pick([20, 25, 40, 50, 80, 200, 250]), p = pick([10, 20, 25, 30, 40, 50, 60, 75, 80]), part = tot * p / 100;
  if (part !== Math.round(part)) { return genE1(); }
  return {
    ask: 'در یک کلاس ' + fa(tot) + ' نفره، ' + fa(part) + ' نفر عینکی‌اند. عینکی‌ها چند درصد کلاس‌اند؟', fig: '', cq: '', cls: 'm2',
    opts: pctOpts(p, [{ v: part, t: M(String(part) + '\\%'), m: 'این تعداد است، نه درصد؛ باید «بخش ÷ کل» را در ۱۰۰ ضرب کنی.' }, { v: 100 - p, t: M(String(100 - p) + '\\%'), m: 'این درصد افرادِ غیرعینکی است.' }, { v: p / 2, t: M(String(p / 2) + '\\%'), m: 'حساب را دوباره بررسی کن.' }, { v: p + 10, t: M(String(p + 10) + '\\%'), m: 'حساب را دوباره بررسی کن.' }]).map(function (o) { return o; }),
    expl: function () { return '<p>درصد = (بخش ÷ کل) × ۱۰۰:</p>' + K.dm('\\dfrac{' + part + '}{' + tot + '}\\times100=' + p + '\\%'); }
  };
}
function genE2() {   // درصدِ یک مقدار
  var tot = pick([40, 60, 80, 120, 150, 200, 250, 500]), p = pick([10, 20, 25, 30, 50, 75]), r = tot * p / 100;
  if (r !== Math.round(r * 10) / 10) { return genE2(); }
  return {
    ask: M(p + '\\%') + ' از ' + fa(tot) + ' چقدر است؟', fig: '', cq: '', cls: 'm2',
    opts: pctOpts(r, [{ v: p, m: 'این خودِ درصد است؛ باید آن را از ' + fa(tot) + ' بگیری.' }, { v: tot - r, m: 'این مقدارِ باقی‌مانده (۱۰۰٪ منهای ' + fa(p) + '٪) است.' }, { v: r * 10, m: 'اعشار را اشتباه جابه‌جا کرده‌ای؛ ' + fa(p) + '٪ یعنی ' + M('\\dfrac{' + p + '}{100}') + '.' }, { v: tot + r, m: 'درصد از یک مقدار، از خودِ آن مقدار بیشتر نمی‌شود (تا ۱۰۰٪).' }]),
    expl: function () { return '<p>' + M(p + '\\%') + ' یعنی ' + M('\\dfrac{' + p + '}{100}') + ':</p>' + K.dm('\\dfrac{' + p + '}{100}\\times' + tot + '=' + nf(r)); }
  };
}
function genE3() {   // تخفیف و مقایسه
  var t = R(0, 1);
  if (t === 0) { var pr = pick([200, 400, 500, 800, 1000]), d = pick([10, 20, 25, 30, 50]), pay = pr * (100 - d) / 100; return { ask: 'قیمت یک کتاب ' + fa(pr) + ' هزار تومان است و ' + fa(d) + ' درصد تخفیف دارد. قیمت بعد از تخفیف چند هزار تومان است؟', fig: '', cq: '', cls: 'm2', opts: pctOpts(pay, [{ v: pr * d / 100, m: 'این مقدار خودِ تخفیف است، نه قیمت بعد از تخفیف.' }, { v: pr - d, m: 'تخفیف درصدی است، نه مقداری؛ ' + fa(d) + ' را مستقیم از قیمت کم نکن.' }, { v: pr + pr * d / 100, m: 'تخفیف قیمت را کم می‌کند، نه زیاد.' }, { v: pay + pr / 10, m: 'حساب را دوباره بررسی کن.' }]), expl: function () { return '<p>تخفیف: ' + M('\\dfrac{' + d + '}{100}\\times' + pr + '=' + nf(pr * d / 100)) + '. قیمت جدید:</p>' + K.dm(pr + '-' + nf(pr * d / 100) + '=' + nf(pay)) + '<p>یا مستقیم ' + M(String(100 - d) + '\\%') + ' از قیمت اصلی را حساب کن.</p>'; } }; }
  var a = pick([10, 20, 25, 50]), A = pick([40, 80, 200]), b = pick([5, 10, 20, 30]), B = pick([400, 500, 1000]), va = A * a / 100, vb = B * b / 100;
  if (va === vb) { return genE3(); }
  return { ask: 'کدام بزرگ‌تر است: ' + M(a + '\\%') + ' از ' + fa(A) + ' یا ' + M(b + '\\%') + ' از ' + fa(B) + '؟', fig: '', cq: '', cls: 'm3', opts: [{ h: 'اولی', ok: va > vb, m: 'درصد بزرگ‌تر لزوماً مقدار بزرگ‌تر نیست؛ کل‌ها فرق دارند. هر دو را حساب کن.' }, { h: 'دومی', ok: vb > va, m: 'هر دو را حساب کن و مقایسه کن.' }, { h: 'برابرند', ok: false, m: 'این دو مقدار برابر نیستند.' }], expl: function () { return AL([a + '\\%\\times' + A + '&=' + nf(va), b + '\\%\\times' + B + '&=' + nf(vb)]) + '<p>پس ' + (va > vb ? 'اولی' : 'دومی') + ' بزرگ‌تر است؛ درصدها فقط وقتی قابل مقایسه‌اند که «کل» یکی باشد.</p>'; } };
}
var TFP = [
  { h: M('50\\%') + ' از ' + fa(10) + ' بیشتر از ' + M('10\\%') + ' از ' + fa(100) + ' است.', ok: 0, e: '<p>اولی ' + M('5') + ' و دومی ' + M('10') + ' است. درصدِ بزرگ‌تر وقتی مقدار بزرگ‌تری می‌دهد که کل‌ها یکی باشند.</p>' },
  { h: M('25\\%') + ' یعنی ' + M('\\dfrac{1}{4}') + '.', ok: 1, e: '<p>' + M('\\dfrac{25}{100}=\\dfrac{1}{4}') + '.</p>' },
  { h: 'اگر قیمتی ' + fa(20) + ' درصد گران شود، با ' + fa(20) + ' درصد تخفیف به قیمت اول برمی‌گردد.', ok: 0, e: '<p>مثلاً ' + M('100') + ' می‌شود ' + M('120') + '؛ و ' + M('20\\%') + ' از ' + M('120') + ' برابر ' + M('24') + ' است که ' + M('96') + ' می‌شود.</p>' },
  { h: M('100\\%') + ' از یک مقدار خودِ آن مقدار است.', ok: 1, e: '<p>' + M('\\dfrac{100}{100}=1') + '.</p>' },
  { h: M('200\\%') + ' از یک مقدار می‌تواند معنی داشته باشد.', ok: 1, e: '<p>یعنی دو برابر آن مقدار.</p>' },
  { h: 'اگر ' + fa(18) + ' نفر از ' + fa(24) + ' نفر موافق باشند، درصد موافقان ' + M('18\\%') + ' است.', ok: 0, e: '<p>' + M('\\dfrac{18}{24}\\times100=75\\%') + '. عدد ' + M('18') + ' تعداد است، نه درصد.</p>' },
  { h: M('10\\%') + ' از هر مقدار را می‌توان با تقسیم آن بر ' + fa(10) + ' به دست آورد.', ok: 1, e: '<p>' + M('\\dfrac{10}{100}=\\dfrac{1}{10}') + '.</p>' },
  { h: 'درصد دانش‌آموزانِ یک کلاس که ' + M('40\\%') + ' آن‌ها پسرند، ' + M('60\\%') + ' آن‌ها دختر است.', ok: 1, e: '<p>' + M('100\\%-40\\%=60\\%') + '.</p>' },
  { h: M('30\\%') + ' از ' + fa(50) + ' برابر ' + fa(30) + ' است.', ok: 0, e: '<p>' + M('\\dfrac{30}{100}\\times50=15') + '.</p>' }
];
return {
  html: function () {
    return [
      K.sn('۱', 'درصد یعنی «از هر صد»'),
      '<p>«درصد» یعنی «از هر صد». وقتی می‌گوییم ' + M('35\\%') + '، منظورمان ' + M('35') + ' تا از هر ' + M('100') + ' تاست. اسلایدر را بکش و ببین چند خانه از صد خانه رنگی می‌شود:</p><div class="cover p7-act" id="hg" style="animation:none"></div>',
      '<p>پس درصد، نوعی کسر با مخرج ' + M('100') + ' است. (تبدیل کامل کسر و اعشار به درصد را در درس تبدیل کسر، اعشار و درصد دیده‌ای؛ اینجا از آن استفاده می‌کنیم.)</p>',
      K.box('note', 'قاعدهٔ اصلی', '<p>درصدِ یک بخش از کل = (بخش ÷ کل) × ۱۰۰</p>' + K.dm('\\dfrac{18}{24}\\times100=75\\%')),

      K.sn('۲', 'چند درصد؟'),
      '<p>در کلاسی ' + M('24') + ' نفره، ' + M('18') + ' نفر عینکی‌اند. چند درصد؟ بخش را بر کل تقسیم می‌کنیم و در ' + M('100') + ' ضرب می‌کنیم:</p>', AL(['\\dfrac{18}{24}&=\\dfrac{3}{4}', '\\dfrac{3}{4}\\times100&=75']), verdict([['a', '75\\%']]),
      '<p>این روش وقتی «کل» عددِ ساده‌ای (مثل ' + M('20') + '، ' + M('25') + ' یا ' + M('50') + ') باشد، با ساده‌کردن کسر هم آسان است. مثلاً ' + M('\\dfrac{9}{25}=\\dfrac{36}{100}=36\\%') + '.</p>',
      K.box('err', '⚠ خطای رایج', '<p>عددِ ' + M('18') + ' تعداد است، نه درصد. «۱۸ نفر عینکی‌اند» با «۱۸٪ عینکی‌اند» فرق دارد؛ چون کل ' + M('24') + ' است نه ' + M('100') + '.</p>'),

      K.sn('۳', 'درصدِ یک مقدار'),
      '<p>برعکسِ بخش قبل: ' + M('25\\%') + ' از ' + M('80') + ' چقدر است؟ درصد را به کسر تبدیل می‌کنیم و در مقدار ضرب می‌کنیم:</p>', K.dm('25\\%\\times80=\\dfrac{25}{100}\\times80=20'),
      '<p>نوار زیر مقدار و درصد را کنار هم نشان می‌دهد. درصد را عوض کن و کل را هم عوض کن:</p><div class="cover p7-act" id="pb" style="animation:none"></div>',
      K.box('note', 'میان‌بُرها', '<ul><li>' + M('10\\%') + ' یعنی تقسیم بر ' + M('10') + '.</li><li>' + M('50\\%') + ' یعنی نصف و ' + M('25\\%') + ' یعنی یک‌چهارم.</li><li>برای ' + M('30\\%') + ': اول ' + M('10\\%') + ' را حساب کن و سه‌برابر کن.</li></ul>'),

      K.sn('۴', 'تفسیر درصد: تخفیف و مقایسه'),
      '<p>یک کتاب ' + M('800') + ' هزار تومانی ' + M('25') + ' درصد تخفیف دارد. قیمت جدید چقدر است؟</p>', AL(['25\\%\\times800&=200', '800-200&=600']), verdict([['a', '600']]),
      '<p>یا کوتاه‌تر: بعد از ' + M('25') + ' درصد تخفیف، ' + M('75\\%') + ' قیمت باقی می‌ماند: ' + M('75\\%\\times800=600') + '.</p>',
      '<h4>درصدها را فقط وقتی مقایسه کن که «کل» یکی باشد</h4><p>' + M('50\\%') + ' از ' + M('10') + ' بیشتر است یا ' + M('10\\%') + ' از ' + M('100') + '؟</p>', AL(['50\\%\\times10&=5', '10\\%\\times100&=10']), '<p>با اینکه ' + M('50\\%') + ' درصد بزرگ‌تری است، مقدارش کوچک‌تر شد؛ چون کل‌ها فرق دارند.</p>',
      K.box('err', '⚠ خطای رایج', '<p>اگر قیمت ' + M('20\\%') + ' گران شود و بعد ' + M('20\\%') + ' تخفیف بخورد، به قیمت اول برنمی‌گردد: ' + M('100\\to120\\to96') + '. هر درصد روی «کلِ همان لحظه» حساب می‌شود.</p>'),

      K.sn('۵', 'کارت مرجع'),
      refs([{ c: 'r1', t: 'چند درصد؟', r: 'بخش ÷ کل، ضرب در ۱۰۰.', e: '\\dfrac{18}{24}\\times100=75\\%' }, { c: 'r2', t: 'درصدِ مقدار', r: 'درصد ÷ ۱۰۰، ضرب در مقدار.', e: '25\\%\\times80=20' }, { c: 'r3', t: 'تخفیف', r: '(۱۰۰ − تخفیف)٪ از قیمت می‌ماند.', e: '75\\%\\times800=600' }, { c: 'r4', t: 'میان‌بُر', r: '۱۰٪ = تقسیم بر ۱۰؛ ۵۰٪ = نصف.', e: '10\\%\\times70=7' }, { c: 'r1', t: 'مقایسه', r: 'درصدها فقط با «کل» یکسان قابل‌مقایسه‌اند.', e: '5\\lt10' }, { c: 'r3', t: 'کل', r: '۱۰۰٪ یعنی خودِ مقدار.', e: '100\\%\\times n=n' }]),

      K.sn('۶', 'محاسبهٔ درصد'),
      '<p>هر مرحله با دو پاسخ درست تمام می‌شود. بعد از هر پاسخ، دلیلش را می‌بینی.</p><div class="cover p7-act" id="ss" style="animation:none"></div>',
      K.sn('۷', 'درست یا نادرست؟'),
      '<p>شش جمله را بسنج. به تله‌ها دقت کن.</p><div class="cover p7-act" id="tf" style="animation:none"></div>',
      K.sn('۸', 'تمرین پایانی'),
      '<p>پنج سؤال با عددهای تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover p7-act" id="fn" style="animation:none"></div>',
      K.box('sum', 'بعد از این درس باید بتوانی', T`<ul><li>درصدِ یک بخش از کل را با «بخش ÷ کل × ۱۰۰» حساب کنی.</li><li>درصدِ یک مقدار را پیدا کنی و از میان‌بُرها استفاده کنی.</li><li>مسئلهٔ تخفیف را درست حل کنی.</li><li>بدانی درصدها فقط وقتی قابل‌مقایسه‌اند که «کل» یکی باشد.</li></ul>`)
    ].join('');
  },
  init: function (panel) {
    K.hundredGrid(panel.querySelector('#hg')); K.pctBar(panel.querySelector('#pb'));
    K.stepRun(panel.querySelector('#ss'), [{ n: 'چند درصد؟', gen: genE1 }, { n: 'درصدِ یک مقدار', gen: genE2 }, { n: 'تخفیف و مقایسه', gen: genE3 }], { done: 'حالا برو سراغ تله‌ها.' });
    K.tfRun(panel.querySelector('#tf'), TFP);
    K.finalRun(panel.querySelector('#fn'), [genE1, genE2, genE2, genE3, genE3], { top: 'عالی بود! درصد را کاملاً فهمیده‌ای.' });
  }
};

  }
};
