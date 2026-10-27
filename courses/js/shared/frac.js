/* موتور کسر و ورودی کسر (gcd, F, fadd, ..., gen2, xplain, judge) — K.fr */
(function () {
  'use strict';
  var K0 = window.CourseKit, ML = window.MathLite, fa = ML.fa, esc = ML.esc, rr = ML.renderRich, abs = Math.abs, df = K0.df, NS = 'http://www.w3.org/2000/svg', $ = function (id) { return document.getElementById(id); };
  var _u = K0._u, R = _u.R, M = _u.M, parse = _u.parse;
    /* ======================= کسرها: ابزارهای درس‌های کسر ======================= */
    var gcd = function (a, b) { a = abs(a); b = abs(b); while (b) { var t = a % b; a = b; b = t; } return a; };
    var lcm = function (a, b) { return a / gcd(a, b) * b; };
    var divisors = function (n) { var o = [], i; for (i = 1; i <= n; i++) { if (n % i === 0) { o.push(i); } } return o; };
    var F = function (n, d) { if (d < 0) { n = -n; d = -d; } var g = gcd(n, d) || 1; return { n: n / g, d: d / g }; };
    var feq = function (x, y) { return x.n * y.d === y.n * x.d; };
    var fadd = function (x, y) { return F(x.n * y.d + y.n * x.d, x.d * y.d); };
    var fneg = function (x) { return { n: -x.n, d: x.d }; };
    var fmul = function (x, y) { return F(x.n * y.n, x.d * y.d); };
    var inv = function (x) { return x.n < 0 ? { n: -x.d, d: -x.n } : { n: x.d, d: x.n }; };
    var fdiv = function (x, y) { return fmul(x, inv(y)); };
    var fr = function (n, d) { return (n < 0 ? '-' : '') + '\\dfrac{' + abs(n) + '}{' + d + '}'; };
    var ft = function (f) { return f.d === 1 ? '' + f.n : fr(f.n, f.d); };
    var fp = function (f) { return f.n < 0 ? '\\left(' + ft(f) + '\\right)' : ft(f); };
    var fh = function (f) {
      if (f.d === 1) { return '<bdi dir="ltr">' + (f.n < 0 ? '\u2212' : '') + fa(abs(f.n)) + '</bdi>'; }
      return '<bdi dir="ltr" class="fqw">' + (f.n < 0 ? '<b>\u2212</b>' : '') + '<span class="fq"><span>' + fa(abs(f.n)) + '</span><span>' + fa(f.d) + '</span></span></bdi>';
    };
    function rf(easy, neg) { var d = R(2, easy ? 6 : 9), n; do { n = R(1, easy ? d + 2 : 11); } while (n % d === 0); return { n: neg && Math.random() < 0.5 ? -n : n, d: d }; }
    var OPS = { add: ['جمع', '+'], sub: ['تفریق', '-'], mul: ['ضرب', '\\times'], div: ['تقسیم', '\\div'] };
    function apply(k, A, B) { return k === 'add' ? fadd(A, B) : k === 'sub' ? fadd(A, fneg(B)) : k === 'mul' ? fmul(A, B) : fdiv(A, B); }
    var fm = function (n, d, o, k) { var c = '{\\color{crimson}\\scriptsize' + o + k + '}'; return (n < 0 ? '-' : '') + '\\dfrac{' + abs(n) + c + '}{' + d + c + '}'; };
    var dmh = function (t) { return '<div class="dm">$' + t + '$</div>'; };
    var simpPart = function (n, d, ans) { var g; if (ans.n === n && ans.d === d) { return ''; } if (n === 0) { return '=0'; } g = gcd(n, d); return '=' + fm(n, d, '\\div', g) + '=' + ft(ans); };
    function xplain(k, A, B) {
      var ans = apply(k, A, B), t, L, a2, b2, num, den, sg = OPS[k][1], iv, m1, m2, conv = [];
      if (k === 'add' || k === 'sub') {
        L = lcm(A.d, B.d); m1 = L / A.d; m2 = L / B.d; a2 = A.n * m1; b2 = B.n * m2; num = k === 'add' ? a2 + b2 : a2 - b2;
        if (m1 > 1) { conv.push(ft(A) + '&=' + fm(A.n, A.d, '\\times', m1) + '=' + fr(a2, L)); }
        if (m2 > 1) { conv.push(ft(B) + '&=' + fm(B.n, B.d, '\\times', m2) + '=' + fr(b2, L)); }
        t = (A.d === B.d ? 'مخرج‌ها برابرند؛ صورت‌ها را ' + (k === 'add' ? 'جمع' : 'تفریق') + ' می‌کنیم:' : 'مخرج مشترک ' + fa(L) + ' است. اول کسرها را به مخرج مشترک تبدیل می‌کنیم (عدد قرمز، ضریبِ هر کسر است):') +
          (conv.length ? dmh('\\begin{aligned}' + conv.join('\\\\') + '\\end{aligned}') + 'حالا ' + (k === 'add' ? 'جمع' : 'تفریق') + ' می‌کنیم:' : '') +
          dmh(fr(a2, L) + sg + (b2 < 0 ? '\\left(' + fr(b2, L) + '\\right)' : fr(b2, L)) + '=' + fr(num, L) + simpPart(num, L, ans));
      } else if (k === 'mul') {
        num = A.n * B.n; den = A.d * B.d; t = 'صورت‌ها را در هم و مخرج‌ها را در هم ضرب می‌کنیم:' + dmh(ft(A) + '\\times' + fp(B) + '=' + fr(num, den) + simpPart(num, den, ans));
      } else {
        iv = inv(B); num = A.n * iv.n; den = A.d * iv.d;
        t = 'تقسیم یعنی ضرب در وارونِ کسر دوم:' + dmh(ft(A) + '\\div' + fp(B) + '=' + ft(A) + '\\times' + fp(iv) + '=' + fr(num, den) + simpPart(num, den, ans));
      }
      return { ans: ans, t: t };
    }
    function gen2(kind, easy, neg) {
      var A = rf(easy, neg), B = rf(easy, neg), o, x, C2, p, e = [], L;
      if (kind === 'ord') {
        C2 = rf(true, neg); var mul = Math.random() < 0.5, sgn = mul ? '\\times' : '\\div';
        p = mul ? fmul(B, C2) : fdiv(B, C2); var ans = fadd(A, p), wr = mul ? fmul(fadd(A, B), C2) : fdiv(fadd(A, B), C2);
        o = {
          tex: ft(A) + '+' + fp(B) + sgn + fp(C2), ans: ans, errs: [{ f: wr, m: 'جمع را زودتر از ' + (mul ? 'ضرب' : 'تقسیم') + ' انجام دادی؛ ضرب و تقسیم مقدم‌اند.' }, { f: fadd(A, fneg(p)), m: 'در مرحلهٔ آخر، جمع را تفریق کردی.' }],
          expl: 'اول ' + (mul ? 'ضرب' : 'تقسیم') + ': ' + M(fp(B) + sgn + fp(C2) + '=' + ft(p)) + '، بعد جمع: ' + M(ft(A) + '+' + fp(p) + '=' + ft(ans))
        };
      } else {
        x = xplain(kind, A, B); L = lcm(A.d, B.d);
        if (kind === 'add' || kind === 'sub') {
          e.push({ f: F(kind === 'add' ? A.n + B.n : A.n - B.n, A.d + B.d), m: 'صورت‌ها و مخرج‌ها را جداگانه جمع/تفریق کردی؛ باید اول مخرج مشترک بگیری و مخرج ثابت بماند.' });
          if (A.d !== B.d) { e.push({ f: F(kind === 'add' ? A.n + B.n : A.n - B.n, L), m: 'مخرج مشترک گرفتی، ولی صورت‌ها را هم‌اندازه با آن تبدیل نکردی.' }); }
          e.push({ f: apply(kind === 'add' ? 'sub' : 'add', A, B), m: 'به‌جای ' + (kind === 'add' ? 'جمع، تفریق' : 'تفریق، جمع') + ' کردی.' });
        } else if (kind === 'mul') {
          e.push({ f: F(A.n * B.d, A.d * B.n), m: 'کسر دوم را وارون کردی؛ وارون‌کردن فقط در تقسیم لازم است.' }); e.push({ f: F(A.n * B.n, A.d + B.d), m: 'مخرج‌ها را جمع کردی؛ در ضرب، مخرج‌ها هم در هم ضرب می‌شوند.' });
        } else {
          e.push({ f: F(A.n * B.n, A.d * B.d), m: 'کسر دوم را وارون نکردی؛ در تقسیم باید در وارونِ کسر دوم ضرب کنی.' }); e.push({ f: F(A.d * B.n, A.n * B.d), m: 'کسر اول را وارون کردی؛ باید کسر دوم وارون شود.' });
        }
        e.push({ f: fneg(x.ans), m: 'علامت جواب را برعکس کردی.' });
        o = { tex: ft(A) + OPS[kind][1] + fp(B), ans: x.ans, errs: e, expl: x.t };
      }
      o.errs = o.errs.filter(function (z) { return z.f.d !== 0 && !feq(z.f, o.ans); }); o.kind = kind; return o;
    }
    var FIN = function () { return '<div class="fin"><button type="button" class="btn pm" aria-label="تغییر علامت">±</button><div class="fr2"><input class="nn" type="text" inputmode="text" dir="ltr" autocomplete="off" placeholder="صورت"><span class="bar"></span><input class="dd" type="text" inputmode="text" dir="ltr" autocomplete="off" placeholder="مخرج"></div></div><p class="fnote">اگر جواب عدد صحیح است، مخرج را خالی بگذار.</p>'; };
    function readF(root) { var n = parse(root.querySelector('.nn').value), dv = root.querySelector('.dd').value.trim(), d = dv === '' ? 1 : parse(dv); return n === null || d === null || d === 0 ? null : { n: n, d: d }; }
    function wireF(root, submit, noFocus) {
      var nn = root.querySelector('.nn'); if (!nn) { return; }
      root.querySelector('.pm').onclick = function () { nn.value = /^[-−]/.test(nn.value) ? nn.value.replace(/^[-−]/, '') : '-' + nn.value; nn.focus({ preventScroll: true }); };
      [nn, root.querySelector('.dd')].forEach(function (i) { i.addEventListener('keydown', function (e) { if (e.key === 'Enter') { submit(); } }); });
      if (!noFocus) { nn.focus({ preventScroll: true }); }
    }
    var isSimple = function (u) { return u.d > 0 && gcd(u.n, u.d) === 1 || u.n === 0 && u.d === 1; };
    /* داوری پاسخ: 'ok' | 'unsimple' | {m} (اشتباه، همراه پیام) */
    function judge(q, u) {
      var i, w;
      if (feq(u, q.ans)) { return isSimple(u) ? 'ok' : 'unsimple'; }
      w = F(u.n, u.d); for (i = 0; i < q.errs.length; i++) { if (feq(w, q.errs[i].f)) { return { m: q.errs[i].m }; } }
      return { m: '' };
    }

  K0._f = { gcd: gcd, lcm: lcm, divisors: divisors, F: F, feq: feq, fadd: fadd, fneg: fneg, fmul: fmul, inv: inv, fdiv: fdiv, fr: fr, ft: ft, fp: fp, fh: fh, rf: rf, OPS: OPS, apply: apply, fm: fm, dmh: dmh, simpPart: simpPart, xplain: xplain, gen2: gen2, FIN: FIN, readF: readF, wireF: wireF, isSimple: isSimple, judge: judge };
})();
