/* درس مهارت P02 — فضای نمونه و پیشامد (فصل ۷) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.P02 = {
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
var cards2 = function (cells) { return '<div class="sg">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + (c.e ? K.dm(c.e) : '') + '</div>'; }).join('') + '</div>'; };
var cards3 = function (cells) { return '<div class="sg sg3">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.h + '</b><span>' + c.t + '</span></div>'; }).join('') + '</div>'; };
var refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };
var fr = function (n, d) { var g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : '\\dfrac{' + n + '}{' + d + '}'; };
var frU = function (n, d) { return '\\dfrac{' + n + '}{' + d + '}'; };
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
css('css-P02', ['.sg.sg3{grid-template-columns:repeat(3,1fr)}.sg.sg3>div{text-align:center;padding:8px 4px}.sg.sg3 b .katex{font-size:1.3em}','.sg.sg3>div>span{display:block;font-size:.84rem;color:var(--ink-soft);line-height:1.6;margin-top:2px}','.nleq i{display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:3px 11px;line-height:1.3;margin:2px;vertical-align:middle;box-shadow:2px 2px 0 var(--ink)}','.nleq i.n{background:#fff}.nleq.vd{margin:8px 0 12px}.nleq.sm{font-size:1rem}.nleq.sm i{min-height:32px;padding:2px 8px}','.nleq.wrap{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 2px}','.nleq .tg{display:inline-block;font:bold .85rem Tahoma,sans-serif;color:var(--ink-soft);margin:0 6px;direction:rtl;vertical-align:middle}','.nleq .or{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#fff;border:2px solid var(--line);font:bold .8rem Tahoma,sans-serif;direction:rtl;color:var(--ink-soft);vertical-align:middle}','.chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:6px 0 4px;direction:ltr}','.chip{min-width:48px;min-height:42px;border:2px solid var(--ink);border-radius:12px;background:#fff;cursor:pointer;font:inherit;color:var(--ink);padding:2px 10px;box-shadow:2px 2px 0 var(--ink)}','.chip:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}.chip.on{background:var(--mark)}.chip.ok{background:#d2f0e9;border-color:var(--accent)}.chip.no{background:#fbd5d5;border-color:#b23a3a}.chip:disabled{opacity:.55;cursor:default}','.mc.m1{grid-template-columns:1fr}.mc.m3{grid-template-columns:repeat(3,1fr)}.mc.m2{grid-template-columns:repeat(2,1fr)}','.opt svg{display:inline-block;width:auto;max-width:none;height:auto}','.cq{direction:ltr;text-align:center;margin:8px 0}.cq .katex{font-size:1.4em}','.legend{text-align:center;font-size:.84rem;color:var(--ink-soft);margin:2px 0 8px}','.sgnrow{display:flex;gap:12px;justify-content:center;margin:10px 0;direction:ltr}.sgnrow .btn{min-width:84px;min-height:54px;font-size:1.1rem;font-weight:bold}','.sgnrow .btn.right{background:#d2f0e9;border-color:var(--accent)}.sgnrow .btn.wrong{background:#fbd5d5;border-color:#b23a3a}.sgnrow .btn:disabled{opacity:1}','.snt{display:block;direction:rtl;font-size:1rem;line-height:1.9;text-align:center}.snt .katex{font-size:1.1em}','.trow{display:flex;gap:10px;align-items:center;justify-content:center;margin:6px 0;direction:ltr}.trow .tm{font:bold 1.1rem Tahoma;flex:none}.trow .tm.oky{color:var(--accent-dark)}.trow .tm.nox{color:#b23a3a}','.ft{border-collapse:separate;border-spacing:0;margin:8px auto;direction:rtl;font-size:.92rem;max-width:100%}','.ft th,.ft td{border:2px solid var(--ink);padding:4px 10px;text-align:center;background:#fff;min-width:42px}','.ft th{background:#e6f6f3;font-weight:bold;color:var(--ink)}.ft td.hl{background:var(--amber)}.ft th.hl{background:var(--mark)}','.ft tr:first-child th:first-child{border-top-right-radius:10px}.ft tr:first-child th:last-child{border-top-left-radius:10px}.ft tr:last-child td:first-child,.ft tr:last-child th:first-child{border-bottom-right-radius:10px}.ft tr:last-child td:last-child{border-bottom-left-radius:10px}','.tblw{overflow-x:auto;direction:ltr;text-align:center}','.ico{display:inline-block;vertical-align:middle}','@media(max-width:520px){.mc.m3{gap:6px}}','.oc{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;direction:rtl;margin:8px 0}','.oc .o{min-width:58px;padding:6px 10px;border:2px solid var(--ink);border-radius:12px;background:#fff;font-weight:bold;text-align:center;box-shadow:2px 2px 0 var(--ink);cursor:default;direction:rtl;font-size:.95rem}','.oc button.o{cursor:pointer;font:inherit;font-weight:bold;color:var(--ink)}','.oc .o.on{background:var(--mark)}.oc .o.hit{background:#bfe8e0}.oc .o.ok{background:#d2f0e9;border-color:var(--accent)}.oc .o.bad{background:#fbd5d5;border-color:#b23a3a}.oc .o.miss{background:#fff;border-style:dashed}','.oc.num .o{min-width:48px;font-size:1.2rem}','.set{direction:ltr;text-align:center;font-weight:bold;font-size:1.05rem;margin:6px 0;line-height:1.9}','.set .ltr{direction:ltr;display:inline-block}','.dg6{direction:ltr;display:grid;grid-template-columns:28px repeat(6,1fr);gap:3px;max-width:340px;margin:8px auto}','.dg6 span{display:grid;place-items:center;min-height:34px;border:1.5px solid var(--line);border-radius:7px;background:#fff;font-size:.78rem}','.dg6 span.h{background:#f3f6fa;font-weight:bold;border-color:transparent}.dg6 span.hit{background:#7fd0c3;border-color:var(--accent);font-weight:bold}','.appear{animation:apr .35s both}@keyframes apr{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:none}}','.ltr{direction:ltr;display:inline-block}.setx span{unicode-bidi:isolate;white-space:nowrap}.oc.num{direction:ltr}','.sx{display:inline-flex;flex-wrap:wrap;direction:ltr;font-size:.88rem;gap:2px 4px;align-items:center;justify-content:center;max-width:100%}.sx .it{direction:rtl;white-space:nowrap}.sx .cm{margin:0 -2px}'].join('\n'));
var SETS = {
  coin: { n: 'یک سکه', o: ['رو', 'پشت'] },
  die: { n: 'یک تاس', o: [1, 2, 3, 4, 5, 6] },
  coin2: { n: 'دو سکه', o: ['رو-رو', 'رو-پشت', 'پشت-رو', 'پشت-پشت'] },
  cd: { n: 'سکه و تاس', o: [] }
};
['رو', 'پشت'].forEach(function (c) { [1, 2, 3, 4, 5, 6].forEach(function (d) { SETS.cd.o.push(c + '-' + fa(d)); }); });
var fo = function (o) { return typeof o === 'number' ? fa(o) : o; };
var setTxt = function (arr) { return '<span class="sx">' + M('\\{') + arr.map(function (o) { return '<span class="it">' + fo(o) + '</span>'; }).join('<span class="cm">،</span>') + M('\\}') + '</span>'; };
function treeSVG() {
  var s = '<svg viewBox="0 0 300 200" style="max-width:320px;display:block;margin:6px auto;direction:ltr" aria-hidden="true">';
  var L = function (x1, y1, x2, y2) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#14213d" stroke-width="2.4"/>'; };
  var N = function (x, y, t, c) { return '<rect x="' + (x - 24) + '" y="' + (y - 13) + '" width="48" height="26" rx="8" fill="' + c + '" stroke="#14213d" stroke-width="2"/><text x="' + x + '" y="' + (y + 5) + '" text-anchor="middle" font-size="12.5" font-weight="bold" font-family="Tahoma" fill="#14213d">' + t + '</text>'; };
  s += L(150, 24, 80, 84) + L(150, 24, 220, 84) + L(80, 84, 40, 150) + L(80, 84, 120, 150) + L(220, 84, 180, 150) + L(220, 84, 260, 150);
  s += N(150, 20, 'شروع', '#ffc233') + N(80, 84, 'رو', '#7fd0c3') + N(220, 84, 'پشت', '#f2a6c0');
  s += N(40, 150, 'رو', '#bfe8e0') + N(120, 150, 'پشت', '#fde7ef') + N(180, 150, 'رو', '#bfe8e0') + N(260, 150, 'پشت', '#fde7ef');
  s += '<text x="40" y="186" text-anchor="middle" font-size="11" font-family="Tahoma" fill="#14213d">رو-رو</text><text x="120" y="186" text-anchor="middle" font-size="11" font-family="Tahoma" fill="#14213d">رو-پشت</text><text x="180" y="186" text-anchor="middle" font-size="11" font-family="Tahoma" fill="#14213d">پشت-رو</text><text x="260" y="186" text-anchor="middle" font-size="11" font-family="Tahoma" fill="#14213d">پشت-پشت</text>';
  return s + '</svg>';
}

/* ---- سازندهٔ فضای نمونه ---- */
K.spaceMaker = function (host) {
  var key = 'coin2';
  function paint() {
    var S = SETS[key], h = '<div class="chips p7-fa">' + Object.keys(SETS).map(function (k) { return '<button type="button" class="chip' + (k === key ? ' on' : '') + '" data-k="' + k + '">' + SETS[k].n + '</button>'; }).join('') + '</div>';
    h += '<p class="ask" style="text-align:center">همهٔ حالت‌های ممکنِ «پرتاب ' + S.n.replace('یک ', '') + '»:</p>' + (key === 'coin2' ? treeSVG() : '');
    h += '<div class="oc' + (key === 'die' ? ' num' : '') + '">' + S.o.map(function (o, i) { return '<span class="o appear" style="animation-delay:' + i * 0.04 + 's">' + fo(o) + '</span>'; }).join('') + '</div>';
    h += '<div class="set">S = <span class="ltr">' + setTxt(S.o) + '</span></div><div class="nleq vd sm"><i class="a">تعداد حالت‌ها: ' + fa(S.o.length) + '</i></div>';
    if (key === 'coin2') { h += '<p class="legend">دقت کن: «رو-پشت» و «پشت-رو» دو حالتِ متفاوت‌اند؛ چون ترتیب پرتاب‌ها مهم است.</p>'; }
    if (key === 'cd') { h += '<p class="legend">هر حالتِ سکه با هر حالتِ تاس جفت می‌شود: ' + fa(2) + ' × ' + fa(6) + ' = ' + fa(12) + '.</p>'; }
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) { var c = e.target.closest('.chip'); if (c) { key = c.dataset.k; paint(); } }); paint();
};

/* ---- پیشامد را بساز ---- */
var EV = {
  die: [{ d: 'عدد رو شده زوج باشد', f: function (x) { return x % 2 === 0; } }, { d: 'عدد رو شده اول باشد', f: function (x) { return [2, 3, 5].indexOf(x) > -1; } }, { d: 'عدد رو شده مضرب ۳ باشد', f: function (x) { return x % 3 === 0; } }, { d: 'عدد رو شده بزرگ‌تر از ۴ باشد', f: function (x) { return x > 4; } }, { d: 'عدد رو شده مضرب ۳ نباشد', f: function (x) { return x % 3 !== 0; } }, { d: 'عدد رو شده فرد و بزرگ‌تر از ۱ باشد', f: function (x) { return x % 2 === 1 && x > 1; } }, { d: 'عدد رو شده ۷ باشد', f: function () { return false; } }, { d: 'عدد رو شده کمتر از ۷ باشد', f: function () { return true; } }],
  coin2: [{ d: 'حداقل یک بار «رو» بیاید', f: function (x) { return x.indexOf('رو') > -1; } }, { d: 'هر دو بار یک‌جور بیاید', f: function (x) { var p = x.split('-'); return p[0] === p[1]; } }, { d: 'بار اول «رو» بیاید', f: function (x) { return x.split('-')[0] === 'رو'; } }, { d: 'دقیقاً یک بار «پشت» بیاید', f: function (x) { return x.split('-').filter(function (z) { return z === 'پشت'; }).length === 1; } }, { d: 'هیچ‌بار «رو» نیاید', f: function (x) { return x.indexOf('رو') < 0; } }]
};
K.eventPick = function (host) {
  var key = 'die', ei, sel, done;
  function nw() { ei = R(0, EV[key].length - 1); sel = {}; done = false; }
  function paint() {
    var S = SETS[key], E = EV[key][ei], truth = S.o.filter(function (o) { return E.f(o); }), h = '<div class="chips p7-fa"><button type="button" class="chip' + (key === 'die' ? ' on' : '') + '" data-k="die">تاس</button><button type="button" class="chip' + (key === 'coin2' ? ' on' : '') + '" data-k="coin2">دو سکه</button></div>', ok;
    h += '<p class="ask">پیشامد: «' + (key === 'die' ? E.d : E.d) + '». حالت‌هایی را که در این پیشامد هستند علامت بزن:</p><div class="oc' + (key === 'die' ? ' num' : '') + '">' + S.o.map(function (o, i) { var on = sel[i], c = ''; if (done) { var t = E.f(o); c = t && on ? ' ok' : t && !on ? ' miss' : !t && on ? ' bad' : ''; } else if (on) { c = ' on'; } return '<button type="button" class="o' + c + '" data-i="' + i + '"' + (done ? ' disabled' : '') + '>' + fo(o) + '</button>'; }).join('') + '</div>';
    if (done) {
      var chosen = S.o.filter(function (o, i) { return sel[i]; }); ok = chosen.length === truth.length && chosen.every(function (o) { return truth.indexOf(o) > -1; });
      h += '<div class="fb ' + (ok ? 'ok' : 'bad') + '">' + (ok ? 'درست است! ✓' : 'درست نبود؛ حالت‌های خط‌چین جا افتاده‌اند و قرمزها اضافه‌اند.') + '</div><div class="set">A = <span class="ltr">' + (truth.length ? setTxt(truth) : '{ } (مجموعهٔ تهی)') + '</span></div>' + (truth.length === 0 ? '<p class="legend">هیچ حالتی مطلوب نیست؛ این «پیشامد ناممکن» است.</p>' : truth.length === S.o.length ? '<p class="legend">همهٔ حالت‌ها مطلوب‌اند؛ این «پیشامد قطعی» است (برابر با خودِ فضای نمونه).</p>' : '');
    }
    h += '<div class="opts ' + (done ? 'p7-ops' : 'p7-pair') + '">' + (done ? '' : '<button type="button" class="btn primary" data-go="1">بررسی</button>') + '<button type="button" class="btn" data-nw="1" data-scroll>پیشامد دیگر</button></div>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) { return; }
    if (b.dataset.k) { key = b.dataset.k; nw(); paint(); } else if (b.dataset.i !== undefined && !done) { sel[b.dataset.i] = !sel[b.dataset.i]; paint(); } else if (b.dataset.go) { done = true; paint(); } else if (b.dataset.nw) { nw(); paint(); }
  }); nw(); paint();
};

/* ---- جدول دو تاس ---- */
K.diceGrid = function (host) {
  var C = [{ d: 'مجموع دو تاس ۷ باشد', f: function (a, b) { return a + b === 7; } }, { d: 'دو تاس یک‌جور باشند', f: function (a, b) { return a === b; } }, { d: 'مجموع بیشتر از ۹ باشد', f: function (a, b) { return a + b > 9; } }, { d: 'حداقل یکی ۶ باشد', f: function (a, b) { return a === 6 || b === 6; } }, { d: 'اختلاف دو تاس ۱ باشد', f: function (a, b) { return abs(a - b) === 1; } }, { d: 'هر دو زوج باشند', f: function (a, b) { return a % 2 === 0 && b % 2 === 0; } }], ci = 0;
  function paint() {
    var h = '<div class="chips p7-fa">' + C.map(function (c, i) { return '<button type="button" class="chip' + (i === ci ? ' on' : '') + '" data-c="' + i + '" style="font-size:.82rem">' + c.d + '</button>'; }).join('') + '</div><div class="dg6"><span class="h"></span>', a, b, n = 0;
    for (b = 1; b <= 6; b++) { h += '<span class="h">' + fa(b) + '</span>'; }
    for (a = 1; a <= 6; a++) { h += '<span class="h">' + fa(a) + '</span>'; for (b = 1; b <= 6; b++) { var t = C[ci].f(a, b); if (t) { n++; } h += '<span class="' + (t ? 'hit' : '') + '">' + fa(a + b) + '</span>'; } }
    h += '</div><p class="legend">سطر: تاس اول · ستون: تاس دوم · عدد داخل هر خانه: مجموع دو تاس</p><div class="fb ok">در ' + fa(n) + ' خانه از ' + fa(36) + ' خانه این پیشامد رخ می‌دهد.</div>';
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) { var c = e.target.closest('.chip'); if (c) { ci = +c.dataset.c; paint(); } }); paint();
};

/* ================= تولید سؤال ================= */
var DESCR = [
  { n: 'پرتاب یک سکه', c: 2, e: '۲' }, { n: 'پرتاب یک تاس', c: 6, e: '۶' }, { n: 'پرتاب دو سکه', c: 4, e: '۲ × ۲' }, { n: 'پرتاب سه سکه', c: 8, e: '۲ × ۲ × ۲' }, { n: 'پرتاب یک سکه و یک تاس', c: 12, e: '۲ × ۶' }, { n: 'پرتاب دو تاس', c: 36, e: '۶ × ۶' }, { n: 'برداشتن یک کارت از کارت‌های ۱ تا ۱۰', c: 10, e: '۱۰' }
];
function mkSimple(correct, wrongs) { var list = uniqBy([{ h: correct.h, ok: 1, m: '' }].concat(wrongs.map(function (w) { return { h: w.h, ok: 0, m: w.m }; })), function (x) { return x.h; }), w = shuffle(list.slice(1)).slice(0, 3); return shuffle([list[0]].concat(w).map(function (z) { return { h: z.h, ok: !!z.ok, m: z.m || 'این گزینه درست نیست.' }; })); }
function genC1() {
  var d = pick(DESCR), c = d.c;
  return { ask: 'فضای نمونهٔ آزمایش «' + d.n + '» چند حالت دارد؟', fig: '', cq: '', cls: 'm2', opts: mkSimple({ h: M(String(c)) }, [{ h: M(String(c - 1)), m: 'یک حالت را نشمرده‌ای.' }, { h: M(String(c + 2)), m: 'بیشتر از حالت‌های ممکن شمرده‌ای.' }, { h: M(String(Math.max(2, Math.round(c / 2)))), m: 'حالت‌ها را کم شمرده‌ای.' }, { h: M(String(c * 2)), m: 'حالت‌ها را بیش از اندازه شمرده‌ای.' }]), expl: function () { return '<p>' + d.n + ': ' + (d.c > 6 && d.c !== 10 ? 'هر حالتِ اولی با هر حالتِ دومی جفت می‌شود:' : 'همهٔ حالت‌ها را می‌شماریم:') + '</p>' + K.dm(d.e.replace(/[۰-۹]/g, function (x) { return String.fromCharCode(x.charCodeAt(0) - 1728); }).replace('×', '\\times') + '=' + c); } };
}
function genC2() {   // انتخاب فضای نمونهٔ درست
  var t = R(0, 3), correct, S, wr = [], nm;
  if (t === 0) { nm = 'یک تاس'; S = [1, 2, 3, 4, 5, 6]; correct = setTxt(S); wr = [{ h: setTxt([1, 2, 3, 4, 5]), m: 'یک وجه (۶) جا افتاده است.' }, { h: setTxt([0, 1, 2, 3, 4, 5, 6]), m: 'تاس وجهِ ۰ ندارد.' }, { h: setTxt([2, 4, 6]), m: 'این یک «پیشامد» است (زوج‌ها)، نه همهٔ حالت‌ها.' }]; }
  else if (t === 1) { nm = 'دو سکه'; S = SETS.coin2.o; correct = setTxt(S); wr = [{ h: setTxt(['رو-رو', 'رو-پشت', 'پشت-پشت']), m: 'حالتِ «پشت-رو» جا افتاده است؛ ترتیب مهم است.' }, { h: setTxt(['رو', 'پشت']), m: 'این فضای نمونهٔ «یک» سکه است.' }, { h: setTxt(['رو-رو', 'رو-پشت', 'پشت-رو', 'پشت-پشت', 'رو']), m: '«رو» به‌تنهایی یک حالت ممکن برای دو سکه نیست.' }]; }
  else if (t === 2) { nm = 'یک چرخ با رنگ‌های قرمز، آبی و سبز'; S = ['قرمز', 'آبی', 'سبز']; correct = setTxt(S); wr = [{ h: setTxt(['قرمز', 'آبی']), m: 'رنگ سبز جا افتاده است.' }, { h: setTxt(['قرمز', 'آبی', 'سبز', 'زرد']), m: 'رنگ زرد روی چرخ نیست.' }, { h: setTxt(['رو', 'پشت']), m: 'این برای سکه است، نه چرخ.' }]; }
  else { nm = 'یک کارت از کارت‌های ۱ تا ۴'; S = [1, 2, 3, 4]; correct = setTxt(S); wr = [{ h: setTxt([1, 2, 3]), m: 'کارت ۴ جا افتاده است.' }, { h: setTxt([1, 2, 3, 4, 5]), m: 'کارتِ ۵ وجود ندارد.' }, { h: setTxt([2, 4]), m: 'این فقط زوج‌هاست؛ یک پیشامد است.' }]; }
  return { ask: 'فضای نمونهٔ آزمایش «پرتاب/انتخاب ' + nm + '» کدام است؟', fig: '', cq: '', cls: 'm1', opts: mkSimple({ h: '<span class="snt"><span class="ltr">' + correct + '</span></span>' }, wr.map(function (w) { return { h: '<span class="snt"><span class="ltr">' + w.h + '</span></span>', m: w.m }; })), expl: function () { return '<p>باید همهٔ حالت‌های ممکن را بنویسی، نه کمتر و نه بیشتر:</p><div class="set">S = <span class="ltr">' + correct + '</span></div>'; } };
}
function genC3() {   // پیشامد روی تاس
  var E = pick(EV.die.slice(0, 6)), S = [1, 2, 3, 4, 5, 6], A = S.filter(E.f), cand, bad = [];
  var miss = A.slice(1), extra = A.concat(S.filter(function (x) { return !E.f(x); }).slice(0, 1)).sort(function (a, b) { return a - b; }), comp = S.filter(function (x) { return !E.f(x); });
  return { ask: 'پیشامد «' + E.d + '» در پرتاب یک تاس شامل کدام حالت‌هاست؟', fig: '', cq: '', cls: 'm1', opts: mkSimple({ h: '<span class="snt"><span class="ltr">' + setTxt(A) + '</span></span>' }, [{ h: '<span class="snt"><span class="ltr">' + setTxt(miss) + '</span></span>', m: 'یک حالت جا افتاده است.' }, { h: '<span class="snt"><span class="ltr">' + setTxt(extra) + '</span></span>', m: 'یک حالت اضافه است که در پیشامد نمی‌گنجد.' }, { h: '<span class="snt"><span class="ltr">' + setTxt(comp) + '</span></span>', m: 'این حالت‌های «مخالف» پیشامدند.' }]), expl: function () { return '<p>هر وجه تاس را جدا بررسی می‌کنیم و فقط آن‌هایی را که شرط را دارند برمی‌داریم:</p><div class="set">A = <span class="ltr">' + setTxt(A) + '</span></div>'; } };
}
var TFP = [
  { h: 'فضای نمونهٔ پرتاب دو سکه ' + fa(3) + ' حالت دارد.', ok: 0, e: '<p>چهار حالت دارد: رو-رو، رو-پشت، پشت-رو، پشت-پشت.</p>' },
  { h: 'هر پیشامد زیرمجموعه‌ای از فضای نمونه است.', ok: 1, e: '<p>پیشامد یعنی گروهی از حالت‌های فضای نمونه.</p>' },
  { h: 'در پرتاب تاس، پیشامد «اول بودن» برابر ' + M('\\{1,2,3,5\\}') + ' است.', ok: 0, e: '<p>' + M('1') + ' اول نیست. پیشامد درست: ' + M('\\{2,3,5\\}') + '.</p>' },
  { h: 'پرتاب یک سکه و یک تاس ' + fa(12) + ' حالت دارد.', ok: 1, e: '<p>' + M('2\\times6=12') + '.</p>' },
  { h: 'در پرتاب تاس، پیشامد «عدد رو شده ' + fa(7) + ' باشد» مجموعهٔ تهی است.', ok: 1, e: '<p>تاس عدد ۷ ندارد؛ پس هیچ حالتی مطلوب نیست (پیشامد ناممکن).</p>' },
  { h: 'در پرتاب تاس، پیشامد «عدد رو شده کمتر از ' + fa(7) + ' باشد» با خودِ فضای نمونه برابر است.', ok: 1, e: '<p>هر شش وجه این شرط را دارند (پیشامد قطعی).</p>' },
  { h: 'حالت‌های «رو-پشت» و «پشت-رو» یک حالت‌اند.', ok: 0, e: '<p>ترتیب پرتاب‌ها مهم است؛ این دو حالتِ متفاوت‌اند.</p>' },
  { h: 'فضای نمونهٔ پرتاب یک تاس ' + M('\\{2,4,6\\}') + ' است.', ok: 0, e: '<p>این مجموعه فقط «زوج‌ها» (یک پیشامد) است؛ فضای نمونه ' + M('\\{1,2,3,4,5,6\\}') + ' است.</p>' },
  { h: 'پرتاب سه سکه ' + fa(8) + ' حالت دارد.', ok: 1, e: '<p>' + M('2\\times2\\times2=8') + '.</p>' },
  { h: 'در یک فضای نمونه با ' + fa(6) + ' حالت، یک پیشامد می‌تواند ' + fa(7) + ' عضو داشته باشد.', ok: 0, e: '<p>پیشامد زیرمجموعهٔ فضاست؛ پس نمی‌تواند عضوِ بیشتری از آن داشته باشد.</p>' }
];
return {
  html: function () {
    return [
      K.sn('۱', 'آزمایش تصادفی و فضای نمونه'),
      '<p>آزمایشی که نتیجه‌اش را از قبل نمی‌دانیم، «آزمایش تصادفی» است؛ مثل پرتاب سکه یا تاس. فهرست همهٔ نتیجه‌های ممکن را <b>فضای نمونه</b> می‌نامیم و با ' + M('S') + ' نشان می‌دهیم. هر نتیجه یک «حالت» است. آزمایش را انتخاب کن و فضای نمونه‌اش را ببین:</p><div class="cover p7-act" id="sm" style="animation:none"></div>',
      K.box('note', 'قاعدهٔ نوشتن', '<ul><li>همهٔ حالت‌ها را بنویس؛ نه بیشتر و نه کمتر.</li><li>هر حالت فقط یک‌بار بیاید.</li><li>وقتی چند پرتاب پشت‌سرهم داریم، ترتیب مهم است: «رو-پشت» با «پشت-رو» فرق دارد.</li></ul>'),

      K.sn('۲', 'چند حالت؟ شمارش با ضرب'),
      '<p>برای آزمایش‌های چندمرحله‌ای، لازم نیست همهٔ حالت‌ها را بنویسیم تا تعدادشان را بدانیم. تعداد حالت‌های هر مرحله را در هم ضرب می‌کنیم:</p>', K.dm('2\\times2=4\\qquad2\\times6=12\\qquad6\\times6=36'),
      '<p>برای دو سکه، درخت زیر هر مرحله را نشان می‌دهد و هر مسیر از «شروع» تا پایین یک حالت است:</p>', treeSVG(),
      '<p>برای دو تاس، جدول ' + M('6\\times6') + ' سی‌وشش حالت دارد. یک شرط را انتخاب کن و ببین در چند خانه رخ می‌دهد:</p><div class="cover p7-act" id="dg" style="animation:none"></div>',

      K.sn('۳', 'پیشامد'),
      '<p><b>پیشامد</b> یعنی گروهی از حالت‌های فضای نمونه که شرطی را دارند؛ یعنی زیرمجموعه‌ای از ' + M('S') + '. مثلاً در پرتاب تاس، پیشامد «زوج‌بودن» برابر است با:</p>', K.dm('A=\\{2,4,6\\}\\ \\subseteq\\ S=\\{1,2,3,4,5,6\\}'),
      cards3([{ c: 'p', h: M('\\{4\\}'), t: 'پیشامد ساده: فقط یک حالت' }, { c: 'n', h: M('\\{\\ \\}'), t: 'پیشامد ناممکن: هیچ حالتی (مجموعهٔ تهی)' }, { c: 'r3', h: M('S'), t: 'پیشامد قطعی: همهٔ حالت‌ها' }]),
      '<p>خودت پیشامد را بساز. حالت‌های مطلوب را علامت بزن:</p><div class="cover p7-act" id="ep" style="animation:none"></div>',
      K.box('err', '⚠ خطاهای رایج', '<ul><li>«اول» در تاس را ' + M('\\{1,2,3,5\\}') + ' نوشتن؛ ' + M('1') + ' اول نیست.</li><li>در دو سکه «پشت-رو» را فراموش‌کردن.</li><li>نوشتنِ حالتی که اصلاً در فضای نمونه نیست (مثلاً ' + M('7') + ' برای تاس).</li></ul>'),

      K.sn('۴', 'کارت مرجع'),
      refs([{ c: 'r1', t: 'فضای نمونه', r: 'همهٔ حالت‌های ممکن.', e: 'S=\\{1,2,3,4,5,6\\}' }, { c: 'r2', t: 'پیشامد', r: 'زیرمجموعه‌ای از فضای نمونه.', e: 'A=\\{2,4,6\\}' }, { c: 'r3', t: 'شمارش با ضرب', r: 'تعداد حالت‌های مرحله‌ها را ضرب کن.', e: '2\\times6=12' }, { c: 'r4', t: 'ترتیب', r: 'در پرتاب‌های پشت‌سرهم مهم است.', e: '(H,T)\\neq(T,H)' }, { c: 'r1', t: 'ناممکن', r: 'پیشامد بدون هیچ حالت.', e: '\\{\\ \\}' }, { c: 'r3', t: 'قطعی', r: 'پیشامد برابر با کل فضا.', e: 'A=S' }]),

      K.sn('۵', 'فضا و پیشامد'),
      '<p>هر مرحله با دو پاسخ درست تمام می‌شود. بعد از هر پاسخ، دلیلش را می‌بینی.</p><div class="cover p7-act" id="ss" style="animation:none"></div>',
      K.sn('۶', 'درست یا نادرست؟'),
      '<p>شش جمله را بسنج. به تله‌ها دقت کن.</p><div class="cover p7-act" id="tf" style="animation:none"></div>',
      K.sn('۷', 'تمرین پایانی'),
      '<p>پنج سؤال با آزمایش‌های تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover p7-act" id="fn" style="animation:none"></div>',
      K.box('sum', 'بعد از این درس باید بتوانی', T`<ul><li>فضای نمونهٔ یک آزمایش تصادفی ساده (سکه، تاس، چرخ) را کامل بنویسی.</li><li>تعداد حالت‌های آزمایش‌های چندمرحله‌ای را با ضرب بشماری.</li><li>پیشامد را زیرمجموعه‌ای از فضای نمونه بدانی و آن را فهرست کنی.</li><li>پیشامد ساده، ناممکن و قطعی را بشناسی.</li></ul><p>این مهارت پایهٔ درس مجموعه‌ها و عملیات روی مجموعه‌هاست.</p>`)
    ].join('');
  },
  init: function (panel) {
    K.spaceMaker(panel.querySelector('#sm')); K.diceGrid(panel.querySelector('#dg')); K.eventPick(panel.querySelector('#ep'));
    K.stepRun(panel.querySelector('#ss'), [{ n: 'تعداد حالت‌ها', gen: genC1 }, { n: 'فضای نمونه', gen: genC2 }, { n: 'پیشامد', gen: genC3 }], { done: 'حالا برو سراغ تله‌ها.' });
    K.tfRun(panel.querySelector('#tf'), TFP);
    K.finalRun(panel.querySelector('#fn'), [genC1, genC2, genC2, genC3, genC3], { top: 'عالی بود! فضای نمونه و پیشامد را کاملاً فهمیده‌ای.' });
  }
};

  }
};
