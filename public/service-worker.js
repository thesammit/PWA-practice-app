const CACHE_NAME = "0.0.1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

// install Service-Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("cache opened");
      return cache.addAll(urlsToCache);
    })
  );
});

// listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(() => {
        return fetch(event.request)
              .catch(() => caches.match('offline.html'))
      })
  );
});

// Activate Service-Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if(!cacheWhitelist.includes(cacheName)) return caches.delete(cacheName);
        return true; // added extra
      })
    ))
  );
});