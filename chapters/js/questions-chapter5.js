/* ==========================================================================
   Chapter5 — هندسه و پیش‌نیازهای مثلثات (فقط زاویه، مثلث، فیثاغورس، تشابه، مساحت مثلث)
   داده‌های آزمون (قابل ویرایش). منطق برنامه در app.js است.

   ساختار هر سؤال:
     id          شناسهٔ سؤال
     skill       مهارت اصلی (Skill ID)
     secondary   مهارت‌های فرعی که پاسخ‌دادن به آن‌ها هم تکیه دارد (فقط ثبت می‌شود، امتیاز نمی‌گیرد)
     difficulty  basic | medium | hard   (وزن‌ها: ۱ ، ۲ ، ۳)
     topic       (اختیاری) برچسب زیرمبحث کنار شمارهٔ سؤال؛ اگر نباشد نام مهارت نمایش داده می‌شود
     type        mcq | numeric
     prompt      صورت سؤال (HTML؛ شکل‌ها هم داخل همین‌جا هستند)
     feedback    نکتهٔ آموزشی کوتاه (در گزارش نمایش داده می‌شود)
   و بسته به نوع:
     mcq:        options:[{t, err?}] ، answer: اندیس گزینهٔ درست
     numeric:    answer: عدد ، answerHtml ، traps:[{value, err}]

   شکل‌ها با SVG ساخته می‌شوند و مشخصات هندسی‌شان در GEO نگه‌داشته شده تا قابل بررسی باشد.
   برچسب‌های خطا (err): concept | read | sign | calc | method
   ========================================================================== */

/* ---------- توابع کمکی نمایش ریاضی ----------
   فرمول‌ها با LaTeX نوشته و با KaTeX نمایش داده می‌شوند:
     M(...)  → فرمول (بین $ ... $)     F(a, b) → \frac{a}{b}     P(b, e) → b^{e}
     E('3x^2y-5')  → LaTeX از نوشتن ساده (^ توان، * ضرب؛ ^{...} برای توان چندکاراکتری)
     X('...')      → M(E('...'))  یعنی فرمول آمادهٔ نمایش
   رقم‌ها به‌طور خودکار فارسی می‌شوند. */
function F(n, d) { return '\\frac{' + n + '}{' + d + '}'; }
function M(s) { return '$' + s + '$'; }
function P(b, e) { return b + '^{' + e + '}'; }
function E(s) {
  var out = '', i = 0, c, m, tok, k;
  while (i < s.length) {
    c = s.charAt(i);
    if (c === '&') { k = s.indexOf(';', i); out += s.slice(i, k + 1); i = k + 1; }
    else if (c === '^') {
      if (s.charAt(i + 1) === '{') { k = s.indexOf('}', i + 1); tok = s.slice(i + 2, k); i = k + 1; }
      else { m = /^-?([0-9]+|[a-z])/.exec(s.slice(i + 1)); tok = m[0]; i = i + 1 + tok.length; }
      out += '^{' + E(tok) + '}';
    } else if (c === '*') { out += '× '; i++; }
    else { out += c; i++; }
  }
  return out;
}
function X(s) { return M(E(s)); }
function LTR(s) { return '\u2066' + s + '\u2069'; }   // متن چپ‌به‌راست داخل منوی کشویی

/* ---------- هندسهٔ کمکی ---------- */
var DEG = Math.PI / 180;
function triPts(ab, bc, ca) {            // مثلث با طول ضلع‌های AB ، BC ، CA  (A در مبدأ، B روی محور افقی)
  var x = (ab * ab + ca * ca - bc * bc) / (2 * ab), y = Math.sqrt(ca * ca - x * x);
  return [[0, 0], [ab, 0], [x, y]];
}
function rotPts(pts, deg) {
  var c = Math.cos(deg * DEG), s = Math.sin(deg * DEG);
  return pts.map(function (p) { return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; });
}
function scalePts(pts, k) { return pts.map(function (p) { return [p[0] * k, p[1] * k]; }); }

/* TRI: مثلث با برچسب رأس‌ها، ضلع‌ها، زاویه‌ها، علامت قائمه و پاره‌خط‌های کمکی
   o = { pts:[A,B,C] (مختصات ریاضی، y به بالا), names:['A','B','C'], sides:[برچسب AB, BC, CA],
         right:اندیس رأسِ قائمه, angles:[{at, text}], extra:[{p, label}],
         dashed:[{from, to, label, rightAt:'to'|'from', baseDir:[dx,dy]}], caption, W, H } */
function TRI(o) {
  var W = o.W || 280, H = o.H || 190, pad = 36, cap = o.caption ? 20 : 0, i, s = '';
  var all = o.pts.slice();
  (o.extra || []).forEach(function (e) { all.push(e.p); });
  (o.dashed || []).forEach(function (d) { all.push(d.from); all.push(d.to); });
  var xs = all.map(function (p) { return p[0]; }), ys = all.map(function (p) { return p[1]; });
  var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
  var k = Math.min((W - 2 * pad) / ((x1 - x0) || 1), (H - 2 * pad - cap) / ((y1 - y0) || 1));
  function sx(x) { return pad + (x - x0) * k + ((W - 2 * pad) - (x1 - x0) * k) / 2; }
  function sy(y) { return pad + (y1 - y) * k + ((H - 2 * pad - cap) - (y1 - y0) * k) / 2; }
  function T(p) { return [sx(p[0]), sy(p[1])]; }
  function unit(a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy) || 1; return [dx / l, dy / l]; }
  function f(n) { return Math.round(n * 100) / 100; }
  var P = o.pts.map(T), C = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3];
  function label(text, x, y, size, bold) {
    var it = /^[a-z]$/.test(text);
    return '<text x="' + f(x) + '" y="' + f(y + size * 0.33) + '" text-anchor="middle" font-size="' + size + '"' +
      (bold ? ' font-weight="bold"' : '') + (it ? ' font-style="italic"' : '') +
      ' fill="#14213d" font-family="' + (it ? 'Times New Roman,serif' : 'Tahoma,sans-serif') + '">' + text + '</text>';
  }
  s += '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" ' +
    'style="direction:ltr;max-width:100%;height:auto" role="img">';
  s += '<polygon points="' + P.map(function (p) { return f(p[0]) + ',' + f(p[1]); }).join(' ') + '" fill="#eef4ff" stroke="#14213d" stroke-width="2" stroke-linejoin="round"/>';
  /* خط‌چین‌ها */
  (o.dashed || []).forEach(function (d) {
    var a = T(d.from), b = T(d.to);
    s += '<line x1="' + f(a[0]) + '" y1="' + f(a[1]) + '" x2="' + f(b[0]) + '" y2="' + f(b[1]) + '" stroke="#14213d" stroke-width="1.8" stroke-dasharray="5 4"/>';
    if (d.rightAt) {
      var at = d.rightAt === 'to' ? b : a, other = d.rightAt === 'to' ? a : b;
      var u = unit(at, other), bd = d.baseDir || [1, 0], v = [bd[0], -bd[1]], r = 10;
      var p1 = [at[0] + u[0] * r, at[1] + u[1] * r], p2 = [p1[0] + v[0] * r, p1[1] + v[1] * r], p3 = [at[0] + v[0] * r, at[1] + v[1] * r];
      s += '<polyline points="' + f(p1[0]) + ',' + f(p1[1]) + ' ' + f(p2[0]) + ',' + f(p2[1]) + ' ' + f(p3[0]) + ',' + f(p3[1]) + '" fill="none" stroke="#14213d" stroke-width="1.6"/>';
    }
    if (d.label) {
      var mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], dir = unit(a, b), nrm = [-dir[1], dir[0]];
      var side = ((mid[0] - C[0]) * nrm[0] + (mid[1] - C[1]) * nrm[1]) >= 0 ? 1 : -1;
      s += label(d.label, mid[0] + nrm[0] * side * 12, mid[1] + nrm[1] * side * 12, 13, false);
    }
  });
  /* علامت قائمه در رأس */
  if (typeof o.right === 'number') {
    var vi = o.right, nx = P[(vi + 1) % 3], pv = P[(vi + 2) % 3], pp = P[vi];
    var u1 = unit(pp, nx), u2 = unit(pp, pv), r1 = 11;
    var q1 = [pp[0] + u1[0] * r1, pp[1] + u1[1] * r1], q3 = [pp[0] + u2[0] * r1, pp[1] + u2[1] * r1], q2 = [q1[0] + u2[0] * r1, q1[1] + u2[1] * r1];
    s += '<polyline points="' + f(q1[0]) + ',' + f(q1[1]) + ' ' + f(q2[0]) + ',' + f(q2[1]) + ' ' + f(q3[0]) + ',' + f(q3[1]) + '" fill="none" stroke="#14213d" stroke-width="1.8"/>';
  }
  /* متن زاویه‌ها */
  (o.angles || []).forEach(function (an) {
    var pp2 = P[an.at], uc = unit(pp2, C);
    s += label(an.text, pp2[0] + uc[0] * 30, pp2[1] + uc[1] * 30, 12, true);
  });
  /* برچسب ضلع‌ها */
  for (i = 0; i < 3; i++) {
    var lab = o.sides && o.sides[i];
    if (lab) {
      var a2 = P[i], b2 = P[(i + 1) % 3], md = [(a2[0] + b2[0]) / 2, (a2[1] + b2[1]) / 2], ou = unit(C, md);
      s += label(lab, md[0] + ou[0] * 14, md[1] + ou[1] * 14, 14, false);
    }
  }
  /* نام رأس‌ها */
  for (i = 0; i < 3; i++) {
    if (o.names && o.names[i]) {
      var ov = unit(C, P[i]);
      s += label(o.names[i], P[i][0] + ov[0] * 16, P[i][1] + ov[1] * 16, 15, true);
    }
  }
  /* نقطه‌های کمکی (مثل پای ارتفاع) */
  (o.extra || []).forEach(function (e) {
    var q = T(e.p), oe = unit(C, q);
    s += '<circle cx="' + f(q[0]) + '" cy="' + f(q[1]) + '" r="3" fill="#14213d"/>';
    if (e.label) { s += label(e.label, q[0] + oe[0] * 14, q[1] + oe[1] * 14 + 2, 15, true); }
  });
  if (o.caption) { s += label(o.caption, W / 2, H - 9, 13, false); }
  return s + '</svg>';
}
function ROW(a, b) { return '<div class="figrow">' + a + b + '</div>'; }

/* ANGS: یک یا چند زاویه کنار هم (برای تشخیص نوع زاویه و مقایسه)
   list = [{deg, len, label}] ؛ رأس هر زاویه پایین سلول و نیمسازش رو به بالاست */
function ANGS(list) {
  var cw = 200, h = 140, W = cw * list.length, s, i, a, vx, vy = 116, r1, r2, e1, e2, arc = 24;
  function f(n) { return Math.round(n * 100) / 100; }
  s = '<svg viewBox="0 0 ' + W + ' ' + h + '" width="' + W + '" height="' + h + '" xmlns="http://www.w3.org/2000/svg" style="direction:ltr;max-width:100%;height:auto" role="img">';
  for (i = 0; i < list.length; i++) {
    a = list[i]; vx = i * cw + cw / 2;
    r1 = (90 - a.deg / 2) * DEG; r2 = (90 + a.deg / 2) * DEG;
    e1 = [vx + a.len * Math.cos(r1), vy - a.len * Math.sin(r1)];
    e2 = [vx + a.len * Math.cos(r2), vy - a.len * Math.sin(r2)];
    s += '<polyline points="' + f(e1[0]) + ',' + f(e1[1]) + ' ' + vx + ',' + vy + ' ' + f(e2[0]) + ',' + f(e2[1]) + '" fill="none" stroke="#14213d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';
    s += '<path d="M ' + f(vx + arc * Math.cos(r1)) + ' ' + f(vy - arc * Math.sin(r1)) + ' A ' + arc + ' ' + arc + ' 0 0 0 ' +
      f(vx + arc * Math.cos(r2)) + ' ' + f(vy - arc * Math.sin(r2)) + '" fill="none" stroke="#0e8f7e" stroke-width="2.5"/>';
    s += '<circle cx="' + vx + '" cy="' + vy + '" r="3.5" fill="#14213d"/>';
    if (a.label) {
      s += '<text x="' + vx + '" y="' + (h - 4) + '" text-anchor="middle" font-size="14" font-weight="bold" fill="#14213d" font-family="Tahoma,sans-serif">' + a.label + '</text>';
    }
  }
  return s + '</svg>';
}

/* PROT: نقاله‌ی تک‌مقیاسه؛ یک پرتو روی صفر (سمت راست) و پرتو دوم روی deg */
function PROT(deg) {
  var cx = 170, cy = 158, R = 128, a, s, t, c, sn, r0, r1, f = function (n) { return Math.round(n * 100) / 100; };
  s = '<svg viewBox="0 0 340 180" width="340" height="180" xmlns="http://www.w3.org/2000/svg" style="direction:ltr;max-width:100%;height:auto;display:block;margin:6px auto" role="img">';
  s += '<path d="M ' + (cx - R) + ' ' + cy + ' A ' + R + ' ' + R + ' 0 0 1 ' + (cx + R) + ' ' + cy + ' Z" fill="#eef4ff" stroke="#14213d" stroke-width="2"/>';
  for (a = 0; a <= 180; a += 5) {
    t = a * DEG; c = Math.cos(t); sn = Math.sin(t);
    r0 = (a % 10 === 0) ? R - 14 : R - 8;
    s += '<line x1="' + f(cx + r0 * c) + '" y1="' + f(cy - r0 * sn) + '" x2="' + f(cx + R * c) + '" y2="' + f(cy - R * sn) + '" stroke="#14213d" stroke-width="' + (a % 10 === 0 ? 1.5 : 1) + '"/>';
    if (a % 10 === 0) {
      r1 = R - 26;
      s += '<text x="' + f(cx + r1 * c) + '" y="' + f(cy - r1 * sn + 3) + '" text-anchor="middle" font-size="9" fill="#14213d" font-family="Tahoma,sans-serif">' + a + '</text>';
    }
  }
  s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + R + 14) + '" y2="' + cy + '" stroke="#c62828" stroke-width="3" stroke-linecap="round"/>';
  s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + f(cx + (R + 14) * Math.cos(deg * DEG)) + '" y2="' + f(cy - (R + 14) * Math.sin(deg * DEG)) + '" stroke="#c62828" stroke-width="3" stroke-linecap="round"/>';
  s += '<circle cx="' + cx + '" cy="' + cy + '" r="4" fill="#14213d"/>';
  return s + '</svg>';
}

/* جدول ساده (سطر اول سرستون) */
function TABLE(rows) {
  var h = '<table class="dt">', i, j;
  for (i = 0; i < rows.length; i++) {
    h += '<tr>';
    for (j = 0; j < rows[i].length; j++) { h += (i === 0 || j === 0 ? '<th>' : '<td>') + rows[i][j] + (i === 0 || j === 0 ? '</th>' : '</td>'); }
    h += '</tr>';
  }
  return h + '</table>';
}

/* ---------- مشخصات هندسی شکل‌ها (جدا نگه‌داشته شده تا قابل بررسی باشند) ----------
   lens: طول واقعی ضلع‌های برچسب‌خورده [AB, BC, CA] (null = بدون برچسب عددی) */
var GEO = {
  Q05: { pts: [[0, 0], [6, 0], [2, 4]], names: ['A', 'B', 'C'] },
  Q06: { pts: rotPts([[0, 3], [0, 0], [4, 0]], 20), names: ['A', 'B', 'C'], right: 1 },
  Q07: { pts: [[0, 5], [0, 0], [4.195, 0]], names: ['A', 'B', 'C'], angles: [{ at: 0, text: '40°' }, { at: 2, text: '50°' }] },
  Q08: { pts: [[0, 3], [0, 0], [4, 0]], names: ['A', 'B', 'C'], sides: ['3', '4', 'x'], right: 1, lens: [3, 4, 5] },
  Q09: { pts: [[0, 5], [0, 0], [12, 0]], names: ['A', 'B', 'C'], sides: ['5', 'x', '13'], right: 1, lens: [5, 12, 13] },
  Q10: { pts: rotPts([[0, 6], [0, 0], [8, 0]], -15), names: ['A', 'B', 'C'], sides: ['6', '8', 'x'], right: 1, lens: [6, 8, 10] },
  Q11: {
    pts: [[5, 0], [0, 0], [7 * Math.cos(70 * DEG), 7 * Math.sin(70 * DEG)]], names: ['A', 'B', 'C'], sides: ['5', '7', 'x'],
    angles: [{ at: 1, text: '70°' }], lens: [5, 7, null]
  },
  Q13a: { pts: triPts(4, 5, 6), names: ['A', 'B', 'C'], sides: ['4', '5', ''], lens: [4, 5, 6] },
  Q13b: { pts: rotPts(scalePts(triPts(4, 5, 6), 2), 25), names: ['D', 'E', 'F'], sides: ['8', 'y', ''], lens: [8, 10, 12] },
  Q14a: { pts: triPts(6, 9, 12), names: ['A', 'B', 'C'], sides: ['6', '9', ''], lens: [6, 9, 12] },
  Q14b: { pts: rotPts(scalePts(triPts(6, 9, 12), 2 / 3), 200), names: ['D', 'E', 'F'], sides: ['4', 'x', ''], lens: [4, 6, 8] },
  Q15a: { pts: [[0, 0], [3, 0], [0, 2]], names: [], sides: ['3', '', '2'], right: 0, caption: 'میله و سایه‌اش', lens: [3, null, 2] },
  Q15b: { pts: [[0, 0], [12, 0], [0, 8]], names: [], sides: ['12', '', '؟'], right: 0, caption: 'درخت و سایه‌اش', lens: [12, null, 8] },
  Q16: {
    pts: [[0, 0], [6, 0], [3, 4]], names: ['A', 'B', 'C'], sides: ['6', '5', '5'], lens: [6, 5, 5],
    dashed: [{ from: [3, 4], to: [3, 0], label: '4', rightAt: 'to', baseDir: [1, 0] }]
  },
  Q17: {
    pts: [[2, 5], [0, 0], [8, 0]], names: ['A', 'B', 'C'],
    dashed: [{ from: [2, 5], to: [2, 0] }, { from: [2, 5], to: [4, 0] }],
    extra: [{ p: [2, 0], label: 'D' }, { p: [4, 0], label: 'E' }]
  },
  Q18: { pts: rotPts([[0, 6], [0, 0], [8, 0]], 15), names: ['A', 'B', 'C'], sides: ['6', '8', '10'], right: 1, lens: [6, 8, 10] },
  Q19: {
    pts: [[12, 3], [0, 0], [8, 0]], names: ['A', 'B', 'C'], sides: ['', '8', '5'], lens: [null, 8, 5], W: 320,
    dashed: [{ from: [8, 0], to: [12, 0] }, { from: [12, 3], to: [12, 0], label: '3', rightAt: 'to', baseDir: [1, 0] }],
    extra: [{ p: [12, 0], label: 'D' }]
  }
};
function G(id, extra) { var o = {}, k; for (k in GEO[id]) { o[k] = GEO[id][k]; } for (k in (extra || {})) { o[k] = extra[k]; } return TRI(o); }

/* اطلاعات فصل (EXAM_META) و مهارت‌ها (SKILLS) به data/ch5.js منتقل شده‌اند (منبع مشترک آزمون، درسنامه و منو). */

/* ---------- نام فارسی نوع خطا (برای گزارش) ---------- */
window.ERR_NAMES = {
  concept: 'نادرستی در درک مفهوم',
  read: 'اشتباه در خواندن از شکل یا ابزار',
  sign: 'اشتباه در علامت',
  calc: 'اشتباه محاسباتی',
  method: 'اشتباه در انتخاب روش'
};

window.QUESTIONS = [

  /* ============ G01: انواع زاویه و اندازه‌گیری ============ */
  {
    id: 'Q01', skill: 'G01', secondary: [], difficulty: 'basic', type: 'mcq',
    prompt: 'نوع زاویهٔ زیر چیست؟' + ANGS([{ deg: 135, len: 105 }]),
    options: [
      { t: 'تند', err: 'concept' },
      { t: 'قائمه', err: 'concept' },
      { t: 'باز' },
      { t: 'مستقیم', err: 'concept' }
    ],
    answer: 2,
    feedback: 'زاویه‌ای که از 90° بزرگ‌تر و از 180° کوچک‌تر باشد «باز» نام دارد. این زاویه از یک زاویهٔ قائمه بازتر است ولی هنوز دو پرتویش یک خط راست نساخته‌اند.'
  },
  {
    id: 'Q02', skill: 'G01', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'کدام اندازه مربوط به یک زاویهٔ باز است؟',
    options: [
      { t: M('45°'), err: 'concept' },
      { t: M('130°') },
      { t: M('90°'), err: 'concept' },
      { t: M('180°'), err: 'concept' }
    ],
    answer: 1,
    feedback: 'زاویهٔ تند کوچک‌تر از 90° است، قائمه برابر 90°، باز بین 90° و 180° و مستقیم برابر 180°. پس 130° باز است.'
  },
  {
    id: 'Q03', skill: 'G01', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'اندازهٔ زاویه‌ای که با دو پرتوی قرمز ساخته شده چند درجه است؟ (هر خط کوچک روی نقاله ' + M('5°') + ' است.)' + PROT(65),
    options: [
      { t: M('115°'), err: 'read' },
      { t: M('65°') },
      { t: M('60°'), err: 'read' },
      { t: M('70°'), err: 'read' }
    ],
    answer: 1,
    feedback: 'یکی از دو پرتو روی صفر قرار دارد؛ از همان صفر شروع کن. پرتوی دوم دقیقاً یک خط کوچک بعد از 60 است (هر خط کوچک 5 درجه): 65°. اگر از سمت دیگر نقاله (180) بخوانی به 115° می‌رسی.'
  },
  {
    id: 'Q04', skill: 'G01', secondary: [], difficulty: 'hard', type: 'mcq',
    prompt: 'کدام زاویه بزرگ‌تر است؟' + ANGS([{ deg: 50, len: 120, label: 'الف' }, { deg: 70, len: 66, label: 'ب' }]),
    options: [
      { t: 'زاویهٔ الف', err: 'concept' },
      { t: 'زاویهٔ ب' },
      { t: 'هر دو هم‌اندازه‌اند', err: 'concept' },
      { t: 'نمی‌شود فهمید' }
    ],
    answer: 1,
    feedback: 'اندازهٔ زاویه به میزان بازبودن دو پرتو بستگی دارد، نه به طول آن‌ها. زاویهٔ ب بازتر است (70° در برابر 50°) حتی با اینکه پرتوهایش کوتاه‌ترند.'
  },

  /* ============ G02: اجزای مثلث و مثلث قائم‌الزاویه ============ */
  {
    id: 'Q05', skill: 'G02', secondary: [], difficulty: 'basic', type: 'mcq',
    prompt: 'در مثلث زیر، ضلع روبه‌رو به رأس ' + M('A') + ' کدام است؟' + '<div class="figrow">' + G('Q05') + '</div>',
    options: [
      { t: M('AB'), err: 'concept' },
      { t: M('AC'), err: 'concept' },
      { t: M('BC') },
      { t: M('AB') + ' و ' + M('AC'), err: 'concept' }
    ],
    answer: 2,
    feedback: 'ضلع روبه‌رو به یک رأس، ضلعی است که آن رأس را نمی‌بیند؛ یعنی دو سر آن رأس‌های دیگرند. برای رأس A ضلع BC روبه‌روست. دو ضلع AB و AC از رأس A می‌گذرند و روبه‌رو نیستند.'
  },
  {
    id: 'Q06', skill: 'G02', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'در مثلث قائم‌الزاویهٔ زیر، وتر کدام است؟' + '<div class="figrow">' + G('Q06') + '</div>',
    options: [
      { t: M('AB'), err: 'concept' },
      { t: M('BC'), err: 'concept' },
      { t: M('AC') },
      { t: 'نمی‌توان تعیین کرد', err: 'concept' }
    ],
    answer: 2,
    feedback: 'وتر ضلعی است که روبه‌روی زاویهٔ قائمه قرار دارد و بلندترین ضلع مثلث قائم‌الزاویه است. علامت قائمه در رأس B است؛ پس وتر AC می‌شود.'
  },
  {
    id: 'Q07', skill: 'G02', secondary: [], difficulty: 'hard', type: 'mcq',
    prompt: 'در مثلث زیر دو زاویه ' + M('40°') + ' و ' + M('50°') + ' هستند و زاویهٔ سوم نوشته نشده است. آیا این مثلث قائم‌الزاویه است؟' + '<div class="figrow">' + G('Q07') + '</div>',
    options: [
      { t: 'بله؛ چون زاویهٔ سوم برابر 90° می‌شود' },
      { t: 'خیر؛ چون علامت زاویهٔ قائمه روی شکل نشان داده نشده', err: 'concept' },
      { t: 'خیر؛ چون مجموع این دو زاویه 90° است، نه 180°', err: 'concept' },
      { t: 'نمی‌توان فهمید؛ چون زاویهٔ سوم داده نشده', err: 'concept' }
    ],
    answer: 0,
    feedback: 'مجموع زاویه‌های هر مثلث 180° است؛ پس زاویهٔ سوم 180 − (40 + 50) = 90° می‌شود و مثلث قائم‌الزاویه است. لازم نیست علامت قائمه روی شکل باشد.'
  },

  /* ============ G03: قضیهٔ فیثاغورس ============ */
  {
    id: 'Q08', skill: 'G03', secondary: [], difficulty: 'basic', type: 'numeric',
    prompt: 'در مثلث قائم‌الزاویهٔ زیر، طول ' + X('x') + ' (وتر) را بنویس.' + '<div class="figrow">' + G('Q08') + '</div>',
    answer: 5, answerHtml: X('x=5'),
    traps: [{ value: 7, err: 'concept' }, { value: 25, err: 'method' }],
    feedback: 'مربع وتر برابر مجموع مربع‌های دو ضلع قائم است: x² = 3² + 4² = 9 + 16 = 25 ، پس x = 5. جمع خود طول‌ها (3 + 4) به‌جای مربع‌ها نادرست است، و 25 مربع وتر است نه خود وتر.'
  },
  {
    id: 'Q09', skill: 'G03', secondary: [], difficulty: 'medium', type: 'numeric',
    prompt: 'در مثلث قائم‌الزاویهٔ زیر، طول ضلع قائم ' + X('x') + ' را بنویس.' + '<div class="figrow">' + G('Q09') + '</div>',
    answer: 12, answerHtml: X('x=12'),
    traps: [{ value: Math.sqrt(194), err: 'concept' }, { value: 8, err: 'concept' }],
    feedback: 'وتر 13 است، پس 13² = 5² + x² ؛ یعنی x² = 169 − 25 = 144 و x = 12. وتر همیشه در طرفی می‌نشیند که تنها است (مربع وتر = مجموع مربع‌های ضلع‌های قائم). تفاضل ساده 13 − 5 = 8 جواب نیست.'
  },
  {
    id: 'Q10', skill: 'G03', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'در مثلث قائم‌الزاویهٔ زیر، کدام رابطه برای پیداکردن ' + X('x') + ' درست است؟' + '<div class="figrow">' + G('Q10') + '</div>',
    options: [
      { t: X('x=6+8'), err: 'concept' },
      { t: X('x^2=6^2+8^2') },
      { t: X('6^2=x^2+8^2'), err: 'concept' },
      { t: X('x^2=8^2-6^2'), err: 'concept' }
    ],
    answer: 1,
    feedback: 'x وتر است (روبه‌روی قائمه) و فقط مربع وتر برابر مجموع مربع‌های دو ضلع دیگر است: x² = 6² + 8². جمع خود طول‌ها برابر x نیست و وتر هیچ‌وقت در طرف «مجموع» قرار نمی‌گیرد.'
  },
  {
    id: 'Q11', skill: 'G03', secondary: [], difficulty: 'hard', topic: 'محاسبهٔ طول ضلع مثلث', type: 'mcq',
    prompt: 'در مثلث زیر، زاویهٔ B برابر ' + M('70°') + ' است. دربارهٔ پیداکردن ' + X('x') + ' کدام نتیجه‌گیری درست است؟' + '<div class="figrow">' + G('Q11') + '</div>',
    options: [
      { t: 'می‌توان نوشت ' + X('x^2=5^2+7^2') + ' ، چون هر مثلثی این رابطه را دارد', err: 'concept' },
      { t: 'نمی‌توان از رابطهٔ فیثاغورس استفاده کرد، چون این مثلث قائم‌الزاویه نیست.' },
      { t: X('x=7-5=2'), err: 'concept' },
      { t: X('x=5+7=12'), err: 'concept' }
    ],
    answer: 1,
    feedback: 'رابطهٔ فیثاغورس فقط در مثلث قائم‌الزاویه برقرار است. در این مثلث زاویهٔ B برابر 70° است، نه 90°؛ پس نمی‌شود از آن استفاده کرد. طول ضلع سوم هم نه مجموع و نه تفاضل دو ضلع دیگر است.'
  },

  /* ============ G04: تشابه و تناسب ============ */
  {
    id: 'Q12', skill: 'G04', secondary: [], difficulty: 'basic', type: 'mcq',
    prompt: 'اندازهٔ زاویه‌های چهار مثلث در جدول داده شده است. کدام دو مثلث با هم متشابه‌اند؟' +
      TABLE([['مثلث', 'زاویهٔ اول', 'زاویهٔ دوم', 'زاویهٔ سوم'],
      ['P', '40°', '60°', '80°'], ['Q', '80°', '60°', '40°'],
      ['R', '40°', '70°', '70°'], ['S', '50°', '60°', '70°']]),
    options: [
      { t: M('P') + ' و ' + M('R'), err: 'concept' },
      { t: M('P') + ' و ' + M('Q') },
      { t: M('Q') + ' و ' + M('S'), err: 'concept' },
      { t: M('R') + ' و ' + M('S'), err: 'concept' }
    ],
    answer: 1,
    feedback: 'دو مثلث وقتی متشابه‌اند که زاویه‌هایشان دو به دو برابر باشند. P و Q هر دو زاویه‌های 40° و 60° و 80° دارند و فقط به ترتیب دیگری نوشته شده‌اند. بقیهٔ زوج‌ها حداکثر یک زاویهٔ برابر دارند.'
  },
  {
    id: 'Q13', skill: 'G04', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'دو مثلث ABC و DEF متشابه‌اند (رأس‌ها به همین ترتیب متناظرند). کدام تناسب درست است؟' + ROW(G('Q13a'), G('Q13b')),
    options: [
      { t: M(F('AB', 'DE') + ' = ' + F('EF', 'BC')), err: 'method' },
      { t: M(F('AB', 'DE') + ' = ' + F('BC', 'EF')) },
      { t: M(F('AB', 'EF') + ' = ' + F('BC', 'DE')), err: 'concept' },
      { t: M(F('AB', 'BC') + ' = ' + F('EF', 'DE')), err: 'concept' }
    ],
    answer: 1,
    feedback: 'ضلع‌های متناظر: AB با DE و BC با EF. نسبت ضلع‌های متناظر برابر است: AB/DE = BC/EF. اگر جای یک کسر را وارونه بنویسی یا ضلع‌های نامتناظر را کنار هم بگذاری، تناسب نادرست می‌شود.'
  },
  {
    id: 'Q14', skill: 'G04', secondary: ['N09'], difficulty: 'medium', type: 'numeric',
    prompt: 'دو مثلث ABC و DEF متشابه‌اند (رأس‌ها به همین ترتیب متناظرند). طول ' + X('x') + ' را بنویس.' + ROW(G('Q14a'), G('Q14b')),
    answer: 6, answerHtml: X('x=6'),
    traps: [{ value: 7, err: 'concept' }, { value: 13.5, err: 'method' }],
    feedback: 'ضلع‌های متناظر: AB با DE و BC با EF؛ پس ' + M(F('6', '4') + ' = ' + F('9', 'x')) + ' و ' + M('x = (4 × 9) \\div 6 = 6') + '.<br>تفاوت طول‌ها (6 − 4 = 2) را نمی‌شود از ضلع دیگر کم یا به آن اضافه کرد، چون تشابه یعنی نسبت‌ها برابرند نه تفاضل‌ها.'
  },
  {
    id: 'Q15', skill: 'G04', secondary: ['N09'], difficulty: 'hard', topic: 'مسئلهٔ کاربردی با مثلث‌ها', type: 'numeric',
    prompt: 'سایهٔ میله‌ای به ارتفاع ' + M('2') + ' متر روی زمین ' + M('3') + ' متر است. در همان لحظه سایهٔ یک درخت ' + M('12') + ' متر است. ارتفاع درخت چند متر است؟ (پرتوهای خورشید در یک لحظه موازی‌اند.)' + ROW(G('Q15a'), G('Q15b')),
    answer: 8, answerHtml: M('8'),
    traps: [{ value: 11, err: 'concept' }, { value: 18, err: 'method' }],
    feedback: 'چون پرتوهای خورشید موازی‌اند، زاویه‌ها برابر و دو مثلث متشابه‌اند:' + '<div class="mathline">' + M(F('2', '3') + ' = ' + F('h', '12') + '\\quad\\Rightarrow\\quad h = (2 × 12) \\div 3 = 8') + '</div>' + 'افزودن اختلاف سایه‌ها (12 − 3 = 9) به 2 نادرست است و وارونه‌کردن نسبت 18 می‌دهد.'
  },

  /* ============ G05: مساحت مثلث ============ */
  {
    id: 'Q16', skill: 'G05', secondary: [], difficulty: 'basic', type: 'numeric',
    prompt: 'مساحت مثلث ABC را بر حسب سانتی‌متر مربع بنویس (فقط عدد). اندازه‌ها بر حسب سانتی‌متر است و قاعدهٔ AB را در نظر بگیر.' + '<div class="figrow">' + G('Q16') + '</div>',
    answer: 12, answerHtml: M('12'),
    traps: [{ value: 24, err: 'concept' }, { value: 15, err: 'concept' }],
    feedback: 'مساحت مثلث = ' + M(F('1', '2')) + ' × قاعده × ارتفاع. ارتفاع باید بر قاعده عمود باشد (عدد 4)، نه ضلع مایل (عدد 5):' + '<div class="mathline">' + M(F('1', '2') + ' × 6 × 4 = 12\\cdot') + '</div>' + 'اگر ' + M(F('1', '2')) + ' را فراموش کنی 24 می‌شود.'
  },
  {
    id: 'Q17', skill: 'G05', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'در مثلث ABC قاعدهٔ BC افقی است. کدام پاره‌خط، ارتفاع مثلث نسبت به قاعدهٔ BC است؟' + '<div class="figrow">' + G('Q17') + '</div>',
    options: [
      { t: M('AD') },
      { t: M('AE'), err: 'concept' },
      { t: M('AB'), err: 'concept' },
      { t: M('AC'), err: 'concept' }
    ],
    answer: 0,
    feedback: 'ارتفاع پاره‌خطی است که از یک رأس بر ضلع روبه‌رو (یا امتداد آن) عمود می‌شود. AD بر BC عمود است. AE به وسط BC می‌رود ولی مایل است و AB و AC خودشان ضلع‌اند.'
  },
  {
    id: 'Q18', skill: 'G05', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'مساحت مثلث قائم‌الزاویهٔ زیر چند سانتی‌متر مربع است؟' + '<div class="figrow">' + G('Q18') + '</div>',
    options: [
      { t: M('48'), err: 'concept' },
      { t: M('24') },
      { t: M('30'), err: 'concept' },
      { t: M('40'), err: 'concept' }
    ],
    answer: 1,
    feedback: 'در مثلث قائم‌الزاویه دو ضلع قائم بر هم عمودند و می‌توانند قاعده و ارتفاع هم باشند: ' + M(F('1', '2') + ' × 6 × 8 = 24') + '. وتر (10) بر ضلع‌ها عمود نیست و ارتفاع حساب نمی‌شود؛ ' + M(F('1', '2') + ' × 10 × 6 = 30') + ' و ' + M(F('1', '2') + ' × 10 × 8 = 40') + ' نادرست‌اند.'
  },
  {
    id: 'Q19', skill: 'G05', secondary: [], difficulty: 'hard', type: 'numeric',
    prompt: 'مساحت مثلث ABC را با قاعدهٔ BC بر حسب سانتی‌متر مربع بنویس (فقط عدد). ارتفاع از رأس A بر امتداد BC فرود آمده است.' + '<div class="figrow">' + G('Q19') + '</div>',
    answer: 12, answerHtml: M('12'),
    traps: [{ value: 20, err: 'concept' }, { value: 24, err: 'concept' }],
    feedback: 'ارتفاع نسبت به قاعدهٔ BC خطی است که از A بر امتداد BC عمود شده؛ یعنی ' + M('AD = 3') + '. ضلع مایل ' + M('AC = 5') + ' ارتفاع نیست. مساحت = ' + M(F('1', '2') + ' × 8 × 3 = 12') + ' سانتی‌متر مربع. ارتفاع می‌تواند بیرون مثلث باشد.'
  }
];
