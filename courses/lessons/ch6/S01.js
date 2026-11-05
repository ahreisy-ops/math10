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
      var A, q, i, res, msg;
      function newRound() {
        var mem, non; A = sorted(sample(BIG, R(3, 5))); mem = sample(A, Math.min(A.length, 4)); non = sample(BIG.filter(function (x) { return A.indexOf(x) < 0; }), 8 - mem.length);
        q = shuffle(mem.concat(non)); i = 0; res = []; msg = ''; paint();
      }
      function paint() {
        var h, dots = '<div class="lk-dots">' + q.map(function (x, k) { return '<i class="' + (res[k] === undefined ? (k === i ? 'cu' : '') : res[k] ? 'ok' : 'no') + '"></i>'; }).join('') + '</div>';
        if (i >= q.length) {
          var s = res.filter(Boolean).length;
          host.innerHTML = rr(dots + K.dm('A=' + setTex(A)) + fb(s >= 7, '<b>نتیجه: ' + fa(s) + ' از ' + fa(q.length) + '</b>') + '<div class="opts"><button type="button" class="btn primary" data-nx="1" data-scroll>باشگاهِ جدید</button></div>'); return;
        }
        h = '<p class="ask">فهرست مهمان‌های باشگاهِ ' + M('A') + ' این است. هر مهمانی که می‌رسد را بررسی کن:</p>' + K.dm('A=' + setTex(A)) + dots + '<div class="s1-guest"><span>' + fa(q[i]) + '</span></div>';
        h += K.dm(q[i] + '\\;?\\;A');
        h += '<div class="opts"><button type="button" class="btn" data-a="1">عضو است ' + M('\\in') + '</button><button type="button" class="btn" data-a="0">عضو نیست ' + M('\\notin') + '</button></div><div class="lk-cap">' + msg + '</div>';
        host.innerHTML = rr(h);
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) { return; }
        if (b.dataset.nx) { newRound(); return; }
        if (b.dataset.a !== undefined && i < q.length) {
          var isMem = A.indexOf(q[i]) >= 0, ok = (b.dataset.a === '1') === isMem; res[i] = ok;
          msg = ok ? '' : '<span class="lk-bad">' + fa(q[i]) + (isMem ? ' در فهرست هست، پس عضو است.' : ' در فهرست نیست، پس عضو نیست.') + '</span>';
          i++; paint();
        }
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
        h += '<div class="lk-line"><button type="button" class="btn' + (show ? ' primary' : '') + '" data-sh="1">' + (show ? 'پنهان‌کردن' : 'بازرس: اعضای «بیرون‌زده» را نشان بده') + '</button></div>';
        if (show) { h += '<p class="lk-cap">قرمز: عضوِ ' + M('A') + ' که در ' + M('B') + ' نیست · آبی: عضوِ ' + M('B') + ' که در ' + M('A') + ' نیست</p>'; }
        var labels = ['A\\subseteq B', 'B\\subseteq A', null, null], keys = ['sub', 'sup', 'none'];
        h += '<div class="mc"><button type="button" class="btn opt' + (ans ? (rel === 'sub' ? ' right' : ans === 'sub' ? ' wrong' : '') : '') + '" data-a="sub"' + (ans ? ' disabled' : '') + '>' + M('A\\subseteq B') + '</button><button type="button" class="btn opt' + (ans ? (rel === 'sup' ? ' right' : ans === 'sup' ? ' wrong' : '') : '') + '" data-a="sup"' + (ans ? ' disabled' : '') + '>' + M('B\\subseteq A') + '</button><button type="button" class="btn opt' + (ans ? (rel === 'none' ? ' right' : ans === 'none' ? ' wrong' : '') : '') + '" data-a="none"' + (ans ? ' disabled' : '') + '>هیچ‌کدام از این دو</button></div>';
        if (ans) {
          var ab = H.minus(p.A, p.B), ba = H.minus(p.B, p.A), why = rel === 'sub' ? 'همهٔ اعضای ' + M('A') + ' داخل ' + M('B') + ' هستند.' : rel === 'sup' ? 'همهٔ اعضای ' + M('B') + ' داخل ' + M('A') + ' هستند.' : 'عضوِ ' + M(ab.length ? '' + ab[0] : '') + (ab.length ? ' فقط در ' + M('A') + ' است' : '') + (ab.length && ba.length ? ' و عضوِ ' : ' ') + (ba.length ? M('' + ba[0]) + ' فقط در ' + M('B') + ' است' : '') + '؛ پس هیچ‌کدام زیرمجموعهٔ دیگری نیست.';
          h += fb(ans === rel, ans === rel ? 'درست است! ✓' : 'این‌طور نیست.') + '<div class="ex"><p>' + why + '</p></div>';
        }
        h += '<div class="opts"><button type="button" class="btn' + (ans ? ' primary' : '') + '" data-nx="1" data-scroll>' + (ans ? 'مثال بعدی' : 'مثال دیگر') + '</button></div>';
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
        return { ask: 'اگر ' + asA(A) + ' باشد، کدام گزینه درست است؟', expl: '<p>برای هر عدد، فهرستِ ' + M('A') + ' را دنبال کن: اگر در آن بود «عضو است» ' + M('\\in') + '، وگرنه «عضو نیست» ' + M('\\notin') + '.</p>', opts: ops };
      }
      function qSubset() {
        var A = sorted(sample(BIG, R(3, 5))), nonm = BIG.filter(function (x) { return A.indexOf(x) < 0; }), good = sample(A, R(1, A.length - 1)), ops = [{ h: M(setTex(shuffle(good.slice()))), ok: true }];
        [0, 1, 2].forEach(function (k) {
          var bad = sample(A, R(1, A.length - 1)), e = pick(nonm); if (k === 0) { bad = bad.concat([e]); } else { bad[R(0, bad.length - 1)] = e; }
          ops.push({ h: M(setTex(shuffle(bad.slice()))), m: 'عضوِ ' + M('' + e) + ' در ' + M('A') + ' نیست؛ پس این مجموعه زیرمجموعهٔ ' + M('A') + ' نیست.' });
        });
        return { ask: 'اگر ' + asA(A) + ' باشد، کدام مجموعه زیرمجموعهٔ ' + M('A') + ' است؟', expl: '<p>زیرمجموعه یعنی همهٔ اعضایش در ' + M('A') + ' باشند. اگر حتی یک عضو بیرون از ' + M('A') + ' باشد، زیرمجموعه نیست.</p>', opts: ops };
      }
      function qEqual() {
        var A = sorted(sample(BIG, R(3, 4))), nonm = BIG.filter(function (x) { return A.indexOf(x) < 0; }), dupl = A.concat([pick(A)]), ops = [{ h: M(setTex(shuffle(dupl))), ok: true }];
        var miss = A.slice(); var dropped = miss.splice(R(0, miss.length - 1), 1)[0]; var extra = A.concat([pick(nonm)]), repl = A.slice(); var gone = repl[R(0, repl.length - 1)]; repl[repl.indexOf(gone)] = pick(nonm);
        ops.push({ h: M(setTex(shuffle(miss))), m: 'عضوِ ' + M('' + dropped) + ' از ' + M('A') + ' جا افتاده است.' }, { h: M(setTex(shuffle(extra))), m: 'این مجموعه عضوِ اضافه دارد که در ' + M('A') + ' نیست.' }, { h: M(setTex(shuffle(repl))), m: 'عضوِ ' + M('' + gone) + ' جایش عوض شده است.' });
        return { ask: 'اگر ' + asA(A) + ' باشد، کدام مجموعه با ' + M('A') + ' برابر است؟', expl: '<p>مجموعه‌های برابر دقیقاً اعضای یکسان دارند؛ ترتیب و تکرارِ اعضا مهم نیست.</p>', opts: ops };
      }
      function qSymbol() {
        var A = sorted(sample(BIG, R(3, 5))), x = pick(A), v = Math.random() < 0.5;
        var ops = v ? [o(x + '\\in A', true), o('\\{' + x + '\\}\\in A', false, M('\\{' + x + '\\}') + ' یک مجموعه است، نه عضوِ ' + M('A') + '.'), o(x + '\\subseteq A', false, M('\\subseteq') + ' را بین دو مجموعه می‌نویسیم؛ ' + M('' + x) + ' یک عدد است.'), o(x + '\\notin A', false, fa(x) + ' عضوِ ' + M('A') + ' است.')]
          : [o('\\{' + x + '\\}\\subseteq A', true), o('\\{' + x + '\\}\\in A', false, M('\\{' + x + '\\}') + ' یک مجموعه است، نه عضوِ ' + M('A') + '.'), o(x + '\\subseteq A', false, M('\\subseteq') + ' را بین دو مجموعه می‌نویسیم؛ ' + M('' + x) + ' یک عدد است.'), o('\\{' + x + '\\}\\not\\subseteq A', false, M('\\{' + x + '\\}') + ' زیرمجموعهٔ ' + M('A') + ' است.')];
        return { ask: 'در ' + asA(A) + '، عدد ' + M('' + x) + ' عضوِ ' + M('A') + ' است. کدام نوشتار درست است؟', expl: '<p>' + M('\\in') + ' را بین یک «عضو» و یک «مجموعه» می‌نویسیم و ' + M('\\subseteq') + ' را بین دو «مجموعه».</p>', opts: ops };
      }
      function qVenn() {
        var p = genPair(), rel = relOf(p.A, p.B);
        return { ask: 'با توجه به نمودار، کدام جمله درست است؟', extra: H.venn({ A: p.A, B: p.B, U: POOL }), tex: 'A=' + setTex(p.A) + ',\\qquad B=' + setTex(p.B), expl: '<p>' + (rel === 'sub' ? 'همهٔ اعضای ' + M('A') + ' داخل ' + M('B') + ' هستند.' : rel === 'sup' ? 'همهٔ اعضای ' + M('B') + ' داخل ' + M('A') + ' هستند.' : 'هر کدام عضوی دارد که در دیگری نیست.') + '</p>',
          opts: [{ h: M('A\\subseteq B'), ok: rel === 'sub', m: 'عضوی از ' + M('A') + ' هست که در ' + M('B') + ' نیست.' }, { h: M('B\\subseteq A'), ok: rel === 'sup', m: 'عضوی از ' + M('B') + ' هست که در ' + M('A') + ' نیست.' }, { h: M('A=B'), ok: false, m: 'دو مجموعه اعضای یکسان ندارند.' }, { h: 'هیچ‌کدام از این‌ها', ok: rel === 'none', m: 'یکی از دو مجموعه زیرمجموعهٔ دیگری است.' }] };
      }
      H.seq(host, function () { return [qMember, qSubset, qEqual, qSymbol, qVenn].map(function (f) { var q, tries = 0; do { q = f(); } while (uniq(q.opts).length < q.opts.length && tries++ < 40); q.opts = q.opts.length === 4 && q.opts[3].h === 'هیچ‌کدام از این‌ها' ? q.opts : shuffle(uniq(q.opts)); return q; }); },
        function (s) { return s === 5 ? 'عالی بود! به همهٔ سؤال‌ها درست جواب دادی.' : s >= 3 ? 'خوب بود. سؤال‌هایی را که اشتباه کردی دوباره مرور کن.' : 'یک بار دیگر درس را مرور کن؛ بعد با عددهای جدید امتحان کن.'; });
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

          K.sn('۲', 'عضویت: ∈ و ∉'),
          T`<p>برای نوشتنِ اینکه یک چیز عضوِ مجموعه هست یا نه، دو نماد داریم. فرض کن $A=\{1,3,5\}$:</p>`,
          K.tbl(['نماد', 'خوانش', 'مثال'], [[M('\\in'), 'عضو است', M('3\\in A') + ' (درست)'], [M('\\notin'), 'عضو نیست', M('2\\notin A') + ' (درست)']]),
          '<p>برای تشخیص، فهرستِ مجموعه را دنبال کن: اگر عدد در فهرست بود، ' + M('\\in') + '؛ وگرنه ' + M('\\notin') + '.</p>',
          '<h4>دروازه‌بان باشگاه</h4><p>فهرستِ مهمان‌های مجاز را داری. هر مهمانی که می‌رسد را بررسی کن:</p>', host('s1a'),

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

          K.sn('۵', 'آزمونک پایانی'),
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
