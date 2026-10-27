/* A05: independent, offline discovery lab and varied practice */
(function(){'use strict';
const M=t=>window.MathLite.renderRich('$'+t+'$'),fa=n=>window.MathLite.fa(n),rand=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const sign=v=>v<0?String(v):'+'+v;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm=s=>String(s).trim().replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-1776)).replace(/[٠-٩]/g,c=>String(c.charCodeAt(0)-1632)).replace(/−/g,'-').replace(/\s/g,'');
function init(root){
 let a=rand(2,6),neg=false,revealed=false,guess='',feedback='',feedbackCorrect=false,attempts=0,correct=0;
 const b=()=>neg?-a:a;
 function tile(tex,cl,hidden){return '<div class="a05-tile '+cl+(hidden?' a05-covered':'')+'"><div class="a05-tile-symbol">'+(hidden?'؟':M(tex))+'</div>'+(hidden?'<span class="a05-tile-hint">پس از پاسخ آشکار می‌شود</span>':'')+'</div>';}
 function draw(){let k=b();
 root.innerHTML='<div class="a05-lab'+(neg?' a05-negative':'')+'">'
 +'<div class="a05-lab-head"><strong>کشف جملهٔ میانی</strong><span class="a05-score">'+fa(correct)+' پاسخ درست از '+fa(attempts)+' تلاش</span></div>'
 +'<div class="a05-lab-controls"><div class="a05-slider-box"><label for="a05-slider">عدد داخل پرانتز: <b>'+fa(a)+'</b></label><input id="a05-slider" type="range" min="1" max="6" step="1" value="'+a+'"><div class="a05-ticks">'+[1,2,3,4,5,6].map(i=>'<span>'+fa(i)+'</span>').join('')+'</div></div><div class="a05-current-expression">'+M('(x'+(neg?'-':'+')+'\\mathbf{'+a+'})^2')+'</div><button class="a05-switch" data-sign type="button">علامت عدد: '+(neg?'−':'+')+'</button></div>'
 +'<div class="a05-target"><p>عبارت '+M('(x'+sign(k)+')^2')+' برابر است با '+M('(x'+sign(k)+')(x'+sign(k)+')')+'؛ و این یعنی هر جملهٔ پرانتز اول در هر جملهٔ پرانتز دوم ضرب می‌شود.</p></div>'
 +'<div class="a05-stage"><div class="a05-area-model">'
 +'<div class="a05-top-total"><span class="a05-dim-label">'+M('x'+sign(k))+'</span><span class="a05-dim-line a05-dim-h" aria-hidden="true"></span></div>'
 +'<div class="a05-top-x">'+M('x')+'</div>'
 +'<div class="a05-top-k">'+M(String(k))+'</div>'
 +'<div class="a05-left-total"><span class="a05-dim-label">'+M('x'+sign(k))+'</span><span class="a05-dim-line a05-dim-v" aria-hidden="true"></span></div>'
 +'<div class="a05-left-x">'+M('x')+'</div>'
 +'<div class="a05-left-k">'+M(String(k))+'</div>'
 +tile('x^2','a05-core',false)
 +tile((k===1?'':k===-1?'-':k)+'x','a05-cross-one',!revealed)
 +tile((k===1?'':k===-1?'-':k)+'x','a05-cross-two',!revealed)
 +tile(String(a*a),'a05-corner',false)
 +'</div><p class="a05-sign-note">خانهٔ بالا چپ: '+M('x\\times x=x^2')+'؛<br>خانهٔ پایین راست: '+M('('+k+')\\times('+k+')='+(a*a))+'.<br><strong>دو خانهٔ علامت سؤال</strong>، جملهٔ میانی را می‌سازند.</p></div>'
+'<div class="a05-challenge"><label for="a05-answer">ضریبِ '+M('x')+' در جملهٔ میانی چند است؟</label><p class="a05-example-note">فقط عدد را بنویس؛ اگر منفی بود، علامت منفی را هم وارد کن.</p>'
 +'<div class="a05-equation">'+M('x^2+')+'<input id="a05-answer" type="text" inputmode="numeric" dir="ltr" aria-label="ضریب x" placeholder="؟" value="'+esc(guess)+'" '+(revealed?'disabled':'')+'>'+M('x+'+a*a)+'</div>'
 +'<div class="a05-check-row"><button class="btn primary" type="button" data-check '+(revealed?'disabled':'')+'>بررسی پاسخ و نمایش دو ضرب</button></div>'
 +(feedback?'<div class="a05-feedback '+(feedbackCorrect?'ok':'bad')+'" role="status">'+feedback+'</div>':'')
 +(revealed?'<div class="a05-explanation"><p><b>دو خانهٔ پنهان از این دو ضرب ساخته شده‌اند:</b></p><div>'+M('x\\times('+k+')='+k+'x')+'</div><div>'+M('('+k+')\\times x='+k+'x')+'</div><p>حالا دو جملهٔ یکسان را جمع می‌کنیم:</p><div class="a05-middle-result">'+M(k+'x'+sign(k)+'x='+2*k+'x')+'</div><p>بنابراین ضریب جملهٔ میانی '+M(String(2*k))+' است.</p><div class="a05-expanded">'+M('(x'+sign(k)+')^2=x^2'+sign(2*k)+'x+'+a*a)+'</div><p class="a05-geometry-note">در حالت منفی، کاشی‌های میانی مقدار جبری منفی دارند؛ شکل، مدل ضرب است نه مساحت منفیِ واقعی.</p></div><button class="btn primary" type="button" data-random>چالش بعدی</button>':'')+'</div></div>';
 }
 function reset(){revealed=false;guess='';feedback='';feedbackCorrect=false;draw();}
 root.addEventListener('input',e=>{if(e.target.id==='a05-slider'){a=Number(e.target.value);reset();}else if(e.target.id==='a05-answer'){guess=e.target.value;}});
 root.addEventListener('click',e=>{let bt=e.target.closest('button');if(!bt)return;
 if(bt.hasAttribute('data-sign')){neg=!neg;reset();return;}
 if(bt.hasAttribute('data-random')){let old=a,oldneg=neg;do{a=rand(1,6);neg=Math.random()<.5;}while(old===a&&oldneg===neg);reset();return;}
 if(bt.hasAttribute('data-check')&&!revealed){let v=norm(guess);if(!/^[+-]?\d+$/.test(v)){feedbackCorrect=false;feedback='لطفاً یک عدد صحیح وارد کن؛ مانند '+M('6')+' یا '+M('-6')+'.';draw();return;}
 attempts++;feedbackCorrect=Number(v)===2*b();if(feedbackCorrect)correct++;revealed=true;feedback=feedbackCorrect?'درست است! حالا مسیر ساخته‌شدن جملهٔ میانی را ببین.':'پاسخ درست '+M(String(2*b()))+' است. دو خانه را باز کردیم تا دلیلش را ببینی.';draw();}
 });
 root.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='a05-answer'){e.preventDefault();root.querySelector('[data-check]')?.click();}});draw();
}
function practice(root){
 function fresh(){let q=[];let a=rand(2,7),b=rand(2,7),c=rand(2,6),d=rand(2,6);const push=(tex,prompt,ans,why,choices)=>q.push({tex,prompt,ans:String(ans),why,choices});
 push('(x+'+a+')^2','ضریب $x$ در حاصل بسط کدام است؟',2*a,'دو ضرب متقاطع هر کدام $'+a+'x$ می‌سازند.',[a,a*a,-2*a]);
 push('(x-'+b+')^2','ضریب $x$ در حاصل بسط کدام است؟',-2*b,'دو جملهٔ میانی هر دو منفی‌اند، پس مجموعشان $-'+2*b+'x$ است.',[2*b,-b,b*b]);
 push('(x+'+a+')(x+'+b+')','ضریب $x$ در حاصل ضرب چقدر می‌شود؟',a+b,'دو حاصل‌ضرب دارای $x$، ضرایب $'+a+'$ و $'+b+'$ دارند.',[a*b,a-b,2*a]);
 push('(x+'+a+')(x-'+b+')','جملهٔ ثابت در حاصل ضرب چند است؟',-a*b,'جملهٔ ثابت از ضرب $'+a+'$ در $-'+b+'$ به دست می‌آید.',[a*b,a-b,-a-b]);
 push('(x+'+a+')(x-'+a+')','جملهٔ ثابت در اتحاد مزدوج چیست؟',-a*a,'جمله‌های میانی خنثی می‌شوند و مربع عدد دوم با علامت منفی می‌آید.',[a*a,-2*a,0]);
 push('x^2-'+c*c,'در تجزیهٔ عبارت داده‌شده به دو عامل مزدوج، عدد جای خالیِ $\\left(x-\\square\\right)\\left(x+\\square\\right)$ چیست؟',c,'تفاضل دو مربع به دو عامل مزدوج تجزیه می‌شود.',[c*c,2*c,c+1]);
 push('x^3-'+d*d*d,'در تجزیهٔ عبارت داده‌شده، عدد جای خالیِ عامل $\\left(x-\\square\\right)$ چیست؟',d,'تفاضل مکعب‌ها شامل عامل تفاضل پایه‌های مکعب است.',[d*d,d*d*d,2*d]);
 push('(x+'+c+')^3','ضریب $x^2$ در بسط مکعب دوجمله‌ای چیست؟',3*c,'جملهٔ دومِ مکعب مجموع $3$ برابر حاصل ضرب $x^2$ در عدد دوم است.',[c,2*c,c*c]);
 push('(x-'+d+')^3','ضریب x در بسط مکعب تفاضل چیست؟',3*d*d,'جملهٔ سومِ مکعب تفاضل مثبت و برابر $3$ برابر $x$ در مربع عدد دوم است.',[-3*d*d,3*d, d*d]);
 push('(x+'+c+'+y)^2','ضریب $xy$ در مربع سه‌جمله‌ای چقدر است؟',2,'حاصل ضرب $x$ و $y$، دو بار در ضرب سه‌جمله‌ای در خودش رخ می‌دهد.',[1,3,c]);
 return q.sort(()=>Math.random()-.5);}
 let questions=fresh(),index=0,answers=Array(10).fill(null);
 function show(){if(index===questions.length){let score=answers.filter((v,i)=>v===questions[i].ans).length;root.innerHTML='<div class="stg">'+answers.map((v,i)=>'<span class="'+(v===questions[i].ans?'dn':'wr')+'">'+fa(i+1)+'</span>').join('')+'</div><div class="fb '+(score>=7?'ok':'bad')+'">'+fa(score)+' پاسخ درست از '+fa(10)+'</div><div class="opts end-actions"><button class="btn" data-review>مرور سؤال‌ها</button><button class="btn primary" data-restart>سؤال‌های جدید</button></div>';return;}
 let q=questions[index],sel=answers[index],done=sel!==null,ok=done&&sel===q.ans;let opts=[q.ans,...q.choices.map(String).filter((v,i,ar)=>v!==q.ans&&ar.indexOf(v)===i)].slice(0,4);for(let z of ['0','1','-1','4','9','12'])if(opts.length<4&&!opts.includes(z))opts.push(z);
 // Stable, per-question permutation across navigation.
 let salt=(index*7+Number(q.ans.replace('-','')))%4;opts=[...opts.slice(salt),...opts.slice(0,salt)];
 root.innerHTML='<div class="stg">'+answers.map((v,i)=>'<span class="'+(v!==null?(v===questions[i].ans?'dn':'wr'):i===index?'cu':'')+'">'+fa(i+1)+'</span>').join('')+'</div><p class="ask">در عبارت '+M(q.tex)+'، '+window.MathLite.renderRich(q.prompt)+'</p><div class="alg2-options">'+opts.map(v=>'<button class="btn'+(done?(v===q.ans?' choice-correct':v===sel?' choice-wrong':''):'')+'" type="button" data-choice="'+esc(v)+'" '+(done?'disabled':'')+'>'+M(v)+'</button>').join('')+'</div>'+(done?'<div class="fb '+(ok?'ok':'bad')+'">'+(ok?'درست است.':'این گزینه درست نیست.')+'</div><div class="ex">'+window.MathLite.renderRich(q.why)+'</div>':'')+'<div class="opts"><button class="btn" data-prev '+(index===0?'disabled':'')+'>سؤال قبلی</button><button class="btn primary" data-next '+(!done?'disabled':'')+'>'+(index===9?'مشاهدهٔ نتیجه':'سؤال بعدی')+'</button></div>';
 }
 root.addEventListener('click',e=>{let bt=e.target.closest('button');if(!bt||bt.disabled)return;if(bt.dataset.choice!==undefined&&answers[index]===null){answers[index]=bt.dataset.choice;show();}else if(bt.hasAttribute('data-next')){index++;show();}else if(bt.hasAttribute('data-prev')){index--;show();}else if(bt.hasAttribute('data-review')){index=0;show();}else if(bt.hasAttribute('data-restart')){questions=fresh();index=0;answers=Array(10).fill(null);show();}});show();
}
window.A05Lab={init,practice};
})();
