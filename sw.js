const CACHE='nce3-v14-multi';
const ASSETS=[
  './',
  './index.html',
  './lessons.json',
  './lesson42.json',
  './lesson44.json',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

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

  // Catalog + lesson data prefer network first, then fallback cache,
  // so newly uploaded lesson files appear quickly after deployment.
  if(
    url.pathname.endsWith('/lessons.json') ||
    /\/lesson\d+\.json$/.test(url.pathname)
  ){
    e.respondWith(
      fetch(e.request,{cache:'no-store'})
        .then(r=>{
          const c=r.clone();
          caches.open(CACHE).then(cache=>cache.put(e.request,c));
          return r;
        })
        .catch(()=>caches.match(e.request))
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
