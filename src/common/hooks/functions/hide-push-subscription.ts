import { AppStateType } from '../../store/app/types/state.type.ts';
import { store } from '../../store';
import { AppActions } from '../../store/app/app.slice.ts';

export const hidePushSubscription = async () => {
    const setStateApp = (payload: Partial<AppStateType>) => store.dispatch(AppActions.setStateApp(payload));

    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    const subscription = await serviceWorkerRegistration.pushManager.getSubscription();
    await subscription?.unsubscribe();

    setStateApp({ settings: { pushSubscriptionPayload: undefined } });
};
