/* درس مهارت E05 — معادله‌های دارای کسر و عبارت جبری (فصل ۳) */
window.LESSONS = window.LESSONS || {};
window.LESSONS.E05 = {
  needs: ['utils', 'gslider', 'exsteps', 'kit'],
  setup: function (K0) {
    var ML = window.MathLite, F = ML.fa, rr = ML.renderRich, abs = Math.abs, _u = K0._u, R = _u.R, M = _u.M, shuffle = _u.shuffle;
    var K = Object.create(K0), H = K0.lk(K), T = String.raw;
    var ltr = function (h) { return '<bdi style="direction:ltr;unicode-bidi:isolate">' + h + '</bdi>'; };
    var choose = function (a) { return a[R(0, a.length - 1)]; };
    var nz = function (a, b) { var v = 0; while (v === 0) { v = R(a, b); } return v; };
    var sgn = function (n) { return n < 0 ? '-' + (-n) : '+' + n; };
    var coef = function (a) { return a === 1 ? '' : a === -1 ? '-' : String(a); };
    var ax = function (a) { return coef(a) + 'x'; };
    var lin = function (a, b) { var s = ax(a); if (b > 0) { s += '+' + b; } else if (b < 0) { s += '-' + (-b); } return s; };
    var fm = function (n) { return n < 0 ? '(' + n + ')' : String(n); };
    var REL = { lt: '\\lt ', gt: '\\gt ', le: '\\leq ', ge: '\\geq ' }, RELT = { lt: '<', gt: '>', le: '≤', ge: '≥' };
    var RELS = ['lt', 'gt', 'le', 'ge'];
    var uniqBy = _u.uniqBy, mc = _u.mc;
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
      return { tex: tex, steps: steps, end: 'جواب: ' + M('x=' + x0), ov: { one: 'کسر تنهاست؛ پس اول عددِ کنارش را کنار می‌گذاریم تا کسر تنها بماند، و بعد ضرب در مخرج آن را از بین می‌برد.', cross: 'صورتِ کسر دو جمله دارد و مخرج فقط یک عدد است؛ ضرب در همان عدد مخرج را برمی‌دارد و یک معادلهٔ خطیِ ساده می‌ماند.', two: 'دو کسر با مخرج‌های متفاوت داریم؛ ک.م.م مخرج‌ها هر دو را یک‌جا از بین می‌برد.' }[kind] };
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
      return { tex: tex, steps: steps, end: 'جواب: ' + M('x=' + x0), ov: { p1: 'پرانتز جلوی جمله‌های x را گرفته است؛ پس اول باز می‌شود، و بعد x‌ها یک طرف و عددها طرف دیگر می‌روند.', neg: 'منفیِ جلوی پرانتز علامتِ هر دو جمله‌ی داخلش را برمی‌گرداند؛ بعد از بازشدن، معادله یک معادلهٔ خطیِ معمولی است.' }[kind] };
    }
    function genMix() { return R(0, 1) ? genFrac() : genParen(); }
    /* ---------- کارگاه: مخرج صفر ---------- */
    function zeroLab(root) {
      var st = root.querySelector('[data-stage]'), k = 3, x = 0, c = 1, a = 0, sw = false, den = 'x-3';
      var MIN = -4, MAX = 8, TOTAL = MAX - MIN;
      function nw() {
        k = nz(-3, 5); c = choose([1, 1, 2, 3]); a = R(-3, 3); x = 0; sw = R(0, 1) === 1;
        if (c * k + a === 0) { a = a === 3 ? 2 : a + 1; }
        den = 'x' + (k > 0 ? '-' + k : '+' + (-k));
      }
      function pv(v) { return v < 0 ? '(' + v + ')' : String(v); }
      function sg(v) { return v === 0 ? '' : (v > 0 ? '+' : '-') + abs(v); }
      function sides() {
        var kk = c * k + a, w = [
          { tag: (c === 1 ? '' : c) + 'x' + sg(a), sub: function (v) { return (c === 1 ? '' : c + '\\cdot ') + pv(v) + sg(a); }, num: function (v) { return c * v + a; } },
          { tag: String(kk), sub: function () { return String(kk); }, num: function () { return kk; } }
        ];
        return sw ? [w[1], w[0]] : w;
      }
      function texNum(v) { return String(Math.round(v * 100) / 100); }
      function draw() {
        var S = sides();
        st.innerHTML = rr(
          '<div class="e02-problem-head"><span class="e02-problem-chip">' + M(dfr(sides()[0].tag, den) + '=' + dfr(sides()[1].tag, den)) + '</span><button type="button" class="btn primary e01-station-refresh" data-fresh title="عدد دیگر" aria-label="عدد دیگر">' + REFRESH + '</button></div>' +
          '<div id="z-gs"></div><div id="z-note"></div>'
        );
        GSlider.build(st.querySelector('#z-gs'), {
          min: MIN, max: MAX, value: x, target: k, label: 'عدد آزمایشی ' + M('x'), aria: 'عدد آزمایشی',
          cards: [{ name: 'سمت چپ', tag: M(dfr(S[0].tag, den)) }, { name: 'سمت راست', tag: M(dfr(S[1].tag, den)) }],
          paint: upd
        });
      }
      function upd(x2) {
        var d = x2 - k, bad = d === 0, S = sides(), dn = pv(x2) + (k > 0 ? '-' + k : '+' + (-k));
        x = x2;
        st.querySelector('#z-note').innerHTML = bad ? rr(
          '<div class="fb bad" role="status">مخرج برابر صفر است؛ این عدد قابل‌قبول نیست.</div>' +
          '<div class="ex">اگر دو طرف را در ' + M(den) + ' ضرب کنیم به ' + M('x=' + k) + ' می‌رسیم، اما همین مقدار مخرج را صفر می‌کند؛ پس معادله <b>جواب ندارد</b>. همیشه بعد از حل، جواب را در مخرج‌ها بررسی کن.</div>'
        ) : rr('<div class="e3-row"><span class="e3-pill bad">سمت چپ و راست برابر نیستند؛ پس این عدد جواب نیست.</span></div>');
        return { cards: S.map(function (q) {
          var nv = q.num(x2);
          return {
            ev: bad ? '<span class="gs-undef">تعریف‌نشده</span>' : rr(M(dfr(q.sub(x2), dn) + '=' + dfr(nv, d) + '=' + texNum(nv / d))),
            status: bad ? 'مخرج صفر است' : 'با جایگذاری ' + M('x=' + x2),
            state: bad ? 'bad' : ''
          };
        }) };
      }
      root.addEventListener('click', function (e) {
        var b = e.target.closest('button');
        if (!b || b.disabled) { return; }
        if (b.hasAttribute('data-fresh')) { nw(); draw(); }
      });
      nw(); draw();
    }

    /* ---------- کارگاه: پرانتزبازکن ---------- */
    function distLab(root) {
      var st = root.querySelector('[data-stage]'), p, done;
      function nw() { var a = choose([2, 3, 4, -1, -2, -3]), b = nz(-6, 6), c = nz(-5, 7); while (c === 0) { c = nz(-5, 7); } p = { a: a, b: b, c: c, done: [false, false] }; done = false; }
      function paint() {
        var a = p.a, b = p.b, c = p.c, A = a * 1, B = a * b, ex = (a === -1 ? '-' : a) + '(x' + sgn(b) + ')', res = [xs(a), (B < 0 ? '' : '+') + B];
        var inner = '<span class="e3-pill ' + (p.done[0] ? 'ok' : '') + '">' + M(xs(a)) + '</span><span class="e3-pill ' + (p.done[1] ? 'ok' : '') + '">' + M((B < 0 ? '' : '+') + B) + '</span>';
        st.innerHTML = rr('<div class="e02-problem-head"><span class="e02-problem-chip">' + M(ex) + '</span><button type="button" class="btn primary e01-station-refresh" data-fresh title="عبارت جدید" aria-label="عبارت جدید">' + REFRESH + '</button></div><p class="e3-note">عددِ ' + M(String(a)) + ' بیرونِ پرانتز است. آن را در هر جملهٔ داخل پرانتز ضرب کن (روی هر دکمه بزن):</p><div class="e3-row"><button type="button" class="e3-op' + (p.done[0] ? ' is-on' : '') + '" data-t="0">' + M(fm(a) + '\\times x') + '</button><button type="button" class="e3-op' + (p.done[1] ? ' is-on' : '') + '" data-t="1">' + M(fm(a) + '\\times(' + b + ')') + '</button></div><div class="e3-eq" style="font-size:1.2rem">' + M(ex + '=' + (p.done[0] ? xs(a) : '?') + (p.done[1] ? (B < 0 ? '' : '+') + B : '+\\,?')) + '</div>' + (p.done[0] && p.done[1] ? mark(true, '✓ هر دو جمله را ضرب کردی: ' + M(ex + '=' + xs(a) + (B < 0 ? '' : '+') + B) + '. توجه: ' + (a < 0 ? 'ضرب در عددِ منفی علامتِ جمله‌ها را عوض می‌کند.' : 'علامتِ جملهٔ دوم به علامتِ ' + b + ' بستگی دارد.')) : (p.done[0] !== p.done[1] ? mark(false, 'فقط یک جمله را ضرب کرده‌ای؛ پرانتز دو جمله دارد و عدد بیرون باید در هر دو ضرب شود.') : '')));
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
      var k = R(2, 6), m, n;
      if (R(0, 1)) {
        return { type: 'mc', ask: 'جواب معادلهٔ زیر کدام است؟<div class="e3-eq" style="margin-top:6px">' + M(dfr('x', 'x-' + k) + '=' + dfr(k, 'x-' + k)) + '</div>', opts: shuffle([{ h: M('x=' + k), ok: false }, { h: 'هر عددی به‌جز ' + M(String(k)), ok: false }, { h: M('x=0'), ok: false }, { h: 'معادله جواب ندارد', ok: true }]), why: 'اگر دو طرف را در ' + M('x-' + k) + ' ضرب کنیم، به ' + M('x=' + k) + ' می‌رسیم؛ ولی ' + M('x=' + k) + ' مخرج را صفر می‌کند و قابل‌قبول نیست؛ پس معادله جواب ندارد.' };
      }
      m = choose([2, 3, 4]); n = choose([1, 2]);
      return { type: 'mc', ask: 'جواب معادلهٔ زیر کدام است؟<div class="e3-eq" style="margin-top:6px">' + M(dfr(m * n, 'x-' + k) + '=' + m) + '</div>', opts: shuffle([{ h: M('x=' + (k + n)), ok: true }, { h: M('x=' + k), ok: false }, { h: M('x=' + n), ok: false }, { h: 'معادله جواب ندارد', ok: false }]), why: 'دو طرف را در ' + M('x-' + k) + ' ضرب کن: ' + M(m * n + '=' + m + '(x-' + k + ')') + '، پس ' + M('x-' + k + '=' + n) + ' و ' + M('x=' + (k + n)) + '. این عدد مخرج را صفر نمی‌کند (مخرج می‌شود ' + M(String(n)) + ')، پس قابل‌قبول است.' };
    }
    function mkG5() {
      var a = choose([2, 3, 4]), b = nz(-6, 6), c = choose([1, 2, 3, 5].filter(function (z) { return z !== a; })), x0 = nz(-6, 8), d = a * (x0 + b) - c * x0;
      var d1 = choose([2, 3, 4]), d2 = choose([5, 6]), L = lcm(d1, d2), x1 = L * R(1, 3), c2 = x1 / d1 + x1 / d2, k = R(2, 6);
      var right = ['باز کردن پرانتز', 'ضرب در ک.م.م مخرج‌های عددی', 'ضرب در مخرجِ دارای x، و سنجش جواب در پایان'], order = shuffle([0, 1, 2]);
      return { type: 'match', ask: 'هر معادله را به نخستین کاری که لازم دارد وصل کن.', left: [M(a + '(x' + sgn(b) + ')=' + lin(c, d)), M(dfr('x', d1) + '+' + dfr('x', d2) + '=' + c2), M(dfr('x', 'x-' + k) + '+1=' + dfr(k, 'x-' + k))], right: order.map(function (i) { return right[i]; }), key: [0, 1, 2].map(function (i) { return order.indexOf(i); }), show: 'معادلهٔ پرانتزی ← باز کردن پرانتز؛ کسرهای عددی ← ضرب در ک.م.م؛ مخرجِ دارای x ← ضرب در آن مخرج و سنجش در پایان', why: 'پرانتز جلوی جمع‌شدنِ x‌ها را می‌گیرد؛ مخرج‌های عددی با ک.م.م از بین می‌روند؛ و مخرجی که x دارد ممکن است صفر شود، پس جواب را باید در پایان سنجید.' };
    }
    function mkG6p() {
      var a = choose([2, 3, 4]), b = nz(-6, 6), c = choose([1, 2, 3, 5].filter(function (z) { return z !== a; })), x0 = nz(-6, 8), d = a * (x0 + b) - c * x0, ab = a * b, m = a - c, kind = R(0, 2), L1 = a + '(x' + sgn(b) + ')=' + lin(c, d), L2, L3, bad, txt;
      if (kind === 0) { L2 = eqs(xs(a) + sgn(b), lin(c, d)); L3 = eqs(xs(m), d - b); bad = 1; txt = 'سطر ۲ نادرست است: عدد ' + a + ' باید در جملهٔ دوم پرانتز هم ضرب شود (' + M(sgn(ab)) + ' نه ' + M(sgn(b)) + ').'; }
      else if (kind === 1) { L2 = eqs(xs(a) + sgn(ab), lin(c, d)); L3 = eqs(xs(m), d + ab); bad = 2; txt = 'سطر ۳ نادرست است: ' + M(sgn(ab)) + ' با جابه‌جایی باید علامتش عوض شود و ' + M(String(d - ab)) + ' بشود.'; }
      else { L2 = eqs(xs(a) + sgn(ab), lin(c, d)); L3 = eqs(xs(m), d - ab); bad = -1; txt = 'همهٔ سطرها درست‌اند: پرانتز کامل باز شده و جمله‌ها با تغییر علامت جابه‌جا شده‌اند.'; }
      return { type: 'mc', ask: 'معادلهٔ ' + M(L1) + ' به این صورت حل شده است:<ol class="e3-final-lines"><li>' + M(L1) + '</li><li>' + M(L2) + '</li><li>' + M(L3) + '</li></ol>کدام گزینه درست است؟', opts: [{ h: 'سطر ۲ نادرست است', ok: bad === 1 }, { h: 'سطر ۳ نادرست است', ok: bad === 2 }, { h: 'همهٔ سطرها درست‌اند', ok: bad < 0 }, { h: 'سطر ۱ نادرست است', ok: false }], why: txt };
    }
    function mkG6f() {
      var d1 = choose([2, 3, 4, 5]), d2 = choose([2, 3, 4, 5, 6]); while (d2 === d1) { d2 = choose([2, 3, 4, 5, 6]); }
      var L = lcm(d1, d2), x0 = L * R(1, 3), c = x0 / d1 + x0 / d2, pp = L / d1, qq = L / d2, kind = R(0, 2), L1 = dfr('x', d1) + '+' + dfr('x', d2) + '=' + c, L2, L3, bad, txt;
      if (kind === 0) { L2 = eqs(xs(pp) + '+' + xs(qq), c); L3 = eqs('x', rat(c, pp + qq)); bad = 1; txt = 'سطر ۲ نادرست است: ضرب در ' + L + ' باید به عدد طرف راست هم برسد؛ درستش ' + M(eqs(xs(pp) + '+' + xs(qq), L * c)) + ' است.'; }
      else if (kind === 1) { L2 = eqs(xs(pp) + '+' + xs(qq), L * c); L3 = eqs('x', L * c); bad = 2; txt = 'سطر ۳ نادرست است: ' + M(xs(pp) + '+' + xs(qq) + '=' + xs(pp + qq)) + ' و باید بر ' + (pp + qq) + ' تقسیم کنی؛ درستش ' + M('x=' + x0) + ' است.'; }
      else { L2 = eqs(xs(pp) + '+' + xs(qq), L * c); L3 = eqs('x', x0); bad = -1; txt = 'همهٔ سطرها درست‌اند: ضرب در ' + L + ' روی همهٔ جمله‌ها انجام شده و بعد بر ' + (pp + qq) + ' تقسیم شده است.'; }
      return { type: 'mc', ask: 'معادلهٔ ' + M(L1) + ' به این صورت حل شده است:<ol class="e3-final-lines"><li>' + M(L1) + '</li><li>' + M(L2) + '</li><li>' + M(L3) + '</li></ol>کدام گزینه درست است؟', opts: [{ h: 'سطر ۲ نادرست است', ok: bad === 1 }, { h: 'سطر ۳ نادرست است', ok: bad === 2 }, { h: 'همهٔ سطرها درست‌اند', ok: bad < 0 }, { h: 'سطر ۱ نادرست است', ok: false }], why: txt };
    }
    function mkG6() { return R(0, 1) ? mkG6p() : mkG6f(); }
    /* ---------- جایگاه هر بخش در مسیر چهارمرحله‌ای حل ---------- */
    var STAGES = ['باز کردن پرانتز', 'حذف مخرج', 'حل معادلهٔ خطی', 'سنجش جواب'];
    function stageTag(i) { return '<div class="e5-tag" style="--sc:' + SC[i] + '" aria-label="جایگاه این بخش در مسیر حل">' + STAGES.map(function (s, k) { return '<span class="' + (k === i ? 'on' : '') + '">' + F(k + 1) + '. ' + s + '</span>'; }).join('<i aria-hidden="true">←</i>') + '</div>'; }
    /* ---------- کارت‌های قاعده: معادله به‌جای توصیف ---------- */
    var SC = ['#d6457a', '#4c5fd5', '#0e8f7e', '#b8860b'];
    function rules(rows, st) { return '<div class="e5-rules" style="--sc:' + SC[st || 0] + '">' + rows.map(function (r) { return '<div class="e5-rule"><div class="eq" dir="ltr">' + M(r[1]) + '</div><p>' + r[0] + '</p></div>'; }).join('') + '</div>'; }
    function errPair(w, wt, r, rt) { function row(c, mk, t, q) { return '<div class="e5-er ' + c + '"><div class="what">' + t + '</div><div class="line"><span class="mk">' + mk + '</span><div class="eq" dir="ltr">' + M(q) + '</div></div></div>'; } return '<div class="e5-err">' + row('bad', '✗', w, wt) + row('ok', '✓', r, rt) + '</div>'; }

    /* ---------- ماشین مرحله‌ها: تشخیص بده معادله از کدام مرحله‌ها می‌گذرد ---------- */
    var addc = function (n) { return n === 0 ? '' : n > 0 ? '+' + n : '-' + (-n); };
    function genMachine() {
      var kind = choose(['paren', 'frac', 'both', 'lin']), r = { need: [kind === 'paren' || kind === 'both', kind === 'frac' || kind === 'both'] }, x0, V, a, b, c, d, ab;
      if (kind === 'paren') {
        a = choose([2, 3, 4]); b = nz(-6, 6); c = choose([1, 2, 3, 5].filter(function (z) { return z !== a; })); x0 = nz(-6, 8); d = a * (x0 + b) - c * x0; ab = a * b; V = a * (x0 + b);
        r.tex = a + '(x' + sgn(b) + ')=' + lin(c, d);
        r.st = [[eqs(xs(a) + sgn(ab), lin(c, d))], null, [eqs(xs(a - c), d - ab), 'x=' + x0], [a + '(' + x0 + sgn(b) + ')=' + V, c + '\\times' + fm(x0) + addc(d) + '=' + V]];
      } else if (kind === 'frac') {
        var d1 = choose([2, 3, 4, 5]), d2 = choose([2, 3, 4, 5, 6]); while (d2 === d1) { d2 = choose([2, 3, 4, 5, 6]); }
        var L = lcm(d1, d2), pp = L / d1, qq = L / d2; x0 = L * R(1, 3); c = x0 / d1 + x0 / d2;
        r.tex = dfr('x', d1) + '+' + dfr('x', d2) + '=' + c;
        r.st = [null, [eqs(xs(pp) + '+' + xs(qq), L * c)], [eqs(xs(pp + qq), L * c), 'x=' + x0], [dfr(x0, d1) + '+' + dfr(x0, d2) + '=' + c]];
      } else if (kind === 'both') {
        d = choose([2, 3, 4]); var k = nz(-3, 4); x0 = d * k; a = choose([2, 3]); b = nz(-4, 4); var e = a * (x0 + b) - k; ab = a * b; V = a * (x0 + b);
        r.tex = a + '(x' + sgn(b) + ')=' + dfr('x', d) + addc(e);
        r.st = [[eqs(xs(a) + sgn(ab), dfr('x', d) + addc(e))], [eqs(xs(d * a) + sgn(d * ab), 'x' + addc(d * e))], [eqs(xs(d * a - 1), d * e - d * ab), 'x=' + x0], [a + '(' + x0 + sgn(b) + ')=' + V, dfr(x0, d) + addc(e) + '=' + V]];
      } else {
        a = choose([3, 4, 5]); c = choose([1, 2]); b = nz(-6, 6); x0 = nz(-6, 8); d = a * x0 + b - c * x0; V = a * x0 + b;
        r.tex = lin(a, b) + '=' + lin(c, d);
        r.st = [null, null, [eqs(xs(a - c), d - b), 'x=' + x0], [a + '\\times' + fm(x0) + addc(b) + '=' + V, c + '\\times' + fm(x0) + addc(d) + '=' + V]];
      }
      return r;
    }
    function machine(root) {
      var st = root.querySelector('[data-stage]'), p, ans, ran, msg;
      function nw() { p = genMachine(); ans = [null, null]; ran = false; msg = ''; }
      function paint() {
        var h = head(p.tex), i;
        h += '<p class="ask e3-ask">کدام مرحله‌ها برای این معادله لازم‌اند؟</p><div class="e5-mach">';
        for (i = 0; i < 2; i++) {
          h += '<div class=\"e5-stn\" style=\"--sc:' + SC[i] + '\"><div class=\"e5-stn-h\"><i>' + F(i + 1) + '</i><span>' + STAGES[i] + '</span></div><div class=\"e5-stn-c\"><button type=\"button\" class=\"btn' + (ans[i] === 1 ? ' on' : '') + '\" data-ch=\"' + i + ':1\"' + (ran ? ' disabled' : '') + '>لازم است</button><button type=\"button\" class=\"btn' + (ans[i] === 0 ? ' on' : '') + '\" data-ch=\"' + i + ':0\"' + (ran ? ' disabled' : '') + '>لازم نیست</button></div></div>';
        }
        h += '</div><div class=\"e5-always\"><span>این دو مرحله در هر معادله کار می‌کنند:</span><b style=\"--sc:' + SC[2] + '\">' + F(3) + '. ' + STAGES[2] + '</b><i aria-hidden=\"true\">←</i><b style=\"--sc:' + SC[3] + '\">' + F(4) + '. ' + STAGES[3] + '</b></div>';
        if (!ran) { h += '<div class="opts g-ops"><button type="button" class="btn primary" data-run' + (ans[0] === null || ans[1] === null ? ' disabled' : '') + '>ماشین را روشن کن</button></div>' + msg; }
        else {
          h += '<div class="e5-belt"><div class="e5-belt-in"><span>ورودی</span><div dir="ltr">' + M(p.tex) + '</div></div>';
          for (i = 0; i < 4; i++) {
            var on = i >= 2 || p.need[i];
            h += '<div class="e5-belt-row ' + (on ? 'on' : 'off') + '" style="--sc:' + SC[i] + ';animation-delay:' + (i * 0.18).toFixed(2) + 's"><span class="n">' + F(i + 1) + '</span><b>' + STAGES[i] + '</b><div class="eqs">' + (on ? p.st[i].map(function (q) { return '<div dir="ltr">' + M(q) + '</div>'; }).join('') : '<small>بدون کار</small>') + '</div></div>';
          }
          h += '</div>' + mark(true, '<b>درست تشخیص دادی.</b> فقط مرحله‌های لازم کار کردند.') + more('معادلهٔ دیگر');
        }
        st.innerHTML = rr(h);
      }
      root.addEventListener('click', function (e) {
        var b = e.target.closest('button'), w, bad = []; if (!b || b.disabled) { return; }
        if (b.hasAttribute('data-fresh')) { nw(); paint(); return; }
        if (b.hasAttribute('data-ch')) { w = b.dataset.ch.split(':'); ans[+w[0]] = +w[1]; msg = ''; paint(); return; }
        if (b.hasAttribute('data-run')) {
          if (ans[0] !== (p.need[0] ? 1 : 0)) { bad.push(p.need[0] ? 'در این معادله پرانتز هست؛ تا باز نشود، جمله‌های x جمع نمی‌شوند.' : 'این معادله پرانتز ندارد؛ مرحله ۱ کاری ندارد.'); }
          if (ans[1] !== (p.need[1] ? 1 : 0)) { bad.push(p.need[1] ? 'در این معادله کسر هست؛ مخرج‌ها باید حذف شوند.' : 'این معادله کسر ندارد؛ مرحله ۲ کاری ندارد.'); }
          if (bad.length) { msg = mark(false, bad.join('<br>')); } else { ran = true; msg = ''; }
          paint();
        }
      });
      nw(); paint();
    }

    /* ---------- دیالوگ «مراحل حل این مسئله» (آیکون i) ---------- */
    return {
      html: function () {
        var h = '<div class="e01-lesson e02-lesson e3x">';
        h += intro('کسرها و پرانتزها را از سر راه برداریم', 'معادله‌ای که پرانتز یا کسر دارد، با چند حرکتِ مشخص به همان معادلهٔ خطیِ آشنا تبدیل می‌شود. فقط یک تله هست: جوابی که مخرج را صفر کند، جواب نیست.', ['باز کردن پرانتز', 'حذف مخرج', 'مخرج صفر', 'ماشین مرحله‌ها']);
        h += K.sn('۱', 'باز کردن پرانتز') + stageTag(0);
        h += '<p>پرانتز مثل یک بسته است: عددی که جلوی آن ایستاده باید به همهٔ چیزهای داخلش برسد. تا بسته باز نشود، جمله‌های ' + M('x') + ' نمی‌توانند با هم جمع شوند؛ پس باز کردن پرانتز یعنی رساندنِ عددِ بیرون به تک‌تکِ جمله‌های داخل.</p>';
        h += K.exampleSteps.html('e05-example-dist', 3, 'حل کامل معادلهٔ پرانتزی', null, 'steps');
        h += '<p>در مثال دیدی عددِ بیرون به هر دو جمله رسید و منفیِ جلوی پرانتز علامت‌ها را برگرداند. حالا خودت با عبارت‌های تازه امتحانش کن.</p>';
        h += activity('کارگاه پرانتزبازکن', 'e05-dist', 'عددِ بیرون را به هر دو جمله برسان؛ روی هر دو ضرب بزن.');
        h += K.box('err', '⚠ خطای رایج: ضرب فقط در جملهٔ اول', '<p>معادلهٔ اصلی: ' + ltr(M('2(x-3)=x+4')) + '</p>' + errPair('عدد ۲ فقط به جملهٔ اول رسید', '2x\\textcolor{firebrick}{-3}=x+4\\ \\Rightarrow\\ x=7', 'عدد ۲ به هر دو جملهٔ پرانتز می‌رسد', '2x\\textcolor{seagreen}{-6}=x+4\\ \\Rightarrow\\ x=10') + '<p>راه تشخیص: جواب را در معادلهٔ اصلی بگذار. طرف چپ ' + ltr(M('2(7-3)=8')) + ' می‌شود ولی طرف راست ' + ltr(M('7+4=11')) + '؛ پس ' + ltr(M('x=7')) + ' جواب نیست.</p>');
        h += K.sn('۲', 'حذف مخرج') + stageTag(1);
        h += '<p>پرانتزها که رفتند، نوبت کسرهاست. کسر یعنی تقسیم و جمع‌کردنش دردسر دارد؛ اما اگر دو طرف را در عددی ضرب کنیم که همهٔ مخرج‌ها آن را بشمارند (ک.م.م)، کسرها یک‌جا ناپدید می‌شوند و همان معادلهٔ خطیِ آشنا می‌ماند.</p>';
        h += K.exampleSteps.html('e05-example-steps', 3, 'حل کامل معادلهٔ کسری', null, 'steps');
        h += '<p>در مثال، ضرب در ک.م.م به همهٔ جمله‌ها رسید، حتی به عددِ تنها. حالا خودت امتحان کن.</p>';
        h += activity('کارگاه حذف مخرج', 'e05-frac', 'سه شکل معادله می‌آید: کسرِ تنها با عددی کنارش، کسر با صورتِ دوجمله‌ای، و دو کسر با مخرج‌های متفاوت. در هر گام خط درست را انتخاب کن.');
        h += K.exampleSteps.dialogHtml('e05-sd-frac', 'راه‌حل کامل این مسئله');
        h += K.box('err', '⚠ خطای رایج: جا انداختنِ عددِ تنها', '<p>معادلهٔ اصلی: ' + ltr(M(dfr('x', 2) + '+' + dfr('x', 3) + '=5')) + '</p>' + errPair('عددِ ' + M('5') + ' ضرب نشد', '5x=\\textcolor{firebrick}{5}\\ \\Rightarrow\\ x=1', 'همهٔ جمله‌ها ضرب می‌شوند', '5x=\\textcolor{seagreen}{30}\\ \\Rightarrow\\ x=6') + '<p>سنجش: با ' + ltr(M('x=1')) + ' طرف چپ ' + ltr(M(dfr('1', 2) + '+' + dfr('1', 3) + '=' + dfr(5, 6))) + ' می‌شود ولی طرف راست ' + M('5') + ' است.</p>');
        h += K.sn('۳', 'خطرِ مخرجِ صفر') + stageTag(3);
        h += '<p>کسرها که رفتند، یک نگرانی می‌ماند: ضرب در مخرج یعنی ضرب در عبارتی که ممکن است صفر شود. وقتی ' + M('x') + ' در مخرج است، جوابی که مخرج را صفر کند قابل‌قبول نیست.</p>';
        h += rules([['ضرب در ' + M('x-3'), dfr('x', 'x-3') + '=' + dfr(3, 'x-3') + '\\ \\Rightarrow\\ x=3'], [M('x=3') + ' مخرج را صفر می‌کند؛ پس جواب نیست', 'x-3=3-3=0']], 3);
        h += '<p>پس همیشه باید دید جواب، مخرج را صفر می‌کند یا نه.</p>';
        h += activity('کارگاه مخرج صفر', 'e05-zero', 'نوار را حرکت بده و مقدار دو طرف را ببین؛ عددی را پیدا کن که مخرج را صفر می‌کند. همان‌جا دو طرف «تعریف‌نشده» می‌شوند و دلیلش ظاهر می‌شود.');
        h += K.box('note', 'همیشه بسنج', '<p>پس از حل معادله‌ای که مخرجِ شاملِ ' + M('x') + ' دارد، جواب را در همهٔ مخرج‌ها بگذار. اگر مخرجی صفر شد، آن جواب قابل‌قبول نیست.</p>');
        h += K.sn('۴', 'ماشین مرحله‌ها');
        h += '<p>هر معادله را با چهار کار پشت‌سرهم حل می‌کنیم (همان چهار کار نوارِ بالای هر بخش). اما همهٔ معادله‌ها به هر چهار کار نیاز ندارند: اگر پرانتز یا کسر نباشد، دو کار اول لازم نیست.</p>';
        h += activity('ماشین مرحله‌ها', 'e05-machine', 'برای هر معادله مشخص کن کدام‌یک از دو مرحلهٔ اول لازم است (مرحلهٔ ۳ و ۴ همیشه انجام می‌شوند)، بعد «ماشین را روشن کن» را بزن تا ببینی معادله از چه مسیری حل می‌شود.');
        h += activity('کارگاه مسیر حل', 'e05-solve', 'حالا خودت یک معادله را از ابتدا تا انتها حل کن: در هر گام خط درست را انتخاب کن.');
        h += K.exampleSteps.dialogHtml('e05-sd-solve', 'راه‌حل کامل این مسئله');
        h += K.sn('۵', 'آزمون پایانی');
        h += '<p>در آزمون پایانی، معادله‌های کسری، پرانتزی و مخرج‌صفر سنجیده می‌شوند. شش سؤال در قالب‌های گوناگون، با عددهای تازه در هر دور.</p>';
        h += '<div id="e05-final" class="e01-interaction e01-final" aria-label="آزمون پایانی" data-activity></div>';
        h += K.box('sum', 'بعد از این درس باید بتوانی', '<ul><li>پرانتز را با توزیع کامل باز کنی و مراقب علامتِ منفیِ پشت پرانتز باشی.</li><li>معادلهٔ دارای کسر را با ضرب در ک.م.م (روی همهٔ جمله‌ها) حل کنی.</li><li>بدانی جوابی که مخرج را صفر کند قابل‌قبول نیست و در مخرج‌ها بسنجی.</li><li>نخستین سطر نادرستِ یک راه‌حل را پیدا کنی.</li></ul>');
        return h + '</div>';
      },
      init: function () {
        var $ = function (id) { return document.getElementById(id); };
        K.guide($('e05-frac'), genFrac, { log: false }); distLab($('e05-dist')); zeroLab($('e05-zero')); K.guide($('e05-solve'), genMix, { log: true }); machine($('e05-machine')); K.exampleSteps.bindDialog('e05-sd-frac', $('e05-frac'), function () { return K.exampleSteps.problemSteps($('e05-frac').getProblem()); }); K.exampleSteps.bindDialog('e05-sd-solve', $('e05-solve'), function () { return K.exampleSteps.problemSteps($('e05-solve').getProblem()); });
        K.exampleSteps.bind('e05-example-steps', [
          { title: 'مخرج مشترک', lines: ['\\dfrac{x}{2}+\\dfrac{x}{3}=5', '@ک.م.م ' + M('2') + ' و ' + M('3') + ' برابر ' + M('6') + ' است'], note: 'کوچک‌ترین عددی که ۲ و ۳ هر دو آن را می‌شمارند، ۶ است.' },
          { title: 'ضرب در ۶', lines: ['6\\times\\dfrac{x}{2}+6\\times\\dfrac{x}{3}=6\\times5', '3x+2x=30', '5x=30'], note: 'همهٔ جمله‌ها، از جمله ۵ طرف راست، در ۶ ضرب می‌شوند.' },
          { title: 'حل و آزمایش', lines: ['x=\\dfrac{30}{5}=6', '\\dfrac{6}{2}+\\dfrac{6}{3}=3+2=5\\ \\color{teal}{\\checkmark}'], note: 'جواب را جایگذاری می‌کنیم؛ دو طرف برابرند.' }
        ], 'steps');
        K.exampleSteps.bind('e05-example-dist', [
          { title: 'باز کردن پرانتزها', lines: ['2(x-3)-(x-4)=9', '2x-6-x+4=9'], note: 'عدد ۲ در هر دو جملهٔ پرانتز اول ضرب می‌شود. علامت منفیِ پشت پرانتز دوم، علامت هر دو جمله را عوض می‌کند: ' + M('-(x-4)=-x+4') + '.' },
          { title: 'جمع جمله‌های مشابه', lines: ['2x-x-6+4=9', 'x-2=9'], note: 'جمله‌های ' + M('x') + ' را با هم و عددها را با هم جمع می‌کنیم.' },
          { title: 'حل و آزمایش', lines: ['x=11', '2(11-3)-(11-4)=16-7=9\\ \\color{teal}{\\checkmark}'], note: 'جواب را جایگذاری می‌کنیم؛ دو طرف برابرند.' }
        ], 'steps');
        H.final($('e05-final'), [mkG1, mkG2, mkG3, mkG4, mkG5, mkG6]);
      }
    };

  }
};
