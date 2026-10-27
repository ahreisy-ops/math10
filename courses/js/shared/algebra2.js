/* کارگاه‌های مستقل A02 تا A08؛ بدون اینترنت و وابستگی بیرونی */
(function(){'use strict';
const R=(a,b)=>Math.floor(Math.random()*(b-a+1))+a,N=(a,b)=>{let n;do{n=R(a,b)}while(!n);return n},plus=n=>n<0?String(n):'+'+n, T=(a,x)=>a===1?x:a===-1?'-'+x:''+a+x;
const math=t=>window.MathLite.renderRich('$'+t+'$');
const fmt=n=>window.MathLite.fa(n),shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){let j=R(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
const desc={A02:'کدام جمله با جملهٔ داده‌شده هم‌نوع است؟',A03:'پس از بازکردن پرانتز، ضریب $x$ چند است؟',A04:'حاصل ضرب دو عبارت را به دست بیاور.',A05:'ضریب $x$ در حاصل بسط چند است؟',A06:'بزرگ‌ترین عامل مشترک عددی چیست؟',A07:'عدد دوم را با توجه به عدد اول پیدا کن.',A08:'مقدار غیرمجاز را شناسایی کن.'};
function q(id, requestedPart){let a,b,c,x,answer,opts,tex,ex,mode='number',part=null;
 if(id==='A02'){let v=['x','x^2','xy','y^2'],t=R(0,3);a=N(-8,8);tex=T(a,v[t]);answer=T(N(-8,8),v[t]);opts=[answer,...v.filter((_,i)=>i!==t).map(w=>T(N(-8,8),w))];ex='برای هم‌نوعی باید هم متغیرها و هم توان‌ها یکسان باشند. ضریب می‌تواند فرق کند.';mode='choice';}
 if(id==='A03'){part=requestedPart||['x','x^2','xy'][R(0,2)];a=N(-5,5);b=N(-6,6);c=N(-6,6);tex=a+'('+T(b,part)+plus(c)+')';answer=a*b;opts=[answer,a+b,b,-a*b];ex='ضریب بیرون پرانتز را در ضریب جملهٔ دارای $'+part+'$ ضرب می‌کنیم: $'+a+'\\times('+b+')='+answer+'$.';}
 if(id==='A04'){a=N(-5,5);b=N(-5,5);tex='(x'+plus(a)+')(x'+plus(b)+')';answer='x^2'+plus(a+b)+'x'+plus(a*b);opts=[answer,'x^2'+plus(a*b)+'x'+plus(a+b),'x^2'+plus(a+b)+'x'+plus(a+b),'x^2'+plus(a)+'x'+plus(b)];ex='حاصل چهار ضرب $x^2'+plus(b)+'x'+plus(a)+'x'+plus(a*b)+'$ است؛ جمله‌های هم‌نوع را جمع کن.';mode='choice';}
 if(id==='A05'){a=N(-7,7);tex='(x'+plus(a)+')^2';answer=2*a;opts=[answer,a,a*a,-2*a];ex='در مربع دوجمله‌ای جملهٔ میانی دو بار از ضرب $x$ در $'+a+'$ به دست می‌آید، پس ضریب آن $'+answer+'$ است.';}
 if(id==='A06'){a=R(2,8);b=R(2,7);c=R(2,7);while(b===c||gcd(b,c)!==1)c=R(2,7);tex=(a*b)+'x'+plus(a*c);answer=a;opts=[a,a*b,a*c,1];ex='عامل عددی مشترک بزرگ‌تر از $'+a+'$ وجود ندارد؛ عبارت برابر $'+a+'('+b+'x+'+c+')$ است.';}
 if(id==='A07'){a=N(-7,7);b=N(-7,7);while(a===b||b===-a)b=N(-7,7);tex='x^2'+plus(a+b)+'x'+plus(a*b)+'\\qquad(\\text{عدد اول}='+a+')';answer=b;opts=[b,-b,a+b,a*b];ex='اگر عدد اول $'+a+'$ باشد، عدد دیگر $'+b+'$ است؛ چون جمعشان $'+(a+b)+'$ و ضربشان $'+a*b+'$ می‌شود.';}
 if(id==='A08'){a=N(-7,7);tex='\\frac{x^2'+plus(-a)+'x}{x'+plus(-a)+'}';answer=a;opts=[a,-a,0,a+1];ex='مخرج اولیه $x'+plus(-a)+'$ است و برای $x='+a+'$ صفر می‌شود؛ حذف عامل، این محدودیت را از بین نمی‌برد.';}
 opts=[answer,...opts.filter(v=>String(v)!==String(answer))];let pads=mode==='choice'?['x^3','x','2x','-x^2','x+9']: [0,1,-1,2,-2,3,-3,7,-7,12,-12];for(let p of pads){if(opts.length===4)break;if(!opts.some(v=>String(v)===String(p)))opts.push(p)}opts=shuf(opts.slice(0,4));return{tex,answer,opts,ex,mode,part,a,b};}
function gcd(a,b){while(b){let t=a%b;a=b;b=t}return a;}
function questionMarkup(p, exploration=false){
 const expr='<span class="a78-inline-math">'+math(p.tex)+'</span>';
 const part=p.part||'x';
 if(p.id==='A03')return '<p class="ask'+(exploration?'':' a2-question')+'">'+window.MathLite.renderRich('پس از بازکردن پرانتز، ضریب $'+part+'$ چند است؟')+'</p><div class="dm">'+math(p.tex)+'</div>';
 const prompts={
 A02:'کدام‌یک از جمله‌های زیر با جملهٔ '+expr+' هم‌نوع است؟',
 A04:'حاصل ضرب عبارتِ '+expr+' کدام است؟',
 A05:'در بسط عبارتِ '+expr+'، ضریب '+math('x')+' چند است؟',
 A06:'بزرگ‌ترین عامل مشترک عددیِ جمله‌های عبارتِ '+expr+' چیست؟',
 A07:'برای تجزیهٔ عبارتِ '+expr+'، با توجه به عدد اول، عدد دوم چند است؟',
 A08:'در کسرِ '+expr+'، کدام مقدار برای متغیر '+math('x')+' غیرمجاز است؟'
 };
 return '<p class="ask'+(exploration?'':' a2-question')+'">'+(prompts[p.id]||window.MathLite.renderRich(desc[p.id]))+'</p>';
}
function choiceMark(done, selected, correct, i){return !done?'':(String(correct)===String(i)?' choice-correct':selected===i?' choice-wrong':'');}
function drawQuestion(p,n,total,selected=null){return questionMarkup(p)+'<div class="alg2-options">'+p.opts.map((o,i)=>'<button type="button" class="btn'+choiceMark(selected!==null,selected,p.opts.findIndex(v=>String(v)===String(p.answer)),i)+'" data-select="'+i+'">'+math(String(o))+'</button>').join('')+'</div>';}

function init(panel,id,options){let lab=panel.querySelector('#'+id+'-explore'),test=panel.querySelector('#'+id+'-practice');
 function practice(){let parts=id==='A03'?shuf(['x','x^2','xy', ['x','x^2','xy'][R(0,2)], ['x','x^2','xy'][R(0,2)]]):null;let qs=Array.from({length:5},(_,i)=>({...q(id,parts&&parts[i]),id})),idx=0,answers=Array(5).fill(null),review=false;
 function paint(){if(idx===5){let score=answers.filter((v,i)=>v!==null&&String(qs[i].opts[v])===String(qs[i].answer)).length;test.innerHTML='<div class="fb '+(score>=4?'ok':'bad')+'">'+fmt(score)+' پاسخ درست از '+fmt(5)+'</div><div class="opts end-actions"><button class="btn" data-review>مرور سؤال‌ها</button><button class="btn primary" data-restart>سؤال‌های جدید</button></div>';return;}
 let item=qs[idx],s=answers[idx],done=s!==null,ok=done&&String(item.opts[s])===String(item.answer);test.innerHTML='<div class="stg">'+answers.map((v,i)=>'<span class="'+(v!==null?(String(qs[i].opts[v])===String(qs[i].answer)?'dn':'wr'):i===idx?'cu':'')+'">'+fmt(i+1)+'</span>').join('')+'</div>'+drawQuestion(item,idx,5,s)+(done?'<div class="fb '+(ok?'ok':'bad')+'">'+(ok?'آفرین، درست است.':'این پاسخ درست نیست.')+'</div><div class="ex">'+window.MathLite.renderRich(item.ex)+'</div>':'')+'<div class="opts"><button class="btn" data-prev '+(idx===0?'disabled':'')+'>سؤال قبلی</button><button class="btn primary" data-next '+(!done?'disabled':'')+'>'+(idx===4?'مشاهدهٔ نتیجه':'سؤال بعدی')+'</button></div>';test.querySelectorAll('[data-select]').forEach((b,i)=>{if(done)b.disabled=true;});}
 test.addEventListener('click',e=>{let b=e.target.closest('button');if(!b||b.disabled)return;if(b.dataset.select!==undefined&&answers[idx]===null){answers[idx]=+b.dataset.select;paint()}else if(b.hasAttribute('data-next')){idx++;paint()}else if(b.hasAttribute('data-prev')){idx--;paint()}else if(b.hasAttribute('data-restart')){let clean=test.cloneNode(false);test.replaceWith(clean);test=clean;practice()}else if(b.hasAttribute('data-review')){idx=0;paint()}});paint();}
 // Exploration: incremental disclosure, different workbench prompt and visual model per skill
 function explore(){let item={...q(id),id},done=false,chosen=-1;function paint(){let vis='';if(id==='A04'){let qmark=math('?'),c11=done?math('x^2'):qmark,c12=done?math(item.a+'x'):qmark,c21=done?math(item.b+'x'):qmark,c22=done?math(String(item.a*item.b)):qmark,sumtxt=done?math('x^2'+(item.a+item.b===0?'':plus(item.a+item.b)+'x')+plus(item.a*item.b)):qmark;vis='<div class="a04-workbench"><p class="a04-caption">هر خانه = سطر × ستون</p><div class="a04-grid"><div class="a04-head">'+math('\\times')+'</div><div class="a04-head">'+math('x')+'</div><div class="a04-head">'+math(String(item.a))+'</div><div class="a04-head">'+math('x')+'</div><div class="a04-cell">'+c11+'</div><div class="a04-cell">'+c12+'</div><div class="a04-head">'+math(String(item.b))+'</div><div class="a04-cell">'+c21+'</div><div class="a04-cell">'+c22+'</div></div><p class="a04-caption">جمع چهار خانه: '+sumtxt+'</p></div>'; }
 if(id==='A05')vis='<div class="alg2-area"><span>'+math('x^2')+'</span><span>'+math('ax')+'</span><span>'+math('ax')+'</span><span>'+math('a^2')+'</span></div>';
 if(id==='A03')vis='<div class="alg2-strip">ضریب بیرونی ← جملهٔ اول و جملهٔ دوم</div>';
 if(id==='A06')vis='<div class="alg2-strip">بسط <span>⇄</span> تجزیه</div>';
 if(id==='A07')vis='<div class="alg2-strip">جمعِ دو عدد و حاصل‌ضرب همان دو عدد</div>';
 if(id==='A08')vis='<div class="alg2-strip">مخرجِ اصلی باید ناصفر بماند</div>';
 if(id==='A02')vis='<div class="alg2-strip">به توانِ حرف‌ها نگاه کن؛ نه به ضریبشان</div>';
 lab.innerHTML=questionMarkup(item,true)+vis+'<div class="alg2-options">'+item.opts.map((o,i)=>'<button class="btn'+choiceMark(done,chosen,item.opts.findIndex(v=>String(v)===String(item.answer)),i)+'" data-pick="'+i+'" '+(done?'disabled':'')+'>'+math(String(o))+'</button>').join('')+'</div>'+(done?'<div class="fb '+(String(item.opts[chosen])===String(item.answer)?'ok':'bad')+'">'+(String(item.opts[chosen])===String(item.answer)?(id==='A03'?'درست است؛ ضریب جملهٔ دارای '+math(item.part)+' را درست پیدا کردی.':id==='A04'?'درست است؛ چهار حاصل‌ضرب را درست پیدا کردی و بعد جمله‌های هم‌نوع را با هم جمع کردی.':'درست است؛ این دو جمله هم‌نوع‌اند.'):(id==='A03'?'ضریب را دوباره بررسی کن.':id==='A04'?'ضربِ هر سطر در هر ستون را دوباره بررسی کن.':'انتخابت را دوباره بررسی کن.'))+'</div><div class="ex">'+window.MathLite.renderRich(item.ex)+'</div>':'')+'<div class="opts alg2-actions"><button class="btn primary" data-fresh>مثال جدید</button></div>';}
 lab.addEventListener('click',e=>{let b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-fresh')){item={...q(id),id};done=false;chosen=-1;paint()}else if(b.dataset.pick!==undefined&&!done){chosen=+b.dataset.pick;done=true;paint()}});paint();}
 if(!options||!options.practiceOnly)explore();practice();}
window.Algebra2={init};
})();
