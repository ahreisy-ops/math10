/* ==========================================================================
   Chapter4 — مختصات و پیش‌نیازهای تابع (فقط مختصات، زوج مرتب، خواندن جدول و نمودار)
   داده‌های آزمون (قابل ویرایش). منطق برنامه در app.js است.

   ساختار هر سؤال:
     id          شناسهٔ سؤال
     skill       مهارت اصلی (Skill ID)
     secondary   مهارت‌های فرعی که پاسخ‌دادن به آن‌ها هم تکیه دارد (فقط ثبت می‌شود، امتیاز نمی‌گیرد)
     difficulty  basic | medium | hard   (وزن‌ها: ۱ ، ۲ ، ۳)
     topic       (اختیاری) برچسب زیرمبحث کنار شمارهٔ سؤال؛ اگر نباشد نام مهارت نمایش داده می‌شود
     type        mcq | match | gridpick
     prompt      صورت سؤال (HTML؛ شکل‌ها و جدول‌ها هم داخل همین‌جا هستند)
     feedback    نکتهٔ آموزشی کوتاه (در گزارش نمایش داده می‌شود)
   و بسته به نوع:
     mcq:        options:[{t, err?}] ، answer: اندیس گزینهٔ درست
     match:      left:[html] ، right:[متن ساده] ، answer: اندیس سمت راستِ هر ردیف
     gridpick:   answer:[x, y]  (دانش‌آموز روی صفحهٔ مختصات یک نقطه را انتخاب می‌کند)
                 خطای «جابه‌جاکردن x و y» و «اشتباه علامت» در منطق برنامه خودکار تشخیص داده می‌شود.

   برچسب‌های خطا (err): swap | sign | read | concept | calc | method
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

/* PLANE: صفحهٔ مختصات (SVG با ویژگی‌های درون‌خطی، قابل نمایش در هر جا)
   o = { xmin, xmax, ymin, ymax, cell, points:[{x,y,label}], xTitle, yTitle, pick:true, selected:[x,y] }
   هر خانهٔ شبکه ۱ واحد است و روی محورها همهٔ عددهای صحیح نوشته می‌شود. */
function PLANE(o) {
  var c = o.cell || 28, pad = 28, i, s, p;
  var xmin = o.xmin, xmax = o.xmax, ymin = o.ymin, ymax = o.ymax;
  var extra = o.xTitle ? 16 : 0;
  var W = (xmax - xmin) * c + 2 * pad, H = (ymax - ymin) * c + 2 * pad + extra;
  function px(x) { return pad + (x - xmin) * c; }
  function py(y) { return pad + (ymax - y) * c; }
  function num(n) { return String(n).replace('-', '−'); }
  s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" ' +
    'style="direction:ltr;max-width:100%;height:auto;display:block;margin:6px auto" role="img">';
  for (i = xmin; i <= xmax; i++) {
    s += '<line x1="' + px(i) + '" y1="' + py(ymax) + '" x2="' + px(i) + '" y2="' + py(ymin) + '" stroke="#d5dde8" stroke-width="1"/>';
  }
  for (i = ymin; i <= ymax; i++) {
    s += '<line x1="' + px(xmin) + '" y1="' + py(i) + '" x2="' + px(xmax) + '" y2="' + py(i) + '" stroke="#d5dde8" stroke-width="1"/>';
  }
  /* محورها و پیکان‌ها */
  s += '<line x1="' + (px(xmin) - 6) + '" y1="' + py(0) + '" x2="' + (px(xmax) + 8) + '" y2="' + py(0) + '" stroke="#14213d" stroke-width="2"/>';
  s += '<polygon points="' + (px(xmax) + 15) + ',' + py(0) + ' ' + (px(xmax) + 6) + ',' + (py(0) - 4.5) + ' ' + (px(xmax) + 6) + ',' + (py(0) + 4.5) + '" fill="#14213d"/>';
  s += '<line x1="' + px(0) + '" y1="' + (py(ymin) + 6) + '" x2="' + px(0) + '" y2="' + (py(ymax) - 8) + '" stroke="#14213d" stroke-width="2"/>';
  s += '<polygon points="' + px(0) + ',' + (py(ymax) - 15) + ' ' + (px(0) - 4.5) + ',' + (py(ymax) - 6) + ' ' + (px(0) + 4.5) + ',' + (py(ymax) - 6) + '" fill="#14213d"/>';
  /* عددهای روی محورها */
  for (i = xmin; i <= xmax; i++) {
    if (i === 0) { continue; }
    s += '<text x="' + px(i) + '" y="' + (py(0) + 15) + '" text-anchor="middle" font-size="10" fill="#14213d" font-family="Tahoma,sans-serif">' + num(i) + '</text>';
  }
  for (i = ymin; i <= ymax; i++) {
    if (i === 0) { continue; }
    s += '<text x="' + (px(0) - 7) + '" y="' + (py(i) + 3.5) + '" text-anchor="end" font-size="10" fill="#14213d" font-family="Tahoma,sans-serif">' + num(i) + '</text>';
  }
  s += '<text x="' + (px(0) - 7) + '" y="' + (py(0) + 15) + '" text-anchor="end" font-size="10" fill="#14213d" font-family="Tahoma,sans-serif">0</text>';
  /* نام محورها */
  if (o.xTitle) {
    s += '<text x="' + (W / 2) + '" y="' + (H - 4) + '" text-anchor="middle" font-size="12" fill="#14213d" font-family="Tahoma,sans-serif">' + o.xTitle + '</text>';
    s += '<text x="' + (px(0) + 8) + '" y="12" text-anchor="start" font-size="12" fill="#14213d" font-family="Tahoma,sans-serif">' + o.yTitle + '</text>';
  } else {
    s += '<text x="' + (px(xmax) + 21) + '" y="' + (py(0) + 4) + '" font-size="15" font-style="italic" fill="#14213d" font-family="Times New Roman,serif">x</text>';
    s += '<text x="' + (px(0) + 9) + '" y="' + (py(ymax) - 10) + '" font-size="15" font-style="italic" fill="#14213d" font-family="Times New Roman,serif">y</text>';
  }
  /* نقاط */
  if (o.points) {
    for (i = 0; i < o.points.length; i++) {
      p = o.points[i];
      s += '<circle cx="' + px(p.x) + '" cy="' + py(p.y) + '" r="5" fill="#c62828" stroke="#14213d" stroke-width="1.5"/>';
      if (p.label) {
        s += '<text x="' + (px(p.x) + 8) + '" y="' + (py(p.y) - 7) + '" font-size="13" font-weight="bold" fill="#14213d" font-family="Tahoma,sans-serif">' + p.label + '</text>';
      }
    }
  }
  /* حالت انتخاب نقطه */
  if (o.pick) {
    var x, y;
    if (o.selected) {
      s += '<circle cx="' + px(o.selected[0]) + '" cy="' + py(o.selected[1]) + '" r="7" fill="#0e8f7e" stroke="#14213d" stroke-width="2.5"/>';
    }
    for (x = xmin; x <= xmax; x++) {
      for (y = ymin; y <= ymax; y++) {
        s += '<g class="pk" data-x="' + x + '" data-y="' + y + '"><circle cx="' + px(x) + '" cy="' + py(y) + '" r="' + (c * 0.42) + '" fill="transparent"/></g>';
      }
    }
  }
  return s + '</svg>';
}

/* جدول افقی ساده: rows = [[سرستون، مقدارها...], ...] */
function TABLE(rows) {
  var h = '<table class="dt">', i, j;
  for (i = 0; i < rows.length; i++) {
    h += '<tr>';
    for (j = 0; j < rows[i].length; j++) {
      h += (j === 0 ? '<th>' : '<td>') + rows[i][j] + (j === 0 ? '</th>' : '</td>');
    }
    h += '</tr>';
  }
  return h + '</table>';
}

/* ---------- داده‌های شکل‌ها (جدا نگه‌داشته شده تا قابل بررسی باشند) ---------- */
var PTS_Q03 = [{ x: 3, y: 2, label: 'الف' }, { x: -4, y: 3, label: 'ب' }, { x: -2, y: -3, label: 'ج' }, { x: 4, y: -1, label: 'د' }];
var PTS_Q05 = [{ x: 3, y: 2, label: 'الف' }];
var PTS_Q10 = [{ x: 1, y: -2 }, { x: 2, y: 0 }, { x: 3, y: 2 }, { x: 4, y: 1 }, { x: 5, y: -1 }];
var PTS_Q11 = [{ x: 3, y: 2, label: 'الف' }, { x: 2, y: 3, label: 'ب' }, { x: -2, y: 3, label: 'ج' }, { x: 3, y: -2, label: 'د' }];
var PTS_Q12 = [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 1 }, { x: 4, y: 4 }];

/* ---------- اطلاعات آزمون ---------- */
window.EXAM_META = {
  fileNo: 4,
  code: '04',
  title: 'ارزیابی پیش‌نیازهای ریاضی ۱ دهم: مختصات و پیش‌نیازهای تابع',
  chapterTitle: 'مختصات و پیش‌نیازهای تابع',
  intro: 'در این بخش دربارهٔ این مباحث تعیین سطح می‌شوی. روی هر مبحث بزن تا توضیح کوتاهش را ببینی.',
  allDone: 'همهٔ مهارت‌های این بخش در حد قابل قبول است؛ از نظر مختصات و پیش‌نیازهای تابع می‌توانی ریاضی ۱ دهم را شروع کنی.',
  desc: 'این بخش آمادگی تو را برای ورود به مفهوم تابع می‌سنجد: خواندن و نوشتن زوج مرتب، پیدا کردن نقطه روی صفحهٔ مختصات، و درک فاصله و موقعیت شکل‌های ساده در این صفحه.'
};

/* ---------- مهارت‌ها و پیش‌نیازها (ساختار نقشهٔ پروژه) ----------
   prereq   : پیش‌نیازهای همین فایل
   external : پیش‌نیازهایی که در این فایل سنجیده نمی‌شوند (فقط برای توضیح گزارش) */
window.SKILLS = {
  C01: {
    name: 'شناخت دستگاه مختصات، محورها و ناحیه‌ها', prereq: [],
    desc: 'شناختن محور افقی و عمودی، مبدأ مختصات و ناحیه‌های صفحهٔ مختصات.',
    external: [{
      id: 'N05', name: 'نمایش و خواندن عدد روی محور', where: 'عدد و محاسبات پایه',
      desc: 'پیداکردن جای عدد روی محور و خواندن عدد از روی محور.'
    }]
  },
  C02: {
    name: 'خواندن، نوشتن و رسم نقطه با زوج مرتب', prereq: ['C01'],
    desc: 'پیداکردن مختصات یک نقطه روی صفحه، و مشخص‌کردن جای نقطه‌ای که زوج مرتبش داده شده است.'
  },
  C03: {
    name: 'خواندن و تفسیر جدول و نمودار مختصاتی', prereq: ['C02'],
    desc: 'خواندن مقدارها از جدول یا نمودار، مقایسهٔ آن‌ها و پیداکردن ارتباط بین ردیف‌های جدول و نقطه‌های نمودار.'
  }
};

/* توضیح کوتاه هر بخش از مجموعهٔ ارزیابی (برای عبارت‌های «بخش …» در گزارش) */
window.CHAPTER_INFO = {
  'عدد و محاسبات پایه': 'بخشی از مجموعهٔ ارزیابی که چهار عمل، کسر، توان، جذر، قدرمطلق و نسبت و تناسب را می‌سنجد.'
};

/* ---------- نام فارسی نوع خطا (برای گزارش) ---------- */
window.ERR_NAMES = {
  swap: 'جابه‌جا کردن مؤلفه‌های x و y',
  sign: 'اشتباه در علامت',
  read: 'اشتباه در خواندن از جدول یا نمودار',
  concept: 'نادرستی در درک مفهوم',
  calc: 'اشتباه محاسباتی',
  method: 'اشتباه در انتخاب روش'
};

/* ---------- سؤال‌ها (ترتیب ثابت) ---------- */
window.QUESTIONS = [

  /* ============ C01: دستگاه مختصات، محورها و ناحیه‌ها ============ */
  {
    id: 'Q01', skill: 'C01', secondary: [], difficulty: 'basic', type: 'match',
    prompt: 'هر مورد را به نام درستش وصل کن.',
    left: ['محور افقی', 'محور عمودی', 'نقطهٔ برخورد دو محور'],
    right: ['محور x', 'محور y', 'مبدأ مختصات ' + LTR('(0, 0)'), 'ناحیهٔ اول'],
    answer: [0, 1, 2],
    feedback: 'در دستگاه مختصات، محور افقی x و محور عمودی y نام دارد. دو محور در نقطه‌ای برخورد می‌کنند که مبدأ مختصات ' + M('(0, 0)') + ' نام دارد.'
  },
  {
    id: 'Q02', skill: 'C01', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'نقطه‌ای در ناحیهٔ سوم دستگاه مختصات قرار دارد. علامت مؤلفه‌های ' + X('x') + ' و ' + X('y') + ' این نقطه چیست؟',
    options: [
      { t: X('x') + ' مثبت و ' + X('y') + ' مثبت', err: 'concept' },
      { t: X('x') + ' منفی و ' + X('y') + ' منفی' },
      { t: X('x') + ' مثبت و ' + X('y') + ' منفی', err: 'concept' },
      { t: X('x') + ' منفی و ' + X('y') + ' مثبت', err: 'concept' }
    ],
    answer: 1,
    feedback: 'ناحیهٔ سوم پایین و سمت چپ مبدأ است؛ پس هم x و هم y منفی‌اند. ناحیه‌ها خلاف جهت عقربه‌های ساعت شماره‌گذاری می‌شوند: اول (+ ، +) ، دوم (− ، +) ، سوم (− ، −) و چهارم (+ ، −).'
  },
  {
    id: 'Q03', skill: 'C01', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'کدام نقطه در ناحیهٔ دوم قرار دارد؟' +
      PLANE({ xmin: -5, xmax: 5, ymin: -4, ymax: 4, points: PTS_Q03 }),
    options: [
      { t: 'نقطهٔ الف', err: 'sign' },
      { t: 'نقطهٔ ب' },
      { t: 'نقطهٔ ج' },
      { t: 'نقطهٔ د', err: 'concept' }
    ],
    answer: 1,
    feedback: 'ناحیهٔ دوم بالا و سمت چپ مبدأ است (x منفی و y مثبت). نقطهٔ ب با مختصات ' + M('(-4, 3)') + ' در این ناحیه قرار دارد.'
  },
  {
    id: 'Q04', skill: 'C01', secondary: [], difficulty: 'hard', type: 'mcq',
    prompt: 'نقطهٔ ' + M('(a, b)') + ' در ناحیهٔ چهارم قرار دارد. نقطهٔ ' + M('(b, a)') + ' در کدام ناحیه است؟',
    options: [
      { t: 'ناحیهٔ اول', err: 'sign' },
      { t: 'ناحیهٔ دوم' },
      { t: 'ناحیهٔ سوم', err: 'sign' },
      { t: 'ناحیهٔ چهارم', err: 'swap' }
    ],
    answer: 1,
    feedback: 'ناحیهٔ چهارم یعنی a مثبت و b منفی. در نقطهٔ ' + M('(b, a)') + ' مؤلفهٔ اول b منفی و مؤلفهٔ دوم a مثبت است؛ یعنی داریم (− ، +) و این ناحیهٔ دوم است. جابه‌جاشدن مؤلفه‌ها می‌تواند ناحیه را عوض کند.'
  },

  /* ============ C02: خواندن، نوشتن و رسم نقطه با زوج مرتب ============ */
  {
    id: 'Q05', skill: 'C02', secondary: [], difficulty: 'basic', type: 'mcq',
    prompt: 'مختصات نقطهٔ «الف» در شکل زیر کدام است؟' +
      PLANE({ xmin: -5, xmax: 5, ymin: -4, ymax: 4, points: PTS_Q05 }),
    options: [
      { t: M('(3, 2)') },
      { t: M('(2, 3)'), err: 'swap' },
      { t: M('(-3, 2)'), err: 'sign' },
      { t: M('(3, -2)'), err: 'sign' }
    ],
    answer: 0,
    feedback: 'در زوج مرتب ' + M('(x, y)') + ' مؤلفهٔ اول جابه‌جایی افقی و مؤلفهٔ دوم جابه‌جایی عمودی از مبدأ است. نقطهٔ الف 3 واحد به راست و 2 واحد بالاست: ' + M('(3, 2)') + '. نقطهٔ ' + M('(2, 3)') + ' جای دیگری است.'
  },
  {
    id: 'Q06', skill: 'C02', secondary: [], difficulty: 'medium', type: 'gridpick',
    prompt: 'نقطهٔ ' + M('(-3, 2)') + ' را روی صفحهٔ مختصات مشخص کن (روی محل نقطه بزن).',
    answer: [-3, 2],
    feedback: 'برای ' + M('(-3, 2)') + ' از مبدأ شروع کن: چون x منفی است 3 واحد به چپ برو، و چون y مثبت است 2 واحد به بالا.'
  },
  {
    id: 'Q07', skill: 'C02', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'نقطهٔ ' + M('(0, -4)') + ' کجا قرار دارد؟',
    options: [
      { t: 'روی محور x ، ' + M('4') + ' واحد سمت چپ مبدأ', err: 'swap' },
      { t: 'روی محور y ، ' + M('4') + ' واحد بالای مبدأ', err: 'sign' },
      { t: 'روی محور y ، ' + M('4') + ' واحد پایین مبدأ' },
      { t: 'روی محور x ، ' + M('4') + ' واحد سمت راست مبدأ', err: 'swap' }
    ],
    answer: 2,
    feedback: 'در ' + M('(0, -4)') + ' مؤلفهٔ اول صفر است؛ یعنی نه به چپ می‌رویم و نه به راست، پس نقطه روی محور y است. مؤلفهٔ دوم ' + M('-4') + ' یعنی 4 واحد پایین مبدأ.'
  },
  {
    id: 'Q08', skill: 'C02', secondary: ['C01'], difficulty: 'hard', type: 'gridpick',
    prompt: 'نقطه‌ای را مشخص کن که در ناحیهٔ سوم باشد، فاصله‌اش تا محور ' + X('y') + ' برابر ' + M('3') + ' واحد و فاصله‌اش تا محور ' + X('x') + ' برابر ' + M('2') + ' واحد باشد.',
    answer: [-3, -2],
    feedback: 'فاصلهٔ نقطه تا محور y برابر اندازهٔ x است و فاصله‌اش تا محور x برابر اندازهٔ y: ' + M('|x| = 3') + ' و ' + M('|y| = 2') + '. در ناحیهٔ سوم هر دو منفی‌اند؛ پس نقطه ' + M('(-3, -2)') + ' است.'
  },

  /* ============ C03: خواندن و تفسیر جدول و نمودار ============ */
  {
    id: 'Q09', skill: 'C03', secondary: [], difficulty: 'basic', type: 'mcq',
    prompt: 'جدول زیر تعداد صفحه‌هایی را نشان می‌دهد که علی در چهار روز اول هفته خوانده است. در روز سوم چند صفحه خوانده است؟' +
      TABLE([['روز', 1, 2, 3, 4], ['تعداد صفحه', 10, 15, 25, 30]]),
    options: [
      { t: M('3'), err: 'read' },
      { t: M('15'), err: 'read' },
      { t: M('30'), err: 'read' },
      { t: M('25') }
    ],
    answer: 3,
    feedback: 'ستون روز سوم را پیدا کن و عدد زیر آن را بخوان: 25. عدد خودِ روز (3) را با مقدار خوانده‌شده اشتباه نگیر.'
  },
  {
    id: 'Q10', skill: 'C03', secondary: [], difficulty: 'medium', type: 'mcq',
    prompt: 'نمودار زیر دمای هوا را در ساعت‌های 1 تا 5 شب نشان می‌دهد. دما در ساعت 3 چند درجه است؟' +
      PLANE({ xmin: 0, xmax: 6, ymin: -3, ymax: 4, cell: 32, points: PTS_Q10, xTitle: 'ساعت', yTitle: 'دما (درجه)' }),
    options: [
      { t: M('3'), err: 'swap' },
      { t: M('2') },
      { t: M('1'), err: 'read' },
      { t: M('-2'), err: 'read' }
    ],
    answer: 1,
    feedback: 'روی محور افقی عدد 3  (ساعت) را پیدا کن، تا نقطه بالا برو و ارتفاع آن را روی محور عمودی بخوان: 2 درجه. عدد 3 همان ساعت است، نه دما.'
  },
  {
    id: 'Q11', skill: 'C03', secondary: [], difficulty: 'medium', type: 'match',
    prompt: 'هر ردیف جدول را به نقطهٔ متناظرش روی نمودار وصل کن.' +
      TABLE([['ردیف', 'x', 'y'], ['اول', 2, 3], ['دوم', 3, -2], ['سوم', -2, 3]]
        .map(function (r, i) {
          return i === 0 ? r : [r[0], M(String(r[1])), M(String(r[2]))];
        })) +
      PLANE({ xmin: -4, xmax: 4, ymin: -3, ymax: 4, points: PTS_Q11 }),
    left: ['ردیف اول', 'ردیف دوم', 'ردیف سوم'],
    right: ['نقطهٔ الف', 'نقطهٔ ب', 'نقطهٔ ج', 'نقطهٔ د'],
    answer: [1, 3, 2],
    feedback: 'مؤلفهٔ اول (x) را در راستای افقی و مؤلفهٔ دوم (y) را در راستای عمودی بخوان. ' + M('(2, 3)') + ' نقطهٔ ب است و ' + M('(3, 2)') + ' نقطهٔ الف؛ ترتیب مهم است. ' + M('(3, -2)') + ' نقطهٔ د و ' + M('(-2, 3)') + ' نقطهٔ ج است.'
  },
  {
    id: 'Q12', skill: 'C03', secondary: [], difficulty: 'hard', type: 'mcq',
    prompt: 'نمودار و جدول زیر هر دو دادهٔ یک آزمایش‌اند، ولی یکی از ستون‌های جدول با نمودار نمی‌خواند. کدام ستون؟' +
      PLANE({ xmin: 0, xmax: 5, ymin: 0, ymax: 5, points: PTS_Q12 }) +
      TABLE([['x', 1, 2, 3, 4], ['y', 2, 3, 4, 4]]),
    options: [
      { t: 'ستونی که ' + X('x=1') + ' دارد', err: 'read' },
      { t: 'ستونی که ' + X('x=2') + ' دارد', err: 'read' },
      { t: 'ستونی که ' + X('x=3') + ' دارد' },
      { t: 'ستونی که ' + X('x=4') + ' دارد', err: 'read' }
    ],
    answer: 2,
    feedback: 'هر ستون جدول را با نقطه‌ای مقایسه کن که x برابر دارد. برای ' + M('x = 3') + ' نقطهٔ روی نمودار ارتفاع 1 دارد، ولی در جدول ' + M('y = 4') + ' نوشته شده؛ پس این ستون با نمودار نمی‌خواند.'
  }
];
