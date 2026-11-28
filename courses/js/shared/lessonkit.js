/* lessonkit.js — ابزارهای مشترک درس‌ها: نمایش ریاضی (fix/rr/M/AL)، دیالوگ i، تشخیص عدد، رنگ‌ها و نمودار ون (venn). استفاده:  var H = K0.lk(K);  (K = ابزارِ محلیِ درس) */
(function () {
  'use strict';
  var K0 = window.CourseKit, ML = window.MathLite, fa = ML.fa, rr0 = ML.renderRich;
  var _u = K0._u, R = _u.R, shuffle = _u.shuffle, fb = K0._i.fb;
  var CSS = [
    '.lk-w{font-size:.95em}.lk-w .btn{min-height:34px;min-width:0;padding:5px 14px;font-size:.88rem}.lk-w .ask{font-size:.95rem}.lk-w .opts{gap:6px}.lk-w .mc .opt{min-height:44px;font-size:1rem}',
    '.wf{direction:rtl;text-align:center;margin:12px 0;font-size:1.12em;line-height:2.2}',
    '.lk-line{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;margin:8px 0}',
    '.lk-chip{padding:2px 12px;border:2px solid var(--ink);border-radius:99px;background:#fff;font:inherit;font-size:.95rem;cursor:pointer}',
    '.lk-chip.sel{background:var(--mark);box-shadow:2px 2px 0 var(--ink)}',
    '.lk-in{width:7.5em;min-height:0;padding:4px 8px;font:inherit;font-size:.95rem}.lk-in::placeholder{text-align:center}',
    '.lk-cap{font-size:.85rem;text-align:center;color:#46505e;margin:4px 0}.lk-bad{color:#9b2c2c}',
    '.lk-card{padding:6px 12px;border:2px solid var(--ink);border-radius:12px;background:#fff;cursor:pointer;font:inherit;min-width:6em}',
    '.lk-card.sel{background:var(--mark);box-shadow:3px 3px 0 var(--ink)}.lk-card.done{background:#d9f2e3;border-color:green;cursor:default}',
    'svg .vr:hover{filter:brightness(.9)}',
    '.lk-dots{display:flex;gap:5px;justify-content:center;direction:ltr;margin:6px 0}.lk-dots i{width:12px;height:12px;border-radius:50%;background:#d6dce4}.lk-dots i.ok{background:green}.lk-dots i.no{background:crimson}.lk-dots i.cu{outline:2px solid var(--ink)}',
    '.lk-numrow{display:flex;gap:10px;align-items:center;justify-content:center;margin:10px 0;direction:ltr}.lk-numrow .numin{width:88px;max-width:105px;min-height:42px}',
    '.lk-mrow{display:flex;gap:10px;align-items:center;justify-content:space-between;margin:8px 0;padding:6px 10px;border:2px solid var(--ink);border-radius:12px;background:#fff}.lk-mrow select{font:inherit;min-height:38px;max-width:55%}.lk-mrow.right{background:#d2f0e9;border-color:var(--accent)}.lk-mrow.wrong{background:#fbd5d5;border-color:#b23a3a}',
    '.mc .opt.sel{background:var(--mark);box-shadow:2px 2px 0 var(--ink)}',
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
        (q.opts || []).forEach(function (o) { o.h = fix(o.h); if (o.m) { o.m = fix(o.m); } });
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
    /* ---------- آزمون پایانی: سؤال‌های تصادفی، با قبلی/بعدی و مرور ----------
       gens: آرایه‌ای از تابع‌ها؛ هر تابع یک سؤال می‌دهد: {ask, fig?, cq?, cls?, raw?, type?, expl() أو why (متن آماده)}
       type پیش‌فرض چندگزینه‌ای است: opts:[{h,ok,m}]
       type:'multi'  چندانتخابی: opts:[{h,ok}] (همهٔ گزینه‌های درست باید انتخاب شوند)
       type:'num'    پاسخ عددی: ans (عدد)، lbl (برچسب TeX، پیش‌فرض x=)، show? / wrongText(a)? برای پیام پاسخ درست
       type:'match'  تطبیقی: left:[html]، گزینه‌ها یا مشترک (right:[html]) یا جدا برای هر ردیف (rows:[{opts:[{t}]}])، key:[شمارهٔ گزینهٔ درست هر ردیف]
       type:'custom' نوع دلخواه (مثلاً انتخاب نقطه روی صفحه): body(a, sel)→html، hit(e)→انتخاب یا null، grade(sel)→{ok,...}، bad(a)→پیام
       raw: اگر true باشد گزینه‌ها آمادهٔ نمایش‌اند و از rr0 رد نمی‌شوند (مثلاً کسرهای ساخته‌شده با fh)
       after (اختیاری): تابعی که پس از رسم هر سؤال با host صدا زده می‌شود (مثلاً برای تنظیم اندازهٔ شکل‌ها) */
    H.final = function (host, gens, after) {
      var qs, i, ans, res, sel;
      function build() { qs = gens.map(function (g) { return g(); }); i = 0; ans = []; res = []; sel = {}; }
      function parseNum(v) { v = (v || '').replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 1776; }).replace(/[٫,،]/g, '.').replace(/[−–—]/g, '-').replace(/\s/g, ''); return /^-?\d+(\.\d+)?$/.test(v) ? +v : null; }
      function ready(q) {
        var c = sel[i] || [];
        if (q.type === 'multi') { return c.length > 0; }
        if (q.type === 'custom') { return !!sel[i]; }
        if (q.type === 'match') { return c.filter(function (v) { return v !== undefined && v !== null; }).length === q.left.length && c.length === q.left.length; }
        var f = host.querySelector('.lk-num'); return !!f && parseNum(f.value) !== null;
      }
      function grade() {
        var q = qs[i], c, f, v;
        if (q.type === 'multi') { c = (sel[i] || []).slice().sort(function (x, y) { return x - y; }); ans[i] = c; res[i] = JSON.stringify(c) === JSON.stringify(q.opts.map(function (op, k) { return op.ok ? k : -1; }).filter(function (k) { return k >= 0; })); }
        else if (q.type === 'num') { f = host.querySelector('.lk-num'); v = parseNum(f.value); if (v === null) { f.focus(); return false; } ans[i] = v; res[i] = Math.abs(v - q.ans) < 1e-9; }
        else if (q.type === 'custom') { ans[i] = q.grade(sel[i]); res[i] = !!ans[i].ok; sel[i] = undefined; }
        else if (q.type === 'match') { c = (sel[i] || []).slice(); ans[i] = c; res[i] = q.key.every(function (kk, r) { return c[r] === kk; }); }
        return true;
      }
      function paint() {
        var q = qs[i], a = ans[i], h, oh = '', s, o, N = qs.length, ty = q ? q.type || 'mc' : 'mc', done = a !== undefined, cur, msg, pre = '';
        if (i === N) {
          s = res.filter(function (x) { return x; }).length;
          host.innerHTML = rr0(K0.res(s, N) + '<div class="opts end-actions"><button type="button" class="btn" data-pv="1" data-scroll>مرور سؤال‌ها</button><button type="button" class="btn primary" data-r="1" data-scroll>سؤال‌های جدید</button></div>'); return;
        }
        h = '<div class="stg">' + qs.map(function (x, k) { return '<span class="' + (res[k] !== undefined ? (res[k] ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">' + q.ask + '</p>' + (q.fig || '') + (q.cq ? '<div class="cq">' + q.cq + '</div>' : '') + (ty === 'mc' || ty === 'multi' ? '<div class="mc ' + (q.cls || 'm2') + '" id="mcx"></div>' : '<div class="lk-body" id="mcx"></div>');
        cur = done ? a : (ty === 'custom' ? sel[i] : (sel[i] || []));
        if (ty === 'mc') { q.opts.forEach(function (op, k) { oh += '<button type="button" class="btn opt' + (done ? (op.ok ? ' right' : k === a ? ' wrong' : '') : '') + '" data-o="' + k + '"' + (done ? ' disabled' : '') + '>' + op.h + '</button>'; }); }
        else if (ty === 'multi') { q.opts.forEach(function (op, k) { var on = cur.indexOf(k) > -1; oh += '<button type="button" class="btn opt' + (done ? (op.ok ? ' right' : on ? ' wrong' : '') : on ? ' sel' : '') + '" data-t="' + k + '"' + (done ? ' disabled' : '') + '>' + op.h + '</button>'; }); }
        else if (ty === 'custom') { oh = q.body(a, cur); }
        else if (ty === 'num') { oh = '<div class="lk-numrow"><span class="lbl">' + H.M(q.lbl || 'x=') + '</span><input class="numin lk-num" type="text" inputmode="decimal" autocomplete="off" aria-label="پاسخ"' + (done ? ' disabled value="' + (a < 0 ? '−' : '') + fa(Math.abs(a)) + '"' : '') + '></div>'; }
        else { oh = q.left.map(function (l, r) { return '<div class="lk-mrow' + (done ? (a[r] === q.key[r] ? ' right' : ' wrong') : '') + '"><span class="l">' + l + '</span><select data-row="' + r + '"' + (done ? ' disabled' : '') + '><option value="">انتخاب کن…</option>' + (q.rows ? q.rows[r].opts.map(function (rt) { return rt.t; }) : q.right).map(function (rt, k) { return '<option value="' + k + '"' + (cur[r] === k ? ' selected' : '') + '>' + rt + '</option>'; }).join('') + '</select></div>'; }).join(''); }
        if (done) {
          if (ty === 'mc') { o = q.opts[a]; msg = o.ok ? '✓ درست است!' : (o.m || 'این گزینه درست نیست.'); }
          else if (ty === 'custom') { msg = res[i] ? '✓ درست است!' : (q.bad ? q.bad(a) : 'این پاسخ درست نیست.'); }
          else { msg = res[i] ? '✓ درست است!' : 'پاسخ درست نیست.'; if (!res[i] && (ty === 'num' || ty === 'match')) { pre = (q.wrongText ? q.wrongText(a) : 'پاسخ درست: ' + (q.show || '') + '.') + ' '; } }
          h += fb(ty === 'mc' ? o.ok : res[i], msg) + '<div class="ex">' + pre + (q.expl ? q.expl() : q.why) + '</div>';
        }
        h += '<div class="opts"><button type="button" class="btn" data-p="1"' + (i ? '' : ' disabled') + ' data-scroll>سؤال قبلی</button><button type="button" class="btn primary" ' + (!done && ty !== 'mc' ? 'data-ck="1"' : 'data-nx="1"') + (!done && (ty === 'mc' || !ready(q)) ? ' disabled' : '') + ' data-scroll>' + (!done && ty !== 'mc' ? 'بررسی' : (i === N - 1 ? 'مشاهدهٔ نتیجه' : 'سؤال بعدی')) + '</button></div>';
        host.innerHTML = rr0(h); host.querySelector('#mcx').innerHTML = q.raw ? oh : rr0(oh);
        if (after) { after(host); }
      }
      host.addEventListener('click', function (e) {
        var b, c, ix, t, hit;
        if (qs[i] && qs[i].type === 'custom' && ans[i] === undefined && qs[i].hit) { hit = qs[i].hit(e); if (hit) { sel[i] = hit; paint(); return; } }
        b = e.target.closest('button'); if (!b || b.disabled) { return; }
        if (b.dataset.o !== undefined) { if (ans[i] !== undefined) { return; } ans[i] = +b.dataset.o; res[i] = !!qs[i].opts[ans[i]].ok; paint(); }
        else if (b.dataset.t !== undefined) { t = +b.dataset.t; c = (sel[i] || []).slice(); ix = c.indexOf(t); if (ix > -1) { c.splice(ix, 1); } else { c.push(t); } sel[i] = c; paint(); }
        else if (b.dataset.ck) { if (grade()) { paint(); } }
        else if (b.dataset.nx) { i++; paint(); } else if (b.dataset.p) { i--; paint(); } else if (b.dataset.pv) { i = 0; paint(); } else if (b.dataset.r) { build(); paint(); }
      });
      host.addEventListener('change', function (e) { var s = e.target.closest('select[data-row]'), c; if (!s) { return; } c = (sel[i] || []).slice(); c[+s.dataset.row] = s.value === '' ? undefined : +s.value; sel[i] = c; paint(); });
      host.addEventListener('input', function (e) { var nb; if (!e.target.classList.contains('lk-num')) { return; } nb = host.querySelector('[data-ck]'); if (nb) { nb.disabled = parseNum(e.target.value) === null; } });
      host.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.classList.contains('lk-num')) { e.preventDefault(); if (ans[i] === undefined) { if (grade()) { paint(); } } } });
      build(); paint();
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
        h = '<div class="stg">' + L.map(function (x, k) { return '<span class="' + (answers[k] !== null ? (answers[k] === x.ok ? 'dn' : 'wr') : k === i ? 'cu' : '') + '">' + fa(k + 1) + '</span>'; }).join('') + '</div><p class="ask">این جمله درست است؟</p>' + (q.fig || '') + '<div class="cq" style="font-size:1rem"><span class="snt">' + q.h + '</span></div><div class="sgnrow tf-row"><button type="button" class="btn' + (ans === null ? '' : q.ok === 1 ? ' right' : ans === 1 ? ' wrong' : '') + '" data-a="1"' + (ans === null ? '' : ' disabled') + '>درست</button><button type="button" class="btn' + (ans === null ? '' : q.ok === 0 ? ' right' : ans === 0 ? ' wrong' : '') + '" data-a="0"' + (ans === null ? '' : ' disabled') + '>نادرست</button></div>';
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
    /* ---------- ابزارهای تکراریِ درس‌ها (قبلاً در هر درس کپی جدا داشتند) ---------- */
    var M0 = _u.M;
    H.f2 = function (n) { return Math.round(n * 100) / 100; };
    H.uniqBy = _u.uniqBy;
    H.fan = function (v) { var s = String(+(+v).toFixed(2)); return fa(s === '-0' ? '0' : s).replace('.', '٫'); };   /* عدد فارسی با ممیز ٫ (حداکثر دو رقم اعشار) */
    H.refs = function (cells) { return '<div class="sg refs">' + cells.map(function (c) { return '<div class="' + c.c + '"><b>' + c.t + '</b><span>' + c.r + '</span>' + K.dm(c.e) + '</div>'; }).join('') + '</div>'; };   /* cells: [{c: کلاس رنگ, t: عنوان, r: توضیح, e: TeX}] */
    H.fig1 = function (inner, cap) { return '<div class="figs one"><figure>' + inner + (cap ? '<figcaption>' + cap + '</figcaption>' : '') + '</figure></div>'; };
    H.gradSlider = function (id, min, max, val, step, ticks, label) {   /* نوار لغزندهٔ بومی با درجه‌بندی KaTeX — ticks: [{v, t}] */
      var tot = max - min, h = '<div class="g-sl graduated-range" style="--gr-total:' + tot + '">' + (label ? '<div class="lab"><span>' + label + '</span></div>' : '') + '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '" aria-label="' + (label || id) + '"><div class="graduated-ticks">';
      ticks.forEach(function (t) { h += '<span style="--gr-step:' + (t.v - min) + '"><i></i>' + (t.t === undefined ? M0(String(t.v)) : t.t) + '</span>'; });
      return h + '</div></div>';
    };
    H.mkO = function (correct, wrongs, raw) {   /* گزینه‌ساز مشترک: correct/wrongs: {t, m} — t: TeX (یا HTML وقتی raw=true) */
      var list = _u.uniqBy([{ t: correct.t, ok: 1, m: '' }].concat(wrongs.map(function (w) { return { t: w.t, ok: 0, m: w.m }; })), function (x) { return x.t; }), w = shuffle(list.slice(1)).slice(0, 3);
      return shuffle([list[0]].concat(w).map(function (z) { return { h: raw ? z.t : M0(z.t), ok: !!z.ok, m: z.m || 'این گزینه درست نیست.' }; }));
    };
    H.venn = window.VennDraw;
    return H;
  };
})();
