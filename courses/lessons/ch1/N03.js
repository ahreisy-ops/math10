/* درس N03 — تبدیل کسر، اعشار و درصد
   تمام تمرین‌ها اعداد تصادفی می‌سازند و پاسخ را با محاسبهٔ دقیق (کسری) می‌سنجند؛ هیچ پاسخی ثابت نیست. */
window.LESSONS = window.LESSONS || {};
window.LESSONS.N03 = {
  needs: ['utils', 'inputs'],
  /* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
  setup: function (K0) {
    var ML = window.MathLite, fa = ML.fa, rr0 = ML.renderRich;
    var _u = K0._u, R = _u.R, shuffle = _u.shuffle;
    var _i = K0._i, fb = _i.fb;
    var K = Object.create(K0);
    var T = String.raw, NL = '\\\\', dv = '\\div', tm = '\\times';

    /* ---------- استایل مخصوص این درس (فقط یک بار) ---------- */
    if (!document.getElementById('n3css')) {
      var st = document.createElement('style'); st.id = 'n3css';
      st.textContent = [
        '.wf{direction:rtl;text-align:center;margin:12px 0;font-size:1.15em;line-height:2.2}',
        '.wf .hf{display:inline-block;vertical-align:middle;text-align:center;margin:0 8px;line-height:1.6}',
        '.wf .hf>span{display:block;padding:0 8px}.wf .hf>span:first-child{border-bottom:2px solid currentColor}',
        '.n3-w{font-size:.95em}.n3-w .btn{min-height:34px;min-width:0;padding:2px 14px;font-size:.88rem}.n3-w .ask{font-size:.95rem}.n3-w .opts{gap:6px}',
        '.n3-w .mc .opt{min-height:44px;font-size:1rem}',
        '.n3-chip{display:inline-block;padding:1px 10px;border:2px solid;border-radius:99px;font-size:.85rem;font-weight:bold;white-space:nowrap}',
        '.n3-given{display:flex;align-items:center;justify-content:center;gap:10px;margin:8px 0}.n3-val .katex{font-size:1.5em}',
        '.n3-row{display:flex;align-items:center;justify-content:center;gap:10px;margin:8px 0 2px;direction:rtl}',
        '.n3-in{width:8.5em;padding:4px 8px;border:2px solid var(--ink);border-radius:10px;font:inherit;font-size:.95rem;text-align:center;direction:ltr}',
        '.n3-mk{min-width:1.4em;font-weight:bold}.n3-msg{text-align:center;font-size:.9rem;color:#9b2c2c}',
        '.n3-pv{display:flex;justify-content:center;align-items:flex-start;gap:7px;margin:8px 0;direction:rtl}',
        '.n3-pv>div{text-align:center;min-width:2.8em}.n3-pv b{display:block;font-size:1.3em;line-height:1.3}',
        '.n3-pv i{display:block;font-style:normal;font-size:.75rem;color:#5b6675}.n3-pv .dot{min-width:.8em}',
        '.scw{text-align:center;margin:10px auto}.scan{display:inline-grid;direction:ltr;gap:6px;align-items:center;justify-items:center;padding:4px 2px}.scan .ph{font:.72rem/1.3 Tahoma,sans-serif;color:var(--ink-soft);padding:2px 4px;border-radius:6px;text-align:center}.scan .rl i{display:inline-block;border:2px solid var(--ink);border-radius:8px;padding:0 8px;line-height:1.55;color:#fff;font-weight:bold;white-space:nowrap;background:var(--accent,#0d8f87);font-style:normal}.scan .t{width:44px;height:48px;border-radius:10px;border:2px solid var(--line,#c5d0db);background:#f3f6fa;display:grid;place-items:center;font:bold 1.4rem Tahoma,sans-serif;color:var(--ink)}.scan .pt{width:10px;height:48px;display:grid;align-items:end;justify-items:center;font:bold 1.6rem/.9 Tahoma,sans-serif;color:var(--ink)}.n3-scan{margin:0 auto}',
        '.n3-row{display:grid;grid-template-columns:150px 150px 24px;justify-content:center;align-items:center;column-gap:14px;margin:8px auto;max-width:380px;direction:ltr}.n3-langmeta{grid-column:2;grid-row-end:1;display:flex;flex-direction:row-reverse;align-items:center;justify-content:flex-end;gap:8px;width:150px;font-size:.92rem;white-space:nowrap}.n3-langlabel{line-height:1.2}.n3-language-icon{display:grid;place-items:center;width:28px;height:28px;flex:0 0 28px;position:relative}.n3-language-icon.fr{display:flex;flex-direction:column;align-items:center;justify-content:center;width:22px;height:28px}.n3-fr-num,.n3-fr-den{font:700 .7rem/1 Tahoma,serif;color:var(--ink)}.n3-fr-bar{display:block;width:14px;height:1.5px;background:var(--ink);margin:1px 0}.n3-language-icon.dec{width:26px;height:26px}.n3-dec-outer{position:absolute;width:20px;height:20px;border:2.5px solid var(--ink);border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);box-sizing:border-box}.n3-dec-inner{position:absolute;width:7px;height:7px;background:var(--ink);border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%)}.n3-language-icon.pct{font:700 1rem/1 Tahoma,sans-serif;color:var(--ink);border:2px solid var(--ink);border-radius:50%;width:26px;height:26px;box-sizing:border-box}.n3-inbox,.n3-row .n3-in{grid-column:1;grid-row-end:1;width:150px;height:40px;box-sizing:border-box;border:1.5px solid #c5ced6;border-radius:10px;display:grid;place-items:center;padding:0 8px;font:inherit;font-size:.95rem;text-align:center;direction:ltr;background:#fff}.n3-inbox.n3-given-box{background:#eef3f7;border-color:#b8c4ce;pointer-events:none}.n3-row .n3-in{display:block;line-height:38px}.n3-row .n3-mk{grid-column:3;grid-row-end:1;width:24px;text-align:center;font-weight:bold}.n3-msg{max-width:380px;margin:0 auto 4px;text-align:center;font-size:.88rem;color:#9b2c2c}',

        '.n3-bins{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:10px 0;direction:rtl}',
        '.n3-bin{border:2px dashed var(--line);border-radius:12px;padding:6px;min-height:96px;text-align:center;cursor:pointer;background:#fafcfe}',
        '.n3-bin:hover{border-color:var(--accent)}.n3-bin>b{display:block;font-size:.9rem;margin-bottom:4px}',
        '.n3-it{font-size:.85rem;direction:ltr;margin:2px 0}',
        '.n3-cards{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:10px 0}',
        '.n3-card .katex{font-size:1.2em}.n3-card{padding:4px 14px;border:2px solid var(--ink);border-radius:10px;background:#fff;cursor:pointer;font:inherit}',
        '.n3-card.sel{background:var(--mark);box-shadow:3px 3px 0 var(--ink)}',
        '.n3-dv{display:inline-grid;grid-template-columns:auto auto;direction:ltr;font-size:1.3em;margin:6px 0}',
        '.n3-dv span{padding:2px 12px;text-align:center}.n3-dv .a,.n3-dv .s,.n3-dv .r{border-right:2px solid var(--ink)}',
        '.n3-longdiv{display:inline-grid;grid-template-columns:auto auto;direction:ltr;align-items:start;margin:4px auto 0;font-size:1.25em}.n3-longdiv .lhs{display:grid;grid-template-rows:auto auto auto;justify-items:center;min-width:78px}.n3-longdiv .top,.n3-longdiv .sub,.n3-longdiv .rem{padding:2px 10px;min-width:72px;text-align:center}.n3-longdiv .sub{border-bottom:2px solid var(--ink)}.n3-longdiv .rhs{display:grid;grid-template-rows:auto auto;min-width:44px}.n3-longdiv .divisor{display:grid;place-items:center;min-height:30px;border-left:2px solid var(--ink);border-bottom:2px solid var(--ink);padding:0 10px}.n3-longdiv .quot{display:grid;place-items:center;min-height:30px;border-left:2px solid var(--ink);padding:0 10px}.n3-longdiv .katex{font-size:1em}',
        '.n3-place-den .btn{border:2px solid #162947;border-radius:11px;box-shadow:3px 4px 0 #162947;background:#fff;font-weight:700;min-width:63px}.n3-place-den .btn:active{box-shadow:1px 1px 0 #162947;transform:translate(2px,3px)}.n3-place-answer{display:flex!important;grid-template-columns:none!important;justify-content:center!important;align-items:center;gap:4px!important;max-width:none!important;direction:rtl}.n3-place-answer .n3-in{grid-column:auto;margin:0}.n3-pm-controls{display:flex;flex-direction:column;align-items:center;gap:8px;margin:12px auto;width:min(100%,230px)}.n3-pm-entry{display:flex;direction:ltr;align-items:center;gap:8px;width:100%}.n3-pm-entry .n3-in{flex:1 1 auto;width:auto;min-width:0;height:38px;box-sizing:border-box}.n3-pm-controls>[data-go]{width:100%}.n3-pm-rnd{display:grid;place-items:center;color:#fff!important;background:#19a7a0!important;min-width:38px;height:38px;padding:0;border-radius:9px;font-size:1rem;line-height:1}.n3-pm-rnd svg{width:21px;height:21px;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}.n3-actions-44{display:flex;direction:ltr;justify-content:center;gap:9px;flex-wrap:wrap}.n3-actions-44 .btn{font-size:.88rem}',
        '.opts.n3-seqnav{display:flex;direction:rtl!important;justify-content:space-between!important;gap:12px}.opts.n3-seqnav [data-p]{order:0}.opts.n3-seqnav [data-nx]{order:1}.n3-dv .b{border-bottom:2px solid var(--ink)}.tipg{cursor:pointer}.tipg:hover rect{fill:#f3f6fa}'
      ].join('\n');
      document.head.appendChild(st);
    }

    /* ---------- نمایش ریاضی: اعشار «٫» و درصد «٪» فارسی داخل KaTeX ---------- */
    function fix(h) {
      return h.replace(/\$([^$]+)\$/g, function (m, s) {
        return '$' + s.replace(/(\d)\.(?=\d|\\overline|\{)/g, '$1\\text{٫}').replace(/\\%/g, '\\text{٪}') + '$';
      });
    }
    function rr(h) { return rr0(fix(h)); }
    var M = function (s) { return '$' + s + '$'; };
    var AL = function (lines) { return K.dm('\\begin{aligned}' + lines.join(NL) + '\\end{aligned}'); };
    /* ضرب/تقسیم صورت و مخرج: عدد با رنگ قرمز، جداگانه در صورت و مخرج (مثل درس قبل) */
    var C = function (n, d, op, k) { var c = '{\\color{crimson}\\scriptsize' + op + k + '}'; return '\\frac{' + n + c + '}{' + d + c + '}'; };
    /* متن فارسی (بدون KaTeX) در یک خط راست‌به‌چپ؛ hf = کسر با متن فارسی */
    var W = function (h) { return '<div class="dm wf">' + h + '</div>'; };
    var hf = function (a, b) { return '<span class="hf"><span>' + a + '</span><span>' + b + '</span></span>'; };
    var tipBtn = function (key, title, html) { return K.info(key, title, fix(html)); };

    /* ---------- محاسبهٔ دقیق ---------- */
    function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
    function simp(n, d) { var g = gcd(n, d) || 1; return { n: n / g, d: d / g }; }
    function eq(a, b) { return a.n * b.d === b.n * a.d; }
    /* بسط اعشاری n/d با تشخیص دوره: {ip, pre, rep, term} */
    function expand(n, d) {
      var ip = Math.floor(n / d), r = n % d, digs = [], seen = {}, start = -1;
      while (r !== 0 && digs.length < 40) {
        if (seen[r] !== undefined) { start = seen[r]; break; }
        seen[r] = digs.length; r *= 10; digs.push(Math.floor(r / d)); r = r % d;
      }
      if (r === 0 || start < 0) { return { ip: ip, pre: digs, rep: [], term: true }; }
      return { ip: ip, pre: digs.slice(0, start), rep: digs.slice(start), term: false };
    }
    function decTex(n, d) {                  /* رشتهٔ TeX اعشار n/d (با خط تکرار برای متناوب) */
      var e = expand(n, d), s = '' + e.ip;
      if (e.pre.length || e.rep.length) { s += '\\text{٫}' + e.pre.join(''); }
      if (!e.term) { s += '\\overline{' + e.rep.join('') + '}'; }
      return s;
    }
    var pctTex = function (n, d) { return decTex(100 * n, d) + '\\%'; };
    var fracTex = function (f) { return f.d === 1 ? '' + f.n : '\\frac{' + f.n + '}{' + f.d + '}'; };
    var isTerm = function (n, d) { return expand(n, d).term; };
    function fmt1(x) { var s = (Math.round(x * 10) / 10).toFixed(1); return s.replace(/\.0$/, ''); }

    /* ---------- خواندن پاسخ دانش‌آموز ---------- */
    function norm(s) {
      return String(s).replace(/[۰-۹]/g, function (c) { return c.charCodeAt(0) - 1776; }).replace(/[٠-٩]/g, function (c) { return c.charCodeAt(0) - 1632; })
        .replace(/[٫,،]/g, '.').replace(/[٪%\s]/g, '').replace(/[−–]/g, '-').replace(/[÷⁄]/g, '/');
    }
    function pdec(s) {                       /* "0.875" ← {n:875, d:1000} */
      var m = /^(\d*)\.?(\d*)$/.exec(norm(s)); if (!m || (m[1] === '' && m[2] === '')) { return null; }
      if (m[2].length > 6) { return null; }
      return simp(parseInt((m[1] || '0') + m[2], 10), Math.pow(10, m[2].length));
    }
    var ppct = function (s) { var v = pdec(s); return v ? simp(v.n, v.d * 100) : null; };
    function pfrac(s) {                      /* "7/8" ← {n:7, d:8} (ساده نمی‌شود تا «ساده‌نشدن» تشخیص داده شود) */
      var m = /^(\d+)(?:\/(\d+))?$/.exec(norm(s)); if (!m) { return null; }
      var n = parseInt(m[1], 10), d = m[2] === undefined ? 1 : parseInt(m[2], 10);
      return d === 0 || n > 1e7 || d > 1e7 ? null : { n: n, d: d };
    }
    /* راهنما وقتی عدد اعشاری/درصد اشتباه است؛ kind: 'dec' | 'pct' */
    function numHint(kind, u, v) {
      var r = simp(u.n * v.d, u.d * v.n);        /* u / v */
      if (r.n === 10 && r.d === 1) { return 'جواب تو ۱۰ برابر مقدار درست است؛ ممیز را یک جایگاه زیادی به راست برده‌ای.'; }
      if (r.n === 1 && r.d === 10) { return 'جواب تو یک‌دهم مقدار درست است؛ ممیز را یک جایگاه زیادی به چپ برده‌ای.'; }
      if (kind === 'dec' && r.n === 100 && r.d === 1) { return 'این عدد به‌جای اعشار، همان درصد است. برای اعشار باید درصد را بر ۱۰۰ تقسیم کنی.'; }
      if (kind === 'pct' && r.n === 1 && r.d === 100) { return 'این همان عدد اعشاری است. برای درصد باید آن را در ۱۰۰ ضرب کنی.'; }
      if (r.n === 100 && r.d === 1) { return 'جواب تو ۱۰۰ برابر مقدار درست است.'; }
      if (r.n === 1 && r.d === 100) { return 'جواب تو یک‌صدم مقدار درست است.'; }
      return 'درست نیست؛ یک بار دیگر محاسبه کن.';
    }
    function fracHint(u, v) {
      if (u.d < 1 || u.n > 1e7 || u.d > 1e7) { return 'درست نیست؛ دوباره بررسی کن.'; }
      return 'این کسر برابر ' + M(decTex(u.n, u.d)) + ' است؛ اما مقدار درست ' + M(decTex(v.n, v.d)) + ' است.';
    }

    /* ---------- تولید مقدارهای تصادفی ---------- */
    var DENS = [2, 4, 5, 8, 20, 25, 40, 50, 2, 4, 5, 8, 20, 25, 125, 200];
    function pickVal(allowBig) {
      var d = DENS[R(0, DENS.length - 1)], n, t = 0, hi = allowBig && Math.random() < 0.15 ? 2 * d - 1 : d - 1;
      do { n = R(1, hi); } while ((gcd(n, d) !== 1 || n === d) && t++ < 200);
      return { n: n, d: d };
    }
    function pickDec(k) {                    /* اعشار با k رقم (رقم آخر ناصفر) */
      var s = '', i, lead = Math.random() < 0.4;
      for (i = 0; i < k; i++) { s += (i === 0 && lead && k > 1) ? '0' : String(i === k - 1 ? R(1, 9) : R(0, 9)); }
      return { n: parseInt(s, 10), d: Math.pow(10, k) };
    }

    /* ---------- رنگ و نام سه شکل (در همهٔ درس یکسان) ---------- */
    var COL = { f: 'var(--accent)', d: 'var(--ink)', p: 'var(--pink)' }, NAME = { f: 'کسر', d: 'عدد اعشاری', p: 'درصد' };
    var chip = function (k, txt) { return '<span class="n3-chip" style="border-color:' + COL[k] + ';color:' + COL[k] + '">' + (txt || NAME[k]) + '</span>'; };

    /* ---------- نقشهٔ سه‌زبانه: سه دایره و شش پیکان؛ توضیح هر پیکان داخل دیالوگ i ---------- */
    function map(labeled, id) {
      var N = { f: { x: 360, y: 74 }, d: { x: 112, y: 346 }, p: { x: 608, y: 346 } }, RAD = 54, SH = { f: 'کسر', d: 'اعشار', p: 'درصد' };
      var h = '<svg viewBox="0 0 720 430" class="trifig" role="img" aria-label="نقشهٔ تبدیل بین کسر، عدد اعشاری و درصد" style="width:100%;max-width:660px;display:block;margin:8px auto;font-family:inherit;direction:ltr">';
      h += '<defs>' + ['f', 'd', 'p'].map(function (k) { return '<marker id="ah' + id + k + '" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:' + COL[k] + '"/></marker>'; }).join('') + '</defs>';
      function pill(cx, cy, key, text, k) {
        return '<g class="tipg" data-tip="' + key + '" role="button" tabindex="0" aria-label="' + text + '"><rect x="' + (cx - 70) + '" y="' + (cy - 14) + '" width="140" height="28" rx="14" fill="#fff" style="stroke:' + COL[k] + '" stroke-width="2"/>' +
          '<text x="' + (cx + 10) + '" y="' + (cy + 5) + '" text-anchor="middle" font-size="13" font-weight="700" style="fill:' + COL[k] + '">' + text + '</text>' +
          '<circle cx="' + (cx - 53) + '" cy="' + cy + '" r="8.5" style="fill:' + COL[k] + '"/><text x="' + (cx - 53) + '" y="' + (cy + 4.5) + '" text-anchor="middle" font-size="12" font-style="italic" font-weight="700" fill="#fff">i</text></g>';
      }
      [['f', 'd'], ['f', 'p'], ['d', 'p']].forEach(function (e) {
        var a = N[e[0]], b = N[e[1]], dx = b.x - a.x, dy = b.y - a.y, L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
        if (!labeled) {
          h += '<line x1="' + (a.x + ux * (RAD + 8)) + '" y1="' + (a.y + uy * (RAD + 8)) + '" x2="' + (b.x - ux * (RAD + 8)) + '" y2="' + (b.y - uy * (RAD + 8)) + '" stroke="#5b6675" stroke-width="2.4" marker-start="url(#ah' + id + e[0] + ')" marker-end="url(#ah' + id + e[1] + ')"/>';
          return;
        }
        [[e[0], e[1], 1], [e[1], e[0], -1]].forEach(function (pr) {
          var A = N[pr[0]], B = N[pr[1]], s = pr[2], off = 24, sx = A.x + s * ux * (RAD + 6) + s * nx * off, sy = A.y + s * uy * (RAD + 6) + s * ny * off, ex = B.x - s * ux * (RAD + 10) + s * nx * off, ey = B.y - s * uy * (RAD + 10) + s * ny * off;
          h += '<line x1="' + sx + '" y1="' + sy + '" x2="' + ex + '" y2="' + ey + '" stroke-width="2.4" style="stroke:' + COL[pr[0]] + '" marker-end="url(#ah' + id + pr[0] + ')"/>';
          h += pill((sx + ex) / 2, (sy + ey) / 2, 'n3-' + pr[0] + pr[1], SH[pr[0]] + ' ← ' + SH[pr[1]], pr[0]);
        });
      });
      ['f', 'd', 'p'].forEach(function (k) {
        var n = N[k];
        h += '<circle cx="' + n.x + '" cy="' + n.y + '" r="' + RAD + '" style="fill:' + COL[k] + ';fill-opacity:.13"/><text x="' + n.x + '" y="' + (n.y - 31) + '" text-anchor="middle" font-size="12" font-weight="700" style="fill:' + COL[k] + '">' + NAME[k] + '</text>';
        if (k === 'f') { h += '<text x="' + n.x + '" y="' + (n.y - 6) + '" text-anchor="middle" font-size="22" fill="currentColor">۳</text><line x1="' + (n.x - 16) + '" y1="' + (n.y) + '" x2="' + (n.x + 16) + '" y2="' + n.y + '" stroke="currentColor" stroke-width="2"/><text x="' + n.x + '" y="' + (n.y + 23) + '" text-anchor="middle" font-size="22" fill="currentColor">۴</text>'; }
        else { h += '<text x="' + n.x + '" y="' + (n.y + 9) + '" text-anchor="middle" font-size="26" fill="currentColor">' + (k === 'd' ? '۰٫۷۵' : '۷۵٪') + '</text>'; }
      });
      return h + '</svg>';
    }

    /* ============ ۱) سه زبان، یک مقدار ============ */
    K.triLab = function (host) {
      var v, start, targets, PH = { f: 'مثلاً ۳/۴', d: 'مثلاً ۰٫۷۵', p: 'مثلاً ۷۵' };
      function given() { return start === 'f' ? fracTex(v) : start === 'd' ? decTex(v.n, v.d) : pctTex(v.n, v.d); }
      function chain() { return fracTex(v) + '=' + decTex(v.n, v.d) + '=' + pctTex(v.n, v.d); }
      function path() {
        return start === 'f' ? 'مسیر: کسر ← اعشار (صورت ÷ مخرج)، سپس اعشار ← درصد (ضرب در ۱۰۰).'
          : start === 'd' ? 'مسیر: اعشار ← کسر (مخرج ۱۰، ۱۰۰ یا ۱۰۰۰ و ساده‌کردن)، سپس اعشار ← درصد (ضرب در ۱۰۰).'
          : 'مسیر: درصد ← اعشار (تقسیم بر ۱۰۰)، سپس درصد ← کسر (روی ۱۰۰ گذاشتن و ساده‌کردن).';
      }
      function langMeta(k) {
        var label = k === 'f' ? 'کسر' : k === 'd' ? 'عدد اعشاری' : 'درصد';
        var icon;
        if (k === 'f') {
          icon = '<span class="n3-language-icon fr" aria-hidden="true"><span class="n3-fr-num">۱</span><span class="n3-fr-bar"></span><span class="n3-fr-den">۲</span></span>';
        } else if (k === 'd') {
          icon = '<span class="n3-language-icon dec" aria-hidden="true"><span class="n3-dec-outer"></span><span class="n3-dec-inner"></span></span>';
        } else {
          icon = '<span class="n3-language-icon pct" aria-hidden="true">%</span>';
        }
        return '<span class="n3-langmeta">' + icon + '<span class="n3-langlabel">' + label + '</span></span>';
      }
      function paint() {
        var h = '<p class="ask">مقدار عدد $' + given() + '$ را به دو شکل دیگر بنویس. اگر خواستی، با دکمهٔ «پاسخ را نشان بده» می‌توانی پاسخ درست را فوری ببینی:</p>';
        ['f','d','p'].forEach(function (k) {
          h += '<div class="n3-row">' + langMeta(k);
          if (k === start) {
            h += '<span class="n3-inbox n3-given-box">$' + given() + '$</span><span class="n3-mk"></span>';
          } else {
            h += '<input class="n3-in" data-k="' + k + '" type="text" dir="ltr" autocomplete="off" placeholder="' + PH[k] + '"><span class="n3-mk" data-k="' + k + '"></span>';
          }
          h += '</div>';
          if (k !== start) { h += '<div class="n3-msg" data-k="' + k + '"></div>'; }
        });
        host.innerHTML = rr(h + '<div class="opts n3-actions-44"><button type="button" class="btn primary" data-ck="1">بررسی</button><button type="button" class="btn" data-sh="1">پاسخ را نشان بده</button><button type="button" class="btn" data-nx="1">مثال بعدی</button></div><div class="tlf"></div>');
        host.querySelectorAll('.n3-in').forEach(function (inp) { inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { check(); } }); });
      }
      function newQ() { v = pickVal(true); start = ['f', 'd', 'p'][R(0, 2)]; targets = ['f', 'd', 'p'].filter(function (x) { return x !== start; }); paint(); }
      function check() {
        var allOk = true;
        targets.forEach(function (k) {
          var inp = host.querySelector('.n3-in[data-k="' + k + '"]'), mk = host.querySelector('.n3-mk[data-k="' + k + '"]'), ms = host.querySelector('.n3-msg[data-k="' + k + '"]'), u, msg = '';
          if (k === 'f') {
            u = pfrac(inp.value);
            if (!u) { msg = 'کسر را به شکل صورت/مخرج بنویس؛ مثلاً ۳/۴.'; }
            else if (!eq(u, v)) { msg = fracHint(u, v); }
            else if (gcd(u.n, u.d) !== 1) { msg = 'مقدارش درست است، ولی کسر ساده نشده؛ صورت و مخرج را بر ' + fa(gcd(u.n, u.d)) + ' تقسیم کن.'; }
          } else {
            u = k === 'd' ? pdec(inp.value) : ppct(inp.value);
            if (!u) { msg = 'یک عدد بنویس.'; } else if (!eq(u, v)) { msg = numHint(k === 'd' ? 'dec' : 'pct', u, v); }
          }
          mk.textContent = msg ? '✗' : '✓'; mk.style.color = msg ? '#b83232' : '#1f8a4c'; ms.innerHTML = rr(msg);
          if (msg) { allOk = false; }
        });
        host.querySelector('.tlf').innerHTML = allOk ? rr(fb(true, 'درست است! ✓') + K.dm(chain()) + '<div class="ex"><p>' + path() + '</p></div>') : '';
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) { return; }
        if (b.dataset.ck) { check(); } else if (b.dataset.nx) { newQ(); }
        else if (b.dataset.sh) { host.querySelector('.tlf').innerHTML = rr(K.dm(chain()) + '<div class="ex"><p>' + path() + '</p></div>'); }
      });
      newQ();
    };

    /* ============ ۲) آزمایشگاه ارزش مکانی ============ */
    K.placeLab = function (host) {
      var v, k, stage, msg, PL = ['دهم', 'صدم', 'هزارم'];
      function newQ() { k = R(1, 3); v = pickDec(k); stage = 1; msg = ''; paint(); }
      function chart() {
        var s = String(v.n), digs, h, full, i;
        while (s.length < k) { s = '0' + s; }
        digs = s.split('');
        full = '0.' + digs.join('');
        h = '<div class="scw dm"><div class="scan n3-scan" style="grid-template-columns:auto auto 10px repeat(' + k + ',auto)">';
        h += '<span></span><span class="ph">بخش صحیح</span><span></span>';
        for (i = 0; i < k; i++) { h += '<span class="ph">' + PL[i] + '</span>'; }
        h += '<span class="rl"><i>' + fa(full) + '</i></span>';
        h += '<span class="t">' + fa(0) + '</span><span class="pt">.</span>';
        for (i = 0; i < digs.length; i++) { h += '<span class="t">' + fa(digs[i]) + '</span>'; }
        h += '</div></div>';
        return h;
      }
      function paint() {
        var h = chart();
        if (stage === 1) {
          h += '<p class="ask">آخرین رقم در کدام جایگاه است؟ پس مخرج اولیهٔ کسر کدام است؟</p><div class="opts n3-place-den">' + [10, 100, 1000, 10000].map(function (d) { return '<button type="button" class="btn" data-den="' + d + '">' + fa(d) + '</button>'; }).join('') + '</div>';
        } else if (stage === 2) {
          h += K.dm(decTex(v.n, v.d) + '=\\frac{' + v.n + '}{' + v.d + '}') + '<p class="ask">حالا کسر را تا جای ممکن ساده کن:</p><div class="n3-row n3-place-answer"><input class="n3-in" type="text" dir="ltr" autocomplete="off" placeholder="مثلاً ۹/۲۰۰"><button type="button" class="btn primary" data-ck="1">بررسی</button></div>';
        } else {
          h += K.dm(decTex(v.n, v.d) + '=\\frac{' + v.n + '}{' + v.d + '}=' + fracTex(simp(v.n, v.d)));
        }
        h += '<div class="plf">' + msg + '</div><div class="opts"><button type="button" class="btn' + (stage === 3 ? ' primary' : ' press-effect') + '"' + (stage === 3 ? '' : ' style="box-shadow:2px 2px 0 var(--ink)"') + ' data-nx="1">' + (stage === 3 ? 'مثال بعدی' : 'عدد دیگر') + '</button></div>';
        host.innerHTML = rr(h);
        var inp = host.querySelector('.n3-in'); if (inp) { inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { check(); } }); }
      }
      function check() {
        var u = pfrac(host.querySelector('.n3-in').value), g;
        if (!u) { msg = fb(false, 'کسر را به شکل صورت/مخرج بنویس؛ مثلاً ۹/۲۰۰.'); paint(); return; }
        if (!eq(u, v)) {
          msg = fb(false, fracHint(u, v) + (eq(simp(u.n, u.d), { n: v.n * 10, d: v.d }) || eq(simp(u.n, u.d), { n: v.n, d: v.d * 10 }) ? ' دقت کن: صفرِ بلافاصله بعد از ممیز را نمی‌شود حذف کرد.' : '')); paint(); return;
        }
        g = gcd(u.n, u.d);
        if (g !== 1) { msg = fb(false, 'مقدارش درست است، ولی ساده نشده؛ صورت و مخرج را بر ' + fa(g) + ' تقسیم کن.'); paint(); return; }
        stage = 3; msg = fb(true, 'درست است! ✓') + '<div class="ex"><p>صورت و مخرج را بر ' + fa(gcd(v.n, v.d)) + ' تقسیم کردیم.</p></div>'; paint();
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) { return; }
        if (b.dataset.den) {
          if (+b.dataset.den === v.d) { stage = 2; msg = ''; } else { msg = fb(false, 'آخرین رقم در جایگاه «' + PL[k - 1] + '» است؛ پس مخرج اولیه ' + fa(v.d) + ' می‌شود.'); }
          paint();
        } else if (b.dataset.ck) { check(); } else if (b.dataset.nx) { newQ(); }
      });
      newQ();
    };

    /* ============ ۳) درصدساز: بنویس، درصدش را از چهار گزینه انتخاب کن، بعد محاسبه را ببین ============ */
    K.percentMaker = function (host) {
      var cur = null, lastInput = null;
      host.innerHTML = rr('<p class="ask">یک کسر (مثل ۷/۸) یا یک عدد اعشاری (مثل ۰٫۳۷۵) بنویس. بعد روی دکمهٔ «درصدش چند است؟» بزن و در نهایت از میان چهار گزینه انتخاب کن. (اگر عددی به ذهنت نمی‌رسد، با دکمهٔ چرخشِ کنار کادر، یک مثال تصادفی بساز.)</p><div class="n3-pm-controls"><div class="n3-pm-entry"><input class="n3-in" type="text" dir="ltr" autocomplete="off" placeholder="مثلاً ۷/۸ یا ۰٫۳۷۵"><button type="button" class="btn n3-pm-rnd" data-rnd="1" aria-label="مثال تصادفی" title="مثال تصادفی"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8.5 8.5 0 0 1-14.6 6.1"></path><path d="M6.4 18.1H2.9v3.5"></path><path d="M3 12A8.5 8.5 0 0 1 17.6 5.9"></path><path d="M17.6 5.9h3.5V2.4"></path></svg></button></div><button type="button" class="btn primary" data-go="1">درصدش چند است؟</button></div><div class="pmo"></div>');
      var inp = host.querySelector('.n3-in'), out = host.querySelector('.pmo');
      function go() {
        var s = inp.value.trim(), u, v, isF = s.indexOf('/') > -1 || s.indexOf('÷') > -1;
        if (isF) { u = pfrac(s); if (!u || u.d === 0 || u.n > 99999 || u.d > 99999) { out.innerHTML = rr(fb(false, 'کسر را به شکل صورت/مخرج بنویس (مخرج صفر نباشد)؛ مثلاً ۷/۸.')); cur = null; lastInput = null; return; } v = simp(u.n, u.d); }
        else { v = pdec(s); if (!v || String(v.d).length > 5) { out.innerHTML = rr(fb(false, 'یک عدد اعشاری با حداکثر چهار رقم اعشار بنویس؛ مثلاً ۰٫۳۷۵.')); cur = null; lastInput = null; return; } u = v; }
        if (cur && lastInput === s) { return; }
        lastInput = s;
        var term = isTerm(v.n, v.d), P = simp(100 * v.n, v.d), x = 100 * v.n / v.d;
        var tx = function (mu, di) { if (term) { var q = simp(P.n * mu, P.d * di); return decTex(q.n, q.d) + '\\%'; } return '\\approx' + fmt1(x * mu / di) + '\\%'; };
        var opts = [{ h: M(tx(1, 1)), ok: true }, { h: M(tx(10, 1)), m: 'ممیز را یک جایگاه زیادی به راست برده‌ای.' }, { h: M(tx(1, 10)), m: 'ممیز را یک جایگاه زیادی به چپ برده‌ای.' },
          { h: M(tx(1, 100)), m: 'فقط حاصل تقسیم (یا همان عدد اعشاری) را با علامت درصد نوشته‌ای؛ باید آن را در ۱۰۰ هم ضرب کنی.' }, { h: M(tx(100, 1)), m: 'بیش از حد ضرب کرده‌ای؛ فقط یک بار در ۱۰۰ ضرب می‌کنیم.' }];
        var seen = {}, list = []; opts.forEach(function (o) { if (!seen[o.h]) { seen[o.h] = 1; list.push(o); } });
        list = [list[0]].concat(shuffle(list.slice(1)).slice(0, 3)); list = shuffle(list);
        var dec = decTex(v.n, v.d), lines, fin;
        if (isF) {
          lines = ['\\frac{' + u.n + '}{' + u.d + '}&=' + u.n + dv + u.d + '=' + dec, dec + tm + '100&=' + decTex(100 * v.n, v.d) + (term ? '' : '\\approx' + fmt1(x)) + '\\%'];
          fin = '\\frac{' + u.n + '}{' + u.d + '}' + (term ? '=' + dec + '=' + decTex(100 * v.n, v.d) : '\\approx' + fmt1(x)) + '\\%';
        } else { lines = [dec + tm + '100&=' + decTex(100 * v.n, v.d) + '\\%']; fin = dec + '=' + decTex(100 * v.n, v.d) + '\\%'; }
        cur = { list: list, lines: lines, fin: fin, note: isF && !term ? '<p>این کسر اعشار متناوب دارد؛ پس درصدش را تقریبی (با یک رقم اعشار) نوشته‌ایم.</p>' : '' };
        out.innerHTML = rr('<div class="mc">' + list.map(function (o, i) { return '<button type="button" class="btn opt" data-q="' + i + '">' + o.h + '</button>'; }).join('') + '</div><div class="pmf"></div>');
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b || b.disabled) { return; }
        if (b.dataset.go) { go(); }
        else if (b.dataset.rnd) {
          if (Math.random() < 0.5) { var f = pickVal(true); inp.value = f.n + '/' + f.d; } else { var dd = pickDec(R(1, 3)); inp.value = decTex(dd.n, dd.d); }
          go();
        } else if (b.dataset.q !== undefined && cur) {
          var i = +b.dataset.q, o = cur.list[i];
          out.querySelectorAll('.mc .opt').forEach(function (x, k) { x.disabled = true; if (cur.list[k].ok) { x.classList.add('right'); } else if (k === i) { x.classList.add('wrong'); } });
          out.querySelector('.pmf').innerHTML = rr(fb(!!o.ok, o.ok ? 'درست است! ✓' : o.m) + '<div class="ex"><p>محاسبه:</p>' + AL(cur.lines) + K.dm(cur.fin) + cur.note + '</div>');
        }
      });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { go(); } });
    };

    /* ---------- برابری‌های درست و نادرست (برای «شکار خطا» و آزمونک) ----------
       type: 0 کسر=اعشار  1 اعشار=کسر  2 اعشار=درصد  3 درصد=اعشار  4 درصد=کسر  5 کسر=درصد */
    function mkItem(type, ok) {
      var v = pickVal(true), n = v.n, d = v.d, F = fracTex(v), D = decTex(n, d), P = pctTex(n, d);
      var sh = Math.random() < 0.5 ? 'up' : 'down';
      var fracShift = function () { return (sh === 'down' && d % 10 === 0) ? simp(n, d / 10) : simp(n, d * 10); };
      var good, bad, why;
      if (type === 0) {
        good = F + '=' + D; bad = F + '=' + (sh === 'up' ? decTex(10 * n, d) : decTex(n, 10 * d));
        why = '<p>تقسیم صورت بر مخرج می‌دهد ' + M(F + '=' + n + '\\div' + d + '=' + D) + '. در برابری نادرست، ممیز یک جایگاه جابه‌جا شده است.</p>';
      } else if (type === 1) {
        var w = fracShift(); good = D + '=' + F; bad = D + '=' + fracTex(w);
        why = '<p>کسر نادرست برابر ' + M(decTex(w.n, w.d)) + ' است، نه ' + M(D) + '. رقم‌های بعد از ممیز را بشمار و مخرج را درست انتخاب کن؛ صفرِ بلافاصله بعد از ممیز اهمیت دارد.</p>';
      } else if (type === 2) {
        good = D + '=' + P;
        var wb = ['same', 'tenth', 'ten'][R(0, 2)];
        bad = D + '=' + (wb === 'same' ? D + '\\%' : wb === 'tenth' ? decTex(10 * n, d) + '\\%' : decTex(1000 * n, d) + '\\%');
        why = '<p>برای تبدیل اعشار به درصد در ۱۰۰ ضرب می‌کنیم (ممیز دو جایگاه به راست): ' + M(D + '\\times100=' + decTex(100 * n, d)) + '.</p>';
      } else if (type === 3) {
        good = P + '=' + D;
        var wd = ['ten', 'thou', 'same'][R(0, 2)];
        bad = P + '=' + (wd === 'ten' ? decTex(10 * n, d) : wd === 'thou' ? decTex(n, 10 * d) : decTex(100 * n, d));
        why = '<p>درصد یعنی «از هر ۱۰۰»؛ پس برای تبدیل به اعشار بر ۱۰۰ تقسیم می‌کنیم (ممیز دو جایگاه به چپ): ' + M(P + '=' + decTex(100 * n, d) + '\\div100=' + D) + '.</p>';
      } else if (type === 4) {
        var w4 = fracShift(); good = P + '=' + F; bad = P + '=' + fracTex(w4);
        why = '<p>درصد یعنی عدد روی ۱۰۰: ' + M(P + '=\\frac{' + decTex(100 * n, d) + '}{100}=' + F) + '. کسر نادرست برابر ' + M(pctTex(w4.n, w4.d)) + ' است.</p>';
      } else {
        good = F + '=' + P;
        var dig = parseInt('' + n + d, 10), cand = simp(dig, 100);
        bad = F + '=' + ((!eq(cand, v) && dig < 1000) ? dig + '\\%' : decTex(1000 * n, d) + '\\%');
        why = '<p>درصد را با «ضرب در ۱۰۰» می‌سازیم، نه با کنار هم نوشتن صورت و مخرج: ' + M(F + '=' + D + '=' + P) + '.</p>';
      }
      return { tex: ok ? good : bad, ok: ok, good: good, why: '<p>برابری درست: ' + M(good) + '</p>' + (ok ? '' : why) };
    }

    /* ---------- آزمون سؤال‌به‌سؤال: «سؤال n از m»، قبلی/بعدی، نتیجه و مجموعهٔ جدید ---------- */
    function seq(host, build, resText) {
      var qs, i, ans;
      function start() { qs = build(); i = 0; ans = []; }
      function paint() {
        var n = qs.length, q = qs[i], a = ans[i], h, oh = '', s;
        if (i === n) {
          s = ans.filter(function (x, k) { return qs[k].opts[x].ok; }).length;
          host.innerHTML = rr('<div class="fb ' + (s >= n - 1 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(s) + ' از ' + fa(n) + '</b><br>' + resText(s, n) + '</div><div class="opts end-actions"><button type="button" class="btn" data-pv="1">مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1">سؤال‌های جدید</button></div>');
          return;
        }
        h = '<div class="stg">' + qs.map(function (x, k) { return '<span class="' + (ans[k] !== undefined ? (qs[k].opts[ans[k]].ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">' + q.ask + '</p>' + (q.tex ? K.dm(q.tex) : '') + '<div class="mc" id="mcx"></div>';
        q.opts.forEach(function (o, k) { oh += '<button type="button" class="btn opt' + (a !== undefined ? (o.ok ? ' right' : k === a ? ' wrong' : '') : '') + '" data-o="' + k + '"' + (a !== undefined ? ' disabled' : '') + '>' + o.h + '</button>'; });
        if (a !== undefined) { var o = q.opts[a]; h += fb(o.ok, o.ok ? 'درست است! ✓' : (o.m || 'این گزینه درست نیست.')) + '<div class="ex">' + q.expl + '</div>'; }
        h += '<div class="opts n3-seqnav"><button type="button" class="btn" data-p="1"' + (i ? '' : ' disabled') + '>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (a === undefined ? ' disabled' : '') + '>' + (i === n - 1 ? 'مشاهدهٔ نتیجه':'سؤال بعدی') + '</button></div>';
        host.innerHTML = rr(h); host.querySelector('#mcx').innerHTML = rr(oh);
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b || b.disabled) { return; }
        if (b.dataset.o) { ans[i] = +b.dataset.o; paint(); } else if (b.dataset.nx) { i++; paint(); } else if (b.dataset.p) { i--; paint(); }
        else if (b.dataset.pv) { i = 0; paint(); } else if (b.dataset.r) { start(); paint(); }
      });
      start(); paint();
    }

    /* ============ ۴) شکار خطا ============ */
    K.errHunt = function (host) {
      seq(host, function () {
        var flags = shuffle(Math.random() < 0.5 ? [true, true, false, false, false] : [true, true, true, false, false]), types = shuffle([0, 1, 2, 3, 4, 5]).slice(0, 5);
        return flags.map(function (ok, k) {
          var it = mkItem(types[k], ok);
          return { ask: 'این برابری درست است یا نادرست؟', tex: it.tex, expl: it.why, opts: [{ h: 'درست', ok: ok, m: 'این برابری نادرست است.' }, { h: 'نادرست', ok: !ok, m: 'این برابری درست است.' }] };
        });
      }, function (s, n) { return s === n ? 'همهٔ خطاها را پیدا کردی!' : 'هر جا اشتباه کردی، توضیح زیر آن سؤال را دوباره بخوان؛ بعد یک مجموعهٔ جدید بزن.'; });
    };

    /* ============ ۵) پایان‌پذیر یا متناوب؟ — بازی دسته‌بندی: کارت را بردار، در سینی بگذار ============ */
    K.periodLab = function (host) {
      var POOL = { 0: [4, 5, 8, 20, 25], 1: [3, 9, 11], 2: [6, 12, 15] }, TITLES = ['پایان‌پذیر', 'متناوب ساده', 'متناوب مرکب'], cards, sel, mistakes, msg;
      function build() {
        var used = {};
        cards = shuffle([0, 0, 1, 1, 2, 2]).map(function (c) {
          var d, n, t = 0; do { d = POOL[c][R(0, POOL[c].length - 1)]; n = R(1, d - 1); } while ((gcd(n, d) !== 1 || used[n + '/' + d]) && t++ < 200);
          used[n + '/' + d] = 1; var e = expand(n, d);
          return { n: n, d: d, c: e.term ? 0 : (e.pre.length ? 2 : 1), dec: decTex(n, d), done: false };
        });
        sel = -1; mistakes = 0; msg = ''; paint();
      }
      function paint() {
        var left = cards.filter(function (c) { return !c.done; }).length, h = '<p class="ask">کارت را انتخاب کن، بعد روی سینیِ مناسبِ نوع اعشارش بزن.</p><div class="n3-bins">';
        TITLES.forEach(function (t, b) {
          h += '<div class="n3-bin" data-b="' + b + '"><b>' + t + '</b>' + cards.filter(function (c) { return c.done && c.c === b; }).map(function (c) { return '<div class="n3-it">$\\frac{' + c.n + '}{' + c.d + '}=' + c.dec + '$</div>'; }).join('') + '</div>';
        });
        h += '</div>';
        if (left) { h += '<div class="n3-cards">' + cards.map(function (c, k) { return c.done ? '' : '<button type="button" class="n3-card' + (k === sel ? ' sel' : '') + '" data-c="' + k + '">$\\frac{' + c.n + '}{' + c.d + '}$</button>'; }).join('') + '</div>'; }
        var end = left ? '' : fb(mistakes === 0, 'همهٔ کارت‌ها جا افتادند. تعداد اشتباه‌ها: ' + fa(mistakes)) + '<div class="opts"><button type="button" class="btn primary" data-r="1">دست جدید</button></div>';
        host.innerHTML = rr(h + '<div class="plf">' + msg + end + '</div>');
      }
      host.addEventListener('click', function (e) {
        var c = e.target.closest('.n3-card'), b = e.target.closest('.n3-bin'), r = e.target.closest('[data-r]'), cd;
        if (r) { build(); return; }
        if (c) { sel = +c.dataset.c; msg = ''; paint(); return; }
        if (b) {
          if (sel < 0) { msg = fb(false, 'اول یک کارت را انتخاب کن.'); paint(); return; }
          cd = cards[sel];
          if (+b.dataset.b === cd.c) {
            cd.done = true; sel = -1;
            msg = fb(true, 'درست است! ' + (cd.c === 0 ? 'تقسیم تمام شد (باقی‌مانده صفر).' : cd.c === 1 ? 'تکرار درست بعد از ممیز شروع می‌شود.' : 'ابتدا چند رقم غیرتکراری می‌آید، بعد تکرار شروع می‌شود.'));
          } else {
            mistakes++; msg = fb(false, 'بسط اعشاری این کسر ' + M('\\frac{' + cd.n + '}{' + cd.d + '}=' + cd.dec) + ' است. ببین تقسیم تمام می‌شود یا نه، و اگر تمام نمی‌شود تکرار از کجا شروع می‌شود؛ بعد دوباره امتحان کن.');
          }
          paint();
        }
      });
      build();
    };

    /* ============ آزمون پایانی (۵ سؤال تصادفی) ============ */
    K.finalN03 = function (host) {
      var uniq = function (opts) { var seen = {}, out = []; opts.forEach(function (o) { if (!seen[o.h]) { seen[o.h] = 1; out.push(o); } }); return out; };
      var mk = function (tex, mm) { return { h: M(tex), m: mm }; };
      function qFracToDec() {
        var v = pickVal(false), n = v.n, d = v.d, D = decTex(n, d), rev = simp(d, n), wrong4Tex, wrong4Msg;
        if (isTerm(rev.n, rev.d) && expand(rev.n, rev.d).pre.length <= 3) {
          wrong4Tex = decTex(rev.n, rev.d);
          wrong4Msg = 'مخرج را بر صورت تقسیم کرده‌ای؛ باید صورت را بر مخرج تقسیم کنیم.';
        } else {
          wrong4Tex = decTex(d - n, d);
          wrong4Msg = 'به‌جای تقسیم، صورت را از مخرج کم کرده‌ای. برای ساختن عدد اعشاری باید صورت را بر مخرج تقسیم کنیم.';
        }
        return { ask: 'کسر ' + M(fracTex(v)) + ' برابر کدام عدد اعشاری است؟', expl: '<p>' + M(fracTex(v) + '=' + n + '\div' + d + '=' + D) + '</p>', opts: [{ h: M(D), ok: true },
          mk(decTex(10 * n, d), 'ممیز را یک جایگاه به راست برده‌ای؛ تقسیم ' + fa(n) + ' بر ' + fa(d) + ' را دوباره حساب کن.'),
          mk(decTex(n, 10 * d), 'ممیز را یک جایگاه زیادی به چپ برده‌ای.'), mk(wrong4Tex, wrong4Msg)] };
      }

      function qDecToFrac() {
        var v, s, t = 0; do { v = pickDec(3); s = simp(v.n, v.d); } while (s.d === 1000 && t++ < 200);
        var D = decTex(v.n, v.d);
        return { ask: 'عدد ' + M(D) + ' با کدام کسرِ ساده‌شده برابر است؟', expl: '<p>' + M(D + '=\\frac{' + v.n + '}{1000}=' + fracTex(s)) + '</p>', opts: [{ h: M(fracTex(s)), ok: true },
          { h: M('\\frac{' + v.n + '}{1000}'), m: 'این کسر با عدد برابر است، اما ساده نشده؛ ساده‌ترین شکل را خواسته‌ایم.' },
          mk(fracTex(simp(v.n, 100)), 'این کسر برابر ' + M(decTex(v.n, 100)) + ' است؛ صفرِ بعد از ممیز را حذف کرده‌ای یا رقم‌ها را اشتباه شمرده‌ای.'),
          mk(fracTex(simp(v.n, 10000)), 'این کسر برابر ' + M(decTex(v.n, 10000)) + ' است؛ مخرج را بزرگ‌تر از لازم گرفته‌ای.')] };
      }
      function qFracToPct() {
        var v = pickVal(true), n = v.n, d = v.d, dig = parseInt('' + n + d, 10);
        return { ask: 'کسر ' + M(fracTex(v)) + ' برابر چند درصد است؟', expl: '<p>' + M(fracTex(v) + '=' + decTex(n, d) + '\\Rightarrow ' + decTex(n, d) + '\\times100=' + decTex(100 * n, d)) + '</p>', opts: [{ h: M(pctTex(n, d)), ok: true },
          mk(dig + '\\%', 'صورت و مخرج را کنار هم نوشته‌ای! ابتدا باید تقسیم کنی و بعد در ۱۰۰ ضرب کنی.'),
          mk(decTex(1000 * n, d) + '\\%', 'ممیز را یک جایگاه زیادی به راست برده‌ای.'), mk(decTex(10 * n, d) + '\\%', 'ممیز را یک جایگاه زیادی به چپ برده‌ای.')] };
      }
      function qPctToDec() {
        var P = [[8, 1], [35, 1], [6, 1], [72, 1], [15, 1], [125, 1], [150, 1], [45, 10], [125, 10], [5, 10], [75, 10], [375, 10], [625, 10], [8, 10], [25, 10]][R(0, 14)], pn = P[0], pd = P[1];
        return { ask: 'عدد ' + M(decTex(pn, pd) + '\\%') + ' به شکل اعشاری کدام است؟', expl: '<p>' + M(decTex(pn, pd) + '\\%=' + decTex(pn, pd) + '\\div100=' + decTex(pn, pd * 100)) + '</p>', opts: [{ h: M(decTex(pn, pd * 100)), ok: true },
          mk(decTex(pn, pd * 10), 'بر ۱۰ تقسیم کرده‌ای؛ درصد یعنی «از هر ۱۰۰»، پس باید بر ۱۰۰ تقسیم کنی.'),
          mk(decTex(pn, pd * 1000), 'بر ۱۰۰۰ تقسیم کرده‌ای؛ باید فقط بر ۱۰۰ تقسیم کنی.'), mk(decTex(pn, pd), 'عدد درصد را بدون تغییر نوشته‌ای؛ برای اعشار باید بر ۱۰۰ تقسیم کنی.')] };
      }
      function qWhichTrue() {
        var ty = shuffle([0, 1, 2, 3, 4, 5]).slice(0, 3), g = mkItem(ty[0], true), opts = [{ h: M(g.tex), ok: true }];
        [1, 2].forEach(function (x) { var w = mkItem(ty[x], false); opts.push({ h: M(w.tex), m: w.why }); });
        return { ask: 'کدام برابری درست است؟', expl: g.why, opts: opts };
      }
      seq(host, function () {
        return [qFracToDec, qDecToFrac, qFracToPct, qPctToDec, qWhichTrue].map(function (f) { var q = f(); q.opts = shuffle(uniq(q.opts)); return q; });
      }, function (s) { return s === 5 ? 'عالی بود! به همهٔ سؤال‌ها درست جواب دادی.' : s >= 3 ? 'خوب بود. سؤال‌هایی را که اشتباه کردی دوباره مرور کن.' : 'یک بار دیگر درس را مرور کن؛ بعد با عددهای جدید امتحان کن.'; });
    };

    /* ---------- محتوای دیالوگ‌های i ---------- */
    var DIVHTML = '<p>در تقسیم دو عدد، چهار عدد مهم داریم. آن‌ها را این‌طور می‌چینیم. برای مثال: $' + T`17\div5` + '$</p>' +
      '<div style="text-align:center"><div class="n3-longdiv"><div class="lhs"><div class="top">$17$</div><div class="sub">$-15$</div><div class="rem">$2$</div></div><div class="rhs"><div class="divisor"><span style="color:blue">$5$</span></div><div class="quot"><span style="color:crimson">$3$</span></div></div></div></div>' +
      '<p><b>مقسوم</b> (<span>$17$</span>)، <b style="color:blue">مقسوم‌علیه</b> (<span style="color:blue">$5$</span>)، <b style="color:crimson">خارج‌قسمت</b> (<span style="color:crimson">$3$</span>) و <b style="color:green">باقی‌مانده</b> (<span style="color:green">$2$</span>) همیشه در این رابطه‌اند:</p>' +
      '<div class="dm">$' + T`17={\color{blue}5}\times{\color{crimson}3}+{\color{green}2}\qquad(0\le 2\lt 5)` + '$</div>' +
      '<p style="margin:0">برای مثال:</p><p style="margin-top:0">در تقسیم اعشاری همین کار را تکرار می‌کنیم: بعد از ممیز، کنار هر باقی‌مانده یک صفر می‌گذاریم و دوباره «تقسیم» می‌کنیم؛ هر بار یک رقم دیگر از خارج‌قسمت به دست می‌آید.</p>';
    var ex = function (a) { return K.dm(a); };
    var MAPTIPS = {
      'n3-fd': ['کسر ← اعشار', '<p>صورت را بر مخرج تقسیم کن. اگر بتوانی مخرج را با ضرب به ۱۰، ۱۰۰ یا ۱۰۰۰ برسانی، اعشار را بدون تقسیم هم می‌خوانی.</p>' + ex(T`\frac{3}{4}=3\div4=0.75`)],
      'n3-df': ['اعشار ← کسر', '<p>رقم‌های بعد از ممیز را بشمار؛ عدد را بدون ممیز روی ۱۰، ۱۰۰ یا ۱۰۰۰ … بگذار و کسر را ساده کن.</p>' + ex(T`0.75=\frac{75{\color{crimson}\scriptsize\div25}}{100{\color{crimson}\scriptsize\div25}}=\frac{3}{4}`)],
      'n3-dp': ['اعشار ← درصد', '<p>عدد اعشاری را در ۱۰۰ ضرب کن (ممیز دو جایگاه به راست) و علامت درصد بگذار.</p>' + ex(T`0.75\times100=75\%`)],
      'n3-pd': ['درصد ← اعشار', '<p>عدد درصد را بر ۱۰۰ تقسیم کن (ممیز دو جایگاه به چپ).</p>' + ex(T`75\%=75\div100=0.75`)],
      'n3-pf': ['درصد ← کسر', '<p>عدد درصد را روی ۱۰۰ بگذار و کسر را ساده کن.</p>' + ex(T`75\%=\frac{75{\color{crimson}\scriptsize\div25}}{100{\color{crimson}\scriptsize\div25}}=\frac{3}{4}`)],
      'n3-fp': ['کسر ← درصد', '<p>راه اول: کسر را به اعشار تبدیل کن و در ۱۰۰ ضرب کن. راه دوم: اگر شد مخرج را به ۱۰۰ برسان؛ صورتِ جدید همان درصد است.</p>' + ex(T`\frac{3}{4}=0.75=75\%`)]
    };

    return {
      html: function () {
        Object.keys(MAPTIPS).forEach(function (k) { tipBtn(k, MAPTIPS[k][0], MAPTIPS[k][1]); });
        var host = function (id) { return '<div class="cover n3-w" id="' + id + '" style="animation:none"></div>'; };
        var G = function (n) { return '\\color{crimson}' + n; };
        return fix([
          /* ───────── ۱ ───────── */
          K.sn('۱', 'سه زبان برای یک مقدار'),
          '<p>سه‌چهارمِ یک کل را به سه شکل می‌شود نوشت: کسر، عدد اعشاری و درصد. شکل‌ها فرق می‌کنند، اما مقدار همان است:</p>', map(false, 'a'),
          K.dm(T`\frac{3}{4}=0.75=75\%`),
          T`<p>کسر $\frac{3}{4}$ یعنی ۳ را بر ۴ تقسیم کن. عدد اعشاری $0.75$ یعنی ۷۵ صدم، و درصد $75\%$ یعنی ۷۵ از هر ۱۰۰.</p>`,
          '<p>هدف این درس این است که با داشتن یکی از این سه شکل، دو شکل دیگر را بسازی. روی شکل بالا شش مسیر هست (روی هر پیکان یک مسیر). در بخش‌های ۳ تا ۸ آن‌ها را یکی‌یکی یاد می‌گیری و در بخش ۹ دوباره روی نقشه مرورشان می‌کنی.</p>',

          /* ───────── ۲ ───────── */
          K.sn('۲', 'پیش از شروع: اعشارِ یک کسر چه شکلی دارد؟'),
          '<p>برای تبدیل کسر به اعشار، صورت را بر مخرج تقسیم می‌کنیم. این تقسیم همیشه یک‌جور تمام نمی‌شود؛ سه حالت پیش می‌آید.</p>',
          '<h4>حالت اول: اعشار پایان‌پذیر</h4><p>گاهی تقسیم بعد از چند رقم تمام می‌شود (باقی‌مانده صفر می‌شود):</p>', AL([T`\frac{1}{4}&=1\div4=0.25`, T`\frac{3}{8}&=3\div8=0.375`]),
          '<p>به این اعشارها «پایان‌پذیر» می‌گوییم.</p>',
          '<h4>حالت دوم: اعشار متناوب</h4><p>گاهی تقسیم هیچ‌وقت تمام نمی‌شود و یک رقم یا گروهی از رقم‌ها دوباره و دوباره تکرار می‌شود. برای کوتاه‌نویسی، روی رقم‌های تکرارشونده خط می‌کشیم:</p>',
          AL([T`\frac{1}{3}&=0.3333\ldots=0.\overline{3}`, T`\frac{1}{11}&=0.090909\ldots=0.\overline{09}`]),
          '<p>در این دو مثال تکرار درست بعد از ممیز شروع می‌شود؛ به آن «متناوب ساده» می‌گوییم. اگر پیش از تکرار چند رقم غیرتکراری بیاید، «متناوب مرکب» است:</p>', K.dm(T`\frac{1}{6}=0.1666\ldots=0.1\overline{6}`),
          K.box('note', 'یادآوری', T`<p>هر عدد گویا (هر کسر) اعشاری پایان‌پذیر یا متناوب دارد. عددهایی مثل $\pi=3.14159\ldots$ که اعشارشان نه تمام می‌شود و نه تکرار دارد، گویا نیستند و «گنگ» نام دارند؛ اینجا فقط برای آشنایی گفته شد.</p>`),
          K.box('note', 'برای کنجکاوها', T`<p>اگر مخرجِ کسرِ ساده‌شده فقط عامل‌های ۲ و ۵ داشته باشد (مثل ۴، ۸، ۲۰ و ۲۵)، اعشارش پایان‌پذیر است: $\frac{7}{20}=0.35$. اگر عامل دیگری داشته باشد، متناوب است: $\frac{7}{30}=0.2\overline{3}$.</p>`),
          K.box('note', 'در این درس', T`<p>نوشتن اعشار متناوب به‌صورت کسر در این درس نیست. درصدِ کسرهایی مثل $\frac{1}{3}$ را هم تقریبی می‌نویسیم.</p>`),
          '<h4>بازی دسته‌بندی</h4><p>چند کسر را بر اساس نوع اعشارشان در سینی‌ها بگذار:</p>', host('n3e'),

          /* ───────── ۳ ───────── */
          K.sn('۳', 'مسیر اول: از کسر به عدد اعشاری'),
          '<h4>راه اول: تقسیم</h4><p>هر کسر یک تقسیم است؛ پس برای رسیدن به اعشار، صورت را بر مخرج تقسیم می‌کنیم:</p>',
          W(hf('صورت', 'مخرج') + ' = صورت ÷ مخرج'),
          '<p>برای مثال:</p>', AL([T`\frac{1}{4}&=1\div4=0.25`, T`\frac{3}{5}&=3\div5=0.6`]),
          T`<h4>مثال: $\frac{7}{8}$</h4><p>چون ۷ از ۸ کوچک‌تر است، خارج‌قسمت صحیح صفر می‌شود و بعد از ممیز ادامه می‌دهیم: هر بار کنار باقی‌مانده یک صفر می‌گذاریم و دوباره «تقسیم» ${tipBtn('n3-div', 'یادآوری: الگوریتم تقسیم', DIVHTML)} می‌کنیم. رقم‌های خارج‌قسمت را قرمز نوشته‌ایم:</p>`,
          AL([T`70&=8\times{${G(8)}}+6`, T`60&=8\times{${G(7)}}+4`, T`40&=8\times{${G(5)}}+0`]),
          '<p>باقی‌مانده صفر شد؛ پس تقسیم تمام شده است. رقم‌های قرمز را به‌ترتیب بعد از ممیز می‌نویسیم:</p>', K.dm(T`\frac{7}{8}=0.{${G(875)}}`),
          '<h4>راه دوم: مخرج ۱۰، ۱۰۰ یا ۱۰۰۰</h4><p>اگر بتوانیم صورت و مخرج را در یک عدد ضرب کنیم تا مخرج ۱۰، ۱۰۰ یا ۱۰۰۰ شود، اعشار را بدون تقسیم می‌خوانیم. چون صورت و مخرج را در یک عدد ضرب می‌کنیم، مقدار کسر تغییر نمی‌کند. عددِ ضرب‌شده را قرمز نوشته‌ایم:</p>',
          AL([T`\frac{3}{5}&=${C(3, 5, tm, 2)}=\frac{6}{10}=0.6`, T`\frac{1}{4}&=${C(1, 4, tm, 25)}=\frac{25}{100}=0.25`, T`\frac{7}{8}&=${C(7, 8, tm, 125)}=\frac{875}{1000}=0.875`]),
          K.box('note', 'جمع‌بندی مسیر اول', '<ul><li>صورت را بر مخرج تقسیم کن.</li><li>اگر باقی‌مانده صفر شد، اعشار پایان‌پذیر است؛ اگر الگوی تکراری پیدا شد، متناوب است.</li><li>اگر مخرج با یک ضرب به ۱۰، ۱۰۰ یا ۱۰۰۰ برسد، اعشار را مستقیم می‌خوانی.</li></ul>'),

          /* ───────── ۴ ───────── */
          K.sn('۴', 'مسیر دوم: از عدد اعشاری به کسر'),
          '<p>عدد را بدون ممیز می‌نویسیم و روی مخرجی می‌گذاریم که از ارزش مکانیِ آخرین رقم به دست می‌آید. بعد کسر را ساده می‌کنیم.</p>',
          K.tbl(['ارزش مکانی آخرین رقم', 'مخرج اولیه', 'مثال'], [['دهم', '۱۰', T`$0.7=\frac{7}{10}$`], ['صدم', '۱۰۰', T`$0.07=\frac{7}{100}$`], ['هزارم', '۱۰۰۰', T`$0.007=\frac{7}{1000}$`]]),
          T`<h4>مثال اول: $0.6$</h4><p>آخرین رقم در جایگاه دهم است؛ پس مخرج ۱۰ می‌شود. بعد صورت و مخرج را بر ۲ تقسیم می‌کنیم:</p>`, AL([T`0.6&=\frac{6}{10}`, T`&=${C(6, 10, dv, 2)}=\frac{3}{5}`]),
          T`<h4>مثال دوم: $0.25$</h4><p>آخرین رقم در جایگاه صدم است؛ پس مخرج ۱۰۰ می‌شود:</p>`, AL([T`0.25&=\frac{25}{100}`, T`&=${C(25, 100, dv, 25)}=\frac{1}{4}`]),
          T`<h4>مثال سوم: $0.045$</h4><p>آخرین رقم ($5$) در جایگاه هزارم است؛ پس مخرج ۱۰۰۰ می‌شود. صفرِ اول هم جزو رقم‌هاست و باید شمرده شود:</p>`, AL([T`0.045&=\frac{45}{1000}`, T`&=${C(45, 1000, dv, 5)}=\frac{9}{200}`]),
          K.box('err', '⚠ اشتباه رایج', T`<p>بعضی‌ها $0.045$ را $\frac{9}{20}$ می‌نویسند. اما $\frac{9}{20}=0.45$ است، یعنی ده برابرِ $0.045$. برای اینکه اشتباه نکنی، همیشه تعداد رقم‌های بعد از ممیز را بشمار: سه رقم یعنی مخرج ۱۰۰۰.</p>`),
          T`<h4>مثال چهارم: صفرِ آخر</h4>`, AL([T`0.750&=\frac{750}{1000}`, T`&=${C(750, 1000, dv, 250)}=\frac{3}{4}`]),
          T`<p>همین جواب را از $0.75$ هم می‌گیریم؛ پس صفرِ آخر اعشار را می‌شود حذف کرد: $0.750=0.75$. اما صفرِ میان ممیز و رقم‌های دیگر، مثل صفر در $0.045$، را نمی‌شود حذف کرد.</p>`,
          T`<h4>مثال پنجم: عددی با بخش صحیح</h4><p>بخش صحیح را هم همراه عدد می‌نویسیم:</p>`, AL([T`1.25&=\frac{125}{100}`, T`&=${C(125, 100, dv, 25)}=\frac{5}{4}`]),
          '<h4>آزمایشگاه ارزش مکانی</h4><p>جایگاه رقم‌ها را ببین، مخرج را انتخاب کن و کسر را ساده کن:</p>', host('n3b'),

          /* ───────── ۵ ───────── */
          K.sn('۵', 'مسیر سوم: از عدد اعشاری به درصد'),
          '<p>درصد یعنی «از هر ۱۰۰». پس برای تبدیل عدد اعشاری به درصد، آن را در ۱۰۰ ضرب می‌کنیم:</p>', W('درصد = عدد اعشاری × ۱۰۰'),
          '<p>ضرب در ۱۰۰ یعنی ممیز دو جایگاه به راست می‌رود؛ اگر رقمی نماند، صفر می‌گذاریم.</p>',
          T`<h4>مثال‌ها</h4>`, K.dm(T`0.5\times100=50\;\Rightarrow\;0.5=50\%`), K.dm(T`0.875\times100=87.5\;\Rightarrow\;0.875=87.5\%`), K.dm(T`0.045\times100=4.5\;\Rightarrow\;0.045=4.5\%`),
          T`<p>درصد لازم نیست عدد صحیح باشد؛ $87.5\%$ و $4.5\%$ جواب‌های کاملاً درستی‌اند.</p>`,
          K.box('err', '⚠ اشتباه رایج', T`<p>نمی‌شود فقط علامت درصد را کنار عدد اعشاری گذاشت. نوشتن $0.75=0.75\%$ نادرست است؛ چون $0.75\%$ کمتر از یک درصد است. درست این است که اول در ۱۰۰ ضرب کنیم: $0.75=75\%$.</p>`),

          /* ───────── ۶ ───────── */
          K.sn('۶', 'مسیر چهارم: از درصد به عدد اعشاری'),
          '<p>این مسیر برعکس مسیر قبل است. برای تبدیل درصد به عدد اعشاری، عدد درصد را بر ۱۰۰ تقسیم می‌کنیم:</p>', W('عدد اعشاری = درصد ÷ ۱۰۰'),
          '<p>یعنی ممیز دو جایگاه به چپ می‌رود.</p>',
          T`<h4>مثال‌ها</h4>`, K.dm(T`35\%=35\div100=0.35`), K.dm(T`8\%=8\div100=0.08`), K.dm(T`125\%=125\div100=1.25`),
          '<p>درصد می‌تواند از ۱۰۰ بیشتر باشد؛ در این حالت عدد اعشاریِ متناظر از ۱ بزرگ‌تر می‌شود.</p>',
          T`<h4>درصدهای اعشاری</h4>`, AL([T`4.5\%&=4.5\div100=0.045`, T`0.5\%&=0.5\div100=0.005`]),
          K.box('err', '⚠ اشتباه رایج', T`<ul><li><b>۸٪ را ۰٫۸ نوشتن:</b> $8\%$ یعنی ۸ از هر ۱۰۰؛ یعنی ۸ صدم، یعنی $0.08$. اگر $0.8$ بنویسیم، مقدار ده برابر می‌شود، چون $0.8=80\%$.</li><li><b>نیم درصد و پنجاه درصد:</b> $0.5\%$ و $50\%$ یکی نیستند. $0.5\%$ یعنی نیم درصد، یعنی نیمِ یک صدم: $0.5\%=0.005$. اما $50\%$ یعنی نصفِ کل: $50\%=0.5$.</li></ul>`),

          /* ───────── ۷ ───────── */
          K.sn('۷', 'مسیر پنجم: از درصد به کسر'),
          '<p>برای تبدیل درصد به کسر، عدد درصد را روی ۱۰۰ می‌گذاریم و کسر را ساده می‌کنیم:</p>', K.dm(T`p\%=\frac{p}{100}`),
          T`<h4>مثال اول: $40\%$</h4>`, AL([T`40\%&=\frac{40}{100}`, T`&=${C(40, 100, dv, 20)}=\frac{2}{5}`]),
          T`<h4>مثال دوم: $75\%$</h4>`, AL([T`75\%&=\frac{75}{100}`, T`&=${C(75, 100, dv, 25)}=\frac{3}{4}`]),
          T`<h4>مثال سوم: درصد اعشاری، $87.5\%$</h4><p>اگر ۸۷٫۵ را روی ۱۰۰ بگذاریم، صورت اعشاری می‌شود. بهتر است اول درصد را به عدد اعشاری تبدیل کنیم و بعد مثل مسیر دوم پیش برویم:</p>`,
          AL([T`87.5\%&=0.875=\frac{875}{1000}`, T`&=${C(875, 1000, dv, 125)}=\frac{7}{8}`]),

          /* ───────── ۸ ───────── */
          K.sn('۸', 'مسیر ششم: از کسر به درصد'),
          '<p>برای تبدیل کسر به درصد دو راه داریم.</p>',
          '<h4>راه اول: اول اعشار، بعد درصد</h4><p>ابتدا کسر را به اعشار تبدیل می‌کنیم و بعد آن را در ۱۰۰ ضرب می‌کنیم:</p>',
          AL([T`\frac{7}{8}&=7\div8=0.875`, T`0.875\times100&=87.5`]), K.dm(T`\frac{7}{8}=87.5\%`),
          '<p>این راه برای همهٔ کسرها جواب می‌دهد.</p>',
          '<h4>راه دوم: مخرج ۱۰۰</h4><p>اگر بتوانیم مخرج را با ضرب به ۱۰۰ برسانیم، صورتِ جدید همان درصد است:</p>',
          AL([T`\frac{3}{4}&=${C(3, 4, tm, 25)}=\frac{75}{100}=75\%`, T`\frac{1}{5}&=${C(1, 5, tm, 20)}=\frac{20}{100}=20\%`]),
          T`<p>این راه برای کسرهایی مثل $\frac{1}{2}$، $\frac{1}{4}$ و $\frac{1}{5}$ سریع است. اما برای $\frac{7}{8}$ ممکن نیست، چون ۱۰۰ بر ۸ بخش‌پذیر نیست؛ آنجا راه اول بهتر است.</p>`,
          T`<h4>کسر بزرگ‌تر از ۱</h4><p>کسری که از ۱ بزرگ‌تر باشد، بیش از ۱۰۰٪ است:</p>`, K.dm(T`\frac{5}{4}=1.25=125\%`),
          T`<h4>وقتی اعشار تمام نمی‌شود</h4><p>برای $\frac{1}{3}=0.\overline{3}$ هم راه اول را می‌رویم؛ اما چون رقم‌ها تمام نمی‌شوند، درصد را تقریبی می‌نویسیم:</p>`, K.dm(T`0.\overline{3}\times100=33.\overline{3}\approx33.3\%`),
          '<h4>درصدساز</h4><p>هر کسر یا عدد اعشاری دلخواه را بنویس؛ درصدش را از میان چهار گزینه پیدا کن و بعد محاسبهٔ کامل را ببین:</p>', host('n3c'),

          /* ───────── ۹ ───────── */
          K.sn('۹', 'نقشهٔ راه: بین سه زبان چطور حرکت کنیم؟'),
          '<p>همهٔ مسیرها را روی یک نقشه ببین. روی هر پیکان، دکمهٔ <b>i</b> هست؛ آن را بزن تا روش آن مسیر را با یک مثال ببینی.</p>', map(true, 'b'),
          '<p>اگر مسیر مستقیم سخت بود، از شکل سوم کمک بگیر. مثلاً برای تبدیل $\\frac{7}{8}$ به درصد، اول آن را به $0.875$ تبدیل کن و بعد در ۱۰۰ ضرب کن. برای نمونه، یک مقدار را به هر دو شکل دیگر می‌نویسیم:</p>',
          K.dm(T`0.6=\frac{3}{5}=60\%`), K.dm(T`45\%=0.45=\frac{9}{20}`),
          K.tbl(['مسیر', 'روش'], [['کسر ← اعشار', 'تقسیم صورت بر مخرج'], ['اعشار ← کسر', 'مخرج ۱۰، ۱۰۰ یا ۱۰۰۰ و ساده‌کردن'], ['اعشار ← درصد', 'ضرب در ۱۰۰'], ['درصد ← اعشار', 'تقسیم بر ۱۰۰'], ['درصد ← کسر', 'عدد درصد روی ۱۰۰ و ساده‌کردن'], ['کسر ← درصد', 'اول اعشار، بعد ضرب در ۱۰۰ (یا مخرج ۱۰۰)']]),

          /* ───────── ۱۰ ───────── */
          K.sn('۱۰', 'تمرین‌های تعاملی'),
          '<h4>سه زبان، یک مقدار</h4><p>یکی از سه شکل داده شده است. دو شکل دیگر را بنویس:</p>', host('n3a'),
          '<h4>شکار خطا</h4><p>پنج برابری می‌بینی؛ بعضی‌شان درست‌اند و بعضی نادرست. هر کدام را تشخیص بده:</p>', host('n3d'),

          /* ───────── ۱۱ ───────── */
          K.sn('۱۱', 'آزمون پایانی'),
          '<p>پنج سؤال با عددهای تصادفی. هر بار که از اول شروع کنی، سؤال‌ها عوض می‌شوند.</p>', host('n3f'),
          K.box('sum', 'جمع‌بندی', '<ul><li>کسر را با تقسیم صورت بر مخرج (یا رساندن مخرج به ۱۰، ۱۰۰، ۱۰۰۰) به اعشار تبدیل کن.</li><li>اعشار را با توجه به ارزش مکانی آخرین رقم به کسر تبدیل کن و ساده‌اش کن.</li><li>اعشار ← درصد: ضرب در ۱۰۰. درصد ← اعشار: تقسیم بر ۱۰۰.</li><li>درصد ← کسر: عدد را روی ۱۰۰ بگذار و ساده کن. کسر ← درصد: اول اعشار، بعد ضرب در ۱۰۰.</li><li>اعشار پایان‌پذیر و متناوب را از هم تشخیص بده.</li><li>مراقب جابه‌جایی ممیز باش: صدم و هزارم را با هم اشتباه نگیر، و صفرِ بعد از ممیز را حذف نکن.</li></ul><p>این مهارت در فصل آمار و احتمال هم به کارت می‌آید؛ آنجا هم باید مقدارها را به شکل‌های مختلف بنویسی و با هم مقایسه کنی.</p>')
        ].join(''));
      },
      init: function (panel) {
        K.triLab(panel.querySelector('#n3a')); K.placeLab(panel.querySelector('#n3b')); K.percentMaker(panel.querySelector('#n3c'));
        K.errHunt(panel.querySelector('#n3d')); K.periodLab(panel.querySelector('#n3e')); K.finalN03(panel.querySelector('#n3f'));
      }
    };
  }
};
