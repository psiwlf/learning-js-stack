const CACHE_NAME = 'v-1'
const urlsToCache = ['index.html', 'offline.html']

// install service-worker
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    )

})

// listen for requests
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(() => {
            return fetch(e.request).catch(() => caches.match('offline.html'))
        })
    )

})

// activate service-worker
self.addEventListener('activate', (e) => {
    const cacheWhiteList = []
    cacheWhiteList.push(CACHE_NAME)

    e.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map(cacheName => {
                // to only keep the white-listed cache and remove others
                if(!cacheWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            })
        ))
    )
})
