/* lessonkit.js — ابزارهای مشترک درس‌ها: نمایش ریاضی (fix/rr/M/AL)، دیالوگ i، آزمون سؤال‌به‌سؤال (seq)،
   تشخیص عدد، رنگ‌ها و نمودار ون (venn). استفاده:  var H = K0.lk(K);  (K = ابزارِ محلیِ درس) */
(function () {
  'use strict';
  var K0 = window.CourseKit, ML = window.MathLite, fa = ML.fa, rr0 = ML.renderRich;
  var _u = K0._u, R = _u.R, shuffle = _u.shuffle, fb = K0._i.fb, vid = 0;
  var CSS = [
    '.lk-w{font-size:.95em}.lk-w .btn{min-height:34px;min-width:0;padding:2px 14px;font-size:.88rem}.lk-w .ask{font-size:.95rem}.lk-w .opts{gap:6px}.lk-w .mc .opt{min-height:44px;font-size:1rem}',
    '.wf{direction:rtl;text-align:center;margin:12px 0;font-size:1.12em;line-height:2.2}',
    '.lk-line{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;margin:8px 0}',
    '.lk-chip{padding:2px 12px;border:2px solid var(--ink);border-radius:99px;background:#fff;font:inherit;font-size:.95rem;cursor:pointer}',
    '.lk-chip.sel{background:var(--mark);box-shadow:2px 2px 0 var(--ink)}',
    '.lk-in{width:7.5em;padding:4px 8px;border:2px solid var(--ink);border-radius:10px;font:inherit;font-size:.95rem;text-align:center;direction:ltr}',
    '.lk-cap{font-size:.85rem;text-align:center;color:#46505e;margin:4px 0}.lk-bad{color:#9b2c2c}',
    '.lk-card{padding:6px 12px;border:2px solid var(--ink);border-radius:12px;background:#fff;cursor:pointer;font:inherit;min-width:6em}',
    '.lk-card.sel{background:var(--mark);box-shadow:3px 3px 0 var(--ink)}.lk-card.done{background:#d9f2e3;border-color:green;cursor:default}',
    '.lk-vn{display:block;margin:6px auto;width:100%;max-width:430px;font-family:inherit;direction:ltr}.lk-vn .vr{cursor:pointer}',
    '.lk-dots{display:flex;gap:5px;justify-content:center;direction:ltr;margin:6px 0}.lk-dots i{width:12px;height:12px;border-radius:50%;background:#d6dce4}.lk-dots i.ok{background:green}.lk-dots i.no{background:crimson}.lk-dots i.cu{outline:2px solid var(--ink)}'
  ].join('\n');

  K0.lk = function (K) {
    if (!document.getElementById('lkcss')) { var st = document.createElement('style'); st.id = 'lkcss'; st.textContent = CSS; document.head.appendChild(st); }
    var T = String.raw, NL = '\\\\';
    function fix(h) { return h.replace(/\$([^$]+)\$/g, function (m, s) { return '$' + s.replace(/(\d)\.(?=\d|\\overline|\{)/g, '$1\\text{٫}').replace(/\\%/g, '\\text{٪}') + '$'; }); }
    function rr(h) { return rr0(fix(h)); }
    var H = {
      fa: fa, R: R, shuffle: shuffle, fb: fb, T: T, fix: fix, rr: rr,
      M: function (s) { return '$' + s + '$'; },
      W: function (h) { return '<div class="dm wf">' + h + '</div>'; },
      AL: function (lines) { return K.dm('\\begin{aligned}' + lines.join(NL) + '\\end{aligned}'); },
      tip: function (key, title, html) { return K.info(key, title, fix(html)); },
      BL: function (s) { return '{\\color{blue}' + s + '}'; }, CR: function (s) { return '{\\color{crimson}' + s + '}'; }, GR: function (s) { return '{\\color{green}' + s + '}'; },
      pick: function (a) { return a[R(0, a.length - 1)]; },
      host: function (id) { return '<div class="cover lk-w" id="' + id + '" style="animation:none"></div>'; },
      sample: function (arr, k) { return shuffle(arr.slice()).slice(0, k); },
      sorted: function (a) { return a.slice().sort(function (x, y) { return x - y; }); },
      setTex: function (a) { return a.length ? '\\{' + a.join(',') + '\\}' : '\\varnothing'; },
      has: function (a, x) { return a.indexOf(x) >= 0; },
      union: function (a, b) { return a.concat(b.filter(function (x) { return a.indexOf(x) < 0; })); },
      inter: function (a, b) { return a.filter(function (x) { return b.indexOf(x) >= 0; }); },
      minus: function (a, b) { return a.filter(function (x) { return b.indexOf(x) < 0; }); },
      same: function (a, b) { return a.length === b.length && a.every(function (x) { return b.indexOf(x) >= 0; }); },
      sub: function (a, b) { return a.every(function (x) { return b.indexOf(x) >= 0; }); },
      gcd: function (a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
    };
    H.simp = function (n, d) { if (d < 0) { n = -n; d = -d; } var g = H.gcd(n, d) || 1; return { n: n / g, d: d / g }; };
    H.rt = function (r) { return r.d === 1 ? '' + r.n : (r.n < 0 ? '-' : '') + '\\frac{' + Math.abs(r.n) + '}{' + r.d + '}'; };
    H.norm = function (s) {
      return String(s).replace(/[۰-۹]/g, function (c) { return c.charCodeAt(0) - 1776; }).replace(/[٠-٩]/g, function (c) { return c.charCodeAt(0) - 1632; })
        .replace(/[٫,،]/g, '.').replace(/\s/g, '').replace(/[−–]/g, '-').replace(/÷/g, '/');
    };
    H.pval = function (s) {                                               /* عدد صحیح، کسر یا اعشار ← {n,d} */
      s = H.norm(s); var m = /^(-?)(\d+)\/(\d+)$/.exec(s);
      if (m) { var d = parseInt(m[3], 10); return d ? H.simp((m[1] ? -1 : 1) * parseInt(m[2], 10), d) : null; }
      m = /^(-?)(\d*)\.?(\d*)$/.exec(s); if (!m || (m[2] === '' && m[3] === '') || m[3].length > 6) { return null; }
      return H.simp((m[1] ? -1 : 1) * parseInt((m[2] || '0') + m[3], 10), Math.pow(10, m[3].length));
    };

    /* ---------- آزمون سؤال‌به‌سؤال ---------- */
    H.seq = function (host, build, resText) {
      var qs, i, ans;
      function start() { qs = build(); i = 0; ans = []; }
      function paint() {
        var n = qs.length, q = qs[i], a = ans[i], h, oh = '', s;
        if (i === n) {
          s = ans.filter(function (x, k) { return qs[k].opts[x].ok; }).length;
          host.innerHTML = rr('<div class="fb ' + (s >= n - 1 ? 'ok' : 'bad') + '"><b>نتیجه: ' + fa(s) + ' از ' + fa(n) + '</b><br>' + resText(s, n) + '</div><div class="opts"><button type="button" class="btn" data-pv="1">مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1" data-scroll>مجموعهٔ جدید</button></div>');
          return;
        }
        h = '<div class="stg">' + qs.map(function (x, k) { return '<span class="' + (ans[k] !== undefined ? (qs[k].opts[ans[k]].ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">سؤال ' + fa(i + 1) + ' از ' + fa(n) + ': ' + q.ask + '</p>' + (q.extra || '') + (q.tex ? K.dm(q.tex) : '') + '<div class="mc" id="mcx"></div>';
        q.opts.forEach(function (o, k) { oh += '<button type="button" class="btn opt' + (a !== undefined ? (o.ok ? ' right' : k === a ? ' wrong' : '') : '') + '" data-o="' + k + '"' + (a !== undefined ? ' disabled' : '') + '>' + o.h + '</button>'; });
        if (a !== undefined) { var o = q.opts[a]; h += fb(o.ok, o.ok ? 'درست است! ✓' : (o.m || 'این گزینه درست نیست.')) + '<div class="ex">' + q.expl + '</div>'; }
        h += '<div class="opts"><button type="button" class="btn" data-p="1"' + (i ? '' : ' disabled') + ' data-scroll>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (a === undefined ? ' disabled' : '') + ' data-scroll>' + (i === n - 1 ? 'پایان' : 'سؤال بعدی') + '</button></div>';
        host.innerHTML = rr(h); host.querySelector('#mcx').innerHTML = rr(oh);
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b || b.disabled) { return; }
        if (b.dataset.o) { ans[i] = +b.dataset.o; paint(); } else if (b.dataset.nx) { i++; paint(); } else if (b.dataset.p) { i--; paint(); }
        else if (b.dataset.pv) { i = 0; paint(); } else if (b.dataset.r) { start(); paint(); }
      });
      start(); paint();
    };

    /* ---------- نمودار ون: دو مجموعه در مجموعهٔ مرجع. نواحی: o بیرون، a فقط A، ab اشتراک، b فقط B ----------
       o: {A, B, U, fill:{o,a,ab,b}, reg:true (ناحیه‌ها کلیک‌پذیر), tok:function(x,region)->{bg,fg}, names:['A','B']} */
    H.venn = function (o) {
      var id = 'vc' + (++vid), A = o.A, B = o.B, U = o.U, F = o.fill || {}, nm = o.names || ['A', 'B'], reg = o.reg ? ' class="vr" ' : ' ';
      var cen = { a: [120, 130], ab: [210, 130], b: [300, 130] }, groups = { o: [], a: [], ab: [], b: [] }, i, out = '';
      U.forEach(function (x) { var ia = A.indexOf(x) >= 0, ib = B.indexOf(x) >= 0; groups[ia && ib ? 'ab' : ia ? 'a' : ib ? 'b' : 'o'].push(x); });
      var corners = [[34, 34], [62, 34], [34, 62], [62, 62], [386, 66], [358, 66], [386, 94], [358, 94], [34, 226], [62, 226], [90, 226], [386, 226], [358, 226], [330, 226]];
      var fillOf = function (r) { return F[r] || '#fff'; };
      var s = '<svg class="lk-vn" viewBox="0 0 420 260" role="img" aria-label="نمودار ون"><defs><clipPath id="' + id + '"><circle cx="162" cy="130" r="88"/></clipPath></defs>';
      s += '<rect' + reg + 'data-reg="o" x="6" y="6" width="408" height="248" rx="14" style="fill:' + fillOf('o') + ';stroke:currentColor" stroke-width="2"/>';
      s += '<circle' + reg + 'data-reg="a" cx="162" cy="130" r="88" style="fill:' + fillOf('a') + '"/><circle' + reg + 'data-reg="b" cx="258" cy="130" r="88" style="fill:' + fillOf('b') + '"/>';
      s += '<g clip-path="url(#' + id + ')"><circle' + reg + 'data-reg="ab" cx="258" cy="130" r="88" style="fill:' + fillOf('ab') + '"/></g>';
      s += '<circle cx="162" cy="130" r="88" fill="none" style="stroke:blue" stroke-width="3"/><circle cx="258" cy="130" r="88" fill="none" style="stroke:green" stroke-width="3"/>';
      s += '<text x="92" y="36" font-size="17" font-weight="700" style="fill:blue" text-anchor="middle">' + nm[0] + '</text><text x="328" y="36" font-size="17" font-weight="700" style="fill:green" text-anchor="middle">' + nm[1] + '</text><text x="398" y="22" font-size="14" font-weight="700" text-anchor="end" fill="currentColor">U</text>';
      ['a', 'ab', 'b', 'o'].forEach(function (r) {
        var g = groups[r], n = g.length, cols = r === 'o' ? 1 : (r === 'ab' && n <= 4 ? 1 : 2), rows = Math.ceil(n / cols), k;
        g.forEach(function (x, idx) {
          var px, py, t = o.tok ? o.tok(x, r) : null, bg = t && t.bg || '#fff', fg = t && t.fg || 'currentColor';
          if (r === 'o') { var c = corners[idx % corners.length]; px = c[0]; py = c[1]; }
          else { var col = idx % cols, row = Math.floor(idx / cols); px = cen[r][0] + (col - (cols - 1) / 2) * 27; py = cen[r][1] + (row - (rows - 1) / 2) * 27; }
          s += '<g pointer-events="none"><circle cx="' + px + '" cy="' + py + '" r="12" style="fill:' + bg + ';stroke:currentColor" stroke-width="1.5"/><text x="' + px + '" y="' + (py + 4.5) + '" text-anchor="middle" font-size="13" font-weight="700" style="fill:' + fg + '">' + (typeof x === 'number' ? fa(x) : x) + '</text></g>';
        });
      });
      return s + '</svg>';
    };
    return H;
  };
})();
