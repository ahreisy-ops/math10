/* ابزارهای تصادفی/تبدیل مشترک تمرین‌ها (R, NZ, P, SG, M, shuffle, parse) — K.u */
(function () {
  'use strict';
  var K0 = window.CourseKit, ML = window.MathLite, fa = ML.fa, esc = ML.esc, rr = ML.renderRich, abs = Math.abs, df = K0.df, NS = 'http://www.w3.org/2000/svg', $ = function (id) { return document.getElementById(id); };
    var R = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
    var NZ = function (a, b) { var v; do { v = R(a, b); } while (!v); return v; };
    var P = function (n) { return n < 0 ? '(' + n + ')' : '' + n; };
    var SG = function (n) { return n === 'U' ? 'تعریف‌نشده' : '$' + n + '$'; };
    var M = function (s) { return '$' + s + '$'; };
    var shuffle = function (a) { for (var i = a.length - 1, j, t; i > 0; i--) { j = R(0, i); t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
    function parse(s) {
      s = (s || '').replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 1776; }).replace(/[٠-٩]/g, function (d) { return d.charCodeAt(0) - 1632; }).replace(/[−–—﹣‐]/g, '-').replace(/\s/g, '');
      return /^-?\d+$/.test(s) ? +s : null;
    }
  K0._u = { R: R, NZ: NZ, P: P, SG: SG, M: M, shuffle: shuffle, parse: parse };
})();
