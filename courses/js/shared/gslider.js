/* GSlider — نوار لغزندهٔ مدرج + دو کارت نتیجه (برای توضیحات درس، نه تمرین).
   استفاده: GSlider.build(hostEl, {
     min, max, value, label, aria, target,          // target: عددی که تیکش پررنگ می‌شود (اختیاری)
     compact,                                       // true: کارت‌ها متن توضیح یک‌خطی دارند (بدون ارتفاع رزرو)
     cards: [{name, tag, sub}, {name, tag, sub}],   // tag و sub متن غنی ($...$ مجاز)؛ sub پیش‌فرض
     paint(x) -> { x: 'x=..' (اختیاری), cards: [{ev, status, state}, {...}], after: html }
                                                    // state: '' | 'ok' | 'bad'
   })
   فقط محتوای کارت‌ها به‌روز می‌شود؛ خودِ نوار هرگز دوباره ساخته نمی‌شود (تا درگ نپرد و انیمیشن کارت کار کند). */
(function () {
  'use strict';
  var ML = window.MathLite;
  function m(t) { return ML.renderRich('$' + t + '$'); }
  function rich(s) { return ML.renderRich(s); }
  function esc(s) { return String(s).replace(/"/g, '&quot;'); }

  function build(host, o) {
    var total = o.max - o.min, i, ticks = '', cards = '';
    for (i = 0; i <= total; i++) {
      var n = o.min + i;
      ticks += '<span' + (n === o.target ? ' class="target"' : '') + ' style="--gr-step:' + i + ';--gr-total:' + total + '"><i></i>' + m(String(n)) + '</span>';
    }
    (o.cards || []).forEach(function (c) {
      cards += '<section class="gs-card"><span class="gs-name">' + rich(c.name) + '</span>' +
        (c.tag ? '<strong class="gs-tag">' + rich(c.tag) + '</strong>' : '') +
        '<div class="gs-eval"></div><small class="gs-sub">' + (c.sub ? rich(c.sub) : '') + '</small></section>';
    });
    host.innerHTML = '<div class="gs graduated-range' + (o.compact ? ' gs-compact' : '') + '"><div class="gs-control">' +
      '<div class="gs-head"><span>' + rich(o.label || 'مقدار متغیر') + '</span><strong class="gs-x"></strong></div>' +
      '<input type="range" min="' + o.min + '" max="' + o.max + '" step="1" value="' + o.value + '" aria-label="' + esc(o.aria || 'انتخاب مقدار x') + '">' +
      '<div class="gs-ticks graduated-ticks" aria-hidden="true">' + ticks + '</div></div>' +
      '<div class="gs-cards">' + cards + '</div><div class="gs-after" aria-live="polite"></div></div>';

    var input = host.querySelector('input'), xEl = host.querySelector('.gs-x'),
        els = host.querySelectorAll('.gs-card'), after = host.querySelector('.gs-after');

    function paint() {
      var x = Number(input.value), r = o.paint(x) || {};
      xEl.innerHTML = m(r.x || ('x=' + x));
      Array.prototype.forEach.call(els, function (el, k) {
        var c = (r.cards && r.cards[k]) || {};
        el.classList.toggle('is-ok', c.state === 'ok');
        el.classList.toggle('is-bad', c.state === 'bad');
        el.querySelector('.gs-eval').innerHTML = c.ev || '';
        if (c.status !== undefined) { el.querySelector('.gs-sub').innerHTML = rich(c.status); }
      });
      after.innerHTML = r.after || '';
      input.setAttribute('aria-valuetext', ML.fa(String(x)).replace('-', 'منفی '));
    }
    input.addEventListener('input', paint);
    paint();
    return { paint: paint, input: input };
  }

  window.GSlider = { build: build, m: m };
})();
