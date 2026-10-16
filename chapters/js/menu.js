/* ==========================================================================
   menu.js — منطق صفحهٔ منوی اصلی
   اطلاعات هر فصل (نام، تعداد سؤال، زیرمبحث‌ها) از همان فایل سؤال‌های فصل خوانده می‌شود:
   js/questions-chapter1.js ... js/questions-chapter7.js
   اگر فایل یک فصل پیدا نشود، کارت آن فصل «به‌زودی» نمایش داده می‌شود.
   ========================================================================== */
(function () {
  'use strict';

  var CHAPTER_COUNT = 7;
  var QUESTIONS_FILE = function (n) { return 'chapters/js/questions-chapter' + n + '.js'; };   // مسیر فایل سؤال‌ها
  var EXAM_PAGE = function (n) { return 'chapters/chapter' + n + '.html'; };          // مسیر صفحهٔ آزمون
  var SECONDS_PER_QUESTION = 42;                                                      // برای تخمین زمان

  var ACCENT = ['#0e8f7e', '#f2a900', '#e4572e', '#4c5fd5', '#3d9b4d', '#8a5cd0', '#d6457a'];
  var ACCENT_ON = ['#ffffff', '#14213d', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'];   // رنگ متن روی رنگ شاخص
  var ART = { "1": "<svg viewBox=\"0 0 600 60\" xmlns=\"http://www.w3.org/2000/svg\" style=\"direction:ltr\"> <line x1=\"10\" y1=\"34\" x2=\"590\" y2=\"34\" class=\"hl-axis\"/> <g class=\"hl-ticks\"> <line x1=\"50\" y1=\"24\" x2=\"50\" y2=\"44\"/><line x1=\"150\" y1=\"24\" x2=\"150\" y2=\"44\"/> <line x1=\"250\" y1=\"24\" x2=\"250\" y2=\"44\"/><line x1=\"350\" y1=\"24\" x2=\"350\" y2=\"44\"/> <line x1=\"450\" y1=\"24\" x2=\"450\" y2=\"44\"/><line x1=\"550\" y1=\"24\" x2=\"550\" y2=\"44\"/> </g> <circle cx=\"350\" cy=\"34\" r=\"9\" class=\"hl-dot\"/> </svg>", "2": "<svg viewBox=\"0 0 400 110\" xmlns=\"http://www.w3.org/2000/svg\" style=\"direction:ltr\"> <rect x=\"10\" y=\"10\" width=\"90\" height=\"90\" class=\"tile t-sq\"/> <text x=\"55\" y=\"64\" text-anchor=\"middle\" class=\"tile-text\">x²</text> <rect x=\"120\" y=\"10\" width=\"90\" height=\"32\" class=\"tile t-x\"/> <text x=\"165\" y=\"33\" text-anchor=\"middle\" class=\"tile-text small\">x</text> <rect x=\"120\" y=\"58\" width=\"90\" height=\"32\" class=\"tile t-x\"/> <text x=\"165\" y=\"81\" text-anchor=\"middle\" class=\"tile-text small\">x</text> <rect x=\"230\" y=\"10\" width=\"32\" height=\"32\" class=\"tile t-one\"/> <rect x=\"272\" y=\"10\" width=\"32\" height=\"32\" class=\"tile t-one\"/> <rect x=\"230\" y=\"52\" width=\"32\" height=\"32\" class=\"tile t-one\"/> <rect x=\"272\" y=\"52\" width=\"32\" height=\"32\" class=\"tile t-one\"/> </svg>", "3": "<svg viewBox=\"0 0 400 120\" xmlns=\"http://www.w3.org/2000/svg\" style=\"direction:ltr\"> <polygon points=\"200,100 182,116 218,116\" class=\"bal-base\"/> <line x1=\"200\" y1=\"100\" x2=\"200\" y2=\"30\" class=\"bal-post\"/> <line x1=\"70\" y1=\"30\" x2=\"330\" y2=\"30\" class=\"bal-beam\"/> <line x1=\"70\" y1=\"30\" x2=\"70\" y2=\"62\" class=\"bal-post\"/> <line x1=\"330\" y1=\"30\" x2=\"330\" y2=\"62\" class=\"bal-post\"/> <rect x=\"26\" y=\"62\" width=\"88\" height=\"34\" rx=\"6\" class=\"bal-pan l\"/> <text x=\"70\" y=\"86\" text-anchor=\"middle\" class=\"bal-text\">x + 3</text> <rect x=\"286\" y=\"62\" width=\"88\" height=\"34\" rx=\"6\" class=\"bal-pan r\"/> <text x=\"330\" y=\"86\" text-anchor=\"middle\" class=\"bal-text\">8</text> </svg>", "4": "<svg viewBox=\"0 0 260 150\" xmlns=\"http://www.w3.org/2000/svg\" style=\"direction:ltr\"> <g class=\"pl-grid\"><line x1=\"40\" y1=\"10\" x2=\"40\" y2=\"140\"/><line x1=\"80\" y1=\"10\" x2=\"80\" y2=\"140\"/><line x1=\"120\" y1=\"10\" x2=\"120\" y2=\"140\"/><line x1=\"160\" y1=\"10\" x2=\"160\" y2=\"140\"/><line x1=\"200\" y1=\"10\" x2=\"200\" y2=\"140\"/><line x1=\"10\" y1=\"30\" x2=\"250\" y2=\"30\"/><line x1=\"10\" y1=\"70\" x2=\"250\" y2=\"70\"/><line x1=\"10\" y1=\"110\" x2=\"250\" y2=\"110\"/></g> <line x1=\"10\" y1=\"90\" x2=\"250\" y2=\"90\" class=\"pl-axis\"/> <line x1=\"120\" y1=\"140\" x2=\"120\" y2=\"10\" class=\"pl-axis\"/> <line x1=\"200\" y1=\"90\" x2=\"200\" y2=\"50\" class=\"pl-dash\"/> <line x1=\"120\" y1=\"50\" x2=\"200\" y2=\"50\" class=\"pl-dash\"/> <circle cx=\"200\" cy=\"50\" r=\"8\" class=\"pl-dot\"/> </svg>", "5": "<svg viewBox=\"0 0 260 150\" xmlns=\"http://www.w3.org/2000/svg\" style=\"direction:ltr\"> <polygon points=\"30,125 230,125 30,25\" class=\"gm-tri\"/> <polyline points=\"30,105 50,105 50,125\" class=\"gm-right\"/> <line x1=\"30\" y1=\"25\" x2=\"30\" y2=\"125\" class=\"gm-edge\"/> <path d=\"M 190 125 A 40 40 0 0 0 200 101\" class=\"gm-arc\"/> <circle cx=\"30\" cy=\"25\" r=\"6\" class=\"gm-dot\"/> <circle cx=\"230\" cy=\"125\" r=\"6\" class=\"gm-dot\"/> <circle cx=\"30\" cy=\"125\" r=\"6\" class=\"gm-dot\"/> </svg>", "6": "<svg viewBox=\"0 0 260 150\" xmlns=\"http://www.w3.org/2000/svg\" style=\"direction:ltr\"> <rect x=\"6\" y=\"6\" width=\"248\" height=\"138\" rx=\"10\" class=\"vn-box\"/> <circle cx=\"105\" cy=\"75\" r=\"52\" class=\"vn-a\"/> <circle cx=\"155\" cy=\"75\" r=\"52\" class=\"vn-b\"/> <circle cx=\"130\" cy=\"75\" r=\"5\" class=\"vn-dot\"/> <circle cx=\"88\" cy=\"75\" r=\"5\" class=\"vn-dot\"/> <circle cx=\"172\" cy=\"75\" r=\"5\" class=\"vn-dot\"/> </svg>", "7": "<svg viewBox=\"0 0 260 150\" xmlns=\"http://www.w3.org/2000/svg\" style=\"direction:ltr\"> <rect x=\"20\" y=\"30\" width=\"90\" height=\"90\" rx=\"16\" class=\"dc-die\"/> <circle cx=\"46\" cy=\"56\" r=\"7\" class=\"dc-dot\"/><circle cx=\"84\" cy=\"56\" r=\"7\" class=\"dc-dot\"/> <circle cx=\"65\" cy=\"75\" r=\"7\" class=\"dc-dot\"/> <circle cx=\"46\" cy=\"94\" r=\"7\" class=\"dc-dot\"/><circle cx=\"84\" cy=\"94\" r=\"7\" class=\"dc-dot\"/> <line x1=\"135\" y1=\"125\" x2=\"245\" y2=\"125\" class=\"dc-axis\"/> <rect x=\"145\" y=\"85\" width=\"20\" height=\"40\" class=\"dc-bar\"/> <rect x=\"175\" y=\"55\" width=\"20\" height=\"70\" class=\"dc-bar2\"/> <rect x=\"205\" y=\"75\" width=\"20\" height=\"50\" class=\"dc-bar\"/> </svg>" };

  var ML = window.MathLite;
  var fa = ML.fa, esc = ML.esc;
  var data = {};                                          // data[n] = { title, count, skills, intro, info } یا null
  function $(id) { return document.getElementById(id); }

  /* ---------- خواندن فایل سؤال‌های هر فصل ---------- */
  function readCurrent(n) {
    var meta = window.EXAM_META || {}, skills = window.SKILLS || {}, qs = window.QUESTIONS || [];
    var title = meta.chapterTitle || String(meta.title || '').split(':').slice(1).join(':').trim() || ('فصل ' + fa(n));
    return { n: n, title: title, count: qs.length, skills: skills, intro: meta.desc || '' };
  }
  function loadAll(done) {
    var n = 0;
    (function next() {
      n++;
      if (n > CHAPTER_COUNT) { done(); return; }
      window.EXAM_META = window.SKILLS = window.QUESTIONS = null;
      var k = n, s = document.createElement('script');
      s.src = QUESTIONS_FILE(k);
      s.onload = function () { data[k] = window.QUESTIONS ? readCurrent(k) : null; next(); };
      s.onerror = function () { data[k] = null; next(); };
      document.head.appendChild(s);
    })();
  }

  function minutesFor(count) { return Math.max(5, Math.round(count * SECONDS_PER_QUESTION / 60 / 5) * 5); }
  function minutesText(m) {
    if (m < 60) { return fa(m) + ' دقیقه'; }
    var h = Math.floor(m / 60), r = m % 60;
    return fa(h) + ' ساعت' + (r ? ' و ' + fa(r) + ' دقیقه' : '');
  }
  function hex2rgba(hex, a) {
    var v = parseInt(hex.slice(1), 16);
    return 'rgba(' + (v >> 16) + ',' + ((v >> 8) & 255) + ',' + (v & 255) + ',' + a + ')';
  }

  /* ---------- پیش‌نیازهای پیشنهادی (از وابستگی‌های بیرونی مهارت‌ها) ---------- */
  function prereqChapters(n) {
    var d = data[n], titleToN = {}, found = {}, out = [], k, id, ext, i;
    for (k = 1; k <= CHAPTER_COUNT; k++) { if (data[k]) { titleToN[data[k].title] = k; } }
    for (id in d.skills) {
      ext = d.skills[id].external || [];
      for (i = 0; i < ext.length; i++) {
        if (ext[i].where && titleToN[ext[i].where] && titleToN[ext[i].where] !== n) { found[titleToN[ext[i].where]] = true; }
      }
    }
    for (k in found) { out.push(+k); }
    return out.sort(function (a, b) { return a - b; });
  }

  /* ---------- ساخت صفحه ---------- */
  var ICON = {
    q: '<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7.6 8a2.5 2.5 0 1 1 3.6 2.2c-.8.4-1.2.9-1.2 1.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="10" cy="14.6" r="1.1" fill="currentColor"/></svg>',
    t: '<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 5.5V10l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    go: '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M16 10H4m5-5-5 5 5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    book: '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M3 4.5C5.6 3.6 8 3.8 10 5.2c2-1.4 4.4-1.6 7-.7v11c-2.6-.9-5-.7-7 .7-2-1.4-4.4-1.6-7-.7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 5.2v11" stroke="currentColor" stroke-width="1.8"/></svg>'
  };

  function cardHtml(n) {
    var d = data[n], acc = ACCENT[(n - 1) % ACCENT.length], st = '--on:' + ACCENT_ON[(n - 1) % ACCENT_ON.length] + ';--acc:' + acc + ';--acc-soft:' + hex2rgba(acc, 0.16) + ';--i:' + (n - 1);
    var num = fa(n);
    if (!d) {
      return '<article class="chcard soon" id="ch' + n + '" style="' + st + '"><div class="card-art"><span class="bignum" aria-hidden="true">' + num + '</span></div>' +
        '<div class="card-body"><div class="eyebrow">فصل ' + num + '</div><h2 class="ctitle"><span>به‌زودی</span></h2>' +
        '<p class="prereq">این ایستگاه هنوز آماده نشده است.</p></div></article>';
    }
    var pre = prereqChapters(n), preHtml = '';
    if (pre.length) {
      preHtml = '<p class="prereq"><span class="pdot"></span>بهتر است اول فصل ' + pre.map(fa).join(' و ') + ' را انجام بدهی</p>';
    }
    return '<article class="chcard" id="ch' + n + '" style="' + st + '">' +
      '<div class="card-art">' + (ART[n] || '') + '<span class="bignum" aria-hidden="true">' + num + '</span></div>' +
      '<div class="card-body">' +
      '<div class="eyebrow">فصل ' + num + '</div>' +
      '<h2 class="ctitle"><span>' + esc(d.title) + '</span>' +
      '<button type="button" class="infobtn sm" data-info="' + n + '" aria-label="مبحث‌های فصل ' + num + '" title="مبحث‌های این فصل">i</button></h2>' +
      '<ul class="chips"><li>' + ICON.q + fa(d.count) + ' سؤال</li><li>' + ICON.t + 'حدود ' + minutesText(minutesFor(d.count)) + '</li></ul>' +
      preHtml +
      '<div class="actions">' +
      '<a class="cbtn primary" href="' + EXAM_PAGE(n) + '"><span>شروع آزمون</span>' + ICON.go + '</a>' +
      '<button type="button" class="cbtn" data-lesson="' + n + '">' + ICON.book + '<span>درسنامه</span></button>' +
      '</div>' +
      '</div></article>';
  }

  function render() {
    var grid = $('grid'), route = $('route'), h = '', r = '', k, total = 0, mins = 0, ready = 0;
    for (k = 1; k <= CHAPTER_COUNT; k++) {
      h += cardHtml(k);
      r += '<a href="#ch' + k + '" class="rnode' + (data[k] ? '' : ' off') + '" style="--on:' + ACCENT_ON[(k - 1) % ACCENT_ON.length] + ';--acc:' + ACCENT[(k - 1) % ACCENT.length] +
        '" title="' + (data[k] ? esc(data[k].title) : 'به‌زودی') + '"><b>' + fa(k) + '</b></a>';
      if (data[k]) { total += data[k].count; mins += minutesFor(data[k].count); ready++; }
    }
    grid.innerHTML = h;
    grid.setAttribute('aria-busy', 'false');
    route.innerHTML = r;
    $('stChapters').textContent = fa(ready);
    $('stQuestions').textContent = fa(total);
    $('stTime').textContent = minutesText(mins);
    bind();
  }

  /* ---------- پنجره‌ها ---------- */
  var lastFocus = null;
  function openModal(id, focusId) {
    lastFocus = document.activeElement;
    $(id).hidden = false;
    document.body.classList.add('noscroll');
    if (focusId) { $(focusId).focus({ preventScroll: true }); }
  }
  function closeModals() {
    ['infoModal', 'lessonModal'].forEach(function (id) { $(id).hidden = true; });
    document.body.classList.remove('noscroll');
    if (lastFocus && lastFocus.focus) { lastFocus.focus({ preventScroll: true }); }
  }
  function openInfo(n) {
    var d = data[n], h = '', id;
    $('infoTag').textContent = 'فصل ' + fa(n);
    $('infoTitle').textContent = d.title;
    $('infoIntro').textContent = d.intro || 'در این فصل دربارهٔ این مباحث تعیین سطح می‌شوی. روی هر مبحث بزن تا توضیح کوتاهش را ببینی.';
    for (id in d.skills) {
      h += '<div class="topicitem"><button type="button" class="topicbtn" aria-expanded="false"><span class="plus">+</span>' +
        '<span class="tname">' + esc(d.skills[id].name) + '</span></button>' +
        '<div class="tdesc" hidden>' + ML.renderRich(esc(d.skills[id].desc || '')) + '</div></div>';
    }
    $('infoList').innerHTML = h;
    var btns = $('infoList').querySelectorAll('.topicbtn'), i;
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        var box = this.parentNode.querySelector('.tdesc'), open = box.hidden;
        box.hidden = !open;
        this.setAttribute('aria-expanded', open ? 'true' : 'false');
        this.querySelector('.plus').textContent = open ? '−' : '+';
      });
    }
    $('infoList').scrollTop = 0;
    openModal('infoModal', 'btnInfoClose');
  }
  function openLesson(n) {
    $('lessonChapter').textContent = 'فصل ' + fa(n) + ' · ' + data[n].title;
    openModal('lessonModal', 'btnLessonClose');
  }

  function bind() {
    var i, els = document.querySelectorAll('[data-info]');
    for (i = 0; i < els.length; i++) { els[i].addEventListener('click', function () { openInfo(+this.getAttribute('data-info')); }); }
    els = document.querySelectorAll('[data-lesson]');
    for (i = 0; i < els.length; i++) { els[i].addEventListener('click', function () { openLesson(+this.getAttribute('data-lesson')); }); }
  }

  function init() {
    $('btnInfoClose').addEventListener('click', closeModals);
    $('btnLessonClose').addEventListener('click', closeModals);
    ['infoModal', 'lessonModal'].forEach(function (id) {
      $(id).addEventListener('click', function (e) { if (e.target === $(id)) { closeModals(); } });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModals(); } });
    loadAll(render);
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
