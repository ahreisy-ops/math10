/* مثال‌های حل‌شدهٔ گام‌به‌گام («سه مسئله، سه حل»، «مثال حل‌شده») — مشترک چند درس.
   استفاده: K.exampleSteps.html(id, EX, dlgTitle, title, mode) در html درس، و K.exampleSteps.bind(id, EX, mode) در init.
   EX: [{title, q?, lines:[TeX...], note}] — خطی که با @ شروع شود HTML آزاد است (کلاس e3-exline). EX در html می‌تواند فقط تعداد گام‌ها باشد.
   title اختیاری است؛ mode اختیاری: بدون mode ظاهر «سه مسئله، سه حل» (مثال n از N)، mode='steps' ظاهر «مثال حل‌شده» با برچسب گام (گام n از N).
   مستقل از فصل و بخش؛ ظاهر در course-shared-ch5.css (زیر کلاس بستهٔ .exs) */
(function () {
  'use strict';
  var K0 = window.CourseKit, ML = window.MathLite, fa = ML.fa, rr = ML.renderRich, M = K0._u.M;

  var DEF = { title: 'سه مسئله، سه حل', label: '', unit: 'مثال', chip: false, prev: 'مثال قبلی', next: 'مثال بعدی', all: 'مشاهدهٔ همهٔ حل‌ها', scroll: ' data-scroll=".e02-example-top"', tall: false, act: ' data-activity' };
  var MODES = { steps: { title: 'مثال حل‌شده', label: 'حل گام‌به‌گام مثال', unit: 'گام', chip: true, prev: 'مرحلهٔ قبلی', next: 'مرحلهٔ بعدی', all: 'مشاهدهٔ حل کامل', scroll: ' data-scroll', tall: true, act: '' } };
  function cfg(mode) { var c = {}, m = MODES[mode] || {}, k; for (k in DEF) { c[k] = m[k] !== undefined ? m[k] : DEF[k]; } return c; }

  function html(id, EX, dlgTitle, title, mode) {
    var c = cfg(mode), n = typeof EX === 'number' ? EX : EX.length, dots = ''; title = title || c.title;
    for (var i = 0; i < n; i++) { dots += '<i' + (i === 0 ? ' class="current"' : '') + '></i>'; }
    return '<div class="exs' + (c.tall ? ' exs-tall' : '') + '"><div class="ex e02-example-steps"' + c.act + ' id="' + id + '" aria-label="' + (c.label || title) + '"><div class="e02-example-top"><strong>' + title + '</strong><span data-ex-count>' + c.unit + ' ۱ از ' + fa(n) + '</span></div><div class="e02-example-progress" aria-hidden="true">' + dots + '</div><div class="e02-example-body" data-ex-body aria-live="polite"></div><div class="e02-example-actions end-actions"><button type="button" class="btn" data-ex-prev' + c.scroll + ' disabled>' + c.prev + '</button><button type="button" class="btn primary" data-ex-next' + c.scroll + '>' + c.next + '</button><button type="button" class="btn primary" data-ex-all hidden>' + c.all + '</button></div></div>' +
      '<dialog class="e02-example-dialog" id="' + id + '-dialog" aria-labelledby="' + id + '-dt"><div class="e02-example-dialog-header"><strong id="' + id + '-dt">' + dlgTitle + '</strong><button type="button" class="btn primary" data-ex-close aria-label="بستن پنجره">بستن</button></div><div class="e02-example-dialog-content" data-ex-full></div></dialog></div>';
  }

  function bind(id, EX, mode) {
    var c = cfg(mode), box = document.getElementById(id), dlg = document.getElementById(id + '-dialog'); if (!box || !dlg) { return; }
    var index = 0, prev = box.querySelector('[data-ex-prev]'), next = box.querySelector('[data-ex-next]'), all = box.querySelector('[data-ex-all]');
    function line(l) { return l.charAt(0) === '@' ? '<div class="e3-exline">' + l.slice(1) + '</div>' : '<div dir="ltr">' + M(l) + '</div>'; }
    function content(step, i) { return '<section class="e02-example-step"><div class="e02-example-heading">' + (c.chip ? '<span class="e02-example-chip">' + c.unit + ' ' + fa(i + 1) + '</span>' : '') + '<strong>' + step.title + '</strong></div>' + (step.q ? '<p class="e02-example-note">' + step.q + '</p>' : '') + '<div class="e02-example-lines">' + step.lines.map(line).join('') + '</div><p class="e02-example-note">' + step.note + '</p></section>'; }
    function render() { box.querySelector('[data-ex-count]').textContent = c.unit + ' ' + fa(index + 1) + ' از ' + fa(EX.length); box.querySelector('[data-ex-body]').innerHTML = rr(content(EX[index], index)); box.querySelectorAll('.e02-example-progress i').forEach(function (el, i) { el.classList.toggle('current', i <= index); }); prev.disabled = index === 0; next.hidden = index === EX.length - 1; all.hidden = index !== EX.length - 1; }
    box.addEventListener('click', function (e) { if (e.target.closest('[data-ex-prev], [data-ex-next], [data-ex-all]')) { e.stopPropagation(); } });
    prev.addEventListener('click', function () { if (index > 0) { index--; render(); } });
    next.addEventListener('click', function () { if (index < EX.length - 1) { index++; render(); } });
    all.addEventListener('click', function () { dlg.querySelector('[data-ex-full]').innerHTML = rr(EX.map(content).join('')); dlg.showModal(); });
    dlg.querySelector('[data-ex-close]').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) { dlg.close(); } });
    render();
  }

  K0.exampleSteps = { html: html, bind: bind };
})();
