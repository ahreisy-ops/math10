/* درس مهارت E05 — معادله‌های دارای کسر و عبارت جبری (فصل ۳) */
window.LESSONS = window.LESSONS || {};
window.LESSONS.E05 = {
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


/* ================= ابزارهای معادلهٔ کسری و پرانتزی ================= */
var gcd = function (a, b) { a = abs(a); b = abs(b); while (b) { var t = a % b; a = b; b = t; } return a; };
var lcm = function (a, b) { return a * b / gcd(a, b); };
var dfr = function (n, d) { return '\\dfrac{' + n + '}{' + d + '}'; };
function rat(n, d) { var g = gcd(n, d) || 1, s = (n < 0) !== (d < 0) ? -1 : 1; n = abs(n) / g; d = abs(d) / g; return d === 1 ? String(s * n) : (s < 0 ? '-' : '') + dfr(n, d); }
function eqs(l, r) { return l + '=' + r; }
function xs(a) { return ax(a); }   // ضریب x
function pairOpts(correct, wrongs) { return mc({ t: correct }, wrongs); }
/* گام‌ها برای کسر و پرانتز: خروجی همان قالب K.guide */
function genFrac() {
  var kind = choose(['two', 'one', 'cross', 'two']), steps = [], tex, x0;
  if (kind === 'one') {
    var a = choose([2, 3, 4, 5]), b = nz(-6, 8), c;
    x0 = a * nz(-5, 8); c = x0 / a + b; tex = dfr('x', a) + (b > 0 ? '+' : '-') + abs(b) + '=' + c;
    steps.push({ ask: 'ابتدا عدد ' + M(String(b)) + ' را از دو طرف حذف می‌کنیم. خط بعدی کدام است؟', opts: pairOpts(eqs(dfr('x', a), c - b), [{ t: eqs(dfr('x', a), c + b), m: 'برای حذف ' + (b > 0 ? '+' : '-') + abs(b) + ' باید ' + (b > 0 ? 'کم' : 'اضافه') + ' کنی.' }, { t: eqs('x', c - b), m: 'x/' + a + ' با x فرق دارد؛ هنوز بر ' + a + ' تقسیم شده است.' }, { t: eqs(dfr('x', a), b - c), m: 'علامت طرف راست اشتباه شد.' }]), line: eqs(dfr('x', a), c - b), why: 'جملهٔ ثابت حذف شد.' });
    steps.push({ ask: 'برای حذف مخرج ' + M(String(a)) + '، دو طرف را در ' + M(String(a)) + ' ضرب می‌کنیم. جواب کدام است؟', opts: pairOpts(eqs('x', a * (c - b)), [{ t: eqs('x', rat(c - b, a)), m: 'باید ضرب کنی، نه تقسیم.' }, { t: eqs('x', c - b), m: 'طرف راست را هم در ' + a + ' ضرب کن.' }, { t: eqs('x', a * c - b), m: 'عدد ' + b + ' قبلاً حذف شده؛ کل طرف راست را در ' + a + ' ضرب کن.' }]), line: eqs('x', a * (c - b)), why: 'ضرب در مخرج، کسر را حذف می‌کند.' });
  } else if (kind === 'cross') {
    var a2 = choose([2, 3, 4, 5]), p = nz(-6, 6), q2 = nz(-4, 5); x0 = a2 * q2 - p; tex = dfr('x' + sgn(p), a2) + '=' + q2;
    steps.push({ ask: 'دو طرف را در ' + M(String(a2)) + ' ضرب می‌کنیم تا مخرج حذف شود. خط بعدی کدام است؟', opts: pairOpts(eqs('x' + sgn(p), a2 * q2), [{ t: eqs('x' + sgn(p), q2), m: 'طرف راست را هم باید در ' + a2 + ' ضرب کنی.' }, { t: eqs('x' + sgn(p), rat(q2, a2)), m: 'باید ضرب کنی، نه تقسیم.' }, { t: eqs('x', a2 * q2), m: 'عدد ' + p + ' داخل صورت را هنوز حذف نکرده‌ایم.' }]), line: eqs('x' + sgn(p), a2 * q2), why: 'مخرج حذف شد.' });
    steps.push({ ask: 'حالا ' + M(String(p)) + ' را به طرف دیگر می‌بریم. جواب کدام است؟', opts: pairOpts(eqs('x', x0), [{ t: eqs('x', a2 * q2 + p), m: 'هنگام حذف ' + sgn(p) + ' باید عملِ وارون انجام شود.' }, { t: eqs('x', q2 - p), m: 'اول باید طرف راست را در ' + a2 + ' ضرب می‌کردی.' }, { t: eqs('x', -x0), m: 'علامت جواب اشتباه شد.' }]), line: eqs('x', x0), why: 'جواب به دست آمد.' });
  } else {
    var d1 = choose([2, 3, 4, 5, 6]), d2 = choose([2, 3, 4, 5, 6]); while (d2 === d1) { d2 = choose([2, 3, 4, 5, 6]); }
    var L = lcm(d1, d2), k = R(1, 3), c3, pp = L / d1, qq = L / d2;
    x0 = L * k; c3 = x0 / d1 + x0 / d2; tex = dfr('x', d1) + '+' + dfr('x', d2) + '=' + c3;
    steps.push({ ask: 'برای حذف مخرج‌ها، دو طرف را در چه عددی ضرب کنیم؟ (کوچک‌ترین عدد ممکن)', opts: pairOpts('\\times ' + L, [{ t: '\\times ' + d1 * d2, m: d1 * d2 === L ? '' : 'با ضرب در ' + d1 * d2 + ' هم مخرج‌ها حذف می‌شوند، ولی عدد بزرگ‌تر از لازم است. کوچک‌ترین مضرب مشترک (ک.م.م) ' + L + ' است.' }, { t: '\\times ' + d1, m: 'مخرج ' + d2 + ' با این ضرب حذف نمی‌شود.' }, { t: '\\times ' + d2, m: 'مخرج ' + d1 + ' با این ضرب حذف نمی‌شود.' }, { t: '\\times ' + (d1 + d2), m: 'مجموع مخرج‌ها ربطی به مخرج مشترک ندارد.' }]), line: '\\times ' + L, why: 'ک.م.م مخرج‌ها ' + L + ' است.' });
    steps.push({ ask: 'همهٔ جمله‌ها (حتی عدد طرف راست) را در ' + M(String(L)) + ' ضرب می‌کنیم. خط بعدی کدام است؟', opts: pairOpts(eqs(xs(pp) + '+' + xs(qq), L * c3), [{ t: eqs(xs(pp) + '+' + xs(qq), c3), m: 'عدد طرف راست را هم باید در ' + L + ' ضرب کنی.' }, { t: eqs(xs(pp) + '+' + xs(qq), L + c3), m: 'ضرب را با جمع قاطی کرده‌ای.' }, { t: eqs(xs(pp) + '+' + dfr('x', d2), L * c3), m: 'جملهٔ دوم را هم باید در ' + L + ' ضرب کنی.' }]), line: eqs(xs(pp) + '+' + xs(qq), L * c3), why: 'همهٔ جمله‌ها در ' + L + ' ضرب شدند.' });
    steps.push({ ask: 'جمله‌های ' + M('x') + ' را جمع کن و ' + M('x') + ' را پیدا کن.', opts: pairOpts(eqs('x', x0), [{ t: eqs('x', L * c3), m: 'باید بر ضریب ' + (pp + qq) + ' تقسیم کنی.' }, { t: eqs('x', c3), m: 'طرف راست پس از ضرب ' + L * c3 + ' است، نه ' + c3 + '.' }, { t: eqs('x', x0 + L), m: 'محاسبه را دوباره بررسی کن: ' + L * c3 + '÷' + (pp + qq) + '.' }]), line: eqs('x', x0), why: M(xs(pp) + '+' + xs(qq) + '=' + (pp + qq) + 'x') + ' و ' + M(eqs(L * c3, (pp + qq) + '\\times ' + x0)) + '.' });
  }
  return { tex: tex, steps: steps, end: 'جواب: ' + M('x=' + x0) };
}
function genParen() {
  var kind = choose(['p1', 'p1', 'neg']), steps = [], tex, x0;
  if (kind === 'p1') {
    var a = choose([2, 3, 4]), b = nz(-6, 6), c = choose([1, 2, 3, 5].filter(function (z) { return z !== a; })), d; x0 = nz(-6, 8); d = a * (x0 + b) - c * x0;
    var m = a - c, ab = a * b;
    tex = a + '(x' + sgn(b) + ')=' + lin(c, d);
    steps.push({ ask: 'پرانتز را باز می‌کنیم: ' + M(String(a)) + ' را در هر دو جملهٔ داخل پرانتز ضرب کن. خط بعدی کدام است؟', opts: pairOpts(eqs(xs(a) + sgn(ab), lin(c, d)), [{ t: eqs(xs(a) + sgn(b), lin(c, d)), m: 'عدد ' + a + ' را فقط در x ضرب کرده‌ای؛ جملهٔ دوم هم باید ضرب شود.' }, { t: eqs(xs(a) + sgn(-ab), lin(c, d)), m: 'علامت جملهٔ دوم پس از ضرب را اشتباه کرده‌ای.' }, { t: eqs('x' + sgn(ab), lin(c, d)), m: 'ضریب x هم باید در ' + a + ' ضرب شود.' }]), line: eqs(xs(a) + sgn(ab), lin(c, d)), why: 'عدد بیرون پرانتز در همهٔ جمله‌های داخل پرانتز ضرب شد.' });
    steps.push({ ask: 'جمله‌های ' + M('x') + ' را به یک طرف و عددها را به طرف دیگر ببر. خط بعدی کدام است؟', opts: pairOpts(eqs(xs(m), d - ab), [{ t: eqs(xs(m), d + ab), m: 'جملهٔ ' + sgn(ab) + ' با جابه‌جایی علامتش عوض می‌شود.' }, { t: eqs(xs(a + c), d - ab), m: 'x ها را باید کم کنی، نه جمع.' }, { t: eqs(xs(m), ab - d), m: 'علامت طرف راست اشتباه شد.' }]), line: eqs(xs(m), d - ab), why: 'جمله‌ها با تغییر علامت جابه‌جا شدند.' });
    steps.push({ ask: 'دو طرف را بر ضریب ' + M('x') + ' تقسیم کن. جواب کدام است؟', opts: pairOpts(eqs('x', x0), [{ t: eqs('x', d - ab), m: 'باید بر ضریب ' + m + ' تقسیم کنی.' }, { t: eqs('x', -x0), m: 'علامت جواب اشتباه شد.' }, { t: eqs('x', rat(d - ab, a + c)), m: 'ضریب x برابر ' + m + ' است، نه ' + (a + c) + '.' }]), line: eqs('x', x0), why: 'جواب به دست آمد.' });
  } else {
    var a3 = nz(1, 9), p = nz(-6, 6); x0 = nz(-6, 8); var c3 = a3 - (x0 - p);
    tex = a3 + '-(x' + sgn(-p) + ')=' + c3;
    steps.push({ ask: 'پرانتز با علامتِ منفیِ پشتش باز می‌شود: علامتِ هر دو جملهٔ داخل را عوض کن. خط بعدی کدام است؟', opts: pairOpts(eqs(a3 + '-x' + sgn(p), c3), [{ t: eqs(a3 + '-x' + sgn(-p), c3), m: 'علامتِ منفی باید علامت جملهٔ دوم را هم عوض کند.' }, { t: eqs(a3 + '+x' + sgn(-p), c3), m: 'علامت جملهٔ اول داخل پرانتز را هم عوض کن (x به −x تبدیل می‌شود).' }, { t: eqs(a3 + '-x' + sgn(p) + '+' + '0', c3 + 1), m: 'خط را دوباره از اول بنویس.' }]), line: eqs(a3 + '-x' + sgn(p), c3), why: 'منفیِ بیرون پرانتز، علامتِ تک‌تکِ جمله‌ها را عوض کرد.' });
    steps.push({ ask: 'اعداد را به طرف راست ببر. خط بعدی کدام است؟', opts: pairOpts(eqs('-x', c3 - a3 - p), [{ t: eqs('-x', c3 - a3 + p), m: 'علامت ' + sgn(p) + ' با جابه‌جایی عوض می‌شود.' }, { t: eqs('x', c3 - a3 - p), m: 'علامتِ منفیِ x را از دست داده‌ای.' }, { t: eqs('-x', c3 + a3 - p), m: 'علامت ' + a3 + ' با جابه‌جایی عوض می‌شود.' }]), line: eqs('-x', c3 - a3 - p), why: 'اعداد به طرف راست رفتند.' });
    steps.push({ ask: 'دو طرف را در ' + M('-1') + ' ضرب کن (یا بر ' + M('-1') + ' تقسیم). جواب کدام است؟', opts: pairOpts(eqs('x', x0), [{ t: eqs('x', c3 - a3 - p), m: 'باید علامتِ عدد طرف راست هم عوض شود.' }, { t: eqs('x', -x0), m: 'علامت جواب اشتباه شد.' }, { t: eqs('x', a3 + p + c3), m: 'محاسبه را دوباره بررسی کن.' }]), line: eqs('x', x0), why: 'علامتِ دو طرف عوض شد.' });
  }
  return { tex: tex, steps: steps, end: 'جواب: ' + M('x=' + x0) };
}
function genMix() { return R(0, 1) ? genFrac() : genParen(); }
/* ---------- کارگاه: مخرج صفر ---------- */
function zeroLab(root) {
  var st = root.querySelector('[data-stage]'), k = 3, x = 0, algebra = false;
  function nw() { k = R(2, 5); x = 0; algebra = false; }
  function draw() {
    st.innerHTML = rr('<div class="e02-problem-head"><span class="e02-problem-chip">' + M(dfr('x', 'x-' + k) + '=' + dfr(k, 'x-' + k)) + '</span><button type="button" class="btn primary e01-station-refresh" data-fresh title="عدد دیگر" aria-label="عدد دیگر">' + REFRESH + '</button></div><div class="e3-slider"><div class="lab"><span>عدد آزمایشی ' + M('x') + '</span></div><input type="range" id="z-x" min="-3" max="9" step="1" value="' + x + '" aria-label="عدد آزمایشی"></div><div id="z-live"></div><div class="e3-row"><button type="button" class="e3-op' + (algebra ? ' is-on' : '') + '" data-alg>' + (algebra ? 'پنهان‌کردن حل جبری' : 'حل جبری را نشان بده') + '</button></div><div id="z-alg"></div>');
    upd();
  }
  function upd() {
    var x2 = +st.querySelector('#z-x').value, d = x2 - k, h;
    if (d === 0) { h = '<div class="e3-eq" style="font-size:1.1rem">' + M(dfr('x', 'x-' + k) + '\\ \\to\\ ' + dfr(k, 0)) + '</div><div class="e3-row"><span class="e3-pill bad">مخرج برابر صفر است؛ این عدد قابل‌قبول نیست و چپ و راست «تعریف‌نشده» می‌شوند.</span></div>'; }
    else { var L = x2 / d, Rr = k / d; h = '<div class="e3-eq" style="font-size:1.05rem">' + M(dfr(x2, '(' + x2 + ')-' + k) + '=' + dfr(x2, d)) + '<span class="e3-note" style="margin:0">سمت چپ ' + ltr(fan(L)) + '</span></div><div class="e3-eq" style="font-size:1.05rem">' + M(dfr(k, '(' + x2 + ')-' + k) + '=' + dfr(k, d)) + '<span class="e3-note" style="margin:0">سمت راست ' + ltr(fan(Rr)) + '</span></div><div class="e3-row"><span class="e3-pill bad">سمت چپ و راست برابر نیستند؛ پس این عدد جواب نیست.</span></div>'; }
    st.querySelector('#z-live').innerHTML = rr(h);
    st.querySelector('#z-alg').innerHTML = algebra ? rr('<div class="e3-log"><b>حل جبری</b><ol><li><span class="n">۱</span><span class="tx">' + M('x=' + k) + '</span></li></ol></div><p class="e3-note">با ضرب دو طرف در ' + M('x-' + k) + ' به ' + M('x=' + k) + ' می‌رسیم؛ ولی ' + M('x=' + k) + ' مخرج را صفر می‌کند و قابل‌قبول نیست. پس معادله <b>جواب ندارد</b>. همیشه بعد از حل، جواب را در مخرج‌ها بگذار.</p>') : '';
  }
  function fan(v) { return (Math.round(v * 100) / 100).toString().replace('.', '٫').replace(/[0-9]/g, function (d) { return F(d); }).replace(/^-/, '−'); }
  root.addEventListener('input', function (e) { if (e.target.id === 'z-x') { upd(); } });
  root.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b || b.disabled) { return; } if (b.hasAttribute('data-fresh')) { nw(); draw(); } else if (b.hasAttribute('data-alg')) { algebra = !algebra; var keep = +st.querySelector('#z-x').value; draw(); st.querySelector('#z-x').value = keep; upd(); } });
  nw(); draw();
}
/* ---------- کارگاه: پرانتزبازکن ---------- */
function distLab(root) {
  var st = root.querySelector('[data-stage]'), p, done;
  function nw() { var a = choose([2, 3, 4, -1, -2, -3]), b = nz(-6, 6), c = nz(-5, 7); while (c === 0) { c = nz(-5, 7); } p = { a: a, b: b, c: c, done: [false, false] }; done = false; }
  function paint() {
    var a = p.a, b = p.b, c = p.c, A = a * 1, B = a * b, ex = (a === -1 ? '-' : a) + '(x' + sgn(b) + ')', res = [xs(a), (B < 0 ? '' : '+') + B];
    var inner = '<span class="e3-pill ' + (p.done[0] ? 'ok' : '') + '">' + M(xs(a)) + '</span><span class="e3-pill ' + (p.done[1] ? 'ok' : '') + '">' + M((B < 0 ? '' : '+') + B) + '</span>';
    st.innerHTML = rr('<div class="e02-problem-head"><span class="e02-problem-chip">' + M(ex) + '</span><button type="button" class="btn primary e01-station-refresh" data-fresh title="عبارت جدید" aria-label="عبارت جدید">' + REFRESH + '</button></div><p class="e3-note">عددِ ' + M(String(a)) + ' بیرونِ پرانتز است. آن را در هر جملهٔ داخل پرانتز ضرب کن (روی هر دکمه بزن):</p><div class="e3-row"><button type="button" class="e3-op' + (p.done[0] ? ' is-on' : '') + '" data-t="0">' + M(fm(a) + '\\times x') + '</button><button type="button" class="e3-op' + (p.done[1] ? ' is-on' : '') + '" data-t="1">' + M(fm(a) + '\\times(' + b + ')') + '</button></div><div class="e3-eq" style="font-size:1.2rem">' + M(ex + '=' + (p.done[0] ? xs(a) : '?') + (p.done[1] ? (B < 0 ? '' : '+') + B : '+\\,?')) + '</div>' + (p.done[0] && p.done[1] ? mark(true, '✓ هر دو جمله را ضرب کردی: ' + M(ex + '=' + xs(a) + (B < 0 ? '' : '+') + B) + '. توجه: ' + (a < 0 ? 'ضرب در عددِ منفی علامتِ جمله‌ها را عوض می‌کند.' : 'علامتِ جملهٔ دوم به علامتِ ' + b + ' بستگی دارد.')) + '<div class="opts g-ops"><button type="button" class="btn" data-fresh>عبارت دیگر</button></div>' : (p.done[0] !== p.done[1] ? mark(false, 'فقط یک جمله را ضرب کرده‌ای؛ پرانتز دو جمله دارد و عدد بیرون باید در هر دو ضرب شود.') : '')));
  }
  root.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b || b.disabled) { return; } if (b.hasAttribute('data-fresh')) { nw(); paint(); } else if (b.hasAttribute('data-t')) { p.done[+b.dataset.t] = true; paint(); } });
  nw(); paint();
}
/* ================= آزمون پایانی ================= */
function mkG1() { var a = choose([2, 3, 4, 5]), b = nz(-6, 8), x0 = a * nz(-5, 8), c = x0 / a + b; return { type: 'num', ask: 'معادلهٔ ' + M(dfr('x', a) + (b > 0 ? '+' : '-') + abs(b) + '=' + c) + ' را حل کن و مقدارِ ' + M('x') + ' را بنویس.', lbl: 'x=', ans: x0, show: M(String(x0)), why: 'اول ' + M(String(b)) + ' را حذف کن: ' + M(eqs(dfr('x', a), c - b)) + '؛ بعد دو طرف را در ' + M(String(a)) + ' ضرب کن: ' + M('x=' + x0) + '.' }; }
function mkG2() {
  var d1 = choose([2, 3, 4, 5]), d2 = choose([2, 3, 4, 5, 6]); while (d2 === d1) { d2 = choose([2, 3, 4, 5, 6]); }
  var L = lcm(d1, d2), x0 = L * R(1, 3), c = x0 / d1 + x0 / d2, pp = L / d1, qq = L / d2;
  return { type: 'mc', ask: 'جواب معادلهٔ ' + M(dfr('x', d1) + '+' + dfr('x', d2) + '=' + c) + ' کدام است؟', opts: mc({ t: 'x=' + x0 }, [{ t: 'x=' + L * c, m: 'پس از ضرب در ' + L + ' باید بر ' + (pp + qq) + ' تقسیم کنی.' }, { t: 'x=' + rat(c, 2), m: 'باید مخرج‌ها را حذف کنی، نه اینکه عدد را نصف کنی.' }, { t: 'x=' + (x0 + L), m: 'محاسبه را بررسی کن.' }, { t: 'x=' + c, m: 'طرف راست را هم در ' + L + ' ضرب کن.' }]), why: 'مخرج مشترک ' + M(String(L)) + ' است: ' + M(eqs(xs(pp) + '+' + xs(qq), L * c)) + '، پس ' + M('x=' + x0) + '.' };
}
function mkG3() {
  var a = choose([2, 3, 4]), b = nz(-6, 6), c = choose([1, 2, 3, 5].filter(function (z) { return z !== a; })), x0 = nz(-6, 8), d = a * (x0 + b) - c * x0, ab = a * b, m = a - c;
  return { type: 'mc', ask: 'جواب معادلهٔ ' + M(a + '(x' + sgn(b) + ')=' + lin(c, d)) + ' کدام است؟', opts: mc({ t: 'x=' + x0 }, [{ t: 'x=' + rat(d + b, a - c), m: 'عدد ' + a + ' را فقط در x ضرب کرده‌ای؛ باید در ' + b + ' هم ضرب شود.' }, { t: 'x=' + -x0, m: 'علامت جواب اشتباه شد.' }, { t: 'x=' + rat(d + ab, m), m: 'علامت ' + sgn(ab) + ' را هنگام جابه‌جایی عوض نکرده‌ای.' }, { t: 'x=' + (d - ab), m: 'باید بر ضریب ' + m + ' تقسیم کنی.' }]), why: 'پرانتز را باز کن: ' + M(eqs(xs(a) + sgn(ab), lin(c, d))) + '؛ جمله‌ها را جابه‌جا کن: ' + M(eqs(xs(m), d - ab)) + '؛ پس ' + M('x=' + x0) + '.' };
}
function mkG4() {
  var k = R(2, 6), t = R(0, 1), left = t ? 'x' : k, text = dfr('x', 'x-' + k) + '=' + dfr(k, 'x-' + k);
  return { type: 'mc', ask: 'جواب معادلهٔ زیر کدام است؟<div class="e3-eq" style="margin-top:6px">' + M(text) + '</div>', opts: [{ h: M('x=' + k), ok: false }, { h: 'هر عددی به‌جز ' + M(String(k)), ok: false }, { h: M('x=0'), ok: false }, { h: 'معادله جواب ندارد', ok: true }], why: 'اگر دو طرف را در ' + M('x-' + k) + ' ضرب کنیم، به ' + M('x=' + k) + ' می‌رسیم؛ ولی ' + M('x=' + k) + ' مخرج را صفر می‌کند و قابل‌قبول نیست؛ پس معادله جواب ندارد.' };
}
function mkG5() {
  var C = ['همهٔ جمله‌ها، حتی عدد تنها، در ک.م.م مخرج‌ها ضرب می‌شوند', 'پس از حل، جواب را در مخرج‌ها می‌گذاریم تا مخرج صفر نشود', 'عدد بیرون پرانتز در همهٔ جمله‌های داخل پرانتز ضرب می‌شود'], W = ['فقط جمله‌های کسری در ک.م.م ضرب می‌شوند', 'عدد بیرون پرانتز فقط در جملهٔ اول داخل پرانتز ضرب می‌شود', 'اگر جواب مخرج را صفر کند، باز هم قابل‌قبول است'], ci = shuffle(C).slice(0, 2), wi = shuffle(W).slice(0, 2);
  return { type: 'multi', ask: 'کدام گزاره‌ها دربارهٔ حل معادله‌های کسری و پرانتزی درست‌اند؟ همهٔ گزینه‌های درست را انتخاب کن.', opts: shuffle(ci.map(function (t) { return { h: t, ok: true }; }).concat(wi.map(function (t) { return { h: t, ok: false }; }))), why: 'در حذف مخرج‌ها همهٔ جمله‌ها ضرب می‌شوند؛ پرانتز را کامل باز می‌کنیم؛ و جواب را همیشه با مخرج‌ها می‌سنجیم.' };
}
function mkG6() {
  var a = choose([2, 3, 4]), b = nz(-6, 6), c = choose([1, 2, 3, 5].filter(function (z) { return z !== a; })), x0 = nz(-6, 8), d = a * (x0 + b) - c * x0, ab = a * b, m = a - c, kind = R(0, 2), L1 = a + '(x' + sgn(b) + ')=' + lin(c, d), L2, L3, bad, txt;
  if (kind === 0) { L2 = eqs(xs(a) + sgn(b), lin(c, d)); L3 = eqs(xs(m), d - b); bad = 1; txt = 'سطر ۲ نادرست است: عدد ' + a + ' باید در جملهٔ دوم پرانتز هم ضرب شود (' + M(sgn(ab)) + ' نه ' + M(sgn(b)) + ').'; }
  else if (kind === 1) { L2 = eqs(xs(a) + sgn(ab), lin(c, d)); L3 = eqs(xs(m), d + ab); bad = 2; txt = 'سطر ۳ نادرست است: ' + M(sgn(ab)) + ' با جابه‌جایی باید علامتش عوض شود و ' + M(String(d - ab)) + ' بشود.'; }
  else { L2 = eqs(xs(a) + sgn(ab), lin(c, d)); L3 = eqs(xs(m), d - ab); bad = -1; txt = 'همهٔ سطرها درست‌اند: پرانتز کامل باز شده و جمله‌ها با تغییر علامت جابه‌جا شده‌اند.'; }
  return { type: 'mc', ask: 'معادلهٔ ' + M(L1) + ' به این صورت حل شده است:<ol class="e3-final-lines"><li>' + M(L1) + '</li><li>' + M(L2) + '</li><li>' + M(L3) + '</li></ol>کدام گزینه درست است؟', opts: [{ h: 'سطر ۲ نادرست است', ok: bad === 1 }, { h: 'سطر ۳ نادرست است', ok: bad === 2 }, { h: 'همهٔ سطرها درست‌اند', ok: bad < 0 }, { h: 'سطر ۱ نادرست است', ok: false }], why: txt };
}
return {
  html: function () {
    var h = '<div class="e01-lesson e02-lesson e3x">';
    h += intro('کسرها و پرانتزها را از سر راه برداریم', 'معادله‌ای که کسر یا پرانتز دارد، با چند حرکتِ مشخص به معادلهٔ خطیِ ساده‌ای تبدیل می‌شود که قبلاً حلش را بلدی: کسرها را با <b>ضرب در ک.م.م</b> حذف می‌کنیم و پرانتز را با <b>توزیع</b> باز می‌کنیم. یک خطر هم هست: جوابی که مخرج را صفر کند، جواب نیست.', ['حذف کسر', 'باز‌کردن پرانتز', 'مخرج صفر', 'ماشین حل']);
    h += K.sn('۱', 'حذف مخرج با ضرب در ک.م.م');
    h += '<p>در معادلهٔ ' + M(dfr('x', 2) + '+' + dfr('x', 3) + '=5') + ' مخرج‌ها ' + M('2') + ' و ' + M('3') + ' هستند. کوچک‌ترین عددی که هر دو را می‌شمارد ' + M('6') + ' است. دو طرف را در ' + M('6') + ' ضرب می‌کنیم؛ نکتهٔ مهم این است که <b>همهٔ</b> جمله‌ها (حتی ' + M('5') + ') ضرب می‌شوند:</p>';
    h += K.dm('6\\left(' + dfr('x', 2) + '+' + dfr('x', 3) + '\\right)=6\\times5') + K.dm('3x+2x=30') + K.dm('x=6');
    h += exampleBlock('e05-example-steps', 'حل کامل معادلهٔ کسری', 3);
    h += activity('کارگاه حذف مخرج', 'e05-frac', 'در هر گام یکی از خط‌ها را انتخاب کن. برای مسئلهٔ تازه، دکمهٔ چرخان را بزن. هر بار یکی از انواع معادلهٔ کسری می‌آید.');
    h += K.box('err', '⚠ خطای رایج: ضرب‌نکردنِ عددِ تنها', '<p>اگر فقط جمله‌های کسری را در ک.م.م ضرب کنی و ' + M('5') + ' را دست‌نخورده بگذاری، به ' + M('x=1') + ' می‌رسی که نادرست است. در ضرب‌کردن، دو طرف کامل ضرب می‌شوند.</p>');
    h += K.sn('۲', 'باز‌کردن پرانتز');
    h += '<p>در ' + M('2(x-3)') + ' عدد ' + M('2') + ' باید در <b>هر دو</b> جملهٔ داخل پرانتز ضرب شود: ' + M('2\\times x') + ' و ' + M('2\\times(-3)') + '؛ یعنی ' + M('2x-6') + '. اگر پشت پرانتز علامتِ منفی باشد، علامتِ هر دو جمله عوض می‌شود: ' + M('-(x-3)=-x+3') + '.</p>';
    h += activity('کارگاه پرانتزبازکن', 'e05-dist', 'روی هر دو دکمه بزن تا ضرب‌ها انجام شود. اگر فقط یکی را بزنی، متوجه خطا می‌شوی. برای عبارت تازه، دکمهٔ چرخان را بزن.');
    h += K.box('err', '⚠ خطای رایج: ضرب فقط در جملهٔ اول', '<p>در ' + M('2(x-3)=x+4') + ' اگر بنویسی ' + M('2x-3=x+4') + '، عدد ' + M('2') + ' را فقط در ' + M('x') + ' ضرب کرده‌ای و به ' + M('x=7') + ' می‌رسی که نادرست است. درستش ' + M('2x-6=x+4') + ' و ' + M('x=10') + ' است.</p>');
    h += K.sn('۳', 'خطرِ مخرجِ صفر');
    h += '<p>در معادلهٔ ' + M(dfr('x', 'x-3') + '=' + dfr(3, 'x-3')) + ' اگر دو طرف را در ' + M('x-3') + ' ضرب کنیم، به ' + M('x=3') + ' می‌رسیم. ولی ' + M('x=3') + ' مخرج را صفر می‌کند و تقسیم بر صفر معنا ندارد. پس این جواب باید کنار گذاشته شود. روی نوار حرکت کن و ببین در عددِ مرزی چه می‌شود:</p>';
    h += activity('کارگاه مخرج صفر', 'e05-zero', 'نوار را حرکت بده و مقدار دو طرف را ببین. وقتی مخرج صفر شود، دو طرف «تعریف‌نشده»اند. «حل جبری» را بزن تا ببینی چرا معادله جواب ندارد.');
    h += K.box('note', 'همیشه بسنج', '<p>پس از حل معادله‌ای که مخرجِ شاملِ ' + M('x') + ' دارد، جواب را در همهٔ مخرج‌ها بگذار. اگر مخرجی صفر شد، آن جواب قابل‌قبول نیست.</p>');
    h += K.sn('۴', 'ماشین حل');
    h += '<p>حالا هر دو مهارت را با هم به کار ببر: مسئله‌ها یا کسری‌اند یا پرانتزی. در هر گام خطِ درست را انتخاب کن.</p>';
    h += activity('کارگاه مسیر حل', 'e05-solve', 'مسئلهٔ ترکیبی (کسری یا پرانتزی). در هر گام خط درست را انتخاب کن؛ با دکمهٔ چرخان مسئلهٔ تازه بگیر.');
    h += K.sn('۵', 'آزمون پایانی');
    h += '<p>در آزمون پایانی، معادله‌های کسری، پرانتزی و مخرج‌صفر سنجیده می‌شوند. شش سؤال در قالب‌های گوناگون، با عددهای تازه در هر دور.</p>';
    h += '<div id="e05-final" class="e01-interaction e01-final" aria-label="آزمون پایانی" data-activity></div>';
    h += K.box('sum', 'بعد از این درس باید بتوانی', '<ul><li>معادلهٔ دارای کسر را با ضرب در ک.م.م (روی همهٔ جمله‌ها) حل کنی.</li><li>پرانتز را با توزیع کامل باز کنی و مراقب علامتِ منفیِ پشت پرانتز باشی.</li><li>بدانی جوابی که مخرج را صفر کند قابل‌قبول نیست و در مخرج‌ها بسنجی.</li><li>نخستین سطر نادرستِ یک راه‌حل را پیدا کنی.</li></ul>');
    return h + '</div>';
  },
  init: function () {
    var $ = function (id) { return document.getElementById(id); };
    K.guide($('e05-frac'), genFrac); distLab($('e05-dist')); zeroLab($('e05-zero')); K.guide($('e05-solve'), genMix);
    exampleBind('e05-example-steps', [
      { title: 'مخرج مشترک', lines: ['\\dfrac{x}{2}+\\dfrac{x}{3}=5', '@ک.م.م ' + M('2') + ' و ' + M('3') + ' برابر ' + M('6') + ' است'], note: 'کوچک‌ترین عددی که ۲ و ۳ هر دو آن را می‌شمارند، ۶ است.' },
      { title: 'ضرب در ۶', lines: ['6\\times\\dfrac{x}{2}+6\\times\\dfrac{x}{3}=6\\times5', '3x+2x=30', '5x=30'], note: 'همهٔ جمله‌ها، از جمله ۵ طرف راست، در ۶ ضرب می‌شوند.' },
      { title: 'حل و آزمایش', lines: ['x=\\dfrac{30}{5}=6', '\\dfrac{6}{2}+\\dfrac{6}{3}=3+2=5\\ \\checkmark'], note: 'جواب را جایگذاری می‌کنیم؛ دو طرف برابرند.' }
    ]);
    K.final($('e05-final'), [mkG1, mkG2, mkG3, mkG4, mkG5, mkG6]);
  }
};

  }
};
