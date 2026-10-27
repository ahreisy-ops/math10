/* درس N06 — توان‌های صحیح و قوانین ساده‌ی توان
   تمام تمرین‌ها اعداد تصادفی می‌سازند و پاسخ را با محاسبهٔ دقیق (کسری) می‌سنجند. */
window.LESSONS = window.LESSONS || {};
window.LESSONS.N06 = {
  needs: ['utils', 'inputs'],
  /* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
  setup: function (K0) {
    var ML = window.MathLite, fa = ML.fa, rr0 = ML.renderRich;
    var _u = K0._u, R = _u.R, shuffle = _u.shuffle;
    var fb = K0._i.fb;
    var K = Object.create(K0);
    var T = String.raw, NL = '\\\\', tm = '\\times', dv = '\\div';

    /* ---------- استایل مخصوص این درس (فقط یک بار) ---------- */
    if (!document.getElementById('n6css')) {
      var st = document.createElement('style'); st.id = 'n6css';
      st.textContent = [
        '.n6-w{font-size:.95em}.n6-w .btn{min-height:34px;min-width:0;padding:2px 14px;font-size:.88rem}.n6-w .ask{font-size:.95rem}.n6-w .opts{gap:6px}',
        '.n6-w .mc .opt{min-height:44px;font-size:1rem}',
        '.n6-chip{padding:2px 12px;border:2px solid var(--ink);border-radius:99px;background:#fff;font:inherit;font-size:.95rem;cursor:pointer;direction:ltr}',
        '.n6-chip.sel{background:var(--mark)}',
        '#n6a .n6-base-btn{min-width:73px;min-height:39px;display:inline-flex;justify-content:center;align-items:center}',
        '#n6a .n6-sign-step{width:38px;height:38px;min-width:38px;min-height:38px;padding:0;border-radius:50%;display:inline-flex;justify-content:center;align-items:center;font-size:1.12rem;line-height:1}',
        '#n6a .n6-mode-btn{direction:rtl;display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:39px}',
        '.n6-line{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;align-items:center;margin:8px 0}',
        '.n6-in{width:6.5em;padding:4px 8px;border:2px solid var(--ink);border-radius:10px;font:inherit;font-size:.95rem;text-align:center;direction:ltr}',
        '.n6-tk{display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;width:26px;height:26px;line-height:1;margin:2px;border-radius:50%;text-align:center;color:#fff;font-weight:bold;font-size:.78rem}',
        '.n6-tk.g1{background:blue}.n6-tk.g2{background:green}.n6-tk.cx{background:#c9d1da;text-decoration:line-through;color:#6b7686}',
        '.n6-bar{border-top:3px solid var(--ink);margin:4px auto;width:60%;min-width:110px;height:0}',
        '.n6-tks{direction:ltr;text-align:center}',
        '.n6-count-modes{display:flex;direction:rtl;justify-content:center;gap:9px;flex-wrap:wrap;margin:4px 0 12px}',
        '.n6-count-modes .n6-count-mode{font:inherit;font-size:.9rem;min-height:40px;min-width:75px;padding:5px 15px;border:2px solid var(--ink);border-radius:13px;background:#fff;box-shadow:2px 2px 0 var(--ink);cursor:pointer}',
        '.n6-count-modes .n6-count-mode.sel{background:var(--mark)}',
        '.n6-count-modes .n6-count-mode:focus-visible{outline:2px solid var(--accent);outline-offset:3px}',
        '#n6b .n6-in{box-sizing:border-box;height:44px;min-height:44px;width:104px;max-width:104px;font-size:1rem;line-height:1.3;padding:8px 10px}',
        '#n6b .btn[data-ck],#n6b .btn[data-nx]{box-sizing:border-box;min-height:44px;height:44px;font-size:1rem;line-height:1.3;padding:8px 16px}',
        ':is(#n6c,#n6-static) .n6-pr{box-sizing:border-box;display:grid;grid-template-columns:minmax(0,1fr) 26px minmax(0,1fr);align-items:center;column-gap:6px;width:min(100%,285px);min-height:44px;padding:5px 12px;margin:3px auto;direction:ltr;border:2px dashed #c8d4e6;border-radius:13px;background:#fff}',
        ':is(#n6c,#n6-static) .n6-pr .e{min-width:0;text-align:center}:is(#n6c,#n6-static) .n6-pr .eq{min-width:0;text-align:center}:is(#n6c,#n6-static) .n6-pr .v{min-width:0;text-align:center}',
        ':is(#n6c,#n6-static) .n6-pr .n6-in{box-sizing:border-box;width:94px;max-width:100%;height:44px;min-height:44px;margin:0 auto;padding:6px 7px;font-size:1rem}',
        ':is(#n6c,#n6-static) .n6-div-step{box-sizing:border-box;display:grid;grid-template-columns:minmax(0,1fr) 26px minmax(0,1fr);column-gap:6px;align-items:center;width:min(100%,285px);height:27px;padding:0 12px;margin:0 auto;direction:ltr}',
        ':is(#n6c,#n6-static) .n6-div-step .n6-div-pill{grid-column:3;justify-self:center}',
        ':is(#n6c,#n6-static) .n6-div-pill{display:inline-flex;align-items:center;justify-content:center;gap:4px;min-width:52px;height:24px;box-sizing:border-box;padding:2px 9px;border:1.5px solid #c52b47;border-radius:999px;background:#d64564;color:white;font:bold .85rem/1 Tahoma,sans-serif;direction:ltr;unicode-bidi:isolate;white-space:nowrap}',
        ':is(#n6c,#n6-static) .n6-div-pill .n6-down{font-size:1.05rem;line-height:1}',
        '#n6c .btn[data-ck],#n6c .btn[data-nx]{box-sizing:border-box;min-height:44px;height:44px;font-size:1rem;line-height:1.3;padding:8px 16px}',
        '#n6d .mc{grid-template-columns:1fr;justify-items:center;gap:8px}#n6d .mc .opt{width:min(100%,440px);max-width:440px;min-height:44px;padding:8px 12px;text-align:initial}',
        '#n6d .n6-inspect-option{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%}#n6d .n6-sl{flex:0 0 auto;font-size:.82rem;color:#5b6675;margin:0;white-space:nowrap}#n6d .n6-inspect-math{flex:1;min-width:0;text-align:center}',
        '#n6d .n01-final-nav .btn,#n6e .n01-final-nav .btn{min-width:120px;min-height:36px;height:auto;font-size:.88rem;padding:5px 12px}',

        '.n6-mk{min-width:1.2em;font-weight:bold}.n6-msg{text-align:center;font-size:.88rem;color:#9b2c2c;min-height:1em}'
      ].join('\n');
      document.head.appendChild(st);
    }

    /* ---------- نمایش ریاضی ---------- */
    function fix(h) { return h.replace(/\$([^$]+)\$/g, function (m, s) { return '$' + s.replace(/(\d)\.(?=\d|\\overline|\{)/g, '$1\\text{٫}').replace(/\\%/g, '\\text{٪}') + '$'; }); }
    function rr(h) { return rr0(fix(h)); }
    var M = function (s) { return '$' + s + '$'; };
    var AL = function (lines) { return K.dm('\\begin{aligned}' + lines.join(NL) + '\\end{aligned}'); };
    var tipBtn = function (key, title, html) { return K.info(key, title, fix(html)); };
    var BL = function (s) { return '{\\color{blue}' + s + '}'; }, CR = function (s) { return '{\\color{crimson}' + s + '}'; }, GR = function (s) { return '{\\color{green}' + s + '}'; };

    /* ---------- محاسبهٔ دقیق (نسبت‌های صحیح) ---------- */
    function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
    function simp(n, d) { if (d < 0) { n = -n; d = -d; } var g = gcd(n, d) || 1; return { n: n / g, d: d / g }; }
    function inv(r) { return simp(r.d, r.n); }
    function rpow(a, e) { var k = Math.abs(e), r = simp(Math.pow(a.n, k), Math.pow(a.d, k)); return e >= 0 ? r : inv(r); }
    var rt = function (r) { return r.d === 1 ? '' + r.n : (r.n < 0 ? '-' : '') + '\\frac{' + Math.abs(r.n) + '}{' + r.d + '}'; };          /* مقدار → TeX */
    var bt = function (a) { return a.d === 1 ? (a.n < 0 ? '(' + a.n + ')' : '' + a.n) : '(' + rt(a) + ')'; };                                    /* پایه → TeX */
    var pt = function (a, e) { return bt(a) + '^{' + e + '}'; };                                                                                  /* a^{e} */
    var Z = function (n) { return { n: n, d: 1 }; };

    /* ---------- خواندن پاسخ دانش‌آموز: عدد صحیح، کسر a/b یا اعشار ---------- */
    function norm(s) {
      return String(s).replace(/[۰-۹]/g, function (c) { return c.charCodeAt(0) - 1776; }).replace(/[٠-٩]/g, function (c) { return c.charCodeAt(0) - 1632; })
        .replace(/[٫,،]/g, '.').replace(/\s/g, '').replace(/[−–]/g, '-').replace(/÷/g, '/');
    }
    function pval(s) {
      s = norm(s); var m = /^(-?)(\d+)\/(\d+)$/.exec(s);
      if (m) { var d = parseInt(m[3], 10); return d ? simp((m[1] ? -1 : 1) * parseInt(m[2], 10), d) : null; }
      m = /^(-?)(\d*)\.?(\d*)$/.exec(s); if (!m || (m[2] === '' && m[3] === '') || m[3].length > 6) { return null; }
      return simp((m[1] ? -1 : 1) * parseInt((m[2] || '0') + m[3], 10), Math.pow(10, m[3].length));
    }

    /* ============ ۱) علامت‌یاب: توان، پرانتز و علامت ============ */
    K.signLab = function (host) {
      var b = -2, n = 3, par = true, BASES = [-4, -3, -2, 2, 3, 4];
      function paint() {
        var neg = b < 0, h = '', fac = [], i, ex, val, note;
        h = '<div class="n6-line" style="direction:rtl;flex-wrap:wrap"><span>پایه:</span><span style="display:inline-flex;gap:6px;flex-wrap:wrap;justify-content:center;direction:ltr">'; BASES.forEach(function (x) { h += '<button type="button" class="n6-chip n6-base-btn' + (x === b ? ' sel' : '') + '" data-b="' + x + '">' + M(x < 0 ? '(' + x + ')' : x) + '</button>'; });
        h += '</span></div><div class="n6-line" style="direction:rtl"><span>توان:</span><span style="direction:ltr;display:inline-flex;gap:8px;align-items:center"><button type="button" class="btn n6-sign-step" data-n="-1">−</button><b>' + fa(n) + '</b><button type="button" class="btn n6-sign-step" data-n="1">+</button></span></div>';
        if (neg) { h += '<div class="n6-line" style="direction:rtl"><button type="button" class="n6-chip n6-mode-btn' + (par ? ' sel' : '') + '" data-p="1"><span>با پرانتز:</span><span dir="ltr">' + M('(' + b + ')^{' + n + '}') + '</span></button><button type="button" class="n6-chip n6-mode-btn' + (!par ? ' sel' : '') + '" data-p="0"><span>بدون پرانتز:</span><span dir="ltr">' + M(b + '^{' + n + '}') + '</span></button></div>'; }
        if (!neg || par) {
          for (i = 0; i < n; i++) { fac.push(bt(Z(b))); }
          val = Math.pow(b, n);
          ex = bt(Z(b)) + '^{' + n + '}=' + fac.join(tm) + '=' + val;
          note = !neg ? 'پایه مثبت است؛ پس جواب همیشه مثبت است.' : (n % 2 === 0 ? 'تعداد عامل‌های منفی ' + fa(n) + ' و زوج است؛ منفی‌ها دو‌به‌دو یکدیگر را مثبت می‌کنند و جواب مثبت می‌شود.' : 'تعداد عامل‌های منفی ' + fa(n) + ' و فرد است؛ یکی بدون جفت می‌ماند و جواب منفی می‌شود.');
        } else {
          for (i = 0; i < n; i++) { fac.push('' + (-b)); }
          ex = b + '^{' + n + '}=-(' + fac.join(tm) + ')=' + (-Math.pow(-b, n));
          note = 'بدون پرانتز، توان فقط به ' + fa(-b) + ' می‌رسد و علامت منفی بعد از آن می‌آید؛ پس جواب همیشه منفی است.';
        }
        host.innerHTML = rr(h + K.dm(ex) + '<p>' + note + '</p>');
      }
      host.addEventListener('click', function (e) {
        var x = e.target.closest('button'); if (!x) { return; }
        if (x.dataset.b) { b = +x.dataset.b; } else if (x.dataset.n) { n = Math.max(1, Math.min(6, n + +x.dataset.n)); } else if (x.dataset.p) { par = x.dataset.p === '1'; } else { return; }
        paint();
      });
      paint();
    };

    /* ============ ۲) شمارش عامل‌ها: ضرب و تقسیم توان‌های هم‌پایه ============ */
    K.countLab = function (host) {
      var q, solved, prodMode = true;
      var tks = function (cls, a, k) { var s = '', i; for (i = 0; i < k; i++) { s += '<span class="n6-tk ' + (typeof cls === 'function' ? cls(i) : cls) + '">' + fa(a) + '</span>'; } return s; };
      function paint(msg) {
        var h = '<div class="n6-count-modes" role="group" aria-label="نوع عملیات"><button type="button" class="n6-count-mode' + (prodMode ? ' sel' : '') + '" data-operation="mul" aria-pressed="' + prodMode + '">ضرب</button><button type="button" class="n6-count-mode' + (!prodMode ? ' sel' : '') + '" data-operation="div" aria-pressed="' + !prodMode + '">تقسیم</button></div><p class="ask">' + (q.prod ? 'عامل‌ها را بشمار و حاصل را به‌صورت یک توان بنویس:' : 'عامل‌های بالا و پایین کسر را ببین و حاصل را به‌صورت یک توان بنویس:') + '</p>';
        h += K.dm((q.prod ? q.a + '^{' + q.m + '}\\times ' + q.a + '^{' + q.n + '}' : '\\frac{' + q.a + '^{' + q.m + '}}{' + q.a + '^{' + q.n + '}}') + (solved ? '' : '=' + q.a + '^{\\boxed{?}}'));
        if (q.prod) { h += '<div class="n6-tks">' + tks('g1', q.a, q.m) + '<span style="display:inline-block;width:14px"></span>' + tks('g2', q.a, q.n) + '</div>'; }
        else { h += '<div class="n6-tks">' + tks(function (i) { return solved && i < q.n ? 'cx' : 'g1'; }, q.a, q.m) + '</div><div class="n6-bar"></div><div class="n6-tks">' + tks(solved ? 'cx' : 'g2', q.a, q.n) + '</div>'; }
        if (!solved) { h += '<div class="n6-line"><span>توانِ جواب را بنویس:</span><input class="n6-in" type="text" dir="ltr" autocomplete="off" placeholder="؟"><button type="button" class="btn primary" data-ck="1">بررسی</button></div>'; }
        else { h += K.dm(q.prod ? q.a + '^{' + q.m + '}\\times ' + q.a + '^{' + q.n + '}=' + q.a + '^{' + q.m + '+' + q.n + '}=' + q.a + '^{' + q.ans + '}' : q.a + '^{' + q.m + '}\\div ' + q.a + '^{' + q.n + '}=' + q.a + '^{' + q.m + '-' + q.n + '}=' + q.a + '^{' + q.ans + '}'); }
        h += '<div class="n6f">' + (msg || '') + '</div><div class="opts"><button type="button" class="btn' + (solved ? ' primary' : '') + '" data-nx="1">' + (solved ? 'مثال بعدی' : 'مثال دیگر') + '</button></div>';
        host.innerHTML = rr(h);
        var inp = host.querySelector('.n6-in'); if (inp) { inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { check(); } }); }
      }
      function newQ() { var prod = prodMode, m = R(2, 6); q = { prod: prod, a: R(2, 9), m: m, n: prod ? R(2, 5) : R(1, m - 1) }; q.ans = prod ? q.m + q.n : q.m - q.n; solved = false; paint(''); }
      function check() {
        var v = pval(host.querySelector('.n6-in').value);
        if (!v || v.d !== 1) { paint(fb(false, 'توان را به‌صورت یک عدد صحیح بنویس.')); return; }
        if (v.n === q.ans) { solved = true; paint(fb(true, q.prod ? 'درست است! ' + fa(q.m) + ' عامل آبی و ' + fa(q.n) + ' عامل سبز، روی هم ' + fa(q.ans) + ' عامل می‌شود.' : 'درست است! ' + fa(q.n) + ' عامل از بالا و پایین ساده می‌شود و ' + fa(q.ans) + ' عامل می‌ماند.')); return; }
        paint(fb(false, q.prod ? (v.n === q.m * q.n ? 'توان‌ها را در هم ضرب کرده‌ای. وقتی دو توان هم‌پایه را در هم ضرب می‌کنیم، عامل‌ها پشت سر هم می‌آیند و تعدادشان جمع می‌شود.' : 'همهٔ عامل‌ها را بشمار: آبی‌ها و سبزها روی هم چند تا می‌شوند؟') : (v.n === q.m + q.n ? 'جمع کرده‌ای. در تقسیم، هر عامل پایین یک عامل بالا را حذف می‌کند؛ پس باید کم کنی.' : v.n === q.n - q.m ? 'ترتیب تفریق را برعکس کرده‌ای: تعداد عامل‌های بالا منهای تعداد عامل‌های پایین.' : 'هر عامل پایین یک عامل بالا را حذف می‌کند. چند عامل باقی می‌ماند؟')));
      }
      host.addEventListener('click', function (e) { var x = e.target.closest('button'); if (!x) { return; } if (x.dataset.operation) { var nextMode = x.dataset.operation === 'mul'; if (nextMode !== prodMode) { prodMode = nextMode; newQ(); } } else if (x.dataset.ck) { check(); } else if (x.dataset.nx) { newQ(); } });
      newQ();
    };

    /* نمونهٔ ثابت توان منفی؛ همان چیدمان تمرین تعاملی با حفظ محاسبات اصلی */
    function fixedNegativePattern() {
      var lines = [
        ['2^{3}', '8'], ['2^{2}', '4'], ['2^{1}', '2'],
        ['2^{0}', '1'], ['2^{-1}', '\\frac{1}{2}'], ['2^{-2}', '\\frac{1}{4}']
      ];
      return '<div id="n6-static" class="n6-static-pattern">' + lines.map(function (line, i) {
        return (i ? '<div class="n6-div-step"><span class="n6-div-pill" dir="ltr"><span class="n6-down">↓</span><span>÷</span><span>' + fa(2) + '</span></span></div>' : '')
          + '<div class="n6-pr"><span class="e">' + M(line[0]) + '</span><span class="eq">' + M('=') + '</span><span class="v">' + M(line[1]) + '</span></div>';
      }).join('') + '</div>';
    }

    /* ============ ۳) الگوی کوچک‌شونده: به توان‌های منفی برس ============ */
    K.patternLab = function (host) {
      var b, rows, solved;
      function newQ() {
        var top = b === 10 ? 3 : 3, e; b = [2, 3, 4, 5, 10][R(0, 4)]; top = R(3, 4); rows = []; solved = false;
        for (e = top; e >= -2; e--) { rows.push({ e: e, v: rpow(Z(b), e), blank: e <= 0 }); }
        paint();
      }
      function paint() {
        var h = '<p class="ask">هر ردیف را که پایین می‌آییم، مقدار بر ' + fa(b) + ' تقسیم می‌شود. ردیف‌های خالی را کامل کن (عدد صحیح، کسر مثل ' + '<bdi dir="ltr" style="white-space:nowrap">' + M('1') + '/' + M('8') + '</bdi>' + ' یا اعشار):</p>';
        rows.forEach(function (r, i) {
          if (i) { h += '<div class="n6-div-step"><span class="n6-div-pill" dir="ltr"><span class="n6-down">↓</span><span>÷</span><span>' + fa(b) + '</span></span></div>'; }
          h += '<div class="n6-pr"><span class="e">' + M(b + '^{' + r.e + '}') + '</span><span class="eq">' + M('=') + '</span><span class="v">' + (r.blank ? '<input class="n6-in" data-e="' + r.e + '" type="text" dir="ltr" autocomplete="off" placeholder="؟"><span class="n6-mk" data-e="' + r.e + '"></span>' : M(rt(r.v))) + '</span></div>';
        });
        h += '<div class="n6-msg"></div><div class="opts">' + (solved ? '' : '<button type="button" class="btn primary" data-ck="1">بررسی</button>') + (solved ? '' : '<button type="button" class="btn" data-nx="1">پایهٔ دیگر</button>') + '</div><div class="n6f"></div>';
        host.innerHTML = rr(h);
        host.querySelectorAll('.n6-in').forEach(function (inp) { inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { check(); } }); });
      }
      function check() {
        var all = true, hint = '';
        rows.forEach(function (r) {
          if (!r.blank) { return; }
          var inp = host.querySelector('.n6-in[data-e="' + r.e + '"]'), mk = host.querySelector('.n6-mk[data-e="' + r.e + '"]'), u = pval(inp.value), ok = u && u.n === r.v.n && u.d === r.v.d;
          mk.textContent = ok ? '✓' : '✗'; mk.style.color = ok ? '#1f8a4c' : '#b83232'; if (!ok) { all = false; if (u && u.n === -r.v.n && u.d === r.v.d) { hint = 'توان منفی جواب را منفی نمی‌کند؛ فقط آن را کوچک می‌کند.'; } }
        });
        if (!all) { host.querySelector('.n6-msg').textContent = hint || 'هر قدم پایین‌تر یعنی تقسیم بر ' + fa(b) + '؛ از ردیف بالاییِ همان خانه ادامه بده.'; return; }
        solved = true; paint();
        host.querySelector('.n6f').innerHTML = rr(fb(true, '✓ درست است!') + '<div class="ex">' + K.dm(b + '^{-1}=\\frac{1}{' + b + '}\\qquad ' + b + '^{-2}=\\frac{1}{' + b + '^{2}}=\\frac{1}{' + Math.pow(b, 2) + '}') + '<p>می‌بینی که هر توان منفی یک کسر است: ' + M('a^{-n}=\\frac{1}{a^{n}}') + '.</p></div><div class="opts"><button type="button" class="btn primary" data-nx="1">پایه‌ای دیگر</button></div>');
      }
      host.addEventListener('click', function (e) { var x = e.target.closest('button'); if (!x) { return; } if (x.dataset.ck) { check(); } else if (x.dataset.nx) { newQ(); } });
      newQ();
    };

    /* ---------- آزمون سؤال‌به‌سؤال: «سؤال n از m»، قبلی/بعدی، نتیجه و مجموعهٔ جدید ---------- */
    function seq(host, build, resText) {
      var qs, i, ans;
      function start() { qs = build(); i = 0; ans = []; }
      function paint() {
        var n = qs.length, q = qs[i], a = ans[i], h, oh = '', s;
        if (i === n) {
          s = ans.filter(function (x, k) { return qs[k].opts[x].ok; }).length;
          host.innerHTML = rr('<div class="fb ' + (s >= n - 1 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(s) + ' از ' + fa(n) + '</b><br>' + resText(s, n) + '</div><div class="opts end-actions"><button type="button" class="btn" data-pv="1">مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1">سؤال‌های جدید</button></div>');
          return;
        }
        h = '<div class="stg">' + qs.map(function (x, k) { return '<span class="' + (ans[k] !== undefined ? (qs[k].opts[ans[k]].ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">' + q.ask + '</p>' + (q.tex ? K.dm(q.tex) : '') + '<div class="mc" id="mcx"></div>';
        q.opts.forEach(function (o, k) { oh += '<button type="button" class="btn opt' + (a !== undefined ? (o.ok ? ' right' : k === a ? ' wrong' : '') : '') + '" data-o="' + k + '"' + (a !== undefined ? ' disabled' : '') + '>' + o.h + '</button>'; });
        if (a !== undefined) { var o = q.opts[a]; h += fb(o.ok, o.ok ? '✓ درست است!' : (o.m || 'این گزینه درست نیست.')) + '<div class="ex">' + q.expl + '</div>'; }
        h += '<div class="opts n01-final-nav"><button type="button" class="btn" data-p="1"' + (i ? '' : ' disabled') + '>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (a === undefined ? ' disabled' : '') + '>' + (i === n - 1 ? 'مشاهدهٔ نتیجه':'سؤال بعدی') + '</button></div>';
        host.innerHTML = rr(h); host.querySelector('#mcx').innerHTML = rr(oh);
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b || b.disabled) { return; }
        if (b.dataset.o) { ans[i] = +b.dataset.o; paint(); } else if (b.dataset.nx) { i++; paint(); } else if (b.dataset.p) { i--; paint(); }
        else if (b.dataset.pv) { i = 0; paint(); } else if (b.dataset.r) { start(); paint(); }
      });
      start(); paint();
    }
    var pick = function (arr) { return arr[R(0, arr.length - 1)]; };
    var P2 = function (a, e) { return a + '^{' + e + '}'; };                       /* a^{e} با پایهٔ صحیح مثبت */

    /* ============ ۴) بازرس خطا: مرحلهٔ اشتباه را پیدا کن (هر مرحله یک برابری مستقل است) ============ */
    var INSPECT = [
      function () {                                                                /* ضرب هم‌پایه */
        var a, m, n, S, err, t = 0;
        do { a = pick([2, 3, 5]); m = R(2, 4); n = R(2, 4); S = m + n; err = R(0, 2); t++; } while ((m * n === S || (err === 2 && Math.pow(a, S) === a * S)) && t < 200);
        var ex = P2(a, m) + tm + P2(a, n), val = Math.pow(a, S), L = [ex + '=' + P2(a, m + '+' + n), P2(a, m + '+' + n) + '=' + P2(a, S), P2(a, S) + '=' + val], w = err === 2 ? 2 : 0;
        L[w] = err === 0 ? ex + '=' + P2(a, m + tm + n) : err === 1 ? ex + '=(' + a + tm + a + ')^{' + m + '+' + n + '}' : P2(a, S) + '=' + a + tm + S;
        return { ex: ex, lines: L, w: w, why: err === 0 ? 'وقتی دو توان هم‌پایه را در هم ضرب می‌کنیم، توان‌ها <b>جمع</b> می‌شوند، نه ضرب. مرحلهٔ درست: ' + M(ex + '=' + P2(a, m + '+' + n)) : err === 1 ? 'پایه هنگام ضرب عوض نمی‌شود؛ همان ' + fa(a) + ' می‌ماند و فقط توان‌ها جمع می‌شوند. مرحلهٔ درست: ' + M(ex + '=' + P2(a, m + '+' + n)) : 'توان یعنی ضرب تکراری، نه ضرب پایه در توان. مرحلهٔ درست: ' + M(P2(a, S) + '=' + val) };
      },
      function () {                                                                /* تقسیم هم‌پایه */
        var a, m, n, D, err, t = 0;
        do { a = pick([2, 3, 5]); m = R(3, 7); n = R(2, m - 1); D = m - n; err = R(0, 2); t++; } while (err === 2 && Math.pow(a, D) === a * D && t < 200);
        var ex = P2(a, m) + dv + P2(a, n), val = Math.pow(a, D), L = [ex + '=' + P2(a, m + '-' + n), P2(a, m + '-' + n) + '=' + P2(a, D), P2(a, D) + '=' + val], w = err === 2 ? 2 : 0;
        L[w] = err === 0 ? ex + '=' + P2(a, n + '-' + m) : err === 1 ? ex + '=' + P2(a, m + '+' + n) : P2(a, D) + '=' + a + tm + D;
        return { ex: ex, lines: L, w: w, why: err === 0 ? 'در تقسیم، توانِ <b>مخرج</b> از توانِ صورت کم می‌شود (نه برعکس). مرحلهٔ درست: ' + M(ex + '=' + P2(a, m + '-' + n)) : err === 1 ? 'در تقسیم، توان‌ها <b>کم</b> می‌شوند، نه جمع. مرحلهٔ درست: ' + M(ex + '=' + P2(a, m + '-' + n)) : 'توان یعنی ضرب تکراری. مرحلهٔ درست: ' + M(P2(a, D) + '=' + val) };
      },
      function () {                                                                /* توان منفی در ضرب */
        var a = pick([2, 3, 5]), n = R(2, 4), k = n + R(1, 3), err = R(0, 2), ex = P2(a, -n) + tm + P2(a, k), val = Math.pow(a, k - n);
        var L = [ex + '=' + P2(a, '-' + n + '+' + k), P2(a, '-' + n + '+' + k) + '=' + P2(a, k + '-' + n), P2(a, k + '-' + n) + '=' + val], w = err === 2 ? 1 : 0;
        L[w] = err === 0 ? ex + '=' + P2(a, n + '+' + k) : err === 1 ? ex + '=' + P2(a, '-' + n + tm + k) : P2(a, '-' + n + '+' + k) + '=' + P2(a, '-(' + k + '-' + n + ')');
        return { ex: ex, lines: L, w: w, why: err === 0 ? 'توان ' + M('-' + n) + ' منفی است و نباید علامتش را بیندازیم؛ توان‌ها با علامتشان جمع می‌شوند: ' + M(P2(a, '-' + n) + tm + P2(a, k) + '=' + P2(a, '-' + n + '+' + k)) : err === 1 ? 'در ضرب هم‌پایه‌ها توان‌ها جمع می‌شوند، نه ضرب. مرحلهٔ درست: ' + M(ex + '=' + P2(a, '-' + n + '+' + k)) : M('-' + n + '+' + k + '=' + k + '-' + n) + ' است و علامت منفی بیرونِ آن نمی‌آید. مرحلهٔ درست: ' + M(P2(a, '-' + n + '+' + k) + '=' + P2(a, k + '-' + n)) };
      },
      function () {                                                                /* علامت پایهٔ منفی */
        var b = pick([2, 3, 4]), n = R(2, 5), ev = n % 2 === 0, sg = ev ? '1' : '-1', ex = '(-' + b + ')^{' + n + '}', val = (ev ? 1 : -1) * Math.pow(b, n);
        var errs = ev ? [0, 1, 2] : [1, 2], err = pick(errs), L = [ex + '=(-1)^{' + n + '}' + tm + P2(b, n), '(-1)^{' + n + '}=' + sg, sg + tm + P2(b, n) + '=' + val], w = err;
        L[err] = err === 0 ? ex + '=-1' + tm + P2(b, n) : err === 1 ? '(-1)^{' + n + '}=' + (ev ? '-1' : '1') : sg + tm + P2(b, n) + '=' + (-val);
        return { ex: ex, lines: L, w: w, why: err === 0 ? 'هر عامل ' + M('-' + b) + ' را می‌شود ' + M('(-1)' + tm + b) + ' نوشت؛ پس ' + M('(-1)^{' + n + '}') + ' ظاهر می‌شود، نه ' + M('-1') + '. مرحلهٔ درست: ' + M(ex + '=(-1)^{' + n + '}' + tm + P2(b, n)) : err === 1 ? 'تعداد عامل‌های منفی ' + (ev ? 'زوج' : 'فرد') + ' است؛ پس ' + M('(-1)^{' + n + '}=' + sg) + '. مرحلهٔ درست: ' + M('(-1)^{' + n + '}=' + sg) : 'با ' + M('(-1)^{' + n + '}=' + sg) + ' علامت جواب ' + (ev ? 'مثبت' : 'منفی') + ' است. مرحلهٔ درست: ' + M(sg + tm + P2(b, n) + '=' + val) };
      },
      function () {                                                                /* توان صفر */
        var a, m, err, t = 0;
        do { a = pick([2, 3, 5]); m = R(3, 5); err = R(0, 2); t++; } while (err === 2 && Math.pow(a, m) === a * m && t < 200);
        var ex = P2(a, 0) + tm + P2(a, m), val = Math.pow(a, m), L = [ex + '=' + P2(a, '0+' + m), P2(a, '0+' + m) + '=' + P2(a, m), P2(a, m) + '=' + val], w = err === 2 ? 2 : err;
        L[w] = err === 0 ? ex + '=' + P2(a, '0' + tm + m) : err === 1 ? P2(a, '0+' + m) + '=0' : P2(a, m) + '=' + a + tm + m;
        return { ex: ex, lines: L, w: w, why: err === 0 ? 'برای ضرب هم‌پایه‌ها توان‌ها جمع می‌شوند، نه ضرب. مرحلهٔ درست: ' + M(ex + '=' + P2(a, '0+' + m)) : err === 1 ? M('0+' + m + '=' + m) + '؛ پس ' + M(P2(a, '0+' + m) + '=' + P2(a, m)) + ' و صفر نمی‌شود.' : 'توان یعنی ضرب تکراری، نه ضرب پایه در توان. مرحلهٔ درست: ' + M(P2(a, m) + '=' + val) };
      }
    ];
    K.inspect = function (host) {
      seq(host, function () {
        return shuffle(INSPECT.slice()).map(function (g) {
          var q = g(); return { ask: 'عبارت ' + M(q.ex) + ' را ساده کرده‌ایم، ولی <b>یکی از سه مرحله اشتباه</b> است. آن را پیدا کن و روی آن بزن.', expl: '<p>' + q.why + '</p>', opts: q.lines.map(function (l, k) { return { h: '<span class="n6-inspect-option" dir="rtl"><span class="n6-sl">مرحلهٔ ' + fa(k + 1) + '</span><span class="n6-inspect-math" dir="ltr">' + M(l) + '</span></span>', ok: k === q.w, m: 'این مرحله درست است. مرحلهٔ اشتباه را پیدا کن.' }; }) };
        });
      }, function (s, n) { return s === n ? 'همهٔ خطاها را پیدا کردی!' : 'توضیح زیر هر سؤال را دوباره بخوان؛ بعد یک مجموعهٔ جدید بزن.'; });
    };

    /* ============ آزمون پایانی (۵ سؤال تصادفی) ============ */
    function stmt(type, ok) {                                                      /* برابری درست یا نادرست */
      var a = pick([2, 3, 4, 5]), n = R(2, 4), m = R(2, 4), k = R(2, 5), t = 0, good, bad, why;
      if (type === 0) { good = P2(a, 0) + '=1'; bad = P2(a, 0) + '=' + pick(['0', '' + a]); why = 'هر عدد غیرصفر به توان صفر برابر ۱ است.'; }
      else if (type === 1) { good = P2(a, -n) + '=\\frac{1}{' + Math.pow(a, n) + '}'; bad = P2(a, -n) + '=' + pick(['-' + Math.pow(a, n), '-\\frac{1}{' + Math.pow(a, n) + '}']); why = 'توان منفی عدد را منفی نمی‌کند؛ آن را «یک تقسیم بر ...» می‌کند: ' + M(P2(a, -n) + '=\\frac{1}{' + P2(a, n) + '}') + '.'; }
      else if (type === 2) { while (m * n === m + n && t++ < 50) { n = R(2, 4); m = R(2, 4); } good = P2(a, m) + tm + P2(a, n) + '=' + P2(a, m + '+' + n); bad = P2(a, m) + tm + P2(a, n) + '=' + P2(a, m + tm + n); why = 'در ضرب هم‌پایه‌ها توان‌ها جمع می‌شوند.'; }
      else if (type === 3) { while (m === n) { n = R(1, 4); } good = P2(a, m) + dv + P2(a, n) + '=' + P2(a, m + '-' + n); bad = P2(a, m) + dv + P2(a, n) + '=' + P2(a, n + '-' + m); why = 'در تقسیم هم‌پایه‌ها، توانِ مخرج از توانِ صورت کم می‌شود.'; }
      else { while (n % 2 !== 0 || false) { n = R(2, 4); } good = '(-' + a + ')^{' + n + '}=' + Math.pow(a, n); bad = '(-' + a + ')^{' + n + '}=-' + Math.pow(a, n); why = 'توان زوج است؛ پس منفی‌ها دو‌به‌دو مثبت می‌شوند.'; }
      return { tex: ok ? good : bad, good: good, why: '<p>برابری درست: ' + M(good) + '</p>' + (ok ? '' : '<p>' + why + '</p>') };
    }
    K.finalN06 = function (host) {
      var uniq = function (opts) { var seen = {}, out = []; opts.forEach(function (o) { if (!seen[o.h]) { seen[o.h] = 1; out.push(o); } }); return out; };
      var mk = function (tex, mm) { return { h: M(tex), m: mm }; };
      function qValue() {
        var a = pick([Z(-2), Z(-3), Z(2), Z(3), Z(-4), simp(1, 2), simp(2, 3), simp(-1, 2)]), n = R(2, 4), c = rpow(a, n), ex = pt(a, n), neg = function (r) { return simp(-r.n, r.d); };
        var cands = [[neg(c), 'علامت را بررسی کن: ' + (a.n < 0 ? 'تعداد عامل‌های منفی ' + fa(n) + ' است و زوج یا فرد بودنش علامت جواب را تعیین می‌کند.' : 'پایه مثبت است؛ پس جواب مثبت است.')],
          [simp(a.n * n, a.d), 'توان یعنی ضرب تکراریِ پایه در خودش، نه ضرب پایه در توان.'], [rpow(a, n - 1), 'تعداد عامل‌ها را یکی کم گرفته‌ای.'], [rpow(a, n + 1), 'یک عامل اضافه گرفته‌ای؛ فقط ' + fa(n) + ' عامل داریم.'], [neg(simp(a.n * n, a.d)), 'توان یعنی ضرب تکراری، نه ضرب پایه در توان.']];
        var out = [{ h: M(rt(c)), ok: true }], seen = {}; seen[rt(c)] = 1;
        cands.forEach(function (x) { var k = rt(x[0]); if (!seen[k] && out.length < 4) { seen[k] = 1; out.push(mk(k, x[1])); } });
        return { ask: 'مقدار ' + M(ex) + ' کدام است؟', expl: '<p>' + M(ex + '=' + Array(n + 1).join(bt(a) + tm).slice(0, -tm.length) + '=' + rt(c)) + '</p>', opts: out };
      }
      function qProduct() {
        var a = pick([2, 3, 4, 5]), m, n, t = 0; do { m = R(2, 5); n = R(2, 5); } while ((m * n === m + n || m === n) && t++ < 100);
        return { ask: 'حاصل ' + M(P2(a, m) + tm + P2(a, n)) + ' را به‌صورت یک توان بنویس:', expl: '<p>' + M(P2(a, m) + tm + P2(a, n) + '=' + P2(a, m + '+' + n) + '=' + P2(a, m + n)) + '</p>', opts: [{ h: M(P2(a, m + n)), ok: true },
          mk(P2(a, m * n), 'توان‌ها را در هم ضرب کرده‌ای؛ باید جمع کنی.'), mk('(' + a + tm + a + ')^{' + (m + n) + '}', 'پایه عوض نمی‌شود؛ همان ' + fa(a) + ' می‌ماند.'), mk(P2(a, m - n), 'تفریق مال تقسیم است؛ در ضرب توان‌ها جمع می‌شوند.')] };
      }
      function qQuot() {
        var a = pick([2, 3, 4, 5]), m = R(1, 6), n = R(1, 6); while (m === n) { n = R(1, 6); }
        return { ask: 'حاصل ' + M(P2(a, m) + dv + P2(a, n)) + ' را به‌صورت یک توان بنویس:', expl: '<p>' + M(P2(a, m) + dv + P2(a, n) + '=' + P2(a, m + '-' + n) + '=' + P2(a, m - n)) + (m < n ? '</p><p>توان منفی شد، یعنی جواب یک کسر است: ' + M(P2(a, m - n) + '=\\frac{1}{' + Math.pow(a, n - m) + '}') : '') + '</p>', opts: [{ h: M(P2(a, m - n)), ok: true },
          mk(P2(a, n - m), 'ترتیب تفریق را برعکس کرده‌ای: توانِ صورت منهای توانِ مخرج.'), mk(P2(a, m + n), 'در تقسیم توان‌ها کم می‌شوند، نه جمع.'), mk(P2(a, m * n), 'توان‌ها در هم ضرب نمی‌شوند؛ در تقسیم کم می‌شوند.')] };
      }
      function qNeg() {
        var a = pick([Z(2), Z(3), Z(4), Z(5), Z(10), simp(2, 3), simp(3, 2)]), n = R(1, 3), c = rpow(a, -n), neg = function (r) { return simp(-r.n, r.d); };
        return { ask: 'مقدار ' + M(pt(a, -n)) + ' کدام است؟', expl: '<p>' + M(pt(a, -n) + '=\\frac{1}{' + pt(a, n) + '}=' + rt(c)) + '</p>', opts: [{ h: M(rt(c)), ok: true },
          mk(rt(neg(c)), 'توان منفی عدد را منفی نمی‌کند.'), mk(rt(rpow(a, n)), 'علامت توان را نادیده گرفته‌ای؛ توان منفی یعنی «یک تقسیم بر ...» (وارونه).'), mk(rt(neg(rpow(a, n))), 'توان منفی عدد را منفی نمی‌کند؛ فقط وارونه‌اش می‌کند.')] };
      }
      function qWhich() {
        var ty = shuffle([0, 1, 2, 3, 4]).slice(0, 3), g = stmt(ty[0], true), opts = [{ h: M(g.tex), ok: true }];
        [1, 2].forEach(function (x) { var w = stmt(ty[x], false); opts.push({ h: M(w.tex), m: w.why }); });
        return { ask: 'کدام برابری درست است؟', expl: g.why, opts: opts };
      }
      seq(host, function () { return [qValue, qProduct, qQuot, qNeg, qWhich].map(function (f) { var q = f(); q.opts = shuffle(uniq(q.opts)); return q; }); },
        function (s) { return s === 5 ? 'عالی بود! به همهٔ سؤال‌ها درست جواب دادی.' : s >= 3 ? 'خوب بود. سؤال‌هایی را که اشتباه کردی دوباره مرور کن.' : 'یک بار دیگر درس را مرور کن؛ بعد با عددهای جدید امتحان کن.'; });
    };

    /* ---------- دیالوگ‌های i و شکل مربع/مکعب ---------- */
    var TERMS = '<ul><li><b style="color:blue">پایه</b>: عددی که در خودش ضرب می‌شود.</li><li><b style="color:crimson">توان</b>: تعداد دفعاتی که پایه در خودش ضرب می‌شود.</li></ul>' +
      '<p>' + M(BL('a') + '^{' + CR('n') + '}') + ' را «<span style="color:blue">a</span> به توان <span style="color:crimson">n</span>» می‌خوانیم. توان ۲ را «مربع» و توان ۳ را «مکعب» هم می‌گوییم: ' + M('a^{2}') + ' «مربعِ ' + M('a') + '» و ' + M('a^{3}') + ' «مکعبِ ' + M('a') + '» است.</p>';
    function sqfig() {
      function sqSvg() {
        var h = '<svg viewBox="0 0 190 136" style="width:100%;max-width:170px;display:block;margin:0 auto" role="img" aria-label="مربع">', i, j;
        for (i = 0; i < 3; i++) { for (j = 0; j < 3; j++) { h += '<rect x="' + (38 + i * 38) + '" y="' + (14 + j * 38) + '" width="35" height="35" rx="3" style="fill:blue" fill-opacity="0.85" stroke="#fff" stroke-width="1"/>'; } }
        return h + '</svg>';
      }
      function cubeSvg() {
        var h = '<svg viewBox="0 0 190 136" style="width:100%;max-width:170px;display:block;margin:0 auto" role="img" aria-label="مکعب">', i, j, l, cols = ['#2f9e44', '#69c27a', '#a8dcb3'];
        for (l = 2; l >= 0; l--) { for (i = 0; i < 3; i++) { for (j = 0; j < 3; j++) { h += '<rect x="' + (42 + l * 14 + i * 22) + '" y="' + (48 - l * 14 + j * 22) + '" width="20" height="20" rx="3" style="fill:' + cols[l] + '" stroke="#fff" stroke-width="1"/>'; } } }
        return h + '</svg>';
      }
      var caption = 'font-size:.78rem;line-height:1.25;margin-top:0;white-space:nowrap';
      return '<div class="n6-sqfigs" style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px;max-width:440px;margin:8px auto;direction:rtl;align-items:start">'
        + '<figure style="margin:0;min-width:0;text-align:center"><div style="font-weight:700;margin-bottom:2px">مربع</div>' + sqSvg() + '<figcaption style="' + caption + '">' + M(String.raw`3\times3=3^{2}=9`) + '</figcaption></figure>'
        + '<figure style="margin:0;min-width:0;text-align:center"><div style="font-weight:700;margin-bottom:2px">مکعب</div>' + cubeSvg() + '<figcaption style="' + caption + '">' + M(String.raw`3\times3\times3=3^{3}=27`) + '</figcaption></figure>'
        + '</div>';
    }
    var XC = '{\\color{crimson}\\cancel{3}}';

    return {
      html: function () {
        tipBtn('n6-terms', 'اصطلاح‌ها: پایه و توان', TERMS);
        var host = function (id) { return '<div class="cover n6-w" id="' + id + '" style="animation:none"></div>'; };
        var pw = function (a, e) { return a + '^{' + e + '}'; };
        var rowsTbl = []; for (var e = 1; e <= 6; e++) { rowsTbl.push([M(pw(2, e)), M(Array(e + 1).join('2' + tm).slice(0, -tm.length)), M('' + Math.pow(2, e))]); }
        return fix([
          /* ───────── ۱ ───────── */
          K.sn('۱', 'توان؛ نوشتنِ کوتاهِ ضرب تکراری'),
          '<p>فرض کن یک سلول زنده هر ساعت به دو سلول تقسیم می‌شود. بعد از ۵ ساعت چند سلول داریم؟ هر ساعت تعداد سلول‌ها در ۲ ضرب می‌شود:</p>', K.dm(T`2\times2\times2\times2\times2=32`),
          '<p>نوشتن ضرب‌های تکراریِ بلند خسته‌کننده است. برای کوتاه‌نویسی آن را به‌صورت توان می‌نویسیم:</p>', K.dm(T`2^{5}=2\times2\times2\times2\times2=32`),
          T`<p>$2^{5}$ را «۲ به توان ۵» می‌خوانیم. عددی که در خودش ضرب می‌شود ($2$) پایه، و تعداد دفعاتِ ضرب ($5$) توان نام دارد ${tipBtn('n6-terms', 'اصطلاح‌ها: پایه و توان', TERMS)}. به‌طور کلی:</p>`,
          K.dm(T`${BL('a')}^{${CR('n')}}=\underbrace{${BL('a')}\times${BL('a')}\times\cdots\times${BL('a')}}_{n}`),
          T`<p>پایه را آبی و توان را قرمز نوشته‌ایم؛ زیر آکولاد هم می‌بینی که $n$ عامل داریم. توان ۱ یعنی فقط یک عامل: $a^{1}=a$.</p>`,
          K.tbl(['توان', 'ضرب تکراری', 'مقدار'], rowsTbl),
          T`<h4>چرا «مربع» و «مکعب»؟</h4><p>توان ۲ و ۳ اسم‌های ویژه دارند، چون با مساحتِ مربع و حجمِ مکعب مرتبط‌اند. مربعی به ضلع ۳ واحد، $3\times3=9$ خانهٔ واحد دارد. مکعبی به ضلع ۳ واحد هم از ۳ لایهٔ ۹تایی ساخته می‌شود:</p>`, sqfig(),
          K.box('err', '⚠ اشتباه رایج', T`<p>$2^{5}$ یعنی ۵ عامل ۲ که در هم ضرب شده‌اند؛ نه ضرب ۲ در ۵. پس $2^{5}=32$ ولی $2\times5=10$.</p>`),

          /* ───────── ۲ ───────── */
          K.sn('۲', 'پایهٔ منفی و پایهٔ کسری'),
          T`<p>پایه می‌تواند منفی یا کسر باشد. باید دقیقاً معلوم باشد چه چیزی در خودش ضرب می‌شود؛ برای همین پایهٔ منفی یا کسری را داخل پرانتز می‌نویسیم. ببین $-2$ به توان‌های مختلف چه می‌شود:</p>`,
          AL([T`(-2)^{1}&=${CR('-2')}`, T`(-2)^{2}&=${CR('(-2)')}\times(-2)=${BL('4')}`, T`(-2)^{3}&=${BL('4')}\times(-2)=${GR('-8')}`, T`(-2)^{4}&=${GR('(-8)')}\times(-2)=16`]),
          '<p>علامت جواب الگو دارد:</p>', K.tbl(['توان', 'علامت جواب (پایهٔ منفی)'], [['زوج', 'مثبت'], ['فرد', 'منفی']]),
          '<p>دلیلش این است که منفی‌ها دو‌به‌دو یکدیگر را مثبت می‌کنند؛ اگر تعدادشان فرد باشد، یکی بدون جفت می‌ماند.</p>',
          K.box('err', '⚠ پرانتز مهم است', T`<p>$(-2)^{4}$ و $-2^{4}$ یکی نیستند. در $(-2)^{4}$ پایه $-2$ است:</p>` + K.dm(T`(-2)^{4}=16`) + T`<p>اما در $-2^{4}$ توان فقط به ۲ می‌رسد و علامت منفی بعد از آن می‌آید:</p>` + K.dm(T`-2^{4}=-(2\times2\times2\times2)=-16`)),
          '<h4>پایهٔ کسری</h4><p>اگر پایه کسر باشد، کل کسر در خودش ضرب می‌شود (ضرب کسرها را در درس قبل دیدی):</p>',
          AL([T`\left(\frac{2}{3}\right)^{3}&=\frac{2}{3}\times\frac{2}{3}\times\frac{2}{3}`, T`&=\frac{2\times2\times2}{3\times3\times3}=\frac{8}{27}=\frac{2^{3}}{3^{3}}`]),
          '<p>یعنی هم صورت و هم مخرج به توان می‌رسند:</p>', K.dm(T`\left(\frac{a}{b}\right)^{n}=\frac{a^{n}}{b^{n}}`),
          '<h4>علامت‌یاب</h4><p>پایه و توان را عوض کن و علامت جواب را ببین. برای پایهٔ منفی، حالت «با پرانتز» و «بدون پرانتز» را مقایسه کن:</p>', host('n6a'),

          /* ───────── ۳ ───────── */
          K.sn('۳', 'ضرب توان‌های هم‌پایه'),
          T`<p>ببینیم $2^{3}\times2^{4}$ چه می‌شود. هر توان را به ضرب تکراری باز می‌کنیم (عامل‌های توان اول آبی و توان دوم سبز):</p>`,
          K.dm(T`2^{3}\times2^{4}=\left(${BL('2\\times2\\times2')}\right)\times\left(${GR('2\\times2\\times2\\times2')}\right)=2^{7}`),
          T`<p>روی هم $3+4=7$ عامل $2$ داریم؛ یعنی توان‌ها <b>جمع</b> می‌شوند:</p>`, K.dm(T`a^{m}\times a^{n}=a^{m+n}`),
          '<p>شرط این قانون این است که پایه‌ها یکی باشند.</p>',
          K.box('err', '⚠ اشتباه رایج', T`<p>$2^{3}\times2^{4}$ نه $4^{7}$ است و نه $2^{12}$. پایه همان ۲ می‌ماند (پایه‌ها با هم ضرب نمی‌شوند) و توان‌ها جمع می‌شوند، نه ضرب: $2^{3}\times2^{4}=2^{7}$.</p>`),
          '<h4>مثال‌ها</h4>', AL([T`5^{2}\times5^{6}&=5^{2+6}=5^{8}`, T`(-2)^{3}\times(-2)^{2}&=(-2)^{3+2}=(-2)^{5}=-32`, T`3\times3^{4}&=3^{1}\times3^{4}=3^{1+4}=3^{5}`]),
          T`<p>در مثال آخر، ۳ توان ندارد؛ یعنی توانش ۱ است: $3=3^{1}$.</p>`,

          /* ───────── ۴ ───────── */
          K.sn('۴', 'تقسیم توان‌های هم‌پایه'),
          T`<p>حالا $3^{5}\div3^{2}$ را حساب کنیم. آن را به‌صورت کسر می‌نویسیم و عامل‌های مشترکِ بالا و پایین را ساده می‌کنیم (عامل‌های ساده‌شده قرمز و خط‌خورده‌اند):</p>`,
          AL([T`\frac{3^{5}}{3^{2}}&=\frac{3\times3\times3\times3\times3}{3\times3}`, T`&=\frac{${XC}\times${XC}\times3\times3\times3}{${XC}\times${XC}}=3^{3}`]),
          '<p>دو عامل از پایین، دو عامل از بالا را حذف کرد و سه عامل ماند؛ یعنی توان‌ها <b>کم</b> می‌شوند:</p>', K.dm(T`a^{m}\div a^{n}=a^{m-n}\qquad(a\neq0)`),
          '<p>پایه نباید صفر باشد، چون تقسیم بر صفر معنی ندارد.</p>',
          '<h4>مثال‌ها</h4>', AL([T`7^{9}\div7^{4}&=7^{9-4}=7^{5}`, T`(-2)^{6}\div(-2)^{2}&=(-2)^{6-2}=(-2)^{4}=16`]),
          K.box('err', '⚠ اشتباه رایج', T`<p>$5^{6}\div5^{2}$ برابر $5^{4}$ است؛ نه $5^{8}$ (جمع توان‌ها) و نه $5^{3}$ (تقسیم توان‌ها). در تقسیم، توانِ مخرج از توانِ صورت کم می‌شود.</p>`),
          '<h4>شمارش عامل‌ها</h4><p>این‌جا عامل‌ها را خودت بشمار. گاهی ضرب است و گاهی تقسیم؛ هر دو قانون را آزمایش کن:</p>', host('n6b'),

          /* ───────── ۵ ───────── */
          K.sn('۵', 'توان صفر'),
          '<p>اگر دو توانِ هم‌پایه و با توان‌های برابر را بر هم تقسیم کنیم چه می‌شود؟ از دو راه حساب می‌کنیم:</p>',
          AL([T`5^{3}\div5^{3}&=\frac{125}{125}=1`, T`5^{3}\div5^{3}&=5^{3-3}=5^{0}`]),
          '<p>هر دو حاصل باید یکی باشند؛ پس:</p>', K.dm(T`5^{0}=1`),
          '<p>این برای هر پایهٔ غیرصفر درست است:</p>', K.dm(T`a^{0}=1\qquad(a\neq0)`),
          AL([T`(-7)^{0}&=1`, T`\left(\frac{2}{3}\right)^{0}&=1`]),
          K.box('err', '⚠ اشتباه رایج', T`<p>$5^{0}$ نه صفر است و نه ۵؛ برابر ۱ است. «هیچ بار ضرب‌کردن» نتیجه‌اش صفر نمی‌شود، بلکه همان عنصر خنثای ضرب یعنی ۱ است.</p>`),

          /* ───────── ۶ ───────── */
          K.sn('۶', 'توان منفی'),
          '<p>یک الگو را ادامه بدهیم. هر ردیف را که پایین می‌آییم، توان یکی کم می‌شود و مقدار نصف (تقسیم بر ۲):</p>',
          fixedNegativePattern(),
          '<p>می‌بینی که توان منفی یعنی «یک تقسیم بر ...»:</p>', K.dm(T`a^{-n}=\frac{1}{a^{n}}\qquad(a\neq0)`),
          '<p>همین نتیجه را از قانون تقسیم هم می‌گیریم:</p>', AL([T`2^{3}\div2^{5}&=2^{3-5}=2^{-2}`, T`\frac{2^{3}}{2^{5}}&=\frac{2\times2\times2}{2\times2\times2\times2\times2}=\frac{1}{2^{2}}`]),
          '<h4>مثال‌ها</h4>', AL([T`2^{-3}&=\frac{1}{2^{3}}=\frac{1}{8}`, T`10^{-2}&=\frac{1}{10^{2}}=\frac{1}{100}=0.01`, T`(-3)^{-2}&=\frac{1}{(-3)^{2}}=\frac{1}{9}`]),
          '<h4>پایهٔ کسری و توان منفی</h4><p>اگر پایه کسر باشد، توان منفی آن را وارونه می‌کند:</p>', AL([T`\left(\frac{2}{3}\right)^{-1}&=\frac{1}{\frac{2}{3}}=\frac{3}{2}`, T`\left(\frac{2}{3}\right)^{-2}&=\left(\frac{3}{2}\right)^{2}=\frac{9}{4}`]),
          K.box('err', '⚠ اشتباه رایج', T`<p>$2^{-3}$ برابر $-8$ نیست. توان منفی عدد را منفی نمی‌کند؛ فقط آن را «یک تقسیم بر ...» می‌کند: $2^{-3}=\frac{1}{8}$. علامتِ جواب را پایه تعیین می‌کند، نه علامتِ توان.</p>`),
          '<h4>الگوی کوچک‌شونده</h4><p>خودت الگو را ادامه بده و به توان‌های منفی برس:</p>', host('n6c'),

          /* ───────── ۷ ───────── */
          K.sn('۷', 'ترکیب قانون‌ها'),
          '<p>در مسئله‌های بلندتر، قانون‌ها را پشت سر هم به کار می‌بریم.</p><p>روش کار این است:</p><ul><li>اول همهٔ پایه‌ها را یکی کن؛</li><li>بعد برای ضرب توان‌ها را جمع و برای تقسیم کم کن؛</li><li>در پایان مقدار را بنویس.</li></ul>',
          T`<h4>مثال اول</h4>`, AL([T`\frac{2^{5}\times2^{-2}}{2^{4}}&=\frac{2^{5+(-2)}}{2^{4}}=\frac{2^{3}}{2^{4}}`, T`&=2^{3-4}=2^{-1}=\frac{1}{2}`]),
          T`<h4>مثال دوم: پایه‌های متفاوت</h4><p>در $4\times2^{3}$ پایه‌ها فرق دارند، اما $4=2^{2}$ است. اول هم‌پایه‌شان می‌کنیم:</p>`, AL([T`4\times2^{3}&=2^{2}\times2^{3}`, T`&=2^{2+3}=2^{5}=32`]),
          T`<h4>مثال سوم: تقسیم با توان منفی</h4>`, AL([T`3^{-2}\div3^{-4}&=3^{-2-(-4)}`, T`&=3^{-2+4}=3^{2}=9`]),
          '<p>دقت کن که کم‌کردنِ یک توان منفی، مثل جمع‌کردنِ همان توان با علامت مثبت است.</p>',
          K.box('note', 'در این درس نیست', T`<p>توان‌رسانی به یک توان (مثل $(2^{3})^{2}$) و توانِ حاصل‌ضرب (مثل $(2\times3)^{2}$) در این درس لازم نیست.</p>`),

          /* ───────── ۸ ───────── */
          K.sn('۸', 'بازرس خطا'),
          '<p>در هر سؤال، حلِ یک عبارت را در سه مرحله می‌بینی. یکی از مرحله‌ها اشتباه است؛ بازرس باش و آن را پیدا کن:</p>', host('n6d'),

          /* ───────── ۹ ───────── */
          K.sn('۹', 'آزمون پایانی'),
          '<p>پنج سؤال با عددهای تصادفی. هر بار که از اول شروع کنی، سؤال‌ها عوض می‌شوند.</p>', host('n6e'),
          K.box('sum', 'جمع‌بندی', T`<ul><li>$a^{n}$ یعنی $n$ عاملِ $a$ که در هم ضرب شده‌اند. پایهٔ منفی یا کسری را داخل پرانتز می‌نویسیم.</li><li>پایهٔ منفی: توان زوج جواب مثبت و توان فرد جواب منفی می‌دهد. $(-2)^{4}$ با $-2^{4}$ فرق دارد.</li><li>ضرب هم‌پایه‌ها: توان‌ها جمع می‌شوند: $a^{m}\times a^{n}=a^{m+n}$.</li><li>تقسیم هم‌پایه‌ها: توان‌ها کم می‌شوند: $a^{m}\div a^{n}=a^{m-n}$.</li><li>$a^{0}=1$ و $a^{-n}=\dfrac{1}{a^{n}}$ (به شرط $a\neq0$). توان منفی عدد را منفی نمی‌کند.</li></ul><p>در درس بعد (جذر) و در محاسبهٔ ضلع‌های مثلث قائم‌الزاویه از همین توان‌ها استفاده می‌کنیم.</p>`)
        ].join(''));
      },
      init: function (panel) {
    panel.classList.add('standard-n6-10');
        K.signLab(panel.querySelector('#n6a')); K.countLab(panel.querySelector('#n6b')); K.patternLab(panel.querySelector('#n6c'));
        K.inspect(panel.querySelector('#n6d')); K.finalN06(panel.querySelector('#n6e'));
      }
    };
  }
};
