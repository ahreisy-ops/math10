/* درس مهارت E04 — نمایش جواب روی محور و بازه (فصل ۳) */
window.LESSONS = window.LESSONS || {};
window.LESSONS.E04 = {
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
var coef = function (a) { return a === 1 ? '' : a === -1 ? '-' : String(a); };
var ax = function (a) { return coef(a) + 'x'; };
var lin = function (a, b) { var s = ax(a); if (b > 0) { s += '+' + b; } else if (b < 0) { s += '-' + (-b); } return s; };
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


/* ================= ابزارهای محور و بازه ================= */
var INF = '\\infty';
// جواب x REL v → بازه (TeX)
function interval(rel, v) {
  if (rel === 'lt') { return '(-' + INF + ',\\ ' + v + ')'; }
  if (rel === 'le') { return '(-' + INF + ',\\ ' + v + ']'; }
  if (rel === 'gt') { return '(' + v + ',\\ +' + INF + ')'; }
  return '[' + v + ',\\ +' + INF + ')';
}
var relTex = function (rel, v) { return 'x' + REL[rel] + v; };
// محور: ناحیهٔ جواب با دایرهٔ باز/بسته. opts: {min,max,v,rel,W,H,mini}
function ray(o) {
  var W = o.W || 320, H = o.H || 78, min = o.min, max = o.max, pad = 22, sc = (W - 2 * pad) / (max - min), y = o.mini ? 36 : 40, X = function (v) { return pad + (v - min) * sc; }, v, svg = '<svg class="e3-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-hidden="true">';
  var right = o.rel === 'gt' || o.rel === 'ge', closed = o.rel === 'ge' || o.rel === 'le', x1 = right ? X(o.v) : X(min) - 8, x2 = right ? X(max) + 8 : X(o.v);
  svg += '<rect x="' + x1 + '" y="' + (y - 5) + '" width="' + (x2 - x1) + '" height="10" rx="5" fill="#7fd0c3"/>';
  svg += '<line x1="8" y1="' + y + '" x2="' + (W - 8) + '" y2="' + y + '" stroke="#14213d" stroke-width="2.4"/>';
  svg += '<path d="M' + (W - 8) + ' ' + y + ' l-9 -5 v10 z" fill="#14213d"/><path d="M8 ' + y + ' l9 -5 v10 z" fill="#14213d"/>';
  for (v = min; v <= max; v++) { svg += '<line x1="' + X(v) + '" y1="' + (y - 5) + '" x2="' + X(v) + '" y2="' + (y + 5) + '" stroke="#14213d" stroke-width="1.5"/><text x="' + X(v) + '" y="' + (y + 22) + '" text-anchor="middle" font-size="11.5" fill="#14213d" font-family="Tahoma,sans-serif">' + (v < 0 ? '−' : '') + F(abs(v)) + '</text>'; }
  svg += '<circle cx="' + X(o.v) + '" cy="' + y + '" r="8" fill="' + (closed ? '#0e8f7e' : '#fff') + '" stroke="#0e8f7e" stroke-width="3.2"/>';
  return svg + '</svg>';
}
function iq4() { var v = nz(-4, 4), rel = choose(RELS); return { v: v, rel: rel, tex: relTex(rel, v), iv: interval(rel, v) }; }
function wrongIntervals(q) {
  var v = q.v, r = q.rel, set = [
    { t: interval(r === 'lt' ? 'le' : r === 'le' ? 'lt' : r === 'gt' ? 'ge' : 'gt', v), m: 'نوع پرانتز یا کروشه را اشتباه گرفته‌ای: برای ≤ و ≥ کروشه و برای < و > پرانتز می‌آید.' },
    { t: interval(flipRel(r), v), m: 'جهتِ بازه با جهتِ نامعادله نمی‌خواند (کوچک‌تر از به چپ و بزرگ‌تر از به راست).' },
    { t: interval(r, -v), m: 'علامت عدد مرزی را اشتباه کرده‌ای.' },
    { t: (r === 'gt' || r === 'ge') ? '[' + v + ',\\ +' + INF + ']' : '[-' + INF + ',\\ ' + v + ']', m: 'بی‌نهایت یک عدد نیست و هرگز با کروشه نوشته نمی‌شود.' }
  ];
  return set;
}
/* ---------- کارگاه ۱: مترجم سه‌زبانه ---------- */
function transLab(root) {
  var st = root.querySelector('[data-stage]'), rel = 'ge', v = 2;
  function paint() {
    var q = { v: v, rel: rel };
    st.innerHTML = rr('<div class="e3-row">' + RELS.map(function (r) { return '<button type="button" class="e3-op' + (r === rel ? ' is-on' : '') + '" data-rel="' + r + '">' + M('x' + REL[r] + 'a') + '</button>'; }).join('') + '</div>' +
      '<div class="e3-slider"><div class="lab"><span>عدد مرزی ' + M('a') + ' = ' + M(String(v)) + '</span></div><input type="range" id="tr-v" min="-4" max="4" step="1" value="' + v + '" aria-label="عدد مرزی"></div>' +
      '<div class="e3-eq" style="font-size:1.1rem;gap:2px">' + M(relTex(rel, v)) + '<span class="e3-note" style="margin:0">نامعادله</span></div>' + ray({ min: -5, max: 5, v: v, rel: rel }) +
      '<div class="e3-eq" style="font-size:1.1rem">' + M(interval(rel, v)) + '<span class="e3-note" style="margin:0">بازه</span></div><div class="e3-row"><span class="e3-pill ' + (rel === 'ge' || rel === 'le' ? 'ok' : 'y') + '">' + (rel === 'ge' || rel === 'le' ? 'دایرهٔ توپر ← کروشه [ ] ← عدد مرزی جزو جواب است' : 'دایرهٔ توخالی ← پرانتز ( ) ← عدد مرزی جزو جواب نیست') + '</span></div><p class="e3-note">بی‌نهایت هرگز با کروشه نوشته نمی‌شود؛ چون عدد نیست و به آن نمی‌رسیم.</p>');
  }
  root.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b && b.hasAttribute('data-rel')) { rel = b.dataset.rel; paint(); } });
  root.addEventListener('input', function (e) { if (e.target.id === 'tr-v') { v = +e.target.value; paint(); var s = root.querySelector('#tr-v'); s.focus(); } });
  paint();
}
/* ---------- کارگاه ۲: از محور به نامعادله و بازه ---------- */
function readLab(root) {
  var st = root.querySelector('[data-stage]'), q, step, tries1, tries2, ok1, ok2;
  function nw() { q = iq4(); step = 1; tries1 = []; tries2 = []; ok1 = null; ok2 = null; }
  function grid(opts, tries, okIdx, att) { return '<div class="e01-answer-grid">' + opts.map(function (o, i) { var cl = okIdx !== null ? (o.ok ? ' e01-right' : (tries.indexOf(i) > -1 ? ' e01-wrong' : '')) : (tries.indexOf(i) > -1 ? ' e01-wrong' : ''); return '<button type="button" class="btn e01-answer' + cl + '" ' + att + '="' + i + '"' + (okIdx !== null || tries.indexOf(i) > -1 ? ' disabled' : '') + '>' + o.h + '</button>'; }).join('') + '</div>'; }
  var A, B;
  function build() {
    A = mc({ t: relTex(q.rel, q.v) }, [{ t: relTex(flipRel(q.rel), q.v), m: 'به جهتِ ناحیهٔ سبز نگاه کن.' }, { t: relTex(q.rel === 'lt' || q.rel === 'gt' ? (q.rel === 'lt' ? 'le' : 'ge') : (q.rel === 'le' ? 'lt' : 'gt'), q.v), m: 'دایرهٔ توپر یا توخالی را اشتباه خوانده‌ای.' }, { t: relTex(q.rel, -q.v), m: 'عدد مرزی را اشتباه خوانده‌ای.' }]);
    var wi = wrongIntervals(q); B = mc({ t: q.iv }, wi);
  }
  function paint() {
    if (!A) { build(); }
    var h = '<div class="e02-problem-head"><span class="e02-problem-chip" style="font-size:.95rem">محور زیر را بخوان</span><button type="button" class="btn primary e01-station-refresh" data-fresh title="محور جدید" aria-label="محور جدید">' + REFRESH + '</button></div>' + ray({ min: -5, max: 5, v: q.v, rel: q.rel });
    h += '<p class="ask e3-ask">۱. جواب نشان‌داده‌شده کدام نامعادله است؟</p>' + grid(A, tries1, ok1, 'data-a');
    if (ok1 !== null) { h += mark(true, '✓ درست است: ' + (q.rel === 'ge' || q.rel === 'le' ? 'دایرهٔ توپر یعنی عدد مرزی جزو جواب است.' : 'دایرهٔ توخالی یعنی عدد مرزی جزو جواب نیست.')) + '<p class="ask e3-ask">۲. همین جواب را به‌صورت بازه بنویس.</p>' + grid(B, tries2, ok2, 'data-b'); }
    else if (tries1.length) { h += mark(false, A[tries1[tries1.length - 1]].m); }
    if (ok2 !== null) { h += mark(true, '✓ درست است: ' + M(q.iv) + '. بی‌نهایت همیشه پرانتز دارد.') + '<div class="opts g-ops"><button type="button" class="btn" data-fresh>محور دیگر</button></div>'; }
    else if (tries2.length) { h += mark(false, B[tries2[tries2.length - 1]].m); }
    st.innerHTML = rr(h);
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('button'), i; if (!b || b.disabled) { return; }
    if (b.hasAttribute('data-fresh')) { nw(); A = null; paint(); return; }
    if (b.hasAttribute('data-a')) { i = +b.dataset.a; if (A[i].ok) { ok1 = i; } else { tries1.push(i); } paint(); return; }
    if (b.hasAttribute('data-b')) { i = +b.dataset.b; if (B[i].ok) { ok2 = i; } else { tries2.push(i); } paint(); }
  });
  nw(); paint();
}
/* ---------- کارگاه ۳: از بازه به محور ---------- */
function drawLab(root) {
  var st = root.querySelector('[data-stage]'), q, opts, picked, done;
  function nw() {
    q = iq4(); done = false; picked = [];
    var right = q.rel === 'gt' || q.rel === 'ge', closed = q.rel === 'ge' || q.rel === 'le', cand = [{ rel: q.rel, v: q.v, ok: 1 }, { rel: flipRel(q.rel), v: q.v, ok: 0, m: 'جهت سبز با بازه نمی‌خواند.' }, { rel: (q.rel === 'lt' ? 'le' : q.rel === 'le' ? 'lt' : q.rel === 'gt' ? 'ge' : 'gt'), v: q.v, ok: 0, m: 'دایرهٔ توپر/توخالی با کروشه/پرانتز نمی‌خواند.' }, { rel: q.rel, v: -q.v, ok: 0, m: 'عدد مرزی را اشتباه خوانده‌ای.' }];
    opts = shuffle(cand);
  }
  function paint() {
    var h = '<div class="e02-problem-head"><span class="e02-problem-chip" dir="ltr">' + M(q.iv) + '</span><button type="button" class="btn primary e01-station-refresh" data-fresh title="بازهٔ جدید" aria-label="بازهٔ جدید">' + REFRESH + '</button></div><p class="ask e3-ask">کدام محور این بازه را نشان می‌دهد؟</p><div class="e01-answer-grid" style="grid-template-columns:1fr">';
    opts.forEach(function (o, i) { var cl = done ? (o.ok ? ' e01-right' : (picked.indexOf(i) > -1 ? ' e01-wrong' : '')) : (picked.indexOf(i) > -1 ? ' e01-wrong' : ''); h += '<button type="button" class="btn e01-answer' + cl + '" data-o="' + i + '"' + (done || picked.indexOf(i) > -1 ? ' disabled' : '') + ' aria-label="گزینه ' + F(i + 1) + '">' + ray({ min: -5, max: 5, v: o.v, rel: o.rel, W: 300, H: 62, mini: 1 }) + '</button>'; });
    h += '</div>';
    if (picked.length) { var lo = opts[picked[picked.length - 1]]; h += mark(!!lo.ok, lo.ok ? '✓ درست است: کروشه یعنی دایرهٔ توپر، پرانتز یعنی دایرهٔ توخالی، و بی‌نهایت جهت ادامه را نشان می‌دهد.' : lo.m); }
    if (done) { h += '<div class="opts g-ops"><button type="button" class="btn" data-fresh>بازهٔ دیگر</button></div>'; }
    st.innerHTML = rr(h);
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) { return; }
    if (b.hasAttribute('data-fresh')) { nw(); paint(); return; }
    if (b.hasAttribute('data-o')) { var i = +b.dataset.o; picked.push(i); if (opts[i].ok) { done = true; } paint(); }
  });
  nw(); paint();
}
/* ---------- کارگاه ۴: از نامعادله تا بازه (حل کامل) ---------- */
function iqS(kind) { // از E03: a x + b rel c
  var a, b, x0 = nz(-6, 6), rel = choose(RELS), c, L;
  if (kind === 'C') { a = -R(2, 5); b = nz(-9, 9); L = String(b) + (a === -1 ? '-x' : '-' + (-a) + 'x'); }
  else if (kind === 'B') { a = -R(2, 5); b = 0; L = ax(a); }
  else { a = choose([2, 3, 4, 5]); b = nz(-9, 9); L = lin(a, b); }
  c = a * x0 + b; return { a: a, b: b, x0: x0, rel: rel, c: c, L: L, tex: L + REL[rel] + c, rel2: a < 0 ? flipRel(rel) : rel };
}
function genFull() {
  var kind = choose(['C', 'D', 'B', 'C']), q = iqS(kind), steps = [], mid = ax(q.a) + REL[q.rel] + (q.c - q.b);
  if (kind !== 'B') {
    steps.push({ ask: 'ابتدا عدد ثابت را حذف می‌کنیم. خط بعدی کدام است؟', opts: mc({ t: mid }, [{ t: ax(q.a) + REL[q.rel] + (q.c + q.b), m: 'برای حذف عدد ثابت باید عملِ وارون انجام دهی.' }, { t: ax(q.a) + REL[flipRel(q.rel)] + (q.c - q.b), m: 'جمع و تفریق جهت را برعکس نمی‌کنند.' }, { t: ax(-q.a) + REL[q.rel] + (q.c - q.b), m: 'علامت جملهٔ x را بی‌دلیل عوض کرده‌ای.' }]), line: mid, why: 'جملهٔ ثابت حذف شد و جهت ماند.' });
  }
  steps.push({ ask: 'دو طرف را بر ' + M(String(q.a)) + (q.a < 0 ? ' (عددی منفی)' : ' (عددی مثبت)') + ' تقسیم می‌کنیم. جواب نامعادله کدام است؟', opts: mc({ t: 'x' + REL[q.rel2] + q.x0 }, [{ t: 'x' + REL[q.rel] + q.x0, m: q.a < 0 ? 'تقسیم بر عددِ منفی جهت را برعکس می‌کند.' : 'تقسیم بر عددِ مثبت جهت را برعکس نمی‌کند، اما این‌جا جهت اشتباهی عوض شده است.' }, { t: 'x' + REL[q.rel2] + (-q.x0), m: 'علامت عدد را اشتباه کرده‌ای.' }, { t: 'x' + REL[flipRel(q.rel2)] + (-q.x0), m: 'هم جهت و هم علامت اشتباه است.' }]), line: 'x' + REL[q.rel2] + q.x0, why: 'جواب نامعادله به دست آمد.' });
  steps.push({ ask: 'حالا جواب ' + M('x' + REL[q.rel2] + q.x0) + ' را به‌صورت بازه بنویس.', opts: mc({ t: interval(q.rel2, q.x0) }, wrongIntervals({ v: q.x0, rel: q.rel2 })), line: interval(q.rel2, q.x0), why: 'کروشه برای ≤ و ≥، پرانتز برای < و >، و بی‌نهایت همیشه پرانتز.' });
  return { tex: q.tex, steps: steps, end: 'جواب: ' + M(interval(q.rel2, q.x0)) };
}
/* ================= آزمون پایانی ================= */
function mkF1() { var q = iq4(); return { type: 'mc', ask: 'جواب نامعادلهٔ ' + M(q.tex) + ' را به‌صورت بازه بنویس.', opts: mc({ t: q.iv }, wrongIntervals(q)), why: 'کروشه یعنی عدد مرزی جزو جواب است و پرانتز یعنی نیست؛ بی‌نهایت همیشه با پرانتز می‌آید.' }; }
function mkF2() { var q = iq4(), right = q.rel === 'gt' || q.rel === 'ge', mk = function (rel, v) { return ray({ min: -4, max: 4, v: v, rel: rel, W: 280, H: 62, mini: 1 }); };
  var v = Math.max(-3, Math.min(3, q.v)); q = { v: v, rel: q.rel, tex: relTex(q.rel, v), iv: interval(q.rel, v) };
  var cand = [{ rel: q.rel, v: q.v, ok: 1 }, { rel: flipRel(q.rel), v: q.v, ok: 0 }, { rel: (q.rel === 'lt' ? 'le' : q.rel === 'le' ? 'lt' : q.rel === 'gt' ? 'ge' : 'gt'), v: q.v, ok: 0 }, { rel: q.rel, v: -q.v, ok: 0 }];
  cand = uniqBy(cand, function (c) { return c.rel + c.v; });
  if (cand.length < 4) { cand.push({ rel: flipRel(q.rel) === 'lt' ? 'le' : 'ge', v: q.v + 1, ok: 0 }); }
  return { type: 'mc', ask: 'جواب نامعادلهٔ ' + M(q.tex) + ' روی کدام محور درست نشان داده شده است؟', opts: shuffle(cand).slice(0, 4).map(function (c) { return { h: mk(c.rel, c.v), ok: !!c.ok }; }), why: 'دایرهٔ ' + (q.rel === 'ge' || q.rel === 'le' ? 'توپر (عدد مرزی جزو جواب است)' : 'توخالی (عدد مرزی جزو جواب نیست)') + ' و ناحیهٔ سبز به سمت ' + (q.rel === 'gt' || q.rel === 'ge' ? 'راست' : 'چپ') + '.' }; }
function mkF3() {
  var vs = shuffle([-3, -2, -1, 1, 2, 3, 4]).slice(0, 3), rels = shuffle(['lt', 'le', 'ge', 'gt']).slice(0, 3), left = rels.map(function (r, i) { return M(relTex(r, vs[i])); }), right = shuffle(rels.map(function (r, i) { return { r: r, v: vs[i] }; })), extra;
  var key = rels.map(function (r, i) { return right.findIndex(function (z) { return z.r === r && z.v === vs[i]; }); });
  return { type: 'match', ask: 'هر نامعادله را به بازهٔ معادلش وصل کن.', left: left, right: right.map(function (z) { return M(interval(z.r, z.v)); }), key: key, why: 'کروشه برای ≤ و ≥ و پرانتز برای < و >؛ جهت بازه همان جهت نامعادله است.', show: left.map(function (l, i) { return l + ' ← ' + M(interval(rels[i], vs[i])); }).join('، ') };
}
function mkF4() { var q = iqS(choose(['C', 'D', 'B'])), iv = interval(q.rel2, q.x0); return { type: 'mc', ask: 'جواب نامعادلهٔ ' + M(q.tex) + ' را به‌صورت بازه بنویس.', opts: mc({ t: iv }, wrongIntervals({ v: q.x0, rel: q.rel2 }).concat([{ t: interval(q.rel, q.x0), m: q.a < 0 ? 'تقسیم بر عددِ منفی جهت را برعکس می‌کند؛ این‌جا برعکس نشده است.' : 'جهتِ علامت اشتباه شده است.' }])), why: 'اول نامعادله را حل کن: ' + M('x' + REL[q.rel2] + q.x0) + '؛ بعد آن را با پرانتز یا کروشهٔ درست به‌صورت بازه بنویس: ' + M(iv) + '.' }; }
function mkF5() {
  var q = iq4(), iv = q.iv, wr = wrongIntervals(q);
  var test = choose([q.v + 1, q.v - 1, q.v]); var inSet = function (x) { return q.rel === 'lt' ? x < q.v : q.rel === 'gt' ? x > q.v : q.rel === 'le' ? x <= q.v : x >= q.v; };
  var opts = [{ h: 'جزو جواب است', ok: inSet(test) }, { h: 'جزو جواب نیست', ok: !inSet(test) }];
  return { type: 'mc', ask: 'جواب نامعادله‌ای به‌صورت بازهٔ ' + M(iv) + ' است. عدد ' + M(String(test)) + ' جزو جواب است؟', opts: opts.concat([{ h: 'فقط وقتی جواب است که آن را دایره‌ای نشان دهیم', ok: false }, { h: 'نمی‌توان فهمید', ok: false }]), why: 'عدد را در بازه بسنج: ' + (test === q.v ? 'عدد مرزی ' + (q.rel === 'ge' || q.rel === 'le' ? 'با کروشه جزو جواب است.' : 'با پرانتز جزو جواب نیست.') : 'عدد ' + M(String(test)) + (inSet(test) ? ' در ناحیهٔ جواب قرار دارد.' : ' در ناحیهٔ جواب قرار ندارد.')) };
}
function mkF6() { var q = iqS(choose(['C', 'B', 'D'])), r = q.rel2, v = q.x0; return { type: 'num', ask: 'نامعادلهٔ ' + M(q.tex) + ' را حل کن. عدد مرزی (مقدارِ ' + M('x') + ' در جواب) چند است؟', lbl: 'x=', ans: v, show: M(String(v)), why: 'پس از حل: ' + M('x' + REL[r] + v) + '؛ یعنی بازهٔ ' + M(interval(r, v)) + '. عدد مرزی ' + M(String(v)) + ' است.' }; }
return {
  html: function () {
    var h = '<div class="e01-lesson e02-lesson e3x">';
    h += intro('یک جواب، سه زبان', 'جواب نامعادله فقط یک عدد نیست؛ <b>مجموعه‌ای از عددها</b> است. این مجموعه را می‌توان با سه زبان نوشت: نامعادله، محور و بازه. بیاموز بین این سه ترجمه کنی و بدانی دایره‌ها و پرانتزها دقیقاً چه می‌گویند.', ['نامعادله', 'محور', 'بازه', 'حل تا بازه']);
    h += K.sn('۱', 'سه زبانِ یک جواب');
    h += '<p>نامعادلهٔ ' + M('x\\geq 2') + ' یعنی هر عددی که از ' + M('2') + ' بزرگ‌تر یا برابر با آن باشد. روی محور، ناحیهٔ سبز از ' + M('2') + ' به راست ادامه دارد و در ' + M('2') + ' دایرهٔ توپر می‌گذاریم، چون خودِ ' + M('2') + ' هم جواب است. به‌صورت بازه می‌نویسیم ' + M('[2,\\ +\\infty)') + '. علامت نامعادله، عدد مرزی و جهت را عوض کن و هر سه ترجمه را همزمان ببین:</p>';
    h += activity('کارگاه مترجم سه‌زبانه', 'e04-trans', 'یکی از چهار علامت را انتخاب کن و عدد مرزی را با نوار بلغزان. نامعادله، محور و بازه همزمان تغییر می‌کنند.');
    h += K.box('note', 'قاعدهٔ دایره و پرانتز', '<ul><li>' + M('\\leq') + ' و ' + M('\\geq') + ': دایرهٔ <b>توپر</b> و <b>کروشه</b> ' + M('[\\ ]') + '؛ عدد مرزی جزو جواب است.</li><li>' + M('\\lt') + ' و ' + M('\\gt') + ': دایرهٔ <b>توخالی</b> و <b>پرانتز</b> ' + M('(\\ )') + '؛ عدد مرزی جزو جواب نیست.</li><li>بی‌نهایت (' + M('\\infty') + ') هرگز با کروشه نوشته نمی‌شود.</li></ul>');
    h += K.sn('۲', 'از محور به نامعادله و بازه');
    h += '<p>برای خواندن یک محور، سه چیز را نگاه کن: <b>جهتِ</b> ناحیهٔ سبز (راست ' + M('\\gt') + ' و چپ ' + M('\\lt') + ')، <b>نوعِ</b> دایره (توپر یا توخالی)، و <b>عددِ</b> مرزی. بعد همان را به بازه ترجمه کن.</p>';
    h += activity('کارگاه محورخوانی', 'e04-read', 'محور را بخوان؛ نخست نامعادله را و بعد بازه را انتخاب کن. اگر اشتباه کنی، دلیلش را می‌بینی.');
    h += K.box('err', '⚠ سه خطای رایج', '<p>۱) توخالی را با توپر قاطی‌کردن (و برعکس). ۲) نوشتنِ ' + M('+\\infty') + ' با کروشه، مثل ' + M('[2,\\ +\\infty]') + '؛ این درست نیست. ۳) برعکس‌گرفتنِ جهت: ' + M('x\\lt 2') + ' به چپ می‌رود، نه راست.</p>');
    h += K.sn('۳', 'از بازه به محور');
    h += '<p>برعکسش هم لازم است: بازه را ببین و محورِ درست را از میان چند شکل انتخاب کن. کروشه ← دایرهٔ توپر؛ پرانتز ← دایرهٔ توخالی؛ ' + M('-\\infty') + ' سمت چپ و ' + M('+\\infty') + ' سمت راست.</p>';
    h += activity('کارگاه از بازه به محور', 'e04-draw', 'بازه را می‌بینی؛ از بین چهار محور، درستش را انتخاب کن. اگر اشتباه بود، پیام راهنما می‌بینی و می‌توانی دوباره انتخاب کنی.');
    h += K.sn('۴', 'حل تا بازه');
    h += '<p>در مسئله‌های واقعی هر سه مهارت پشت‌سر هم می‌آیند: اول نامعادله را حل می‌کنیم (با مراقبت از جهت علامت)، بعد جواب را به بازه ترجمه می‌کنیم. برای نامعادلهٔ ' + M('3-2x\\leq 9') + ':</p>';
    h += exampleBlock('e04-example-steps', 'حل کامل تا بازه', 3);
    h += activity('کارگاه حل تا بازه', 'e04-full', 'در هر گام یک خط یا ترجمهٔ درست را انتخاب کن. آخرین گام نوشتن جواب با بازه است. با دکمهٔ چرخان مسئلهٔ تازه بگیر.');
    h += K.box('err', '⚠ خطای رایج: جهت پس از ضریب منفی', '<p>اگر در تقسیم بر عدد منفی جهت را برعکس نکنی، بازه به سمت اشتباه می‌رود؛ مثلاً به‌جای ' + M('[-3,\\ +\\infty)') + ' می‌نویسی ' + M('(-\\infty,\\ -3]') + '.</p>');
    h += K.sn('۵', 'آزمون پایانی');
    h += '<p>در آزمون پایانی، ترجمهٔ نامعادله به بازه و محور، وصل‌کردن نامعادله‌ها به بازه‌ها، و حل کامل با بازه سنجیده می‌شود. شش سؤال در قالب‌های گوناگون، با عددهای تازه در هر دور.</p>';
    h += '<div id="e04-final" class="e01-interaction e01-final" aria-label="آزمون پایانی" data-activity></div>';
    h += K.box('sum', 'بعد از این درس باید بتوانی', '<ul><li>نامعادله را با محور و با بازه بنویسی و بین این سه زبان ترجمه کنی.</li><li>دایرهٔ توپر و توخالی و کروشه و پرانتز را درست به کار ببری.</li><li>بدانی بی‌نهایت همیشه با پرانتز نوشته می‌شود.</li><li>نامعادلهٔ خطی را حل کنی و جواب را مستقیم با بازه بنویسی.</li></ul>');
    return h + '</div>';
  },
  init: function () {
    var $ = function (id) { return document.getElementById(id); };
    transLab($('e04-trans')); readLab($('e04-read')); drawLab($('e04-draw')); K.guide($('e04-full'), genFull);
    exampleBind('e04-example-steps', [
      { title: 'حل نامعادله', lines: ['3-2x\\leq 9', '-2x\\leq 6', 'x\\geq -3'], note: 'اول ۳ را کم می‌کنیم؛ بعد بر ۲- تقسیم می‌کنیم و چون عدد منفی است، جهت ≤ به ≥ برمی‌گردد.' },
      { title: 'خواندن نوع علامت', lines: ['x\\geq -3', '@دایرهٔ توپر در ' + M('-3'), '@ناحیهٔ سبز به سمت راست'], note: 'علامت ≥ یعنی عدد مرزی ۳- جزو جواب است (دایرهٔ توپر) و جواب از ۳- به سمت راست می‌رود.' },
      { title: 'نوشتن بازه', lines: ['[-3,\\ +\\infty)'], note: 'کروشه برای ۳- چون جزو جواب است؛ پرانتز برای بی‌نهایت چون بی‌نهایت هرگز جزو جواب نیست.' }
    ]);
    K.final($('e04-final'), [mkF1, mkF2, mkF3, mkF4, mkF5, mkF6]);
  }
};

  }
};
