/* A06 — کارگاه اختصاصی تجزیه با عامل مشترک. بدون وابستگی آنلاین. */
(function(){'use strict';
const M=t=>window.MathLite.renderRich('$'+t+'$'), R=(a,b)=>Math.floor(Math.random()*(b-a+1))+a,
fa=n=>window.MathLite.fa(n), shuf=x=>{x=[...x];for(let i=x.length-1;i>0;i--){const j=R(0,i);[x[i],x[j]]=[x[j],x[i]]}return x;},
sg=n=>n<0?String(n):'+'+n, gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a), mk=(coef,pow)=>coef+(pow?'x'+(pow>1?'^'+pow:''):'');
const types=['number','letter','both','negative','bracket','complete','choice','verify'];
const goal={
 number:'پیداکردن بزرگ‌ترین عامل مشترک عددیِ ضرایب.',
 letter:'تشخیص حرف مشترک و انتخاب توان مناسب آن.',
 both:'پیداکردن عامل مشترک عددی و حرفی با هم.',
 negative:'انتخاب عامل منفی و رعایت علامت جمله‌های داخل پرانتز.',
 bracket:'تشخیص یک پرانتز کامل به‌عنوان عامل مشترک.',
 complete:'تشخیص تجزیهٔ درست و کامل، بدون عامل مشترک باقی‌مانده.',
 choice:'انتخاب حاصل‌ضربی که پس از بسط با عبارت اصلی برابر شود.',
 verify:'بررسی درستی تجزیه با بسط‌کردن و کنترل علامت‌ها.'
};
function make(type){let a,b,c,f,expr,answer,wrong=[],st='',prompt='بزرگ‌ترین عامل مشترک کدام است؟';
 if(type==='number'){f=R(2,8);a=R(2,6);b=R(2,6);while(gcd(a,b)!==1)b=R(2,7);expr=f*a+'x+'+f*b;answer=String(f);wrong=[String(a),String(f*a),String(f*b)];st=(expr+'='+f+'('+a+'x+'+b+')');}
 if(type==='letter'){a=R(2,8);b=R(2,8);while(gcd(a,b)!==1)b=R(2,9);expr=a+'x^2+'+b+'x';answer='x';wrong=['x^2',String(gcd(a,b))+'x','1'];st=(expr+'=x('+a+'x+'+b+')');}
 if(type==='both'){f=R(2,6);a=R(2,5);b=R(2,6);while(gcd(a,b)!==1)b=R(2,7);expr=f*a+'x^2+'+f*b+'x';answer=f+'x';wrong=[String(f),'x',f+'x^2'];st=(expr+'='+f+'x('+a+'x+'+b+')');}
 if(type==='negative'){f=R(2,7);a=R(1,4);b=R(1,7);while(gcd(a,b)!==1)b=R(1,7);expr='-'+f*a+'x+'+f*b;answer='-'+f;wrong=[String(f),'-'+f*a, '-1'];st=(expr+'=-'+f+'('+a+'x-'+b+')');prompt='برای اینکه پس از خارج‌کردن بزرگ‌ترین عامل مشترک عددی، ضریب x در پرانتز مثبت باشد، کدام عامل را باید بیرون بکشیم؟';}
 if(type==='bracket'){a=R(2,6);b=R(2,6);while(gcd(a,b)!==1)b=R(2,7);c=R(1,5);expr=a+'a(x-'+c+')+'+b+'b(x-'+c+')';answer='x-'+c;wrong=['x+'+c,'a+b',String(c)];st=(expr+'=(x-'+c+')('+a+'a+'+b+'b)');prompt='در این عبارت کدام پرانتز به‌طور کامل مشترک است؟';}
 if(type==='complete'){f=R(2,6);a=R(2,5);b=R(2,5);while(gcd(a,b)!==1)b=R(2,7);expr=f*a+'x+'+f*b;answer=f+'('+a+'x+'+b+')';wrong=['2('+f*a/2+'x+'+f*b/2+')',f+'('+a+'x+'+f*b+')',f+'('+a+'x-'+b+')'];wrong=wrong.filter(v=>!v.includes('.'));st=(expr+'='+answer);prompt='کدام تجزیه کامل و درست است؟';}
 if(type==='choice'){f=R(2,7);a=R(2,5);b=R(2,6);expr=f*a+'x^2-'+f*b+'x';answer=f+'x('+a+'x-'+b+')';wrong=[f+'('+a+'x-'+b+')',f+'x('+a+'x+'+b+')',f+'x^2('+a+'x-'+b+')'];st=(expr+'='+answer);prompt='کدام حاصل‌ضرب با عبارت داده‌شده برابر است؟';}
 if(type==='verify'){f=R(2,6);a=R(2,5);b=R(1,6);expr='-'+f*a+'x+'+f*b;answer='-'+f+'('+a+'x-'+b+')';wrong=['-'+f+'('+a+'x+'+b+')',f+'('+a+'x-'+b+')','-'+f+'('+a+'x-'+f*b+')'];st=(expr+'='+answer);prompt='کدام تجزیه با بسط‌کردن به عبارت اولیه برمی‌گردد؟';}
 wrong=wrong.filter(v=>v!==answer);let opts=[answer,...wrong];for(const extra of ['1','2','x','-x','3x','x^2']){if(opts.length>=4)break;if(!opts.includes(extra))opts.push(extra)}opts=shuf(opts.slice(0,4));return{type,expr,answer,opts,prompt,st,steps:M(st)};}
function inlinePrompt(q,m=M){const e=m(q.expr);switch(q.type){
case 'number':case 'letter':case 'both':return 'بزرگ‌ترین عامل مشترک عبارت '+e+' کدام است؟';
case 'negative':return 'برای اینکه پس از خارج‌کردن بزرگ‌ترین عامل مشترک عددی از عبارت '+e+'، ضریب '+m('x')+' در پرانتز مثبت باشد، کدام عامل را باید بیرون بکشیم؟';
case 'bracket':return 'در عبارت '+e+' کدام پرانتز به‌طور کامل مشترک است؟';
case 'complete':return 'کدام تجزیهٔ عبارت '+e+' درست و کامل است؟';
case 'choice':return 'کدام حاصل‌ضرب با عبارت '+e+' برابر است؟';
case 'verify':return 'کدام تجزیه با بسط‌کردن به عبارت '+e+' برمی‌گردد؟';
default:return q.prompt.replace('؟',' '+e+'؟');}}
function optsHTML(q,attr,selected){return '<div class="alg2-options">'+q.opts.map((o,i)=>'<button type="button" class="btn'+(selected!==null?(o===q.answer?' choice-correct':i===selected?' choice-wrong':''):'')+'" '+attr+'="'+i+'" '+(selected!==null?'disabled':'')+'>'+M(o)+'</button>').join('')+'</div>';}
function init(panel){let lab=panel.querySelector('#A06-explore'),test=panel.querySelector('#A06-practice');
let labQuestions=[],labIndex=0,labAnswers=[];
function newLabRound(){const selected=shuf(['number','letter','both','negative','bracket']);labQuestions=selected.map(make);labAnswers=Array(selected.length).fill(null);labIndex=0;paintLab();}
function paintLab(){
 if(labIndex===labQuestions.length){const score=labAnswers.filter((v,i)=>v!==null&&labQuestions[i].opts[v]===labQuestions[i].answer).length;
 lab.innerHTML=window.CourseKit.res(score, labQuestions.length) + '<div class="opts end-actions"><button type="button" class="btn" data-lab-review data-scroll>مرور سؤال‌ها</button><button type="button" class="btn primary" data-lab-restart data-scroll>سؤال‌های جدید</button></div>';return;}
 const item=labQuestions[labIndex],picked=labAnswers[labIndex],done=picked!==null,ok=done&&item.opts[picked]===item.answer;
 lab.innerHTML='<div class="stg">'+labQuestions.map((q,i)=>'<span class="'+(labAnswers[i]!==null?(q.opts[labAnswers[i]]===q.answer?'dn':'wr'):(i===labIndex?'cu':''))+'">'+fa(i+1)+'</span>').join('')+'</div><p class="ask">'+inlinePrompt(item)+'</p>'+optsHTML(item,'data-lab-choice',picked)+(done?'<div class="fb '+(ok?'ok':'bad')+'">'+(ok?'عامل مشترک را درست پیدا کردی.':'عامل مشترک را دوباره بررسی کن.')+'</div><div class="ex"><p>با تقسیم جمله‌ها بر عامل، عبارت داخل پرانتز به دست می‌آید:</p><div class="dm">'+item.steps+'</div><p>حالا اگر عامل بیرون پرانتز را دوباره پخش کنی، همان عبارت آغازین ساخته می‌شود.</p></div>':'')+'<div class="opts a06-controls"><button type="button" class="btn" data-lab-prev '+(labIndex===0?'disabled':'')+' data-scroll>سؤال قبلی</button><button type="button" class="btn primary" data-lab-next '+(!done?'disabled':'')+' data-scroll>'+(labIndex===labQuestions.length-1?'مشاهدهٔ نتیجه':'سؤال بعدی')+'</button></div>';
}
lab.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;
 if(b.hasAttribute('data-lab-choice')&&labAnswers[labIndex]===null){labAnswers[labIndex]=Number(b.getAttribute('data-lab-choice'));paintLab()}
 else if(b.hasAttribute('data-lab-next')){labIndex++;paintLab()}
 else if(b.hasAttribute('data-lab-prev')){labIndex--;paintLab()}
 else if(b.hasAttribute('data-lab-review')){labIndex=0;paintLab()}
 else if(b.hasAttribute('data-lab-restart'))newLabRound();
});newLabRound();
const H=window.CourseKit.lk(window.CourseKit),tx=t=>'$'+t+'$';let qs=[];
H.final(test,types.map((_,i)=>()=>{if(!i)qs=shuf(types).map(make);const q=qs[i];
 return{ask:inlinePrompt(q,tx),opts:q.opts.map(o=>({h:tx(o),ok:o===q.answer})),expl:()=>'<div class="dm">'+tx(q.st)+'</div><p class="a06-goal"><b>هدف این سؤال:</b> '+goal[q.type]+'</p>'};}));}
window.A06Lab={init};
})();
