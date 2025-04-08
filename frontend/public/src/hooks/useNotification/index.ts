'use client';

import { BACKEND } from '@/constants';
import { urlBase64ToUint8Array } from '@/utils';
import { useEffect } from 'react';

const useNotification = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
          registration.pushManager.getSubscription().then((subscription) => {
            if (!subscription) {
              const vapidPublicKey = 'YOUR_PUBLIC_VAPID_KEY';
              const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
              registration.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: convertedVapidKey,
                })
                .then((subscription) => {
                  fetch(BACKEND + '/chat/notification/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: 'user1', subscription }),
                  });
                });
            }
          });
        })
        .catch((err) =>
          console.error('Service Worker registration failed:', err)
        );
    }
  }, []);

  return {};
};

export default useNotification;
