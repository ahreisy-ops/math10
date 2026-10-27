/* exam-setup.js — آماده‌سازی صفحهٔ آزمون از data/chN.js (قبل از app.js اجرا می‌شود) */
(function () {
  'use strict';
  var n = parseInt(new URLSearchParams(location.search).get('ch'), 10) || 1;
  var c = window.CH[n], P = c.meta.page || {}, H = (window.HEROES || {})[n];
  window.EXAM_META = c.meta;
  window.SKILLS = c.skills;
  document.title = (P.title || c.meta.chapterTitle) + ' — ارزیابی پیش‌نیازهای ریاضی ۱ دهم';
  document.getElementById('cH1').textContent = P.h1 || c.meta.chapterTitle;
  document.getElementById('cLead').textContent = P.lead || '';
  if (H) { var h = document.getElementById('heroHost'); h.className = H.cls; h.innerHTML = H.svg; }
})();
