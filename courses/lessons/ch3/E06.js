/* درس مهارت E06 — معادلهٔ حاصل‌ضربی (فصل ۳) */
window.LESSONS = window.LESSONS || {};
window.LESSONS.E06 = {
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
var nf = function (v) { var s = String(+(+v).toFixed(2)); return s === '-0' ? '0' : s; };
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
var REFRESH = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.6-5.9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M20 4v5h-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function head(tex) { return '<div class="e02-problem-head"><span class="e02-problem-chip">' + M(tex) + '</span><button type="button" class="btn primary e01-station-refresh" data-fresh title="مسئلهٔ جدید" aria-label="تغییر مسئله">' + REFRESH + '</button></div>'; }

css('css-E3shared', [
'.e3x .katex{unicode-bidi:isolate;direction:ltr}',
'.e3-eq{direction:ltr;text-align:center;display:grid;place-items:center;min-height:64px;padding:10px;margin:6px 0 10px;border:1.5px solid var(--line);border-radius:11px;background:#f3f6fa;font-size:1.25rem;max-width:100%;overflow-x:auto;scrollbar-width:none}',
'.e3-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:8px 0;direction:rtl}',
'.e3-op{min-width:54px;min-height:42px;padding:4px 12px;border:2px solid var(--ink);border-radius:12px;background:#fff;font:inherit;font-size:1rem;font-weight:700;cursor:pointer;box-shadow:2px 2px 0 var(--ink);color:var(--ink)}',
'.e3-op .katex{font-size:1.05em}.e3-op:active:not(:disabled){transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}',
'.e3-op.is-on{background:var(--mark)}.e3-op:disabled{opacity:.45;cursor:default;box-shadow:none}',
'.e3-pill{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:34px;padding:3px 12px;border:1.5px solid var(--line);border-radius:999px;background:#fff;font-size:.92rem}',
'.e3-pill.ok{background:#d2f0e9;border-color:#438b6c;color:#173d2e}.e3-pill.bad{background:#fbd5d5;border-color:#b23a3a;color:#632323}.e3-pill.y{background:var(--mark);border-color:var(--ink)}',
'.e3-exline{direction:rtl;text-align:center;font-size:1rem;line-height:1.9}',
'.e3-note{text-align:center;font-size:.92rem;line-height:1.9;color:var(--ink-soft);margin:6px 4px}',
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
'.e3-slider .lab{display:flex;justify-content:space-between;font-size:.85rem;color:var(--ink-soft);margin-bottom:2px}'
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
    if (done) { st.innerHTML = rr(h + mark(true, '<b>حل کامل شد' + (wrong ? '' : ' (بدون خطا)') + '.</b> ' + (p.end || '')) + '<div class="opts g-ops"><button type="button" class="btn" data-fresh>مسئلهٔ دیگر</button></div>'); return; }
    s = p.steps[si];
    h += '<p class="ask e3-ask">' + F(si + 1) + '. ' + s.ask + '</p><div class="e01-answer-grid">' + s.opts.map(function (op, i) { var cl = okIdx !== undefined ? (op.ok ? ' e01-right' : (tries.indexOf(i) > -1 ? ' e01-wrong' : '')) : (tries.indexOf(i) > -1 ? ' e01-wrong' : ''); return '<button type="button" class="btn e01-answer' + cl + '" data-pick="' + i + '"' + (okIdx !== undefined || tries.indexOf(i) > -1 ? ' disabled' : '') + '>' + op.h + '</button>'; }).join('') + '</div>';
    if (last !== undefined) { var lo = s.opts[last]; h += mark(lo.ok, lo.ok ? '✓ درست است. ' + s.why : lo.m); }
    if (okIdx !== undefined) { h += '<div class="e01-navigation"><span></span><button type="button" class="btn primary" data-go>' + (si === p.steps.length - 1 ? 'پایان' : 'گام بعدی') + '</button></div>'; }
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

/* ---------- آزمون پایانی چندشکلی ----------
   makers: آرایه‌ای از تابع‌ها؛ هر تابع آیتمی مثل
   {type:'mc'|'multi'|'num'|'match', ask, fig?, opts:[{h,ok}], ans(num), left/right/key(match), why} برمی‌گرداند */
K.final = function (root, makers, o) {
  o = o || {}; var s, N = makers.length;
  function setup() { s = { q: makers.map(function (m) { return m(); }), pos: 0, ans: makers.map(function () { return null; }), res: makers.map(function () { return null; }), sel: {}, fin: false, review: false }; }
  function parseNum(v) { v = (v || '').replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 1776; }).replace(/[٫,،]/g, '.').replace(/[−–—]/g, '-').replace(/\s/g, ''); return /^-?\d+(\.\d+)?$/.test(v) ? +v : null; }
  function paint() {
    var h, it, a, frozen, body = '', i, sc;
    if (s.fin && !s.review) {
      sc = s.res.filter(function (r) { return r; }).length;
      root.innerHTML = rr('<div class="fb ' + (sc >= N - 2 ? 'ok' : 'bad') + '" role="status"><b>نتیجه: ' + F(sc) + ' از ' + F(N) + '</b><br>' + (sc === N ? 'همهٔ سؤال‌ها را درست پاسخ دادی.' : sc >= N - 2 ? 'سؤال‌های نادرست را مرور کن و دلیل هر اشتباه را بررسی کن.' : 'یک بار دیگر درس را مرور کن؛ سپس با سؤال‌های تازه تمرین کن.') + '</div><div class="opts end-actions"><button type="button" class="btn" data-review>مرور سؤال‌ها</button><button type="button" class="btn primary" data-final-new>سؤال‌های جدید</button></div>'); return;
    }
    it = s.q[s.pos]; a = s.ans[s.pos]; frozen = a !== null;
    if (it.type === 'mc') {
      body = '<div class="e01-answer-grid">' + it.opts.map(function (op, k) { return '<button type="button" class="btn e01-answer' + (frozen ? (op.ok ? ' e01-right' : (a === k ? ' e01-wrong' : '')) : '') + '" data-choice="' + k + '"' + (frozen ? ' disabled' : '') + '>' + op.h + '</button>'; }).join('') + '</div>';
    } else if (it.type === 'multi') {
      var cur = frozen ? a : (s.sel[s.pos] || []);
      body = '<div class="e01-answer-grid">' + it.opts.map(function (op, k) { var on = cur.indexOf(k) > -1; return '<button type="button" class="btn e01-answer' + (frozen ? (op.ok ? ' e01-right' : (on ? ' e01-wrong' : '')) : (on ? ' is-sel' : '')) + '" data-toggle="' + k + '"' + (frozen ? ' disabled' : '') + '>' + op.h + '</button>'; }).join('') + '</div>' + (frozen ? '' : '<div class="opts"><button type="button" class="btn primary" data-submit' + (cur.length ? '' : ' disabled') + '>ثبت پاسخ</button></div>');
    } else if (it.type === 'num') {
      body = '<div class="e3-numrow"><span class="lbl">' + M(it.lbl || 'x=') + '</span><input class="numin" id="fin-num" type="text" inputmode="decimal" autocomplete="off" aria-label="پاسخ"' + (frozen ? ' disabled' : '') + '></div>' + (frozen ? '' : '<div class="opts"><button type="button" class="btn primary" data-submit>ثبت پاسخ</button></div>');
    } else if (it.type === 'match') {
      var cur2 = frozen ? a : (s.sel[s.pos] || []);
      body = it.left.map(function (l, r) { var cl = frozen ? (a[r] === it.key[r] ? ' right' : ' wrong') : ''; return '<div class="e3-match-row' + cl + '"><span class="l">' + l + '</span><select data-row="' + r + '"' + (frozen ? ' disabled' : '') + '><option value="">انتخاب کن…</option>' + it.right.map(function (rt, k) { return '<option value="' + k + '"' + (cur2[r] === k ? ' selected' : '') + '>' + rt + '</option>'; }).join('') + '</select></div>'; }).join('') + (frozen ? '' : '<div class="opts"><button type="button" class="btn primary" data-submit' + (cur2.filter(function (v) { return v !== undefined && v !== null; }).length === it.left.length ? '' : ' disabled') + '>ثبت پاسخ</button></div>');
    }
    h = '<div class="e01-progress stg" aria-label="پیشرفت آزمون">' + s.q.map(function (q, k) { return '<span class="' + (k === s.pos ? 'cu' : s.res[k] === null ? '' : s.res[k] ? 'dn' : 'wr') + '" aria-label="سؤال ' + F(k + 1) + '">' + F(k + 1) + '</span>'; }).join('') + '</div><p class="ask e01-question">' + it.ask + '</p>' + (it.fig || '') + body;
    if (frozen) { h += mark(s.res[s.pos], (s.res[s.pos] ? 'پاسخ درست است. ' : (it.wrongText ? it.wrongText(a) : 'پاسخ درست: ' + (it.show || (it.opts ? it.opts.filter(function (op) { return op.ok; }).map(function (op) { return op.h; }).join('، ') : '')) + '.') + ' ') + it.why); }
    h += '<div class="e01-navigation"><button type="button" class="btn" data-prev' + (s.pos === 0 ? ' disabled' : '') + '>سؤال قبلی</button><button type="button" class="btn primary" data-next' + (!frozen ? ' disabled' : '') + '>' + (s.pos === N - 1 ? (s.review ? 'بازگشت به نتیجه' : 'مشاهدهٔ نتیجه') : 'سؤال بعدی') + '</button></div>';
    root.innerHTML = rr(h);
  }
  function submit() {
    var it = s.q[s.pos], k;
    if (it.type === 'multi') { var cur = (s.sel[s.pos] || []).slice().sort(); s.ans[s.pos] = cur; s.res[s.pos] = JSON.stringify(cur) === JSON.stringify(it.opts.map(function (op, i) { return op.ok ? i : -1; }).filter(function (i) { return i >= 0; })); }
    else if (it.type === 'num') { var f = root.querySelector('#fin-num'), v = parseNum(f.value); if (v === null) { f.focus(); return; } s.ans[s.pos] = v; s.res[s.pos] = abs(v - it.ans) < 1e-9; }
    else if (it.type === 'match') { var cu = s.sel[s.pos] || []; s.ans[s.pos] = cu.slice(); s.res[s.pos] = it.key.every(function (kk, r) { return cu[r] === kk; }); }
    paint();
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.hasAttribute('data-choice')) { if (s.ans[s.pos] === null) { var k = +b.dataset.choice; s.ans[s.pos] = k; s.res[s.pos] = !!s.q[s.pos].opts[k].ok; paint(); } return; }
    if (b.hasAttribute('data-toggle')) { var t = +b.dataset.toggle, c = (s.sel[s.pos] || []).slice(), ix = c.indexOf(t); if (ix > -1) { c.splice(ix, 1); } else { c.push(t); } s.sel[s.pos] = c; paint(); return; }
    if (b.hasAttribute('data-submit')) { submit(); return; }
    if (b.hasAttribute('data-prev')) { s.pos--; paint(); return; }
    if (b.hasAttribute('data-next')) { if (s.pos < N - 1) { s.pos++; } else { s.fin = true; s.review = false; } paint(); return; }
    if (b.hasAttribute('data-review')) { s.review = true; s.pos = 0; paint(); return; }
    if (b.hasAttribute('data-final-new')) { setup(); paint(); }
  });
  root.addEventListener('change', function (e) { var sel = e.target.closest('select[data-row]'); if (!sel) { return; } var c = (s.sel[s.pos] || []).slice(); c[+sel.dataset.row] = sel.value === '' ? undefined : +sel.value; s.sel[s.pos] = c; paint(); });
  root.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.id === 'fin-num') { e.preventDefault(); submit(); } });
  setup(); paint();
};


/* ================= ابزارهای معادلهٔ حاصل‌ضربی ================= */
var OR = '\\ \\text{یا}\\ ', AND = '\\ \\text{و}\\ ';
function pairRoots(simple) {
  var r1 = nz(-7, 7), r2 = nz(-7, 7), a1 = simple ? 1 : choose([1, 1, 2, 3]);
  while (r2 === r1) { r2 = nz(-7, 7); }
  return { a1: a1, b1: -a1 * r1, a2: 1, b2: -r2, r1: r1, r2: r2, f1: lin(a1, -a1 * r1), f2: lin(1, -r2) };
}
var fac = function (s) { return '(' + s + ')'; };
var eqTex = function (p) { return fac(p.f1) + fac(p.f2) + '=0'; };
var rootsTex = function (p) { return 'x=' + p.r1 + OR + 'x=' + p.r2; };
var sorted2 = function (p) { return [p.r1, p.r2].sort(function (a, b) { return a - b; }); };
/* ---------- کارگاه ۱: قانون ضرب صفر ---------- */
function zeroLab(root) {
  var st = root.querySelector('[data-stage]'), p, found, show;
  function nw() { p = pairRoots(false); found = []; show = false; draw(); }
  function X(v) { return 20 + (v + 9) * (300 / 18); }
  function strip(x) {
    var o = '<svg class="e3-svg" viewBox="0 0 340 70" role="img" aria-hidden="true">', v;
    o += '<line x1="12" y1="34" x2="328" y2="34" stroke="#14213d" stroke-width="2.4"/>';
    for (v = -9; v <= 9; v++) { o += '<line x1="' + X(v) + '" y1="' + (34 - (v % 3 === 0 ? 7 : 4)) + '" x2="' + X(v) + '" y2="' + (34 + (v % 3 === 0 ? 7 : 4)) + '" stroke="#14213d" stroke-width="1.4"/>'; if (v % 3 === 0) { o += '<text x="' + X(v) + '" y="58" text-anchor="middle" font-size="11" fill="#5a6a85" font-family="Tahoma,sans-serif">' + (v < 0 ? '−' : '') + F(abs(v)) + '</text>'; } }
    [p.r1, p.r2].forEach(function (r) { if (show || found.indexOf(r) > -1) { o += '<circle cx="' + X(r) + '" cy="34" r="9" fill="#0e8f7e" stroke="#14213d" stroke-width="2.2"/>'; } });
    o += '<path d="M' + X(x) + ' 14 l-7 -11 h14 z" fill="#ffc233" stroke="#14213d" stroke-width="1.8"/>';
    return o + '</svg>';
  }
  function draw() {
    st.innerHTML = rr('<div class="e02-problem-head"><span class="e02-problem-chip">' + M(eqTex(p)) + '</span><button type="button" class="btn primary e01-station-refresh" data-fresh title="معادلهٔ جدید" aria-label="معادلهٔ جدید">' + REFRESH + '</button></div><div id="zl-live"></div><div id="zl-strip"></div><div class="e3-slider"><div class="lab"><span>عدد آزمایشی ' + M('x') + '</span></div><input type="range" id="zl-x" min="-9" max="9" step="1" value="0" aria-label="عدد آزمایشی"></div><div class="e3-row"><button type="button" class="e3-op' + (show ? ' is-on' : '') + '" data-show>' + (show ? 'پنهان‌کردن ریشه‌ها' : 'نمایش ریشه‌ها') + '</button></div><p class="e3-note" id="zl-note"></p>');
    upd();
  }
  function upd() {
    var x = +st.querySelector('#zl-x').value, v1 = p.a1 * x + p.b1, v2 = p.a2 * x + p.b2, pr = v1 * v2, zero = pr === 0, sn = function (v) { return (v < 0 ? '−' : '') + F(abs(v)); };
    if (zero && found.indexOf(x) < 0) { found.push(x); }
    st.querySelector('#zl-live').innerHTML = rr('<div class="e3-row"><span class="e3-pill ' + (v1 === 0 ? 'ok' : '') + '">' + M(p.f1) + ' ' + ltr('= ' + sn(v1)) + '</span><span class="e3-pill ' + (v2 === 0 ? 'ok' : '') + '">' + M(p.f2) + ' ' + ltr('= ' + sn(v2)) + '</span><span class="e3-pill ' + (zero ? 'ok' : 'bad') + '">حاصل‌ضرب ' + ltr('= ' + sn(pr)) + '</span></div>');
    st.querySelector('#zl-strip').innerHTML = strip(x);
    st.querySelector('#zl-note').innerHTML = rr(zero ? 'یکی از عامل‌ها صفر شد؛ پس حاصل‌ضرب صفر است. این ' + M('x') + ' یک جواب معادله است.' : 'هیچ‌کدام از دو عامل صفر نیست؛ حاصل‌ضرب هم صفر نمی‌شود. فقط وقتی حاصل‌ضرب صفر است که <b>دست‌کم یک عامل صفر</b> باشد.');
    if (found.length === 2 && !show) { st.querySelector('#zl-note').innerHTML += rr(' هر دو ریشه را پیدا کردی!'); }
  }
  root.addEventListener('input', function (e) { if (e.target.id === 'zl-x') { var x = +e.target.value; draw0(x); } });
  function draw0(x) { upd(); }
  root.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b || b.disabled) { return; } if (b.hasAttribute('data-fresh')) { nw(); } else if (b.hasAttribute('data-show')) { show = !show; var keep = +st.querySelector('#zl-x').value; draw(); st.querySelector('#zl-x').value = keep; upd(); } });
  nw();
}
/* ---------- کارگاه ۲: ریشه‌یاب (دو ورودی) ---------- */
function rootsLab(root) {
  var st = root.querySelector('[data-stage]'), p, tries, done, fbh;
  function parse(v) { v = (v || '').replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 1776; }).replace(/[−–—]/g, '-').replace(/\s/g, ''); return /^-?\d+$/.test(v) ? +v : null; }
  function nw() { p = pairRoots(false); tries = 0; done = false; fbh = ''; paint(); }
  function paint(v1, v2) {
    var ex = '<div class="ex"><p>هر عامل را جداگانه برابر صفر بگذار:</p>' + K.dm(p.f1 + '=0\\ \\Rightarrow\\ x=' + p.r1) + K.dm(p.f2 + '=0\\ \\Rightarrow\\ x=' + p.r2) + '</div>';
    st.innerHTML = rr('<div class="e02-problem-head"><span class="e02-problem-chip">' + M(eqTex(p)) + '</span><button type="button" class="btn primary e01-station-refresh" data-fresh title="معادلهٔ جدید" aria-label="معادلهٔ جدید">' + REFRESH + '</button></div><p class="ask e3-ask">دو جواب معادله را بنویس (به هر ترتیب).</p><div class="e3-numrow"><span class="lbl">' + M('x_1=') + '</span><input class="numin" id="r-1" type="text" inputmode="numeric" autocomplete="off" aria-label="جواب اول"' + (done ? ' disabled' : '') + '><span class="lbl">' + M('x_2=') + '</span><input class="numin" id="r-2" type="text" inputmode="numeric" autocomplete="off" aria-label="جواب دوم"' + (done ? ' disabled' : '') + '></div>' + fbh + (done ? ex + '<div class="opts g-ops"><button type="button" class="btn" data-fresh>مسئلهٔ دیگر</button></div>' : '<div class="opts g-pair"><button type="button" class="btn primary" data-go>بررسی</button><button type="button" class="btn" data-fresh>مسئلهٔ دیگر</button></div>'));
    if (v1 !== undefined) { st.querySelector('#r-1').value = v1; st.querySelector('#r-2').value = v2; }
  }
  function check() {
    var i1 = st.querySelector('#r-1'), i2 = st.querySelector('#r-2'), a = parse(i1.value), b = parse(i2.value);
    if (a === null || b === null) { fbh = '<div class="fb bad">هر دو جواب را به‌صورت عددِ صحیح بنویس.</div>'; paint(i1.value, i2.value); return; }
    tries++;
    var got = [a, b].sort(function (x, y) { return x - y; }), want = sorted2(p), ok = got[0] === want[0] && got[1] === want[1], neg = got[0] === -want[1] && got[1] === -want[0];
    if (ok) { done = true; fbh = '<div class="fb ok">✓ درست است: ' + M(rootsTex(p)) + '.</div>'; }
    else if (tries >= 2) { done = true; fbh = '<div class="fb bad">پاسخ درست ' + M(rootsTex(p)) + ' است؛ راه‌حل را ببین.</div>'; }
    else { fbh = '<div class="fb bad">' + (neg ? 'علامت‌ها را عوض کرده‌ای: از ' + M(p.f2 + '=0') + ' می‌رسیم به ' + M('x=' + p.r2) + '، نه ' + M('x=' + -p.r2) + '.' : 'درست نیست. هر عامل را جداگانه برابر صفر بگذار و علامتِ عدد را موقع جابه‌جایی عوض کن.') + '</div>'; }
    paint(i1.value, i2.value);
  }
  root.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b || b.disabled) { return; } if (b.hasAttribute('data-fresh')) { nw(); } else if (b.hasAttribute('data-go')) { check(); } });
  root.addEventListener('keydown', function (e) { if (e.key === 'Enter' && (e.target.id === 'r-1' || e.target.id === 'r-2') && !done) { e.preventDefault(); check(); } });
  nw();
}
/* ---------- گام‌ها: عامل‌گیری و ضرب صفر ---------- */
function genFact() {
  var m = R(2, 7), neg = R(0, 1), fac1 = 'x' + (neg ? '+' + m : '-' + m), root2 = neg ? -m : m, steps = [];
  var tex = neg ? 'x^2+' + m + 'x=0' : 'x^2-' + m + 'x=0';
  steps.push({ ask: 'اول از دو جمله «عامل مشترک» می‌گیریم. خط بعدی کدام است؟', opts: mc({ t: 'x(' + fac1 + ')=0' }, [{ t: fac1 + '=0', m: 'این‌جا دو طرف را بر x تقسیم کرده‌ای؛ اما تقسیم بر x یک جواب را گم می‌کند. عامل بگیر، تقسیم نکن.' }, { t: 'x(' + (neg ? 'x-' + m : 'x+' + m) + ')=0', m: 'علامت داخل پرانتز را اشتباه کرده‌ای: ' + M(tex) + ' یعنی ' + M('x\\times x' + (neg ? '+' : '-') + 'x\\times ' + m) + '.' }, { t: 'x^2(1' + (neg ? '+' : '-') + m + ')=0', m: 'x فقط یک‌بار مشترک است؛ ' + M('x^2') + ' و ' + M('x') + ' توان‌های متفاوت دارند.' }]), line: 'x(' + fac1 + ')=0', why: 'عامل مشترک x بیرون آمد.' });
  steps.push({ ask: 'حالا هر عامل را جداگانه برابر صفر می‌گذاریم. جواب‌ها کدام‌اند؟', opts: mc({ t: 'x=0' + OR + 'x=' + root2 }, [{ t: 'x=' + root2, m: 'خودِ ' + M('x') + ' هم یک عامل است و ' + M('x=0') + ' هم جواب است.' }, { t: 'x=' + root2 + OR + 'x=' + -root2, m: 'جواب دوم ' + M('x=' + -root2) + ' نیست؛ عامل اول ' + M('x') + ' است.' }, { t: 'x=0' + OR + 'x=' + -root2, m: 'علامتِ جواب دوم را اشتباه کرده‌ای: ' + M(fac1 + '=0') + ' می‌دهد ' + M('x=' + root2) + '.' }]), line: 'x=0' + OR + 'x=' + root2, why: 'عامل اول ' + M('x=0') + ' و عامل دوم ' + M('x=' + root2) + ' را می‌دهد.' });
  steps.push({ ask: 'اگر دو طرف ' + M(tex) + ' را بر ' + M('x') + ' تقسیم می‌کردیم، کدام جواب را از دست می‌دادیم؟', opts: mc({ t: M('x=0') }, [{ t: M('x=' + root2), m: 'این جواب باقی می‌ماند: ' + M(fac1 + '=0') + '.' }, { t: 'هیچ‌کدام', m: 'تقسیم بر x جوابِ ' + M('x=0') + ' را از بین می‌برد.' }, { t: 'هر دو جواب', m: 'فقط یکی از دو جواب گم می‌شود.' }], true), line: '\\div x\\ \\Rightarrow\\ x\\neq 0', why: 'تقسیم بر x ریشهٔ صفر را حذف می‌کند؛ برای همین باید عامل بگیری.' });
  return { tex: tex, steps: steps, end: 'جواب‌ها: ' + M('x=0' + OR + 'x=' + root2) };
}
function genRoot() {
  var kind = choose(['a', 'b', 'c']);
  if (kind === 'c') { return genFact(); }
  var p = pairRoots(kind === 'a'), steps = [], rt = rootsTex(p);
  steps.push({ ask: 'اگر حاصل‌ضرب دو عامل صفر باشد، دست‌کم یکی از آن‌ها صفر است. خط بعدی کدام است؟', opts: mc({ t: p.f1 + '=0' + OR + p.f2 + '=0' }, [{ t: p.f1 + '=0' + AND + p.f2 + '=0', m: 'لازم نیست هر دو عامل با هم صفر شوند؛ «یا» درست است نه «و».' }, { t: p.f1 + '+' + p.f2 + '=0', m: 'حاصل‌ضرب را با جمع قاطی کرده‌ای.' }, { t: p.f1 + '=' + p.f2, m: 'دو عامل لزومی ندارد با هم برابر باشند؛ هر کدام جداگانه صفر می‌شود.' }]), line: p.f1 + '=0' + OR + p.f2 + '=0', why: 'قانون ضرب صفر.' });
  if (kind === 'a') {
    steps.push({ ask: 'هر معادله را حل کن. جواب‌ها کدام‌اند؟', opts: mc({ t: rt }, [{ t: 'x=' + -p.r1 + OR + 'x=' + -p.r2, m: 'علامت‌ها را عوض کرده‌ای: از ' + p.f1 + '=0 باید ' + M('x=' + p.r1) + ' بیاید.' }, { t: 'x=' + (p.r1 + p.r2), m: 'جمع دو ریشه، جواب نیست؛ دو جوابِ جداگانه داریم.' }, { t: 'x=' + p.r1 * p.r2, m: 'حاصل‌ضرب دو ریشه، جواب نیست؛ هر عامل جداگانه صفر می‌شود.' }, { t: 'x=' + -p.r1 + OR + 'x=' + p.r2, m: 'علامتِ یکی از جواب‌ها را اشتباه کرده‌ای.' }]), line: rt, why: 'هر عامل یک جواب داد.' });
  } else {
    var a = p.a1, bb = p.b1;
    steps.push({ ask: 'عامل اول را حل کن: ' + M(p.f1 + '=0') + '. خط بعدی کدام است؟', opts: mc({ t: 'x=' + p.r1 }, [{ t: 'x=' + -bb, m: 'بعد از جابه‌جایی باید بر ضریب ' + a + ' هم تقسیم کنی.' }, { t: 'x=' + -p.r1, m: 'علامت را اشتباه کرده‌ای.' }, { t: 'x=' + bb, m: 'علامت و تقسیم هر دو اشتباه‌اند.' }]), line: 'x=' + p.r1, why: M(ax(a) + '=' + -bb) + ' و ' + M('x=' + p.r1) + '.' });
    steps.push({ ask: 'عامل دوم را حل کن: ' + M(p.f2 + '=0') + '. جواب‌های معادله کدام‌اند؟', opts: mc({ t: rt }, [{ t: 'x=' + p.r1 + OR + 'x=' + -p.r2, m: 'علامتِ جواب دوم را عوض کرده‌ای: از ' + p.f2 + '=0 باید ' + M('x=' + p.r2) + ' بیاید.' }, { t: 'x=' + -bb + OR + 'x=' + p.r2, m: 'جواب اولین عامل ' + M('x=' + p.r1) + ' است.' }, { t: 'x=' + p.r1 }]), line: rt, why: 'هر عامل یک جواب داد.' });
  }
  return { tex: eqTex(p), steps: steps, end: 'جواب‌ها: ' + M(rt) };
}
/* ================= آزمون پایانی ================= */
function mkH1() { var p = pairRoots(true); return { type: 'mc', ask: 'جواب‌های معادلهٔ ' + M(eqTex(p)) + ' کدام‌اند؟', opts: mc({ t: rootsTex(p) }, [{ t: 'x=' + -p.r1 + OR + 'x=' + -p.r2, m: 'علامت‌ها را عوض کرده‌ای.' }, { t: 'x=' + p.r1 * p.r2, m: 'حاصل‌ضرب دو ریشه جواب نیست.' }, { t: 'x=' + (p.r1 + p.r2), m: 'جمع دو ریشه جواب نیست.' }, { t: 'x=' + -p.r1 + OR + 'x=' + p.r2, m: 'علامتِ یکی از جواب‌ها اشتباه است.' }]), why: 'هر عامل را جداگانه صفر بگذار: ' + M(p.f1 + '=0') + ' و ' + M(p.f2 + '=0') + '؛ پس ' + M(rootsTex(p)) + '.' }; }
function mkH2() { var p = pairRoots(false); while (p.a1 === 1) { p = pairRoots(false); } return { type: 'mc', ask: 'جواب‌های معادلهٔ ' + M(eqTex(p)) + ' کدام‌اند؟', opts: mc({ t: rootsTex(p) }, [{ t: 'x=' + p.b1 * -1 + OR + 'x=' + p.r2, m: 'بر ضریب ' + p.a1 + ' تقسیم نکرده‌ای.' }, { t: 'x=' + p.r1 + OR + 'x=' + -p.r2, m: 'علامتِ جواب دوم اشتباه است.' }, { t: 'x=' + -p.r1 + OR + 'x=' + -p.r2, m: 'علامت‌ها عوض شده‌اند.' }, { t: 'x=' + p.b1 + OR + 'x=' + -p.r2, m: 'علامت و تقسیم هر دو اشتباه‌اند.' }]), why: M(p.f1 + '=0') + ' می‌دهد ' + M('x=' + p.r1) + ' و ' + M(p.f2 + '=0') + ' می‌دهد ' + M('x=' + p.r2) + '.' }; }
function mkH3() { var m = R(2, 7), neg = R(0, 1), r2 = neg ? -m : m, tex = neg ? 'x^2+' + m + 'x=0' : 'x^2-' + m + 'x=0'; return { type: 'mc', ask: 'جواب‌های معادلهٔ ' + M(tex) + ' کدام‌اند؟', opts: mc({ t: 'x=0' + OR + 'x=' + r2 }, [{ t: 'فقط x=' + r2, m: 'این‌جا دو طرف را بر x تقسیم کرده‌ای و جوابِ ' + M('x=0') + ' را گم کرده‌ای.' }, { t: 'x=' + r2 + OR + 'x=' + -r2, m: 'جواب دوم ' + M('x=' + -r2) + ' نیست؛ عامل اول ' + M('x') + ' است.' }, { t: 'x=0' + OR + 'x=' + -r2, m: 'علامتِ جواب دوم اشتباه است.' }]), why: 'عامل مشترک بگیر: ' + M('x(x' + (neg ? '+' : '-') + m + ')=0') + '؛ پس ' + M('x=0') + ' یا ' + M('x=' + r2) + '. تقسیم بر x جواب ' + M('x=0') + ' را گم می‌کند.' }; }
function mkH4() { var p = pairRoots(true), big = Math.max(p.r1, p.r2); return { type: 'num', ask: 'معادلهٔ ' + M(eqTex(p)) + ' را حل کن. جوابِ <b>بزرگ‌تر</b> را بنویس.', lbl: 'x=', ans: big, show: M(String(big)), why: 'جواب‌ها ' + M(rootsTex(p)) + ' هستند؛ بزرگ‌تر ' + M(String(big)) + ' است.' }; }
function mkH5() {
  var C = ['اگر حاصل‌ضرب دو عدد صفر باشد، دست‌کم یکی از آن‌ها صفر است', 'از ' + M('x-2=0') + ' نتیجه می‌شود ' + M('x=2'), 'برای ' + M('x(x-5)=0') + ' هر عامل را جداگانه صفر می‌گذاریم'], W = ['اگر حاصل‌ضرب دو عبارت ' + M('6') + ' باشد، حتماً یکی از آن‌ها ' + M('2') + ' یا ' + M('3') + ' است', 'برای حل ' + M('x(x-5)=0') + ' بهتر است دو طرف را بر ' + M('x') + ' تقسیم کنیم', 'از ' + M('x-2=0') + ' نتیجه می‌شود ' + M('x=-2')], ci = shuffle(C).slice(0, 2), wi = shuffle(W).slice(0, 2);
  return { type: 'multi', ask: 'کدام گزاره‌ها دربارهٔ معادلهٔ حاصل‌ضربی درست‌اند؟ همهٔ گزینه‌های درست را انتخاب کن.', opts: shuffle(ci.map(function (t) { return { h: t, ok: true }; }).concat(wi.map(function (t) { return { h: t, ok: false }; }))), why: 'قانون ضرب صفر فقط برای حاصل‌ضربِ صفر است، نه برای هر عدد دیگر؛ علامت هنگام جابه‌جایی عوض می‌شود؛ و تقسیم بر ' + M('x') + ' ریشهٔ صفر را گم می‌کند.' };
}
function mkH6() {
  var ps = []; while (ps.length < 3) { var q = pairRoots(false), key = sorted2(q).join(); if (!ps.some(function (z) { return sorted2(z).join() === key; })) { ps.push(q); } }
  var right = shuffle(ps.slice()), key2 = ps.map(function (q) { return right.indexOf(q); });
  return { type: 'match', ask: 'هر معادله را به جوابش وصل کن.', left: ps.map(function (q) { return M(eqTex(q)); }), right: right.map(function (q) { return M(rootsTex(q)); }), key: key2, why: 'هر عامل را برابر صفر بگذار؛ از ' + M('ax+b=0') + ' ، ' + M('x=-\\dfrac{b}{a}') + ' می‌شود.', show: ps.map(function (q) { return M(eqTex(q)) + ' ← ' + M(rootsTex(q)); }).join('، ') };
}
return {
  html: function () {
    var h = '<div class="e01-lesson e02-lesson e3x">';
    h += intro('حاصل‌ضربی که صفر شده', 'یک حقیقتِ ساده: اگر دو عدد را ضرب کنی و حاصل صفر شود، <b>دست‌کم یکی از آن‌ها صفر بوده است</b>. این حقیقت معادله‌های پیچیده را به چند معادلهٔ خطی ساده تبدیل می‌کند. فقط یک شرط دارد: طرفِ دیگرِ معادله باید دقیقاً <b>صفر</b> باشد.', ['قانون ضرب صفر', 'ریشه‌یاب', 'عامل مشترک', 'حل کامل']);
    h += K.sn('۱', 'قانون ضرب صفر');
    h += '<p>معادلهٔ ' + M('(x-2)(x+5)=0') + ' را در نظر بگیر. برای اینکه حاصل‌ضرب صفر شود، یا ' + M('x-2') + ' باید صفر باشد یا ' + M('x+5') + '. اولی ' + M('x=2') + ' و دومی ' + M('x=-5') + ' را می‌دهد. نوار را حرکت بده و ببین چه موقع حاصل‌ضرب صفر می‌شود:</p>';
    h += activity('کارگاه ضرب صفر', 'e06-zero', 'عدد آزمایشی را با نوار حرکت بده. وقتی یکی از دو عامل صفر شود، حاصل‌ضرب هم صفر می‌شود و آن عدد روی محور سبز می‌شود. با «نمایش ریشه‌ها» جواب‌ها را آشکار کن.');
    h += K.box('note', 'قانون ضرب صفر', '<p>اگر ' + M('A\\times B=0') + ' باشد، آنگاه ' + M('A=0') + ' یا ' + M('B=0') + '. فقط وقتی کار می‌کند که طرف دیگر <b>صفر</b> باشد؛ برای ' + M('A\\times B=6') + ' نمی‌شود نتیجه گرفت ' + M('A=2') + ' یا ' + M('B=3') + '.</p>');
    h += K.sn('۲', 'یافتن ریشه‌ها');
    h += '<p>هر عامل را جداگانه برابر صفر بگذار و علامتِ عدد را موقع جابه‌جایی عوض کن. اگر ضریب ' + M('x') + ' ' + M('1') + ' نبود، بر آن تقسیم کن: ' + M('2x-6=0') + ' یعنی ' + M('2x=6') + ' و ' + M('x=3') + '.</p>';
    h += exampleBlock('e06-example-steps', 'حل کامل معادلهٔ حاصل‌ضربی', 3);
    h += activity('کارگاه ریشه‌یاب', 'e06-roots', 'دو جواب را بنویس (به هر ترتیب). اگر علامت‌ها را عوض کنی، پیام خاص می‌بینی. برای معادلهٔ تازه، دکمهٔ چرخان را بزن.');
    h += K.box('err', '⚠ خطای رایج: علامتِ جواب', '<p>از ' + M('x-2=0') + ' نتیجه می‌شود ' + M('x=2') + '، نه ' + M('x=-2') + '. و از ' + M('x+5=0') + ' نتیجه می‌شود ' + M('x=-5') + '. موقع بردنِ عدد به طرف دیگر علامتش عوض می‌شود.</p>');
    h += K.sn('۳', 'وقتی عامل مشترک داریم');
    h += '<p>گاهی معادله خودش به شکل حاصل‌ضرب نیست، مثل ' + M('x^2-5x=0') + '. اول <b>عامل مشترک</b> می‌گیریم: ' + M('x(x-5)=0') + '؛ بعد قانون ضرب صفر: ' + M('x=0') + ' یا ' + M('x=5') + '. وسوسه‌ی تقسیم دو طرف بر ' + M('x') + ' را کنار بگذار: این کار جوابِ ' + M('x=0') + ' را از بین می‌برد!</p>';
    h += activity('کارگاه عامل مشترک', 'e06-factor', 'در هر گام خط درست را انتخاب کن. گام آخر نشان می‌دهد تقسیم بر x چه جوابی را گم می‌کند.');
    h += K.box('err', '⚠ خطای رایج: تقسیم بر x', '<p>اگر در ' + M('x^2-5x=0') + ' دو طرف را بر ' + M('x') + ' تقسیم کنی، فقط ' + M('x=5') + ' به دست می‌آید و ' + M('x=0') + ' گم می‌شود. به‌جای تقسیم، عامل مشترک بگیر.</p>');
    h += K.sn('۴', 'حل کامل');
    h += '<p>حالا همهٔ مهارت‌ها را با هم به کار ببر: ضرب صفر، حل عامل‌ها، ضریب‌ها و عامل مشترک.</p>';
    h += activity('کارگاه مسیر حل', 'e06-full', 'مسئله‌ها از سه نوع‌اند: عامل‌های ساده، عامل با ضریب، و عامل مشترک. در هر گام خط درست را انتخاب کن.');
    h += K.sn('۵', 'آزمون پایانی');
    h += '<p>در آزمون پایانی، قانون ضرب صفر، یافتن ریشه‌ها (از جمله با ضریب) و عامل مشترک سنجیده می‌شود. شش سؤال در قالب‌های گوناگون، با عددهای تازه در هر دور.</p>';
    h += '<div id="e06-final" class="e01-interaction e01-final" aria-label="آزمون پایانی" data-activity></div>';
    h += K.box('sum', 'بعد از این درس باید بتوانی', '<ul><li>قانون ضرب صفر را بگویی و بدانی فقط برای حاصل‌ضربِ صفر کار می‌کند.</li><li>هر عامل را صفر بگذاری و ریشه‌ها را با علامت درست (و با تقسیم بر ضریب) پیدا کنی.</li><li>در معادله‌هایی مثل ' + M('x^2-5x=0') + ' عامل مشترک بگیری و جواب ' + M('x=0') + ' را گم نکنی.</li></ul>');
    return h + '</div>';
  },
  init: function () {
    var $ = function (id) { return document.getElementById(id); };
    zeroLab($('e06-zero')); rootsLab($('e06-roots')); K.guide($('e06-factor'), genFact); K.guide($('e06-full'), genRoot);
    exampleBind('e06-example-steps', [
      { title: 'قانون ضرب صفر', lines: ['(2x-6)(x+1)=0', '2x-6=0\\ \\text{یا}\\ x+1=0'], note: 'حاصل‌ضرب صفر است؛ پس دست‌کم یکی از دو عامل صفر است.' },
      { title: 'حل هر عامل', lines: ['2x-6=0\\ \\Rightarrow\\ 2x=6\\ \\Rightarrow\\ x=3', 'x+1=0\\ \\Rightarrow\\ x=-1'], note: 'در عامل اول، پس از بردنِ ۶ باید بر ۲ تقسیم کنیم.' },
      { title: 'آزمایش جواب‌ها', lines: ['x=3:\\ (2\\times3-6)(3+1)=0\\times4=0\\ \\checkmark', 'x=-1:\\ (2\\times(-1)-6)(-1+1)=(-8)\\times0=0\\ \\checkmark'], note: 'با هر دو جواب، یکی از عامل‌ها صفر می‌شود.' }
    ]);
    K.final($('e06-final'), [mkH1, mkH2, mkH3, mkH4, mkH5, mkH6]);
  }
};

  }
};
