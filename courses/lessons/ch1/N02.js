/* درس مهارت N02 — چهار عمل روی کسرها و اعداد گویا (فصل ۱) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.N02 = {
  needs: ['utils', 'inputs', 'frac'],
  setup: function (K0) {
var ML = window.MathLite, fa = ML.fa, esc = ML.esc, rr = ML.renderRich, abs = Math.abs, df = K0.df, NS = 'http://www.w3.org/2000/svg', $ = function (id) { return document.getElementById(id); };
var _u = K0._u, R = _u.R, NZ = _u.NZ, M = _u.M, shuffle = _u.shuffle;
var _i = K0._i, fb = _i.fb;
var _f = K0._f, F = _f.F, feq = _f.feq, fr = _f.fr, ft = _f.ft, fp = _f.fp, fh = _f.fh, OPS = _f.OPS, xplain = _f.xplain, gen2 = _f.gen2, FIN = _f.FIN, readF = _f.readF, wireF = _f.wireF, judge = _f.judge;
var K = Object.create(K0);   // K0 = هستهٔ مشترک؛ K = همان + ابزارهای اختصاصی این درس

  /* ---- مدل بصری: دو نوار کسری و مقایسهٔ مقدار ---- */
  K.fracBars = function (host) {
    var S = [{ n: 1, d: 2, c: '#0e8f7e' }, { n: 2, d: 4, c: '#4c5fd5' }];
    function paint() {
      var h = '<div class="fbars">', i, k, s, svg;
      for (i = 0; i < 2; i++) {
        s = S[i]; svg = '<svg viewBox="0 0 600 56" role="img" aria-label="نوار کسری ' + (i + 1) + '">';
        for (k = 0; k < s.d; k++) { svg += '<rect class="seg" data-i="' + i + '" data-k="' + k + '" x="' + (2 + k * 596 / s.d) + '" y="2" width="' + (596 / s.d) + '" height="52" fill="' + (k < s.n ? s.c : '#fff') + '" stroke="#14213d" stroke-width="2.5"/>'; }
        h += '<div class="fbrow"><div class="fctl" style="--c:' + s.c + '"><span><button type="button" class="st" data-i="' + i + '" data-a="n-" aria-label="کم‌کردن صورت">−</button><b>' + fa(s.n) + '</b><button type="button" class="st" data-i="' + i + '" data-a="n+" aria-label="زیاد‌کردن صورت">+</button></span><i></i><span><button type="button" class="st" data-i="' + i + '" data-a="d-" aria-label="کم‌کردن مخرج">−</button><b>' + fa(s.d) + '</b><button type="button" class="st" data-i="' + i + '" data-a="d+" aria-label="زیادکردن مخرج">+</button></span></div>' + svg + '</svg></div>';
      }
      var rows = h;
      var a = F(S[0].n, S[0].d), b = F(S[1].n, S[1].d), eq = feq(a, b), hi = S[1].d >= S[0].d ? [S[0], S[1]] : [S[1], S[0]], f = hi[1].d % hi[0].d === 0 ? hi[1].d / hi[0].d : 0;
      h = '<div class="fbv ' + (eq ? 'eq' : 'ne') + '">' + M('{\\color{teal}' + fr(S[0].n, S[0].d) + '}' + (eq ? '=' : '\\neq') + '{\\color{royalblue}' + fr(S[1].n, S[1].d) + '}') + '<p>' + (eq ? 'هر دو نوار یک مقدار را نشان می‌دهند' + (f > 1 && S[0].d !== S[1].d ? '؛ صورت و مخرجِ کسرِ کوچک‌مخرج در ' + fa(f) + ' ضرب شده است.' : '.') + (S[0].n !== a.n || S[1].n !== b.n ? ' ساده‌شدهٔ هر دو: ' + M(ft(a)) : '') : 'قسمت‌های رنگی دو نوار برابر نیستند؛ این دو کسر مقدار متفاوتی دارند.') + '</p></div>';
      host.innerHTML = rows + rr(h) + '</div>';
    }
    host.addEventListener('click', function (e) {
      var b = e.target.closest('.st, .seg'), s, a;
      if (!b) { return; } s = S[+b.dataset.i];
      if (b.classList.contains('seg')) { var k = +b.dataset.k + 1; s.n = s.n === k ? k - 1 : k; }
      else { a = b.dataset.a; if (a === 'n+') { s.n = Math.min(s.d, s.n + 1); } else if (a === 'n-') { s.n = Math.max(0, s.n - 1); } else if (a === 'd+') { s.d = Math.min(12, s.d + 1); } else { s.d = Math.max(1, s.d - 1); s.n = Math.min(s.n, s.d); } }
      paint();
    }); paint();
  };

  /* ---- آزمایشگاه چهار عمل ---- */
  K.fracLab = function (host) {
    var op = 'add', X = [{ s: 1, n: 1, d: 2 }, { s: 1, n: 1, d: 3 }], res = null, touched = false;
    var val = function (z) { return { n: z.s * z.n, d: z.d }; };
    function ed(i) { var z = X[i]; return '<div class="fed"><button type="button" class="st sgn" data-i="' + i + '" data-a="s">' + (z.s > 0 ? '+' : '\u2212') + '</button><div class="fcol"><span><button type="button" class="st" data-i="' + i + '" data-a="n-">−</button><b>' + fa(z.n) + '</b><button type="button" class="st" data-i="' + i + '" data-a="n+">+</button></span><i></i><span><button type="button" class="st" data-i="' + i + '" data-a="d-">−</button><b>' + fa(z.d) + '</b><button type="button" class="st" data-i="' + i + '" data-a="d+">+</button></span></div></div>'; }
    function paint() {
      var A = val(X[0]), B = val(X[1]), zero = op === 'div' && B.n === 0, h = '<div class="opseg">';
      Object.keys(OPS).forEach(function (k) { h += '<button type="button" class="btn press-effect' + (k === op ? ' on' : '') + '" style="box-shadow:2px 2px 0 var(--ink)" data-op="' + k + '">' + OPS[k][0] + '</button>'; });
      h += '</div><div class="fedrow">' + ed(0) + '<span class="fop">' + M(OPS[op][1]) + '</span>' + ed(1) + '</div><div class="dm k">' + M(ft(A) + OPS[op][1] + fp(B)) + '</div>';
      if (zero) { h += fb(false, 'تقسیم بر کسری که مقدارش صفر است تعریف‌نشده است. صورتِ کسر دوم را تغییر بده.'); }
      else if (!res) { h += '<p class="ask">اول پاسخ خودت را بنویس:</p>' + FIN() + '<div class="opts"><button type="button" class="btn primary" data-go="1">ثبت و دیدن مراحل</button></div>'; }
      else { h += fb(res.ok, res.msg) + '<div class="ex">' + res.t + '</div><div class="opts"><button type="button" class="btn primary" data-new-lab="1">آزمایش جدید</button></div>'; }
      host.innerHTML = rr(h); if (!zero && !res) { wireF(host, check, !touched); }
    }
    function check() {
      var u = readF(host), A = val(X[0]), B = val(X[1]), x, j;
      if (!host.querySelector('.nn').value.trim() || !host.querySelector('.dd').value.trim() || !u) { var old = host.querySelector('.n02-input-warning'); if (old) { old.remove(); } var msg = document.createElement('div'); msg.className = 'fb bad n02-input-warning'; msg.textContent = 'لطفاً صورت و مخرج پاسخ را هر دو وارد کن؛ مخرج نباید صفر باشد.'; var row = host.querySelector('.opts'); if (row) { row.parentNode.insertBefore(msg, row); } else { host.appendChild(msg); } return; } x = xplain(op, A, B); j = judge({ ans: x.ans, errs: [] }, u);
      res = { ok: j === 'ok', t: x.t, msg: j === 'ok' ? 'درست است! مراحل را ببین و با راه خودت مقایسه کن.' : j === 'unsimple' ? 'مقدارش درست است، ولی کسر ساده نشده. جواب ساده‌شده: ' + M(ft(x.ans)) : 'جواب تو با مراحل درست یکی نیست. مراحل زیر را بررسی کن؛ جواب درست: ' + M(ft(x.ans)) }; paint();
    }
    host.addEventListener('click', function (e) {
      var b = e.target.closest('button'), z, a; if (!b) { return; } touched = true;
      if (b.dataset.newLab) { op = 'add'; X = [{ s: 1, n: 1, d: 2 }, { s: 1, n: 1, d: 3 }]; res = null; touched = false; }
      else if (b.dataset.op) { op = b.dataset.op; res = null; }
      else if (b.dataset.go) { check(); return; }
      else if (b.dataset.a) { z = X[+b.dataset.i]; a = b.dataset.a; if (a === 's') { z.s = -z.s; } else if (a === 'n+') { z.n = Math.min(12, z.n + 1); } else if (a === 'n-') { z.n = Math.max(0, z.n - 1); } else if (a === 'd+') { z.d = Math.min(12, z.d + 1); } else { z.d = Math.max(1, z.d - 1); } res = null; }
      else { return; }
      paint();
    }); paint();
  };

  /* ---- تمرین مرحله‌ای کسرها ---- */
  K.fracSteps = function (host) {
    var ST = [['یک عمل', ['add', 'sub', 'mul', 'div'], true, false], ['کسرهای منفی', ['add', 'sub', 'mul', 'div'], false, true], ['عبارت ترکیبی', ['ord'], false, true]], si = 0, ok = 0, tries = 0, q, fin = false, touched = false;
    function newQ() { var s = ST[si]; q = gen2(s[1][R(0, s[1].length - 1)], s[2], s[3]); tries = 0; }
    function paint(fbk, locked) {
      var h = '<div class="stg">' + ST.map(function (s, i) { return '<span class="' + (i < si || fin ? 'dn' : i === si ? 'cu' : '') + '">' + (i < si || fin ? '✓ ' : '') + s[0] + '</span>'; }).join('') + '</div>';
      if (fin) { host.innerHTML = rr(h + '<div class="fb ok"><b>همهٔ مرحله‌ها را گذراندی!</b> حالا برو سراغ تمرین پایانی.</div><div class="opts"><button type="button" class="btn" data-r="1">از اول، با کسرهای جدید</button></div>'); return; }
      h += '<p class="stage-progress-meta">مرحلهٔ ' + fa(si + 1) + ' — پاسخ‌های درست: ' + fa(ok) + ' از ۲</p><div class="dm k">' + M(q.tex) + '</div>' + (locked ? '' : FIN() + '<div class="opts"><button type="button" class="btn primary" data-go="1">بررسی</button></div>');
      host.innerHTML = rr(h + (fbk || '')); if (!locked) { wireF(host, check, !touched); }
    }
    function check() {
      var u = readF(host), j, nx, keep;
      if (!u) { paint(fb(false, 'صورت و مخرج را با عدد صحیح بنویس؛ مخرج نباید صفر باشد.')); return; }
      keep = [host.querySelector('.nn').value, host.querySelector('.dd').value]; j = judge(q, u);
      if (j === 'unsimple') { paint(fb(false, 'مقدارش درست است، ولی کسر ساده نشده؛ ساده‌ترش کن. (این بار اشتباه حساب نمی‌شود.)')); host.querySelector('.nn').value = keep[0]; host.querySelector('.dd').value = keep[1]; return; }
      if (j === 'ok') { ok++; nx = ok >= 2 ? (si === 2 ? 'پایان' : 'مرحلهٔ بعد') : 'سؤال بعدی'; paint(fb(true, 'درست است! ✓') + '<div class="ex">' + q.expl + '</div><div class="opts"><button type="button" class="btn primary" data-n="1">' + nx + '</button></div>', true); return; }
      tries++;
      if (tries < 2) { paint(fb(false, (j.m || 'جواب درست نیست؛ دوباره محاسبه کن.') + ' یک بار دیگر امتحان کن.')); host.querySelector('.nn').value = keep[0]; host.querySelector('.dd').value = keep[1]; return; }
      paint(fb(false, (j.m ? j.m + ' ' : '') + 'جواب درست: ' + M(ft(q.ans))) + '<div class="ex">' + q.expl + '</div><div class="opts"><button type="button" class="btn primary" data-n="2">سؤال بعدی</button></div>', true);
    }
    host.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) { return; } touched = true;
      if (b.dataset.go) { check(); }
      else if (b.dataset.n) { if (ok >= 2) { ok = 0; si++; if (si > 2) { fin = true; paint(); return; } } newQ(); paint(); }
      else if (b.dataset.r) { si = 0; ok = 0; fin = false; newQ(); paint(); }
    }); newQ(); paint();
  };

  /* ---- تمرین پایانی کسرها (۵ سؤال چهارگزینه‌ای) ---- */
  K.fracFinal = function (host) {
    var qs, i, ans;
    function build() {
      qs = ['add', 'sub', 'mul', 'div', 'ord'].map(function (k) {
        var q = gen2(k, false, true), opts = [{ f: q.ans, ok: true }], t, tt = 0;
        q.errs.forEach(function (e) { if (opts.length < 4 && !opts.some(function (o) { return feq(o.f, e.f); })) { opts.push({ f: e.f, m: e.m }); } });
        while (opts.length < 4 && tt++ < 60) { t = Math.random() < 0.5 ? F(q.ans.n + NZ(-3, 3), q.ans.d) : F(q.ans.n, q.ans.d + R(1, 3)); if (!opts.some(function (o) { return feq(o.f, t); })) { opts.push({ f: t }); } }
        q.opts = shuffle(opts); return q;
      }); i = 0; ans = [];
    }
    function paint() {
      var q = qs[i], a = ans[i], h, oh = '', last = i === 4, s;
      if (i === 5) {
        s = ans.filter(function (x, k) { return qs[k].opts[x].ok; }).length;
        host.innerHTML = rr('<div class="fb ' + (s >= 4 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(s) + ' از ۵</b><br>' + (s === 5 ? 'عالی بود! به همهٔ سؤال‌ها درست جواب دادی.' : s >= 3 ? 'خوب بود. سؤال‌هایی را که اشتباه کردی دوباره مرور کن.' : 'یک بار دیگر درس را مرور کن؛ بعد با کسرهای جدید امتحان کن.') + '</div><div class="opts end-actions"><button type="button" class="btn" data-pv="1">مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1">سؤال‌های جدید</button></div>'); return;
      }
      h = '<div class="stg">' + qs.map(function (x, k) { return '<span class="' + (ans[k] !== undefined ? (qs[k].opts[ans[k]].ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">حاصل کدام است؟</p><div class="dm k">' + M(q.tex) + '</div><div class="mc" id="mcx"></div>';
      q.opts.forEach(function (o, k) { oh += '<button type="button" class="btn opt' + (a !== undefined ? (o.ok ? ' right' : k === a ? ' wrong' : '') : '') + '" data-o="' + k + '"' + (a !== undefined ? ' disabled' : '') + '>' + fh(o.f) + '</button>'; });
      if (a !== undefined) { var o = q.opts[a]; h += fb(o.ok, o.ok ? 'درست است! ✓' : (o.m || 'این گزینه درست نیست.')) + '<div class="ex">' + q.expl + '</div>'; }
      h += '<div class="opts n02-final-nav"><button type="button" class="btn" data-p="1"' + (i ? '' : ' disabled') + '>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (a === undefined ? ' disabled' : '') + '>' + (last ? 'مشاهدهٔ نتیجه':'سؤال بعدی') + '</button></div>';
      host.innerHTML = rr(h); host.querySelector('#mcx').innerHTML = oh;
    }
    host.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || b.disabled) { return; }
      if (b.dataset.o) { ans[i] = +b.dataset.o; paint(); } else if (b.dataset.nx) { i++; paint(); } else if (b.dataset.p) { i--; paint(); }
      else if (b.dataset.pv) { i = 0; paint(); } else if (b.dataset.r) { build(); paint(); }
    }); build(); paint();
  };


  /* ---- شکل‌های ثابت ---- */
  K.figUnequal = function () {
    var bar = function (ws, shaded) { var x = 2, s = ''; ws.forEach(function (w, k) { s += '<rect x="' + x + '" y="2" width="' + w + '" height="40" fill="' + (k < shaded ? '#0e8f7e' : '#fff') + '" stroke="#14213d" stroke-width="2.5"/>'; x += w; }); return '<svg viewBox="0 0 304 44" aria-hidden="true">' + s + '</svg>'; };
    return '<div class="figs"><figure class="good">' + bar([75, 75, 75, 75], 3) + '<figcaption>✓ چهار قسمت مساوی؛ سه قسمت رنگی: ' + M('\\frac{3}{4}') + '</figcaption></figure><figure class="bad">' + bar([30, 120, 60, 90], 3) + '<figcaption>✗ قسمت‌ها مساوی نیستند؛ شمردنِ رنگی‌ها کسر را نشان نمی‌دهد</figcaption></figure></div>';
  };
  K.figArea = function () {
    var s = '<defs><pattern id="ht" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="9" stroke="#d6457a" stroke-width="3"/></pattern></defs>';
    s += '<rect x="2" y="2" width="240" height="150" fill="#fff"/><rect x="2" y="2" width="80" height="150" fill="#9fb0ff"/><rect x="2" y="2" width="240" height="75" fill="url(#ht)"/>';
    s += '<g stroke="#14213d" stroke-width="2" fill="none"><line x1="82" y1="2" x2="82" y2="152"/><line x1="162" y1="2" x2="162" y2="152"/><line x1="2" y1="77" x2="242" y2="77"/><rect x="2" y="2" width="240" height="150" stroke-width="2.5"/></g>';
    return '<div class="figs one"><figure><svg viewBox="0 0 244 154" aria-hidden="true">' + s + '</svg><figcaption>ستون آبی، ' + M('{\\color{royalblue}\\frac{1}{3}}') + ' شکل است و ناحیهٔ هاشورخورده (قرمز)، ' + M('{\\color{crimson}\\frac{1}{2}}') + ' شکل. جایی که هر دو هستند، ۱ قسمت از ۶ قسمت مساوی است: ' + M('\\frac{1}{2}\\times\\frac{1}{3}=\\frac{1}{6}') + '</figcaption></figure></div>';
  };
  K.refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };

return {
  html: function () {
    var T = String.raw, tm = '\\times', dv = '\\div', NL = '\\\\';
    var C = function (n, d, o, k) { var c = '{\\color{crimson}\\scriptsize' + o + k + '}'; return '\\frac{' + n + c + '}{' + d + c + '}'; };
    var AL = function (lines) { return K.dm('\\begin{aligned}' + lines.join(NL) + '\\end{aligned}'); };
    return [
      K.sn('۱', 'کسر چیست؟'),
      '<p>کسر راهی برای نمایش بخشی از یک کل یا حاصل تقسیم دو عدد است. برای مثال:</p>', K.dm(T`\frac{3}{4}`),
      '<p>در این کسر:</p><ul><li><b>صورت</b>، عدد بالای خط کسر، یعنی ۳ است.</li><li><b>مخرج</b>، عدد پایین خط کسر، یعنی ۴ است.</li><li><b>خط کسر</b> نشان‌دهندهٔ تقسیم صورت بر مخرج است.</li></ul>',
      '<p>پس، همان‌طور که در درس اعداد صحیح دیدیم، خط کسر و علامت تقسیم یکی هستند:</p>', K.dm(T`\frac{3}{4}=3\div4`),
      '<p>مخرج نمی‌تواند صفر باشد، چون تقسیم بر صفر تعریف نشده است.</p>',
      K.box('note', 'عدد گویا', T`<p>هر عددی که بتوان آن را به‌صورت $\frac{a}{b}$ نوشت، با $a$ و $b$ صحیح و $b\neq0$، «عدد گویا» نام دارد. هر عدد صحیح هم گویاست، چون مثلاً $3=\frac{3}{1}$. کسرهای منفی هم عدد گویا هستند.</p>`),
      '<h4>نمایش تصویری کسر</h4><p>یک شکل را به چهار قسمت مساوی تقسیم کرده‌ایم و سه قسمت آن رنگ شده است: چهار قسمت مساوی داریم و سه قسمت از آن‌ها انتخاب شده است.</p>', K.figUnequal(),
      K.box('note', 'نکتهٔ مهم', '<p>قسمت‌ها باید مساوی باشند. اگر شکل به قسمت‌های نابرابر تقسیم شده باشد، فقط شمردن تعداد قسمت‌های رنگ‌شده برای تعیین کسر کافی نیست.</p>'),

      K.sn('۲', 'کسرهای معادل و ساده‌کردن کسر'),
      '<p>گاهی چند کسر ظاهر متفاوتی دارند، اما یک مقدار را نشان می‌دهند. برای مثال:</p>', K.dm(T`\frac{1{\color{crimson}\scriptsize\times2}}{2{\color{crimson}\scriptsize\times2}}=\frac{2{\color{crimson}\scriptsize\times2}}{4{\color{crimson}\scriptsize\times2}}=\frac{4}{8}`),
      '<p>چرا؟ چون اگر صورت و مخرج یک کسر را در یک عدد غیرصفر ضرب کنیم، مقدار کسر تغییر نمی‌کند:</p>', K.dm(T`\frac{1}{2}=\frac{1}{2}\times{\color{crimson}\frac{2}{2}}=\frac{2}{4}`),
      T`<p>دلیلش این است که $\frac{2}{2}=1$ است و ضرب در ۱ مقدار را عوض نمی‌کند.</p>`,
      '<p>با دو نوار زیر امتحان کن؛ روی قسمت‌ها بزن یا صورت و مخرج را تغییر بده و ببین کِی دو کسر برابر می‌شوند:</p><div id="fbars"></div>',
      '<h4>ساده‌کردن کسر</h4><p>ساده‌کردن برعکس همین فرایند است: صورت و مخرج را بر یک عدد غیرصفر تقسیم می‌کنیم تا کسر ساده‌تر شود و مقدارش عوض نشود.</p>',
      '<p>برای ساده‌کردن، صورت و مخرج را بر یک «مقسوم‌علیه مشترکشان» ' + K.info('divisor', 'مقسوم‌علیه چیست؟',
        T`<p>مقسوم‌علیهِ یک عدد، عددی است که آن عدد را بدون باقی‌مانده می‌شمارد؛ مثلاً ۶ مقسوم‌علیهِ ۱۸ است، چون $18\div6=3$.</p><p>عددی که مقسوم‌علیهِ هر دو عدد باشد، «مقسوم‌علیه مشترک» آن‌هاست؛ مثلاً ۶ مقسوم‌علیه مشترک ۱۸ و ۲۴ است.</p><p><b>بزرگ‌ترین مقسوم‌علیه مشترک</b> دو عدد را به‌اختصار «ب.م.م» می‌نامیم. مثلاً ب.م.مِ ۱۸ و ۲۴ برابر ۶ است.</p>`) + ' تقسیم می‌کنیم. مثال:</p>',
      K.dm(T`\frac{18}{24}=\frac{18{\color{crimson}\div6}}{24{\color{crimson}\div6}}=\frac{3}{4}`),
      T`<p>کسر $\frac{3}{4}$ هیچ مقسوم‌علیه مشترکی بزرگ‌تر از ۱ ندارد؛ بنابراین در ساده‌ترین شکل است. اگر بزرگ‌ترین مقسوم‌علیه مشترک را نمی‌بینی، چند قدم کوچک‌تر هم جواب می‌دهد:</p>`, AL(['\\frac{18}{24}&=' + C(18, 24, dv, 2) + '=\\frac{9}{12}', '&=' + C(9, 12, dv, 3) + '=\\frac{3}{4}']),
      K.box('err', '⚠ خطای رایج', T`<p>نباید فقط صورت یا فقط مخرج را بر یک عدد تقسیم کنیم؛ این کار همیشه مقدار کسر را عوض می‌کند: $\frac{18{\color{crimson}\div6}}{24}=\frac{3}{24}\neq\frac{3}{4}$. اضافه یا کم‌کردنِ یک عدد یکسان به صورت و مخرج هم مقدار را عوض می‌کند؛ مثلاً $\frac{1}{2}\neq\frac{2}{3}$.</p>`),

      K.sn('۳', 'جمع و تفریق کسرها'),
      '<p>برای جمع یا تفریق کسرها، ابتدا باید واحدهای آن‌ها را یکسان کنیم؛ یعنی کسرها مخرج مشترک داشته باشند.</p>',
      '<h4>حالت اول: مخرج‌ها برابرند</h4><p>وقتی دو کسر مخرج یکسان دارند، صورت‌ها را جمع یا تفریق می‌کنیم و مخرج را ثابت نگه می‌داریم:</p>', K.dm(T`\begin{aligned}\frac{2}{7}+\frac{3}{7}&=\frac{5}{7}\\\frac{6}{11}-\frac{2}{11}&=\frac{4}{11}\end{aligned}`),
      '<p>دلیل این قاعده آن است که هر دو کسر بر اساس واحدهای هم‌اندازه نوشته شده‌اند.</p>',
      '<h4>حالت دوم: مخرج‌ها متفاوت‌اند</h4><p>مثلاً:</p>', K.dm(T`\frac{1}{2}+\frac{1}{3}`),
      '<p>نیم و یک‌سوم واحدهای یکسانی نیستند. بنابراین ابتدا کسرها را به شکل‌های معادل با مخرج مشترک تبدیل می‌کنیم. یک مخرج مشترک برای ۲ و ۳، عدد ۶ است:</p>', AL(['\\frac{1}{2}&=' + C(1, 2, tm, 3) + '=\\frac{3}{6}', '\\frac{1}{3}&=' + C(1, 3, tm, 2) + '=\\frac{2}{6}']),
      '<p>اکنون می‌توانیم جمع کنیم:</p>', K.dm(T`\frac{3}{6}+\frac{2}{6}=\frac{5}{6}`),
      '<p>در این مثال، ۶ کوچک‌ترین مخرج مشترک مثبت است. روش منظم پیدا کردنش را در درس مضرب مشترک و مخرج مشترک جداگانه یاد می‌گیریم؛ فعلاً کافی است بتوانی مخرج مشترک مناسبی پیدا کنی.</p>',
      '<h4>مثال تفریق</h4>', K.dm(T`\frac{3}{4}-\frac{1}{6}`), '<p>مخرج مشترک ۱۲ را انتخاب می‌کنیم:</p>', AL(['\\frac{3}{4}&=' + C(3, 4, tm, 3) + '=\\frac{9}{12}', '\\frac{1}{6}&=' + C(1, 6, tm, 2) + '=\\frac{2}{12}']), '<p>حالا تفریق می‌کنیم:</p>', K.dm(T`\frac{9}{12}-\frac{2}{12}=\frac{7}{12}`),
      '<p>هر مخرج مشترکی جواب می‌دهد؛ مثلاً ۲۴ که حاصل‌ضرب ۴ و ۶ است:</p>', AL(['\\frac{3}{4}-\\frac{1}{6}&=' + C(3, 4, tm, 6) + '-' + C(1, 6, tm, 4), '&=\\frac{18}{24}-\\frac{4}{24}', '&=\\frac{14}{24}=' + C(14, 24, dv, 2) + '=\\frac{7}{12}']),
      '<p>ولی کوچک‌ترین مخرج مشترک، محاسبه را کوتاه‌تر می‌کند و نیاز به ساده‌کردن را کم می‌کند. اگر کسر بزرگ‌تر را از کوچک‌تر کم کنیم، جواب منفی می‌شود:</p>', AL(['\\frac{1}{3}-\\frac{1}{2}&=' + C(1, 3, tm, 2) + '-' + C(1, 2, tm, 3), '&=\\frac{2}{6}-\\frac{3}{6}=-\\frac{1}{6}']),
      '<h4>کسرهای منفی</h4><p>علامت منفی را کنار کسر یا در صورت آن می‌نویسیم:</p>', K.dm(T`-\frac{2}{3}=\frac{-2}{3}`),
      T`<p>نوشتن علامت در مخرج، $\frac{2}{-3}$، هم درست است؛ اما رسم بر این است که علامت کنار کسر یا در صورت بیاید. برای مثال:</p>`, AL(['-\\frac{2}{3}+\\frac{3}{4}&=-' + C(2, 3, tm, 4) + '+' + C(3, 4, tm, 3), '&=-\\frac{8}{12}+\\frac{9}{12}=\\frac{1}{12}']),
      '<p>دقت کن که علامت منفی بخشی از مقدار کسر است؛ نباید هنگام تبدیل مخرج‌ها آن را فراموش کنیم. تفریق عدد منفی هم مثل درس اعداد صحیح است، یعنی $a-(-b)=a+b$:</p>'.replace('$a-(-b)=a+b$', '$' + T`a-(-b)=a+b` + '$'), AL(['\\frac{1}{2}-\\left(-\\frac{1}{3}\\right)&=\\frac{1}{2}+\\frac{1}{3}', '&=' + C(1, 2, tm, 3) + '+' + C(1, 3, tm, 2), '&=\\frac{3}{6}+\\frac{2}{6}=\\frac{5}{6}']),
      '<h4>جمع و تفریق عدد صحیح با کسر</h4><p>هر عدد صحیح را می‌توانیم کسری با مخرج ۱ بنویسیم:</p>', AL(['2+\\frac{3}{4}&=' + C(2, 1, tm, 4) + '+\\frac{3}{4}', '&=\\frac{8}{4}+\\frac{3}{4}=\\frac{11}{4}']),
      '<p>جواب بزرگ‌تر از ۱ هم جواب درستی است؛ لازم نیست حتماً آن را به «عدد مخلوط» ' + K.info('mixed', 'عدد مخلوط چیست؟', T`<p>عدد مخلوط، عددی است که از یک عدد صحیح و یک کسر کوچک‌تر از ۱ ساخته شده است. مثلاً $2\frac{1}{3}$ یعنی $2+\frac{1}{3}$.</p><p>برای تبدیل $\frac{7}{3}$ به عدد مخلوط، ۷ را بر ۳ تقسیم می‌کنیم: خارج‌قسمت ۲ و باقی‌مانده ۱ است؛ پس $\frac{7}{3}=2\frac{1}{3}$.</p><p>برای برگشت: $2\frac{1}{3}=\frac{2\times3+1}{3}=\frac{7}{3}$.</p>`) + ' تبدیل کنی.</p>',
      K.box('err', '⚠ اشتباه رایج', T`<p>این محاسبه نادرست است: $\frac{1}{2}+\frac{1}{3}\neq\frac{1+1}{2+3}=\frac{2}{5}$، چون صورت‌ها و مخرج‌ها را نمی‌توان جداگانه جمع کرد؛ ابتدا باید مخرج‌ها یکسان شوند. یک راه سنجش هم هست: جمع دو کسر مثبت از هرکدام بزرگ‌تر است، ولی $\frac{2}{5}$ از $\frac{1}{2}$ کوچک‌تر است.</p>`),

      K.sn('۴', 'ضرب کسرها'),
      '<p>ضرب کسرها نسبت به جمع و تفریق ساده‌تر است: صورت‌ها را در هم و مخرج‌ها را در هم ضرب می‌کنیم.</p>', K.dm(T`\frac{2}{3}\times\frac{4}{5}=\frac{2\times4}{3\times5}=\frac{8}{15}`),
      '<p>ضرب کسرها یعنی «کسری از یک کسر». برای مثال، نصفِ یک‌سوم برابر یک‌ششم است:</p>', K.dm(T`\frac{1}{2}\times\frac{1}{3}=\frac{1}{6}`), K.figArea(),
      '<h4>ساده‌کردن قبل از ضرب</h4><p>گاهی می‌توانیم پیش از ضرب، صورتِ یک کسر را با مخرجِ کسر دیگر ساده کنیم:</p>', K.dm(T`\frac{3}{4}\times\frac{8}{9}`),
      '<p>عددهای ۳ <bdi>‏(صورت کسر اول)‏</bdi> و ۹ <bdi>‏(مخرج کسر دوم)‏</bdi> بر ۳ بخش‌پذیرند، و عددهای ۸ <bdi>‏(صورت کسر دوم)‏</bdi> و ۴ <bdi>‏(مخرج کسر اول)‏</bdi> بر ۴. بنابراین:</p>', K.dm(T`\frac{3}{4}\times\frac{8}{9}=\frac{3{\color{crimson}\scriptsize\div3}}{4{\color{darkorange}\scriptsize\div4}}\times\frac{8{\color{darkorange}\scriptsize\div4}}{9{\color{crimson}\scriptsize\div3}}=\frac{1}{1}\times\frac{2}{3}=\frac{2}{3}`),
      T`<p>این کار مجاز است، چون حاصل‌ضرب برابر $\frac{3\times8}{4\times9}$ است و عامل مشترکِ بالا و پایین را می‌توان حذف کرد. اجباری نیست، اما محاسبات را آسان‌تر می‌کند.</p>`,
      '<h4>ضرب عدد صحیح در کسر</h4>', K.dm(T`3\times\frac{2}{5}=\frac{3}{1}\times\frac{2}{5}=\frac{6}{5}`),
      '<h4>ضرب کسرهای منفی</h4><p>قواعد علامت مانند ضرب اعداد صحیح است:</p>', K.dm(T`\begin{aligned}-\frac{3}{5}\times\frac{2}{7}&=-\frac{6}{35}\\-\frac{3}{5}\times\left(-\frac{2}{7}\right)&=\frac{6}{35}\end{aligned}`),
      '<p>پس دو کسر با علامت یکسان، حاصل مثبت و دو کسر با علامت متفاوت، حاصل منفی دارند.</p>',

      K.sn('۵', 'تقسیم کسرها'),
      '<p>وارونِ یک عدد غیرصفر، عددی است که ضربش در آن عدد، ۱ شود. وارون یک کسر با جابه‌جایی صورت و مخرج به دست می‌آید:</p>', K.dm(T`\frac{3}{5}\times\frac{5}{3}=1`),
      T`<p>مثلاً وارونِ $-\frac{2}{3}$ برابر $-\frac{3}{2}$ و وارونِ $5$ برابر $\frac{1}{5}$ است.</p>`,
      '<p>برای تقسیم دو کسر، کسر اول را در وارونِ کسر دوم ضرب می‌کنیم. مثال:</p>', AL(['\\frac{3}{5}\\div\\frac{9}{10}&=\\frac{3}{5}\\times\\frac{10}{9}', '&=\\frac{30}{45}=' + C(30, 45, dv, 15) + '=\\frac{2}{3}']),
      '<h4>چرا وارون می‌کنیم؟</h4><p>تقسیم یعنی بپرسیم «چند تا از عدد دوم، در عدد اول جا می‌شود؟». دو مثال ساده:</p>',
      AL(['1\\div\\frac{1}{2}&=2', '3\\div\\frac{1}{4}&=12']),
      '<p>در ۱ دو «نیم» جا می‌شود. در ۳ هم دوازده «یک‌چهارم» جا می‌شود، چون هر ۱ شامل ۴ تاست. پس تقسیم بر کسری که صورتش ۱ است، یعنی ضرب در مخرجش:</p>', K.dm(T`3\div\frac{1}{4}=3\times4`),
      T`<p>حالا کسری مثل $\frac{9}{10}$ را «۹ تا یک‌دهم» ببین. تقسیم بر آن، دو قدم دارد: اول بر ۹ تقسیم می‌کنیم، بعد چون تقسیم بر $\frac{1}{10}$ یعنی ضرب در ۱۰، در ۱۰ ضرب می‌کنیم:</p>`,
      AL(['\\frac{3}{5}\\div\\frac{9}{10}&=\\frac{3}{5}\\div9\\times10', '&=\\frac{3}{5}\\times\\frac{1}{9}\\times10', '&=\\frac{3}{5}\\times\\frac{10}{9}']),
      T`<p>دقت کن که در پایان، کسر $\frac{10}{9}$ یعنی وارونِ $\frac{9}{10}$ ظاهر شد. این برای هر کسری درست است: تقسیم بر $\frac{c}{d}$ یعنی تقسیم بر $c$ و ضرب در $d$، که همان ضرب در $\frac{d}{c}$ است. جواب را با ضرب هم می‌توانیم بررسی کنیم:</p>`, K.dm(T`\frac{2}{3}\times\frac{9}{10}=\frac{3}{5}\;\Rightarrow\;\frac{3}{5}\div\frac{9}{10}=\frac{2}{3}`),
      K.box('note', 'برای کنجکاوها', T`<p>دلیل کلی‌تر: $a\div b$ یعنی عددی مثل $x$ که $x\times b=a$ باشد. اگر دو طرف را در وارونِ $b$ ضرب کنیم، چون $b\times\frac{1}{b}=1$، به $x=a\times\frac{1}{b}$ می‌رسیم.</p>`),
      '<h4>تقسیم کسرهای منفی</h4><p>وارونِ کسرِ منفی، منفی می‌ماند:</p>', AL(['\\frac{3}{5}\\div\\left(-\\frac{9}{10}\\right)&=\\frac{3}{5}\\times\\left(-\\frac{10}{9}\\right)', '&=-\\frac{30}{45}=-' + C(30, 45, dv, 15) + '=-\\frac{2}{3}']),
      K.box('note', 'نکته', T`<p>تقسیم بر کسری که مقدارش صفر است (مثل $\frac{0}{5}$) تعریف نشده است؛ اما صفر تقسیم بر هر عدد ناصفر برابر صفر است.</p>`),

      K.sn('۶', 'ترکیب چهار عمل و ترتیب عملیات'),
      '<p>در عبارت‌های چندعملیاتی، ترتیب محاسبه اهمیت دارد:</p><ol><li>پرانتزها</li><li>توان‌ها، در صورت وجود</li><li>ضرب و تقسیم، از چپ به راست</li><li>جمع و تفریق، از چپ به راست</li></ol>',
      '<p>مثال: ابتدا ضرب را انجام می‌دهیم و بعد جمع:</p>', K.ord([[{ t: T`-\frac{3}{4}\times\frac{8}{9}`, l: 'اول: ضرب', c: 'b' }, '+', T`\frac{1}{3}`], ['=', { t: T`-\frac{2}{3}+\frac{1}{3}`, l: 'بعد: جمع', c: 'r' }], ['=', T`-\frac{1}{3}`]]),
      '<p>مثال دیگر: ابتدا تقسیم، سپس جمع:</p>', K.ord([[T`\frac{1}{2}`, '+', { t: T`\frac{1}{3}\div\frac{2}{3}`, l: 'اول: تقسیم', c: 'b' }], ['=', { t: T`\frac{1}{2}+\frac{1}{2}`, l: 'بعد: جمع', c: 'r' }], ['=', '1']]),
      '<p>اگر ابتدا جمع را انجام دهیم، پاسخ نادرست می‌شود:</p>', K.dm(T`\left(\frac{1}{2}+\frac{1}{3}\right)\div\frac{2}{3}=\frac{5}{6}\times\frac{3}{2}=\frac{5}{4}\neq1`),
      K.box('note', 'نکته', T`<p>خط کسر مثل پرانتز عمل می‌کند: در $\frac{1+2}{3}$ اول $1+2$ حساب می‌شود و بعد تقسیم بر ۳.</p>`),

      K.sn('۷', 'کارت مرجع چهار عمل'),
      K.refs([{ c: 'r1', t: 'جمع', r: 'مخرج مشترک پیدا کن؛ صورت‌ها را جمع کن.', e: T`\frac{1}{2}+\frac{1}{3}=\frac{5}{6}` }, { c: 'r2', t: 'تفریق', r: 'مخرج مشترک پیدا کن؛ صورت‌ها را تفریق کن.', e: T`\frac{3}{4}-\frac{1}{6}=\frac{7}{12}` }, { c: 'r3', t: 'ضرب', r: 'صورت‌ها را در هم و مخرج‌ها را در هم ضرب کن.', e: T`\frac{2}{3}\times\frac{4}{5}=\frac{8}{15}` }, { c: 'r4', t: 'تقسیم', r: 'در وارونِ کسر دوم ضرب کن.', e: T`\frac{3}{5}\div\frac{9}{10}=\frac{2}{3}` }]),

      K.sn('۸', 'آزمایشگاه چهار عمل'),
      '<p>عمل را انتخاب کن، دو کسر را بساز و اول پاسخ خودت را بنویس. بعد مراحل درست را ببین.</p><div class="cover" id="flab" style="animation:none"></div>',
      K.sn('۹', 'تمرین مرحله‌ای'),
      '<p>هر مرحله با دو پاسخ درست تمام می‌شود. جواب را به‌صورت ساده‌شده بنویس. اگر اشتباه کنی، نوع اشتباه را به تو می‌گوییم.</p><div class="cover" id="fst" style="animation:none"></div>',
      K.sn('۱۰', 'تمرین پایانی'),
      '<p>پنج سؤال با کسرهای تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover" id="ffin" style="animation:none"></div>',
      K.box('sum', 'بعد از این درس باید بتوانی', '<ul><li>صورت و مخرج را تشخیص بدهی و کسرها را ساده کنی.</li><li>کسرهای معادل بسازی.</li><li>جمع و تفریق کسرها را با مخرج مشترک انجام بدهی.</li><li>ضرب و تقسیم کسرها را انجام بدهی و دلیل وارون‌کردن را توضیح بدهی.</li><li>علامت کسرهای منفی را در محاسبات حفظ کنی.</li><li>ترتیب عملیات را در عبارت‌های ترکیبی رعایت کنی.</li><li>پاسخ را تا حد امکان ساده کنی.</li></ul><p>این مهارت پایهٔ درس‌های تبدیل کسر، اعشار و درصد، نسبت و تناسب، و مضرب مشترک و مخرج مشترک است.</p>')
    ].join('');
  },
  init: function (panel) {
    K.fracBars(panel.querySelector('#fbars')); K.fracLab(panel.querySelector('#flab')); K.fracSteps(panel.querySelector('#fst')); K.fracFinal(panel.querySelector('#ffin'));
  }
};
  }
};
