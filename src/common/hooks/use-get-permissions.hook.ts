import { useEffect } from 'react';
import { useAppAction, useAppSelector } from '../store';
import { rawApp } from '../store/app/app.raw.ts';
import { Envs } from '../config/envs/envs.ts';

export const useGetPermissions = () => {
    const { setStateApp } = useAppAction();
    const isActiveTab = useAppSelector((state) => state.app.isActiveTab);

    useEffect(() => {
        if (!isActiveTab) return;

        function urlBase64ToUint8Array(base64String: string) {
            const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
            const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);
            for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
            return outputArray;
        }

        if ('Notification' in window) {
            setStateApp({ allowNotifications: Notification.permission });
            navigator.permissions.query({ name: 'notifications' }).then((status) => {
                status.onchange = async () => {
                    setStateApp({ allowNotifications: status.state });

                    if (status.state !== 'granted') return;
                    const pushManager = rawApp.serviceWorkerRegistration?.pushManager;
                    if (!pushManager) return;

                    const subscription = await pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(Envs.publicVapidKey),
                    });
                    setStateApp({ pushSubscriptionPayload: subscription.toJSON() });
                };
            });
        }
    }, [isActiveTab]);
};
