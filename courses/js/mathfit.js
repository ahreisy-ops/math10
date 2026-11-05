/* mathfit.js — شکستن خودکار فرمول‌های نمایشی (.dm) که از عرض صفحه بلندترند.
   روی صفحهٔ باریک، فرمول طوری چندخطی می‌شود که هر خط جا شود: ابتدا در جداکننده‌های صریح (\quad، \qquad)، سپس در پیکان‌های استنتاج (⇒)،
   و بعد در رابطه‌ها (=، <، ≤ ...) — هر خطِ ادامه با همان نماد رابطه شروع می‌شود و زیر هم تراز می‌ماند. فرمول‌های چندخطی (aligned)
   سطر‌به‌سطر شکسته می‌شوند. روی صفحهٔ عریض همان فرمول یک‌خط برمی‌گردد. منبع TeX در data-tex (math.js) نگه داشته شده است.
   فرمول‌هایی که ساختار دیگری دارند (ماتریس، cases ...) دست‌نخورده می‌مانند و داخل کادر خودشان اسکرول می‌شوند. */
(function () {
  'use strict';
  var ML = window.MathLite;
  if (!ML) { return; }
  var LEVELS = [
    ['\\qquad', '\\quad'],
    ['\\Leftrightarrow', '\\Rightarrow', '⇒'],
    ['\\approx', '\\neq', '\\leq', '\\le', '\\geq', '\\ge', '\\lt', '\\gt', '=', '<', '>', '≤', '≥', '≈']
  ];
  var SKIP = /\\begin\{(?!aligned\})|\\because|\\therefore|\\cases/;
  var LEAD = /^(?:\\qquad|\\quad|\\;|\\,|\\ |\s)+/;
  var timer = null, meas = null;

  function tokenAt(tex, i, toks) {
    for (var k = 0; k < toks.length; k++) {
      var r = toks[k];
      if (tex.substr(i, r.length) === r && !(r.charAt(0) === '\\' && /[A-Za-z]/.test(tex.charAt(i + r.length)))) { return r; }
    }
    return null;
  }
  /* تقسیم در نشانه‌های سطح‌بالا (خارج از {}، \left..\right و \begin..\end)؛ نشانه به ابتدای تکهٔ بعدی می‌چسبد */
  function splitAt(tex, toks) {
    var segs = [], cur = '', i = 0, depth = 0, left = 0, env = 0, t, ch;
    while (i < tex.length) {
      ch = tex.charAt(i);
      if (ch === '{') { depth++; } else if (ch === '}') { depth--; }
      else if (ch === '\\') {
        if (tex.substr(i, 5) === '\\left') { left++; } else if (tex.substr(i, 6) === '\\right') { left--; }
        else if (tex.substr(i, 6) === '\\begin') { env++; } else if (tex.substr(i, 4) === '\\end') { env--; }
      }
      t = (depth === 0 && left === 0 && env === 0) ? tokenAt(tex, i, toks) : null;
      if (t) {
        if (cur.trim() === '' && !segs.length) { cur += t; } else { segs.push(cur); cur = t; }
        i += t.length;
      } else { cur += ch; i++; }
    }
    segs.push(cur);
    return segs;
  }
  function splitTop(tex, sep) {                   /* تقسیم روی جداکنندهٔ تک‌نشانه‌ای سطح‌بالا (مثل \\ یا &) */
    var out = [], cur = '', i = 0, depth = 0, env = 0, ch;
    while (i < tex.length) {
      ch = tex.charAt(i);
      if (ch === '{') { depth++; } else if (ch === '}') { depth--; }
      else if (tex.substr(i, 6) === '\\begin') { env++; } else if (tex.substr(i, 4) === '\\end') { env--; }
      if (depth === 0 && env === 0 && tex.substr(i, sep.length) === sep && !(sep === '\\' && /[A-Za-z]/.test(tex.charAt(i + 1)))) { out.push(cur); cur = ''; i += sep.length; }
      else { cur += ch; i++; }
    }
    out.push(cur);
    return out;
  }

  function measure(tex, host) {
    if (!meas) {
      meas = document.createElement('div');
      meas.setAttribute('aria-hidden', 'true');
      meas.style.cssText = 'position:absolute;visibility:hidden;left:-9999px;top:0;white-space:nowrap;direction:ltr;pointer-events:none';
    }
    host.appendChild(meas);
    meas.innerHTML = ML.renderRich('$' + tex + '$');
    var h = meas.querySelector('.katex-html'), w = h ? h.getBoundingClientRect().width : 0;
    host.removeChild(meas);
    return w;
  }

  /* کمترین تعداد خط با عرض ≤ avail، با خط‌های هم‌اندازه؛ سطح‌های جداکننده به‌ترتیب قدرت امتحان می‌شوند */
  function breakLine(tex, level, avail, host) {
    if (measure(tex, host) <= avail || level >= LEVELS.length) { return [tex]; }
    var segs = splitAt(tex, LEVELS[level]), i;
    if (level === 0) {                                   /* کلمهٔ ربط تنها (مثل «و») به تکهٔ بعدی بچسبد */
      for (i = segs.length - 2; i >= 0; i--) { if (/^\\text\{[^}]*\}$/.test(segs[i].replace(LEAD, ''))) { segs.splice(i, 2, segs[i] + segs[i + 1]); } }
    }
    if (segs.length < 2) { return breakLine(tex, level + 1, avail, host); }
    var ws = segs.map(function (s) { return measure(s.replace(LEAD, ''), host); });
    function pack(limit) {
      var lines = [[0]], cur = ws[0], k;
      for (k = 1; k < segs.length; k++) {
        if (cur + ws[k] <= limit) { lines[lines.length - 1].push(k); cur += ws[k]; } else { lines.push([k]); cur = ws[k]; }
      }
      return lines;
    }
    var top = avail, best = pack(top), n = best.length;
    while (n < 2 && top > 20) { top *= 0.85; best = pack(top); n = best.length; }     /* مجموع عرض تکه‌ها فاصلهٔ رابطه‌ها را کم‌شمار می‌گیرد؛ پس تا وقتی واقعاً بشکند کوچک می‌کنیم */
    if (n > 1) {
      var lo = Math.max.apply(null, ws), hi = top, it;
      for (it = 0; it < 12; it++) { var mid = (lo + hi) / 2; if (pack(mid).length <= n) { hi = mid; } else { lo = mid; } }
      best = pack(hi);
    }
    var out = [];
    best.forEach(function (idx, ln) {
      var line = idx.map(function (k) { return segs[k]; }).join('');
      if (ln) { line = line.replace(LEAD, ''); }
      breakLine(line, level + 1, avail, host).forEach(function (x, m) { out.push(m ? x.replace(LEAD, '') : x); });
    });
    return out;
  }

  function build(orig, W, host) {
    var m = /^\s*\\begin\{aligned\}([\s\S]*)\\end\{aligned\}\s*$/.exec(orig), lines;
    if (!m) {
      lines = breakLine(orig, 0, W - 8, host);
      return lines.length > 1 ? '\\begin{aligned}' + lines.map(function (l) { return '&' + l; }).join('\\\\') + '\\end{aligned}' : null;
    }
    var rows = splitTop(m[1], '\\\\'), parts = rows.map(function (r) { var p = splitTop(r, '&'); return [p[0], p.slice(1).join('&'), p.length > 1]; });
    var Lw = Math.max.apply(null, parts.map(function (p) { return p[2] ? measure(p[0], host) : 0; })), avail = W - Lw - 12, out = [], changed = false;
    if (avail < 90) { return null; }
    parts.forEach(function (p, k) {
      if (!p[2]) { out.push(rows[k]); return; }
      var ls = breakLine(p[1], 0, avail, host);
      if (ls.length > 1) { changed = true; }
      out.push(p[0] + '&' + ls[0]);
      for (var i = 1; i < ls.length; i++) { out.push('&{}' + ls[i]); }
    });
    return changed ? '\\begin{aligned}' + out.join('\\\\') + '\\end{aligned}' : null;
  }

  function fitOne(dm) {
    var k = dm.querySelector('.katex[data-tex]');
    if (!k) { return; }
    var orig = dm.getAttribute('data-tex0') || k.getAttribute('data-tex');
    if (!orig || SKIP.test(orig)) { return; }
    var W = dm.clientWidth;
    if (!W || dm._fitW === W) { return; }
    dm._fitW = W;
    var broken = dm.hasAttribute('data-tex0');
    if (measure(orig, dm) <= W) {
      if (broken) { dm.innerHTML = ML.renderRich('$' + orig + '$'); dm.removeAttribute('data-tex0'); }
      return;
    }
    var tex = build(orig, W, dm);
    if (!tex) { return; }
    dm.setAttribute('data-tex0', orig);
    dm.innerHTML = ML.renderRich('$' + tex + '$');
  }

  function fitAll(root) {
    var list = (root || document).querySelectorAll('.dm');
    for (var i = 0; i < list.length; i++) {
      if (list[i].offsetParent !== null) { try { fitOne(list[i]); } catch (e) { /* فرمول همان‌طور اسکرول‌پذیر می‌ماند */ } }
    }
  }
  function schedule() { clearTimeout(timer); timer = setTimeout(function () { fitAll(document); }, 120); }

  window.MathLite.fit = fitAll;
  window.addEventListener('resize', schedule);
  window.addEventListener('orientationchange', schedule);
  window.addEventListener('load', schedule);
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(schedule); }
  document.addEventListener('DOMContentLoaded', function () {
    var host = document.getElementById('skills') || document.body;
    new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) { if (muts[i].addedNodes.length || muts[i].type === 'attributes') { schedule(); return; } }
    }).observe(host, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    schedule();
  });
})();
