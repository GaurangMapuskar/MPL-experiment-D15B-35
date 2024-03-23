self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('offline')
      .then(function (cache) {
        return cache.addAll([
          '/',
          '/index.html',
          // Add other essential static assets (CSS, JavaScript, images)
        ]);
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request)
      .catch(function () {
        return caches.match(event.request)
          .then(function (matching) {
            return matching || caches.match('offline.html');
          });
      })
  );
});

self.addEventListener('sync', event => {
  if
    (event.tag === 'syncMessage') {

    console.log("Sync successful!")
  }
});

self.addEventListener('push', function (event) {
  if (event && event.data) {
    var data = event.data.json();
    if (data.method == "pushMessage") {
      console.log("Push notiﬁcation sent");
      event.waitUntil(self.registration.showNotiﬁcation("My watch", {
        body: data.message
      }))
    }
  }
})
