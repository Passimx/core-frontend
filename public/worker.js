self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('push', (event) => {
    const data = event.data?.json();
    const { title, ...payload } = data;

    const promiseChain = self.registration.showNotification(title, payload);
    event.waitUntil(promiseChain);
});

self.addEventListener('notificationclick', (event) => {
    const notification = event.notification;
    notification.close();
    event.waitUntil(self.clients.openWindow(notification.data.url));
});
