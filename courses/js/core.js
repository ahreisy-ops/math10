/* ==========================================================================
   core.js — پوستهٔ صفحهٔ درسنامه (مشترک بین همهٔ فصل‌ها): لودر، فهرست مهارت‌ها، «+» و اجزای عمومی متن (K)
   ساختار: data/ch<N>.js (فهرست مهارت‌ها) · lessons/ch<N>/<id>.js (هر درس و تمرین‌های اختصاصی‌اش)
           js/shared/*.js (ماژول‌های مشترک؛ هر درس با needs:[...] فقط آنچه لازم دارد را لود می‌کند)
   صفحه: course.html?ch=<N>
   ========================================================================== */
(function () {
  'use strict';
  var ML = window.MathLite, fa = ML.fa, esc = ML.esc, rr = ML.renderRich;
  function $(id) { return document.getElementById(id); }

  /* ---------- اجزای عمومی متن درس‌ها (K) ---------- */
  var df = function (t) { return t.replace(/\\frac/g, '\\dfrac'); };
  var K = { df: df };
  K.sn = function (n, t) { return '<h3><span class="sn">' + n + '</span>' + t + '</h3>'; };;
  K.dm = function (t, k) { return '<div class="dm' + (k ? ' k' : '') + '">$' + df(t) + '$</div>'; };;
  K.box = function (cls, title, body) { return '<div class="box ' + cls + '"><b class="t">' + title + '</b>' + body + '</div>'; };;
  K.tbl = function (head, rows, cls) {
      var h = '<div class="tw"><table><tr>' + head.map(function (x) { return '<th>' + x + '</th>'; }).join('') + '</tr>';
      rows.forEach(function (r) { h += '<tr>' + r.map(function (x, i) { return '<td' + (cls && cls[i] ? ' class="' + cls[i] + '"' : '') + '>' + x + '</td>'; }).join('') + '</tr>'; });
      return h + '</table></div>';
    };;
    /* مراحل رنگی حل عبارت: lines=[[ 'tex' | {t,l,c} ,...],...] — برچسب‌ها متن معمولی‌اند، نه داخل KaTeX */
  K.ord = function (lines) {
      return '<div class="ord">' + lines.map(function (l) {
        return '<div class="ol">' + l.map(function (x) { return typeof x === 'string' ? '<span class="ot">$' + df(x) + '$</span>' : '<span class="og c' + x.c + '"><span class="ot">$' + df(x.t) + '$</span>' + (x.l ? '<i>' + x.l + '</i>' : '') + '</span>'; }).join('') + '</div>';
      }).join('') + '</div>';
    };;

  /* ---- آیکون i با دیالوگ توضیح (مثل منوی اصلی) ---- */
  var TIPS = {}, modal;
  K.info = function (key, title, html) { TIPS[key] = { t: title, h: html }; return '<button type="button" class="infobtn sm" data-tip="' + key + '" aria-label="توضیح: ' + title + '">i</button>'; };
  function openTip(key) {
    var d = TIPS[key]; if (!d) { return; }
    if (!modal) {
      modal = document.createElement('div'); modal.className = 'modal'; modal.hidden = true; modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true');
      modal.innerHTML = '<div class="modal-box info-box"><div class="info-container"><h2></h2></div><div class="infolist"></div><div class="modal-act"><button type="button" class="btn primary">متوجه شدم</button></div></div>';
      document.body.appendChild(modal);
      modal.addEventListener('click', function (e) { if (e.target === modal || e.target.closest('.modal-act .btn')) { modal.hidden = true; } });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { modal.hidden = true; } });
    }
    modal.querySelector('h2').textContent = d.t; modal.querySelector('.infolist').innerHTML = rr(d.h); modal.hidden = false;
  }
  /* همهٔ عددهای داخل متن درس با KaTeX نمایش داده می‌شوند (جلوگیری از به‌هم‌ریختگی ترتیب در متن فارسی) */
  function mathify(root) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), list = [], n;
    while ((n = w.nextNode())) { if (/[0-9۰-۹]/.test(n.nodeValue) && !n.parentNode.closest('.katex,.sn,.cover,.nl,.stg,.pl,.fq,.og,.ot,.dm,.ord,button,svg,script,style,input')) { list.push(n); } }
    list.forEach(function (nd) {
      var t = nd.nodeValue, re = /[0-9۰-۹]+(?:[.٫][0-9۰-۹]+)?/g, last = 0, m, f = document.createDocumentFragment(), sp;
      while ((m = re.exec(t))) {
        if (m.index > last) { f.appendChild(document.createTextNode(t.slice(last, m.index))); }
        sp = document.createElement('span'); sp.className = 'nm';
        sp.innerHTML = rr('$' + m[0].replace(/[۰-۹]/g, function (c) { return c.charCodeAt(0) - 1776; }).replace('٫', '.') + '$'); f.appendChild(sp); last = m.index + m[0].length;
      }
      f.appendChild(document.createTextNode(t.slice(last))); nd.parentNode.replaceChild(f, nd);
    });
  }
  /* Uniform lesson feedback: keep the result in its colored box, move
     explanatory paragraphs into a separate dashed box. Never change answers. */
  function normalizeFeedback(root) {
    var items = [];
    if (root.nodeType === 1 && root.matches && root.matches('.lesson .fb')) { items.push(root); }
    if (root.querySelectorAll) { items = items.concat([].slice.call(root.querySelectorAll('.lesson .fb'))); }
    items.forEach(function (fb) {
      if (fb.dataset.quiz44Fb) { return; }
      fb.dataset.quiz44Fb = '1';
      var paragraphs = [].slice.call(fb.children).filter(function (child) { return child.tagName === 'P'; });
      if (paragraphs.length) {
        var ex = document.createElement('div'); ex.className = 'ex';
        paragraphs.forEach(function (p) { ex.appendChild(p); });
        fb.insertAdjacentElement('afterend', ex);
      }
      if (fb.classList.contains('ok') && !/[✓✔]/.test(fb.textContent)) {
        var tick = document.createElement('span'); tick.className = 'quiz44-tick';
        tick.textContent = '✓ '; tick.setAttribute('aria-hidden', 'true'); fb.insertBefore(tick, fb.firstChild);
      }
    });
  }
  new MutationObserver(function (records) {
    records.forEach(function (r) { r.addedNodes.forEach(normalizeFeedback); });
  }).observe(document.body, { childList: true, subtree: true });
  /* Follow the same dashed point and value bubble used on N01's number line. */
  var hoveredHit = null;
  function clearLineHover() {
    if (hoveredHit) { hoveredHit = null; }
    document.querySelectorAll('.quiz44-hov-ghost,.quiz44-hov-tip').forEach(function (e) { e.remove(); });
  }
  document.addEventListener('pointerover', function (e) {
    var hit = e.target.closest && e.target.closest('.lv .hit[data-v]');
    if (!hit || hit === hoveredHit) { return; }
    clearLineHover(); hoveredHit = hit;
    var line = hit.closest('.lv'), axis = line && line.querySelector('.ax');
    if (!line || !axis) { return; }
    var lr = line.getBoundingClientRect(), hr = hit.getBoundingClientRect(), ar = axis.getBoundingClientRect();
    var x = hr.left + hr.width / 2 - lr.left, y = ar.top - lr.top;
    var ghost = document.createElement('span'); ghost.className = 'quiz44-hov-ghost';
    ghost.style.left = x + 'px'; ghost.style.top = y + 'px';
    var tip = document.createElement('span'); tip.className = 'quiz44-hov-tip';
    tip.style.left = x + 'px'; tip.style.top = (y - 77) + 'px';
    tip.textContent = hit.dataset.label || hit.dataset.v;
    line.appendChild(ghost); line.appendChild(tip);
  });
  document.addEventListener('pointerout', function (e) {
    if (!hoveredHit) { return; }
    if (e.target === hoveredHit || !e.relatedTarget || !hoveredHit.contains(e.relatedTarget)) { clearLineHover(); }
  });
  window.CourseKit = K;

  /* ---------- لودر اسکریپت‌ها: Loader مشترک پروژه (chapters/js/loader.js) ---------- */
  var load = window.Loader.load;
  /* ماژول‌های مشترک: برای افزودن ماژول جدید فقط یک خط اینجا اضافه کن */
  var MODULES = {
    utils:      { src: 'js/shared/utils.js' },
    inputs:     { src: 'js/shared/inputs.js' },
    numberline: { src: 'js/shared/numberline.js' },
    frac:       { src: 'js/shared/frac.js', needs: ['utils'] },
    algebra:    { src: 'js/shared/algebra.js' },
    algebra2:   { src: 'js/shared/algebra2.js' },
    a01lab:     { src: 'js/shared/a01-lab.js' },
    a06lab:     { src: 'js/shared/a06-lab.js' },
    a78lab:     { src: 'js/shared/a07a08-labs.js' },
    a05lab:     { src: 'js/shared/a05-lab.js' }
  };
  function need(names) {
    return Promise.all((names || []).map(function (n) {
      var m = MODULES[n]; if (!m) { return Promise.reject(new Error('module ' + n)); }
      return need(m.needs).then(function () { return load(m.src); });
    }));
  }
  K.need = need;
  window.LESSONS = window.LESSONS || {};

  /* ---------- شروع: فصل از ?ch=N ؛ اطلاعات فصل از data/chN.js (مشترک با آزمون و منو) ---------- */
  var CH = parseInt(new URLSearchParams(location.search).get('ch'), 10) || 1;
  var CHAPTER_OF = { N: 1, A: 2, E: 3, C: 4, G: 5, S: 6, P: 7 };
  Promise.all([load('../data/ch' + CH + '.js'), load('../chapters/js/heroes.js')])
    .then(start, function () { $('skills').innerHTML = '<p class="soon">فصل پیدا نشد.</p>'; });

  function start() {
    var D = window.CH[CH], C = { n: CH, title: D.meta.chapterTitle, desc: D.meta.desc, ready: D.ready || [], skills: D.skills }, S = C.skills;
    var Hr = (window.HEROES || {})[CH];
    if (Hr) { var hh = $('heroHost'); hh.className = Hr.cls; hh.innerHTML = Hr.svg; }
    $('cNum').textContent = fa(C.n); $('cTitle').textContent = C.title; $('cDesc').textContent = C.desc || '';
    document.title = 'درسنامه — ' + C.title;
    $('btnExam').href = '../chapters/chapter.html?ch=' + C.n;

    function chips(sid) {
      var s = S[sid], h = '';
      (s.prereq || []).forEach(function (p) { if (S[p]) { h += '<a href="#sk-' + p + '" data-goto="' + p + '">' + esc(S[p].name) + '</a>'; } });
      (s.external || []).forEach(function (e) {
        var c = CHAPTER_OF[String(e.id).charAt(0)];
        if (c) { h += '<a class="ext" href="course.html?ch=' + c + '#sk-' + e.id + '">' + esc(e.name) + '</a>'; }
      });
      return h ? '<div class="prereqs"><span>پیش‌نیاز:</span>' + h + '</div>' : '';
    }
    var h = '', n = 0, id;
    for (id in S) {
      n++;
      var ready = C.ready.indexOf(id) > -1;
      h += '<article class="skill" id="sk-' + id + '"><div class="skhead">' +
        '<button type="button" class="skplus" aria-expanded="false" aria-controls="p-' + id + '" aria-label="باز کردن درسنامه: ' + esc(S[id].name) + '"><span>+</span></button>' +
        '<div class="sktext"><span class="sknum">' + fa(n) + '</span><h2>' + esc(S[id].name) + (ready ? '' : '<span class="soonbadge">به‌زودی</span>') + '</h2>' +
        '<p>' + ML.renderRich(esc(S[id].desc || '')) + '</p>' + chips(id) + '</div></div><div class="skpanel" id="p-' + id + '" hidden></div></article>';
    }
    var box = $('skills'); box.innerHTML = h;

    function show(sid, panel) {
      var L = window.LESSONS[sid];
      if (L.setup) { var r = L.setup(K); L.html = r.html; L.init = r.init; L.setup = null; }   // بدنهٔ درس بعد از لود شدن needs ساخته می‌شود
      panel.innerHTML = '<div class="lesson">' + ML.renderRich(L.html(K)) + '</div>';
      mathify(panel.querySelector('.lesson')); if (L.init) { L.init(panel, K); }
    }
    function openSkill(sid) {
      var art = $('sk-' + sid); if (!art) { return; }
      var b = art.querySelector('.skplus'); if (b.getAttribute('aria-expanded') !== 'true') { b.click(); }
      art.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    box.addEventListener('click', function (e) {
      var go = e.target.closest('a[data-goto]'); if (go) { e.preventDefault(); openSkill(go.getAttribute('data-goto')); return; }
      var tip = e.target.closest('.infobtn, .tipg'); if (tip && tip.dataset.tip) { openTip(tip.dataset.tip); return; }
      var btn = e.target.closest('.skplus'); if (!btn) { return; }
      var art = btn.closest('.skill'), sid = art.id.slice(3), panel = art.querySelector('.skpanel'), isOpen = panel.hidden;
      panel.hidden = !isOpen; btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false'); art.classList.toggle('open', isOpen);
      if (!isOpen || panel.dataset.done) { return; }
      if (C.ready.indexOf(sid) < 0) { panel.dataset.done = 1; panel.innerHTML = '<p class="soon">درسنامهٔ این مهارت به‌زودی اضافه می‌شود.</p>'; return; }
      panel.innerHTML = '<p class="soon">در حال بارگذاری…</p>';
      /* فقط همین درس + ماژول‌هایی که خودش اعلام کرده (needs) لود می‌شوند */
      load('lessons/ch' + C.n + '/' + sid + '.js')
        .then(function () { var Ls = window.LESSONS[sid]; return need(Ls.needs).then(function () { panel.dataset.done = 1; show(sid, panel); }); })
        .catch(function () { panel.innerHTML = '<p class="soon">بارگذاری نشد؛ دوباره «+» را بزن.</p>'; });
    });
    /* رفتن به صورت سؤال پس از پیمایش یا تولید سؤال جدید.
       رویداد در فاز capture ثبت می‌شود تا حتی اگر handler فعالیت خود دکمه را
       با innerHTML جایگزین کند، محل پایدار فعالیت را از دست ندهیم. */
    var questionActions = /(?:س[ؤو]ال|پرسش|مرحله|گام|دروازه|شرط|مقیاس|مسئله|جدول|مثال|عدد|کسر|پایه|معما|دور|مجموعه|تمرین).*(?:بعد|قبل|جدید|تازه|دیگر|از اول)|(?:مرور سؤال|مشاهدهٔ سؤال)/;
    var questionDataKeys = /^(?:next|prev|nx|n|p|nw|new|fresh|restart|review|labNext|labPrev|gateNext|r)$/i;
    function promptInActivity(host) {
      if (!host || !host.isConnected) { return null; }
      var selectors = ['.ask', '.a78-ask', '.alg2-ask', '.a06-ask', '.q-ask', '.quiz-ask', '.question-text', '.question-prompt', '.prompt', '.qline', '.cq'];
      for (var i = 0; i < selectors.length; i++) {
        var nodes = host.querySelectorAll(selectors[i]);
        for (var j = 0; j < nodes.length; j++) {
          if (nodes[j].getClientRects().length && !nodes[j].closest('.fb, .ex, .opts, .end-actions, .a78-actions')) { return nodes[j]; }
        }
      }
      var candidates = host.querySelectorAll('p, h4, .a78-labhead');
      for (var k = 0; k < candidates.length; k++) {
        if (candidates[k].getClientRects().length && !candidates[k].closest('.fb, .ex, .opts, .end-actions, .a78-actions')) { return candidates[k]; }
      }
      return host;
    }
    // If this activity has a visible progress strip preceding its prompt, scroll to
    // the strip so both the progress and the question remain in view.
    function progressOrPrompt(host) {
      var prompt = promptInActivity(host);
      if (!prompt) { return null; }
      var strips = host.querySelectorAll('.stg, .alg2-progress');
      var selected = null;
      for (var i = 0; i < strips.length; i++) {
        var strip = strips[i];
        if (!strip.getClientRects().length) { continue; }
        // Only a progress strip immediately preceding the prompt is eligible.
        // Prevent accidentally choosing a progress strip from another activity.
        var order = strip.compareDocumentPosition(prompt);
        if (!(order & Node.DOCUMENT_POSITION_FOLLOWING)) { continue; }
        var gap = prompt.getBoundingClientRect().top - strip.getBoundingClientRect().top;
        if (gap < 0 || gap > 350) { continue; }
        if (!selected || strip.compareDocumentPosition(selected) & Node.DOCUMENT_POSITION_PRECEDING) {
          selected = strip;
        }
      }
      return selected || prompt;
    }
    function activityForButton(button) {
      // به جای نزدیک‌ترین id (که ممکن است متعلق به خود دکمه یا نوار گزینه‌ها باشد)،
      // نزدیک‌ترین ریشهٔ واقعی یک فعالیت را نگه می‌داریم.
      var host = button.closest('.alg2-slot, .cover, .a2-final, [data-activity]');
      if (host) { return host; }
      var el = button.parentElement;
      while (el && el !== box) {
        if (el.id && !/^(?:sk-|p-)/.test(el.id) &&
            /(?:lab|quiz|practice|final|work|exercise|game|mc|stage|test|radar|step|qz|fn|pk|sr|pl|lr|sd|A0|N0)/i.test(el.id)) {
          return el;
        }
        el = el.parentElement;
      }
      // Never broaden a question-navigation search to the entire lesson.
      // Without a trustworthy activity root it is safer not to scroll.
      return null;
    }
    // Precise, activity-local scroll destinations for controls whose questions are
    // not represented by the generic .ask / progress-strip structure.
    // Capture the stable activity root before its click handler redraws its contents.
    function specialScroll(button) {
      var root = null, selector = null;
      if (button.closest('#cards1') && button.matches('[data-new], [data-easy], [data-again], .cd')) {
        root = button.closest('#cards1'); selector = '.cards';
      } else if (button.closest('#n3b') && button.matches('[data-nx]')) {
        root = button.closest('#n3b'); selector = '.scw';
      } else if (button.closest('#ll') && button.matches('[data-nx]')) {
        root = button.closest('#ll'); selector = '.chips';
      } else if (button.closest('#rh') && button.matches('[data-nw]')) {
        root = button.closest('#rh'); selector = '.n7-hunt-modes';
      } else if (button.closest('.a05-lab') && button.matches('[data-random]')) {
        root = button.closest('.a05-lab').parentElement; selector = '.a05-lab-head';
      }
      if (!root || !root.isConnected) { return false; }
      var observer, done = false;
      function move() {
        if (done) return;
        var target = root.querySelector(selector);
        if (!target || !target.getClientRects().length) return;
        done = true;
        observer.disconnect();
        window.scrollTo({top:Math.max(0,window.scrollY+target.getBoundingClientRect().top-80),behavior:'smooth'});
      }
      observer = new MutationObserver(function(records) {
        if (records.some(function(r){return r.type==='childList'||r.type==='characterData';})) {
          requestAnimationFrame(function(){requestAnimationFrame(move);});
        }
      });
      observer.observe(root,{childList:true,characterData:true,subtree:true});
      setTimeout(function(){observer.disconnect();},2500);
      return true;
    }
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b || b.disabled) { return; }
      if (specialScroll(b)) { return; }
      var label = (b.textContent || '').trim().replace(/\s+/g, ' ');
      var action = questionActions.test(label);
      if (!action) {
        for (var key in b.dataset) { if (questionDataKeys.test(key)) { action = true; break; } }
      }
      if (!action) { return; }
      var host = activityForButton(b);
      if (!host) { return; }
      // Do not jump immediately: at this point the activity click handler has not run.
      // Wait for a real DOM update within this exact activity; a stable root also
      // prevents a sibling activity's progress strip from being selected.
      var done = false;
      var observer;
      var pending = false;
      function move() {
        pending = false;
        if (done || !host.isConnected) { if (observer) observer.disconnect(); return; }
        var target = progressOrPrompt(host);
        if (!target || !host.contains(target)) { return; }
        done = true;
        if (observer) observer.disconnect();
        var top = window.scrollY + target.getBoundingClientRect().top - 80;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }
      function schedule() {
        if (pending || done) { return; }
        pending = true;
        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(move);
        });
      }
      observer = new MutationObserver(function (records) {
        // DOM mutations are the signal that the activity has rendered its new state.
        // Ignore attribute-only changes that do not signify a new question.
        for (var i = 0; i < records.length; i++) {
          if (records[i].type === 'childList' || records[i].type === 'characterData') {
            schedule();
            break;
          }
        }
      });
      observer.observe(host, { childList: true, characterData: true, subtree: true });
      window.setTimeout(function () { observer.disconnect(); }, 2500);
    }, true);
    if (/^#sk-/.test(location.hash)) { openSkill(location.hash.slice(4)); }
  }
})();
