/* درس مهارت E03 — حل نامعادلهٔ خطی و تغییر جهت علامت (فصل ۳) */
window.LESSONS = window.LESSONS || {};
window.LESSONS.E03 = {
  needs: ['utils'],
  setup: function (K0) {
var ML = window.MathLite, F = ML.fa, rr = ML.renderRich, abs = Math.abs, _u = K0._u, R = _u.R, M = _u.M, shuffle = _u.shuffle;
var M0 = _u.M, K = Object.create(K0), T = String.raw;
var M = function (t) {
  t = String(t);
  if (!/\\text\{(یا|و)\}/.test(t)) { return M0(t); }
  var parts = t.split(/\\ ?\\text\{(یا|و)\}\\ ?/), out = '', i;
  for (i = 0; i < parts.length; i++) { out += i % 2 ? ' ' + parts[i] + ' ' : M0(parts[i]); }
  return '<bdi style="direction:ltr;unicode-bidi:isolate">' + out + '</bdi>';
};
function css(id, txt) { if (document.getElementById(id)) { return; } var s = document.createElement('style'); s.id = id; s.textContent = txt; document.head.appendChild(s); }
var ltr = function (h) { return '<bdi style="direction:ltr;unicode-bidi:isolate">' + h + '</bdi>'; };
var choose = function (a) { return a[R(0, a.length - 1)]; };
var nz = function (a, b) { var v = 0; while (v === 0) { v = R(a, b); } return v; };
var sgn = function (n) { return n < 0 ? '-' + (-n) : '+' + n; };
var coef = function (a) { return a === 1 ? '' : a === -1 ? '-' : String(a); };
var ax = function (a) { return coef(a) + 'x'; };
var lin = function (a, b) { var s = ax(a); if (b > 0) { s += '+' + b; } else if (b < 0) { s += '-' + (-b); } return s; };
var fm = function (n) { return n < 0 ? '(' + n + ')' : String(n); };
var REL = { lt: '\\lt ', gt: '\\gt ', le: '\\leq ', ge: '\\geq ' }, RELT = { lt: '<', gt: '>', le: '≤', ge: '≥' };
var flipRel = function (r) { return { lt: 'gt', gt: 'lt', le: 'ge', ge: 'le' }[r]; };
var RELS = ['lt', 'gt', 'le', 'ge'];
function uniqBy(arr, key) { var s = {}; return arr.filter(function (x) { var k = key(x); if (s[k]) { return false; } s[k] = 1; return true; }); }
function mc(correct, wrongs, raw) {
  var list = uniqBy([{ t: correct.t, ok: 1 }].concat(wrongs.map(function (w) { return { t: w.t, ok: 0, m: w.m }; })), function (x) { return x.t; }), w, mm = /^x=(-?\d+)$/.exec(correct.t), k = 0, offs = [1, -1, 2, -2, 3, -3, 5];
  while (mm && list.length < 4 && k < offs.length) { var nt = 'x=' + (+mm[1] + offs[k++]); if (!list.some(function (z) { return z.t === nt; })) { list.push({ t: nt, ok: 0, m: 'محاسبه را دوباره بررسی کن.' }); } }
  w = shuffle(list.slice(1)).slice(0, 3);
  return shuffle([list[0]].concat(w).map(function (z) { return { h: raw ? z.t : M(z.t), ok: !!z.ok, m: z.m || 'این گزینه درست نیست.' }; }));
}
function mark(ok, text) { return '<div class="fb ' + (ok ? 'ok' : 'bad') + '" role="status">' + text + '</div>'; }
function activity(title, id, lead) { return '<h4 class="e02-activity-title">' + title + '</h4><p class="e02-activity-lead">' + lead + '</p><div class="e01-interaction e02-activity" id="' + id + '" data-activity><div data-stage></div></div>'; }
function intro(kicker, p, route) { return '<div class="e01-intro"><span class="e01-kicker">' + kicker + '</span><p>' + p + '</p><div class="e01-route" aria-label="مسیر این درس">' + route.map(function (r) { return '<span>' + r + '</span>'; }).join('<i aria-hidden="true">←</i>') + '</div></div>'; }
var REFRESH = '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 0 0-14.4-4.8L3 9"/><path d="M3 4v5h5"/><path d="M4 13a8 8 0 0 0 14.4 4.8L21 15"/><path d="M21 20v-5h-5"/></svg>';
function head(tex) { return '<div class="e02-problem-head"><span class="e02-problem-chip">' + M(tex) + '</span><button type="button" class="btn primary e01-station-refresh" data-fresh title="مسئلهٔ جدید" aria-label="تغییر مسئله">' + REFRESH + '</button></div>'; }

css('css-E3shared', [
'.e3x .katex{unicode-bidi:isolate;direction:ltr}',
'.e3-eq{direction:ltr;text-align:center;display:grid;place-items:center;min-height:46px;padding:6px 10px;margin:4px 0 6px;border:1.5px solid var(--line);border-radius:11px;background:#f3f6fa;font-size:1.15rem;max-width:100%;overflow-x:auto;scrollbar-width:none}',
'.e3-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:8px 0;direction:rtl}',
'.e3-op{min-width:54px;min-height:42px;padding:4px 12px;border:2px solid var(--ink);border-radius:12px;background:#fff;font:inherit;font-size:1rem;font-weight:700;cursor:pointer;box-shadow:2px 2px 0 var(--ink);color:var(--ink)}',
'.e3-op .katex{font-size:1.05em}.e3-op:active:not(:disabled){transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}',
'.e3-op.is-on{background:var(--mark)}.e3-op:disabled{opacity:.45;cursor:default;box-shadow:none}',
'.e3-pill{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:34px;padding:3px 12px;border:1.5px solid var(--line);border-radius:16px;background:#fff;font-size:.92rem;text-align:center}',
'.e3-pill.ok{background:#d2f0e9;border-color:#438b6c;color:#173d2e}.e3-pill.bad{background:#fbd5d5;border-color:#b23a3a;color:#632323}.e3-pill.y{background:var(--mark);border-color:var(--ink)}',
'.e3-exline{direction:rtl;text-align:center;font-size:1rem;line-height:1.9}',
'.e3-note{text-align:center;font-size:.92rem;line-height:1.8;color:var(--ink-soft);margin:4px 4px;min-height:3.6em;display:flex;align-items:center;justify-content:center}',
'.e3-log{margin:8px 0;padding:8px 10px;border:1.5px dashed var(--line);border-radius:11px;background:#fff}',
'.e3-log b{display:block;font-size:.9rem;margin-bottom:4px}.e3-log ol{list-style:none;margin:0;padding:0;display:grid;gap:5px}',
'.e3-log li{display:flex;direction:rtl;align-items:center;gap:8px;justify-content:space-between;border:1.5px solid var(--line);border-radius:9px;background:#f3f6fa;padding:3px 10px;min-height:38px}',
'.e3-log li span.n{font-size:.78rem;color:var(--ink-soft);min-width:22px;text-align:center}.e3-log li .tx{direction:ltr;flex:1;text-align:center}',
'.e3-ask{font-size:1rem;line-height:1.85;margin:8px 0;font-weight:700;text-align:right}',
'.e3-svg{display:block;margin:6px auto;max-width:100%;height:auto;direction:ltr}',
'.e3-match-row{display:flex;direction:rtl;align-items:center;justify-content:space-between;gap:10px;margin:7px 0;padding:6px 10px;border:1.5px solid var(--line);border-radius:10px;background:#fff}',
'.e3-match-row .l{direction:ltr;font-size:1.1rem}.e3-match-row select{min-height:38px;border:2px solid var(--line);border-radius:9px;padding:2px 8px;font:inherit;direction:ltr;background:#fff;color:var(--ink);max-width:62%}',
'.e3-match-row.right{background:#d2f0e9;border-color:#438b6c}.e3-match-row.wrong{background:#fbd5d5;border-color:#b23a3a}',
'.e3-numrow{display:flex;justify-content:center;align-items:center;gap:10px;margin:8px 0;direction:ltr}.e3-numrow .lbl{direction:ltr;font-size:1.15rem}',
'.e01-lesson .e01-answer.is-sel{background:var(--mark);border-color:var(--ink)}',
'.e3-slider{max-width:560px;margin:8px auto 4px}.e3-slider input[type=range]{width:100%;display:block;direction:ltr;accent-color:#078b80;cursor:pointer}',
'.e3-slider{position:relative}@media(max-width:560px){.e3-slider .mn .katex{display:none}}.e3-slider .lab{display:flex;justify-content:space-between;font-size:.85rem;color:var(--ink-soft);margin-bottom:2px}',
'.e3-svg.tilt{max-width:280px}.e3-svg.mir{max-width:340px}.e3-svg.axs{max-width:400px}',
'.e3-disp{direction:ltr;text-align:center;font-size:1.15rem;margin:4px 0 10px;overflow-x:auto;scrollbar-width:none}',
'.e3-syms{margin:6px 0 10px}.e3-syms .e3-pill{gap:8px}',
'.e3-groups{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px 8px;margin:14px 0 8px;direction:rtl}',
'.e3-grp{position:relative;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;border:1.5px solid var(--line);border-radius:12px;background:#f8fafc;padding:15px 8px 8px;direction:ltr;align-content:center}',
'.e3-grp .cap{position:absolute;top:-10px;right:10px;padding:0 7px;background:#fff;border-radius:6px;font-size:.78rem;font-weight:700;color:var(--accent-dark);direction:rtl;white-space:nowrap}',
'.e3-grp .e3-op{min-width:0;width:100%;padding:4px 6px}',
'.e3-klab{text-align:center;font-size:.88rem;color:var(--ink-soft);margin:4px 0 2px}',
'.e3-eqm{display:flex;flex-wrap:wrap;gap:2px 14px;justify-content:center;align-items:center}.e3-eqm>span{direction:ltr}.e3-krow{display:flex;justify-content:center;align-items:center;gap:6px;direction:ltr;margin:4px 0 8px}',
'.e3-op.e3-kb{min-width:0;min-height:0;width:clamp(34px,11vw,44px);height:clamp(34px,11vw,44px);padding:0;border-radius:50%;display:grid;place-items:center;flex:none}',
'@media(max-width:560px){.e3-groups{grid-template-columns:1fr;gap:16px 0}.e3-grp{display:flex;gap:6px}.e3-grp .e3-op{flex:1 1 0;min-height:38px;padding:3px 4px}}',
'.e02-lesson.e3x .e02-detect-folder .e02-detect-row{border:1.5px solid var(--line);border-radius:11px;background:#fff;margin:8px 0 0;min-height:52px;width:100%;box-shadow:none}',
'.e02-lesson.e3x .e02-detect-folder .e02-detect-row:hover:not(.is-selected):not(.is-bad):not(.locked){background:#f0f5fb}',
'.e02-lesson.e3x .e02-detect-folder .e02-detect-row.is-selected{background:#e7f0fb;border-color:#527cb4;box-shadow:inset -3px 0 #527cb4}',
'.e02-lesson.e3x .e02-detect-folder .e02-detect-row.is-bad{background:#fbd5d5;border-color:#b23a3a;box-shadow:inset -3px 0 #b23a3a}',
'.e02-lesson.e3x .e02-detect-folder .e02-detect-row.locked{cursor:default}',
'.e3x ol.e03-steps{list-style:none;counter-reset:st;margin:14px 0;padding:0;display:grid;gap:10px;direction:rtl}',
'.e3x ol.e03-steps li{counter-increment:st;display:flex;align-items:center;gap:10px;line-height:1.9;min-height:30px;margin:0;padding:0;text-align:right}',
'.e3x ol.e03-steps li::before{content:counter(st,persian);flex:none;width:28px;height:28px;border-radius:50%;background:#14213d;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:bold;box-shadow:2px 2px 0 #0e8f7e}',
'.e3x ol.e03-steps li .katex{direction:ltr}'
].join('\n'));

/* ---------- مثال حل‌شده (همان ساختار E02) ---------- */
function exampleBlock(id, dlgTitle, count) {
  var dots = ''; for (var i = 0; i < count; i++) { dots += '<i' + (i === 0 ? ' class="current"' : '') + '></i>'; }
  return '<div class="ex e02-example-steps" id="' + id + '" aria-label="حل گام‌به‌گام مثال"><div class="e02-example-top"><strong>مثال حل‌شده</strong><span data-ex-count>گام ۱ از ' + F(count) + '</span></div><div class="e02-example-progress" aria-hidden="true">' + dots + '</div><div class="e02-example-body" data-ex-body aria-live="polite"></div><div class="e02-example-actions end-actions"><button type="button" class="btn" data-ex-prev disabled>مرحلهٔ قبلی</button><button type="button" class="btn primary" data-ex-next>مرحلهٔ بعدی</button><button type="button" class="btn primary" data-ex-all hidden>مشاهدهٔ حل کامل</button></div></div>' +
    '<dialog class="e02-example-dialog" id="' + id + '-dialog" aria-labelledby="' + id + '-dt"><div class="e02-example-dialog-header"><strong id="' + id + '-dt">' + dlgTitle + '</strong><button type="button" class="btn primary" data-ex-close aria-label="بستن پنجره">بستن</button></div><div class="e02-example-dialog-content" data-ex-full></div></dialog>';
}
function exampleBind(id, steps) {
  var box = document.getElementById(id), dlg = document.getElementById(id + '-dialog'); if (!box || !dlg) { return; }
  var index = 0, prev = box.querySelector('[data-ex-prev]'), next = box.querySelector('[data-ex-next]'), all = box.querySelector('[data-ex-all]');
  function content(step, i) { return '<section class="e02-example-step"><div class="e02-example-heading"><span class="e02-example-chip">گام ' + F(i + 1) + '</span><strong>' + step.title + '</strong></div><div class="e02-example-lines">' + step.lines.map(function (l) { return l.charAt(0) === '@' ? '<div class="e3-exline">' + l.slice(1) + '</div>' : '<div dir="ltr">' + M(l) + '</div>'; }).join('') + '</div><p class="e02-example-note">' + step.note + '</p></section>'; }
  function render() { box.querySelector('[data-ex-count]').textContent = 'گام ' + F(index + 1) + ' از ' + F(steps.length); box.querySelector('[data-ex-body]').innerHTML = rr(content(steps[index], index)); box.querySelectorAll('.e02-example-progress i').forEach(function (el, i) { el.classList.toggle('current', i <= index); }); prev.disabled = index === 0; next.hidden = index === steps.length - 1; all.hidden = index !== steps.length - 1; }
  box.addEventListener('click', function (e) { if (e.target.closest('[data-ex-prev], [data-ex-next], [data-ex-all]')) { e.stopPropagation(); } });
  prev.addEventListener('click', function () { if (index > 0) { index--; render(); } });
  next.addEventListener('click', function () { if (index < steps.length - 1) { index++; render(); } });
  all.addEventListener('click', function () { dlg.querySelector('[data-ex-full]').innerHTML = rr(steps.map(content).join('')); dlg.showModal(); });
  dlg.querySelector('[data-ex-close]').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) { dlg.close(); } });
  render();
}

/* ---------- کارگاه گام‌به‌گام (انتخاب خط درست در هر گام) ----------
   gen() → {tex, steps:[{ask, opts:[{h,ok,m}], line, why}], end} */
K.guide = function (root, gen) {
  var st = root.querySelector('[data-stage]'), p, si, tries, okIdx, last, wrong, log, done;
  function nw() { p = gen(); si = 0; tries = []; okIdx = undefined; last = undefined; wrong = 0; log = []; done = false; }
  function paint() {
    var h = head(p.tex), s;
    h += '<div class="e3-log"><b>مسیر ساخته‌شده</b><ol>' + (log.length ? log.map(function (l, i) { return '<li><span class="n">' + F(i + 1) + '</span><span class="tx">' + M(l) + '</span></li>'; }).join('') : '<li><span class="tx" style="color:var(--ink-soft);font-size:.88rem;direction:rtl">هنوز گامی انجام نشده است.</span></li>') + '</ol></div>';
    if (done) { st.innerHTML = rr(h + mark(true, '<b>حل کامل شد' + (wrong ? '' : ' (بدون خطا)') + '.</b> ' + (p.end || '')) + '<div class="opts g-ops"><button type="button" class="btn primary" data-fresh data-scroll=".e02-problem-head" data-scroll-offset="100">مسئلهٔ دیگر</button></div>'); return; }
    s = p.steps[si];
    h += '<p class="ask e3-ask">' + F(si + 1) + '. ' + s.ask + '</p><div class="e01-answer-grid">' + s.opts.map(function (op, i) { var cl = okIdx !== undefined ? (op.ok ? ' e01-right' : (tries.indexOf(i) > -1 ? ' e01-wrong' : '')) : (tries.indexOf(i) > -1 ? ' e01-wrong' : ''); return '<button type="button" class="btn e01-answer' + cl + '" data-pick="' + i + '"' + (okIdx !== undefined || tries.indexOf(i) > -1 ? ' disabled' : '') + '>' + op.h + '</button>'; }).join('') + '</div>';
    if (last !== undefined) { var lo = s.opts[last]; h += mark(lo.ok, lo.ok ? '✓ درست است. ' + s.why : lo.m); }
    if (okIdx !== undefined) { h += '<div class="e01-navigation"><span></span><button type="button" class="btn primary" data-go data-scroll=".e02-problem-head" data-scroll-offset="100">' + (si === p.steps.length - 1 ? 'پایان' : 'گام بعدی') + '</button></div>'; }
    st.innerHTML = rr(h);
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('button'), i; if (!b || b.disabled) { return; }
    if (b.hasAttribute('data-fresh')) { nw(); paint(); return; }
    if (b.hasAttribute('data-pick')) { i = +b.dataset.pick; last = i; if (p.steps[si].opts[i].ok) { okIdx = i; } else { tries.push(i); wrong++; } paint(); return; }
    if (b.hasAttribute('data-go')) { log.push(p.steps[si].line); tries = []; okIdx = undefined; last = undefined; if (si === p.steps.length - 1) { done = true; } else { si++; } paint(); }
  });
  nw(); paint();
};

/* ---------- آزمون پایانی (فقط پرسش‌های چندگزینه‌ای؛ بدون دکمهٔ «ثبت پاسخ») ----------
   makers: آرایه‌ای از تابع‌ها؛ هر تابع {type:'mc', ask, fig?, opts:[{h,ok}], why} برمی‌گرداند */
K.final = function (root, makers) {
  var s, N = makers.length;
  function setup() { s = { q: makers.map(function (m) { return m(); }), pos: 0, ans: makers.map(function () { return null; }), res: makers.map(function () { return null; }), fin: false, review: false }; }
  function paint() {
    var h, it, a, frozen, body, sc;
    if (s.fin && !s.review) {
      sc = s.res.filter(function (r) { return r; }).length;
      root.innerHTML = rr(window.CourseKit.res(sc, N) + '<div class="opts end-actions"><button type="button" class="btn" data-review data-scroll>مرور سؤال‌ها</button><button type="button" class="btn primary" data-final-new data-scroll>سؤال‌های جدید</button></div>');
      return;
    }
    it = s.q[s.pos]; a = s.ans[s.pos]; frozen = a !== null;
    body = '<div class="e01-answer-grid">' + it.opts.map(function (op, k) { return '<button type="button" class="btn e01-answer' + (frozen ? (op.ok ? ' e01-right' : (a === k ? ' e01-wrong' : '')) : '') + '" data-choice="' + k + '"' + (frozen ? ' disabled' : '') + '>' + op.h + '</button>'; }).join('') + '</div>';
    h = '<div class="e01-progress stg" aria-label="پیشرفت آزمون">' + s.q.map(function (q, k) { return '<span class="' + (k === s.pos ? 'cu' : s.res[k] === null ? '' : s.res[k] ? 'dn' : 'wr') + '" aria-label="سؤال ' + F(k + 1) + '">' + F(k + 1) + '</span>'; }).join('') + '</div><div class="ask e01-question">' + it.ask + '</div>' + (it.fig || '') + body;
    if (frozen) { h += mark(s.res[s.pos], (s.res[s.pos] ? 'پاسخ درست است. ' : 'پاسخ درست: ' + it.opts.filter(function (op) { return op.ok; }).map(function (op) { return op.h; }).join('، ') + '. ') + it.why); }
    h += '<div class="e01-navigation"><button type="button" class="btn" data-prev' + (s.pos === 0 ? ' disabled' : '') + ' data-scroll>سؤال قبلی</button><button type="button" class="btn primary" data-next' + (!frozen ? ' disabled' : '') + ' data-scroll>' + (s.pos === N - 1 ? (s.review ? 'بازگشت به نتیجه' : 'مشاهدهٔ نتیجه') : 'سؤال بعدی') + '</button></div>';
    root.innerHTML = rr(h);
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.hasAttribute('data-choice')) { if (s.ans[s.pos] === null) { var k = +b.dataset.choice; s.ans[s.pos] = k; s.res[s.pos] = !!s.q[s.pos].opts[k].ok; paint(); } return; }
    if (b.hasAttribute('data-prev')) { s.pos--; paint(); return; }
    if (b.hasAttribute('data-next')) { if (s.pos < N - 1) { s.pos++; } else { s.fin = true; s.review = false; } paint(); return; }
    if (b.hasAttribute('data-review')) { s.review = true; s.pos = 0; paint(); return; }
    if (b.hasAttribute('data-final-new')) { setup(); paint(); }
  });
  setup(); paint();
};


/* ================= ابزارهای نامعادله ================= */
function ba(b, a) { var s = String(b); if (a < 0) { s += '-' + (a === -1 ? '' : -a) + 'x'; } else { s += '+' + (a === 1 ? '' : a) + 'x'; } return s; }   // b + ax (مثل ‎7-3x‎)
function iq(kind) {
  var a, b, x0 = nz(-6, 7), rel = choose(RELS), c, L;
  if (kind === 'A') { a = 1; b = nz(-8, 8); L = 'x' + sgn(b); }
  else if (kind === 'B') { a = nz(-5, 5); while (a === 1 || a === -1) { a = nz(-5, 5); } if (a > 0) { a = -a; } b = 0; L = ax(a); }
  else if (kind === 'C') { a = -R(2, 5); b = nz(-9, 9); L = ba(b, a); }
  else { a = choose([2, 3, 4, 5]); b = nz(-9, 9); L = lin(a, b); }
  c = a * x0 + b;
  return { kind: kind, a: a, b: b, x0: x0, rel: rel, c: c, L: L, tex: L + REL[rel] + c, rel2: a < 0 ? flipRel(rel) : rel };
}
var sol = function (q) { return 'x' + REL[q.rel2] + q.x0; };
var inSol = function (q, x) { var v = q.a * x + q.b; return q.rel === 'lt' ? v < q.c : q.rel === 'gt' ? v > q.c : q.rel === 'le' ? v <= q.c : v >= q.c; };

/* ---------- کارگاه ۱: ترازوی کج ---------- */
var OPS = [{ l: '+3', f: function (v) { return v + 3; }, neg: 0 }, { l: '-4', f: function (v) { return v - 4; }, neg: 0 }, { l: '\\times 2', f: function (v) { return v * 2; }, neg: 0 }, { l: '\\times 3', f: function (v) { return v * 3; }, neg: 0 }, { l: '\\div 2', f: function (v) { return v / 2; }, neg: 0, d: 2 }, { l: '\\div 3', f: function (v) { return v / 3; }, neg: 0, d: 3 }, { l: '\\times(-1)', f: function (v) { return -v; }, neg: 1 }, { l: '\\times(-2)', f: function (v) { return -2 * v; }, neg: 1 }, { l: '\\div(-2)', f: function (v) { return -v / 2; }, neg: 1, d: 2 }, { l: '\\div(-3)', f: function (v) { return -v / 3; }, neg: 1, d: 3 }];
function beam(a, b) {
  var cx = 170, cy = 76, th = (b > a ? 1 : -1) * 11, c = Math.cos(th * Math.PI / 180), s = Math.sin(th * Math.PI / 180), L = [cx - 112 * c, cy - 112 * s], Rr = [cx + 112 * c, cy + 112 * s], o = '<svg class="e3-svg tilt" viewBox="0 0 340 170" role="img" aria-hidden="true">';
  o += '<path d="M170 ' + cy + ' L150 150 L190 150 Z" fill="#dfe6f2" stroke="#14213d" stroke-width="2.4" stroke-linejoin="round"/><line x1="' + L[0] + '" y1="' + L[1] + '" x2="' + Rr[0] + '" y2="' + Rr[1] + '" stroke="#14213d" stroke-width="5" stroke-linecap="round"/><circle cx="170" cy="' + cy + '" r="7" fill="#ffc233" stroke="#14213d" stroke-width="2.4"/>';
  [[L, a, '#d6457a'], [Rr, b, '#4c5fd5']].forEach(function (p) { var e = p[0]; o += '<line x1="' + (e[0] - 28) + '" y1="' + (e[1] + 24) + '" x2="' + e[0] + '" y2="' + e[1] + '" stroke="#14213d" stroke-width="1.6"/><line x1="' + (e[0] + 28) + '" y1="' + (e[1] + 24) + '" x2="' + e[0] + '" y2="' + e[1] + '" stroke="#14213d" stroke-width="1.6"/><rect x="' + (e[0] - 32) + '" y="' + (e[1] + 24) + '" width="64" height="32" rx="9" fill="#fff" stroke="' + p[2] + '" stroke-width="3"/><text x="' + e[0] + '" y="' + (e[1] + 45) + '" text-anchor="middle" font-size="16" font-weight="bold" fill="#14213d" font-family="Tahoma,sans-serif">' + (p[1] < 0 ? '−' : '') + F(abs(p[1])) + '</text>'; });
  return o + '</svg>';
}
var OPG = [{ c: 'جمع و تفریق', ix: [0, 1] }, { c: 'ضرب و تقسیم در عدد مثبت', ix: [2, 3, 4, 5] }, { c: 'ضرب و تقسیم در عدد منفی', ix: [6, 7, 8, 9] }];
function tiltLab(root) {
  var st = root.querySelector('[data-stage]'), a, b, hist, note, NOTE0 = 'ترازو را کج کرده‌ایم: عددِ سنگین‌تر، کفهٔ پایین‌تر را می‌گیرد. یک عملیات انتخاب کن.';
  function nw() { var p = shuffle([-18, -12, -6, 6, 12, 18]).slice(0, 2).sort(function (x, y) { return x - y; }); a = p[0]; b = p[1]; hist = [{ a: a, b: b, op: null }]; note = NOTE0; }
  function paint() {
    var cur = hist[hist.length - 1], rel = cur.a < cur.b ? '\\lt ' : '\\gt ', last = hist.length > 1 ? cur.op : -1, tail = hist.slice(1), from = Math.max(0, tail.length - 2), show = tail.slice(from);
    st.innerHTML = rr('<div class="e3-eq">' + M(fm(cur.a) + rel + fm(cur.b)) + '</div>' + beam(cur.a, cur.b) + '<p class="e3-note">' + note + '</p>' +
      '<div class="e3-groups">' + OPG.map(function (g) { return '<div class="e3-grp"><span class="cap">' + g.c + '</span>' + g.ix.map(function (i) { var o = OPS[i], dis = o.d && (cur.a % o.d !== 0 || cur.b % o.d !== 0); return '<button type="button" class="e3-op' + (i === last ? ' is-on' : '') + '" data-op="' + i + '"' + (dis ? ' disabled title="هر دو عدد بر ' + o.d + ' بخش‌پذیر نیستند"' : '') + '>' + M(o.l) + '</button>'; }).join('') + '</div>'; }).join('') + '</div>' +
      (show.length ? '<div class="e3-log"><b>' + (tail.length > 2 ? 'دو گام آخر' : 'گام‌ها') + '</b><ol>' + show.map(function (h, i) { return '<li><span class="n">' + F(from + i + 1) + '</span><span class="tx">' + M(fm(h.a) + (h.a < h.b ? '\\lt ' : '\\gt ') + fm(h.b)) + '</span><span class="e3-pill ' + (h.flip ? 'bad' : 'ok') + '">' + (h.flip ? 'جهت برعکس شد' : 'جهت ماند') + '</span></li>'; }).join('') + '</ol></div>' : '') +
      '<div class="opts g-ops"><button type="button" class="btn" data-back' + (hist.length < 2 ? ' disabled' : '') + '>برگشت یک گام</button><button type="button" class="btn primary" data-fresh data-scroll=".e3-eq" data-scroll-offset="100">عددهای دیگر</button></div>');
  }
  root.addEventListener('click', function (e) {
    var bt = e.target.closest('button'); if (!bt || bt.disabled) { return; }
    if (bt.hasAttribute('data-fresh')) { nw(); paint(); return; }
    if (bt.hasAttribute('data-back')) { hist.pop(); note = hist.length > 1 ? 'یک گام برگشتیم.' : NOTE0; paint(); return; }
    if (bt.hasAttribute('data-op')) {
      var oi = +bt.dataset.op, o = OPS[oi], cur = hist[hist.length - 1], na = o.f(cur.a), nb = o.f(cur.b), flip = (cur.a < cur.b) !== (na < nb);
      hist.push({ a: na, b: nb, flip: flip, op: oi });
      note = o.neg ? 'ضرب یا تقسیم در عددِ <b>منفی</b>، ترتیب را برعکس می‌کند: عددِ کوچک‌تر بزرگ‌تر می‌شود و کفه‌ها جایشان را عوض می‌کنند.' : (o.l.indexOf('times') > -1 || o.l.indexOf('div') > -1 ? 'ضرب یا تقسیم در عددِ <b>مثبت</b> اندازه‌ها را کم‌وزیاد می‌کند ولی ترتیب را نگه می‌دارد.' : 'جمع‌کردن یا کم‌کردن یک عدد از <b>هر دو طرف</b>، کفهٔ سنگین‌تر را سنگین‌تر نگه می‌دارد.');
      paint();
    }
  });
  nw(); paint();
}
/* ---------- کارگاه ۲: آیینهٔ صفر ---------- */
function mirrorLab(root) {
  var st = root.querySelector('[data-stage]'), a, b, k = 3, KS = [-3, -2, -1, 1, 2, 3];
  function nw() { var p = shuffle([-4, -3, -2, -1, 1, 2, 3, 4]).slice(0, 2).sort(function (x, y) { return x - y; }); if (p[1] - p[0] < 2) { p = [-3, 2]; } a = p[0]; b = p[1]; }
  function X(v) { return 20 + (v + 12) * 12.5; }
  function pt(v, y, col, lab) { return '<circle cx="' + X(v) + '" cy="' + y + '" r="8" fill="' + col + '" stroke="#14213d" stroke-width="2.2"/><text x="' + X(v) + '" y="' + (y + (y < 100 ? -16 : 28)) + '" text-anchor="middle" font-size="14" font-weight="bold" fill="#14213d" font-family="Tahoma,sans-serif">' + lab + '</text>'; }
  function axis(y) { var o = '<line x1="14" y1="' + y + '" x2="326" y2="' + y + '" stroke="#14213d" stroke-width="2.4"/>', v; for (v = -12; v <= 12; v++) { o += '<line x1="' + X(v) + '" y1="' + (y - (v % 4 === 0 ? 7 : 4)) + '" x2="' + X(v) + '" y2="' + (y + (v % 4 === 0 ? 7 : 4)) + '" stroke="#14213d" stroke-width="1.4"/>'; if (v % 4 === 0) { o += '<text x="' + X(v) + '" y="' + (y + 21) + '" text-anchor="middle" font-size="13" fill="#5a6a85" font-family="Tahoma,sans-serif">' + (v < 0 ? '−' : '') + F(abs(v)) + '</text>'; } } return o; }
  function paint() {
    var ka = k * a, kb = k * b, flip = k < 0, rel0 = '\\lt ', rel1 = ka < kb ? '\\lt ' : '\\gt ';
    var svg = '<svg class="e3-svg mir" viewBox="0 0 340 215" role="img" aria-hidden="true"><line x1="' + X(0) + '" y1="22" x2="' + X(0) + '" y2="190" stroke="#d6457a" stroke-width="2" stroke-dasharray="4 4"/><text x="' + X(0) + '" y="14" text-anchor="middle" font-size="13" fill="#d6457a" font-family="Tahoma,sans-serif">آیینه (صفر)</text>' + axis(62) + axis(158) +
      '<line x1="' + X(a) + '" y1="70" x2="' + X(ka) + '" y2="150" stroke="#d6457a" stroke-width="2.2" stroke-dasharray="5 4"/><line x1="' + X(b) + '" y1="70" x2="' + X(kb) + '" y2="150" stroke="#4c5fd5" stroke-width="2.2" stroke-dasharray="5 4"/>' + pt(a, 62, '#d6457a', fa(a)) + pt(b, 62, '#4c5fd5', fa(b)) + pt(ka, 158, '#d6457a', fa(ka)) + pt(kb, 158, '#4c5fd5', fa(kb)) + '</svg>';
    function fa(v) { return (v < 0 ? '−' : '') + F(abs(v)); }
    st.innerHTML = rr('<div class="e3-klab">هر دو عدد را در این عدد ضرب کن:</div><div class="e3-krow">' + KS.map(function (v) { return '<button type="button" class="e3-op e3-kb' + (v === k ? ' is-on' : '') + '" data-k="' + v + '" title="ضرب در ' + (v < 0 ? '−' : '') + F(abs(v)) + '">' + M(String(v)) + '</button>'; }).join('') + '</div>' + svg + '<div class="e3-eq e3-eqm"><span>' + M(fm(a) + rel0 + fm(b)) + '</span><span>' + M('\\xrightarrow{\\ \\times' + fm(k) + '\\ }') + '</span><span>' + M(fm(ka) + rel1 + fm(kb)) + '</span></div><div class="e3-row"><span class="e3-pill ' + (flip ? 'bad' : 'ok') + '">' + (flip ? 'ضریب منفی بود: ترتیب برعکس شد (خط‌ها یکدیگر را قطع کردند)' : 'ضریب مثبت بود: ترتیب ماند (خط‌ها یکدیگر را قطع نکردند)') + '</span></div><div class="opts g-ops"><button type="button" class="btn primary" data-fresh data-scroll=".e3-klab" data-scroll-offset="100">عددهای دیگر</button></div>');
  }
  root.addEventListener('click', function (e) { var b2 = e.target.closest('button'); if (!b2 || b2.disabled) { return; } if (b2.hasAttribute('data-fresh')) { nw(); paint(); } else if (b2.hasAttribute('data-k')) { k = +b2.dataset.k; paint(); } });
  nw(); paint();
}
/* ---------- کارگاه ۳: گام‌های حل ---------- */
function lineOpts(correct, wrongs) { return mc({ t: correct }, wrongs); }
function genSolve() {
  var kind = choose(['A', 'B', 'C', 'D', 'C', 'B']), q = iq(kind), r = q.rel, r2 = q.rel2, steps = [], n;
  if (kind === 'A') {
    steps.push({ ask: 'برای تنها‌کردن ' + M('x') + ' ، عدد ' + M(String(q.b)) + ' را از هر دو طرف حذف می‌کنیم. خط بعدی کدام است؟', opts: lineOpts('x' + REL[r] + q.x0, [{ t: 'x' + REL[r] + (q.c + q.b), m: 'جمع یا کم‌کردن را درست انتخاب نکرده‌ای؛ برای حذف ' + M(sgn(q.b)) + ' باید ' + (q.b > 0 ? 'کم' : 'اضافه') + ' کنی.' }, { t: 'x' + REL[flipRel(r)] + q.x0, m: 'جمع و تفریق جهت را برعکس نمی‌کنند.' }, { t: 'x' + REL[r] + (-q.x0), m: 'علامت عدد طرف راست را اشتباه کرده‌ای.' }]), line: 'x' + REL[r] + q.x0, why: 'جمع و تفریق در دو طرف، جهت علامت را نگه می‌دارد.' });
  } else if (kind === 'D') {
    steps.push({ ask: 'ابتدا عدد ثابت را حذف می‌کنیم. خط بعدی کدام است؟', opts: lineOpts(ax(q.a) + REL[r] + (q.c - q.b), [{ t: ax(q.a) + REL[r] + (q.c + q.b), m: 'برای حذف ' + M(sgn(q.b)) + ' باید ' + (q.b > 0 ? 'کم' : 'اضافه') + ' کنی.' }, { t: ax(q.a) + REL[flipRel(r)] + (q.c - q.b), m: 'جمع و تفریق جهت را برعکس نمی‌کنند.' }, { t: 'x' + REL[r] + (q.c - q.b), m: 'ضریب ' + M(String(q.a)) + ' را هم باید در نظر بگیری؛ هنوز بر آن تقسیم نکرده‌ایم.' }]), line: ax(q.a) + REL[r] + (q.c - q.b), why: 'جملهٔ ثابت حذف شد و جهت ماند.' });
    steps.push({ ask: 'حالا دو طرف را بر ' + M(String(q.a)) + ' (عددی مثبت) تقسیم می‌کنیم. جهت علامت چه می‌شود؟', opts: lineOpts('x' + REL[r] + q.x0, [{ t: 'x' + REL[flipRel(r)] + q.x0, m: 'تقسیم بر عددِ مثبت جهت را برعکس نمی‌کند.' }, { t: 'x' + REL[r] + (q.c - q.b), m: 'باید طرف راست را هم بر ' + M(String(q.a)) + ' تقسیم کنی.' }, { t: 'x' + REL[flipRel(r)] + (q.c - q.b), m: 'هم تقسیم را فراموش کرده‌ای و هم جهت را بی‌دلیل برعکس کرده‌ای.' }]), line: 'x' + REL[r] + q.x0, why: 'تقسیم بر عددِ مثبت، جهت را نگه می‌دارد.' });
  } else if (kind === 'B') {
    steps.push({ ask: 'دو طرف را بر ' + M(String(q.a)) + ' (عددی منفی) تقسیم می‌کنیم. خط بعدی کدام است؟', opts: lineOpts('x' + REL[r2] + q.x0, [{ t: 'x' + REL[r] + q.x0, m: 'تقسیم بر عددِ منفی جهت را برعکس می‌کند؛ این‌جا جهت را همان نگه داشته‌ای.' }, { t: 'x' + REL[r2] + (-q.x0), m: 'علامت جواب را اشتباه کرده‌ای: ' + M(fm(q.c) + '\\div' + fm(q.a) + '=' + q.x0) + ' است.' }, { t: 'x' + REL[r] + (-q.x0), m: 'هم علامت عدد و هم جهت را اشتباه کرده‌ای.' }]), line: 'x' + REL[r2] + q.x0, why: 'تقسیم بر عددِ منفی، جهت را برعکس می‌کند.' });
  } else {
    steps.push({ ask: 'ابتدا عدد ' + M(String(q.b)) + ' را از طرف چپ حذف می‌کنیم. خط بعدی کدام است؟', opts: lineOpts(ax(q.a) + REL[r] + (q.c - q.b), [{ t: ax(q.a) + REL[r] + (q.c + q.b), m: 'برای حذف ' + M(sgn(q.b)) + ' باید ' + (q.b > 0 ? 'کم' : 'اضافه') + ' کنی.' }, { t: ax(-q.a) + REL[r] + (q.c - q.b), m: 'علامت جملهٔ x را بی‌دلیل عوض کرده‌ای.' }, { t: ax(q.a) + REL[flipRel(r)] + (q.c - q.b), m: 'جمع و تفریق جهت را برعکس نمی‌کنند.' }]), line: ax(q.a) + REL[r] + (q.c - q.b), why: 'جملهٔ ثابت حذف شد و جهت ماند.' });
    steps.push({ ask: 'دو طرف را بر ' + M(String(q.a)) + ' (عددی منفی) تقسیم می‌کنیم. خط بعدی کدام است؟', opts: lineOpts('x' + REL[r2] + q.x0, [{ t: 'x' + REL[r] + q.x0, m: 'تقسیم بر عددِ منفی جهت را برعکس می‌کند.' }, { t: 'x' + REL[r2] + (-q.x0), m: 'علامت عدد طرف راست را اشتباه کرده‌ای.' }, { t: 'x' + REL[r] + (-q.x0), m: 'هم جهت و هم علامت اشتباه است.' }]), line: 'x' + REL[r2] + q.x0, why: 'تقسیم بر عددِ منفی، جهت را برعکس می‌کند.' });
  }
  return { tex: q.tex, steps: steps, end: 'جواب: ' + M(sol(q)) };
}
/* ---------- کارگاه ۴: سنجشگر عدد ---------- */
function testLab(root) {
  var st = root.querySelector('[data-stage]'), q, tested, reveal;
  function nw() { q = iq(choose(['D', 'C', 'D'])); tested = []; reveal = false; draw(); }
  function X(v) { return 20 + (v + 10) * 15; }
  function svg(cur) {
    var o = '<svg class="e3-svg axs" viewBox="0 0 340 100" role="img" aria-hidden="true">', v, bnd = q.x0;
    if (reveal) { var right = q.rel2 === 'gt' || q.rel2 === 'ge', x1 = right ? X(bnd) : X(-10) - 6, x2 = right ? X(10) + 6 : X(bnd); o += '<rect x="' + x1 + '" y="38" width="' + (x2 - x1) + '" height="9" rx="4" fill="#7fd0c3"/><circle cx="' + X(bnd) + '" cy="42" r="8" fill="' + (q.rel2 === 'ge' || q.rel2 === 'le' ? '#0e8f7e' : '#fff') + '" stroke="#0e8f7e" stroke-width="3"/>'; }
    o += '<line x1="14" y1="42" x2="326" y2="42" stroke="#14213d" stroke-width="2.4"/>';
    for (v = -10; v <= 10; v++) { o += '<line x1="' + X(v) + '" y1="' + (42 - (v % 5 === 0 ? 8 : 4)) + '" x2="' + X(v) + '" y2="' + (42 + (v % 5 === 0 ? 8 : 4)) + '" stroke="#14213d" stroke-width="1.4"/>'; if (v % 5 === 0) { o += '<text x="' + X(v) + '" y="68" text-anchor="middle" font-size="13" fill="#5a6a85" font-family="Tahoma,sans-serif">' + (v < 0 ? '−' : '') + F(abs(v)) + '</text>'; } }
    tested.forEach(function (t) { o += '<circle cx="' + X(t.x) + '" cy="42" r="6" fill="' + (t.ok ? '#0e8f7e' : '#b23a3a') + '" stroke="#14213d" stroke-width="1.8"/>'; });
    o += '<path d="M' + X(cur) + ' 22 l-7 -11 h14 z" fill="#ffc233" stroke="#14213d" stroke-width="1.8"/>';
    return o + '</svg>';
  }
  function live(cur) { var v = q.a * cur + q.b, ok = inSol(q, cur); return '<div class="e3-eq">' + M(lin(q.a, q.b).replace(/x/g, '\\times ' + fm(cur)).replace(/^\\times /, '') + '=' + v + '\\ ' + REL[q.rel] + '\\ ' + q.c) + '</div><div class="e3-row"><span class="e3-pill ' + (ok ? 'ok' : 'bad') + '">' + (ok ? 'برقرار است: ' : 'برقرار نیست: ') + M(v + '\\ ' + REL[q.rel] + '\\ ' + q.c) + '</span></div>'; }
  function draw() {
    st.innerHTML = rr(head(q.tex) + '<div id="t-live"></div><div id="t-svg"></div><div class="e3-slider graduated-range"><div class="lab"><span>عدد آزمایشی ' + M('x') + '</span></div><input type="range" id="t-x" min="-10" max="10" step="1" value="-10" aria-label="عدد آزمایشی">' + (function () { var o = '<div class="graduated-ticks" aria-hidden="true">', v; for (v = -10; v <= 10; v++) { o += '<span class="' + (v % 5 ? 'mn' : '') + '" style="--gr-step:' + (v + 10) + ';--gr-total:20"><i></i>' + M(String(v)) + '</span>'; } return o + '</div>'; })() + '</div><div class="e3-row"><button type="button" class="e3-op" data-mark>ثبت روی محور</button><button type="button" class="e3-op" data-clear>پاک‌کردن نقطه‌ها</button><button type="button" class="e3-op' + (reveal ? ' is-on' : '') + '" data-reveal>' + (reveal ? 'پنهان‌کردن جواب' : 'نمایش جواب') + '</button></div><div id="t-note" class="e3-note"></div>');
    upd();
  }
  function upd() { var cur = +st.querySelector('#t-x').value; st.querySelector('#t-live').innerHTML = rr(live(cur)); st.querySelector('#t-svg').innerHTML = svg(cur); st.querySelector('#t-note').innerHTML = rr(reveal ? 'جواب نامعادله ' + M(sol(q)) + ' است' + (q.rel2 === 'ge' || q.rel2 === 'le' ? '؛ عددِ مرزی ' + M(String(q.x0)) + ' هم جزو جواب است (دایرهٔ توپر).' : '؛ عددِ مرزی ' + M(String(q.x0)) + ' جزو جواب نیست (دایرهٔ توخالی).') : 'چند عدد را بسنج؛ نقطه‌های سبز برقرار و قرمز برقرار نیستند. مرز را حدس بزن، بعد «نمایش جواب» را بزن.'); }
  root.addEventListener('input', function (e) { if (e.target.id === 't-x') { upd(); } });
  root.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.hasAttribute('data-fresh')) { nw(); return; }
    var cur = +st.querySelector('#t-x').value;
    if (b.hasAttribute('data-mark')) { if (!tested.some(function (t) { return t.x === cur; })) { tested.push({ x: cur, ok: inSol(q, cur) }); } upd(); }
    if (b.hasAttribute('data-clear')) { tested = []; upd(); }
    if (b.hasAttribute('data-reveal')) { reveal = !reveal; var keep = cur; draw(); st.querySelector('#t-x').value = keep; upd(); }
  });
  nw();
}
/* ---------- کارگاه ۵: کارآگاه علامت ---------- */
function detectLab(root) {
  var st = root.querySelector('[data-stage]'), p, picked, reason;
  function gen() {
    var kind = choose(['flip', 'const', 'over', 'flip']), q, l1, l2, l3, bad, why;
    if (kind === 'flip') { q = iq('C'); l1 = q.tex; l2 = ax(q.a) + REL[q.rel] + (q.c - q.b); l3 = 'x' + REL[q.rel] + q.x0; bad = 2; why = 'f'; }
    else if (kind === 'const') { q = iq('D'); l1 = q.tex; l2 = ax(q.a) + REL[q.rel] + (q.c + q.b); l3 = 'x' + REL[q.rel] + ((q.c + q.b) / q.a); bad = 1; why = 'c'; if ((q.c + q.b) % q.a !== 0) { return gen(); } }
    else if (kind === 'over') { q = iq('D'); l1 = q.tex; l2 = ax(q.a) + REL[q.rel] + (q.c - q.b); l3 = 'x' + REL[flipRel(q.rel)] + q.x0; bad = 2; why = 'o'; }
    return { lines: [l1, l2, l3], bad: bad, why: why };
  }
  var REASONS = { f: 'هنگام تقسیم بر عددِ منفی، جهت را برعکس نکرده است.', c: 'هنگام حذف عدد ثابت، جمع و تفریق را اشتباه انتخاب کرده است.', o: 'هنگام تقسیم بر عددِ مثبت، جهت را بی‌دلیل برعکس کرده است.', n: 'نمی‌دانم؛ علت اشتباه را متوجه نشدم.' };
  function nw() { p = gen(); picked = null; reason = null; }
  function paint() {
    var locked = reason !== null, ok = picked === p.bad, h = head(p.lines[0]);
    h += '<div class="e02-detect-folder"><div class="e02-detect-spine">مراحل نوشته‌شدهٔ حل</div>' + p.lines.slice(1).map(function (l, j) { var i = j + 1; return '<button type="button" class="e02-detect-row' + (picked === i ? ' is-selected' : '') + (locked ? ' locked' : '') + '" data-line="' + i + '"' + (locked ? ' aria-disabled="true"' : '') + '><span class="e02-detect-num">' + F(i + 1) + '</span><span dir="ltr">' + M(l) + '</span></button>'; }).join('') + '</div>';
    if (locked) { h += mark(reason === p.why, reason === p.why ? '✓ درست است: ' + REASONS[p.why] : (reason === 'n' ? 'اشکالی ندارد. خطا این بود: ' : 'خطا این بود: ') + REASONS[p.why]) + '<div class="opts g-ops"><button type="button" class="btn primary" data-fresh data-scroll=".e02-problem-head" data-scroll-offset="100">مسئلهٔ دیگر</button></div>'; }
    else if (picked !== null && !ok) { h += mark(false, 'سطر ' + M(String(picked + 1)) + ' از سطر قبلی‌اش درست به دست آمده است. محاسبه‌ها را از اول دنبال کن و سطر دیگری را انتخاب کن.'); }
    else if (picked !== null) { h += mark(true, '✓ درست است؛ سطر ' + M(String(picked + 1)) + ' نخستین خطاست. خطا چه بود؟') + '<div class="e01-answer-grid">' + ['f', 'c', 'o', 'n'].map(function (k) { return '<button type="button" class="btn e01-answer" data-reason="' + k + '">' + REASONS[k].replace('است.', 'است') + '</button>'; }).join('') + '</div>'; }
    st.innerHTML = rr(h);
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.hasAttribute('data-fresh')) { nw(); paint(); } else if (b.hasAttribute('data-line')) { if (reason !== null) { return; } picked = +b.dataset.line; paint(); } else if (b.hasAttribute('data-reason')) { reason = b.dataset.reason; paint(); }
  });
  nw(); paint();
}
/* ================= آزمون پایانی ================= */
function mkE1() { var q = iq('A'); return { type: 'mc', ask: 'جواب نامعادلهٔ ' + M(q.tex) + ' کدام است؟', opts: mc({ t: sol(q) }, [{ t: 'x' + REL[flipRel(q.rel)] + q.x0, m: 'جمع و تفریق جهت را برعکس نمی‌کنند.' }, { t: 'x' + REL[q.rel] + (q.c + q.b), m: 'برای حذف عدد ثابت باید عمل وارون را انجام دهی.' }, { t: 'x' + REL[flipRel(q.rel)] + (q.c + q.b), m: 'هم جمع‌وتفریق و هم جهت اشتباه است.' }]), why: 'جمع یا تفریق یک عدد از دو طرف، جهت علامت را عوض نمی‌کند: ' + M(sol(q)) + '.' }; }
function mkE2() { var q = iq('B'); return { type: 'mc', ask: 'جواب نامعادلهٔ ' + M(q.tex) + ' کدام است؟', opts: mc({ t: sol(q) }, [{ t: 'x' + REL[q.rel] + q.x0, m: 'تقسیم بر عددِ منفی جهت را برعکس می‌کند.' }, { t: 'x' + REL[q.rel2] + (-q.x0), m: 'علامت عدد را اشتباه کرده‌ای.' }, { t: 'x' + REL[q.rel] + (-q.x0), m: 'هم جهت و هم علامت اشتباه است.' }]), why: 'تقسیم دو طرف بر ' + M(String(q.a)) + ' (منفی) جهت را برعکس می‌کند: ' + M(sol(q)) + '.' }; }
function mkE3() {
  var k = R(2, 5), good = choose([{ h: 'ضرب دو طرف در ' + M('-' + k) }, { h: 'تقسیم دو طرف بر ' + M('-' + k) }]),
    bads = shuffle([{ h: 'کم‌کردن عددی مثبت از دو طرف' }, { h: 'افزودن عددی منفی به دو طرف' }, { h: 'ضرب دو طرف در ' + M(String(k)) }, { h: 'تقسیم دو طرف بر ' + M(String(k)) }]).slice(0, 3);
  return { type: 'mc', ask: 'کدام کار، جهتِ علامتِ نامعادله را برعکس می‌کند؟', opts: shuffle([{ h: good.h, ok: true }].concat(bads.map(function (w) { return { h: w.h, ok: false }; }))), why: 'فقط ضرب یا تقسیم دو طرف در عددِ منفی جهت را برعکس می‌کند. جمع، تفریق و ضرب یا تقسیم در عددِ مثبت جهت را نگه می‌دارند.' };
}
function mkE4() { var q = iq('C'); return { type: 'mc', ask: 'جواب نامعادلهٔ ' + M(q.tex) + ' کدام است؟', opts: mc({ t: sol(q) }, [{ t: 'x' + REL[q.rel] + q.x0, m: 'در تقسیم بر ' + M(String(q.a)) + ' (منفی) جهت باید برعکس شود.' }, { t: 'x' + REL[q.rel2] + (-q.x0), m: 'علامت عدد را اشتباه کرده‌ای.' }, { t: 'x' + REL[q.rel] + (-q.x0), m: 'جهت و علامت هر دو اشتباه‌اند.' }]), why: 'اول ' + M(String(q.b)) + ' را به طرف دیگر ببر: ' + M(ax(q.a) + REL[q.rel] + (q.c - q.b)) + '؛ بعد تقسیم بر عددِ منفی جهت را برعکس می‌کند: ' + M(sol(q)) + '.' }; }
function mkE5() {
  var q = iq(choose(['D', 'C'])), vals = [], good = [], bad = [], b = q.x0, i;
  for (i = -3; i <= 3; i++) { var v = b + i; if (inSol(q, v)) { good.push(v); } else { bad.push(v); } }
  var t = choose(good), ws = shuffle(bad).slice(0, 3); if (good.length === 0 || ws.length < 3) { return mkE5(); }
  return { type: 'mc', ask: 'کدام عدد جوابِ نامعادلهٔ ' + M(q.tex) + ' است؟ (با جایگذاری بسنج)', opts: shuffle([t].concat(ws)).map(function (v) { return { h: M(String(v)), ok: v === t }; }), why: 'جواب نامعادله ' + M(sol(q)) + ' است' + (q.rel2 === 'ge' || q.rel2 === 'le' ? ' (عددِ مرزی هم جزو جواب است)' : ' (عددِ مرزی جزو جواب نیست)') + '؛ عدد ' + M(String(t)) + ' در آن می‌گنجد.' };
}
function mkE6() {
  var kind = R(0, 3), q = iq(kind === 0 ? 'C' : 'D'), lines, bad;
  if (kind === 0) { lines = [q.tex, ax(q.a) + REL[q.rel] + (q.c - q.b), 'x' + REL[q.rel] + q.x0]; bad = 2; }
  else if (kind === 1) { lines = [q.tex, ax(q.a) + REL[q.rel] + (q.c + q.b), 'x' + REL[q.rel] + ((q.c + q.b) / q.a)]; bad = 1; if ((q.c + q.b) % q.a !== 0) { return mkE6(); } }
  else if (kind === 2) { lines = [q.tex, ax(q.a) + REL[q.rel] + (q.c - q.b), 'x' + REL[flipRel(q.rel)] + q.x0]; bad = 2; }
  else { lines = [q.tex, ax(q.a) + REL[q.rel] + (q.c - q.b), 'x' + REL[q.rel2] + q.x0]; bad = -1; }
  var txt = bad < 0 ? 'همهٔ سطرها درست‌اند؛ هیچ خطایی وجود ندارد.' : 'نخستین خطا در سطر ' + M(String(bad + 1)) + ' است: ' + (kind === 1 ? 'جمع و تفریق برای حذف عدد ثابت اشتباه انتخاب شده.' : kind === 0 ? 'تقسیم بر عددِ منفی جهت را برعکس نکرده.' : 'تقسیم بر عددِ مثبت جهت را نباید برعکس کند.');
  return { type: 'mc', ask: 'نامعادلهٔ ' + M(lines[0]) + ' به این صورت حل شده است. کدام گزینه درست است؟', fig: '<ol class="e03-steps" aria-label="سطرهای راه‌حل">' + lines.map(function (l) { return '<li>' + M(l) + '</li>'; }).join('') + '</ol>', opts: [{ h: 'سطر ' + M('2') + ' نادرست است', ok: bad === 1 }, { h: 'سطر ' + M('3') + ' نادرست است', ok: bad === 2 }, { h: 'همهٔ سطرها درست‌اند', ok: bad < 0 }, { h: 'هر دو سطر ' + M('2') + ' و ' + M('3') + ' نادرست‌اند', ok: false }], why: txt };
}

return {
  html: function () {
    var h = '<div class="e01-lesson e02-lesson e3x">';
    h += intro('وقتی دو طرف دیگر مساوی نیستند', 'در معادله دو طرف برابرند و اگر روی هر دو طرف یک عملیات یکسان انجام دهیم، برابری حفظ می‌شود. در <b>نامعادله</b> یک طرف از دیگری بزرگ‌تر یا کوچک‌تر است. پرسش اصلی این درس: کدام عملیات این «بزرگ‌تر یا کوچک‌تر بودن» را نگه می‌دارد و کدام آن را برعکس می‌کند؟', ['ترازوی کج', 'آیینهٔ صفر', 'حل گام‌به‌گام', 'آزمایش جواب']);

    h += K.sn('۱', 'ترازوی کج: چه چیزی را نگه می‌دارد؟');
    h += '<p>نامعادله را مثل ترازویی ببین که تعادل ندارد. وقتی می‌نویسیم ' + M('3\\lt 7') + '، یعنی ترازو به سمت ' + M('7') + ' کج شده است: کفهٔ عددِ بزرگ‌تر پایین‌تر می‌آید. چهار نماد نامعادله را که در این درس زیاد می‌بینی، یک بار مرور کن:</p>';
    h += '<div class="e3-row e3-syms">' + [['\\lt', 'کوچک‌تر از'], ['\\gt', 'بزرگ‌تر از'], ['\\leq', 'کوچک‌تر یا مساوی'], ['\\geq', 'بزرگ‌تر یا مساوی']].map(function (s) { return '<span class="e3-pill"><span>' + M(s[0]) + '</span><span>' + s[1] + '</span></span>'; }).join('') + '</div>';
    h += '<p>حالا یک عمل ساده را امتحان کنیم: اگر به هر دو طرفِ ' + M('3\\lt 7') + ' عدد ' + M('2') + ' اضافه کنیم، به ' + M('5\\lt 9') + ' می‌رسیم و باز هم کفهٔ ' + M('9') + ' پایین‌تر است. آیا این اتفاق برای هر عملیاتی می‌افتد؟ مثلاً وقتی دو طرف را در یک عدد <b>منفی</b> ضرب می‌کنیم؟ اول حدس بزن؛ بعد با ده عملیات مختلف آزمایشش کن.</p>';
    h += activity('کارگاه ترازوی کج', 'e03-tilt', 'یک عملیات را انتخاب کن تا روی هر دو عدد اجرا شود. زیر ترازو می‌بینی جهت علامت ماند یا برعکس شد. اگر عددها بر مقسوم‌علیه بخش‌پذیر نباشند، آن دکمه غیرفعال می‌شود. با «برگشت یک گام» می‌توانی عقب بروی.');
    h += '<p>نتیجهٔ کارگاه روشن است: <b>جمع و تفریق</b> و همین‌طور <b>ضرب و تقسیم در عددی مثبت</b> ترتیب را نگه می‌دارند، اما <b>ضرب و تقسیم در عددی منفی</b> کفه‌ها را جابه‌جا می‌کند. پرسش بعدی طبیعی است: چرا فقط عددهای منفی این کار را می‌کنند؟ جواب را روی محور عددها می‌بینیم.</p>';

    h += K.sn('۲', 'آیینهٔ صفر: چرا برعکس می‌شود؟');
    h += '<p>روی محور عددها، عددِ بزرگ‌تر همیشه سمت راست است. مثلاً در ' + M('2\\lt 5') + ' عدد ' + M('2') + ' سمت چپِ ' + M('5') + ' قرار دارد. ضرب در ' + M('-1') + ' هر عدد را به قرینه‌اش می‌برد، درست مثل آیینه‌ای که در صفر ایستاده است: ' + M('2') + ' به ' + M('-2') + ' و ' + M('5') + ' به ' + M('-5') + ' می‌رود. عددی که بیشتر به راست بود، حالا بیشتر به چپ افتاده است و ترتیب برعکس می‌شود:</p>';
    h += '<div class="e3-disp">' + M('2\\lt 5\\ \\xrightarrow{\\ \\times(-1)\\ }\\ -2\\gt -5') + '</div>';
    h += '<p>ضرب در ' + M('-2') + ' یا ' + M('-3') + ' علاوه بر آیینه‌کردن، فاصله‌ها را هم دو یا سه برابر می‌کند، اما چون عدد را به آن سوی صفر می‌برد، باز هم ترتیب برعکس می‌شود. تقسیم بر عددی منفی هم همین است؛ چون تقسیم بر ' + M('-2') + ' یعنی ضرب در ' + M('-\\dfrac{1}{2}') + ' که ضریبی منفی است. در مقابل، ضرب در عددی مثبت فقط فاصله‌ها را کم یا زیاد می‌کند و هیچ عددی را از یک سوی صفر به سوی دیگر نمی‌برد؛ پس ترتیب می‌ماند.</p>';
    h += activity('کارگاه آیینهٔ صفر', 'e03-mirror', 'دو عدد را بالای محور و تصویر آن‌ها را بعد از ضرب پایین می‌بینی. خط‌های نقطه‌چین نشان می‌دهند هر عدد کجا می‌رود. اول چند ضریب مثبت را امتحان کن، بعد سراغ ضریب‌های منفی برو و ببین چه وقت خط‌ها یکدیگر را قطع می‌کنند.');
    h += K.box('note', 'قاعدهٔ علامت', '<p>اگر دو طرف نامعادله را در عددی <b>منفی</b> ضرب کنیم یا بر عددی <b>منفی</b> تقسیم کنیم، جهت علامت برعکس می‌شود: ' + M('\\lt') + ' به ' + M('\\gt') + ' و ' + M('\\leq') + ' به ' + M('\\geq') + ' تبدیل می‌شود (و برعکس).</p>');

    h += K.sn('۳', 'حل گام‌به‌گام');
    h += '<p>تا این‌جا فهمیدیم کدام عملیات جهت را نگه می‌دارد و کدام آن را برعکس می‌کند. حالا از همین دانسته‌ها برای حل کردن استفاده می‌کنیم.</p>';
    h += '<p>حل نامعادله هم مثل معادله با عملیات وارون پیش می‌رود، به‌علاوهٔ یک مراقبت: وقتی دو طرف را بر عددی منفی تقسیم می‌کنی، جهت را برعکس کن. به عنوان مثال برای نامعادلهٔ ' + M('7-3x\\leq 13') + ': اول ' + M('7') + ' را حذف می‌کنیم و بعد بر ' + M('-3') + ' تقسیم می‌کنیم.</p>';
    h += exampleBlock('e03-example-steps', 'حل کامل نامعادله', 3);
    h += '<p>در این مثال هر گام کار مشخصی کرد: حذف عدد ثابت جهت را نگه داشت، تقسیم بر ضریبِ منفی آن را برعکس کرد و در پایان جواب را با چند عدد سنجیدیم. حالا نوبت توست که جای حل‌کننده بنشینی.</p>';
    h += activity('کارگاه گام‌های حل', 'e03-solve', 'در هر گام، خطی را که بعد از آن عملیات به دست می‌آید انتخاب کن. اگر اشتباه کنی، دلیل اشتباه را می‌بینی و می‌توانی دوباره انتخاب کنی. با دکمهٔ چرخان، نمونهٔ تازه‌ای از یکی از چهار نوع نامعادله می‌گیری.');
    h += K.box('err', '⚠ دو خطای رایج', '<p><b>برعکس نکردن جهت:</b> دو طرف را بر عددی <b>منفی</b> تقسیم می‌کنی ولی علامت را همان‌طور نگه می‌داری. مثلاً اگر از ' + M('-3x\\leq 6') + ' به ' + M('x\\leq -2') + ' برسی، اشتباه کرده‌ای؛ جواب درست ' + M('x\\geq -2') + ' است.</p><p><b>برعکس کردن بی‌دلیل جهت:</b> در جایی که عدد <b>مثبت</b> است یا فقط جمع و تفریق انجام داده‌ای، جهت را عوض می‌کنی. مثلاً اگر از ' + M('2x\\leq 6') + ' به ' + M('x\\geq 3') + ' برسی، اشتباه کرده‌ای؛ جواب درست ' + M('x\\leq 3') + ' است.</p>');

    h += K.sn('۴', 'جواب را با عدد آزمایش کن');
    h += '<p>بعد از حل، یک پرسش می‌ماند: از کجا بدانیم جواب درست است؟ جوابِ ' + M('x\\geq -2') + ' فقط یک عدد نیست؛ <b>همهٔ عددهایی</b> است که نامعادله را برقرار می‌کنند، یعنی ' + M('-2') + '، ' + M('-1') + '، ' + M('0') + ' و هر عدد بزرگ‌تر. برای اطمینان، چند عدد را در نامعادلهٔ اصلی جایگذاری کن: عددی از ناحیهٔ جواب باید نامعادله را برقرار کند و عددی از طرف دیگر نه. حتی خودِ عدد مرزی را هم امتحان کن؛ در ' + M('\\leq') + ' و ' + M('\\geq') + ' جزو جواب است و در ' + M('\\lt') + ' و ' + M('\\gt') + ' نیست.</p>';
    h += activity('کارگاه سنجشگر عدد', 'e03-test', 'عدد آزمایشی را با نوار انتخاب کن و ببین نامعادله برقرار می‌شود یا نه. چند نقطه را روی محور ثبت کن، مرز جواب را حدس بزن و بعد «نمایش جواب» را بزن تا ناحیهٔ جواب روی محور سبز شود.');
    h += '<p>به یاد داشته باش که بررسی عدد مرزی مهم‌ترین بخش این آزمایش است: اگر علامت ' + M('\\leq') + ' یا ' + M('\\geq') + ' باشد، مرز هم جواب است (دایرهٔ توپر)، و اگر ' + M('\\lt') + ' یا ' + M('\\gt') + ' باشد، نیست (دایرهٔ توخالی). اما اگر آزمایش نشان داد جواب نادرست است، باید بدانی خطا از کجا آمده.</p>';

    h += K.sn('۵', 'خطا از کجا آمد؟');
    h += '<p>وقتی جواب نادرست درمی‌آید، معمولاً فقط یک گام خراب شده و گام‌های بعدی خطا را با خود جلو برده‌اند. پس باید راه‌حل را از بالا بخوانی و <b>نخستین سطرِ نادرست</b> را پیدا کنی؛ یعنی اولین سطری که از سطر قبلی‌اش درست به دست نیامده است.</p>';
    h += activity('کارآگاه علامت', 'e03-detect', 'سه سطر از یک راه‌حل را می‌بینی. روی نخستین سطرِ نادرست بزن و بعد علت اشتباه را انتخاب کن.');
    h += '<p>خطاهایی که پیدا کردی، همان‌هایی هستند که در آزمون پایانی هم سراغت می‌آیند؛ پس وقت آن رسیده که همه چیز را با هم بسنجی.</p>';

    h += K.sn('۶', 'آزمون پایانی');
    h += '<p>در آزمون پایانی، حل نامعادله، تغییر جهت علامت، آزمایش عدد و خطایابی سنجیده می‌شود. شش سؤال در قالب‌های گوناگون، با عددهای تازه در هر دور.</p>';
    h += '<div id="e03-final" class="e01-interaction e01-final" aria-label="آزمون پایانی" data-activity></div>';
    h += K.box('sum', 'بعد از این درس باید بتوانی', '<ul><li>بگویی جمع و تفریق و ضرب یا تقسیم در عددِ مثبت جهتِ نامعادله را نگه می‌دارند و ضرب یا تقسیم در عددِ منفی آن را برعکس می‌کنند.</li><li>نامعادله‌های ساده، دارای ضریب منفی و دارای عدد ثابت را گام‌به‌گام حل کنی.</li><li>جواب را با جایگذاری چند عدد (از جمله عدد مرزی) بیازمایی.</li><li>نخستین سطر نادرست یک راه‌حل را پیدا کنی و نوع خطا را بگویی.</li></ul>');
    return h + '</div>';
  },
  init: function () {
    var $ = function (id) { return document.getElementById(id); }, ck = '\\ {\\color{teal}\\checkmark}', cx = '\\ {\\color{crimson}\\times}';
    tiltLab($('e03-tilt')); mirrorLab($('e03-mirror')); K.guide($('e03-solve'), genSolve); testLab($('e03-test')); detectLab($('e03-detect'));
    exampleBind('e03-example-steps', [
      { title: 'حذف عدد ثابت', lines: ['7-3x\\leq 13', '7-3x-7\\leq 13-7', '-3x\\leq 6'], note: 'از هر دو طرف ' + M('7') + ' کم می‌کنیم؛ کم‌کردن جهت را عوض نمی‌کند.' },
      { title: 'تقسیم بر ضریب منفی', lines: ['-3x\\leq 6', '\\dfrac{-3x}{-3}\\geq \\dfrac{6}{-3}', 'x\\geq -2'], note: 'دو طرف را بر ' + M('-3') + ' تقسیم می‌کنیم. چون عدد منفی است، جهت ' + M('\\leq') + ' به ' + M('\\geq') + ' برمی‌گردد.' },
      { title: 'آزمایش جواب', lines: ['x=0:\\ 7-0=7\\leq 13' + ck, 'x=-2:\\ 7+6=13\\leq 13' + ck, 'x=-3:\\ 7+9=16\\leq 13' + cx], note: 'عدد ' + M('0') + ' و عدد مرزی ' + M('-2') + ' برقرارند؛ عدد ' + M('-3') + ' که در ناحیهٔ جواب نیست، برقرار نیست.' }
    ]);
    K.final($('e03-final'), [mkE1, mkE2, mkE3, mkE4, mkE5, mkE6]);
  }
};

  }
};
