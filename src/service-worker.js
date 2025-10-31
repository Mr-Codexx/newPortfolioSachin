self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('portfolio-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/logo192.png',
        '/logo512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
