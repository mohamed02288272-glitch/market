const V='sam-v4';
/* يضيف patch.js تلقائيًا لصفحة index.html (لو مش مضاف) */
function inj(res){
  return res.text().then(t=>{
    if(t.indexOf('patch.js')<0) t=t.replace('</body>','<script src="patch.js?v=4"></script></body>');
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
