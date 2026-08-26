const CACHE_NAME = "paycheck-pilot-v1";

// ---------------------------------------------------------------------
// EXISTING — unchanged from production
// ---------------------------------------------------------------------
self.addEventListener("install", event => {
    self.skipWaiting();
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

    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
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
