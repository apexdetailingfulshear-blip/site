// Apex Detailing PWA service worker.
//
// IMPORTANT: this site had a real, repeated problem with stale cached JS/CSS
// today. This service worker must never make that worse. Rule: HTML and our
// own JS files are ALWAYS fetched from the network first — the cache is only
// a fallback for when the phone is offline, never the primary source. Only
// truly static assets (icons) are cache-first.
var CACHE_NAME = "apex-pwa-v1";
var PRECACHE = [
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-192.png",
  "/icons/maskable-512.png",
];

self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

function isNetworkFirst(url) {
  // HTML documents and our own hand-written scripts/styles must always be
  // fresh. Third-party CDN assets and the versioned build CSS/JS are fine to
  // cache-fallback since they're already content-hashed or query-versioned.
  return (
    url.pathname === "/" ||
    url.pathname.endsWith(".html") ||
    url.pathname.indexOf("/assets/apex-") !== -1
  );
}

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (isNetworkFirst(url)) {
    event.respondWith(
      fetch(req).catch(function () {
        return caches.match(req).then(function (cached) {
          return cached || caches.match("/index.html");
        });
      })
    );
    return;
  }

  // Cache-first for static assets (icons, images), falling back to network
  // and updating the cache in the background.
  event.respondWith(
    caches.match(req).then(function (cached) {
      var fetchPromise = fetch(req).then(function (res) {
        if (res && res.status === 200) {
          caches.open(CACHE_NAME).then(function (cache) { cache.put(req, res.clone()); });
        }
        return res;
      }).catch(function () { return cached; });
      return cached || fetchPromise;
    })
  );
});
