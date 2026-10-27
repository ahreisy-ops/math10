/* ==========================================================================
   Chapter2 — عبارت‌های جبری
   داده‌های آزمون (قابل ویرایش). منطق برنامه در app.js است.

   ساختار هر سؤال:
     id          شناسهٔ سؤال
     skill       مهارت اصلی (Skill ID)
     secondary   مهارت‌های فرعی که پاسخ‌دادن به آن‌ها هم تکیه دارد (فقط ثبت می‌شود، امتیاز نمی‌گیرد)
     difficulty  basic | medium | hard   (وزن‌ها: ۱ ، ۲ ، ۳)
     topic       (اختیاری) برچسب زیرمبحث کنار شمارهٔ سؤال؛ اگر نباشد نام مهارت نمایش داده می‌شود
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
    } else if (c === '*') { out += '\\times '; i++; }
    else { out += c; i++; }
  }
  return out;
}
function X(s) { return M(E(s)); }
function LTR(s) { return '\u2066' + s + '\u2069'; }   // متن چپ‌به‌راست داخل منوی کشویی

/* اطلاعات فصل (EXAM_META) و مهارت‌ها (SKILLS) به data/ch2.js منتقل شده‌اند (منبع مشترک آزمون، درسنامه و منو). */

/* ---------- نام فارسی نوع خطا (برای گزارش) ---------- */
window.ERR_NAMES = {
  sign: 'اشتباه در علامت',
  calc: 'اشتباه محاسباتی',
  concept: 'نادرستی در درک مفهوم',
  method: 'اشتباه در انتخاب روش',
  read: 'اشتباه در خواندن سؤال'
};

/* ---------- سؤال‌ها (ترتیب ثابت) ---------- */
window.QUESTIONS = [

  /* ============ A01: اجزای عبارت جبری و جایگذاری ============ */
  {
    id: 'Q01', skill: 'A01', secondary: [], difficulty: 'basic', type: 'mcq',
    prompt: 'در جملهٔ جبری ' + X('-7xy^2') + ' ضریب عددی کدام است؟',
    options: [
      { t: M('7'), err: 'sign' },
      { t: M('−7') },
      { t: M('2'), err: 'concept' },
      { t: X('-7x'), err: 'concept' }
    ],
    answer: 1,
    feedback: 'ضریب عددی، عددی است که در بخش حرفی ضرب شده و علامتش هم جزو آن است؛ در ' + X('-7xy^2') + ' ضریب برابر −7 است. توان 2 مربوط به ' + X('y') + ' است، نه ضریب.'
  },
  {
    id: 'Q02', skill: 'A01', secondary: [], difficulty: 'medium', type: 'numeric',
    prompt: 'مقدار عبارت ' + X('3a-2b+5') + ' را به ازای ' + X('a=-2') + ' و ' + X('b=4') + ' بنویس.',
    answer: -9, answerHtml: M('−9'),
    traps: [{ value: 3, err: 'sign' }, { value: 7, err: 'sign' }],
    feedback: 'به جای هر حرف، عدد را داخل پرانتز بگذار: 3 × (−2) − 2 × 4 + 5 = −6 − 8 + 5 = −9.'
  },
  {
    id: 'Q03', skill: 'A01', secondary: [], difficulty: 'hard', type: 'mcq',
    prompt: 'اگر ' + X('x=-3') + ' باشد، مقدار ' + X('2x^2-x+1') + ' کدام است؟',
    options: [
      { t: M('−14'), err: 'sign' },
      { t: M('22') },
      { t: M('40'), err: 'concept' },
      { t: M('16'), err: 'sign' }
    ],
    answer: 1,
    feedback: 'اول ' + X('x^2 = (−3)^2 = 9') + '؛ بعد 2 × 9 − (−3) + 1 = 18 + 3 + 1 = 22. توان فقط روی خود ' + X('x') + ' اثر می‌گذارد و −x یعنی قرینهٔ −3.'
  },

  /* ============ A02: جمع و تفریق جمله‌های هم‌نوع ============ */
  {
    id: 'Q04', skill: 'A02', secondary: [], difficulty: 'basic', type: 'multi',
    prompt: 'کدام جمله‌ها با ' + X('3x^2y') + ' هم‌نوع‌اند؟ همهٔ گزینه‌های درست را انتخاب کن.',
    options: [
      { t: X('-5x^2y') },
      { t: X('3xy^2') },
      { t: X('x^2y') },
      { t: X('3x^2') }
    ],
    answer: [0, 2],
    feedback: 'جمله‌های هم‌نوع، بخش حرفی کاملاً یکسان دارند (هم حرف‌ها و هم توان‌ها)؛ فقط ضریب‌ها می‌توانند فرق کنند. ' + X('-5x^2y') + ' و ' + X('x^2y') + ' هم‌نوع‌اند، ولی ' + X('3xy^2') + ' و ' + X('3x^2') + ' نه.'
  },
  {
    id: 'Q05', skill: 'A02', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'ساده کن:<div class="mathline">' + X('5x-3y+2x-4y') + '</div>',
    options: [
      { t: X('7x-y'), err: 'sign' },
      { t: X('7x-7y') },
      { t: X('3x-7y'), err: 'sign' },
      { t: M('0'), err: 'concept' }
    ],
    answer: 1,
    feedback: 'فقط جمله‌های هم‌نوع را با هم جمع کن: 5x + 2x = 7x و −3y − 4y = −7y. ' + X('x') + ' و ' + X('y') + ' هم‌نوع نیستند و با هم جمع نمی‌شوند.'
  },
  {
    id: 'Q06', skill: 'A02', secondary: ['A03'], difficulty: 'hard', type: 'mcq',
    prompt: 'ساده کن:<div class="mathline">' + X('(3x^2y-2xy^2)-(5x^2y-xy^2)') + '</div>',
    options: [
      { t: X('-2x^2y-3xy^2'), err: 'sign' },
      { t: X('-2x^2y-xy^2') },
      { t: X('8x^2y-3xy^2'), err: 'sign' },
      { t: X('-3x^3y^3'), err: 'concept' }
    ],
    answer: 1,
    feedback: 'علامت منفی جلوی پرانتز روی همهٔ جمله‌های داخلش اثر می‌کند: 3x²y − 2xy² − 5x²y + xy². <br> بعد هم‌نوع‌ها: (3 − 5)x²y + (−2 + 1)xy² = −2x²y − xy².'
  },

  /* ============ A03: خاصیت توزیعی و ساده‌سازی ============ */
  {
    id: 'Q07', skill: 'A03', secondary: [], difficulty: 'basic', type: 'mcq',
    prompt: 'ساده کن:<div class="mathline">' + X('3(x+4)') + '</div>',
    options: [
      { t: X('3x+4'), err: 'concept' },
      { t: X('3x+12') },
      { t: X('3x+7'), err: 'concept' },
      { t: X('12x'), err: 'concept' }
    ],
    answer: 1,
    feedback: 'ضریب بیرون پرانتز باید در هر دو جمله ضرب شود: ' + M('3 \\cdot x + 3 \\cdot 4 = 3x + 12') + '.'
  },
  {
    id: 'Q08', skill: 'A03', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'ساده کن:<div class="mathline">' + X('-2(3x-5)') + '</div>',
    options: [
      { t: X('-6x-10'), err: 'sign' },
      { t: X('-6x+10') },
      { t: X('-6x+5'), err: 'concept' },
      { t: X('6x-10'), err: 'sign' }
    ],
    answer: 1,
    feedback: '−2 در هر دو جمله ضرب می‌شود: (−2)(3x) = −6x و (−2)(−5) = +10.'
  },
  {
    id: 'Q09', skill: 'A03', secondary: ['A02'], difficulty: 'hard', type: 'mcq',
    prompt: 'ساده کن:<div class="mathline">' + X('4(2x-1)-3(x-2)') + '</div>',
    options: [
      { t: X('5x-10'), err: 'sign' },
      { t: X('11x-10'), err: 'sign' },
      { t: X('5x+2') },
      { t: X('5x-2'), err: 'concept' }
    ],
    answer: 2,
    feedback: 'اول توزیع: ' + M('8x − 4 − 3x + 6') + ' (چون (−3)(−2) = +6). بعد هم‌نوع‌ها را جمع کن: 5x + 2.'
  },

  /* ============ A04: ضرب عبارت‌های جبری ============ */
  {
    id: 'Q10', skill: 'A04', secondary: [], difficulty: 'basic', type: 'mcq',
    prompt: 'حاصل را بنویس:<div class="mathline">' + X('(3x)*(-4x^2)') + '</div>',
    options: [
      { t: X('-12x^2'), err: 'concept' },
      { t: X('-12x^3') },
      { t: X('12x^3'), err: 'sign' },
      { t: X('-7x^3'), err: 'concept' }
    ],
    answer: 1,
    feedback: 'ضرایب را ضرب کن: 3 × (−4) = −12. برای حرف‌ها توان‌ها جمع می‌شوند: x¹ × x² = x³. پس جواب −12x³ است.'
  },
  {
    id: 'Q11', skill: 'A04', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'حاصل را بنویس:<div class="mathline">' + X('2x(x^2-3x+5)') + '</div>',
    options: [
      { t: X('2x^3-6x+10'), err: 'concept' },
      { t: X('2x^3-6x^2+5'), err: 'concept' },
      { t: X('2x^3-6x^2+10x') },
      { t: X('2x^3+6x^2+10x'), err: 'sign' }
    ],
    answer: 2,
    feedback: '2x باید در هر سه جمله ضرب شود: ' + M('2x \\cdot x^2 = 2x^3') + ' ، ' + M('2x \\cdot (−3x) = −6x^2') + ' ، ' + M('2x \\cdot 5 = 10x') + '.'
  },
  {
    id: 'Q12', skill: 'A04', secondary: [], difficulty: 'hard', type: 'mcq',
    prompt: 'حاصل را بنویس:<div class="mathline">' + X('(2x-3)(x+4)') + '</div>',
    options: [
      { t: X('2x^2-12'), err: 'concept' },
      { t: X('2x^2+11x-12'), err: 'sign' },
      { t: X('2x^2+5x-12') },
      { t: X('2x^2+5x+12'), err: 'sign' }
    ],
    answer: 2,
    feedback: 'هر جمله از پرانتز اول را در هر جمله از پرانتز دوم ضرب کن: 2x² + 8x − 3x − 12 = 2x² + 5x − 12.'
  },

  /* ============ A05: اتحادهای جبری پایه ============ */
  {
    id: 'Q13', skill: 'A05', secondary: [], difficulty: 'basic', type: 'match',
    prompt: 'هر عبارت را به بسط معادلش وصل کن.',
    left: [X('(x+3)^2'), X('(x-3)^2'), X('(x+3)(x-3)')],
    right: [LTR('x² − 9'), LTR('x² + 6x + 9'), LTR('x² + 9'), LTR('x² − 6x + 9'), LTR('x² + 3x + 9')],
    answer: [1, 3, 0],
    feedback: '(a + b)² = a² + 2ab + b² ، (a − b)² = a² − 2ab + b² و (a + b)(a − b) = a² − b². <br> پس (x + 3)² = x² + 6x + 9 ، (x − 3)² = x² − 6x + 9 و (x + 3)(x − 3) = x² − 9.'
  },
  {
    id: 'Q14', skill: 'A05', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'بسط عبارت ' + X('(2x+5)^2') + ' کدام است؟',
    options: [
      { t: X('4x^2+25'), err: 'concept' },
      { t: X('4x^2+20x+25') },
      { t: X('2x^2+20x+25'), err: 'concept' },
      { t: X('4x^2+10x+25'), err: 'concept' }
    ],
    answer: 1,
    feedback: 'با اتحاد ' + M('(a+b)^2 = a^2+2ab+b^2') + ' و به ازای ' + M('a=2x') + ' و ' + M('b=5') + ' داریم: ' + '<div class="mathline">' + M('(2x)^2=4x^2,\\quad 2\\cdot 2x\\cdot 5=20x,\\quad 5^2 = 25\\cdots') + '</div>' + 'جملهٔ وسط را فراموش نکن.'
  },
  {
    id: 'Q15', skill: 'A05', secondary: [], difficulty: 'medium', topic: 'بسط و ساده‌سازی', type: 'mcq',
    prompt: 'کدام عبارت با ' + X('x^2-16') + ' برابر است؟',
    options: [
      { t: X('(x-4)^2'), err: 'concept' },
      { t: X('(x+4)(x-4)') },
      { t: X('(x-8)^2'), err: 'concept' },
      { t: X('(x+8)(x-2)') }
    ],
    answer: 1,
    feedback: 'اتحاد مزدوج: (a + b)(a − b) = a² − b². چون x² − 16 = x² − 4² ، برابر (x + 4)(x − 4) است. بسط (x − 4)² علاوه بر آن جملهٔ وسط −8x هم دارد.'
  },
  {
    id: 'Q16', skill: 'A05', secondary: [], difficulty: 'hard', topic: 'بسط و ساده‌سازی', type: 'numeric',
    prompt: 'با استفاده از یک اتحاد جبری و بدون ماشین‌حساب، حاصل ' + M(P('51', 2) + ' − ' + P('49', 2)) + ' را بنویس.',
    answer: 200, answerHtml: M('200'),
    traps: [{ value: 4, err: 'concept' }, { value: 2, err: 'concept' }, { value: 100, err: 'concept' }],
    feedback: 'a² − b² = (a + b)(a − b). پس 51² − 49² = (51 + 49)(51 − 49) = 100 × 2 = 200.'
  },

  /* ============ A06: تجزیه با عامل مشترک ============ */
  {
    id: 'Q17', skill: 'A06', secondary: [], difficulty: 'basic', type: 'mcq',
    prompt: 'از عبارت ' + X('6x+9') + ' عامل مشترک بگیر. نتیجه کدام است؟',
    options: [
      { t: X('3(2x+9)'), err: 'concept' },
      { t: X('3(2x+3)') },
      { t: X('3(x+3)'), err: 'concept' },
      { t: X('x(6+9)'), err: 'concept' }
    ],
    answer: 1,
    feedback: 'بزرگ‌ترین عددی که هر دو جمله را می‌شمارد 3 است: 6x ÷ 3 = 2x و 9 ÷ 3 = 3؛ پس 3(2x + 3). با ضرب دوباره می‌توانی درستی جواب را بسنجی.'
  },
  {
    id: 'Q18', skill: 'A06', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'عبارت ' + X('12x^2y-18xy^2') + ' را با <b>بیشترین</b> عامل مشترک تجزیه کن (تجزیه‌ای که دیگر قابل ادامه نباشد).',
    options: [
      { t: X('6(2x^2y-3xy^2)'), err: 'concept' },
      { t: X('3xy(4x-6y)'), err: 'concept' },
      { t: X('6xy(2x-3y)') },
      { t: X('6xy(2x+3y)'), err: 'sign' }
    ],
    answer: 2,
    feedback: 'ب.م.م ضرایب 12 و 18 برابر 6 است و حرف‌های مشترک xy هستند؛ پس عامل مشترک 6xy است. گزینه‌هایی که عامل کوچک‌تری بیرون کشیده‌اند هنوز قابل‌تجزیه‌ترند.'
  },
  {
    id: 'Q19', skill: 'A06', secondary: [], difficulty: 'hard', topic: 'تجزیه', type: 'mcq',
    prompt: 'عبارت ' + X('3a(x-2)+5b(x-2)') + ' را تجزیه کن.',
    options: [
      { t: X('(x-2)(3a-5b)'), err: 'sign' },
      { t: X('(x+2)(3a+5b)'), err: 'sign' },
      { t: X('(x-2)(3a+5b)') },
      { t: X('15ab(x-2)'), err: 'concept' }
    ],
    answer: 2,
    feedback: 'هر دو جمله عامل مشترک (x − 2) دارند. آن را بیرون می‌کشیم و باقی‌ماندهٔ هر جمله را کنار هم می‌نویسیم: ' + '<div class="mathline">' + M('(x − 2)(3a + 5b)\\cdot') + '</div>'
  },

  /* ============ A07: تجزیهٔ عبارت‌های درجهٔ دوم ============ */
  {
    id: 'Q20', skill: 'A07', secondary: ['A05'], difficulty: 'basic', type: 'mcq',
    prompt: 'کدام تجزیه برای ' + X('x^2-25') + ' درست است؟',
    options: [
      { t: X('(x-5)^2'), err: 'concept' },
      { t: X('(x-5)(x+5)') },
      { t: X('(x+5)^2'), err: 'concept' },
      { t: X('x(x-25)'), err: 'concept' }
    ],
    answer: 1,
    feedback: 'x² − 25 تفاضل دو مربع است: x² − 5² = (x − 5)(x + 5).'
  },
  {
    id: 'Q21', skill: 'A07', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'تجزیهٔ ' + X('x^2+7x+12') + ' کدام است؟',
    options: [
      { t: X('(x+2)(x+6)'), err: 'concept' },
      { t: X('(x+1)(x+12)'), err: 'concept' },
      { t: X('(x+3)(x+4)') },
      { t: X('(x-3)(x-4)'), err: 'sign' }
    ],
    answer: 2,
    feedback: 'دنبال دو عددی بگرد که حاصل‌ضربشان 12 و حاصل‌جمعشان 7 باشد: 3 و 4. پس x² + 7x + 12 = (x + 3)(x + 4).'
  },
  {
    id: 'Q22', skill: 'A07', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'تجزیهٔ ' + X('x^2-5x-14') + ' کدام است؟',
    options: [
      { t: X('(x+7)(x-2)'), err: 'sign' },
      { t: X('(x-7)(x-2)'), err: 'sign' },
      { t: X('(x-14)(x+1)'), err: 'concept' },
      { t: X('(x-7)(x+2)') }
    ],
    answer: 3,
    feedback: 'دو عدد باید حاصل‌ضرب −14 و حاصل‌جمع −5 داشته باشند: −7 و +2. چون حاصل‌ضرب منفی است، دو عدد علامت مخالف دارند و عددی که اندازهٔ بزرگ‌تری دارد منفی است.'
  },
  {
    id: 'Q23', skill: 'A07', secondary: ['A06'], difficulty: 'hard', topic: 'تجزیه', type: 'mcq',
    prompt: '<b>تجزیهٔ کامل</b> ' + X('2x^2-8') + ' کدام است؟ (تجزیه‌ای که دیگر قابل ادامه نباشد)',
    options: [
      { t: X('2(x-2)^2'), err: 'concept' },
      { t: X('(x-2)(x+2)'), err: 'concept' },
      { t: X('2(x^2-4)'), err: 'method' },
      { t: X('2(x-2)(x+2)') }
    ],
    answer: 3,
    feedback: 'اول عامل مشترک 2 را بیرون بکش: 2(x² − 4). بعد x² − 4 تفاضل دو مربع است: 2(x − 2)(x + 2). تجزیه وقتی کامل است که هیچ عامل قابل‌تجزیه‌ای باقی نمانده باشد.'
  },

  /* ============ A08: کسرهای جبری ============ */
  {
    id: 'Q24', skill: 'A08', secondary: [], difficulty: 'basic', type: 'mcq',
    prompt: 'ساده کن:<div class="mathline">' + M(F(E('3x+6'), 3)) + '</div>',
    options: [
      { t: X('x+6'), err: 'concept' },
      { t: X('3x+2'), err: 'concept' },
      { t: X('x+2') },
      { t: X('x+3') }
    ],
    answer: 2,
    feedback: 'مخرج باید بر هر دو جملهٔ صورت تقسیم شود. یا اول عامل‌گیری کن: 3(x + 2) / 3 = x + 2.'
  },
  {
    id: 'Q25', skill: 'A08', secondary: ['A06'], difficulty: 'medium', type: 'mcq',
    prompt: 'ساده کن:<div class="mathline">' + M(F(E('x^2+3x'), E('x'))) + '</div>',
    options: [
      { t: X('x^2+3'), err: 'concept' },
      { t: X('3x'), err: 'concept' },
      { t: X('x+3') },
      { t: X('x^2+3x') }
    ],
    answer: 2,
    feedback: 'اول x را از صورت بیرون بکش: x(x + 3) / x. بعد x را ساده کن: x + 3. نمی‌شود مخرج را فقط با یکی از جمله‌های صورت ساده کرد.'
  },
  {
    id: 'Q26', skill: 'A08', secondary: ['A03'], difficulty: 'hard', type: 'mcq',
    prompt: 'حاصل را ساده کن:<div class="mathline">' + M(F(E('x+1'), 2) + ' + ' + F(E('x'), 3)) + '</div>',
    options: [
      { t: M(F(E('2x+1'), 5)), err: 'concept' },
      { t: M(F(E('5x+1'), 6)), err: 'concept' },
      { t: M(F(E('5x+3'), 6)) },
      { t: M(F(E('2x+1'), 6)), err: 'method' }
    ],
    answer: 2,
    feedback: 'مخرج مشترک 6 است: (x + 1)/2 = 3(x + 1)/6 و x/3 = 2x/6. صورت‌ها را هم باید در همان عددها ضرب کرد: ' + '<div class="mathline">' + M('(3x + 3 + 2x)/6 = (5x + 3)/6\\cdots') + '</div>'
  }
];
