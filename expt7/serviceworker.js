// var staticCacheName = "GAU";

// self.addEventListener("install", function (e) {
// e.waitUntil(
// 	caches.open(staticCacheName).then(function (cache) {
// 	return cache.addAll(["/"]);
// 	})
// );
// });

// self.addEventListener("fetch", function (event) {
// console.log(event.request.url);

// event.respondWith(
// 	caches.match(event.request).then(function (response) {
// 	return response || fetch(event.request);
// 	})
// );
// });

var staticCacheName = "GAU";

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll(["/"]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log(event.request.url);

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
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
      event.waitUntil(self.registration.showNotification("My watch", {
        body: data.message
      }))
    }
  }
})

var checkResponse = function (request) {
  return new Promise(function (fulfill, reject) {
    fetch(request).then(function (response) {
      if (response.status !== 404) {
        fulfill(response);
      } else {
        reject();
      }
    }, reject);
  });
};