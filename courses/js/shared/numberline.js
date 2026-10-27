/* محور اعداد تعاملی (K.numberLine) */
(function () {
  'use strict';
  var K0 = window.CourseKit, ML = window.MathLite, fa = ML.fa, esc = ML.esc, rr = ML.renderRich, abs = Math.abs, df = K0.df, NS = 'http://www.w3.org/2000/svg', $ = function (id) { return document.getElementById(id); };
  var K = K0;
    /* محور اعداد تعاملی: عدد اول (سبز) ← حرکت (قوس‌های صورتی، همه بالای محور) ← جواب (زرد) */
  K.numberLine = function (host) {
      var MIN = -10, MAX = 10, X0 = 40, U = 29, AY = 84, a = null, b = null;
      var X = function (v) { return X0 + (v - MIN) * U; };
      var sg = function (v) { return (v < 0 ? '\u2212' : '') + fa(Math.abs(v)); };
      var bd = function (s) { return '<bdi dir="ltr">' + s + '</bdi>'; };
      host.innerHTML = '<svg viewBox="0 0 660 122" role="img" aria-label="محور اعداد از ۱۰- تا ۱۰"><defs><marker id="nlah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#d6457a"/></marker></defs>' +
        '<g id="arcs"></g><line class="ax" x1="12" y1="' + AY + '" x2="648" y2="' + AY + '"/><g id="ticks"></g><g id="gh"></g><g id="pts"></g><g id="tip" class="tip" visibility="hidden"><path d="M-7 25L0 33L7 25z"/><rect x="-26" y="0" width="52" height="26" rx="8"/><text x="0" y="19"></text></g></svg>' +
        '<p class="hint" id="hint"></p><div id="info"></div><div class="ctl"><button type="button" class="btn" id="bR">▶ یک واحد به راست</button><button type="button" class="btn" id="bL">یک واحد به چپ ◀</button><button type="button" class="btn" id="bX">از اول</button></div>';
      var svg = host.querySelector('svg'), q = function (s) { return svg.querySelector(s); }, hint = host.querySelector('#hint'), info = host.querySelector('#info');
      function el(t, at, p) { var e = document.createElementNS(NS, t); for (var k in at) { e.setAttribute(k, at[k]); } p.appendChild(e); return e; }
      var v, g = q('#ticks');
      for (v = MIN; v <= MAX; v++) {
        el('line', { 'class': 'tk', x1: X(v), x2: X(v), y1: AY - 8, y2: AY + 8 }, g);
        el('text', { 'class': 'tx', x: X(v), y: AY + 30 }, g).textContent = sg(v);
        el('rect', { 'class': 'hit', x: X(v) - U / 2, y: AY - 44, width: U, height: 88, 'data-v': v }, g);
      }
      var tip = q('#tip'), gh = q('#gh');
      g.addEventListener('pointerover', function (e) {
        var t = e.target.getAttribute && e.target.getAttribute('data-v'); if (t === null) { return; } t = +t;
        gh.innerHTML = ''; el('circle', { 'class': 'ghost', cx: X(t), cy: AY, r: 12 }, gh);
        tip.setAttribute('transform', 'translate(' + X(t) + ',' + (AY - 76) + ')'); tip.querySelector('text').textContent = sg(t); tip.setAttribute('visibility', 'visible');
      });
      svg.addEventListener('pointerleave', function () { gh.innerHTML = ''; tip.setAttribute('visibility', 'hidden'); });
      function draw() {
        var arcs = q('#arcs'), pts = q('#pts'), s, i, x1, x2, m, d;
        arcs.innerHTML = ''; pts.innerHTML = '';
        if (a !== null) { el('circle', { 'class': 'pa', cx: X(a), cy: AY, r: 9 }, pts); }
        if (b !== null && b !== a) { el('circle', { 'class': 'pb', cx: X(b), cy: AY, r: 9 }, pts); }
        if (a === null) { hint.textContent = 'روی یکی از عددهای محور بزن تا از همان‌جا شروع کنیم.'; info.innerHTML = ''; return; }
        if (b === null) { hint.innerHTML = 'از ' + bd(sg(a)) + ' شروع می‌کنیم. حالا جای دیگری را بزن تا ببینی چطور به آن می‌رسیم.'; info.innerHTML = ''; return; }
        d = b - a; s = d >= 0 ? 1 : -1;
        for (i = a; i !== b; i += s) {
          x1 = X(i); x2 = X(i + s); m = (x1 + x2) / 2;
          el('path', { 'class': 'arc', d: 'M' + x1 + ' ' + (AY - 10) + ' Q' + m + ' ' + (AY - 48) + ' ' + x2 + ' ' + (AY - 10), 'marker-end': 'url(#nlah)' }, arcs);
          el('text', { 'class': 'al', x: m, y: AY - 34 }, arcs).textContent = s > 0 ? '+۱' : '\u2212۱';
        }
        var ds = d > 0 ? '+' + fa(d) : sg(d);
        hint.textContent = d === 0 ? 'هر دو نقطه یکی‌اند؛ حرکتی نداریم.' : 'هر قوس یک واحد حرکت است؛ ' + (s > 0 ? 'قوس‌های «+۱» یعنی حرکت به راست.' : 'قوس‌های «\u2212۱» یعنی حرکت به چپ.');
        info.innerHTML = '<div class="nlinfo"><div class="a">عدد اول<b>' + bd(sg(a)) + '</b></div><div class="m">عدد دوم (حرکت)<b>' + bd(ds) + '</b></div><div class="b">جواب<b>' + bd(sg(b)) + '</b></div></div>' +
          '<div class="nleq"><i class="a">' + sg(a) + '</i> + <i class="m">(' + ds + ')</i> = <i class="b">' + sg(b) + '</i></div>';
      }
      g.addEventListener('click', function (e) {
        var t = e.target.getAttribute && e.target.getAttribute('data-v'); if (t === null) { return; }
        if (a === null) { a = +t; } else { b = +t; } draw();
      });
      function step(s) { if (a === null) { return; } var nb = (b === null ? a : b) + s; if (nb < MIN || nb > MAX) { return; } b = nb; draw(); }
      host.querySelector('#bR').onclick = function () { step(1); };
      host.querySelector('#bL').onclick = function () { step(-1); };
      host.querySelector('#bX').onclick = function () { a = b = null; draw(); };
      draw();
    };
})();
