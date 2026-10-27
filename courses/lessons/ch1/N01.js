/* درس مهارت N01 — چهار عمل روی اعداد صحیح (فصل ۱) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.N01 = {
  needs: ['utils', 'inputs', 'numberline'],
  setup: function (K0) {
var ML = window.MathLite, fa = ML.fa, esc = ML.esc, rr = ML.renderRich, abs = Math.abs, df = K0.df, NS = 'http://www.w3.org/2000/svg', $ = function (id) { return document.getElementById(id); };
var _u = K0._u, R = _u.R, NZ = _u.NZ, P = _u.P, SG = _u.SG, M = _u.M, shuffle = _u.shuffle, parse = _u.parse;
var _i = K0._i, NUMIN = _i.NUMIN, wireInput = _i.wireInput, fb = _i.fb;
var K = Object.create(K0);   // K0 = هستهٔ مشترک؛ K = همان + ابزارهای اختصاصی این درس

K.signs = function (cells) {   // cells: [{c:'p'|'n', t, r, e}]
    return '<div class="sg">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>';
  };;
var stepMath = function (s) { return String(s).replace(/[۰-۹]/g, function (c) { return c.charCodeAt(0) - 1776; }).replace(/[٠-٩]/g, function (c) { return c.charCodeAt(0) - 1632; }).replace(/−/g, '-'); };

  /* الگوی پلکانی: rows=[[a,op,b,r],...]  col: ستونی که کم/زیاد می‌شود (0 یا 2)  neg: از کدام ردیف زرد شود  d:[تغییر ستون، تغییر جواب] */
K.ladder = function (c) {
    var hd = ['', '', '', '', ''], h = '', i;
    hd[c.col] = c.hx; hd[4] = c.hr;
    h = '<div class="tw"><table class="lad" dir="ltr"><tr>' + hd.map(function (x) { return '<th>' + x + '</th>'; }).join('') + '</tr>';
    c.rows.forEach(function (r, k) {
      if (k) { h += '<tr class="cn"><td></td><td></td><td>' + (c.col === 2 ? '<span class="pl">↓ $' + stepMath(c.d[0]) + '$</span>' : '') + '</td><td></td><td><span class="pl g">↓ $' + stepMath(c.d[1]) + '$</span></td></tr>'; }
      h += '<tr class="r' + (k >= c.neg ? ' neg' : '') + '">';
      for (i = 0; i < 3; i++) {
        h += '<td' + (i === c.col ? ' class="chg"' : '') + '>$' + r[i] + '$</td>';
        if (i === 1 && c.col === 0) { }
      }
      h += '<td>$=$</td><td class="res">$' + r[3] + '$</td></tr>';
    });
    return h + '</table></div>';
  };;

  /* تولید سؤال: {tex, ans, errs:[{v,m}], expl} — kind: add | sub | mul | div | ord */
  function gen(kind, easy, undef) {
    var m = easy ? 5 : 12, m2 = easy ? 4 : 9, a, b, c, d, o;
    if (kind === 'add') {
      do { a = NZ(-m, m); b = NZ(-m, m); } while (a + b === 0);
      d = abs(a) > abs(b) ? a : b;
      o = {
        tex: P(a) + '+' + P(b), ans: a + b, errs: [{ v: -(a + b), m: 'علامت جواب را برعکس کردی.' }, { v: abs(a) + abs(b), m: 'علامت‌ها را نادیده گرفتی و اندازه‌ها را جمع کردی.' }, { v: a - b, m: 'به‌جای جمع، تفریق کردی.' }],
        expl: a * b > 0 ? 'هر دو ' + (a > 0 ? 'مثبت' : 'منفی') + '‌اند؛ اندازه‌ها را جمع می‌کنیم: ' + M(abs(a) + '+' + abs(b) + '=' + (abs(a) + abs(b))) + ' و علامت مشترک را می‌گذاریم: ' + M(a + b) + '.'
          : 'علامت‌ها مخالف‌اند؛ اندازهٔ کوچک‌تر را از بزرگ‌تر کم می‌کنیم: ' + M(Math.max(abs(a), abs(b)) + '-' + Math.min(abs(a), abs(b)) + '=' + abs(a + b)) + '. اندازهٔ ' + M(d) + ' بزرگ‌تر است، پس جواب ' + (a + b > 0 ? 'مثبت' : 'منفی') + ' می‌شود: ' + M(a + b) + '.'
      };
    } else if (kind === 'sub') {
      a = NZ(-m, m); b = Math.random() < 0.65 ? NZ(-m, -1) : NZ(1, m);
      o = {
        tex: a + '-' + P(b), ans: a - b, errs: [b < 0 ? { v: a - abs(b), m: 'علامت منفیِ عدد دوم را نادیده گرفتی؛ کم‌کردن عدد منفی یعنی جمع‌کردن اندازه‌اش.' } : { v: a + b, m: 'به‌جای تفریق، جمع کردی.' }, { v: -(a - b), m: 'علامت جواب را برعکس کردی.' }, { v: b - a, m: 'جای دو عدد را عوض کردی؛ باید عدد دوم را از عدد اول کم کنی.' }],
        expl: 'تفریق را به جمعِ قرینه تبدیل می‌کنیم: ' + M(a + '-' + P(b) + '=' + a + '+' + P(-b) + '=' + (a - b)) + '.'
      };
    } else if (kind === 'mul') {
      do { a = NZ(-m2, m2); b = NZ(-m2, m2); } while (abs(a) === 1 && abs(b) === 1);
      o = {
        tex: P(a) + '\\times' + P(b), ans: a * b, errs: [{ v: -(a * b), m: 'قاعدهٔ علامت را برعکس به کار بردی.' }, a * b < 0 ? { v: abs(a * b), m: 'علامت منفی را فراموش کردی؛ علامت‌های متفاوت، حاصل منفی می‌دهند.' } : { v: a + b, m: 'به‌جای ضرب، جمع کردی.' }, { v: a + b, m: 'به‌جای ضرب، جمع کردی.' }],
        expl: 'اندازه‌ها را ضرب می‌کنیم: ' + M(abs(a) + '\\times' + abs(b) + '=' + abs(a * b)) + '؛ علامت‌ها ' + (a * b > 0 ? 'یکسان‌اند، پس حاصل مثبت' : 'متفاوت‌اند، پس حاصل منفی') + ' است: ' + M(a * b) + '.'
      };
    } else if (kind === 'div') {
      b = NZ(-m2, m2);
      if (undef) { a = NZ(-m2, m2); return { tex: P(a) + '\\div0', ans: 'U', errs: [{ v: 0, m: 'تقسیم بر صفر برابر صفر نیست؛ تعریف‌نشده است.' }, { v: a, m: 'تقسیم بر صفر تعریف‌نشده است، نه خودِ عدد.' }], expl: 'تقسیم بر صفر تعریف‌نشده است؛ هیچ عددی نیست که ضربش در صفر برابر ' + M(a) + ' شود.' }; }
      c = NZ(-m2, m2); a = c * b;
      o = {
        tex: P(a) + '\\div' + P(b), ans: c, errs: [{ v: -c, m: 'قاعدهٔ علامت را برعکس به کار بردی.' }, c < 0 ? { v: abs(c), m: 'علامت منفی را فراموش کردی؛ علامت‌های متفاوت، حاصل منفی می‌دهند.' } : { v: a - b, m: 'به‌جای تقسیم، تفریق کردی.' }],
        expl: 'تقسیم وارون ضرب است: چون ' + M(c + '\\times' + P(b) + '=' + a) + '، پس ' + M(P(a) + '\\div' + P(b) + '=' + c) + '.'
      };
    } else {
      var f = R(1, 4), x, y, z, w, t, s = easy ? 4 : 5;
      if (f === 1) {
        y = NZ(-4, 4); c = NZ(-s, s); x = c * y; z = NZ(-s, s); w = NZ(-4, 4); t = z * w;
        o = {
          tex: x + '\\div' + P(y) + '+' + z + '\\times' + P(w), ans: c + t, errs: [{ v: (c + z) * w, m: 'جمع را زودتر از ضرب انجام دادی؛ ضرب و تقسیم مقدم‌اند.' }, { v: c - t, m: 'در مرحلهٔ آخر، جمع را تفریق کردی.' }],
          expl: 'اول تقسیم: ' + M(x + '\\div' + P(y) + '=' + c) + '، بعد ضرب: ' + M(z + '\\times' + P(w) + '=' + t) + '، در آخر جمع: ' + M(c + '+' + P(t) + '=' + (c + t)) + '.'
        };
      }
      else if (f === 2) {
        a = NZ(-9, 9); b = NZ(-s, s); c = NZ(-s, s); t = b * c;
        o = {
          tex: a + '+' + P(b) + '\\times' + P(c), ans: a + t, errs: [{ v: (a + b) * c, m: 'جمع را زودتر از ضرب انجام دادی؛ ضرب مقدم است.' }, { v: a - t, m: 'علامت حاصل‌ضرب را هنگام جمع برعکس کردی.' }],
          expl: 'اول ضرب: ' + M(P(b) + '\\times' + P(c) + '=' + t) + '، بعد جمع: ' + M(a + '+' + P(t) + '=' + (a + t)) + '.'
        };
      }
      else if (f === 3) {
        a = NZ(-s, s); b = NZ(-9, 9); do { c = NZ(-9, 9); } while (c === b); d = b - c;
        o = {
          tex: P(a) + '\\times(' + b + '-' + P(c) + ')', ans: a * d, errs: [{ v: a * b - c, m: 'اول داخل پرانتز را حساب نکردی؛ پرانتز مقدم است.' }, { v: -(a * d), m: 'علامت حاصل‌ضرب را برعکس کردی.' }],
          expl: 'اول داخل پرانتز: ' + M(b + '-' + P(c) + '=' + d) + '، بعد ضرب: ' + M(P(a) + '\\times' + P(d) + '=' + (a * d)) + '.'
        };
      }
      else {
        a = NZ(-9, 9); b = NZ(-s, s); c = NZ(-s, s); t = b * c;
        o = {
          tex: a + '-' + P(b) + '\\times' + P(c), ans: a - t, errs: [{ v: (a - b) * c, m: 'تفریق را زودتر از ضرب انجام دادی؛ ضرب مقدم است.' }, { v: a + t, m: 'هنگام کم‌کردن حاصل‌ضرب، علامتش را عوض نکردی.' }],
          expl: 'اول ضرب: ' + M(P(b) + '\\times' + P(c) + '=' + t) + '، بعد تفریق: ' + M(a + '-' + P(t) + '=' + a + '+' + P(-t) + '=' + (a - t)) + '.'
        };
      }
    }
    o.errs = o.errs.filter(function (e) { return e.v !== o.ans; }); o.kind = kind; return o;
  }

  /* ---- کارت‌های چهار عمل: پیش‌بینی علامت، بعد مقدار ---- */
  K.cards = function (host) {
    var KS = [['add', 'جمع', '+'], ['sub', 'تفریق', '\u2212'], ['mul', 'ضرب', '\u00d7'], ['div', 'تقسیم', '\u00f7']], cur, q, step, pick, wrap, grid, cover;
    host.innerHTML = '<div class="cards"><div class="cgrid">' + KS.map(function (k) { return '<button type="button" class="cd" data-k="' + k[0] + '"><span class="cs">' + k[2] + '</span><b>' + k[1] + '</b><small>یک مثال بیاور و پیش‌بینی کن</small></button>'; }).join('') + '</div><div class="cover" hidden></div></div>';
    wrap = host.querySelector('.cards'); grid = wrap.querySelector('.cgrid'); cover = wrap.querySelector('.cover');
    function zeroExample(easy) {
      var m = easy ? 4 : 9, a, b, tex;
      if (cur === 'add') { a = NZ(1, m); b = -a; tex = P(a) + '+' + P(b); }
      else if (cur === 'sub') { a = NZ(-m, m); b = a; tex = P(a) + '-' + P(b); }
      else if (cur === 'mul') { a = NZ(-m, m); tex = P(a) + '\\times0'; }
      else { b = NZ(-m, m); tex = '0\\div' + P(b); }
      return { tex: tex, ans: 0, errs: [], expl: 'حاصل این عبارت صفر است. صفر نه مثبت است و نه منفی؛ بنابراین علامت مثبت یا منفی برای جواب انتخاب نمی‌کنیم.' };
    }
    function fresh(easy) {
      q = Math.random() < 0.22 ? zeroExample(easy) : gen(cur, easy, cur === 'div' && Math.random() < 0.25);
      step = 'sign'; pick = null; paint();
    }
    function paint(res) {
      var name = KS.filter(function (k) { return k[0] === cur; })[0][1], h = '<div class="ch"><b>کارت ' + name + '</b><button type="button" class="x" aria-label="بستن">✕</button></div><div class="dm k">' + M(q.tex) + '</div>';
      if (step === 'sign') { h += '<p class="ask">علامت جواب چیست؟</p><div class="opts"><button type="button" class="btn" style="box-shadow:2px 2px 0 var(--ink)" data-s="p">مثبت</button><button type="button" class="btn" style="box-shadow:2px 2px 0 var(--ink)" data-s="n">منفی</button>' + (cur === 'div' ? '<button type="button" class="btn" style="box-shadow:2px 2px 0 var(--ink)" data-s="U">تعریف‌نشده</button>' : '') + '</div>'; }
      else if (step === 'val') { h += '<p class="ask">پیش‌بینی‌ات: <b>' + (pick === 'p' ? 'مثبت' : 'منفی') + '</b>. حالا مقدار جواب را بنویس:</p>' + NUMIN() + '<div class="opts"><button type="button" class="btn primary" data-go="1">ثبت</button></div>'; }
      else { h += res.html + '<div class="opts">' + (res.ok ? '<button type="button" class="btn primary" data-new="1">مثال جدید</button>' : '<button type="button" class="btn primary" data-easy="1">مثال ساده‌تر</button><button type="button" class="btn" data-again="1">همین مثال دوباره</button>') + '</div>'; }
      cover.innerHTML = rr(h); if (step === 'val') { wireInput(cover, check); }
    }
    function done(sOk, vOk, v) {
      var tr = q.ans === 'U' ? 'U' : (q.ans > 0 ? 'p' : 'n'), msg = '', e;
      if (q.ans === 'U') { msg = sOk ? 'درست پیش‌بینی کردی: تقسیم بر صفر تعریف‌نشده است.' : 'این تقسیم بر صفر است و جواب ندارد.'; }
      else if (q.ans === 0) { msg = 'حاصل این عبارت صفر است. صفر نه مثبت است و نه منفی؛ پس هیچ‌یک از دو علامت انتخاب‌شده درست نیست.'; }
      else if (!sOk) { msg = 'علامت جواب را درست پیش‌بینی نکردی.'; }
      else if (!vOk) { e = q.errs.filter(function (x) { return x.v === v; })[0]; msg = 'علامت درست بود، ولی مقدار نه. ' + (e ? e.m : 'اندازهٔ جواب را دوباره بررسی کن.'); }
      else { msg = 'آفرین! هم علامت و هم مقدار درست بود.'; }
      var correct = q.ans === 'U' ? sOk : sOk && vOk;
      // Zero has no positive/negative sign: show a single green explanatory message.
      if (q.ans === 0) { step = 'done'; paint({ ok: true, html: fb(true, msg) }); return; }
      step = 'done'; paint({ ok: correct, html: fb(correct, msg) + '<p class="ex">' + q.expl + '</p>' });
    }
    function check() {
      var v = parse(cover.querySelector('.numin').value);
      if (v === null) { cover.querySelector('.numin').focus(); return; }
      done(pick === (q.ans > 0 ? 'p' : 'n'), v === q.ans, v);
    }
    wrap.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) { return; }
      if (b.classList.contains('cd')) { cur = b.dataset.k; grid.hidden = true; cover.hidden = false; cover.style.minHeight = grid.dataset.h + 'px'; fresh(false); return; }
      if (b.classList.contains('x')) { cover.hidden = true; grid.hidden = false; return; }
      if (b.dataset.s) { pick = b.dataset.s; if (pick === 'U') { done(q.ans === 'U', q.ans === 'U', null); } else if (q.ans === 'U' || q.ans === 0) { done(false, false, null); } else { step = 'val'; paint(); } }
      else if (b.dataset.go) { check(); } else if (b.dataset.new) { fresh(false); } else if (b.dataset.easy) { fresh(true); } else if (b.dataset.again) { step = 'sign'; pick = null; paint(); }
    });
    grid.dataset.h = Math.max(grid.offsetHeight, 300);
  };


  /* ---- تمرین مرحله‌ای با تشخیص نوع خطا ---- */
  K.steps = function (host) {
    var touched = false, ST = [['جمع', ['add']], ['تفریق', ['sub']], ['ضرب و تقسیم', ['mul', 'div']], ['عبارت ترکیبی', ['ord']]], si = 0, ok = 0, tries = 0, q, finished = false;
    function newQ() { var ks = ST[si][1]; q = gen(ks[R(0, ks.length - 1)], si === 0, false); tries = 0; }
    function paint(fbk, locked) {
      var h = '<div class="stg">' + ST.map(function (s, i) { return '<span class="' + (i < si || finished ? 'dn' : i === si ? 'cu' : '') + '">' + (i < si || finished ? '✓ ' : '') + s[0] + '</span>'; }).join('') + '</div>';
      if (finished) { host.innerHTML = rr(h + '<div class="fb ok"><b>همهٔ مرحله‌ها را گذراندی!</b> حالا برو سراغ تمرین پایانی.</div><div class="opts"><button type="button" class="btn" data-r="1">از اول، با اعداد جدید</button></div>'); return; }
      h += '<p class="stage-progress-meta">مرحلهٔ ' + fa(si + 1) + ' — پاسخ‌های درست: ' + fa(ok) + ' از ۲</p><div class="dm k">' + M(q.tex) + '</div>';
      h += locked ? '' : NUMIN() + '<div class="opts"><button type="button" class="btn primary" data-go="1">بررسی</button></div>';
      host.innerHTML = rr(h + (fbk || '')); if (!locked) { wireInput(host, check, !touched); }
    }
    function check() {
      var inp = host.querySelector('.numin'), v = parse(inp.value), e, nxt;
      if (v === null) { paint(fb(false, 'یک عدد صحیح بنویس؛ مثلاً ' + SG(-4) + ' یا ' + SG(12) + '.')); return; }
      if (v === q.ans) {
        ok++; nxt = ok >= 2 ? (si === 3 ? 'پایان' : 'مرحلهٔ بعد') : 'سؤال بعدی';
        paint(fb(true, 'درست است! ✓') + '<p class="ex">' + q.expl + '</p><div class="opts"><button type="button" class="btn primary" data-n="1">' + nxt + '</button></div>', true); return;
      }
      tries++; e = q.errs.filter(function (x) { return x.v === v; })[0];
      if (tries < 2) { paint(fb(false, (e ? e.m : 'جواب درست نیست؛ دوباره محاسبه کن.') + ' یک بار دیگر امتحان کن.')); host.querySelector('.numin').value = inp.value; return; }
      paint(fb(false, (e ? e.m + ' ' : '') + 'جواب درست: <b>' + SG(q.ans) + '</b>') + '<p class="ex">' + q.expl + '</p><div class="opts"><button type="button" class="btn primary" data-n="2">سؤال بعدی</button></div>', true);
    }
    host.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) { return; } touched = true;
      if (b.dataset.go) { check(); }
      else if (b.dataset.n) { if (ok >= 2) { ok = 0; si++; if (si > 3) { finished = true; paint(); return; } } newQ(); paint(); }
      else if (b.dataset.r) { si = 0; ok = 0; finished = false; newQ(); paint(); }
    });
    newQ(); paint();
  };


  /* ---- تمرین پایانی ۵ سؤالی، چهارگزینه‌ای با اعداد تصادفی ---- */
  K.final = function (host) {
    var qs, i, ans;
    function build() {
      qs = ['add', 'sub', 'mul', 'div', 'ord'].map(function (k) {
        var q = gen(k, false, k === 'div' && Math.random() < 0.3), opts = [{ v: q.ans, ok: true }], seen = {}, t;
        seen[q.ans] = 1; q.errs.forEach(function (e) { if (!seen[e.v] && opts.length < 4) { seen[e.v] = 1; opts.push({ v: e.v, m: e.m }); } });
        while (opts.length < 4) { t = q.ans === 'U' ? R(-9, 9) : q.ans + NZ(-4, 4); if (!seen[t]) { seen[t] = 1; opts.push({ v: t }); } }
        q.opts = shuffle(opts); return q;
      });
      i = 0; ans = [];
    }
    function paint() {
      var q = qs[i], a = ans[i], h, last = i === 4;
      if (i === 5) {
        var s = ans.filter(function (x, k) { return qs[k].opts[x].ok; }).length;
        host.innerHTML = rr('<div class="fb ' + (s >= 4 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(s) + ' از ۵</b><br>' + (s === 5 ? 'عالی بود! به همهٔ سؤال‌ها درست جواب دادی.' : s >= 3 ? 'خوب بود. سؤال‌هایی را که اشتباه کردی دوباره مرور کن.' : 'یک بار دیگر درس را مرور کن؛ بعد با اعداد جدید امتحان کن.') + '</div><div class="opts end-actions"><button type="button" class="btn" data-pv="1">مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1">سؤال‌های جدید</button></div>'); return;
      }
      h = '<div class="stg">' + qs.map(function (x, k) { return '<span class="' + (ans[k] !== undefined ? (qs[k].opts[ans[k]].ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">حاصل کدام است؟</p><div class="dm k">' + M(q.tex) + '</div><div class="mc">';
      q.opts.forEach(function (o, k) { h += '<button type="button" class="btn opt' + (a !== undefined ? (o.ok ? ' right' : k === a ? ' wrong' : '') : '') + '" data-o="' + k + '"' + (a !== undefined ? ' disabled' : '') + '><bdi dir="ltr">' + SG(o.v) + '</bdi></button>'; });
      h += '</div>';
      if (a !== undefined) { var o = q.opts[a]; h += fb(o.ok, o.ok ? 'درست است! ✓' : (o.m || 'این گزینه درست نیست.')) + '<p class="ex">' + q.expl + '</p>'; }
      h += '<div class="opts n01-final-nav"><button type="button" class="btn" data-p="1"' + (i ? '' : ' disabled') + '>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (a === undefined ? ' disabled' : '') + '>' + (last ? 'مشاهدهٔ نتیجه':'سؤال بعدی') + '</button></div>';
      host.innerHTML = rr(h);
    }
    host.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || b.disabled) { return; }
      if (b.dataset.o) { ans[i] = +b.dataset.o; paint(); } else if (b.dataset.nx) { i++; paint(); } else if (b.dataset.p) { i--; paint(); }
      else if (b.dataset.pv) { i = 0; paint(); } else if (b.dataset.r) { build(); paint(); }
    });
    build(); paint();
  };


return {
  html: function () {
    var T = String.raw;
    return [
      K.sn('۱', 'اعداد صحیح را بشناسیم'),
      '<p>اعداد صحیح شامل عددهای منفی، صفر و عددهای مثبت‌اند:</p>', K.dm(T`\ldots,-3,-2,-1,0,1,2,3,\ldots`),
      T`<p>برای مثال، دمای ۳ درجه بالای صفر را با $+3$ و دمای ۳ درجه زیر صفر را با $-3$ نشان می‌دهیم. عددهای مثبت و منفیِ هم‌اندازه، مثل $5$ و $-5$، قرینهٔ یکدیگرند.</p>`,
      K.box('note', 'نکته', T`<p>منظور از «اندازهٔ عدد» مقدار آن بدون در نظر گرفتن علامت است؛ برای مثال، اندازهٔ $-7$ برابر ۷ است. این مفهوم را در درس قدرمطلق همین فصل دقیق‌تر می‌خوانیم.</p>`),
      '<h4>نمایش روی محور اعداد</h4><p>روی محور، هرچه به راست برویم عدد بزرگ‌تر و هرچه به چپ برویم عدد کوچک‌تر می‌شود. خودت امتحان کن:</p><div class="nl" id="nl1"></div>',

      K.sn('۲', 'جمع اعداد صحیح'),
      '<h4>حالت اول: جمع دو عدد مثبت</h4>', T`<p>برای $3+4$، از صفر ۳ واحد به راست می‌رویم (عدد اول) و سپس ۴ واحد دیگر به راست ادامه می‌دهیم (عدد دوم)؛ به $7$ می‌رسیم:</p>`, K.dm(T`3+4=7`),
      '<h4>حالت دوم: جمع دو عدد منفی</h4>', T`<p>برای $(-3)+(-4)$، از صفر ۳ واحد به چپ می‌رویم (عدد اول) و سپس ۴ واحد دیگر به چپ ادامه می‌دهیم (عدد دوم)؛ به $-7$ می‌رسیم. یعنی اندازه‌ها جمع می‌شوند و علامت منفی می‌ماند:</p>`, K.dm(T`(-3)+(-4)=-7`),
      '<h4>حالت سوم: جمع دو عدد با علامت مخالف</h4>',
      T`<p>مثلاً $(-7)+4$: از صفر ۷ واحد به چپ می‌رویم و سپس ۴ واحد به راست برمی‌گردیم؛ در نهایت به $-3$ می‌رسیم:</p>`, K.dm(T`(-7)+4=-3`),
      '<p>برای محاسبهٔ این نوع جمع، اندازهٔ دو عدد را مقایسه می‌کنیم:</p>', K.dm(T`7-4=3`),
      '<p>چون عدد منفی از نظر اندازه بزرگ‌تر است، جواب منفی می‌شود. مثال دیگر:</p>', K.dm(T`(-3)+8=5`),
      T`<p>زیرا $8-3=5$ و عدد مثبت اندازهٔ بزرگ‌تری دارد.</p>`,
      '<h4>جمع یک عدد با صفر</h4><p>جمع هر عدد با صفر، همان عدد را می‌دهد:</p>', K.dm(T`-6+0=-6`),
      K.box('sum', 'خلاصهٔ جمع', '<ul><li><b>هم‌علامت:</b> اندازه‌ها را جمع کن و همان علامت را نگه دار.</li><li><b>مخالف‌علامت:</b> اندازهٔ کوچک‌تر را از بزرگ‌تر کم کن و علامت عددی را نگه دار که اندازهٔ بزرگ‌تری دارد.</li><li><b>وجود صفر:</b> عدد دیگر بدون تغییر باقی می‌ماند.</li></ul>'),

      K.sn('۳', 'تفریق اعداد صحیح'),
      T`<p>اگر عدد کوچک‌تر را از بزرگ‌تر کم کنیم مشکلی نیست؛ اما در $7-10$ از صفر هم پایین‌تر می‌رویم. روی محور از ۷ شروع می‌کنیم و ۱۰ واحد به چپ می‌رویم:</p>`, K.dm(T`7-10=-3`),
      '<h4>وقتی عددی منفی را کم می‌کنیم</h4><p>این الگو را از بالا به پایین بخوان: در هر ردیف، عددِ کم‌شونده یک واحد کمتر می‌شود و جواب یک واحد بیشتر.</p>',
      K.ladder({ col: 2, neg: 4, hx: 'عدد کم‌شونده', hr: 'جواب', d: ['−۱', '+۱'], rows: [['5', '-', '3', '2'], ['5', '-', '2', '3'], ['5', '-', '1', '4'], ['5', '-', '0', '5'], ['5', '-', '(-1)', '6'], ['5', '-', '(-2)', '7']] }),
      '<p class="ladcap">ردیف‌های زردرنگ: کم‌کردن عدد منفی؛ همان الگو ادامه پیدا می‌کند.</p>',
      T`<p>مدل بدهی هم همین را می‌گوید: اگر ۵ تومان از بدهی‌ات را ببخشند (کم‌کردنِ یک مقدار منفی)، ۵ تومان ثروتمندتر می‌شوی. پس کم‌کردن یک عدد منفی مثل جمع‌کردن همان عدد با علامت مثبت است:</p>`, K.dm(T`5-(-4)=5+4=9`),
      K.box('err', '⚠ خطای رایج', T`<p>در $-3-(-6)$ سه علامت منفی داریم: علامتِ خودِ عدد $-3$، علامتِ عمل تفریق، و علامتِ عدد $-6$ داخل پرانتز. اگر علامت داخل پرانتز را نادیده بگیری، به‌اشتباه $-9$ به‌دست می‌آید؛ جواب درست $3$ است.</p>`),
      '<h4>قاعدهٔ عمومی تفریق</h4><p>تفریق یک عدد، با جمع‌کردن قرینهٔ آن عدد معادل است:</p>', K.dm(T`a-b=a+(-b)`),
      '<p>برای مثال:</p>', K.dm(T`\begin{aligned}7-10&=7+(-10)=-3\\5-(-4)&=5+4=9\\-3-6&=-3+(-6)=-9\\-3-(-6)&=-3+6=3\end{aligned}`),
      '<p>این قاعده باعث می‌شود جمع و تفریق را با یک روش واحد انجام دهیم.</p>',

      K.sn('۴', 'ضرب اعداد صحیح'),
      '<p>ضرب در یک عدد مثبت یعنی جمع تکراری:</p>', K.dm(T`\begin{aligned}3\times4&=4+4+4=12\\3\times(-4)&=(-4)+(-4)+(-4)=-12\end{aligned}`),
      T`<p>برای $(-4)\times3$ از جابه‌جایی استفاده می‌کنیم: جواب همان $-12$ است.</p>`,
      '<h4>چرا منفی در منفی، مثبت می‌شود؟</h4><p>این الگو را از بالا به پایین بخوان: در هر ردیف، عامل اول یک واحد کمتر می‌شود و حاصل‌ضرب ۴ واحد بیشتر.</p>',
      K.ladder({ col: 0, neg: 4, hx: 'عامل اول', hr: 'حاصل‌ضرب', d: ['−۱', '+۴'], rows: [['3', T`\times`, '(-4)', '-12'], ['2', T`\times`, '(-4)', '-8'], ['1', T`\times`, '(-4)', '-4'], ['0', T`\times`, '(-4)', '0'], ['(-1)', T`\times`, '(-4)', '4'], ['(-2)', T`\times`, '(-4)', '8']] }),
      '<p class="ladcap">ردیف‌های زردرنگ: ادامهٔ همان الگو.</p>',
      '<p>ادامهٔ الگو نشان می‌دهد چرا حاصل‌ضرب دو عدد منفی، مثبت است.</p>',
      '<h4>جدول قواعد علامت در ضرب</h4>',
      K.signs([{ c: 'p', t: 'مثبت × مثبت', r: 'حاصل مثبت', e: T`4\times3=12` }, { c: 'p', t: 'منفی × منفی', r: 'حاصل مثبت', e: T`(-4)\times(-3)=12` }, { c: 'n', t: 'مثبت × منفی', r: 'حاصل منفی', e: T`4\times(-3)=-12` }, { c: 'n', t: 'منفی × مثبت', r: 'حاصل منفی', e: T`(-4)\times3=-12` }]),
      K.box('sum', 'برای ضرب دو عدد صحیح', '<ol><li>اندازهٔ دو عدد را در هم ضرب می‌کنیم.</li><li>اگر علامت‌ها یکسان باشند، حاصل مثبت است؛ اگر متفاوت باشند، حاصل منفی است.</li><li>ضرب هر عدد در صفر برابر صفر است.</li></ol>'),

      K.sn('۵', 'تقسیم اعداد صحیح'),
      '<p>تقسیم عمل وارون ضرب است؛ پس هر تقسیم را با یک ضرب می‌توانیم بررسی کنیم:</p>', K.dm(T`6\times4=24\;\Rightarrow\;24\div6=4`),
      '<p>همین فکر، قاعدهٔ علامت را هم می‌سازد:</p>', K.dm(T`\begin{aligned}4\times(-6)=-24&\;\Rightarrow\;(-24)\div(-6)=4\\(-4)\times(-6)=24&\;\Rightarrow\;24\div(-6)=-4\end{aligned}`),
      '<h4>جدول قواعد علامت در تقسیم</h4>',
      K.signs([{ c: 'p', t: 'مثبت ÷ مثبت', r: 'حاصل مثبت', e: T`12\div3=4` }, { c: 'p', t: 'منفی ÷ منفی', r: 'حاصل مثبت', e: T`(-12)\div(-3)=4` }, { c: 'n', t: 'مثبت ÷ منفی', r: 'حاصل منفی', e: T`12\div(-3)=-4` }, { c: 'n', t: 'منفی ÷ مثبت', r: 'حاصل منفی', e: T`(-12)\div3=-4` }]),
      '<p>ابتدا اندازهٔ عددها را تقسیم می‌کنیم و سپس علامت حاصل را تعیین می‌کنیم.</p>',
      K.box('note', 'چهار نکتهٔ مهم', T`<ul><li><b>صفر تقسیم بر عدد غیرصفر</b> برابر صفر است: $0\div5=0$.</li><li><b>تقسیم بر صفر تعریف نشده است:</b> برای $5\div0$ هیچ عددی نیست که ضربش در صفر ۵ شود؛ و $0\div0$ هم جواب یکتا ندارد.</li><li><b>خط کسری همان علامت تقسیم است</b> و این دو یکی‌اند: $\dfrac{a}{b}=a\div b$ (با $b\neq0$). مثلاً $\dfrac{12}{3}=12\div3=4$.</li><li><b>تقسیم دو عدد صحیح همیشه عدد صحیح نمی‌شود:</b> $7\div2=\dfrac{7}{2}=3.5$. این موضوع را در درس کسرها بیشتر می‌بینیم.</li></ul>`),

      K.sn('۶', 'مرجع سریع چهار عمل اصلی'),
      K.tbl(['عمل', 'قاعدهٔ اصلی', 'نمونه'], [
        ['جمع هم‌علامت', 'اندازه‌ها را جمع کن؛ علامت مشترک را نگه دار.', T`$(-3)+(-5)=-8$`],
        ['جمع مخالف‌علامت', 'اندازه‌ها را تفریق کن؛ علامت عددی را نگه دار که اندازهٔ بزرگ‌تری دارد.', T`$(-8)+5=-3$`],
        ['تفریق', 'عدد دوم را به قرینه‌اش تبدیل کن و جمع بزن.', T`$4-(-3)=7$`],
        ['ضرب', 'اندازه‌ها را ضرب کن؛ علامت‌های یکسان مثبت و متفاوت منفی.', T`$(-4)\times(-3)=12$`],
        ['تقسیم', 'اندازه‌ها را تقسیم کن؛ قواعد علامت مانند ضرب است.', T`$(-12)\div3=-4$`]], ['', 'l', '']),

      K.sn('۷', 'ترتیب انجام عملیات'),
      '<p>در عبارت‌هایی که چند عمل دارند، رعایت ترتیب عملیات ضروری است:</p><ol><li>پرانتزها</li><li>توان‌ها، در صورت وجود</li><li>ضرب و تقسیم، از چپ به راست</li><li>جمع و تفریق، از چپ به راست</li></ol>',
      '<p>در مثال زیر، برچسب‌ها نشان می‌دهند هر بخش در کدام مرحله حساب می‌شود. ضرب و تقسیم از چپ به راست انجام می‌شوند، پس اول تقسیم و بعد ضرب، و در آخر جمع:</p>',
      K.ord([[{ t: T`18\div(-3)`, l: 'اول: تقسیم', c: 'b' }, '+', { t: T`2\times(-4)`, l: 'دوم: ضرب', c: 'r' }], ['=', { t: T`(-6)+(-8)`, l: 'سوم: جمع', c: 'g' }], ['=', '-14']]),
      '<p>با پرانتز هم همین‌طور؛ ابتدا داخل پرانتز، بعد ضرب:</p>',
      K.ord([[T`2\times`, { t: '(3-7)', l: 'اول: پرانتز', c: 'b' }], ['=', { t: T`2\times(-4)`, l: 'دوم: ضرب', c: 'r' }], ['=', '-8']]),
      '<p>در جمع و تفریق متوالی، عملیات از چپ به راست انجام می‌شوند:</p>',
      K.ord([[{ t: '-7+12', l: 'اول', c: 'b' }, '-9'], ['=', { t: '5-9', l: 'دوم', c: 'r' }], ['=', '-4']]),
      K.sn('۸', 'با کارت‌ها پیش‌بینی کن'),
      '<p>یکی از چهار کارت را باز کن. اول علامت جواب را پیش‌بینی می‌کنی، بعد مقدارش را می‌نویسی. اگر اشتباه کنی، مثال ساده‌تری هم می‌گیری.</p><div id="cards1"></div>',
      K.sn('۹', 'تمرین مرحله‌ای'),
      '<p>هر مرحله با دو پاسخ درست تمام می‌شود. اگر اشتباه کنی، نوع اشتباه را به تو می‌گوییم.</p><div class="cover" id="steps1" style="animation:none"></div>',
      K.sn('۱۰', 'تمرین پایانی'),
      '<p>پنج سؤال با اعداد تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover" id="final1" style="animation:none"></div>',
      K.box('sum', 'بعد از این درس باید بتوانی', '<ul><li>اعداد صحیح را روی محور نشان دهی و حرکت روی محور را به جمع و تفریق ربط دهی.</li><li>دو عدد صحیح را با هر علامتی جمع کنی.</li><li>هر تفریق را به جمعِ قرینه تبدیل کنی، به‌ویژه وقتی عدد منفی کم می‌شود.</li><li>علامت و مقدار حاصل‌ضرب و حاصل‌تقسیم را درست پیدا کنی.</li><li>توضیح بدهی چرا تقسیم بر صفر تعریف‌نشده است.</li><li>عبارت‌های چندعملی را با رعایت ترتیب عملیات حساب کنی.</li></ul>')
    ].join('');
  },
  init: function (panel) { K.numberLine(panel.querySelector('#nl1')); K.cards(panel.querySelector('#cards1')); K.steps(panel.querySelector('#steps1')); K.final(panel.querySelector('#final1')); }
};
  }
};
