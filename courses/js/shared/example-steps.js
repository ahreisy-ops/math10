/* مثال‌های حل‌شدهٔ گام‌به‌گام («سه مسئله، سه حل») — مشترک چند درس.
   استفاده: K.exampleSteps.html(id, EX, dlgTitle) در html درس، و K.exampleSteps.bind(id, EX) در init.
   EX: [{title, q, lines:[TeX...], note}] — بقیهٔ ظاهر در ch5.css / ch3.css */
(function () {
  'use strict';
  var K0 = window.CourseKit, ML = window.MathLite, fa = ML.fa, rr = ML.renderRich, M = K0._u.M;

  function html(id, EX, dlgTitle) {
    var dots = ''; for (var i = 0; i < EX.length; i++) { dots += '<i' + (i === 0 ? ' class="current"' : '') + '></i>'; }
    return '<div class="ex e02-example-steps" data-activity id="' + id + '" aria-label="سه مسئله، سه حل"><div class="e02-example-top"><strong>سه مسئله، سه حل</strong><span data-ex-count>مثال ۱ از ' + fa(EX.length) + '</span></div><div class="e02-example-progress" aria-hidden="true">' + dots + '</div><div class="e02-example-body" data-ex-body aria-live="polite"></div><div class="e02-example-actions end-actions"><button type="button" class="btn" data-ex-prev data-scroll=".e02-example-top" disabled>مثال قبلی</button><button type="button" class="btn primary" data-ex-next data-scroll=".e02-example-top">مثال بعدی</button><button type="button" class="btn primary" data-ex-all hidden>مشاهدهٔ همهٔ حل‌ها</button></div></div>' +
      '<dialog class="e02-example-dialog" id="' + id + '-dialog" aria-labelledby="' + id + '-dt"><div class="e02-example-dialog-header"><strong id="' + id + '-dt">' + dlgTitle + '</strong><button type="button" class="btn primary" data-ex-close aria-label="بستن پنجره">بستن</button></div><div class="e02-example-dialog-content" data-ex-full></div></dialog>';
  }

  function bind(id, EX) {
    var box = document.getElementById(id), dlg = document.getElementById(id + '-dialog'); if (!box || !dlg) { return; }
    var index = 0, prev = box.querySelector('[data-ex-prev]'), next = box.querySelector('[data-ex-next]'), all = box.querySelector('[data-ex-all]');
    function content(step) { return '<section class="e02-example-step"><div class="e02-example-heading"><strong>' + step.title + '</strong></div><p class="e02-example-note">' + step.q + '</p><div class="e02-example-lines">' + step.lines.map(function (l) { return '<div dir="ltr">' + M(l) + '</div>'; }).join('') + '</div><p class="e02-example-note">' + step.note + '</p></section>'; }
    function render() { box.querySelector('[data-ex-count]').textContent = 'مثال ' + fa(index + 1) + ' از ' + fa(EX.length); box.querySelector('[data-ex-body]').innerHTML = rr(content(EX[index])); box.querySelectorAll('.e02-example-progress i').forEach(function (el, i) { el.classList.toggle('current', i <= index); }); prev.disabled = index === 0; next.hidden = index === EX.length - 1; all.hidden = index !== EX.length - 1; }
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
