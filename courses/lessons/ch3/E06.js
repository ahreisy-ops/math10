/* درس مهارت E06 — معادلهٔ حاصل‌ضربی (فصل ۳) */
window.LESSONS = window.LESSONS || {};
window.LESSONS.E06 = {
  needs: ['utils', 'gslider', 'exsteps', 'kit'],
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



    function more(label) { return '<div class="opts g-ops"><button type="button" class="btn primary" data-fresh data-scroll=".e02-problem-head" data-scroll-offset="100">' + label + '</button></div>'; }
    /* ---------- کارگاه گام‌به‌گام (انتخاب خط درست در هر گام؛ گام‌ها پشت‌سرهم می‌آیند) ----------
       gen() → {tex, steps:[{ask, opts:[{h,ok,m}], line, why}], end}؛ o.log=true → «مسیر ساخته‌شده» نمایش داده می‌شود */
    K.guide = function (root, gen, o) {
      var st = root.querySelector('[data-stage]'), p, si, tries, okIdx, last, wrong, log, done, withLog = !!(o && o.log);
      function nw() {
        p = gen(); si = 0; wrong = 0; log = []; done = false;
        tries = p.steps.map(function () { return []; }); okIdx = p.steps.map(function () { return undefined; }); last = p.steps.map(function () { return undefined; });
      }
      function paint() {
        var h = head(p.tex), j, s;
        for (j = 0; j <= si; j++) {
          s = p.steps[j];
          if (withLog && j) { h += '<div class="e3-sep"><div class="e5-cur"><span>معادلهٔ فعلی</span><div dir="ltr">' + M((function () { for (var q = j - 1; q >= 0; q--) { if (p.steps[q].line.indexOf('=') > -1) { return p.steps[q].line; } } return p.tex; })()) + '</div></div></div>'; }
          h += '<p class="ask e3-ask' + (j && !withLog ? ' e3-sep' : '') + '">' + F(j + 1) + '. ' + s.ask + '</p><div class="e01-answer-grid">' + s.opts.map(function (op, i) { var cl = okIdx[j] !== undefined ? (op.ok ? ' e01-right' : (tries[j].indexOf(i) > -1 ? ' e01-wrong' : '')) : (tries[j].indexOf(i) > -1 ? ' e01-wrong' : ''); return '<button type="button" class="btn e01-answer' + cl + '" data-pick="' + i + '"' + (okIdx[j] !== undefined || tries[j].indexOf(i) > -1 ? ' disabled' : '') + '>' + op.h + '</button>'; }).join('') + '</div>';
          if (last[j] !== undefined) { var lo = s.opts[last[j]]; h += mark(lo.ok, lo.ok ? '✓ درست است. ' + s.why + (done && j === si ? '<br><b>حل کامل شد' + (wrong ? '' : ' (بدون خطا)') + '.</b> ' + (p.end || '') : '') : lo.m); }
        }
        if (done) { h += '<div class="opts g-ops"><button type="button" class="btn" data-solution>راه‌حل کامل را ببین</button><button type="button" class="btn primary" data-fresh data-scroll=".e02-problem-head" data-scroll-offset="100">مسئلهٔ دیگر</button></div>'; }
        st.innerHTML = rr(h);
      }
      root.addEventListener('click', function (e) {
        var b = e.target.closest('button'), i; if (!b || b.disabled) { return; }
        if (b.hasAttribute('data-fresh')) { nw(); paint(); return; }
        if (b.hasAttribute('data-pick')) {
          i = +b.dataset.pick; last[si] = i;
          if (p.steps[si].opts[i].ok) { okIdx[si] = i; log.push(p.steps[si].line); if (si === p.steps.length - 1) { done = true; } else { si++; } }
          else { tries[si].push(i); wrong++; }
          paint();
        }
      });
      root.getProblem = function () { return p; };
      nw(); paint();
    };

    /* ---------- آزمون پایانی چندشکلی ----------
       makers: آرایه‌ای از تابع‌ها؛ هر تابع آیتمی مثل
       {type:'mc'|'multi'|'num'|'match', ask, fig?, opts:[{h,ok}], ans(num), left/right/key(match), why} برمی‌گرداند */

    var SC = ['#d6457a', '#4c5fd5', '#0e8f7e'];
    /* ---------- کارت‌های قاعده: معادله به‌جای توصیف (رنگ: st برای کل کارت‌ها یا r[2] برای هر ردیف) ---------- */
    function rules(rows, st) { return '<div class="e5-rules" style="--sc:' + SC[st || 0] + '">' + rows.map(function (r) { return '<div class="e5-rule"' + (r[2] !== undefined ? ' style="--sc:' + SC[r[2]] + '"' : '') + '><div class="eq" dir="ltr">' + M(r[1]) + '</div><p>' + r[0] + '</p></div>'; }).join('') + '</div>'; }
    function errPair(w, wt, r, rt) { function row(c, mk, t, q) { return '<div class="e5-er ' + c + '"><div class="what">' + t + '</div><div class="line"><span class="mk">' + mk + '</span><div class="eq" dir="ltr">' + M(q) + '</div></div></div>'; } return '<div class="e5-err">' + row('bad', '✗', w, wt) + row('ok', '✓', r, rt) + '</div>'; }
    function stepsNote(dlgId) {
      return '<dialog class=\"e02-example-dialog\" id=\"' + dlgId + '\" aria-labelledby=\"' + dlgId + '-t\"><div class=\"e02-example-dialog-header\"><strong id=\"' + dlgId + '-t\">راه‌حل کامل این مسئله</strong><button type=\"button\" class=\"btn primary\" data-sd-close aria-label=\"بستن پنجره\">بستن</button></div><div class=\"e02-example-dialog-content\" data-sd-body></div></dialog>';
    }
    function stepsBind(dlgId, forId, $) {
      var dlg = $(dlgId), root = $(forId), body = dlg.querySelector('[data-sd-body]');
      root.addEventListener('click', function (e) {
        if (!e.target.closest('[data-solution]')) { return; }
        var p = root.getProblem(), steps = [{ title: 'معادلهٔ اولیه', lines: [p.tex], note: '' }].concat(p.steps.map(function (s, i) { return { title: 'گام ' + F(i + 1), lines: [s.line], note: s.why }; }));
        steps[steps.length - 1].note += (p.end ? ' ' + p.end : '');
        body.innerHTML = rr((p.ov ? '<p class="e5-ov"><b>چرا این مسیر؟</b> ' + p.ov + '</p>' : '') + steps.map(function (s) { return '<section class="e02-example-step"><div class="e02-example-heading"><span class="e02-example-chip">' + s.title + '</span></div><div class="e02-example-lines">' + s.lines.map(function (l) { return '<div dir="ltr">' + M(l) + '</div>'; }).join('') + '</div>' + (s.note ? '<p class="e02-example-note">' + s.note + '</p>' : '') + '</section>'; }).join(''));
        dlg.showModal();
      });
      dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.closest('[data-sd-close]')) { dlg.close(); } });
    }
    /* ================= ابزارهای معادلهٔ حاصل‌ضربی ================= */
    var OR = '\\ \\text{یا}\\ ', AND = '\\ \\text{و}\\ ';
    var pv = function (v) { return v < 0 ? '(' + v + ')' : String(v); };
    function pairRoots(simple, lim) {
      var Lm = lim || 7, r1, r2, a1 = simple ? 1 : choose([1, 1, 2, 3]);
      do { r1 = nz(-Lm, Lm); r2 = nz(-Lm, Lm); } while (r1 === r2 || r1 === -r2 || r1 + r2 === r1 * r2);
      return { a1: a1, b1: -a1 * r1, a2: 1, b2: -r2, r1: r1, r2: r2, f1: lin(a1, -a1 * r1), f2: lin(1, -r2) };
    }
    var fac = function (s) { return '(' + s + ')'; };
    var eqTex = function (p) { return fac(p.f1) + fac(p.f2) + '=0'; };
    var rootsTex = function (p) { return 'x=' + p.r1 + OR + 'x=' + p.r2; };
    var sorted2 = function (p) { return [p.r1, p.r2].sort(function (a, b) { return a - b; }); };
    /* معادلهٔ kx²±kmx=0 و شکل عامل‌گرفته‌اش */
    function fform(k) {
      var m = R(2, 7), neg = R(0, 1), cf = k === 1 ? '' : String(k), sg = neg ? '+' : '-';
      return { k: k, m: m, neg: neg, cf: cf, sg: sg, r2: neg ? -m : m, fac: 'x' + sg + m, tex: cf + 'x^2' + sg + (k * m) + 'x=0', fx: cf + 'x(x' + sg + m + ')=0' };
    }
    /* ---------- کارگاه ۱: قانون ضرب صفر ---------- */
    function zeroLab(root) {
      var st = root.querySelector('[data-stage]'), p, found, MIN = -6, MAX = 6, TOTAL = MAX - MIN;
      function nw() { p = pairRoots(true, 5); found = []; draw(); }
      function draw() {
        st.innerHTML = rr(head(eqTex(p)) + '<div id="zl-gs"></div><div id="zl-live"></div>');
        GSlider.build(st.querySelector('#zl-gs'), {
          min: MIN, max: MAX, value: 0, label: 'عدد آزمایشی ' + M('x'), aria: 'عدد آزمایشی',
          cards: [{ name: 'عامل اول', tag: M(p.f1) }, { name: 'عامل دوم', tag: M(p.f2) }],
          paint: upd
        });
      }
      function upd(x) {
        var fs = [p.b1, p.b2], vals = [], cards = [], pr, zero, h, sorted = sorted2(p);
        fs.forEach(function (b) {
          var v = x + b; vals.push(v);
          cards.push({
            ev: rr(M(pv(x) + (b < 0 ? '-' + (-b) : '+' + b) + '=' + v)),
            status: v === 0 ? 'این عامل صفر شد' : rr('با جایگذاری ' + M('x=' + x)),
            state: v === 0 ? 'ok' : ''
          });
        });
        pr = vals[0] * vals[1]; zero = pr === 0;
        if (zero && found.indexOf(x) < 0) { found.push(x); }
        h = '<div class="e3-row"><span class="e3-pill ' + (zero ? 'ok' : 'bad') + '">حاصل‌ضرب: ' + M(pv(vals[0]) + '\\times' + pv(vals[1]) + '=' + pr) + '</span></div>';
        h += '<div class="e3-row"><span>جواب‌های پیداشده:</span>' + sorted.map(function (r) { return found.indexOf(r) > -1 ? '<span class="e3-pill ok">' + M('x=' + r) + '</span>' : '<span class="e3-pill">' + M('x=?') + '</span>'; }).join('') + '</div>';
        h += '<p class="e3-note">' + (zero ? 'یکی از عامل‌ها صفر شد؛ پس حاصل‌ضرب صفر است و این ' + M('x') + ' یک جواب معادله است.' : 'هیچ‌کدام از دو عامل صفر نیست؛ پس حاصل‌ضرب هم صفر نمی‌شود.') + '</p>';
        if (found.length === 2) { h += mark(true, '✓ هر دو جواب را پیدا کردی. اما نوار برای عددهای بزرگ یا کسری کند است؛ در بخش بعد جواب‌ها را مستقیم با محاسبه به دست می‌آوریم.'); }
        st.querySelector('#zl-live').innerHTML = rr(h);
        return { cards: cards };
      }
      root.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b && !b.disabled && b.hasAttribute('data-fresh')) { nw(); } });
      nw();
    }
    /* ---------- کارگاه ۲: ریشه‌یاب (دو ورودی) ---------- */
    function rootsLab(root) {
      var st = root.querySelector('[data-stage]'), p, tries, done, fbh;
      function parse(v) { v = (v || '').replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 1776; }).replace(/[−–—]/g, '-').replace(/\s/g, ''); return /^-?\d+$/.test(v) ? +v : null; }
      function nw() { p = pairRoots(false); tries = 0; done = false; fbh = ''; paint(); }
      function paint(v1, v2) {
        var ex = '<div class="ex"><p>هر عامل را جداگانه برابر صفر بگذار:</p>' + K.dm(p.f1 + '=0\\ \\Rightarrow\\ x=' + p.r1) + K.dm(p.f2 + '=0\\ \\Rightarrow\\ x=' + p.r2) + '</div>';
        st.innerHTML = rr('<div class="e02-problem-head"><span class="e02-problem-chip">' + M(eqTex(p)) + '</span><button type="button" class="btn primary e01-station-refresh" data-fresh title="معادلهٔ جدید" aria-label="معادلهٔ جدید">' + REFRESH + '</button></div><p class="ask e3-ask">دو جواب معادله را بنویس (به هر ترتیب).</p><div class="e3-numrow"><span class="lbl">' + M('x_1=') + '</span><input class="numin" id="r-1" type="text" inputmode="numeric" autocomplete="off" aria-label="جواب اول"' + (done ? ' disabled' : '') + 'placeholder="؟"><span class="lbl">' + M('x_2=') + '</span><input class="numin" id="r-2" type="text" inputmode="numeric" autocomplete="off" aria-label="جواب دوم"' + (done ? ' disabled' : '') + 'placeholder="؟"></div>' + fbh + (done ? ex + '' + more('مسئلهٔ دیگر') : '<div class="opts g-pair"><button type="button" class="btn" data-go>بررسی</button></div>'));
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
    function genFact(k) {
      var f = fform(k), cf = f.cf, rt = 'x=0' + OR + 'x=' + f.r2, flip = f.neg ? '-' : '+', steps = [], dv = k === 1 ? 'x' : 'عبارتِ دارای x';
      var w3 = k === 1
        ? { t: 'x^2(1' + f.sg + f.m + ')=0', m: 'x فقط یک‌بار مشترک است؛ ' + M('x^2') + ' و ' + M('x') + ' توان‌های متفاوت دارند.' }
        : { t: cf + 'x(x' + f.sg + (k * f.m) + ')=0', m: 'عدد ' + M(String(k * f.m)) + ' را هم باید بر ' + M(cf + 'x') + ' تقسیم کنی؛ داخل پرانتز ' + M(String(f.m)) + ' می‌ماند.' };
      steps.push({ ask: 'اول از دو جمله «عامل مشترک» می‌گیریم. خط بعدی کدام است؟', opts: mc({ t: f.fx }, [{ t: f.fac + '=0', m: 'این‌جا دو طرف را بر ' + dv + ' تقسیم کرده‌ای؛ اما تقسیم یک جواب را گم می‌کند. عامل بگیر، تقسیم نکن.' }, { t: cf + 'x(x' + flip + f.m + ')=0', m: 'علامت داخل پرانتز را اشتباه کرده‌ای: ' + M(f.tex) + ' یعنی ' + M(cf + 'x\\times x' + f.sg + cf + 'x\\times ' + f.m) + '.' }, w3]), line: f.fx, why: 'عامل مشترک ' + M(cf + 'x') + ' بیرون آمد.' });
      steps.push({ ask: 'حالا هر عامل را جداگانه برابر صفر می‌گذاریم. جواب‌ها کدام‌اند؟', opts: mc({ t: rt }, [{ t: 'x=' + f.r2, m: 'عاملِ ' + M(cf + 'x') + ' هم صفر می‌شود و ' + M('x=0') + ' هم جواب است.' }, { t: 'x=' + f.r2 + OR + 'x=' + -f.r2, m: 'جواب دوم ' + M('x=' + -f.r2) + ' نیست؛ عامل اول ' + M(cf + 'x=0') + ' را می‌دهد، یعنی ' + M('x=0') + '.' }, { t: 'x=0' + OR + 'x=' + -f.r2, m: 'علامتِ جواب دوم را اشتباه کرده‌ای: ' + M(f.fac + '=0') + ' می‌دهد ' + M('x=' + f.r2) + '.' }]), line: rt, why: 'عامل اول ' + M('x=0') + ' و عامل دوم ' + M('x=' + f.r2) + ' را می‌دهد.' });
      steps.push({ ask: 'اگر دو طرف ' + M(f.tex) + ' را بر ' + M('x') + ' تقسیم می‌کردیم، کدام جواب را از دست می‌دادیم؟', opts: mc({ t: M('x=0') }, [{ t: M('x=' + f.r2), m: 'این جواب باقی می‌ماند: ' + M(f.fac + '=0') + '.' }, { t: 'هیچ‌کدام', m: 'تقسیم بر x جوابِ ' + M('x=0') + ' را از بین می‌برد.' }, { t: 'هر دو جواب', m: 'فقط یکی از دو جواب گم می‌شود.' }], true), line: '\\div x\\ \\Rightarrow\\ x\\neq 0', why: 'تقسیم بر x ریشهٔ صفر را حذف می‌کند؛ برای همین باید عامل بگیری.' });
      return { tex: f.tex, steps: steps, end: 'جواب‌ها: ' + M(rt), ov: 'معادله هنوز حاصل‌ضرب نیست، ولی هر دو جمله‌اش x دارند. پس اول عامل مشترک می‌گیریم تا حاصل‌ضرب بسازیم، و بعد قانون ضرب صفر را به کار می‌بریم. تقسیم بر x جوابِ ' + M('x=0') + ' را گم می‌کند.' };
    }
    function genRoot() {
      var kind = choose(['a', 'b', 'c', 'd']);
      if (kind === 'c') { return genFact(1); }
      if (kind === 'd') { return genFact(choose([2, 3])); }
      var p = pairRoots(kind === 'a'), steps = [], rt = rootsTex(p);
      steps.push({ ask: 'اگر حاصل‌ضرب دو عامل صفر باشد، دست‌کم یکی از آن‌ها صفر است. خط بعدی کدام است؟', opts: mc({ t: p.f1 + '=0' + OR + p.f2 + '=0' }, [{ t: p.f1 + '=0' + AND + p.f2 + '=0', m: 'لازم نیست هر دو عامل با هم صفر شوند؛ «یا» درست است نه «و».' }, { t: p.f1 + '+' + p.f2 + '=0', m: 'حاصل‌ضرب را با جمع قاطی کرده‌ای.' }, { t: p.f1 + '=' + p.f2, m: 'دو عامل لزومی ندارد با هم برابر باشند؛ هر کدام جداگانه صفر می‌شود.' }]), line: p.f1 + '=0' + OR + p.f2 + '=0', why: 'قانون ضرب صفر.' });
      if (kind === 'a') {
        steps.push({ ask: 'هر معادله را حل کن. جواب‌ها کدام‌اند؟', opts: mc({ t: rt }, [{ t: 'x=' + -p.r1 + OR + 'x=' + -p.r2, m: 'علامت‌ها را عوض کرده‌ای: از ' + p.f1 + '=0 باید ' + M('x=' + p.r1) + ' بیاید.' }, { t: 'x=' + (p.r1 + p.r2), m: 'جمع دو ریشه، جواب نیست؛ دو جوابِ جداگانه داریم.' }, { t: 'x=' + p.r1 * p.r2, m: 'حاصل‌ضرب دو ریشه، جواب نیست؛ هر عامل جداگانه صفر می‌شود.' }, { t: 'x=' + -p.r1 + OR + 'x=' + p.r2, m: 'علامتِ یکی از جواب‌ها را اشتباه کرده‌ای.' }]), line: rt, why: 'هر عامل یک جواب داد.' });
      } else {
        var a = p.a1, bb = p.b1;
        steps.push({ ask: 'عامل اول را حل کن: ' + M(p.f1 + '=0') + '. خط بعدی کدام است؟', opts: mc({ t: 'x=' + p.r1 }, [{ t: 'x=' + -bb, m: 'بعد از جابه‌جایی باید بر ضریب ' + a + ' هم تقسیم کنی.' }, { t: 'x=' + -p.r1, m: 'علامت را اشتباه کرده‌ای.' }, { t: 'x=' + bb, m: 'علامت و تقسیم هر دو اشتباه‌اند.' }]), line: 'x=' + p.r1, why: M(ax(a) + '=' + -bb) + ' و ' + M('x=' + p.r1) + '.' });
        steps.push({ ask: 'عامل دوم را حل کن: ' + M(p.f2 + '=0') + '. جواب‌های معادله کدام‌اند؟', opts: mc({ t: rt }, [{ t: 'x=' + p.r1 + OR + 'x=' + -p.r2, m: 'علامتِ جواب دوم را عوض کرده‌ای: از ' + p.f2 + '=0 باید ' + M('x=' + p.r2) + ' بیاید.' }, { t: 'x=' + -bb + OR + 'x=' + p.r2, m: 'جواب اولین عامل ' + M('x=' + p.r1) + ' است.' }, { t: 'x=' + p.r1 }]), line: rt, why: 'هر عامل یک جواب داد.' });
      }
      return { tex: eqTex(p), steps: steps, end: 'جواب‌ها: ' + M(rt), ov: kind === 'a' ? 'معادله از اول حاصل‌ضرب است و ضریب ' + M('x') + ' در هر عامل ۱ است؛ پس هر عامل را جدا صفر می‌گذاریم.' : 'معادله از اول حاصل‌ضرب است، اما یک عامل ضریب دارد؛ بعد از صفر گذاشتنِ هر عامل، بر ضریب تقسیم می‌کنیم.' };
    }
    /* ================= آزمون پایانی ================= */
    function mkH1() { var p = pairRoots(true); return { type: 'mc', ask: 'جواب‌های معادلهٔ ' + M(eqTex(p)) + ' کدام‌اند؟', opts: mc({ t: rootsTex(p) }, [{ t: 'x=' + -p.r1 + OR + 'x=' + -p.r2, m: 'علامت‌ها را عوض کرده‌ای.' }, { t: 'x=' + p.r1 * p.r2, m: 'حاصل‌ضرب دو ریشه جواب نیست.' }, { t: 'x=' + (p.r1 + p.r2), m: 'جمع دو ریشه جواب نیست.' }, { t: 'x=' + -p.r1 + OR + 'x=' + p.r2, m: 'علامتِ یکی از جواب‌ها اشتباه است.' }]), why: 'هر عامل را جداگانه صفر بگذار: ' + M(p.f1 + '=0') + ' و ' + M(p.f2 + '=0') + '؛ پس ' + M(rootsTex(p)) + '.' }; }
    function mkH2() { var p = pairRoots(false); while (p.a1 === 1) { p = pairRoots(false); } return { type: 'mc', ask: 'جواب‌های معادلهٔ ' + M(eqTex(p)) + ' کدام‌اند؟', opts: mc({ t: rootsTex(p) }, [{ t: 'x=' + p.b1 * -1 + OR + 'x=' + p.r2, m: 'بر ضریب ' + p.a1 + ' تقسیم نکرده‌ای.' }, { t: 'x=' + p.r1 + OR + 'x=' + -p.r2, m: 'علامتِ جواب دوم اشتباه است.' }, { t: 'x=' + -p.r1 + OR + 'x=' + -p.r2, m: 'علامت‌ها عوض شده‌اند.' }, { t: 'x=' + p.b1 + OR + 'x=' + -p.r2, m: 'علامت و تقسیم هر دو اشتباه‌اند.' }]), why: M(p.f1 + '=0') + ' می‌دهد ' + M('x=' + p.r1) + ' و ' + M(p.f2 + '=0') + ' می‌دهد ' + M('x=' + p.r2) + '.' }; }
    function mkH3() {
      var k = choose([1, 1, 2, 3]), f = fform(k), r = f.r2, w = function (t) { return M(t); };
      return { type: 'mc', ask: 'جواب‌های معادلهٔ ' + M(f.tex) + ' کدام‌اند؟', opts: mc({ t: M('x=0' + OR + 'x=' + r) }, [{ t: 'فقط ' + M('x=' + r), m: 'این‌جا دو طرف را تقسیم کرده‌ای و جوابِ ' + M('x=0') + ' را گم کرده‌ای.' }, { t: M('x=' + r + OR + 'x=' + -r), m: 'جواب دوم ' + M('x=' + -r) + ' نیست؛ عامل اول ' + M((f.cf) + 'x=0') + ' می‌دهد ' + M('x=0') + '.' }, { t: M('x=0' + OR + 'x=' + -r), m: 'علامتِ جواب دوم اشتباه است.' }], true), why: 'عامل مشترک بگیر: ' + M(f.fx) + '؛ پس ' + M('x=0') + ' یا ' + M('x=' + r) + '. تقسیم بر x جواب ' + M('x=0') + ' را گم می‌کند.' };
    }
    function mkH4() {
      var q, f, big, tex, ex;
      if (R(0, 1)) { q = pairRoots(false); big = Math.max(q.r1, q.r2); tex = eqTex(q); ex = 'جواب‌ها ' + M(rootsTex(q)) + ' هستند؛ بزرگ‌تر ' + M(String(big)) + ' است.'; }
      else { f = fform(choose([1, 2, 3])); big = Math.max(0, f.r2); tex = f.tex; ex = 'عامل مشترک بگیر: ' + M(f.fx) + '؛ جواب‌ها ' + M('x=0' + OR + 'x=' + f.r2) + ' هستند و بزرگ‌تر ' + M(String(big)) + ' است.'; }
      return { type: 'num', ask: 'معادلهٔ ' + M(tex) + ' را حل کن. جوابِ <b>بزرگ‌تر</b> را بنویس.', lbl: 'x=', ans: big, show: M(String(big)), why: ex };
    }
    function mkH5() {
      var p = pairRoots(false), f = fform(choose([1, 2, 3])), a = choose([2, 3, 4, 5]), x0 = nz(-6, 6);
      var right = ['هر عامل را جدا برابر صفر می‌گذاریم', 'عامل مشترک می‌گیریم تا حاصل‌ضرب بسازیم', 'مثل یک معادلهٔ خطیِ ساده حل می‌کنیم'], order = shuffle([0, 1, 2]);
      return { type: 'match', ask: 'هر معادله را به نخستین کاری که لازم دارد وصل کن.', left: [M(eqTex(p)), M(f.tex), M(lin(a, -a * x0) + '=0')], right: order.map(function (i) { return right[i]; }), key: [0, 1, 2].map(function (i) { return order.indexOf(i); }), show: 'حاصل‌ضرب‌شده ← هر عامل را صفر بگذار؛ دو جملهٔ دارای x ← عامل مشترک؛ ' + M('ax+b=0') + ' ← معادلهٔ خطی', why: 'اگر معادله از اول حاصل‌ضرب برابر صفر است، هر عامل را جدا صفر می‌گذاریم؛ اگر حاصل‌ضرب نیست ولی در هر جمله ' + M('x') + ' هست، عامل مشترک می‌گیریم؛ و معادلهٔ خطیِ ساده با همان روش درس‌های قبل حل می‌شود.' };
    }
    function mkH6() {
      var kind = R(0, 2), L1, L2, L3, bad, txt, p, f;
      if (R(0, 1)) {
        p = pairRoots(false); L1 = eqTex(p);
        if (kind === 0) { L2 = p.f1 + '=0' + AND + p.f2 + '=0'; L3 = rootsTex(p); bad = 1; txt = 'سطر ۲ نادرست است: لازم نیست هر دو عامل با هم صفر شوند؛ باید «یا» بنویسی، نه «و».'; }
        else if (kind === 1) { L2 = p.f1 + '=0' + OR + p.f2 + '=0'; L3 = 'x=' + -p.r1 + OR + 'x=' + p.r2; bad = 2; txt = 'سطر ۳ نادرست است: از ' + M(p.f1 + '=0') + ' می‌رسیم به ' + M('x=' + p.r1) + '، نه ' + M('x=' + -p.r1) + '.'; }
        else { L2 = p.f1 + '=0' + OR + p.f2 + '=0'; L3 = rootsTex(p); bad = -1; txt = 'همهٔ سطرها درست‌اند: هر عامل جداگانه صفر شده و علامت‌ها درست جابه‌جا شده‌اند.'; }
      } else {
        f = fform(choose([1, 2, 3])); L1 = f.tex;
        if (kind === 0) { L2 = f.fac + '=0'; L3 = 'x=' + f.r2; bad = 1; txt = 'سطر ۲ نادرست است: دو طرف را تقسیم کرده‌ای و جواب ' + M('x=0') + ' گم شده است. درست‌اش عامل‌گیری است: ' + M(f.fx) + '.'; }
        else if (kind === 1) { L2 = f.fx; L3 = 'x=' + f.r2; bad = 2; txt = 'سطر ۳ نادرست است: عاملِ ' + M(f.cf + 'x') + ' هم صفر می‌شود؛ جواب‌ها ' + M('x=0' + OR + 'x=' + f.r2) + ' هستند.'; }
        else { L2 = f.fx; L3 = 'x=0' + OR + 'x=' + f.r2; bad = -1; txt = 'همهٔ سطرها درست‌اند: عامل مشترک گرفته شده و هر عامل جداگانه صفر شده است.'; }
      }
      return { type: 'mc', ask: 'معادلهٔ ' + M(L1) + ' به این صورت حل شده است:<ol class="e3-final-lines"><li>' + M(L1) + '</li><li>' + M(L2) + '</li><li>' + M(L3) + '</li></ol>کدام گزینه درست است؟', opts: [{ h: 'سطر ۲ نادرست است', ok: bad === 1 }, { h: 'سطر ۳ نادرست است', ok: bad === 2 }, { h: 'همهٔ سطرها درست‌اند', ok: bad < 0 }, { h: 'سطر ۱ نادرست است', ok: false }], why: txt };
    }
    return {
      html: function () {
        var h = '<div class="e01-lesson e02-lesson e3x">';
        h += intro('وقتی حاصل‌ضرب صفر می‌شود', 'تا اینجا برای حل معادله، ' + M('x') + ' را تنها می‌کردی. اما در ' + M('x^2-5x=0') + ' دو جملهٔ ناهم‌نوع داریم و نمی‌شود آن‌ها را جمع کرد. راهش یک حقیقتِ ساده است: اگر حاصل‌ضربِ چند عدد صفر شود، دست‌کم یکی‌شان صفر است. با این حقیقت، چنین معادله‌ای به چند معادلهٔ خطیِ آشنا شکسته می‌شود.', ['قانون ضرب صفر', 'حل هر عامل', 'عامل مشترک', 'مسیر کامل']);
        h += K.sn('۱', 'قانون ضرب صفر');
        h += '<p>هر عددی را در ' + M('0') + ' ضرب کنی صفر می‌شود، و برعکس: اگر حاصل‌ضرب دو عدد صفر باشد، یکی از آن‌ها حتماً صفر بوده است. حاصل‌ضرب مثل دری است که با یک کلید صفر باز می‌شود؛ کافی است یکی از عامل‌ها صفر باشد. همین حقیقت را برای عبارت‌های جبری هم به کار می‌بریم:</p>';
        h += rules([['اگر حاصل‌ضرب صفر باشد، دست‌کم یک عامل صفر است', 'A\\times B=0\\ \\Rightarrow\\ A=0' + OR + 'B=0'], ['نمونه: هر عامل را جداگانه صفر می‌گذاریم', '(x-2)(x+5)=0\\ \\Rightarrow\\ x-2=0' + OR + 'x+5=0']], 1);
        h += '<p>طبق این قانون، جواب‌های ' + M('(x-2)(x+5)=0') + ' همان عددهایی‌اند که یکی از دو عامل را صفر می‌کنند. بیا این را خودت پیدا کنی: در کارگاه زیر یک معادلهٔ مشابه داری؛ عدد آزمایشی را عوض کن و ببین حاصل‌ضرب چه موقع صفر می‌شود.</p>';
        h += activity('کارگاه ضرب صفر', 'e06-zero', 'عدد آزمایشی را با نوار حرکت بده. هر وقت یکی از دو عامل صفر شود، حاصل‌ضرب صفر می‌شود و آن عدد به فهرست جواب‌ها اضافه می‌شود.');
        h += '<p>دیدی که حاصل‌ضرب فقط وقتی صفر است که یکی از عامل‌ها صفر باشد. برای هیچ عدد دیگری این نتیجه برقرار نیست: بی‌شمار جفت عدد حاصل‌ضربشان ' + M('6') + ' است.</p>';
        h += K.box('note', 'شرط قانون: طرف دیگر صفر باشد', '<p>از ' + M('A\\times B=6') + ' نمی‌شود نتیجه گرفت ' + M('A=2') + ' یا ' + M('B=3') + '. این قانون فقط برای حاصل‌ضربِ برابر صفر کار می‌کند.</p>');
        h += K.sn('۲', 'حل هر عامل');
        h += '<p>قانون می‌گوید معادله به دو معادلهٔ جدا تبدیل می‌شود، و هر کدام یک معادلهٔ خطی ساده است. مثال زیر را گام‌به‌گام ببین و مراقب ضریب ' + M('x') + ' و علامت باش:</p>';
        h += K.exampleSteps.html('e06-example-steps', 3, 'حل کامل معادلهٔ حاصل‌ضربی', null, 'steps');
        h += '<p>در مثال دیدی هر عامل جدا حل می‌شود و جواب‌ها در معادلهٔ اصلی صدق می‌کنند. حالا خودت با معادله‌های تازه امتحانش کن.</p>';
        h += activity('کارگاه ریشه‌یاب', 'e06-roots', 'دو جواب را بنویس (به هر ترتیب). اگر علامت‌ها را عوض کنی، پیام راهنما می‌بینی. برای معادلهٔ تازه، دکمهٔ چرخان را بزن.');
        h += K.box('err', '⚠ خطای رایج: علامتِ جواب', '<p>معادلهٔ عامل: ' + ltr(M('x+5=0')) + '</p>' + errPair('علامتِ ' + M('5') + ' عوض نشد', 'x+5=0\\ \\Rightarrow\\ x=\\textcolor{firebrick}{5}', 'عدد با جابه‌جایی علامتش را عوض می‌کند', 'x+5=0\\ \\Rightarrow\\ x=\\textcolor{seagreen}{-5}') + '<p>راه تشخیص: جواب را در عامل بگذار. ' + ltr(M('5+5=10')) + ' صفر نیست، ولی ' + ltr(M('-5+5=0')) + '.</p>');
        h += '<p>تا اینجا معادله از اول به شکل «حاصل‌ضرب = صفر» بود. اگر نباشد چه؟ مثل ' + M('x^2-5x=0') + '؛ اگر بتوانیم آن را به حاصل‌ضرب تبدیل کنیم، همین دو بخش کارش را راه می‌اندازند.</p>';
        h += K.sn('۳', 'ساختنِ حاصل‌ضرب با عامل مشترک');
        h += '<p>در ' + M('x^2-5x=0') + ' هر دو جمله ' + M('x') + ' دارند. وقتی ' + M('x') + ' را بیرون بکشیم، حاصل‌ضرب ساخته می‌شود و قانون ضرب صفر کارش را شروع می‌کند. مثال زیر را گام‌به‌گام ببین:</p>';
        h += K.exampleSteps.html('e06-example-factor', 3, 'حل کامل با عامل مشترک', null, 'steps');
        h += '<p>در مثال، ' + M('x=0') + ' هم یکی از جواب‌ها بود. حالا خودت امتحان کن؛ گام آخر نشان می‌دهد تقسیم بر ' + M('x') + ' چه چیزی را از دست می‌دهد.</p>';
        h += activity('کارگاه عامل مشترک', 'e06-factor', 'در هر گام خط درست را انتخاب کن.');
        h += stepsNote('e06-sd-factor');
        h += K.box('err', '⚠ خطای رایج: تقسیم بر x', '<p>معادلهٔ اصلی: ' + ltr(M('x^2-5x=0')) + '</p>' + errPair('دو طرف بر ' + M('x') + ' تقسیم شد', 'x^2-5x=0\\ \\Rightarrow\\ \\textcolor{firebrick}{x-5=0}\\ \\Rightarrow\\ x=5', 'عامل مشترک گرفته شد', 'x(x-5)=0\\ \\Rightarrow\\ x=\\textcolor{seagreen}{0}' + OR + 'x=5') + '<p>راه تشخیص: ' + ltr(M('x=0')) + ' را در معادلهٔ اصلی بگذار؛ ' + ltr(M('0^2-5\\times0=0')) + ' برقرار است، پس ۰ هم جواب است و تقسیم آن را گم کرده بود.</p>');
        h += K.sn('۴', 'مسیر کامل');
        h += '<p>حالا هر سه تکه را داری. مسیر کامل همان سه مرحلهٔ نوارِ بالای هر بخش است؛ گاهی معادله از اول حاصل‌ضرب است و مرحلهٔ اول لازم نیست:</p>';
        h += rules([['۱. عامل مشترک بگیر (به همراه ضریب) تا «حاصل‌ضرب برابر با صفر» بسازی', '3x^2+12x=0\\ \\Rightarrow\\ 3x(x+4)=0', 0], ['۲. هر عامل را جدا برابر صفر بگذار', '3x=0' + OR + 'x+4=0', 1], ['۳. هر معادله را حل کن', 'x=0' + OR + 'x=-4', 2]]);
        h += activity('کارگاه مسیر حل', 'e06-full', 'مسئله‌ها از چهار نوع‌اند: عامل‌های ساده، عامل با ضریب، عامل مشترک و عامل مشترک با ضریب. خودت یک معادله را از ابتدا تا انتها حل کن: در هر گام خط درست را انتخاب کن.');
        h += stepsNote('e06-sd-full');
        h += K.sn('۵', 'آزمون پایانی');
        h += '<p>در آزمون پایانی، قانون ضرب صفر، حل عامل‌ها، عامل مشترک، انتخاب نخستین کار و پیداکردن اشتباه در یک راه‌حل سنجیده می‌شود. شش سؤال در قالب‌های گوناگون، با عددهای تازه در هر دور.</p>';
        h += '<div id="e06-final" class="e01-interaction e01-final" aria-label="آزمون پایانی" data-activity></div>';
        h += K.box('sum', 'بعد از این درس باید بتوانی', '<ul><li>قانون ضرب صفر را بگویی و بدانی فقط برای حاصل‌ضربِ برابر صفر کار می‌کند.</li><li>هر عامل را صفر بگذاری و جواب را با علامت درست (و با تقسیم بر ضریب) پیدا کنی.</li><li>در معادله‌هایی مثل ' + M('x^2-5x=0') + ' عامل مشترک بگیری و جواب ' + M('x=0') + ' را گم نکنی.</li><li>اشتباه یک راه‌حل را پیدا کنی.</li></ul>');
        return h + '</div>';
      },
      init: function () {
        var $ = function (id) { return document.getElementById(id); };
        zeroLab($('e06-zero')); rootsLab($('e06-roots'));
        K.guide($('e06-factor'), function () { return genFact(1); }, { log: true }); K.guide($('e06-full'), genRoot, { log: true });
        stepsBind('e06-sd-factor', 'e06-factor', $); stepsBind('e06-sd-full', 'e06-full', $);
        K.exampleSteps.bind('e06-example-steps', [
          { title: 'قانون ضرب صفر', lines: ['(2x-6)(x+1)=0', '2x-6=0' + OR + 'x+1=0'], note: 'حاصل‌ضرب صفر است؛ پس دست‌کم یکی از دو عامل صفر است.' },
          { title: 'حل هر عامل', lines: ['2x-6=0\\ \\Rightarrow\\ 2x=6\\ \\Rightarrow\\ x=3', 'x+1=0\\ \\Rightarrow\\ x=-1'], note: 'در عامل اول، پس از بردنِ ۶ باید بر ۲ تقسیم کنیم.' },
          { title: 'آزمایش جواب‌ها', lines: ['x=3:\\ (2\\times3-6)(3+1)=0\\times4=0\\ \\color{teal}{\\checkmark}', 'x=-1:\\ (2\\times(-1)-6)(-1+1)=(-8)\\times0=0\\ \\color{teal}{\\checkmark}'], note: 'با هر دو جواب، یکی از عامل‌ها صفر می‌شود.' }
        ], 'steps');
        K.exampleSteps.bind('e06-example-factor', [
          { title: 'عامل مشترک', lines: ['x^2-5x=0', 'x(x-5)=0'], note: 'هر دو جمله ' + M('x') + ' دارند. بیرون‌کشیدن آن همان توزیعِ برعکس است: ' + M('x(x-5)=x^2-5x') + '.' },
          { title: 'قانون ضرب صفر', lines: ['x=0' + OR + 'x-5=0', 'x=0' + OR + 'x=5'], note: 'خودِ ' + M('x') + ' هم یک عامل است؛ پس ' + M('x=0') + ' هم جواب است.' },
          { title: 'آزمایش جواب‌ها', lines: ['x=0:\\ 0^2-5\\times0=0\\ \\color{teal}{\\checkmark}', 'x=5:\\ 5^2-5\\times5=25-25=0\\ \\color{teal}{\\checkmark}'], note: 'هر دو جواب در معادلهٔ اصلی صدق می‌کنند.' }
        ], 'steps');
        H.final($('e06-final'), [mkH1, mkH2, mkH3, mkH4, mkH5, mkH6]);
      }
    };

  }
};
