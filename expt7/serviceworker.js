self.addEventListener("install", function (event) {
	event.waitUntil(preLoad());
});

self.addEventListener("fetch", function(event){
	event.respondWith(checkResponse(event.request).catch(function(){
		console.log("Fetch from cache successful!")
		return returnFromCache(event.request);
	}));
	console.log("Fetch successful!")
	event.waitUntil(addToCache(event.request));
});

self.addEventListener('sync',event => {
	if(event.tag == 'sync') {
		console.log("Sync successful!")
	}
});

self.addEventListener('push', function(event) {
	if (event && event.data) {
	  var data = event.data.json();
	  if (data.method == "pushMessage") {
		console.log("Push notification sent");
		event.waitUntil(
		  self.registration.showNotification("Gaurang App", { body: data.message })
		);
	  }
	}
  });
  
	

var filesToCache = ['/',
	'/index.html','watch 1.jpg','watch 2.jpg','watch.mp4','watch 3.jpg','watch 4.jpg','watch 5.jpg','watch 6.jpg','watch 7.jpg','watch 8.jpg','watch 9.jpg'
];

var preLoad = function () {
	return caches.open("offline").then(function (cache) {
		// caching index and important routes
		return cache.addAll(filesToCache);
	});
};

self.addEventListener("fetch", function (event) {
	event.respondWith(checkResponse(event.request).catch(function () {
		return returnFromCache(event.request);
	}));
	event.waitUntil(addToCache(event.request));
});

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

var addToCache = function (request) {
	return caches.open("offline").then(function (cache) {
		return fetch(request).then(function (response) {
			return cache.put(request, response);
		});
	});
};

var returnFromCache = function (request) {
	return caches.open("offline").then(function (cache) {
		return cache.match(request).then(function (matching) {
			if (!matching || matching.status == 404) {
				return cache.match("offline.html");
			} else {
				return matching;
			}
		});
	});
};


self.addEventListener('activate', function (event) {
	event.waitUntil(
		// Perform cleanup tasks or cache management here
		// For example, deleting outdated caches
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.filter(function (cacheName) {
					// Check if the cache name is outdated and needs to be deleted
					// For example, you might compare cache names with the current cache
					version
				}).map(function (cacheName) {
					// Delete the outdated cache
					return caches.delete(cacheName);
				})
			);
		})
	);
});