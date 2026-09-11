const CACHE='nce3-v8';
const ASSETS=['./','./index.html','./lessons.json','./lesson42.json','./manifest.webmanifest','./icon-192.png','./icon-512.png'];

self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(url.pathname.endsWith('/lessons.json')){
    e.respondWith(
      fetch(e.request,{cache:'no-store'})
        .then(r=>{
          const c=r.clone();
          caches.open(CACHE).then(cache=>cache.put('./lessons.json',c));
          return r;
        })
        .catch(()=>caches.match('./lessons.json'))
    );
    return;
  }
  e.respondWith(
    fetch(e.request)
      .then(r=>{
        const c=r.clone();
        caches.open(CACHE).then(cache=>cache.put(e.request,c));
        return r;
      })
      .catch(()=>caches.match(e.request))
  );
});
