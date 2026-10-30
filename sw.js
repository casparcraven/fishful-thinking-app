const C='fishful-shell-18';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
/* Online: always fetch the newest copy, bypassing the browser's HTTP cache. Offline: use the last saved copy. */
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);if(u.origin!==location.origin||e.request.method!=='GET')return;
  e.respondWith(fetch(e.request,{cache:'reload'}).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html')||caches.match('./'))));
});
