const CACHE_NAME = "ibadat-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",

  "/css/home.css",

  "/js/home.js",
  "/js/theme.js",

  "/html/qibla.html",
  "/html/dua.html",
  "/html/hadith.html",
  "/html/calendar.html",
  "/html/settings.html",
  "/html/tasbih.html",
  "/html/allah-names.html",
  "/html/namaz-guide.html",
  "/html/namaz-recitation.html",
  "/html/namaz-shikha.html",
  "/html/jamaat-special.html",
  "/html/pobitrota-prostuti.html",

  "/dua.json",
  "/hadith.json",

  "/assets/bismillah.png",
  "/assets/status.png",
  "/assets/prayer-w.png",

  "/assets/icon_namaz.png",
  "/assets/icon_quran.png",
  "/assets/icon_dua.png",
  "/assets/icon_hadith.png",
  "/assets/icon_qibla.png",
  "/assets/icon_tasbih.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request)
          .then(networkResponse => {

            if (
              event.request.method === "GET" &&
              networkResponse.status === 200
            ) {
              const responseClone = networkResponse.clone();

              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseClone);
                });
            }

            return networkResponse;
          });
      })
      .catch(() => {
        if (event.request.destination === "document") {
          return caches.match("/index.html");
        }
      })
  );
});
