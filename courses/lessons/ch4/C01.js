/* درس C01 — دستگاه مختصات، محورها و ناحیه‌ها (فصل ۴)
   تمام تمرین‌ها تصادفی‌اند و پاسخ را با محاسبهٔ دقیق می‌سنجند. ابزار صفحهٔ مختصات: js/shared/coord.js */
window.LESSONS = window.LESSONS || {};
window.LESSONS.C01 = {
  needs: ['utils', 'inputs', 'kit', 'coord'],
  setup: function (K0) {
    var K = Object.create(K0), C = K0.cd(K), H = C.H;
    var fa = H.fa, R = H.R, shuffle = H.shuffle, fb = H.fb, T = H.T, M = H.M, rr = H.rr, fix = H.fix, pick = H.pick;
    var QN = C.QN, QF = C.QF, QC = C.QC, sg = C.sg;
    var sgn = function (v) { return v < 0 ? 'منفی' : 'مثبت'; };
    var RE = function (k) { return 'ناحیهٔ ' + QN[k]; };
    var SIGN = { 1: [1, 1], 2: [-1, 1], 3: [-1, -1], 4: [1, -1] };
    var stSigns = function (k) { return C.signs(SIGN[k][0], SIGN[k][1]); };

    /* ============ ۱) ساختن صفحه، مرحله‌به‌مرحله (ساختار مثال حل‌شدهٔ فصل ۳، بدون «مشاهدهٔ حل کامل») ============ */
    K.build = function (host) {
      var step = 0, N = 5, mh = 0;
      var CAP = [
        ['محور عدد را می‌شناسی', 'این همان «محور عدد» فصل اول است: صفر وسط است و عددها به راست بزرگ‌تر می‌شوند. اما با یک محور فقط می‌توانیم جای نقطه‌ها را <b>روی یک خط</b> بگوییم.'],
        ['محور دوم، عمودی', 'یک محور عدد دیگر را <b>عمود</b> بر اولی می‌گذاریم، طوری که صفرِ هر دو در یک جا باشد. حالا هر نقطه از کاغذ را می‌شود با دو عدد پیدا کرد.'],
        ['جای برخورد دو محور', 'نقطه‌ای که دو محور همدیگر را قطع می‌کنند <b>مبدأ مختصات</b> نام دارد. همهٔ فاصله‌ها از همین نقطه اندازه‌گیری می‌شوند.'],
        ['نام و جهت محورها', 'محور افقی را <b>محور x</b> و محور عمودی را <b>محور y</b> می‌نامیم. روی محور x به راست و روی محور y به بالا عددها مثبت‌اند؛ در جهت مخالف منفی.'],
        ['چهار ناحیه', 'دو محور صفحه را به <b>چهار ناحیه</b> تقسیم می‌کنند. ناحیه‌ها از بالا-راست شروع می‌شوند و <b>خلاف جهت عقربه‌های ساعت</b> شمارهٔ ۱ تا ۴ می‌گیرند.']
      ];
      function fig() {
        var base = { x0: -5, x1: 5, y0: -4, y1: 4, cell: 30 };
        if (step === 0) { return C.plane({ x0: -5, x1: 5, y0: -3, y1: 3, bare: true, noY: true, nolab: true, klab: true, pts: [{ x: -3, y: 0, c: C.PINK, r: 7, l: '\u2212' + fa(3), dy: -14 }, { x: 2, y: 0, c: C.TEAL, r: 7, l: fa(2), dy: -14 }] }); }
        if (step === 1) { return C.plane(Object.assign(base, { nolab: true })); }
        if (step === 2) { return C.plane(Object.assign(base, { nolab: true, part: 'o', notes: [{ x: 1.9, y: 0.75, t: 'مبدأ', c: C.PINK, fs: 14 }] })); }
        if (step === 3) { return C.plane(Object.assign(base, { notes: [{ x: 3.4, y: 1.0, t: 'مثبت +', c: C.TEAL }, { x: -3.4, y: 1.0, t: 'منفی −', c: C.RED }, { x: 1.9, y: 3.3, t: 'مثبت +', c: C.TEAL }, { x: 1.9, y: -3.4, t: 'منفی −', c: C.RED }] })); }
        return C.plane(Object.assign(base, { shade: QF, qn: true, ccw: true }));
      }
      function paint() {
        var seg = CAP.map(function (c, k) { return '<i' + (k <= step ? ' class="current"' : '') + '></i>'; }).join('');
        host.innerHTML = rr('<div class="ex cd-ex"><div class="cd-ex-top"><strong>ساختن صفحهٔ مختصات</strong><span>مرحلهٔ ' + fa(step + 1) + ' از ' + fa(N) + '</span></div><div class="cd-ex-prog" aria-hidden="true">' + seg + '</div><div class="cd-ex-body" aria-live="polite"' + (mh ? ' style="min-height:' + mh + 'px"' : '') + '><section><div class="cd-ex-head"><span class="cd-ex-chip">مرحلهٔ ' + fa(step + 1) + '</span><strong>' + CAP[step][0] + '</strong></div>' + fig() + '<p class="cd-ex-note">' + CAP[step][1] + '</p></section></div><div class="end-actions"><button type="button" class="btn" data-d="-1" data-scroll=".cd-ex-top" data-scroll-offset="10"' + (step ? '' : ' disabled') + '>مرحلهٔ قبلی</button><button type="button" class="btn primary" data-d="1" data-scroll=".cd-ex-top" data-scroll-offset="10"' + (step < N - 1 ? '' : ' disabled') + '>مرحلهٔ بعدی</button></div></div>');
      }
      host.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b || b.disabled) { return; } step += +b.dataset.d; paint(); });
      var m = 0, bd, k;
      for (k = 0; k < N; k++) { step = k; mh = 0; paint(); bd = host.querySelector('.cd-ex-body'); m = Math.max(m, bd.offsetHeight); }
      step = 0; mh = m; paint();
    };

    /* ============ موتور مشترک بازی‌های سؤال‌به‌سؤال (نوار شماره‌دار، قبلی/بعدی، نتیجهٔ استاندارد، مرور) ============
       o.once → هر سؤال یک پاسخ دارد و پس از آن جای درست نشان داده می‌شود؛ o.chk(it) → سؤالی که دکمهٔ بعدی‌اش تا پاسخ «بررسی» است */
    function hunt(host, o) {
      var items, st, i;
      function newGame() { items = o.make(); st = items.map(function () { return { wr: 0, done: false, first: false, msg: '' }; }); i = 0; paint(); }
      function paint() {
        var n = items.length, it = items[i], s = st[i], h, c, chk;
        if (i >= n) {
          c = st.filter(function (x) { return x.first; }).length;
          host.innerHTML = rr(K.res(c, n) + '<div class="end-actions"><button type="button" class="btn" data-pv="1" data-scroll>مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1" data-scroll>سؤال‌های جدید</button></div>');
          return;
        }
        chk = !s.done && o.chk && o.chk(it);
        h = '<div class="stg">' + st.map(function (x, k) { return '<span class="' + (x.done ? (x.first ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div>';
        h += '<p class="ask"><b>' + o.ask(it) + '</b></p>' + o.fig(it, s) + (o.ctl ? o.ctl(it, s) : '') + s.msg;
        // h += '<div class="end-actions"><button type="button" class="btn" data-p="1" data-scroll=".stg" data-scroll-offset="-40"' + (i ? '' : ' disabled') + '>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (chk ? '' : ' data-scroll=".stg" data-scroll-offset="-40"') + (s.done || (chk && o.ready(it)) ? '' : ' disabled') + '>' + (chk ? 'بررسی' : i === n - 1 ? 'مشاهدهٔ نتیجه' : 'سؤال بعدی') + '</button></div>';
        h += '<div class="end-actions"><button type="button" class="btn" data-p="1" data-scroll=".stg" data-scroll-offset="20"' + (i ? '' : ' disabled') + '>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (chk ? '' : ' data-scroll=".stg" data-scroll-offset="20"') + (s.done || (chk && o.ready(it)) ? '' : ' disabled') + '>' + (chk ? 'بررسی' : i === n - 1 ? 'مشاهدهٔ نتیجه' : 'سؤال بعدی') + '</button></div>';
        host.innerHTML = rr(h);
      }
      function settle(r, s) {
        if (r === true) { s.done = true; s.first = s.wr === 0; s.msg = fb(true, 'درست است! ✓'); }
        else if (r === 1) { s.msg = ''; }
        else if (r) { s.wr++; if (o.once) { s.done = true; s.first = false; } s.msg = fb(false, r); }
        else { return; }
        paint();
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'), s = st && st[i];
        if (b) {
          if (b.disabled) { return; }
          if (b.dataset.r) { newGame(); return; }
          if (b.dataset.pv) { i = 0; paint(); return; }
          if (b.dataset.p) { i--; paint(); return; }
          if (b.dataset.nx) { if (!s.done && o.chk && o.chk(items[i])) { settle(o.check(items[i]), s); } else { i++; paint(); } return; }
        }
        if (i >= items.length || s.done) { return; }
        settle(o.act(e, items[i], s), s);
      });
      newGame();
    }
    var WH = function (x, y) { var q = C.quad(x, y); return q ? RE(q) : x === 0 && y === 0 ? 'مبدأ مختصات' : 'محور ' + M(y === 0 ? 'x' : 'y'); };
    var PL = function (x, y) { return C.quad(x, y) || (x === 0 && y === 0) ? WH(x, y) : 'روی ' + WH(x, y); };

    /* ============ ۲) نام را بشنو، جایش را لمس کن ============ */
    K.nameIt = function (host) {
      function cls(x, y) { return x === 0 && y === 0 ? 'o' : y === 0 ? 'x' : x === 0 ? 'y' : 'q' + C.quad(x, y); }
      hunt(host, {
        make: function () { return shuffle([{ t: 'x', p: pick(['محور افقی', 'محور ' + M('x')]) }, { t: 'y', p: pick(['محور عمودی', 'محور ' + M('y')]) }, { t: 'o', p: 'مبدأ مختصات' }, { t: 'q1', p: RE(1) }, { t: 'q2', p: RE(2) }, { t: 'q3', p: RE(3) }, { t: 'q4', p: RE(4) }]); },
        ask: function (it) { return 'روی «' + it.p + '» بزن:'; },
        fig: function (it, s) { return C.plane(s.done ? { part: it.t } : { pick: true, part: s.wr >= 2 ? it.t : '' }); },
        act: function (e, it) {
          var t = C.hit(e); if (!t) { return null; }
          return cls(t.x, t.y) === it.t ? true : 'آنجا «' + WH(t.x, t.y) + '» است' + (t.x === 0 && t.y === 0 ? '؛ مبدأ روی هر دو محور است. نقطه‌ای دیگر روی محور بزن.' : '. دوباره امتحان کن.');
        }
      });
    };

    /* ============ ۳) کاوشگر ناحیه‌ها ============ */
    K.explore = function (host) {
      C.probe(host, { plane: { qn: true }, hint: 'هر جای صفحه را لمس کن تا بدانی آنجا چه ناحیه‌ای است.', extra: function (x, y) { var q = C.quad(x, y); return q ? { shade: (function () { var o = {}; o[q] = QF[q]; return o; })() } : {}; } },
        function (x, y) {
          var q = C.quad(x, y);
          return q ? C.pill(RE(q), q) + ' · علامت‌ها ' + stSigns(q) + '<br>نقطه ' + C.pt(x, y) + ' ' + (x < 0 ? 'سمت چپ' : 'سمت راست') + ' محور ' + M('y') + ' و ' + (y < 0 ? 'پایین' : 'بالای') + ' محور ' + M('x') + ' است.'
            : C.pill(PL(x, y), 0) + '<br>نقطه ' + C.pt(x, y) + ' روی یکی از محورهاست، پس در هیچ ناحیه‌ای نیست.';
        });
    };

    /* ============ ۴) علامت ← ناحیه ============ */
    K.signGame = function (host) {
      var tgl = function (it, k, dis) { return '<span class="cd-tg">' + [1, -1].map(function (v) { return '<button type="button" data-g="' + k + '" data-v="' + v + '" class="' + (it.tg[k] === v ? 'on' : '') + '"' + (dis ? ' disabled' : '') + '>' + (v > 0 ? '+' : '\u2212') + '</button>'; }).join('') + '</span>'; };
      hunt(host, {
        once: true,
        make: function () {
          var ms = shuffle(['A', 'A', 'A', 'B', 'B', 'B']), qs = shuffle([1, 2, 3, 4, pick([1, 2, 3, 4]), pick([1, 2, 3, 4])]);
          return ms.map(function (m, k) { return { m: m, q: qs[k], tg: { x: 0, y: 0 }, pt: m === 'B' ? C.rp(4, { q: qs[k] }) : null }; });
        },
        ask: function (it) {
          return it.m === 'A' ? 'علامت‌های یک نقطه ' + stSigns(it.q) + ' است (علامت مؤلفهٔ ' + M('x') + '، سپس ' + M('y') + '). یک نقطه در ناحیه‌ای که این نقطه در آن است روی صفحه بزن:'
            : 'نقطهٔ ' + M('P') + ' را ببین. علامت مؤلفهٔ ' + M('x') + ' و مؤلفهٔ ' + M('y') + ' آن را انتخاب کن:';
        },
        fig: function (it, s) {
          if (it.m === 'B') { return C.plane({ pts: [{ x: it.pt[0], y: it.pt[1], l: 'P', c: C.PINK, r: 7 }] }); }
          if (s.done) { var sh = {}; sh[it.q] = QF[it.q]; return C.plane({ qn: true, shade: sh }); }
          return C.plane({ pick: true, qn: true });
        },
        ctl: function (it, s) {
          if (it.m !== 'B') { return ''; }
          if (s.done) { it.tg = { x: it.pt[0] > 0 ? 1 : -1, y: it.pt[1] > 0 ? 1 : -1 }; }
          return '<div class="cd-sgrow">' + tgl(it, 'x', s.done) + '<span>' + M('x') + '</span></div><div class="cd-sgrow">' + tgl(it, 'y', s.done) + '<span>' + M('y') + '</span></div>';
        },
        chk: function (it) { return it.m === 'B'; },
        ready: function (it) { return !!(it.tg.x && it.tg.y); },
        check: function (it) {
          var sx = it.pt[0] > 0 ? 1 : -1, sy = it.pt[1] > 0 ? 1 : -1;
          if (it.tg.x === sx && it.tg.y === sy) { return true; }
          return (it.tg.x !== sx ? 'نقطه ' + (sx > 0 ? 'سمت راست' : 'سمت چپ') + ' محور ' + M('y') + ' است، پس ' + M('x') + ' ' + sgn(sx) + ' است. ' : '') + (it.tg.y !== sy ? 'نقطه ' + (sy > 0 ? 'بالای' : 'پایین') + ' محور ' + M('x') + ' است، پس ' + M('y') + ' ' + sgn(sy) + ' است.' : '');
        },
        act: function (e, it) {
          var b = e.target.closest('button'), t, q;
          if (it.m === 'A') {
            t = C.hit(e); if (!t) { return null; }
            q = C.quad(t.x, t.y); if (q === it.q) { return true; }
            return (q ? RE(q) + ' علامت‌هایش ' + stSigns(q) + ' است.' : 'آن نقطه روی محور است و در هیچ ناحیه‌ای نیست.') + ' جای درست: ' + RE(it.q) + ' (روی شکل پررنگ شده).';
          }
          if (b && b.dataset.g) { it.tg[b.dataset.g] = +b.dataset.v; return 1; }
          return null;
        }
      });
    };

    /* ============ ۵) پهپاد: نقشهٔ کشف ============ */
    K.drone = function (host) {
      var x = 2, y = 1, seen = {}, KEYS = [['q1', RE(1), 1], ['q2', RE(2), 2], ['q3', RE(3), 3], ['q4', RE(4), 4], ['ax', 'روی محور ' + M('x'), 0], ['ay', 'روی محور ' + M('y'), 0], ['o', 'مبدأ', 0]];
      var TK = '<div class="graduated-ticks" aria-hidden="true">' + [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map(function (k) { return '<span style="--gr-step:' + (k + 5) + ';--gr-total:10"><i></i>' + M(String(k)) + '</span>'; }).join('') + '</div>';
      var sl = function (id, v, nm) { return '<div class="cd-sl"><b>' + M(nm) + '</b><div class="cd-sw graduated-range"><input type="range" id="' + id + '" min="-5" max="5" step="1" value="' + v + '" aria-label="مقدار ' + nm + '">' + TK + '</div></div>'; };
      host.innerHTML = rr('<div id="dpl"></div>' + sl('dx', 2, 'x') + sl('dy', 1, 'y') + '<div class="cd-info" id="din"></div><div id="dbd" class="cd-map"></div><div id="dok"></div>');
      var pl = host.querySelector('#dpl'), din = host.querySelector('#din'), dbd = host.querySelector('#dbd'), dok = host.querySelector('#dok');
      function key() { return x === 0 && y === 0 ? 'o' : y === 0 ? 'ax' : x === 0 ? 'ay' : 'q' + C.quad(x, y); }
      function draw() {
        var q = C.quad(x, y), sh = {}, n = 0; if (q) { sh[q] = QF[q]; }
        pl.innerHTML = C.plane({ x0: -5, x1: 5, y0: -5, y1: 5, shade: sh, pts: [{ x: x, y: y, c: C.PINK, r: 8, l: '', pair: true, dy: y >= 5 ? 26 : -12 }] });
        seen[key()] = 1;
        din.innerHTML = rr('پهپاد در ' + C.pt(x, y) + ' است: ' + C.pill(PL(x, y), q));
        dbd.innerHTML = rr(KEYS.map(function (k) { var on = seen[k[0]]; if (on) { n++; } return '<span class="cd-pill q' + k[2] + (on ? '' : ' off') + '">' + (on ? '✓ ' : '') + k[1] + '</span>'; }).join(''));
        dok.innerHTML = n === KEYS.length ? rr(fb(true, 'همهٔ هفت جای ممکن را کشف کردی! 🎉') + '<div class="end-actions cd-center"><button type="button" class="btn primary" data-rs="1" data-scroll data-scroll-offset="10">بازنشانی نقشه</button></div>') : '';
      }
      host.addEventListener('input', function (e) { if (e.target.id === 'dx') { x = +e.target.value; draw(); } else if (e.target.id === 'dy') { y = +e.target.value; draw(); } });
      host.addEventListener('click', function (e) {
        if (!e.target.closest('[data-rs]')) { return; }
        seen = {}; x = 2; y = 1; host.querySelector('#dx').value = 2; host.querySelector('#dy').value = 1; draw();
      });
      draw();
    };

    /* ============ ۶) آینه: (a, b) و (b, a) ============ */
    K.mirror = function (host) {
      var sa = 1, sb = -1, seen = {}, rowsT = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
      var grp = function (k, txt, cur) { return '<div class="cd-mg"><span class="cd-sgl">' + M(txt) + '</span><span class="cd-tg fa"><button type="button" data-k="' + k + '" data-v="1" class="' + (cur === 1 ? 'on' : '') + '">مثبت</button><button type="button" data-k="' + k + '" data-v="-1" class="' + (cur === -1 ? 'on' : '') + '">منفی</button></span></div>'; };
      var line = function (nm, tex, reg) { return '<div class="cd-cr">' + C.pill(nm, reg) + '<span class="cd-cm">' + tex + '</span><b>' + RE(reg) + '</b></div>'; };
      host.innerHTML = rr('<div class="cd-mir"><div class="cd-mp" id="mpl"></div><div class="cd-mr"><div class="cd-mc" id="mcl"></div><div class="cd-cmp" id="min"></div><p class="cd-cap">جدول کشف‌ها: بالا علامت‌های ' + M('(a,b)') + '، پایین شمارهٔ ناحیهٔ ' + M('P') + ' ← ناحیهٔ ' + M('Q') + '</p><div class="cd-chips" id="mtb"></div><div class="end-actions cd-center"><button type="button" class="btn primary" data-rs="1">بازنشانی جدول</button></div></div></div>');
      var pl = host.querySelector('#mpl'), cl = host.querySelector('#mcl'), info = host.querySelector('#min'), tb = host.querySelector('#mtb');
      function draw() {
        var a = 3 * sa, b = 2 * sb, p = C.quad(a, b), q = C.quad(b, a), sh = {}; sh[q] = QF[q]; sh[p] = QF[p];
        seen[sa + ',' + sb] = 1;
        cl.innerHTML = rr(grp('a', 'a=' + a, sa) + grp('b', 'b=' + b, sb));
        pl.innerHTML = C.plane({ x0: -4, x1: 4, y0: -3, y1: 3, shade: sh, seg: [{ a: [a, b], b: [b, a], c: '#8a96ab', dash: true, w: 1.8 }], pts: [{ x: a, y: b, c: C.TEAL, r: 7, l: 'P', pair: true, dy: b >= 3 ? 24 : -11 }, { x: b, y: a, c: C.PINK, r: 7, l: 'Q', pair: true, dy: a >= 3 ? 24 : -11 }] });
        info.innerHTML = rr(line('P', C.pt('a', 'b') + ' = ' + C.pt(a, b), p) + line('Q', C.pt('b', 'a') + ' = ' + C.pt(b, a), q) + '<div class="cd-cs">' + (p === q ? 'ناحیه همان ماند.' : 'ناحیه عوض شد!') + '</div>');
        tb.innerHTML = rr(rowsT.map(function (r) { var on = seen[r[0] + ',' + r[1]], cur = r[0] === sa && r[1] === sb; return '<div class="cd-chip' + (cur ? ' cur' : '') + '"><span>' + C.signs(r[0], r[1]) + '</span><b>' + (on ? fa(C.quad(3 * r[0], 2 * r[1])) + '<i>←</i>' + fa(C.quad(2 * r[1], 3 * r[0])) : '؟') + '</b></div>'; }).join(''));
      }
      host.addEventListener('click', function (e) { var b = e.target.closest('button[data-k]'); if (e.target.closest('[data-rs]')) { sa = 1; sb = -1; seen = {}; draw(); return; } if (!b) { return; } if (b.dataset.k === 'a') { sa = +b.dataset.v; } else { sb = +b.dataset.v; } draw(); });
      draw();
    };

    /* ============ آزمون پایانی ============ */
    K.finalC01 = function (host) {
      var o = function (h, ok, m) { return { h: h, ok: ok, m: m }; };
      var regs = function (k) { return [1, 2, 3, 4].map(function (j) { return o(RE(j), j === k, RE(j) + ' علامت‌هایش ' + stSigns(j) + ' است.'); }); };
      var swapQ = { 1: 1, 2: 4, 3: 3, 4: 2 };
      function qSign() {
        var k = pick([1, 2, 3, 4]), s = SIGN[k];
        return { kind: 'mcq', keep: true, ask: 'نقطه‌ای مؤلفهٔ ' + M('x') + ' ' + sgn(s[0]) + ' و مؤلفهٔ ' + M('y') + ' ' + sgn(s[1]) + ' دارد. این نقطه در کدام ناحیه است؟', opts: regs(k), expl: '<p>علامت‌ها ' + stSigns(k) + ' یعنی ' + (s[0] > 0 ? 'سمت راست' : 'سمت چپ') + ' و ' + (s[1] > 0 ? 'بالا' : 'پایین') + ' مبدأ؛ این ' + RE(k) + ' است.</p>' };
      }
      function qRegion() {
        var k = pick([1, 2, 3, 4]), s = SIGN[k];
        var ops = [1, 2, 3, 4].map(function (j) { return o(M('x') + ' ' + sgn(SIGN[j][0]) + ' و ' + M('y') + ' ' + sgn(SIGN[j][1]), j === k, 'علامت‌های ' + RE(j) + ' این است، نه ' + RE(k) + '.'); });
        return { kind: 'mcq', keep: true, ask: 'نقطه‌ای در ' + RE(k) + ' قرار دارد. علامت مؤلفه‌های آن چیست؟', opts: ops, expl: '<p>' + RE(k) + ' ' + (s[0] > 0 ? 'سمت راست' : 'سمت چپ') + ' محور ' + M('y') + ' و ' + (s[1] > 0 ? 'بالای' : 'پایین') + ' محور ' + M('x') + ' است؛ پس ' + M('x') + ' ' + sgn(s[0]) + ' و ' + M('y') + ' ' + sgn(s[1]) + '.</p>' };
      }
      function qFigure() {
        var k = pick([1, 2, 3, 4]), L = ['الف', 'ب', 'ج', 'د'], ord = shuffle([1, 2, 3, 4]), pts = ord.map(function (q, j) { var p = C.rp(4, { q: q }); return { x: p[0], y: p[1], l: L[j], c: C.PINK, q: q }; });
        var ops = pts.map(function (p) { return o('نقطهٔ ' + p.l, p.q === k, 'نقطهٔ ' + p.l + ' در ' + RE(p.q) + ' است.'); });
        return { kind: 'mcq', keep: true, ask: 'کدام نقطه در ' + RE(k) + ' است؟', fig: C.plane({ pts: pts }), opts: ops, expl: '<p>' + RE(k) + ' یعنی علامت‌ها ' + stSigns(k) + '؛ نقطه‌ای را پیدا کن که در همان طرفِ دو محور باشد.</p>' };
      }
      function qSwap() {
        var k = pick([1, 2, 3, 4]), a = R(1, 5) * SIGN[k][0], b = R(1, 5) * SIGN[k][1], t = swapQ[k];
        return { kind: 'mcq', keep: true, ask: 'نقطهٔ ' + C.pt(a, b) + ' در ' + RE(k) + ' است. نقطهٔ ' + C.pt(b, a) + ' در کدام ناحیه است؟', opts: [1, 2, 3, 4].map(function (j) { return o(RE(j), j === t, j === k ? 'با جابه‌جا شدن مؤلفه‌ها علامت‌ها هم جابه‌جا می‌شوند؛ دوباره بررسی کن.' : 'علامت‌های ' + C.pt(b, a) + ' را بنویس: ' + stSigns(t) + '.'); }), expl: '<p>در ' + C.pt(b, a) + ' مؤلفهٔ اول ' + sgn(b) + ' و مؤلفهٔ دوم ' + sgn(a) + ' است؛ علامت‌ها ' + stSigns(t) + ' و این ' + RE(t) + ' است.</p>' };
      }
      function qName() {
        var v = pick([0, 1, 2]), d = [
          ['محور افقی چه نام دیگری دارد؟', [['محور ' + M('x'), 1], ['محور ' + M('y'), 0], ['مبدأ مختصات', 0], [RE(1), 0]], 'محور افقی همان محور ' + M('x') + ' است.'],
          ['نقطه‌ای که دو محور همدیگر را قطع می‌کنند چه نام دارد؟', [['مبدأ مختصات', 1], ['محور ' + M('x'), 0], ['محور ' + M('y'), 0], [RE(2), 0]], 'برخورد دو محور «مبدأ مختصات» نام دارد.'],
          ['محور عمودی کدام است؟', [['محور ' + M('y'), 1], ['محور ' + M('x'), 0], ['مبدأ مختصات', 0], [RE(4), 0]], 'محور عمودی همان محور ' + M('y') + ' است.']][v];
        return { kind: 'mcq', ask: d[0], opts: d[1].map(function (r) { return o(r[0], !!r[1], 'این نام برای چیز دیگری است.'); }), expl: '<p>' + d[2] + '</p>' };
      }
      function qAxis() {
        var p = pick([[R(1, 5) * pick([-1, 1]), 0], [0, R(1, 4) * pick([-1, 1])]]), onX = p[1] === 0;
        return { kind: 'mcq', ask: 'نقطهٔ ' + C.pt(p[0], p[1]) + ' در کدام ناحیه است؟', opts: [o(RE(p[0] > 0 ? 1 : 2), false, 'این نقطه روی محور است و در هیچ ناحیه‌ای نیست.'), o(RE(p[1] > 0 ? 1 : 4), false, 'این نقطه روی محور است و در هیچ ناحیه‌ای نیست.'), o('روی محور ' + M(onX ? 'x' : 'y') + '، در هیچ ناحیه‌ای نیست', true), o('روی محور ' + M(onX ? 'y' : 'x') + '، در هیچ ناحیه‌ای نیست', false, 'مؤلفهٔ ' + (onX ? 'دوم' : 'اول') + ' صفر است؛ این نقطه روی محور ' + M(onX ? 'x' : 'y') + ' است.')], expl: '<p>وقتی یک مؤلفه صفر باشد، نقطه روی یکی از محورهاست و محورها جزو هیچ ناحیه‌ای نیستند.</p>' };
      }
      function qPick() {
        var k = pick([1, 2, 3, 4]), sh = {}; sh[k] = QF[k];
        return { kind: 'pick', ask: 'یک نقطه در ' + RE(k) + ' روی صفحه مشخص کن.', plane: { qn: true }, test: function (x, y) { return C.quad(x, y) === k; }, bad: function (a) { return 'آن نقطه ' + C.where(a.x, a.y) + ' است؛ ' + RE(k) + ' علامت‌هایش ' + stSigns(k) + ' است.'; }, expl: '<p>هر نقطهٔ داخل ' + RE(k) + ' درست است: ' + (SIGN[k][0] > 0 ? 'سمت راست' : 'سمت چپ') + ' محور ' + M('y') + ' و ' + (SIGN[k][1] > 0 ? 'بالای' : 'پایین') + ' محور ' + M('x') + '.</p>' };
      }
      C.quiz(host, function () {
        return [qSign, qRegion, qFigure, qSwap, qName, qAxis, qPick].map(function (f) {
          var q, t = 0; do { q = f(); } while (q.opts && C.distinct(q.opts, function (x) { return x.h; }).length < q.opts.length && t++ < 40);
          if (q.opts && !q.keep) { q.opts = shuffle(q.opts.slice()); }
          return q;
        });
      });
    };

    var TIP_XY = '<p>نام‌های «x» و «y» فقط قرارداد هستند، مثل شمارهٔ پلاک؛ همهٔ ریاضی‌دان‌ها دربارهٔ آن‌ها توافق کرده‌اند تا همه یک زبان صحبت کنند.</p><p>برای یادآوری: <b>x</b> افقی (روی زمین می‌خوابد) و <b>y</b> عمودی (به آسمان می‌رود) است.</p>';
    var TIP_CCW = '<p>این هم یک قرارداد است: شماره‌گذاری از بالا-راست شروع می‌شود و خلاف جهت عقربه‌های ساعت ادامه می‌یابد؛ مثل نقاله‌ای که زاویه‌ها را از محور x به سمت بالا می‌شمارد.</p><p>یادت باشد: ناحیهٔ اول (+، +) است و هر بار که یک ناحیه جلو می‌روی، یک علامت عوض می‌شود: اول ' + M('x') + '، بعد ' + M('y') + '، بعد دوباره ' + M('x') + '.</p>';
    var TIP_AX = '<p>ناحیه‌ها «داخل» صفحه‌اند و محورها «مرزِ» آن‌ها. نقطه‌ای مثل ' + M('(3,0)') + ' روی خط مرزی بین ناحیهٔ اول و چهارم است و به هیچ‌کدام تعلق ندارد.</p>';

    return {
      html: function () {
        H.tip('c1-xy', 'چرا اسم محورها x و y است؟', TIP_XY); H.tip('c1-ccw', 'چرا ناحیه‌ها خلاف ساعت شماره‌گذاری می‌شوند؟', TIP_CCW); H.tip('c1-ax', 'چرا نقطهٔ روی محور ناحیه ندارد؟', TIP_AX);
        var host = H.host;
        return fix([
          K.sn('۱', 'از محور عدد تا صفحهٔ مختصات'),
          '<p>در فصل اول عددها را روی یک خط نشان دادی. اما برای گفتنِ جای یک نقطه روی کاغذ، یک عدد کافی نیست: باید بگوییم «چقدر به راست یا چپ» و «چقدر بالا یا پایین». برای همین دو محور عدد را عمود بر هم می‌گذاریم. صفحه را قدم‌به‌قدم بساز:</p>', host('c1a'),

          K.sn('۲', 'نام‌های مهم'),
          K.tbl(['بخش', 'نام', 'نشانه'], [['خط افقی', 'محور ' + M('x') + ' ' + H.tip('c1-xy', 'چرا اسم محورها x و y است؟', TIP_XY), 'راست مثبت، چپ منفی'], ['خط عمودی', 'محور ' + M('y'), 'بالا مثبت، پایین منفی'], ['برخورد دو محور', 'مبدأ مختصات', M('(0,0)')], ['چهار بخش صفحه', 'ناحیه‌های اول تا چهارم', 'شمارهٔ ۱ تا ۴']]),
          '<p>حالا آزمایش کن: نام را می‌خوانیم و تو جایش را روی صفحه پیدا می‌کنی. اگر دو بار اشتباه کنی، بخشِ درست برایت پررنگ می‌شود.</p>', host('c1b'),

          K.sn('۳', 'چهار ناحیه و علامت‌هایشان'),
          '<p>هر نقطه با دو عدد پیدا می‌شود: اولی جای نقطه را از چپ به راست و دومی از پایین به بالا می‌گوید. پس علامت این دو عدد ناحیه را مشخص می‌کند. ناحیه‌ها از بالا-راست شروع می‌شوند و خلاف جهت عقربه‌های ساعت شماره می‌گیرند ' + H.tip('c1-ccw', 'چرا ناحیه‌ها خلاف ساعت شماره‌گذاری می‌شوند؟', TIP_CCW) + ':</p>',
          C.plane({ shade: QF, qn: true, ccw: true }),
          K.tbl(['ناحیه', M('x'), M('y'), 'جای نقطه'], [['اول', 'مثبت', 'مثبت', 'بالا-راست'], ['دوم', 'منفی', 'مثبت', 'بالا-چپ'], ['سوم', 'منفی', 'منفی', 'پایین-چپ'], ['چهارم', 'مثبت', 'منفی', 'پایین-راست']]),
          '<h4>کاوشگر ناحیه‌ها</h4><p>روی هر جای صفحه بزن و ببین آنجا چه ناحیه‌ای و با چه علامت‌هایی است:</p>', host('c1c'),
          K.box('note', 'ترفند یادآوری', '<p>از ناحیهٔ اول شروع کن: <b>(+ ، +)</b>. در هر قدم خلاف ساعت، یک علامت عوض می‌شود: اول ' + M('x') + ' (می‌شود ' + M('-') + ')، بعد ' + M('y') + '، بعد دوباره ' + M('x') + '.</p>'),

          K.sn('۴', 'از علامت به ناحیه، از ناحیه به علامت'),
          '<p>هر دو مسیر را باید بلد باشی. در تمرین زیر شش سؤال هست: گاهی علامت‌ها را می‌دهیم و تو ناحیه را لمس می‌کنی، گاهی نقطه را نشان می‌دهیم و تو علامت‌ها را پیدا می‌کنی:</p>', host('c1d'),

          K.sn('۵', 'روی محورها چه می‌شود؟'),
          '<p>اگر یکی از دو عدد صفر باشد، نقطه از هیچ طرفِ محوری بیرون نمی‌زند و <b>روی خودِ محور</b> می‌افتد. محورها مرزِ ناحیه‌ها هستند و در هیچ ناحیه‌ای نیستند ' + H.tip('c1-ax', 'چرا نقطهٔ روی محور ناحیه ندارد؟', TIP_AX) + '.</p>',
          '<h4>پهپاد و نقشهٔ کشف</h4><p>پهپاد را با دو لغزنده ببر. هفت جای ممکن را (چهار ناحیه، دو محور و مبدأ) همه کشف کن:</p>', host('c1e'),
          K.box('err', '⚠ اشتباه رایج', '<p>نقطه‌ای مثل ' + M('(0,-3)') + ' را در «ناحیهٔ سوم یا چهارم» ندان. چون ' + M('x=0') + ' است، نقطه روی محور ' + M('y') + ' است و در هیچ ناحیه‌ای نیست.</p>'),

          K.sn('۶', 'اگر جای دو مؤلفه عوض شود'),
          '<p>' + M('(a,b)') + ' و ' + M('(b,a)') + ' دو نقطهٔ متفاوت‌اند. حالا ببین جابه‌جا کردنِ مؤلفه‌ها ناحیه را چطور عوض می‌کند. علامت ' + M('a') + ' و ' + M('b') + ' را بچرخان و جدول کشف‌ها را کامل کن:</p>', host('c1f'),
          K.box('note', 'نتیجه', '<p>اگر ' + M('a') + ' و ' + M('b') + ' هم‌علامت باشند، ' + M('(a,b)') + ' و ' + M('(b,a)') + ' در یک ناحیه‌اند (اول یا سوم). اگر مخالف‌علامت باشند، ناحیه‌های دوم و چهارم جایشان را عوض می‌کنند.</p>'),

          K.sn('۷', 'آزمون پایانی'),
          '<p>هفت سؤال با نقطه‌ها و عددهای تصادفی. هر بار که از اول شروع کنی، سؤال‌ها عوض می‌شوند.</p>', host('c1g'),
          K.box('sum', 'جمع‌بندی', T`<ul><li>دو محور عمود بر هم، صفحهٔ مختصات را می‌سازند: محور افقی $x$ و محور عمودی $y$.</li><li>نقطهٔ برخورد دو محور مبدأ مختصات $(0,0)$ است.</li><li>صفحه چهار ناحیه دارد که از بالا-راست، خلاف ساعت شماره‌گذاری می‌شوند: اول $(+,+)$، دوم $(-,+)$، سوم $(-,-)$، چهارم $(+,-)$.</li><li>نقطه‌ای که یک مؤلفه‌اش صفر باشد روی محور است و در هیچ ناحیه‌ای نیست.</li><li>جابه‌جا شدن مؤلفه‌ها می‌تواند ناحیه را عوض کند: $(a,b)$ در ناحیهٔ چهارم، $(b,a)$ را در ناحیهٔ دوم می‌برد.</li></ul><p>در درس بعد یاد می‌گیری هر نقطه را با «زوج مرتب» بنویسی و بخوانی.</p>`)
        ].join(''));
      },
      init: function (panel) {
        K.build(panel.querySelector('#c1a')); K.nameIt(panel.querySelector('#c1b')); K.explore(panel.querySelector('#c1c')); K.signGame(panel.querySelector('#c1d'));
        K.drone(panel.querySelector('#c1e')); K.mirror(panel.querySelector('#c1f')); K.finalC01(panel.querySelector('#c1g'));
      }
    };
  }
};
