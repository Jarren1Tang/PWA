importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

const { precacheAndRoute } = workbox.precaching;

// Precache and route all assets
precacheAndRoute(self.__WB_MANIFEST);

// Set up caching strategies for specific resources
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
      }),
    ],
  })
);

// Handle push notifications
self.addEventListener('push', (event) => {
  const payload = event.data.json();
  const title = payload.title;
  const options = {
    body: payload.body,
    icon: '/icon.png',
    badge: '/badge.png',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = 'https://example.com'; // URL to open when notification is clicked
  event.waitUntil(
    clients.matchAll({
      type: 'window',
    }).then((windowClients) => {
      // Check if there is already a window open for the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // If no window is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});