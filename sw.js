const V='sam-v7';
const CORE=['./','index.html','manifest.json','icon-192.png','logo-full.jpg?v=2','fast.js?v=3','patch.js?v=5','patch2.js?v=1'];
const FB=['app','auth','firestore'].map(n=>'https://www.gstatic.com/firebasejs/10.14.1/firebase-'+n+'-compat.js');
const H={'Content-Type':'text/html; charset=utf-8'};
/* يضيف fast.js و patch.js و patch2.js تلقائيًا لصفحة index.html (لو مش مضافين) ويخفي شاشة اللوجو التانية */
function inj(t){
  let add='';
  if(t.indexOf('patch.js')<0)add+='<script src="patch.js?v=5"></script>';
  if(t.indexOf('patch2.js')<0)add+='<script src="patch2.js?v=1"></script>';
  if(t.indexOf('fast.js')<0)add+='<script src="fast.js?v=3"></script>';
  if(add)t=t.replace('</body>',add+'</body>');
  if(t.indexOf('#sp0{display:none')<0)t=t.replace('<head>','<head><style>#sp0{display:none!important}</style>');
  return t;
}
const mk=t=>new Response(inj(t),{status:200,headers:H});
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(V).then(c=>Promise.all([
    ...CORE.map(u=>fetch(u,{cache:'reload'}).then(r=>{
      if(!r.ok)return;
      return (u==='./'||u==='index.html')?r.text().then(t=>c.put(u,mk(t))):c.put(u,r);
    }).catch(()=>{})),
    ...FB.map(u=>fetch(u,{mode:'no-cors'}).then(r=>c.put(u,r)).catch(()=>{}))
  ])).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET')return;
  const u=new URL(r.url);
  /* مكتبات Firebase: من الجهاز على طول */
  if(u.hostname==='www.gstatic.com'&&u.pathname.indexOf('/firebasejs/')>=0){
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put(r,c)).catch(()=>{});return res})));
    return;
  }
  if(u.origin!==location.origin)return;
  const doc=r.mode==='navigate'||r.destination==='document';
  e.respondWith(caches.match(r,{ignoreSearch:!!doc}).then(m=>{
    /* يجيب النسخة الجديدة في الخلفية ويحدّث الكاش */
    const net=fetch(r,{cache:'no-cache'}).then(async res=>{
      if(!res.ok)return res;
      let out=res;
      if(doc){
        const t=await res.text();
        out=mk(t);
        if(m){
          const old=await m.clone().text();
          if(old!==inj(t))self.clients.matchAll().then(cs=>cs.forEach(c=>c.postMessage({u:1})));
        }
      }
      const c=out.clone();
      caches.open(V).then(x=>x.put(r,c)).catch(()=>{});
      return out;
    });
    if(m){e.waitUntil(net.catch(()=>{}));return m}
    return net.catch(()=>caches.match(self.registration.scope));
  }));
});
