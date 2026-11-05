/* درس C02 — خواندن، نوشتن و رسم نقطه با زوج مرتب (فصل ۴)
   تمام تمرین‌ها تصادفی‌اند و پاسخ را با محاسبهٔ دقیق می‌سنجند. ابزار صفحهٔ مختصات: js/shared/coord.js */
window.LESSONS = window.LESSONS || {};
window.LESSONS.C02 = {
  needs: ['utils', 'inputs', 'kit', 'coord'],
  setup: function (K0) {
    var K = Object.create(K0), C = K0.cd(K), H = C.H;
    var fa = H.fa, R = H.R, shuffle = H.shuffle, fb = H.fb, T = H.T, M = H.M, rr = H.rr, fix = H.fix, pick = H.pick;
    var QN = C.QN, QF = C.QF, sg = C.sg, abs = Math.abs;
    var RE = function (k) { return 'ناحیهٔ ' + QN[k]; };
    var hz = function (v) { return (v < 0 ? 'به چپ' : 'به راست'); }, vt = function (v) { return (v < 0 ? 'پایین' : 'بالا'); };
    var num = function (v) { return M(String(abs(v))); };
    /* نقطهٔ تصادفی: مؤلفه‌ها برابر نباشند تا جابه‌جایی قابل تشخیص باشد */
    function rpt(axis) { var p, t = 0; do { p = axis ? C.rp(4, { axis: true, not: [[0, 0]] }) : C.rp(4); } while (!axis && (p[0] === p[1] || p[0] === -p[1]) && t++ < 60); return p; }
    function errKind(sx, sy, p) {                                                      /* نوع خطای نقطهٔ انتخابی */
      if (sx === p[1] && sy === p[0] && p[0] !== p[1]) { return 'swap'; }
      if ((sx === -p[0] && sy === p[1]) || (sx === p[0] && sy === -p[1]) || (sx === -p[0] && sy === -p[1])) { return 'sign'; }
      return 'other';
    }
    var MSG = {
      swap: 'مؤلفه‌ها را جابه‌جا گرفته‌ای. مؤلفهٔ <b>اول</b> جای افقی و مؤلفهٔ <b>دوم</b> جای عمودی است.',
      sign: 'قدر عددها درست است، ولی علامتِ یکی از آن‌ها نه. چپ و پایین منفی‌اند، راست و بالا مثبت.',
      other: 'خط‌های راهنما را از نقطه به هر دو محور بکش و عددها را بخوان.'
    };

    /* ============ ۱) پیاده‌روی از مبدأ ============ */
    K.walk = function (host) {
      var x = 3, y = 2, swap = false;
      host.innerHTML = rr('<div id="wpl"></div><div class="cd-grid cd-g2"><div class="lk-line" id="wx"></div><div class="lk-line" id="wy"></div></div><div class="cd-info" id="win"></div><div class="lk-line"><button type="button" class="btn" id="wsw">ترتیب را عوض کن: نقطهٔ ' + M('(y,x)') + ' را هم نشان بده</button></div>');
      var pl = host.querySelector('#wpl'), info = host.querySelector('#win'), bsw = host.querySelector('#wsw');
      function steppers(id, nm, v) { host.querySelector(id).style.direction = 'ltr'; host.querySelector(id).innerHTML = '<button type="button" class="btn" data-s="' + nm + '" data-d="-1" aria-label="کم کن">\u2212</button><span>' + rr(M(nm + '=' + v)) + '</span><button type="button" class="btn" data-s="' + nm + '" data-d="1" aria-label="زیاد کن">+</button>'; }
      function draw() {
        var pts = [{ x: x, y: y, c: C.PINK, r: 7, l: 'P', pair: true, dy: -11 }], seg = [{ a: [0, 0], b: [x, 0], c: C.TEAL, w: 3.4 }, { a: [x, 0], b: [x, y], c: C.PINK, w: 3.4 }];
        if (swap && !(x === y)) {
          if (abs(y) <= 5 && abs(x) <= 4) { pts.push({ x: y, y: x, c: '#fff', hollow: true, r: 7, l: 'Q', pair: true, dy: -11 }); }
        }
        pl.innerHTML = C.plane({ seg: seg, pts: pts });
        steppers('#wx', 'x', x); steppers('#wy', 'y', y);
        var hs = x === 0 ? 'در راستای افقی حرکتی نمی‌کنی' : num(x) + ' واحد ' + hz(x), vs = y === 0 ? 'در راستای عمودی هم حرکتی نمی‌کنی' : num(y) + ' واحد ' + vt(y);
        info.innerHTML = rr('از مبدأ: <span style="color:#0a6f61"><b>' + hs + '</b></span>، سپس <span style="color:#d6457a"><b>' + vs + '</b></span> ← ' + C.pt(x, y) +
          (swap ? (x === y ? '<br><b>این‌جا ' + M('(y,x)') + ' با ' + M('(x,y)') + ' یکی است.</b>' : abs(y) > 5 || abs(x) > 4 ? '<br>' + C.pt(y, x) + ' خارج از این صفحه است.' : '<br>نقطهٔ ' + M('Q') + ' = ' + C.pt(y, x) + ' جایی دیگر است: ترتیب مؤلفه‌ها مهم است!') : ''));
        bsw.classList.toggle('primary', swap);
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) { return; }
        if (b.id === 'wsw') { swap = !swap; draw(); return; }
        if (b.dataset.s === 'x') { x = Math.max(-5, Math.min(5, x + +b.dataset.d)); } else if (b.dataset.s === 'y') { y = Math.max(-4, Math.min(4, y + +b.dataset.d)); }
        draw();
      });
      draw();
    };

    /* ============ ۲) خواندن مختصات ============ */
    K.readLab = function (host) {
      var N = 5, i, res, pt, show, done, msg, vx, vy;
      function newPt() { pt = rpt(Math.random() < 0.2); show = false; done = false; msg = ''; vx = ''; vy = ''; }
      function newGame() { i = 0; res = []; newPt(); paint(); }
      function keep() { var a = host.querySelector('input[data-k="x"]'), b = host.querySelector('input[data-k="y"]'); if (a) { vx = a.value; vy = b.value; } }
      function paint() {
        var h, a, b;
        if (i >= N) { var s = res.filter(Boolean).length; host.innerHTML = rr(C.dots(res, -1, N) + fb(s >= 4, '<b>نتیجه: ' + fa(s) + ' از ' + fa(N) + '</b>') + '<div class="opts"><button type="button" class="btn primary" data-r="1" data-scroll>مجموعهٔ جدید</button></div>'); return; }
        h = C.dots(res, i, N) + '<p class="ask">مختصات نقطهٔ ' + M('P') + ' را بنویس (مؤلفهٔ اول، سپس مؤلفهٔ دوم):</p>' + C.plane({ pts: [{ x: pt[0], y: pt[1], l: 'P', c: C.PINK, r: 7 }], guides: show || done ? [{ x: pt[0], y: pt[1] }] : [] });
        h += '<div class="lk-line"><button type="button" class="btn" data-g="1">' + (show ? 'پنهان‌کردن راهنما' : 'نمایش خط‌های راهنما') + '</button></div><div style="text-align:center">' + C.pairIn() + '</div>' + (done ? '' : '<div class="opts"><button type="button" class="btn primary" data-ck="1">بررسی</button></div>');
        if (msg) { h += msg; }
        if (done) { h += '<div class="opts"><button type="button" class="btn primary" data-nx="1" data-scroll>' + (i === N - 1 ? 'پایان' : 'نقطهٔ بعدی') + '</button></div>'; }
        host.innerHTML = rr(h);
        a = host.querySelector('input[data-k="x"]'); b = host.querySelector('input[data-k="y"]'); a.value = vx; b.value = vy;
        if (done) { a.disabled = b.disabled = true; var ok = res[i]; a.className = b.className = ok ? 'ok' : 'no'; host.querySelectorAll('.cd-pm').forEach(function (z) { z.disabled = true; }); }
      }
      function check() {
        keep(); var x = C.parseInt0(vx), y = C.parseInt0(vy), ok;
        if (x === null || y === null) { msg = '<div class="lk-cap lk-bad">هر دو عدد را بنویس (برای منفی از دکمهٔ ± استفاده کن).</div>'; paint(); return; }
        ok = x === pt[0] && y === pt[1]; done = true; res[i] = ok;
        msg = fb(ok, ok ? 'درست است! ✓' : MSG[errKind(x, y, pt)]) + '<div class="ex"><p>از مبدأ ' + (pt[0] === 0 ? 'در راستای افقی حرکتی نمی‌کنی' : num(pt[0]) + ' واحد ' + hz(pt[0])) + ' و ' + (pt[1] === 0 ? 'در راستای عمودی حرکتی نمی‌کنی' : num(pt[1]) + ' واحد ' + vt(pt[1])) + ' می‌روی؛ پس ' + C.pt(pt[0], pt[1]) + '.</p></div>';
        paint();
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b || b.disabled) { return; }
        if (b.dataset.r) { newGame(); } else if (b.dataset.g) { keep(); show = !show; paint(); } else if (b.dataset.ck) { check(); } else if (b.dataset.nx) { i++; newPt(); paint(); }
      });
      host.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.tagName === 'INPUT' && !done) { check(); } });
      C.wirePm(host); newGame();
    };

    /* ============ ۳) رسم نقطه با لمس ============ */
    K.plot = function (host) {
      var N = 5, i, res, tg, sel, ans, msg;
      function newPt() { tg = rpt(i === 1 || i === 3); sel = null; ans = null; msg = ''; }
      function newGame() { i = 0; res = []; newPt(); paint(); }
      function paint() {
        var h, po;
        if (i >= N) { var s = res.filter(Boolean).length; host.innerHTML = rr(C.dots(res, -1, N) + fb(s >= 4, '<b>نتیجه: ' + fa(s) + ' از ' + fa(N) + '</b>') + '<div class="opts"><button type="button" class="btn primary" data-r="1" data-scroll>مجموعهٔ جدید</button></div>'); return; }
        po = { pts: [] };
        if (!ans) { po.pick = true; po.sel = sel; } else { po.pts.push({ x: tg[0], y: tg[1], c: C.GREEN, r: 7, ring: true }); if (!ans.ok) { po.pts.push({ x: ans.x, y: ans.y, c: C.RED, r: 6 }); } po.seg = [{ a: [0, 0], b: [tg[0], 0], c: C.TEAL, w: 3 }, { a: [tg[0], 0], b: tg, c: C.PINK, w: 3 }]; }
        h = C.dots(res, i, N) + '<p class="ask">نقطهٔ ' + C.pt(tg[0], tg[1]) + ' را روی صفحه مشخص کن (لمس کن، بعد «تأیید» را بزن):</p>' + C.plane(po);
        if (!ans) { h += '<div class="opts"><button type="button" class="btn primary" data-ck="1"' + (sel ? '' : ' disabled') + '>تأیید</button></div>'; }
        else { h += msg + '<div class="opts"><button type="button" class="btn primary" data-nx="1" data-scroll>' + (i === N - 1 ? 'پایان' : 'نقطهٔ بعدی') + '</button></div>'; }
        host.innerHTML = rr(h);
      }
      host.addEventListener('click', function (e) {
        var t = C.hit(e), b = e.target.closest('button');
        if (t && !ans) { sel = [t.x, t.y]; paint(); return; }
        if (!b || b.disabled) { return; }
        if (b.dataset.r) { newGame(); }
        else if (b.dataset.ck && sel) {
          var ok = sel[0] === tg[0] && sel[1] === tg[1]; ans = { x: sel[0], y: sel[1], ok: ok }; res[i] = ok;
          msg = fb(ok, ok ? 'درست است! ✓' : MSG[errKind(sel[0], sel[1], tg)]) + '<div class="ex"><p>' + (tg[0] === 0 ? 'مؤلفهٔ اول صفر است؛ پس به چپ و راست نمی‌روی.' : num(tg[0]) + ' واحد ' + hz(tg[0]) + ' می‌روی') + ' ' + (tg[1] === 0 ? 'مؤلفهٔ دوم صفر است؛ پس بالا و پایین نمی‌روی.' : 'و ' + num(tg[1]) + ' واحد ' + vt(tg[1]) + '.') + '</p></div>';
          paint();
        } else if (b.dataset.nx) { i++; newPt(); paint(); }
      });
      newGame();
    };

    /* ============ ۴) دسته‌بندی: کدام نقطه کجاست؟ ============ */
    K.bins = function (host) {
      var tiles, sel, placed, wrong, msg, done;
      var BINS = [['x', 'روی محور ' + M('x')], ['y', 'روی محور ' + M('y')], ['o', 'مبدأ مختصات'], ['r', 'داخل یک ناحیه']];
      function cl(p) { return p[0] === 0 && p[1] === 0 ? 'o' : p[1] === 0 ? 'x' : p[0] === 0 ? 'y' : 'r'; }
      function why(p) {
        var c = cl(p); return c === 'o' ? 'هر دو مؤلفه صفرند: مبدأ.' : c === 'x' ? 'مؤلفهٔ دوم صفر است: نقطه بالا و پایین نمی‌رود و روی محور ' + M('x') + ' می‌ماند.' : c === 'y' ? 'مؤلفهٔ اول صفر است: نقطه چپ و راست نمی‌رود و روی محور ' + M('y') + ' می‌ماند.' : 'هیچ مؤلفه‌ای صفر نیست: نقطه در ' + RE(C.quad(p[0], p[1])) + ' است.';
      }
      function newGame() {
        var list = [], seen = {}, add = function (p) { var k = p.join(); if (!seen[k]) { seen[k] = 1; list.push(p); } };
        add([0, 0]); while (list.length < 3) { add(C.rp(4, { axis: true, not: [[0, 0]] })); }
        while (list.length < 5) { var a = C.rp(4, { axis: true, not: [[0, 0]] }); add(a); }
        while (list.length < 8) { add(C.rp(4)); }
        if (!list.some(function (p) { return cl(p) === 'x'; })) { list[1] = [R(1, 4) * pick([-1, 1]), 0]; }
        if (!list.some(function (p) { return cl(p) === 'y'; })) { list[2] = [0, R(1, 4) * pick([-1, 1])]; }
        tiles = shuffle(list.map(function (p, k) { return { p: p, k: k }; })); sel = -1; placed = { x: [], y: [], o: [], r: [] }; wrong = 0; msg = ''; done = false; paint();
      }
      function paint() {
        var left = tiles.filter(function (t) { return !t.done; }), h = '<p class="ask">زوج مرتب را انتخاب کن، بعد روی جایی بزن که نقطه‌اش در آنجا قرار می‌گیرد:</p><div class="cd-tray">';
        tiles.forEach(function (t, k) { if (!t.done) { h += '<button type="button" class="cd-tile' + (k === sel ? ' sel' : '') + (t.shk ? ' shk' : '') + '" data-t="' + k + '">' + C.bd('(' + sg(t.p[0]) + '\u060C ' + sg(t.p[1]) + ')') + '</button>'; t.shk = false; } });
        h += '</div><div class="cd-grid cd-g2">';
        BINS.forEach(function (b) { h += '<button type="button" class="cd-bin' + (sel >= 0 ? ' hot' : '') + '" data-b="' + b[0] + '"><b>' + b[1] + '</b>' + placed[b[0]].map(function (p) { return '<span>' + C.bd('(' + sg(p[0]) + '\u060C ' + sg(p[1]) + ')') + '</span>'; }).join('') + '</button>'; });
        h += '</div><div class="lk-cap">' + msg + '</div>';
        if (!left.length) { h += fb(wrong <= 1, '<b>همه را درست دسته‌بندی کردی!</b> تعداد اشتباه‌ها: ' + fa(wrong)) + '<div class="opts"><button type="button" class="btn primary" data-r="1" data-scroll>بازی جدید</button></div>'; }
        host.innerHTML = rr(h);
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) { return; }
        if (b.dataset.r) { newGame(); return; }
        if (b.dataset.t !== undefined) { sel = sel === +b.dataset.t ? -1 : +b.dataset.t; msg = ''; paint(); return; }
        if (b.dataset.b && sel >= 0) {
          var t = tiles[sel];
          if (cl(t.p) === b.dataset.b) { t.done = true; placed[b.dataset.b].push(t.p); msg = '<span style="color:green">' + why(t.p) + '</span>'; sel = -1; }
          else { wrong++; t.shk = true; msg = '<span class="lk-bad">این‌جا نیست. ببین کدام مؤلفه صفر است (یا هیچ‌کدام).</span>'; }
          paint();
        }
      });
      newGame();
    };

    /* ============ ۵) فاصله از محورها ============ */
    K.dist = function (host) {
      C.probe(host, { plane: {}, hint: 'نقطه‌ای را لمس کن تا فاصله‌اش از دو محور را ببینی.', extra: function (x, y) { return { guides: [{ x: x, y: y, vc: C.TEAL, hc: C.PINK, vl: fa(abs(y)), hl: fa(abs(x)) }], pts: [{ x: x, y: y, c: C.RED, r: 6, l: '', pair: true, dy: -10 }] }; } },
        function (x, y) {
          return C.pt(x, y) + '<br><span style="color:#0a6f61"><b>فاصله تا محور ' + M('x') + ':</b> ' + M('|y|=|' + y + '|=' + abs(y)) + '</span> · <span style="color:#d6457a"><b>فاصله تا محور ' + M('y') + ':</b> ' + M('|x|=|' + x + '|=' + abs(x)) + '</span>';
        });
    };

    /* ============ ۶) گنج‌یابی ============ */
    K.treasure = function (host) {
      var tr, shots, found, msg, over;
      var MAX = 12;
      function newGame() {
        var seen = {}, list = [];
        while (list.length < 3) { var p = [R(-5, 5), R(-4, 4)]; if (!seen[p.join()] && (p[0] || p[1])) { seen[p.join()] = 1; list.push(p); } }
        tr = list.map(function (p) { return { p: p, got: false }; }); shots = []; found = 0; msg = 'سه گنج روی نقشه پنهان است. هر لمس یک تیر است؛ فقط ' + fa(MAX) + ' تیر داری.'; over = false; paint();
      }
      function paint() {
        var pts = [], h;
        shots.forEach(function (s) { pts.push(s.hit ? { x: s.p[0], y: s.p[1], c: C.YEL, r: 8, ring: true, l: '★', dx: 10, dy: 5 } : { x: s.p[0], y: s.p[1], c: '#9aa5b8', r: 4.5 }); });
        if (over) { tr.forEach(function (t) { if (!t.got) { pts.push({ x: t.p[0], y: t.p[1], c: C.RED, hollow: true, r: 7, l: '?', dx: 10, dy: 5 }); } }); }
        h = '<p class="ask">تیرها: <b>' + fa(shots.length) + '</b> از ' + fa(MAX) + ' · گنج‌های پیداشده: <b>' + fa(found) + '</b> از ' + fa(3) + '</p><div class="cd-bar"><i style="width:' + (shots.length / MAX * 100) + '%"></i></div>';
        h += C.plane({ pts: pts, pick: !over }) + '<div class="cd-info">' + msg + '</div>';
        if (over) { h += '<div class="opts"><button type="button" class="btn primary" data-r="1" data-scroll>نقشهٔ جدید</button></div>'; }
        host.innerHTML = rr(h);
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (b && b.dataset.r) { newGame(); return; }
        var t = C.hit(e); if (!t || over) { return; }
        if (shots.some(function (s) { return s.p[0] === t.x && s.p[1] === t.y; })) { msg = 'این‌جا را قبلاً زده‌ای؛ جای دیگری را امتحان کن.'; paint(); return; }
        var hit = tr.filter(function (g) { return !g.got && g.p[0] === t.x && g.p[1] === t.y; })[0];
        if (hit) { hit.got = true; found++; msg = '<b>🎉 گنج!</b> در ' + C.pt(t.x, t.y) + ' بود.'; }
        else {
          var d = Math.min.apply(null, tr.filter(function (g) { return !g.got; }).map(function (g) { return abs(g.p[0] - t.x) + abs(g.p[1] - t.y); }));
          msg = 'تیر ' + fa(shots.length + 1) + ' در ' + C.pt(t.x, t.y) + ': ' + (d <= 1 ? '<b style="color:#c62f2f">داغ 🔥</b> (خیلی نزدیک)' : d <= 3 ? '<b style="color:#e08a00">گرم</b>' : '<b style="color:#4c5fd5">سرد ❄</b>');
        }
        shots.push({ p: [t.x, t.y], hit: !!hit });
        if (found === 3) { over = true; msg += '<br><b>همهٔ گنج‌ها را با ' + fa(shots.length) + ' تیر پیدا کردی!</b>'; }
        else if (shots.length >= MAX) { over = true; msg += '<br><b>تیرها تمام شد.</b> جای گنج‌های پیدانشده با «؟» نشان داده شد.'; }
        paint();
      });
      newGame();
    };

    /* ============ آزمون پایانی ============ */
    K.finalC02 = function (host) {
      var o = function (h, ok, m) { return { h: h, ok: ok, m: m }; };
      function qRead() {
        var p = rpt(false), L = pick(['الف', 'ب', 'ج', 'د', 'ه']);
        return { kind: 'mcq', ask: 'مختصات نقطهٔ «' + L + '» کدام است؟', fig: C.plane({ pts: [{ x: p[0], y: p[1], l: L, c: C.PINK, r: 7 }] }),
          opts: [o(C.pt(p[0], p[1]), true), o(C.pt(p[1], p[0]), false, 'مؤلفه‌ها جابه‌جا شده‌اند؛ اول جای افقی را بنویس.'), o(C.pt(-p[0], p[1]), false, 'علامت مؤلفهٔ اول درست نیست.'), o(C.pt(p[0], -p[1]), false, 'علامت مؤلفهٔ دوم درست نیست.')],
          expl: '<p>' + num(p[0]) + ' واحد ' + hz(p[0]) + ' و ' + num(p[1]) + ' واحد ' + vt(p[1]) + ' از مبدأ؛ پس ' + C.pt(p[0], p[1]) + '.</p>' };
      }
      function qPlot() {
        var p = rpt(Math.random() < 0.3);
        return { kind: 'pick', ask: 'نقطهٔ ' + C.pt(p[0], p[1]) + ' را روی صفحه مشخص کن.', plane: {}, ans: p, bad: function (a) { return MSG[errKind(a.x, a.y, p)]; }, expl: '<p>' + (p[0] === 0 ? 'مؤلفهٔ اول صفر است.' : num(p[0]) + ' واحد ' + hz(p[0])) + ' ' + (p[1] === 0 ? 'مؤلفهٔ دوم صفر است.' : 'و ' + num(p[1]) + ' واحد ' + vt(p[1]) + '.') + '</p>' };
      }
      function qAxis() {
        var p = rpt(true), n = abs(p[0] || p[1]), onX = p[1] === 0, v = onX ? (p[0] < 0 ? 'چپ' : 'راست') : (p[1] < 0 ? 'پایین' : 'بالای');
        var mk = function (ax, dir) { return 'روی محور ' + M(ax) + '، ' + M(String(n)) + ' واحد ' + (dir === 'چپ' ? 'سمت چپ' : dir === 'راست' ? 'سمت راست' : dir === 'بالای' ? 'بالای' : 'پایین') + ' مبدأ'; };
        var key = (onX ? 'x' : 'y') + v;
        return { kind: 'mcq', ask: 'نقطهٔ ' + C.pt(p[0], p[1]) + ' کجا قرار دارد؟', opts: [['x', 'چپ'], ['x', 'راست'], ['y', 'بالای'], ['y', 'پایین']].map(function (d) { return o(mk(d[0], d[1]), d[0] + d[1] === key, 'مؤلفهٔ ' + (onX ? 'دوم' : 'اول') + ' صفر است؛ این نقطه روی محور ' + M(onX ? 'x' : 'y') + ' است و جهتش را علامتِ مؤلفهٔ دیگر می‌گوید.'); }),
          expl: '<p>یک مؤلفه صفر است، پس نقطه روی محور ' + M(onX ? 'x' : 'y') + ' می‌ماند. ' + (onX ? 'مؤلفهٔ اول ' + M(String(p[0])) + ' ' : 'مؤلفهٔ دوم ' + M(String(p[1])) + ' ') + 'جهت و اندازه را می‌گوید.</p>' };
      }
      function qOrder() {
        var p = rpt(false), A = abs(p[0]), B = abs(p[1]);
        var txt = function (a, b, sx, sy) { return num(a) + ' واحد ' + (sx < 0 ? 'به چپ' : 'به راست') + ' و ' + num(b) + ' واحد ' + (sy < 0 ? 'پایین' : 'بالا'); };
        var sx = p[0] < 0 ? -1 : 1, sy = p[1] < 0 ? -1 : 1;
        return { kind: 'mcq', ask: 'برای رسیدن از مبدأ به نقطهٔ ' + C.pt(p[0], p[1]) + ' چه باید کرد؟', opts: [o(txt(A, B, sx, sy), true), o(txt(A, B, -sx, sy), false, 'جهت حرکت افقی برعکس شده است.'), o(txt(A, B, sx, -sy), false, 'جهت حرکت عمودی برعکس شده است.'), o(txt(B, A, sx, sy), false, 'مؤلفهٔ اول افقی است و مؤلفهٔ دوم عمودی؛ اندازه‌ها جابه‌جا شده‌اند.')],
          expl: '<p>مؤلفهٔ اول ' + M(String(p[0])) + ' حرکت افقی را می‌گوید و مؤلفهٔ دوم ' + M(String(p[1])) + ' حرکت عمودی را.</p>' };
      }
      function qDist() {
        var p = rpt(false), toY = Math.random() < 0.5, d1 = toY ? abs(p[0]) : abs(p[1]), d2 = toY ? abs(p[1]) : abs(p[0]);
        var vals = [[d1, true, ''], [d2, false, 'فاصله از محور ' + M(toY ? 'y' : 'x') + ' را با فاصله از محور دیگر اشتباه گرفته‌ای.'], [-d1, false, 'فاصله منفی نمی‌شود؛ علامت فقط می‌گوید نقطه در کدام طرف است.'], [d1 + d2, false, 'فاصله از یک محور فقط به همان یک مؤلفه بستگی دارد.']];
        return { kind: 'mcq', ask: 'فاصلهٔ نقطهٔ ' + C.pt(p[0], p[1]) + ' تا محور ' + M(toY ? 'y' : 'x') + ' چند واحد است؟', opts: vals.map(function (v) { return o(M(String(v[0])), v[1], v[2]); }),
          expl: '<p>فاصله تا محور ' + M('y') + ' برابر ' + M('|x|') + ' و فاصله تا محور ' + M('x') + ' برابر ' + M('|y|') + ' است. اینجا ' + M(toY ? '|' + p[0] + '|=' + d1 : '|' + p[1] + '|=' + d1) + '.</p>' };
      }
      function qFind() {
        var k = pick([1, 2, 3, 4]), sx = k === 1 || k === 4 ? 1 : -1, sy = k <= 2 ? 1 : -1, a = R(1, 4), b = R(1, 4), ans = [sx * a, sy * b];
        return { kind: 'pick', ask: 'نقطه‌ای را مشخص کن که در ' + RE(k) + ' باشد، فاصله‌اش تا محور ' + M('y') + ' برابر ' + M(String(a)) + ' و تا محور ' + M('x') + ' برابر ' + M(String(b)) + ' باشد.', plane: { qn: false }, ans: ans,
          bad: function (s) { return s.x === sy * b && s.y === sx * a ? 'فاصله تا محور ' + M('y') + ' اندازهٔ مؤلفهٔ اول است، نه دوم.' : C.quad(s.x, s.y) !== k ? 'آن نقطه در ' + (C.quad(s.x, s.y) ? RE(C.quad(s.x, s.y)) : 'هیچ ناحیه‌ای') + ' است.' : 'فاصله‌ها را از روی شبکه بشمار.'; },
          expl: '<p>فاصله تا محور ' + M('y') + ' یعنی ' + M('|x|=' + a) + ' و فاصله تا محور ' + M('x') + ' یعنی ' + M('|y|=' + b) + '. در ' + RE(k) + ' علامت‌ها ' + C.signs(sx, sy) + ' است؛ پس ' + C.pt(sx * a, sy * b) + '.</p>' };
      }
      C.quiz(host, function () { return [qRead, qPlot, qAxis, qOrder, qDist, qFind].map(function (f) { var q, t = 0; do { q = f(); } while (q.opts && C.distinct(q.opts, function (x) { return x.h; }).length < q.opts.length && t++ < 40); if (q.opts) { q.opts = shuffle(q.opts.slice()); } return q; }); },
        function (s) { return s === 6 ? 'عالی! همهٔ سؤال‌ها درست بود.' : s >= 4 ? 'خوب بود. سؤال‌هایی را که اشتباه کردی دوباره مرور کن.' : 'یک بار دیگر درس را مرور کن و با سؤال‌های جدید امتحان کن.'; });
    };

    var TIP_ORD = '<p>به این زوج «مرتب» می‌گوییم چون <b>ترتیب</b> نوشتن عددها مهم است. ' + M('(3,2)') + ' یعنی ۳ واحد افقی و ۲ واحد عمودی، ولی ' + M('(2,3)') + ' یعنی ۲ واحد افقی و ۳ واحد عمودی؛ دو نقطهٔ متفاوت.</p><p>مجموعهٔ ' + M('\\{3,2\\}') + ' و ' + M('\\{2,3\\}') + ' یکی بودند، اما زوج‌مرتب‌ها یکی نیستند.</p>';
    var TIP_ABS = '<p>قدرمطلق یعنی «اندازه بدون علامت»: ' + M('|-3|=3') + ' و ' + M('|3|=3') + '. فاصله هیچ‌وقت منفی نیست؛ علامتِ مؤلفه فقط می‌گوید نقطه در کدام طرف محور است.</p>';

    return {
      html: function () {
        H.tip('c2-ord', 'چرا «مرتب»؟', TIP_ORD); H.tip('c2-abs', 'قدرمطلق و فاصله', TIP_ABS);
        var host = H.host;
        return fix([
          K.sn('۱', 'زوج مرتب: آدرسِ نقطه'),
          '<p>برای پیدا کردن یک نقطه روی صفحه دو عدد کافی است: اولی می‌گوید <b>چقدر افقی</b> (راست یا چپ) و دومی می‌گوید <b>چقدر عمودی</b> (بالا یا پایین). این دو عدد را داخل پرانتز و با ویرگول می‌نویسیم:</p>', K.dm(T`(x,\ y)`), '<p>مثلاً:</p>', K.dm(T`(3,\ 2)`),
          '<p>' + M('x') + ' را «مؤلفهٔ اول» (یا طول) و ' + M('y') + ' را «مؤلفهٔ دوم» (یا عرض) می‌نامیم. به این پرانتز «زوج مرتب» می‌گوییم ' + H.tip('c2-ord', 'چرا «مرتب»؟', TIP_ORD) + '. مثلاً ' + M('(3,2)') + ' یعنی از مبدأ ۳ واحد به راست و بعد ۲ واحد بالا. خودت امتحان کن:</p>', host('c2a'),
          K.box('err', '⚠ ترتیب مهم است', '<p>' + M('(3,2)') + ' با ' + M('(2,3)') + ' یکی نیست. همیشه <b>اول افقی، بعد عمودی</b>.</p>'),

          K.sn('۲', 'خواندن مختصات یک نقطه'),
          '<p>برای نوشتنِ زوج‌مرتبِ یک نقطه، سه قدم کافی است:</p><ol><li>از نقطه به محور ' + M('x') + ' عمود بکش (به پایین یا بالا). عددی که آنجا می‌رسی <b>مؤلفهٔ اول</b> است.</li><li>از نقطه به محور ' + M('y') + ' عمود بکش (به چپ یا راست). عددی که آنجا می‌رسی <b>مؤلفهٔ دوم</b> است.</li><li>عددها را به‌ترتیب (اول، دوم) در پرانتز بنویس.</li></ol>',
          C.plane({ pts: [{ x: -3, y: 2, c: C.PINK, r: 7, l: 'A' }], guides: [{ x: -3, y: 2 }], notes: [{ x: -3, y: -0.95, t: C.sg(-3), c: C.TEAL, fs: 14 }, { x: 0.55, y: 1.78, t: fa(2), c: C.PINK, fs: 14, anchor: 'start' }] }),
          '<p>برای نقطهٔ ' + M('A') + ' در شکل: عمود بر محور ' + M('x') + ' به عدد ' + M('-3') + ' می‌رسد و عمود بر محور ' + M('y') + ' به عدد ' + M('2') + '؛ پس ' + M('A(-3,2)') + '.</p>',
          '<h4>خواندن مختصات</h4><p>پنج نقطه را بخوان. اگر کمک خواستی، خط‌های راهنما را نشان بده:</p>', host('c2b'),

          K.sn('۳', 'رسم نقطه'),
          '<p>رسم نقطه برعکسِ خواندن است. از مبدأ شروع کن: اول به اندازهٔ مؤلفهٔ اول افقی برو (راست اگر مثبت، چپ اگر منفی)، بعد به اندازهٔ مؤلفهٔ دوم عمودی (بالا اگر مثبت، پایین اگر منفی). جایی که می‌رسی نقطه است.</p>',
          '<h4>رسم با لمس</h4><p>پنج زوج مرتب را روی صفحه مشخص کن. بعضی از آن‌ها روی محورند:</p>', host('c2c'),

          K.sn('۴', 'نقطه‌های روی محورها'),
          '<p>اگر مؤلفهٔ دوم صفر باشد، نقطه بالا و پایین نمی‌رود و روی محور ' + M('x') + ' است: ' + M('(a,0)') + '. اگر مؤلفهٔ اول صفر باشد، چپ و راست نمی‌رود و روی محور ' + M('y') + ' است: ' + M('(0,b)') + '. اگر هر دو صفر باشند، نقطه مبدأ است: ' + M('(0,0)') + '.</p>',
          '<h4>دسته‌بندی</h4><p>هشت زوج مرتب را در جای درستشان بگذار:</p>', host('c2d'),

          K.sn('۵', 'فاصله از محورها'),
          '<p>فاصلهٔ نقطه تا محور ' + M('y') + ' را مؤلفهٔ اول و فاصلهٔ آن تا محور ' + M('x') + ' را مؤلفهٔ دوم می‌گوید؛ البته بدون علامت: ' + M('|x|') + ' و ' + M('|y|') + ' ' + H.tip('c2-abs', 'قدرمطلق و فاصله', TIP_ABS) + '. علامت فقط می‌گوید نقطه در کدام طرف است. نقطه‌ای را لمس کن و فاصله‌ها را ببین:</p>', host('c2e'),
          K.box('err', '⚠ اشتباه رایج', '<p>فاصله تا محور ' + M('x') + ' را با ' + M('|x|') + ' اشتباه نگیر. نقطه‌ای که ' + M('|y|') + ' واحد بالا یا پایینِ محور ' + M('x') + ' است، از محور ' + M('x') + ' به اندازهٔ <b>' + M('|y|') + '</b> فاصله دارد.</p>'),
          '<p><b>مثال:</b> نقطه‌ای در ناحیهٔ سوم، با فاصلهٔ ۳ تا محور ' + M('y') + ' و فاصلهٔ ۲ تا محور ' + M('x') + ' بخواهیم. ناحیهٔ سوم یعنی ' + M('x') + ' و ' + M('y') + ' منفی‌اند؛ اندازه‌ها ۳ و ۲ هستند؛ پس ' + M('(-3,-2)') + '.</p>',
          C.plane({ shade: { 3: QF[3] }, pts: [{ x: -3, y: -2, c: C.PINK, r: 7, pair: true, dy: 18 }], guides: [{ x: -3, y: -2, vl: fa(2), hl: fa(3) }] }),

          K.sn('۶', 'بازی: گنج‌یابی'),
          '<p>سه گنج روی نقشه پنهان است. هر بار که جایی را لمس کنی، زوج‌مرتبِ آن‌جا را می‌بینی و می‌فهمی گنج «داغ» است یا «سرد». با دوازده تیر سه گنج را پیدا کن:</p>', host('c2f'),

          K.sn('۷', 'آزمون پایانی'),
          '<p>شش سؤال با نقطه‌ها و عددهای تصادفی. هر بار که از اول شروع کنی، سؤال‌ها عوض می‌شوند.</p>', host('c2g'),
          K.box('sum', 'جمع‌بندی', T`<ul><li>زوج مرتب $(x,y)$: مؤلفهٔ اول جای افقی و مؤلفهٔ دوم جای عمودی را می‌گوید؛ ترتیب مهم است.</li><li>برای خواندن، از نقطه به دو محور عمود بکش؛ برای رسم، از مبدأ اول افقی و بعد عمودی برو.</li><li>$(a,0)$ روی محور $x$ است، $(0,b)$ روی محور $y$ و $(0,0)$ مبدأ.</li><li>فاصله تا محور $y$ برابر $|x|$ و فاصله تا محور $x$ برابر $|y|$ است.</li></ul><p>در درس بعد همین نقطه‌ها را از روی جدول و نمودار می‌خوانی.</p>`)
        ].join(''));
      },
      init: function (panel) {
        K.walk(panel.querySelector('#c2a')); K.readLab(panel.querySelector('#c2b')); K.plot(panel.querySelector('#c2c')); K.bins(panel.querySelector('#c2d'));
        K.dist(panel.querySelector('#c2e')); K.treasure(panel.querySelector('#c2f')); K.finalC02(panel.querySelector('#c2g'));
      }
    };
  }
};
