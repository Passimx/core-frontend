import { Envs } from '../../config/envs/envs.ts';
import { store } from '../../store';
import { AppActions } from '../../store/app/app.slice.ts';
import { AppStateType } from '../../store/app/types/state.type.ts';

export const setPushSubscriptionPayload = async () => {
    const setStateApp = (payload: Partial<AppStateType>) => store.dispatch(AppActions.setStateApp(payload));

    function urlBase64ToUint8Array(base64String: string) {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
        return outputArray;
    }

    setStateApp({ allowNotifications: Notification.permission });

    if (Notification.permission !== 'granted') return;
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    if (!serviceWorkerRegistration?.pushManager) return;

    const subscription = await serviceWorkerRegistration?.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(Envs.publicVapidKey),
    });

    alert(JSON.stringify(subscription.toJSON()));

    setStateApp({ pushSubscriptionPayload: subscription.toJSON() });
};
