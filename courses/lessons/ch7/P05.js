/* درس مهارت P05 — خواندن جدول و نمودار آماری (فصل ۷) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.P05 = {
  needs: ['utils'],
  setup: function (K0) {
var ML = window.MathLite, fa = ML.fa, rr = ML.renderRich, abs = Math.abs, df = K0.df;
var _u = K0._u, R = _u.R, M = _u.M, shuffle = _u.shuffle;
var K = Object.create(K0);   // K0 = هستهٔ مشترک؛ K = همان + ابزارهای اختصاصی این درس
var T = String.raw;
function css(id, txt) { if (document.getElementById(id)) { return; } var s = document.createElement('style'); s.id = id; s.textContent = txt; document.head.appendChild(s); }
var CL = ['var(--accent)', 'var(--pink)', '#4c5fd5', '#e08a00', 'var(--mark)'], HX = ['#0e8f7e', '#d6457a', '#4c5fd5', '#e08a00', '#ffc233'];
var pick = function (a) { return a[R(0, a.length - 1)]; };
var AL = function (lines) { return K.dm('\\begin{aligned}' + lines.join('\\\\') + '\\end{aligned}'); };
var tg = function (label, inner) { return '<div class="nleq vd"><span class="tg">' + label + '</span>' + inner + '</div>'; };
var refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };
var nf = function (v) { var s = String(+(+v).toFixed(4)); return s === '-0' ? '0' : s; };
function uniqBy(arr, key) { var s = {}; return arr.filter(function (x) { var k = key(x); if (s[k]) { return false; } s[k] = 1; return true; }); }
/* جدول فراوانی/داده جمع‌وجور؛ rows: آرایهٔ ردیف‌ها (ردیف اول سرستون) — hl: اندیس ستون برجسته */
function ftab(rows, o) {
  o = o || {}; var h = '<div class="tblw"><table class="ft">';
  rows.forEach(function (r, i) { h += '<tr>' + r.map(function (c, j) { var th = (i === 0 && !o.noHead) || (j === 0 && o.rowHead !== false); return '<' + (th ? 'th' : 'td') + (o.hl !== undefined && j === o.hl && !th ? ' class="hl"' : '') + '>' + c + '</' + (th ? 'th' : 'td') + '>'; }).join('') + '</tr>'; });
  return h + '</table></div>';
}
/* نمودار ستونی SVG: o={labels,vals,max,step,w,h,hi(اندیس برجسته),showVals,ylab,title,interactive} */
function barSVG(o) {
  var W = o.w || 340, H = o.h || 230, L = 44, Rr = 12, Tp = o.title ? 34 : 16, B = 40, pw = W - L - Rr, ph = H - Tp - B, n = o.labels.length, slot = pw / n, bw = Math.min(46, slot * 0.56), s, v, i, py = function (x) { return Tp + ph - x / o.max * ph; };
  s = '<svg viewBox="0 0 ' + W + ' ' + H + '" style="max-width:100%;height:auto;display:block;margin:6px auto;direction:ltr" role="img">';
  if (o.title) { s += '<text x="' + W / 2 + '" y="18" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#14213d" font-family="Tahoma,sans-serif">' + o.title + '</text>'; }
  if (o.ylab) { s += '<text x="' + (L + 4) + '" y="' + (Tp - 5) + '" text-anchor="start" font-size="10.5" fill="#5a6a85" font-family="Tahoma,sans-serif">' + o.ylab + '</text>'; }
  for (v = 0; v <= o.max + 1e-9; v += o.step) { s += '<line x1="' + L + '" y1="' + py(v) + '" x2="' + (W - Rr) + '" y2="' + py(v) + '" stroke="' + (v === 0 ? '#14213d' : '#d5dde8') + '" stroke-width="' + (v === 0 ? 2.2 : 1) + '"/>' + (Math.round(v / o.step) % (o.labEvery || 1) === 0 ? '<text x="' + (L - 6) + '" y="' + (py(v) + 4) + '" text-anchor="end" font-size="11" fill="#14213d" font-family="Tahoma,sans-serif">' + fa(nf(v)) + '</text>' : ''); }
  s += '<line x1="' + L + '" y1="' + Tp + '" x2="' + L + '" y2="' + py(0) + '" stroke="#14213d" stroke-width="2.2"/>';
  for (i = 0; i < n; i++) {
    var x = L + i * slot + (slot - bw) / 2, hh = o.vals[i] / o.max * ph, hi = o.hi !== undefined && (o.hi === i || (o.hi.indexOf && o.hi.indexOf(i) > -1));
    s += '<rect class="bar" data-i="' + i + '" x="' + x + '" y="' + (Tp + ph - hh) + '" width="' + bw + '" height="' + hh + '" rx="3" fill="' + (hi ? '#ffc233' : (o.colors ? o.colors[i % o.colors.length] : '#0e8f7e')) + '" stroke="#14213d" stroke-width="1.8" style="' + (o.interactive ? 'cursor:pointer' : '') + '"/>';
    s += '<text x="' + (x + bw / 2) + '" y="' + (py(0) + 16) + '" text-anchor="middle" font-size="11.5" fill="#14213d" font-family="Tahoma,sans-serif">' + o.labels[i] + '</text>';
    if (o.guide === i) { s += '<line x1="' + L + '" y1="' + py(o.vals[i]) + '" x2="' + x + '" y2="' + py(o.vals[i]) + '" stroke="#d6457a" stroke-width="2" stroke-dasharray="5 4"/>'; }
    if (o.showVals || (o.showAt === i)) { s += '<text x="' + (x + bw / 2) + '" y="' + (Tp + ph - hh - 5) + '" text-anchor="middle" font-size="12" font-weight="bold" fill="#14213d" font-family="Tahoma,sans-serif">' + fa(nf(o.vals[i])) + '</text>'; }
  }
  return s + '</svg>';
}
var fig1 = function (inner, cap) { return '<div class="figs one"><figure>' + inner + (cap ? '<figcaption>' + cap + '</figcaption>' : '') + '</figure></div>'; };

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
css('css-P05', ['.sg.sg3{grid-template-columns:repeat(3,1fr)}.sg.sg3>div{text-align:center;padding:8px 4px}.sg.sg3 b .katex{font-size:1.3em}','.sg.sg3>div>span{display:block;font-size:.84rem;color:var(--ink-soft);line-height:1.6;margin-top:2px}','.nleq i{display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:3px 11px;line-height:1.3;margin:2px;vertical-align:middle;box-shadow:2px 2px 0 var(--ink)}','.nleq i.n{background:#fff}.nleq.vd{margin:8px 0 12px}.nleq.sm{font-size:1rem}.nleq.sm i{min-height:32px;padding:2px 8px}','.nleq.wrap{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 2px}','.nleq .tg{display:inline-block;font:bold .85rem Tahoma,sans-serif;color:var(--ink-soft);margin:0 6px;direction:rtl;vertical-align:middle}','.nleq .or{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#fff;border:2px solid var(--line);font:bold .8rem Tahoma,sans-serif;direction:rtl;color:var(--ink-soft);vertical-align:middle}','.chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:6px 0 4px;direction:ltr}','.chip{min-width:48px;min-height:42px;border:2px solid var(--ink);border-radius:12px;background:#fff;cursor:pointer;font:inherit;color:var(--ink);padding:2px 10px;box-shadow:2px 2px 0 var(--ink)}','.chip:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}.chip.on{background:var(--mark)}.chip.ok{background:#d2f0e9;border-color:var(--accent)}.chip.no{background:#fbd5d5;border-color:#b23a3a}.chip:disabled{opacity:.55;cursor:default}','.mc.m1{grid-template-columns:1fr}.mc.m3{grid-template-columns:repeat(3,1fr)}.mc.m2{grid-template-columns:repeat(2,1fr)}','.opt svg{display:inline-block;width:auto;max-width:none;height:auto}','.cq{direction:ltr;text-align:center;margin:8px 0}.cq .katex{font-size:1.4em}','.legend{text-align:center;font-size:.84rem;color:var(--ink-soft);margin:2px 0 8px}','.sgnrow{display:flex;gap:12px;justify-content:center;margin:10px 0;direction:ltr}.sgnrow .btn{min-width:84px;min-height:54px;font-size:1.1rem;font-weight:bold}','.sgnrow .btn.right{background:#d2f0e9;border-color:var(--accent)}.sgnrow .btn.wrong{background:#fbd5d5;border-color:#b23a3a}.sgnrow .btn:disabled{opacity:1}','.snt{display:block;direction:rtl;font-size:1rem;line-height:1.9;text-align:center}.snt .katex{font-size:1.1em}','.trow{display:flex;gap:10px;align-items:center;justify-content:center;margin:6px 0;direction:ltr}.trow .tm{font:bold 1.1rem Tahoma;flex:none}.trow .tm.oky{color:var(--accent-dark)}.trow .tm.nox{color:#b23a3a}','.ft{border-collapse:separate;border-spacing:0;margin:8px auto;direction:rtl;font-size:.92rem;max-width:100%}','.ft th,.ft td{border:2px solid var(--ink);padding:4px 10px;text-align:center;background:#fff;min-width:42px}','.ft th{background:#e6f6f3;font-weight:bold;color:var(--ink)}.ft td.hl{background:var(--amber)}.ft th.hl{background:var(--mark)}','.ft tr:first-child th:first-child{border-top-right-radius:10px}.ft tr:first-child th:last-child{border-top-left-radius:10px}.ft tr:last-child td:first-child,.ft tr:last-child th:first-child{border-bottom-right-radius:10px}.ft tr:last-child td:last-child{border-bottom-left-radius:10px}','.tblw{overflow-x:auto;direction:ltr;text-align:center}','.ico{display:inline-block;vertical-align:middle}','@media(max-width:520px){.mc.m3{gap:6px}}','.tbr{border-collapse:separate;border-spacing:0;margin:8px auto;direction:rtl;font-size:.95rem}','.tbr th,.tbr td{border:2px solid var(--ink);padding:6px 12px;text-align:center;background:#fff;min-width:56px}','.tbr th{background:#e6f6f3;color:var(--ink);font-weight:bold}','.tbr td.pk{cursor:pointer}.tbr td.pk:hover{background:#fff6d6}.tbr td.row{background:#fff6d6}.tbr td.ok{background:#d2f0e9}.tbr td.bad{background:#fbd5d5}.tbr td.hint{background:#ffe8a3}','.tbr th.hl{background:var(--mark)}','.chw svg .bar{transition:opacity .15s}.chw svg .bar:hover{opacity:.8}'].join('\n'));
var SETS = [{ n: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه'], t: 'تعداد بازدیدکنندگان یک موزه' }, { n: ['فوتبال', 'والیبال', 'شنا', 'دو', 'پینگ‌پنگ'], t: 'ورزش مورد علاقهٔ دانش‌آموزان' }, { n: ['الف', 'ب', 'ج', 'د', 'ه'], t: 'فروش پنج فروشگاه (عدد)' }, { n: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد'], t: 'کتاب‌های امانت‌داده‌شده در کتابخانه' }, { n: ['کلاس ۱', 'کلاس ۲', 'کلاس ۳', 'کلاس ۴'], t: 'تعداد دانش‌آموزان هر کلاس' }];
function mkDS(opt) {
  opt = opt || {}; var S = pick(SETS), n = S.n.length, s = pick([2, 5, 10, 20]), vals = [], i, max, ks;
  do { vals = []; for (i = 0; i < n; i++) { vals.push(s * R(1, 5)); } } while (vals.every(function (v) { return v === vals[0]; }) || (!opt.dupOk && uniqBy(vals.map(function (v) { return { v: v }; }), function (x) { return x.v; }).length < n));
  max = s * 6;
  return { labels: S.n, vals: vals, step: s, max: max, title: S.t, n: n, labEvery: (s !== 5 && Math.random() < 0.5) ? 2 : 1 };
}
function dsChart(d, o) { o = o || {}; return fig1(barSVG({ labels: d.labels, vals: d.vals, max: d.max, step: d.step, w: 340, h: 215, title: d.title, ylab: 'تعداد', hi: o.hi, showVals: o.showVals, showAt: o.showAt, guide: o.guide, labEvery: d.labEvery, colors: ['#0e8f7e', '#d6457a', '#4c5fd5', '#e08a00', '#ffc233'].slice(0, 5), interactive: o.interactive })); }

/* ---- جدول را بخوان ---- */
K.tableReader = function (host) {
  var ROWS = ['فروشگاه الف', 'فروشگاه ب', 'فروشگاه ج'], COLS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر'], T, tr, tc, done, sel;
  function nw() { var i, j; T = []; for (i = 0; i < 3; i++) { T.push([]); for (j = 0; j < 4; j++) { T[i].push(R(2, 19) * 5); } } tr = R(0, 2); tc = R(0, 3); done = false; sel = null; }
  function paint() {
    var h = '<p class="ask">ردیفِ «' + ROWS[tr] + '» را با ستونِ «' + COLS[tc] + '» ببین: فروش چقدر بوده؟ (روی خانهٔ درست بزن)</p><table class="tbr"><tr><th></th>' + COLS.map(function (c, j) { return '<th class="' + (done && j === tc ? 'hl' : '') + '">' + c + '</th>'; }).join('') + '</tr>' + ROWS.map(function (r, i) { return '<tr><th class="' + (done && i === tr ? 'hl' : '') + '">' + r + '</th>' + T[i].map(function (v, j) { var c = 'pk'; if (done) { if (i === tr && j === tc) { c = 'ok'; } else if (sel && sel[0] === i && sel[1] === j) { c = 'bad'; } else if (i === tr || j === tc) { c = 'row'; } else { c = ''; } } return '<td class="' + c + '" data-i="' + i + '" data-j="' + j + '">' + fa(v) + '</td>'; }).join('') + '</tr>'; }).join('') + '</table>';
    if (done) { h += '<div class="fb ' + (sel[0] === tr && sel[1] === tc ? 'ok' : 'bad') + '">' + (sel[0] === tr && sel[1] === tc ? 'درست است! ✓' : 'این خانه ردیفِ «' + ROWS[sel[0]] + '» و ستونِ «' + COLS[sel[1]] + '» است.') + '</div><p class="legend" style="font-size:.92rem;color:var(--ink)">جواب در تقاطعِ ردیف و ستون است: ' + fa(T[tr][tc]) + '.</p>'; }
    h += '<div class="opts p7-ops"><button type="button" class="btn' + (done ? ' primary' : '') + '" data-nw="1" data-scroll>جدول دیگر</button></div>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) {
    var td = e.target.closest('td.pk'), b = e.target.closest('button');
    if (td && !done) { sel = [+td.dataset.i, +td.dataset.j]; done = true; paint(); } else if (b && b.dataset.nw) { nw(); paint(); }
  }); nw(); paint();
};

/* ---- نمودار قابل‌پیمایش ---- */
K.chartReader = function (host) {
  var d = mkDS({ dupOk: true }), idx = null;
  function paint() {
    var h = '<div class="chw">' + dsChart(d, { hi: idx === null ? undefined : idx, showAt: idx === null ? undefined : idx, guide: idx === null ? undefined : idx, interactive: true }) + '</div>';
    if (idx === null) { h += '<p class="legend">روی یکی از ستون‌ها بزن تا مقدارش را ببینی.</p>'; }
    else { var v = d.vals[idx]; h += '<div class="fb ok">ستونِ «' + d.labels[idx] + '» تا خطِ ' + fa(v) + ' بالا آمده؛ پس مقدارش ' + fa(v) + ' است. (هر خطِ محور ' + fa(d.step) + ' واحد است.)</div>'; }
    h += '<div class="opts p7-ops"><button type="button" class="btn" data-nw="1" data-scroll>نمودار دیگر</button></div>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) { var bar = e.target.closest('.bar'), b = e.target.closest('button'); if (bar) { idx = +bar.dataset.i; paint(); } else if (b && b.dataset.nw) { d = mkDS({ dupOk: true }); idx = null; paint(); } });
  paint();
};

/* ================= تولید سؤال ================= */
function mkO(correct, wrongs, fmt) { var list = uniqBy([{ v: correct, ok: 1, m: '' }].concat(wrongs.filter(function (w) { return w.v >= 0 && w.v !== correct; })), function (x) { return x.v; }), w = shuffle(list.slice(1)).slice(0, 3); return shuffle([list[0]].concat(w).map(function (z) { return { h: fmt ? fmt(z.v) : M(String(z.v)), ok: !!z.ok, m: z.m || 'این گزینه درست نیست.' }; })); }
function genF1() {
  var d = mkDS(), i = R(0, d.n - 1), v = d.vals[i], s = d.step;
  return { ask: 'ارتفاع ستون زردرنگ («' + d.labels[i] + '») چقدر است؟', fig: dsChart(d, { hi: i }), cq: '', cls: 'm2', opts: mkO(v, [{ v: v + s, m: 'یک خط بالاتر خوانده‌ای؛ ستون به این خط نمی‌رسد.' }, { v: v - s, m: 'یک خط پایین‌تر خوانده‌ای؛ ستون از این خط بالاتر است.' }, { v: i + 1, m: 'شمارهٔ ستون را به‌جای مقدار خوانده‌ای.' }, { v: v / 2 === Math.round(v / 2) ? v / 2 : v + 2 * s, m: 'قدم محور را درست نگرفته‌ای؛ هر خط ' + fa(s) + ' واحد است.' }]), expl: function () { return '<p>ستون به خطِ ' + M(String(v)) + ' می‌رسد (هر خطِ محور ' + M(String(s)) + ' واحد است):</p>' + K.dm(v / s + '\\times' + s + '=' + v); } };
}
function genF2() {
  var d = mkDS(), t = R(0, 3), mx = Math.max.apply(null, d.vals), mn = Math.min.apply(null, d.vals), i, j, ask, opts, ex;
  if (t === 0) { i = d.vals.indexOf(mx); ask = 'کدام ستون بیشترین مقدار را دارد؟'; opts = d.labels.map(function (l, k) { return { h: l, ok: k === i, m: 'مقدار «' + l + '» برابر ' + fa(d.vals[k]) + ' است؛ ارتفاع ستون‌ها را مقایسه کن.' }; }); ex = '<p>بلندترین ستون «' + d.labels[i] + '» است: ' + M(String(mx)) + '.</p>'; }
  else if (t === 1) { i = d.vals.indexOf(mn); ask = 'کدام ستون کمترین مقدار را دارد؟'; opts = d.labels.map(function (l, k) { return { h: l, ok: k === i, m: 'مقدار «' + l + '» برابر ' + fa(d.vals[k]) + ' است؛ ارتفاع ستون‌ها را مقایسه کن.' }; }); ex = '<p>کوتاه‌ترین ستون «' + d.labels[i] + '» است: ' + M(String(mn)) + '.</p>'; }
  else if (t === 2) { do { i = R(0, d.n - 1); j = R(0, d.n - 1); } while (i === j); var df = abs(d.vals[i] - d.vals[j]); ask = 'اختلاف مقدارِ «' + d.labels[i] + '» و «' + d.labels[j] + '» چقدر است؟'; opts = mkO(df, [{ v: d.vals[i] + d.vals[j], m: 'این جمع است؛ اختلاف یعنی تفریق.' }, { v: df + d.step, m: 'یک خط را بیشتر یا کمتر خوانده‌ای.' }, { v: Math.max(0, df - d.step), m: 'یک خط را بیشتر یا کمتر خوانده‌ای.' }, { v: d.vals[i], m: 'این خودِ مقدارِ یکی از ستون‌هاست.' }]); ex = '<p>مقدارها ' + M(d.vals[i] + ',\\ ' + d.vals[j]) + ' هستند:</p>' + K.dm('|' + d.vals[i] + '-' + d.vals[j] + '|=' + df); }
  else { var sm = d.vals.reduce(function (a, b) { return a + b; }); ask = 'مجموع مقدارِ همهٔ ستون‌ها چقدر است؟'; opts = mkO(sm, [{ v: sm - d.step, m: 'یکی از مقدارها را کم‌تر خوانده‌ای.' }, { v: sm + d.step, m: 'یکی از مقدارها را بیشتر خوانده‌ای.' }, { v: mx, m: 'این بزرگ‌ترین مقدار است، نه مجموع.' }, { v: sm - d.vals[0], m: 'یک ستون را جا انداخته‌ای.' }]); ex = '<p>همهٔ مقدارها را جمع می‌کنیم:</p>' + K.dm(d.vals.join('+') + '=' + sm); }
  return { ask: ask, fig: dsChart(d, {}), cq: '', cls: t < 2 ? 'm2' : 'm2', opts: opts, expl: function () { return ex; } };
}
function stmts(d) {   // جمله‌های درست و نادرست دربارهٔ یک نمودار
  var mx = Math.max.apply(null, d.vals), mn = Math.min.apply(null, d.vals), mi = d.vals.indexOf(mx), ni = d.vals.indexOf(mn), tot = d.vals.reduce(function (a, b) { return a + b; }), i, j, T = [], F = [], other;
  do { i = R(0, d.n - 1); j = R(0, d.n - 1); } while (i === j);
  T.push({ h: 'بیشترین مقدار مربوط به «' + d.labels[mi] + '» است.', e: '<p>بلندترین ستون «' + d.labels[mi] + '» با مقدار ' + M(String(mx)) + ' است.</p>' });
  T.push({ h: 'کمترین مقدار مربوط به «' + d.labels[ni] + '» است.', e: '<p>کوتاه‌ترین ستون «' + d.labels[ni] + '» با مقدار ' + M(String(mn)) + ' است.</p>' });
  T.push({ h: 'مجموع مقدارِ «' + d.labels[i] + '» و «' + d.labels[j] + '» برابر ' + fa(d.vals[i] + d.vals[j]) + ' است.', e: '<p>' + M(d.vals[i] + '+' + d.vals[j] + '=' + (d.vals[i] + d.vals[j])) + '.</p>' });
  T.push({ h: 'مقدارِ «' + d.labels[i] + '» ' + (d.vals[i] > d.vals[j] ? 'بیشتر' : 'کمتر') + ' از مقدارِ «' + d.labels[j] + '» است.', e: '<p>' + M(d.vals[i] + (d.vals[i] > d.vals[j] ? '\\gt' : '\\lt') + d.vals[j]) + '.</p>' });
  other = d.labels.filter(function (l, k) { return k !== mi; }); var wi = d.labels.indexOf(pick(other));
  F.push({ h: 'بیشترین مقدار مربوط به «' + d.labels[wi] + '» است.', e: '<p>بیشترین مقدار مربوط به «' + d.labels[mi] + '» (' + M(String(mx)) + ') است، نه «' + d.labels[wi] + '» (' + M(String(d.vals[wi])) + ').</p>' });
  F.push({ h: 'مجموع مقدارِ «' + d.labels[i] + '» و «' + d.labels[j] + '» برابر ' + fa(d.vals[i] + d.vals[j] + d.step) + ' است.', e: '<p>جمع درست ' + M(d.vals[i] + '+' + d.vals[j] + '=' + (d.vals[i] + d.vals[j])) + ' است.</p>' });
  F.push({ h: 'مقدارِ «' + d.labels[i] + '» ' + (d.vals[i] > d.vals[j] ? 'کمتر' : 'بیشتر') + ' از مقدارِ «' + d.labels[j] + '» است.', e: '<p>' + M(d.vals[i] + (d.vals[i] > d.vals[j] ? '\\gt' : '\\lt') + d.vals[j]) + '؛ برعکس.</p>' });
  F.push({ h: 'مجموع مقدارِ همهٔ ستون‌ها برابر ' + fa(tot + d.step) + ' است.', e: '<p>جمع درست ' + M(d.vals.join('+') + '=' + tot) + ' است.</p>' });
  if (d.vals[i] === d.vals[j] * 2 || d.vals[j] === d.vals[i] * 2) { T.push({ h: 'یکی از «' + d.labels[i] + '» و «' + d.labels[j] + '» دقیقاً دو برابر دیگری است.', e: '<p>' + M(d.vals[i] + ',\\ ' + d.vals[j]) + '.</p>' }); }
  else { F.push({ h: 'مقدارِ «' + d.labels[i] + '» دقیقاً دو برابر «' + d.labels[j] + '» است.', e: '<p>' + M(d.vals[i] + ',\\ ' + d.vals[j]) + '؛ دو برابر نیست.</p>' }); }
  return { T: T, F: F };
}
function genF3() {
  var d = mkDS(), S = stmts(d), t = pick(S.T), f = shuffle(S.F.slice()).slice(0, 3), all = shuffle([t].concat(f));
  return { ask: 'کدام جمله دربارهٔ این نمودار درست است؟', fig: dsChart(d, {}), cq: '', cls: 'm1', opts: all.map(function (x) { return { h: '<span class="snt">' + x.h + '</span>', ok: x === t, m: 'این جمله با نمودار جور درنمی‌آید.' }; }), expl: function () { return all.map(function (x) { return '<div class="trow"><span class="tm ' + (x === t ? 'oky' : 'nox') + '">' + (x === t ? '✓' : '✗') + '</span><span class="snt">' + x.h + '</span></div>'; }).join('') + t.e; } };
}
var TFP = [];
(function () { var k; for (k = 0; k < 14; k++) { var d = mkDS(), S = stmts(d), ok = k % 2 === 0, st = pick(ok ? S.T : S.F); TFP.push({ h: st.h, ok: ok ? 1 : 0, e: st.e + '<p class="legend">مقدارها: ' + d.labels.map(function (l, q) { return l + ' = ' + fa(d.vals[q]); }).join('، ') + '</p>', fig: dsChart(d, {}) }); } })();
return {
  html: function () {
    var d = { labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه'], vals: [15, 25, 10, 20], step: 5, max: 30, title: 'تعداد بازدیدکنندگان موزه', labEvery: 1 };
    return [
      K.sn('۱', 'جدول را بخوان'),
      '<p>در هر جدول، «ردیف‌ها» (افقی) و «ستون‌ها» (عمودی) دارند. برای خواندن یک عدد، ردیف و ستونِ موردنظر را پیدا می‌کنیم و به تقاطعشان نگاه می‌کنیم. پیش از هر چیز، عنوان جدول و سرِ ردیف‌ها و ستون‌ها (و واحدها) را بخوان.</p>',
      ftab([['فروشگاه', 'فروردین', 'اردیبهشت', 'خرداد'], ['الف', fa(30), fa(45), fa(25)], ['ب', fa(20), fa(35), fa(40)]], { hl: 2 }),
      '<p>در این جدول فروشِ فروشگاه «ب» در اردیبهشت، تقاطع ردیف «ب» و ستون «اردیبهشت» است: ' + M('35') + '. خودت امتحان کن:</p><div class="cover p7-act" id="tb" style="animation:none"></div>',

      K.sn('۲', 'نمودار ستونی را بخوان'),
      '<p>در نمودار ستونی، ارتفاع هر ستون مقدارش را نشان می‌دهد. برای خواندن آن:</p><ol><li>عنوان و برچسب محورها را بخوان.</li><li>«قدم» محور عمودی را پیدا کن: فاصلهٔ دو خطِ کنار هم چند واحد است؟</li><li>ببین بالای ستون به کدام خط می‌رسد (یا میان کدام دو خط است).</li></ol>',
      dsChart(d, { hi: 1, guide: 1, showAt: 1 }),
      '<p>در این نمودار قدم ' + M('5') + ' است و ستون «یکشنبه» به خط ' + M('25') + ' می‌رسد. اگر ستونی میان دو خط بود، مقدارش میان آن دو خط است؛ مثلاً وسط ' + M('20') + ' و ' + M('25') + ' یعنی تقریباً ' + M('22.5') + '. روی ستون‌های نمودار بزن و مقدارشان را بخوان:</p><div class="cover p7-act" id="cr" style="animation:none"></div>',
      K.box('err', '⚠ خطاهای رایج', '<ul><li>خواندنِ «شمارهٔ ستون» به‌جای مقدارش.</li><li>گرفتنِ هر خط به‌عنوان ' + M('1') + ' واحد؛ باید قدم محور را از برچسب‌ها بگیری.</li><li>نگاه‌نکردن به عنوان و واحدِ نمودار.</li></ul>'),

      K.sn('۳', 'مقایسه و حساب با داده‌ها'),
      '<p>وقتی مقدارها را خواندی، از آن‌ها می‌شود سؤال‌های مختلف جواب داد:</p>',
      refs([{ c: 'r1', t: 'بیشترین', r: 'بلندترین ستون یا بزرگ‌ترین عددِ جدول.', e: '25' }, { c: 'r2', t: 'کمترین', r: 'کوتاه‌ترین ستون یا کوچک‌ترین عدد.', e: '10' }, { c: 'r3', t: 'اختلاف', r: 'دو مقدار را از هم کم کن.', e: '25-10=15' }, { c: 'r4', t: 'مجموع', r: 'همهٔ مقدارها را جمع کن.', e: '15+25+10+20=70' }]),
      '<p>برای نمودار بالا: بیشترین «یکشنبه» (' + M('25') + ')، کمترین «دوشنبه» (' + M('10') + ')، اختلاف این دو ' + M('25-10=15') + ' و مجموع بازدیدکنندگان ' + M('15+25+10+20=70') + ' است.</p>',
      '<h4>درصد از کل</h4><p>سهمِ یکشنبه از کل: ' + M('\\dfrac{25}{70}') + '. اگر کل ' + M('100') + ' بود، درصد را مستقیم می‌خواندیم. این‌جا ' + M('\\dfrac{25}{70}\\approx36\\%') + ' است؛ یعنی کمی بیشتر از یک‌سوم کل. (حساب درصد را در درس درصد دیده‌ای.)</p>',

      K.sn('۴', 'درستیِ یک جمله را بسنج'),
      '<p>گاهی جمله‌ای دربارهٔ داده‌ها می‌دهند و می‌پرسند درست است یا نه. راه مطمئن: مقدارهای لازم را از نمودار بخوان، در دست بنویس و جمله را با آن‌ها بسنج.</p>',
      AL(['15+10&=25', '25&\\ne20']),
      '<p>مثلاً جمله: «مجموع بازدیدکنندگان شنبه و دوشنبه برابر ' + M('20') + ' است» نادرست است؛ چون ' + M('15+10=25') + '.</p>',
      K.box('note', 'ترتیب کار', '<p>۱) مقدارهای لازم را بخوان. ۲) حساب لازم را انجام بده (مجموع، اختلاف، مقایسه). ۳) نتیجه را با جمله مقایسه کن؛ حدس نزن.</p>'),

      K.sn('۵', 'کارت مرجع'),
      refs([{ c: 'r1', t: 'جدول', r: 'تقاطع ردیف و ستون.', e: '35' }, { c: 'r2', t: 'قدم محور', r: 'فاصلهٔ دو خطِ کنار هم.', e: '5,\\ 10,\\ 15' }, { c: 'r3', t: 'خواندن ستون', r: 'بالای ستون را با خط‌ها بسنج.', e: '25' }, { c: 'r4', t: 'مقایسه', r: 'بیشترین، کمترین، اختلاف.', e: '25\\gt10' }, { c: 'r1', t: 'مجموع', r: 'همهٔ مقدارها را جمع کن.', e: '70' }, { c: 'r3', t: 'بسنجِ جمله', r: 'اول بخوان، بعد حساب کن، بعد مقایسه کن.', e: '15+10=25' }]),

      K.sn('۶', 'خواندن و مقایسه'),
      '<p>هر مرحله با دو پاسخ درست تمام می‌شود. بعد از هر پاسخ، دلیلش را می‌بینی.</p><div class="cover p7-act" id="ss" style="animation:none"></div>',
      K.sn('۷', 'درست یا نادرست؟'),
      '<p>شش جمله با نمودارشان آمده. هر جمله را بسنج.</p><div class="cover p7-act" id="tf" style="animation:none"></div>',
      K.sn('۸', 'تمرین پایانی'),
      '<p>پنج سؤال با نمودارهای تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover p7-act" id="fn" style="animation:none"></div>',
      K.box('sum', 'بعد از این درس باید بتوانی', T`<ul><li>مقدار مشخصی را از جدول (با تقاطع ردیف و ستون) بخوانی.</li><li>مقدار ستون‌ها را با توجه به قدمِ محور از نمودار بخوانی.</li><li>بیشترین، کمترین، اختلاف و مجموع را پیدا کنی.</li><li>درستیِ یک جمله دربارهٔ جدول یا نمودار را با خواندن و حساب‌کردن بسنجی.</li></ul>`)
    ].join('');
  },
  init: function (panel) {
    K.tableReader(panel.querySelector('#tb')); K.chartReader(panel.querySelector('#cr'));
    K.stepRun(panel.querySelector('#ss'), [{ n: 'خواندن مقدار', gen: genF1 }, { n: 'مقایسه و حساب', gen: genF2 }, { n: 'درستیِ جمله', gen: genF3 }], { done: 'حالا برو سراغ تله‌ها.' });
    K.tfRun(panel.querySelector('#tf'), TFP);
    K.finalRun(panel.querySelector('#fn'), [genF1, genF2, genF2, genF3, genF3], { top: 'عالی بود! جدول و نمودار را کاملاً می‌خوانی.' });
  }
};

  }
};
