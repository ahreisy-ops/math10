/* درس C03 — خواندن و تفسیر جدول و نمودار مختصاتی (فصل ۴)
   تمام تمرین‌ها تصادفی‌اند و پاسخ را با محاسبهٔ دقیق می‌سنجند. ابزار صفحهٔ مختصات: js/shared/coord.js */
window.LESSONS = window.LESSONS || {};
window.LESSONS.C03 = {
  needs: ['utils', 'inputs', 'kit', 'coord'],
  setup: function (K0) {
    var K = Object.create(K0), C = K0.cd(K), H = C.H;
    var fa = H.fa, R = H.R, shuffle = H.shuffle, fb = H.fb, T = H.T, M = H.M, rr = H.rr, fix = H.fix, pick = H.pick, abs = Math.abs;
    var sg = C.sg;
    /* زمینه‌های داده: xn نام ستون x، yn نام ستون y */
    var CTX = [
      { t: 'دمای هوا در شب', xn: 'ساعت', yn: 'دما', yu: 'دما (درجه)', lo: -3, hi: 4 },
      { t: 'صفحه‌هایی که علی خوانده است', xn: 'روز', yn: 'تعداد صفحه', yu: 'تعداد صفحه', lo: 0, hi: 6 },
      { t: 'رشد یک نهال', xn: 'هفته', yn: 'ارتفاع', yu: 'ارتفاع (سانتی‌متر)', lo: 0, hi: 6 }
    ];
    function mkData(ctx, n) {                                                       /* مقدارهای y متمایز و دو‌به‌دو نابرابر */
      var vals = [], v; for (v = ctx.lo; v <= ctx.hi; v++) { vals.push(v); }
      return { ctx: ctx, xs: Array.apply(null, Array(n)).map(function (_, i) { return i + 1; }), ys: shuffle(vals).slice(0, n) };
    }
    var rctx = function () { return pick(CTX); };
    function dp(d, o) { return C.plane(Object.assign({ x0: 0, x1: 6, y0: Math.min(0, d.ctx.lo), y1: d.ctx.hi, cell: 32, xt: d.ctx.xn, yt: d.ctx.yu }, o || {})); }
    function pts(d, cl) { return d.xs.map(function (x, i) { return { x: x, y: d.ys[i], c: cl || C.PINK, r: 6 }; }); }
    var tab = function (d, o) { return C.table(d.xs, d.ys, Object.assign({ xh: d.ctx.xn, yh: d.ctx.yn }, o || {})); };
    var the = function (d, x) { return d.ctx.xn + ' ' + C.num(x); };

    /* ============ ۱) جدول و نمودار: دو زبان ============ */
    K.linked = function (host) {
      var ci = 0, d, col = -1, line = false;
      function gen() { d = mkData(CTX[ci], 5); col = -1; }
      function paint() {
        var h = '<div class="lk-line">' + CTX.map(function (c, k) { return '<button type="button" class="lk-chip' + (k === ci ? ' sel' : '') + '" data-c="' + k + '">' + c.t + '</button>'; }).join('') + '</div>';
        h += tab(d, { cells: true, hl: col }) + dp(d, { pts: pts(d), line: line ? d.xs.map(function (x, i) { return [x, d.ys[i]]; }) : null, guides: col >= 0 ? [{ x: d.xs[col], y: d.ys[col] }] : [], part: '' });
        h += '<div class="cd-info">' + (col >= 0 ? 'ستون ' + fa(col + 1) + ': ' + d.ctx.xn + ' ' + C.num(d.xs[col]) + ' و ' + d.ctx.yn + ' ' + C.num(d.ys[col]) + ' ← نقطهٔ ' + C.pt(d.xs[col], d.ys[col]) : 'روی یکی از ستون‌های جدول بزن تا نقطهٔ متناظرش را روی نمودار ببینی.') + '</div>';
        h += '<div class="lk-line"><button type="button" class="btn' + (line ? ' primary' : '') + '" data-l="1">' + (line ? 'نقطه‌ها را جدا کن' : 'نقطه‌ها را به هم وصل کن') + '</button><button type="button" class="btn" data-n="1" data-scroll>داده‌های دیگر</button></div>';
        host.innerHTML = rr(h);
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'), td = e.target.closest('td[data-col]');
        if (td) { col = +td.dataset.col; paint(); return; }
        if (!b) { return; }
        if (b.dataset.c !== undefined) { ci = +b.dataset.c; gen(); } else if (b.dataset.l) { line = !line; } else if (b.dataset.n) { gen(); }
        paint();
      });
      gen(); paint();
    };

    /* ============ ۲) خانه‌یاب جدول ============ */
    K.cellTap = function (host) {
      var N = 5, i, res, d, kind, tx, wr, msg, done;
      function nw() {
        d = mkData(rctx(), pick([4, 5])); kind = Math.random() < 0.65 ? 'y' : 'x'; tx = R(0, d.xs.length - 1); wr = 0; msg = ''; done = false;
      }
      function newGame() { i = 0; res = []; nw(); paint(); }
      function paint() {
        var h, q;
        if (i >= N) { var s = res.filter(Boolean).length; host.innerHTML = rr(C.dots(res, -1, N) + fb(s >= 4, '<b>نتیجه: ' + fa(s) + ' از ' + fa(N) + '</b> (درست در اولین تلاش)') + '<div class="opts"><button type="button" class="btn primary" data-r="1" data-scroll>مجموعهٔ جدید</button></div>'); return; }
        q = kind === 'y' ? 'روی خانه‌ای بزن که نشان می‌دهد ' + d.ctx.xn + ' ' + C.num(d.xs[tx]) + ' چه مقدار <b>' + d.ctx.yn + '</b> دارد.' : 'روی خانه‌ای بزن که نشان می‌دهد ' + d.ctx.yn + ' چه وقت برابر ' + C.num(d.ys[tx]) + ' بود: کدام <b>' + d.ctx.xn + '</b>؟';
        h = C.dots(res, i, N) + '<p class="ask">' + q + '</p>' + tab(d, { cells: !done, mark: done ? (function () { var m = {}; m[tx] = 'ok'; return m; })() : null }) + '<div class="lk-cap">' + msg + '</div>';
        if (done) { h += '<div class="opts"><button type="button" class="btn primary" data-nx="1" data-scroll>' + (i === N - 1 ? 'پایان' : 'بعدی') + '</button></div>'; }
        host.innerHTML = rr(h);
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'), td = e.target.closest('td[data-col]');
        if (b && b.dataset.r) { newGame(); return; } if (b && b.dataset.nx) { i++; nw(); paint(); return; }
        if (!td || done) { return; }
        var c = +td.dataset.col, row = td.dataset.row;
        if (c === tx && row === kind) { res[i] = wr === 0; done = true; msg = '<span style="color:green">درست! ✓ ' + (kind === 'y' ? 'زیر ستونِ ' + d.ctx.xn + ' ' + C.num(d.xs[tx]) + ' عدد ' + C.num(d.ys[tx]) + ' نوشته شده است.' : 'بالای عدد ' + C.num(d.ys[tx]) + ' ' + d.ctx.xn + ' ' + C.num(d.xs[tx]) + ' نوشته شده است.') + '</span>'; }
        else { wr++; msg = '<span class="lk-bad">' + (c === tx ? (kind === 'y' ? 'این خانه خودِ ' + d.ctx.xn + ' است؛ مقدار ' + d.ctx.yn + ' را در ردیف پایین بخوان.' : 'این خانه مقدار ' + d.ctx.yn + ' است؛ ' + d.ctx.xn + ' را در ردیف بالا بخوان.') : 'ستون درست نیست؛ ' + (kind === 'y' ? 'ستونِ ' + d.ctx.xn + ' ' + C.num(d.xs[tx]) + ' را پیدا کن.' : 'ستونی را پیدا کن که ' + d.ctx.yn + ' آن ' + C.num(d.ys[tx]) + ' است.')) + '</span>'; }
        paint();
      });
      newGame();
    };

    /* ============ ۳) اسکنر نمودار ============ */
    K.scanner = function (host) {
      var N = 4, i, res, d, ms, x, msg, done;
      function newGame() { i = 0; res = []; ms = shuffle(['eq', 'max', 'min', 'eq']).map(function (k) { return { t: k, wr: 0 }; }); nw(); paint(); }
      function nw() { d = mkData(rctx(), 5); x = 1; msg = ''; done = false; ms[i].v = d.ys[R(0, 4)]; }
      function target() { var m = ms[i]; return m.t === 'max' ? d.ys.indexOf(Math.max.apply(null, d.ys)) + 1 : m.t === 'min' ? d.ys.indexOf(Math.min.apply(null, d.ys)) + 1 : d.ys.indexOf(m.v) + 1; }
      function paint() {
        var h, m, y, c;
        if (i >= N) { var s = res.filter(Boolean).length; host.innerHTML = rr(C.dots(res, -1, N) + fb(s >= 3, '<b>نتیجه: ' + fa(s) + ' از ' + fa(N) + '</b>') + '<div class="opts"><button type="button" class="btn primary" data-r="1" data-scroll>مأموریت‌های جدید</button></div>'); return; }
        m = ms[i]; y = d.ys[x - 1]; c = d.ctx;
        h = C.dots(res, i, N) + '<p class="ask">' + (m.t === 'eq' ? 'اسکنر را روی ' + c.xn + 'ی ببر که ' + c.yn + ' در آن برابر ' + C.num(m.v) + ' است.' : m.t === 'max' ? 'اسکنر را روی ' + c.xn + 'ی ببر که ' + c.yn + ' در آن <b>بیشترین</b> مقدار را دارد.' : 'اسکنر را روی ' + c.xn + 'ی ببر که ' + c.yn + ' در آن <b>کمترین</b> مقدار را دارد.') + '</p>';
        h += dp(d, { pts: pts(d), seg: [{ a: [x, Math.min(0, c.lo)], b: [x, c.hi], c: C.YEL, w: 4 }], guides: [{ x: x, y: y, vc: 'transparent' }] });
        h += '<div class="cd-sl"><b>' + c.xn + '</b><input type="range" min="1" max="5" step="1" value="' + x + '"' + (done ? ' disabled' : '') + ' aria-label="' + c.xn + '"><b>' + fa(x) + '</b></div>';
        h += '<div class="lk-cap">' + msg + '</div>';
        h += done ? '<div class="opts"><button type="button" class="btn primary" data-nx="1" data-scroll>' + (i === N - 1 ? 'پایان' : 'مأموریت بعدی') + '</button></div>' : '<div class="opts"><button type="button" class="btn primary" data-ck="1">ثبت</button></div>';
        host.innerHTML = rr(h);
      }
      host.addEventListener('input', function (e) { if (e.target.type === 'range') { x = +e.target.value; msg = ''; paint(); var nr = host.querySelector('input[type=range]'); if (nr) { nr.focus({ preventScroll: true }); } } });
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) { return; }
        if (b.dataset.r) { newGame(); }
        else if (b.dataset.nx) { i++; if (i < N) { nw(); } paint(); }
        else if (b.dataset.ck) {
          var ok = x === target(), c = d.ctx;
          if (ok) { done = true; res[i] = ms[i].wr === 0; msg = '<span style="color:green">درست! ✓ در ' + c.xn + ' ' + C.num(x) + '، ' + c.yn + ' برابر ' + C.num(d.ys[x - 1]) + ' است.</span>'; }
          else { ms[i].wr++; msg = '<span class="lk-bad">در ' + c.xn + ' ' + C.num(x) + '، ' + c.yn + ' برابر ' + C.num(d.ys[x - 1]) + ' است؛ اسکنر را جابه‌جا کن و دوباره ثبت کن.</span>'; }
          paint();
        }
      });
      newGame();
    };

    /* ============ ۴) از نمودار به جدول ============ */
    K.fillTab = function (host) {
      var d, vals, marks, msg;
      function newSet() { d = mkData(rctx(), 4); vals = {}; marks = {}; msg = ''; paint(); }
      function keep() { host.querySelectorAll('input[data-k]').forEach(function (inp) { vals[inp.dataset.k] = inp.value; }); }
      function paint() {
        var h = '<p class="ask">نمودار را بخوان و ردیفِ ' + d.ctx.yn + ' جدول را کامل کن:</p>' + dp(d, { pts: pts(d) });
        h += C.table(d.xs, d.ys, { xh: d.ctx.xn, yh: d.ctx.yn, blank: [0, 1, 2, 3], blankHtml: function (k) { return C.numBox('c' + k); }, mark: marks });
        h += msg + '<div class="opts"><button type="button" class="btn primary" data-ck="1">بررسی</button><button type="button" class="btn" data-n="1" data-scroll>نمودار جدید</button></div>';
        host.innerHTML = rr(h);
        host.querySelectorAll('input[data-k]').forEach(function (inp) { inp.value = vals[inp.dataset.k] || ''; });
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b || b.classList.contains('cd-pm')) { return; }
        if (b.dataset.n) { newSet(); return; }
        if (b.dataset.ck) {
          keep(); var bad = 0, sw = 0, empty = 0; marks = {};
          d.xs.forEach(function (x, k) { var v = C.parseInt0(vals['c' + k]); if (v === null) { empty++; marks[k] = 'no'; } else if (v === d.ys[k]) { marks[k] = 'ok'; } else { marks[k] = 'no'; bad++; if (v === x) { sw++; } } });
          msg = empty ? '<div class="lk-cap lk-bad">همهٔ خانه‌ها را پر کن (برای منفی از ± استفاده کن).</div>' : bad === 0 ? fb(true, 'درست است! ✓ همهٔ ستون‌ها با نمودار می‌خوانند.') : fb(false, (bad === 1 ? 'یک خانه' : fa(bad) + ' خانه') + ' درست نیست.' + (sw ? ' دقت کن عددِ ' + d.ctx.xn + ' را به جای ' + d.ctx.yn + ' ننویسی.' : ' از نقطه تا محور ' + M('y') + ' خط راهنما بکش و ارتفاع را بخوان.'));
          keep(); paint();
        }
      });
      C.wirePm(host); newSet();
    };

    /* ============ ۵) از جدول به نمودار ============ */
    K.plotTab = function (host) {
      var d, placed, marks, msg;
      function newSet() { d = mkData(rctx(), 4); placed = {}; marks = {}; msg = ''; paint(); }
      function paint() {
        var h = '<p class="ask">برای هر ستونِ جدول، نقطه‌اش را روی نمودار بگذار (لمس کن). اگر جای یک ستون را عوض کنی، نقطهٔ قبلی همان ستون جابه‌جا می‌شود.</p>' + tab(d);
        var p = d.xs.filter(function (x) { return placed[x] !== undefined; }).map(function (x) { return { x: x, y: placed[x], c: marks[x] === 'ok' ? C.GREEN : marks[x] === 'no' ? C.RED : C.PINK, r: 6.5 }; });
        h += dp(d, { pts: p, pick: true }) + msg + '<div class="opts"><button type="button" class="btn primary" data-ck="1">بررسی</button><button type="button" class="btn" data-cl="1">پاک‌کردن</button><button type="button" class="btn" data-n="1" data-scroll>جدول جدید</button></div>';
        host.innerHTML = rr(h);
      }
      host.addEventListener('click', function (e) {
        var t = C.hit(e), b = e.target.closest('button');
        if (t) { if (d.xs.indexOf(t.x) < 0) { msg = '<div class="lk-cap lk-bad">در جدول ستونی با ' + d.ctx.xn + ' ' + C.num(t.x) + ' نیست.</div>'; } else { placed[t.x] = t.y; marks = {}; msg = ''; } paint(); return; }
        if (!b) { return; }
        if (b.dataset.n) { newSet(); } else if (b.dataset.cl) { placed = {}; marks = {}; msg = ''; paint(); }
        else if (b.dataset.ck) {
          var miss = 0, bad = 0, sw = 0; marks = {};
          d.xs.forEach(function (x, k) { if (placed[x] === undefined) { miss++; } else if (placed[x] === d.ys[k]) { marks[x] = 'ok'; } else { marks[x] = 'no'; bad++; if (placed[x] === x && d.ys[k] !== x) { sw++; } } });
          msg = miss ? '<div class="lk-cap lk-bad">برای ' + fa(miss) + ' ستون هنوز نقطه‌ای نگذاشته‌ای.</div>' : bad ? fb(false, fa(bad) + ' نقطه درست نیست (قرمز). برای هر نقطه اول ' + d.ctx.xn + ' را روی محور افقی پیدا کن و بعد به اندازهٔ ' + d.ctx.yn + ' بالا یا پایین برو.') : fb(true, 'درست است! ✓ نمودار با جدول می‌خواند.');
          paint();
        }
      });
      newSet();
    };

    /* ============ ۶) جفت‌کردن ردیف و نقطه ============ */
    K.matchLab = function (host) {
      var rows, labels, sel, done, msg;
      var NM = ['الف', 'ب', 'ج', 'د'], RN = ['اول', 'دوم', 'سوم'];
      function newGame() {
        var seen = {}, ps = [], a;
        while (ps.length < 3) { a = [R(-3, 3), R(-3, 3)]; if (a[0] && a[1] && a[0] !== a[1] && a[0] !== -a[1] && !seen[a.join()] && !seen[[a[1], a[0]].join()]) { seen[a.join()] = 1; ps.push(a); } }
        var dec = [ps[0][1], ps[0][0]], all = ps.map(function (p, k) { return { p: p, row: k }; }).concat([{ p: dec, row: -1 }]);
        labels = shuffle(all).map(function (q, k) { q.l = NM[k]; return q; }); rows = ps; sel = -1; done = {}; msg = ''; paint();
      }
      function paint() {
        var h = '<p class="ask">هر ردیف جدول را انتخاب کن و بعد روی نقطهٔ متناظرش در شکل بزن:</p><div class="cd-tray">', n = Object.keys(done).length;
        rows.forEach(function (p, k) { h += '<button type="button" class="cd-tile' + (sel === k ? ' sel' : '') + '" style="direction:rtl' + (done[k] ? ';background:#d9f2e3' : '') + '"' + (done[k] ? ' disabled' : '') + ' data-rw="' + k + '">' + RN[k] + ': ' + M('x=' + p[0]) + ' ، ' + M('y=' + p[1]) + '</button>'; });
        h += '</div>' + C.plane({ x0: -4, x1: 4, y0: -4, y1: 4, pick: n < 3, pts: labels.map(function (q) { return { x: q.p[0], y: q.p[1], l: q.l, c: q.row >= 0 && done[q.row] ? C.GREEN : C.PINK, r: 6.5 }; }) });
        h += '<div class="lk-cap">' + msg + '</div>' + (n === 3 ? fb(true, 'همهٔ ردیف‌ها را درست جفت کردی!') + '<div class="opts"><button type="button" class="btn primary" data-r="1" data-scroll>بازی جدید</button></div>' : '');
        host.innerHTML = rr(h);
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'), t = C.hit(e);
        if (b && b.dataset.r) { newGame(); return; }
        if (b && b.dataset.rw !== undefined) { sel = +b.dataset.rw; msg = ''; paint(); return; }
        if (!t) { return; }
        if (sel < 0) { msg = 'اول یک ردیف جدول را انتخاب کن.'; paint(); return; }
        var q = labels.filter(function (z) { return z.p[0] === t.x && z.p[1] === t.y; })[0], p = rows[sel];
        if (!q) { msg = '<span class="lk-bad">آنجا نقطه‌ای نیست؛ روی یکی از نقطه‌های نام‌دار بزن.</span>'; }
        else if (q.row === sel) { done[sel] = 1; msg = '<span style="color:green">درست! ' + C.pt(p[0], p[1]) + ' همان نقطهٔ «' + q.l + '» است.</span>'; sel = -1; }
        else if (q.row < 0) { msg = '<span class="lk-bad">نقطهٔ «' + q.l + '» ' + C.pt(q.p[0], q.p[1]) + ' است؛ مؤلفه‌های این ردیف را جابه‌جا خوانده‌ای. ترتیب (x، y) مهم است.</span>'; }
        else { msg = '<span class="lk-bad">نقطهٔ «' + q.l + '» ' + C.pt(q.p[0], q.p[1]) + ' است، نه ' + C.pt(p[0], p[1]) + '.</span>'; }
        paint();
      });
      newGame();
    };

    /* ============ ۷) کارآگاه: ستون ناهمخوان ============ */
    K.mismatch = function (host) {
      var N = 4, i, res, d, ty, w, tried, wr, done, msg;
      function nw() {
        d = mkData(rctx(), 4); w = R(0, 3); ty = d.ys.slice(); var v; do { v = R(d.ctx.lo, d.ctx.hi); } while (v === d.ys[w]); ty[w] = v; tried = {}; wr = 0; done = false; msg = '';
      }
      function newGame() { i = 0; res = []; nw(); paint(); }
      function paint() {
        var h, mk = {};
        if (i >= N) { var s = res.filter(Boolean).length; host.innerHTML = rr(C.dots(res, -1, N) + fb(s >= 3, '<b>نتیجه: ' + fa(s) + ' از ' + fa(N) + '</b> (درست در اولین تلاش)') + '<div class="opts"><button type="button" class="btn primary" data-r="1" data-scroll>پروندهٔ جدید</button></div>'); return; }
        Object.keys(tried).forEach(function (k) { mk[k] = 'no'; }); if (done) { mk = {}; mk[w] = 'bad'; }
        h = C.dots(res, i, N) + '<p class="ask">این جدول و نمودار دادهٔ یک آزمایش‌اند، ولی <b>یک ستونِ جدول</b> با نمودار نمی‌خواند. آن را پیدا کن:</p>' + dp(d, { pts: pts(d) }) + C.table(d.xs, ty, { xh: d.ctx.xn, yh: d.ctx.yn, cells: !done, mark: mk }) + '<div class="lk-cap">' + msg + '</div>';
        if (done) { h += '<div class="opts"><button type="button" class="btn primary" data-nx="1" data-scroll>' + (i === N - 1 ? 'پایان' : 'پروندهٔ بعدی') + '</button></div>'; }
        host.innerHTML = rr(h);
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'), td = e.target.closest('td[data-col]');
        if (b && b.dataset.r) { newGame(); return; } if (b && b.dataset.nx) { i++; nw(); paint(); return; }
        if (!td || done) { return; }
        var c = +td.dataset.col;
        if (c === w) { done = true; res[i] = wr === 0; msg = '<span style="color:green">درست! ✓ در نمودار ' + d.ctx.xn + ' ' + C.num(d.xs[w]) + ' مقدار ' + C.num(d.ys[w]) + ' دارد، ولی جدول ' + C.num(ty[w]) + ' نوشته است.</span>'; }
        else { wr++; tried[c] = 1; msg = '<span class="lk-bad">این ستون با نمودار می‌خواند: نقطهٔ ' + C.pt(d.xs[c], d.ys[c]) + ' را روی نمودار پیدا کن.</span>'; }
        paint();
      });
      newGame();
    };

    /* ============ آزمون پایانی ============ */
    K.finalC03 = function (host) {
      var o = function (h, ok, m) { return { h: h, ok: ok, m: m }; };
      var nv = function (v) { return M(String(v)); };
      function distinctNums(list) { return C.distinct(list, function (z) { return z; }); }
      function qTab() {
        var d = mkData(rctx(), 4), k = R(0, 3), c = d.ctx, x = d.xs[k], y = d.ys[k], other = d.ys[(k + 1) % 4], third = d.ys[(k + 2) % 4];
        return { kind: 'mcq', ask: 'در جدول زیر، ' + c.xn + ' ' + nv(x) + ' چه مقدار ' + c.yn + ' دارد؟', fig: tab(d), opts: [o(nv(y), true), o(nv(x), false, 'این عدد خودِ ' + c.xn + ' است؛ مقدار ' + c.yn + ' را در ردیف پایین بخوان.'), o(nv(other), false, 'این مقدار مربوط به ستون دیگری است.'), o(nv(third), false, 'این مقدار مربوط به ستون دیگری است.')], expl: '<p>ستونِ ' + c.xn + ' ' + nv(x) + ' را پیدا کن و عدد زیرش را بخوان: ' + nv(y) + '.</p>' };
      }
      function qTabRev() {
        var d = mkData(rctx(), 5), k = R(0, 4), c = d.ctx;
        return { kind: 'mcq', keep: true, ask: 'در کدام ' + c.xn + '، ' + c.yn + ' برابر ' + nv(d.ys[k]) + ' بوده است؟', fig: tab(d), opts: d.xs.map(function (x, j) { return o(nv(x), j === k, 'در ' + c.xn + ' ' + nv(x) + '، ' + c.yn + ' برابر ' + nv(d.ys[j]) + ' است.'); }), expl: '<p>این بار مقدار ' + c.yn + ' را می‌دانیم و ' + c.xn + ' را می‌خواهیم: ' + nv(d.ys[k]) + ' را در ردیف پایین پیدا کن و عدد بالای آن را بخوان.</p>' };
      }
      function qGraph() {
        var d = mkData(rctx(), 4), k = R(0, 3), c = d.ctx, x = d.xs[k], y = d.ys[k], vs = distinctNums([y, x, d.ys[(k + 1) % 4], d.ys[(k + 2) % 4]]);
        return { kind: 'mcq', ask: 'نمودار زیر را ببین. ' + c.xn + ' ' + nv(x) + ' چه مقدار ' + c.yn + ' دارد؟', fig: dp(d, { pts: pts(d) }), opts: vs.map(function (v) { return o(nv(v), v === y, v === x ? 'این عدد خودِ ' + c.xn + ' است، نه ارتفاع نقطه.' : 'این ارتفاع نقطهٔ دیگری است.'); }), expl: '<p>روی محور افقی ' + nv(x) + ' را پیدا کن، تا نقطه بالا یا پایین برو و عددِ روبه‌روی آن روی محور عمودی را بخوان: ' + nv(y) + '.</p>' };
      }
      function qTrend() {
        var d = mkData(rctx(), 5), c = d.ctx, t = pick(['max', 'min', 'inc']);
        if (t === 'inc') {
          var k = R(0, 3), up = d.ys[k + 1] > d.ys[k];
          return { kind: 'mcq', keep: true, ask: 'از ' + c.xn + ' ' + nv(d.xs[k]) + ' تا ' + c.xn + ' ' + nv(d.xs[k + 1]) + '، ' + c.yn + ' چه تغییری کرده است؟', fig: dp(d, { pts: pts(d) }), opts: [o('افزایش یافته', up, 'نقطهٔ دوم پایین‌تر از اولی است؛ مقدار کم شده است.'), o('کاهش یافته', !up, 'نقطهٔ دوم بالاتر از اولی است؛ مقدار زیاد شده است.'), o('تغییری نکرده', false, 'دو نقطه ارتفاع یکسان ندارند.')], expl: '<p>نقطهٔ ' + C.pt(d.xs[k], d.ys[k]) + ' و نقطهٔ ' + C.pt(d.xs[k + 1], d.ys[k + 1]) + ' را مقایسه کن؛ نقطهٔ بالاتر مقدار بیشتری دارد.</p>' };
        }
        var tg = t === 'max' ? Math.max.apply(null, d.ys) : Math.min.apply(null, d.ys), ti = d.ys.indexOf(tg);
        return { kind: 'mcq', keep: true, ask: c.yn + ' در کدام ' + c.xn + ' <b>' + (t === 'max' ? 'بیشترین' : 'کمترین') + '</b> مقدار را دارد؟', fig: dp(d, { pts: pts(d) }), opts: d.xs.map(function (x, j) { return o(nv(x), j === ti, 'در ' + c.xn + ' ' + nv(x) + '، ' + c.yn + ' برابر ' + nv(d.ys[j]) + ' است.'); }), expl: '<p>' + (t === 'max' ? 'بالاترین' : 'پایین‌ترین') + ' نقطه را پیدا کن؛ ' + c.xn + ' آن ' + nv(d.xs[ti]) + ' است.</p>' };
      }
      function qMatch() {
        var NM = ['الف', 'ب', 'ج', 'د'], seen = {}, ps = [], a;
        while (ps.length < 3) { a = [R(-3, 3), R(-3, 3)]; if (a[0] && a[1] && a[0] !== a[1] && a[0] !== -a[1] && !seen[a.join()] && !seen[[a[1], a[0]].join()]) { seen[a.join()] = 1; ps.push(a); } }
        var dec = [ps[0][1], ps[0][0]], all = shuffle(ps.map(function (p, k) { return { p: p, row: k }; }).concat([{ p: dec, row: -1 }])).map(function (q, k) { q.l = NM[k]; return q; });
        var tgt = all.filter(function (q) { return q.row === 0; })[0], p = ps[0];
        return { kind: 'mcq', keep: true, ask: 'ردیفی از جدول دارای ' + M('x=' + p[0]) + ' و ' + M('y=' + p[1]) + ' است. این ردیف کدام نقطهٔ شکل است؟', fig: C.plane({ x0: -4, x1: 4, y0: -4, y1: 4, pts: all.map(function (q) { return { x: q.p[0], y: q.p[1], l: q.l, c: C.PINK, r: 6.5 }; }) }), opts: all.slice().sort(function (u, v) { return NM.indexOf(u.l) - NM.indexOf(v.l); }).map(function (q) { return o('نقطهٔ ' + q.l, q === tgt, q.row < 0 ? 'این نقطه ' + C.pt(q.p[0], q.p[1]) + ' است؛ مؤلفه‌ها جابه‌جا شده‌اند.' : 'این نقطه ' + C.pt(q.p[0], q.p[1]) + ' است.'); }), expl: '<p>نقطه‌ای را بیاب که ' + M('x=' + p[0]) + ' و ' + M('y=' + p[1]) + ' باشد: ' + C.pt(p[0], p[1]) + '. ' + C.pt(p[1], p[0]) + ' نقطهٔ دیگری است.</p>' };
      }
      function qMis() {
        var d = mkData(rctx(), 4), w = R(0, 3), ty = d.ys.slice(), v, c = d.ctx; do { v = R(c.lo, c.hi); } while (v === d.ys[w]); ty[w] = v;
        return { kind: 'mcq', keep: true, ask: 'یکی از ستون‌های جدول با نمودار نمی‌خواند. کدام ستون؟', fig: dp(d, { pts: pts(d) }) + C.table(d.xs, ty, { xh: c.xn, yh: c.yn }), opts: d.xs.map(function (x, j) { return o('ستونی که ' + c.xn + ' ' + nv(x) + ' دارد', j === w, 'نقطهٔ ' + C.pt(x, d.ys[j]) + ' روی نمودار با این ستون جور است.'); }), expl: '<p>هر ستون را با نقطه‌ای که ' + c.xn + ' برابر دارد مقایسه کن. برای ' + c.xn + ' ' + nv(d.xs[w]) + ' نمودار ' + nv(d.ys[w]) + ' را نشان می‌دهد ولی جدول ' + nv(ty[w]) + ' نوشته است.</p>' };
      }
      function qPick() {
        var d = mkData(rctx(), 4), k = R(0, 3), c = d.ctx;
        return { kind: 'pick', ask: 'نقطهٔ مربوط به ستونِ ' + c.xn + ' ' + nv(d.xs[k]) + ' از جدول را روی نمودار مشخص کن.', fig: tab(d), plane: { x0: 0, x1: 6, y0: Math.min(0, c.lo), y1: c.hi, cell: 32, xt: c.xn, yt: c.yu }, ans: [d.xs[k], d.ys[k]],
          bad: function (a) { return a.x === d.ys[k] && a.y === d.xs[k] ? 'مؤلفه‌ها جابه‌جا شده‌اند: ' + c.xn + ' روی محور افقی است.' : 'نقطه باید ' + c.xn + ' ' + nv(d.xs[k]) + ' و ' + c.yn + ' ' + nv(d.ys[k]) + ' داشته باشد.'; }, expl: '<p>ستون یعنی نقطهٔ ' + C.pt(d.xs[k], d.ys[k]) + ': روی محور افقی ' + nv(d.xs[k]) + ' و روی محور عمودی ' + nv(d.ys[k]) + '.</p>' };
      }
      /* سؤال‌های «کدام x» و «بیشترین» ۴ یا ۵ گزینه‌ای‌اند؛ گزینه‌ها به‌ترتیب x نگه داشته می‌شوند */
      C.quiz(host, function () {
        return [qTab, qTabRev, qGraph, qTrend, qMatch, qMis, qPick].map(function (f) {
          var q, t = 0; do { q = f(); } while (q.opts && C.distinct(q.opts, function (x) { return x.h; }).length < q.opts.length && t++ < 40);
          if (q.opts && !q.keep) { q.opts = shuffle(q.opts.slice()); }
          return q;
        });
      }, function (s) { return s === 7 ? 'عالی! همهٔ سؤال‌ها درست بود.' : s >= 5 ? 'خوب بود. سؤال‌هایی را که اشتباه کردی دوباره مرور کن.' : 'یک بار دیگر درس را مرور کن و با سؤال‌های جدید امتحان کن.'; });
    };

    var TIP_CONN = '<p>وصل کردنِ نقطه‌ها فقط وقتی معنا دارد که بین دو مقدار هم چیزی اتفاق بیفتد؛ مثلاً دما بین ساعت ۲ و ۳ ناگهان نمی‌پرد. اما «تعداد صفحه‌هایی که علی هر روز خوانده» برای روزِ ۲٫۵ معنا ندارد.</p><p>در این درس فقط خودِ نقطه‌ها را می‌خوانیم.</p>';
    var TIP_AX = '<p>در نمودارِ داده، محور افقی معمولاً چیزی است که خودمان انتخاب می‌کنیم (ساعت، روز، هفته) و محور عمودی چیزی است که اندازه می‌گیریم (دما، صفحه، ارتفاع). به همین دلیل ' + M('x') + ' همان ردیف بالای جدول و ' + M('y') + ' ردیف پایین است.</p>';

    return {
      html: function () {
        H.tip('c3-conn', 'چرا نقطه‌ها را به هم وصل می‌کنیم؟', TIP_CONN); H.tip('c3-ax', 'محور افقی و عمودی در نمودار داده', TIP_AX);
        var host = H.host;
        return fix([
          K.sn('۱', 'جدول و نمودار: دو زبان برای یک داده'),
          '<p>داده‌ها را می‌توان در یک جدول یا روی صفحهٔ مختصات نشان داد. ردیف بالای جدول مقدارهای ' + M('x') + ' و ردیف پایین مقدارهای ' + M('y') + ' است ' + H.tip('c3-ax', 'محور افقی و عمودی در نمودار داده', TIP_AX) + '. هر <b>ستونِ</b> جدول یک زوج مرتب است و یک <b>نقطه</b> روی نمودار. روی ستون‌ها بزن و ببین:</p>', host('c3a'),
          '<p>می‌توانی نقطه‌ها را به هم وصل کنی تا روند تغییر را بهتر ببینی ' + H.tip('c3-conn', 'چرا نقطه‌ها را به هم وصل می‌کنیم؟', TIP_CONN) + '.</p>',

          K.sn('۲', 'خواندن از جدول'),
          '<p>برای خواندن یک مقدار از جدول، ستون درست را پیدا کن و عدد رویِ سطرِ مورد نظر را بخوان:</p><ul><li>اگر ' + M('x') + ' را می‌دانی: ستونِ آن ' + M('x') + ' را پیدا کن، عدد <b>زیر</b> آن ' + M('y') + ' است.</li><li>اگر ' + M('y') + ' را می‌دانی: آن را در ردیف پایین پیدا کن، عدد <b>بالای</b> آن ' + M('x') + ' است.</li></ul>',
          K.box('err', '⚠ اشتباه رایج', '<p>عددِ خودِ ستون (مثلاً شمارهٔ روز) را با مقدار اندازه‌گیری‌شده (مثلاً تعداد صفحه) اشتباه نگیر. «روز ۳» با «۳ صفحه» فرق دارد.</p>'),
          '<h4>خانه‌یاب</h4><p>خانه‌ای را که خواسته می‌شود روی جدول لمس کن:</p>', host('c3b'),

          K.sn('۳', 'خواندن از نمودار'),
          '<p>برای خواندنِ مقدارِ یک نقطه از روی نمودار: روی محور افقی مقدار ' + M('x') + ' را پیدا کن، تا نقطه بالا یا پایین برو، و از همان‌جا به محور عمودی نگاه کن؛ این ' + M('y') + ' است. برای راه برعکس، از ' + M('y') + ' روی محور عمودی به نقطه و بعد پایین یا بالا به محور افقی برو.</p>',
          '<h4>اسکنر</h4><p>خط اسکنر را روی نمودار حرکت بده و ماموریت‌ها را انجام بده (ارتفاع نقطه را از روی محور عمودی بخوان):</p>', host('c3c'),

          K.sn('۴', 'از نمودار به جدول'),
          '<p>برای ساختن جدول از روی نمودار، هر نقطه را بخوان و ' + M('x') + ' و ' + M('y') + ' آن را در یک ستون بنویس. در تمرین زیر ' + M('x') + 'ها داده شده؛ مقدار ' + M('y') + ' هر نقطه را پیدا کن:</p>', host('c3d'),

          K.sn('۵', 'از جدول به نمودار'),
          '<p>برای رسم نمودار، هر ستون را یک نقطه کن: روی محور افقی ' + M('x') + ' را پیدا کن و به اندازهٔ ' + M('y') + ' بالا یا پایین برو.</p>', host('c3e'),
          '<p>ترتیب همچنان مهم است: ردیفی با ' + M('x=2') + ' و ' + M('y=3') + ' نقطهٔ ' + M('(2,3)') + ' است، نه ' + M('(3,2)') + '. این بار هر ردیف را به نقطهٔ درستش وصل کن؛ یکی از نقطه‌ها عمداً «مؤلفه‌جابه‌جا» شده است:</p>', host('c3f'),

          K.sn('۶', 'مقایسهٔ جدول و نمودار'),
          '<p>اگر جدول و نمودار دادهٔ یکسانی را نشان دهند، باید هر ستونِ جدول با یک نقطهٔ نمودار جور باشد. اگر ستونی جور نبود، یکی از دو نمایش اشتباه شده است. با مقایسهٔ ستون به ستون خطا را پیدا کن:</p>', host('c3g'),
          K.box('note', 'تفسیر سریع نمودار', '<p>نقطهٔ بالاتر یعنی مقدار بزرگ‌تر. اگر از چپ به راست نقطه‌ها بالاتر بروند، مقدار <b>افزایش</b> یافته و اگر پایین‌تر بروند، <b>کاهش</b>. بالاترین نقطه بیشترین و پایین‌ترین نقطه کمترین مقدار را نشان می‌دهد.</p>'),

          K.sn('۷', 'آزمون پایانی'),
          '<p>هفت سؤال با دادهٔ تصادفی. هر بار که از اول شروع کنی، سؤال‌ها عوض می‌شوند.</p>', host('c3h'),
          K.box('sum', 'جمع‌بندی', T`<ul><li>هر ستونِ جدول یک زوج مرتب $(x,y)$ و یک نقطهٔ نمودار است: ردیف بالا $x$ و ردیف پایین $y$.</li><li>برای خواندن از نمودار: $x$ را روی محور افقی پیدا کن، تا نقطه برو و $y$ را روی محور عمودی بخوان.</li><li>برای رسم: روی محور افقی $x$ را بیاب و به اندازهٔ $y$ بالا یا پایین برو.</li><li>$(2,3)$ و $(3,2)$ نقطه‌های متفاوت‌اند؛ ترتیب مهم است.</li><li>نقطهٔ بالاتر مقدار بزرگ‌تر دارد؛ از چپ به راست بالا رفتن یعنی افزایش.</li></ul><p>این مهارت‌ها پایهٔ مفهوم «تابع» در ریاضی ۱ دهم است.</p>`)
        ].join(''));
      },
      init: function (panel) {
        K.linked(panel.querySelector('#c3a')); K.cellTap(panel.querySelector('#c3b')); K.scanner(panel.querySelector('#c3c')); K.fillTab(panel.querySelector('#c3d'));
        K.plotTab(panel.querySelector('#c3e')); K.matchLab(panel.querySelector('#c3f')); K.mismatch(panel.querySelector('#c3g')); K.finalC03(panel.querySelector('#c3h'));
      }
    };
  }
};
