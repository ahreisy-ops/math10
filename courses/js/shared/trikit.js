/* trikit.js — ابزارهای مشترک رسم مثلث (فصل ۵): triSVG و ابزارهای SVG و ساخت مثلث.
   استفاده در درس:  needs: [..., 'tri']  و داخل setup:
     var T3 = K0.tri({ fmin: 12, defaults: { hov: 1 } });   // هر دو گزینه اختیاری‌اند
     var sv = T3.sv, stx = T3.stx, sln = T3.sln, unit = T3.unit, rmark = T3.rmark, arcP = T3.arcP, triSVG = T3.triSVG;
     // همچنین: T3.rotPts ، T3.triFromAng ، T3.triFromSides
   cfg.fmin: کمترین اندازهٔ فونت متن‌های SVG (پیش‌فرض ۰) ؛ cfg.defaults: مقدار پیش‌فرض گزینه‌های triSVG برای آن درس.
   مثلث: o={pts:[A,B,C] مختصات ریاضی, names, sl:[برچسب AB,BC,CA] ('x' = x با KaTeX), so:[[dx,dy]×3 آفست برچسب ضلع], slc, al:[برچسب زاویه در A,B,C], alo(برچسب زاویه بیرون‌تر),
          right:اندیس رأس قائمه, arcs, arcAuto(شعاع کمان متناسب با ضلع‌ها), alt:{from,base,l,c}, hl:{side:i,c}, col:[رنگ ضلع‌ها], fill, dots, extra,
          hit(ضلع‌های قابل‌لمس), hov(هالهٔ لمس), hitOff(همراه با hit: برچسب‌ها دورتر از ضلع), W, H, pad}
   ماژول 'tri' در core.js ثبت شده و به 'kit' وابسته است. */
(function () {
  'use strict';
  var K0 = window.CourseKit, ML = window.MathLite, rr = ML.renderRich, M = K0._u.M, abs = Math.abs;
  var INK = '#14213d', PINK = '#d6457a', D2R = Math.PI / 180;
  var f2 = function (n) { return Math.round(n * 100) / 100; };

  K0.tri = function (cfg) {
    cfg = cfg || {};
    var fmin = cfg.fmin || 0, defs = cfg.defaults || {};

    function sv(W, H) { return '<svg class="gsv" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-hidden="true">'; }
    function stx(t, x, y, o) {
      o = o || {}; var fs = o.fs || 13; if (!o.nf) { fs = Math.max(fs, fmin); }
      return '<text x="' + f2(x) + '" y="' + f2(y + fs * 0.34) + '" text-anchor="' + (o.a || 'middle') + '" font-size="' + fs + '"' + (o.b ? ' font-weight="bold"' : '') + ' fill="' + (o.c || INK) + '" font-family="Tahoma,sans-serif">' + t + '</text>';
    }
    function sln(a, b, c, w, d) { return '<line x1="' + f2(a[0]) + '" y1="' + f2(a[1]) + '" x2="' + f2(b[0]) + '" y2="' + f2(b[1]) + '" stroke="' + (c || INK) + '" stroke-width="' + (w || 2) + '"' + (d ? ' stroke-dasharray="5 4"' : '') + ' stroke-linecap="round"/>'; }
    function unit(a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy) || 1; return [dx / l, dy / l]; }
    function rmark(V, A, B, r, c) { var u1 = unit(V, A), u2 = unit(V, B), p1 = [V[0] + u1[0] * r, V[1] + u1[1] * r], p3 = [V[0] + u2[0] * r, V[1] + u2[1] * r], p2 = [p1[0] + u2[0] * r, p1[1] + u2[1] * r]; return '<polyline points="' + f2(p1[0]) + ',' + f2(p1[1]) + ' ' + f2(p2[0]) + ',' + f2(p2[1]) + ' ' + f2(p3[0]) + ',' + f2(p3[1]) + '" fill="none" stroke="' + (c || INK) + '" stroke-width="1.8"/>'; }
    function arcP(V, A, B, r, c, fill) {
      var u1 = unit(V, A), u2 = unit(V, B), p1 = [V[0] + u1[0] * r, V[1] + u1[1] * r], p2 = [V[0] + u2[0] * r, V[1] + u2[1] * r], cr = u1[0] * u2[1] - u1[1] * u2[0], sw = cr > 0 ? 1 : 0;
      if (abs(cr) < 1e-6 && u1[0] * u2[0] + u1[1] * u2[1] < 0) { sw = 1; }
      return '<path d="' + (fill ? 'M' + f2(V[0]) + ' ' + f2(V[1]) + ' L' + f2(p1[0]) + ' ' + f2(p1[1]) : 'M' + f2(p1[0]) + ' ' + f2(p1[1])) + ' A' + r + ' ' + r + ' 0 0 ' + sw + ' ' + f2(p2[0]) + ' ' + f2(p2[1]) + (fill ? ' Z' : '') + '" fill="' + (fill || 'none') + '" stroke="' + (c || INK) + '" stroke-width="1.8"/>';
    }

    function triSVG(o0) {
      var o = {}, key; for (key in defs) { o[key] = defs[key]; } for (key in o0) { o[key] = o0[key]; }
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
      if (o.arcs) {
        for (i = 0; i < 3; i++) {
          if (i !== o.right) {
            var ra = 17;
            if (o.arcAuto) { ra = Math.min(17, 0.4 * Math.min(Math.hypot(P[(i + 1) % 3][0] - P[i][0], P[(i + 1) % 3][1] - P[i][1]), Math.hypot(P[(i + 2) % 3][0] - P[i][0], P[(i + 2) % 3][1] - P[i][1]))); }
            s += arcP(P[i], P[(i + 1) % 3], P[(i + 2) % 3], ra, PINK);
          }
        }
      }
      (o.extra || []).forEach(function (e) { s += sln(S(e.a), S(e.b), e.c || INK, e.w || 2, e.d); });
      (o.dots || []).forEach(function (d) { var q = S(d.p), uu = unit(C, q); s += '<circle cx="' + f2(q[0]) + '" cy="' + f2(q[1]) + '" r="3.5" fill="' + INK + '"/>' + stx(d.n, q[0] + (d.dx === undefined ? uu[0] * 15 : d.dx), q[1] + (d.dy === undefined ? uu[1] * 15 : d.dy), { fs: 14, b: 1 }); if (d.rm) { s += rmark(q, S(d.rm[0]), S(d.rm[1]), 10, INK); } });
      var far2 = o.hit && o.hitOff, no = far2 ? 26 : 15, so2 = far2 ? 24 : 14;
      for (i = 0; i < 3; i++) {
        var u = unit(C, P[i]);
        s += stx(names[i], P[i][0] + u[0] * no, P[i][1] + u[1] * no, { fs: 14, b: 1 });
        if (o.al && o.al[i]) { var u2 = o.alo ? unit(C, P[i]) : unit(P[i], C); s += stx(o.al[i], P[i][0] + u2[0] * (o.alo ? 18 : 34), P[i][1] + u2[1] * (o.alo ? 12 : 34), { fs: 11.5, b: 1, c: PINK }); }
        if (o.sl && o.sl[i]) {
          var a1 = P[i], b1 = P[(i + 1) % 3], mid = [(a1[0] + b1[0]) / 2, (a1[1] + b1[1]) / 2], dd = unit(a1, b1), nr = [-dd[1], dd[0]], sg = ((mid[0] - C[0]) * nr[0] + (mid[1] - C[1]) * nr[1]) >= 0 ? 1 : -1;
          var so = (o.so && o.so[i]) || [0, 0];
          var lx = mid[0] + nr[0] * sg * so2 + so[0], ly = mid[1] + nr[1] * sg * so2 + so[1];
          s += o.sl[i] === 'x'
            ? '<foreignObject x="' + f2(lx - 15) + '" y="' + f2(ly - 13) + '" width="30" height="26"><div style="display:flex;align-items:center;justify-content:center;height:26px;font-size:15px;font-weight:700;color:' + (o.slc || INK) + '">' + rr(M('x')) + '</div></foreignObject>'
            : stx(o.sl[i], lx, ly, { fs: 13, b: 1, c: o.slc || INK });
        }
      }
      if (o.hit) {
        for (i = 0; i < 3; i++) {
          var hp = P[i], hq = P[(i + 1) % 3];
          var hln = '<line class="hitline" data-s="' + i + '" x1="' + f2(hp[0]) + '" y1="' + f2(hp[1]) + '" x2="' + f2(hq[0]) + '" y2="' + f2(hq[1]) + '" stroke="rgba(0,0,0,0.001)" stroke-width="24" stroke-linecap="round" tabindex="0" role="button" aria-label="ضلع ' + (i + 1) + '"/>';
          if (o.hov) {
            var hl = Math.hypot(hq[0] - hp[0], hq[1] - hp[1]), ha = Math.atan2(hq[1] - hp[1], hq[0] - hp[0]) / D2R, hm = [(hp[0] + hq[0]) / 2, (hp[1] + hq[1]) / 2];
            s += '<g class="hitg"><rect class="hov" x="' + f2(hm[0] - hl / 2 - 12) + '" y="' + f2(hm[1] - 12) + '" width="' + f2(hl + 24) + '" height="24" rx="12" transform="rotate(' + f2(ha) + ' ' + f2(hm[0]) + ' ' + f2(hm[1]) + ')"/>' + hln + '</g>';
          } else { s += hln; }
        }
      }
      return s + '</svg>';
    }

    /* مثلث با زاویه‌های a در رأس 0 و b در رأس 1 (مختصات ریاضی) */
    function triFromAng(a, b, L) { var c = 180 - a - b, ac = L * Math.sin(b * D2R) / Math.sin(c * D2R); return [[0, 0], [L, 0], [ac * Math.cos(a * D2R), ac * Math.sin(a * D2R)]]; }
    /* مثلث با ضلع‌های AB=a، BC=b، CA=c (مختصات ریاضی) */
    function triFromSides(a, b, c) { var x = (a * a + c * c - b * b) / (2 * a), y = Math.sqrt(Math.max(0, c * c - x * x)); return [[0, 0], [a, 0], [x, y]]; }
    function rotPts(pts, deg) { var c = Math.cos(deg * D2R), s = Math.sin(deg * D2R); return pts.map(function (p) { return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; }); }

    return { sv: sv, stx: stx, sln: sln, unit: unit, rmark: rmark, arcP: arcP, triSVG: triSVG, triFromAng: triFromAng, triFromSides: triFromSides, rotPts: rotPts };
  };
})();
