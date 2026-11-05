/* درس S02 — اجتماع، اشتراک، تفاضل و متمم
   تمام تمرین‌ها اعداد تصادفی می‌سازند و پاسخ را با محاسبهٔ دقیق می‌سنجند. */
window.LESSONS = window.LESSONS || {};
window.LESSONS.S02 = {
  needs: ['utils', 'inputs', 'kit'],
  /* بدنهٔ درس داخل setup است تا فقط بعد از لود شدن ماژول‌های needs اجرا شود */
  setup: function (K0) {
    var K = Object.create(K0), H = K0.lk(K);
    var fa = H.fa, R = H.R, shuffle = H.shuffle, fb = H.fb, T = H.T, M = H.M, AL = H.AL, rr = H.rr, fix = H.fix, pick = H.pick, setTex = H.setTex, sorted = H.sorted, sample = H.sample;
    var U9 = [1, 2, 3, 4, 5, 6, 7, 8, 9], U8 = [1, 2, 3, 4, 5, 6, 7, 8];
    var MARK = 'var(--mark)', REGN = { a: 'فقط A', ab: 'اشتراک', b: 'فقط B', o: 'بیرون از هر دو' };
    var RIA = { a: [1, 0], ab: [1, 1], b: [0, 1], o: [0, 0] };
    /* عبارت‌ها: tex و تابعِ عضویت (بر حسب «عضو A بودن» و «عضو B بودن») */
    var EXPRS = [
      ['A\\cup B', function (a, b) { return a || b; }], ['A\\cap B', function (a, b) { return a && b; }], ['A-B', function (a, b) { return a && !b; }], ['B-A', function (a, b) { return b && !a; }],
      ["A'", function (a, b) { return !a; }], ["B'", function (a, b) { return !b; }], ["A'\\cap B", function (a, b) { return !a && b; }], ["A\\cap B'", function (a, b) { return a && !b; }],
      ["(A\\cup B)'", function (a, b) { return !(a || b); }], ["(A\\cap B)'", function (a, b) { return !(a && b); }], ["A'\\cup B", function (a, b) { return !a || b; }], ["A\\cup B'", function (a, b) { return a || !b; }],
      ["A'\\cap B'", function (a, b) { return !a && !b; }], ["A'\\cup B'", function (a, b) { return !a || !b; }]
    ];
    var BASIC = [0, 1, 2, 3, 4, 5];
    function genSets(U, needAll) {                                                  /* هر چهار ناحیه حداقل یک عضو دارد */
      var sh = shuffle(U.slice()), A = [], B = [], reg = ['a', 'ab', 'b', 'o'];
      sh.forEach(function (x, i) { var r = i < 4 ? reg[i] : pick(reg); if (r === 'a' || r === 'ab') { A.push(x); } if (r === 'b' || r === 'ab') { B.push(x); } });
      return { A: sorted(A), B: sorted(B), U: U };
    }
    function result(S, f) { return S.U.filter(function (x) { return f(S.A.indexOf(x) >= 0, S.B.indexOf(x) >= 0); }); }
    var defTex = function (S, withU) { return '\\begin{aligned}A&=' + setTex(S.A) + '\\\\B&=' + setTex(S.B) + (withU ? '\\\\U&=' + setTex(S.U) : '') + '\\end{aligned}'; };
    var shaded = function (S, f) { var fl = {}; ['a', 'ab', 'b', 'o'].forEach(function (r) { if (f(!!RIA[r][0], !!RIA[r][1])) { fl[r] = MARK; } }); return H.venn({ A: S.A, B: S.B, U: S.U, fill: fl }); };

    /* ============ ۱) رنگ‌آمیزی نمودار ون ============ */
    K.paint = function (host) {
      var S, ex, sel, msg, solved;
      function newQ() { S = genSets(U8); ex = pick(EXPRS); sel = {}; msg = ''; solved = false; paint(); }
      function want() { var w = {}; ['a', 'ab', 'b', 'o'].forEach(function (r) { w[r] = !!ex[1](!!RIA[r][0], !!RIA[r][1]); }); return w; }
      function paint() {
        var h = '<p class="ask">ناحیه‌هایی را که نمایندهٔ ' + M(ex[0]) + ' هستند، با کلیک رنگ کن:</p>' + K.dm(defTex(S, true));
        var fl = {}; Object.keys(sel).forEach(function (r) { if (sel[r]) { fl[r] = MARK; } });
        h += H.venn({ A: S.A, B: S.B, U: S.U, fill: fl, reg: !solved });
        if (solved) { h += fb(true, 'درست است! ✓') + K.dm(ex[0] + '=' + setTex(result(S, ex[1]))); }
        else { h += '<div class="lk-cap">' + msg + '</div><div class="opts"><button type="button" class="btn primary" data-ck="1">بررسی</button><button type="button" class="btn" data-cl="1">پاک‌کردن</button></div>'; }
        h += '<div class="opts"><button type="button" class="btn' + (solved ? ' primary' : '') + '" data-nx="1" data-scroll>' + (solved ? 'عبارت بعدی' : 'عبارت دیگر') + '</button></div>';
        host.innerHTML = rr(h);
      }
      function check() {
        var w = want(), miss = [], extra = [];
        ['a', 'ab', 'b', 'o'].forEach(function (r) { if (w[r] && !sel[r]) { miss.push(REGN[r]); } if (!w[r] && sel[r]) { extra.push(REGN[r]); } });
        if (!miss.length && !extra.length) { solved = true; msg = ''; } else { msg = '<span class="lk-bad">' + (extra.length ? 'ناحیهٔ «' + extra[0] + '» جزو این عبارت نیست. ' : '') + (miss.length ? 'ناحیهٔ «' + miss[0] + '» را هم باید رنگ کنی.' : '') + '</span>'; }
        paint();
      }
      host.addEventListener('click', function (e) {
        var t = e.target, reg = t.getAttribute && t.getAttribute('data-reg'), b = t.closest && t.closest('button');
        if (reg && !solved) { sel[reg] = !sel[reg]; msg = ''; paint(); return; }
        if (!b) { return; }
        if (b.dataset.ck) { check(); } else if (b.dataset.cl) { sel = {}; msg = ''; paint(); } else if (b.dataset.nx) { newQ(); }
      });
      host.dataset.ready = '1'; newQ();
    };

    /* ============ ۲) فهرست‌ساز: حاصل عملیات را با انتخاب عضوها بساز ============ */
    K.builder = function (host) {
      var S, ex, sel, msg, solved, res;
      function newQ() {
        ex = EXPRS[pick(BASIC)]; S = genSets(U9); if (ex[0] === 'A\\cap B' && Math.random() < 0.25) { var s = sample(U9, 6); S = { A: sorted(s.slice(0, 3)), B: sorted(s.slice(3)), U: U9 }; }
        res = result(S, ex[1]); sel = {}; msg = ''; solved = false; paint();
      }
      function paint() {
        var h = '<p class="ask">حاصل ' + M(ex[0]) + ' را بساز: عددهایی را که عضو حاصل‌اند انتخاب کن (اگر حاصل تهی است، هیچ عددی انتخاب نکن).</p>' + K.dm(defTex(S, ex[0].indexOf("'") >= 0));
        h += '<div class="lk-line">' + S.U.map(function (x) { return '<button type="button" class="lk-chip' + (sel[x] ? ' sel' : '') + '" data-x="' + x + '"' + (solved ? ' disabled' : '') + '>' + fa(x) + '</button>'; }).join('') + '</div>';
        h += '<div class="lk-cap">' + (solved ? '' : 'انتخابِ تو: ' + M(setTex(S.U.filter(function (x) { return sel[x]; })))) + '</div>';
        if (solved) { h += fb(true, 'درست است! ✓') + K.dm(ex[0] + '=' + setTex(res)); } else { h += '<div class="lk-cap">' + msg + '</div><div class="opts"><button type="button" class="btn primary" data-ck="1">بررسی</button></div>'; }
        h += '<div class="opts"><button type="button" class="btn' + (solved ? ' primary' : '') + '" data-nx="1" data-scroll>' + (solved ? 'مثال بعدی' : 'مثال دیگر') + '</button></div>';
        host.innerHTML = rr(h);
      }
      function check() {
        var mine = S.U.filter(function (x) { return sel[x]; }), miss = H.minus(res, mine), extra = H.minus(mine, res);
        if (!miss.length && !extra.length) { solved = true; msg = ''; }
        else { msg = '<span class="lk-bad">' + (extra.length ? M('' + extra[0]) + ' نباید در حاصل باشد' + (ex[0] === 'A\\cup B' ? ' (در هیچ‌کدام از دو مجموعه نیست)' : '') + '. ' : '') + (miss.length ? M('' + miss[0]) + ' باید در حاصل باشد.' : '') + '</span>'; }
        paint();
      }
      host.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b || b.disabled) { return; }
        if (b.dataset.x) { sel[b.dataset.x] = !sel[b.dataset.x]; msg = ''; paint(); } else if (b.dataset.ck) { check(); } else if (b.dataset.nx) { newQ(); }
      });
      host.dataset.ready = '1'; newQ();
    };

    /* ============ آزمونک پایانی (۵ سؤال تصادفی) ============ */
    var sig = function (ex) { return [ex[1](true, false), ex[1](true, true), ex[1](false, true), ex[1](false, false)].map(Number).join(''); };
    K.finalS02 = function (host) {
      function mk(pool, idxs, withU) {
        var S = genSets(withU ? U9 : U8), idx = pick(idxs), ex = EXPRS[idx], good = result(S, ex[1]), seen = {}, ops = [{ h: M(setTex(good)), ok: true }];
        seen[sig(ex)] = 1;
        shuffle(pool.slice()).forEach(function (j) {
          var e2 = EXPRS[j]; if (ops.length >= 4 || seen[sig(e2)]) { return; } seen[sig(e2)] = 1;
          ops.push({ h: M(setTex(result(S, e2[1]))), m: 'این مجموعه حاصلِ ' + M(e2[0]) + ' است، نه ' + M(ex[0]) + '.' });
        });
        return { ask: 'اگر مجموعه‌های زیر را داشته باشیم، حاصل ' + M(ex[0]) + ' کدام است؟', tex: defTex(S, withU), opts: ops, expl: '<p>' + M(ex[0] + '=' + setTex(good)) + '</p>' };
      }
      var ALL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      H.seq(host, function () {
        return [mk(ALL, [0], false), mk(ALL, [1], false), mk(ALL, [2, 3], false), mk(ALL, [4, 5], true), mk(ALL, [6, 7, 8, 9, 10, 11, 12, 13], true)].map(function (q) { q.opts = shuffle(q.opts); return q; });
      }, function (s) { return s === 5 ? 'عالی بود! به همهٔ سؤال‌ها درست جواب دادی.' : s >= 3 ? 'خوب بود. سؤال‌هایی را که اشتباه کردی دوباره مرور کن.' : 'یک بار دیگر درس را مرور کن؛ بعد با عددهای جدید امتحان کن.'; });
    };

    var UTIP = '<p>همهٔ چیزهایی که در یک مسئله مطرح‌اند را در یک مجموعهٔ بزرگ‌تر جمع می‌کنیم و آن را «مجموعهٔ مرجع» می‌نامیم و با $U$ نشان می‌دهیم. همهٔ مجموعه‌های آن مسئله زیرمجموعهٔ $U$ هستند. در نمودار ون، مجموعهٔ مرجع را با یک مستطیل نشان می‌دهیم.</p>';
    var DTIP = '<p>عبارتِ $A\\cap B^{\\prime}$ یعنی اعضایی که در $A$ هستند و در $B$ نیستند؛ این همان تعریف تفاضل است:</p><div class="dm">$A-B=A\\cap B^{\\prime}$</div>';
    var grid = function (S) { return '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;max-width:520px;margin:auto">' + [['اجتماع', 'A\\cup B', function (a, b) { return a || b; }], ['اشتراک', 'A\\cap B', function (a, b) { return a && b; }], ['تفاضل', 'A-B', function (a, b) { return a && !b; }], ['متمم', "A'", function (a, b) { return !a; }]].map(function (x) { return '<div>' + shaded(S, x[2]) + '<div class="lk-cap"><b>' + x[0] + '</b> ' + M(x[1]) + '</div></div>'; }).join('') + '</div>'; };

    return {
      html: function () {
        H.tip('s2-u', 'مجموعهٔ مرجع', UTIP); H.tip('s2-d', 'تفاضل با کمک متمم', DTIP);
        var host = H.host, S0 = { A: [1, 2, 3, 4], B: [3, 4, 5], U: [1, 2, 3, 4, 5, 6, 7] };
        var one = function (f) { return '<div style="max-width:320px;margin:auto">' + shaded(S0, f) + '</div>'; };
        return fix([
          K.sn('۱', 'دو مجموعه کنار هم'),
          '<p>در درس قبل با مجموعه‌ها آشنا شدی. حالا می‌خواهیم دو مجموعه را با هم ترکیب کنیم. در این درس همیشه این دو مجموعه را داریم:</p>', K.dm(T`A=\{1,2,3,4\},\qquad B=\{3,4,5\}`),
          '<p>همهٔ عددهایی که در بحث هستند را در یک «مجموعهٔ مرجع» جمع می‌کنیم؛ مثلاً ' + M('U=\\{1,2,3,4,5,6,7\\}') + ' ' + H.tip('s2-u', 'مجموعهٔ مرجع', UTIP) + '. نمودار ون هر چهار حالتِ ممکن برای یک عدد را نشان می‌دهد:</p>',
          H.venn({ A: S0.A, B: S0.B, U: S0.U }),
          '<p>یک عدد می‌تواند «فقط در ' + M('A') + '»، «در هر دو (اشتراک)»، «فقط در ' + M('B') + '» یا «بیرون از هر دو» باشد. عملیات روی مجموعه‌ها یعنی انتخابِ بعضی از این ناحیه‌ها.</p>',

          K.sn('۲', 'اجتماع: ∪'),
          '<p>اجتماعِ دو مجموعه یعنی مجموعهٔ همهٔ اعضایی که در ' + M('A') + ' یا در ' + M('B') + ' (یا هر دو) هستند. عضوهای مشترک را فقط یک بار می‌نویسیم:</p>', K.dm(T`A\cup B=\{1,2,3,4,5\}`), one(function (a, b) { return a || b; }),
          '<p>ناحیه‌های رنگی نشان می‌دهند اجتماع کجاست: هر دو دایره.</p>',

          K.sn('۳', 'اشتراک: ∩'),
          '<p>اشتراکِ دو مجموعه یعنی اعضایی که هم در ' + M('A') + ' و هم در ' + M('B') + ' هستند:</p>', K.dm(T`A\cap B=\{3,4\}`), one(function (a, b) { return a && b; }),
          '<p>اگر هیچ عضو مشترکی نباشد، اشتراک تهی است و می‌گوییم دو مجموعه «جدا از هم» هستند:</p>', K.dm(T`\{1,2\}\cap\{5,6\}=\varnothing`),

          K.sn('۴', 'تفاضل: A − B'),
          '<p>تفاضلِ ' + M('A-B') + ' یعنی اعضایی که در ' + M('A') + ' هستند، اما در ' + M('B') + ' نیستند:</p>', AL([T`A-B&=\{1,2\}`, T`B-A&=\{5\}`]), one(function (a, b) { return a && !b; }),
          K.box('err', '⚠ اشتباه رایج', T`<p>ترتیب در تفاضل مهم است: $A-B$ و $B-A$ یکی نیستند. در مثال بالا $A-B=\{1,2\}$ ولی $B-A=\{5\}$. همیشه «اولی منهای دومی» را بخوان.</p>`),

          K.sn('۵', 'متمم: A′'),
          '<p>متممِ ' + M("A'") + ' یعنی اعضای مجموعهٔ مرجع که در ' + M('A') + ' نیستند. برای ساختنِ آن به ' + M('U') + ' نیاز داریم:</p>', K.dm(T`A'=\{5,6,7\}`), one(function (a, b) { return !a; }),
          K.box('note', 'دو نکتهٔ جالب', T`<p>هر عدد یا در $A$ است یا در $A'$، و هیچ عددی در هر دو نیست. پس:</p><p>$A\cup A'=U$ و $A\cap A'=\varnothing$</p>`),
          '<h4>خلاصهٔ تصویری</h4>', grid(S0),
          '<h4>فهرست‌ساز</h4><p>یک عملیات و دو مجموعه می‌بینی. عددهای حاصل را انتخاب کن:</p>', host('s2a'),

          K.sn('۶', 'ترکیب عملیات'),
          '<p>گاهی چند عملیات را با هم داریم. ترتیب را پرانتز مشخص می‌کند: اول کارِ داخل پرانتز را انجام بده. با ' + M('U=\\{1,\\dots,7\\}') + ' همان مجموعه‌ها:</p>',
          AL([T`B'&=\{1,2,6,7\}`, T`A\cap B'&=\{1,2\}`]), '<p>و در این مثال:</p>', AL([T`A\cup B&=\{1,2,3,4,5\}`, T`(A\cup B)'&=\{6,7\}`]),
          K.box('note', 'تفاضل با کمک متمم', T`<p>$A\cap B'=\{1,2\}$ همان $A-B$ است ${H.tip('s2-d', 'تفاضل با کمک متمم', DTIP)}. این دو عبارت همیشه یک ناحیه را رنگ می‌کنند.</p>`),
          K.box('note', 'برای کنجکاوها', T`<p>$(A\cup B)'$ و $A'\cap B'$ همیشه حاصل یکسان دارند، و $(A\cap B)'$ با $A'\cup B'$ برابر است. تمرینِ زیر کمکت می‌کند این را خودت ببینی.</p>`),
          '<h4>رنگ‌آمیزی نمودار ون</h4><p>یک عبارت می‌بینی. ناحیه‌های درست را رنگ کن؛ بعد «بررسی» را بزن:</p>', host('s2b'),

          K.sn('۷', 'آزمونک پایانی'),
          '<p>پنج سؤال با مجموعه‌های تصادفی. هر بار که از اول شروع کنی، سؤال‌ها عوض می‌شوند.</p>', host('s2c'),
          K.box('sum', 'جمع‌بندی', T`<ul><li>$A\cup B$: اعضای $A$ یا $B$ (یا هر دو)، بدون تکرار.</li><li>$A\cap B$: اعضای مشترک؛ اگر نباشد، تهی است.</li><li>$A-B$: اعضای $A$ که در $B$ نیستند؛ ترتیب مهم است.</li><li>$A'$: اعضای مجموعهٔ مرجع که در $A$ نیستند.</li><li>در عبارت‌های ترکیبی اول داخل پرانتز را حساب کن.</li></ul><p>در درس بعد (الگوها) از اعداد به‌جای مجموعه‌ها استفاده می‌کنیم و قاعدهٔ تغییرشان را پیدا می‌کنیم.</p>`)
        ].join(''));
      },
      init: function (panel) { K.builder(panel.querySelector('#s2a')); K.paint(panel.querySelector('#s2b')); K.finalS02(panel.querySelector('#s2c')); }
    };
  }
};
