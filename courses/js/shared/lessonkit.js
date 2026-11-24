/* lessonkit.js — ابزارهای مشترک درس‌ها: نمایش ریاضی (fix/rr/M/AL)، دیالوگ i، تشخیص عدد، رنگ‌ها و نمودار ون (venn). استفاده:  var H = K0.lk(K);  (K = ابزارِ محلیِ درس) */
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
    '.lk-in{width:7.5em;min-height:0;padding:4px 8px;font:inherit;font-size:.95rem}.lk-in::placeholder{text-align:center}',
    '.lk-cap{font-size:.85rem;text-align:center;color:#46505e;margin:4px 0}.lk-bad{color:#9b2c2c}',
    '.lk-card{padding:6px 12px;border:2px solid var(--ink);border-radius:12px;background:#fff;cursor:pointer;font:inherit;min-width:6em}',
    '.lk-card.sel{background:var(--mark);box-shadow:3px 3px 0 var(--ink)}.lk-card.done{background:#d9f2e3;border-color:green;cursor:default}',
    '.lk-vn{display:block;margin:6px auto;width:100%;max-width:480px;font-family:inherit;direction:ltr}.lk-vn .vr{cursor:pointer}',
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
      fixQ: function (q) {   // اعمال fix روی همهٔ متن‌های یک سؤال H.final (ممیز و درصد فارسی)
        var e = q.expl; q.ask = fix(q.ask); if (q.fig) { q.fig = fix(q.fig); } if (q.cq) { q.cq = fix(q.cq); }
        q.opts.forEach(function (o) { o.h = fix(o.h); if (o.m) { o.m = fix(o.m); } });
        q.expl = function () { return fix(typeof e === 'function' ? e() : e); }; return q;
      },
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

    /* ---------- تمرین مرحله‌ای با مجموعهٔ ثابت سؤال (چندگزینه‌ای یا ورودی نوشتاری) ----------
       cfg: { names:[نام مرحله‌ها], per:تعداد سؤال هر مرحله (پیش‌فرض ۲), make(si)→سؤال, after(host) }
       سؤال: { ask, cq?, fig? (رشته یا تابعِ (پاسخ‌داده‌شده)→رشته), expl:function|string, cont:'mc m2', optCls:'btn opt',
               opts:[{h,ok,m}]  ← چندگزینه‌ای
               input:{ html(), wire(root,submit,noFocus), raw(root)→ورودی خام, read(root)→u|null, bad:'پیام ورودی نامعتبر', judge(u)→{ok,m,retry}, fill(root,raw,locked), correct:'جملهٔ جواب درست' } ← ورودی }
       قبلی/بعدی و مرور دارد؛ قفل «تعداد پاسخ درست» ندارد و هر سؤال یک بار ثبت می‌شود. */
    H.stages = function (host, cfg) {
      var per = cfg.per || 2, qs, ans, i, touched = false, note = '';
      function start() {
        qs = []; ans = []; i = 0; note = '';
        cfg.names.forEach(function (nm, si) { for (var k = 0; k < per; k++) { qs.push({ si: si, k: k, q: cfg.make(si) }); } });
      }
      function good(j) { var q = qs[j].q, a = ans[j]; return q.input ? !!a.ok : !!q.opts[a].ok; }
      function stageState(si) {
        var all = true, ok = true;
        qs.forEach(function (x, j) { if (x.si === si) { if (ans[j] === undefined) { all = false; } else if (!good(j)) { ok = false; } } });
        return all ? (ok ? 'dn' : 'wr') : '';
      }
      function submit() {
        var q = qs[i].q, u, r, raw;
        if (ans[i] !== undefined || !q.input) { return; }
        raw = q.input.raw(host); u = q.input.read(host);
        if (u === null) { note = fb(false, q.input.bad || 'جواب را کامل و درست بنویس.'); paint(true, raw); return; }
        r = q.input.judge(u);
        if (r.retry) { note = fb(false, r.m); paint(true, raw); return; }
        note = ''; ans[i] = { raw: raw, ok: !!r.ok, m: r.m || '' }; paint();
      }
      function paint(keep, kept) {
        var n = qs.length, it = qs[i], q, a, h, oh = '', s, o, pending;
        if (i === n) {
          s = qs.filter(function (x, j) { return good(j); }).length;
          host.innerHTML = rr0(K0.res(s, n) + '<div class="opts end-actions"><button type="button" class="btn" data-pv="1" data-scroll>مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1" data-scroll>سؤال‌های جدید</button></div>');
          return;
        }
        q = it.q; a = ans[i]; pending = a === undefined;
        h = '<div class="stg">' + cfg.names.map(function (nm, si) { var st = si === it.si ? 'cu' : stageState(si); return '<span class="' + st + '">' + (st === 'dn' ? '✓ ' : '') + nm + '</span>'; }).join('') + '</div>';
        h += '<p class="stage-progress-meta">مرحلهٔ ' + fa(it.si + 1) + ' — سؤال ' + fa(it.k + 1) + ' از ' + fa(per) + '</p><p class="ask">' + q.ask + '</p>' + (q.cq ? '<div class="cq">' + q.cq + '</div>' : '') + (typeof q.fig === 'function' ? q.fig(!pending) : (q.fig || ''));
        if (q.input) { h += q.input.html(); }
        else {
          h += '<div class="' + (q.cont || 'mc m2') + '" id="stx"></div>';
          q.opts.forEach(function (op, k) { oh += '<button type="button" class="' + (q.optCls || 'btn opt') + (!pending ? (op.ok ? ' right' : k === a ? ' wrong' : '') : '') + '" data-o="' + k + '"' + (!pending ? ' disabled' : '') + '>' + op.h + '</button>'; });
        }
        if (!pending) {
          if (q.input) { h += '<div class="fb ' + (a.ok ? 'ok' : 'bad') + '">' + (a.ok ? '✓ درست است!' : ((a.m ? a.m + ' ' : '') + (q.input.correct || ''))) + '</div>'; }
          else { o = q.opts[a]; h += '<div class="fb ' + (o.ok ? 'ok' : 'bad') + '">' + (o.ok ? '✓ درست است!' : (o.m || 'این گزینه درست نیست.')) + '</div>'; }
          h += '<div class="ex">' + (typeof q.expl === 'function' ? q.expl() : q.expl) + '</div>';
        } else if (note) { h += note; }
        h += '<div class="opts"><button type="button" class="btn" data-p="1"' + (i ? '' : ' disabled') + ' data-scroll>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (pending && !q.input ? ' disabled' : '') + (pending ? '' : ' data-scroll') + '>' + (pending && q.input ? 'بررسی' : (i === n - 1 ? 'مشاهدهٔ نتیجه' : 'سؤال بعدی')) + '</button></div>';
        host.innerHTML = rr0(h);
        if (!q.input) { host.querySelector('#stx').innerHTML = rr0(oh); }
        else if (!pending) { q.input.fill(host, a.raw, true); }
        else { q.input.wire(host, submit, !touched); if (keep && kept) { q.input.fill(host, kept, false); } }
        if (cfg.after) { cfg.after(host); }
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'), q; if (!b || b.disabled) { return; } touched = true;
        q = qs[i] && qs[i].q;
        if (b.dataset.o !== undefined) { if (ans[i] === undefined) { ans[i] = +b.dataset.o; paint(); } }
        else if (b.dataset.nx) { if (q && q.input && ans[i] === undefined) { submit(); } else { note = ''; i++; paint(); } }
        else if (b.dataset.p) { note = ''; i--; paint(); }
        else if (b.dataset.pv) { note = ''; i = 0; paint(); } else if (b.dataset.r) { start(); paint(); }
      });
      start(); paint();
    };

    /* ---------- نمودار ون: دو مجموعه در مجموعهٔ مرجع. نواحی: o بیرون، a فقط A، ab اشتراک، b فقط B ----------
       o: {A, B, U, fill:{o,a,ab,b}, reg:true (ناحیه‌ها کلیک‌پذیر), tok:function(x,region)->{bg,fg}, names:['A','B']} */
    /* ---------- آزمون پایانی: سؤال‌های چندگزینه‌ایِ تصادفی، با قبلی/بعدی و مرور ----------
       gens: آرایه‌ای از تابع‌ها؛ هر تابع یک سؤال می‌دهد: {ask, fig?, cq?, cls?, raw?, opts:[{h,ok,m}], expl()}
       raw: اگر true باشد گزینه‌ها آمادهٔ نمایش‌اند و از rr0 رد نمی‌شوند (مثلاً کسرهای ساخته‌شده با fh)
       after (اختیاری): تابعی که پس از رسم هر سؤال با host صدا زده می‌شود (مثلاً برای تنظیم اندازهٔ شکل‌ها) */
    H.final = function (host, gens, after) {
      var qs, i, ans;
      function build() { qs = gens.map(function (g) { return g(); }); i = 0; ans = []; }
      function paint() {
        var q = qs[i], a = ans[i], h, oh = '', s, o, N = qs.length;
        if (i === N) {
          s = ans.filter(function (x, k) { return qs[k].opts[x].ok; }).length;
          host.innerHTML = rr0(K0.res(s, N) + '<div class="opts end-actions"><button type="button" class="btn" data-pv="1" data-scroll>مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1" data-scroll>سؤال‌های جدید</button></div>'); return;
        }
        h = '<div class="stg">' + qs.map(function (x, k) { return '<span class="' + (ans[k] !== undefined ? (qs[k].opts[ans[k]].ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">' + q.ask + '</p>' + (q.fig || '') + (q.cq ? '<div class="cq">' + q.cq + '</div>' : '') + '<div class="mc ' + (q.cls || 'm2') + '" id="mcx"></div>';
        q.opts.forEach(function (op, k) { oh += '<button type="button" class="btn opt' + (a !== undefined ? (op.ok ? ' right' : k === a ? ' wrong' : '') : '') + '" data-o="' + k + '"' + (a !== undefined ? ' disabled' : '') + '>' + op.h + '</button>'; });
        if (a !== undefined) { o = q.opts[a]; h += fb(o.ok, o.ok ? '✓ درست است!' : (o.m || 'این گزینه درست نیست.')) + '<div class="ex">' + q.expl() + '</div>'; }
        h += '<div class="opts"><button type="button" class="btn" data-p="1"' + (i ? '' : ' disabled') + ' data-scroll>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (a === undefined ? ' disabled' : '') + ' data-scroll>' + (i === N - 1 ? 'مشاهدهٔ نتیجه' : 'سؤال بعدی') + '</button></div>';
        host.innerHTML = rr0(h); host.querySelector('#mcx').innerHTML = q.raw ? oh : rr0(oh);
        if (after) { after(host); }
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b || b.disabled) { return; }
        if (b.dataset.o !== undefined) { if (ans[i] !== undefined) { return; } ans[i] = +b.dataset.o; paint(); } else if (b.dataset.nx) { i++; paint(); } else if (b.dataset.p) { i--; paint(); } else if (b.dataset.pv) { i = 0; paint(); } else if (b.dataset.r) { build(); paint(); }
      }); build(); paint();
    };
    /* ---------- درست یا نادرست؟ شش جمله از مجموعهٔ سؤال‌ها ----------
       pool: [{h(html), ok(1/0), e(html), fig?}]؛ after مثل H.final اختیاری است */
    H.tf = function (host, pool, after) {
      var L, i, answers;
      function nw() { L = shuffle(pool.slice()).slice(0, 6); i = 0; answers = L.map(function () { return null; }); }
      function paint() {
        var h, q, ans = answers[i], sc;
        if (i >= L.length) {
          sc = answers.filter(function (x, k) { return x === L[k].ok; }).length;
          host.innerHTML = rr0(K0.res(sc, L.length) + '<div class="opts end-actions"><button type="button" class="btn" data-pv="1" data-scroll>مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1" data-scroll>سؤال‌های جدید</button></div>'); return;
        }
        q = L[i];
        h = '<div class="stg">' + L.map(function (x, k) { return '<span class="' + (answers[k] !== null ? (answers[k] === x.ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">این جمله درست است؟</p>' + (q.fig || '') + '<div class="cq" style="font-size:1rem"><span class="snt">' + q.h + '</span></div><div class="sgnrow"><button type="button" class="btn' + (ans === null ? '' : q.ok === 1 ? ' right' : ans === 1 ? ' wrong' : '') + '" data-a="1"' + (ans === null ? '' : ' disabled') + '>درست</button><button type="button" class="btn' + (ans === null ? '' : q.ok === 0 ? ' right' : ans === 0 ? ' wrong' : '') + '" data-a="0"' + (ans === null ? '' : ' disabled') + '>نادرست</button></div>';
        if (ans !== null) { h += '<div class="fb ' + (ans === q.ok ? 'ok' : 'bad') + '">' + (ans === q.ok ? '✓ درست است!' : 'پاسخ نادرست است.') + '</div><div class="ex">' + q.e + '</div>'; }
        h += '<div class="opts"><button type="button" class="btn" data-p="1"' + (i === 0 ? ' disabled' : '') + ' data-scroll>سؤال قبلی</button><button type="button" class="btn primary" data-nx="1"' + (ans === null ? ' disabled' : '') + ' data-scroll>' + (i === L.length - 1 ? 'مشاهدهٔ نتیجه' : 'سؤال بعدی') + '</button></div>';
        host.innerHTML = rr0(h);
        if (after) { after(host); }
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b || b.disabled) { return; }
        if (b.dataset.a !== undefined) { if (answers[i] !== null) { return; } answers[i] = +b.dataset.a; paint(); }
        else if (b.dataset.nx) { i++; paint(); }
        else if (b.dataset.p) { i = Math.max(0, i - 1); paint(); }
        else if (b.dataset.pv) { i = 0; paint(); }
        else if (b.dataset.r) { nw(); paint(); }
      }); nw(); paint();
    };
    H.venn = function (o) {
      var id = 'vc' + (++vid), A = o.A, B = o.B, U = o.U, F = o.fill || {}, nm = o.names || ['A', 'B'], reg = o.reg ? ' class="vr" ' : ' ';
      var ri = o.big ? 17 : 14, sp = o.big ? 36 : 30, fs = o.big ? 19 : 16, CY = 112, RR = 80;
      var cen = { a: [132, CY], ab: [210, CY], b: [288, CY] }, groups = { o: [], a: [], ab: [], b: [] }, i, out = '';
      U.forEach(function (x) { var ia = A.indexOf(x) >= 0, ib = B.indexOf(x) >= 0; groups[ia && ib ? 'ab' : ia ? 'a' : ib ? 'b' : 'o'].push(x); });
      if (o.big && (groups.a.length > 3 || groups.b.length > 3 || groups.ab.length > 3)) { ri = 14; sp = 30; fs = 16; }
      var corners = [[34, 34], [34 + sp, 34], [34, 34 + sp], [34 + sp, 34 + sp], [386, 60], [386 - sp, 60], [386, 60 + sp], [386 - sp, 60 + sp], [34, 190], [34 + sp, 190], [34 + 2 * sp, 190], [386, 190], [386 - sp, 190], [386 - 2 * sp, 190]];
      var fillOf = function (r) { return F[r] || '#fff'; };
      var s = '<svg class="lk-vn" viewBox="0 0 420 224" role="img" aria-label="نمودار ون"><defs><clipPath id="' + id + '"><circle cx="168" cy="' + CY + '" r="' + RR + '"/></clipPath></defs>';
      s += '<rect' + reg + 'data-reg="o" x="6" y="6" width="408" height="212" rx="14" style="fill:' + fillOf('o') + ';stroke:currentColor" stroke-width="2"/>';
      s += '<circle' + reg + 'data-reg="a" cx="168" cy="' + CY + '" r="' + RR + '" style="fill:' + fillOf('a') + '"/><circle' + reg + 'data-reg="b" cx="252" cy="' + CY + '" r="' + RR + '" style="fill:' + fillOf('b') + '"/>';
      s += '<g clip-path="url(#' + id + ')"><circle' + reg + 'data-reg="ab" cx="252" cy="' + CY + '" r="' + RR + '" style="fill:' + fillOf('ab') + '"/></g>';
      s += '<circle cx="168" cy="' + CY + '" r="' + RR + '" fill="none" style="stroke:blue" stroke-width="3"/><circle cx="252" cy="' + CY + '" r="' + RR + '" fill="none" style="stroke:green" stroke-width="3"/>';
      s += '<text x="112" y="38" font-size="20" font-weight="700" style="fill:blue" text-anchor="middle">' + nm[0] + '</text><text x="308" y="38" font-size="20" font-weight="700" style="fill:green" text-anchor="middle">' + nm[1] + '</text><text x="398" y="24" font-size="16" font-weight="700" text-anchor="end" fill="currentColor">U</text>';
      ['a', 'ab', 'b', 'o'].forEach(function (r) {
        var g = groups[r], n = g.length, cols = r === 'o' ? 1 : (r === 'ab' && n <= 4 ? 1 : 2), rows = Math.ceil(n / cols), k;
        g.forEach(function (x, idx) {
          var px, py, t = o.tok ? o.tok(x, r) : null, bg = t && t.bg || '#fff', fg = t && t.fg || 'currentColor';
          if (r === 'o') { var c = corners[idx % corners.length]; px = c[0]; py = c[1]; }
          else { var col = idx % cols, row = Math.floor(idx / cols); px = cen[r][0] + (col - (cols - 1) / 2) * sp; py = cen[r][1] + (row - (rows - 1) / 2) * sp; }
          s += '<g pointer-events="none"><circle cx="' + px + '" cy="' + py + '" r="' + ri + '" style="fill:' + bg + ';stroke:currentColor" stroke-width="1.5"/><text x="' + px + '" y="' + (py + fs * 0.34) + '" text-anchor="middle" font-size="' + fs + '" font-weight="700" style="fill:' + fg + '">' + (typeof x === 'number' ? fa(x) : x) + '</text></g>';
        });
      });
      return s + '</svg>';
    };
    return H;
  };
})();
