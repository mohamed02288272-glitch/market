/* الدفعة 2+3: تأكيد القراية، "شفت التعديل"، صور وصوت في الشات، بحث وأوامر بالصوت */
(function(){
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
const css=document.createElement('style');
css.textContent=`
.cr .mb{width:40px;height:42px;border-radius:12px;background:var(--card);border:1px solid var(--line);font-size:18px;flex:none}
.cr .mb.rec{background:var(--red);color:#fff;font-size:12px;width:auto;padding:0 10px}
.mg img.mi{display:block;max-width:100%;max-height:260px;border-radius:10px;margin-top:4px;cursor:zoom-in}
.mg audio{display:block;width:210px;max-width:100%;height:38px;margin-top:4px}
.rr{margin-inline-start:6px;font-size:11px;cursor:pointer;opacity:.9}.rr.on{color:#7fe8ff;opacity:1}
#q{padding-inline-end:46px}
.stk .vm{position:absolute;inset-inline-end:6px;top:8px;width:34px;height:34px;border-radius:10px;font-size:17px;background:var(--card)}
.vm.on,#vc2.on{background:var(--red)!important;color:#fff;animation:pls 1s infinite}
@keyframes pls{50%{transform:scale(1.12)}}
#vc2{position:fixed;inset-inline-end:12px;bottom:calc(64px + env(safe-area-inset-bottom,0px));width:50px;height:50px;border-radius:50%;background:var(--btn);color:var(--btnt);font-size:22px;box-shadow:0 6px 18px rgba(0,0,0,.3);z-index:6}
#ak{position:fixed;left:8px;right:8px;top:calc(env(safe-area-inset-top,0px) + 6px);z-index:30;display:flex;flex-direction:column;gap:6px;max-width:560px;margin:0 auto;pointer-events:none}
.akc{pointer-events:auto;display:flex;align-items:center;gap:8px;background:linear-gradient(135deg,#e8590c,#f08c00);color:#fff;border-radius:14px;padding:8px 10px;box-shadow:0 6px 18px rgba(0,0,0,.35);font-size:13px}
.akc div{flex:1;min-width:0}.akc b{display:block}.akc button{background:#fff;color:#c2410c;font-weight:800;border-radius:10px;padding:7px 12px;flex:none}
#iv{position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:80;display:none;align-items:center;justify-content:center}#iv.on{display:flex}#iv img{max-width:96%;max-height:92%}
.lg small.ak2{display:block;margin-top:3px;color:var(--grn);font-weight:700}
`;
document.head.appendChild(css);
const iv=document.createElement('div');iv.id='iv';iv.innerHTML='<img alt="">';iv.onclick=()=>iv.classList.remove('on');document.body.appendChild(iv);
const ak=document.createElement('div');ak.id='ak';document.body.appendChild(ak);

/* لا نحفظ الصور والصوت في كاش الموبايل (بيملّي المساحة) */
const _si=Storage.prototype.setItem;
Storage.prototype.setItem=function(k,v){if(k==='sam_ca'){try{const o=JSON.parse(v);if(o.CH)o.CH=o.CH.map(m=>{if(!m.img&&!m.au)return m;const c={...m};delete c.img;delete c.au;return c});v=JSON.stringify(o)}catch(e){}}return _si.call(this,k,v)};

/* ---------- seen: تأكيد القراية + شفت التعديل ---------- */
const mid=()=>String(me).slice(2);
let SEEN={},seenReady=false,noSeen=false,warned=0,lastMark=0,inited=false;
const AK0=(()=>{try{let v=+localStorage.getItem('sam_ak0');if(!v){v=Date.now();localStorage.setItem('sam_ak0',v)}return v}catch(e){return 0}})();
function seenInit(){
 if(inited||!db||!me||me==='anon')return;inited=true;
 db.collection('seen').onSnapshot(s=>{SEEN={};s.docs.forEach(d=>SEEN[d.id]=d.data());seenReady=true;nm(Object.keys(SEEN).map(i=>'u:'+i));rch();rl();acks()},
  ()=>{noSeen=true;if(!warned){warned=1;toast('التأكيدات محتاجة قاعدة seen في Firestore (المالك يضيفها)',6000)}})}
const os=window.start;window.start=function(){os.apply(this,arguments);seenInit()};
if(started)seenInit();

const readers=m=>Object.keys(SEEN).filter(id=>id!==mid()&&(SEEN[id].chat||0)>=m.at);
function markChat(){
 if(tab!=='c'||document.hidden||!db||noSeen||!me||me==='anon')return;
 if(!CH.some(m=>m.by!==me&&m.at>((SEEN[mid()]||{}).chat||0)))return;
 if(Date.now()-lastMark<2500)return;lastMark=Date.now();
 db.doc('seen/'+mid()).set({chat:Date.now()},{merge:true}).catch(()=>{noSeen=true})}
document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(markChat,300)});

function decoChat(){
 const c=$('#cm');if(!c)return;const els=[...c.querySelectorAll(':scope>.mg')];if(els.length!==CH.length)return;
 els.forEach((el,i)=>{const m=CH[i];
  if(m.by===me&&m.id){const sm_=el.querySelector('small');if(sm_&&!sm_.querySelector('.rr')){const rd=readers(m),sp=document.createElement('span');sp.className='rr'+(rd.length?' on':'');sp.dataset.i=i;sp.textContent=rd.length?'✓✓':'✓';sm_.appendChild(sp)}}
  if(m.img||m.au){
   for(const n of [...el.childNodes]){if(n.nodeType===3&&n.textContent.trim()===String(m.t).trim())n.remove()}
   if(m.img){const im=new Image();im.className='mi';im.src=m.img;el.appendChild(im)}
   if(m.au){const a=document.createElement('audio');a.controls=true;a.preload='none';a.src=m.au;el.appendChild(a)}}})}
const orch=window.rch;window.rch=function(){orch.apply(this,arguments);try{decoChat()}catch(e){}markChat()};

const groups=()=>{const M=new Map();L.forEach(x=>{const k=x.pid+'|'+x.at+'|'+x.by;if(!M.has(k))M.set(k,{pid:x.pid,name:x.name,by:x.by,at:x.at,it:[]});M.get(k).it.push(x)});return[...M.values()]};
const gk=g=>g.pid+'_'+g.at;
const acked=(id,k)=>((SEEN[id]||{}).ack||{})[k];
function acks(){
 if(!seenReady||noSeen||me==='anon'){ak.innerHTML='';return}
 const now=Date.now(),pend=groups().filter(g=>g.by!==me&&g.at>AK0&&g.at>now-864e5&&!acked(mid(),gk(g)));
 ak.innerHTML=pend.slice(0,3).map(g=>`<div class="akc"><div><b>${esc(who(g.by))} عدّل «${esc(g.name)}»</b>${g.it.slice().sort((a,b)=>OR.indexOf(a.f)-OR.indexOf(b.f)).map(i=>FL[i.f]+' '+fm(i.to)).join(' · ')}</div><button data-ak="${esc(gk(g))}">تمام ✓</button></div>`).join('')+(pend.length>3?`<div class="akc"><div>و ${pend.length-3} تعديلات كمان</div></div>`:'')}
function decoLog(){
 const G=groups(),els=[...document.querySelectorAll('#ll .lg')];if(els.length!==G.length)return;
 els.forEach((el,i)=>{const g=G[i],k=gk(g),m=el.querySelector('.m');if(!m)return;
  const w=Object.keys(SEEN).filter(id=>('u:'+id)!==g.by&&acked(id,k)).map(id=>who('u:'+id));
  let tx='';if(w.length)tx='✓ شاف: '+w.join('، ');else if(g.by===me&&g.at>AK0&&seenReady&&!noSeen)tx='⏳ لسه محدش أكد';
  if(tx){const s=document.createElement('small');s.className='ak2';s.textContent=tx;m.appendChild(s)}})}
const orl=window.rl;window.rl=function(){orl.apply(this,arguments);try{decoLog();acks()}catch(e){}};
function ackOk(k){
 const id=mid();SEEN[id]=SEEN[id]||{};SEEN[id].ack={...(SEEN[id].ack||{}),[k]:Date.now()};acks();
 db.doc('seen/'+id).set({ack:{[k]:Date.now()}},{merge:true}).catch(()=>toast('مفيش صلاحية — قاعدة seen'))}

document.addEventListener('click',e=>{
 const t=e.target;if(!t.closest)return;
 const r=t.closest('.rr');if(r){const m=CH[+r.dataset.i];if(m){const rd=readers(m);toast(rd.length?'شافها: '+rd.map(i=>who('u:'+i)).join('، '):'لسه محدش شافها',3500)}return}
 const im=t.closest('img.mi');if(im){iv.querySelector('img').src=im.src;iv.classList.add('on');return}
 const b=t.closest('[data-ak]');if(b)ackOk(b.dataset.ak)},true);

/* ---------- صور وصوت في الشات ---------- */
function sendMedia(ex,label){
 const d={t:label,by:me,at:Date.now(),...ex};
 if(RP){d.rp={id:RP.id||'',by:RP.by,t:RP.t};srp()}
 if(JSON.stringify(d).length>950000)return toast('الملف كبير — جرّب أقصر أو صورة أصغر');
 db.collection('chat').add(d).catch(()=>toast('مقدرناش نبعت'))}
const shrink=f=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const s=Math.min(1,720/Math.max(im.width,im.height)),cv=document.createElement('canvas');cv.width=Math.round(im.width*s);cv.height=Math.round(im.height*s);cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);let q=.62,u=cv.toDataURL('image/jpeg',q);while(u.length>450000&&q>.3){q-=.1;u=cv.toDataURL('image/jpeg',q)}res(u)};im.onerror=rej;im.src=r.result};r.onerror=rej;r.readAsDataURL(f)});
const fi=document.createElement('input');fi.type='file';fi.accept='image/*';fi.hidden=true;document.body.appendChild(fi);
fi.onchange=async()=>{const f=fi.files[0];fi.value='';if(!f)return;try{sendMedia({img:await shrink(f)},'📷 صورة')}catch(e){toast('مقدرناش نقرأ الصورة')}};
let rec=null,chunks=[],tmr=0,t0=0;
async function recToggle(ev){
 const b=ev.currentTarget;if(rec){rec.stop();return}
 if(!navigator.mediaDevices||!window.MediaRecorder)return toast('المتصفح مش بيدعم التسجيل');
 try{
  const st=await navigator.mediaDevices.getUserMedia({audio:true});
  const mt=['audio/webm;codecs=opus','audio/mp4','audio/webm'].find(t=>MediaRecorder.isTypeSupported(t));
  rec=new MediaRecorder(st,mt?{mimeType:mt,audioBitsPerSecond:24000}:{audioBitsPerSecond:24000});chunks=[];
  rec.ondataavailable=e=>e.data.size&&chunks.push(e.data);
  rec.onstop=()=>{clearInterval(tmr);st.getTracks().forEach(t=>t.stop());b.classList.remove('rec');b.textContent='🎤';
   const bl=new Blob(chunks,{type:rec.mimeType||'audio/webm'}),secs=Math.round((Date.now()-t0)/1000);rec=null;if(secs<1)return;
   const r=new FileReader();r.onload=()=>sendMedia({au:r.result,dur:secs},'🎤 ملاحظة صوتية '+secs+' ث');r.readAsDataURL(bl)};
  t0=Date.now();rec.start();b.classList.add('rec');
  tmr=setInterval(()=>{const s=Math.round((Date.now()-t0)/1000);b.textContent='⏹ '+s+'ث · اضغط للإرسال';if(s>=45&&rec)rec.stop()},500)
 }catch(e){toast('مفيش إذن للمايك')}}
const cr=document.querySelector('#vc .cr');
if(cr&&!cr.querySelector('.mb')){const send=cr.querySelector('.pb');
 const ph=document.createElement('button');ph.className='mb';ph.textContent='📷';ph.onclick=()=>fi.click();
 const mic=document.createElement('button');mic.className='mb';mic.textContent='🎤';mic.onclick=recToggle;
 cr.insertBefore(ph,send);cr.insertBefore(mic,send)}

/* ---------- بحث وأوامر بالصوت ---------- */
function listen(btn,cb){
 if(!SR)return toast('المتصفح مش بيدعم الأوامر الصوتية');
 const r=new SR();r.lang='ar-EG';r.interimResults=false;r.maxAlternatives=3;btn.classList.add('on');
 r.onresult=ev=>cb([...ev.results[0]].map(a=>a.transcript));
 r.onerror=ev=>toast(ev.error==='not-allowed'?'مفيش إذن للمايك':ev.error==='no-speech'?'مسمعتش حاجة':'مقدرتش أسمع، جرّب تاني');
 r.onend=()=>btn.classList.remove('on');
 try{r.start()}catch(e){btn.classList.remove('on')}}
const stk=document.querySelector('.stk');
if(stk){const b=document.createElement('button');b.className='vm';b.textContent='🎙️';b.setAttribute('aria-label','بحث بالصوت');
 b.onclick=()=>listen(b,a=>{const t=nd(a[0]);$('#q').value=t;sq(t)});stk.appendChild(b)}
const vc2=document.createElement('button');vc2.id='vc2';vc2.textContent='🎙️';vc2.setAttribute('aria-label','أوامر صوتية');
vc2.onclick=()=>listen(vc2,cmd);document.body.appendChild(vc2);
const otb=window.tb;window.tb=function(t){otb.apply(this,arguments);vc2.style.display=t==='c'?'none':'';if(t==='c')setTimeout(markChat,300)};
vc2.style.display=tab==='c'?'none':'';

const SW=new Set(['سعر','غير','غيّر','خلي','خلي','بقي','بقه','بقا','ب','ل','الي','جنيه','جنيها','ج','قطاعي','جمله','شراء','شاري','سعره','سعرها','الشراء','الجمله','القطاعي','اعمل','حط','خليه','خليها','لبقي','علي','على'].map(nz));
const strip=w=>w.length>3&&w.startsWith('ال')?w.slice(2):w;
function parse(raw){
 const t=nz(nd(raw)).trim();if(!t)return null;
 let m=t.match(/^(ابحث عن|ابحث|دورلي|دور علي|دور|بحث)\s*(.*)$/);if(m)return{k:'s',name:m[2]};
 m=t.match(/^(افتح|اظهر|وريني)\s*(.*)$/);if(m)return{k:'o',name:m[2]};
 const nums=t.match(/\d+(?:\.\d+)?/g);if(!nums)return null;
 const n=parseFloat(nums[nums.length-1]),f=/جمل/.test(t)?'carton':/(شراء|شاري)/.test(t)?'buy':'retail';
 const name=t.replace(/\d+(\.\d+)?/g,' ').split(/\s+/).filter(w=>w&&!SW.has(w)).join(' ');
 return name?{k:'p',name,n,f}:null}
function find(name){
 const tk=name.split(/\s+/).filter(Boolean).map(strip);if(!tk.length)return[];
 const live=P.filter(p=>!p.del).map(p=>({p,s:nz(p.name),c:0}));
 live.forEach(x=>x.c=tk.filter(w=>x.s.includes(w)).length);
 let r=live.filter(x=>x.c===tk.length);if(!r.length&&tk.length>1)r=live.filter(x=>x.c>=tk.length-1&&x.c>0);
 return r.sort((a,b)=>a.p.name.length-b.p.name.length).slice(0,5).map(x=>x.p)}
function confirmPrice(p,f,n){
 op(hd('تأكيد تغيير السعر','')+`<div class="pbd"><div class="box" style="padding-top:12px"><b>${esc(p.name)}</b><div style="margin-top:6px">${FL[f]}: <span class="old">${fm(p[f])}</span> ← <b class="${n>(p[f]||0)?'up':'dn'}">${fm(n)}</b> ج.م</div></div></div><div class="pf"><button class="pb" onclick="vcOk('${esc(p.id)}','${f}',${n})">تأكيد ✓</button></div>`)}
window.vcOk=function(id,f,n){
 const p=P.find(x=>x.id===id);if(!p)return;const t=Date.now(),bt=db.batch();
 bt.update(db.doc('products/'+id),{[f]:n,by:me,at:t});
 bt.set(db.collection('log').doc(),{pid:id,name:p.name,f,from:p[f]==null?0:p[f],to:n,unit:p.unit||'',by:me,at:t});
 bt.commit().catch(()=>toast('مقدرناش نحفظ — اتأكد إن عندك صلاحية تعديل'));cs();toast('اتحفظ ✅',2000)};
window.vcSel=(id,f,n)=>{const p=P.find(x=>x.id===id);if(p)confirmPrice(p,f,n)};
function cmd(alts){
 for(const a of alts){const r=parse(a);if(!r)continue;
  if(r.k==='s'){$('#q').value=r.name;sq(r.name);return}
  const ms=find(r.name);
  if(!ms.length){toast('ملقيتش منتج اسمه «'+r.name+'»',4500);return}
  if(r.k==='o'){if(ms.length===1)edit(ms[0].id);else{$('#q').value=r.name;sq(r.name)}return}
  if(ms.length===1)return confirmPrice(ms[0],r.f,r.n);
  op(hd('أنهي منتج؟','سعر '+FL[r.f]+' ← '+fm(r.n))+`<div class="pbd">${ms.map(p=>`<button class="gm" style="display:flex;width:100%;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:10px 12px;margin-top:8px;text-align:right;font-weight:800" onclick="vcSel('${esc(p.id)}','${r.f}',${r.n})">${esc(p.name)}<small style="margin-inline-start:auto;color:var(--mut)">${fm(p[r.f])}</small></button>`).join('')}</div>`);return}
 toast('سمعت: «'+nd(alts[0])+'» ومفهمتش الأمر',5000)}
})();
