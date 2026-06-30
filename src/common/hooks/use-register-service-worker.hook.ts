import { useEffect } from 'react';
import { useAppSelector } from '../store';
import { rawApp } from '../store/app/app.raw.ts';

export const useRegisterServiceWorkerWorker = () => {
    const isActiveTab = useAppSelector((state) => state.app.isActiveTab);

    useEffect(() => {
        if (!isActiveTab) return;

        const setServiceWorker = async () => {
            rawApp.serviceWorkerRegistration = await navigator.serviceWorker?.register('/worker.js', { scope: '/' });
        };

        setServiceWorker();
    }, [isActiveTab]);
};
