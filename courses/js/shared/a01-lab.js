/* A01 only — offline interactive substitution cards and final review. */
(function(){'use strict';
const ML=window.MathLite,M=s=>ML.renderRich('$'+s+'$'),R=s=>ML.renderRich(s),fa=ML.fa;
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),nz=(a,b)=>{let x;do{x=rnd(a,b)}while(!x);return x};
const sign=n=>n<0?String(n):'+'+n,term=(n,x)=>n===1?x:n===-1?'-'+x:n+x,paren=n=>'('+n+')';
const norm=s=>String(s).trim().replace(/[۰-۹]/g,d=>d.charCodeAt(0)-1776).replace(/[٠-٩]/g,d=>d.charCodeAt(0)-1632).replace(/[−–]/g,'-').replace(/\s/g,'');
const input=(id,placeholder='پاسخ عددی')=>'<input class="a01-number-input" id="'+id+'" type="text" inputmode="decimal" autocomplete="off" placeholder="'+placeholder+'">';
const notation=q=>'{'+q.expr+'}_{'+(q.vars.length===1?'|'+q.vars[0][0]+'='+q.vars[0][1]:'\\Big|\\,\\substack{'+q.vars.map(v=>v[0]+'='+v[1]).join('\\\\')+'}')+'}';
function make(kind){
 let a=nz(-6,6),b=rnd(-8,8),x=nz(-5,5),y=nz(-5,5),c=nz(-5,5);
 if(kind===0)return {expr:term(a,'x')+sign(b),vars:[['x',x]],answer:a*x+b,calc:a+'\\times'+paren(x)+sign(b)+'='+(a*x+b)};
 if(kind===1)return {expr:term(a,'x')+sign(c)+'y'+sign(b),vars:[['x',x],['y',y]],answer:a*x+c*y+b,calc:a+'\\times'+paren(x)+sign(c)+'\\times'+paren(y)+sign(b)+'='+(a*x+c*y+b)};
 return {expr:term(a,'x^2')+sign(c)+'x'+sign(b),vars:[['x',x]],answer:a*x*x+c*x+b,calc:a+'\\times'+paren(x)+'^2'+sign(c)+'\\times'+paren(x)+sign(b)+'='+(a*x*x+c*x+b)};
}
function lab(host){
 const names=['عبارت خطی','عبارت دو‌متغیره','عبارت توان‌دار'],desc=['متغیر در آن فقط به توان یک است.','در آن دو متغیر مستقل داریم.','متغیر می‌تواند توانی بیشتر از یک داشته باشد.'];
 let kind=-1,q=null,done=false,answer='';
 function tiles(){host.innerHTML='<div class="cards"><div class="cgrid a01-three">'+names.map((n,i)=>'<button class="cd" type="button" data-kind="'+i+'"><span class="cs">'+(i+1)+'</span><b>'+n+'</b><small>'+desc[i]+'</small></button>').join('')+'</div><div class="cover a01-card-detail" hidden></div></div>';}
 function fresh(){q=make(kind);done=false;answer='';paint();}
 function paint(){const cover=host.querySelector('.a01-card-detail');if(!cover)return;
 let h='<div class="ch"><b>'+names[kind]+'</b><button type="button" class="x" data-act="close" aria-label="بستن">✕</button></div>';
 h+='<p>مقدار عبارت زیر را برای مقدارهای داده‌شده محاسبه کن:</p><div class="dm">'+M(notation(q))+'</div>';
 if(!done){h+='<div class="a01-card-entry">'+input('a01-lab-input')+'</div><div class="opts a01-center"><button class="btn primary" type="button" data-act="check">ثبت</button></div>';}
 else{const ok=Number(norm(answer))===q.answer;h+='<div class="fb '+(ok?'ok':'bad')+'">'+(ok?'آفرین، درست محاسبه کردی.':'پاسخ درست را در محاسبهٔ زیر ببین.')+'</div><div class="ex"><div class="dm">'+M(notation(q)+'='+q.calc)+'</div></div><div class="opts a01-center">'+(ok?'<button class="btn primary" data-act="new">مثال جدید</button>':'<button class="btn primary" data-act="new">مثال جدید</button><button class="btn" data-act="retry">همین مثال دوباره</button>')+'</div>';}
 cover.innerHTML=h;cover.hidden=false;
 }
 host.addEventListener('click',e=>{let b=e.target.closest('button');if(!b||!host.contains(b))return;
 if(b.dataset.kind!==undefined){kind=Number(b.dataset.kind);const grid=host.querySelector('.cgrid');grid.dataset.height=grid.getBoundingClientRect().height;grid.hidden=true;const cover=host.querySelector('.a01-card-detail');cover.style.minHeight=grid.dataset.height+'px';fresh();return;}
 switch(b.dataset.act){case 'close':host.querySelector('.a01-card-detail').hidden=true;host.querySelector('.cgrid').hidden=false;kind=-1;break;
 case 'check':{let el=host.querySelector('#a01-lab-input'),v=norm(el.value);if(v===''||!Number.isFinite(Number(v))){el.focus();return;}answer=v;done=true;paint();break;}
 case 'new':fresh();break;case 'retry':done=false;answer='';paint();break;case 'easy':fresh();break;}
 });host.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='a01-lab-input'){e.preventDefault();host.querySelector('[data-act="check"]').click();}});tiles();
}
function distract(ans){let a=[-ans,ans+1,ans-1,ans+2,ans-2,ans+3,ans-3,0];return a.filter((v,i)=>v!==ans&&a.indexOf(v)===i);}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(0,i);[a[i],a[j]]=[a[j],a[i]];}return a;}
function opts(q,bads){q.options=shuffle([q.answer,...bads.filter(v=>v!==q.answer).filter((v,i,a)=>a.indexOf(v)===i).slice(0,3)]);while(q.options.length<4){let v=q.answer+nz(-11,11);if(!q.options.includes(v))q.options.push(v);}return q;}
function finalQuestions(){
 const target=nz(-9,9),coeff=nz(-8,8),x=nz(-6,6),y=nz(-6,6);
 const fixed=[{tex:term(nz(-5,5),'x')+sign(target),constant:target},{tex:term(nz(-5,5),'x')+sign(-target),constant:-target},{tex:term(target,'x^2')+sign(nz(-6,6))+'xy^2',constant:0},{tex:term(nz(-5,5),'x^2')+sign(target)+'xy^2',constant:0}];
 const selected=shuffle(fixed).slice(0,3),found=selected.findIndex(z=>z.constant===target);
 const answers=['عبارت ۱','عبارت ۲','عبارت ۳','هیچ‌کدام'];
 const q1={kind:'choice',label:'در کدام یک از عبارت‌های زیر، جملهٔ ثابت برابر $'+target+'$ است؟',expressions:selected,options:answers,answer:found<0?3:found,correct:'آفرین، درست تشخیص دادی.',wrong:found<0?'هیچ‌کدام از عبارت‌ها جملهٔ ثابت $'+target+'$ ندارند؛ چون جمله‌های ثابتِ آن‌ها به‌ترتیب $'+selected.map(o=>o.constant).join('$, $')+'$ هستند.':'جملهٔ ثابتِ عبارت '+fa(found+1)+' برابر $'+selected[found].constant+'$ است؛ زیرا آن عدد بدون متغیر آمده است.'};
 const sq='x^2', other=nz(-7,7);
 // One target, three displayed expressions: -2*x², +2*x², -2*x, or constant -2.
 const categories=shuffle(['target','opposite','linear','constant']).slice(0,3);
 const expressions=categories.map((type)=>({
   tex:type==='target'?'-2x^2'+sign(other)+'x':type==='opposite'?'2x^2'+sign(other)+'x':type==='linear'?term(nz(3,7),'x^2')+'-2x'+sign(other):term(nz(3,7),'x^2')+sign(nz(3,7))+'x-2',
   type:type
 }));
 const found2=expressions.findIndex(z=>z.type==='target');
 const q2={kind:'choice',label:'در کدام یک از عبارت‌های زیر، ضریب عددیِ جملهٔ $x^2$ برابر $-2$ است؟',expressions:expressions,options:['عبارت ۱','عبارت ۲','عبارت ۳','هیچ‌کدام'],answer:found2<0?3:found2,correct:'آفرین، ضریب جملهٔ $x^2$ را درست تشخیص دادی.',wrong:'ضریب جملهٔ $x^2$ را از ضریب جملهٔ $x$ و جملهٔ ثابت جدا کن.'};
 const out=[q1,q2];for(let k=0;k<3;k++){const q=make(k),bad=distract(q.answer);out.push(opts({kind:'choice',label:'مقدار عبارت $'+notation(q)+'$ را حساب کن:',tex:null,solution:notation(q)+'='+q.calc,calc:q.calc,answer:q.answer,correct:'آفرین، درست محاسبه کردی.',wrong:'محاسبهٔ درست: $'+notation(q)+'='+q.calc+'$.'},bad));}return out;
}
function quiz(host){let qs=[],i=0,answers=[],ended=false;
 function reset(){qs=finalQuestions();i=0;answers=[];ended=false;paint();}
 function isRight(j){const q=qs[j];return answers[j]!==undefined&&(q.kind==='number'?Number(norm(answers[j]))===q.answer:(j<=1?answers[j]===q.answer:q.options[answers[j]]===q.answer));}
 function paint(){if(ended){const s=qs.filter((_,j)=>isRight(j)).length;host.innerHTML='<div class="fb '+(s>=4?'ok':'bad')+'"><b>نتیجه: '+fa(s)+' از ۵</b><p>'+(s===5?'به همهٔ سؤال‌ها درست پاسخ دادی.':'می‌توانی پاسخ‌هایت را مرور کنی یا یک آزمون تازه انجام بدهی.')+'</p></div><div class="opts end-actions"><button class="btn" data-action="review">مرور سؤال‌ها</button><button class="btn primary" data-action="new">سؤال‌های جدید</button></div>';return;}
 const q=qs[i],has=answers[i]!==undefined;let h='<div class="stg">'+qs.map((_,j)=>'<span class="'+(j===i?'cu':answers[j]!==undefined?(isRight(j)?'dn':'wr'):'')+'">'+fa(j+1)+'</span>').join('')+'</div><p class="ask a2-question">'+R(q.label)+'</p>';
 if(q.expressions){h+='<ol class="steps a01-expression-list">'+q.expressions.map(o=>'<li>'+M(o.tex)+'</li>').join('')+'</ol>';}
 else if(q.tex){h+='<div class="dm">'+M(q.tex)+'</div>';}
 if(q.kind==='number'){h+='<div class="a01-card-entry">'+input('a01-final-input')+'</div>';}
 else{h+='<div class="mc '+(i<=1?'a01-constant-choices':'')+'">'+q.options.map((v,j)=>'<button type="button" class="btn opt '+(has?((i<=1?j===q.answer:v===q.answer)?'right':answers[i]===j?'wrong':''):'')+'" data-opt="'+j+'" '+''+'>'+(i<=1?v:M(String(v)))+'</button>').join('')+'</div>';}
 if(has){
  const ok=isRight(i);
  h+='<div class="fb '+(ok?'ok':'bad')+'">'+(ok?'✓ '+R(q.correct):'پاسخت درست نیست؛ راه‌حل را در کادر زیر بررسی کن.')+'</div>';
  const explanation=i>=2 ? '<p>برای به‌دست‌آوردن مقدار عبارت، عدد داده‌شده را جای متغیر می‌گذاریم:</p><div class="dm" dir="ltr" style="direction:ltr;text-align:center">'+M(q.solution)+'</div>' : '<p>'+R(q.wrong)+'</p>';
  h+='<div class="ex" style="border-style:dashed">'+explanation+'</div>';
 }
 h+='<div class="opts"><button class="btn" data-action="prev" '+(i===0?'disabled':'')+'>سؤال قبلی</button><button class="btn primary" data-action="next" '+(!has?'disabled':'')+'>'+(i===4?'مشاهدهٔ نتیجه':'سؤال بعدی')+'</button></div>';
 if(q.kind==='number'&&!has)h=h.replace('<div class="opts"><button','<div class="opts"><button');
 host.innerHTML=h;
 if(q.kind==='number'){const el=host.querySelector('#a01-final-input');if(has){el.value=answers[i];el.disabled=true;}else{const btn=host.querySelector('[data-action="next"]');btn.disabled=false;btn.textContent='ثبت پاسخ';}}
 }
 host.addEventListener('click',e=>{let b=e.target.closest('button');if(!b||!host.contains(b)||b.disabled)return;
 if(b.dataset.opt!==undefined){answers[i]=Number(b.dataset.opt);paint();return;}
 switch(b.dataset.action){case 'next':if(qs[i].kind==='number'&&answers[i]===undefined){let el=host.querySelector('#a01-final-input'),v=norm(el.value);if(v===''||!Number.isFinite(Number(v))){el.focus();return;}answers[i]=v;paint();return;}if(i===4)ended=true;else i++;paint();break;case 'prev':i--;paint();break;case 'review':i=0;ended=false;paint();break;case 'new':reset();break;}
 });host.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='a01-final-input'){e.preventDefault();host.querySelector('[data-action="next"]').click();}});reset();
}
window.A01Lab={start:(a,b)=>{lab(a);quiz(b);}};
})();
