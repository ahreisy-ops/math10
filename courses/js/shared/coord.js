/* coord.js — ابزارهای مشترک فصل ۴ (مختصات): صفحهٔ مختصات SVG، جدول داده، پروب لمسی و آزمون سؤال‌به‌سؤال.
   استفاده:  var C = K0.cd(K);  (K = ابزارِ محلیِ درس) ؛ ماژول 'coord' در core.js ثبت شده و به 'kit' وابسته است. استایل‌ها در css/ch4.css هستند. */
(function () {
  'use strict';
  var K0 = window.CourseKit, ML = window.MathLite, fa = ML.fa;
  var INK = '#14213d', TEAL = '#0e8f7e', PINK = '#d6457a', BLUE = '#4c5fd5', YEL = '#ffc233', RED = '#c62f2f', GREEN = '#2e9d4f', GREY = '#5a6a85';
  var QF = { 1: '#d6f0ec', 2: '#e1e6fb', 3: '#fbdfe9', 4: '#fff0b8' }, QC = { 1: TEAL, 2: BLUE, 3: PINK, 4: '#c98a00' };
  var QN = ['', 'اول', 'دوم', 'سوم', 'چهارم'];

  K0.cd = function (K) {
    var H = K0.lk(K), rr = H.rr, M = H.M, R = H.R, fb = H.fb, pick = H.pick, shuffle = H.shuffle, sample = H.sample;
    var uid = 0;
    var C = { H: H, INK: INK, TEAL: TEAL, PINK: PINK, BLUE: BLUE, YEL: YEL, RED: RED, GREEN: GREEN, QN: QN, QF: QF, QC: QC };

    /* ---------- نوشتن عددها و زوج‌مرتب‌ها ---------- */
    C.sg = function (n) { return (n < 0 ? '\u2212' : '') + fa(Math.abs(n)); };                    /* متن ساده با منفی درست */
    C.bd = function (s) { return '<bdi dir="ltr">' + s + '</bdi>'; };
    C.num = function (n) { return '$' + n + '$'; };
    C.pair = function (x, y) { return '(' + x + ',\\,' + y + ')'; };                             /* TeX */
    C.pt = function (x, y) { return typeof x === 'number' && typeof y === 'number' ? C.bd('(' + C.sg(x) + '\u060C ' + C.sg(y) + ')') : M(C.pair(x, y)); };                                          /* زوج مرتب با KaTeX */
    C.pairTxt = function (x, y) { return '\u2066(' + C.sg(x) + '\u060C ' + C.sg(y) + ')\u2069'; };  /* متن ساده داخل SVG */
    C.quad = function (x, y) { return x > 0 && y > 0 ? 1 : x < 0 && y > 0 ? 2 : x < 0 && y < 0 ? 3 : x > 0 && y < 0 ? 4 : 0; };
    C.where = function (x, y) {                                                                   /* توضیح محل نقطه */
      var q = C.quad(x, y);
      return q ? 'ناحیهٔ ' + QN[q] : (x === 0 && y === 0 ? 'مبدأ مختصات' : y === 0 ? 'روی محور x' : 'روی محور y');
    };
    C.pill = function (txt, q) { return '<span class="cd-pill q' + q + '">' + txt + '</span>'; };
    C.signs = function (x, y) { return C.bd('( ' + (x < 0 ? '\u2212' : x > 0 ? '+' : '0') + ' \u060C ' + (y < 0 ? '\u2212' : y > 0 ? '+' : '0') + ' )'); };
    C.dots = function (res, cur, n) { var h = '', k; n = n || res.length; for (k = 0; k < n; k++) { h += '<i class="' + (res[k] === undefined ? (k === cur ? 'cu' : '') : res[k] ? 'ok' : 'no') + '"></i>'; } return '<div class="lk-dots">' + h + '</div>'; };

    /* ---------- صفحهٔ مختصات ----------
       o: x0,x1,y0,y1,cell · shade:{1:fill,...} · qn:true (شمارهٔ ناحیه‌ها) · ccw:true (پیکان خلاف ساعت) · part:'x'|'y'|'o'|'q1'.. (برجسته‌کردن بخش)
          pts:[{x,y,l,c,r,ring,pair,hollow}] · line:[[x,y],...] · seg:[{a,b,c,w,dash}] · guides:[{x,y,vc,hc,vl,hl}]
          pick:true (نقطه‌های شبکه کلیک‌پذیر) · quads:true (چهار ناحیه کلیک‌پذیر) · sel:[x,y] · xt,yt (نام محورها) · lab (هر چند عدد یک برچسب) */
    C.plane = function (o) {
      var c = o.cell || 30, x0 = o.x0 === undefined ? -5 : o.x0, x1 = o.x1 === undefined ? 5 : o.x1, y0 = o.y0 === undefined ? -4 : o.y0, y1 = o.y1 === undefined ? 4 : o.y1;
      var pL = 30, pR = 36, pT = o.yt ? 34 : 30, pB = o.xt ? 44 : 26, W = (x1 - x0) * c + pL + pR, Ht = (y1 - y0) * c + pT + pB, id = 'cdm' + (++uid), lab = o.lab || 1, i, s, p, q;
      var px = function (x) { return pL + (x - x0) * c; }, py = function (y) { return pT + (y1 - y) * c; };
      var F = 'font-family="inherit"';
      s = '<svg class="cd-pl" viewBox="0 0 ' + W + ' ' + Ht + '" width="' + W + '" style="width:' + W + 'px" role="img" aria-label="صفحهٔ مختصات"><defs><marker id="' + id + 'a" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="' + PINK + '"/></marker></defs>';
      /* رنگ ناحیه‌ها */
      if (o.shade) {
        [1, 2, 3, 4].forEach(function (k) {
          if (!o.shade[k]) { return; }
          var xa = k === 1 || k === 4 ? px(0) : px(x0), xb = k === 1 || k === 4 ? px(x1) : px(0), ya = k <= 2 ? py(y1) : py(0), yb = k <= 2 ? py(0) : py(y0);
          s += '<rect x="' + xa + '" y="' + ya + '" width="' + (xb - xa) + '" height="' + (yb - ya) + '" fill="' + o.shade[k] + '"/>';
        });
      }
      if (o.part && /^q[1-4]$/.test(o.part)) {
        var k0 = +o.part.charAt(1), xa0 = k0 === 1 || k0 === 4 ? px(0) : px(x0), xb0 = k0 === 1 || k0 === 4 ? px(x1) : px(0), ya0 = k0 <= 2 ? py(y1) : py(0), yb0 = k0 <= 2 ? py(0) : py(y0);
        s += '<rect x="' + xa0 + '" y="' + ya0 + '" width="' + (xb0 - xa0) + '" height="' + (yb0 - ya0) + '" fill="' + QF[k0] + '" stroke="' + QC[k0] + '" stroke-width="3" stroke-dasharray="7 4"/>';
      }
      if (!o.bare) {
        for (i = x0; i <= x1; i++) { s += '<line x1="' + px(i) + '" y1="' + py(y1) + '" x2="' + px(i) + '" y2="' + py(y0) + '" stroke="#d5dde8" stroke-width="1"/>'; }
        for (i = y0; i <= y1; i++) { s += '<line x1="' + px(x0) + '" y1="' + py(i) + '" x2="' + px(x1) + '" y2="' + py(i) + '" stroke="#d5dde8" stroke-width="1"/>'; }
      } else { for (i = x0; i <= x1; i++) { s += '<line x1="' + px(i) + '" y1="' + (py(0) - 6) + '" x2="' + px(i) + '" y2="' + (py(0) + 6) + '" stroke="' + INK + '" stroke-width="1.6"/>'; } }
      /* شمارهٔ ناحیه‌ها */
      if (o.qn) {
        [[1, 1.4, 1.4], [2, -1.4, 1.4], [3, -1.4, -1.4], [4, 1.4, -1.4]].forEach(function (a) {
          s += '<circle cx="' + px(a[1]) + '" cy="' + py(a[2]) + '" r="' + (c * 0.5) + '" fill="#fff" fill-opacity=".85" stroke="' + QC[a[0]] + '" stroke-width="2"/><text x="' + px(a[1]) + '" y="' + (py(a[2]) + 6) + '" text-anchor="middle" font-size="17" font-weight="700" fill="' + QC[a[0]] + '" ' + F + '>' + fa(a[0]) + '</text>';
        });
      }
      if (o.ccw) {
        var r = c * 2.7, a = 25 * Math.PI / 180, cx = px(0), cy = py(0);
        s += '<path d="M' + (cx + r * Math.cos(a)) + ' ' + (cy - r * Math.sin(a)) + ' A' + r + ' ' + r + ' 0 1 0 ' + (cx + r * Math.cos(a)) + ' ' + (cy + r * Math.sin(a)) + '" fill="none" stroke="' + PINK + '" stroke-width="2.4" stroke-dasharray="6 4" marker-end="url(#' + id + 'a)"/>';
      }
      /* محورها */
      var axc = function (on) { return on ? PINK : INK; }, axw = function (on) { return on ? 5 : 2; };
      s += '<line x1="' + (px(x0) - 6) + '" y1="' + py(0) + '" x2="' + (px(x1) + 8) + '" y2="' + py(0) + '" stroke="' + axc(o.part === 'x') + '" stroke-width="' + axw(o.part === 'x') + '"/>';
      s += '<polygon points="' + (px(x1) + 16) + ',' + py(0) + ' ' + (px(x1) + 7) + ',' + (py(0) - 4.5) + ' ' + (px(x1) + 7) + ',' + (py(0) + 4.5) + '" fill="' + axc(o.part === 'x') + '"/>';
      if (!o.noY) {
        s += '<line x1="' + px(0) + '" y1="' + (py(y0) + 6) + '" x2="' + px(0) + '" y2="' + (py(y1) - 8) + '" stroke="' + axc(o.part === 'y') + '" stroke-width="' + axw(o.part === 'y') + '"/>';
        s += '<polygon points="' + px(0) + ',' + (py(y1) - 16) + ' ' + (px(0) - 4.5) + ',' + (py(y1) - 7) + ' ' + (px(0) + 4.5) + ',' + (py(y1) - 7) + '" fill="' + axc(o.part === 'y') + '"/>';
      }
      /* عددهای روی محورها */
      for (i = x0; i <= x1; i++) { if (i && i % lab === 0) { s += '<text x="' + px(i) + '" y="' + (py(0) + 15) + '" text-anchor="middle" font-size="10.5" fill="' + INK + '" ' + F + '>' + C.sg(i) + '</text>'; } }
      for (i = y0; i <= y1 && !o.noY; i++) { if (i && i % lab === 0) { s += '<text x="' + (px(0) - 7) + '" y="' + (py(i) + 3.8) + '" text-anchor="end" font-size="10.5" fill="' + INK + '" ' + F + '>' + C.sg(i) + '</text>'; } }
      if (x0 <= 0 && y0 <= 0 && !o.noY) { s += '<text x="' + (px(0) - 7) + '" y="' + (py(0) + 15) + '" text-anchor="end" font-size="10.5" fill="' + INK + '" ' + F + '>' + fa(0) + '</text>'; }
      if (o.xt || o.yt) {
        s += '<text x="' + (px(x0) + (x1 - x0) * c / 2) + '" y="' + (Ht - 6) + '" text-anchor="middle" font-size="12.5" fill="' + INK + '" ' + F + '>' + (o.xt || '') + '</text>';
        s += '<text x="' + (px(0) + 9) + '" y="14" text-anchor="start" font-size="12.5" fill="' + INK + '" ' + F + '>' + (o.yt || '') + '</text>';
      } else if (!o.nolab) {
        s += '<text x="' + (px(x1) + 22) + '" y="' + (py(0) + 5) + '" font-size="16" font-style="italic" fill="' + INK + '" font-family="Times New Roman,serif">x</text>';
        if (!o.noY) { s += '<text x="' + (px(0) + 10) + '" y="' + (py(y1) - 10) + '" font-size="16" font-style="italic" fill="' + INK + '" font-family="Times New Roman,serif">y</text>'; }
      }
      if (o.part === 'o') { s += '<circle cx="' + px(0) + '" cy="' + py(0) + '" r="14" fill="rgba(255,194,51,.55)" stroke="' + PINK + '" stroke-width="3"/><circle cx="' + px(0) + '" cy="' + py(0) + '" r="4.5" fill="' + INK + '"/>'; }
      /* خط و پاره‌خط‌ها */
      (o.seg || []).forEach(function (g) { s += '<line x1="' + px(g.a[0]) + '" y1="' + py(g.a[1]) + '" x2="' + px(g.b[0]) + '" y2="' + py(g.b[1]) + '" stroke="' + (g.c || PINK) + '" stroke-width="' + (g.w || 2.4) + '"' + (g.dash ? ' stroke-dasharray="6 4"' : '') + ' stroke-linecap="round"/>'; });
      if (o.line && o.line.length > 1) { s += '<polyline fill="none" stroke="' + (o.lineC || BLUE) + '" stroke-width="2.6" stroke-linejoin="round" points="' + o.line.map(function (a) { return px(a[0]) + ',' + py(a[1]); }).join(' ') + '"/>'; }
      /* خط‌های راهنما تا محورها */
      (o.guides || []).forEach(function (g) {
        if (g.y !== 0) { s += '<line x1="' + px(g.x) + '" y1="' + py(g.y) + '" x2="' + px(g.x) + '" y2="' + py(0) + '" stroke="' + (g.vc || TEAL) + '" stroke-width="2.6" stroke-dasharray="6 4"/>'; }
        if (g.x !== 0) { s += '<line x1="' + px(g.x) + '" y1="' + py(g.y) + '" x2="' + px(0) + '" y2="' + py(g.y) + '" stroke="' + (g.hc || PINK) + '" stroke-width="2.6" stroke-dasharray="6 4"/>'; }
        if (g.vl && g.y !== 0) { s += '<text x="' + (px(g.x) + (g.x >= 0 ? 6 : -6)) + '" y="' + (py(g.y / 2) + 4) + '" text-anchor="' + (g.x >= 0 ? 'start' : 'end') + '" font-size="12" font-weight="700" fill="' + (g.vc || TEAL) + '" ' + F + '>' + g.vl + '</text>'; }
        if (g.hl && g.x !== 0) { s += '<text x="' + px(g.x / 2) + '" y="' + (py(g.y) + (g.y >= 0 ? -6 : 15)) + '" text-anchor="middle" font-size="12" font-weight="700" fill="' + (g.hc || PINK) + '" ' + F + '>' + g.hl + '</text>'; }
      });
      /* نقطه‌ها */
      (o.pts || []).forEach(function (a) {
        var rad = a.r || 5.5;
        if (a.ring) { s += '<circle cx="' + px(a.x) + '" cy="' + py(a.y) + '" r="' + (rad + 5) + '" fill="none" stroke="' + (a.c || RED) + '" stroke-width="2.5"/>'; }
        s += '<circle cx="' + px(a.x) + '" cy="' + py(a.y) + '" r="' + rad + '" fill="' + (a.hollow ? '#fff' : (a.c || RED)) + '" stroke="' + INK + '" stroke-width="1.6"' + (a.hollow ? ' stroke-dasharray="3 2"' : '') + '/>';
        var t = (a.l || '') + (a.pair ? (a.l ? ' ' : '') + C.pairTxt(a.x, a.y) : '');
        if (t) { s += '<text x="' + (px(a.x) + (a.dx === undefined ? 9 : a.dx)) + '" y="' + (py(a.y) + (a.dy === undefined ? -8 : a.dy)) + '" font-size="13" font-weight="700" fill="' + INK + '" paint-order="stroke" stroke="#fff" stroke-width="3" ' + F + '>' + t + '</text>'; }
      });
      (o.notes || []).forEach(function (a) { s += '<text x="' + px(a.x) + '" y="' + py(a.y) + '" text-anchor="' + (a.anchor || 'middle') + '" font-size="' + (a.fs || 13) + '" font-weight="700" fill="' + (a.c || INK) + '" paint-order="stroke" stroke="#fff" stroke-width="3" ' + F + '>' + a.t + '</text>'; });
      if (o.sel) { s += '<circle cx="' + px(o.sel[0]) + '" cy="' + py(o.sel[1]) + '" r="8" fill="' + TEAL + '" stroke="' + INK + '" stroke-width="2.5"/>'; }
      if (o.pick) {
        for (p = x0; p <= x1; p++) { for (q = y0; q <= y1; q++) { s += '<g class="cd-pk" data-x="' + p + '" data-y="' + q + '"><rect x="' + (px(p) - c / 2) + '" y="' + (py(q) - c / 2) + '" width="' + c + '" height="' + c + '" rx="6"/></g>'; } }
      }
      if (o.quads) {
        [1, 2, 3, 4].forEach(function (k) {
          var xa = k === 1 || k === 4 ? px(0) : px(x0), xb = k === 1 || k === 4 ? px(x1) : px(0), ya = k <= 2 ? py(y1) : py(0), yb = k <= 2 ? py(0) : py(y0);
          s += '<rect class="cd-qk" data-q="' + k + '" x="' + xa + '" y="' + ya + '" width="' + (xb - xa) + '" height="' + (yb - ya) + '" fill="' + (o.quads === 'tint' && o.qmark && o.qmark[k] ? o.qmark[k] : 'transparent') + '" fill-opacity=".8"/>';
        });
      }
      return s + '</svg>';
    };
    C.hit = function (e) { var g = e.target.closest && e.target.closest('.cd-pk'); return g ? { x: +g.dataset.x, y: +g.dataset.y } : null; };
    C.qhit = function (e) { var g = e.target.closest && e.target.closest('.cd-qk'); return g ? +g.dataset.q : 0; };

    /* ---------- جدول افقی داده: rows=[[x...],[y...]] — o: hl (ستون برجسته)، cells (ستون‌ها کلیک‌پذیر)، mark:{col:'ok'|'no'|'bad'}، blank:[ستون‌های خالی] ---------- */
    C.table = function (xs, ys, o) {
      o = o || {}; var h = '<table class="cd-tab" dir="ltr" aria-label="جدول داده"><tr><th>' + (o.xh || M('x')) + '</th>', r2 = '<tr><th>' + (o.yh || M('y')) + '</th>', i;
      for (i = 0; i < xs.length; i++) {
        var cl = (o.hl === i ? ' hl' : '') + (o.mark && o.mark[i] ? ' ' + o.mark[i] : ''), at = function (row) { return o.cells ? ' class="pk' + cl + '" data-col="' + i + '" data-row="' + row + '"' : (cl ? ' class="' + cl.trim() + '"' : ''); };
        h += '<td' + at('x') + '>' + C.num(xs[i]) + '</td>';
        r2 += '<td' + at('y') + '>' + (o.blank && o.blank.indexOf(i) >= 0 ? (o.blankHtml ? o.blankHtml(i) : '؟') : C.num(ys[i])) + '</td>';
      }
      return h + '</tr>' + r2 + '</tr></table>';
    };

    /* ---------- ورودی زوج مرتب: ( [x] ، [y] ) با دکمهٔ ± ---------- */
    C.numBox = function (key) { return '<span style="display:inline-flex;flex-direction:column;align-items:center;gap:3px"><input type="text" inputmode="text" dir="ltr" autocomplete="off" data-k="' + key + '" aria-label="مقدار ' + key + '"><button type="button" class="cd-pm" data-pm="' + key + '" aria-label="تغییر علامت">±</button></span>'; };
    C.pairIn = function () { return '<div class="cd-pi"><span>(</span>' + C.numBox('x') + '<span>\u060C</span>' + C.numBox('y') + '<span>)</span></div>'; };
    C.parseInt0 = function (s) {
      s = String(s || '').replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 1776; }).replace(/[٠-٩]/g, function (d) { return d.charCodeAt(0) - 1632; }).replace(/[−–—﹣‐]/g, '-').replace(/\s/g, '');
      return /^-?\d+$/.test(s) ? +s : null;
    };
    C.wirePm = function (root) {                                                                   /* دکمه‌های ± داخل root */
      root.addEventListener('click', function (e) {
        var b = e.target.closest('.cd-pm'); if (!b) { return; }
        var inp = root.querySelector('input[data-k="' + b.dataset.pm + '"]'); inp.value = /^[-−]/.test(inp.value) ? inp.value.replace(/^[-−]/, '') : '-' + inp.value; inp.focus({ preventScroll: true });
      });
    };

    /* ---------- پروب لمسی: روی نقطه‌ای از صفحه بزن، توضیحش را ببین ---------- */
    C.probe = function (host, o, info) {
      var sel = null;
      function paint() {
        var po = Object.assign({}, o.plane, { pick: true, sel: sel }); if (sel && o.extra) { po = Object.assign(po, o.extra(sel[0], sel[1])); }
        host.innerHTML = rr('<div>' + C.plane(po) + '<div class="cd-info">' + (sel ? info(sel[0], sel[1]) : o.hint) + '</div></div>');
      }
      host.addEventListener('click', function (e) { var t = C.hit(e); if (t) { sel = [t.x, t.y]; paint(); } });
      paint();
    };

    /* ---------- آزمون سؤال‌به‌سؤال: سؤال‌های mcq و pick (انتخاب نقطه روی صفحه) ----------
       q = {kind:'mcq'|'pick', ask, fig, tex, opts:[{h,ok,m}] | plane:{...}, ans:[x,y], bad:function(sel)->پیام, expl} */
    C.quiz = function (host, build, resText) {
      var qs, i, ans, sel;
      function start() { qs = build(); i = 0; ans = []; sel = null; }
      function good(k) { var a = ans[k]; return a === undefined ? null : qs[k].kind === 'pick' ? a.ok : qs[k].opts[a].ok; }
      function paint() {
        var n = qs.length, q = qs[i], a = ans[i], h, oh = '', s = 0, k;
        if (i === n) {
          for (k = 0; k < n; k++) { if (good(k)) { s++; } }
          host.innerHTML = rr('<div class="fb ' + (s >= n - 1 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(s) + ' از ' + fa(n) + '</b><br>' + resText(s, n) + '</div><div class="opts"><button type="button" class="btn" data-pv="1" data-scroll>مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1" data-scroll>سؤال‌های جدید</button></div>');
          return;
        }
        h = '<div class="stg">' + qs.map(function (x, k2) { var g = good(k2); return '<span class="' + (g === null ? (k2 === i ? 'cu' : '') : g ? 'dn' : 'wr') + '">' + fa(k2 + 1) + '</span>'; }).join('') + '</div><p class="ask">سؤال ' + fa(i + 1) + ' از ' + fa(n) + ': ' + q.ask + '</p>' + (q.fig || '') + (q.tex ? K.dm(q.tex) : '');
        if (q.kind === 'pick') {
          var po = Object.assign({}, q.plane);
          if (a === undefined) { po.pick = true; po.sel = sel; }
          else { po.pts = (po.pts || []).concat(q.ans ? [{ x: q.ans[0], y: q.ans[1], c: GREEN, r: 7, ring: true }] : []); if (!a.ok) { po.pts.push({ x: a.x, y: a.y, c: RED, r: 6 }); } else if (!q.ans) { po.pts.push({ x: a.x, y: a.y, c: GREEN, r: 7, ring: true }); } }
          h += C.plane(po);
          if (a === undefined) { h += '<div class="opts"><button type="button" class="btn" data-ck="1"' + (sel ? '' : ' disabled') + '>تأیید پاسخ</button></div>'; }
        } else {
          oh = ''; q.opts.forEach(function (o, k2) { oh += '<button type="button" class="btn opt' + (a !== undefined ? (o.ok ? ' right' : k2 === a ? ' wrong' : '') : '') + '" data-o="' + k2 + '"' + (a !== undefined ? ' disabled' : '') + '>' + o.h + '</button>'; });
          h += '<div class="mc" id="mcx"></div>';
        }
        if (a !== undefined) {
          var ok = good(i), msg = ok ? 'درست است! ✓' : q.kind === 'pick' ? (q.bad ? q.bad(a) : 'این نقطه درست نیست.') : (q.opts[a].m || 'این گزینه درست نیست.');
          h += fb(ok, msg) + '<div class="ex">' + q.expl + '</div>';
        }
        h += '<div class="opts"><button type="button" class="btn" data-p="1" data-scroll' + (i ? '' : ' disabled') + '>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1" data-scroll' + (a === undefined ? ' disabled' : '') + '>' + (i === n - 1 ? 'مشاهدهٔ نتیجه' : 'سؤال بعدی') + '</button></div>';
        host.innerHTML = rr(h); if (q.kind !== 'pick') { host.querySelector('#mcx').innerHTML = rr(oh); }
      }
      host.addEventListener('click', function (e) {
        var t = C.hit(e);
        if (t && qs[i] && qs[i].kind === 'pick' && ans[i] === undefined) { sel = [t.x, t.y]; paint(); return; }
        var b = e.target.closest('button'); if (!b || b.disabled) { return; }
        if (b.dataset.o) { ans[i] = +b.dataset.o; paint(); }
        else if (b.dataset.ck && sel) { ans[i] = { x: sel[0], y: sel[1], ok: qs[i].test ? !!qs[i].test(sel[0], sel[1]) : sel[0] === qs[i].ans[0] && sel[1] === qs[i].ans[1] }; sel = null; paint(); }
        else if (b.dataset.nx) { i++; sel = null; paint(); } else if (b.dataset.p) { i--; sel = null; paint(); }
        else if (b.dataset.pv) { i = 0; sel = null; paint(); } else if (b.dataset.r) { start(); paint(); }
      });
      start(); paint();
    };

    /* ---------- ابزارهای تصادفی ---------- */
    C.rp = function (lim, o) {                                                                     /* نقطهٔ تصادفی؛ o.q = ناحیهٔ دلخواه، o.axis = روی محور */
      o = o || {}; var x, y, t = 0;
      do {
        x = R(-lim, lim); y = R(-lim, lim);
        if (o.q) { x = Math.abs(x || 1) * (o.q === 1 || o.q === 4 ? 1 : -1); y = Math.abs(y || 1) * (o.q <= 2 ? 1 : -1); }
      } while (((!o.q && !o.axis && (x === 0 || y === 0)) || (o.axis && !(x === 0 || y === 0)) || (o.not && o.not.some(function (p) { return p[0] === x && p[1] === y; }))) && t++ < 400);
      return [x, y];
    };
    C.distinct = function (list, key) { var seen = {}; return list.filter(function (a) { var k = key(a); if (seen[k]) { return false; } seen[k] = 1; return true; }); };
    C.cap = function (t) { return '<p class="lk-cap">' + t + '</p>'; };
    C.sample = sample; C.shuffle = shuffle; C.pick = pick;
    return C;
  };
})();
