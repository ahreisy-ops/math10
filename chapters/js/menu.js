
(function () {
  'use strict';

  /**
   * مسیر فایل داده و صفحهٔ آزمون هر فصل را اینجا تنظیم کن.
   * data  → فایل questions مربوط به آن فصل (برای خواندن تعداد سؤال و مهارت‌ها)
   * exam  → صفحهٔ HTML آزمون
   */
  var CHAPTERS = [
    {n: 1, data: 'chapters/js/questions-chapter1.js', exam: 'chapters/chapter1.html'},
    {n: 2, data: 'chapters/js/questions-chapter2.js', exam: 'chapters/chapter2.html'},
    {n: 3, data: 'chapters/js/questions-chapter3.js', exam: 'chapters/chapter3.html'},
    {n: 4, data: 'chapters/js/questions-chapter4.js', exam: 'chapters/chapter4.html'},
    {n: 5, data: 'chapters/js/questions-chapter5.js', exam: 'chapters/chapter5.html'},
    {n: 6, data: 'chapters/js/questions-chapter6.js', exam: 'chapters/chapter6.html'},
    {n: 7, data: 'chapters/js/questions-chapter7.js', exam: 'chapters/chapter7.html'}
  ];

  var loaded = [];
  var statusEl = document.getElementById('status');
  var grid = document.getElementById('grid');

  function faNum(n) {
    return String(n).replace(/\d/g, function (d) {
      return '۰۱۲۳۴۵۶۷۸۹'[d];
    });
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.onload = function () {resolve();};
      s.onerror = function () {reject(new Error('بارگذاری نشد: ' + src));};
      document.head.appendChild(s);
    });
  }

  function snapshot(cfg) {
    var meta = window.EXAM_META || {};
    var skills = window.SKILLS || {};
    var qs = window.QUESTIONS || [];
    return {
      n: cfg.n,
      exam: cfg.exam,
      title: meta.chapterTitle || meta.title || ('فصل ' + cfg.n),
      intro: meta.intro || '',
      count: qs.length,
      skills: skills
    };
  }

  function clearGlobals() {
    try {
      delete window.EXAM_META;
      delete window.SKILLS;
      delete window.QUESTIONS;
      delete window.ERR_NAMES;
      delete window.CHAPTER_INFO;
    } catch (e) {
      window.EXAM_META = undefined;
      window.SKILLS = undefined;
      window.QUESTIONS = undefined;
    }
  }

  function renderMathInElementIfAvailable(root) {
    if (typeof window.renderMathInElement !== 'function') return;
    window.renderMathInElement(root, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '\\[', right: '\\]', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false}
      ],
      throwOnError: false
    });
  }

  function loadAll() {
    var i = 0;
    function next() {
      if (i >= CHAPTERS.length) {
        render();
        return;
      }
      var cfg = CHAPTERS[i++];
      clearGlobals();
      loadScript(cfg.data)
        .then(function () {
          loaded.push(snapshot(cfg));
          next();
        })
        .catch(function (err) {
          loaded.push({
            n: cfg.n,
            exam: cfg.exam,
            title: 'فصل ' + faNum(cfg.n),
            intro: '------------',
            count: null,
            skills: {},
            error: err.message
          });
          next();
        });
    }
    next();
  }

  function render() {
    var errors = loaded.filter(function (c) {return c.error;});
    if (errors.length) {
      statusEl.className = 'status error';
      statusEl.textContent = 'بعضی از بخش‌ها بارگذاری نشدند. مسیر فایل‌های questions را در CHAPTERS داخل menu.html بررسی کن.';
    } else {
      statusEl.className = 'status ok';
      statusEl.hidden = true;
    }

    grid.innerHTML = '';
    loaded.forEach(function (ch) {
      var card = document.createElement('article');
      card.className = 'card';

      var countLabel = ch.count == null
        ? '—'
        : faNum(ch.count) + ' سؤال';

      card.innerHTML =
        '<div class="card-top">' +
        '<div class="card-title-wrap">' +
        '<div class="titlebar">' +
        '<h2 class="card-title">' +
        escapeHtml(ch.title) +
        '</h2>' +
        '<button class="infobtn open-info" aria-label="دربارهٔ مبحث‌های این بخش" data-n="' + ch.n + '" title="مشاهدهٔ مباحث">i</button>' +
        '</div>' +
        '<div class="meta-row">' +
        '<span class="chip">فصل ' + faNum(ch.n) + '</span>' +
        '<span class="chip"><strong>' + countLabel + '</strong></span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="actions">' +
        '<a class="btn primary" href="' + ch.exam + '">شروع آزمون</a>' +
        '<button type="button" class="btn ghost open-lesson" data-title="' + escapeAttr(ch.title) + '">درسنامه</button>' +
        '</div>';

      grid.appendChild(card);
    });

    grid.querySelectorAll('.open-info').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var n = parseInt(this.getAttribute('data-n'), 10);
        var ch = loaded.find(function (c) {return c.n === n;});
        if (ch) openInfo(ch);
      });
    });
    grid.querySelectorAll('.open-lesson').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openLesson(this.getAttribute('data-title'));
      });
    });
  }

  function escapeHtml(t) {
    return String(t)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function escapeAttr(t) {
    return escapeHtml(t).replace(/'/g, '&#39;');
  }

  /* ---- مودال فصل ---- */
  var infoModal = document.getElementById('infoModal');
  var infoTitle = document.getElementById('infoTitle');
  var infoLead = document.getElementById('infoLead');
  var infoList = document.getElementById('infoList');

  function openInfo(ch) {
    infoTitle.textContent = ch.title;
    infoLead.textContent = ch.intro ||
      'در این بخش دربارهٔ این مباحث تعیین سطح می‌شوی. روی هر مبحث بزن تا توضیح کوتاهش را ببینی.';
    infoList.innerHTML = '';
    var ids = Object.keys(ch.skills || {});
    if (!ids.length) {
      infoList.innerHTML = '<p class="lead">مبحثی ثبت نشده است.</p>';
    } else {
      ids.forEach(function (id) {
        var sk = ch.skills[id];
        var item = document.createElement('div');
        item.className = 'topicitem';
        item.innerHTML =
          '<button type="button" class="topicbtn" aria-expanded="false">' +
          '<span class="plus">+</span>' +
          '<span class="tname">' + escapeHtml(sk.name || id) + '</span>' +
          '</button>' +
          '<div class="tdesc" hidden>' + escapeHtml(sk.desc || 'توضیحی ثبت نشده است.') + '</div>';
        infoList.appendChild(item);
      });
      infoList.querySelectorAll('.topicbtn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var d = this.parentNode.querySelector('.tdesc');
          var open = d.hidden;
          d.hidden = !open;
          this.setAttribute('aria-expanded', open ? 'true' : 'false');
          this.querySelector('.plus').textContent = open ? '−' : '+';
        });
      });
    }
    infoModal.hidden = false;
    renderMathInElementIfAvailable(infoModal);
    document.getElementById('btnInfoClose').focus();
  }

  function closeInfo() {infoModal.hidden = true;}
  document.getElementById('btnInfoClose').addEventListener('click', closeInfo);
  infoModal.addEventListener('click', function (e) {
    if (e.target === infoModal) closeInfo();
  });

  /* ---- مودال درسنامه ---- */
  var lessonModal = document.getElementById('lessonModal');
  function openLesson(title) {
    document.getElementById('lessonTitle').textContent =
      'درسنامهٔ «' + (title || '') + '»';
    lessonModal.hidden = false;
    renderMathInElementIfAvailable(lessonModal);
    document.getElementById('btnLessonClose').focus();
  }
  function closeLesson() {lessonModal.hidden = true;}
  document.getElementById('btnLessonClose').addEventListener('click', closeLesson);
  lessonModal.addEventListener('click', function (e) {
    if (e.target === lessonModal) closeLesson();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!infoModal.hidden) closeInfo();
    if (!lessonModal.hidden) closeLesson();
  });

  loadAll();
})();