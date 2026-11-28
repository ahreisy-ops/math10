/* درس مهارت G02 — اجزای مثلث و تشخیص مثلث قائم‌الزاویه (فصل ۵) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.G02 = {
  needs: ['utils', 'exsteps', 'kit', 'tri'],
  setup: function (K0) {
    var ML = window.MathLite, fa = ML.fa, rr = ML.renderRich, abs = Math.abs, df = K0.df;
    var _u = K0._u, R = _u.R, M = _u.M, shuffle = _u.shuffle;
    var K = Object.create(K0);   // K0 = هستهٔ مشترک؛ K = همان + ابزارهای اختصاصی این درس
    var H = K0.lk(K);
    var T = String.raw;
    var INK = '#14213d', TEAL = '#0e8f7e', PINK = '#d6457a', BLUE = '#4c5fd5', AMB = '#e08a00', YEL = '#ffc233', MINT = '#7fd0c3', RED = '#c62f2f', GREY = '#5a6a85';
    var D2R = Math.PI / 180;
    var pick = function (a) { return a[R(0, a.length - 1)]; };
    var f2 = function (n) { return Math.round(n * 100) / 100; };
    var nf = function (v) { var s = String(+(+v).toFixed(2)); return s === '-0' ? '0' : s; };
    var dg = function (n) { return '<bdi style="direction:ltr;unicode-bidi:isolate">' + fa(n) + '°</bdi>'; };
    function uniqBy(arr, key) { var s = {}; return arr.filter(function (x) { var k = key(x); if (s[k]) { return false; } s[k] = 1; return true; }); }
    var refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };
    var fig1 = function (inner, cap) { return '<div class="figs one"><figure>' + inner + (cap ? '<figcaption>' + cap + '</figcaption>' : '') + '</figure></div>'; };

    /* ---------- ابزارهای SVG ---------- */
    var T3 = K0.tri({ fmin: 12, defaults: { hov: 1 } }), sv = T3.sv, stx = T3.stx, sln = T3.sln, unit = T3.unit, rmark = T3.rmark, arcP = T3.arcP, triSVG = T3.triSVG, rotPts = T3.rotPts, triFromAng = T3.triFromAng;  /* ابزارهای مشترک رسم مثلث: js/shared/trikit.js */
    function dist(a, b) { return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])); }
    /* زاویه: o={deg, rot, l1, l2, lab, W, H, mark(قائمه), fill} — شکل با مختصات ریاضی ساخته و در کادر وسط‌چین می‌شود */
    /* نقاله: o={deg, base:'R'|'L', hi(true: مقیاس درست پررنگ)} — مقیاس بیرونی صفرش سمت راست، مقیاس درونی صفرش سمت چپ */
    /* مثلث قائم‌الزاویه با ضلع‌های قائم a و b؛ رأس قائمه روی اندیس r و چرخش دلخواه (هر سه رأس به ترتیب ساعت‌گرد یا پادساعت‌گرد) */
    function rightPts(a, b, r, rot) {
      var base = [[0, 0], [a, 0], [0, b]], pts = [], i;   // رأس 0 قائمه
      for (i = 0; i < 3; i++) { pts[(r + i) % 3] = base[i]; }
      return rotPts(pts, rot || 0);
    }
    /* نوار لغزندهٔ بومی با درجه‌بندیِ KaTeX (الگوی فصل اول) — ticks: [{v, t}] */
    function gslider(id, min, max, val, step, ticks, label) {
      var tot = max - min, h = '<div class="g-sl graduated-range" style="--gr-total:' + tot + '">' + (label ? '<div class="lab"><span>' + label + '</span></div>' : '') + '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '" aria-label="' + (label || id) + '"><div class="graduated-ticks">';
      ticks.forEach(function (t) { h += '<span style="--gr-step:' + (t.v - min) + '"><i></i>' + (t.t === undefined ? M(String(t.v)) : t.t) + '</span>'; });
      return h + '</div></div>';
    }

    /* مثلث با زاویه‌های a در رأس 0 و b در رأس 1 (مختصات ریاضی) */
    /* مثلث با ضلع‌های AB=a ، BC=b ، CA=c (مختصات ریاضی) */

    /* ---------- مثال‌های حل‌شده (مثل G01؛ هر گام = یک مثال کامل) ---------- */
    var EX = [
      { title: 'مثال اول: ضلع روبه‌رو', q: 'در مثلث ' + M('KLM') + ' ، ضلع روبه‌رو به رأس ' + M('L') + ' کدام است؟ ضلعی که به ' + M('L') + ' نمی‌رسد:', lines: ['KM'], note: 'پس ضلع روبه‌رو به ' + M('L') + ' ، ضلع ' + M('KM') + ' است.' },
      { title: 'مثال دوم: وتر', q: 'زاویهٔ قائمه در رأس ' + M('P') + ' است. وتر ضلع روبه‌رو به ' + M('P') + ' ، یعنی:', lines: ['QR'], note: 'پس وتر ' + M('QR') + ' است.' },
      { title: 'مثال سوم: زاویهٔ سوم', q: 'دو زاویهٔ ' + M('35^\\circ') + ' و ' + M('55^\\circ') + ' داریم:', lines: ['180-35-55=90^\\circ'], note: 'پس مثلث <b>قائم‌الزاویه</b> است.' }
    ];
    /* ---------- گزینه‌ساز مشترک ---------- */
    /* correct/wrongs: {t, m} — t: عبارت TeX (یا HTML وقتی raw=true) */
    function mkO(correct, wrongs, raw) {
      var list = uniqBy([{ t: correct.t, ok: 1, m: '' }].concat(wrongs.map(function (w) { return { t: w.t, ok: 0, m: w.m }; })), function (x) { return x.t; }), w = shuffle(list.slice(1)).slice(0, 3);
      return shuffle([list[0]].concat(w).map(function (z) { return { h: raw ? z.t : M(z.t), ok: !!z.ok, m: z.m || 'این گزینه درست نیست.' }; }));
    }
    /* گزینه‌های عددی: ans عدد درست؛ wrongs: [{v, m}]؛ suf پسوند TeX مثل ^\circ */
    function numO(ans, wrongs, suf) {
      suf = suf || ''; var seen = {}, w = [], offs = [2, -2, 3, -3, 1, -1, 5, -5, 10], i = 0, v, k;
      seen[nf(ans)] = 1;
      wrongs.forEach(function (x) { k = nf(x.v); if (x.v > 0 && !seen[k]) { seen[k] = 1; w.push(x); } });
      while (w.length < 3 && i < offs.length) { v = ans + offs[i++]; k = nf(v); if (v > 0 && !seen[k]) { seen[k] = 1; w.push({ v: v, m: 'این عدد درست نیست؛ یک بار دیگر محاسبه کن.' }); } }
      return mkO({ t: nf(ans) + suf }, w.map(function (x) { return { t: nf(x.v) + suf, m: x.m }; }));
    }

    var NAMES = [['A', 'B', 'C'], ['K', 'L', 'M'], ['P', 'Q', 'R'], ['D', 'E', 'F'], ['X', 'Y', 'Z']];
    var sideNm = function (nm, i) { return nm[i] + nm[(i + 1) % 3]; };
    var oppIdx = function (v) { return (v + 1) % 3; };       // ضلعِ روبه‌رو به رأس v
    function randTri() { var rot = R(0, 359); return rotPts([[0, 0], [R(70, 105), 0], [R(15, 85), R(48, 90)]], rot); }
    function randRight() { var t = pick([[3, 4], [4, 3], [5, 3], [3, 5], [6, 4], [4, 6]]), k = R(18, 24); return { a: t[0] * k / 3, b: t[1] * k / 3, r: R(0, 2), rot: R(0, 359) }; }

    /* ---------- آزمایشگاه ۱: رأس و ضلعِ روبه‌رو ---------- */
    K.vertLab = function (host) {
      var v = 0, nm = ['A', 'B', 'C'], P = rotPts([[0, 0], [100, 0], [34, 72]], 0);
      host.innerHTML = rr('<p class="ask">یک رأس را انتخاب کن تا ضلعِ روبه‌رویش را ببینی:</p><div class="chips" id="vch"></div><div id="vfg"></div><p class="legend" id="vlg"></p>');
      function paint() {
        host.querySelector('#vch').innerHTML = nm.map(function (x, i) { return '<button type="button" class="chip' + (i === v ? ' on' : '') + '" data-v="' + i + '">' + x + '</button>'; }).join('');
        host.querySelector('#vfg').innerHTML = triSVG({ pts: P, names: nm, hl: { side: oppIdx(v), c: TEAL }, arcs: false, sl: [0, 1, 2].map(function (i) { return i === oppIdx(v) ? sideNm(nm, i) : ''; }), slc: TEAL });
        host.querySelector('#vlg').innerHTML = 'ضلعِ روبه‌رو به رأس <b>' + nm[v] + '</b> همان <b>' + sideNm(nm, oppIdx(v)) + '</b> است؛ دو سرِ آن دو رأس دیگرند و به رأس ' + nm[v] + ' نمی‌رسد.';
      }
      host.addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (!b) { return; } v = +b.dataset.v; paint(); });
      paint();
    };
    /* ---------- آزمایشگاه ۲: مثلثِ زنده (مجموع زاویه‌ها) ---------- */
    K.liveTri = function (host) {
      var A = [40, 168], B = [260, 168], C = [112, 60];
      host.innerHTML = rr('<p class="ask">روی رأس بالایی (C) بزن؛ بعد آن را بکش یا با کلیدهای جهت‌نما حرکت بده:</p><div id="ltf"></div><div class="gval" id="ltv"></div><p class="legend" id="ltl"></p><div class="opts g-ops"><button type="button" class="btn" data-sn="1">قائمه‌اش کن</button><button type="button" class="btn primary" data-nw="1" data-scroll>مثلث دیگر</button></div>');
      var box = host.querySelector('#ltf');
      function ang(P, Q, S) { var u = unit(P, Q), w = unit(P, S); return Math.acos(Math.max(-1, Math.min(1, u[0] * w[0] + u[1] * w[1]))) / D2R; }
      function paint() {
        apprx = 0.3;
        var a = Math.round(ang(A, B, C)), b = Math.round(ang(B, C, A)), c = 180 - a - b, cc = ang(C, A, B), isR = abs(cc - 90) < apprx || abs(ang(A, B, C) - 90) < apprx || abs(ang(B, C, A) - 90) < apprx, s = sv(300, 200), ctr = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
        s += '<polygon points="' + [A, B, C].map(function (p) { return p.join(','); }).join(' ') + '" fill="' + (isR ? '#d2f0e9' : '#eef4ff') + '" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/>';
        [[A, B, C, a, 'A'], [B, C, A, b, 'B'], [C, A, B, c, 'C']].forEach(function (z) {
          var P = z[0], Q = z[1], S = z[2], u = unit(P, ctr), isr = abs(ang(P, Q, S) - 90) < apprx;
          s += isr ? rmark(P, Q, S, 13, INK) : arcP(P, Q, S, 18, PINK);
          s += stx(fa(z[3]) + '°', P[0] + u[0] * 40, P[1] + u[1] * 40, { fs: 12, b: 1, c: PINK }) + stx(z[4], P[0] - u[0] * 27, P[1] - u[1] * 27, { fs: 14, b: 1 });
        });
        s += '<circle id="ltc" cx="' + C[0] + '" cy="' + C[1] + '" r="13" fill="rgba(255,194,51,.55)" stroke="' + INK + '" stroke-width="2" tabindex="0" role="slider" aria-label="رأس C" style="cursor:grab;touch-action:none"/>';
        box.innerHTML = s + '</svg>';
        if (sel) { box.querySelector('#ltc').focus({ preventScroll: true }); }
        host.querySelector('#ltv').innerHTML = '<i>A: ' + dg(a) + '</i><i>B: ' + dg(b) + '</i><i>C: ' + dg(c) + '</i><i class="' + (isR ? 'g' : 'y') + '">مجموع: ' + dg(a + b + c) + '</i>';
        host.querySelector('#ltl').innerHTML = rr(isR ? 'یکی از زاویه‌ها ' + M('90^\\circ') + ' شد؛ مثلث <b>قائم‌الزاویه</b> است.' : 'هر جا ببری، مجموع سه زاویه ' + M('180^\\circ') + ' می‌ماند.');
      }
      function setC(x, y) {
        C = [Math.max(24, Math.min(276, x)), Math.max(30, Math.min(150, y))];
        var mx = (A[0] + B[0]) / 2, rad = dist(A, B) / 2;
        snap = 1.5;
        if (abs(C[0] - A[0]) < snap) {
          C[0] = A[0];
        }
        else if (abs(C[0] - B[0]) < snap) {
          C[0] = B[0];
        }
        else {
          var dd = dist(C, [mx, A[1]]); if (abs(dd - rad) < snap) {
            C = [mx + (C[0] - mx) * rad / dd, A[1] + (C[1] - A[1]) * rad / dd];
          }
        }
        var d = dist(C, A);

        if (d < 30 || dist(C, B) < 30) {
          return;
        }
        paint();
      }
      var drag = false;
      var sel = false;
      document.addEventListener('pointerdown', function (e) { if (e.target.id !== 'ltc') { sel = false; } });
      host.addEventListener('pointerdown', function (e) { if (e.target.id === 'ltc') { sel = true; drag = true; e.target.setPointerCapture && e.target.setPointerCapture(e.pointerId); e.preventDefault(); } });
      host.addEventListener('pointermove', function (e) { if (!drag) { return; } var r = box.querySelector('svg').getBoundingClientRect(), k = 300 / r.width; setC((e.clientX - r.left) * k, (e.clientY - r.top) * k); });
      host.addEventListener('pointerup', function () { drag = false; }); host.addEventListener('pointercancel', function () { drag = false; });
      host.addEventListener('keydown', function (e) { var d = { ArrowLeft: [-5, 0], ArrowRight: [5, 0], ArrowUp: [0, -5], ArrowDown: [0, 5] }[e.key]; if (d && e.target.id === 'ltc') { e.preventDefault(); setC(C[0] + d[0], C[1] + d[1]); box.querySelector('#ltc').focus(); } });
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) { return; }
        if (b.dataset.sn) { var M0 = [150, 168], u = unit(M0, C); if (u[1] > -0.2) { u = [u[0] < 0 ? -0.98 : 0.98, -0.2]; } C = [M0[0] + 110 * u[0], M0[1] + 110 * u[1]]; paint(); }
        else if (b.dataset.nw) { C = [R(60, 240), R(48, 110)]; paint(); }
      });
      paint();
    };
    /* ---------- آزمایشگاه ۳: وترشناس ---------- */
    K.hypLab = function (host) {
      var q, picked;
      function nw() { var t = randRight(); q = { P: rightPts(t.a, t.b, t.r, t.rot), r: t.r, nm: pick(NAMES) }; picked = null; }
      function paint() {
        var hy = oppIdx(q.r), col = [INK, INK, INK], ok = picked === hy, h = '<p class="ask">روی ضلعِ «وتر» بزن:</p>';
        if (picked !== null) { col[hy] = TEAL; if (!ok) { col[picked] = RED; } }
        h += triSVG({ pts: q.P, fill: '#f2d6bb', names: q.nm, right: q.r, col: col, hit: picked === null, hl: picked !== null ? { side: hy, c: TEAL } : null, sl: picked !== null ? [0, 1, 2].map(function (i) { return sideNm(q.nm, i); }) : null });
        if (picked !== null) {
          h += '<div class="fb ' + (ok ? 'ok' : 'bad') + '">' + (ok ? '✓ درست است!' : 'این ضلع وتر نیست.') + '</div><div class="ex"><p>وتر روبه‌روی زاویهٔ قائمه است؛ اینجا قائمه در رأس ' + q.nm[q.r] + ' است، پس وتر ' + M(sideNm(q.nm, hy)) + ' است. دو ضلع دیگر «ضلع قائم» نام دارند.</p></div>';
        }
        h += '<div class="opts g-ops"><button type="button" class="btn primary" data-nw="1" data-scroll>شکل دیگر</button></div>';
        host.innerHTML = rr(h);
      }
      host.addEventListener('click', function (e) { var l = e.target.closest('.hitline'), b = e.target.closest('button'); if (l && picked === null) { picked = +l.dataset.s; paint(); } else if (b && b.dataset.nw) { nw(); paint(); } });
      host.addEventListener('keydown', function (e) { var l = e.target.closest && e.target.closest('.hitline'); if (l && (e.key === 'Enter' || e.key === ' ') && picked === null) { e.preventDefault(); picked = +l.dataset.s; paint(); } });
      nw(); paint();
    };
    /* ---------- آزمایشگاه ۴: زاویهٔ سوم ---------- */
    K.thirdLab = function (host) {
      host.innerHTML = rr('<p class="ask">زاویه‌های A و B را با نوارها تنظیم کن؛ زاویهٔ C از ۱۸۰ کم می‌شود و خودکار نشان داده می‌شود:</p><div id="tkf"></div><div class="gval two" id="tkv"></div><p class="legend" id="tkl"></p>' + gslider('tka', 10, 85, 40, 5, [10, 25, 40, 55, 70, 85].map(function (v) { return { v: v }; }), 'زاویهٔ A') + gslider('tkb', 10, 85, 50, 5, [10, 25, 40, 55, 70, 85].map(function (v) { return { v: v }; }), 'زاویهٔ B'));
      var ia = host.querySelector('#tka'), ib = host.querySelector('#tkb');
      function paint() {
        var a = +ia.value, b = +ib.value, c = 180 - a - b, r = a === 90 || b === 90 || c === 90, ri = c === 90 ? 2 : -1;
        host.querySelector('#tkf').innerHTML = triSVG({ pts: triFromAng(a, b, 100), names: ['A', 'B', 'C'], al: [fa(a) + '°', fa(b) + '°', fa(c) + '°'], right: ri < 0 ? undefined : ri, arcs: ri < 0, fill: r ? '#d2f0e9' : '#eef4ff', W: 300, H: 200 });
        host.querySelector('#tkv').innerHTML = '<i><small>مجموع A و B</small><span>' + dg(a) + ' + ' + dg(b) + ' = ' + dg(a + b) + '</span></i><i class="' + (r ? 'g' : 'y') + '"><small>زاویهٔ C (۱۸۰ − مجموع)</small><span>' + dg(c) + '</span></i>';
        host.querySelector('#tkl').innerHTML = rr(r ? 'مجموع دو زاویه ' + M('90^\\circ') + ' است؛ پس زاویهٔ سوم ' + M('90^\\circ') + ' می‌شود و مثلث <b>قائم‌الزاویه</b> است (حتی اگر علامت قائمه نکشیده باشند).' : 'زاویهٔ سوم ' + M('180-' + (a + b) + '=' + c) + ' است؛ ' + M('90^\\circ') + ' نیست، پس قائم‌الزاویه نیست.');
      }
      ia.addEventListener('input', paint); ib.addEventListener('input', paint); paint();
    };

    /* ================= تولید سؤال ================= */
    function genB1() {
      var nm = pick(NAMES), P = randTri(), v = R(0, 2), a = nm[v], b = nm[(v + 1) % 3], c = nm[(v + 2) % 3];
      return {
        ask: 'در مثلث زیر، ضلع روبه‌رو به رأس ' + M(a) + ' کدام است؟', fig: '<div class="figs one"><figure>' + triSVG({ pts: P, names: nm }) + '</figure></div>', cq: '', cls: 'm2',
        opts: mkO({ t: M(b + c) }, [{ t: M(a + b), m: 'ضلع ' + a + b + ' به رأس ' + a + ' می‌رسد؛ پس کنار آن است، نه روبه‌رویش.' }, { t: M(a + c), m: 'ضلع ' + a + c + ' به رأس ' + a + ' می‌رسد؛ پس کنار آن است، نه روبه‌رویش.' }, { t: M(a + b) + ' و ' + M(a + c), m: 'این دو ضلع، ضلع‌های کنار رأس ' + a + ' هستند.' }], true),
        expl: function () { return '<p>ضلع روبه‌رو به رأس ' + M(a) + ' ضلعی است که به آن رأس نمی‌رسد؛ دو سرش دو رأس دیگر (' + M(b) + ' و ' + M(c) + ') است: ' + M(b + c) + '.</p>'; }
      };
    }
    function genB2() {
      var t = randRight(), nm = pick(NAMES), P = rightPts(t.a, t.b, t.r, t.rot), hy = oppIdx(t.r), s = [0, 1, 2].map(function (i) { return sideNm(nm, i); });
      var wr = [0, 1, 2].filter(function (i) { return i !== hy; }).map(function (i) { return { t: M(s[i]), m: 'این ضلع کنار زاویهٔ قائمه است (ضلع قائم)؛ وتر روبه‌روی زاویهٔ قائمه است.' }; });
      wr.push({ t: 'نمی‌توان تعیین کرد', m: 'می‌توان: علامت قائمه در رأس ' + nm[t.r] + ' است و وتر روبه‌روی آن قرار دارد.' });
      return {
        ask: 'در مثلث قائم‌الزاویهٔ زیر، وتر کدام است؟', fig: '<div class="figs one"><figure>' + triSVG({ pts: P, names: nm, right: t.r }) + '</figure></div>', cq: '', cls: 'm2',
        opts: mkO({ t: M(s[hy]) }, wr, true),
        expl: function () { return '<p>زاویهٔ قائمه در رأس ' + M(nm[t.r]) + ' است. وتر، ضلعِ روبه‌رو به آن است: ' + M(s[hy]) + '. وضع قرارگرفتن یا چرخش مثلث در این تشخیص اثری ندارد.</p>'; }
      };
    }
    function genB3() {
      var isR = R(0, 1), numv = R(0, 1), pr = pick([[40, 50], [35, 55], [30, 60], [25, 65], [20, 70], [45, 45]]), pn = pick([[40, 60], [50, 60], [30, 50], [35, 45], [40, 65], [55, 55], [25, 50]]), pp = (isR && !numv) ? pr : pn, a = pp[0], b = pp[1], c = 180 - a - b, nm = ['A', 'B', 'C'];
      var fig = '<div class="figs one"><figure>' + triSVG({ pts: triFromAng(a, b, 100), names: nm, al: [fa(a) + '°', fa(b) + '°', ''], arcs: true, W: 300, H: 200 }) + '</figure></div>';
      if (!numv) {
        var wr = isR ? [{ t: 'خیر؛ چون علامت زاویهٔ قائمه روی شکل نیست', m: 'نبودنِ علامت دلیل نمی‌شود؛ زاویهٔ سوم را حساب کن.' }, { t: 'خیر؛ چون هیچ‌کدام از این دو زاویه ' + fa(90) + ' نیست', m: 'ممکن است زاویهٔ سوم قائمه باشد؛ باید آن را حساب کنی.' }, { t: 'نمی‌توان تعیین کرد؛ زاویهٔ سوم معلوم نیست', m: 'معلوم است: مجموع زاویه‌های مثلث ۱۸۰ درجه است.' }] : [{ t: 'بله؛ چون مجموع دو زاویه از ۱۸۰ کمتر است', m: 'این برای هر مثلثی درست است و دلیلِ قائمه بودن نیست.' }, { t: 'بله؛ چون هر مثلثی یک زاویهٔ قائمه دارد', m: 'همهٔ مثلث‌ها قائمه ندارند.' }, { t: 'نمی‌توان تعیین کرد؛ زاویهٔ سوم معلوم نیست', m: 'معلوم است: مجموع زاویه‌های مثلث ۱۸۰ درجه است.' }];
        return {
          ask: 'در مثلث زیر، دو زاویهٔ ' + M(a + '^\\circ') + ' و ' + M(b + '^\\circ') + ' داده شده و زاویهٔ سوم نوشته نشده. آیا این مثلث قائم‌الزاویه است؟', fig: fig, cq: '', cls: 'm1',
          opts: mkO({ t: isR ? 'بله؛ چون زاویهٔ سوم ' + fa(90) + ' درجه می‌شود' : 'خیر؛ چون زاویهٔ سوم ' + fa(c) + ' درجه می‌شود، نه ' + fa(90) }, wr, true),
          expl: function () { return '<p>زاویهٔ سوم: ' + M('180-(' + a + '+' + b + ')=' + c) + '. ' + (isR ? 'این زاویه ' + M('90^\\circ') + ' است، پس مثلث قائم‌الزاویه است؛ علامتش را روی شکل نکشیده‌اند.' : 'این زاویه ' + M('90^\\circ') + ' نیست و دو زاویهٔ دیگر هم ' + M('90^\\circ') + ' نیستند؛ پس قائم‌الزاویه نیست.') + '</p>'; }
        };
      }
      return {
        ask: 'در مثلث زیر، دو زاویهٔ ' + M(a + '^\\circ') + ' و ' + M(b + '^\\circ') + ' داده شده‌اند. زاویهٔ سوم چند درجه است؟', fig: fig, cq: '', cls: 'm2',
        opts: numO(c, [{ v: a + b, m: 'این مجموع دو زاویه است؛ باید آن را از ۱۸۰ کم کنی.' }, { v: 360 - a - b, m: 'مجموع زاویه‌های مثلث ۱۸۰ است، نه ۳۶۰.' }, { v: 90, m: 'مثلث لزوماً قائم‌الزاویه نیست؛ زاویهٔ سوم را حساب کن.' }, { v: 90 - a, m: 'مجموع را ۱۸۰ بگیر، نه ۹۰.' }], '^\\circ'),
        expl: function () { return '<p>مجموع زاویه‌های هر مثلث ' + M('180^\\circ') + ' است:</p>' + K.dm('180-' + a + '-' + b + '=' + c); }
      };
    }
    var TFP = [
      { h: 'ضلع روبه‌رو به یک رأس، ضلعی است که به آن رأس نمی‌رسد.', ok: 1, e: '<p>دو سرِ ضلعِ روبه‌رو، دو رأس دیگرند.</p>' },
      { h: 'در مثلث ' + M('ABC') + ' ، ضلع ' + M('AB') + ' روبه‌روی رأس ' + M('A') + ' است.', ok: 0, e: '<p>ضلع ' + M('AB') + ' به رأس ' + M('A') + ' می‌رسد. ضلع روبه‌رو به ' + M('A') + ' ، ' + M('BC') + ' است.</p>' },
      { h: 'مجموع زاویه‌های هر مثلث ' + M('180^\\circ') + ' است.', ok: 1, e: '<p>مثلث تند یا باز یا قائم‌الزاویه، مجموع همیشه ' + M('180^\\circ') + ' است.</p>' },
      { h: 'وتر ضلعی است که روبه‌روی زاویهٔ قائمه قرار دارد.', ok: 1, e: '<p>وتر فقط در مثلث قائم‌الزاویه تعریف می‌شود و روبه‌روی زاویهٔ قائمه است.</p>' },
      { h: 'وتر همیشه ضلعی است که کنار زاویهٔ قائمه قرار دارد.', ok: 0, e: '<p>ضلع‌های کنار زاویهٔ قائمه، ضلع‌های قائم‌اند؛ وتر روبه‌روی آن است.</p>' },
      { h: 'مثلثی با زاویه‌های ' + M('40^\\circ') + ' و ' + M('50^\\circ') + ' قائم‌الزاویه است.', ok: 1, e: '<p>زاویهٔ سوم ' + M('180-40-50=90') + ' می‌شود.</p>' },
      { h: 'اگر روی شکل علامت زاویهٔ قائمه نباشد، مثلث قائم‌الزاویه نیست.', ok: 0, e: '<p>ممکن است زاویهٔ سوم از روی دو زاویهٔ دیگر ' + M('90^\\circ') + ' درآید و فقط علامتش را نکشیده باشند.</p>' },
      { h: 'یک مثلث می‌تواند دو زاویهٔ قائمه داشته باشد.', ok: 0, e: '<p>دو زاویهٔ قائمه با هم ' + M('180^\\circ') + ' می‌شوند و جایی برای زاویهٔ سوم نمی‌ماند.</p>' },
      { h: 'در مثلث قائم‌الزاویه، دو زاویهٔ دیگر تندند و مجموعشان ' + M('90^\\circ') + ' است.', ok: 1, e: '<p>' + M('180-90=90') + ' باید بین آن دو تقسیم شود.</p>' },
      { h: 'در مثلث قائم‌الزاویه، وتر بلندترین ضلع است.', ok: 1, e: '<p>وتر روبه‌روی بزرگ‌ترین زاویه (قائمه) است.</p>' },
      { h: 'اگر مثلثی را بچرخانیم، وتر آن عوض می‌شود.', ok: 0, e: '<p>چرخاندن، شکل را تغییر نمی‌دهد؛ وتر باز هم روبه‌روی زاویهٔ قائمه است.</p>' },
      { h: 'مثلثی با زاویه‌های ' + M('40^\\circ') + ' ، ' + M('60^\\circ') + ' و ' + M('70^\\circ') + ' وجود دارد.', ok: 0, e: '<p>مجموعشان ' + M('170^\\circ') + ' می‌شود، نه ' + M('180^\\circ') + '.</p>' }
    ];
    return {
      html: function () {
        var T0 = [[0, 0], [100, 0], [34, 72]];
        return [
          K.sn('۱', 'اجزای مثلث'),
          '<p>هر مثلث سه «رأس»، سه «ضلع» و سه «زاویه» دارد:</p><ol><li>رأس‌ها را با حرف بزرگ می‌نامیم؛</li><li>ضلع را با حرفِ دو رأسش؛ مثلاً ' + M('AB') + ' ضلعی است که از ' + M('A') + ' به ' + M('B') + ' می‌رود؛</li><li>زاویهٔ هر رأس را با نامِ همان رأس و یک کلاه روی آن نشان می‌دهیم؛ مثلاً ' + M('\\hat A') + ' یعنی «زاویهٔ رأس ' + M('A') + '».</li></ol>',
          fig1(triSVG({ pts: T0, names: ['A', 'B', 'C'], arcs: true, al: ['', '', ''] }), 'مثلث ' + 'ABC'),
          '<p>هر ضلع «روبه‌روی» یک رأس است: ضلعی که به آن رأس نمی‌رسد. یک رأس انتخاب کن و ضلع روبه‌رویش را ببین:</p><div class="cover g-act" id="ve" style="animation:none"></div>',
          K.box('err', '⚠ خطای رایج: ضلعِ کنار با ضلعِ روبه‌رو قاطی نشود', '<p>ضلع ' + M('AB') + ' و ' + M('AC') + ' به رأس ' + M('A') + ' می‌رسند و «کنار» آن‌اند. ضلع روبه‌روی ' + M('A') + ' فقط ' + M('BC') + ' است.</p>'),

          K.sn('۲', 'مجموع زاویه‌ها'),
          '<p>هر شکلی که برای مثلث بکشی، مجموع سه زاویه‌اش ' + M('180^\\circ') + ' است. رأس بالایی را جابه‌جا کن و خودت ببین:</p><div class="cover g-act" id="lv" style="animation:none"></div>',
          K.box('note', 'نتیجه', '<p>مجموع سه زاویهٔ هر مثلث برابر ' + M('180^\\circ') + ' است؛ یعنی ' + M('\\hat A+\\hat B+\\hat C=180^\\circ') + '.</p>'),

          K.sn('۳', 'مثلث قائم‌الزاویه'),
          '<p>مثلثی که یک زاویهٔ قائمه (' + M('90^\\circ') + ') دارد «قائم‌الزاویه» است. ضلع روبه‌روی زاویهٔ قائمه «وتر» نام دارد؛ دو ضلع دیگر «ضلع‌های قائم» اند.</p>',
          fig1(triSVG({ pts: rightPts(70, 50, 0, 0), names: ['B', 'C', 'A'], right: 0, sl: ['ضلع قائم', 'وتر', 'ضلع قائم'], so: [null, null, [-19, null]], hl: { side: 1, c: TEAL }, W: 300, H: 190 }), 'زاویهٔ قائمه در رأس B است؛ وتر روبه‌روی آن (CA).'),
          K.box('note', 'دو زاویهٔ دیگر', '<p>در مثلث قائم‌الزاویه، دو زاویهٔ دیگر تندند و جمعشان ' + M('90^\\circ') + ' است؛ چون ' + M('180-90=90') + '. وتر هم بلندترین ضلع است.</p>'),
          '<p>وتر را فقط از روی جای زاویهٔ قائمه تشخیص بده، نه از روی افقی یا کج بودن مثلث. چند شکل چرخیده را امتحان کن:</p><div class="cover g-act" id="hy" style="animation:none"></div>',

          K.sn('۴', 'آیا قائم‌الزاویه است؟'),
          '<p>سه راه برای قضاوت داری: علامت مربع کوچک روی شکل؛ داشتنِ یک زاویهٔ ' + M('90^\\circ') + '؛ یا اینکه مجموع دو زاویهٔ داده‌شده ' + M('90^\\circ') + ' شود (آن‌وقت زاویهٔ سوم ' + M('90^\\circ') + ' است). دو زاویه را تنظیم کن:</p><div class="cover g-act" id="tk" style="animation:none"></div>',
          K.box('err', '⚠ خطای رایج: «علامت قائمه ندارد، پس قائم‌الزاویه نیست»', '<p>اگر دو زاویه ' + M('40^\\circ') + ' و ' + M('50^\\circ') + ' باشند، زاویهٔ سوم ' + M('90^\\circ') + ' می‌شود؛ حتی اگر علامتش نکشیده شده باشد. همیشه زاویهٔ سوم را حساب کن.</p>'),

          K.sn('۵', 'مسئله‌های کامل'),
          K.exampleSteps.html('g02-ex', EX, 'حل کامل مثال‌ها'),

          K.sn('۶', 'کارت مرجع'),
          refs([{ c: 'r1', t: 'ضلع روبه‌رو', r: 'ضلعی که به آن رأس نمی‌رسد؛ مثلاً BC روبه‌روی A است.', e: 'BC' }, { c: 'r2', t: 'مجموع زاویه‌ها', r: 'در هر مثلث ۱۸۰ درجه.', e: '\\hat A+\\hat B+\\hat C=180^\\circ' }, { c: 'r3', t: 'وتر', r: 'ضلعِ روبه‌رو به زاویهٔ قائمه.', e: 'BC' }, { c: 'r4', t: 'زاویه‌های تند', r: 'در قائم‌الزاویه، دو زاویهٔ دیگر جمعشان ۹۰.', e: '\\hat B+\\hat C=90^\\circ' }, { c: 'r1', t: 'زاویهٔ سوم', r: 'از ۱۸۰ کم کن.', e: '180-a-b' }, { c: 'r3', t: 'قائم‌الزاویه؟', r: 'یا یک زاویه ۹۰، یا مجموع دو زاویه ۹۰.', e: 'a+b=90^\\circ' }]),

          K.sn('۷', 'مثلث‌شناس'),
          '<p>هر مرحله دو سؤال دارد. بعد از هر پاسخ، دلیلش را می‌بینی.</p><div class="cover g-act" id="ss" style="animation:none"></div>',
          K.sn('۸', 'درست یا نادرست؟'),
          '<p>شش جمله را بسنج. به تله‌ها دقت کن.</p><div class="cover g-act" id="tf" style="animation:none"></div>',
          K.sn('۹', 'تمرین پایانی'),
          '<p>پنج سؤال با شکل‌های تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover g-act" id="fn" style="animation:none"></div>',
          K.box('sum', 'بعد از این درس باید بتوانی', T`<ul><li>رأس، ضلع و زاویهٔ مثلث را بشناسی و ضلعِ روبه‌رو به یک رأس را پیدا کنی.</li><li>بدانی مجموع زاویه‌های هر مثلث $180^\circ$ است و زاویهٔ سوم را حساب کنی.</li><li>وتر و ضلع‌های قائم را، حتی در شکل چرخیده، تشخیص بدهی.</li><li>با حساب‌کردن زاویهٔ سوم بفهمی مثلث قائم‌الزاویه است یا نه، حتی وقتی علامت قائمه کشیده نشده.</li></ul>`)
        ].join('');
      },
      init: function (panel) {
        K.vertLab(panel.querySelector('#ve')); K.liveTri(panel.querySelector('#lv')); K.hypLab(panel.querySelector('#hy')); K.thirdLab(panel.querySelector('#tk'));
        var GB = [genB1, genB2, genB3];
        H.stages(panel.querySelector('#ss'), {
          names: ['ضلعِ روبه‌رو', 'وتر', 'زاویهٔ سوم'],
          make: function (si) { var q = GB[si](); return { ask: q.ask, fig: q.fig, cq: q.cq, cont: 'mc ' + (q.cls || 'm2'), opts: q.opts, expl: q.expl }; }
        });
        K.exampleSteps.bind('g02-ex', EX);
        H.tf(panel.querySelector('#tf'), TFP);
        H.final(panel.querySelector('#fn'), [genB1, genB2, genB2, genB3, genB3]);
      }
    };

  }
};
