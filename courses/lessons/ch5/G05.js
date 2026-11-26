/* درس مهارت G05 — مساحت مثلث با قاعده و ارتفاع (فصل ۵) */
window.LESSONS = window.LESSONS || {};
/* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
window.LESSONS.G05 = {
  needs: ['utils', 'exsteps', 'kit'],
  setup: function (K0) {
    var ML = window.MathLite, fa = ML.fa, rr = ML.renderRich, abs = Math.abs, df = K0.df;
    var _u = K0._u, R = _u.R, M = _u.M, shuffle = _u.shuffle;
    var K = Object.create(K0);   // K0 = هستهٔ مشترک؛ K = همان + ابزارهای اختصاصی این درس
    var H = K0.lk(K);
    var T = String.raw;
    var INK = '#14213d', TEAL = '#0e8f7e', PINK = '#d6457a', BLUE = '#4c5fd5', AMB = '#e08a00', YEL = '#ffc233', MINT = '#7fd0c3', RED = '#c62f2f', GREY = '#5a6a85';
    var pick = function (a) { return a[R(0, a.length - 1)]; };
    var f2 = function (n) { return Math.round(n * 100) / 100; };
    var nf = function (v) { var s = String(+(+v).toFixed(2)); return s === '-0' ? '0' : s; };
    var fan = function (v) { return fa(nf(v)).replace('.', '٫'); };
    function uniqBy(arr, key) { var s = {}; return arr.filter(function (x) { var k = key(x); if (s[k]) { return false; } s[k] = 1; return true; }); }
    var refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };
    var fig1 = function (inner, cap) { return '<div class="figs one"><figure>' + inner + (cap ? '<figcaption>' + cap + '</figcaption>' : '') + '</figure></div>'; };

    /* ---------- ابزارهای SVG ---------- */
    function sv(W, H) { return '<svg class="gsv" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-hidden="true">'; }
    function stx(t, x, y, o) { o = o || {}; return '<text x="' + f2(x) + '" y="' + f2(y + (o.fs || 13) * 0.34) + '" text-anchor="' + (o.a || 'middle') + '" font-size="' + (o.fs || 13) + '"' + (o.b ? ' font-weight="bold"' : '') + ' fill="' + (o.c || INK) + '" font-family="Tahoma,sans-serif">' + t + '</text>'; }
    function sln(a, b, c, w, d) { return '<line x1="' + f2(a[0]) + '" y1="' + f2(a[1]) + '" x2="' + f2(b[0]) + '" y2="' + f2(b[1]) + '" stroke="' + (c || INK) + '" stroke-width="' + (w || 2) + '"' + (d ? ' stroke-dasharray="5 4"' : '') + ' stroke-linecap="round"/>'; }
    function unit(a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy) || 1; return [dx / l, dy / l]; }
    function rmark(V, A, B, r, c) { var u1 = unit(V, A), u2 = unit(V, B), p1 = [V[0] + u1[0] * r, V[1] + u1[1] * r], p3 = [V[0] + u2[0] * r, V[1] + u2[1] * r], p2 = [p1[0] + u2[0] * r, p1[1] + u2[1] * r]; return '<polyline points="' + f2(p1[0]) + ',' + f2(p1[1]) + ' ' + f2(p2[0]) + ',' + f2(p2[1]) + ' ' + f2(p3[0]) + ',' + f2(p3[1]) + '" fill="none" stroke="' + (c || INK) + '" stroke-width="1.8"/>'; }
    function arcP(V, A, B, r, c, fill) {
      var u1 = unit(V, A), u2 = unit(V, B), p1 = [V[0] + u1[0] * r, V[1] + u1[1] * r], p2 = [V[0] + u2[0] * r, V[1] + u2[1] * r], cr = u1[0] * u2[1] - u1[1] * u2[0], sw = cr > 0 ? 1 : 0;
      if (abs(cr) < 1e-6 && u1[0] * u2[0] + u1[1] * u2[1] < 0) { sw = 1; }
      return '<path d="' + (fill ? 'M' + f2(V[0]) + ' ' + f2(V[1]) + ' L' + f2(p1[0]) + ' ' + f2(p1[1]) : 'M' + f2(p1[0]) + ' ' + f2(p1[1])) + ' A' + r + ' ' + r + ' 0 0 ' + sw + ' ' + f2(p2[0]) + ' ' + f2(p2[1]) + (fill ? ' Z' : '') + '" fill="' + (fill || 'none') + '" stroke="' + (c || INK) + '" stroke-width="1.8"/>';
    }
    /* زاویه: o={deg, rot, l1, l2, lab, W, H, mark(قائمه), fill} — شکل با مختصات ریاضی ساخته و در کادر وسط‌چین می‌شود */
    /* نقاله: o={deg, base:'R'|'L', hi(true: مقیاس درست پررنگ)} — مقیاس بیرونی صفرش سمت راست، مقیاس درونی صفرش سمت چپ */
    /* مثلث: o={pts:[A,B,C] مختصات ریاضی, names, sl:[برچسب AB,BC,CA], al:[برچسب زاویه در A,B,C], right:اندیس رأس قائمه, arcs, alt:{from,base,l}, hl:{side:i,c}, col:[رنگ ضلع‌ها], fill, W, H} */
    function triSVG(o) {
      var W = o.W || 290, H = o.H || 190, pad = o.pad || 40, names = o.names || ['A', 'B', 'C'], i, s, pts = o.pts.slice(), all = pts.slice();
      var altInfo = null, foot = null;
      if (o.alt) {
        var vi = o.alt.from, b0 = pts[o.alt.base], b1 = pts[(o.alt.base + 1) % 3], dx = b1[0] - b0[0], dy = b1[1] - b0[1], tt = ((pts[vi][0] - b0[0]) * dx + (pts[vi][1] - b0[1]) * dy) / (dx * dx + dy * dy);
        foot = [b0[0] + tt * dx, b0[1] + tt * dy]; all.push(foot); altInfo = { t: tt };
      }
      (o.dots || []).forEach(function (d) { all.push(d.p); });
      var xs = all.map(function (p) { return p[0]; }), ys = all.map(function (p) { return p[1]; }), x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
      var k = Math.min((W - 2 * pad) / ((x1 - x0) || 1), (H - 2 * pad) / ((y1 - y0) || 1));
      var ox = pad + ((W - 2 * pad) - (x1 - x0) * k) / 2, oy = pad + ((H - 2 * pad) - (y1 - y0) * k) / 2;
      function S(p) { return [ox + (p[0] - x0) * k, oy + (y1 - p[1]) * k]; }
      var P = pts.map(S), C = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3];
      s = sv(W, H);
      s += '<polygon points="' + P.map(function (p) { return f2(p[0]) + ',' + f2(p[1]); }).join(' ') + '" fill="' + (o.fill || '#eef4ff') + '" stroke="none"/>';
      if (o.alt) {
        var F = S(foot), V = P[o.alt.from], B0 = P[o.alt.base], B1 = P[(o.alt.base + 1) % 3];
        if (altInfo.t < -0.001 || altInfo.t > 1.001) { var far = altInfo.t < 0 ? B0 : B1; s += sln(far, F, INK, 1.8, 1); }
        s += sln(V, F, o.alt.c || PINK, 2.2, 1);
        s += rmark(F, V, altInfo.t < 0 || altInfo.t > 1 ? (altInfo.t < 0 ? B0 : B1) : B1, 10, INK);
        if (o.alt.l) {
          var m = [(V[0] + F[0]) / 2, (V[1] + F[1]) / 2],
            nn = unit(V, F), nrm = [-nn[1], nn[0]],
            sd = (altInfo.t > 0.001 && altInfo.t < 0.999) ? (((B1[0] - B0[0]) * nrm[0] + (B1[1] - B0[1]) * nrm[1]) * (altInfo.t < 0.5 ? 1 : -1) >= 0 ? 1 : -1) : (((m[0] - C[0]) * nrm[0] + (m[1] - C[1]) * nrm[1]) >= 0 ? 1 : -1);
          s += stx(o.alt.l, m[0] + nrm[0] * sd * 14, m[1] + nrm[1] * sd * 14, { fs: 13, b: 1, c: PINK });
        }
      }
      for (i = 0; i < 3; i++) { var a = P[i], b = P[(i + 1) % 3], isH = o.hl && o.hl.side === i; s += sln(a, b, isH ? o.hl.c : (o.col && o.col[i]) || INK, isH ? 4.5 : 2.6); }
      if (typeof o.right === 'number') { s += rmark(P[o.right], P[(o.right + 1) % 3], P[(o.right + 2) % 3], 12, INK); }
      if (o.arcs) { for (i = 0; i < 3; i++) { if (i !== o.right) { s += arcP(P[i], P[(i + 1) % 3], P[(i + 2) % 3], 17, PINK); } } }
      (o.extra || []).forEach(function (e) { s += sln(S(e.a), S(e.b), e.c || INK, e.w || 2, e.d); });
      (o.dots || []).forEach(function (d) { var q = S(d.p), uu = unit(C, q); s += '<circle cx="' + f2(q[0]) + '" cy="' + f2(q[1]) + '" r="3.5" fill="' + INK + '"/>' + stx(d.n, q[0] + (d.dx === undefined ? uu[0] * 15 : d.dx), q[1] + (d.dy === undefined ? uu[1] * 15 : d.dy), { fs: 14, b: 1 }); if (d.rm) { s += rmark(q, S(d.rm[0]), S(d.rm[1]), 10, INK); } });
      for (i = 0; i < 3; i++) {
        var u = unit(C, P[i]);
        s += stx(names[i], P[i][0] + u[0] * 15, P[i][1] + u[1] * 15, { fs: 14, b: 1 });
        if (o.al && o.al[i]) { var u2 = unit(P[i], C); s += stx(o.al[i], P[i][0] + u2[0] * 34, P[i][1] + u2[1] * 34, { fs: 11.5, b: 1, c: PINK }); }
        if (o.sl && o.sl[i]) {
          var a1 = P[i], b1 = P[(i + 1) % 3], mid = [(a1[0] + b1[0]) / 2, (a1[1] + b1[1]) / 2], dd = unit(a1, b1), nr = [-dd[1], dd[0]], sg = ((mid[0] - C[0]) * nr[0] + (mid[1] - C[1]) * nr[1]) >= 0 ? 1 : -1;
          s += stx(o.sl[i], mid[0] + nr[0] * sg * 14, mid[1] + nr[1] * sg * 14, { fs: 13, b: 1, c: o.slc || INK });
        }
      }
      if (o.hit) { for (i = 0; i < 3; i++) { var hp = P[i], hq = P[(i + 1) % 3]; s += '<line class="hitline" data-s="' + i + '" x1="' + f2(hp[0]) + '" y1="' + f2(hp[1]) + '" x2="' + f2(hq[0]) + '" y2="' + f2(hq[1]) + '" stroke="rgba(0,0,0,0.001)" stroke-width="24" stroke-linecap="round" tabindex="0" role="button" aria-label="ضلع ' + (i + 1) + '"/>'; } }
      return s + '</svg>';
    }
    /* مثلث قائم‌الزاویه با ضلع‌های قائم a و b؛ رأس قائمه روی اندیس r و چرخش دلخواه (هر سه رأس به ترتیب ساعت‌گرد یا پادساعت‌گرد) */
    /* نوار لغزندهٔ بومی با درجه‌بندیِ KaTeX (الگوی فصل اول) — ticks: [{v, t}] */
    function gslider(id, min, max, val, step, ticks, label) {
      var tot = max - min, h = '<div class="g-sl graduated-range" style="--gr-total:' + tot + '">' + (label ? '<div class="lab"><span>' + label + '</span></div>' : '') + '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '" aria-label="' + (label || id) + '"><div class="graduated-ticks">';
      ticks.forEach(function (t) { h += '<span style="--gr-step:' + (t.v - min) + '"><i></i>' + (t.t === undefined ? M(String(t.v)) : t.t) + '</span>'; });
      return h + '</div></div>';
    }

    /* مثلث با زاویه‌های a در رأس 0 و b در رأس 1 (مختصات ریاضی) */
    /* مثلث با ضلع‌های AB=a ، BC=b ، CA=c (مختصات ریاضی) */

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

    /* ---------- تمرین عددیِ مشترک: بنویس، بررسی کن، مسئلهٔ دیگر ---------- */
    /* gen() → {ask, fig, cq, ans, unit, hint, expl()} */
    K.numLab = function (host, gen, o) {
      o = o || {}; var q, done, tries, fbh, val;
      function nw() { q = gen(); done = false; tries = 0; fbh = ''; val = ''; }
      function parseNum(s) {
        s = (s || '').replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 1776; }).replace(/[٠-٩]/g, function (d) { return d.charCodeAt(0) - 1632; }).replace(/[٫,،]/g, '.').replace(/[−–—]/g, '-').replace(/\s/g, '');
        return /^-?\d+(\.\d+)?$/.test(s) ? +s : null;
      }
      function paint() {
        var h = '<p class="ask">' + q.ask + '</p>' + (q.fig || '') + (q.cq ? '<div class="cq">' + q.cq + '</div>' : '');
        h += '<div class="numrow"><input class="numin" data-nosign="1" id="gin" type="text" inputmode="decimal" autocomplete="off" aria-label="پاسخ"' + (done ? ' disabled' : '') + 'placeholder="?"><span class="unit">' + (q.unit || '') + '</span></div>' + fbh;
        if (done) { h += '<div class="ex">' + q.expl() + '</div>'; }
        h += done ? '<div class="opts g-ops"><button type="button" class="btn primary" data-nw="1" data-scroll>مسئلهٔ دیگر</button></div>' : '<div class="opts g-pair"><button type="button" class="btn" data-go="1">بررسی</button><button type="button" class="btn primary" data-nw="1" data-scroll>مسئلهٔ دیگر</button></div>';
        host.innerHTML = rr(h); var inp = host.querySelector('#gin'); inp.value = val;
      }
      function check() {
        var inp = host.querySelector('#gin'), v; val = inp.value; v = parseNum(val);
        if (v === null) { fbh = '<div class="fb bad">یک عدد بنویس (فقط عدد، بدون واحد).</div>'; paint(); host.querySelector('#gin').focus(); return; }
        tries++;
        if (abs(v - q.ans) < 1e-6) { done = true; fbh = '<div class="fb ok">' + (o.ok || '✓ آفرین، درست حل کردی!') + '</div>'; }
        else if (tries >= 2) { done = true; fbh = '<div class="fb bad">پاسخ درست ' + fan(q.ans) + ' است؛ راه‌حل را ببین.</div>'; }
        else { fbh = '<div class="fb bad">' + (q.hint || 'درست نیست؛ دوباره امتحان کن.') + '</div>'; }
        paint(); if (!done) { host.querySelector('#gin').focus(); }
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b || b.disabled) { return; }
        if (b.dataset.go) { check(); } else if (b.dataset.nw) { nw(); paint(); }
      });
      host.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.id === 'gin' && !done) { e.preventDefault(); check(); } });
      nw(); paint();
    };

    /* ---------- آزمایشگاه ۱: رأس را روی خط موازی بلغزان ---------- */
    K.apexLab = function (host) {
      host.innerHTML = rr('<p class="ask">قاعده ' + M('6') + ' و ارتفاع ' + M('4') + ' است:</p><div id="apf"></div>' +
        gslider('apr', -3, 9, 2, 1, [-3, 0, 3, 6, 9].map(function (v) { return { v: v, t: M(String(v)) }; }), 'جای رأس نسبت به نقطهٔ B') +
        '<p class="legend" id="apl" style="margin-top:15px"></p><div class="gval" id="apv" style="gap:6px;align-items:flex-start;direction:ltr"></div>');
      var inp = host.querySelector('#apr');
      function paint() {
        var x = +inp.value, u = 26, B = [98, 188], C = [98 + 6 * u, 188], A = [98 + x * u, 188 - 4 * u], F = [A[0], 188], out = x < 0 || x > 6, edge = x === 0 || x === 6, s = s = sv(360, 220), BL = '#c0c7f0', PK = '#f6d6e2';
        var P = function (a, b, c, col) { return '<polygon points="' + [a, b, c].map(function (p) { return p.join(','); }).join(' ') + '" fill="' + col + '" stroke="none"/>'; };
        var LT = 'direction:ltr;unicode-bidi:isolate;', tx = function (b) { return fa(1) + '/' + fa(2) + ' × ' + fa(b) + ' × ' + fa(4); };
        var cell = function (inner, col, val) { return '<span style="display:inline-flex;flex-direction:column;align-items:center;gap:9px"><i style="' + LT + 'background:' + col + ';padding:3px 8px;font-size:.92rem">' + inner + '</i><b style="' + LT + 'position:relative;padding:6px 10px 2px;border:1.5px solid var(--ink);border-radius:12px;background:' + col + ';font-size:.88rem"><u style="position:absolute;top:-5px;left:50%;margin-left:-4px;width:8px;height:8px;background:' + col + ';border-left:1.5px solid var(--ink);border-top:1.5px solid var(--ink);transform:rotate(45deg)"></u>= ' + fa(val) + '</b></span>'; };
        var op = function (c) { return '<span style="align-self:flex-start;line-height:44px">' + c + '</span>'; };
        var b1 = x > 6 ? x : 6 - x, b2 = x > 6 ? x - 6 : -x, lx = x < 0 ? -14 : x > 6 ? 14 : (x < 3 ? 14 : -14);
        s += '<line x1="6" y1="' + A[1] + '" x2="354" y2="' + A[1] + '" stroke="#9aa9c0" stroke-width="1.5" stroke-dasharray="2 5"/>';
        s += edge ? P(A, B, C, BL) : !out ? P(A, B, F, BL) + P(A, F, C, PK) : x > 6 ? P(A, B, F, BL) + P(A, C, F, PK) : P(A, C, F, BL) + P(A, B, F, PK);
        if (out) { s += sln(x < 0 ? B : C, F, INK, 1.8, 1); }
        s += sln(A, F, PINK, 2.4, 1) + rmark(F, A, x < 0 ? B : (x > 6 ? C : C), 10, INK);
        s += sln(A, B, INK, 3) + sln(B, C, TEAL, 5) + sln(A, C, INK, 3);
        s += '<circle cx="' + A[0] + '" cy="' + A[1] + '" r="5" fill="' + INK + '"/>' + stx('B', B[0] - 14, B[1] + 20, { b: 1, fs: 14 }) + stx('C', C[0] + 14, C[1] + 20, { b: 1, fs: 14 }) + stx('A', A[0], A[1] - 14, { b: 1, fs: 14 });
        s += stx(fa(6), (B[0] + C[0]) / 2, 208, { fs: 13, b: 1, c: TEAL }) + stx(fa(4), A[0] + lx, (A[1] + 188) / 2, { fs: 13, b: 1, c: PINK });
        host.querySelector('#apf').innerHTML = s + '</svg>';
        host.querySelector('#apv').innerHTML = edge ? cell(tx(6), BL, 12) : !out ? cell(tx(x), BL, 2 * x) + op('+') + cell(tx(6 - x), PK, 2 * (6 - x)) + op('=') + cell(fa(2 * x) + ' + ' + fa(2 * (6 - x)), 'var(--mark)', 12) : cell(tx(b1), 'linear-gradient(135deg,' + BL + ' 50%,' + PK + ' 50%)', 2 * b1) + op('\u2212') + cell(tx(b2), PK, 2 * b2) + op('=') + cell(fa(2 * b1) + ' \u2212 ' + fa(2 * b2), BL, 12);
        host.querySelector('#apl').innerHTML = edge ? 'رأس بالای یکی از دو سرِ قاعده است؛ مثلث قائم‌الزاویه شد و مساحتش باز هم ' + fa(12) + ' است.' : !out ? 'ارتفاع، مثلث را به دو مثلثِ قائم‌الزاویه تقسیم کرده. مساحتِ هر کدام نصفِ «قاعده × ارتفاعِ» خودش است (کادرهای پایین) و جمعشان ' + fa(12) + ' می‌شود.' : 'پای ارتفاع <b>بیرون از قاعده</b> افتاد؛ پس مثلثِ ما «باقی‌مانده» است. مثلثِ بزرگ (آبی + صورتی) را در نظر بگیر و تکهٔ صورتیِ اضافه را کم کن. آنچه می‌ماند همان مثلثِ آبیِ ماست، و مساحتش باز هم ' + fa(12) + ' است.';
      }
      inp.addEventListener('input', paint); paint();
    };
    /* ---------- آزمایشگاه ۰: چرا نصف؟ ---------- */
    K.halfLab = function (host) {
      host.innerHTML = rr('<p class="ask">لغزنده را به راست ببر تا دو قطعهٔ آبی بچرخند:</p><div id="hff"></div>' +
        gslider('hfr', 0, 180, 0, 5, [0, 90, 180].map(function (v) {
          return { v: v, t: M(v + '^\\circ') };
        }), 'چرخشِ قطعه‌های آبی') +
        '<p class="legend" id="hfl" style="margin-top:15px"></p><div class="gval" id="hfv"></div>');
      var inp = host.querySelector('#hfr');
      function paint() {
        var a = +inp.value, done = a === 180, s = sv(360, 220);
        s += '<rect x="98" y="84" width="156" height="104" fill="none" stroke="' + INK + '" stroke-width="2.5"/>';
        s += '<polygon points="98,188 254,188 150,84" fill="rgba(214,69,122,.30)" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/>';
        s += sln([150, 84], [150, 188], PINK, 2.2, 1);
        s += '<polygon points="98,188 98,84 150,84" transform="rotate(' + a + ' 124 136)" fill="rgba(76,95,213,.35)" stroke="' + BLUE + '" stroke-width="2"/>';
        s += '<polygon points="254,188 254,84 150,84" transform="rotate(' + a + ' 202 136)" fill="rgba(76,95,213,.35)" stroke="' + BLUE + '" stroke-width="2"/>';
        s += stx(fa(6), 176, 208, { fs: 12, b: 1, c: TEAL }) + stx(fa(4), 142, 136, { fs: 12, b: 1, c: PINK, a: 'end' });
        host.querySelector('#hff').innerHTML = s + '</svg>';
        host.querySelector('#hfv').innerHTML = done ? '<i class="y">' + fa(24) + ' ÷ ' + fa(2) + ' = ' + fa(12) + '</i>' : '';
        host.querySelector('#hfl').innerHTML = done ? 'هر قطعهٔ آبی دقیقاً روی نیمهٔ صورتیِ کنار خودش نشست؛ پس <b>مثلث نصفِ مستطیل است</b>.' : 'دو قطعهٔ آبی بیرونِ مثلث‌اند. بچرخانشان و ببین کجا می‌نشینند.';
      }
      inp.addEventListener('input', paint); paint();
    };
    /* ---------- آزمایشگاه ۲: قاعده را انتخاب کن ---------- */
    K.baseLab = function (host) {
      var s = 0, P = [[0, 6], [0, 0], [8, 0]], HT = [8, 6, 4.8], LN = [6, 8, 10], NM = ['AB', 'BC', 'CA'];
      host.innerHTML = rr('<p class="ask">یک ضلع را قاعده انتخاب کن؛ ارتفاعِ مربوط و مساحت را ببین:</p><div class="chips" id="bsc"></div><div id="bsf"></div><div class="gval" id="bsv"></div><p class="legend" id="bsl"></p>');
      function paint() {
        var from = (s + 2) % 3, h = HT[s], l = LN[s], sl = ['', '', ''];
        host.querySelector('#bsc').innerHTML = [0, 1, 2].map(function (i) { return '<button type="button" class="chip' + (i === s ? ' on' : '') + '" data-s="' + i + '">' + NM[i] + '</button>'; }).join('');
        sl[s] = fa(l);
        host.querySelector('#bsf').innerHTML = triSVG({ pts: P, names: ['A', 'B', 'C'], right: s === 1 ? null : 1, hl: { side: s, c: TEAL }, alt: { from: from, base: s, c: PINK, l: fan(h) }, sl: sl, slc: TEAL, W: 300, H: 210 });
        host.querySelector('#bsv').innerHTML = '<i class="g">قاعده: ' + fa(l) + '</i><i class="p">ارتفاع: ' + fan(h) + '</i><i class="y">' + fa(1) + '/' + fa(2) + ' × ' + fa(l) + ' × ' + fan(h) + ' = ' + fa(24) + '</i>';
        host.querySelector('#bsl').innerHTML = 'ارتفاعِ مربوط به قاعدهٔ ' + NM[s] + '، پاره‌خطی است از رأسِ روبه‌رو که بر این قاعده عمود می‌شود. با هر سه قاعده مساحت یکی می‌شود: ' + fa(24) + '.';
      }
      host.addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (!b) { return; } s = +b.dataset.s; paint(); });
      paint();
    };
    /* ---------- مسئله‌های کامل ---------- */
    var EX = [
      { title: 'مثال اول: مثلث تند', q: 'قاعده ' + M('6') + ' و ارتفاع ' + M('4') + ':', lines: ['S=\\dfrac{1}{2}\\times6\\times4=12'], note: 'پس مساحت ' + M('12') + ' است.' },
      { title: 'مثال دوم: ارتفاع روی امتداد', q: 'قاعدهٔ ' + M('BC=6') + ' است و ارتفاعِ ' + M('AD=4') + ' روی امتدادِ ' + M('BC') + ' فرود آمده (مثل شکل بخش ۳). ضلعِ کج، ' + M('AB=5') + '، ارتفاع نیست:', lines: ['S=\\dfrac{1}{2}\\times6\\times4=12'], note: 'فقط پاره‌خطِ عمود بر قاعده ارتفاع است؛ ' + M('5') + ' در فرمول نمی‌آید.' },
      { title: 'مثال سوم: ارتفاع نامعلوم', q: 'مساحت مثلثی ' + M('20') + ' و قاعده‌اش ' + M('5') + ' است. برای یافتن ارتفاع داریم:', lines: ['20=\\dfrac{1}{2}\\times5\\times h', 'h=\\dfrac{20\\times2}{5}=8'], note: 'پس ارتفاع ' + M('8') + ' است.' }
    ];
    /* ---------- ساخت شکل ---------- */
    function areaFig(kind, d) {
      var pts, o = { names: ['A', 'B', 'C'], W: 300, H: 200, slc: BLUE };
      if (kind === 'right') { pts = [[0, d.a], [0, 0], [d.b, 0]]; o.right = 1; o.sl = [fa(d.a), fa(d.b), d.c ? fa(d.c) : '']; }
      else if (kind === 'obt') { pts = [[-d.t, d.h], [0, 0], [d.b, 0]]; o.sl = ['', fa(d.b), '']; o.alt = { from: 0, base: 1, c: PINK, l: fa(d.h) }; }
      else { pts = [[d.px, d.h], [0, 0], [d.b, 0]]; o.sl = [d.slant ? fa(d.slant) : '', fa(d.b), '']; o.alt = { from: 0, base: 1, c: PINK, l: fa(d.h) }; }
      o.pts = pts; return '<div class="figs one"><figure>' + triSVG(o) + '</figure></div>';
    }
    function areaData() {
      var k = R(0, 2), d = {}, t;
      if (k === 0) { d.b = pick([6, 8, 10, 12]); d.h = pick([3, 4, 5, 6]); d.px = R(1, d.b - 1); if (R(0, 1)) { d.px = 3; d.h = 4; d.slant = 5; d.b = pick([8, 10, 12]); } d.area = d.b * d.h / 2; d.kind = 'acute'; }
      else if (k === 1) { t = pick([[6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [3, 4, 5], [6, 8, 10]]); d.a = t[0]; d.b = t[1]; d.c = t[2]; if (R(0, 1)) { var z = d.a; d.a = d.b; d.b = z; } d.area = d.a * d.b / 2; d.kind = 'right'; }
      else { d.b = pick([4, 6, 8]); d.h = pick([3, 4, 5]); d.t = pick([2, 3]); d.area = d.b * d.h / 2; d.kind = 'obt'; }
      return d;
    }
    function areaExpl(d) {
      if (d.kind === 'right') { return '<p>در مثلث قائم‌الزاویه، دو ضلع قائم بر هم عمودند؛ یکی قاعده و دیگری ارتفاع است. وتر نقشی ندارد:</p>' + K.dm('S=\\dfrac{1}{2}\\times' + d.a + '\\times' + d.b + '=' + d.area); }
      return '<p>مساحت = نصفِ قاعده ضرب در ارتفاع. قاعده ' + M(String(d.b)) + ' و ارتفاعِ عمود بر آن ' + M(String(d.h)) + ' است' + (d.kind === 'obt' ? ' (ارتفاع روی امتداد قاعده فرود آمده)' : '') + (d.slant ? '؛ ضلع کج ' + M(String(d.slant)) + ' ارتفاع نیست' : '') + ':</p>' + K.dm('S=\\dfrac{1}{2}\\times' + d.b + '\\times' + d.h + '=' + d.area);
    }
    function genAR() {
      var d = areaData();
      return { ask: d.kind === 'right' ? 'مساحت مثلث قائم‌الزاویهٔ زیر را بر حسب سانتی‌متر مربع بنویس (فقط عدد).' : 'مساحت مثلث ABC را با قاعدهٔ BC بر حسب سانتی‌متر مربع بنویس (فقط عدد). اندازه‌ها بر حسب سانتی‌متر است.', fig: areaFig(d.kind === 'right' ? 'right' : d.kind === 'obt' ? 'obt' : 'acute', d), ans: d.area, unit: 'سانتی‌متر مربع', hint: 'مساحت مثلث = نصفِ قاعده ضرب در ارتفاع. ارتفاع بر قاعده عمود است؛ ضلع کج را به‌جای آن نگذار و «نصف» را فراموش نکن.', expl: function () { return areaExpl(d); } };
    }
    /* ================= تولید سؤال ================= */
    function genE1() {
      var d = areaData(), w = [{ v: d.kind === 'right' ? d.a * d.b : d.b * d.h, m: 'این حاصل‌ضرب قاعده و ارتفاع است؛ مساحت مثلث نصفِ آن است.' }];
      if (d.kind === 'right') { w.push({ v: d.a + d.b, m: 'مساحت جمع نیست؛ نصفِ حاصل‌ضرب دو ضلع قائم است.' }, { v: d.a * d.c / 2, m: 'وتر قاعده و ارتفاع نیست؛ دو ضلع قائم قاعده و ارتفاع‌اند.' }, { v: d.a * d.b / 4, m: 'یک بار نصف کن، نه دو بار.' }); }
      else { w.push({ v: d.b + d.h, m: 'مساحت جمع نیست؛ نصفِ حاصل‌ضرب قاعده و ارتفاع است.' }, { v: d.b * d.h / 4, m: 'یک بار نصف کن، نه دو بار.' }); if (d.slant) { w.push({ v: d.b * d.slant / 2, m: 'ضلع کج ارتفاع نیست؛ ارتفاع بر قاعده عمود است.' }); } else { w.push({ v: d.b * d.h / 2 + d.h, m: 'فرمول فقط نصفِ قاعده ضرب در ارتفاع است.' }); } }
      return { ask: d.kind === 'right' ? 'مساحت مثلث قائم‌الزاویهٔ زیر چند سانتی‌متر مربع است؟' : 'مساحت مثلث ABC را با قاعدهٔ BC بر حسب سانتی‌متر مربع بنویس. ' + (d.kind === 'obt' ? '<small>(ارتفاع از رأس A بر امتداد BC فرود آمده است.)</small>' : ''), fig: areaFig(d.kind, d), cq: '', cls: 'm2', opts: numO(d.area, w), expl: function () { return areaExpl(d); } };
    }
    function genE2() {
      var obt = R(0, 1), b = pick([6, 8, 10]), h = pick([4, 5, 6]), px = obt ? -pick([2, 3]) : pick([2, 3, 4]), ex = obt ? pick([2, 3]) : (px >= b / 2 ? 1 : b - 1), pts = [[px, h], [0, 0], [b, 0]];
      var extra = [{ a: [px, h], b: [px, 0], c: PINK, d: 1, w: 2.2 }, { a: [px, h], b: [ex, 0], c: BLUE, d: 1, w: 2.2 }];
      if (obt) { extra.push({ a: [0, 0], b: [px, 0], c: INK, d: 1, w: 1.8 }); }
      var D = { p: [px, 0], n: 'D', dx: 0, dy: 17, rm: [[px, h], [obt ? 0 : b, 0]] }, E = { p: [ex, 0], n: 'E', dx: 0, dy: 17 };
      return {
        ask: 'در مثلث ABC قاعدهٔ BC افقی است. کدام پاره‌خط، ارتفاع مثلث نسبت به قاعدهٔ BC است؟', fig: '<div class="figs one"><figure>' + triSVG({ pts: pts, names: ['A', 'B', 'C'], extra: extra, dots: [D, E], W: 300, H: 200 }) + '</figure></div>', cq: '', cls: 'm2',
        opts: mkO({ t: M('AD') }, [{ t: M('AE'), m: 'AE به قاعده می‌رسد ولی بر آن عمود نیست؛ ارتفاع باید زاویهٔ قائمه بسازد.' }, { t: M('AB'), m: 'AB یک ضلع مثلث است و بر BC عمود نیست.' }, { t: M('AC'), m: 'AC یک ضلع مثلث است و بر BC عمود نیست.' }], true),
        expl: function () { return '<p>ارتفاع از رأس ' + M('A') + ' بر قاعده (یا امتداد آن) عمود می‌شود؛ علامتِ قائمه در ' + M('D') + ' است' + (obt ? ' و پای ارتفاع روی امتدادِ ' + M('BC') + ' افتاده' : '') + '. پس ارتفاع ' + M('AD') + ' است.</p>'; }
      };
    }
    function genE3() {
      var d = areaData(); if (d.kind === 'acute') { d.kind = 'obt'; d.t = pick([2, 3]); d.slant = 0; }
      var ok = d.area, w = d.kind === 'right' ? [{ v: d.a * d.b, m: 'نصف را فراموش کرده‌ای.' }, { v: d.a + d.b, m: 'مساحت، جمع دو ضلع نیست.' }, { v: d.a * d.c / 2, m: 'وتر نباید در فرمول بیاید؛ قاعده و ارتفاع دو ضلع قائم‌اند.' }] : [{ v: d.b * d.h, m: 'نصف را فراموش کرده‌ای.' }, { v: d.b + d.h, m: 'مساحت، جمع نیست.' }, { v: d.b * d.h / 2 + d.t, m: 'فاصلهٔ پای ارتفاع تا قاعده در فرمول نمی‌آید.' }];
      return { ask: d.kind === 'right' ? 'مساحت مثلث قائم‌الزاویهٔ زیر چند سانتی‌متر مربع است؟' : 'مساحت مثلث ABC را با قاعدهٔ BC بر حسب سانتی‌متر مربع بنویس. <small>(ارتفاع از رأس A بر امتداد BC فرود آمده است.)</small>', fig: areaFig(d.kind, d), cq: '', cls: 'm2', opts: numO(ok, w), expl: function () { return areaExpl(d); } };
    }
    var TFP = [
      { h: 'مساحت مثلث برابر است با نصفِ حاصل‌ضربِ قاعده در ارتفاع.', ok: 1, e: '<p>' + M('S=\\dfrac{1}{2}\\times a\\times h') + ' که ' + M('a') + ' قاعده و ' + M('h') + ' ارتفاع است.</p>' },
      { h: 'مساحت مثلث برابر است با قاعده ضرب در ارتفاع.', ok: 0, e: '<p>قاعده ضرب در ارتفاع مساحتِ مستطیل (یا متوازی‌الاضلاع) است؛ مثلث نصفِ آن است.</p>' },
      { h: 'ارتفاع مثلث بر قاعده عمود است.', ok: 1, e: '<p>ارتفاع با قاعده (یا امتدادش) زاویهٔ ' + M('90^\\circ') + ' می‌سازد.</p>' },
      { h: 'ارتفاع مثلث همیشه داخل مثلث قرار می‌گیرد.', ok: 0, e: '<p>در مثلث منفرجه ارتفاعِ دو رأس روی امتداد ضلع‌ها و بیرون مثلث می‌افتد.</p>' },
      { h: 'مثلثی با قاعدهٔ ' + M('6') + ' و ارتفاع ' + M('4') + ' مساحتی برابر ' + M('12') + ' دارد.', ok: 1, e: '<p>' + M('\\dfrac{1}{2}\\times6\\times4=12') + '.</p>' },
      { h: 'در مثلث قائم‌الزاویه، دو ضلع قائم می‌توانند قاعده و ارتفاع باشند.', ok: 1, e: '<p>این دو ضلع بر هم عمودند؛ پس یکی ارتفاعِ دیگری است.</p>' },
      { h: 'برای مساحت مثلث می‌توان ضلعِ کج را به‌جای ارتفاع به کار برد.', ok: 0, e: '<p>ضلع کج بر قاعده عمود نیست؛ باید ارتفاعِ عمود را به کار ببری.</p>' },
      { h: 'مساحت را بر حسب سانتی‌متر می‌نویسیم.', ok: 0, e: '<p>مساحت بر حسب سانتی‌متر مربع (' + M('\\text{cm}^2') + ') است؛ سانتی‌متر واحد طول است.</p>' },
      { h: 'هر ضلع مثلث را می‌توان قاعده گرفت؛ هر بار ارتفاعِ مربوط به همان ضلع را به کار می‌بریم.', ok: 1, e: '<p>با هر قاعده، مساحت همان عدد می‌شود.</p>' },
      { h: 'اگر رأس بالایی را روی خطی موازی قاعده جاب ه‌جا کنیم، مساحتِ مثلث عوض می‌شود.', ok: 0, e: '<p>قاعده و ارتفاع ثابت می‌مانند؛ پس مساحت هم ثابت است.</p>' },
      { h: 'در مثلث قائم‌الزاویه با ضلع‌های قائم ' + M('6') + ' و ' + M('8') + ' ، مساحت ' + M('24') + ' است.', ok: 1, e: '<p>' + M('\\dfrac{1}{2}\\times6\\times8=24') + '.</p>' },
      { h: 'در مثلث قائم‌الزاویه مساحت از نصفِ حاصل‌ضربِ وتر در یک ضلع قائم به دست می‌آید.', ok: 0, e: '<p>وتر بر ضلع قائم عمود نیست؛ باید دو ضلع قائم را به کار ببری.</p>' }
    ];
    return {
      html: function () {
        var rect = (function () {
          var s = sv(300, 170);
          s += '<rect x="40" y="30" width="220" height="110" fill="rgba(76,95,213,.10)" stroke="' + INK + '" stroke-width="2.5"/>';
          s += '<polygon points="40,140 40,30 120,30" fill="rgba(76,95,213,.30)"/><polygon points="260,140 260,30 120,30" fill="rgba(76,95,213,.30)"/>';
          s += '<polygon points="40,140 260,140 120,30" fill="rgba(214,69,122,.30)" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/>' + sln([120, 30], [120, 140], PINK, 2.2, 1) + rmark([120, 140], [120, 30], [260, 140], 10, INK) + stx(fa(6) + ' (قاعده)', 150, 158, { fs: 12, b: 1 }) + stx(fa(4), 108, 85, { fs: 12, b: 1, c: PINK, a: 'end' });
          return s + '</svg>';
        })();
        return [
          K.sn('۱', 'مساحت مثلث: نصفِ مستطیل'),
          '<p>مستطیلی به عرض ' + M('6') + ' و ارتفاع ' + M('4') + ' مساحتش ' + M('24') + ' است (قاعده × ارتفاع). مثلثِ صورتی همان قاعده را دارد و رأسش روی ضلعِ بالای مستطیل است. چقدر از مستطیل را می‌پوشاند؟</p><div class="cover g-act" id="hf" style="animation:none"></div>',
          '<p>دلیلش این است که ارتفاعِ مثلث، مستطیل را به دو مستطیلِ کوچک‌تر می‌شکند و ضلع‌های مثلث قطرِ هر دو مستطیل‌اند؛ هر قطر، مستطیل را به دو نیمهٔ برابر تقسیم می‌کند. پس مساحتِ مثلث، نصفِ <b>قاعده × ارتفاع</b> است.</p>',
          K.box('note', 'مساحت مثلث', '<p>مساحت = نصفِ قاعده ضرب در ارتفاع</p>' + K.dm('S=\\dfrac{1}{2}\\times b\\times h')),
          '<p>شکلِ بالا فقط وقتی کار می‌کرد که رأس بالای قاعده بود. حالا بپرس: اگر رأس جابه‌جا شود، یا حتی از بالای قاعده بیرون بزند، مساحت عوض می‌شود؟ رأس را بلغزان و مساحت را زیر نظر بگیر:</p><div class="cover g-act" id="ap" style="animation:none"></div>',
          '<p><b>نتیجه:</b> مساحت فقط به قاعده و ارتفاع بستگی دارد، نه به جای رأس یا شکلِ مثلث. برای همین در فرمول فقط ' + M('b') + ' و ' + M('h') + ' آمده است.</p>',

          K.sn('۲', 'ارتفاع کدام است؟'),
          '<p>«ارتفاع»، پاره‌خطی است که از یک رأس بر ضلعِ روبه‌رو (یا امتدادِ آن) عمود می‌شود. قاعده را خودت انتخاب می‌کنی، اما ارتفاع باید همان قاعده را هدف بگیرد: هر قاعدهٔ تازه، ارتفاعِ تازه. با هر سه قاعده، یک مثلث قائم‌الزاویه را امتحان کن و ببین مساحت تغییر نمی‌کند:</p><div class="cover g-act" id="bs" style="animation:none"></div>',
          K.box('err', '⚠ خطای رایج: ضلعِ کج را ارتفاع گرفتن', '<p>اگر مثلث کج است، ضلع‌های کج ارتفاع نیستند. ارتفاع همیشه بر قاعده <b>عمود</b> است و علامت قائمه دارد.</p>'),

          K.sn('۳', 'وقتی ارتفاع بیرون می‌افتد'),
          '<p>در مثلثی که یک زاویهٔ باز دارد، اگر قاعده را ضلعِ کنارِ آن زاویه بگیری، ارتفاع بیرون از مثلث و روی امتدادِ قاعده فرود می‌آید. فرمول عوض نمی‌شود؛ فقط قاعده و ارتفاع را درست بخوان:</p>', fig1(triSVG({ pts: [[-3, 4], [0, 0], [6, 0]], names: ['A', 'B', 'C'], alt: { from: 0, base: 1, c: PINK, l: fa(4) }, sl: ['', fa(6), ''], slc: TEAL, dots: [{ p: [-3, 0], n: 'D', dx: 0, dy: 17 }], W: 300, H: 190 }), 'قاعدهٔ BC برابر ' + '۶' + ' و ارتفاعِ AD برابر ' + '۴'),
          K.dm('S=\\dfrac{1}{2}\\times6\\times4=12'),

          K.sn('۴', 'مثلث قائم‌الزاویه'),
          '<p>در مثلث قائم‌الزاویه دو ضلع قائم بر هم عمودند؛ پس هر کدام ارتفاعِ دیگری است. لازم نیست ارتفاع جداگانه بکشی:</p>', K.dm('S=\\dfrac{1}{2}\\times6\\times8=24'),
          K.box('note', 'وتر را به کار نبر', '<p>در مثلث قائم‌الزاویه، قاعده و ارتفاعِ ساده دو ضلع قائم‌اند؛ وتر برای مساحت لازم نیست.</p>'),

          K.sn('۵', 'مسئله‌های کامل'),
          K.exampleSteps.html('g05-ex', EX, 'حل کامل مثال‌ها'),
          '<p>خودت حل کن؛ هر بار شکل و عددها تازه‌اند:</p><div class="cover g-act" id="ar" style="animation:none"></div>',

          K.sn('۶', 'کارت مرجع'),
          refs([{ c: 'r1', t: 'مساحت مثلث', r: 'نصفِ قاعده ضرب در ارتفاع.', e: 'S=\\dfrac{1}{2}bh' }, { c: 'r2', t: 'ارتفاع', r: 'از رأس بر قاعده (یا امتدادش) عمود.', e: 'h\\perp b' }, { c: 'r3', t: 'ضلع کج', r: 'ارتفاع نیست.', e: 'AB\\ne h' }, { c: 'r4', t: 'قائم‌الزاویه', r: 'دو ضلع قائم، قاعده و ارتفاع‌اند.', e: 'S=\\dfrac{1}{2}ab' }, { c: 'r1', t: 'ارتفاع بیرونی', r: 'روی امتداد قاعده؛ فرمول همان است.', e: 'S=\\dfrac{1}{2}\\times6\\times4' }, { c: 'r3', t: 'واحد', r: 'مساحت بر حسب مربع.', e: '\\text{cm}^2' }]),

          K.sn('۷', 'مساحت‌یاب'),
          '<p>هر مرحله دو سؤال دارد. بعد از هر پاسخ، دلیلش را می‌بینی.</p><div class="cover g-act" id="ss" style="animation:none"></div>',
          K.sn('۸', 'درست یا نادرست؟'),
          '<p>شش جمله را بسنج. به تله‌ها دقت کن.</p><div class="cover g-act" id="tf" style="animation:none"></div>',
          K.sn('۹', 'تمرین پایانی'),
          '<p>پنج سؤال با شکل‌ها و عددهای تصادفی. هر بار که دوباره شروع کنی، سؤال‌ها فرق می‌کنند.</p><div class="cover g-act" id="fn" style="animation:none"></div>',
          K.box('sum', 'بعد از این درس باید بتوانی', '<ul><li>مساحت مثلث را با «' + M('\\frac{1}{2}') + M('\\times') + M('\\text{\u202Bقاعده\u202C}') + M('\\times') + M('\\text{\u202Bارتفاع\u202C}') + '» حساب کنی و واحدش را مربع بنویسی.</li><li>ارتفاعِ مربوط به یک قاعده را از میان پاره‌خط‌ها تشخیص بدهی، حتی وقتی بیرون از مثلث و روی امتداد قاعده است.</li><li>بدانی ضلعِ کج به‌جای ارتفاع به کار نمی‌رود.</li><li>در مثلث قائم‌الزاویه، دو ضلع قائم را قاعده و ارتفاع بگیری.</li></ul>')
        ].join('');
      },
      init: function (panel) {
        K.halfLab(panel.querySelector('#hf')); K.apexLab(panel.querySelector('#ap')); K.exampleSteps.bind('g05-ex', EX);
        K.baseLab(panel.querySelector('#bs'));
        K.numLab(panel.querySelector('#ar'), genAR);
        var GS = [genE1, genE2, genE3];
        H.stages(panel.querySelector('#ss'), {
          names: ['محاسبهٔ مساحت', 'شناختن ارتفاع', 'قائمه و ارتفاع بیرونی'],
          make: function (si) { var q = GS[si](); return { ask: q.ask, fig: q.fig, cq: q.cq, cont: 'mc ' + (q.cls || 'm2'), opts: q.opts, expl: q.expl }; }
        });
        H.tf(panel.querySelector('#tf'), TFP);
        H.final(panel.querySelector('#fn'), [genE1, genE2, genE1, genE3, genE3]);
      }
    };

  }
};
