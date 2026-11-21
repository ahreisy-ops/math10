/* ورودی عدد و بازخورد مشترک تمرین‌ها (NUMIN, wireInput, fb) — K.inp */
(function () {
  'use strict';
  var K0 = window.CourseKit, ML = window.MathLite, fa = ML.fa, esc = ML.esc, rr = ML.renderRich, abs = Math.abs, df = K0.df, NS = 'http://www.w3.org/2000/svg', $ = function (id) { return document.getElementById(id); };
    var NUMIN = function () { return '<div class="ig">' + ML.num.group({}) + '</div>'; };
    var NUMINPOS = function () { return '<div class="ig">' + ML.num.group({ signed: false }) + '</div>'; };   /* بدون ±: جوابِ نامنفی */
    function wireInput(root, submit, noFocus) {
      var inp = root.querySelector('.numin'); if (!inp) { return; }
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { submit(); } }); if (!noFocus) { inp.focus({ preventScroll: true }); }
    }
    var fb = function (ok, html) { return '<div class="fb ' + (ok ? 'ok' : 'bad') + '">' + html + '</div>'; };
  K0._i = { NUMIN: NUMIN, NUMINPOS: NUMINPOS, wireInput: wireInput, fb: fb };
})();
