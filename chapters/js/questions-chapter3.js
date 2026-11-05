/* ==========================================================================
   Chapter3 — معادله و نامعادله
   داده‌های آزمون (قابل ویرایش). منطق برنامه در app.js است.

   ساختار هر سؤال:
     id          شناسهٔ سؤال
     skill       مهارت اصلی (Skill ID)
     secondary   مهارت‌های فرعی که پاسخ‌دادن به آن‌ها هم تکیه دارد (فقط ثبت می‌شود، امتیاز نمی‌گیرد)
     difficulty  basic | medium | hard   (وزن‌ها: ۱ ، ۲ ، ۳)
     type        mcq | multi | numeric | match
     prompt      صورت سؤال (HTML)
     feedback    نکتهٔ آموزشی کوتاه (در گزارش نمایش داده می‌شود)
   و بسته به نوع:
     mcq:        options:[{t, err?}] ، answer: اندیس گزینهٔ درست
     multi:      options:[{t}] ، answer: اندیس گزینه‌های درست (مرتب‌شده)؛ فقط تطابق کامل درست است
     numeric:    answer: عدد ، answerHtml ، traps:[{value, err}]
     match:      left:[html] ، right:[متن ساده] ، answer: اندیس سمت راستِ هر ردیف

   برچسب‌های خطا (err): sign | calc | concept | method | read
   فقط وقتی روی گزینه/دام گذاشته شده که الگوی خطا واقعاً قابل تفسیر باشد.
   ========================================================================== */

/* ---------- توابع کمکی نمایش ریاضی ----------
   فرمول‌ها با LaTeX نوشته و با KaTeX نمایش داده می‌شوند:
     M(...)  → فرمول (بین $ ... $)     F(a, b) → \frac{a}{b}     P(b, e) → b^{e}
     E('3x^2y-5')  → LaTeX از نوشتن ساده (^ توان، * ضرب؛ ^{...} برای توان چندکاراکتری)
     X('...')      → M(E('...'))  یعنی فرمول آمادهٔ نمایش
   رقم‌ها به‌طور خودکار فارسی می‌شوند.
   برای < و > در نامعادله داخل E/X از &lt; و &gt; استفاده کن تا HTML نشکند. */
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
    } else if (c === '*') { out += '\\times '; i++; }
    else { out += c; i++; }
  }
  return out;
}
function X(s) { return M(E(s)); }
function S(a, b) { return X(a) + ' و ' + X(b); }       // دو جواب: «a و b»
function LTR(s) { return '\u2066' + s + '\u2069'; }   // متن چپ‌به‌راست داخل منوی کشویی

/* RAY: محور اعداد کوچک با نمایش جواب نامعادله (فقط SVG با ویژگی‌های درون‌خطی)
   o = { min, max, at (عدد مرزی), dir: 'left'|'right', closed: true|false } */
function RAY(o) {
  var W = 280, H = 62, pad = 20, y = 28, span = o.max - o.min, v, s;
  function px(t) { return pad + (t - o.min) / span * (W - 2 * pad); }
  s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" ' +
    'style="direction:ltr;max-width:100%;height:auto" role="img">';
  s += '<line x1="' + (pad - 10) + '" y1="' + y + '" x2="' + (W - pad + 10) + '" y2="' + y + '" stroke="#14213d" stroke-width="2"/>';
  for (v = o.min; v <= o.max; v++) {
    s += '<line x1="' + px(v) + '" y1="' + (y - 6) + '" x2="' + px(v) + '" y2="' + (y + 6) + '" stroke="#14213d" stroke-width="1.6"/>';
    s += '<text x="' + px(v) + '" y="' + (y + 24) + '" text-anchor="middle" font-size="11" fill="#14213d" font-family="Tahoma,sans-serif">' +
      String(v).replace('-', '−') + '</text>';
  }
  s += '<line x1="' + px(o.at) + '" y1="' + y + '" x2="' + (o.dir === 'right' ? W - pad + 10 : pad - 10) + '" y2="' + y +
    '" stroke="#0e8f7e" stroke-width="6" stroke-linecap="round"/>';
  s += '<circle cx="' + px(o.at) + '" cy="' + y + '" r="6.5" fill="' + (o.closed ? '#14213d' : '#ffffff') +
    '" stroke="#14213d" stroke-width="2.5"/>';
  return s + '</svg>';
}

/* اطلاعات فصل (EXAM_META) و مهارت‌ها (SKILLS) به data/ch3.js منتقل شده‌اند (منبع مشترک آزمون، درسنامه و منو). */

/* ---------- نام فارسی نوع خطا (برای گزارش) ---------- */
window.ERR_NAMES = {
  sign: 'اشتباه در علامت',
  calc: 'اشتباه محاسباتی',
  concept: 'نادرستی در درک مفهوم',
  method: 'اشتباه در انتخاب روش',
  read: 'اشتباه در خواندن سؤال'
};

window.QUESTIONS = [

  /* ============ E01: مفهوم معادله و حفظ تساوی ============ */
  {
    id: 'Q01', skill: 'E01', secondary: ['A01'], difficulty: 'basic', type: 'mcq',
    prompt: 'کدام گزینه یک معادلهٔ یک‌مجهولی است؟',
    options: [
      { t: X('3x+5'), err: 'concept' },
      { t: X('3x+5=11') },
      { t: M('3x+5\\gt 11'), err: 'concept' },
      { t: M('3 + 5 = 8'), err: 'concept' }
    ],
    answer: 1,
    feedback: 'معادله یک تساوی است که در آن عددی نامعلوم (مجهول) وجود دارد. ' + X('3x+5') + ' فقط یک عبارت است، نامساوی تساوی نیست، و 3 + 5 = 8 مجهولی ندارد.'
  },
  {
    id: 'Q02', skill: 'E01', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'ترازویی در حال تعادل است و معادلهٔ ' + X('x+4=10') + ' را نشان می‌دهد. برای اینکه ' + X('x') + ' تنها شود و تعادل حفظ شود، کدام کار درست است؟',
    options: [
      { t: 'فقط از طرف چپ 4 تا کم کنیم', err: 'concept' },
      { t: 'از هر دو طرف 4 تا کم کنیم' },
      { t: 'به طرف راست 4 تا اضافه کنیم', err: 'concept' },
      { t: 'طرف چپ را در 4 ضرب کنیم', err: 'concept' }
    ],
    answer: 1,
    feedback: 'تساوی مثل ترازوی در تعادل است. هر کاری که انجام می‌دهیم باید روی هر دو طرف یکسان انجام شود؛ پس از هر دو طرف 4 تا کم می‌کنیم: x = 6.'
  },
  {
    id: 'Q03', skill: 'E01', secondary: [], difficulty: 'hard', type: 'mcq',
    prompt: 'می‌دانیم ' + X('x+3=8') + ' برقرار است. کدام تساوی با توجه به آن «حتماً» درست است؟',
    options: [
      { t: X('2(x+3)=8'), err: 'concept' },
      { t: X('2(x+3)=16') },
      { t: X('x=8+3'), err: 'sign' },
      { t: X('x+3+4=8'), err: 'concept' }
    ],
    answer: 1,
    feedback: 'اگر هر دو طرف یک تساوی را در عدد یکسان ضرب کنیم، تساوی برقرار می‌ماند: 2(x + 3) = 2 × 8 = 16. انجام کار فقط روی یک طرف (یا اضافه‌کردن 4 فقط به یک طرف) تساوی را به هم می‌زند.'
  },

  /* ============ E02: حل معادلهٔ خطی یک‌مجهولی ============ */
  {
    id: 'Q04', skill: 'E02', secondary: [], difficulty: 'basic', type: 'numeric',
    prompt: 'معادلهٔ زیر را حل کن:<div class="mathline">' + X('x-7=12') + '</div>',
    answer: 19, answerHtml: X('x=19'),
    traps: [{ value: 5, err: 'method' }],
    feedback: 'برای تنها‌کردن x، عکس تفریق (یعنی جمع) را روی هر دو طرف انجام می‌دهیم: x − 7 + 7 = 12 + 7 ، پس x = 19.'
  },
  {
    id: 'Q05', skill: 'E02', secondary: [], difficulty: 'medium', type: 'numeric',
    prompt: 'معادلهٔ زیر را حل کن:<div class="mathline">' + M(F(E('x'), 4) + ' = −3') + '</div>',
    answer: -12, answerHtml: X('x=-12'),
    traps: [{ value: -0.75, err: 'method' }, { value: 12, err: 'sign' }],
    feedback: 'عکس تقسیم بر 4، ضرب در 4 است: x = (−3) × 4 = −12. علامت منفی را حفظ کن.'
  },
  {
    id: 'Q06', skill: 'E02', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'جواب معادلهٔ ' + X('5x-7=18') + ' کدام است؟',
    options: [
      { t: X('x=25'), err: 'method' },
      { t: X('x=5') },
      { t: M(E('x=') + F(11, 5)), err: 'sign' },
      { t: M(E('x=') + F(18, 5)), err: 'concept' }
    ],
    answer: 1,
    feedback: 'اول 7 را به دو طرف اضافه کن: 5x = 25. بعد دو طرف را بر 5 تقسیم کن: x = 5. اگر 7 را با علامت اشتباه منتقل کنی 11 می‌شود و اگر تقسیم بر 5 را فراموش کنی 25.'
  },
  {
    id: 'Q07', skill: 'E02', secondary: [], difficulty: 'hard', type: 'mcq',
    prompt: 'جواب معادلهٔ زیر کدام است؟<div class="mathline">' + X('3x+5=x+13') + '</div>',
    options: [
      { t: X('x=9'), err: 'sign' },
      { t: X('x=2'), err: 'sign' },
      { t: X('x=4') },
      { t: X('x=-4'), err: 'sign' }
    ],
    answer: 2,
    feedback: 'x را به یک طرف و عددها را به طرف دیگر ببر: 3x − x = 13 − 5 ، یعنی 2x = 8 و x = 4. هر جمله که از طرفی به طرف دیگر می‌رود، علامتش عوض می‌شود.'
  },

  /* ============ E03: نامعادلهٔ خطی و تغییر جهت علامت ============ */
  {
    id: 'Q08', skill: 'E03', secondary: [], difficulty: 'basic', type: 'mcq',
    prompt: 'جواب نامعادلهٔ ' + M('x-2\\gt 5') + ' کدام است؟',
    options: [
      { t: M('x\\lt 7'), err: 'concept' },
      { t: M('x\\gt 7') },
      { t: M('x\\gt 3'), err: 'sign' },
      { t: M('x\\lt 3') }
    ],
    answer: 1,
    feedback: 'جمع یا تفریق یک عدد از دو طرف نامعادله جهت علامت را عوض نمی‌کند: x − 2 + 2 > 5 + 2 ، پس x > 7.'
  },
  {
    id: 'Q09', skill: 'E03', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'جواب نامعادلهٔ ' + M('-2x\\lt 6') + ' کدام است؟',
    options: [
      { t: M('x\\lt -3'), err: 'concept' },
      { t: M('x\\gt -3') },
      { t: M('x\\gt 3'), err: 'sign' },
      { t: M('x\\lt 3'), err: 'sign' }
    ],
    answer: 1,
    feedback: 'وقتی دو طرف نامعادله را بر عددی منفی تقسیم می‌کنیم، جهت علامت برعکس می‌شود:' + '<div class="mathline">' + M(F('-2x', '-2') + ' \\gt ' + F('6', '-2') + '\\quad\\Rightarrow\\quad x \\gt -3\\cdot') + '</div>'
  },
  {
    id: 'Q10', skill: 'E03', secondary: [], difficulty: 'medium', type: 'multi',
    prompt: 'در کدام کارها جهت علامت یک نامعادله باید عوض شود؟ همهٔ گزینه‌های درست را انتخاب کن.',
    options: [
      { t: 'تقسیم دو طرف بر ' + M('−3') },
      { t: 'کم‌کردن ' + M('3') + ' از دو طرف' },
      { t: 'ضرب دو طرف در ' + M('5') },
      { t: 'ضرب دو طرف در ' + M('−1') }
    ],
    answer: [0, 3],
    feedback: 'جهت علامت فقط وقتی عوض می‌شود که دو طرف را در عددی منفی ضرب کنیم یا بر عددی منفی تقسیم کنیم. جمع، تفریق و ضرب یا تقسیم در عدد مثبت جهت را تغییر نمی‌دهند.'
  },
  {
    id: 'Q11', skill: 'E03', secondary: [], difficulty: 'hard', type: 'mcq',
    prompt: 'جواب نامعادلهٔ زیر کدام است؟<div class="mathline">' + M('7-3x\\leq 13') + '</div>',
    options: [
      { t: M('x\\leq -2'), err: 'concept' },
      { t: M('x\\geq -2') },
      { t: M('x\\geq 2'), err: 'sign' },
      { t: M('x\\leq 2'), err: 'sign' }
    ],
    answer: 1,
    feedback: 'اول 7 را به طرف دیگر ببر: −3x ≤ 6. بعد دو طرف را بر −3 تقسیم کن و چون عدد منفی است جهت را برعکس کن: x ≥ −2.'
  },

  /* ============ E04: نمایش جواب روی محور و به‌صورت بازه ============ */
  {
    id: 'Q12', skill: 'E04', secondary: [], difficulty: 'basic', type: 'match',
    prompt: 'هر نامعادله را به بازهٔ معادلش وصل کن.',
    left: [M('x\\lt 2'), M('x\\geq 2'), M('x\\leq 2')],
    right: [LTR('(−∞, 2)'), LTR('(−∞, 2]'), LTR('[2, +∞)'), LTR('(2, +∞)')],
    answer: [0, 2, 1],
    feedback: 'کروشه یعنی عدد مرزی جزو جواب است (برای ≥ و ≤) و پرانتز یعنی نیست (برای < و >). بی‌نهایت همیشه با پرانتز می‌آید. x &lt; 2 برابر (−∞, 2) ، x ≥ 2 برابر [2, +∞) و x ≤ 2 برابر (−∞, 2] است.'
  },
  {
    id: 'Q13', skill: 'E04', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'جواب نامعادلهٔ ' + M('x\\geq -1') + ' روی کدام محور درست نشان داده شده است؟',
    options: [
      { t: RAY({ min: -4, max: 4, at: -1, dir: 'right', closed: false }), err: 'concept' },
      { t: RAY({ min: -4, max: 4, at: -1, dir: 'left', closed: true }), err: 'concept' },
      { t: RAY({ min: -4, max: 4, at: -1, dir: 'right', closed: true }) },
      { t: RAY({ min: -4, max: 4, at: 1, dir: 'right', closed: true }), err: 'sign' }
    ],
    answer: 2,
    feedback: 'دایرهٔ توپر یعنی عدد مرزی جزو جواب است (برای ≥ و ≤) و دایرهٔ توخالی یعنی نیست. x ≥ −1 یعنی همهٔ عددهای بزرگ‌تر یا مساوی −1، پس از −1 به سمت راست.'
  },
  {
    id: 'Q14', skill: 'E04', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'جواب نامعادله‌ای که روی محور زیر نشان داده شده را به‌صورت بازه بنویس.' +
      '<div class="fig">' + RAY({ min: -5, max: 3, at: -2, dir: 'right', closed: true }) + '</div>',
    options: [
      { t: M('[−2, +∞)') },
      { t: M('(−2, +∞)'), err: 'concept' },
      { t: M('(−∞, −2]'), err: 'concept' },
      { t: M('[−2, +∞]'), err: 'concept' }
    ],
    answer: 0,
    feedback: 'دایرهٔ توپر در −2 یعنی −2 جزو جواب است، پس با کروشه نوشته می‌شود؛ و جواب به سمت راست ادامه دارد. بی‌نهایت هیچ‌وقت با کروشه نوشته نمی‌شود: [−2, +∞).'
  },
  {
    id: 'Q15', skill: 'E04', secondary: ['E03'], difficulty: 'hard', type: 'mcq',
    prompt: 'جواب نامعادلهٔ ' + M('3-2x\\leq 9') + ' را به‌صورت بازه بنویس.',
    options: [
      { t: M('[3, +∞)'), err: 'sign' },
      { t: M('(−∞, −3]'), err: 'concept' },
      { t: M('[−3, +∞)') },
      { t: M('(−3, +∞)'), err: 'concept' }
    ],
    answer: 2,
    feedback: 'اول 3 را به طرف دیگر ببر: −2x ≤ 6. تقسیم بر −2 جهت را برعکس می‌کند: x ≥ −3. چون ≥ است عدد −3 جزو جواب است، پس بازه [−3, +∞) می‌شود.'
  },

  /* ============ E05: معادله‌های دارای کسر و عبارت جبری ============ */
  {
    id: 'Q16', skill: 'E05', secondary: [], difficulty: 'basic', type: 'numeric',
    prompt: 'معادلهٔ زیر را حل کن:<div class="mathline">' + M(F(E('x'), 4) + ' + 2 = 5') + '</div>',
    answer: 12, answerHtml: X('x=12'),
    traps: [{ value: 3, err: 'method' }],
    feedback: 'اول 2 را از دو طرف کم کن: x/4 = 3. بعد دو طرف را در 4 ضرب کن: x = 12.'
  },
  {
    id: 'Q17', skill: 'E05', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'جواب معادلهٔ زیر کدام است؟<div class="mathline">' + M(F(E('x'), 2) + ' + ' + F(E('x'), 3) + ' = 5') + '</div>',
    options: [
      { t: X('x=30'), err: 'calc' },
      { t: X('x=6') },
      { t: M(E('x=') + F(25, 2)), err: 'concept' },
      { t: X('x=1'), err: 'method' }
    ],
    answer: 1,
    feedback: 'مخرج مشترک 2 و 3 برابر 6 است. همهٔ جمله‌ها (از جمله 5 سمت راست) را در 6 ضرب کن: 3x + 2x = 30 ، پس 5x = 30 و x = 6.'
  },
  {
    id: 'Q18', skill: 'E05', secondary: ['A03'], difficulty: 'medium', type: 'mcq',
    prompt: 'جواب معادلهٔ ' + X('2(x-3)=x+4') + ' کدام است؟',
    options: [
      { t: X('x=7'), err: 'concept' },
      { t: X('x=5'), err: 'calc' },
      { t: X('x=10') },
      { t: X('x=-2'), err: 'sign' }
    ],
    answer: 2,
    feedback: 'اول پرانتز را باز کن: 2x − 6 = x + 4. بعد x را به یک طرف ببر: 2x − x = 4 + 6 ، پس x = 10. اگر 2 را فقط در x ضرب کنی (و در 3 نه)، به x = 7 می‌رسی که نادرست است.'
  },
  {
    id: 'Q19', skill: 'E05', secondary: [], difficulty: 'hard', type: 'mcq',
    prompt: 'جواب معادلهٔ زیر کدام است؟<div class="mathline">' + M(F(E('x'), E('x-3')) + ' = ' + F(3, E('x-3'))) + '</div>',
    options: [
      { t: X('x=3'), err: 'concept' },
      { t: 'هر عددی به‌جز ' + M('3'), err: 'concept' },
      { t: X('x=0') },
      { t: 'معادله جواب ندارد' }
    ],
    answer: 3,
    feedback: 'اگر دو طرف را در x − 3 ضرب کنیم به x = 3 می‌رسیم؛ ولی x = 3 مخرج را صفر می‌کند و قابل‌قبول نیست. پس معادله جواب ندارد. همیشه بعد از حل، جواب را در مخرج‌ها بررسی کن.'
  },

  /* ============ E06: معادلهٔ حاصل‌ضربی ============ */
  {
    id: 'Q20', skill: 'E06', secondary: [], difficulty: 'basic', type: 'mcq',
    prompt: 'جواب‌های معادلهٔ ' + X('(x-2)(x+5)=0') + ' کدام‌اند؟',
    options: [
      { t: S('x=-2', 'x=5'), err: 'sign' },
      { t: S('x=2', 'x=-5') },
      { t: X('x=-10'), err: 'concept' },
      { t: X('x=3'), err: 'concept' }
    ],
    answer: 1,
    feedback: 'اگر حاصل‌ضرب دو عبارت صفر باشد، دست‌کم یکی از آن‌ها صفر است: x − 2 = 0 یا x + 5 = 0؛<br>پس x = 2 یا x = −5.'
  },
  {
    id: 'Q21', skill: 'E06', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'جواب‌های معادلهٔ ' + X('(2x-6)(x+1)=0') + ' کدام‌اند؟',
    options: [
      { t: S('x=6', 'x=-1'), err: 'calc' },
      { t: S('x=3', 'x=-1') },
      { t: S('x=3', 'x=1'), err: 'sign' },
      { t: S('x=-3', 'x=-1'), err: 'sign' }
    ],
    answer: 1,
    feedback: 'هر عامل را جداگانه برابر صفر بگذار: 2x − 6 = 0 که x = 3 می‌دهد، و x + 1 = 0 که x = −1 می‌دهد.'
  },
  {
    id: 'Q22', skill: 'E06', secondary: ['A07'], difficulty: 'hard', topic: 'حل معادله', type: 'mcq',
    prompt: 'جواب‌های معادلهٔ ' + X('x^2-5x=0') + ' کدام‌اند؟',
    options: [
      { t: 'فقط ' + X('x=5'), err: 'concept' },
      { t: S('x=5', 'x=-5'), err: 'concept' },
      { t: S('x=0', 'x=5') },
      { t: S('x=0', 'x=-5'), err: 'sign' }
    ],
    answer: 2,
    feedback: 'اول عامل مشترک بگیر: x(x − 5) = 0. بعد هر عامل را صفر بگذار: x = 0 یا x = 5. اگر دو طرف را بر x تقسیم کنی، جواب x = 0 را از دست می‌دهی.'
  }
];
