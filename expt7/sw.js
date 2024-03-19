self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('offline')
        .then(function(cache) {
          return cache.addAll([
            '/',
            '/index.html',
            // Add other essential static assets (CSS, JavaScript, images)
          ]);
        })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request)
        .catch(function() {
          return caches.match(event.request)
            .then(function(matching) {
              return matching || caches.match('offline.html');
            });
        })
    );
  });