/* درس S01 — عضویت، زیرمجموعه و برابری مجموعه‌ها
   تمام تمرین‌ها اعداد تصادفی می‌سازند و پاسخ را با محاسبهٔ دقیق می‌سنجند. */
window.LESSONS = window.LESSONS || {};
window.LESSONS.S01 = {
  needs: ['utils', 'inputs', 'kit'],
  /* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
  setup: function (K0) {
    var K = Object.create(K0), H = K0.lk(K);
    var fa = H.fa, R = H.R, shuffle = H.shuffle, fb = H.fb, T = H.T, M = H.M, AL = H.AL, W = H.W, rr = H.rr, fix = H.fix, pick = H.pick, setTex = H.setTex, sorted = H.sorted, sample = H.sample;
    var POOL = [1, 2, 3, 4, 5, 6, 7, 8, 9], BIG = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    /* ============ ۱) دروازه‌بان باشگاه: عضو است یا نه؟ ============ */
    K.gate = function (host) {
      var FAST = 15, A, q, i, res, picked, F = null;
      function hiTex(a, mk) { return '\\{' + a.map(function (v) { return mk[v] ? '\\textcolor{' + mk[v] + '}{' + v + '}' : v; }).join(',') + '\\}'; }
      function stopAll() { if (F) { clearTimeout(F.t); clearTimeout(F.ft); F.done = true; } F = null; }
      function newRound() {
        var mem, non; stopAll(); A = sorted(sample(BIG, R(3, 5))); mem = sample(A, Math.min(A.length, 4)); non = sample(BIG.filter(function (x) { return A.indexOf(x) < 0; }), 8 - mem.length);
        q = shuffle(mem.concat(non)); i = 0; res = []; picked = null; paint();
      }
      function ans(v, label) {
        var cls = '';
        if (picked) {
          if (v === (picked.isMem ? 1 : 0)) {
            cls = ' sel-ok';
          } else if (picked.a === v) {
            cls = ' sel-bad';
          }
        }
        return '<button type="button" class="btn' + cls + '" data-a="' + v + '"' + (picked ? ' disabled' : '') + '>' + label + '</button>';
      }
      function endBtns(first) { return '<div class="opts end-actions"><button type="button" class="btn primary" data-' + first[0] + '="1" data-scroll>' + first[1] + '</button><button type="button" class="btn primary" data-' + first[2] + '="1" data-scroll>' + first[3] + '</button></div>'; }
      function paint() {
        var h, g, st = picked, mk = {}, cl = st ? (st.ok ? ' ok' : ' bad') : '', dots = '<div class="stg">' + q.map(function (x, k) { return '<span class="' + (res[k] === undefined ? (k === i ? 'cu' : '') : res[k] ? 'dn' : 'wr') + '"></span>'; }).join('') + '</div>';
        if (i >= q.length) {
          var s = res.filter(Boolean).length;
          host.innerHTML = rr(dots + K.dm('A=' + setTex(A)) + window.CourseKit.res(s, q.length) + endBtns(['fast', 'دروازه‌بان سریع', 'nx', 'سؤال‌های جدید'])); return;
        }
        g = q[i]; if (st && st.isMem) { mk[g] = st.ok ? 'teal' : 'red'; }
        h = '<p class="ask">مهمانِ بعدی دم در است؛ اسمش در فهرستِ ' + M('A') + ' هست؟</p>' + K.dm('A=' + hiTex(A, mk)) + '<div class="s1-guest' + cl + '"><span>' + fa(g) + '</span></div>';
        h += '<div class="s1-stamp' + cl + '">' + (st ? (st.ok ? '✓ درست. ' : '✗ نادرست. ') + (st.isMem ? 'در فهرست هست؛ پس عضو است ' + M('\\in') : 'در فهرست نیست؛ پس عضو نیست ' + M('\\notin')) : '') + '</div>';
        h += '<div class="opts">' + ans(1, 'عضو است ' + M('\\in')) + ans(0, 'عضو نیست ' + M('\\notin')) + '</div>';
        h += '<div class="opts"><button type="button" class="btn primary" data-go="1"' + (st ? '' : ' disabled') + '>مهمانِ بعدی</button></div>';
        host.innerHTML = rr(h + dots);
      }
      function advance() { picked = null; i++; paint(); }
      function answerLearn(b) {
        if (picked || i >= q.length) { return; }
        var isMem = A.indexOf(q[i]) >= 0, a = +b.dataset.a, ok = (a === 1) === isMem;
        res[i] = ok; picked = { ok: ok, isMem: isMem, a: a }; paint();
      }
      /* حالت سریع: زمانِ کل، امتیاز = درست − غلط */
      function newGuest() {
        var g, isMem = Math.random() < 0.5;
        do { g = isMem ? pick(A) : pick(BIG.filter(function (x) { return A.indexOf(x) < 0; })); } while (g === F.g);
        F.g = g; F.isMem = isMem; F.sp.textContent = fa(g);
      }
      function startFast() {
        stopAll(); F = { right: 0, wrong: 0, bad: [], g: null, isMem: false, done: false, t: 0, ft: 0, box: null, sp: null };
        A = sorted(sample(BIG, R(5, 6)));
        host.innerHTML = rr('<p class="ask">مهمان‌ها پشت‌سرهم می‌رسند؛ در ' + fa(FAST) + ' ثانیه تا می‌توانی درست تشخیص بده. هر پاسخ غلط یک امتیاز کم می‌کند.</p>' + K.dm('A=' + setTex(A)) + '<div class="s1-guest"><span></span></div><div class="opts"><button type="button" class="btn" data-a="1">عضو است ' + M('\\in') + '</button><button type="button" class="btn" data-a="0">عضو نیست ' + M('\\notin') + '</button></div><div class="s1-time"><i style="animation-duration:' + FAST + 's"></i></div>');
        F.box = host.querySelector('.s1-guest'); F.sp = F.box.querySelector('span'); newGuest();
        F.t = setTimeout(finishFast, FAST * 1000);
      }
      function answerFast(b) {
        var f = F, ok; if (!f || f.done) { return; }
        ok = (b.dataset.a === '1') === f.isMem;
        if (ok) { f.right++; } else { f.wrong++; f.bad.push({ g: f.g, isMem: f.isMem }); }
        f.box.classList.remove('ok', 'bad'); void f.box.offsetWidth; f.box.classList.add(ok ? 'ok' : 'bad');
        clearTimeout(f.ft); f.ft = setTimeout(function () { f.box.classList.remove('ok', 'bad'); }, 280);
        newGuest();
      }
      function finishFast() {
        var f = F, sc, mk = {}, seen = {}, bad, h; if (!f || f.done) { return; }
        f.done = true; clearTimeout(f.ft); sc = f.right - f.wrong;
        bad = f.bad.filter(function (m) { if (seen[m.g]) { return false; } seen[m.g] = 1; return true; });
        bad.forEach(function (m) { if (m.isMem) { mk[m.g] = 'red'; } });
        h = '<p class="ask">وقت تمام شد!</p><div class="s1-stats"><span class="g">✓ درست: ' + fa(f.right) + '</span><span class="r">✗ غلط: ' + fa(f.wrong) + '</span><span class="y">امتیاز: ' + (sc < 0 ? '−' : '') + fa(Math.abs(sc)) + '</span></div><p class="legend">امتیاز = تعداد درست منهای تعداد غلط.</p>';
        h += bad.length ? '<p class="ask">اشتباه‌های تو:</p>' + K.dm('A=' + hiTex(A, mk)) + '<div class="s1-chips">' + bad.map(function (m) { return '<span>' + fa(m.g) + (m.isMem ? ' عضو بود' : ' عضو نبود') + '</span>'; }).join('') + '</div>' : '<p>هیچ اشتباهی نکردی!</p>';
        host.innerHTML = rr(h + endBtns(['nx', 'سؤال‌های جدید', 'fast', 'دوباره، سریع']));
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) { return; }
        if (b.dataset.nx) { newRound(); return; }
        if (b.dataset.fast) { startFast(); return; }
        if (b.dataset.go) { advance(); return; }
        if (b.dataset.a !== undefined) { if (F) { answerFast(b); } else { answerLearn(b); } }
      });
      newRound();
    };

    /* ============ ۲) نمودار ون زنده: کدام رابطه درست است؟ ============ */
    function genPair() {                                                           /* sub, sup, ov, dj */
      var type = pick(['sub', 'sup', 'ov', 'dj']), A, B, u, rest;
      if (type === 'sub' || type === 'sup') { B = sample(POOL, R(4, 6)); A = sample(B, R(1, B.length - 1)); if (type === 'sup') { var t = A; A = B; B = t; } }
      else if (type === 'ov') { u = sample(POOL, 7); var c = u.slice(0, R(1, 2)); A = c.concat(u.slice(2, 2 + R(1, 2))); B = c.concat(u.slice(5, 5 + R(1, 2))); }
      else { u = sample(POOL, 6); A = u.slice(0, R(2, 3)); B = u.slice(3, 3 + R(2, 3)); }
      return { A: sorted(A), B: sorted(B) };
    }
    function relOf(A, B) { return H.sub(A, B) && !H.same(A, B) ? 'sub' : H.sub(B, A) && !H.same(A, B) ? 'sup' : 'none'; }
    K.liveVenn = function (host) {
      var p, rel, show, ans;
      function newQ() { p = genPair(); rel = relOf(p.A, p.B); show = false; ans = null; paint(); }
      function paint() {
        var h = '<p class="ask">دو مجموعه را در نمودار ببین. کدام جمله درست است؟</p>' + K.dm('A=' + setTex(p.A) + ',\\qquad B=' + setTex(p.B));
        h += H.venn({ A: p.A, B: p.B, U: POOL, tok: function (x, r) { return show && r === 'a' ? { bg: 'crimson', fg: '#fff' } : show && r === 'b' ? { bg: '#8fb4ff', fg: '#000' } : null; } });
        h += '<div class="lk-line"><button type="button" class="btn" data-sh="1">' + (show ? 'پنهان‌کردن' : 'بازرس: اعضای «بیرون‌زده» را نشان بده') + '</button></div>';
        if (show) { h += '<p class="lk-cap">قرمز: عضوِ ' + M('A') + ' که در ' + M('B') + ' نیست · آبی: عضوِ ' + M('B') + ' که در ' + M('A') + ' نیست</p>'; }
        var labels = ['A\\subseteq B', 'B\\subseteq A', null, null], keys = ['sub', 'sup', 'none'];
        h += '<div class="mc"><button type="button" class="btn opt' + (ans ? (rel === 'sub' ? ' right' : ans === 'sub' ? ' wrong' : '') : '') + '" data-a="sub"' + (ans ? ' disabled' : '') + '>' + M('A\\subseteq B') + '</button><button type="button" class="btn opt' + (ans ? (rel === 'sup' ? ' right' : ans === 'sup' ? ' wrong' : '') : '') + '" data-a="sup"' + (ans ? ' disabled' : '') + '>' + M('B\\subseteq A') + '</button><button type="button" class="btn opt' + (ans ? (rel === 'none' ? ' right' : ans === 'none' ? ' wrong' : '') : '') + '" data-a="none"' + (ans ? ' disabled' : '') + '>هیچ‌کدام از این دو</button></div>';
        if (ans) {
          var ab = H.minus(p.A, p.B), ba = H.minus(p.B, p.A), why = rel === 'sub' ? 'همهٔ اعضای ' + M('A') + ' داخل ' + M('B') + ' هستند.' : rel === 'sup' ? 'همهٔ اعضای ' + M('B') + ' داخل ' + M('A') + ' هستند.' : 'عضوِ ' + M(ab.length ? '' + ab[0] : '') + (ab.length ? ' فقط در ' + M('A') + ' است' : '') + (ab.length && ba.length ? ' و عضوِ ' : ' ') + (ba.length ? M('' + ba[0]) + ' فقط در ' + M('B') + ' است' : '') + '؛ پس هیچ‌کدام زیرمجموعهٔ دیگری نیست.';
          h += fb(ans === rel, ans === rel ? 'درست است! ✓' : 'این‌طور نیست.') + '<div class="ex"><p>' + why + '</p></div>';
        }
        h += '<div class="opts"><button type="button" class="btn primary" data-nx="1" data-scroll>' + (ans ? 'مثال بعدی' : 'مثال دیگر') + '</button></div>';
        host.innerHTML = rr(h); host.dataset.rel = rel;
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b || b.disabled) { return; }
        if (b.dataset.sh) { show = !show; paint(); } else if (b.dataset.a) { ans = b.dataset.a; paint(); } else if (b.dataset.nx) { newQ(); }
      });
      newQ();
    };

    /* ============ ۳) جفت‌یابی: کدام دو مجموعه برابرند؟ ============ */
    K.pairs = function (host) {
      var cards, sel, mistakes, msg;
      function rep(arr, dup) { var a = shuffle(arr.slice()); if (dup) { a.splice(R(0, a.length), 0, pick(arr)); } return a; }
      function build() {
        var b0, b1, b2, b3, bases, t = 0, ok;
        do {
          b0 = sample(POOL, R(3, 4)); b1 = b0.slice(); b1[R(0, b1.length - 1)] = pick(POOL.filter(function (x) { return b0.indexOf(x) < 0; }));
          b2 = sample(POOL, R(2, 3)); b3 = b2.concat(sample(POOL.filter(function (x) { return b2.indexOf(x) < 0; }), 1)); bases = [b0, b1, b2, b3]; ok = true;
          bases.forEach(function (x, i) { bases.forEach(function (y, j) { if (i < j && H.same(x, y)) { ok = false; } }); });
        } while (!ok && t++ < 200);
        cards = []; bases.forEach(function (b, id) { [0, 1].forEach(function (k) { var a = rep(b, k === 1 || Math.random() < 0.4); cards.push({ id: id, a: a, set: b, done: false }); }); });
        cards = shuffle(cards); sel = -1; mistakes = 0; msg = ''; paint();
      }
      function paint() {
        var left = cards.filter(function (c) { return !c.done; }).length, h = '<p class="ask">هر دو مجموعهٔ <b>برابر</b> را پیدا کن: دو کارت را به‌ترتیب انتخاب کن. (ترتیب و تکرار اعضا مهم نیست.)</p><div class="s1-grid">';
        cards.forEach(function (c, k) { h += '<button type="button" class="lk-card' + (c.done ? ' done' : k === sel ? ' sel' : '') + '" data-c="' + k + '"' + (c.done ? ' disabled' : '') + '>' + M(setTex(c.a)) + '</button>'; });
        h += '</div><div class="lk-cap">' + msg + '</div>' + (left ? '' : fb(mistakes === 0, 'همهٔ جفت‌ها پیدا شد! تعداد اشتباه‌ها: ' + fa(mistakes)) + '<div class="opts"><button type="button" class="btn primary" data-r="1" data-scroll>بازیِ جدید</button></div>');
        host.innerHTML = rr(h);
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b || b.disabled) { return; }
        if (b.dataset.r) { build(); return; }
        if (b.dataset.c === undefined) { return; }
        var k = +b.dataset.c;
        if (sel < 0 || sel === k) { sel = sel === k ? -1 : k; msg = ''; paint(); return; }
        var c1 = cards[sel], c2 = cards[k];
        if (c1.id === c2.id) { c1.done = c2.done = true; sel = -1; msg = '<span style="color:green">درست! هر دو یک مجموعه‌اند.</span>'; }
        else { mistakes++; var d1 = H.minus(c1.set, c2.set), d2 = H.minus(c2.set, c1.set); msg = '<span class="lk-bad">برابر نیستند: ' + (d1.length ? 'عضوِ ' + M('' + d1[0]) + ' فقط در کارتِ اول هست' : 'عضوِ ' + M('' + d2[0]) + ' فقط در کارتِ دوم هست') + '.</span>'; sel = -1; }
        paint();
      });
      build();
    };

    /* ============ آزمونک پایانی (۵ سؤال تصادفی) ============ */
    K.finalS01 = function (host) {
      var uniq = function (opts) { var seen = {}, out = []; opts.forEach(function (o) { if (!seen[o.h]) { seen[o.h] = 1; out.push(o); } }); return out; };
      var o = function (tex, ok, m) { return { h: M(tex), ok: ok, m: m }; };
      var asA = function (A) { return M('A=' + setTex(A)); };
      function qMember() {
        var A = sorted(sample(BIG, R(3, 5))), nonm = BIG.filter(function (x) { return A.indexOf(x) < 0; }), m = pick(A), m2 = pick(A.filter(function (x) { return x !== m; })), n = pick(nonm), n2 = pick(nonm.filter(function (x) { return x !== n; }));
        var good = Math.random() < 0.5 ? o(m + '\\in A', true) : o(n + '\\notin A', true);
        var ops = [good, o(n + '\\in A', false, fa(n) + ' در فهرست ' + M('A') + ' نیست؛ پس عضو آن نیست.'), o(m2 + '\\notin A', false, fa(m2) + ' در فهرست ' + M('A') + ' هست؛ پس عضو آن است.'), Math.random() < 0.5 ? o(n2 + '\\in A', false, fa(n2) + ' در فهرست ' + M('A') + ' نیست.') : o(m + '\\notin A', false, fa(m) + ' در فهرست ' + M('A') + ' هست.')];
        if (good.h === o(m + '\\in A').h) { ops[3] = o(n2 + '\\in A', false, fa(n2) + ' در فهرست ' + M('A') + ' نیست.'); } else { ops[3] = o(m + '\\notin A', false, fa(m) + ' در فهرست ' + M('A') + ' هست.'); }
        return { ask: 'اگر ' + asA(A) + ' باشد، کدام گزینه درست است؟', expl: function () { return '<p>برای هر عدد، فهرستِ ' + M('A') + ' را دنبال کن: اگر در آن بود «عضو است» ' + M('\\in') + '، وگرنه «عضو نیست» ' + M('\\notin') + '.</p>'; }, opts: ops };
      }
      function qSubset() {
        var A = sorted(sample(BIG, R(3, 5))), nonm = BIG.filter(function (x) { return A.indexOf(x) < 0; }), good = sample(A, R(1, A.length - 1)), ops = [{ h: M(setTex(shuffle(good.slice()))), ok: true }];
        [0, 1, 2].forEach(function (k) {
          var bad = sample(A, R(1, A.length - 1)), e = pick(nonm); if (k === 0) { bad = bad.concat([e]); } else { bad[R(0, bad.length - 1)] = e; }
          ops.push({ h: M(setTex(shuffle(bad.slice()))), m: 'عضوِ ' + M('' + e) + ' در ' + M('A') + ' نیست؛ پس این مجموعه زیرمجموعهٔ ' + M('A') + ' نیست.' });
        });
        return { ask: 'اگر ' + asA(A) + ' باشد، کدام مجموعه زیرمجموعهٔ ' + M('A') + ' است؟', expl: function () { return '<p>زیرمجموعه یعنی همهٔ اعضایش در ' + M('A') + ' باشند. اگر حتی یک عضو بیرون از ' + M('A') + ' باشد، زیرمجموعه نیست.</p>'; }, opts: ops };
      }
      function qEqual() {
        var A = sorted(sample(BIG, R(3, 4))), nonm = BIG.filter(function (x) { return A.indexOf(x) < 0; }), dupl = A.concat([pick(A)]), ops = [{ h: M(setTex(shuffle(dupl))), ok: true }];
        var miss = A.slice(); var dropped = miss.splice(R(0, miss.length - 1), 1)[0]; var extra = A.concat([pick(nonm)]), repl = A.slice(); var gone = repl[R(0, repl.length - 1)]; repl[repl.indexOf(gone)] = pick(nonm);
        ops.push({ h: M(setTex(shuffle(miss))), m: 'عضوِ ' + M('' + dropped) + ' از ' + M('A') + ' جا افتاده است.' }, { h: M(setTex(shuffle(extra))), m: 'این مجموعه عضوِ اضافه دارد که در ' + M('A') + ' نیست.' }, { h: M(setTex(shuffle(repl))), m: 'عضوِ ' + M('' + gone) + ' جایش عوض شده است.' });
        return { ask: 'اگر ' + asA(A) + ' باشد، کدام مجموعه با ' + M('A') + ' برابر است؟', expl: function () { return '<p>مجموعه‌های برابر دقیقاً اعضای یکسان دارند؛ ترتیب و تکرارِ اعضا مهم نیست.</p>'; }, opts: ops };
      }
      function qSymbol() {
        var A = sorted(sample(BIG, R(3, 5))), x = pick(A), v = Math.random() < 0.5;
        var ops = v ? [o(x + '\\in A', true), o('\\{' + x + '\\}\\in A', false, M('\\{' + x + '\\}') + ' یک مجموعه است، نه عضوِ ' + M('A') + '.'), o(x + '\\subseteq A', false, M('\\subseteq') + ' را بین دو مجموعه می‌نویسیم؛ ' + M('' + x) + ' یک عدد است.'), o(x + '\\notin A', false, fa(x) + ' عضوِ ' + M('A') + ' است.')]
          : [o('\\{' + x + '\\}\\subseteq A', true), o('\\{' + x + '\\}\\in A', false, M('\\{' + x + '\\}') + ' یک مجموعه است، نه عضوِ ' + M('A') + '.'), o(x + '\\subseteq A', false, M('\\subseteq') + ' را بین دو مجموعه می‌نویسیم؛ ' + M('' + x) + ' یک عدد است.'), o('\\{' + x + '\\}\\not\\subseteq A', false, M('\\{' + x + '\\}') + ' زیرمجموعهٔ ' + M('A') + ' است.')];
        return { ask: 'در ' + asA(A) + '، عدد ' + M('' + x) + ' عضوِ ' + M('A') + ' است. کدام نوشتار درست است؟', expl: function () { return '<p>' + M('\\in') + ' را بین یک «عضو» و یک «مجموعه» می‌نویسیم و ' + M('\\subseteq') + ' را بین دو «مجموعه».</p>'; }, opts: ops };
      }
      function qVenn() {
        var p = genPair(), rel = relOf(p.A, p.B);
        return {
          ask: 'با توجه به نمودار، کدام جمله درست است؟', fig: H.venn({ A: p.A, B: p.B, U: POOL }) + K.dm('A=' + setTex(p.A) + ',\\qquad B=' + setTex(p.B)), expl: function () { return '<p>' + (rel === 'sub' ? 'همهٔ اعضای ' + M('A') + ' داخل ' + M('B') + ' هستند.' : rel === 'sup' ? 'همهٔ اعضای ' + M('B') + ' داخل ' + M('A') + ' هستند.' : 'هر کدام عضوی دارد که در دیگری نیست.') + '</p>'; },
          opts: [{ h: M('A\\subseteq B'), ok: rel === 'sub', m: 'عضوی از ' + M('A') + ' هست که در ' + M('B') + ' نیست.' }, { h: M('B\\subseteq A'), ok: rel === 'sup', m: 'عضوی از ' + M('B') + ' هست که در ' + M('A') + ' نیست.' }, { h: M('A=B'), ok: false, m: 'دو مجموعه اعضای یکسان ندارند.' }, { h: 'هیچ‌کدام از این‌ها', ok: rel === 'none', m: 'یکی از دو مجموعه زیرمجموعهٔ دیگری است.' }]
        };
      }
      H.final(host, [qMember, qSubset, qEqual, qSymbol, qVenn].map(function (f) { return function () { var q, tries = 0; do { q = f(); } while (uniq(q.opts).length < q.opts.length && tries++ < 40); q.opts = q.opts.length === 4 && q.opts[3].h === 'هیچ‌کدام از این‌ها' ? q.opts : shuffle(uniq(q.opts)); return q; }; }));
    };

    var TERMS = '<ul><li><b>مجموعه</b>: گروهی از چیزهای مشخص که زیر یک نام جمع شده‌اند.</li><li><b>عضو</b>: هر چیزی که داخل مجموعه است.</li><li><b>مجموعهٔ تهی</b> ($\\varnothing$ یا $\\{\\ \\}$): مجموعه‌ای که هیچ عضوی ندارد؛ مثل «عددهای طبیعیِ بین ۴ و ۵».</li></ul>';
    var EMPTY = '<p>برای اینکه $\\varnothing\\subseteq A$ نادرست باشد، باید عضوی در $\\varnothing$ باشد که در $A$ نیست. اما $\\varnothing$ اصلاً عضو ندارد؛ پس چنین عضوی پیدا نمی‌شود و رابطه همیشه درست است.</p>';

    return {
      html: function () {
        H.tip('s1-terms', 'اصطلاح‌ها: مجموعه، عضو، تهی', TERMS); H.tip('s1-empty', 'چرا تهی زیرمجموعهٔ هر مجموعه‌ای است؟', EMPTY);
        var host = H.host;
        return fix([
          K.sn('۱', 'مجموعه: گردآوریِ چیزهای مشخص'),
          '<p>مجموعه یعنی گروهی از چیزهای مشخص که زیر یک نام جمع شده‌اند؛ مثلاً «عددهای فرد کوچک‌تر از ۷». چیزهایی که داخل مجموعه‌اند «عضو» نام دارند ' + H.tip('s1-terms', 'اصطلاح‌ها: مجموعه، عضو، تهی', TERMS) + '. مجموعه را با یک حرف بزرگ نام‌گذاری می‌کنیم و اعضایش را داخل آکولاد می‌نویسیم:</p>',
          K.dm(T`A=\{1,3,5\}`),
          '<p>این روش را «فهرست‌کردن اعضا» می‌نامیم. ترتیبِ نوشتنِ اعضا مهم نیست: ' + M('\\{1,3,5\\}') + ' و ' + M('\\{5,1,3\\}') + ' یک مجموعه‌اند.</p>',
          '<p>مجموعه‌ای که هیچ عضوی ندارد «مجموعهٔ تهی» است و آن را با ' + M('\\varnothing') + ' نشان می‌دهیم.</p>',

          K.sn('۲', 'عضویت: ' + M('\\boldsymbol{\\in}') + ' و ' + M('\\boldsymbol{\\notin}')),
          T`<p>برای نوشتنِ اینکه یک چیز عضوِ مجموعه هست یا نه، دو نماد داریم. فرض کن $A=\{1,3,5\}$:</p>`,
          K.tbl(['نماد', 'خوانش', 'مثال'], [[M('\\in'), 'عضو است', M('3\\in A') + ' (درست)'], [M('\\notin'), 'عضو نیست', M('2\\notin A') + ' (درست)']]),
          '<p>برای تشخیص، فهرستِ مجموعه را دنبال کن: اگر عدد در فهرست بود، ' + M('\\in') + '؛ وگرنه ' + M('\\notin') + '.</p>',
          '<h4>دروازه‌بان باشگاه</h4><p>پس هر بار فهرست را دنبال می‌کنیم و حرفِ آخر را خودِ فهرست می‌زند، نه ظاهرِ عدد. مثلاً در ' + M('A=\\{1,3,5\\}') + '، عددِ صحیح ' + M('4') + ' میانِ دوعدد صحیح ' + M('3') + ' و ' + M('5') + ' است، ولی چون در فهرست نیست، عضو نیست. دروازه‌بانِ باشگاه هم همین‌طور کار می‌کند: اسمِ مهمان را فقط با فهرست تطبیق می‌دهد.</p>', host('s1a'),

          K.sn('۳', 'زیرمجموعه'),
          '<p>گاهی همهٔ اعضای یک مجموعه در مجموعهٔ دیگری هم هستند. مثلاً:</p>', K.dm(T`A=\{1,3\},\qquad B=\{1,2,3,4\}`),
          '<p>هر عضوِ ' + M('A') + ' در ' + M('B') + ' هم هست؛ پس ' + M('A') + ' را «زیرمجموعهٔ» ' + M('B') + ' می‌نامیم و می‌نویسیم:</p>', K.dm(T`A\subseteq B`),
          H.venn({ A: [1, 3], B: [1, 2, 3, 4], U: [1, 2, 3, 4, 5, 6] }),
          '<p>در نمودار ون، ' + M('A') + ' کاملاً داخل ' + M('B') + ' قرار می‌گیرد: هیچ عضوی از ' + M('A') + ' بیرون از ' + M('B') + ' نیست.</p>',
          '<h4>آزمونِ زیرمجموعه</h4><p>اعضای مجموعهٔ اول را یکی‌یکی در مجموعهٔ دوم جست‌وجو کن. اگر حتی یکی پیدا نشد، زیرمجموعه نیست:</p>', K.dm(T`C=\{1,5\}:\qquad5\notin B\;\Rightarrow\;C\not\subseteq B`),
          K.box('note', 'دو حالت خاص', '<p>هر مجموعه زیرمجموعهٔ خودش است: ' + M('A\\subseteq A') + '. مجموعهٔ تهی هم زیرمجموعهٔ هر مجموعه‌ای است: ' + M('\\varnothing\\subseteq A') + ' ' + H.tip('s1-empty', 'چرا تهی زیرمجموعهٔ هر مجموعه‌ای است؟', EMPTY) + '</p>'),
          K.box('err', '⚠ اشتباه رایج', T`<p>$\in$ را بین یک «عضو» و یک «مجموعه» می‌نویسیم و $\subseteq$ را بین دو «مجموعه». اگر $A=\{1,3,5\}$ باشد، $3\in A$ درست است، اما $\{3\}\in A$ نادرست است؛ چون $\{3\}$ یک مجموعه است، نه عضوی از $A$. درست‌ترین نوشتار این است: $\{3\}\subseteq A$.</p>`),
          '<h4>نمودار ون زنده</h4><p>با «بازرس» ببین کدام عضوها از مجموعهٔ دیگر بیرون زده‌اند:</p>', host('s1b'),

          K.sn('۴', 'برابری مجموعه‌ها'),
          '<p>دو مجموعه وقتی برابرند که دقیقاً اعضای یکسان داشته باشند. ترتیب و تکرارِ نوشتنِ اعضا چیزی را عوض نمی‌کند:</p>', K.dm(T`\{1,2,3\}=\{3,1,2\}=\{1,1,2,3\}`),
          '<p>یک راهِ دقیق برای بررسیِ برابری:</p>', W('$A=B$ یعنی $A\\subseteq B$ و $B\\subseteq A$'),
          T`<p>اگر مجموعه‌ای عضوی داشته باشد که در دیگری نیست، برابر نیستند: $\{1,2\}\neq\{1,2,3\}$، چون ۳ فقط در مجموعهٔ دوم است.</p>`,
          '<h4>جفت‌یابی</h4><p>هشت کارت داریم. هر کارت با یک کارتِ دیگر برابر است، اما کارت‌ها به‌هم شبیه‌اند! جفت‌ها را پیدا کن:</p>', host('s1c'),

          K.sn('۵', 'آزمون پایانی'),
          '<p>پنج سؤال با عددهای تصادفی. هر بار که از اول شروع کنی، سؤال‌ها عوض می‌شوند.</p>', host('s1d'),
          K.box('sum', 'جمع‌بندی', T`<ul><li>مجموعه با فهرست‌کردنِ اعضا نوشته می‌شود؛ ترتیب و تکرار مهم نیست.</li><li>$x\in A$ یعنی $x$ عضو است و $x\notin A$ یعنی عضو نیست.</li><li>$A\subseteq B$ یعنی همهٔ اعضای $A$ در $B$ هستند. $\varnothing\subseteq A$ و $A\subseteq A$ همیشه درست‌اند.</li><li>$A=B$ یعنی $A\subseteq B$ و $B\subseteq A$.</li><li>$\in$ بین عضو و مجموعه است؛ $\subseteq$ بین دو مجموعه.</li></ul><p>در درس بعد با اجتماع، اشتراک، تفاضل و متمم، مجموعه‌ها را با هم ترکیب می‌کنیم.</p>`)
        ].join(''));
      },
      init: function (panel) {
        K.gate(panel.querySelector('#s1a')); K.liveVenn(panel.querySelector('#s1b')); K.pairs(panel.querySelector('#s1c')); K.finalS01(panel.querySelector('#s1d'));
      }
    };
  }
};
