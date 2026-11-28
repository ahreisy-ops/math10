/* ابزارهای تصادفی/تبدیل مشترک تمرین‌ها (R, NZ, P, SG, M, shuffle, uniqBy, mc, parse) — K.u */
(function () {
  'use strict';
  var K0 = window.CourseKit, ML = window.MathLite, fa = ML.fa, esc = ML.esc, rr = ML.renderRich, abs = Math.abs, df = K0.df, NS = 'http://www.w3.org/2000/svg', $ = function (id) { return document.getElementById(id); };
    var R = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
    var NZ = function (a, b) { var v; do { v = R(a, b); } while (!v); return v; };
    var P = function (n) { return n < 0 ? '(' + n + ')' : '' + n; };
    var SG = function (n) { return n === 'U' ? 'تعریف‌نشده' : '$' + n + '$'; };
    /* M: «یا» و «و» داخل فرمول برعکس رندر می‌شوند؛ پس بیرون از فرمول و در یک بلوک چپ‌به‌راست گذاشته می‌شوند */
    var M = function (s) {
      s = String(s);
      if (!/\\text\{(یا|و)\}/.test(s)) { return '$' + s + '$'; }
      var parts = s.split(/\\ ?\\text\{(یا|و)\}\\ ?/), out = '', i;
      for (i = 0; i < parts.length; i++) { out += i % 2 ? ' ' + parts[i] + ' ' : '$' + parts[i] + '$'; }
      return '<bdi style="direction:ltr;unicode-bidi:isolate">' + out + '</bdi>';
    };
    var shuffle = function (a) { for (var i = a.length - 1, j, t; i > 0; i--) { j = R(0, i); t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
    function uniqBy(arr, key) { var s = {}; return arr.filter(function (x) { var k = key(x); if (s[k]) { return false; } s[k] = 1; return true; }); }
    /* گزینه‌های چندگزینه‌ای: یک درست + سه نادرست (در صورت کمبود، با تغییر یکی از عددهای پاسخ درست پر می‌شود) → آرایهٔ مخلوط {h, ok, m}
       correct: {t}؛ wrongs: [{t, m}]؛ raw=true یعنی t از قبل HTML است و دوباره در M نمی‌پیچد */
    function nearby(t, list) {
      var parts = String(t).split(/(<[^>]*>)/), pos = [], offs = [1, -1, 2, -2, 3, -3, 5], out = [], i, m, re, o, j, c;
      for (i = 0; i < parts.length; i += 2) { re = /\d+/g; while ((m = re.exec(parts[i]))) { pos.push({ i: i, at: m.index, n: m[0] }); } }
      shuffle(pos);
      for (o = 0; o < offs.length && list.length + out.length < 4; o++) {
        for (j = 0; j < pos.length && list.length + out.length < 4; j++) {
          var v = +pos[j].n + offs[o]; if (v < 1) { continue; }
          c = parts.map(function (x, k) { return k === pos[j].i ? x.slice(0, pos[j].at) + v + x.slice(pos[j].at + pos[j].n.length) : x; }).join('');
          if (!list.concat(out).some(function (z) { return z.t === c; })) { out.push({ t: c, ok: 0, m: 'محاسبه را دوباره بررسی کن.' }); }
        }
      }
      return out;
    }
    function mc(correct, wrongs, raw) {
      var list = uniqBy([{ t: correct.t, ok: 1 }].concat(wrongs.map(function (w) { return { t: w.t, ok: 0, m: w.m }; })), function (x) { return x.t; }), w, mm = /^x=(-?\d+)$/.exec(correct.t), k = 0, offs = [1, -1, 2, -2, 3, -3, 5];
      while (mm && list.length < 4 && k < offs.length) { var nt = 'x=' + (+mm[1] + offs[k++]); if (!list.some(function (z) { return z.t === nt; })) { list.push({ t: nt, ok: 0, m: 'محاسبه را دوباره بررسی کن.' }); } }
      if (list.length < 4) { list = list.concat(nearby(correct.t, list)); }
      w = shuffle(list.slice(1)).slice(0, 3);
      return shuffle([list[0]].concat(w).map(function (z) { return { h: raw ? z.t : M(z.t), ok: !!z.ok, m: z.m || 'این گزینه درست نیست.' }; }));
    }
    function parse(s) {
      s = (s || '').replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 1776; }).replace(/[٠-٩]/g, function (d) { return d.charCodeAt(0) - 1632; }).replace(/[−–—﹣‐]/g, '-').replace(/\s/g, '');
      return /^-?\d+$/.test(s) ? +s : null;
    }
  K0._u = { R: R, NZ: NZ, P: P, SG: SG, M: M, shuffle: shuffle, uniqBy: uniqBy, mc: mc, shuffled: function (a) { return shuffle(a.slice()); }, parse: parse };
})();
