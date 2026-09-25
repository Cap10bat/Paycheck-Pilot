const CACHE_NAME = "paycheck-pilot-v2";
// App shell cached on install so the offline-fallback path below (in the
// fetch handler) actually has something to serve. Previously nothing
// populated this cache at all, so an offline launch attempt resolved to
// undefined instead of the app shell — a failed load, not a graceful
// offline experience. Google's Android Vitals treats this class of
// failure as a negative quality signal for TWAs specifically, so this
// isn't just a UX nicety for a Play Store submission.
// Everything the app needs to start with no connection: the page, its
// styles, fonts and libraries (all self-hosted -- no CDNs).
const APP_SHELL = [
    "./", "./index.html", "./manifest.json", "./app.css",
    "./vendor/fonts/inter.css",
    "./vendor/fonts/inter-latin-300-normal.woff2", "./vendor/fonts/inter-latin-400-normal.woff2",
    "./vendor/fonts/inter-latin-500-normal.woff2", "./vendor/fonts/inter-latin-600-normal.woff2",
    "./vendor/fonts/inter-latin-700-normal.woff2", "./vendor/fonts/inter-latin-800-normal.woff2",
    "./vendor/lucide-1.48.0.min.js", "./vendor/chart-4.5.1.umd.min.js",
    "./vendor/canvas-confetti-1.6.0.browser.js", "./vendor/supabase-js-2.117.1.umd.js",
    "./vendor/papaparse-5.4.1.min.js",
    "./icons/icon-192.png", "./icons/icon-512.png"
];

// ---------------------------------------------------------------------
// EXISTING — unchanged from production
// ---------------------------------------------------------------------
self.addEventListener("install", event => {
    self.skipWaiting();
    event.waitUntil(
        // One by one, so a single failed file can't leave the cache empty.
        caches.open(CACHE_NAME).then(cache => Promise.all(APP_SHELL.map(url => cache.add(url).catch(() => {}))))
    );
});

self.addEventListener("fetch", event => {
    const url = new URL(event.request.url);

    // Only intercept same-origin requests — the app shell / offline
    // caching this was built for. A cross-origin request (e.g. calling
    // the Supabase Edge Function) must pass through untouched: returning
    // here without calling event.respondWith() tells the browser to
    // handle it natively, with correct CORS/preflight behavior. Without
    // this check, every fetch — including cross-origin ones — got routed
    // through fetch(event.request).catch(() => caches.match(event.request)),
    // and since a URL like the Edge Function endpoint was never cached,
    // the catch resolved to undefined, which the browser cannot use as a
    // Response ("Failed to convert value to 'Response'").
    if (url.origin !== self.location.origin) {
        return;
    }

    // Network first, keeping the cache current so an offline launch gets
    // the latest version seen; offline, serve from cache (the app shell
    // for page navigations, whatever the URL's query string).
    if (event.request.method !== "GET") return;
    event.respondWith(
        fetch(event.request)
            .then(response => {
                if (response && response.ok) {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(() => {});
                }
                return response;
            })
            .catch(() => caches.match(event.request, { ignoreSearch: true })
                .then(hit => hit || (event.request.mode === "navigate" ? caches.match("./") : null))
                .then(res => res || Response.error()))
    );
});

// ---------------------------------------------------------------------
// EXISTING behavior preserved (clients.claim()) — cache cleanup added,
// per your request. Currently a no-op in practice, since install doesn't
// populate anything under CACHE_NAME yet, but it's the structure you
// asked to have in place.
// ---------------------------------------------------------------------
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
            .then(() => clients.claim())
    );
});

// ---------------------------------------------------------------------
// ADDED — push event support
// Displays a system notification when a push message arrives. Expected
// payload (JSON): { title, body, type, screen }. Falls back to a plain
// text body if the payload isn't valid JSON, and to generic defaults if
// there's no payload at all.
// ---------------------------------------------------------------------
self.addEventListener("push", event => {
    let payload = { title: "Paycheck Pilot", body: "You have a new update." };
    try {
        if (event.data) payload = { ...payload, ...event.data.json() };
    } catch (err) {
        if (event.data) payload.body = event.data.text();
    }

    const options = {
        body: payload.body,
        icon: "icons/icon-192.png",
        badge: "icons/icon-192.png",
        data: { screen: payload.screen || "dashboard", type: payload.type || "general" },
        tag: payload.type || "paycheck-pilot",
        renotify: true
    };

    event.waitUntil(self.registration.showNotification(payload.title, options));
});

// ---------------------------------------------------------------------
// ADDED — notificationclick + navigation routing
// Focuses an already-open tab and posts the target screen to it via
// postMessage (the app listens for a "notification-navigate" message and
// calls navigateTo() with it). If no tab is open, opens a new one at
// ?screen=<target> instead.
// ---------------------------------------------------------------------
self.addEventListener("notificationclick", event => {
    event.notification.close();
    const screen = (event.notification.data && event.notification.data.screen) || "dashboard";

    event.waitUntil(
        self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
            for (const client of clientList) {
                if ("focus" in client) {
                    client.postMessage({ type: "notification-navigate", screen });
                    return client.focus();
                }
            }
            if (self.clients.openWindow) {
                return self.clients.openWindow(`./?screen=${encodeURIComponent(screen)}`);
            }
        })
    );
});
