const V='sam-v5';
/* يضيف patch.js و patch2.js تلقائيًا لصفحة index.html (لو مش مضافين) */
function inj(res){
  return res.text().then(t=>{
    let add='';
    if(t.indexOf('patch.js')<0)add+='<script src="patch.js?v=5"></script>';
    if(t.indexOf('patch2.js')<0)add+='<script src="patch2.js?v=1"></script>';
    if(add)t=t.replace('</body>',add+'</body>');
    return new Response(t,{status:res.status,statusText:res.statusText,headers:{'Content-Type':'text/html; charset=utf-8'}});
  });
}
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  const doc=r.mode==='navigate'||r.destination==='document';
  e.respondWith(
    fetch(r,{cache:'no-cache'}).then(res=>{
      if(doc&&res.ok)return inj(res).then(x=>{caches.open(V).then(c=>c.put(r,x.clone())).catch(()=>{});return x});
      const c=res.clone();
      caches.open(V).then(x=>x.put(r,c)).catch(()=>{});
      return res;
    }).catch(()=>caches.match(r).then(m=>m||caches.match(self.registration.scope)))
  );
});
