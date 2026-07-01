import { useEffect } from 'react';
import { useAppSelector } from '../store';
import { addPushSubscription } from './functions/add-push-subscription.ts';

export const useRegisterServiceWorkerWorker = () => {
    const isActiveTab = useAppSelector((state) => state.app.isActiveTab);

    useEffect(() => {
        if (!isActiveTab) return;

        const init = async () => {
            await navigator.serviceWorker?.register('/worker.js', { scope: '/' });

            navigator.permissions
                .query({ name: 'notifications' })
                .then((status) => (status.onchange = () => addPushSubscription()));
        };

        init();
    }, [isActiveTab]);
};
