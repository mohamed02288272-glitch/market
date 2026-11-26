/* patch.js — إضافات موقع سوبر ماركت الشيخ أيمن */
(function(){
/* ===== ستايل ===== */
var st=document.createElement('style');
st.textContent=
'.pr{gap:4px 6px}.sm span{gap:3px 5px}.ar{margin-inline-start:8px}'+
'.bless{display:flex;align-items:center;justify-content:center;gap:12px;margin:0 0 8px}'+
'.bt{font-family:"Aref Ruqaa","Amiri","Cairo",serif;font-weight:700;font-size:clamp(28px,9vw,40px);line-height:1.6;background:linear-gradient(100deg,#8a5200,#e8a400 30%,#fff1a8 50%,#e8a400 70%,#8a5200);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:bsh 5s ease-in-out infinite;filter:drop-shadow(0 2px 2px rgba(80,50,0,.3))}'+
'.orn{color:var(--gold);font-size:14px}'+
'@keyframes bsh{0%,100%{background-position:100% 0}50%{background-position:0 0}}'+
'@media(prefers-reduced-motion:reduce){.bt{animation:none}}'+
'#wab{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(104px + env(safe-area-inset-bottom,0px));z-index:30;display:flex;gap:6px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:999px;padding:5px;box-shadow:0 6px 18px rgba(0,0,0,.25);max-width:92%}'+
'#wab[hidden]{display:none}'+
'.wgo{background:linear-gradient(135deg,#128c4a,#25d366);color:#fff;font-weight:800;font-size:14px;padding:9px 16px;border-radius:999px;text-decoration:none;white-space:nowrap}'+
'.wx{width:30px;height:30px;border-radius:50%;background:var(--bg);flex:none}'+
'.mex{font-size:11px;padding:0 6px;margin-inline-start:6px;opacity:.9;vertical-align:middle}'+
'.edt{display:block;text-align:end;font-size:10px;opacity:.65;margin-top:2px}'+
'.mg.sel{outline:3px solid var(--gold)}'+
'.mg.sel:after{content:"✓";position:absolute;top:-8px;inset-inline-end:-8px;width:22px;height:22px;border-radius:50%;background:var(--gold);color:#fff;font-size:13px;font-weight:800;display:grid;place-items:center}'+
'body.smode .mg.ndl{opacity:.45}body.smode .mx,body.smode .mex{display:none}body.smode .cin{display:none}'+
'#selbar{display:none;position:fixed;left:0;right:0;bottom:calc(50px + env(safe-area-inset-bottom,0px));gap:8px;padding:8px 12px;max-width:560px;margin:0 auto;background:var(--bg);z-index:6}'+
'body.smode #selbar{display:flex}#selbar .pb{flex:1;background:linear-gradient(135deg,#c92a2a,#ef5b4b);color:#fff}#selbar .pb:disabled{opacity:.5}';
document.head.appendChild(st);
var fl=document.createElement('link');fl.rel='stylesheet';fl.href='https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@700&display=swap';document.head.appendChild(fl);

/* ===== هذا من فضل ربي ===== */
var w=$('.w'),bl=document.createElement('div');bl.className='bless';
bl.innerHTML='<span class="orn">✦</span><span class="bt">هذا من فضل ربي</span><span class="orn">✦</span>';
w.insertBefore(bl,w.firstChild);

/* ===== زر ابعت للتيم على الواتساب ===== */
var WA=[],wab=document.createElement('div');wab.id='wab';wab.hidden=true;document.body.appendChild(wab);
function wr(){
 if(!WA.length){wab.hidden=true;return}
 var t=WA.join('\n\n— — —\n\n');wab.hidden=false;
 wab.innerHTML='<a class="wgo" target="_blank" rel="noopener" href="https://wa.me/?text='+encodeURIComponent(t)+'">📲 ابعت للتيم'+(WA.length>1?' ('+WA.length+' تعديلات)':'')+'</a><button class="wx" aria-label="إغلاق">✕</button>';
}
wab.addEventListener('click',function(e){
 if(e.target.closest('.wx')){WA=[];wr()}
 else if(e.target.closest('.wgo'))setTimeout(function(){WA=[];wr()},500);
});
var _sv=window.sv;
window.sv=function(){
 var fn=$('#fn');
 if(!fn||!fn.value.trim())return _sv();
 var old=sel.id?P.find(function(p){return p.id===sel.id}):null;
 var n=function(i){var v=parseFloat(nd($(i).value));return isNaN(v)?0:v};
 var nw={name:fn.value.trim(),retail:n('#fr'),carton:n('#fc'),buy:n('#fb')},ch=[];
 OR.forEach(function(f){var o=old?(old[f]||0):0;if(old?o!==nw[f]:nw[f])ch.push(FL[f]+': '+(old?fm(o)+' ← ':'')+fm(nw[f]))});
 var on=old&&old.name!==nw.name;
 _sv();
 if($('#ov').classList.contains('on'))return; /* الحفظ فشل */
 if(!old||on||ch.length){
  var by=names[me]||(owner?'المالك':'عضو');
  var m=(old?'📝 تعديل منتج':'➕ منتج جديد')+' — سوبر ماركت الشيخ ايمن\n\n🛒 '+nw.name+(on?' (كان: '+old.name+')':'')+(ch.length?'\n'+ch.join('\n'):'')+'\n👤 '+by;
  WA.push(m);wr();
 }
};

/* ===== الشات: تعديل + تحديد وحذف أكتر من رسالة ===== */
var SM=false,SEL=new Set(),EDM=null,cm=$('#cm');
function can(m){return !!m.id&&(owner||m.by===me)}
function ub(){var d=$('#sdel');if(d){d.dataset.s='';d.textContent='🗑 حذف ('+SEL.size+')';d.disabled=!SEL.size}}
window.rch=function(){
 nm(CH.map(function(m){return m.by}));
 var e=$('#cm');if(!e)return;
 e.innerHTML=CH.map(function(m){
  var mine=m.by===me,dl=can(m);
  return '<div class="mg '+(mine?'me':'')+(SEL.has(m.id)?' sel':'')+(dl?'':' ndl')+'"><small>'+(mine?'أنت':esc(who(m.by)))+' · '+ago(m.at)+
   (dl?'<button class="mx" data-del="'+esc(m.id)+'" aria-label="حذف الرسالة">🗑</button>':'')+
   (mine&&m.id?'<button class="mex" data-ed="'+esc(m.id)+'" aria-label="تعديل الرسالة">✏️</button>':'')+'</small>'+
   (m.rp?'<div class="qt" data-go="'+esc(m.rp.id||'')+'"><b>'+esc(wn(m.rp.by))+'</b>'+esc(m.rp.t)+'</div>':'')+
   esc(m.t)+(m.ed?'<span class="edt">تم التعديل</span>':'')+'</div>';
 }).join('')||'<div class="empty">ابدأ الكلام مع التيم 👋</div>';
 if(tab==='c'){LS.c=Date.now();sv_('sam_ls',LS)}
 bd();ub();
};
/* وضع التعديل */
function sed(m){
 srp();EDM=m.id;
 var b=$('#rb');b.hidden=false;
 b.innerHTML='<div><b>✏️ تعديل الرسالة</b>'+esc(String(m.t).slice(0,80))+'</div><button aria-label="إلغاء">✕</button>';
 b.querySelector('button').onclick=ced;
 $('#sp').style.height='120px';
 var i=$('#ci');i.value=m.t;i.focus();
}
function ced(){EDM=null;$('#ci').value='';srp()}
var _srp=window.srp;
window.srp=function(m){if(m&&EDM){EDM=null;$('#ci').value=''}return _srp(m)};
var _sm=window.sm;
window.sm=async function(){
 if(!EDM)return _sm();
 var i=$('#ci'),t=i.value.trim();if(!t)return;
 var id=EDM,m=CH.find(function(x){return x.id===id});
 if(m&&t===m.t){ced();return}
 ced();
 try{await db.doc('chat/'+id).update({t:t.slice(0,500),ed:Date.now()})}
 catch(e){toast('مفيش صلاحية لتعديل الرسايل — لازم تعدّل قواعد Firestore')}
};
cm.addEventListener('click',function(e){
 var b=e.target.closest('.mex');if(!b||SM)return;
 var m=CH.find(function(x){return x.id===b.dataset.ed});if(m)sed(m);
});
/* وضع التحديد */
function entSel(){ced();SM=true;SEL.clear();document.body.classList.add('smode');rch()}
function exitSel(){SM=false;SEL.clear();document.body.classList.remove('smode');rch()}
var bar=document.createElement('div');bar.id='selbar';
bar.innerHTML='<button class="sb" id="sall">تحديد الكل</button><button class="pb" id="sdel" disabled>🗑 حذف (0)</button><button class="sb" id="scan">إلغاء</button>';
document.body.appendChild(bar);
$('#scan').onclick=exitSel;
$('#sall').onclick=function(){CH.filter(can).forEach(function(m){SEL.add(m.id)});rch()};
$('#sdel').onclick=async function(){
 var b=this;if(!SEL.size)return;
 if(!b.dataset.s){b.dataset.s=1;b.textContent='اضغط للتأكيد ('+SEL.size+')';setTimeout(function(){if(b.isConnected&&b.dataset.s)ub()},3000);return}
 try{
  var ids=Array.from(SEL),bt=db.batch();
  ids.forEach(function(i){bt.delete(db.doc('chat/'+i))});
  await bt.commit();exitSel();
 }catch(e){toast('مفيش صلاحية حذف — لازم تعدّل قواعد Firestore');ub()}
};
['touchstart','dblclick'].forEach(function(v){
 cm.addEventListener(v,function(e){if(SM||(v==='dblclick'&&e.target.closest('.mex')))e.stopImmediatePropagation()},{capture:true,passive:true});
});
cm.addEventListener('click',function(e){
 if(!SM)return;
 e.stopImmediatePropagation();
 var n=e.target.closest('.mg');if(!n)return;
 var m=CH[Array.prototype.indexOf.call(cm.children,n)];
 if(!m||!can(m))return;
 if(SEL.has(m.id))SEL.delete(m.id);else SEL.add(m.id);
 n.classList.toggle('sel',SEL.has(m.id));ub();
},true);
/* زرار تحديد جنب عنوان الشات */
var h=$('#vc h2.t'),r=document.createElement('div'),sb=document.createElement('button');
r.className='tr';sb.className='sb';sb.textContent='☑️ تحديد';sb.onclick=function(){SM?exitSel():entSel()};
h.parentNode.insertBefore(r,h);r.appendChild(h);r.appendChild(sb);
$('#vc .sub').textContent='اسحب أي رسالة عشان ترد عليها · ✏️ تعديل · 🗑 حذف · ☑️ تحديد لحذف أكتر من رسالة';
/* تغيير التبويب */
var _tb=window.tb;
window.tb=function(t,i){
 if(t!=='c'&&SM)exitSel();
 _tb(t,i);
 wab.style.display=t==='c'?'none':'';
};
rch();
})();
