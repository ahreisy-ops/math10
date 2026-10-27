/* درس N09 — نسبت و تناسب
   تمام تمرین‌ها اعداد تصادفی می‌سازند و پاسخ را با محاسبهٔ دقیق (کسری) می‌سنجند. */
window.LESSONS = window.LESSONS || {};
window.LESSONS.N09 = {
  needs: ['utils', 'inputs', 'frac'],
  /* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
  setup: function (K0) {
    var ML = window.MathLite, fa = ML.fa, rr0 = ML.renderRich;
    var _u = K0._u, R = _u.R, shuffle = _u.shuffle;
    var fb = K0._i.fb;
    var gcd = K0._f.gcd, simp = K0._f.F, divisors = K0._f.divisors, lcm2 = K0._f.lcm;
    var K = Object.create(K0);
    var T = String.raw, NL = '\\\\', tm = '\\times', dv = '\\div', CL = '\\mathbin{:}';

    /* ---------- استایل مخصوص این درس (فقط یک بار) ---------- */
    if (!document.getElementById('n9css')) {
      var st = document.createElement('style'); st.id = 'n9css';
      st.textContent = [
        '.n9-w{font-size:.95em}.n9-w .btn{min-height:34px;min-width:0;padding:2px 14px;font-size:.88rem}.n9-w .ask{font-size:.95rem}.n9-w .opts{gap:6px}',
        '.n9-w .mc .opt{min-height:44px;font-size:1rem}',
        '.n9-line{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;margin:8px 0}',
        '.n9-sw{width:110px;height:78px;border:2px solid var(--ink);border-radius:16px;transition:background .25s}',
        '.n9-cap{font-size:.8rem;text-align:center;margin-top:4px;color:#46505e}',
        '.n9-dots{direction:ltr;text-align:center;min-height:20px;margin:4px 0}',
        '.n9-dot{display:inline-block;width:12px;height:12px;border-radius:50%;margin:1px}',
        '.n9-stp{display:inline-flex;align-items:center;gap:8px;direction:ltr}.n9-stp b{min-width:2.6em;text-align:center;font-size:1.15em}',
        '.n9-cal{display:block;margin:6px auto;max-width:100%}',
        '.n9-t{border-collapse:collapse;margin:8px auto;direction:ltr}.n9-t td,.n9-t th{border:2px solid var(--ink);padding:3px 12px;text-align:center;min-width:3em}',
        '.n9-t th{background:var(--ink);color:#fff}.n9-t tr.tool td{background:#eef7f2;font-size:.9rem}',
        '.n9-chip{padding:2px 12px;border:2px solid var(--ink);border-radius:99px;background:#fff;font:inherit;font-size:.95rem;cursor:pointer}',
        '.n9-mixer .n9-line{display:grid;grid-template-columns:110px 110px;gap:9px;justify-content:center;align-items:start;direction:rtl}.n9-mixer .n9-line>div{width:110px;min-width:110px;display:flex;flex-direction:column;align-items:center}.n9-mixer .n9-sw{width:110px;height:78px;box-sizing:border-box;flex:0 0 78px}.n9-mixer .n9-cap{width:100%;min-height:38px;line-height:1.55}.n9-mixer .n9-dots{display:flex;flex-direction:column;align-items:center;gap:3px;margin:8px auto 4px}.n9-mixer .n9-dotrow{display:flex;justify-content:center;align-items:center;gap:2px;flex-wrap:nowrap;height:16px;min-height:16px}.n9-mixer .n9-stp{display:grid;grid-template-columns:repeat(2,54px) 44px repeat(2,54px);gap:7px;align-items:center;justify-content:center;width:max-content;max-width:100%;margin:8px auto;direction:ltr}.n9-mixer .n9-stp .btn{width:54px;min-width:54px;height:36px;min-height:36px;padding:2px;font-size:1rem;display:inline-flex;align-items:center;justify-content:center;line-height:1;box-shadow:2px 2px 0 var(--ink)}.n9-mixer .n9-stp .btn:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}.n9-mixer .n9-stp b{min-width:44px}.n9-mixer .n9-next{display:flex;justify-content:center;margin:12px 0}.n9-mixer .n9-next .btn{min-height:36px;font-size:.88rem;padding:5px 12px}.n9-mixer .n9-next .btn:not(.primary){box-shadow:2px 2px 0 var(--ink)}.n9-mixer .n9-next .btn:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}',
        '.n9-bal-svg{width:100%;max-width:500px;position:relative;margin:6px auto 0;direction:ltr}.n9-bal-lab,.n9-bal-val{position:absolute;transform:translate(-50%,-50%);pointer-events:none;white-space:nowrap;line-height:1}.n9-bal-lab{font-size:.95rem}.n9-bal-val{font-size:1.18rem;font-weight:bold}.n9-bal-ctrl .n9-stp{display:grid;grid-template-columns:repeat(2,54px) 74px repeat(2,54px);gap:7px;justify-content:center;align-items:center}.n9-bal-ctrl .btn{width:54px;height:36px;display:flex;align-items:center;justify-content:center;box-shadow:2px 2px 0 var(--ink)}.n9-bal-ctrl .btn:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}.n9-bal-ctrl b{text-align:center;white-space:nowrap}.n9-bal-next .btn{min-height:36px;font-size:.88rem;padding:5px 12px}.n9-bal-next .btn:not(.primary){box-shadow:2px 2px 0 var(--ink)}.n9-bal-next .btn:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}',
        '.n9-bal-single{display:flex;align-items:center;justify-content:center;gap:7px;flex-wrap:nowrap;margin:7px auto 12px;white-space:nowrap;max-width:100%;overflow-x:auto;overflow-y:visible;padding:9px 3px 12px}.n9-bal-single .katex{font-size:1em}.n9-bal-factor{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;flex-shrink:0}.n9-bal-factor>span:last-child{font-size:.73rem;line-height:1.4;direction:rtl;white-space:nowrap}.n9-price-eq{display:flex;align-items:center;justify-content:center;gap:4px;padding:13px 2px;margin:8px auto;white-space:nowrap;max-width:100%;overflow-x:auto}.n9-fa-frac{display:inline-flex;flex-direction:column;align-items:stretch;text-align:center;line-height:1.3;font-size:1rem;flex-shrink:0}.n9-fa-frac>span:first-child{border-bottom:1.5px solid currentColor;padding:0 5px 3px}.n9-fa-frac>span:last-child{padding:3px 5px 0}', '.n9-w .dm{overflow-y:visible;padding-top:14px;padding-bottom:19px}.n9-w .n9-bal-math .dm{margin:4px 0;padding:12px 2px 20px}.n9-w .n9-bal-products{display:flex;justify-content:center;gap:20px;align-items:center;flex-wrap:wrap}.n9-w .n9-bal-products .dm{min-width:0;padding-bottom:30px}.n9-w .n9-bal-svg{margin-top:8px}.n9-w .n9-persian-math .katex .mord.text{direction:rtl!important;unicode-bidi:isolate!important}.n9-w .n9-persian-math .katex .mord.text>span{direction:rtl!important;unicode-bidi:isolate!important}', '.n9-chip.sel{background:var(--mark);box-shadow:2px 2px 0 var(--ink)}', '.n9-crew .n9-chip{min-width:46px;min-height:36px;box-shadow:2px 2px 0 var(--ink);display:inline-flex;align-items:center;justify-content:center}', '.n9-crew .n9-chip:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}', '.n9-crew .opts .btn:not(.primary){box-shadow:2px 2px 0 var(--ink)}', '.n9-crew .opts .btn:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}', '.n9-price-colon{display:inline-block;margin:0 2px;font-weight:bold;line-height:1}', '.n9-crew .opts .btn,.n9-lab-next .btn{min-height:36px;font-size:.88rem;padding:5px 12px;font-weight:normal}', '.n9-const .n9-line .btn,.n9-const .n9-lab-next .btn:not(.primary){box-shadow:2px 2px 0 var(--ink)}', '.n9-const .n9-line .btn:active,.n9-const .n9-lab-next .btn:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}', '.n9-const .n9-t{table-layout:fixed;width:min(100%,440px)}.n9-const .n9-t th,.n9-const .n9-t td{width:20%;min-width:0;box-sizing:border-box;padding:5px 3px;white-space:nowrap}', '.n9-end .mc{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.n9-end .opts{display:flex;justify-content:space-between;direction:rtl}.n9-end .opts .btn{min-height:36px;font-size:.88rem;padding:5px 12px}', '.n9-crew .opts .btn,.n9-const .opts .btn,.n9-final .opts .btn{min-height:36px!important;font-size:.88rem!important;padding:5px 12px!important;font-weight:normal}', '.n9-const .n9-line .btn,.n9-const .opts .btn:not(.primary){box-shadow:2px 2px 0 var(--ink)}', '.n9-const .n9-line .btn:active,.n9-const .opts .btn:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)}', '.n9-const .n9-t{table-layout:fixed;width:min(100%,390px)}.n9-const .n9-t th,.n9-const .n9-t td{width:20%;box-sizing:border-box;min-width:0;padding:5px 2px;white-space:nowrap}', '.n9-final .mc{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.n9-final .opts:has([data-p="1"]):has([data-nx="1"]){display:flex;direction:rtl;justify-content:space-between;width:100%}',
        '.n9-crew .opts .btn,.n9-const .opts .btn,.n9-final .opts .btn,.n9-end .opts .btn{font-weight:700!important}',
        '.n9-end .opts .btn{box-shadow:none!important}.n9-end .mc .opt{box-shadow:none!important}', '.n9-const .mc{display:grid;grid-template-columns:minmax(0,300px);justify-content:center;gap:8px;margin-inline:auto}.n9-const .mc .btn{width:100%;min-height:44px;font-size:1rem}',
      ].join('\n');
      document.head.appendChild(st);
    }

    /* ---------- نمایش ریاضی ---------- */
    function fix(h) { return h.replace(/\$([^$]+)\$/g, function (m, s) { return '$' + s.replace(/(\d)\.(?=\d|\\overline|\{)/g, '$1\\text{٫}').replace(/\\%/g, '\\text{٪}') + '$'; }); }
    function rr(h) { return rr0(fix(h)); }
    var M = function (s) { return '$' + s + '$'; };
    var AL = function (lines) { return K.dm('\\begin{aligned}' + lines.join(NL) + '\\end{aligned}'); };
    var tipBtn = function (key, title, html) { return K.info(key, title, fix(html)); };
    var BL = function (s) { return '{\\color{blue}' + s + '}'; }, CR = function (s) { return '{\\color{crimson}' + s + '}'; }, GR = function (s) { return '{\\color{green}' + s + '}'; };
    var RT = function (a, b) { return a + CL + b; };                                                   /* a:b */
    /* ضرب/تقسیم هر دو جملهٔ نسبت در یک عدد: عدد قرمز و جدا کنار هر جمله (مثل درس کسرها) */
    var RC = function (a, b, op, k) { var c = '{\\color{crimson}\\scriptsize' + op + k + '}'; return a + c + CL + b + c; };
    var pick = function (arr) { return arr[R(0, arr.length - 1)]; };
    var rt = function (r) { return r.d === 1 ? '' + r.n : (r.n < 0 ? '-' : '') + '\\frac{' + Math.abs(r.n) + '}{' + r.d + '}'; };

    /* ---------- خواندن پاسخ دانش‌آموز (عدد صحیح، کسر یا اعشار) ---------- */
    function norm(s) {
      return String(s).replace(/[۰-۹]/g, function (c) { return c.charCodeAt(0) - 1776; }).replace(/[٠-٩]/g, function (c) { return c.charCodeAt(0) - 1632; })
        .replace(/[٫,،]/g, '.').replace(/\s/g, '').replace(/[−–]/g, '-').replace(/÷/g, '/');
    }
    function pval(s) {
      s = norm(s); var m = /^(-?)(\d+)\/(\d+)$/.exec(s);
      if (m) { var d = parseInt(m[3], 10); return d ? simp((m[1] ? -1 : 1) * parseInt(m[2], 10), d) : null; }
      m = /^(-?)(\d*)\.?(\d*)$/.exec(s); if (!m || (m[2] === '' && m[3] === '') || m[3].length > 6) { return null; }
      return simp((m[1] ? -1 : 1) * parseInt((m[2] || '0') + m[3], 10), Math.pow(10, m[3].length));
    }

    /* ---------- آزمون سؤال‌به‌سؤال: «سؤال n از m»، قبلی/بعدی، نتیجه و مجموعهٔ جدید ---------- */
    function seq(host, build, resText) {
      host.classList.add('n9-end');
      var qs, i, ans;
      function start() { qs = build(); i = 0; ans = []; }
      function paint() {
        var n = qs.length, q = qs[i], a = ans[i], h, oh = '', s;
        if (i === n) {
          s = ans.filter(function (x, k) { return qs[k].opts[x].ok; }).length;
          host.innerHTML = rr('<div class="fb ' + (s >= n - 1 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(s) + ' از ' + fa(n) + '</b><br>' + resText(s, n) + '</div><div class="opts end-actions"><button type="button" class="btn" data-pv="1">مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1">سؤال‌های جدید</button></div>');
          return;
        }
        h = '<div class="stg">' + qs.map(function (x, k) { return '<span class="' + (ans[k] !== undefined ? (qs[k].opts[ans[k]].ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">' + q.ask + '</p>' + (q.extra || '') + (q.tex ? K.dm(q.tex) : '') + '<div class="mc" id="mcx"></div>';
        q.opts.forEach(function (o, k) { oh += '<button type="button" class="btn opt' + (a !== undefined ? (o.ok ? ' right' : k === a ? ' wrong' : '') : '') + '" data-o="' + k + '"' + (a !== undefined ? ' disabled' : '') + '>' + o.h + '</button>'; });
        if (a !== undefined) { var o = q.opts[a]; h += fb(o.ok, o.ok ? '✓ درست است!' : (o.m || 'این گزینه درست نیست.')) + '<div class="ex">' + q.expl + '</div>'; }
        h += '<div class="opts"><button type="button" class="btn" data-p="1"' + (i ? '' : ' disabled') + '>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (a === undefined ? ' disabled' : '') + '>' + (i === n - 1 ? 'مشاهدهٔ نتیجه':'سؤال بعدی') + '</button></div>';
        host.innerHTML = rr(h); host.querySelector('#mcx').innerHTML = rr(oh);
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b || b.disabled) { return; }
        if (b.dataset.o) { ans[i] = +b.dataset.o; paint(); } else if (b.dataset.nx) { i++; paint(); } else if (b.dataset.p) { i--; paint(); }
        else if (b.dataset.pv) { i = 0; paint(); } else if (b.dataset.r) { start(); paint(); }
      });
      start(); paint();
    }

    /* ============ ۱) رنگ‌ساز: نسبت‌های هم‌ارز، رنگِ یکسان ============ */
    function mixColor(b, y) {
      if (b + y === 0) { return '#e5e9ef'; }
      var t = b / (b + y); return 'rgb(' + Math.round(255 * (1 - t)) + ',' + Math.round(210 - 100 * t) + ',' + Math.round(255 * t) + ')';
    }
    var dots = function (n, col) { var s = '', i; for (i = 0; i < n; i++) { s += '<span class="n9-dot" style="background:' + col + '"></span>'; } return s; };
    K.mixer = function (host) {
      var p, q, k, fixB, fixedN, adj, msg;
      var counts = function () { return fixB ? [fixedN, adj] : [adj, fixedN]; };
      function newQ() { var t = 0; do { p = R(1, 5); q = R(1, 5); } while ((gcd(p, q) !== 1 || p === q) && t++ < 200); k = R(2, 4); fixB = Math.random() < 0.5; fixedN = (fixB ? p : q) * k; adj = 0; paint(); }
      function paint() {
        var c = counts(), b = c[0], y = c[1], solved = b > 0 && y > 0 && b * q === y * p, h, hint = '';
        if (!solved && b + y > 0 && b > 0 && y > 0) { hint = b * q > y * p ? 'رنگ تو از رنگ هدف آبی‌تر است.' : 'رنگ تو از رنگ هدف زردتر است.'; }
        h = '<p class="ask">دستور پایهٔ رنگ هدف ' + fa(p) + ' قطرهٔ آبی و ' + fa(q) + ' قطرهٔ زرد است. این بار ' + fa(fixedN) + ' قطرهٔ ' + (fixB ? 'آبی' : 'زرد') + ' داری. تعداد قطره‌های ' + (fixB ? 'زرد' : 'آبی') + ' را طوری تنظیم کن که رنگِ تو دقیقاً با هدف یکی شود:</p>';
        h += '<div class="n9-mixer">';
        h += '<div class="n9-line" dir="rtl"><div><div class="n9-sw" style="background:' + mixColor(p, q) + '"></div><div class="n9-cap">رنگ هدف: ' + fa(p) + ' آبی<br>و ' + fa(q) + ' زرد</div></div><div><div class="n9-sw" style="background:' + mixColor(b, y) + '"></div><div class="n9-cap">رنگ تو: ' + fa(b) + ' آبی<br>و ' + fa(y) + ' زرد</div></div></div>';
        h += '<div class="n9-dots"><div class="n9-dotrow">' + dots(y, '#e8b800') + '</div><div class="n9-dotrow">' + dots(b, 'blue') + '</div></div>';
        h += '<div class="n9-cap" style="font-weight:bold;font-size:1rem;margin:6px 0">قطره‌های ' + (fixB ? 'زرد' : 'آبی') + ':</div>';
        h += '<div class="n9-stp"><button type="button" class="btn" data-s="-5">' + M('-5') + '</button><button type="button" class="btn" data-s="-1">' + M('-') + '</button><b class="n9-cnt">' + M(String(adj)) + '</b><button type="button" class="btn" data-s="1">' + M('+') + '</button><button type="button" class="btn" data-s="5">' + M('+5') + '</button></div>';
        if (solved) { h += fb(true, 'رنگ‌ها یکی شد! ✓') + K.dm(RC(p, q, tm, k) + '=' + RT(p * k, q * k)) + '<div class="ex"><p>هر دو مقدار را در ' + fa(k) + ' ضرب کردیم؛ پس نسبت همان ماند و رنگ هم همان ماند.</p></div>'; }
        else if (hint) { h += '<p class="n9-cap" style="color:#9b2c2c;font-size:.9rem">' + hint + ' هنوز دقیقاً یکی نیست.</p>'; }
        h += '<div class="n9-next"><button type="button" class="btn' + (solved ? ' primary' : '') + '" data-nx="1">' + (solved ? 'رنگ بعدی' : 'رنگ دیگر') + '</button></div></div>';
        host.innerHTML = rr(h);
      }
      host.addEventListener('click', function (e) {
        var x = e.target.closest('button'); if (!x) { return; }
        if (x.dataset.s) { adj = Math.max(0, Math.min(24, adj + +x.dataset.s)); paint(); } else if (x.dataset.nx) { newQ(); }
      });
      newQ();
    };

    /* ============ ۲) ترازوی تناسب: x را طوری پیدا کن که ترازو تعادل پیدا کند ============ */
    function scaleSvg(L, Rr, labL, labR, xl, bal) {
      var mx = Math.max(L, Rr, 1), ang = L === Rr ? 0 : Math.max(-16, Math.min(16, (L - Rr) / mx * 22));
      var th = -ang * Math.PI / 180, c = Math.cos(th), si = Math.sin(th), cx = 250, cy = 92, half = 148;
      var lx = cx - half * c, ly = cy - half * si, rx = cx + half * c, ry = cy + half * si, col = bal ? 'green' : 'currentColor';
      function pan(x, y, isX) {
        return '<line x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + (y + 40) + '" stroke="currentColor" stroke-width="2"/><rect x="' + (x - 62) + '" y="' + (y + 40) + '" width="124" height="52" rx="12" style="fill:' + (isX ? '#fdecec' : '#e9f1fb') + ';stroke:' + (bal ? 'green' : 'currentColor') + '" stroke-width="2"/>';
      }
      function label(x, y, v) {
        return '<span class="n9-bal-lab" style="left:' + (100*x/500) + '%;top:' + (100*(y+51)/250) + '%">' + M(v) + '</span>';
      }
      return '<div class="n9-bal-svg"><svg viewBox="0 0 500 250" style="width:100%;display:block;font-family:inherit;direction:ltr" role="img" aria-label="ترازو">' +
        '<polygon points="' + (cx - 20) + ',165 ' + (cx + 20) + ',165 ' + cx + ',' + cy + '" style="fill:#c9d1da;stroke:currentColor" stroke-width="2"/><rect x="' + (cx - 50) + '" y="165" width="100" height="10" rx="4" fill="currentColor"/>' +
        '<line x1="' + lx + '" y1="' + ly + '" x2="' + rx + '" y2="' + ry + '" style="stroke:' + col + '" stroke-width="7" stroke-linecap="round"/><circle cx="' + cx + '" cy="' + cy + '" r="8" fill="currentColor"/>' +
        pan(lx, ly, xl) + pan(rx, ry, !xl) + '</svg>' +
        label(lx,ly,labL) + label(rx,ry,labR) +
        '<span class="n9-bal-val" style="left:'+(100*lx/500)+'%;top:'+(100*(ly+76)/250)+'%">'+M(String(L))+'</span>'+
        '<span class="n9-bal-val" style="left:'+(100*rx/500)+'%;top:'+(100*(ry+76)/250)+'%">'+M(String(Rr))+'</span></div>';
    }
    function genProp() {                                                           /* A:B = C:D با یک مجهول */
      var t = 0, a, b, m1, m2; do { a = R(1, 8); b = R(2, 9); } while ((gcd(a, b) !== 1 || a === b) && t++ < 200);
      m1 = R(1, 3); m2 = R(2, 6); while (m2 === m1) { m2 = R(2, 6); }
      return [a * m1, b * m1, a * m2, b * m2];
    }
    K.balance = function (host) {
      var v, hid, x;
      function newQ() { v = genProp(); hid = R(0, 3); x = R(1, 12); while (x === v[hid]) { x = R(1, 12); } paint(); }
      function paint() {
        var c = v.slice(), xl, L, Rr, bal, other, P, X, h, labL, labR, xs = CR('x'), cell = function (i) { return i === hid ? xs : '' + v[i]; };
        c[hid] = x; L = c[0] * c[3]; Rr = c[1] * c[2]; bal = L === Rr; xl = hid === 0 || hid === 3;
        other = hid === 0 ? c[3] : hid === 3 ? c[0] : hid === 1 ? c[2] : c[1];
        labL = (hid === 0 ? xs : String(c[0])) + '\\times ' + (hid === 3 ? xs : String(c[3])); labR = (hid === 1 ? xs : String(c[1])) + '\\times ' + (hid === 2 ? xs : String(c[2]));
        h = '<p class="ask">در تناسبِ زیر، ' + M(xs) + ' را طوری پیدا کن که ترازو به تعادل برسد. (ترازو حاصل‌ضرب‌های ضربدری را مقایسه می‌کند.)</p>';
        h += '<div class="n9-bal-single" dir="ltr">' + M('\\dfrac{' + cell(0) + '}{' + cell(1) + '}=\\dfrac{' + cell(2) + '}{' + cell(3) + '}\\;\\Rightarrow');
        h += '<div class="n9-bal-factor">' + M('\\underbrace{' + cell(0) + '\\times ' + cell(3) + '}') + '<span>کفه چپ ترازو</span></div>';
        h += M('=') + '<div class="n9-bal-factor">' + M('\\underbrace{' + cell(1) + '\\times ' + cell(2) + '}') + '<span>کفه راست ترازو</span></div></div>';
        h += scaleSvg(L, Rr, labL, labR, xl, bal);
        h += '<div class="n9-line n9-bal-ctrl"><span class="n9-stp"><button type="button" class="btn" data-s="-5">' + M('-5') + '</button><button type="button" class="btn" data-s="-1">' + M('-1') + '</button><b>' + M('x='+x) + '</b><button type="button" class="btn" data-s="1">' + M('+1') + '</button><button type="button" class="btn" data-s="5">' + M('+5') + '</button></span></div>';
        if (bal) {
          P = xl ? Rr : L; X = x;
          h += fb(true, 'تعادل! ✓ x = ' + fa(x)) + '<div class="ex"><p>حاصل‌ضرب‌های ضربدری باید برابر باشند:</p>' + AL([T`${other}\times x&=${P}`, T`x&=${P}${dv}${other}=${CR(X)}`]) + '</div>';
        } else { h += '<p class="n9-cap" style="font-size:.9rem;color:#9b2c2c">' + (((L > Rr) === xl) ? 'کفهٔ x سنگین‌تر است؛ x را کمتر کن.' : 'کفهٔ x سبک‌تر است؛ x را بیشتر کن.') + '</p>'; }
        h += '<div class="opts n9-bal-next"><button type="button" class="btn' + (bal ? ' primary' : '') + '" data-nx="1">' + (bal ? 'تناسب بعدی' : 'تناسب دیگر') + '</button></div>';
        host.innerHTML = rr(h);
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) { return; }
        if (b.dataset.s) { x = Math.max(1, Math.min(99, x + +b.dataset.s)); paint(); } else if (b.dataset.nx) { newQ(); }
      });
      newQ();
    };

    /* ============ ۳) تقویم کار: تناسب وارون (کارگر × روز = کار کل) ============ */
    K.crew = function (host) {
      host.classList.add('n9-crew');
      var T0, ws, tgt, w;
      var COLS = ['#2f9e44', '#3b82c4', '#e8b800'];
      function cal(w, d) {
        var cw = Math.min(16, Math.floor(300 / d)), ch = Math.min(16, Math.floor(150 / w)), W = cw * d, H = ch * w, i, j, s = '<svg class="n9-cal" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="تقویم کار">';
        for (i = 0; i < w; i++) { for (j = 0; j < d; j++) { s += '<rect x="' + (j * cw) + '" y="' + (i * ch) + '" width="' + (cw - 1) + '" height="' + (ch - 1) + '" rx="2" style="fill:' + COLS[i % 3] + '"/>'; } }
        return s + '</svg>';
      }
      function newQ() { T0 = pick([24, 36, 48, 60, 72]); ws = divisors(T0).filter(function (d) { return d <= 12; }); tgt = T0 / pick(ws.filter(function (d) { return d >= 2; })); w = 0; host.dataset.t = T0; host.dataset.tgt = tgt; paint(); }
      function paint() {
        var d = w ? T0 / w : 0, h = '<p class="ask">برای ساختن یک دیوار ' + fa(T0) + ' بخش کار لازم است و هر کارگر در هر روز ۱ بخش می‌سازد. دیوار باید در <b>' + fa(tgt) + ' روز</b> تمام شود. تعداد کارگرها را انتخاب کن؛ هر ردیفِ تقویم یک کارگر و هر ستون یک روز است:</p>';
        h += '<div class="n9-line">' + ws.map(function (x) { return '<button type="button" class="n9-chip' + (x === w ? ' sel' : '') + '" data-w="' + x + '">' + fa(x) + '</button>'; }).join('') + '</div>';
        if (w) {
          h += cal(w, d) + '<p class="n9-cap" style="font-size:.95rem">' + fa(w) + ' کارگر ← ' + fa(d) + ' روز</p>';
          if (d === tgt) { h += fb(true, 'دیوار دقیقاً در ' + fa(tgt) + ' روز تمام می‌شود! ✓') + K.dm(w + tm + d + '=' + T0) + '<div class="ex"><p>هر شکلی که تقویم بگیرد، تعداد خانه‌ها (کار کل) ثابت می‌ماند: کارگر بیشتر، روز کمتر.</p></div>'; }
          else { h += '<p class="n9-cap" style="font-size:.9rem;color:#9b2c2c">' + (d > tgt ? 'این‌طور دیرتر از هدف تمام می‌شود؛ کارگر بیشتری لازم داری.' : 'این‌طور زودتر از هدف تمام می‌شود؛ تعداد کمتری کارگر هم کافی است.') + '</p>'; }
        }
        h += '<div class="opts"><button type="button" class="btn' + (w && T0 / w === tgt ? ' primary' : '') + '" data-nx="1">' + (w && T0 / w === tgt ? 'دیوار بعدی' : 'دیوار دیگر') + '</button></div>';
        host.innerHTML = rr(h);
      }
      host.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) { return; } if (b.dataset.w) { w = +b.dataset.w; paint(); } else if (b.dataset.nx) { newQ(); } });
      newQ();
    };

    /* ============ ۴) آزمایشگاه ثابت‌ها: مستقیم، وارون یا هیچ‌کدام؟ ============ */
    function genTable() {
      var kind = pick(['d', 'i', 'n']), xs = pick([[1, 2, 3, 4], [2, 3, 4, 6], [1, 2, 4, 8]]), ys, k, KK, a, c;
      if (kind === 'd') { k = R(2, 9); ys = xs.map(function (x) { return k * x; }); }
      else if (kind === 'i') { KK = xs.reduce(lcm2, 1) * R(1, 4); ys = xs.map(function (x) { return KK / x; }); }
      else { a = R(1, 3); c = R(1, 6); ys = xs.map(function (x) { return a * x + c; }); }
      return { kind: kind, xs: xs, ys: ys };
    }
    function tableHtml(g, showQ, showP) {
      var td = function (arr) { return arr.map(function (v) { return '<td>' + v + '</td>'; }).join(''); };
      return '<table class="n9-t"><tr><th>x</th>' + td(g.xs.map(fa)) + '</tr><tr><th>y</th>' + td(g.ys.map(fa)) + '</tr>' +
        (showQ ? '<tr class="tool"><td>' + M('y\\div x') + '</td>' + td(g.xs.map(function (x, i) { return M(rt(simp(g.ys[i], x))); })) + '</tr>' : '') +
        (showP ? '<tr class="tool"><td>' + M('x\\times y') + '</td>' + td(g.xs.map(function (x, i) { return M('' + x * g.ys[i]); })) + '</tr>' : '') + '</table>';
    }
    function tableExplain(g) {
      var q0 = simp(g.ys[0], g.xs[0]), p0 = g.xs[0] * g.ys[0];
      return g.kind === 'd' ? '<p>خارج‌قسمتِ ' + M(T`\frac{y}{x}`) + ' همه‌جا برابر ' + M(rt(q0)) + ' است؛ پس تناسب <b>مستقیم</b> است.</p>'
        : g.kind === 'i' ? '<p>حاصل‌ضرب ' + M(T`x\times y`) + ' همه‌جا برابر ' + M('' + p0) + ' است؛ پس تناسب <b>وارون</b> است.</p>'
        : '<p>نه خارج‌قسمتِ ' + M(T`\frac{y}{x}`) + ' ثابت است و نه حاصل‌ضرب ' + M(T`x\times y`) + '. هر دو با هم بزرگ می‌شوند، اما این به‌تنهایی تناسب مستقیم نیست؛ پس <b>هیچ‌کدام</b>.</p>';
    }
    K.constLab = function (host) {
      host.classList.add('n9-const');
      var g, showQ, showP, ans;
      function newQ() { g = genTable(); showQ = false; showP = false; ans = null; paint(); host.dataset.kind = g.kind; }
      function paint() {
        var h = '<p class="ask">جدول زیر چه رابطه‌ای بین x و y دارد؟ با ابزارها دو چیز را بسنج و بعد تصمیم بگیر:</p>' + tableHtml(g, showQ || ans !== null, showP || ans !== null);
        h += '<div class="n9-line"><button type="button" class="btn" data-t="q">محاسبهٔ y ÷ x</button><button type="button" class="btn" data-t="p">محاسبهٔ x × y</button></div>';
        h += '<div class="mc"><button type="button" class="btn opt' + (ans ? (g.kind === 'd' ? ' right' : ans === 'd' ? ' wrong' : '') : '') + '" data-a="d"' + (ans ? ' disabled' : '') + '>تناسب مستقیم</button><button type="button" class="btn opt' + (ans ? (g.kind === 'i' ? ' right' : ans === 'i' ? ' wrong' : '') : '') + '" data-a="i"' + (ans ? ' disabled' : '') + '>تناسب وارون</button><button type="button" class="btn opt' + (ans ? (g.kind === 'n' ? ' right' : ans === 'n' ? ' wrong' : '') : '') + '" data-a="n"' + (ans ? ' disabled' : '') + '>هیچ‌کدام</button></div>';
        if (ans) { h += fb(ans === g.kind, ans === g.kind ? '✓ درست است!' : 'این‌طور نیست.') + '<div class="ex">' + tableExplain(g) + '</div>'; }
        h += '<div class="opts n9-lab-next"><button type="button" class="btn' + (ans ? ' primary' : '') + '" data-nx="1">' + (ans ? 'جدول بعدی' : 'جدول دیگر') + '</button></div>';
        host.innerHTML = rr(h);
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b || b.disabled) { return; }
        if (b.dataset.t) { if (b.dataset.t === 'q') { showQ = true; } else { showP = true; } paint(); } else if (b.dataset.a) { ans = b.dataset.a; paint(); } else if (b.dataset.nx) { newQ(); }
      });
      newQ();
    };

    /* ============ آزمون پایانی (۵ سؤال تصادفی) ============ */
    var DIRECT = [
      function (x1, y1, x2) { return 'قیمتِ ' + fa(x1) + ' دفتر ' + fa(y1) + ' هزار تومان است. با همین نرخ، قیمتِ ' + fa(x2) + ' دفتر چند هزار تومان است؟'; },
      function (x1, y1, x2) { return 'یک ماشین با سرعت ثابت در ' + fa(x1) + ' ساعت ' + fa(y1) + ' کیلومتر می‌رود. در ' + fa(x2) + ' ساعت چند کیلومتر می‌رود؟'; },
      function (x1, y1, x2) { return 'برای پختن ' + fa(x1) + ' کیک، ' + fa(y1) + ' تخم‌مرغ لازم است. برای ' + fa(x2) + ' کیک چند تخم‌مرغ لازم است؟'; },
      function (x1, y1, x2) { return 'یک چاپگر در ' + fa(x1) + ' دقیقه ' + fa(y1) + ' برگ چاپ می‌کند. در ' + fa(x2) + ' دقیقه چند برگ چاپ می‌کند؟'; }
    ];
    var INVERSE = [
      function (x1, y1, x2) { return fa(x1) + ' کارگر یک دیوار را در ' + fa(y1) + ' روز می‌سازند. اگر ' + fa(x2) + ' کارگر (با همان توان) کار کنند، دیوار در چند روز ساخته می‌شود؟'; },
      function (x1, y1, x2) { return 'یک ماشین با سرعت ' + fa(x1) + ' کیلومتر بر ساعت مسیری را در ' + fa(y1) + ' ساعت می‌رود. با سرعت ' + fa(x2) + ' کیلومتر بر ساعت، همین مسیر چند ساعت طول می‌کشد؟'; },
      function (x1, y1, x2) { return fa(x1) + ' شیر آب یک استخر را در ' + fa(y1) + ' ساعت پر می‌کنند. ' + fa(x2) + ' شیرِ مشابه آن را در چند ساعت پر می‌کنند؟'; },
      function (x1, y1, x2) { return 'خوراک ' + fa(x1) + ' اسب برای ' + fa(y1) + ' روز کافی است. همین خوراک برای ' + fa(x2) + ' اسب چند روز کافی است؟'; }
    ];
    function numOpts(correct, cands) {                                             /* گزینه‌های عددی متمایز و مثبت */
      var out = [{ h: M('' + correct), ok: true }], seen = {}, extra = [[correct + 2, ''], [Math.max(1, correct - 2), ''], [correct * 2, '']];
      seen[correct] = 1;
      cands.concat(extra).forEach(function (c) { var n = c[0]; if (out.length < 4 && n > 0 && n === Math.round(n) && !seen[n]) { seen[n] = 1; out.push({ h: M('' + n), m: c[1] || 'محاسبه‌ات را دوباره بررسی کن.' }); } });
      return out;
    }
    K.finalN09 = function (host) {
      host.classList.add('n9-final');
      function qSimp() {
        var a, b, t = 0, g; do { a = R(1, 9); b = R(1, 9); } while ((gcd(a, b) !== 1 || a === b) && t++ < 200); g = R(2, 9);
        var A = a * g, B = b * g, f = 0, i; for (i = 2; i < g; i++) { if (g % i === 0) { f = i; break; } }
        var half = f ? RT(a * (g / f), b * (g / f)) : RT(A, B);
        var opts = [{ h: M(RT(a, b)), ok: true }, { h: M(RT(b, a)), m: 'ترتیب جمله‌ها را عوض کرده‌ای؛ ' + M(RT(A, B)) + ' با ' + M(RT(B, A)) + ' فرق دارد.' }, { h: M(half), m: 'این نسبت با نسبت اصلی برابر است، اما هنوز ساده‌ترین شکل نیست.' }, { h: M(RT(a, B)), m: 'فقط یک جمله را ساده کرده‌ای؛ باید هر دو جمله را بر یک عدد تقسیم کنی.' }];
        return { ask: 'ساده‌ترین شکل نسبت ' + M(RT(A, B)) + ' کدام است؟', expl: '<p>' + M(RC(A, B, dv, g) + '=' + RT(a, b)) + '</p>', opts: opts };
      }
      function qProp() {
        var v = genProp(), hid = R(0, 3), c = hid, correct = v[hid], add, cell = function (i) { return i === hid ? CR('x') : '' + v[i]; };
        add = hid === 3 ? v[2] + (v[1] - v[0]) : hid === 2 ? v[3] - (v[1] - v[0]) : hid === 1 ? v[0] + (v[3] - v[2]) : v[1] - (v[3] - v[2]);
        var cands = [[add, 'نسبت‌ها را نمی‌شود با جمع و تفریق حفظ کرد؛ باید دو جملهٔ نسبت را در یک عدد ضرب کنیم.']];
        var other = hid === 0 ? v[1] * v[2] / v[3] : hid === 1 ? v[0] * v[3] / v[2] : hid === 2 ? v[0] * v[3] / v[1] : v[1] * v[2] / v[0];
        var P = hid === 0 || hid === 3 ? v[1] * v[2] : v[0] * v[3], f = hid === 0 ? v[3] : hid === 3 ? v[0] : hid === 1 ? v[2] : v[1];
        cands.push([P * f, 'حاصل‌ضرب ضربدری را باید بر عدد دیگر تقسیم کنی، نه اینکه در آن ضرب کنی.']);
        return { ask: 'در تناسب زیر، مقدار ' + M(CR('x')) + ' چند است؟', tex: '\\frac{' + cell(0) + '}{' + cell(1) + '}=\\frac{' + cell(2) + '}{' + cell(3) + '}', expl: '<p>' + (hid === 0 || hid === 3 ? M(v[1] + tm + v[2] + '=' + f + tm + 'x') : M(v[0] + tm + v[3] + '=' + f + tm + 'x')) + '، پس ' + M('x=' + correct) + '.</p>', opts: numOpts(correct, cands) };
      }
      function qDirect() {
        var r = R(2, 9), x1 = R(2, 9), x2 = R(2, 12), y1, correct; while (x2 === x1) { x2 = R(2, 12); }
        y1 = r * x1; correct = r * x2;
        var cands = [[y1 * x1 / x2, 'این کمیت‌ها هم‌جهت‌اند (یکی زیاد شود، دیگری هم زیاد می‌شود)؛ پس تناسب مستقیم است، نه وارون.'], [y1 + (x2 - x1), 'با جمع نمی‌شود؛ باید نرخ را در تعداد جدید ضرب کنی.'], [r, 'این فقط نرخِ یک واحد است؛ باید آن را در تعداد جدید ضرب کنی.'], [y1 * x2, 'باید بر ' + fa(x1) + ' هم تقسیم کنی.']];
        return { ask: pick(DIRECT)(x1, y1, x2), expl: '<p>' + M('\\frac{' + x1 + '}{' + y1 + '}=\\frac{' + x2 + '}{x}') + '</p><p>' + M(y1 + '\\div' + x1 + '=' + r + '\\Rightarrow ' + r + tm + x2 + '=' + correct) + '</p>', opts: numOpts(correct, cands) };
      }
      function qInverse() {
        var T0 = pick([24, 30, 36, 40, 48, 60, 72]), ds = divisors(T0).filter(function (d) { return d >= 2 && d <= 20; }), x1 = pick(ds), x2 = pick(ds), y1, correct; while (x2 === x1) { x2 = pick(ds); }
        y1 = T0 / x1; correct = T0 / x2;
        var cands = [[y1 * x2 / x1, 'این کمیت‌ها خلاف‌جهت‌اند (یکی زیاد شود، دیگری کم می‌شود)؛ پس تناسب وارون است، نه مستقیم.'], [y1 - (x2 - x1), 'با تفریق نمی‌شود؛ حاصل‌ضرب دو کمیت ثابت است.'], [T0, 'این همان حاصل‌ضرب (کار کل) است؛ باید آن را بر تعداد جدید تقسیم کنی.'], [y1 * x2, 'در تناسب وارون باید حاصل‌ضرب ثابت بماند و بر تعداد جدید تقسیم شود.']];
        return { ask: pick(INVERSE)(x1, y1, x2), expl: '<p>' + M(x1 + tm + y1 + '=' + T0) + '، پس ' + M(T0 + dv + x2 + '=' + correct) + '.</p>', opts: numOpts(correct, cands) };
      }
      function qClass() {
        var g = genTable();
        return { ask: 'جدول زیر چه رابطه‌ای بین x و y دارد؟', extra: tableHtml(g, false, false), expl: tableExplain(g), opts: [{ h: 'تناسب مستقیم', ok: g.kind === 'd', m: 'در تناسب مستقیم ' + M(T`\frac{y}{x}`) + ' ثابت است؛ این‌جا ثابت نیست.' }, { h: 'تناسب وارون', ok: g.kind === 'i', m: 'در تناسب وارون ' + M(T`x\times y`) + ' ثابت است؛ این‌جا ثابت نیست.' }, { h: 'هیچ‌کدام', ok: g.kind === 'n', m: 'یکی از این دو مقدار ثابت است؛ آن را پیدا کن.' }] };
      }
      seq(host, function () { return [qSimp, qProp, qDirect, qInverse, qClass].map(function (f) { var q = f(); if (q.opts.length > 3 || q.opts[0].h.indexOf('$') === 0) { q.opts = shuffle(q.opts); } return q; }); },
        function (s) { return s === 5 ? 'عالی بود! به همهٔ سؤال‌ها درست جواب دادی.' : s >= 3 ? 'خوب بود. سؤال‌هایی را که اشتباه کردی دوباره مرور کن.' : 'یک بار دیگر درس را مرور کن؛ بعد با عددهای جدید امتحان کن.'; });
    };

    /* ---------- محتوای دیالوگ‌های i ---------- */
    var RATIO_TIP = '<p>نسبتِ $a$ به $b$ را «$a$ به $b$» می‌خوانیم و به‌صورت $a:b$ یا $\\frac{a}{b}$ می‌نویسیم. نسبت در واقع همان تقسیمِ $a$ بر $b$ است.</p><p>مثال: نسبتِ ۲ به ۳ را $2:3$ می‌نویسیم و برابر با کسر $\\frac{2}{3}$ است.</p>';
    var TERMS_TIP = '<p>در تناسبِ $a:b=c:d$ دو جملهٔ <b style="color:blue">بیرونی</b> را «طرفین» و دو جملهٔ <b style="color:green">درونی</b> را «وسطین» می‌نامیم:</p>' +
      '<div class="dm">$' + T`{\color{blue}a}:{\color{green}b}={\color{green}c}:{\color{blue}d}` + '$</div><p>حاصل‌ضربِ طرفین برابر حاصل‌ضربِ وسطین است:</p><div class="dm">$' + T`{\color{blue}a}\times{\color{blue}d}={\color{green}b}\times{\color{green}c}` + '$</div>';

    return {
      html: function () {
        tipBtn('n9-ratio', 'نسبت را چطور بخوانیم و بنویسیم؟', RATIO_TIP); tipBtn('n9-terms', 'طرفین و وسطین', TERMS_TIP);
        var host = function (id) { return '<div class="cover n9-w" id="' + id + '" style="animation:none"></div>'; };
        var FC = function (n, d, op, k) { var c = '{\\color{crimson}\\scriptsize' + op + k + '}'; return '\\frac{' + n + c + '}{' + d + c + '}'; };
        return fix([
          /* ───────── ۱ ───────── */
          K.sn('۱', 'نسبت: مقایسه با تقسیم'),
          '<p>در یک غرفهٔ لیموناد، دستور تهیه این است: ۲ لیوان آب‌لیمو و ۳ لیوان آب. برای مقایسهٔ این دو مقدار، یکی را بر دیگری تقسیم می‌کنیم و نتیجه را «نسبت» می‌نامیم.</p>',
          T`<p>نسبتِ آب‌لیمو به آب را «۲ به ۳» می‌خوانیم و به‌صورت $2:3$ یا $\frac{2}{3}$ می‌نویسیم ${tipBtn('n9-ratio', 'نسبت را چطور بخوانیم و بنویسیم؟', RATIO_TIP)}.</p>`,
          K.box('note', 'سه نکتهٔ مهم', T`<ul><li><b>ترتیب مهم است:</b> $2:3$ و $3:2$ یکی نیستند.</li><li><b>واحدها یکی باشند:</b> هر دو مقدار «لیوان» یا هر دو «لیتر».</li><li><b>نسبت واحد ندارد:</b> یک عدد خالص است.</li></ul>`),
          '<h4>نسبتِ جزء به کل</h4><p>کلِ مخلوط ' + M(T`2+3=5`) + ' لیوان است. پس نسبتِ آب‌لیمو به <em>کل مخلوط</em> برابر ۲ به ۵ است:</p>', K.dm(T`2:(2+3)\ \ =\ \ 2:5`),
          K.box('err', '⚠ اشتباه رایج', T`<p>اگر بپرسند «نسبتِ آب به آب‌لیمو» چقدر است، جواب $3:2$ است، نه $2:3$. هم ترتیبِ کلمه‌ها در سؤال مهم است و هم اینکه «جزء به جزء» می‌پرسند یا «جزء به کل».</p>`),

          /* ───────── ۲ ───────── */
          K.sn('۲', 'نسبت‌های هم‌ارز'),
          '<p>برای دو نفر باید دستور را دو برابر کنی: ۴ لیوان آب‌لیمو و ۶ لیوان آب. مزهٔ لیموناد عوض نمی‌شود؛ چون هر دو مقدار را در یک عدد ضرب کرده‌ایم (عدد ضرب‌شده قرمز است):</p>',
          AL([T`${RC(2, 3, tm, 2)}&=4${CL}6`, T`${RC(2, 3, tm, 3)}&=6${CL}9`]),
          '<p>نسبت‌هایی که با ضربِ هر دو جمله در یک عدد از هم به دست می‌آیند «هم‌ارز»اند و مقدارِ یکسانی دارند:</p>', K.dm(T`2:3\ \ =\ \ 4:6\ \ =\ \ 6:9\ \ =\ \ 8:12`),
          '<h4>ساده‌کردن نسبت</h4><p>برعکسش هم درست است: هر دو جمله را بر یک عدد تقسیم کنیم. وقتی دو جمله عاملِ مشترکی نداشته باشند، نسبت به ساده‌ترین شکل رسیده است (درست مثل ساده‌کردن کسر در درس کسرها):</p>',
          AL([T`12${CL}18&=${RC(12, 18, dv, 6)}=2${CL}3`, T`15${CL}25&=${RC(15, 25, dv, 5)}=3${CL}5`]),
          '<h4>رنگ‌ساز</h4><p>دو رنگِ آبی و زرد را مثل لیموناد با یک نسبتِ معین مخلوط می‌کنیم. قانون ساده است: نسبت‌های هم‌ارز، رنگِ یکسان می‌دهند. تو هم ثابتش کن:</p>', host('n9a'),

          /* ───────── ۳ ───────── */
          K.sn('۳', 'تناسب: وقتی دو نسبت برابرند'),
          '<p>اگر دو نسبت برابر باشند، برابریِ آن‌ها را «تناسب» می‌نامیم:</p>', K.dm(T`2${CL}3\ \ =\ \ 8${CL}12\qquad\left(\frac{2}{3}\ \ =\ \ \frac{8}{12}\right)`),
          T`<p>در تناسبِ $a:b=c:d$ دو جملهٔ بیرونی «طرفین» و دو جملهٔ درونی «وسطین» نام دارند ${tipBtn('n9-terms', 'طرفین و وسطین', TERMS_TIP)}. قانونِ مهمِ تناسب:</p>`,
          K.dm(T`${BL('a')}\times${BL('d')}=${GR('b')}\times${GR('c')}`),
          T`<p>یعنی <b>حاصل‌ضرب طرفین برابر حاصل‌ضرب وسطین</b> است. دلیلش ساده است: دو طرفِ $\frac{a}{b}=\frac{c}{d}$ را در $b\times d$ ضرب کن:</p>`, K.dm(T`\frac{a}{b}=\frac{c}{d}\;\xRightarrow{\times(b\times d)}\;\frac{a\times{\color{crimson}\cancel{\color{black}b}}\times d}{{\color{crimson}\cancel{\color{black}b}}}=\frac{c\times b\times{\color{crimson}\cancel{\color{black}d}}}{{\color{crimson}\cancel{\color{black}d}}}\;\Rightarrow\;a\times d=b\times c`),
          '<h4>آیا این دو نسبت برابرند؟</h4><p>برای آزمودن، حاصل‌ضرب‌های ضربدری را مقایسه کن. مثلاً ببین ۳ به ۴ و ۹ به ۱۲ تناسب هستند یا نه:</p>', AL([T`3\times12&=36`, T`4\times9&=36`]),
          '<p>برابرند؛ پس تناسب است. اما ۲ به ۳ و ۵ به ۸:</p>', AL([T`2\times8&=16`, T`3\times5&=15`]), '<p>برابر نیستند؛ پس تناسب نیست.</p>',
          '<h4>پیدا کردن مجهول</h4>', T`<p>در تناسب $\frac{2}{3}=\frac{x}{12}$ مقدار $x$ را به دو روش پیدا می‌کنیم.</p><p><b>روش اول: ضرب ضربدری.</b></p>`,
          AL([T`2\times12&=3\times x`, T`24&=3x`, T`x&=\frac{24{\color{crimson}\scriptsize\div3}}{3{\color{crimson}\scriptsize\div3}}=8`]),
          '<p><b>روش دوم: ضریب تبدیل.</b> مخرج از ۳ به ۱۲ رسیده است؛ یعنی در ۴ ضرب شده. پس صورت را هم باید در ۴ ضرب کنیم:</p>', K.dm(T`${RC(2, 3, tm, 4)}=8${CL}12\;\Rightarrow\;x=8`),
          '<p>مجهول می‌تواند هر جای تناسب باشد؛ روشِ کار همان است.</p>',
          '<h4>ترازوی تناسب</h4><p>ترازو، حاصل‌ضرب‌های ضربدری را مقایسه می‌کند. مجهول را طوری تنظیم کن که تعادل برقرار شود:</p>', host('n9b'),

          /* ───────── ۴ ───────── */
          K.sn('۴', 'تناسب مستقیم'),
          '<p>دفتر می‌خریم و هر دفتر ۵ هزار تومان است. ببین وقتی تعداد دفتر چند برابر می‌شود، قیمت چه می‌شود:</p>',
          K.tbl(['تعداد دفتر', 'قیمت (هزار تومان)'], [['۱', '۵'], ['۲', '۱۰'], ['۳', '۱۵'], ['۴', '۲۰']]),
          '<p>تعداد دو برابر شد، قیمت هم دو برابر شد؛ تعداد سه برابر شد، قیمت هم سه برابر. دو کمیتی که این‌طور با هم تغییر می‌کنند «متناسب مستقیم»‌اند. در این حالت <b>خارج‌قسمت</b> قیمت بر تعداد همیشه ثابت است:</p>',
          '<div class="n9-price-eq" dir="ltr"><span class="n9-fa-frac" dir="rtl"><span>قیمت</span><span>تعداد</span></span><span class="n9-price-colon">:</span>' + M(T`\frac{5}{1}=\frac{10}{2}=\frac{15}{3}=5`) + '</div>',
          '<h4>مسئله</h4><p>اگر ۳ دفتر ۱۲ هزار تومان باشد، ۷ دفتر چند هزار تومان است؟ تعداد را در بالا و قیمت را در پایین می‌نویسیم:</p>',
          K.dm(T`\frac{3}{12}=\frac{7}{x}`), AL([T`3\times x&=12\times7`, T`3x&=84`, T`x&=\frac{84{\color{crimson}\scriptsize\div3}}{3{\color{crimson}\scriptsize\div3}}=28`]),
          '<p>روش دیگر، پیدا کردن قیمتِ یک دفتر است:</p>', AL([T`12\div3&=4`, T`4\times7&=28`]),
          K.box('err', '⚠ اشتباه رایج', '<p>اگر ۳ دفتر ۱۲ هزار تومان است، ۶ دفتر ' + M(T`12+3=15`) + ' هزار تومان نیست! وقتی تعداد دو برابر می‌شود، قیمت هم باید دو برابر شود: ۲۴ هزار تومان. تناسب را با <b>ضرب</b> حفظ می‌کنیم، نه با جمع.</p>'),

          /* ───────── ۵ ───────── */
          K.sn('۵', 'تناسب وارون'),
          '<p>حالا ماجرا برعکس است. ۶ کارگر یک دیوار را در ۱۰ روز می‌سازند. کارگرها که بیشتر شوند، دیوار زودتر تمام می‌شود:</p>',
          K.tbl(['تعداد کارگر', 'تعداد روز', 'تعداد کارگر × تعداد روز'], [['۳', '۲۰', M(T`3\times20=60`)], ['۶', '۱۰', M(T`6\times10=60`)], ['۱۲', '۵', M(T`12\times5=60`)]]),
          '<p>کارگرها دو برابر شدند، روزها نصف شد. دو کمیتی که این‌طور تغییر می‌کنند «متناسب وارون»اند. این‌جا <b>حاصل‌ضرب</b> همیشه ثابت است؛ همان کار کلِ دیوار:</p>', K.dm(T`3\times20=6\times10=12\times5=60`),
          K.dm(T`x_{1}\times y_{1}=x_{2}\times y_{2}`),
          '<h4>مسئله</h4><p>اگر ۶ کارگر دیواری را در ۱۰ روز بسازند، ۱۵ کارگر همان دیوار را در چند روز می‌سازند؟</p>',
          AL([T`6\times10&=15\times x`, T`60&=15x`, T`x&=\frac{60{\color{crimson}\scriptsize\div15}}{15{\color{crimson}\scriptsize\div15}}=4`]),
          K.box('err', '⚠ اشتباه رایج', T`<p>اگر این مسئله را مثل تناسب مستقیم حل کنی، به ۲۵ روز می‌رسی؛ یعنی «کارگر بیشتر، زمانِ بیشتر»: </p>` + K.dm(T`\frac{6}{10}=\frac{15}{x}\;\Rightarrow\;6x=150\;\Rightarrow\;x=25`) + T`<p>قبل از حل بپرس: وقتی یکی زیاد می‌شود، دیگری هم زیاد می‌شود یا کم؟</p>`),
          '<h4>تقویم کار</h4><p>هر ردیف یک کارگر و هر ستون یک روز است. شکلِ تقویم را عوض کن و ببین تعداد خانه‌ها (کار کل) ثابت می‌ماند:</p>', host('n9c'),

          /* ───────── ۶ ───────── */
          K.sn('۶', 'مستقیم، وارون یا هیچ‌کدام؟'),
          '<p>برای تشخیص نوع رابطه از روی یک جدول، دو آزمون داریم:</p>',
          K.tbl(['', 'تناسب مستقیم', 'تناسب وارون'], [['چه چیزی ثابت است؟', M(T`\frac{y}{x}`), M(T`x\times y`)], ['x دو برابر شود', 'y هم دو برابر می‌شود', 'y نصف می‌شود'], ['مثال', 'تعداد دفتر و قیمت', 'تعداد کارگر و روز']]),
          T`<p>اگر هیچ‌کدام ثابت نبود، رابطه نه مستقیم است و نه وارون. مثلاً در $y=x+3$ هر دو کمیت با هم بزرگ می‌شوند، اما $y\div x$ ثابت نیست. «با هم زیاد شدن» برای تناسب مستقیم کافی نیست.</p>`,
          '<h4>آزمایشگاه ثابت‌ها</h4><p>ابزارها را بزن، ثابت را پیدا کن و نوع رابطه را تعیین کن:</p>', host('n9d'),

          /* ───────── ۷ ───────── */
          K.sn('۷', 'آزمون پایانی'),
          '<p>پنج سؤال با عددهای تصادفی. هر بار که از اول شروع کنی، سؤال‌ها عوض می‌شوند.</p>', host('n9e'),
          K.box('sum', 'جمع‌بندی', T`<ul><li>نسبتِ $a$ به $b$ همان $\frac{a}{b}$ است؛ ترتیب و واحدها مهم‌اند.</li><li>نسبت‌های هم‌ارز با ضرب یا تقسیمِ هر دو جمله در یک عدد ساخته می‌شوند.</li><li>تناسب: از $a:b=c:d$ نتیجه می‌شود $a\times d=b\times c$.</li><li>تناسب مستقیم: $y\div x$ ثابت است. تناسب وارون: $x\times y$ ثابت است.</li></ul><p>در درس تشابه مثلث‌ها (فصل هندسه) هم از تناسب استفاده می‌کنیم.</p>`)
        ].join(''));
      },
      init: function (panel) {
    panel.classList.add('standard-n6-10');
        K.mixer(panel.querySelector('#n9a')); K.balance(panel.querySelector('#n9b')); K.crew(panel.querySelector('#n9c'));
        K.constLab(panel.querySelector('#n9d')); K.finalN09(panel.querySelector('#n9e'));
      }
    };
  }
};
