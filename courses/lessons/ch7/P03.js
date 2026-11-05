/* درس مهارت P03 — شناخت، سازمان‌دهی و نمایش داده‌ها (فصل ۷) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.P03 = {
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
css('css-P03', ['.sg.sg3{grid-template-columns:repeat(3,1fr)}.sg.sg3>div{text-align:center;padding:8px 4px}.sg.sg3 b .katex{font-size:1.3em}','.sg.sg3>div>span{display:block;font-size:.84rem;color:var(--ink-soft);line-height:1.6;margin-top:2px}','.nleq i{display:inline-flex;align-items:center;justify-content:center;min-height:36px;padding:3px 11px;line-height:1.3;margin:2px;vertical-align:middle;box-shadow:2px 2px 0 var(--ink)}','.nleq i.n{background:#fff}.nleq.vd{margin:8px 0 12px}.nleq.sm{font-size:1rem}.nleq.sm i{min-height:32px;padding:2px 8px}','.nleq.wrap{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 2px}','.nleq .tg{display:inline-block;font:bold .85rem Tahoma,sans-serif;color:var(--ink-soft);margin:0 6px;direction:rtl;vertical-align:middle}','.nleq .or{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#fff;border:2px solid var(--line);font:bold .8rem Tahoma,sans-serif;direction:rtl;color:var(--ink-soft);vertical-align:middle}','.chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:6px 0 4px;direction:ltr}','.chip{min-width:48px;min-height:42px;border:2px solid var(--ink);border-radius:12px;background:#fff;cursor:pointer;font:inherit;color:var(--ink);padding:2px 10px;box-shadow:2px 2px 0 var(--ink)}','.chip:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}.chip.on{background:var(--mark)}.chip.ok{background:#d2f0e9;border-color:var(--accent)}.chip.no{background:#fbd5d5;border-color:#b23a3a}.chip:disabled{opacity:.55;cursor:default}','.mc.m1{grid-template-columns:1fr}.mc.m3{grid-template-columns:repeat(3,1fr)}.mc.m2{grid-template-columns:repeat(2,1fr)}','.opt svg{display:inline-block;width:auto;max-width:none;height:auto}','.cq{direction:ltr;text-align:center;margin:8px 0}.cq .katex{font-size:1.4em}','.legend{text-align:center;font-size:.84rem;color:var(--ink-soft);margin:2px 0 8px}','.sgnrow{display:flex;gap:12px;justify-content:center;margin:10px 0;direction:ltr}.sgnrow .btn{min-width:84px;min-height:54px;font-size:1.1rem;font-weight:bold}','.sgnrow .btn.right{background:#d2f0e9;border-color:var(--accent)}.sgnrow .btn.wrong{background:#fbd5d5;border-color:#b23a3a}.sgnrow .btn:disabled{opacity:1}','.snt{display:block;direction:rtl;font-size:1rem;line-height:1.9;text-align:center}.snt .katex{font-size:1.1em}','.trow{display:flex;gap:10px;align-items:center;justify-content:center;margin:6px 0;direction:ltr}.trow .tm{font:bold 1.1rem Tahoma;flex:none}.trow .tm.oky{color:var(--accent-dark)}.trow .tm.nox{color:#b23a3a}','.ft{border-collapse:separate;border-spacing:0;margin:8px auto;direction:rtl;font-size:.92rem;max-width:100%}','.ft th,.ft td{border:2px solid var(--ink);padding:4px 10px;text-align:center;background:#fff;min-width:42px}','.ft th{background:#e6f6f3;font-weight:bold;color:var(--ink)}.ft td.hl{background:var(--amber)}.ft th.hl{background:var(--mark)}','.ft tr:first-child th:first-child{border-top-right-radius:10px}.ft tr:first-child th:last-child{border-top-left-radius:10px}.ft tr:last-child td:first-child,.ft tr:last-child th:first-child{border-bottom-right-radius:10px}.ft tr:last-child td:last-child{border-bottom-left-radius:10px}','.tblw{overflow-x:auto;direction:ltr;text-align:center}','.ico{display:inline-block;vertical-align:middle}','@media(max-width:520px){.mc.m3{gap:6px}}','.dcard{margin:10px auto;max-width:320px;border:2.5px solid var(--ink);border-radius:16px;background:#fff;box-shadow:3px 3px 0 var(--ink);padding:14px 10px;text-align:center;font-size:1.25rem;font-weight:bold}','.dcard small{display:block;font-size:.8rem;color:var(--ink-soft);font-weight:normal;margin-top:4px}','.rawrow{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;direction:rtl;margin:8px 0}','.rawrow span{min-width:34px;padding:2px 8px;border:2px solid var(--line);border-radius:9px;background:#fff;font-size:.9rem;text-align:center}.rawrow span.cur{border-color:var(--ink);background:var(--mark);font-weight:bold;box-shadow:2px 2px 0 var(--ink)}.rawrow span.dn{background:#e6f6f3;border-color:var(--accent);color:var(--ink-soft)}','.tally{font:bold 1.25rem Tahoma,sans-serif;letter-spacing:1px;direction:ltr;display:inline-block}','.tally .g5{position:relative;display:inline-block;margin-right:6px}.tally .g5:after{content:"";position:absolute;left:-3px;right:-3px;top:50%;border-top:2.5px solid var(--pink);transform:rotate(-18deg)}','.ftt{border-collapse:separate;border-spacing:0;margin:8px auto;direction:rtl;font-size:.95rem}.ftt th,.ftt td{border:2px solid var(--ink);padding:4px 10px;text-align:center;background:#fff;cursor:default}.ftt th{background:#e6f6f3;color:var(--ink)}','.ftt tr.pickr td{cursor:pointer}.ftt tr.pickr:hover td{background:#fff6d6}.ftt tr.flash td{background:#d2f0e9}.ftt tr.bad td{background:#fbd5d5}','.ftt td.tt{min-width:120px}','.mini{display:inline-block;vertical-align:middle;margin:0 6px}','.shake{animation:shk .35s}@keyframes shk{20%{transform:translateX(-5px)}40%{transform:translateX(5px)}60%{transform:translateX(-4px)}80%{transform:translateX(3px)}}'].join('\n'));
/* ---- شکل‌های نمودار ---- */
function pieSVG(vals, labs, cols, sz) {
  var tot = vals.reduce(function (a, b) { return a + b; }, 0), a0 = -Math.PI / 2, s = '<svg viewBox="0 0 220 220" style="max-width:' + (sz || 220) + 'px;display:block;margin:6px auto" aria-hidden="true">';
  vals.forEach(function (v, k) { var a1 = a0 + v / tot * 2 * Math.PI, x0 = 110 + 96 * Math.cos(a0), y0 = 110 + 96 * Math.sin(a0), x1 = 110 + 96 * Math.cos(a1), y1 = 110 + 96 * Math.sin(a1), big = (a1 - a0) > Math.PI ? 1 : 0, am = (a0 + a1) / 2; s += '<path d="M110 110 L' + x0 + ' ' + y0 + ' A96 96 0 ' + big + ' 1 ' + x1 + ' ' + y1 + ' Z" fill="' + cols[k % cols.length] + '" stroke="#14213d" stroke-width="2.5" stroke-linejoin="round"/>' + (labs ? '<text x="' + (110 + 60 * Math.cos(am)) + '" y="' + (110 + 60 * Math.sin(am) + 4) + '" text-anchor="middle" font-size="12" font-weight="bold" font-family="Tahoma" fill="#14213d">' + labs[k] + '</text>' : ''); a0 = a1; });
  return s + '</svg>';
}
function lineSVG(labels, vals, o) {
  o = o || {}; var W = 340, H = 200, L = 40, Rr = 14, Tp = 18, B = 36, max = o.max, step = o.step, n = labels.length, x = function (i) { return L + (i + 0.5) / n * (W - L - Rr); }, y = function (v) { return Tp + (1 - v / max) * (H - Tp - B); }, s = '<svg viewBox="0 0 ' + W + ' ' + H + '" style="max-width:100%;display:block;margin:6px auto;direction:ltr" aria-hidden="true">', v, i, pts = [];
  for (v = 0; v <= max + 1e-9; v += step) { s += '<line x1="' + L + '" y1="' + y(v) + '" x2="' + (W - Rr) + '" y2="' + y(v) + '" stroke="' + (v === 0 ? '#14213d' : '#d5dde8') + '" stroke-width="' + (v === 0 ? 2.2 : 1) + '"/><text x="' + (L - 6) + '" y="' + (y(v) + 4) + '" text-anchor="end" font-size="11" font-family="Tahoma" fill="#14213d">' + fa(v) + '</text>'; }
  s += '<line x1="' + L + '" y1="' + Tp + '" x2="' + L + '" y2="' + y(0) + '" stroke="#14213d" stroke-width="2.2"/>';
  vals.forEach(function (q, k) { pts.push(x(k) + ',' + y(q)); });
  s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="#d6457a" stroke-width="3" stroke-linejoin="round"/>';
  vals.forEach(function (q, k) { s += '<circle cx="' + x(k) + '" cy="' + y(q) + '" r="4.5" fill="#ffc233" stroke="#14213d" stroke-width="2"/><text x="' + x(k) + '" y="' + (y(0) + 16) + '" text-anchor="middle" font-size="11" font-family="Tahoma" fill="#14213d">' + labels[k] + '</text>'; });
  return s + '</svg>';
}
var tallyHTML = function (n) { var h = '', g = Math.floor(n / 5), r = n % 5, i; for (i = 0; i < g; i++) { h += '<span class="g5">||||</span>'; } return '<span class="tally">' + h + new Array(r + 1).join('|') + '</span>'; };
var COLS5 = ['#7fd0c3', '#f2a6c0', '#9fb0ff', '#ffd27a', '#bfe8e0'];

/* ---- دسته‌بند داده‌ها ---- */
var DT = [
  { t: 'قد دانش‌آموزان', n: 1, w: 'با قد می‌شود جمع و میانگین گرفت؛ پس عددی است.' }, { t: 'رنگ چشم', n: 0, w: 'رنگ را نمی‌شود جمع زد یا میانگین گرفت؛ پس دسته‌ای است.' },
  { t: 'تعداد خواهر و برادر', n: 1, w: 'شمارش است و میانگین‌اش معنی دارد؛ پس عددی است.' }, { t: 'شهر محل تولد', n: 0, w: 'نام شهر یک دسته است، نه مقدار.' },
  { t: 'نمرهٔ درس ریاضی', n: 1, w: 'نمره عدد است و میانگین‌اش معنی دارد.' }, { t: 'گروه خونی', n: 0, w: 'گروه خونی دسته است؛ میانگین ' + M('A') + ' و ' + M('B') + ' معنی ندارد.' },
  { t: 'شمارهٔ دانش‌آموزی', n: 0, w: 'عدد است، اما فقط «برچسب» است؛ میانگین شماره‌ها معنی ندارد؛ پس دسته‌ای است.' }, { t: 'دمای هوا', n: 1, w: 'اندازه‌گیری است و میانگین دما معنی دارد.' },
  { t: 'ورزش مورد علاقه', n: 0, w: 'نام ورزش یک دسته است.' }, { t: 'وزن دانش‌آموزان', n: 1, w: 'اندازه‌گیری است؛ پس عددی است.' },
  { t: 'کد پستی', n: 0, w: 'کد پستی برچسب است؛ میانگین کدها معنی ندارد.' }, { t: 'تعداد گل‌های یک بازی', n: 1, w: 'شمارش است؛ پس عددی است.' },
  { t: 'مارک گوشی', n: 0, w: 'نام مارک یک دسته است.' }, { t: 'مدت زمان رفتن تا مدرسه', n: 1, w: 'زمان اندازه‌گیری می‌شود؛ پس عددی است.' }
];
K.dataSort = function (host) {
  var L, i, ans, sc;
  function nw() { L = shuffle(DT.slice()).slice(0, 8); i = 0; ans = null; sc = 0; }
  function paint() {
    var h, q;
    if (i >= L.length) { host.innerHTML = rr('<div class="fb ' + (sc >= 7 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(sc) + ' از ' + fa(L.length) + '</b></div><p class="legend">قاعدهٔ ساده: بپرس «جمع‌کردن یا میانگین‌گرفتنِ این داده معنی دارد؟» اگر بله، عددی؛ اگر نه، دسته‌ای.</p><div class="opts"><button type="button" class="btn primary" data-r="1" data-scroll>دوباره با داده‌های جدید</button></div>'); return; }
    q = L[i];
    h = '<div class="stg">' + L.map(function (x, k) { return '<span class="' + (k < i ? 'dn' : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><div class="dcard">' + q.t + '<small>این داده از چه نوعی است؟</small></div><div class="sgnrow"><button type="button" class="btn' + (ans === null ? '' : q.n === 0 ? ' right' : ans === 0 ? ' wrong' : '') + '" data-a="0"' + (ans === null ? '' : ' disabled') + '>دسته‌ای</button><button type="button" class="btn' + (ans === null ? '' : q.n === 1 ? ' right' : ans === 1 ? ' wrong' : '') + '" data-a="1"' + (ans === null ? '' : ' disabled') + '>عددی</button></div>';
    if (ans !== null) { h += '<div class="fb ' + (ans === q.n ? 'ok' : 'bad') + '">' + (ans === q.n ? 'درست است! ✓ ' : 'درست نبود. ') + q.w + '</div><div class="opts"><button type="button" class="btn primary" data-n="1" data-scroll>' + (i === L.length - 1 ? 'مشاهدهٔ نتیجه' : 'سؤال بعدی') + '</button></div>'; }
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.a !== undefined) { ans = +b.dataset.a; if (ans === L[i].n) { sc++; } paint(); } else if (b.dataset.n) { i++; ans = null; paint(); } else if (b.dataset.r) { nw(); paint(); }
  }); nw(); paint();
};

/* ---- شمردن و ساختن جدول فراوانی ---- */
K.tallyLab = function (host) {
  var CATS = ['فوتبال', 'والیبال', 'شنا', 'پینگ‌پنگ'], raw, i, cnt, msg, flash;
  function nw() { var n = 18, k; raw = []; for (k = 0; k < n; k++) { raw.push(CATS[[0, 0, 0, 1, 1, 2, 2, 3, 0, 1][R(0, 9)]]); } i = 0; cnt = [0, 0, 0, 0]; msg = ''; flash = -1; }
  function paint() {
    var done = i >= raw.length, h = '<p class="ask">ورزش مورد علاقهٔ ' + fa(raw.length) + ' دانش‌آموز پرسیده شده. داده‌ها را یکی‌یکی بشمار: روی ردیفِ درستِ جدول بزن.</p><div class="rawrow">' + raw.map(function (r, k) { return '<span class="' + (k === i ? 'cur' : k < i ? 'dn' : '') + '">' + r + '</span>'; }).join('') + '</div>';
    h += '<table class="ftt"><tr><th>ورزش</th><th>شمارش</th><th>فراوانی</th></tr>' + CATS.map(function (c, k) { return '<tr class="' + (done ? '' : 'pickr') + (flash === k ? ' flash' : '') + '" data-c="' + k + '"><td>' + c + '</td><td class="tt">' + tallyHTML(cnt[k]) + '</td><td>' + fa(cnt[k]) + '</td></tr>'; }).join('') + '<tr><th colspan="2">جمع</th><th>' + fa(cnt.reduce(function (a, b) { return a + b; })) + '</th></tr></table>';
    if (!done) { h += '<p class="legend" style="font-size:.92rem;color:var(--ink)">' + (msg || 'داده‌ای که زرد شده «' + raw[i] + '» است.') + '</p>'; }
    else { h += '<div class="fb ok"><b>تمام شد!</b> جمع فراوانی‌ها ' + fa(raw.length) + ' شد؛ برابر با تعداد همهٔ داده‌ها. (اگر برابر نبود یعنی جایی غلط شمرده‌ای.)</div>' + barSVG({ labels: CATS, vals: cnt, max: Math.max(4, Math.ceil(Math.max.apply(null, cnt) / 2) * 2), step: 2, title: 'ورزش مورد علاقه', ylab: 'تعداد', showVals: true, colors: ['#0e8f7e', '#d6457a', '#4c5fd5', '#e08a00'] }) + '<p class="legend">از روی جدول، نمودار ستونی ساختیم.</p><div class="opts p7-ops"><button type="button" class="btn" data-nw="1" data-scroll>داده‌های دیگر</button></div>'; }
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) {
    var tr = e.target.closest('tr.pickr'), b = e.target.closest('button'), k;
    if (tr && i < raw.length) { k = +tr.dataset.c; if (CATS[k] === raw[i]) { cnt[k]++; i++; msg = ''; flash = k; } else { msg = 'این داده «' + raw[i] + '» است، نه «' + CATS[k] + '». ردیف دیگری را امتحان کن.'; flash = -1; } paint(); }
    else if (b && b.dataset.nw) { nw(); paint(); }
  }); nw(); paint();
};

/* ---- کدام نمودار؟ ---- */
var SC = [
  { t: 'تعداد دانش‌آموزان هر پایهٔ یک مدرسه', a: 0, w: 'دسته‌ها (پایه‌ها) را با هم مقایسه می‌کنیم؛ نمودار ستونی مناسب است.' },
  { t: 'سهم هر ورزش از کل ' + fa(40) + ' دانش‌آموز', a: 1, w: 'می‌خواهیم «سهم از کل» را ببینیم؛ نمودار دایره‌ای مناسب است.' },
  { t: 'دمای یک شهر در هفت روزِ هفته', a: 2, w: 'مقدار با گذشت زمان تغییر می‌کند؛ نمودار خطی مناسب است.' },
  { t: 'مقایسهٔ فروش پنج فروشگاه در یک ماه', a: 0, w: 'پنج دستهٔ جدا را مقایسه می‌کنیم؛ نمودار ستونی.' },
  { t: 'تغییر وزن یک نوزاد در شش ماه اول', a: 2, w: 'روندِ تغییر در زمان؛ نمودار خطی.' },
  { t: 'درصد رأی هر نامزد از کل رأی‌ها', a: 1, w: 'سهم هر نامزد از کل؛ نمودار دایره‌ای.' },
  { t: 'تعداد کتاب‌هایی که چهار دوست خوانده‌اند', a: 0, w: 'چند دستهٔ جدا (چهار نفر) را مقایسه می‌کنیم؛ نمودار ستونی.' },
  { t: 'قیمت یک کالا در طول ' + fa(8) + ' ماه', a: 2, w: 'تغییر در زمان؛ نمودار خطی.' }
];
var CNAME = ['نمودار ستونی', 'نمودار دایره‌ای', 'نمودار خطی'];
function miniChart(k) { return k === 0 ? barSVG({ labels: ['', '', '', ''], vals: [3, 5, 2, 4], max: 6, step: 3, w: 150, h: 100 }) : k === 1 ? pieSVG([3, 2, 1], null, COLS5, 110) : lineSVG(['', '', '', '', ''], [2, 4, 3, 5, 6], { max: 6, step: 3 }); }
K.chartPick = function (host) {
  var L, i, ans, sc;
  function nw() { L = shuffle(SC.slice()).slice(0, 5); i = 0; ans = null; sc = 0; }
  function paint() {
    var h, q;
    if (i >= L.length) { host.innerHTML = rr('<div class="fb ' + (sc >= 4 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(sc) + ' از ' + fa(L.length) + '</b></div><div class="opts"><button type="button" class="btn primary" data-r="1" data-scroll>دوباره با موقعیت‌های جدید</button></div>'); return; }
    q = L[i];
    h = '<div class="stg">' + L.map(function (x, k) { return '<span class="' + (k < i ? 'dn' : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><div class="dcard" style="font-size:1.05rem">' + q.t + '<small>برای نمایش این داده‌ها کدام نمودار مناسب‌تر است؟</small></div><div class="sgnrow" style="flex-wrap:wrap">' + CNAME.map(function (n, k) { return '<button type="button" class="btn' + (ans === null ? '' : q.a === k ? ' right' : ans === k ? ' wrong' : '') + '" data-a="' + k + '"' + (ans === null ? '' : ' disabled') + ' style="font-size:.95rem;min-width:100px">' + n + '</button>'; }).join('') + '</div>';
    if (ans !== null) { h += '<div class="fb ' + (ans === q.a ? 'ok' : 'bad') + '">' + (ans === q.a ? 'درست است! ✓ ' : 'درست نبود. ') + q.w + '</div>' + miniChart(q.a) + '<div class="opts"><button type="button" class="btn primary" data-n="1" data-scroll>' + (i === L.length - 1 ? 'مشاهدهٔ نتیجه' : 'سؤال بعدی') + '</button></div>'; }
    host.innerHTML = rr(h);
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.dataset.a !== undefined) { ans = +b.dataset.a; if (ans === L[i].a) { sc++; } paint(); } else if (b.dataset.n) { i++; ans = null; paint(); } else if (b.dataset.r) { nw(); paint(); }
  }); nw(); paint();
};

/* ================= تولید سؤال ================= */
function genD1() {
  var q = pick(DT);
  return { ask: 'داده‌ای مثل «' + q.t + '» از چه نوعی است؟', fig: '', cq: '', cls: 'm2', opts: shuffle([{ h: 'عددی', ok: q.n === 1, m: 'جمع یا میانگین این داده معنی ندارد؛ پس دسته‌ای است.' }, { h: 'دسته‌ای', ok: q.n === 0, m: 'با این داده می‌شود جمع و میانگین گرفت؛ پس عددی است.' }]), expl: function () { return '<p>' + q.w + '</p>'; } };
}
function genD2() {
  var cats = pick([['قرمز', 'آبی', 'سبز', 'زرد'], ['فوتبال', 'والیبال', 'شنا', 'دو'], ['الف', 'ب', 'ج', 'د']]), n = R(12, 16), raw = [], k, cnt = [0, 0, 0, 0], ti, t = R(0, 1);
  for (k = 0; k < n; k++) { var c = [0, 0, 1, 1, 1, 2, 3][R(0, 6)]; raw.push(cats[c]); cnt[c]++; }
  ti = R(0, 3); var mx = Math.max.apply(null, cnt), mxi = cnt.indexOf(mx), tie = cnt.filter(function (x) { return x === mx; }).length > 1;
  if (t === 1 && tie) { t = 0; }
  var ask = t === 0 ? 'در دادهٔ زیر، فراوانی «' + cats[ti] + '» چند است؟' : 'در دادهٔ زیر، کدام مقدار بیشترین فراوانی را دارد؟';
  var fig = '<div class="rawrow">' + raw.map(function (r) { return '<span>' + r + '</span>'; }).join('') + '</div>';
  var opts;
  if (t === 0) { var f = cnt[ti]; opts = shuffle(uniqBy([{ h: M(String(f)), ok: true }, { h: M(String(f + 1)), ok: false, m: 'یکی بیشتر شمرده‌ای؛ دوباره بشمار.' }, { h: M(String(Math.max(0, f - 1))), ok: false, m: 'یکی را جا انداخته‌ای؛ دوباره بشمار.' }, { h: M(String(n)), ok: false, m: 'این تعداد کلِ داده‌هاست، نه فراوانی یک مقدار.' }], function (x) { return x.h; })); }
  else { opts = cats.map(function (c, i) { return { h: c, ok: i === mxi, m: 'فراوانیِ «' + c + '» برابر ' + fa(cnt[i]) + ' است؛ فراوانی‌ها را مقایسه کن.' }; }); }
  return { ask: ask, fig: fig, cq: '', cls: 'm2', opts: opts, expl: function () { return ftab([['مقدار'].concat(cats), ['فراوانی'].concat(cnt.map(fa))], { hl: t === 0 ? ti + 1 : mxi + 1 }) + '<p>جمع فراوانی‌ها ' + fa(n) + ' است، برابر تعداد کلِ داده‌ها.</p>'; } };
}
function genD3() {
  var q = pick(SC);
  return { ask: 'برای نمایش «' + q.t + '» کدام نمودار مناسب‌تر است؟', fig: '', cq: '', cls: 'm1', opts: CNAME.map(function (n, k) { return { h: n, ok: q.a === k, m: 'این نمودار برای این‌جور داده مناسب نیست.' }; }), expl: function () { return '<p>' + q.w + '</p>'; } };
}
var TFP = [
  { h: 'شمارهٔ دانش‌آموزی داده‌ای عددی است، چون با رقم نوشته می‌شود.', ok: 0, e: '<p>شماره فقط برچسب است و میانگین‌گرفتن از آن معنی ندارد؛ پس داده‌ای دسته‌ای است.</p>' },
  { h: 'در جدول فراوانی، جمع فراوانی‌ها برابر تعداد کلِ داده‌هاست.', ok: 1, e: '<p>هر داده دقیقاً یک‌بار شمرده می‌شود.</p>' },
  { h: 'برای نشان‌دادن تغییر دمای یک شهر در طول هفته، نمودار خطی مناسب است.', ok: 1, e: '<p>نمودار خطی تغییر در زمان را خوب نشان می‌دهد.</p>' },
  { h: 'نمودار دایره‌ای برای مقایسهٔ تغییر وزن یک نوزاد در ماه‌های مختلف مناسب است.', ok: 0, e: '<p>نمودار دایره‌ای «سهم از کل» را نشان می‌دهد، نه تغییر در زمان.</p>' },
  { h: 'رنگ چشم، داده‌ای دسته‌ای است.', ok: 1, e: '<p>رنگ را نمی‌شود جمع زد یا میانگین گرفت.</p>' },
  { h: 'در نمودار ستونی، ستون‌ها باید عرض برابر داشته باشند و محور عمودی از صفر شروع شود.', ok: 1, e: '<p>عرض نابرابر یا شروعِ محور از عددی غیر از صفر، مقایسه را گمراه‌کننده می‌کند.</p>' },
  { h: 'اگر در ' + fa(20) + ' داده، جمع فراوانی‌ها ' + fa(19) + ' شد، جدول درست است.', ok: 0, e: '<p>جمع باید ' + fa(20) + ' شود؛ یعنی یک داده جا افتاده است.</p>' },
  { h: 'تعداد خواهر و برادرهای دانش‌آموزان داده‌ای عددی است.', ok: 1, e: '<p>شمارش است و میانگین‌اش معنی دارد.</p>' },
  { h: 'نمودار ستونی برای مقایسهٔ چند دستهٔ جدا (مثل چهار مدرسه) مناسب است.', ok: 1, e: '<p>ارتفاع ستون‌ها مقایسه را آسان می‌کند.</p>' },
  { h: 'علامت شمارش «||||» با خط مورب، نمایندهٔ ' + fa(5) + ' داده است.', ok: 1, e: '<p>چهار خط و یک خط مورب: پنج‌تایی.</p>' }
];
return {
  html: function () {
    var names = ['فوتبال', 'والیبال', 'شنا', 'پینگ‌پنگ'], vals = [8, 5, 4, 3];
    return [
      K.sn('۱', 'داده‌ها چه جور چیزی‌اند؟'),
      '<p>به هر اطلاعاتی که جمع می‌کنیم (قد، رنگ، نمره، ...) «داده» می‌گوییم. داده‌ها دو دستهٔ اصلی دارند:</p>',
      cards2([{ c: 'p', t: 'عددی', r: 'اندازه یا شمارش است و جمع و میانگینش معنی دارد.', e: '152,\\ 160,\\ 171' }, { c: 'n', t: 'دسته‌ای', r: 'نام یا برچسب است و جمع و میانگینش معنی ندارد.' }]),
      K.box('note', 'یک آزمون ساده', '<p>از خودت بپرس: «جمع یا میانگینِ این داده معنی دارد؟» اگر بله، عددی؛ اگر نه، دسته‌ای. به همین دلیل «شمارهٔ دانش‌آموزی» با اینکه عدد است، داده‌ای دسته‌ای است.</p>'),
      '<p>خودت امتحان کن. هر داده را در دستهٔ درستش بگذار:</p><div class="cover p7-act" id="ds" style="animation:none"></div>',

      K.sn('۲', 'شمردن و جدول فراوانی'),
      '<p>وقتی داده‌ها زیاد باشند، نمی‌شود فقط به فهرستشان نگاه کرد. هر مقدار را یک‌بار می‌شماریم و نتیجه را در «جدول فراوانی» می‌نویسیم. <b>فراوانی</b> یعنی چند بار آمدنِ یک مقدار. برای شمردن بدون اشتباه، علامت شمارش می‌گذاریم: چهار خط و یک خط مورب، یعنی ' + fa(5) + ' تا.</p>',
      '<p>خودت جدول را بساز. هر داده را در ردیف درستش بشمار:</p><div class="cover p7-act" id="tl" style="animation:none"></div>',
      K.box('note', 'وارسی جمع', '<p>جمع فراوانی‌ها باید برابر تعداد کلِ داده‌ها باشد. اگر نشد، یا داده‌ای جا افتاده یا دوبار شمرده شده.</p>'),

      K.sn('۳', 'کدام نمودار؟'),
      '<p>همهٔ نمودارها یکی نیستند. انتخابِ نمودار به نوعِ پیامی بستگی دارد که می‌خواهیم برسانیم:</p>',
      cards3([{ c: 'p', h: 'ستونی', t: 'مقایسهٔ چند دسته' }, { c: 'n', h: 'دایره‌ای', t: 'سهمِ هر بخش از کل' }, { c: 'r3', h: 'خطی', t: 'تغییر در گذر زمان' }]),
      '<div class="figs"><figure>' + barSVG({ labels: names, vals: vals, max: 10, step: 2, w: 300, h: 190, colors: ['#0e8f7e', '#d6457a', '#4c5fd5', '#e08a00'] }) + '<figcaption>ستونی: ورزش‌های دانش‌آموزان</figcaption></figure><figure>' + pieSVG(vals, vals.map(fa), COLS5) + '<figcaption>دایره‌ای: سهم هر ورزش از کل</figcaption></figure></div>',
      fig1(lineSVG(['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'], [12, 14, 13, 17, 19, 18, 21], { max: 24, step: 6 }), 'خطی: تغییر دمای یک شهر در هفت روز'),
      '<p>موقعیت‌ها را به نمودار مناسبشان وصل کن:</p><div class="cover p7-act" id="cp" style="animation:none"></div>',

      K.sn('۴', 'ساختن یک نمودار ستونی درست'),
      '<p>برای اینکه نمودار ستونی خوانا و درست باشد، این پنج چیز را رعایت کن:</p>',
      refs([{ c: 'r1', t: 'عنوان', r: 'نمودار دربارهٔ چیست؟', e: '\\square' }, { c: 'r2', t: 'برچسب محورها', r: 'محور افقی و عمودی چه چیزی را نشان می‌دهند؟', e: 'x,\\ y' }, { c: 'r3', t: 'مقیاس برابر', r: 'فاصلهٔ همهٔ خط‌های محور عمودی یکی باشد.', e: '0,\\ 2,\\ 4,\\ 6' }, { c: 'r4', t: 'شروع از صفر', r: 'محور عمودی نمودار ستونی از ۰ شروع شود.', e: '0\\to' }, { c: 'r1', t: 'ستون‌های برابر', r: 'عرض ستون‌ها و فاصله‌هایشان یکسان باشد.', e: '\\square\\ \\square\\ \\square' }]),
      K.box('err', '⚠ تلهٔ محور عمودی', '<p>این دو نمودار داده‌های یکسانی دارند. در نمودار سمت چپ محور از ' + fa(0) + ' شروع شده و در سمت راست از ' + fa(40) + '. نمودار راست تفاوت را خیلی بزرگ‌تر از آنچه هست نشان می‌دهد:</p><div class="figs"><figure>' + barSVG({ labels: ['الف', 'ب'], vals: [42, 46], max: 50, step: 10, w: 190, h: 180, showVals: true, colors: ['#0e8f7e', '#d6457a'] }) + '<figcaption>از صفر: تفاوت کم</figcaption></figure><figure>' + barSVG({ labels: ['الف', 'ب'], vals: [2, 6], max: 10, step: 2, w: 190, h: 180, showVals: false, colors: ['#0e8f7e', '#d6457a'] }).replace(/>(۰|۲|۴|۶|۸|۱۰)</g, function (m, d) { var map = { '۰': '۴۰', '۲': '۴۲', '۴': '۴۴', '۶': '۴۶', '۸': '۴۸', '۱۰': '۵۰' }; return '>' + map[d] + '<'; }) + '<figcaption>از ۴۰: تفاوت گمراه‌کننده</figcaption></figure></div>'),

      K.sn('۵', 'کارت مرجع'),
      refs([{ c: 'r1', t: 'نوع داده', r: 'جمع و میانگینش معنی دارد؟ عددی؛ وگرنه دسته‌ای.', e: '152,\\ 160' }, { c: 'r2', t: 'فراوانی', r: 'تعداد دفعاتِ یک مقدار؛ جمعشان برابر کل داده‌ها.', e: '8+5+4+3=20' }, { c: 'r3', t: 'علامت شمارش', r: 'چهار خط و یک خط مورب = ۵.', e: '5=4+1' }, { c: 'r4', t: 'ستونی', r: 'مقایسهٔ چند دسته.', e: '\\square\\ \\blacksquare\\ \\square' }, { c: 'r1', t: 'دایره‌ای', r: 'سهم از کل.', e: '\\dfrac{8}{20}' }, { c: 'r3', t: 'خطی', r: 'تغییر در زمان.', e: '\\nearrow' }]),

      K.sn('۶', 'نوع داده و جدول'),
      '<p>هر مرحله با دو پاسخ درست تمام می‌شود. بعد از هر پاسخ، دلیلش را می‌بینی.</p><div class="cover p7-act" id="ss" style="animation:none"></div>',
      K.sn('۷', 'درست یا نادرست؟'),
      '<p>شش جمله را بسنج. به تله‌ها دقت کن.</p><div class="cover p7-act" id="tf" style="animation:none"></div>',
      K.sn('۸', 'تمرین پایانی'),
      '<p>پنج سؤال با داده‌های تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover p7-act" id="fn" style="animation:none"></div>',
      K.box('sum', 'بعد از این درس باید بتوانی', T`<ul><li>داده‌های عددی و دسته‌ای را از هم تشخیص بدهی.</li><li>داده‌ها را بشماری و جدول فراوانی بسازی و جمع را وارسی کنی.</li><li>نمودار مناسب (ستونی، دایره‌ای یا خطی) را انتخاب کنی.</li><li>یک نمودار ستونی درست با عنوان، محور برچسب‌دار و مقیاس برابر بسازی.</li></ul><p>این مهارت پایهٔ خواندن جدول و نمودار آماری است.</p>`)
    ].join('');
  },
  init: function (panel) {
    K.dataSort(panel.querySelector('#ds')); K.tallyLab(panel.querySelector('#tl')); K.chartPick(panel.querySelector('#cp'));
    K.stepRun(panel.querySelector('#ss'), [{ n: 'نوع داده', gen: genD1 }, { n: 'فراوانی', gen: genD2 }, { n: 'انتخاب نمودار', gen: genD3 }], { done: 'حالا برو سراغ تله‌ها.' });
    K.tfRun(panel.querySelector('#tf'), TFP);
    K.finalRun(panel.querySelector('#fn'), [genD1, genD2, genD2, genD3, genD3], { top: 'عالی بود! با داده‌ها کاملاً آشنا شده‌ای.' });
  }
};

  }
};
