/* ==========================================================================
   Shared — منطق مشترک همهٔ فصل‌ها (نمایش سؤال، تصحیح، طبقه‌بندی، گزارش، دانلود)
   داده‌ها در questions.js هستند. این فایل هیچ وابستگی خارجی ندارد.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- حالت توسعه ----------
 'on'  → با شروع آزمون همه پاسخ‌ها «نمی‌دانم» می‌شود و مستقیم گزارش می‌آید
 'off' → رفتار عادی */
  var DEVELOPMENT = 'off';
  function devSkipToResult() {
    Q.forEach(function (q) { resp[q.id] = { unsure: true }; });
    startedAt = new Date();
    finish();
  }

  var ML = window.MathLite;
  var fa = ML.fa;
  var faHtml = ML.faHtml;
  var esc = ML.esc;
  var renderRich = ML.renderRich;
  var plainRich = ML.plainRich;

  var Q = window.QUESTIONS;
  var SK = window.SKILLS;
  var META = window.EXAM_META;
  var ERR = window.ERR_NAMES;

  /* ---------- آدرس منوی اصلی ---------- */
  var MENU_URL = '../index.html';

  /* ---------- تنظیمات امتیازدهی و طبقه‌بندی ---------- */
  var WEIGHTS = { basic: 1, medium: 2, hard: 3 };
  var DIFF_FA = { basic: 'پایه', medium: 'متوسط', hard: 'نسبتاً دشوار' };
  var CRIT = {
    masteredRatio: 0.5,  // حداقل نسبت امتیاز وزنی برای «مسلط»
    weakRatio: 0.25      // کمتر از این نسبت (به‌علاوهٔ نادرست‌بودن سؤال پایه) یعنی «اصلاً بلد نیست»
  };
  var STATUS = {
    mastered: { label: 'مسلط', cls: 'st-ok' },
    practice: { label: 'نیازمند مطالعه و تمرین بیشتر', cls: 'st-mid' },
    weak: { label: 'اصلاً بلد نیست / نیازمند آموزش از پایه', cls: 'st-bad' }
  };
  var LET = ['الف', 'ب', 'ج', 'د', 'ه'];
  var CONF_TEXT = {
    high: 'اطمینان تشخیص: بالا — پاسخ‌ها با ترتیب دشواری سؤال‌ها سازگارند.',
    mid: 'اطمینان تشخیص: متوسط — یک سؤال دشوارتر درست و یک سؤال ساده‌تر غلط یا «نمی‌دانم» بوده؛ ممکن است بی‌دقتی یا حدس در کار بوده باشد.',
    low: 'اطمینان تشخیص: کم — حدود نیمی (یا بیشتر) از پاسخ‌ها «نمی‌دانم» بوده و شواهد برای قضاوت قوی نیست.'
  };

  /* ---------- نام گویا برای هر مهارت در جملهٔ گزارش ---------- */
  function sentenceFor(status, name) {
    if (status === 'mastered') {
      return 'در «' + name + '» مسلط هستی و می‌توانی به آن تکیه کنی.';
    }
    if (status === 'practice') {
      return 'در «' + name + '» بخشی از مهارت را داری، اما برای اینکه کاملاً به آن تکیه کنی لازم است بیشتر مطالعه و تمرین کنی.';
    }
    return 'برای «' + name + '» بهتر است آموزش را از پایه شروع کنی و قدم‌به‌قدم تمرین کنی.';
  }

  /* ---------- CSS مشترک ریاضی و گزارش (برای صفحه و فایل نتیجه) ---------- */
  var MATH_CSS =
    '.m{direction:ltr;unicode-bidi:isolate;display:inline-block;white-space:nowrap;font-size:1.08em}' +
    '.m i{font-style:italic;font-family:"Times New Roman",Times,serif;font-size:1.06em}' +
    '.fr{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;margin:0 .18em;line-height:1.3}' +
    '.fr .n{border-bottom:1.6px solid currentColor;padding:0 .25em}' +
    '.fr .d{padding:0 .25em}' +
    'sup{font-size:.72em;line-height:0}' +
    '.mathline{margin:.7em 0 .2em;text-align:center;font-size:1.25em}' +
    '.figrow{display:flex;justify-content:center;flex-wrap:wrap;gap:10px;margin:8px 0}' +
    '.figrow svg{max-width:100%;height:auto}' +
    '.tblwrap{overflow-x:auto;max-width:100%;margin:.5em 0}' +
    '.dt{border-collapse:collapse;margin:.3em auto;text-align:center}' +
    '.dt th,.dt td{border:1.5px solid #14213d;padding:2px 9px;min-width:34px;white-space:nowrap}' +
    '.dt th{background:#eef2f8}' +
    '.steps{list-style:none;margin:.6em 0 0;padding:0;counter-reset:st}' +
    '.steps li{counter-increment:st;display:flex;align-items:center;gap:10px;margin:6px 0;line-height:1.9}' +
    '.steps li::before{content:counter(st,persian);flex:none;width:28px;height:28px;border-radius:50%;background:#14213d;color:#fff;' +
    'display:inline-flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:bold;box-shadow:2px 2px 0 #0e8f7e}' +
    '.katex{font-size:1.1em;direction:ltr;unicode-bidi:isolate}' +
    '.katex .mord.text{font-family:Tahoma,"Segoe UI",system-ui,sans-serif;font-style:normal}' +
    'math{direction:ltr;unicode-bidi:isolate;font-size:1.1em}';

  var REPORT_CSS = MATH_CSS +
    '*{box-sizing:border-box}' +
    'body{margin:0;background:#f3f6fa;color:#14213d;font-family:Tahoma,"Segoe UI",system-ui,sans-serif;line-height:1.9}' +
    '.rp{max-width:860px;margin:0 auto;padding:18px 14px 40px}' +
    '.rp h1{font-size:1.45rem;margin:0 0 4px}' +
    '.rp h2{font-size:1.12rem;margin:26px 0 10px;padding-bottom:6px;border-bottom:2px solid #d5dde8}' +
    '.rp .sub{margin:0;color:#4a5a73;font-size:.95rem}' +
    '.rp-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-top:16px}' +
    '.rp-stat{background:#fff;border:1px solid #d5dde8;border-radius:10px;padding:10px 12px}' +
    '.rp-stat b{display:block;font-size:1.35rem}' +
    '.rp-stat span{color:#4a5a73;font-size:.86rem}' +
    '.rp-box{background:#fff;border:1px solid #d5dde8;border-radius:10px;padding:12px 16px}' +
    '.rp-start{background:#eef4ff;border:1px solid #b8cdf5;border-radius:10px;padding:12px 16px}' +
    '.rp-skill{border-radius:10px;border:1px solid;border-right-width:8px;padding:10px 14px;margin:0 0 10px}' +
    '.rp-skill .top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:6px}' +
    '.rp-skill h3{margin:0;font-size:1.02rem}' +
    '.rp-skill .badge{font-size:.82rem;font-weight:bold;padding:2px 10px;border-radius:999px;color:#fff}' +
    '.rp-skill p{margin:6px 0 0}' +
    '.rp-skill .meta{color:#3b4a63;font-size:.88rem}' +
    '.rp-skill .note{font-size:.88rem;color:#5a4300}' +
    '.st-ok{background:#e7f5ea;border-color:#2e7d32}.st-ok .badge{background:#2e7d32}' +
    '.st-mid{background:#fff6d9;border-color:#d99a00}.st-mid .badge{background:#b57f00}' +
    '.st-bad{background:#fdeaea;border-color:#c62828}.st-bad .badge{background:#c62828}' +
    'details{background:#fff;border:1px solid #d5dde8;border-radius:10px;padding:8px 14px;margin:10px 0}' +
    'summary{cursor:pointer;font-weight:bold}' +
    'details ul{margin:8px 0;padding-right:1.3em}' +
    '.rv{border-top:1px dashed #cdd6e3;padding:10px 0}' +
    '.rv:first-of-type{border-top:0}' +
    '.rv .tag{display:inline-block;font-size:.8rem;padding:1px 8px;border-radius:999px;margin-left:6px;color:#fff}' +
    '.rv .t-wrong{background:#c62828}.rv .t-unsure{background:#6b5ca5}' +
    '.rv .ans{font-size:.93rem}' +
    '.rp-box p,.rp-start,.rp-skill p,details p,details li,.rv>div,.rv .ans{text-align:justify}' +
    '.rv .t-ok{background:#2e7d32}' +
    '.rv .topic{color:#4a5a73;font-size:.82rem;margin-right:8px}' +
    'summary small{display:block;font-weight:normal;color:#4a5a73;font-size:.8rem;margin-top:2px}' +
    '.tipicon{font:italic bold .8rem "Times New Roman",serif;width:22px;height:22px;padding:0;margin:0 4px;border:2px solid #14213d;border-radius:50%;' +
    'background:#ffc233;color:#14213d;cursor:pointer;line-height:1;vertical-align:middle;display:inline-flex;align-items:center;justify-content:center}' +
    '.tipmodal{position:fixed;top:0;right:0;bottom:0;left:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(20,33,61,.55)}' +
    '.tipbox{width:100%;max-width:420px;background:#fff;color:#14213d;border:2px solid #14213d;border-radius:12px;padding:14px 18px;box-shadow:4px 4px 0 #14213d}' +
    '.tipbox h3{margin:0 0 6px;font-size:1.05rem}.tipbox p{margin:0 0 12px;line-height:1.9}' +
    '.tipclose{font:inherit;font-weight:bold;min-height:40px;padding:4px 18px;border:2px solid #14213d;border-radius:10px;background:#fff;cursor:pointer}' +
    '@media(max-width:520px){.rp h1{font-size:1.2rem}}';

  /* ---------- ریاضی: LaTeX با KaTeX (نسخهٔ محلی کنار فایل‌های chapterN.html) ----------
     در داده‌ها فرمول‌ها به‌صورت $...$ نوشته می‌شوند. عبارت‌های ریاضی سادهٔ بدون $ که میان متن فارسی آمده باشند
     هم خودکار تشخیص داده و به LaTeX تبدیل می‌شوند. رقم‌ها (و اعشار) داخل فرمول فارسی می‌شوند.
     صفحهٔ آزمون: خروجی HTML ی KaTeX ؛ فایل نتیجه (که پوشهٔ KaTeX را ندارد): خروجی MathML. */
  var MATH_MODE = 'html';
  var SUPDIG = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };

  var MCH = '0-9٠-٩۰-۹A-Za-zπ√∞∈∉⊂⊆∪∩′°²³¹⁴-⁹±×÷=≤≥≠≈+\\-−–/^|,()\\[\\]{}…\\uE000-\\uE003';
  var TOK = '(?:&lt;|&gt;|[' + MCH + ']|[.:](?=[0-9٠-٩۰-۹]))';
  var RUN_RE = new RegExp(TOK + '(?:' + TOK + '|\\s(?=' + TOK + '))*', 'g');
  var START_RE = /^(?:&lt;|&gt;|[0-9٠-٩۰-۹A-Za-zπ√∞−+(\[{|])/;
  var CONTENT_RE = /[0-9٠-٩۰-۹A-Za-zπ√∞∈∉⊂⊆∪∩=≤≥≠≈+−×÷]|&lt;|&gt;/;
  function countOf(str, ch) { return str.split(ch).length - 1; }
  function runToTex(c) {
    c = c.replace(/\{/g, '\\{').replace(/\}/g, '\\}')
      .replace(/\uE000/g, '^{').replace(/\uE001/g, '}').replace(/\uE002/g, '_{').replace(/\uE003/g, '}');
    return symbolsToTex(c);
  }
  function wrapRun(m) {
    var lead = '', trail = '', core = m, pairs = [['(', ')'], ['[', ']'], ['{', '}']], k, again;
    while (core && !START_RE.test(core)) { lead += core.charAt(0); core = core.slice(1); }
    while (core && /[\s.,:;]$/.test(core)) { trail = core.slice(-1) + trail; core = core.slice(0, -1); }
    do {
      again = false;
      for (k = 0; k < pairs.length; k++) {
        if (core.slice(-1) === pairs[k][1] && countOf(core, pairs[k][1]) > countOf(core, pairs[k][0])) { trail = core.slice(-1) + trail; core = core.slice(0, -1); again = true; }
        if (core.charAt(0) === pairs[k][0] && countOf(core, pairs[k][0]) > countOf(core, pairs[k][1])) { lead += core.charAt(0); core = core.slice(1); again = true; }
      }
      while (core && /[\s.,:;]$/.test(core)) { trail = core.slice(-1) + trail; core = core.slice(0, -1); again = true; }
    } while (again);
    if (!core || !CONTENT_RE.test(core) || /^[0-9٠-٩۰-۹.,٫]+$/.test(core)) { return m; }   // فقط عدد = متن فارسی عادی
    return lead + '$' + runToTex(core) + '$' + trail;
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function $(id) { return document.getElementById(id); }

  function parseNum(s) {
    s = String(s).trim();
    s = s.replace(/[۰-۹]/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d); });
    s = s.replace(/[٠-٩]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); });
    s = s.replace(/[−–—]/g, '-').replace(/٫/g, '.').replace(/[٪%]/g, '').replace(/٬/g, '').replace(/\s+/g, '');
    if (/^\d{1,3}(,\d{3})+$/.test(s)) { s = s.replace(/,/g, ''); } else { s = s.replace(/,/g, '.'); }
    var m = s.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
    if (m) {
      var d = parseFloat(m[2]);
      if (d === 0) { return null; }
      return parseFloat(m[1]) / d;
    }
    if (/^-?\d+(?:\.\d+)?$/.test(s)) { return parseFloat(s); }
    return null;
  }
  function close(a, b) { return Math.abs(a - b) < 1e-9; }
  function n2(n) { return (n < 0 ? '−' : '') + Math.abs(n); }
  function ptHtml(x, y) { return '$(' + n2(x) + ', ' + n2(y) + ')$'; }

  /* ---------- محور اعداد (SVG) ---------- */
  function numLabel(v) {
    var t = String(Math.round(v * 1000) / 1000).replace('-', '−');
    return fa(t);
  }
  function lineSVG(cfg, opt) {
    opt = opt || {};
    var W = 640, H = 140, pad = 34, y = 78;
    var span = cfg.max - cfg.min;
    function X(v) { return pad + (v - cfg.min) / span * (W - 2 * pad); }
    var s = '<svg class="nline" viewBox="0 0 ' + W + ' ' + H + '" role="img" xmlns="http://www.w3.org/2000/svg" style="direction:ltr">';
    s += '<line x1="' + (pad - 14) + '" y1="' + y + '" x2="' + (W - pad + 14) + '" y2="' + y + '" class="axis"/>';
    s += '<path d="M' + (W - pad + 14) + ' ' + y + ' l-9 -5 v10 z" class="arrow"/>';
    s += '<path d="M' + (pad - 14) + ' ' + y + ' l9 -5 v10 z" class="arrow"/>';
    var n = Math.round(span / cfg.minor);
    for (var i = 0; i <= n; i++) {
      var v = cfg.min + i * cfg.minor;
      var isMajor = Math.abs(v / cfg.major - Math.round(v / cfg.major)) < 1e-9;
      var h = isMajor ? 12 : 6;
      s += '<line x1="' + X(v) + '" y1="' + (y - h) + '" x2="' + X(v) + '" y2="' + (y + h) + '" class="' + (isMajor ? 'tick major' : 'tick') + '"/>';
      if (isMajor) {
        s += '<text x="' + X(v) + '" y="' + (y + 34) + '" text-anchor="middle" class="tlabel">' + numLabel(v) + '</text>';
      }
    }
    var k;
    if (opt.marks) {
      for (k = 0; k < opt.marks.length; k++) {
        var mk = opt.marks[k];
        s += '<circle cx="' + X(mk.v) + '" cy="' + y + '" r="8" class="mark"/>';
        s += '<text x="' + X(mk.v) + '" y="' + (y - 20) + '" text-anchor="middle" class="plabel">' + mk.label + '</text>';
      }
    }
    if (opt.points) {
      for (k = 0; k < opt.points.length; k++) {
        var p = opt.points[k];
        var sel = (opt.selected === k) ? ' sel' : '';
        s += '<g class="pt' + sel + '" data-i="' + k + '" tabindex="0" role="button" aria-label="نقطهٔ ' + LET[k] + '">' +
          '<circle cx="' + X(p.v) + '" cy="' + y + '" r="18" class="hit"/>' +
          '<circle cx="' + X(p.v) + '" cy="' + y + '" r="8" class="dot"/>' +
          '<text x="' + X(p.v) + '" y="' + (y - 22) + '" text-anchor="middle" class="plabel">' + LET[k] + '</text></g>';
      }
    }
    s += '</svg>';
    return s;
  }

  /* ---------- وضعیت برنامه ---------- */
  var idx = 0;
  var resp = {};          // پاسخ‌ها: resp[id] = {v:...} یا {unsure:true}
  var startedAt = null;
  var lastFile = null;    // {name, html}

  function isComplete(q) {
    var r = resp[q.id];
    if (!r) { return false; }
    if (r.unsure) { return true; }
    switch (q.type) {
      case 'mcq':
      case 'numberline': return typeof r.v === 'number';
      case 'numeric': return String(r.v || '').trim() !== '';
      case 'multi': return !!r.v && r.v.length > 0;
      case 'gridpick': return !!r.v && r.v.length === 2;
      case 'order': return !!r.v && r.v.length === q.items.length;
      case 'match': return !!r.v && r.v.length === q.left.length && r.v.every(function (x) { return x >= 0; });
    }
    return false;
  }

  /* ---------- تصحیح ---------- */
  function evalQ(q, r) {
    if (!r || r.unsure) { return { status: 'unsure' }; }
    var ok = false, err = null, i;
    switch (q.type) {
      case 'mcq':
        ok = (r.v === q.answer);
        err = ok ? null : (q.options[r.v].err || null);
        break;
      case 'numberline':
        ok = (r.v === q.answer);
        err = ok ? null : (q.points[r.v].err || null);
        break;
      case 'numeric':
        var val = parseNum(r.v);
        if (val !== null && close(val, q.answer)) { ok = true; }
        else if (val !== null && q.traps) {
          for (i = 0; i < q.traps.length; i++) {
            if (close(val, q.traps[i].value)) { err = q.traps[i].err; break; }
          }
        }
        break;
      case 'gridpick':
        var a = q.answer, v2 = r.v;
        ok = (v2[0] === a[0] && v2[1] === a[1]);
        if (!ok) {
          if (a[0] !== a[1] && v2[0] === a[1] && v2[1] === a[0]) { err = 'swap'; }
          else if (Math.abs(v2[0]) === Math.abs(a[0]) && Math.abs(v2[1]) === Math.abs(a[1])) { err = 'sign'; }
        }
        break;
      case 'multi':
        ok = r.v.length === q.answer.length && q.answer.every(function (a, k) { return r.v[k] === a; });
        break;
      case 'order':
        ok = q.answer.every(function (a, k) { return r.v[k] === a; });
        break;
      case 'match':
        ok = q.answer.every(function (a, k) { return r.v[k] === a; });
        break;
    }
    return { status: ok ? 'correct' : 'wrong', err: err };
  }

  function correctHtml(q) {
    switch (q.type) {
      case 'mcq': return q.options[q.answer].t;
      case 'multi': return q.answer.map(function (i) { return q.options[i].t; }).join(' ، ');
      case 'gridpick': return ptHtml(q.answer[0], q.answer[1]);
      case 'numeric': return q.answerHtml;
      case 'numberline': return 'نقطهٔ «' + LET[q.answer] + '»';
      case 'order': return q.answer.map(function (i) { return q.items[i]; }).join(' ، ');
      case 'match': return q.left.map(function (l, i) { return l + ' = ' + M2(q.right[q.answer[i]]); }).join(' ، ');
    }
    return '';
  }
  function M2(t) { return String(t).replace(/[\u2066\u2069]/g, ''); }

  function userHtml(q, r) {
    if (!r || r.unsure) { return 'نمی‌دانم / مطمئن نیستم'; }
    switch (q.type) {
      case 'mcq': return q.options[r.v].t;
      case 'multi': return r.v.map(function (i) { return q.options[i].t; }).join(' ، ');
      case 'gridpick': return ptHtml(r.v[0], r.v[1]);
      /* پاسخ عددی کاربر ممکن است با رقم فارسی/عربی یا علامت − نوشته شده باشد.
   اگر همان را داخل $...$ بگذاریم، persianTex (که فقط رقم ASCII می‌شناسد) آن را
   به \text{...} تبدیل نمی‌کند و KaTeX رقم را با فونت ریاضی رندر می‌کند — با
   «پاسخ درست» فرق می‌کند. پس قبل از رندر، رقم و منفی را به ASCII نرمال می‌کنیم. */
      case 'numeric': {
        var raw = String(r.v).replace(/[$\\{}]/g, '');
        raw = raw
          .replace(/[۰-۹]/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d); })
          .replace(/[٠-٩]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); })
          .replace(/[−–—]/g, '-');
        return '$' + raw + '$';
      }
      case 'numberline': return 'نقطهٔ «' + LET[r.v] + '»';
      case 'order': return r.v.map(function (i) { return q.items[i]; }).join(' ، ');
      case 'match': return q.left.map(function (l, i) { return l + ' = ' + M2(q.right[r.v[i]]); }).join(' ، ');
    }
    return '';
  }

  /* ---------- تحلیل نهایی ---------- */
  function analyze() {
    var items = Q.map(function (q) {
      var r = resp[q.id];
      var e = evalQ(q, r);
      return { q: q, r: r, status: e.status, err: e.err };
    });

    var skills = Object.keys(SK).map(function (id) {
      var its = items.filter(function (it) { return it.q.skill === id; });
      var earned = 0, max = 0, c = 0, w = 0, u = 0, basicOk = true;
      var diffCount = { basic: 0, medium: 0, hard: 0 };
      var errCount = {};
      its.forEach(function (it) {
        var wt = WEIGHTS[it.q.difficulty];
        max += wt;
        diffCount[it.q.difficulty]++;
        if (it.status === 'correct') { earned += wt; c++; }
        else {
          if (it.status === 'wrong') { w++; if (it.err) { errCount[it.err] = (errCount[it.err] || 0) + 1; } }
          else { u++; }
          if (it.q.difficulty === 'basic') { basicOk = false; }
        }
      });
      // اطمینان تشخیص: آیا پاسخ‌ها با ترتیب دشواری سازگارند؟
      var incons = false;
      its.forEach(function (hi) {
        if (hi.status === 'correct') {
          its.forEach(function (lo) {
            if (WEIGHTS[lo.q.difficulty] < WEIGHTS[hi.q.difficulty] && lo.status !== 'correct') { incons = true; }
          });
        }
      });
      var conf = (u * 2 >= its.length) ? 'low' : (incons ? 'mid' : 'high');
      var ratio = max ? earned / max : 0;
      var status;
      if (ratio >= CRIT.masteredRatio && basicOk) { status = 'mastered'; }
      else if (ratio < CRIT.weakRatio && !basicOk) { status = 'weak'; }
      else { status = 'practice'; }
      return {
        id: id, name: SK[id].name, prereq: SK[id].prereq, status: status,
        n: its.length, correct: c, wrong: w, unsure: u, earned: earned, max: max, ratio: ratio,
        diffCount: diffCount, errCount: errCount, conf: conf
      };
    });

    var byId = {};
    skills.forEach(function (s) { byId[s.id] = s; });

    // نقطهٔ شروع منطقی: مهارت‌های کامل‌نشده‌ای که همهٔ پیش‌نیازهایشان مسلط است
    var starts = skills.filter(function (s) {
      return s.status !== 'mastered' && s.prereq.every(function (p) { return byId[p].status === 'mastered'; });
    }).map(function (s) { return s.id; });

    var tot = { n: items.length, correct: 0, wrong: 0, unsure: 0, earned: 0, max: 0 };
    items.forEach(function (it) {
      var wt = WEIGHTS[it.q.difficulty];
      tot.max += wt;
      if (it.status === 'correct') { tot.correct++; tot.earned += wt; }
      else if (it.status === 'wrong') { tot.wrong++; }
      else { tot.unsure++; }
    });

    return { items: items, skills: skills, byId: byId, starts: starts, tot: tot };
  }

  /* ---------- زمان و نام فایل ---------- */
  function stamp(d) {
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) + '_' +
      pad2(d.getHours()) + '-' + pad2(d.getMinutes()) + '-' + pad2(d.getSeconds());
  }
  /* ---------- گزارش: در js/report.js (و فونت‌های KaTeX در js/report-katex.js) است و هنگام اتمام آزمون لود می‌شود ---------- */

  function tip(term, text, isBold = false) {
    var termLabel = isBold ? '<b>' + esc(term) + '</b>' : esc(term);
    if (!text) { return esc(term); }
    return termLabel + '<button type="button" class="tipicon" data-term="' + esc(term) + '" data-tip="' + esc(renderRich(esc(text))) +
      '" aria-label="توضیح: ' + esc(term) + '">i</button>';
  }
  /* باز و بسته‌شدن پنجرهٔ کوچک توضیح (کلیک یا لمس). بدون وابستگی بیرونی تا در فایل نتیجه هم کار کند. */
  function initTips(doc) {
    function close() { var m = doc.getElementById('tipModal'); if (m) { m.parentNode.removeChild(m); } }
    doc.addEventListener('click', function (e) {
      var t = e.target;
      while (t && t !== doc && !(t.getAttribute && t.getAttribute('data-tip'))) { t = t.parentNode; }
      if (t && t !== doc && t.getAttribute) {
        close();
        var m = doc.createElement('div');
        m.id = 'tipModal'; m.className = 'tipmodal'; m.setAttribute('role', 'dialog');
        m.innerHTML = '<div class="tipbox"><h3></h3><p></p><button type="button" class="tipclose">بستن</button></div>';
        m.getElementsByTagName('h3')[0].textContent = t.getAttribute('data-term') || t.textContent;
        m.getElementsByTagName('p')[0].innerHTML = t.getAttribute('data-tip');
        doc.body.appendChild(m);
        return;
      }
      if (e.target.id === 'tipModal' || String(e.target.className).indexOf('tipclose') >= 0) { close(); }
    });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') { close(); } });
  }

  /* ---------- دانلود ---------- */
  function download(file) {
    var blob = new Blob([file.html], { type: 'text/html;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 1500);
  }

  /* ---------- رابط کاربری ---------- */
  function show(id) {
    ['screenStart', 'screenQuiz', 'screenResult'].forEach(function (s) {
      $(s).hidden = (s !== id);
    });
    window.scrollTo(0, 0);
  }

  function setResp(q, v) { resp[q.id] = { v: v }; }

  function renderQuestion() {
    var q = Q[idx];
    var r = resp[q.id] || {};
    var h = '<div class="qtext">' + renderRich(q.prompt) + '</div>';
    if (q.figure) { h += '<div class="fig">' + lineSVG(q.figure.line, { marks: q.figure.marks }) + '</div>'; }

    var i;
    if (q.type === 'mcq') {
      h += '<div class="opts">';
      for (i = 0; i < q.options.length; i++) {
        h += '<button type="button" class="opt' + (!r.unsure && r.v === i ? ' sel' : '') + '" data-i="' + i + '">' +
          '<span class="bullet">' + LET[i] + '</span><span class="otxt">' + renderRich(q.options[i].t) + '</span></button>';
      }
      h += '</div>';
    } else if (q.type === 'gridpick') {
      var gsel = (r.unsure || !r.v) ? null : r.v;
      h += '<div class="fig">' + faHtml(PLANE({ xmin: -5, xmax: 5, ymin: -5, ymax: 5, pick: true, selected: gsel })) + '</div>';
      h += '<div class="picked">' + (gsel ? renderRich('نقطهٔ انتخاب‌شده: ' + ptHtml(gsel[0], gsel[1])) : 'روی صفحه بزن تا نقطه مشخص شود.') + '</div>';
    } else if (q.type === 'multi') {
      var picked = r.unsure ? [] : (r.v || []);
      h += '<div class="opts">';
      for (i = 0; i < q.options.length; i++) {
        var on = picked.indexOf(i) >= 0;
        h += '<button type="button" class="opt multi' + (on ? ' sel' : '') + '" data-i="' + i + '" aria-pressed="' + on + '">' +
          '<span class="bullet">' + (on ? '✓' : '') + '</span><span class="otxt">' + renderRich(q.options[i].t) + '</span></button>';
      }
      h += '</div>';
    } else if (q.type === 'numeric') {
      h += '<div class="numwrap"><input id="numIn" class="numin" type="text" dir="ltr" autocomplete="off" ' +
        'placeholder="جواب را اینجا بنویس" value="' + (r.unsure ? '' : esc(r.v || '')) + '">' +
        '<div class="hint">' + faHtml('عدد صحیح، اعشاری (مثل \u20660.5\u2069) یا کسر (مثل \u20663/4\u2069 و \u2066−2/5\u2069) بنویس. ماشین‌حساب لازم نیست.') + '</div></div>';
    } else if (q.type === 'order') {
      var seq = r.unsure ? [] : (r.v || []);
      h += '<div class="ordlabel">ترتیب تو (از کوچک به بزرگ):</div><div class="ordseq">';
      for (i = 0; i < q.items.length; i++) {
        if (i < seq.length) {
          h += '<button type="button" class="chip placed" data-pos="' + i + '"><small>' + fa(i + 1) + '</small>' + renderRich(q.items[seq[i]]) + '</button>';
        } else {
          h += '<span class="slot">' + fa(i + 1) + '</span>';
        }
      }
      h += '</div><div class="ordlabel">عددها:</div><div class="ordpool">';
      for (i = 0; i < q.items.length; i++) {
        if (seq.indexOf(i) < 0) { h += '<button type="button" class="chip" data-i="' + i + '">' + renderRich(q.items[i]) + '</button>'; }
      }
      h += '</div><button type="button" class="linkbtn" id="ordReset">پاک‌کردن ترتیب</button>';
    } else if (q.type === 'match') {
      var cur = r.unsure ? [] : (r.v || q.left.map(function () { return -1; }));
      h += '<div class="matchbox">';
      for (i = 0; i < q.left.length; i++) {
        h += '<div class="mrow"><div class="mleft">' + renderRich(q.left[i]) + '</div><select class="msel" data-i="' + i + '">' +
          '<option value="-1">انتخاب کن…</option>';
        for (var j = 0; j < q.right.length; j++) {
          h += '<option value="' + j + '"' + (cur[i] === j ? ' selected' : '') + '>' + plainRich(q.right[j]) + '</option>';
        }
        h += '</select></div>';
      }
      h += '</div>';
    } else if (q.type === 'numberline') {
      h += '<div class="fig">' + lineSVG(q.line, { points: q.points, selected: (!r.unsure && typeof r.v === 'number') ? r.v : -1 }) + '</div>';
    }

    h += '<button type="button" class="unsure' + (r.unsure ? ' on' : '') + '" id="unsureBtn">نمی‌دانم / مطمئن نیستم</button>';
    $('qbody').innerHTML = h;
    $('qtopic').textContent = q.topic || SK[q.skill].name;
    $('qnum').textContent = 'سؤال ' + fa(idx + 1) + ' از ' + fa(Q.length);
    bindQuestion(q);
    updateNav();
  }

  function bindQuestion(q) {
    var root = $('qbody');
    var els, i;
    if (q.type === 'mcq') {
      els = root.querySelectorAll('.opt');
      for (i = 0; i < els.length; i++) {
        els[i].addEventListener('click', function () { setResp(q, parseInt(this.getAttribute('data-i'), 10)); renderQuestion(); });
      }
    } else if (q.type === 'gridpick') {
      els = root.querySelectorAll('.pk');
      for (i = 0; i < els.length; i++) {
        els[i].addEventListener('click', function () {
          setResp(q, [parseInt(this.getAttribute('data-x'), 10), parseInt(this.getAttribute('data-y'), 10)]);
          renderQuestion();
        });
      }
    } else if (q.type === 'multi') {
      els = root.querySelectorAll('.opt');
      for (i = 0; i < els.length; i++) {
        els[i].addEventListener('click', function () {
          var n = parseInt(this.getAttribute('data-i'), 10);
          var cur = (resp[q.id] && !resp[q.id].unsure && resp[q.id].v) ? resp[q.id].v.slice() : [];
          var at = cur.indexOf(n);
          if (at >= 0) { cur.splice(at, 1); } else { cur.push(n); }
          cur.sort(function (a, b) { return a - b; });
          if (cur.length) { setResp(q, cur); } else { delete resp[q.id]; }
          renderQuestion();
        });
      }
    } else if (q.type === 'numeric') {
      $('numIn').addEventListener('input', function () {
        var v = this.value;
        if (v.trim() === '') { delete resp[q.id]; } else { setResp(q, v); }
        updateUnsureButton();
        updateNav();
      });
    } else if (q.type === 'order') {
      els = root.querySelectorAll('.ordpool .chip');
      for (i = 0; i < els.length; i++) {
        els[i].addEventListener('click', function () {
          var cur = (resp[q.id] && !resp[q.id].unsure && resp[q.id].v) ? resp[q.id].v.slice() : [];
          cur.push(parseInt(this.getAttribute('data-i'), 10));
          setResp(q, cur);
          renderQuestion();
        });
      }
      els = root.querySelectorAll('.ordseq .chip');
      for (i = 0; i < els.length; i++) {
        els[i].addEventListener('click', function () {
          var pos = parseInt(this.getAttribute('data-pos'), 10);
          var cur = resp[q.id].v.slice(0, pos);   // با برداشتن یک عدد، از همان جا به بعد پاک می‌شود
          if (cur.length) { setResp(q, cur); } else { delete resp[q.id]; }
          renderQuestion();
        });
      }
      $('ordReset').addEventListener('click', function () { delete resp[q.id]; renderQuestion(); });
    } else if (q.type === 'match') {
      els = root.querySelectorAll('.msel');
      for (i = 0; i < els.length; i++) {
        els[i].addEventListener('change', function () {
          var cur = (resp[q.id] && !resp[q.id].unsure && resp[q.id].v) ? resp[q.id].v.slice() : q.left.map(function () { return -1; });
          cur[parseInt(this.getAttribute('data-i'), 10)] = parseInt(this.value, 10);
          if (cur.every(function (x) { return x < 0; })) { delete resp[q.id]; } else { setResp(q, cur); }
          updateUnsureButton();
          updateNav();
        });
      }
    } else if (q.type === 'numberline') {
      els = root.querySelectorAll('.pt');
      for (i = 0; i < els.length; i++) {
        var pick = function () { setResp(q, parseInt(this.getAttribute('data-i'), 10)); renderQuestion(); };
        els[i].addEventListener('click', pick);
        els[i].addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick.call(this); }
        });
      }
    }
    $('unsureBtn').addEventListener('click', function () {
      if (resp[q.id] && resp[q.id].unsure) { delete resp[q.id]; } else { resp[q.id] = { unsure: true }; }
      renderQuestion();
    });
  }

  function updateUnsureButton() {
    var q = Q[idx];
    var b = $('unsureBtn');
    if (b) { b.classList.toggle('on', !!(resp[q.id] && resp[q.id].unsure)); }
  }

  function updateNav() {
    var q = Q[idx];
    var last = idx === Q.length - 1;
    $('btnPrev').disabled = (idx === 0);
    $('btnNext').hidden = last;
    $('btnFinish').hidden = !last;
    $('btnNext').disabled = !isComplete(q);
    $('btnFinish').disabled = !isComplete(q);
    var done = 0;
    Q.forEach(function (x) { if (isComplete(x)) { done++; } });
    $('progressFill').style.width = (done / Q.length * 100) + '%';
    $('progressText').textContent = fa(done) + ' از ' + fa(Q.length) + ' پاسخ داده شد';
    $('progressBar').setAttribute('aria-valuenow', String(done));
  }

  var reportReady = null;
  function loadReport() {
    return reportReady || (reportReady = window.Loader.ordered(['js/report-katex.js', 'js/report.js']).catch(function (e) { reportReady = null; throw e; }));
  }
  function finish() {
    var when = new Date();
    var A = analyze();
    var name = 'res' + META.code + '_' + stamp(when) + '.html';
    var btn = $('btnFinish');
    btn.disabled = true;
    loadReport().then(function () {
      var R = window.QuizReport;
      lastFile = { name: name, html: R.buildDocument(A, when, name) };
      $('reportHost').innerHTML = R.buildReport(A, when);
      $('fileName').textContent = name;
      show('screenResult');
      download(lastFile);
    }).catch(function () {
      btn.disabled = false;
      alert('بارگذاری گزارش انجام نشد. دوباره «اتمام آزمون» را بزن.');
    });
  }

  /* پنجرهٔ معرفی: فهرست زیرمبحث‌ها با «+» ؛ لمس «+» یا نام مبحث، توضیح را باز و بسته می‌کند */
  function buildInfo() {
    var h = '';
    Object.keys(SK).forEach(function (id) {
      h += '<div class="topicitem"><button type="button" class="topicbtn" aria-expanded="false">' +
        '<span class="plus">+</span><span class="tname">' + esc(SK[id].name) + '</span></button>' +
        '<div class="tdesc" hidden>' + renderRich(esc(SK[id].desc || '')) + '</div></div>';
    });
    $('infoList').innerHTML += h;
    var btns = $('infoList').querySelectorAll('.topicbtn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        var d = this.parentNode.getElementsByTagName('div')[0];
        var open = d.hidden;
        d.hidden = !open;
        this.setAttribute('aria-expanded', open ? 'true' : 'false');
        this.getElementsByTagName('span')[0].textContent = open ? '−' : '+';
      });
    }
  }

  function init() {
    // CSS ریاضی و گزارش (مشترک با فایل نتیجه)
    var st = document.createElement('style');
    st.id = 'dynCss';
    st.textContent = REPORT_CSS.replace(/body\{[^}]*\}/, '').replace(/\*\{box-sizing:border-box\}/, '');
    document.head.appendChild(st);

    $('qCount').textContent = fa(Q.length);
    initTips(document);
    buildInfo();
    if (META.intro) { $('infoIntro').textContent = META.intro; }
    function openInfo() {
      var ds = $('infoList').querySelectorAll('.tdesc'), bs = $('infoList').querySelectorAll('.topicbtn'), k;
      for (k = 0; k < ds.length; k++) { ds[k].hidden = true; }
      for (k = 0; k < bs.length; k++) { bs[k].setAttribute('aria-expanded', 'false'); bs[k].getElementsByTagName('span')[0].textContent = '+'; }
      $('infoModal').hidden = false;
      $('infoList').scrollTop = 0;
      $('btnInfoClose').focus({ preventScroll: true });
    }
    $('btnInfo').addEventListener('click', openInfo);
    $('btnInfoClose').addEventListener('click', function () { $('infoModal').hidden = true; });
    $('infoModal').addEventListener('click', function (e) { if (e.target === $('infoModal')) { $('infoModal').hidden = true; } });
    $('btnMenu').setAttribute('href', MENU_URL);
    $('btnMenuEnd').setAttribute('href', MENU_URL);

    function openModal() { $('modal').hidden = false; $('btnModalStay').focus(); }
    function closeModal() { $('modal').hidden = true; }
    $('btnCancel').addEventListener('click', openModal);
    $('btnModalStay').addEventListener('click', closeModal);
    $('btnModalLeave').addEventListener('click', function () {
      closeModal();
      if (MENU_URL && MENU_URL !== '#') { window.location.href = MENU_URL; }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') { return; }
      if (!$('modal').hidden) { closeModal(); }
      if (!$('infoModal').hidden) { $('infoModal').hidden = true; }
    });
    $('btnStart').addEventListener('click', function () {
      if (DEVELOPMENT === 'on') {
        devSkipToResult();
        return;
      }
      startedAt = new Date();
      idx = 0;
      show('screenQuiz');
      renderQuestion();
    });

    $('btnPrev').addEventListener('click', function () { if (idx > 0) { idx--; renderQuestion(); window.scrollTo(0, 0); } });
    $('btnNext').addEventListener('click', function () {
      if (idx < Q.length - 1 && isComplete(Q[idx])) { idx++; renderQuestion(); window.scrollTo(0, 0); }
    });
    $('btnFinish').addEventListener('click', function () { if (isComplete(Q[idx])) { finish(); } });
    $('btnAgain').addEventListener('click', function () { if (lastFile) { download(lastFile); } });
    $('btnRestart').addEventListener('click', function () { window.location.reload(); });
  }

  /* بخش‌هایی از هسته که report.js (لودشونده) لازم دارد */
  window.QuizCore = {
    CONF_TEXT: CONF_TEXT,
    CRIT: CRIT,
    ERR: ERR,
    META: META,
    Q: Q,
    REPORT_CSS: REPORT_CSS,
    SK: SK,
    STATUS: STATUS,
    WEIGHTS: WEIGHTS,
    correctHtml: correctHtml,
    esc: esc,
    fa: fa,
    initTips: initTips,
    pad2: pad2,
    renderRich: renderRich,
    sentenceFor: sentenceFor,
    tip: tip,
    userHtml: userHtml
  };
  Object.defineProperty(window.QuizCore, 'mathMode', { get: function () { return MATH_MODE; }, set: function (v) { MATH_MODE = v; } });
  Object.defineProperty(window.QuizCore, 'startedAt', { get: function () { return startedAt; } });

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
