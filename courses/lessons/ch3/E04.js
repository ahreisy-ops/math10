/* درس مهارت E04 — نمایش جواب روی محور و بازه (فصل ۳) */
window.LESSONS = window.LESSONS || {};
window.LESSONS.E04 = {
  needs: ['utils', 'kit'],
  setup: function (K0) {
    var ML = window.MathLite, F = ML.fa, rr = ML.renderRich, abs = Math.abs, _u = K0._u, R = _u.R, M = _u.M, shuffle = _u.shuffle;
    var M0 = _u.M, K = Object.create(K0), H = K0.lk(K), T = String.raw;
    var M = function (t) {
      t = String(t);
      if (!/\\text\{(یا|و)\}/.test(t)) { return M0(t); }
      var parts = t.split(/\\ ?\\text\{(یا|و)\}\\ ?/), out = '', i;
      for (i = 0; i < parts.length; i++) { out += i % 2 ? ' ' + parts[i] + ' ' : M0(parts[i]); }
      return '<bdi style="direction:ltr;unicode-bidi:isolate">' + out + '</bdi>';
    };
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
    var REFRESH = '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 0 0-14.4-4.8L3 9"/><path d="M3 4v5h5"/><path d="M4 13a8 8 0 0 0 14.4 4.8L21 15"/><path d="M21 20v-5h-5"/></svg>';
    function head(tex) { return '<div class="e02-problem-head"><span class="e02-problem-chip">' + M(tex) + '</span><button type="button" class="btn primary e01-station-refresh" data-fresh title="مسئلهٔ جدید" aria-label="تغییر مسئله">' + REFRESH + '</button></div>'; }
    function more(label, target) { return '<div class="opts g-ops"><button type="button" class="btn primary" data-fresh data-scroll="' + (target || '.e02-problem-head') + '" data-scroll-offset="100">' + label + '</button></div>'; }



    /* ---------- مثال حل‌شده (همان ساختار E02) ---------- */
    function exampleBlock(id, dlgTitle, count) {
      var dots = ''; for (var i = 0; i < count; i++) { dots += '<i' + (i === 0 ? ' class="current"' : '') + '></i>'; }
      return '<div class="ex e02-example-steps" id="' + id + '" aria-label="حل گام‌به‌گام مثال"><div class="e02-example-top"><strong>مثال حل‌شده</strong><span data-ex-count>گام ۱ از ' + F(count) + '</span></div><div class="e02-example-progress" aria-hidden="true">' + dots + '</div><div class="e02-example-body" data-ex-body aria-live="polite"></div><div class="e02-example-actions end-actions"><button type="button" class="btn" data-ex-prev data-scroll disabled>مرحلهٔ قبلی</button><button type="button" class="btn primary" data-ex-next data-scroll>مرحلهٔ بعدی</button><button type="button" class="btn primary" data-ex-all hidden>مشاهدهٔ حل کامل</button></div></div>' +
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
      function nw() {
        p = gen(); si = 0; wrong = 0; log = []; done = false;
        tries = p.steps.map(function () { return []; }); okIdx = p.steps.map(function () { return undefined; }); last = p.steps.map(function () { return undefined; });
      }
      function paint() {
        var h = head(p.tex), j, s;
        h += '<div class="e3-log"><b>مسیر ساخته‌شده</b><ol>' + (log.length ? log.map(function (l, i) { return '<li><span class="n">' + F(i + 1) + '</span><span class="tx">' + M(l) + '</span></li>'; }).join('') : '<li style="justify-content:center"><svg viewBox="0 0 48 48" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 5h17l8 8v29H12z"/><path d="M29 5v9h8M17 21h15M17 27h11M17 33h11"/></svg><span style="color:var(--ink-soft);font-size:.88rem">هنوز گامی انجام نشده است.</span></li>') + '</ol></div>';
        for (j = 0; j <= si; j++) {
          s = p.steps[j];
          h += '<p class="ask e3-ask' + (j ? ' e3-sep' : '') + '">' + F(j + 1) + '. ' + s.ask + '</p><div class="e01-answer-grid">' + s.opts.map(function (op, i) { var cl = okIdx[j] !== undefined ? (op.ok ? ' e01-right' : (tries[j].indexOf(i) > -1 ? ' e01-wrong' : '')) : (tries[j].indexOf(i) > -1 ? ' e01-wrong' : ''); return '<button type="button" class="btn e01-answer' + cl + '" data-pick="' + i + '"' + (okIdx[j] !== undefined || tries[j].indexOf(i) > -1 ? ' disabled' : '') + '>' + op.h + '</button>'; }).join('') + '</div>';
          if (last[j] !== undefined) { var lo = s.opts[last[j]]; h += mark(lo.ok, lo.ok ? '✓ درست است. ' + s.why + (done && j === si ? '<br><b>حل کامل شد' + (wrong ? '' : ' (بدون خطا)') + '.</b> ' + (p.end || '') : '') : lo.m); }
        }
        if (done) { h += more('مسئلهٔ دیگر'); }
        st.innerHTML = rr(h);
      }
      root.addEventListener('click', function (e) {
        var b = e.target.closest('button'), i; if (!b || b.disabled) { return; }
        if (b.hasAttribute('data-fresh')) { nw(); paint(); return; }
        if (b.hasAttribute('data-pick')) {
          var j0 = si, y0 = b.getBoundingClientRect().top; i = +b.dataset.pick; last[si] = i;
          if (p.steps[si].opts[i].ok) { okIdx[si] = i; log.push(p.steps[si].line); if (si === p.steps.length - 1) { done = true; } else { si++; } }
          else { tries[si].push(i); wrong++; }
          paint();
          var nb = st.querySelectorAll('.e01-answer-grid')[j0].querySelector('[data-pick="' + i + '"]'), dy = nb ? nb.getBoundingClientRect().top - y0 : 0;
          if (dy) { window.scrollBy({ top: dy, left: 0, behavior: 'instant' }); }
        }
      });
      nw(); paint();
    };

    /* ---------- آزمون پایانی چندشکلی ----------
       makers: آرایه‌ای از تابع‌ها؛ هر تابع آیتمی مثل
       {type:'mc'|'multi'|'num'|'match', ask, fig?, opts:[{h,ok}], ans(num), left/right/key(match), why} برمی‌گرداند */


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
    // بازه به‌صورت متن ساده (برای <option> که HTML/KaTeX نمی‌پذیرد)
    function plainIv(rel, v) { var n = (v < 0 ? '−' : '') + F(abs(v)); return rel === 'lt' ? '(−∞, ' + n + ')' : rel === 'le' ? '(−∞, ' + n + ']' : rel === 'gt' ? '(' + n + ', +∞)' : '[' + n + ', +∞)'; }
    // محور: ناحیهٔ جواب با دایرهٔ باز/بسته. opts: {min,max,v,rel,W,H,mini}
    function ray(o) {
      var W = o.W || 320, H = o.H || 78, min = o.min, max = o.max, pad = 22, sc = (W - 2 * pad) / (max - min), y = o.mini ? 36 : 40, X = function (v) { return pad + (v - min) * sc; }, v, svg = '<svg class="e3-svg e4-svg-draw" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-hidden="true">';
      var right = o.rel === 'gt' || o.rel === 'ge', closed = o.rel === 'ge' || o.rel === 'le', x1 = right ? X(o.v) : X(min) - 8, x2 = right ? X(max) + 8 : X(o.v);
      svg += '<rect x="' + x1 + '" y="' + (y - 5) + '" width="' + (x2 - x1) + '" height="10" rx="5" fill="#7fd0c3"/>';
      svg += '<line x1="8" y1="' + y + '" x2="' + (W - 8) + '" y2="' + y + '" stroke="#14213d" stroke-width="2.4"/>';
      svg += '<path d="M' + (W - 8) + ' ' + y + ' l-9 -5 v10 z" fill="#14213d"/><path d="M8 ' + y + ' l9 -5 v10 z" fill="#14213d"/>';
      for (v = min; v <= max; v++) { svg += '<line x1="' + X(v) + '" y1="' + (y - 5) + '" x2="' + X(v) + '" y2="' + (y + 5) + '" stroke="#14213d" stroke-width="1.5"/><text x="' + X(v) + '" y="' + (y + 22) + '" text-anchor="middle" font-size="14.5" fill="#14213d" font-family="Tahoma,sans-serif">' + (v < 0 ? '−' : '') + F(abs(v)) + '</text>'; }
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
      var st = root.querySelector('[data-stage]'), rel = 'ge', v = -3, ticks = '<div class="graduated-ticks" aria-hidden="true">', t;
      for (t = -4; t <= 4; t++) { ticks += '<span' + (t === 0 ? ' class="zero"' : '') + ' style="--gr-step:' + (t + 4) + ';--gr-total:8"><i></i>' + M(String(t)) + '</span>'; }
      ticks += '</div>';
      function row(lab, key) { return '<div class="e3-tri-row"><span class="e3-tri-lab">' + lab + '</span><div class="e3-tri-val" data-' + key + '></div></div>'; }
      st.innerHTML = rr('<div class="e3-row">' + RELS.map(function (r) { return '<button type="button" class="e3-op" data-rel="' + r + '">' + M('x' + REL[r] + 'a') + '</button>'; }).join('') + '</div>' +
        '<div class="e3-slider graduated-range"><div class="lab"><span data-lab></span></div><input type="range" id="tr-v" min="-4" max="4" step="1" value="' + v + '" aria-label="عدد مرزی">' + ticks + '</div>' +
        '<div class="e3-tri">' + row('نامعادله', 'ineq') + row('محور', 'axis') + row('بازه', 'iv') + '</div><div class="e3-row" data-pill></div>');
      function put(sel, html) { st.querySelector(sel).innerHTML = rr(html); }
      function upd() {
        var closed = rel === 'ge' || rel === 'le';
        st.querySelectorAll('[data-rel]').forEach(function (b) { b.classList.toggle('is-on', b.dataset.rel === rel); });
        put('[data-lab]', 'عدد مرزی ' + M('a=' + v));
        put('[data-ineq]', M(relTex(rel, v)));
        put('[data-axis]', ray({ min: -5, max: 5, v: v, rel: rel }));
        put('[data-iv]', M(interval(rel, v)));
        put('[data-pill]', '<span class="e3-pill ' + (closed ? 'ok' : 'y') + '">' + (closed ? 'دایرهٔ توپر ← کروشه [ ] ← عدد مرزی جزو جواب است' : 'دایرهٔ توخالی ← پرانتز ( ) ← عدد مرزی جزو جواب نیست') + '</span>');
      }
      root.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b && b.hasAttribute('data-rel')) { rel = b.dataset.rel; upd(); } });
      root.addEventListener('input', function (e) { if (e.target.id === 'tr-v') { v = +e.target.value; upd(); } });
      upd();
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
        var h = '<p>محور زیر را بخوان:</p>' + ray({ min: -5, max: 5, v: q.v, rel: q.rel });
        h += '<p class="ask e3-ask">۱. جواب نشان‌داده‌شده کدام نامعادله است؟</p>' + grid(A, tries1, ok1, 'data-a');
        if (ok1 !== null) { h += mark(true, '✓ درست است: ' + (q.rel === 'ge' || q.rel === 'le' ? 'دایرهٔ توپر یعنی عدد مرزی جزو جواب است.' : 'دایرهٔ توخالی یعنی عدد مرزی جزو جواب نیست.')) + '<p class="ask e3-ask e3-sep">۲. همین جواب را به‌صورت بازه بنویس.</p>' + grid(B, tries2, ok2, 'data-b'); }
        else if (tries1.length) { h += mark(false, A[tries1[tries1.length - 1]].m); }
        if (ok2 !== null) { h += mark(true, '✓ درست است: ' + M(q.iv) + '. بی‌نهایت همیشه پرانتز دارد.'); }
        else if (tries2.length) { h += mark(false, B[tries2[tries2.length - 1]].m); }
        st.innerHTML = rr(h + more('محور دیگر', '.e4-svg-draw'));
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
        var h = '<p class="ask e3-ask">کدام محور، بازهٔ ' + M(q.iv) + ' را نشان می‌دهد؟</p><div class="e01-answer-grid e3-svgopts">';
        opts.forEach(function (o, i) { var cl = done ? (o.ok ? ' e01-right' : (picked.indexOf(i) > -1 ? ' e01-wrong' : '')) : (picked.indexOf(i) > -1 ? ' e01-wrong' : ''); h += '<button type="button" class="btn e01-answer' + cl + '" data-o="' + i + '"' + (done || picked.indexOf(i) > -1 ? ' disabled' : '') + ' aria-label="گزینه ' + F(i + 1) + '">' + ray({ min: -5, max: 5, v: o.v, rel: o.rel, W: 300, H: 62, mini: 1 }) + '</button>'; });
        h += '</div>';
        if (picked.length) { var lo = opts[picked[picked.length - 1]]; h += mark(!!lo.ok, lo.ok ? '✓ درست است: کروشه یعنی دایرهٔ توپر، پرانتز یعنی دایرهٔ توخالی، و بی‌نهایت جهت ادامه را نشان می‌دهد.' : lo.m); }
        st.innerHTML = rr(h + more('بازهٔ دیگر', '.e3-ask'));
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
      steps.push({ ask: 'دو طرف را بر ' + M(String(q.a)) + (q.a < 0 ? ' (عددی منفی)' : ' (عددی مثبت)') + ' تقسیم می‌کنیم. جواب نامعادله کدام است؟', opts: mc({ t: 'x' + REL[q.rel2] + q.x0 }, [{ t: 'x' + REL[q.a < 0 ? q.rel : flipRel(q.rel)] + q.x0, m: q.a < 0 ? 'تقسیم بر عددِ منفی جهت را برعکس می‌کند.' : 'تقسیم بر عددِ مثبت جهت را برعکس نمی‌کند.' }, { t: 'x' + REL[q.rel2] + (-q.x0), m: 'علامت عدد را اشتباه کرده‌ای.' }, { t: 'x' + REL[flipRel(q.rel2)] + (-q.x0), m: 'هم جهت و هم علامت اشتباه است.' }]), line: 'x' + REL[q.rel2] + q.x0, why: 'جواب نامعادله به دست آمد.' });
      steps.push({ ask: 'حالا جواب ' + M('x' + REL[q.rel2] + q.x0) + ' را به‌صورت بازه بنویس.', opts: mc({ t: interval(q.rel2, q.x0) }, wrongIntervals({ v: q.x0, rel: q.rel2 })), line: interval(q.rel2, q.x0), why: 'کروشه برای ≤ و ≥، پرانتز برای < و >، و بی‌نهایت همیشه پرانتز.' });
      return { tex: q.tex, steps: steps, end: 'جواب: ' + M(interval(q.rel2, q.x0)) };
    }
    /* ================= آزمون پایانی ================= */
    function mkF1() {
      var q = iq4(), right = q.rel === 'gt' || q.rel === 'ge', closed = q.rel === 'ge' || q.rel === 'le';
      return { type: 'mc', ask: 'این محور کدام بازه را نشان می‌دهد؟', fig: ray({ min: -5, max: 5, v: q.v, rel: q.rel }), opts: mc({ t: q.iv }, wrongIntervals(q)), why: 'سه پرسش را از محور بپرس: دایره روی ' + M(String(q.v)) + ' است؛ دایره ' + (closed ? 'توپر است (کروشه)' : 'توخالی است (پرانتز)') + '؛ ناحیهٔ سبز به سمت ' + (right ? 'راست' : 'چپ') + ' می‌رود (' + M(right ? '+\\infty' : '-\\infty') + ' با پرانتز). پس ' + M(q.iv) + '.' };
    }
    function mkF2() {
      var q = iq4(), right = q.rel === 'gt' || q.rel === 'ge', mk = function (rel, v) { return ray({ min: -4, max: 4, v: v, rel: rel, W: 280, H: 62, mini: 1 }); };
      var v = Math.max(-3, Math.min(3, q.v)); q = { v: v, rel: q.rel, tex: relTex(q.rel, v), iv: interval(q.rel, v) };
      var cand = [{ rel: q.rel, v: q.v, ok: 1 }, { rel: flipRel(q.rel), v: q.v, ok: 0 }, { rel: (q.rel === 'lt' ? 'le' : q.rel === 'le' ? 'lt' : q.rel === 'gt' ? 'ge' : 'gt'), v: q.v, ok: 0 }, { rel: q.rel, v: -q.v, ok: 0 }];
      cand = uniqBy(cand, function (c) { return c.rel + c.v; });
      if (cand.length < 4) { cand.push({ rel: flipRel(q.rel) === 'lt' ? 'le' : 'ge', v: q.v + 1, ok: 0 }); }
      return { type: 'mc', ask: 'بازهٔ ' + M(q.iv) + ' روی کدام محور درست نشان داده شده است؟', opts: shuffle(cand).slice(0, 4).map(function (c) { return { h: mk(c.rel, c.v), ok: !!c.ok }; }), why: 'دایرهٔ ' + (q.rel === 'ge' || q.rel === 'le' ? 'توپر (عدد مرزی جزو جواب است)' : 'توخالی (عدد مرزی جزو جواب نیست)') + ' و ناحیهٔ سبز به سمت ' + (q.rel === 'gt' || q.rel === 'ge' ? 'راست' : 'چپ') + '.' };
    }
    function mkF3() {
      var vs = shuffle([-3, -2, -1, 1, 2, 3, 4]).slice(0, 3), rels = shuffle(['lt', 'le', 'ge', 'gt']).slice(0, 3), left = rels.map(function (r, i) { return M(relTex(r, vs[i])); }), swap = function (r) { return r === 'lt' ? 'le' : r === 'le' ? 'lt' : r === 'gt' ? 'ge' : 'gt'; }, rows;
      rows = rels.map(function (r, i) { var v = vs[i], o = shuffle([{ t: plainIv(r, v), ok: 1 }, { t: plainIv(swap(r), v), ok: 0 }, { t: plainIv(flipRel(r), v), ok: 0 }, { t: plainIv(r, -v), ok: 0 }]); return { opts: o, key: o.findIndex(function (z) { return z.ok; }) }; });
      var key = rows.map(function (r) { return r.key; });
      return { type: 'match', ask: 'برای هر نامعادله، بازهٔ درست را از فهرست انتخاب کن.', left: left, rows: rows, key: key, why: 'کروشه برای ≤ و ≥ و پرانتز برای < و >؛ جهت بازه همان جهت نامعادله است.', show: left.map(function (l, i) { return l + ' ← ' + M(interval(rels[i], vs[i])); }).join('، ') };
    }
    function mkF4() {
      var q = iq4(), right = q.rel === 'gt' || q.rel === 'ge', closed = q.rel === 'ge' || q.rel === 'le',
        inSet = function (x) { return q.rel === 'lt' ? x < q.v : q.rel === 'gt' ? x > q.v : q.rel === 'le' ? x <= q.v : x >= q.v; },
        nums = [q.v, q.v + 1, q.v - 1, right ? q.v + 3 : q.v - 3],
        correct = nums.filter(inSet)[0];
      return {
        type: 'mc',
        ask: 'کدام عدد جزو جواب بازهٔ ' + M(q.iv) + ' است؟',
        opts: shuffle(nums.map(function (n) { return { h: M(String(n)), ok: n === correct }; })),
        why: 'عدد مرزی ' + M(String(q.v)) + (closed ? ' با کروشه جزو جواب است' : ' با پرانتز جزو جواب نیست') + '؛ عددهای سمتِ ' + (right ? 'راست' : 'چپ') + ' (ناحیهٔ سبز) جواب‌اند.'
      };
    }
    function mkF5() {
      var q = iqS('C'), mid = ax(q.a) + REL[q.rel] + (q.c - q.b), good = 'x' + REL[q.rel2] + q.x0, ivOk = interval(q.rel2, q.x0), kind = R(0, 3), L2 = good, L3 = ivOk, bad = -1, txt, w;
      if (kind === 0) { L2 = 'x' + REL[q.rel] + q.x0; L3 = interval(q.rel, q.x0); bad = 1; txt = 'خط ۲ نادرست است: در تقسیم بر ' + M(String(q.a)) + ' که منفی است، جهت علامت باید برگردد؛ پس ' + M(good) + ' و بازه ' + M(ivOk) + ' است.'; }
      else if (kind === 1) { L2 = 'x' + REL[q.rel2] + (-q.x0); L3 = interval(q.rel2, -q.x0); bad = 1; txt = 'خط ۲ نادرست است: ' + M(String(q.a * q.x0)) + ' تقسیم بر ' + M(String(q.a)) + ' برابر ' + M(String(q.x0)) + ' است، نه ' + M(String(-q.x0)) + '؛ جواب ' + M(good) + ' و بازه ' + M(ivOk) + ' است.'; }
      else if (kind === 2) { w = choose([wrongIntervals({ v: q.x0, rel: q.rel2 })[0], wrongIntervals({ v: q.x0, rel: q.rel2 })[3]]); L3 = w.t; bad = 2; txt = 'خط ۳ نادرست است: ' + w.m + ' درستش ' + M(ivOk) + ' است.'; }
      else { txt = 'هر سه خط درست است: جهت پس از تقسیم بر عدد منفی برگشته و بازه با پرانتز و کروشهٔ درست نوشته شده است.'; }
      return { type: 'mc', ask: 'نامعادلهٔ ' + M(q.tex) + ' را این‌طور حل کرده و جواب را به بازه نوشته‌اند:<ol class="e3-final-lines"><li>' + M(mid) + '</li><li>' + M(L2) + '</li><li>' + M(L3) + '</li></ol>کدام گزینه درست است؟', opts: [{ h: 'خط ۱ نادرست است', ok: false }, { h: 'خط ۲ نادرست است', ok: bad === 1 }, { h: 'خط ۳ نادرست است', ok: bad === 2 }, { h: 'هر سه خط درست است', ok: bad < 0 }], why: txt };
    }
    function mkF6() { var q = iqS(choose(['C', 'D', 'B'])), iv = interval(q.rel2, q.x0); return { type: 'mc', ask: 'جواب نامعادلهٔ ' + M(q.tex) + ' را به‌صورت بازه بنویس.', opts: mc({ t: iv }, wrongIntervals({ v: q.x0, rel: q.rel2 }).concat([{ t: interval(q.rel, q.x0), m: q.a < 0 ? 'تقسیم بر عددِ منفی جهت را برعکس می‌کند؛ این‌جا برعکس نشده است.' : 'جهتِ علامت اشتباه شده است.' }])), why: 'اول نامعادله را حل کن: ' + M('x' + REL[q.rel2] + q.x0) + '؛ بعد آن را با پرانتز یا کروشهٔ درست به‌صورت بازه بنویس: ' + M(iv) + '.' }; }
    /* ---------- تصویرهای ثابت درس: سه اطلاعاتِ یک جواب (عدد مرزی، جزو جواب بودن، جهت) ---------- */
    var HEADS = ['عدد مرزی', 'خودِ عدد هم جواب است؟', 'ناحیه به کدام سمت می‌رود؟'];
    function hl(x) { return '<span class="e4-hl">' + x + '</span>'; }
    function mini(kind) {
      var W = 132, y = 21, x = 44, g = '<svg class="e4-mini" viewBox="0 0 ' + W + ' 52" role="img" aria-hidden="true">';
      if (kind === 'dir') { g += '<rect class="e4-grow" x="' + x + '" y="' + (y - 4) + '" width="' + (W - 8 - x) + '" height="8" rx="4" fill="#7fd0c3"/>'; }
      g += '<line x1="8" y1="' + y + '" x2="' + (W - 8) + '" y2="' + y + '" stroke="#14213d" stroke-width="2.2"/><path d="M' + (W - 8) + ' ' + y + ' l-8 -4.5 v9 z" fill="#14213d"/><path d="M8 ' + y + ' l8 -4.5 v9 z" fill="#14213d"/>';
      if (kind === 'num') { g += '<circle class="e4-pulse" cx="' + x + '" cy="' + y + '" r="7" fill="none" stroke="#0e8f7e" stroke-width="2"/>'; }
      g += '<circle cx="' + x + '" cy="' + y + '" r="7" fill="#0e8f7e" stroke="#0e8f7e" stroke-width="3"' + (kind === 'flip' ? ' class="e4-flipc"' : '') + '/>';
      if (kind === 'num') { g += '<text x="' + x + '" y="48" text-anchor="middle" font-size="15" fill="#14213d" font-family="Tahoma,sans-serif">\u200E−' + F(3) + '</text>'; }
      return g + '</svg>';
    }
    function swap(a, b) { return '<span class="e4-sw"><span class="e4-sa">' + a + '</span><span class="e4-sb">' + b + '</span></span>'; }
    function ineqCell(h) { return ltr(M('x') + ' ' + (h === 'num' ? M('\\geq') : h === 'flip' ? hl(swap(M('\\geq'), M('>'))) : hl(M('\\geq'))) + ' ' + (h === 'num' ? hl(M('-3')) : M('-3'))); }
    function ivCell(h) { return ltr((h === 'flip' ? hl(swap(M('['), M('('))) : h === 'br' ? hl(M('[')) : M('[')) + (h === 'num' ? hl(M('-3')) : M('-3')) + M(',') + ' ' + (h === 'inf' ? hl(M('+\\infty')) : M('+\\infty')) + M(')')); }
    function rosetta() {
      var rows = [['نامعادله', ineqCell('num'), ineqCell('flip'), ineqCell('sign')], ['محور', mini('num'), mini('flip'), mini('dir')], ['بازه', ivCell('num'), ivCell('flip'), ivCell('inf')]],
        h = '<div class="e4-ros"><span></span>';
      HEADS.forEach(function (t, i) { h += '<span class="e4-ros-h"><i>' + F(i + 1) + '</i>' + t + (i === 1 ? '<small class="e4-ros-st"><b class="e4-sa">بله</b><b class="e4-sb">نه</b></small>' : '') + '</span>'; });
      rows.forEach(function (r) {
        h += '<span class="e3-tri-lab e4-ros-l">' + r[0] + '</span>';
        for (var i = 1; i < 4; i++) { h += '<span class="e4-ros-c">' + r[i] + '</span>'; }
      });
      return h + '</div>';
    }
    function decoder() {
      var dot = function (on) { return '<i class="e4-dot' + (on ? ' on' : '') + '"></i>'; };
      var cards = [
        ['دایره روی کدام عدد است؟', mini('num')],
        ['دایره توپر است یا توخالی؟', '<span class="e4-key">' + dot(1) + 'توپر</span><span class="e4-key">' + dot(0) + 'توخالی</span>'],
        ['ناحیهٔ سبز به کدام سمت می‌رود؟', '<span class="e4-key">→ راست</span><span class="e4-key" style="direction: ltr;">← چپ</span>']
      ];
      return '<div class="e4-dec">' + cards.map(function (c, i) { return '<div class="e4-dec-card"><span class="e4-dec-q"><i>' + F(i + 1) + '</i>' + c[0] + '</span><span class="e4-dec-a">' + c[1] + '</span></div>'; }).join('') + '</div>';
    }
    return {
      html: function () {
        var h = '<div class="e01-lesson e02-lesson e3x">';
        h += intro('یک جواب، سه زبان', 'نامعادلهٔ ' + M('3-2x\\leq 9') + ' را که حل کنی، به ' + M('x\\geq -3') + ' می‌رسی. این جواب فقط یک عدد نیست؛ <b>مجموعه‌ای از عددهاست</b> و همین مجموعه را می‌شود روی محور هم نشان داد و با نمادی کوتاه به نام بازه هم نوشت. در این درس بین این سه نوشته ترجمه می‌کنی و در پایان، همین نامعادله را از اول تا بازه حل می‌کنی.', ['نامعادله', 'محور', 'بازه', 'حل تا بازه']);
        h += K.sn('۱', 'سه زبانِ یک جواب');
        h += '<p>جوابِ ' + M('x\\geq -3') + ' را در هر سه زبان کنار هم ببین. هر ردیف یک زبان است و هر ستون یکی از سه اطلاعاتی که در هر سه زبان به شکلی دیگر نوشته می‌شود.</p>' + rosetta();
        h += activity('کارگاه مترجم سه‌زبانه', 'e04-trans', 'علامت را عوض کن و عدد مرزی را با نوار بلغزان؛ هر سه نوشته با هم تغییر می‌کنند.');
        h += '<p>با علامت‌های مختلف دیدی که توپر یا توخالی‌بودنِ دایره همیشه با کروشه یا پرانتز‌بودنِ بازه هم‌راه است. قاعده‌اش را کنار هم بگذاریم:</p>';
        h += K.box('note', 'قاعدهٔ دایره و پرانتز', '<ul><li>' + M('\\leq') + ' و ' + M('\\geq') + ': دایرهٔ <b>توپر</b> و <b>کروشه</b> ' + M('[\\ ]') + '؛ عدد مرزی جزو جواب است.</li><li>' + M('\\lt') + ' و ' + M('\\gt') + ': دایرهٔ <b>توخالی</b> و <b>پرانتز</b> ' + M('(\\ )') + '؛ عدد مرزی جزو جواب نیست.</li><li>بی‌نهایت (' + M('\\infty') + ') هرگز با کروشه نوشته نمی‌شود.</li></ul>');
        h += K.sn('۲', 'از محور به نامعادله و بازه');
        h += '<p>وقتی فقط محور را داری، سه پرسش از آن بپرس؛ جوابشان همان سه ستونِ جدول بالاست و با آن‌ها نامعادله و بازه نوشته می‌شود:</p>' + decoder();
        h += activity('کارگاه محورخوانی', 'e04-read', 'محور را بخوان؛ نخست نامعادله را و بعد بازه را انتخاب کن. اگر اشتباه کنی، دلیلش را می‌بینی.');
        h += K.box('err', '⚠ سه خطای رایج', '<ol><li>توخالی را با توپر قاطی‌کردن (و برعکس).</li><li>نوشتنِ ' + M('+\\infty') + ' با کروشه، مثل ' + M('[-3,\\ +\\infty]') + '؛ این درست نیست.</li><li>برعکس‌گرفتنِ جهت: ' + M('x\\lt -3') + ' به چپ می‌رود، نه راست.</li></ol>');
        h += K.sn('۳', 'از بازه به محور');
        h += '<p>گاهی هم عکسش لازم است: بازه را می‌بینی و باید محورِ درست را از میان چند شکل انتخاب کنی. سه نشانه کافی است:</p><ul><li>کروشه ← دایرهٔ توپر</li><li>پرانتز ← دایرهٔ توخالی</li><li>' + M('-\\infty') + ' سمت چپ و ' + M('+\\infty') + ' سمت راست</li></ul>';
        h += activity('کارگاه از بازه به محور', 'e04-draw', 'بازه را می‌بینی؛ از بین چهار محور، درستش را انتخاب کن. اگر اشتباه بود، پیام راهنما می‌بینی و می‌توانی دوباره انتخاب کنی.');
        h += K.sn('۴', 'حل تا بازه');
        h += '<p>به نامعادلهٔ اول درس برگردیم: ' + M('3-2x\\leq 9') + '. حلِ آن را از درس قبل داری (تقسیم بر عدد منفی جهت علامت را برمی‌گرداند)؛ بعد از حل، همان سه اطلاعات جدول جواب را به بازه می‌رسانند.</p>';
        h += exampleBlock('e04-example-steps', 'حل کامل تا بازه', 3);
        h += activity('کارگاه حل تا بازه', 'e04-full', 'در هر گام یک خط یا ترجمهٔ درست را انتخاب کن. آخرین گام نوشتن جواب با بازه است. با دکمهٔ چرخان مسئلهٔ تازه بگیر.');
        h += K.box('err', '⚠ خطای رایج: جهت پس از ضریب منفی', '<p>اگر در تقسیم بر عدد منفی جهت را برعکس نکنی، بازه به سمت اشتباه می‌رود؛ مثلاً به‌جای ' + M('[-3,\\ +\\infty)') + ' می‌نویسی ' + M('(-\\infty,\\ -3]') + '.</p>');
        h += K.sn('۵', 'آزمون پایانی');
        h += '<p>در آزمون پایانی، خواندن محور و ساختن آن از روی بازه، آزمایش عدد، خطایابی و حل تا بازه سنجیده می‌شود. شش سؤال در قالب‌های گوناگون، با عددهای تازه در هر دور.</p>';
        h += '<div id="e04-final" class="e01-interaction e01-final" aria-label="آزمون پایانی" data-activity></div>';
        h += K.box('sum', 'بعد از این درس باید بتوانی', '<ul><li>نامعادله را با محور و با بازه بنویسی و بین این سه زبان ترجمه کنی.</li><li>از روی محور، نامعادله و بازه را بخوانی و از روی بازه، محور را بسازی.</li><li>دایرهٔ توپر و توخالی و کروشه و پرانتز را درست به کار ببری.</li><li>بدانی بی‌نهایت همیشه با پرانتز نوشته می‌شود.</li><li>نامعادلهٔ خطی را حل کنی و جواب را مستقیم با بازه بنویسی.</li></ul>');
        return h + '</div>';
      },
      init: function () {
        var ros = document.querySelector('.e4-ros');
        if (ros && window.IntersectionObserver) {
          new IntersectionObserver(function (en) { ros.classList.toggle('live', en[0].isIntersecting); }).observe(ros);
        } else if (ros) { ros.classList.add('live'); }
        var $ = function (id) { return document.getElementById(id); };
        transLab($('e04-trans')); readLab($('e04-read')); drawLab($('e04-draw')); K.guide($('e04-full'), genFull);
        exampleBind('e04-example-steps', [
          { title: 'حل نامعادله', lines: ['3-2x\\leq 9', '-2x\\leq 6', 'x\\geq -3'], note: 'اول ' + M('3') + ' را کم می‌کنیم؛ بعد بر ' + M('-2') + ' تقسیم می‌کنیم و چون عدد منفی است، جهت ' + M('\\leq') + ' به ' + M('\\geq') + ' برمی‌گردد.' },
          { title: 'خواندن نوع علامت', lines: ['x\\geq -3', '@دایرهٔ توپر در ' + M('-3'), '@ناحیهٔ سبز به سمت راست'], note: 'علامت ' + M('\\geq') + ' یعنی عدد مرزی ' + M('-3') + ' جزو جواب است (دایرهٔ توپر) و جواب از ' + M('-3') + ' به سمت راست می‌رود.' },
          { title: 'نوشتن بازه', lines: ['[-3,\\ +\\infty)'], note: 'کروشه برای ' + M('-3') + ' چون جزو جواب است؛ پرانتز برای بی‌نهایت چون بی‌نهایت هرگز جزو جواب نیست.' }
        ]);
        H.final($('e04-final'), [mkF1, mkF2, mkF3, mkF4, mkF5, mkF6]);
      }
    };

  }
};
