/* درس S03 — الگوهای عددی ساده و رابطهٔ شمارهٔ جمله با مقدار
   تمام تمرین‌ها اعداد تصادفی می‌سازند و پاسخ را با محاسبهٔ دقیق (کسری) می‌سنجند. */
window.LESSONS = window.LESSONS || {};
window.LESSONS.S03 = {
  needs: ['utils', 'inputs', 'exsteps', 'kit'],
  /* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
  setup: function (K0) {
    var K = Object.create(K0), H = K0.lk(K);
    var fa = H.fa, R = H.R, shuffle = H.shuffle, fb = H.fb, T = H.T, M = H.M, AL = H.AL, rr = H.rr, fix = H.fix, pick = H.pick, simp = H.simp, rt = H.rt, pval = H.pval;

    /* ---------- محاسبهٔ دقیق ---------- */
    var Z = function (n) { return { n: n, d: 1 }; };
    var radd = function (a, b) { return simp(a.n * b.d + b.n * a.d, a.d * b.d); };
    var rmul = function (a, b) { return simp(a.n * b.n, a.d * b.d); };
    var req = function (a, b) { return a.n === b.n && a.d === b.d; };
    var rneg = function (a) { return { n: -a.n, d: a.d }; };
    function genSeq() {                                                            /* t_n = d·n + c  (جملهٔ اول a1) */
      var d = pick([Z(2), Z(3), Z(4), Z(5), Z(6), Z(1), Z(-1), Z(-2), Z(-3), Z(-4), Z(-5), simp(1, 2), simp(3, 2), simp(-1, 2)]), a1 = d.d === 1 ? Z(R(-4, 12)) : simp(R(-6, 14), 2);
      return { d: d, a1: a1, c: radd(a1, rneg(d)) };
    }
    var term = function (s, n) { return radd(s.a1, rmul(Z(n - 1), s.d)); };
    function fm(d, c) {                                                            /* d·n + c به‌صورت TeX */
      var ds = d.n === d.d ? 'n' : (d.n === -d.d ? '-n' : rt(d) + 'n'); if (d.n === d.d) { ds = 'n'; }
      var cs = c.n === 0 ? '' : (c.n > 0 ? '+' + rt(c) : rt(c));
      return ds + cs;
    }
    var seqTex = function (s, k, hole) { var a = [], i; for (i = 1; i <= k; i++) { a.push(i === hole ? '\\square' : rt(term(s, i))); } return a.join(',\\;') + ',\\;\\ldots'; };

    /* ============ ۱) قطارِ الگو: واگن‌های خالی را پر کن و قاعده را بگو ============ */
    K.train = function (host) {
      var s, blanks, solved;
      function newQ() { s = genSeq(); var pos = [3, 4, 5, 6, 7], b = H.sample(pos, 3); if (b.indexOf(7) < 0 && b.every(function (x) { return x < 6; })) { b[0] = 7; } blanks = b; solved = false; paint(''); }
      function paint(msg) {
        var h = '<p class="ask">هفت واگنِ قطار یک الگو را نشان می‌دهند. واگن‌های خالی را پر کن و بگو هر جمله نسبت به جملهٔ قبل چقدر عوض می‌شود:</p><div class="s3-train">', i;
        for (i = 1; i <= 7; i++) {
          if (i > 1) { h += '<span class="s3-cn">' + (solved ? M('{\\color{crimson}' + (s.d.n >= 0 ? '+' : '') + rt(s.d) + '}') : '→') + '</span>'; }
          h += blanks.indexOf(i) >= 0 && !solved ? '<div class="s3-wg q"><input class="numin lk-in" data-i="' + i + '" type="text" dir="ltr" autocomplete="off" placeholder="؟"><span class="s3-mk" data-i="' + i + '"></span></div>' : '<div class="s3-wg">' + M(rt(term(s, i))) + '</div>';
        }
        h += '</div>';
        if (!solved) { h += '<div class="lk-line"><span>تغییرِ هر جمله:</span><input class="numin lk-in" data-r="1" type="text" dir="ltr" autocomplete="off" placeholder="مثلاً ۳- یا ۱/۲"><span class="s3-mk" data-r="1"></span></div>'; }
        h += '<div class="lk-cap">' + (msg || '') + '</div>' + (solved ? fb(true, 'قطار کامل شد! ✓') + K.dm('t_{n+1}-t_{n}=' + rt(s.d)) : '');
        h += '<div class="opts">' + (solved ? '' : '<button type="button" class="btn" data-ck="1">بررسی</button>') + '<button type="button" class="btn primary" data-nx="1" data-scroll>' + (solved ? 'قطار بعدی' : 'قطار دیگر') + '</button></div>';
        host.innerHTML = rr(h);
        host.querySelectorAll('.lk-in').forEach(function (inp) { inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { check(); } }); });
      }
      function check() {
        var all = true, hint = '';
        blanks.forEach(function (i) {
          var inp = host.querySelector('.lk-in[data-i="' + i + '"]'), mk = host.querySelector('.s3-mk[data-i="' + i + '"]'), u = pval(inp.value), good = u && req(u, term(s, i));
          mk.textContent = good ? '✓' : '✗'; mk.style.color = good ? '#1f8a4c' : '#b83232'; if (!good) { all = false; }
        });
        var ri = host.querySelector('.lk-in[data-r="1"]'), rm = host.querySelector('.s3-mk[data-r="1"]'), ru = pval(ri.value), rg = ru && req(ru, s.d);
        rm.textContent = rg ? '✓' : '✗'; rm.style.color = rg ? '#1f8a4c' : '#b83232'; if (!rg) { all = false; hint = ru && req(ru, rneg(s.d)) ? 'علامتِ تغییر را بررسی کن: جمله‌ها بزرگ‌تر می‌شوند یا کوچک‌تر؟' : 'دو جملهٔ پشت‌سرهم را از هم کم کن (جملهٔ بعدی منهای جملهٔ قبلی).'; }
        if (all) { solved = true; paint(''); } else if (hint) { host.querySelector('.lk-cap').innerHTML = '<span class="lk-bad">' + hint + '</span>'; }
      }
      host.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) { return; } if (b.dataset.ck) { check(); } else if (b.dataset.nx) { newQ(); } });
      host.dataset.ready = '1'; newQ();
    };

    /* ============ ۲) کاشی‌کار: از شکل به رابطه ============ */
    function tiles(n, a, b, sz) {                                                  /* b کاشی قرمز (ثابت) + n ستون a تایی آبی */
      var W = (n + (b ? 1 : 0)) * sz, Hh = Math.max(a, b) * sz, s = '<svg viewBox="0 0 ' + W + ' ' + Hh + '" width="' + W + '" height="' + Hh + '" style="direction:ltr">', i, j, x0 = 0;
      if (b) { for (j = 0; j < b; j++) { s += '<rect x="0" y="' + (Hh - (j + 1) * sz) + '" width="' + (sz - 2) + '" height="' + (sz - 2) + '" rx="3" style="fill:crimson"/>'; } x0 = sz; }
      for (i = 0; i < n; i++) { for (j = 0; j < a; j++) { s += '<rect x="' + (x0 + i * sz) + '" y="' + (Hh - (j + 1) * sz) + '" width="' + (sz - 2) + '" height="' + (sz - 2) + '" rx="3" style="fill:blue"/>'; } }
      return s + '</svg>';
    }
    var figs = function (a, b, ns) { return '<div style="display:flex;gap:18px;justify-content:center;align-items:flex-end;flex-wrap:wrap;margin:8px 0">' + ns.map(function (n) { return '<div style="text-align:center">' + tiles(n, a, b, 18) + '<div class="lk-cap">شکل ' + fa(n) + '</div></div>'; }).join('') + '</div>'; };
    K.tileLab = function (host) {
      var a, b, nT, stage, msg, view;
      function newQ() { a = R(2, 4); b = R(1, 3); nT = R(6, 10); stage = 1; msg = ''; view = 3; paint(); }
      function opts() { var c = [[a, b, true], [b, a, false], [a, a + b, false], [a + b, b, false], [a + 1, b, false], [a, b + 1, false]], seen = {}, out = []; c.forEach(function (x) { var k = x[0] + ',' + x[1]; if (!seen[k] && out.length < 4) { seen[k] = 1; out.push(x); } }); return shuffle(out); }
      var shown = null;
      function paint() {
        var h = '<p class="ask">شکل‌های زیر با کاشی ساخته شده‌اند: ستون‌های آبی و یک ستونِ ثابتِ قرمز. با دکمه‌ها شکل‌های بیشتری ببین:</p>' + figs(a, b, [1, 2, 3].concat(view > 3 ? [view] : []));
        h += '<div class="lk-line"><button type="button" class="btn" data-v="0"' + (view <= 3 ? ' disabled' : '') + '>شکل قبلی</button><button type="button" class="btn" data-v="1"' + (view >= 8 ? ' disabled' : '') + '>شکل بعدی</button></div>';
        if (stage === 1) { h += '<p class="ask">شکل ' + fa(nT) + ' چند کاشی دارد؟</p><div class="lk-line"><input class="numin lk-in" data-nosign="1" type="text" dir="ltr" autocomplete="off"  placeholder="؟"></div>'; }
        else if (stage === 2) { shown = shown || opts(); h += fb(true, 'درست است! ✓ شکل ' + fa(nT) + ' دارد ' + fa(a * nT + b) + ' کاشی') + '<p class="ask">کدام رابطه تعداد کاشی‌های شکل ' + M('n') + ' (یعنی ' + M('t_n') + ') را می‌دهد؟</p><div class="mc">' + shown.map(function (o, i) { return '<button type="button" class="btn opt" data-o="' + i + '">' + M('t_n=' + o[0] + 'n+' + o[1]) + '</button>'; }).join('') + '</div>'; }
        else { h += fb(true, 'همین است! ✓') + K.dm('t_n=' + a + '\\times n+' + b + '=' + H.BL(a + 'n') + '+' + H.CR('' + b)) + '<div class="ex"><p>ستون‌های آبی به‌ازای هر شکل ' + fa(a) + ' کاشی اضافه می‌کنند (' + M(H.BL(a + 'n')) + ') و ستونِ قرمز همیشه ' + fa(b) + ' کاشی است.</p></div>'; }
        h += '<div class="lk-cap">' + msg + '</div><div class="opts">' + (stage === 1 ? '<button type="button" class="btn" data-ck="1">بررسی</button>' : '') + '<button type="button" class="btn primary" data-nx="1" data-scroll>' + (stage === 3 ? 'الگوی بعدی' : 'الگوی دیگر') + '</button></div>';
        host.innerHTML = rr(h); host.dataset.a = a; host.dataset.b = b; host.dataset.n = nT;
      }
      host.addEventListener('click', function (e) {
        var x = e.target.closest('button'); if (!x) { return; }
        if (x.dataset.v) { view = Math.max(3, Math.min(8, view + (x.dataset.v === '1' ? 1 : -1))); paint(); }
        else if (x.dataset.ck) { var u = pval(host.querySelector('.lk-in').value); if (u && u.d === 1 && u.n === a * nT + b) { stage = 2; msg = ''; shown = null; } else { msg = '<span class="lk-bad">' + (u && u.n === a * nT ? 'ستون قرمز را فراموش کرده‌ای.' : 'تعدادِ ستون‌های آبیِ شکل ' + fa(nT) + ' را بشمار و کاشی‌های قرمز را هم اضافه کن.') + '</span>'; } paint(); }
        else if (x.dataset.o !== undefined) { var o = shown[+x.dataset.o]; if (o[2]) { stage = 3; msg = ''; } else { msg = '<span class="lk-bad">برای شکل ۱ این رابطه ' + fa(o[0] + o[1]) + ' کاشی می‌دهد، ولی شکل ۱ ' + fa(a + b) + ' کاشی دارد.' + (o[0] + o[1] === a + b ? ' شکل ۲ را هم امتحان کن.' : '') + '</span>'; } paint(); }
        else if (x.dataset.nx) { shown = null; newQ(); }
      });
      newQ();
    };

    /* ============ ۳) ماشین مرموز: چند عدد بده، قاعده را پیدا کن ============ */
    K.machine = function (host) {
      var s, probes, msg, solved, options;
      function mkOptions() {
        var good = [s.d, s.c], ops = [{ d: s.d, c: s.c, ok: true }], seen = {}, cands = [[s.c, s.d], [s.d, s.a1], [rneg(s.d), s.c], [s.d, rneg(s.c)], [radd(s.d, Z(1)), s.c], [s.d, radd(s.c, Z(1))]];
        seen[fm(s.d, s.c)] = 1;
        shuffle(cands).forEach(function (x) { var k = fm(x[0], x[1]); if (ops.length < 4 && !seen[k] && x[0].n !== 0) { seen[k] = 1; ops.push({ d: x[0], c: x[1], ok: false }); } });
        return shuffle(ops);
      }
      function newQ() { s = genSeq(); probes = []; msg = ''; solved = false; options = mkOptions(); paint(); }
      function paint() {
        var h = '<p class="ask">یک ماشین به هر شمارهٔ جمله ' + M('n') + ' مقدار ' + M('t_n') + ' را می‌دهد. حداکثر ۴ عدد به آن بده، بعد قاعدهٔ ماشین را از بین گزینه‌ها پیدا کن:</p>';
        h += '<div class="lk-line"><input class="numin lk-in" data-nosign="1" id="mn" type="text" dir="ltr" autocomplete="off" placeholder="n = ؟"></div>';
        if (probes.length) { h += '<table class="s3-tb"><tr><th>n</th>' + probes.map(function (n) { return '<td>' + fa(n) + '</td>'; }).join('') + '</tr><tr><th>t<sub>n</sub></th>' + probes.map(function (n) { return '<td>' + M(rt(term(s, n))) + '</td>'; }).join('') + '</tr></table>'; }
        if (probes.length >= 2) { h += '<p class="ask">قاعدهٔ ماشین کدام است؟</p><div class="mc">' + options.map(function (o, i) { return '<button type="button" class="btn opt' + (solved && o.ok ? ' right' : '') + '" data-o="' + i + '"' + (solved ? ' disabled' : '') + '>' + M('t_n=' + fm(o.d, o.c)) + '</button>'; }).join('') + '</div>'; }
        h += solved ? fb(true, 'درست است! ✓') + K.dm('t_n=' + fm(s.d, s.c) + '\\;\\Rightarrow\\;t_{10}=' + rt(term(s, 10))) : '<div class="lk-cap">' + msg + '</div>';
        h += '<div class="opts"><button type="button" class="btn" data-pr="1"' + (probes.length >= 4 || solved ? ' disabled' : '') + '>بده به ماشین</button><button type="button" class="btn primary" data-nx="1" data-scroll>' + (solved ? 'ماشین بعدی' : 'ماشین دیگر') + '</button></div>';
        host.innerHTML = rr(h); host.dataset.d = s.d.n + '/' + s.d.d; host.dataset.c = s.c.n + '/' + s.c.d;
        var mn = host.querySelector('#mn'); if (mn) { mn.addEventListener('keydown', function (e) { if (e.key === 'Enter') { probe(); } }); }
      }
      function probe() {
        var u = pval(host.querySelector('#mn').value);
        if (!u || u.d !== 1 || u.n < 1 || u.n > 40) { msg = '<span class="lk-bad">یک عدد صحیح بین ۱ و ۴۰ بنویس.</span>'; paint(); return; }
        if (probes.indexOf(u.n) >= 0) { msg = '<span class="lk-bad">این عدد را قبلاً دادی؛ عددِ تازه‌ای امتحان کن.</span>'; paint(); return; }
        probes.push(u.n); msg = ''; paint();
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b || b.disabled) { return; }
        if (b.dataset.pr) { probe(); } else if (b.dataset.nx) { newQ(); }
        else if (b.dataset.o !== undefined) {
          var o = options[+b.dataset.o];
          if (o.ok) { solved = true; msg = ''; } else {
            var bad = probes.filter(function (n) { return !req(radd(rmul(o.d, Z(n)), o.c), term(s, n)); })[0];
            msg = '<span class="lk-bad">' + (bad ? 'برای ' + M('n=' + bad) + ' این رابطه ' + M(rt(radd(rmul(o.d, Z(bad)), o.c))) + ' می‌دهد، ولی ماشین ' + M(rt(term(s, bad))) + ' داد.' : 'با عددهایی که دادی هنوز نمی‌شود این گزینه را رد کرد؛ یک عددِ دیگر امتحان کن.') + '</span>';
          }
          paint();
        }
      });
      host.dataset.ready = '1'; newQ();
    };

    /* ============ آزمونک پایانی (۵ سؤال تصادفی) ============ */
    K.finalS03 = function (host) {
      var key = function (r) { return r.n + '/' + r.d; };
      function rvOpts(correct, cands) {                                            /* گزینه‌های متمایز */
        var out = [{ h: M(rt(correct)), ok: true }], seen = {}; seen[key(correct)] = 1;
        cands.concat([[radd(correct, Z(1)), ''], [radd(correct, Z(-1)), ''], [radd(correct, Z(2)), ''], [radd(correct, Z(-2)), '']]).forEach(function (c) { if (out.length < 4 && !seen[key(c[0])]) { seen[key(c[0])] = 1; out.push({ h: M(rt(c[0])), m: c[1] || 'محاسبه‌ات را دوباره بررسی کن.' }); } });
        return out;
      }
      function qNext() {
        var s = genSeq(), a4 = term(s, 4), c = [[a4, 'جملهٔ آخر را تکرار کرده‌ای؛ باید اختلافِ ثابت را به آن اضافه کنی.'], [radd(a4, radd(s.d, Z(1))), 'اختلافِ دو جملهٔ پشت‌سرهم را دوباره حساب کن.'], [radd(a4, radd(s.d, Z(-1))), 'اختلافِ دو جملهٔ پشت‌سرهم را دوباره حساب کن.'], [radd(a4, rmul(Z(2), s.d)), 'فقط یک بار اختلاف را اضافه کن، نه دو بار.']];
        return { ask: 'جملهٔ بعدی این الگو چیست؟', fig: K.dm(seqTex(s, 4)), expl: function () { return '<p>' + M('t_2-t_1=' + rt(radd(term(s, 2), rneg(term(s, 1)))) + '\\Rightarrow t_5=' + rt(radd(a4, s.d))) + '</p>'; }, opts: rvOpts(term(s, 5), c) };
      }
      function qTenth() {
        var s = genSeq(), t10 = term(s, 10), c = [[radd(s.a1, rmul(Z(10), s.d)), 'از جملهٔ اول تا جملهٔ دهم ۹ قدم داریم، نه ۱۰ قدم.'], [rmul(Z(10), s.d), 'فقط اختلاف را در ۱۰ ضرب کرده‌ای؛ جملهٔ اول را هم باید در نظر بگیری.'], [radd(t10, rneg(s.d)), 'این جملهٔ نهم است.']];
        return { ask: 'جملهٔ دهم این الگو (' + M('t_{10}') + ') چند است؟', fig: K.dm(seqTex(s, 4)), expl: function () { return '<p>' + M('t_n=' + fm(s.d, s.c) + '\\Rightarrow t_{10}=' + rt(t10)) + '</p>'; }, opts: rvOpts(t10, c) };
      }
      function qFormula() {
        var s = genSeq(), good = fm(s.d, s.c), ops = [{ h: M('t_n=' + good), ok: true }], seen = {}, cands = [[s.d, s.a1], [s.c, s.d], [rneg(s.d), s.c], [s.d, rneg(s.c)], [radd(s.d, Z(1)), s.c]];
        seen[good] = 1;
        shuffle(cands).forEach(function (x) {
          var k = fm(x[0], x[1]); if (ops.length >= 4 || seen[k] || x[0].n === 0) { return; } seen[k] = 1;
          var bad = [1, 2, 3, 4].filter(function (n) { return !req(radd(rmul(x[0], Z(n)), x[1]), term(s, n)); })[0];
          ops.push({ h: M('t_n=' + k), m: bad ? 'برای ' + M('n=' + bad) + ' این رابطه ' + M(rt(radd(rmul(x[0], Z(bad)), x[1]))) + ' می‌دهد، ولی ' + M('t_{' + bad + '}=' + rt(term(s, bad))) + ' است.' : 'این رابطه درست نیست.' });
        });
        return { ask: 'کدام رابطه، جملهٔ ' + M('n') + 'ام این دنباله را می‌دهد؟', fig: K.dm(seqTex(s, 4)), expl: function () { return '<p>' + M('t_n=' + good + ':\\quad t_1=' + rt(term(s, 1)) + ',\\;t_2=' + rt(term(s, 2))) + '</p>'; }, opts: ops };
      }
      function qMissing() {
        var s = genSeq(), k = R(2, 4), t = term(s, k), c = [[radd(t, s.d), 'این جملهٔ بعدی است.'], [radd(t, rneg(s.d)), 'این جملهٔ قبلی است.'], [radd(t, rmul(Z(2), s.d)), 'اختلافِ ثابت را دوباره حساب کن.']];
        return { ask: 'عددِ جاافتاده کدام است؟', fig: K.dm(seqTex(s, 5, k)), expl: function () { return '<p>' + M('d=' + rt(s.d) + '\\Rightarrow t_{' + k + '}=' + rt(t)) + '</p>'; }, opts: rvOpts(t, c) };
      }
      function qWhich() {
        var s = genSeq(), good = fm(s.d, s.c), ops = [{ h: M(seqTex(s, 4).replace(/,\\;\\ldots$/, '')), ok: true }], seen = {}, cands = [[s.d, s.a1], [s.c, s.d], [rneg(s.d), s.c], [s.d, rneg(s.c)]];
        seen[ops[0].h] = 1;
        shuffle(cands).forEach(function (x) {
          if (ops.length >= 4 || x[0].n === 0) { return; } var t = { d: x[0], a1: radd(x[0], x[1]), c: x[1] }, tx = M(seqTex(t, 4).replace(/,\\;\\ldots$/, '')); if (seen[tx]) { return; } seen[tx] = 1;
          ops.push({ h: tx, m: 'برای ' + M('n=1') + ' باید ' + M(rt(term(s, 1))) + ' بشود، ولی این دنباله ' + M(rt(t.a1)) + ' دارد.' });
        });
        return { ask: 'کدام دنباله با رابطهٔ ' + M('t_n=' + good) + ' ساخته می‌شود؟', expl: function () { return '<p>' + M('t_1=' + rt(term(s, 1)) + ',\\;t_2=' + rt(term(s, 2)) + ',\\;t_3=' + rt(term(s, 3))) + '</p>'; }, opts: ops };
      }
      H.final(host, [qNext, qTenth, qFormula, qMissing, qWhich].map(function (f) {
        return function () { var q, tries = 0; do { q = f(); } while (q.opts.length < 4 && tries++ < 40); q.opts = shuffle(q.opts); return q; };
      }));
    };

    /* ---------- مثال‌های حل‌شدهٔ بخش ۴ (مؤلفهٔ مشترک K.exampleSteps) ---------- */
    var EX = [
      { title: 'مثال اول: الگوی افزایشی', q: 'در ' + M('5,8,11,14,\\ldots') + ' اختلاف ثابت ' + M('d=3') + ' است. رابطهٔ ' + M('t_n') + '، جملهٔ دهم و جملهٔ صدم را پیدا کن.', lines: ['@جملهٔ اول را در ' + M('t_n=3n+c') + ' می‌گذاریم:', T`t_1=3\times1+c=5`, '@پس ' + M('c') + ' و رابطهٔ جمله این است:', T`c=5-3=2`, T`t_n=3n+2`, '@شمارهٔ جمله (قرمز) را به‌جای ' + M('n') + ' می‌گذاریم:', T`t_{10}=3\times${H.CR('10')}+2=32`, T`t_{100}=3\times${H.CR('100')}+2=302`], note: 'برای جمله‌های دور لازم نیست الگو را ادامه بدهیم؛ همین رابطه کافی است.' },
      { title: 'مثال دوم: الگوی کاهشی', q: 'برای ' + M('20,17,14,\\ldots') + ' اختلاف ' + M('d=-3') + ' و ' + M('t_1=20') + ' است.', lines: ['@جملهٔ اول را در ' + M('t_n=-3n+c') + ' می‌گذاریم:', T`t_1=-3\times1+c=20`, '@پس ' + M('c') + ' و رابطهٔ جمله این است:', T`c=20+3=23`, T`t_n=-3n+23`], note: 'اختلاف منفی یعنی جمله‌ها کم می‌شوند؛ روش پیدا کردن ' + M('c') + ' همان است.' },
      { title: 'مثال سوم: بدون اختلاف ثابت', q: 'در ' + M('1,4,9,16,\\ldots') + ' جملهٔ ' + M('n') + 'ام را پیدا کن.', lines: ['@اختلاف‌ها یکسان نیستند:', T`4-1=3,\;\;9-4=5`, T`16-9=7`, '@پس باید به خودِ عددها نگاه کنیم:', T`1=1\times1,\;\;4=2\times2`, T`9=3\times3,\;\;16=4\times4`, '@هر جمله شمارهٔ خودش ضرب در خودش است:', T`t_n=n\times n`, T`t_{10}=10\times10=100`], note: 'چون اختلاف ثابت نیست، رابطه از شکل ' + M('dn+c') + ' نیست؛ باید قاعدهٔ دیگری بجوییم.' }
    ];

    return {
      html: function () {
        var host = H.host, BL = H.BL, CR = H.CR, ar = function (d) { return '\\xrightarrow{' + CR((d.n >= 0 ? '+' : '') + rt(d)) + '}'; };
        return fix([
          K.sn('۱', 'الگوی عددی: دنباله‌ای با قاعده'),
          '<p>به این عددها نگاه کن:</p>', K.dm(T`3,\;5,\;7,\;9,\;\ldots`),
          '<p>هر عدد در این ردیف یک «جمله» است و جایگاهش «شمارهٔ جمله» نام دارد. جملهٔ اول ۳ است، جملهٔ دوم ۵ و جملهٔ سوم ۷. جملهٔ ' + M('n') + 'ام را با ' + M('t_n') + ' نشان می‌دهیم:</p>',
          K.tbl(['شمارهٔ جمله', '۱', '۲', '۳', '۴'], [['مقدار جمله', M('t_1=3'), M('t_2=5'), M('t_3=7'), M('t_4=9')]]),
          '<p>این ردیف یک «الگو» دارد: هر جمله ۲ تا بیشتر از جملهٔ قبلی است. با پیدا کردنِ این قاعده می‌توانیم الگو را ادامه بدهیم.</p>',

          K.sn('۲', 'قاعدهٔ تغییر'),
          '<p>یکی از ساده‌ترین قاعده‌ها این است که هر جمله از جملهٔ قبلی‌اش به اندازهٔ یک عدد ثابت تغییر کند. برای بررسی این حالت، هر جمله را با جملهٔ قبلی‌اش مقایسه می‌کنیم. تغییرِ هر قدم را قرمز نوشته‌ایم:</p>', K.dm('3' + ar(Z(2)) + '5' + ar(Z(2)) + '7' + ar(Z(2)) + '9'),
          '<p>اگر تغییرِ همهٔ قدم‌ها یکسان باشد، آن را «اختلافِ ثابت» (قدرنسبت) می‌نامیم و با ' + M('d') + ' نشان می‌دهیم. گاهی الگو کوچک می‌شود و گاهی تغییر کسری است (کسرها را از درس‌های قبل می‌شناسی):</p>',
          AL(['20' + ar(Z(-3)) + '17' + ar(Z(-3)) + '14' + ar(Z(-3)) + '11', '\\frac{1}{2}' + ar(simp(1, 2)) + '1' + ar(simp(1, 2)) + '\\frac{3}{2}' + ar(simp(1, 2)) + '2']),
          K.box('note', 'روش پیدا کردن اختلاف', T`<p>جملهٔ بعدی را منهای جملهٔ قبلی کن: $d=t_{2}-t_{1}$. اگر برای همهٔ جمله‌ها یکسان شد، الگو «اختلاف ثابت» دارد. اگر یکسان نشد، قاعدهٔ الگو چیز دیگری است (نمونه‌اش را در بخش ۴ می‌بینی).</p>`),
          K.box('err', '⚠ اشتباه رایج', T`<p>الگو را از دو جمله حدس نزن! عددهای $2,4,\ldots$ می‌توانند ادامه‌شان $6,8$ (جمع‌کردنِ ۲) باشند یا $8,16$ (ضرب‌کردن در ۲). همهٔ جمله‌های داده‌شده را کنترل کن.</p>`),
          '<h4>قطارِ الگو</h4><p>واگن‌های خالی را پر کن و تغییرِ هر قدم را بگو:</p>', host('s3a'),

          K.sn('۳', 'الگوهای شکلی'),
          '<p>گاهی الگو را با شکل می‌بینیم. در شکل‌های زیر، ستون‌های آبی تعدادشان برابر شمارهٔ شکل است و یک ستونِ قرمز همیشه هست:</p>', figs(2, 1, [1, 2, 3]),
          '<p>تعداد کاشی‌ها در این شکل‌ها ۳، ۵ و ۷ است؛ یعنی همان الگوی بخش ۱. هر شکل ۲ کاشیِ آبیِ بیشتر دارد (یک ستون تازه) و کاشی‌های قرمز ثابت می‌مانند.</p>',
          '<h4>کاشی‌کار</h4><p>شکل‌های یک الگو را ببین، شکلِ دوردست را حساب کن و بعد رابطهٔ تعداد کاشی‌ها را پیدا کن:</p>', host('s3b'),

          K.sn('۴', 'رابطهٔ شمارهٔ جمله و مقدار'),
          T`<p>اگر بخواهیم جملهٔ صدم را بدانیم، نمی‌شود همهٔ جمله‌ها را یکی‌یکی نوشت! باید رابطه‌ای بین شمارهٔ جمله ($n$) و مقدار جمله ($t_n$) پیدا کنیم. وقتی اختلاف ثابت $d$ باشد، رابطه شکل $t_n=dn+c$ دارد و عدد $c$ را از جملهٔ اول به دست می‌آوریم: $t_1=d\times1+c$. در سه مثال زیر این روش را می‌بینی؛ مثال آخر نشان می‌دهد که همهٔ الگوها اختلاف ثابت ندارند.</p>`,
          K.exampleSteps.html('s3-ex', EX, 'حل کامل مثال‌ها', 'سه الگو، سه رابطه'),
          '<h4>ماشین مرموز</h4><p>یک ماشین پنهان از قاعدهٔ ' + M('t_n=dn+c') + ' استفاده می‌کند. چند عدد بده و قاعده‌اش را پیدا کن:</p>', host('s3c'),

          K.sn('۵', 'آزمون پایانی'),
          '<p>پنج سؤال با الگوهای تصادفی. هر بار که از اول شروع کنی، سؤال‌ها عوض می‌شوند.</p>', host('s3d'),
          K.box('sum', 'جمع‌بندی', T`<ul><li>اختلافِ ثابت: $d=t_{2}-t_{1}$ (جمله‌ی بعدی منهای قبلی).</li><li>جملهٔ بعدی = جملهٔ قبلی + $d$.</li><li>رابطهٔ جمله: $t_n=dn+c$ و $c=t_1-d$.</li><li>برای جملهٔ دلخواه، شمارهٔ جمله را به‌جای $n$ جایگذاری کن.</li><li>الگوی $n\times n$ اختلافِ ثابت ندارد.</li></ul><p>این رابطه‌ها در فصل‌های بعدی (معادله و تابع) هم به کارت می‌آیند.</p>`)
        ].join(''));
      },
      init: function (panel) { K.train(panel.querySelector('#s3a')); K.tileLab(panel.querySelector('#s3b')); K.machine(panel.querySelector('#s3c')); K.finalS03(panel.querySelector('#s3d')); K.exampleSteps.bind('s3-ex', EX); }
    };
  }
};
