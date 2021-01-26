let version = "v3";

//Cache Files
let cacheFiles = [
  "/static/js/bundle.js",
    "/static/js/main.c2814d73.chunk.js",
  "/static/js/2.12ed478a.chunk.js",
  "/logo192.png",
  "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1494&q=80",
  "https://fonts.googleapis.com/css2?family=Ubuntu&display=swap",
  "https://fonts.gstatic.com/s/ubuntu/v15/4iCs6KVjbNBYlgoKfw72.woff2",
  "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple",
  "/static/css/main.60599ac8.chunk.css",
  "chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/react_devtools_backend.js",
  "/manifest.json",
  "/",
  "/index.html",
];

// Install Service Woker
self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(version).then((cache) => {
      console.log("cacheFiles", cacheFiles);
      return cache.addAll(cacheFiles);
    })
  );
});

// Activate Service Worker
self.addEventListener("activate", function (e) {
  console.log("[ServiceWorker] Activate");
});

const options = {
  ignoreSearch: true,
  ignoreMethod: true,
  ignoreVary: true,
};
// Fetch Service Worker
self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches
        .match(event.request, options)
        .then((response) => {
          if (response) {
            // console.log(response);
            return response || fetch.response;
          }
        })
        .catch((err) => {
          console.log("err", err);
        })
    );
  }
});