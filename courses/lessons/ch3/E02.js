/* E02 — حل معادلهٔ خطی یک‌مجهولی. طراحی مستقل؛ هماهنگ با قراردادهای E01. */
(function () {
  'use strict';
  window.LESSONS = window.LESSONS || {};
  window.LESSONS.E02 = {
    needs: [], setup: function (K) {
      var ML = window.MathLite;
      if (!document.getElementById('css-E2detect-frame')) {
        var st0 = document.createElement('style');
        st0.id = 'css-E2detect-frame';
        st0.textContent = [
          '.e02-lesson .e02-detect-folder .e02-detect-row{border:1.5px solid var(--line);border-radius:11px;background:#fff;margin:8px 0 0;min-height:52px;width:100%;box-shadow:none}',
          '.e02-lesson .e02-detect-folder .e02-detect-row:disabled,.e02-lesson .e02-detect-folder .e02-detect-row:disabled:hover{background:#fff}',
          '.e02-lesson .e02-detect-folder .e02-detect-row:hover:not(.is-selected):not(:disabled),.e02-lesson .e02-detect-folder .e02-detect-row:focus-visible:not(.is-selected):not(:disabled){background:#f0f5fb}',
          '.e02-lesson .e02-detect-folder .e02-detect-row.is-selected,.e02-lesson .e02-detect-folder .e02-detect-row.is-selected:hover,.e02-lesson .e02-detect-folder .e02-detect-row.is-selected:focus,.e02-lesson .e02-detect-folder .e02-detect-row.is-selected:focus-visible,.e02-lesson .e02-detect-folder .e02-detect-row.is-selected:disabled,.e02-lesson .e02-detect-folder .e02-detect-row.is-selected:disabled:hover{background:#e7f0fb !important;border-color:#527cb4 !important;box-shadow:inset -3px 0 #527cb4 !important;border-radius:11px}',
          '.e02-lesson .e02-detect-folder .e02-detect-row.is-selected .e02-detect-num{border-color:#527cb4 !important}'
        ].join('\n');
        document.head.appendChild(st0);
      }
      function M(s) { return ML.renderRich('$' + s + '$'); }
      function R(s) { return ML.renderRich(s); }
      function F(n) { return ML.fa(n); }
      function rand(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }
      function choose(a) { return a[rand(0, a.length - 1)]; }
      function nz(lo, hi) { var n; do { n = rand(lo, hi); } while (n === 0); return n; }
      function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = rand(0, i), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
      function signed(n) { return n < 0 ? String(n) : '+' + n; }
      function coef(a) { return a === 1 ? '' : a === -1 ? '-' : String(a); }
      function ax(a) { return a === 0 ? '0' : coef(a) + 'x'; }
      function lin(a, b) { return (a === 0 ? String(b) : ax(a) + (b ? signed(b) : '')); }
      function equation(a, b, c, d) { return lin(a, b) + '=' + lin(c, d); }
      function mathpanel(s) { return '<div class="e02-formula" dir="ltr">' + M(s) + '</div>'; }
      function mark(ok, s) { return '<div class="fb ' + (ok ? 'ok' : 'bad') + '" role="status">' + s + '</div>'; }
      var refreshSvg = '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 0 0-14.4-4.8L3 9"/><path d="M3 4v5h5"/><path d="M4 13a8 8 0 0 0 14.4 4.8L21 15"/><path d="M21 20v-5h-5"/></svg>';
      function activity(title, id, lead) { return '<h4 class="e02-activity-title">' + title + '</h4><p class="e02-activity-lead">' + lead + '</p><div class="e01-interaction e02-activity" id="' + id + '"><div data-stage></div></div>'; }
      function problemHead(tex) { return '<div class="e02-problem-head"><span class="e02-problem-chip">' + M(tex) + '</span><button type="button" class="btn primary e01-station-refresh" data-fresh title="مسئلهٔ جدید" aria-label="تغییر مسئله">' + refreshSvg + '</button></div>'; }
      function bind(id, generate, paint, handle) {
        var root = document.getElementById(id); if (!root) return; var state;
        function repaint() { root.querySelector('[data-stage]').innerHTML = paint(state); if (id === 'e02-route') { var log = root.querySelector('.e02-route-scroll'); if (log) log.scrollTop = log.scrollHeight; } }
        function fresh() { state = generate(); repaint(); }
        root.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b || b.disabled) return; if (b.hasAttribute('data-fresh')) { fresh(); return; } handle(state, b, repaint, root); });
        if (id === 'e02-route') {
          root.addEventListener('input', function (e) {
            var field = e.target; if (!field.matches('#e02-move-number')) return;
            var val = Number(field.value), nonneg = state.op === 'add' || state.op === 'sub';
            var down = root.querySelector('[data-delta="-1"]'), up = root.querySelector('[data-delta="1"]');
            if (!Number.isFinite(val) || field.value === '') { if (down) down.disabled = false; if (up) up.disabled = false; return; }
            if (down) down.disabled = val <= (nonneg ? 0 : -12);
            if (up) up.disabled = val >= 12;
          });
          root.addEventListener('change', function (e) {
            var field = e.target; if (!field.matches('#e02-move-number')) return;
            var val = Number(field.value), nonneg = state.op === 'add' || state.op === 'sub';
            if (!Number.isFinite(val) || field.value.trim() === '') val = state.amount;
            state.amount = Math.max(nonneg ? 0 : -12, Math.min(12, Math.trunc(val)));
            field.value = String(state.amount);
            var down = root.querySelector('[data-delta="-1"]'), up = root.querySelector('[data-delta="1"]');
            if (down) down.disabled = state.amount <= (nonneg ? 0 : -12);
            if (up) up.disabled = state.amount >= 12;
          });
        }
        if (id === 'e02-machine') {
          var moving = null, gesture = null;
          function placeToken(token, i, from) {
            if (!token || i < 0 || i > 2) return;
            if (from !== null && from === i) return;
            var other = state.placed[i];
            if (from === null) {
              if (state.placed.indexOf(token) >= 0) return;
            } else if (state.placed[from] !== token) return;
            state.placed[i] = token;
            if (from !== null) state.placed[from] = other;
            state.checked = false; state.selected = null; state.trace = null; state.pick = null; repaint();
          }
          root.addEventListener('dragstart', function (e) {
            var tile = e.target.closest('[data-token], [data-remove]'); if (!tile || tile.disabled) return;
            moving = tile.hasAttribute('data-token') ? { token: tile.dataset.token, from: null } : { token: state.placed[+tile.dataset.remove], from: +tile.dataset.remove };
            if (e.dataTransfer) { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', moving.token); }
          });
          root.addEventListener('dragover', function (e) { if (e.target.closest('[data-drop],[data-remove]')) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; } });
          root.addEventListener('drop', function (e) {
            var slot = e.target.closest('[data-drop],[data-remove]'); if (!slot || !moving) return;
            e.preventDefault(); var idx = +(slot.hasAttribute('data-drop') ? slot.dataset.drop : slot.dataset.remove);
            placeToken(moving.token, idx, moving.from); moving = null;
          });
          root.addEventListener('dragend', function () { moving = null; });
          // Touch dragging is supported without relying on the browser's HTML5 drag implementation.
          root.addEventListener('pointerdown', function (e) {
            if (e.pointerType === 'mouse') return;
            var tile = e.target.closest('[data-token],[data-remove]'); if (!tile || tile.disabled) return;
            gesture = { x: e.clientX, y: e.clientY, started: false, token: tile.hasAttribute('data-token') ? tile.dataset.token : state.placed[+tile.dataset.remove], from: tile.hasAttribute('data-token') ? null : +tile.dataset.remove };
          });
          root.addEventListener('pointermove', function (e) {
            if (!gesture) return;
            if (Math.hypot(e.clientX - gesture.x, e.clientY - gesture.y) > 10) gesture.started = true;
            if (gesture.started) { e.preventDefault(); root.classList.add('e02-is-dragging'); }
          }, { passive: false });
          root.addEventListener('pointerup', function (e) {
            if (!gesture) return; var g = gesture; gesture = null; root.classList.remove('e02-is-dragging');
            if (!g.started) return;
            var tile = document.elementFromPoint(e.clientX, e.clientY), drop = tile && tile.closest('[data-drop],[data-remove]');
            if (drop) { e.preventDefault(); placeToken(g.token, +(drop.hasAttribute('data-drop') ? drop.dataset.drop : drop.dataset.remove), g.from); }
          });
          root.addEventListener('pointercancel', function () { gesture = null; root.classList.remove('e02-is-dragging'); });
        }
        fresh(); return root;
      }
      function rangeState() { var a = choose([-4, -3, -2, 2, 3, 4]), x = rand(-6, 6), b = nz(-8, 8); return { a: a, b: b, c: a * x + b, x: x, op: null, amount: 1, history: [], note: null }; }
      function routeText(s) { return lin(s.a, s.b) + '=' + s.c; }
      function routeRender(s) {
        var solved = s.a === 1 && s.b === 0, collapsed = s.a === 0 && s.b === 0 && s.c === 0, locked = solved || collapsed, nonnegative = s.op === 'add' || s.op === 'sub', kind = [['add', '+'], ['sub', '-'], ['mul', '\\times'], ['div', '\\div']];
        // All controls act on the CURRENT equation; the ledger preserves the original.
        var equation = '<div class="e02-route-control-row e02-route-equation-row">' +
          '<span class="e02-route-field-label">معادله</span><div class="e02-route-value-pair">' +
          '<div class="e02-route-group e02-route-equation-group"><div class="e02-live-bars" aria-label="معادلهٔ فعلی"><span class="e02-bar-x">' + M(ax(s.a)) + '</span>' +
          (s.b ? '<span class="e02-bar-c">' + M(signed(s.b)) + '</span>' : '') +
          '<span class="e02-bar-eq">=</span><span class="e02-bar-num">' + M(String(s.c)) + '</span></div></div>' +
          '<button type="button" class="btn primary e01-station-refresh" data-fresh data-scroll title="معادلهٔ تازه" aria-label="تغییر معادله"' + (collapsed ? ' disabled' : '') + '>' + refreshSvg + '</button></div></div>';
        // Dotted connector is aligned with the operation-and-arrow badge between equations.
        var pathContent = s.history.length ?
          '<div class="e02-route-sequence" role="list">' +
          '<div class="e02-route-equation" role="listitem"><span class="e02-route-index">' + F(1) + '</span><span class="e02-route-line">' + M(s.history[0].eq) + '</span></div>' +
          s.history.map(function (h, i) {
            var next = i + 1 < s.history.length ? s.history[i + 1].eq : routeText(s);
            return '<div class="e02-route-transition"><span class="e02-route-operation"><span class="e02-route-arrow" aria-hidden="true">⇓</span>' + M(h.operation) + '</span></div>' +
              '<div class="e02-route-equation ' + (i === s.history.length - 1 ? 'is-latest' : '') + '" role="listitem"><span class="e02-route-index">' + F(i + 2) + '</span><span class="e02-route-line">' + M(next) + '</span></div>';
          }).join('') + '</div>' :
          '<div class="e02-route-empty"><svg viewBox="0 0 48 48" width="43" height="43" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 5h17l8 8v29H12z"/><path d="M29 5v9h8M17 21h15M17 27h11M17 33h11"/></svg><p>هنوز حرکتی انجام نشده است.</p></div>';
        var path = '<aside class="e02-route-ledger" aria-label="مسیر ساخته‌شده">' +
          '<div class="e02-route-caption">مسیر ساخته‌شده</div><div class="e02-route-scroll" aria-live="polite">' + pathContent + '</div></aside>';
        var disabled = locked ? ' disabled' : '';
        return '<div class="e02-route-layout"><div class="e02-workspace">' + equation +
          '<div class="e02-route-control-row"><span class="e02-route-field-label">عملیات</span><div class="e02-operation-picker e02-route-group" role="group" aria-label="نوع عملیات">' + kind.map(function (k) { return '<button type="button" class="btn e02-op ' + (s.op === k[0] ? 'is-current' : '') + '" data-op="' + k[0] + '" aria-pressed="' + (s.op === k[0]) + '"' + disabled + '>' + M(k[1]) + '</button>'; }).join('') + '</div></div>' +
          '<div class="e02-route-control-row"><label class="e02-route-field-label" for="e02-move-number">مقدار عملیات</label><div class="e02-number-control e02-route-group"><button type="button" class="btn" data-delta="1" aria-label="افزایش مقدار"' + (locked || s.amount >= 12 ? ' disabled' : '') + '>' + M('+') + '</button><input id="e02-move-number" type="number" step="1" min="' + (nonnegative ? '0' : '-12') + '" max="12" value="' + s.amount + '" inputmode="numeric"' + disabled + '><button type="button" class="btn" data-delta="-1" aria-label="کاهش مقدار"' + (locked || s.amount <= (nonnegative ? 0 : -12) ? ' disabled' : '') + '>' + M('-') + '</button></div></div>' +
          '<div class="e02-route-actions"><button type="button" class="btn e02-route-action" data-apply ' + (locked ? 'disabled' : '') + '>اجرای عملیات</button><button type="button" class="btn e02-route-action" data-undo ' + (!s.history.length ? 'disabled' : '') + '>بازگشت یک گام</button></div>' +
          '<div class="e02-route-message" aria-live="polite">' + (collapsed ? '<div class="e02-zero-caution" role="status">ضرب در صفر، معادله را به ' + M('0=0') + ' تبدیل کرد؛ جواب دیگر قابل یافتن نیست. «بازگشت یک گام» را بزن.</div>' : (solved ? mark(true, 'مجهول تنها شد؛ مسیر کامل در سمت چپ ثبت شده است.') : (s.note ? (s.note.ok ? '<div class="e02-info">' + s.note.text + '</div>' : mark(false, s.note.text)) : ''))) + '</div></div>' + path + '</div>';
      }
      function routeHandle(s, b, paint, root) {
        if (b.hasAttribute('data-op')) { s.op = b.dataset.op; s.amount = 1; s.note = null; paint(); return; }
        if (b.hasAttribute('data-delta')) { var field = root.querySelector('#e02-move-number'), current = field && field.value.trim() !== '' ? Number(field.value) : s.amount, minimum = (s.op === 'add' || s.op === 'sub') ? 0 : -12; s.amount = Math.max(minimum, Math.min(12, (Number.isFinite(current) ? current : s.amount) + Number(b.dataset.delta))); s.note = null; paint(); return; }
        if (b.hasAttribute('data-undo')) { if (s.history.length) { var h = s.history.pop(); s.a = h.a; s.b = h.b; s.c = h.c; s.note = null; } paint(); return; }
        if (!b.hasAttribute('data-apply')) return;
        if (!s.op) { s.note = { ok: false, text: 'ابتدا نوع عملیات را انتخاب کن.' }; paint(); return; }
        var input = root.querySelector('#e02-move-number'), n = input ? Number(input.value) : s.amount;
        if (!Number.isInteger(n) || Math.abs(n) > 12) { s.note = { ok: false, text: 'مقدار عملیات باید عدد صحیحی در بازهٔ ۱۲− تا ۱۲+ باشد.' }; paint(); return; }
        if ((s.op === 'add' || s.op === 'sub') && n < 0) { n = 0; }
        if (s.op === 'div' && n === 0) { s.amount = 0; s.note = { ok: false, text: 'تقسیم بر صفر تعریف نشده است؛ نمی‌توان دو طرف معادله را بر صفر تقسیم کرد.' }; paint(); return; }
        s.amount = n; var v = { a: s.a, b: s.b, c: s.c, eq: routeText(s) }, symbol = '';
        if (s.op === 'add') { s.b += n; s.c += n; symbol = '+' + n; }
        if (s.op === 'sub') { s.b -= n; s.c -= n; symbol = '-' + n; }
        if (s.op === 'mul') { s.a *= n; s.b *= n; s.c *= n; symbol = '\\times ' + n; }
        if (s.op === 'div') {
          if (s.a % n || s.b % n || s.c % n) { s.note = { ok: false, text: 'این تقسیم به کسر می‌رسد؛ فعلاً عددی انتخاب کن که حاصل صحیح باشد.' }; paint(); return; }
          s.a /= n; s.b /= n; s.c /= n; symbol = '\\div ' + n;
        }
        if (Math.max(Math.abs(s.a), Math.abs(s.b), Math.abs(s.c)) > 180 || s.history.length >= 8) { s.a = v.a; s.b = v.b; s.c = v.c; s.note = { ok: false, text: 'مسیر به حد مجاز رسید؛ یک گام به عقب برگرد.' }; paint(); return; }
        v.operation = symbol; s.history.push(v);
        var note = (s.a === 0 && s.b === 0 && s.c === 0) ? 'ضرب در صفر، برابری را به ۰=۰ تبدیل کرد؛ دیگر نمی‌توان جواب معادله را از آن به دست آورد.' : (s.a === 1 && s.b === 0) ? 'جواب به دست آمد.' :
          (s.op === 'mul' ? 'برابری حفظ شد. آیا مسیر کوتاه‌تر شد؟' : 'برابری حفظ شد. گام بعدی را انتخاب کن.');
        s.note = { ok: true, text: note }; paint();
      }
      function machineValue(s, ops) { var v = s.end; ops.forEach(function (op) { if (op === 'recoverD') v /= s.d; else if (op === 'recoverB') v -= s.b; else v /= s.a; }); return v; }
      function machineProblem() {
        var s, valid = false, attempt = 0;
        do {
          var x = nz(-6, 6), a = choose([-4, -3, -2, 2, 3, 4]), b = nz(-7, 7), d = choose([-3, -2, 2, 3]), end = (a * x + b) * d;
          s = { x: x, a: a, b: b, d: d, end: end, placed: [null, null, null], order: shuffle(['recoverD', 'recoverB', 'recoverA']), selected: null, checked: false, trace: null, pick: null };
          var permutations = [['recoverD', 'recoverB', 'recoverA'], ['recoverD', 'recoverA', 'recoverB'], ['recoverB', 'recoverD', 'recoverA'], ['recoverB', 'recoverA', 'recoverD'], ['recoverA', 'recoverD', 'recoverB'], ['recoverA', 'recoverB', 'recoverD']];
          valid = permutations.filter(function (a) { return Math.abs(machineValue(s, a) - x) < 1e-8; }).length === 1; attempt++;
        } while (!valid && attempt < 100);
        return s;
      }
      function machineRender(s) {
        var labels = { recoverD: M('\\div (' + s.d + ')'), recoverB: M(-s.b >= 0 ? '+' + (-s.b) : String(-s.b)), recoverA: M('\\div (' + s.a + ')') };
        // Fixed visible connectors keep arrows outside the station boxes in both layouts.
        var arrow = '<span class="e02-machine-arrow" aria-hidden="true">→</span>';
        var stations = '<div class="e02-machine-flow"><div class="e02-machine-node"><small>ورودی ناشناخته</small>' + M('x') + '</div>' + arrow +
          '<div class="e02-machine-pass">' + M('\\times (' + s.a + ')') + '</div>' + arrow +
          '<div class="e02-machine-pass">' + M(s.b >= 0 ? '+' + s.b : String(s.b)) + '</div>' + arrow +
          '<div class="e02-machine-pass">' + M('\\times (' + s.d + ')') + '</div>' + arrow +
          '<div class="e02-machine-node"><small>خروجی</small>' + M(String(s.end)) + '</div></div>';
        var placed = s.placed.map(function (v, i) {
          var number = '<span class="e02-return-no">' + F(i + 1) + '</span>';
          return v ? '<button class="e02-return-slot filled" type="button" draggable="true" data-remove="' + i + '" title="برداشتن یا جابه‌جایی عملیات">' + number + '<span class="e02-return-slot-math">' + labels[v] + '</span></button>' :
            '<button type="button" class="e02-return-slot" data-drop="' + i + '" aria-label="جایگاه عملیات ' + F(i + 1) + '">' + number + '</button>';
        });
        var returnArrow = '<span class="e02-return-arrow" aria-hidden="true">←</span>';
        var trace = s.trace ? '<div class="e02-return-calcs">' + s.trace.map(function (item, i) { return '<div class="e02-back-step"><small>' + ['خنثی‌کردن آخرین ضرب', 'خنثی‌کردن جمع یا تفریق', 'خنثی‌کردن ضرب نخست'][i] + '</small><span>' + M(item) + '</span></div>'; }).join('') + '</div>' : '';
        return problemHead('(' + lin(s.a, s.b) + ')\\times(' + s.d + ')=' + s.end) + stations +
          '<div class="e02-return-header">مسیر بازگشت <span>از خروجی به ورودی</span></div><div class="e02-machine-tray" role="group" aria-label="کارت‌های عملیات وارون">' + s.order.map(function (k) { return '<button type="button" class="btn e02-machine-piece ' + (s.pick === k ? 'is-picked' : '') + '" draggable="true" aria-pressed="' + (s.pick === k) + '" data-token="' + k + '" ' + (s.placed.indexOf(k) >= 0 ? 'disabled' : '') + '>' + labels[k] + '</button>'; }).join('') + '</div><div class="e02-return-line"><div class="e02-return-value">' + M('x') + '</div>' + returnArrow + placed.slice().reverse().join(returnArrow) + returnArrow + '<div class="e02-return-value">' + M(String(s.end)) + '</div></div><div class="e02-machine-clear"><button type="button" data-machine-reset class="e02-clear-order" ' + (!s.placed.some(Boolean) ? 'disabled' : '') + '>پاک‌کردن ترتیب</button></div>' +
          '<div class="e02-foot-actions"><button type="button" class="btn primary" data-machine-check ' + (s.checked ? 'disabled' : '') + '>چک کردن ترتیب</button></div>' +
          trace + (s.checked ? mark(true, 'آفرین! عددی که دنبالش بودیم، ' + M(String(s.x)) + ' است. با وارون‌کردن ترتیب عملیات، مقدار آغازین را پیدا کردی.') : '') +
          (s.selected ? mark(false, s.selected) : '');
      }
      function machineHandle(s, b, paint) {
        if (b.hasAttribute('data-machine-reset')) { s.placed = [null, null, null]; s.pick = null; s.checked = false; s.selected = null; s.trace = null; paint(); return; }
        if (b.hasAttribute('data-token')) { var name = b.dataset.token; s.pick = s.pick === name ? null : name; paint(); return; }
        if (b.hasAttribute('data-drop')) { var pos = +b.dataset.drop; if (s.pick && s.placed.indexOf(s.pick) < 0) { s.placed[pos] = s.pick; s.pick = null; s.checked = false; s.selected = null; s.trace = null; paint(); } return; }
        if (b.hasAttribute('data-remove')) {
          var index = +b.dataset.remove;
          if (s.pick && s.placed.indexOf(s.pick) < 0) { s.placed[index] = s.pick; s.pick = null; }
          else { s.placed[index] = null; }
          s.checked = false; s.selected = null; s.trace = null; paint(); return;
        }
        if (!b.hasAttribute('data-machine-check')) return;
        if (!s.placed.every(Boolean)) { s.selected = 'ابتدا هر سه جایگاه را با عملیات وارون پُر کن.'; s.checked = false; s.trace = null; paint(); return; }
        var v = s.end, lines = [];
        s.placed.forEach(function (op) {
          var before = v; if (op === 'recoverD') v /= s.d; else if (op === 'recoverB') v -= s.b; else v /= s.a;
          var str = op === 'recoverD' ? '\\div (' + s.d + ')' : op === 'recoverA' ? '\\div (' + s.a + ')' : s.b < 0 ? '+' + Math.abs(s.b) : '-' + s.b;
          function pretty(n) { return String(Math.round(n * 1000) / 1000); }
          lines.push((op === 'recoverB' ? pretty(before) + (s.b < 0 ? '+' + Math.abs(s.b) : '-' + s.b) : '\\frac{' + pretty(before) + '}{' + (op === 'recoverD' ? s.d : s.a) + '}') + '=' + pretty(v));
        });
        s.trace = lines;
        if (Math.abs(v - s.x) < 1e-8) { s.checked = true; s.selected = null; }
        else { s.checked = false; s.selected = 'این ترتیب به ' + M(String(Math.round(v * 1000) / 1000)) + ' رسید، نه مقدار ورودی. جای کاشی‌ها را عوض کن و مسیر دیگری بساز.'; } paint();
      }
      function tileProblem() { var x = rand(-7, 7), a = nz(-5, 5), c = nz(-5, 5); while (a === c) c = nz(-5, 5); var b = rand(-9, 9), d = (a - c) * x + b; return { x: x, a: a, b: b, c: c, d: d, history: [], last: null, finished: false, attempt: null }; }
      function tileRender(s) {
        var ready = (s.c === 0 && s.b === 0 && s.a !== 0) || (s.a === 0 && s.d === 0 && s.c !== 0); var alreadySolved = ready && ((s.c === 0 && s.a === 1) || (s.a === 0 && s.c === 1)); function column(side) {
          var left = side === 'L', a = left ? s.a : s.c, b = left ? s.b : s.d;
          return '<div class="e02-tile-side"><div class="e02-side-caption">طرف ' + (left ? 'چپ' : 'راست') + '</div><div class="e02-tile-terms">' + (a ? '<button type="button" class="e02-term e02-term-var" data-transfer="' + side + 'x" ' + (s.finished ? 'disabled' : '') + ' title="انتقال جملهٔ مجهول‌دار به طرف مقابل">' + M(ax(a)) + '</button>' : '') + (b ? '<button type="button" class="e02-term e02-term-num" data-transfer="' + side + 'b" ' + (s.finished ? 'disabled' : '') + ' title="انتقال عدد به طرف مقابل">' + M(b > 0 ? (a ? '+' + b : String(b)) : String(b)) + '</button>' : '') + '</div></div>';
        }
        return problemHead(equation(s.a, s.b, s.c, s.d)) + '<div class="e02-tile-board">' + column('L') + '<span class="e02-tile-equals">' + M('=') + '</span>' + column('R') + '</div>' +
          '<div class="e02-tile-log"><strong>تغییرهای انجام‌شده</strong>' + (s.history.length ? '<div class="e02-tile-step"><span class="e02-tile-step-num">' + F(1) + '</span><div class="e02-tile-step-detail"><span dir="ltr">' + M(s.history[0].eq) + '</span></div></div>' + s.history.map(function (h, i) { return '<div class="e02-tile-connector"><span class="e02-tile-operation"><span class="e02-tile-operation-arrow" aria-hidden="true">⇓</span>' + M(h.action) + '</span></div><div class="e02-tile-step"><span class="e02-tile-step-num">' + F(i + 2) + '</span><div class="e02-tile-step-detail"><span dir="ltr">' + M(h.result) + '</span></div></div>'; }).join('') : '<div class="e02-tile-empty"><svg viewBox="0 0 48 48" width="25" height="25" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 5h17l8 8v29H12z"/><path d="M29 5v9h8M17 21h15M17 27h11M17 33h11"/></svg><span>هنوز تغییری انجام نشده است.</span></div>') + '</div>' +
          (s.last ? mark(s.last.ok, s.last.text) : '') +
          (alreadySolved ? '<div class="fb ok e02-tile-complete">به جواب نهایی رسیدیم: ' + M('x=' + s.x) + '</div>' : ready ? '<div class="e02-tile-solve"><label for="e02-tile-answer">اکنون مقدار مجهول را حساب کن:</label><div class="e02-tile-final-line" dir="ltr"><span class="e02-tile-final-equation">' + M(equation(s.a, s.b, s.c, s.d)) + '</span><span class="e02-tile-implies" aria-hidden="true">' + M('\\Longrightarrow') + '</span><span class="e02-tile-value-label">' + M('x=') + '</span><input id="e02-tile-answer" type="number" step="1" inputmode="numeric" ' + (s.attempt === null ? '' : 'value="' + s.attempt + '"') + ' ' + (s.finished ? 'disabled' : '') + ' aria-label="جواب معادله"></div>' + (s.finished ? '' : '<button type="button" class="btn primary" data-tile-solve>بررسی جواب</button>') + '</div>' : '') +
          '<div class="e02-foot-actions"><button type="button" class="btn" data-tile-undo ' + (!s.history.length ? 'disabled' : '') + '>بازگشت یک گام</button></div>';
      }
      function tileHandle(s, b, paint, root) {
        if (root.classList.contains('e02-transfer-in-flight')) return; if (b.hasAttribute('data-tile-undo')) { var last = s.history.pop(); if (last) { s.a = last.a; s.b = last.b; s.c = last.c; s.d = last.d; } s.last = null; s.attempt = null; s.finished = false; paint(); return; }
        if (b.hasAttribute('data-tile-solve')) { var input = root.querySelector('#e02-tile-answer'); if (!input || input.value.trim() === '') return; var v = Number(input.value); s.attempt = v; s.finished = v === s.x; s.last = s.finished ? { ok: true, text: 'درست است؛ ' + M('x=' + s.x) + ' جواب معادله است. برای امتحان راهی دیگر، از «بازگشت یک گام» استفاده کن.' } : { ok: false, text: 'با تقسیم دو طرف بر ضریب مجهول، مقدار دیگری به دست می‌آید. دوباره حساب کن.' }; paint(); return; }
        if (s.finished || !b.hasAttribute('data-transfer')) return;
        var move = b.dataset.transfer, side = move[0], type = move[1], amt = type === 'x' ? (side === 'L' ? s.a : s.c) : (side === 'L' ? s.b : s.d);
        if (!amt) return;
        var before = { a: s.a, b: s.b, c: s.c, d: s.d, eq: equation(s.a, s.b, s.c, s.d), action: (amt < 0 ? '+' : '-') + Math.abs(amt) + (type === 'x' ? 'x' : '') };
        if (type === 'x') { s.a -= amt; s.c -= amt; } else { s.b -= amt; s.d -= amt; }
        if (s.history.length >= 6) { s.a = before.a; s.b = before.b; s.c = before.c; s.d = before.d; s.last = { ok: false, text: 'برای خوانایی مسیر، بیش از شش انتقال ثبت نمی‌شود. یک گام به عقب برگرد.' }; paint(); return; }
        before.result = equation(s.a, s.b, s.c, s.d); s.history.push(before); s.attempt = null; s.last = { ok: true, text: 'برای حذف این جمله، عملیات معادل روی هر دو طرف انجام شد.' };
        // The selected term travels towards the opposite side. The actual algebra is
        // always performed on BOTH sides; motion illustrates the result, not a shortcut.
        var from = b.getBoundingClientRect(), target = root.querySelector('.e02-tile-side' + (side === 'L' ? ':last-child' : ':first-child'));
        var destination = target && target.getBoundingClientRect();
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!destination || !from.width || reduce || !document.body) { paint(); return; }
        var ghost = b.cloneNode(true); ghost.removeAttribute('data-transfer'); ghost.disabled = true;
        ghost.classList.add('e02-moving-term'); ghost.style.cssText = 'position:fixed;z-index:9999;left:' + from.left + 'px;top:' + from.top + 'px;width:' + from.width + 'px;height:' + from.height + 'px;margin:0;pointer-events:none;';
        document.body.appendChild(ghost); root.classList.add('e02-transfer-in-flight');
        var dx = (destination.left + destination.width / 2) - (from.left + from.width / 2), dy = (destination.top + destination.height / 2) - (from.top + from.height / 2);
        if (ghost.animate) {
          var move = ghost.animate([{ transform: 'translate(0,0)', opacity: 1 }, { transform: 'translate(' + dx / 2 + 'px,' + (dy - 16) / 2 + 'px)', opacity: 1, offset: .6 }, { transform: 'translate(' + dx + 'px,' + dy + 'px)', opacity: .15 }], { duration: 340, easing: 'ease-in-out' });
          move.onfinish = function () { ghost.remove(); root.classList.remove('e02-transfer-in-flight'); paint(); }; move.oncancel = function () { ghost.remove(); root.classList.remove('e02-transfer-in-flight'); paint(); };
        } else { ghost.remove(); root.classList.remove('e02-transfer-in-flight'); paint(); }
      }
      function errorProblem() {
        var x = nz(-6, 6), a = choose([-4, -3, -2, 2, 3, 4]), b = nz(-5, 5), rhs = a * (x + b), bad = rand(1, 3), correct = [coef(a) + '(x' + signed(b) + ')=' + rhs, lin(a, a * b) + '=' + rhs, ax(a) + '=' + (rhs - a * b), 'x=' + x];
        function quotient(num, den) { return num % den === 0 ? String(num / den) : '\\frac{' + num + '}{' + den + '}'; }
        var lines = correct.slice();
        if (bad === 1) { lines[1] = lin(a, b) + '=' + rhs; lines[2] = ax(a) + '=' + (rhs - b); lines[3] = 'x=' + quotient(rhs - b, a); }
        if (bad === 2) { lines[2] = ax(a) + '=' + (rhs + b); lines[3] = 'x=' + quotient(rhs + b, a); }
        if (bad === 3) lines[3] = 'x=' + (-x);
        return { x: x, a: a, b: b, rhs: rhs, correct: correct, lines: lines, bad: bad, selected: null, fix: null, done: false, note: null, attempt: null };
      }
      function detectRender(s) {
        var outcome = (s.selected !== null);
        var target = s.bad === 1 ? s.a * s.b : s.bad === 2 ? s.rhs - s.a * s.b : s.x;
        var blank = s.bad === 1 ? ax(s.a) + '+\\square=' + s.rhs : s.bad === 2 ? ax(s.a) + '=\\square' : 'x=\\square';
        var note = s.bad === 1 ? 'در بازکردن پرانتز، ضریب باید در هر دو جمله ضرب شود.' : s.bad === 2 ? 'جملهٔ ثابت با همان عملیات از هر دو طرف حذف می‌شود.' : 'در تقسیم بر ضریب، علامت حاصل باید رعایت شود.';
        var before = s.bad === 1 ? M(ax(s.a) + '+') : (s.bad === 2 ? M(ax(s.a) + '=') : M('x='));
        var after = s.bad === 1 ? M('=' + s.rhs) : '';
        var repair = s.selected === s.bad ? '<div class="e02-correction"><p><b>اولین خطا پیدا شد.</b> اکنون همان سطر را اصلاح کن؛ عدد درستِ جای خالی را حساب کن.</p>' +
          (s.done ? mathpanel(s.correct[s.bad]) + mark(true, note) : '<div class="e02-repair-math" dir="ltr">' + before + '<input id="e02-repair-number" type="number" step="1" inputmode="numeric" aria-label="عدد اصلاح‌شده" placeholder="؟" ' + (s.attempt === null ? '' : 'value="' + s.attempt + '"') + '>' + after + '</div><div class="e02-detect-repair"><button type="button" class="btn primary" data-repair-check>بررسی اصلاح</button></div>' + (s.note ? mark(false, s.note) : '')) + '</div>' : '';
        return problemHead(s.lines[0]) + '<div class="e02-detect-folder"><div class="e02-detect-spine">مراحل نوشته‌شدهٔ حل</div>' + s.lines.slice(1).map(function (v, i) { i += 1; var on = s.selected === i; return '<button type="button" class="e02-detect-row' + (on ? ' is-selected' : '') + '" data-row="' + i + '" aria-pressed="' + (on ? 'true' : 'false') + '"' + (s.done ? ' disabled aria-disabled="true"' : '') + '><span class="e02-detect-num">' + F(i + 1) + '</span><span dir="ltr">' + M(v) + '</span></button>'; }).join('') + '</div>' +
          (outcome ? (s.selected === s.bad ? repair : mark(false, 'این سطر نخستین خطای راه‌حل نیست. محاسبه‌ها را از نخستین سطر به ترتیب دنبال کن.')) : '');
      }
      function detectHandle(s, b, paint, root) {
        if (b.hasAttribute('data-row')) { if (s.done) return; s.selected = Number(b.dataset.row); s.note = null; s.attempt = null; s.done = false; paint(); return; }
        if (b.hasAttribute('data-repair-check')) {
          var input = root.querySelector('#e02-repair-number'); if (!input || input.value.trim() === '') return;
          var v = Number(input.value); s.attempt = v; var target = s.bad === 1 ? s.a * s.b : s.bad === 2 ? s.rhs - s.a * s.b : s.x;
          if (Number.isInteger(v) && v === target) { s.done = true; s.note = null; } else { s.note = 'این مقدار سطر نادرست را اصلاح نمی‌کند. محاسبهٔ همان گام را دوباره بررسی کن.'; }
          paint();
        }
      }
      /* Six kinds of fully generated questions; four options each, one correct.
         The same selection and feedback contract as E01 is used throughout. */
      function numericOptions(answer) {
        var candidates = [answer, answer + 1, answer - 1, answer + 2, answer - 2, -answer, answer + 3, answer - 3, answer * 2, answer + 5, answer - 5];
        var unique = [answer];
        shuffle(candidates.slice(1)).forEach(function (n) { if (unique.length < 4 && Number.isInteger(n) && unique.indexOf(n) < 0) unique.push(n); });
        return shuffle(unique.map(function (n) { return { tex: 'x=' + n, ok: n === answer }; }));
      }
      function makeFinal(kind) {
        var x = rand(-8, 8), a = nz(-6, 6), b = rand(-9, 9), c, d, p, q, t, tex, why, options;
        if (kind === 0) { b = nz(-9, 9); tex = 'x' + signed(b) + '=' + (x + b); why = 'با انجام عملیات وارون، جملهٔ ثابت حذف می‌شود.'; options = numericOptions(x); }
        if (kind === 1) { var n = choose([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]); x = rand(-7, 7) * n; tex = '\\frac{x}{' + (n < 0 ? '(' + n + ')' : n) + '}=' + (x / n); why = 'ضرب هر دو طرف در مخرج غیرصفر، مقدار مجهول را مشخص می‌کند.'; options = numericOptions(x); }
        if (kind === 2) {
          b = nz(-8, 8); tex = lin(a, b) + '=' + (a * x + b); var r = a * x + b;
          options = shuffle([{ tex: ax(a) + '=' + (r - b), ok: true }, { tex: ax(a) + '=' + (r + b), ok: false }, { tex: ax(a) + '=' + r, ok: false }, { tex: lin(a, b) + '=' + (r - b), ok: false }]);
          why = 'برای حذف جملهٔ ثابت باید عمل وارون را روی هر دو طرف انجام داد.';
        }
        if (kind === 3) {
          c = nz(-6, 6); while (c === a) c = nz(-6, 6); d = (a - c) * x + b; tex = equation(a, b, c, d); options = numericOptions(x);
          why = 'با جمع‌کردن جمله‌های مجهول‌دار در یک طرف، مقدار مجهول مشخص می‌شود.';
        }
        if (kind === 4) {
          p = choose([-4, -3, -2, 2, 3, 4]); q = nz(-4, 4); while (p + q === 0) q = nz(-4, 4); t = nz(-5, 5); tex = coef(p) + '(x' + signed(t) + ')' + signed(q) + 'x=' + ((p + q) * x + p * t); var rhs = (p + q) * x + p * t;
          options = shuffle([{ tex: lin(p + q, p * t) + '=' + rhs, ok: true }, { tex: lin(p + q, t) + '=' + rhs, ok: false }, { tex: lin(p, p * t + q) + '=' + rhs, ok: false }, { tex: lin(p - q, p * t) + '=' + rhs, ok: false }]);
          if (new Set(options.map(function (o) { return o.tex; })).size !== 4) return makeFinal(kind);
          why = 'با خاصیت توزیعی و جمع جمله‌های هم‌نوع می‌توان عبارت سمت چپ را ساده کرد.';
        }
        if (kind === 5) {
          var trace = errorProblem(); tex = trace.lines[0]; options = trace.lines.map(function (line, i) { return { tex: line, ok: i === trace.bad, index: i + 1 }; });
          why = 'نخستین گام نادرست باید با مقایسهٔ هر سطر و سطر قبل پیدا شود.';
        }
        return { kind: kind, x: options.findIndex(function (o) { return o.ok; }), tex: tex, options: options, why: why, solution: kind === 5 ? trace.lines : null };
      }
      function finalSet() { return { q: shuffle([0, 1, 2, 3, 4, 5]).map(makeFinal), pos: 0, answers: [null, null, null, null, null, null], finished: false, review: false }; }
      function finalRender(s) {
        if (s.finished && !s.review) {
          var score = s.answers.reduce(function (v, a, i) { return v + (a === s.q[i].x ? 1 : 0); }, 0);
          return '<div class="fb ' + (score >= 4 ? 'ok' : 'bad') + '" role="status"><b>نتیجه: ' + F(score) + ' از ' + F(6) + '</b><br>' + (score === 6 ? 'همهٔ سؤال‌ها را درست پاسخ دادی.' : score >= 4 ? 'سؤال‌های نادرست را مرور کن و دلیل هر اشتباه را بررسی کن.' : 'یک بار دیگر درس را مرور کن؛ سپس با سؤال‌های تازه تمرین کن.') + '</div><div class="opts end-actions"><button type="button" class="btn" data-review data-scroll>مرور سؤال‌ها</button><button type="button" class="btn primary" data-final-new data-scroll>سؤال‌های جدید</button></div>';
        }
        var item = s.q[s.pos], given = s.answers[s.pos], frozen = given !== null;
        var instruction = item.kind === 5 ? 'دانش‌آموزی معادلهٔ ' + M(item.solution[0]) + ' را مرحله‌به‌مرحله حل کرده است. نخستین مرحلهٔ نادرست کدام است؟' :
          item.kind === 2 ? 'در معادلهٔ ' + M(item.tex) + '، کدام گام جملهٔ ثابت را درست حذف می‌کند؟' :
            item.kind === 4 ? 'ساده‌سازی درستِ طرف چپ معادلهٔ ' + M(item.tex) + ' کدام است؟' :
              'مقدار مجهول را در معادلهٔ <span class="e02-inline-equation">' + M(item.tex) + '</span> پیدا کن.';
        var tracePanel = item.kind === 5 ? '<ol class="e02-final-worked-steps steps" aria-label="مراحل حل نوشته‌شده">' + item.solution.map(function (line) { return '<li>' + M(line) + '</li>'; }).join('') + '</ol>' : '';
        var body = '<div class="e01-answer-grid">' + item.options.map(function (opt, i) {
          var optionLabel = item.kind === 5 ? 'مرحلهٔ ' + F(i + 1) : M(opt.tex);
          return '<button type="button" class="btn e01-answer' + (frozen ? (opt.ok ? ' e01-right' : given === i ? ' e01-wrong' : '') : '') + '" data-final-choice="' + i + '" ' + (frozen ? 'disabled' : '') + '>' + optionLabel + '</button>';
        }).join('') + '</div>';
        return '<div class="e01-progress stg" aria-label="پیشرفت تمرین">' + s.q.map(function (q, i) { return '<span class="' + (i === s.pos ? 'cu' : s.answers[i] === null ? '' : s.answers[i] === s.q[i].x ? 'dn' : 'wr') + '" aria-label="سؤال ' + F(i + 1) + '">' + F(i + 1) + '</span>'; }).join('') + '</div>' +
          '<p class="ask e01-question">' + instruction + '</p>' + tracePanel + body +
          (frozen ? mark(given === item.x, (given === item.x ? 'پاسخ درست است.' : (item.kind === 5 ? 'نخستین مرحلهٔ نادرست، مرحلهٔ ' + F(item.x + 1) + ' است.' : 'گزینهٔ درست ' + M(item.options[item.x].tex) + ' است.')) + ' ' + item.why) : '') +
          '<div class="e01-navigation"><button type="button" class="btn" data-prev ' + (s.pos === 0 ? 'disabled' : '') + ' data-scroll>سؤال قبلی</button><button type="button" class="btn primary" data-next ' + (!frozen ? 'disabled' : '') + ' data-scroll>' + (s.pos === 5 ? (s.review ? 'بازگشت به نتیجه' : 'مشاهدهٔ نتیجه') : 'سؤال بعدی') + '</button></div>';
      }
      function finalBind() {
        var root = document.getElementById('e02-final'); if (!root) return; var state = finalSet();
        function paint() { root.innerHTML = finalRender(state); }
        function scroll() { if (window.requestAnimationFrame) { window.requestAnimationFrame(function () { var p = root.querySelector('.e01-progress') || root.querySelector('.e01-result'); if (p && p.scrollIntoView) p.scrollIntoView({ block: 'nearest', behavior: 'auto' }); }); } }
        root.addEventListener('click', function (e) {
          var b = e.target.closest('button'); if (!b || b.disabled) return;
          if (b.hasAttribute('data-final-choice')) { if (state.answers[state.pos] === null) { state.answers[state.pos] = Number(b.dataset.finalChoice); paint(); } return; }
          if (b.hasAttribute('data-prev')) { state.pos--; paint(); scroll(); }
          if (b.hasAttribute('data-next')) { if (state.pos < 5) state.pos++; else { state.finished = true; state.review = false; } paint(); scroll(); }
          if (b.hasAttribute('data-review')) { state.review = true; state.pos = 0; paint(); scroll(); }
          if (b.hasAttribute('data-final-new')) { state = finalSet(); paint(); scroll(); }
        }); paint();
      }
      /* Fraction Workshop — independent, three-stage exploration; all problems generated. */
      var fractionLevelNames = ['کسر ساده', 'مخرج منفی', 'صورتِ چندجمله‌ای'];
      function fractionState(level) {
        level = level || 1;
        var n, a, b, x, q, t = 0;
        if (level === 1) {
          n = choose([2, 3, 4, 5, 6, 7]); a = 1; b = 0; q = rand(-7, 7); x = n * q;
        } else if (level === 2) {
          n = choose([-2, -3, -4, -5, -6]); a = 1; b = 0; q = rand(-7, 7); x = n * q;
        } else {
          var ok = false;
          for (var k = 0; k < 2000 && !ok; k++) {
            a = choose([-4, -3, -2, 2, 3, 4]); n = choose([-5, -4, -3, 3, 4, 5]);
            x = rand(-8, 8); q = rand(-6, 6); b = n * q - a * x;
            ok = b !== 0 && Math.abs(b) <= 10 && Math.abs(q) <= 6 && x !== 0;
          }
          if (!ok) { a = 2; n = 3; b = 1; q = 5; x = 7; }
        }
        return { level: level, n: n, a: a, b: b, q: q, x: x, stage: 0, attempt: null, preview: null, note: null };
      }
      function fractionTex(s) { return '\\frac{' + lin(s.a, s.b) + '}{' + (s.n < 0 ? '(' + s.n + ')' : s.n) + '}=' + s.q; }
      function fractionResult(s) { return lin(s.a, s.b) + '=' + (s.n * s.q); }
      function fractionStep(s) {
        var rhs = s.n * s.q;
        return s.stage >= 2 ? ax(s.a) + '=' + (rhs - s.b) : fractionResult(s);
      }
      function fractionNote(s) { return s.note ? mark(s.note.ok, s.note.text) : ''; }
      function fractionRender(s) {
        var levels = '<div class="e02-fr-levels" role="group" aria-label="انتخاب سطح دشواری">' + fractionLevelNames.map(function (label, i) { return '<button type="button" class="btn e02-fr-level ' + (s.level === i + 1 ? 'is-current' : '') + '" data-fr-level="' + (i + 1) + '" aria-pressed="' + (s.level === i + 1) + '">' + label + '</button>'; }).join('') + '</div>';
        var head = '<div class="e02-fr-main-equation">' + problemHead(fractionTex(s)) + '</div>';
        var leftM = s.stage === 0 ? '\\frac{' + lin(s.a, s.b) + '}{' + (s.n < 0 ? '(' + s.n + ')' : s.n) + '}' : (s.stage === 1 ? lin(s.a, s.b) : ax(s.a));
        var rightM = s.stage === 0 ? String(s.q) : String(s.stage === 1 ? s.n * s.q : s.n * s.q - s.b);
        var face = '<div class="e02-fr-equation-row"><div class="e02-fr-side e02-fr-right"><span>طرف راست</span><strong>' + M(rightM) + '</strong></div><span class="e02-fr-equal">=</span><div class="e02-fr-side e02-fr-left"><span>طرف چپ</span><strong>' + M(leftM) + '</strong></div></div>';
        var phaseNames = s.level === 3 ? ['برداشتن مخرج', 'حذف جملهٔ ثابت', 'یافتن مجهول'] : ['برداشتن مخرج'];
        var effectiveStage = s.level === 3 ? Math.min(s.stage, 3) : (s.stage === 0 ? 0 : 1);
        var progress = '<div class="e02-fr-progress" role="group" aria-label="مراحل حل">' + phaseNames.map(function (name, i) {
          var at = i, completed = s.level === 3 ? (effectiveStage > i) : (effectiveStage > i), active = s.level === 3 ? (effectiveStage === i) : (effectiveStage === i);
          return '<div class="e02-fr-phase ' +
            (completed ? 'is-done' : active ? 'is-current' : '') +
            '"><span class="e02-fr-phase-dot">' +
            (completed ? '✓' : F(i + 1)) + '</span><span class="e02-fr-phase-label">' + name +
            '</span></div>';
        }).join('') + '</div>';
        var activity = '', nextAction = '';
        if (s.stage === 0) {
          activity = '<p class="e02-fr-instruction">برای از میان بردن مخرج، دو طرف معادله باید در چه عددی ضرب شوند؟ عدد را وارد و اثر آن را مشاهده کن.</p>' +
            '<div class="e02-fr-entry"><div class="e02-fr-entry-fields"><label for="e02-fr-multiplier">ضرب هر دو طرف در</label><input id="e02-fr-multiplier" type="number" inputmode="numeric" step="1" placeholder="؟" ' + (s.attempt === null ? '' : 'value="' + s.attempt + '"') + '/></div><button type="button" class="btn e02-fr-action" data-fr-multiply>اجرای ضرب</button></div>';
          if (s.preview) { activity += '<div class="e02-fr-preview"><span>اثر این انتخاب:</span>' + M(s.preview) + '</div>'; }
        } else {
          var cancelN = s.n < 0 ? '(' + s.n + ')' : String(s.n);
          var cancelView = '<div class="e02-fr-cancellation" aria-label="اثر ضرب در دو طرف"><div class="e02-fr-cancel-side"><span>طرف راست: همان ضرب انجام می‌شود</span><div class="e02-fr-cancel-math"><span>' + M(s.q + '\\times (' + s.n + ')') + '</span><span>' + M('=' + s.q * s.n) + '</span></div></div><div class="e02-fr-cancel-side"><span>طرف چپ: مخرج خنثی می‌شود</span><div class="e02-fr-cancel-math"><span>' + M('\\dfrac{' + lin(s.a, s.b) + '}{\\cancel{' + cancelN + '}}') + '</span><span>' + M('\\times\\cancel{' + cancelN + '}') + '</span></div></div></div>';
          var transformed = cancelView + '<div class="e02-fr-transformed"><span>معادلهٔ حاصل از ضرب دو طرف در ' + M(String(s.n)) + '</span><div>' + M(fractionResult(s)) + '</div></div>';
          if (s.level === 3 && s.stage === 1) {
            activity = transformed + '<p class="e02-fr-instruction">برای حذف جملهٔ ثابتِ صورت، چه عددی باید به هر دو طرف اضافه شود؟</p>' +
              '<div class="e02-fr-entry"><div class="e02-fr-entry-fields"><label for="e02-fr-shift">افزودن به دو طرف</label><input id="e02-fr-shift" type="number" inputmode="numeric" step="1" placeholder="؟" ' + (s.attempt === null ? '' : 'value="' + s.attempt + '"') + '/></div><button type="button" class="btn e02-fr-action" data-fr-shift>اجرای تغییر</button></div>' +
              (s.preview ? '<div class="e02-fr-preview"><span>اگر این عدد اضافه شود:</span>' + M(s.preview) + '</div>' : '');
          } else {
            activity = transformed + (s.level === 3 ? '<div class="e02-fr-transformed"><span>پس از حذف جملهٔ ثابت</span><div>' + M(fractionStep(s)) + '</div></div>' : '');
            if (s.level === 3) {
              activity += '<p class="e02-fr-instruction">با معادلهٔ به‌دست‌آمده، مقدار مجهول را محاسبه کن.</p>' +
                '<div class="e02-fr-entry e02-fr-answer"><div class="e02-fr-entry-fields" dir="ltr"><label for="e02-fr-answer" class="e02-math-xeq" dir="ltr">' + M('x=') + '</label><input id="e02-fr-answer" type="number" inputmode="numeric" step="1" placeholder="؟" ' + (s.attempt === null ? '' : 'value="' + s.attempt + '"') + ' ' + (s.stage === 3 ? 'disabled' : '') + '/></div>' +
                (s.stage === 3 ? '' : '<button type="button" class="btn primary e02-fr-action" data-fr-answer>بررسی پاسخ</button>') + '</div>';
            }
            if (s.stage === 3) {
              var numerator = s.a * s.x + s.b;
              activity += '<div class="e02-fr-proof"><span>بررسی در معادلهٔ اولیه</span>' + M('\\frac{' + numerator + '}{' + (s.n < 0 ? '(' + s.n + ')' : s.n) + '}=' + s.q) + '</div>';
              nextAction = '<div class="e02-fr-next"><button type="button" class="btn primary" data-fr-next data-scroll=".e02-problem-head" data-scroll-offset="100">' + (s.level === 3 ? 'مسئلهٔ تازه در همین سطح' : 'رفتن به سطح بعد') + '</button></div>';
            }
          }
        }
        return '<div class="e02-fr-workshop">' + levels + head + progress + face + activity + fractionNote(s) + nextAction +
          '</div>';
      }
      function fractionHandle(s, b, paint, root) {
        function scrollQuestion() {
          window.requestAnimationFrame(function () {
            var target = root.querySelector('.e02-fr-workshop'); if (!target) return;
            var top = window.scrollY + target.getBoundingClientRect().top - 88;
            // window.scrollTo({ top: Math.max(0, top), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
          });
        }
        if (b.hasAttribute('data-fr-level')) { var lvl = Number(b.dataset.frLevel); Object.assign(s, fractionState(lvl)); paint(); scrollQuestion(); return; }
        if (b.hasAttribute('data-fr-next')) { Object.assign(s, fractionState(Math.min(3, s.level + 1))); paint(); scrollQuestion(); return; }
        var field, raw, val;
        if (b.hasAttribute('data-fr-multiply')) {
          field = root.querySelector('#e02-fr-multiplier');
          raw = field && field.value.trim(); if (!raw) return;
          val = Number(raw); if (!Number.isInteger(val) || Math.abs(val) > 50) { s.note = { ok: false, text: 'یک عدد صحیح در بازهٔ مناسب انتخاب کن.' }; paint(); return; }
          s.attempt = val;
          if (val === 0) { s.note = { ok: false, text: 'ضرب دو طرف در صفر به ۰ = ۰ می‌رسد و اطلاعات مجهول را از بین می‌برد. برای حذف مخرج، عدد دیگری لازم است.' }; s.preview = '0=0'; }
          else if (val !== s.n) {
            s.note = { ok: false, text: 'این ضرب برابری را حفظ می‌کند، اما هنوز مخرج را حذف نمی‌کند. به عدد مخرج توجه کن.' };
            s.preview = '\\frac{(' + lin(s.a, s.b) + ')\\times (' + val + ')}{' + (s.n < 0 ? '(' + s.n + ')' : s.n) + '}=' + (s.q * val);
          } else { s.stage = s.level === 3 ? 1 : 3; s.note = s.level === 3 ? null : { ok: true, text: 'به جواب نهایی رسیدیم: ' + M('x=' + s.x) }; s.preview = null; s.attempt = null; }
          paint(); return;
        }
        if (b.hasAttribute('data-fr-shift')) {
          field = root.querySelector('#e02-fr-shift'); raw = field && field.value.trim(); if (!raw) return;
          val = Number(raw); if (!Number.isInteger(val) || Math.abs(val) > 50) return;
          s.attempt = val;
          if (val !== -s.b) { s.note = { ok: false, text: 'این تغییر برابری را حفظ می‌کند، اما جملهٔ ثابت هنوز باقی می‌ماند.' }; s.preview = lin(s.a, s.b + val) + '=' + (s.n * s.q + val); }
          else { s.stage = 2; s.note = null; s.preview = null; s.attempt = null; }
          paint(); return;
        }
        if (!b.hasAttribute('data-fr-answer')) return;
        field = root.querySelector('#e02-fr-answer'); raw = field && field.value.trim(); if (!raw) return;
        val = Number(raw); s.attempt = val;
        if (!Number.isInteger(val)) { s.note = { ok: false, text: 'پاسخ باید یک عدد صحیح باشد.' }; }
        else if (val === s.x) { s.stage = 3; s.note = { ok: true, text: 'جواب به دست آمد. با جایگذاری در معادلهٔ آغازین، دو طرف برابرند.' }; }
        else { s.note = { ok: false, text: 'به ضریب مجهول و علامت عددها توجه کن. مقدار معادلهٔ ساده‌شده را دوباره بررسی کن.' }; }
        paint();
      }
      function exampleStepsBind() {
        var box = document.getElementById('e02-example-steps'), dlg = document.getElementById('e02-example-dialog');
        if (!box || !dlg) return;
        var steps = [
          { title: 'بازکردن پرانتز و جمع جمله‌های هم‌نوع', lines: ['2(x+3)+x=18', '2x+6+x=18', '3x+6=18'], note: 'ابتدا پرانتز را باز می‌کنیم، سپس جمله‌های هم‌نوع را جمع می‌کنیم.' },
          { title: 'حذف عدد ثابت', lines: ['3x+6=18', '3x+6-6=18-6', '3x=12'], note: 'برای حذف عدد ثابت، از هر دو طرف معادله ۶ کم می‌کنیم.' },
          { title: 'تقسیم دو طرف بر ضریب مجهول', lines: ['3x=12', '\\frac{3x}{3}=\\frac{12}{3}', 'x=4'], note: 'هر دو طرف را بر ۳ تقسیم می‌کنیم تا مجهول تنها بماند.' }
        ];
        var index = 0, prev = box.querySelector('[data-ex-prev]'), next = box.querySelector('[data-ex-next]'), all = box.querySelector('[data-ex-all]');
        function content(step, i) { return '<section class="e02-example-step"><div class="e02-example-heading"><span class="e02-example-chip">گام ' + F(i + 1) + '</span><strong>' + step.title + '</strong></div><div class="e02-example-lines">' + step.lines.map(function (line) { return '<div dir="ltr">' + M(line) + '</div>'; }).join('') + '</div><p class="e02-example-note">' + step.note + '</p></section>'; }
        function render() { box.querySelector('[data-ex-count]').textContent = 'گام ' + F(index + 1) + ' از ' + F(steps.length); box.querySelector('[data-ex-body]').innerHTML = content(steps[index], index); box.querySelectorAll('.e02-example-progress i').forEach(function (el, i) { el.classList.toggle('current', i <= index); }); prev.disabled = index === 0; next.hidden = index === steps.length - 1; all.hidden = index !== steps.length - 1; }
        // Keep the app's global quiz-navigation auto-scroll from treating these as question buttons.
        box.addEventListener('click', function (e) { if (e.target.closest('[data-ex-prev], [data-ex-next], [data-ex-all]')) e.stopPropagation(); });
        prev.addEventListener('click', function () { if (index > 0) { index--; render(); } });
        next.addEventListener('click', function () { if (index < steps.length - 1) { index++; render(); } });
        all.addEventListener('click', function () { dlg.querySelector('[data-ex-full]').innerHTML = steps.map(content).join(''); dlg.showModal(); });
        dlg.querySelector('[data-ex-close]').addEventListener('click', function () { dlg.close(); });
        dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
        render();
      }
      return {
        html: function () {
          var h = '<div class="e01-lesson e02-lesson">';
          h += '<div class="e01-intro"><span class="e01-kicker">از حفظ تساوی تا پیداکردن مجهول</span><p>در درس قبل روشن شد که انجام یک عملیات یکسان روی دو طرف، برابری را حفظ می‌کند. این ویژگی اکنون به ابزاری برای <b>حل معادله</b> تبدیل می‌شود: میان تغییرهای مجاز، باید آن‌هایی را انتخاب کرد که عبارتِ دارای مجهول را ساده‌تر می‌کنند.</p><div class="e01-route" aria-label="مسیر این درس"><span>انتخاب تغییر</span><i aria-hidden="true">←</i><span>عملیات وارون و کسرها</span><i aria-hidden="true">←</i><span>مجهول در دو طرف</span><i aria-hidden="true">←</i><span>حل و خطایابی</span></div></div>';
          h += K.sn('۱', 'از تغییرِ درست تا تغییرِ مفید');
          h += '<p>در معادلهٔ ' + M('3x+5=20') + '، افزودن عدد ۲ به هر دو طرف، برابری را حفظ می‌کند؛ اما عبارت دارای مجهول را ساده‌تر نمی‌کند. در مقابل، کم‌کردن ۵، جملهٔ ثابت را حذف می‌کند. پس در حل معادله، <b>درست‌بودن یک تغییر کافی نیست؛ انتخاب آن باید هدفمند باشد.</b></p>';
          h += activity('کارگاه مسیر حل', 'e02-route', 'در هر گام، نوع و مقدار یک عملیات را تعیین کن و آن را روی هر دو طرف معادله اجرا کن. معادلهٔ بالای کارگاه به‌روز می‌شود و تغییرات به ترتیب در «مسیر ساخته‌شده» ثبت می‌شوند. می‌توانی آخرین گام را برگردانی و راه دیگری را امتحان کنی. هدف، رسیدن به معادله‌ای است که مجهول در آن تنها مانده باشد؛ هر حرکت مجاز، لزوماً مسیر را کوتاه‌تر نمی‌کند.');
          h += '<p>در مسیری که مجهول به‌تدریج از جمله‌های اضافی جدا می‌شود، معمولاً از <b>عملیات وارون</b> استفاده می‌شود. جمع و تفریق، و نیز ضرب و تقسیم بر عددی غیرصفر، عمل یکدیگر را خنثی می‌کنند؛ ولی ترتیب اجرای آن‌ها اهمیت دارد.</p>';
          h += K.sn('۲', 'حل معادله‌های چندمرحله‌ای');
          h += '<p>در برخی معادله‌ها، چند عملیات به‌ترتیب روی مجهول انجام می‌شود. در معادلهٔ ' + M('3(x-2)=15') + '، ابتدا از مجهول ۲ کم شده و سپس حاصلش در ۳ ضرب شده است. برای پیداکردن مجهول، اثر این عملیات باید از میان برود؛ اما کدام عملیات باید زودتر برگردانده شود؟</p>';
          h += activity('ماشین عملیات وارون', 'e02-machine', 'سه عملیات مسیر رفت را بررسی کن. کارت‌های عملیات وارون را در جایگاه‌های شماره‌دارِ مسیر برگشت بچین؛ با کشیدن و رهاکردن یا با انتخاب کارت و جایگاه. کارت‌های بالایی را در خانه‌های شماره‌دار پایین بچین؛ امکان جابه‌جایی، پاک‌کردن ترتیب و آزمایش مسیر وجود دارد.');
          h += '<p>آنچه در ماشین به‌صورت حرکت رو به عقب انجام شد، در حل معادله به شکل عملیات روی <b>هر دو طرف</b> نوشته می‌شود. به‌جای حفظ‌کردن دنباله‌ای از فرمول‌ها، کافی است هر بار مشخص باشد کدام عملیات قرار است خنثی شود.</p>';
          h += K.sn('۳', 'حل معادله‌هایی با مخرج عددی');
          h += '<p>در بعضی معادله‌ها، مجهول در صورت یک کسر دیده می‌شود؛ گاهی به‌تنهایی و گاهی در عبارتی مانند ' + M('x-2') + '. در این حالت باید با حفظ برابری، اثر تقسیم را از میان برد. مخرج ممکن است منفی باشد، اما هرگز نمی‌تواند صفر باشد.</p>';
          h += '<p>در کارگاه بعد، اثر ضرب بر <b>هر دو طرف</b> نمایش داده می‌شود. هدف فقط پیداکردن جواب نیست: باید روشن شود چرا یک عدد مخرج را حذف می‌کند و عدد دیگر، با وجود حفظ تساوی، این کار را انجام نمی‌دهد.</p>';
          h += activity('کارگاه کسرگشا', 'e02-fraction', 'کار را از کسر ساده آغاز کن، سپس سراغ مخرج منفی و صورتِ چندجمله‌ای برو. در هر مسئله، عددی را برای ضرب در دو طرف انتخاب کن؛ در دو سطح نخست، حذف مخرج مستقیماً مقدار مجهول را مشخص می‌کند؛ در سطح سوم، گام‌های باقی‌مانده را خودت کامل کن. با دکمهٔ تغییر مسئله می‌توانی نمونهٔ تازه‌ای از همان سطح بسازی.');
          h += '<p>حذف مخرج پایان حل همهٔ معادله‌های کسری نیست. اگر پس از آن، جملهٔ ثابت یا ضریب مجهول باقی بماند، همان عملیات وارونِ آموخته‌شده به کار می‌آید. اینجا مخرج عددی و غیرصفر است؛ معادله‌هایی با مجهول در مخرج، موضوع این درس نیستند.</p>';
          h += K.sn('۴', 'وقتی مجهول در هر دو طرف است');
          h += '<p>گاهی مجهول فقط در یک طرف دیده نمی‌شود؛ مانند ' + M('4x+3=2x+11') + '. در این حالت، جمله‌های مجهول‌دار می‌توانند در یک طرف جمع شوند. این انتخاب، مانند انتقال یک شیء از یک کفهٔ ترازو به کفهٔ دیگر نیست: برای حذف هر جمله، <b>عمل یکسانی روی دو طرف معادله</b> انجام می‌شود.</p>';
          h += activity('میز جمله‌های معادله', 'e02-tiles', 'با انتخاب یک جمله، اثر حذف آن را روی دو طرف ببین. پس از ساده‌شدن معادله، جواب را خودت به دست بیاور.');
          h += '<p>اگر پرانتز یا جمله‌های هم‌نوع وجود داشته باشد، ابتدا می‌توان از مهارت‌های فصل عبارت‌های جبری کمک گرفت. برای مثال، در ' + M('2(x+3)+x=18') + '، <b>ساده‌سازی طرف چپ</b> به ' + M('3x+6=18') + ' می‌رسد؛ این بازنویسی با کم‌کردن یا تقسیم‌کردن دو طرف تفاوت دارد. پس از ساده‌سازی، با کم‌کردن ۶ و سپس تقسیم بر ۳، جواب ' + M('x=4') + ' به دست می‌آید.</p>';
          h += '<div class="ex e02-example-steps" id="e02-example-steps" aria-label="حل گام‌به‌گام مثال">';
          h += '<div class="e02-example-top"><strong>مثال حل‌شده</strong><span data-ex-count>گام ۱ از ۳</span></div>';
          h += '<div class="e02-example-progress" aria-hidden="true"><i class="current"></i><i></i><i></i></div>';
          h += '<div class="e02-example-body" data-ex-body aria-live="polite"></div>';
          h += '<div class="e02-example-actions end-actions"><button type="button" class="btn" data-ex-prev disabled data-scroll>مرحلهٔ قبلی</button><button type="button" class="btn primary" data-ex-next data-scroll>مرحلهٔ بعدی</button><button type="button" class="btn primary" data-ex-all hidden data-scroll>مشاهدهٔ حل کامل</button></div>';
          h += '</div>';
          h += '<dialog class="e02-example-dialog" id="e02-example-dialog" aria-labelledby="e02-example-dialog-title"><div class="e02-example-dialog-header"><strong id="e02-example-dialog-title">حل کامل معادله</strong><button type="button" class="btn primary" data-ex-close aria-label="بستن پنجره">بستن</button></div><div class="e02-example-dialog-content" data-ex-full></div></dialog>';
          h += K.sn('۵', 'چطور خطا به یک جواب نادرست می‌رسد؟');
          h += '<p>در یک راه‌حل چندمرحله‌ای، یک خطای کوچک می‌تواند همهٔ گام‌های بعد را تحت تأثیر قرار دهد. به همین دلیل، پیدا کردن <b>نخستین گام نادرست</b> از نگاه‌کردن صرف به جواب نهایی مفیدتر است.</p>';
          h += activity('کارآگاه راه‌حل', 'e02-detect', 'مراحل را از ابتدا بررسی کن؛ اولین سطر نادرست را پیدا کن و عدد اشتباهِ همان سطر را اصلاح کن.');
          h += '<p>پس از حل معادله، می‌توان جواب را در <b>معادلهٔ اولیه</b> جایگذاری کرد و از برابربودن دو طرف مطمئن شد. این همان روش بررسی جواب در درس قبل است و نیازی به آموزش دوبارهٔ آن نیست.</p>';
          h += K.sn('۶', 'آزمون پایانی');
          h += '<p>در آزمون پایانی، حل معادله، انتخاب گام مناسب، ساده‌سازی عبارت جبری و خطایابی در قالب سؤال‌های چهارگزینه‌ای سنجیده می‌شود. عبارت‌ها و گزینه‌ها در هر دور تازه تولید می‌شوند.</p>';
          h += '<div id="e02-final" class="e01-interaction e01-final e02-final" aria-label="آزمون پایانی"></div>';
          h += K.box('sum', 'بعد از این درس باید بتوانی', '<ul><li>میان تغییرهای مجاز، عملیات مناسب برای حل معادله را انتخاب کنی.</li><li>عملیات وارون را با ترتیب درست اجرا کنی.</li><li>معادله‌های ساده، چندمرحله‌ای و دارای مخرج عددی (از جمله مخرج منفی و صورت چندجمله‌ای) را حل کنی.</li><li>جمله‌های مجهول‌دار را در یک طرف جمع کنی و پیش از حل، عبارت‌های جبری را در صورت نیاز ساده کنی.</li><li>نخستین خطای یک راه‌حل را تشخیص بدهی و جواب را در معادلهٔ اصلی بررسی کنی.</li></ul>');
          return h + '</div>';
        }, init: function () {
          bind('e02-route', rangeState, routeRender, routeHandle);
          bind('e02-machine', machineProblem, machineRender, machineHandle);
          bind('e02-fraction', fractionState, fractionRender, fractionHandle);
          bind('e02-tiles', tileProblem, tileRender, tileHandle);
          bind('e02-detect', errorProblem, detectRender, detectHandle);
          exampleStepsBind();
          finalBind();
        }
      };
    }
  };
})();
