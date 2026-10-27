/* A04 — ضرب عبارت‌های جبری، نمایش تصویری و کارگاه تعاملی */
window.LESSONS=window.LESSONS||{};
window.LESSONS.A04={needs:['algebra2'],setup:function(K0){
 var K=Object.create(K0);
 return {html:function(){var h='';
 h+=K.sn('۱','هر جمله در هر جمله ضرب می‌شود');
 h+='<p>از درس قبل می‌دانیم که عدد یا جملهٔ پشت پرانتز در همهٔ جمله‌های آن ضرب می‌شود. اگر <b>هر دو پرانتز دو جمله داشته باشند</b>، هر جملهٔ پرانتز اول باید در هر جملهٔ پرانتز دوم ضرب شود؛ پس چهار ضرب انجام می‌دهیم:</p>';
 h+='<div class="a04-eqblock">';
 h+='<div class="a04-eqline a04-eqstart">'
   +'<span class="a04-inline-group">(</span>'
   +'<span class="a04-src1">'+window.MathLite.renderRich('$x$')+'</span>'
   +'<span class="a04-inline-group">+</span>'
   +'<span class="a04-src2">'+window.MathLite.renderRich('$2$')+'</span>'
   +'<span class="a04-inline-group">)</span>'
   +'<span class="a04-inline-group">(</span>'
   +'<span class="a04-src3">'+window.MathLite.renderRich('$x$')+'</span>'
   +'<span class="a04-inline-group">+</span>'
   +'<span class="a04-src4">'+window.MathLite.renderRich('$3$')+'</span>'
   +'<span class="a04-inline-group">)=</span>'
   +'<span class="a04-term"><span class="a04-src1">'+window.MathLite.renderRich('$x$')+'</span><span class="a04-mul">×</span><span class="a04-src3">'+window.MathLite.renderRich('$x$')+'</span></span>'
   +'<span class="a04-plus">+</span>'
   +'<span class="a04-term"><span class="a04-src1">'+window.MathLite.renderRich('$x$')+'</span><span class="a04-mul">×</span><span class="a04-src4">'+window.MathLite.renderRich('$3$')+'</span></span>'
   +'<span class="a04-plus">+</span>'
   +'<span class="a04-term"><span class="a04-src2">'+window.MathLite.renderRich('$2$')+'</span><span class="a04-mul">×</span><span class="a04-src3">'+window.MathLite.renderRich('$x$')+'</span></span>'
   +'<span class="a04-plus">+</span>'
   +'<span class="a04-term"><span class="a04-src2">'+window.MathLite.renderRich('$2$')+'</span><span class="a04-mul">×</span><span class="a04-src4">'+window.MathLite.renderRich('$3$')+'</span></span>'
   +'</div>';
 h+='<div class="a04-eqline">'+window.MathLite.renderRich('$=x^2+3x+2x+6$')+'</div>';
 h+='<div class="a04-eqline a04-final">'+window.MathLite.renderRich('$=x^2+5x+6$')+'</div>';
 h+='</div>';
 h+='<p>این چهار حاصل‌ضرب را می‌توان در یک <b>جدول ضربِ دو در دو</b> مرتب کرد تا هیچ ضربی از قلم نیفتد.</p>';

 h+=K.sn('۲','روش‌های ضرب');
 h+='<h4>تک‌جمله‌ای در چندجمله‌ای</h4>';
 h+='<p>وقتی پرانتز سه جمله دارد، ضریب بیرون پرانتز در هر سه جمله ضرب می‌شود:</p>';
 h+=K.dm('2x(x^2-3x+5)=2x^3-6x^2+10x');

 h+='<h4>دو دوجمله‌ای</h4>';
 h+='<p>برای دو پرانتزِ دو جمله‌ای، چهار ضرب داریم؛ سپس جمله‌های هم‌نوع را جمع می‌کنیم:</p>';
 h+=K.dm('(a+b)(c+d)=ac+ad+bc+bd');
 h+='<p>مثال زیر از همین حالت است:</p>';
 h+=K.dm('\\begin{aligned}(2x-3)(x+4)&=2x^2+8x-3x-12\\\\&=2x^2+5x-12\\end{aligned}');

 h+='<h4>مدل مساحتی: چهار قسمت از یک مستطیل</h4>';
 h+='<p>مستطیلی را در نظر بگیر که یک ضلعش $x+2$ و ضلع دیگرش $x+3$ است. اگر هر ضلع را به دو قسمت بشکنیم، چهار ناحیه به دست می‌آید و هر ناحیه یکی از چهار ضرب را نشان می‌دهد:</p>';
 h+='<figure class="a04-figure"><div class="a04-area-model">'
  +'<div class="a04-top-total"><span class="a04-dim-label">$x+3$</span><span class="a04-dim-line a04-dim-h" aria-hidden="true"></span></div>'
  +'<div class="a04-top-x">$x$</div>'
  +'<div class="a04-top-3">$3$</div>'
  +'<div class="a04-left-total"><span class="a04-dim-label">$x+2$</span><span class="a04-dim-line a04-dim-v" aria-hidden="true"></span></div>'
  +'<div class="a04-left-x">$x$</div>'
  +'<div class="a04-left-2">$2$</div>'
  +'<div class="a04-cell a04-sq1">$x^2$</div>'
  +'<div class="a04-cell a04-sq2">$3x$</div>'
  +'<div class="a04-cell a04-sq3">$2x$</div>'
  +'<div class="a04-cell a04-sq4">$6$</div>'
  +'<div class="a04-innercap">مساحت کل = مجموع چهار ناحیهٔ داخلی</div>'
  +'</div></figure>';
 h+=K.dm('(x+2)(x+3)=x^2+3x+2x+6=x^2+5x+6');
 h+='<p>اینجا عددهای $2$ و $3$ مثبت‌اند، بنابراین هر چهار قسمت واقعاً مساحت مثبت دارند. برای جمله‌های منفی نیز <b>همان چهار ضرب جبری</b> را انجام می‌دهیم، ولی شکل هندسی به‌تنهایی برای نمایش مقدار منفی مناسب نیست.</p>';

 h+='<h4>ضربِ عبارت‌های علامت‌دار</h4>';
 h+='<p>در ضرب دو عدد منفی، حاصل مثبت می‌شود؛ بنابراین علامت هر ضرب را جداگانه بررسی می‌کنیم:</p>';
 h+=K.dm('\\begin{aligned}(x-2)(x-5)&=x^2-5x-2x+10\\\\&=x^2-7x+10\\end{aligned}');

 h+='<h4>ضرب توان‌ها با جمع عبارت‌ها فرق دارد</h4>';
 h+='<p>اگر توان‌ها <b>در حال ضرب‌شدن</b> باشند، تعداد عامل‌های $x$ با هم جمع می‌شود. اما اگر توان‌ها با علامت جمع کنار هم آمده باشند، نمی‌توان توان‌ها را یکی کرد:</p>';
 h+=K.dm('x^2\\times x^3=(x\\times x)\\times(x\\times x\\times x)=x^5');
 h+=K.dm('x^2+x^3\\neq x^5');
 h+='<p>در <b>توانِ یک توان</b> نیز هر توان چند بار تکرار می‌شود؛ پس توان‌ها در هم ضرب می‌شوند:</p>';
 h+=K.dm('(x^2)^3=x^2\\times x^2\\times x^2=x^6');

 h+=K.sn('۳','جدول ضربِ دو در دو');
 h+='<p>عددهای روی سطرها و ستون‌ها را دو به دو ضرب کن. هر خانه، حاصل‌ضربِ عنوان سطر و ستون خودش است. سپس حاصل عبارت را از بین گزینه‌ها انتخاب کن.</p><div id="A04-explore" class="alg2-slot chapter-one-frame"></div>';
 h+=K.sn('۴','تمرین پایانی');
 h+='<p>پنج پرسش با اعداد تازه؛ پس از پاسخ، بازخورد را ببین و در پایان دور جدیدی شروع کن.</p><div id="A04-practice" class="alg2-slot cover a2-final"></div>';
 h+=K.box('sum','بعد از این درس باید بتوانی','<ul><li>تک‌جمله‌ای را در چندجمله‌ای ضرب کنی.</li><li>چهار ضرب لازم برای دو دوجمله‌ای را پیدا و جمله‌های هم‌نوع را جمع کنی.</li><li>مدل مساحتی را با چهار ضرب مربوط به آن تطبیق دهی.</li><li>فرق ضرب توان‌ها، جمع توان‌ها و توانِ یک توان را توضیح دهی.</li></ul>');
 return h;},init:function(panel){window.Algebra2.init(panel,'A04');}};
}};
