/* E01 — مفهوم معادله و تساوی | مستقل از تمرین‌های فصل‌های پیشین */
(function () {
  'use strict';
  window.LESSONS = window.LESSONS || {};
  window.LESSONS.E01 = {
    needs: ['linearvalues'],
    setup: function (K0) {
      var K = Object.create(K0), ML = window.MathLite;
      function maths(t) { return ML.renderRich('$' + t + '$'); }
      function rich(s) { return ML.renderRich(s); }
      function f(n) { return ML.fa(n); }
      function feedback(ok, head, explanation) {
        return '<div class="fb ' + (ok ? 'ok' : 'bad') + '" role="status">' + (ok ? '✓ ' : '') + head + '</div>' +
          (explanation ? '<div class="ex">' + rich(explanation) + '</div>' : '');
      }
      function buttons(items, chosen, attr, className) {
        return items.map(function (item, i) {
          var label = typeof item === 'string' ? item : item.label;
          var value = typeof item === 'string' ? i : item.value;
          return '<button type="button" class="btn e01-choice' + (className ? ' ' + className : '') +
            (chosen === value ? ' e01-selected' : '') + '" ' + attr + '="' + value + '" aria-pressed="' +
            (chosen === value ? 'true' : 'false') + '">' + label + '</button>';
        }).join('');
      }
      return {
        html: function () {
          var h = '';
          h += "<div class=\"e01-lesson\">";
          h += "<div class=\"e01-intro\"><span class=\"e01-kicker\">از عبارت جبری تا معادله</span><p>در فصل قبل، مقدار عبارت‌های جبری را با جایگذاری حساب کردیم. حالا می‌خواهیم ببینیم وقتی مقداری نامعلوم است، چگونه می‌توان آن را با یک تساوی نشان داد و دربارهٔ آن صحبت کرد.</p><div class=\"e01-route\" aria-label=\"مسیر این درس\"><span>شناخت معادله</span><i aria-hidden=\"true\">←</i><span>معنای جواب</span><i aria-hidden=\"true\">←</i><span>حفظ تساوی</span><i aria-hidden=\"true\">←</i><span>کاربرد حفظ تساوی</span></div></div>";
          h += K.sn('۱', 'از جای خالی تا مفهوم معادله');
          h += "<p>روی قفسه‌ای ۳ کتاب قرار دارد. چند کتاب دیگر لازم است تا تعداد آن‌ها به ۸ برسد؟ این مسئله را می‌توان با یک جای خالی نوشت:</p>";
          h += K.dm('3+\\square=8');
          h += "<p>عدد ۵ جای خالی را پر می‌کند؛ چون با اضافه‌شدن ۵ کتاب، تعداد کتاب‌ها به ۸ می‌رسد.</p>";
          h += "<p>در فصل قبل، استفاده از حرف‌هایی مانند $x$ برای نشان‌دادن عددهای نامعلوم یا تغییرپذیر معرفی شد. در این مسئله هم می‌توان به‌جای مربع، حرف $x$ را نوشت:</p>";
          h += K.dm('3+x=8');
          h += "<p>حرف $x$ همان <b>متغیر</b> آشناست و می‌تواند مقدارهای مختلفی داشته باشد. اما در این مسئله قرار است مقدار مشخصی برای آن پیدا شود تا $3+x$ برابر ۸ شود. وقتی هدف پیداکردن مقدار یک حرف باشد، به آن <b>مجهول</b> می‌گوییم. پس $x$ همچنان متغیر است و در این معادله نقش مجهول را هم دارد.</p>";
          h += "<p>به تساوی‌ای که یک یا چند مجهول داشته باشد، <b>معادله</b> می‌گویند. در $3+x=8$ فقط یک مجهول وجود دارد؛ به همین دلیل، این یک <b>معادلهٔ یک‌مجهولی</b> است. در همین معادله، مقدار $x=5$ دو طرف را برابر می‌کند. به مقداری از مجهول که با جایگذاری آن، دو طرف معادله برابر شوند، <b>جواب معادله</b> می‌گویند.</p>";
          h += "<h4>یادآوری: عبارت جبری و معادله چه فرقی دارند؟</h4>";
          h += "<p>عبارت $3+x$ به‌تنهایی مقداری را نشان می‌دهد که به $x$ بستگی دارد؛ اما در معادلهٔ $3+x=8$ این مقدار باید با ۸ برابر شود. نوار لغزنده را حرکت بده و مقدارهای دو کادر را مقایسه کن: چه اتفاقی می‌افتد که مقدار $x$ عوض می‌شود؟</p>";
          h += '<div id="e01-compare" class="e01-compare" data-activity="compare">' +
            '<div class="e01-compare-control graduated-range">' +
            '<div class="e01-compare-head"><span>مقدار متغیر</span><strong data-compare-x></strong></div>' +
            '<input type="range" min="-4" max="8" step="1" value="2" aria-label="مقدار متغیر x" data-compare-range>' +
            '<div class="e01-compare-ticks graduated-ticks" aria-hidden="true">' +
            Array.from({ length: 13 }, function (_, i) { var n = i - 4; return '<span class="' + (n === 5 ? 'e01-target-tick' : '') + '" style="--gr-step:' + i + ';--gr-total:12"><i></i>' + maths(n === 5 ? '\\mathbf{5}' : String(n)) + '</span>'; }).join('') +
            '</div>' +
            '</div>' +
            '<div class="e01-pairs">' +
            '<div class="e01-pair"><span>عبارت جبری</span><strong class="e01-formula-tag">$3+x$</strong><div class="e01-pair-eval" data-compare-expression></div><small>با هر مقدارِ $x$، حاصل عبارت به دست می‌آید.</small></div>' +
            '<div class="e01-pair" data-compare-equation-card><span>معادله</span><strong class="e01-formula-tag">$3+x=8$</strong><div class="e01-pair-eval" data-compare-equation></div><small data-compare-status aria-live="polite"></small></div>' +
            '</div></div>';
          h += K.sn('۲', 'بررسی جواب معادله با جایگذاری');
          h += "<p>در فعالیت قبل دیدیم که مقدار عبارت جبری با تغییر $x$ عوض می‌شود، اما معادله فقط برای بعضی مقدارها برقرار است. برای اینکه بفهمیم یک عدد جواب معادله‌ای دیگر هست یا نه، آن را به‌جای مجهول می‌گذاریم و مقدار دو طرف را با هم مقایسه می‌کنیم.</p>";
          h += '<p>برای مثال، معادلهٔ <span class="e01-inline-equation" dir="ltr">' + maths("x+4=") + '<span class="e01-highlight-ten">' + maths("10") + '</span></span> را در نظر بگیریم. اگر ' + maths("x=5") + ' باشد، طرف چپ ۹ و طرف راست <span class="e01-highlight-ten">۱۰</span> می‌شود؛ پس این عدد جواب نیست:</p>';
          h += '<div class="e01-ten-math">' + maths('5+4=9\\ne') + '<span class="e01-highlight-ten">' + maths('10') + '</span></div>';
          h += "<p>اما با $x=6$، دو طرف برابر می‌شوند:</p>";
          h += '<div class="e01-ten-math">' + maths('6+4=') + '<span class="e01-highlight-ten">' + maths('10') + '</span></div>';
          h += "<div class=\"e01-thought\"><span class=\"e01-thought-icon\" aria-hidden=\"true\">✓</span><p><b>نکتهٔ بررسی جواب</b> این است که مقدار <b>هر دو طرف</b> با هم مقایسه شود؛ محاسبهٔ طرف چپ به‌تنهایی کافی نیست.</p></div>";
          h += "<h4>آزمایشگاه: بررسی جواب معادله</h4>";
          h += '<p>این بار خودت یک عدد را امتحان کن: معادله را تغییر بده و با دکمه‌های «' + maths('+1') + '» و «' + maths('-1') + '» عدد آزمایشی را انتخاب کن. سپس با «بله» یا «نه» مشخص کن که آیا دو طرف برابر می‌شوند. بعد از انتخاب، محاسبهٔ دو طرف، درستی تشخیص و عددهای بررسی‌شده نمایش داده می‌شوند.</p>';
          h += "<div id=\"e01-values\" class=\"e01-interaction\" data-activity=\"values\"></div>";
          h += "<h4>یادآوری: اتحاد و معادله چه فرقی دارند؟</h4>";
          h += "<p>در آزمایشگاه دیدیم که یک معادله فقط با بعضی مقدارهای مجهول برقرار می‌شود. در فصل قبل، اتحادهای جبری را هم شناختیم. آیا آن‌ها نیز به یک مقدار خاص وابسته‌اند؟ برای مقایسه، اتحاد مربع دوجمله‌ای و معادلهٔ $x+4=10$ را با نوار لغزنده بررسی می‌کنیم.</p>";
          h += '<div id="e01-identity-compare" class="e01-compare e01-identity-compare" data-activity="identity-compare">' +
            '<div class="e01-compare-control graduated-range">' +
            '<div class="e01-compare-head"><span>مقدار متغیر</span><strong data-identity-x></strong></div>' +
            '<input type="range" min="-4" max="8" step="1" value="1" aria-label="مقدار متغیر x برای مقایسهٔ اتحاد و معادله" data-identity-range>' +
            '<div class="e01-compare-ticks graduated-ticks" aria-hidden="true">' +
            Array.from({ length: 13 }, function (_, i) { var n = i - 4; return '<span class="' + (n === 6 ? 'e01-target-tick' : '') + '" style="--gr-step:' + i + ';--gr-total:12"><i></i>' + maths(n === 6 ? '\\mathbf{6}' : String(n)) + '</span>'; }).join('') +
            '</div></div>' +
            '<div class="e01-pairs">' +
            '<div class="e01-pair"><span>اتحاد</span><strong class="e01-formula-tag">$(x+2)^2=x^2+4x+4$</strong><div class="e01-pair-eval" data-identity-left></div><small data-identity-status>دو طرف برای هر مقدار $x$ برابرند.</small></div>' +
            '<div class="e01-pair" data-identity-equation-card><span>معادله</span><strong class="e01-formula-tag">$x+4=10$</strong><div class="e01-pair-eval" data-identity-right></div><small data-identity-equation-status aria-live="polite"></small></div>' +
            '</div></div>';
          h += "<p>در اتحاد، با تغییر $x$ دو طرف همچنان برابر می‌مانند؛ زیرا با بازکردن پرانتزِ طرف چپ، عبارتِ طرف راست به دست می‌آید. اما معادله‌ای مثل $x+4=10$، فقط برای $x=6$ برقرار است. پس اتحاد و معادله، با اینکه هر دو علامت مساوی دارند، یکسان نیستند.</p>";
          h += "<p>البته همهٔ معادله‌ها فقط یک جواب ندارند: بعضی چند جواب دارند و بعضی هیچ جوابی ندارند. فعلاً کافی است تفاوت معادله با اتحاد را بشناسیم؛ روش‌های حل را در درس‌های بعد یاد می‌گیریم.</p>";
          h += "<h4>مسابقه: تشخیص در ده ثانیه</h4>";
          h += "<p>حالا نوبت تشخیص چهار نوع نوشته‌ای است که با آن‌ها آشنا شدیم: عبارت جبری، تساوی عددی، معادله و اتحاد. در هر دور، از هر نوع یک سؤال تازه ساخته می‌شود. برای پاسخ به هر سؤال ۱۰ ثانیه فرصت داری و بعد از پاسخ یا پایان زمان، دلیل گزینهٔ درست را می‌بینی.</p>";
          h += "<div id=\"e01-types\" class=\"e01-interaction\" data-activity=\"types\"></div>";
          h += "<p>تا اینجا یاد گرفتیم معادله را از نوشته‌های دیگر تشخیص دهیم و با جایگذاری، جواب‌بودن یک عدد را بررسی کنیم. اما وقتی جواب را نمی‌دانیم، آیا باید عددها را یکی‌یکی امتحان کنیم؟</p>";
          h += "<p>راه دیگری هم وجود دارد: <b>تغییردادن معادله، بدون از دست‌دادن جواب آن.</b> پیش از یادگرفتن روش حل، باید بفهمیم چه تغییرهایی برابری را حفظ می‌کنند.</p>";
          h += K.sn('۳', 'چرا باید دو طرف تساوی را یکسان تغییر داد؟');
          h += "<p>از دو مقدار برابر شروع کنیم. اگر از هر دو طرف تساوی $10=10$ عدد ۴ کم شود، هر دو به ۶ می‌رسند:</p>";
          h += K.dm('10=10\\quad\\Longrightarrow\\quad 10-4=10-4');
          h += "<p>اگر عددی را اضافه کنیم یا دو طرف را در عددی ضرب کنیم چه می‌شود؟ اگر فقط یک طرف تغییر کند چطور؟ این حالت‌ها را در آزمایشگاه بعد امتحان می‌کنیم.</p>";
          h += "<h4>آزمایشگاه اصلی: اتاق فرمان تساوی</h4>";
          h += "<p>جواب هر معادله کنار آن نوشته شده است. عملیات و محل اجرای آن را انتخاب کن و ببین با همان جوابِ معلوم، مقدار دو طرف چه تغییری می‌کند.</p>";
          h += "<div id=\"e01-lab\" class=\"e01-interaction\" data-activity=\"control\"></div>";
          h += "<p><b>نتیجهٔ آزمایش:</b> اگر یک عملیات یکسان روی هر دو طرف انجام شود، برابری حفظ می‌شود؛ تغییر فقط یک طرف معمولاً آن را از بین می‌برد.</p>";
          h += "<p>برای نمونه، اگر از <b>هر دو طرف</b> معادله ۴ کم شود، داریم:</p>";
          h += K.dm('x+4-4=10-4\\quad\\Longrightarrow\\quad x=6');
          h += "<p>در طرف چپ، $+4$ و $-4$ همدیگر را خنثی می‌کنند و در طرف راست، $10-4$ برابر ۶ می‌شود. چون از هر دو طرف به یک اندازه کم شده، برابری از بین نمی‌رود. </p>";
          h += "<p><b>پس این روش را به خاطر بسپار؛ چون با آن می‌توان معادله را ساده‌تر کرد و به مجهول رسید.</b> روش کامل حل معادله‌های خطی در درس بعد آموزش داده می‌شود.</p>";
          h += "<div class=\"e01-small-note\"><b>یک نکتهٔ مهم:</b> تقسیم هر دو طرف بر عددی غیر از صفر، برابری را حفظ می‌کند؛ تقسیم بر صفر تعریف نشده است. ضرب هر دو طرف در صفر نیز تساوی را برقرار نگه می‌دارد، اما اطلاعات لازم برای پیداکردن مجهول را از بین می‌برد.</div>";
          h += K.box('err', 'دربارهٔ «انتقال عدد به طرف دیگر»', "<p>گاهی برای کوتاه‌کردن توضیح گفته می‌شود «عدد به طرف دیگر می‌رود و علامتش عوض می‌شود». در واقع، عددی جابه‌جا نمی‌شود. مثلاً در $x+4=10$، از هر دو طرف ۴ کم می‌شود تا $x=6$ به دست آید. همین کار است که برابری را حفظ می‌کند.</p>");
          h += K.sn('۴', 'آزمون پایانی');
          h += "<p>در آزمون پایانی، شناخت نوشته‌های ریاضی، بررسی جواب معادله با جایگذاری و تشخیص تغییرهایی که برابری را حفظ می‌کنند سنجیده می‌شود. پس از هر پاسخ، دلیل آن نمایش داده می‌شود و در پایان امکان مرور سؤال‌ها یا شروع دور جدید وجود دارد.</p>";
          h += "<div id=\"e01-final\" class=\"e01-interaction e01-final\" data-activity=\"final\"></div>";
          h += K.box('sum', 'مهارت‌های پایان درس', "<ul><li>تشخیص عبارت جبری، تساوی عددی، معادله و اتحاد، و شناخت مجهول.</li><li>بررسی جواب معادله با جایگذاری.</li><li>توضیح دلیل حفظ برابری پس از انجام عملیات یکسان روی دو طرف.</li><li>تشخیص اینکه کدام تغییرها برابری دو طرف معادله را حفظ می‌کنند.</li></ul>");
          h += "</div>";
          return h;
        },
        init: function (panel) {
          initCompare(panel.querySelector('#e01-compare'));
          initIdentityCompare(panel.querySelector('#e01-identity-compare'));
          initTypes(panel.querySelector('#e01-types'));
          initValues(panel.querySelector('#e01-values'));
          initLab(panel.querySelector('#e01-lab'));
          initFinal(panel.querySelector('#e01-final'));
        }
      };

      /* پیوند تعاملی همان دو کادر آشنای عبارت جبری و معادله؛ بدون تغییر درس‌های قبلی. */
      function initCompare(root) {
        if (!root) return;
        var slider = root.querySelector('[data-compare-range]');
        var value = root.querySelector('[data-compare-x]');
        var expression = root.querySelector('[data-compare-expression]');
        var equation = root.querySelector('[data-compare-equation]');
        var status = root.querySelector('[data-compare-status]');
        var equationCard = root.querySelector('[data-compare-equation-card]');
        function paint() {
          var x = Number(slider.value), total = 3 + x, equal = total === 8;
          var shownX = x < 0 ? '(' + x + ')' : String(x);
          var substitution = '3+' + shownX;
          value.innerHTML = maths('x=' + x);
          expression.innerHTML = maths(substitution + '=' + total);
          equation.innerHTML = maths(substitution + '=' + total + (equal ? '' : '\\ne 8'));
          status.textContent = equal ? 'دو طرف برابرند؛ این مقدار جواب معادله است.' : 'دو طرف برابر نیستند؛ این مقدار جواب معادله نیست.';
          equationCard.classList.toggle('e01-compare-match', equal);
          slider.setAttribute('aria-valuetext', f(x).replace('-', 'منفی '));
        }
        slider.addEventListener('input', paint);
        paint();
      }

      /* مقایسهٔ پویا: یک اتحاد همیشه برقرار و معادله فقط برای جواب خودش برقرار است. */
      function initIdentityCompare(root) {
        if (!root) return;
        var slider = root.querySelector('[data-identity-range]');
        var value = root.querySelector('[data-identity-x]');
        var left = root.querySelector('[data-identity-left]');
        var right = root.querySelector('[data-identity-right]');
        var status = root.querySelector('[data-identity-equation-status]');
        var equationCard = root.querySelector('[data-identity-equation-card]');
        function paint() {
          var x = Number(slider.value), l = (x + 2) * (x + 2), r = x * x + 4 * x + 4;
          var eqLeft = x + 4, equal = eqLeft === 10;
          var shown = x < 0 ? '(' + x + ')' : String(x);
          value.innerHTML = maths('x=' + x);
          left.innerHTML = '<div class="e01-identity-subvalue"><small class="e01-identity-side-label">سمت چپ</small>' + maths('(' + shown + '+2)^2=' + l) + '</div>' + '<div class="e01-identity-subvalue"><small class="e01-identity-side-label">سمت راست</small>' + maths(shown + '^2+4\\times ' + shown + '+4=' + r) + '</div>';
          right.innerHTML = maths(shown + '+4=' + eqLeft + (equal ? '=10' : '\\ne10'));
          status.textContent = equal ? 'دو طرف برابرند؛ این عدد جواب معادله است.' : 'دو طرف برابر نیستند؛ این عدد جواب معادله نیست.';
          equationCard.classList.toggle('e01-compare-match', equal);
          slider.setAttribute('aria-valuetext', f(x).replace('-', 'منفی '));
        }
        slider.addEventListener('input', paint);
        paint();
      }

      /* مسابقهٔ ده‌ثانیه‌ای تشخیص نوع نوشته: زمان واقعی، بازخورد مستقل، مرور و دور تازه. */
      function initTypes(root) {
        var labels = ['عبارت جبری', 'تساوی عددی', 'معادله', 'اتحاد'];
        // هر دور چهار نمونهٔ تازه با اعداد تصادفی؛ دسته‌بندی بر اساس مفهوم، نه بانک سؤال ثابت.
        function R(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
        function choice(a) { return a[R(0, a.length - 1)]; }
        function nonzero(a, b) { var n; do { n = R(a, b); } while (n === 0); return n; }
        function plus(n) { return n < 0 ? String(n) : '+' + n; }
        function linear(k, v, n) { return (k === 1 ? v : k === -1 ? '-' + v : k + v) + plus(n); }
        function generate(kind) {
          var v = choice(['x', 'y', 'a', 'm', 'z', 'p']), k = nonzero(-7, 7), n = R(-12, 12), t = R(-9, 9), tex, why;
          if (kind === 0) {
            tex = choice([linear(k, v, n), (k === 1 ? v : k + v) + '(' + v + plus(n) + ')', String(R(2, 9)) + '(' + v + plus(R(1, 7)) + ')']);
            why = 'در $' + tex + '$ متغیر وجود دارد، اما علامت مساوی نوشته نشده است؛ پس عبارت جبری است.';
          } else if (kind === 1) {
            var a = R(2, 18), b = R(2, 16), mode = R(0, 2);
            tex = mode === 0 ? a + '+' + b + '=' + (a + b) : mode === 1 ? (a + b) + '-' + b + '=' + a : a + '\\times' + b + '=' + (a * b);
            why = 'در $' + tex + '$ دو طرف مقدار عددی برابر دارند و مجهولی وجود ندارد؛ بنابراین تساوی عددی است.';
          } else if (kind === 2) {
            var x = R(-6, 6), c = k * x + n;
            tex = linear(k, v, n) + '=' + c;
            if (Math.random() < .5) tex = c + '=' + linear(k, v, n);
            why = 'در $' + tex + '$ مقدار $' + v + '$ باید طوری مشخص شود که برابری برقرار شود؛ این نوشته معادله است.';
          } else {
            var q = R(1, 6), d = R(1, 5), form = R(0, 2), sq = q * q;
            if (form === 0) { tex = '(' + v + '+' + q + ')^2=' + v + '^2+' + (2 * q) + v + '+' + sq; }
            else if (form === 1) { tex = '(' + v + '-' + q + ')^2=' + v + '^2-' + (2 * q) + v + '+' + sq; }
            else { tex = '(' + v + '+' + d + ')(' + v + '-' + d + ')=' + v + '^2-' + (d * d); }
            why = 'در $' + tex + '$ دو طرف به کمک اتحادهای آموخته‌شده برای هر مقدار $' + v + '$ برابرند؛ پس اتحاد است.';
          }
          return { tex: tex, a: kind, why: why };
        }
        var duration = 10000, questions = [], responses = [], current = 0, state = 'ready', prior = [], timer = null, deadline = 0, left = duration;
        function shuffle(arr) {
          for (var i = arr.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = arr[i]; arr[i] = arr[j]; arr[j] = t; }
          return arr;
        }
        function stopTimer() { if (timer !== null) { clearInterval(timer); timer = null; } }
        function newRound() {
          stopTimer();
          // در هر دور، یک عبارت نو از هر چهار دسته ساخته می‌شود؛ از تکرار دور قبل نیز پرهیز می‌شود.
          questions = [];
          for (var kind = 0; kind < 4; kind++) {
            var q, tries = 0;
            do { q = generate(kind); tries++; } while (prior.includes(q.tex) && tries < 100);
            questions.push(q);
          }
          prior = questions.map(function (q) { return q.tex; });
          shuffle(questions);
          responses = questions.map(function () { return { choice: null, timedOut: false, remaining: duration }; });
          current = 0; left = duration; state = 'ready'; render();
        }
        function scrollToContest() {
          window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
              var target = root.querySelector('.e01-type-progress') || root.querySelector('.e01-speed-start') || root.querySelector('.e01-types-result');
              if (!target || !root.contains(target) || !target.getClientRects().length) return;
              window.scrollTo({ top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - 80), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
            });
          });
        }
        function faClock(ms) {
          var t = Math.max(0, Math.ceil(ms / 100));
          return f(Math.floor(t / 10)) + '٫' + f(t % 10);
        }
        function drawTime() {
          var track = root.querySelector('[data-speed-fill]'), num = root.querySelector('[data-speed-time]'), wrap = root.querySelector('.e01-speed-timer');
          if (!track || !num || !wrap) return;
          track.style.width = (100 * Math.max(0, left) / duration) + '%';
          num.textContent = faClock(left);
          wrap.classList.toggle('e01-speed-urgent', left <= 2000);
        }
        function tick() {
          if (state !== 'playing' || responses[current].choice !== null || responses[current].timedOut) { stopTimer(); return; }
          if (!root.isConnected) { stopTimer(); return; }
          left = Math.max(0, deadline - Date.now());
          if (left <= 0) { expire(); return; }
          drawTime();
        }
        function startClock() {
          stopTimer(); left = duration; deadline = Date.now() + duration;
          render();
          drawTime();
          timer = setInterval(tick, 50);
        }
        function expire() {
          if (state !== 'playing' || responses[current].choice !== null || responses[current].timedOut) return;
          stopTimer(); left = 0;
          responses[current].remaining = 0;
          responses[current].timedOut = true;
          render();
        }
        function choose(value) {
          if (state !== 'playing' || responses[current].choice !== null || responses[current].timedOut) return;
          if (Date.now() >= deadline) { expire(); return; }
          left = Math.max(0, deadline - Date.now());
          responses[current].choice = value;
          responses[current].remaining = left;
          stopTimer(); render();
        }
        function counts() {
          return responses.reduce(function (c, r, i) {
            if (r.timedOut) c.missed++;
            else if (r.choice !== null) { if (r.choice === questions[i].a) c.correct++; else c.wrong++; }
            return c;
          }, { correct: 0, wrong: 0, missed: 0 });
        }
        function progress() {
          return '<div class="stg e01-type-progress" aria-label="پیشرفت مسابقه">' + questions.map(function (q, i) {
            var r = responses[i], status = i === current ? 'cu' : (r.timedOut ? 'e01-missed' : (r.choice !== null ? (r.choice === q.a ? 'dn' : 'wr') : ''));
            return '<span class="' + status + '" aria-label="سؤال ' + f(i + 1) + '">' + f(i + 1) + '</span>';
          }).join('') + '</div>';
        }
        function render() {
          if (state === 'ready') {
            root.innerHTML = '<div class="e01-speed-start">' +
              '' +
              '<p>در هر دور، چهار نوشتهٔ ریاضی نمایش داده می‌شود.<span class="e01-speed-instructions-line">برای هر نوشته، ' + maths('10') + ' ثانیه فرصت برای انتخاب یکی از چهار گزینه وجود دارد.</span></p>' +
              '<div class="e01-speed-rules"><span><b>' + f(4) + '</b> سؤال</span><span><b>' + f(10) + '</b> ثانیه برای هر سؤال</span><span><b>' + f(4) + '</b> گزینه</span></div>' +
              '<p class="e01-speed-ready-note">با شروع مسابقه، سؤال اول و زمان‌سنج هم‌زمان ظاهر می‌شوند.</p>' +
              '<button type="button" class="btn primary e01-speed-start-button" data-types-start>شروع مسابقه</button></div>';
            return;
          }
          if (state === 'result') {
            var c = counts();
            root.innerHTML = '<div class="e01-types-result"><span class="e01-eyebrow">مسابقه به پایان رسید</span>' +
              '<h5>نتیجهٔ چهار سؤال</h5><div class="e01-speed-score">' + f(c.correct) + ' <small>از ' + f(questions.length) + ' پاسخ درست</small></div>' +
              '<div class="e01-speed-stats"><span class="e01-speed-good">درست: <b>' + f(c.correct) + '</b></span>' +
              '<span class="e01-speed-bad">نادرست: <b>' + f(c.wrong) + '</b></span>' +
              '<span>بی‌پاسخ: <b>' + f(c.missed) + '</b></span></div>' +
              '<p class="e01-finish-message">' + (c.correct === 4 ? 'هر چهار نوشته درست تشخیص داده شد.' : c.correct >= 2 ? 'دلیل هر پاسخ در بخش «مرور سؤال‌ها» نمایش داده می‌شود.' : 'مرور سؤال‌ها به تشخیص بهتر عبارت جبری، تساوی عددی، معادله و اتحاد کمک می‌کند.') + '</p></div>' +
              '<div class="opts end-actions e01-speed-end-actions"><button type="button" class="btn" data-types-review data-scroll>مرور سؤال‌ها</button>' +
              '<button type="button" class="btn primary" data-types-restart data-scroll>سؤال‌های جدید</button></div>';
            return;
          }
          var reviewing = state === 'review', q = questions[current], r = responses[current], answered = r.choice !== null || r.timedOut;
          var showingTime = reviewing ? r.remaining : (answered ? r.remaining : left);
          var quiz = '<div class="e01-speed-quiz">' + progress() +
            '<p class="ask e01-question">نوشتهٔ ' + maths(q.tex) + ' از چه نوعی است؟</p>' +
            (reviewing ? '<p class="e01-review-hint">در بخش مرور، زمان‌سنج فعال نیست.</p>' :
              '<div class="e01-speed-timer' + (showingTime <= 2000 ? ' e01-speed-urgent' : '') + '" role="timer" aria-label="زمان باقی‌مانده">' +
              '<div class="e01-speed-timer-line"><span>' + (answered ? (r.timedOut ? 'زمان این سؤال تمام شد' : 'زمان باقی‌مانده') : 'زمان باقی‌مانده') + '</span>' +
              '<strong><span data-speed-time>' + faClock(showingTime) + '</span> <small>ثانیه</small></strong></div>' +
              '<div class="e01-speed-track" aria-hidden="true"><span data-speed-fill style="width:' + (100 * showingTime / duration) + '%"></span></div></div>') +
            '<div class="e01-choices e01-four">' + labels.map(function (label, i) {
              return '<button type="button" class="btn e01-option' + (answered && i === q.a ? ' e01-right' : '') + (answered && i === r.choice && i !== q.a ? ' e01-wrong' : '') + '" data-type="' + i + '" ' + (answered || reviewing ? 'disabled' : '') + '>' + label + '</button>';
            }).join('') + '</div>' +
            (answered ? (r.timedOut ? feedback(false, 'زمان تمام شد؛ این سؤال بی‌پاسخ ماند.', 'پاسخ درست: <b>' + labels[q.a] + '</b>. ' + q.why) :
              feedback(r.choice === q.a, r.choice === q.a ? 'پاسخ درست است.' : 'پاسخ نادرست است.',
                (r.choice === q.a ? '' : 'پاسخ درست: <b>' + labels[q.a] + '</b>. ') + q.why)) : '') +
            '<div class="e01-navigation">' +
            (reviewing ? '<button type="button" class="btn" data-type-prev ' + (current === 0 ? 'disabled' : '') + ' data-scroll>سؤال قبلی</button>' : '<span class="e01-speed-nav-placeholder" aria-hidden="true"></span>') +
            '<button type="button" class="btn primary" data-type-next data-scroll ' +
            (current === questions.length - 1 ? (reviewing ? 'data-scroll-offset="250"' : 'data-scroll-offset="250"') : 'سؤال بعدی') +
            (!answered && !reviewing ? 'disabled' : '') + '>' +
            (current === questions.length - 1 ? (reviewing ? 'بازگشت به نتیجه' : 'مشاهدهٔ نتیجه') : 'سؤال بعدی') + '</button></div></div>';
          root.innerHTML = quiz;
        }
        root.addEventListener('click', function (e) {
          var b = e.target.closest('button'); if (!b || b.disabled || !root.contains(b)) return;
          if (b.hasAttribute('data-types-start') && state === 'ready') {
            state = 'playing'; current = 0; startClock(); scrollToContest(); return;
          }
          if (b.hasAttribute('data-type')) { choose(+b.dataset.type); return; }
          if (b.hasAttribute('data-type-prev') && state === 'review') {
            current = Math.max(0, current - 1); render(); scrollToContest(); return;
          }
          if (b.hasAttribute('data-type-next')) {
            if (state === 'review') {
              if (current < questions.length - 1) { current++; render(); }
              else { state = 'result'; render(); }
            } else if (state === 'playing' && (responses[current].choice !== null || responses[current].timedOut)) {
              if (current < questions.length - 1) { current++; startClock(); }
              else { stopTimer(); state = 'result'; render(); }
            }
            scrollToContest(); return;
          }
          if (b.hasAttribute('data-types-review') && state === 'result') {
            state = 'review'; current = 0; render(); scrollToContest(); return;
          }
          if (b.hasAttribute('data-types-restart') && state === 'result') {
            newRound(); scrollToContest();
          }
        });
        newRound();
      }

      /* بررسی جواب: انتخاب پاسخ، نمایش محاسبات و تعویض معادله. */
      function initValues(root) {
        var constraints = { a: [1, 4], b: [0, 8], x: [1, 9], c: [3, 28] };
        var q = window.LinearValues.equation(constraints), x = 5, prediction = null, discoveries = {}, serial = 0;
        function freshEquation() {
          var previous = q, next, tries = 0;
          do { next = window.LinearValues.equation(constraints); tries++; }
          while (tries < 12 && next.a === previous.a && next.b === previous.b && next.c === previous.c);
          q = next; serial++; prediction = null;
        }
        function form(q) { return (q.a === 1 ? '' : String(q.a)) + 'x+' + q.b; }
        function target(q) { return form(q) + '=' + q.c; }
        function paint() {
          var left = q.a * x + q.b, equal = left === q.c;
          var revealed = prediction !== null, right = equal ? '=' : '\\ne';
          var xMath = maths('x=' + x), equation = maths(target(q));
          root.innerHTML =
            '<div class="e01-values-question">آیا عدد ' + xMath + ' جواب معادلهٔ ' + equation + ' است؟</div>' +
            '<div class="e01-values-top">' +
            '<div class="e01-values-controls"><span>مقدار آزمایشی</span><div class="e01-spinner" dir="ltr"><button type="button" class="btn" data-minus ' + (x <= 0 ? 'disabled' : '') + ' aria-label="یک واحد کمتر">' + maths('-1') + '</button><output aria-label="مقدار x">' + xMath + '</output><button type="button" class="btn" data-plus ' + (x >= 12 ? 'disabled' : '') + ' aria-label="یک واحد بیشتر">' + maths('+') + '</button></div></div>' +
            '<div class="e01-values-equation"><span>معادله</span><div class="e01-values-equation-row"><strong>' + equation + '</strong><button type="button" class="btn primary e01-equation-change" data-equation aria-label="تغییر معادله" title="معادلهٔ جدید"><svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 0 0-14.4-4.8L3 9"/><path d="M3 4v5h5"/><path d="M4 13a8 8 0 0 0 14.4 4.8L21 15"/><path d="M21 20v-5h-5"/></svg></button></div></div>' +
            '</div>' +
            '<div class="e01-values-sides">' +
            '<div class="e01-values-side e01-values-left"><h5>طرف چپ</h5><div class="e01-values-side-line"><span>قبل از جایگذاری:</span><strong>' + maths(form(q)) + '</strong></div><div class="e01-values-side-line"><span>بعد از جایگذاری:</span><strong>' + (revealed ? maths((q.a === 1 ? '' : q.a + '\\times') + x + '+' + q.b + '=' + left) : '<span class="e01-values-unknown">؟</span>') + '</strong></div></div>' +
            '<div class="e01-values-equal-sign">' + maths(revealed ? right : '=') + '</div>' +
            '<div class="e01-values-side e01-values-right"><h5>طرف راست</h5><div class="e01-values-side-line"><span>قبل از جایگذاری:</span><strong>' + maths(String(q.c)) + '</strong></div><div class="e01-values-side-line"><span>بعد از جایگذاری:</span><strong>' + (revealed ? maths(String(q.c)) : '<span class="e01-values-unknown">؟</span>') + '</strong></div></div>' +
            '</div>' +
            '<p class="e01-values-predict">آیا عدد انتخاب‌شده جواب معادله است؟</p>' +
            '<div class="e01-choices">' + buttons([{ label: 'بله، جواب است', value: 'yes' }, { label: 'نه، جواب نیست', value: 'no' }], prediction, 'data-guess', 'e01-value-answer') + '</div>' +
            (revealed ? feedback((prediction === 'yes') === equal, ((prediction === 'yes') === equal ? 'تشخیص درست بود.' : 'تشخیص نادرست بود.') + (equal ? ' این عدد جواب معادله است.' : ' این عدد جواب معادله نیست.'), 'با جایگذاری $x=' + x + '$، طرف چپ برابر $' + left + '$ و طرف راست برابر $' + q.c + '$ می‌شود. بنابراین $' + left + (equal ? '=' : '\\ne') + q.c + '$.') : '') +
            '<div class="e01-visited"><b>عددهای بررسی‌شده:</b> ' + (Object.keys(discoveries).length ? Object.keys(discoveries).map(function (key) { var v = discoveries[key]; return '<span class="' + 'e01-record ' + (v.correct ? 'e01-record-correct' : 'e01-record-incorrect') + '" title="' + (v.actual ? 'عدد جواب است' : 'عدد جواب نیست') + '">' + maths('x=' + v.x) + ' (' + maths(v.equation) + ') ' + '<b class="e01-record-mark" title="' + (v.actual ? 'عدد جواب است' : 'عدد جواب نیست') + '">' + (v.actual ? '✓' : '×') + '</b></span>'; }).join('') : 'هنوز عددی بررسی نشده است.') + '</div>';
        }
        root.addEventListener('click', function (e) {
          var b = e.target.closest('button'); if (!b || b.disabled) return;
          if (b.hasAttribute('data-minus') && x > 0) { x--; prediction = null; }
          else if (b.hasAttribute('data-plus') && x < 12) { x++; prediction = null; }
          else if (b.hasAttribute('data-equation')) { freshEquation(); }
          else if (b.hasAttribute('data-guess')) {
            prediction = b.dataset.guess;
            var actual = q.a * x + q.b === q.c;
            discoveries[serial + ':' + x] = { x: x, equation: target(q), actual: actual, correct: (prediction === 'yes') === actual };
          }
          paint();
        });
        paint();
      }

      /* اتاق فرمان: با جواب معلوم، اثر عملیات روی یک‌طرف یا دو طرف بررسی می‌شود. */
      function initLab(root) {
        var constraints = { a: [1, 3], b: [-6, 6], x: [-5, 5], c: [-12, 12] };
        var modes = [{ value: 'both', label: 'هر دو طرف' }, { value: 'right', label: 'فقط طرف راست' }, { value: 'left', label: 'فقط طرف چپ' }];
        var ops = [{ value: 'sub', label: maths('-4') }, { value: 'add', label: maths('+3') }, { value: 'mul', label: maths('\\times 2') }];
        var axis = { min: -30, max: 30 };
        var mode = 'both', op = 'sub', run = null;
        var q = freshEquation(null);

        function freshEquation(previous) {
          var next, tries = 0;
          do { next = window.LinearValues.equation(constraints); tries++; }
          while (previous && tries < 12 && next.a === previous.a && next.b === previous.b && next.c === previous.c);
          return next;
        }
        function term(q) {
          var lead = q.a === 1 ? 'x' : String(q.a) + 'x';
          if (!q.b) return lead;
          return lead + (q.b > 0 ? '+' : '') + q.b;
        }
        function equationTex(q) { return term(q) + '=' + q.c; }
        function apply(n, operation) { return operation === 'sub' ? n - 4 : (operation === 'add' ? n + 3 : n * 2); }
        function texExpr(old, operation) { return operation === 'sub' ? old + '-4' : (operation === 'add' ? old + '+3' : '2\\times\\left(' + old + '\\right)'); }
        function clamp(v) { return Math.max(axis.min, Math.min(axis.max, v)); }
        function pct(v) { return ((clamp(v) - axis.min) / (axis.max - axis.min)) * 100; }
        function ticks() {
          return '<span class="e01-gauge-tick is-start">' + maths(String(axis.min)) + '</span>' +
            '<span class="e01-gauge-tick is-zero">' + maths('0') + '</span>' +
            '<span class="e01-gauge-tick is-end">' + maths('+' + axis.max) + '</span>';
        }
        function gauge(title, value, formula, accent) {
          var position = pct(value);
          return '<div class="e01-gauge">' +
            '<div class="e01-gauge-title"><span>' + title + '</span></div>' +
            '<div class="e01-gauge-track ' + accent + '">' +
            '<div class="e01-gauge-fill" style="left:' + Math.min(50, position) + '%;width:' + Math.abs(position - 50) + '%"></div>' +
            '<div class="e01-gauge-bubble" style="left:' + position + '%">' + maths(String(value)) + '</div>' +
            '<div class="e01-gauge-knob" style="left:' + position + '%"></div>' +
            '</div>' +
            '<div class="e01-gauge-ticks">' + ticks() + '</div>' +
            '<div class="e01-formula">' + maths(formula) + '</div>' +
            '</div>';
        }
        function icon(ok) { return ok ? '✓' : '×'; }
        function renderEquationLine(equal, tex) {
          return '<div class="e01-lab-equation-line ' + (equal ? 'is-equal' : 'is-notequal') + '">' +
            '<span class="e01-lab-equation-mark" aria-hidden="true">' + icon(equal) + '</span>' +
            '<span class="e01-lab-equation-text">' + maths(tex) + '</span>' +
            '</div>';
        }
        function computeRun() {
          var base = q.c;
          var leftVal = (mode === 'right') ? base : apply(base, op);
          var rightVal = (mode === 'left') ? base : apply(base, op);
          var leftExpr = (mode === 'right') ? term(q) : texExpr(term(q), op);
          var rightExpr = (mode === 'left') ? String(q.c) : texExpr(String(q.c), op);
          return {
            l: leftVal,
            r: rightVal,
            lt: leftExpr,
            rt: rightExpr,
            equal: leftVal === rightVal,
            display: leftExpr + '=' + rightExpr
          };
        }
        function paint() {
          var display = run || { l: q.c, r: q.c, lt: term(q), rt: String(q.c), equal: true, display: equationTex(q) };
          var answer = maths('x=' + q.solution);
          root.innerHTML =
            '<div class="e01-station-head">' +
            '<div><h5>چه زمانی برابری حفظ می‌شود؟</h5></div>' +
            '<div class="e01-station-equation">' +
            '<span class="e01-chip">' + maths(equationTex(q)) + ' <span class="e01-chip-answer">(' + maths('x=' + q.solution) + ')</span></span>' +
            '<button type="button" class="btn primary e01-station-refresh" data-refresh aria-label="تغییر معادله" title="معادلهٔ جدید"><svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 0 0-14.4-4.8L3 9"/><path d="M3 4v5h5"/><path d="M4 13a8 8 0 0 0 14.4 4.8L21 15"/><path d="M21 20v-5h-5"/></svg></button>' +
            '</div>' +
            '</div>' +
            '<div class="e01-lab-caption">نقطهٔ شروع: وقتی ' + answer + ' باشد، هر دو طرف برابر ' + maths(String(q.c)) + ' هستند.</div>' +
            '<div class="e01-lab-groups">' +
            '<fieldset><legend>۱. انتخاب عملیات</legend><div class="e01-choices">' + buttons(ops, op, 'data-op', 'e01-operation') + '</div></fieldset>' +
            '<fieldset><legend>۲. محل اجرای عملیات</legend><div class="e01-choices">' + buttons(modes, mode, 'data-mode', 'e01-mode-choice') + '</div></fieldset>' +
            '</div>' +
            '<div class="e01-lab-readout">' +
            gauge('طرف چپ برای ' + maths('x=' + q.solution), display.l, '{' + display.lt + '}_{|x=' + q.solution + '}=' + display.l, 'is-left') +
            gauge('طرف راست برای ' + maths('x=' + q.solution), display.r, display.rt + '=' + display.r, 'is-right') +
            '</div>' +
            renderEquationLine(display.equal, '{' + display.lt + '}_{|x=' + q.solution + '}=' + display.l + (display.equal ? '' : '\\ne ' + display.r)) +
            '<div class="e01-lab-status ' + (run ? (display.equal ? 'e01-balance-ok' : 'e01-balance-no') : '') + '">' +
            (run ? (display.equal ? 'پس از این تغییر، همان جواب هنوز برابری را برقرار می‌کند.' : 'پس از این تغییر، همان جواب دیگر برابری را برقرار نمی‌کند.') : 'پیش از انجام عملیات، دو طرف برابرند.') +
            '</div>' +
            '<div class="e01-main-action"><button type="button" class="btn primary" data-run>اجرای عملیات</button></div>' +
            (run ? feedback(run.equal, run.equal ? 'برابری حفظ شد.' : 'برابری حفظ نشد.',
              'با جایگذاری ' + maths('x=' + q.solution) + '، طرف چپ برابر ' + maths(String(run.l)) + ' و طرف راست برابر ' + maths(String(run.r)) + ' می‌شود. ' +
              (run.equal ? 'انجام یک عملیات یکسان روی هر دو طرف، برابری را حفظ کرده است.' : 'عملیات فقط روی یکی از دو طرف انجام شده و مقدارها دیگر برابر نیستند.')) :
              '<div class="e01-placeholder">پس از اجرای عملیات، اثر آن روی دو طرف نمایش داده می‌شود.</div>');
        }
        root.addEventListener('click', function (e) {
          var b = e.target.closest('button'); if (!b || b.disabled) return;
          if (b.hasAttribute('data-refresh')) { q = freshEquation(q); run = null; }
          else if (b.hasAttribute('data-op')) { op = b.dataset.op; run = null; }
          else if (b.hasAttribute('data-mode')) { mode = b.dataset.mode; run = null; }
          else if (b.hasAttribute('data-run')) { run = computeRun(); }
          paint();
        });
        paint();
      }

      /* بانک پرسش پایانی ـ بدون تکرار مکانیکی فعالیت‌ها */
      function initFinal(root) {
        /* هر قالب، محتوای ریاضی تازه می‌سازد؛ نه انتخاب از سؤال‌های آماده. */
        function rnd(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }
        function one(xs) { return xs[rnd(0, xs.length - 1)]; }
        function nz(lo, hi) { var v; do { v = rnd(lo, hi); } while (v === 0); return v; }
        function tex(n) { return n < 0 ? '(' + n + ')' : String(n); }
        function add(n) { return n < 0 ? String(n) : '+' + n; }
        function eq(v, b, c) { return v + add(b) + '=' + c; }
        function mc(question, options, correct, why) {
          var entries = options.map(function (o, i) { return { text: o, yes: i === correct }; });
          for (var i = entries.length - 1; i > 0; i--) { var j = rnd(0, i), t = entries[i]; entries[i] = entries[j]; entries[j] = t; }
          return { q: question, o: entries.map(function (e) { return e.text; }), a: entries.findIndex(function (e) { return e.yes; }), why: why };
        }
        var makers = [
          function () {
            var v = one(['x', 'y', 'a', 'm']), b = nz(-8, 8), x = rnd(-7, 9), c = x + b;
            return mc('کدام نوشته یک معادله است؟', ['$' + v + add(b) + '$', '$' + eq(v, b, c) + '$', '$' + rnd(2, 9) + '+' + rnd(2, 9) + '$', '$' + (c + 2) + '=' + (c + 2) + '$'], 1, 'در معادله، یک تساوی با مجهول وجود دارد؛ در اینجا $' + v + '$ مجهول است.');
          },
          function () {
            var v = one(['x', 'y', 'a', 't']), a = rnd(2, 7), b = rnd(1, 9), x = rnd(1, 7), c = a * x + b;
            return mc('در معادلهٔ $' + a + v + '+' + b + '=' + c + '$، مجهول کدام است؟', ['$' + a + '$', '$' + c + '$', '$' + v + '$', '$' + b + '$'], 2, 'حرف $' + v + '$ مجهول است؛ ' + a + ' ضریب آن است.');
          },
          function () {
            var v = one(['x', 'y', 'n']), b = nz(-7, 8), x = rnd(-5, 8), c = x + b;
            return mc('کدام مقدار، معادلهٔ $' + eq(v, b, c) + '$ را برقرار می‌کند؟', ['$' + v + '=' + x + '$', '$' + v + '=' + (x + 1) + '$', '$' + v + '=' + (x - 2) + '$', '$' + v + '=' + (x + 3) + '$'], 0, 'با جایگذاری $' + v + '=' + x + '$، دو طرف برابر $' + c + '$ می‌شوند.');
          },
          function () {
            var l = rnd(-12, 12), r = l + nz(1, 5);
            return mc('اگر با جایگذاری یک عدد، طرف چپ معادله $' + l + '$ و طرف راست $' + r + '$ شود، آیا آن عدد جواب است؟', ['بله؛ حتماً جواب است', 'خیر؛ جواب نیست', 'هر عددی جواب است', 'به علامت مجهول بستگی دارد'], 1, 'چون $' + l + '\\ne ' + r + '$، این عدد جواب نیست.');
          },
          function () {
            var v = one(['x', 'y']), b = rnd(2, 8), x = rnd(1, 7), c = b + x;
            return mc('برای حفظ برابریِ $' + eq(v, b, c) + '$، کدام تغییر درست است؟', ['فقط از طرف چپ $' + b + '$ کم کنیم', 'فقط به طرف راست $' + b + '$ اضافه کنیم', 'از هر دو طرف $' + b + '$ کم کنیم', 'فقط طرف راست را دو برابر کنیم'], 2, 'کم‌کردن $' + b + '$ از هر دو طرف، مقدار برابری دو طرف را حفظ می‌کند.');
          },
          function () {
            var v = one(['x', 'y']), b = rnd(1, 7), x = rnd(1, 6), c = x + b, k = rnd(2, 4);
            return mc('از $' + eq(v, b, c) + '$ کدام تساوی حتماً نتیجه می‌شود؟', ['$' + k + '(' + v + '+' + b + ')=' + c + '$', '$' + k + '(' + v + '+' + b + ')=' + (k * c) + '$', '$' + v + '+' + b + '+' + k + '=' + c + '$', '$' + v + '=' + c + '+' + b + '$'], 1, 'با ضرب هر دو طرف در $' + k + '$، رابطهٔ $' + k + '(' + v + '+' + b + ')=' + (k * c) + '$ به دست می‌آید.');
          },
          function () {
            var a = one(['a', 'm', 'p']), b = one(['b', 'n', 'q']), k = rnd(2, 9), j = rnd(2, 7);
            return mc('می‌دانیم $' + a + '=' + b + '$؛ کدام کار همیشه تساوی را حفظ می‌کند؟', ['افزودن $' + k + '$ فقط به $' + a + '$', 'کم‌کردن $' + j + '$ فقط از $' + b + '$', 'افزودن $' + k + '$ به هر دو طرف', 'دو برابرکردن فقط $' + a + '$'], 2, 'انجام یک عمل یکسان روی هر دو طرف، برابری را حفظ می‌کند.');
          },
          function () {
            var v = one(['x', 't']), b = rnd(2, 9), x = rnd(2, 8), c = b + x;
            return mc('آیا تبدیل $' + eq(v, b, c) + '$ به $' + v + '+' + b + '-' + b + '=' + c + '-' + b + '$ درست است؟', ['بله؛ از هر دو طرف $' + b + '$ کم شده', 'نه؛ فقط سمت چپ تغییر کرده', 'نه؛ باید به دو طرف $' + b + '$ اضافه کرد', 'نه؛ چون مجهول معلوم نیست'], 0, 'از هر دو طرف $' + b + '$ کم شده و جواب معادله تغییر نمی‌کند.');
          },
          function () {
            var v = one(['x', 'y']), a = rnd(2, 5), x = rnd(1, 6), b = rnd(1, 6), c = a * x + b;
            return mc('اگر $' + v + '=' + x + '$ را در $' + a + v + '+' + b + '=' + c + '$ جایگذاری کنیم، چه می‌شود؟', ['طرف چپ $' + (c - 1) + '$ و راست $' + c + '$ می‌شود', 'هر دو طرف $' + c + '$ می‌شوند', 'طرف چپ $' + (c + 1) + '$ و راست $' + c + '$ می‌شود', 'نمی‌توان نتیجه را بررسی کرد'], 1, 'طرف چپ $' + a + '\\times' + x + '+' + b + '=' + c + '$ است و با طرف راست برابر می‌شود.');
          },
          function () {
            var a = rnd(3, 19), b = rnd(3, 19);
            return mc('در تساوی $' + a + '+' + b + '=' + (a + b) + '$، علامت مساوی چه معنایی دارد؟', ['یعنی پاسخ همیشه در سمت راست است', 'یعنی هر نوشته‌ای مجهول دارد', 'یعنی مقدار دو طرف برابر است', 'یعنی باید طرف چپ را تغییر داد'], 2, 'علامت مساوی نشان می‌دهد دو طرف مقدار یکسان دارند.');
          },
          function () {
            var v = one(['x', 'y']), b = rnd(1, 7), x = rnd(1, 7), c = x + b, k = rnd(2, 5);
            return mc('در معادلهٔ $' + eq(v, b, c) + '$ کدام تغییر نادرست است؟', ['$' + v + '+' + b + '+' + k + '=' + c + '+' + k + '$', '$' + k + '(' + v + '+' + b + ')=' + (k * c) + '$', '$' + v + '+' + b + '-' + k + '=' + c + '-' + k + '$', '$' + v + '+' + b + '+' + k + '=' + c + '$'], 3, 'در گزینهٔ نادرست فقط به طرف چپ $' + k + '$ اضافه شده است.');
          },
          function () {
            var a = rnd(4, 15), k = rnd(2, 5), p = a * k;
            return mc('در تساوی $' + a + '=' + a + '$، اگر هر دو طرف را در $' + k + '$ ضرب کنیم چه می‌شود؟', ['$' + p + '=' + a + '$', '$' + a + '=' + p + '$', '$' + p + '=' + p + '$', '$' + (p + 1) + '=' + (p + 1) + '$'], 2, 'هر دو طرف برابر $' + p + '$ می‌شوند؛ پس تساوی جدید $' + p + '=' + p + '$ است.');
          }
        ];
        var q = [], answers = [], pos = 0, finished = false, reviewing = false, seen = '';
        function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
        function nextSet() {
          var chosen, keys, attempt = 0;
          /* در هر دور: دو سؤال شناخت، دو سؤال معنای جواب، دو سؤال حفظ تساوی. */
          var groups = [[0, 1, 9], [2, 3, 8], [4, 5, 6, 7, 10, 11]];
          do {
            keys = [];
            groups.forEach(function (group) { keys = keys.concat(shuffle(group.slice()).slice(0, 2)); });
            keys = shuffle(keys); chosen = keys.join(','); attempt++;
          } while (chosen === seen && attempt < 6);
          seen = chosen;
          q = keys.map(function (k) { return makers[k](); }); answers = q.map(function () { return null; }); pos = 0; finished = false; reviewing = false; paint();
        }
        function paint() {
          if (finished && !reviewing) {
            var score = answers.reduce(function (s, a, i) { return s + (a === q[i].a ? 1 : 0); }, 0);
            root.innerHTML = '<div class="fb ' + (score >= 4 ? 'ok' : 'bad') + '" role="status"><b>نتیجه: ' + f(score) + ' از ' + f(q.length) + '</b><br>' +
              (score === 6 ? 'همهٔ سؤال‌ها را درست پاسخ دادی.' : score >= 4 ? 'سؤال‌هایی را که اشتباه کردی مرور کن و دلیل هر پاسخ را بررسی کن.' : 'یک بار دیگر درس را مرور کن؛ سپس با سؤال‌های تازه تمرین کن.') + '</div>' +
              '<div class="opts end-actions"><button type="button" class="btn" data-review data-scroll>مرور سؤال‌ها</button><button type="button" class="btn primary" data-new-set data-scroll>سؤال‌های جدید</button></div>';
            return;
          }
          var item = q[pos], choice = answers[pos];
          root.innerHTML =
            '<div class="e01-progress stg" aria-label="پیشرفت تمرین">' + q.map(function (v, i) { return '<span class="' + (i === pos ? 'cu' : (answers[i] !== null ? (answers[i] === v.a ? 'dn' : 'wr') : '')) + '" aria-label="سؤال ' + f(i + 1) + '">' + f(i + 1) + '</span>'; }).join('') + '</div>' +
            '<p class="ask e01-question">' + rich(item.q) + '</p>' +
            '<div class="e01-answer-grid">' + item.o.map(function (t, i) { return '<button type="button" class="btn e01-answer' + (choice !== null ? (i === item.a ? ' e01-right' : i === choice ? ' e01-wrong' : '') : '') + '" data-answer="' + i + '" ' + (choice !== null ? 'disabled' : '') + '>' + rich(t) + '</button>'; }).join('') + '</div>' +
            (choice === null ? '' : feedback(choice === item.a, 'پاسخ ' + (choice === item.a ? 'درست است.' : 'درست نیست.'), item.why)) +
            (reviewing ? '<div class="e01-inline-result">در حالت مرور، پاسخ‌های این دور تغییر نمی‌کنند.</div>' : '') +
            '<div class="e01-navigation"><button type="button" class="btn" data-final-prev ' + (pos === 0 ? 'disabled' : '') + ' data-scroll>سؤال قبلی</button><button type="button" class="btn primary" data-final-next ' + (choice === null ? 'disabled' : '') + ' data-scroll>' + (pos === q.length - 1 ? (reviewing ? 'بازگشت به نتیجه' : 'مشاهدهٔ نتیجه') : 'سؤال بعدی') + '</button></div>';
        }
        root.addEventListener('click', function (e) {
          var b = e.target.closest('button'); if (!b || b.disabled) return;
          if (b.hasAttribute('data-answer') && !finished) { if (answers[pos] === null) { answers[pos] = +b.dataset.answer; paint(); } return; }
          if (b.hasAttribute('data-final-prev')) { pos = Math.max(0, pos - 1); paint(); scroll(); return; }
          if (b.hasAttribute('data-final-next')) {
            if (pos < q.length - 1) { pos++; paint(); scroll(); }
            else { finished = true; reviewing = false; paint(); scroll(); }
            return;
          }
          if (b.hasAttribute('data-review')) { reviewing = true; pos = 0; paint(); scroll(); return; }
          if (b.hasAttribute('data-new-set')) { nextSet(); scroll(); }
        });
        function scroll() {
          /* مقصد اختصاصی و پایدار؛ پیمایش پس از بازسازی کامل DOM همان فعالیت. */
          window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
              var target = root.querySelector('.e01-progress') || root.querySelector('.fb') || root.querySelector('.e01-station-head');
              if (!target || !root.contains(target) || !target.getClientRects().length) return;
              window.scrollTo({ top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - 80), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
            });
          });
        }
        nextSet();
      }
    }
  };
})();
