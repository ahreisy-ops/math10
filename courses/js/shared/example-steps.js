/* مثال‌های حل‌شدهٔ گام‌به‌گام («سه مسئله، سه حل»، «مثال حل‌شده») — مشترک چند درس.
   استفاده: K.exampleSteps.html(id, EX, dlgTitle, title, mode) در html درس، و K.exampleSteps.bind(id, EX, mode) در init.
   EX: [{title, q?, lines:[TeX...], note}] — خطی که با @ شروع شود HTML آزاد است (کلاس e3-exline). EX در html می‌تواند فقط تعداد گام‌ها باشد.
   title اختیاری است؛ mode اختیاری: بدون mode ظاهر «سه مسئله، سه حل» (مثال n از N)، mode='steps' ظاهر «مثال حل‌شده» با برچسب گام (گام n از N).
   پنجرهٔ «راه‌حل کامل» برای فعالیت‌ها: dialogHtml(id, title) در html، و bindDialog(id, root, getData) در init؛ root روی کلیک عنصر [data-solution] پنجره را باز می‌کند،
   getData() → {pre?: HTML، steps:[{chip, lines, note}]}؛ problemSteps(p) داده را از مسئلهٔ K.guide (p.tex، p.steps[{line، why}]، p.ov، p.end) می‌سازد.
   مستقل از فصل و بخش؛ ظاهر در course-shared-ch5.css (زیر کلاس بستهٔ .exs) */
(function () {
  'use strict';
  var K0 = window.CourseKit, ML = window.MathLite, fa = ML.fa, rr = ML.renderRich, M0 = K0._u.M;
  function M(t) {
    t = String(t);
    if (!/\\text\{(یا|و)\}/.test(t)) { return M0(t); }
    var parts = t.split(/\\ ?\\text\{(یا|و)\}\\ ?/), out = '', i;
    for (i = 0; i < parts.length; i++) { out += i % 2 ? ' ' + parts[i] + ' ' : M0(parts[i]); }
    return '<bdi style="direction:ltr;unicode-bidi:isolate">' + out + '</bdi>';
  }
  var DEF = { title: 'سه مسئله، سه حل', label: '', unit: 'مثال', chip: false, prev: 'مثال قبلی', next: 'مثال بعدی', all: 'مشاهدهٔ همهٔ حل‌ها', scroll: ' data-scroll=".e02-example-top"', tall: false, act: ' data-activity' };
  var MODES = { steps: { title: 'مثال حل‌شده', label: 'حل گام‌به‌گام مثال', unit: 'گام', chip: true, prev: 'مرحلهٔ قبلی', next: 'مرحلهٔ بعدی', all: 'مشاهدهٔ حل کامل', scroll: ' data-scroll', tall: true, act: '' } };
  function cfg(mode) { var c = {}, m = MODES[mode] || {}, k; for (k in DEF) { c[k] = m[k] !== undefined ? m[k] : DEF[k]; } return c; }

  function dlgHtml(id, tid, dlgTitle) {
    return '<dialog class="e02-example-dialog" id="' + id + '" aria-labelledby="' + tid + '"><div class="e02-example-dialog-header"><strong id="' + tid + '">' + dlgTitle + '</strong><button type="button" class="btn primary" data-ex-close aria-label="بستن پنجره">بستن</button></div><div class="e02-example-dialog-content" data-ex-full></div></dialog>';
  }
  function line(l) { return l.charAt(0) === '@' ? '<div class="e3-exline">' + l.slice(1) + '</div>' : '<div dir="ltr">' + M(l) + '</div>'; }
  function content(c, step, i) {
    var chip = step.chip !== undefined ? step.chip : (c.chip ? c.unit + ' ' + fa(i + 1) : '');
    return '<section class="e02-example-step"><div class="e02-example-heading">' + (chip ? '<span class="e02-example-chip">' + chip + '</span>' : '') + (step.title ? '<strong>' + step.title + '</strong>' : '') + '</div>' + (step.q ? '<p class="e02-example-note">' + step.q + '</p>' : '') + '<div class="e02-example-lines">' + step.lines.map(line).join('') + '</div>' + (step.note ? '<p class="e02-example-note">' + step.note + '</p>' : '') + '</section>';
  }
  function wireDialog(dlg) {
    dlg.querySelector('[data-ex-close]').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) { dlg.close(); } });
  }

  function html(id, EX, dlgTitle, title, mode) {
    var c = cfg(mode), n = typeof EX === 'number' ? EX : EX.length, dots = ''; title = title || c.title;
    for (var i = 0; i < n; i++) { dots += '<i' + (i === 0 ? ' class="current"' : '') + '></i>'; }
    return '<div class="exs' + (c.tall ? ' exs-tall' : '') + '"><div class="ex e02-example-steps"' + c.act + ' id="' + id + '" aria-label="' + (c.label || title) + '"><div class="e02-example-top"><strong>' + title + '</strong><span data-ex-count>' + c.unit + ' ۱ از ' + fa(n) + '</span></div><div class="e02-example-progress" aria-hidden="true">' + dots + '</div><div class="e02-example-body" data-ex-body aria-live="polite"></div><div class="e02-example-actions end-actions"><button type="button" class="btn" data-ex-prev' + c.scroll + ' disabled>' + c.prev + '</button><button type="button" class="btn primary" data-ex-next' + c.scroll + '>' + c.next + '</button><button type="button" class="btn primary" data-ex-all hidden>' + c.all + '</button></div></div>' +
      dlgHtml(id + '-dialog', id + '-dt', dlgTitle) + '</div>';
  }

  function bind(id, EX, mode) {
    var c = cfg(mode), box = document.getElementById(id), dlg = document.getElementById(id + '-dialog'); if (!box || !dlg) { return; }
    var index = 0, prev = box.querySelector('[data-ex-prev]'), next = box.querySelector('[data-ex-next]'), all = box.querySelector('[data-ex-all]');
    function render() { box.querySelector('[data-ex-count]').textContent = c.unit + ' ' + fa(index + 1) + ' از ' + fa(EX.length); box.querySelector('[data-ex-body]').innerHTML = rr(content(c, EX[index], index)); box.querySelectorAll('.e02-example-progress i').forEach(function (el, i) { el.classList.toggle('current', i <= index); }); prev.disabled = index === 0; next.hidden = index === EX.length - 1; all.hidden = index !== EX.length - 1; }
    box.addEventListener('click', function (e) { if (e.target.closest('[data-ex-prev], [data-ex-next], [data-ex-all]')) { e.stopPropagation(); } });
    prev.addEventListener('click', function () { if (index > 0) { index--; render(); } });
    next.addEventListener('click', function () { if (index < EX.length - 1) { index++; render(); } });
    all.addEventListener('click', function () { dlg.querySelector('[data-ex-full]').innerHTML = rr(EX.map(function (st, i) { return content(c, st, i); }).join('')); dlg.showModal(); });
    wireDialog(dlg);
    render();
  }

  function dialogHtml(id, title) { return '<div class="exs">' + dlgHtml(id, id + '-t', title) + '</div>'; }
  function bindDialog(id, root, getData) {
    var dlg = document.getElementById(id); if (!dlg || !root) { return; }
    root.addEventListener('click', function (e) {
      if (!e.target.closest('[data-solution]')) { return; }
      var d = getData();
      dlg.querySelector('[data-ex-full]').innerHTML = rr((d.pre || '') + d.steps.map(function (st, i) { return content(DEF, st, i); }).join(''));
      dlg.showModal();
    });
    wireDialog(dlg);
  }
  function problemSteps(p) {
    var steps = [{ chip: 'معادلهٔ اولیه', lines: [p.tex], note: '' }].concat(p.steps.map(function (st, i) { return { chip: 'گام ' + fa(i + 1), lines: [st.line], note: st.why }; }));
    steps[steps.length - 1].note += (p.end ? ' ' + p.end : '');
    return { pre: p.ov ? '<p class="e5-ov"><b>چرا این مسیر؟</b> ' + p.ov + '</p>' : '', steps: steps };
  }

  K0.exampleSteps = { html: html, bind: bind, dialogHtml: dialogHtml, bindDialog: bindDialog, problemSteps: problemSteps };
})();
