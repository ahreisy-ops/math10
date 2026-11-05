/* loader.js — بارگذاری اسکریپت‌ها (مشترک بین منو، آزمون و درسنامه)
   Loader.load(src)     : یک اسکریپت؛ هر فایل فقط یک بار لود می‌شود
   Loader.ordered([..]) : چند اسکریپت هم‌زمان دانلود می‌شوند ولی به‌ترتیبِ فهرست اجرا می‌شوند */
(function () {
  'use strict';
  var cache = {};
  function inject(src, keepOrder) {
    if (cache[src]) { return cache[src]; }
    cache[src] = new Promise(function (ok, no) {
      var s = document.createElement('script');
      s.src = src;
      if (keepOrder) { s.async = false; }
      s.onload = ok;
      s.onerror = function () { delete cache[src]; no(new Error('load failed: ' + src)); };
      document.head.appendChild(s);
    });
    return cache[src];
  }
  window.Loader = {
    load: function (src) { return inject(src, false); },
    ordered: function (list) { return Promise.all(list.map(function (src) { return inject(src, true); })); }
  };
})();
