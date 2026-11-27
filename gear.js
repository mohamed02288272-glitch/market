/* الدفعة 1: قايمة الترس المنظمة + وضع الليل + حجم الخط + أقسام (أيقونة/لون/عدّاد) + سلة محذوفات + كشف مكرر */
(function(){
const g=(k,d)=>{try{return localStorage.getItem(k)||d}catch(e){return d}},s_=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const css=document.createElement('style');
css.textContent=`
:root[data-theme=light]{--bg:#f1f5ef;--bg2:#e4eee7;--card:#fff;--ink:#10372b;--mut:#6b8076;--line:#dce7df;--lime:#e1f3cf;--limet:#2f6b12;--gold:#c27a0e;--plum:#a02a63;--red:#d63a2b;--grn:#15803d;--btn:linear-gradient(135deg,#0d6b4d,#1fa37a);--btnt:#fff;--inp:#f8fbf8;--g1:#0b5d46;--g2:#1c9a7a;color-scheme:light}
:root[data-theme=dark]{--bg:#0b1612;--bg2:#08100d;--card:#13231d;--ink:#e8f2ea;--mut:#8aa396;--line:#21372d;--lime:#2c4720;--limet:#d3ee80;--gold:#f2b64e;--plum:#f492c0;--red:#ff7b6b;--grn:#5fe3a2;--btn:linear-gradient(135deg,#25c58b,#a8dd4d);--btnt:#06241a;--inp:#0e1b16;--g1:#0f3d30;--g2:#14806a;color-scheme:dark}
:root{--z:1}.w,.pn{zoom:var(--z)}.pn{max-height:calc((var(--vh,100vh) - 12px)/var(--z))}
.gm{display:flex;align-items:center;gap:10px;width:100%;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:10px 12px;margin-top:8px;text-align:right}
.gm .e{font-size:20px;width:34px;height:34px;border-radius:10px;background:var(--bg);display:grid;place-items:center;flex:none}
.gm .t{flex:1;min-width:0;font-weight:800;font-size:14px}.gm .t small{display:block;color:var(--mut);font-weight:600;font-size:11px}.gm .b{color:var(--mut);font-size:18px}
.gh{color:var(--mut);font-weight:800;font-size:12px;margin:16px 2px 0}
.seg{display:flex;gap:6px}.seg .ch{flex:1;text-align:center}
.cn{font-size:10px;font-weight:800;margin-inline-start:5px;padding:0 6px;border-radius:999px;background:rgba(0,0,0,.13)}
.sws{display:flex;flex-wrap:wrap;gap:8px}.sws button{width:32px;height:32px;border-radius:50%;border:3px solid transparent}.sws button.on{border-color:var(--ink)}
.emo{display:flex;flex-wrap:wrap;gap:6px}.emo button{width:40px;height:40px;border-radius:10px;background:var(--card);border:1px solid var(--line);font-size:20px}.emo button.on{border-color:var(--g2);background:var(--lime)}
.dd{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.dd button{flex:1;min-width:30%;font-size:12px;padding:7px 4px;border-radius:10px;background:var(--bg);font-weight:700}
`;
document.head.appendChild(css);
const aT=()=>{const t=g('sam_th','auto'),r=document.documentElement;t==='auto'?r.removeAttribute('data-theme'):r.setAttribute('data-theme',t)};
const aF=()=>document.documentElement.style.setProperty('--z',g('sam_fs','1'));
aT();aF();
const row=(e,t,s,fn)=>`<button class="gm" onclick="${fn}"><span class="e">${e}</span><span class="t">${t}<small>${s}</small></span><span class="b">‹</span></button>`;
const back='<button class="sb" onclick="team()">‹ رجوع للإعدادات</button>';
const seg=(cur,k,it)=>'<div class="seg">'+it.map(([v,l])=>`<button class="ch ${cur===v?'on':''}" onclick="gSet('${k}','${v}')">${l}</button>`).join('')+'</div>';
window.gSet=(k,v)=>{s_(k,v);aT();aF();team()};

/* ---- قايمة الترس ---- */
window.team=function(){
 co=false;const tr=P.filter(p=>p.del).length;
 op(hd('الإعدادات',owner?'المالك':esc(who(me)))+`<div class="pbd">
 <div class="gh">المنتجات</div>
 ${row('🏷️','الأقسام',C.length+' قسم · أيقونة ولون وعدّاد','cats()')}
 ${row('🗑','سلة المحذوفات',tr?tr+' منتج · بتتمسح نهائي بعد 30 يوم':'فاضية','gTrash()')}
 ${row('🔍','المنتجات المكررة','كشف المنتجات المتشابهة','gDup()')}
 <div class="gh">الشكل</div>
 <label>الوضع</label>${seg(g('sam_th','auto'),'sam_th',[['auto','تلقائي'],['light','☀️ نهار'],['dark','🌙 ليل']])}
 <label>حجم الخط</label>${seg(g('sam_fs','1'),'sam_fs',[['1','عادي'],['1.12','كبير'],['1.25','كبير جداً']])}
 ${owner?`<div class="gh">الفريق</div>${row('👥','أعضاء الفريق',AC.length+' عضو · إضافة وحذف','gTeam()')}`:''}
 <div class="gh">الحساب</div>
 <button class="gm" onclick="lo()"><span class="e">🚪</span><span class="t">تسجيل خروج<small>${esc(who(me))}</small></span></button></div>`)};

window.gTeam=function(){co=false;
 op(hd('الفريق','')+`<div class="pbd">${back}<button class="pb" style="width:100%;margin:8px 0" onclick="$('#af').hidden=!$('#af').hidden">＋ إضافة عضو للتيم</button><div class="box" id="af" hidden><label>اسم الشخص</label><input id="an"><label>اسم المستخدم (حروف إنجليزي)</label><input id="au" dir="ltr" autocapitalize="none"><label>الباسورد</label><input id="ap" dir="ltr"><button class="pb" style="margin-top:10px;width:100%" onclick="mk()">＋ إضافة للفريق</button></div><div id="sh2"></div><div id="al"></div></div>`);al()};

/* ---- الأقسام ---- */
const EM=['🧀','🥦','🥩','🐟','🌾','🥖','🧃','💧','☕','🫒','🧂','🫘','🥫','🍫','🥚','🧊','🧴','🧼','🧽','🍼','✏️','🥤','🍎','🍚','🍬','🧈','🍗','🛒','🏷️','🧻'];
let G={};
window.cats=function(){
 if(!canW)return toast('الصلاحية للعرض فقط');
 const nv=(document.querySelector('#nc')||{}).value||'';
 op(hd('أقسام المتجر',C.length+' قسم')+`<div class="pbd">${back}<div class="box"><label>ضيف قسم جديد</label><div style="display:flex;gap:8px"><input id="nc" placeholder="مثال: أدوات مدرسية" value="${esc(nv)}"><button class="pb" onclick="gAdd()" style="white-space:nowrap">＋ إضافة</button></div></div>
 ${C.map(c=>{const n=P.filter(p=>!p.del&&p.cat===c.id).length,k=c.color||col(c.id);return`<div class="row"><div class="e" style="background:${k}33">${esc(c.emoji||'🏷️')}</div><div class="n">${esc(c.name)}<small>${n?n+' منتج':'فاضي'}</small></div><span style="width:14px;height:14px;border-radius:50%;background:${k};flex:none"></span><button onclick="gEd('${esc(c.id)}')">✏️</button></div>`}).join('')}</div>`);co=true};
window.gAdd=function(){const v=$('#nc').value.trim();if(!v)return;$('#nc').value='';db.collection('categories').add({name:v,emoji:'🏷️',at:Date.now()}).catch(()=>toast('مفيش صلاحية'))};
window.gEd=function(id){co=false;const c=C.find(x=>x.id===id);if(!c)return;G={id,emoji:c.emoji||'🏷️',color:c.color||col(id)};
 const n=P.filter(p=>!p.del&&p.cat===id).length;
 op(hd('تعديل القسم','')+`<div class="pbd"><button class="sb" onclick="cats()">‹ رجوع للأقسام</button><label>الاسم</label><input id="en" value="${esc(c.name)}"><label>الأيقونة</label><div class="emo">${EM.map(e=>`<button class="${e===G.emoji?'on':''}" onclick="gPick('emoji',this,'${e}')">${e}</button>`).join('')}</div><label>اللون</label><div class="sws">${PAL.map(k=>`<button class="${k===G.color?'on':''}" style="background:${k}" onclick="gPick('color',this,'${k}')"></button>`).join('')}</div>${n?'':`<button class="del" id="dc" onclick="gDc()">🗑 حذف القسم (فاضي)</button>`}</div><div class="pf"><button class="pb" onclick="gSave()">حفظ</button></div>`)};
window.gPick=function(k,b,v){G[k]=v;[...b.parentNode.children].forEach(x=>x.classList.remove('on'));b.classList.add('on')};
window.gSave=function(){const n=$('#en').value.trim();if(!n)return toast('اكتب اسم القسم');db.doc('categories/'+G.id).update({name:n,emoji:G.emoji,color:G.color}).catch(()=>toast('مفيش صلاحية'));cats()};
window.gDc=function(){const b=$('#dc');if(!b.dataset.s){b.dataset.s=1;b.textContent='اضغط تاني للتأكيد';return}db.doc('categories/'+G.id).delete().catch(()=>toast('مفيش صلاحية'));cats()};

/* ---- سلة المحذوفات ---- */
window.gDel=id=>db.doc('products/'+id).update({del:true,delAt:Date.now(),delBy:me}).catch(()=>toast('مفيش صلاحية'));
window.dp=function(id){const b=$('#dl');if(!b.dataset.s){b.dataset.s=1;b.textContent='اضغط تاني للتأكيد';return}gDel(id);cs();toast('اتنقل لسلة المحذوفات 🗑',2500)};
window.gTrash=function(){co=false;const T=P.filter(p=>p.del).sort((a,b)=>(b.delAt||0)-(a.delAt||0));nm(T.map(p=>p.delBy));
 op(hd('سلة المحذوفات','بتتمسح نهائي بعد 30 يوم')+`<div class="pbd">${back}${T.map(p=>`<div class="row"><div class="n">${esc(p.name)}<small>${esc(who(p.delBy))} · ${ago(p.delAt||0)}</small></div><button onclick="gRes('${esc(p.id)}')">↩️</button>${owner?`<button onclick="gKill(this,'${esc(p.id)}')">🗑</button>`:''}</div>`).join('')||'<div class="empty">السلة فاضية</div>'}</div>`)};
window.gRes=function(id){db.doc('products/'+id).update({del:false,delAt:null,delBy:null}).catch(()=>toast('مفيش صلاحية'));toast('اترجّع ✅',2000);setTimeout(gTrash,350)};
window.gKill=function(b,id){if(!b.dataset.s){b.dataset.s=1;b.textContent='؟';setTimeout(()=>{b.dataset.s='';b.textContent='🗑'},3000);return}db.doc('products/'+id).delete().catch(()=>toast('مفيش صلاحية'));setTimeout(gTrash,350)};

/* ---- كشف المكرر ---- */
function lev(a,b){const m=a.length,n=b.length;let p=Array.from({length:n+1},(_,j)=>j);for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}return p[n]}
let DD=[];
window.gDup=function(){co=false;let ig=[];try{ig=JSON.parse(g('sam_dup','[]'))}catch(e){}
 const A=P.filter(p=>!p.del).map(p=>({p,k:nz(p.name).replace(/[^\u0600-\u06FFa-z0-9]/g,''),d:(nd(p.name).match(/\d+/g)||[]).join(',')})).filter(x=>x.k.length>=3);
 DD=[];
 for(let i=0;i<A.length&&DD.length<30;i++)for(let j=i+1;j<A.length&&DD.length<30;j++){const a=A[i],b=A[j];if(a.d!==b.d||Math.abs(a.k.length-b.k.length)>2)continue;const key=[a.p.id,b.p.id].sort().join('|');if(ig.includes(key))continue;
  const lim=Math.min(a.k.length,b.k.length)>=10?2:1;if(a.k===b.k||lev(a.k,b.k)<=lim)DD.push([a.p,b.p,key])}
 const it=p=>`<div class="n">${esc(p.name)}<small>${esc(cn(p.cat))} · قطاعي ${fm(p.retail)}</small></div>`;
 op(hd('المنتجات المكررة',DD.length?DD.length+' احتمال تكرار':'')+`<div class="pbd">${back}${DD.map(([a,b,k],i)=>`<div class="box" style="padding-top:8px"><div class="row" style="margin-top:0">${it(a)}</div><div class="row">${it(b)}</div><div class="dd"><button onclick="gDx(${i},0)">🗑 امسح الأول</button><button onclick="gDx(${i},1)">🗑 امسح التاني</button><button onclick="gIg(${i})">مش مكرر</button></div></div>`).join('')||'<div class="empty">مفيش منتجات مكررة 👌</div>'}</div>`)};
window.gDx=function(i,w){gDel(DD[i][w].id);toast('اتنقل للسلة 🗑',2000);setTimeout(gDup,350)};
window.gIg=function(i){let ig=[];try{ig=JSON.parse(g('sam_dup','[]'))}catch(e){}ig.push(DD[i][2]);s_('sam_dup',JSON.stringify(ig));gDup()};

/* ---- ربط عرض المنتجات: إخفاء المحذوف + عدّاد وألوان الأقسام ---- */
const orp=window.rp;let purged=0;
window.rp=function(){
 const all=P,live=all.filter(p=>!p.del);P=live;try{orp()}finally{P=all}
 const cm=new Map(C.map(c=>[c.id,c])),bi=new Map(live.map(p=>[p.id,p]));
 document.querySelectorAll('#cc .ch').forEach(b=>{const m=/pc\('([^']*)'\)/.exec(b.getAttribute('onclick')||'');if(!m)return;const id=m[1],n=id==='all'?live.length:live.filter(p=>p.cat===id).length;if(!b.querySelector('.cn')){const s=document.createElement('span');s.className='cn';s.textContent=n;b.appendChild(s)}const c=cm.get(id);if(c&&c.color)b.style.setProperty('--ac',c.color)});
 document.querySelectorAll('#pl .card').forEach(d=>{const m=/tp\('([^']*)'\)/.exec(d.getAttribute('onclick')||'');if(!m)return;const p=bi.get(m[1]),c=p&&cm.get(p.cat);if(c&&c.color)d.style.setProperty('--ac',c.color)});
 if(owner&&!purged&&all.length){purged=1;all.filter(p=>p.del&&Date.now()-(p.delAt||0)>2592e6).forEach(p=>db.doc('products/'+p.id).delete().catch(()=>{}))}
};
rp();

/* ===== الدفعة 2+3: صوت (بحث وأوامر) + شات صور وتسجيل صوتي + "شافه/شافها" ===== */
const css2=document.createElement('style');
css2.textContent=`.vs{position:absolute;inset-inline-end:8px;top:8px;width:34px;height:34px;border-radius:50%;background:var(--bg2);font-size:16px}
.stk input#q{padding-inline-end:46px}
.rec{background:var(--red)!important;color:#fff!important}
.cb{width:42px;height:42px;border-radius:12px;background:var(--card);border:1px solid var(--line);flex:none;font-size:17px;padding:0}
.mi{display:block;max-width:100%;max-height:220px;border-radius:10px;margin-top:4px}
.ma{display:block;width:100%;max-width:230px;height:36px;margin-top:4px}
.rc{font-size:10px;opacity:.95;margin-top:2px}.rc b{color:#9ae6ff}`;
document.head.appendChild(css2);
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
function listen(cb,btn){
 if(!SR)return toast('المتصفح ده مش بيدعم الأوامر الصوتية');
 const r=new SR();r.lang='ar-EG';r.interimResults=false;r.maxAlternatives=1;
 if(btn)btn.classList.add('rec');
 r.onresult=e=>cb(e.results[0][0].transcript);
 r.onerror=e=>toast(e.error==='not-allowed'?'اسمح للميكروفون من إعدادات المتصفح':'مسمعتش، جرّب تاني');
 r.onend=()=>{if(btn)btn.classList.remove('rec')};
 try{r.start()}catch(x){}
}
/* بحث صوتي */
const qi=document.getElementById('q');
if(qi){const vb=document.createElement('button');vb.className='vs';vb.textContent='🎤';vb.onclick=()=>listen(t=>{qi.value=t;sq(t)},vb);qi.parentNode.appendChild(vb)}
/* أوامر صوتية */
window.gCmd=function(t){
 const s=nz(t).trim(),has=(...w)=>w.some(x=>s.includes(nz(x)));let m;
 if(m=s.match(/(?:دور علي|دورلي علي|ابحث عن|بحث عن|دور)\s+(.+)/)){tb('p');if(qi)qi.value=m[1];sq(m[1]);return toast('🔍 '+m[1],2000)}
 if(m=s.match(/قسم\s+(.+)/)){const c=C.find(c=>nz(c.name).includes(m[1].trim()));if(c){tb('p');pc(c.id);return toast(c.name,2000)}}
 if(has('ضيف منتج','منتج جديد','اضافه منتج','اضافه منتج جديد'))return edit('');
 if(has('سله','محذوفات'))return gTrash();
 if(has('مكرر'))return gDup();
 if(has('شات','رسايل','رسائل'))return tb('c');
 if(has('تعديلات','سجل'))return tb('l');
 if(has('اعدادات','الترس'))return team();
 if(has('ليل','دارك')){s_('sam_th','dark');aT();return toast('🌙',1500)}
 if(has('نهار','فاتح')){s_('sam_th','light');aT();return toast('☀️',1500)}
 if(has('كبر','خط كبير')){s_('sam_fs','1.25');aF();return toast('الخط كبير',1500)}
 if(has('خط عادي','صغر')){s_('sam_fs','1');aF();return toast('الخط عادي',1500)}
 if(has('منتجات','رئيسيه','الرئيسيه'))return tb('p');
 if(has('اقفل','ارجع','اغلق'))return cs();
 toast('مفهمتش: '+t,3000);
};
const hb=document.querySelector('.hb');
if(hb){const b=document.createElement('button');b.className='ic';b.id='vcmd';b.textContent='🎙️';b.setAttribute('aria-label','أوامر صوتية');b.onclick=()=>{toast('قول الأمر… (مثال: ضيف منتج / الشات / ليل / قسم ألبان / دور على جبنة)',3500);listen(gCmd,b)};hb.insertBefore(b,hb.firstChild)}
/* شات: صور وتسجيل صوتي */
const send2=d=>{if(db)db.collection('chat').add({...d,by:me,at:Date.now()}).catch(()=>toast('مفيش صلاحية للكتابة'))};
const cr=document.querySelector('#vc .cr');
if(cr){
 const f=document.createElement('input');f.type='file';f.accept='image/*';f.hidden=true;cr.appendChild(f);
 const ib=document.createElement('button');ib.className='cb';ib.textContent='📷';ib.onclick=()=>f.click();
 const mb=document.createElement('button');mb.className='cb';mb.textContent='🎤';
 cr.insertBefore(ib,cr.querySelector('.pb'));cr.insertBefore(mb,cr.querySelector('.pb'));
 f.onchange=()=>{const file=f.files[0];f.value='';if(!file)return;const u=URL.createObjectURL(file),im=new Image();
  im.onload=()=>{const k=Math.min(1,720/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);
   let q=.6,d=c.toDataURL('image/jpeg',q);while(d.length>700000&&q>.3){q-=.1;d=c.toDataURL('image/jpeg',q)}
   URL.revokeObjectURL(u);if(d.length>900000)return toast('الصورة كبيرة');send2({t:'📷 صورة',img:d});toast('اتبعتت ✅',1500)};
  im.onerror=()=>toast('الصورة مش مقروءة');im.src=u};
 let rc=null,ti=0,sec=0;
 mb.onclick=async()=>{
  if(rc){rc.stop();return}
  if(!navigator.mediaDevices||!window.MediaRecorder)return toast('المتصفح مش بيدعم تسجيل الصوت');
  try{const st=await navigator.mediaDevices.getUserMedia({audio:true}),ch=[],mr=new MediaRecorder(st,{audioBitsPerSecond:16000});
   rc=mr;sec=0;mr.ondataavailable=e=>{if(e.data.size)ch.push(e.data)};
   mr.onstop=()=>{clearInterval(ti);st.getTracks().forEach(t=>t.stop());rc=null;mb.classList.remove('rec');mb.textContent='🎤';
    if(sec<1)return;const fr=new FileReader();fr.onload=()=>{if(fr.result.length>900000)return toast('التسجيل طويل');send2({t:'🎤 رسالة صوتية',aud:fr.result,dur:sec});toast('اتبعتت ✅',1500)};fr.readAsDataURL(new Blob(ch,{type:mr.mimeType||'audio/webm'}))};
   mr.start();mb.classList.add('rec');mb.textContent='⏹ 0';ti=setInterval(()=>{sec++;mb.textContent='⏹ '+sec;if(sec>=30)mr.stop()},1000);
  }catch(e){toast('اسمح للميكروفون من إعدادات المتصفح')}};
}
/* منع تضخم الكاش المحلي بالصور والصوت */
window.svc=function(){clearTimeout(ct);ct=setTimeout(()=>sv_('sam_ca',{P,C,L:L.slice(0,150),CH:CH.map(m=>m.img||m.aud?{...m,img:'',aud:''}:m),me,names:Object.fromEntries(Object.entries(names).filter(e=>e[1]))}),500)};
/* شافه / شافها */
let SN={},mt={},mq=0,sn0=0;
function mark(k){if(!db||!/^u:/.test(me))return;mt[k]=Date.now();clearTimeout(mq);mq=setTimeout(()=>{const o=mt;mt={};db.doc('seen/'+me.slice(2)).set(o,{merge:true}).catch(()=>{if(!mark.w){mark.w=1;toast('علامة "شافه" محتاجة قاعدة seen في Firestore (هبعتلك الكود)',6000)}})},1500)}
const nmz=(k,t)=>Object.entries(SN).filter(([u,v])=>'u:'+u!==me&&(v[k]||0)>=t).map(([u])=>who('u:'+u));
function dec(){const c=document.getElementById('cm');if(!c)return;
 [...c.children].forEach((n,i)=>{const m=CH[i];if(!m||!n.classList.contains('mg'))return;
  if(m.img&&!n.querySelector('.mi')){const im=new Image();im.className='mi';im.src=m.img;im.onclick=()=>op(hd('صورة','')+`<div class="pbd"><img src="${m.img}" style="width:100%;border-radius:12px"></div>`);n.appendChild(im)}
  if(m.aud&&!n.querySelector('audio')){const a=document.createElement('audio');a.controls=true;a.preload='metadata';a.src=m.aud;a.className='ma';n.appendChild(a)}
  if(m.by===me){let r=n.querySelector('.rc');if(!r){r=document.createElement('div');r.className='rc';n.appendChild(r)}const rs=nmz('chat',m.at);r.innerHTML=rs.length?'<b>✓✓</b> شافها: '+esc(rs.join('، ')):'✓'}})}
function decL(){const e=document.getElementById('ll');if(!e)return;const M=new Map();
 L.forEach(x=>{const k=x.pid+'|'+x.at+'|'+x.by;if(!M.has(k))M.set(k,{by:x.by,at:x.at})});const G2=[...M.values()];
 [...e.querySelectorAll('.lg')].forEach((n,i)=>{const g2=G2[i],m=n.querySelector('.m');if(!g2||g2.by!==me||!m)return;let r=m.querySelector('.sn');if(!r){r=document.createElement('small');r.className='sn';r.style.display='block';m.appendChild(r)}
  const rs=nmz('log',g2.at);r.textContent=rs.length?'👁 شافوا التعديل: '+rs.join('، '):'لسه محدش شافه'})}
const orch=window.rch;window.rch=function(){orch();dec();if(tab==='c')mark('chat')};
const orl=window.rl;window.rl=function(){orl();decL();if(tab==='l')mark('log')};
const otb=window.tb;window.tb=function(t,i){otb(t,i);if(t==='c')mark('chat');if(t==='l')mark('log')};
const oqn=window.qn;window.qn=function(x){oqn(x);mark('log')};
const ost=window.start;window.start=function(){ost();if(sn0||!db)return;sn0=1;
 db.collection('seen').onSnapshot(s=>{SN={};s.docs.forEach(d=>SN[d.id]=d.data());nm(Object.keys(SN).map(u=>'u:'+u));dec();decL()},()=>{})};

})();
