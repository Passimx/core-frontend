import { useEffect } from 'react';
import { useAppSelector } from '../store';

export const useRegisterServiceWorkerWorker = () => {
    const isActiveTab = useAppSelector((state) => state.app.isActiveTab);

    useEffect(() => {
        if (!isActiveTab) return;

        navigator.serviceWorker?.register('/worker.js', { scope: '/' });
    }, [isActiveTab]);
};
