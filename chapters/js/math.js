/* ==========================================================================
   math.js — نمایش فرمول‌ها با KaTeX برای صفحهٔ منو
   همان منطق js/app.js (رقم فارسی، تبدیل خودکار عبارت‌های ریاضی به LaTeX، KaTeX محلی)
   ========================================================================== */
(function () {
  'use strict';
  var FA = '۰۱۲۳۴۵۶۷۸۹';
  function fa(s) {
    return String(s).replace(/\d/g, function (d) { return FA[d]; });
  }
  // تبدیل رقم‌ها به فارسی فقط در متن (نه داخل تگ‌ها)
  function faHtml(s) {
    return String(s).replace(/(<[^>]*>)|([^<]+)/g, function (m, tag, txt) {
      if (tag) { return tag; }
      return txt.replace(/\d/g, function (d) { return FA[d]; });
    });
  }
  /* ---------- ریاضی: LaTeX با KaTeX (نسخهٔ محلی کنار فایل‌های chapterN.html) ----------
     در داده‌ها فرمول‌ها به‌صورت $...$ نوشته می‌شوند. عبارت‌های ریاضی سادهٔ بدون $ که میان متن فارسی آمده باشند
     هم خودکار تشخیص داده و به LaTeX تبدیل می‌شوند. رقم‌ها (و اعشار) داخل فرمول فارسی می‌شوند.
     صفحهٔ آزمون: خروجی HTML ی KaTeX ؛ فایل نتیجه (که پوشهٔ KaTeX را ندارد): خروجی MathML. */
  var MATH_MODE = 'html';
  var SUPDIG = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };

  function symbolsToTex(t) {
    t = t.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/[−–]/g, '-').replace(/×/g, '\\times ').replace(/÷/g, '\\div ')
      .replace(/≥/g, '\\ge ').replace(/≤/g, '\\le ').replace(/≠/g, '\\ne ').replace(/≈/g, '\\approx ')
      .replace(/∈/g, '\\in ').replace(/∉/g, '\\notin ').replace(/⊆/g, '\\subseteq ').replace(/⊂/g, '\\subset ')
      .replace(/∪/g, '\\cup ').replace(/∩/g, '\\cap ').replace(/∞/g, '\\infty ').replace(/π/g, '\\pi ')
      .replace(/±/g, '\\pm ').replace(/…/g, '\\ldots ').replace(/′/g, "'").replace(/°/g, '^{\\circ}')
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, function (m) { return '^{' + m.replace(/./g, function (c) { return SUPDIG[c]; }) + '}'; });
    return t.replace(/√\(([^()]*)\)/g, '\\sqrt{$1}').replace(/√\s*(\d+(?:\.\d+)?|[A-Za-z])/g, '\\sqrt{$1}');
  }
  function persianTex(t) {
    return t.replace(/\d+(?:\.\d+)?/g, function (m) {
      return '\\text{' + m.replace(/\d/g, function (d) { return FA[d]; }) + '}\\vphantom{A}';
    });
  }
  function texToPlain(t) {   // نمایش ساده وقتی KaTeX در دسترس نیست
    var s = symbolsToTex(t), prev;
    do { prev = s; s = s.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)'); } while (s !== prev);
    s = s.replace(/\\sqrt\{([^{}]*)\}/g, '√($1)').replace(/\\times ?/g, '×').replace(/\\div ?/g, '÷').replace(/\\ge ?/g, '≥')
      .replace(/\\le ?/g, '≤').replace(/\\ne ?/g, '≠').replace(/\\approx ?/g, '≈').replace(/\\in ?/g, '∈').replace(/\\notin ?/g, '∉')
      .replace(/\\subseteq ?/g, '⊆').replace(/\\subset ?/g, '⊂').replace(/\\cup ?/g, '∪').replace(/\\cap ?/g, '∩')
      .replace(/\\infty ?/g, '∞').replace(/\\pi ?/g, 'π').replace(/\\pm ?/g, '±').replace(/\\ldots ?/g, '…')
      .replace(/\^\{\\circ\}/g, '°').replace(/\\([{}])/g, '$1').replace(/\^\{([^{}]*)\}/g, '^$1').replace(/-/g, '−');
    return s;
  }
  function renderTex(tex) {
    var t = persianTex(symbolsToTex(tex));
    if (MATH_MODE === 'mathml') { t = t.replace(/\\vphantom\{A\}/g, ''); }
    if (window.katex && typeof window.katex.renderToString === 'function') {
      try {
        return window.katex.renderToString(t, { throwOnError: false, strict: 'ignore', displayMode: false, output: MATH_MODE === 'mathml' ? 'mathml' : 'html' });
      } catch (e) { /* ادامه با نمایش ساده */ }
    }
    return '<span class="m">' + faHtml(texToPlain(tex).replace(/&/g, '&amp;').replace(/</g, '&lt;')) + '</span>';
  }

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
  /* عبارت‌های ریاضی بدون $ را (فقط در متن، نه داخل تگ‌ها/SVG/فرمول‌های موجود) به $...$ تبدیل می‌کند */
  function autoMath(html) {
    var src = String(html).replace(/<sup>/g, '\uE000').replace(/<\/sup>/g, '\uE001').replace(/<sub>/g, '\uE002').replace(/<\/sub>/g, '\uE003');
    var parts = src.split(/(<[^>]*>)/), out = '', stack = [], skip = 0, svg = 0, i, p, isM, w;
    for (i = 0; i < parts.length; i++) {
      p = parts[i];
      if (p.charAt(0) === '<' && p.charAt(p.length - 1) === '>') {
        if (/^<svg\b/i.test(p)) { svg++; }
        else if (/^<\/svg/i.test(p)) { svg--; }
        else if (/^<span\b/i.test(p)) { isM = /class=["']m["']|dir=["']ltr["']/.test(p); stack.push(isM); if (isM) { skip++; } }
        else if (/^<\/span/i.test(p)) { w = stack.pop(); if (w) { skip--; } }
        out += p;
      } else if (skip > 0 || svg > 0) {
        out += p;
      } else {
        out += p.split(/(\$[^$]*\$)/).map(function (q) {
          return (q.length > 1 && q.charAt(0) === '$' && q.charAt(q.length - 1) === '$') ? q : q.replace(RUN_RE, wrapRun);
        }).join('');
      }
    }
    return out.replace(/\uE000/g, '<sup>').replace(/\uE001/g, '</sup>').replace(/\uE002/g, '<sub>').replace(/\uE003/g, '</sub>');
  }
  /* نمایش کامل یک متن: فرمول‌ها با KaTeX و بقیهٔ متن با رقم فارسی */
  function renderRich(html) {
    return autoMath(html).split(/(\$[^$]*\$)/).map(function (p) {
      return (p.length > 1 && p.charAt(0) === '$' && p.charAt(p.length - 1) === '$') ? renderTex(p.slice(1, -1)) : faHtml(p);
    }).join('');
  }
  /* همان نمایش، ولی به‌صورت متن ساده (برای گزینه‌های منوی کشویی که HTML نمی‌پذیرند) */
  function plainRich(str) {
    return faHtml(String(str).replace(/\$([^$]*)\$/g, function (m, t) { return texToPlain(t); }));
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  window.MathLite = { renderRich: renderRich, plainRich: plainRich, faHtml: faHtml, fa: fa, esc: esc };
})();
