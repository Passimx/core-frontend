import { Envs } from '../../config/envs/envs.ts';
import { store } from '../../store';
import { AppActions } from '../../store/app/app.slice.ts';
import { AppStateType } from '../../store/app/types/state.type.ts';
import { urlBase64ToUint8Array } from './url-base64-to-uint8-array.ts';

export const addPushSubscription = async () => {
    const setStateApp = (payload: Partial<AppStateType>) => store.dispatch(AppActions.setStateApp(payload));

    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    let subscription = await serviceWorkerRegistration.pushManager.getSubscription();

    if (subscription && Notification.permission !== 'granted') {
        await subscription.unsubscribe();
        subscription = null;
    }

    if (!subscription && Notification.permission === 'granted') {
        subscription = await serviceWorkerRegistration?.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(Envs.publicVapidKey),
        });
    }

    setStateApp({ settings: { pushSubscriptionPayload: subscription?.toJSON() } });
};
