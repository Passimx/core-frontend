import { useAppAction, useAppSelector } from '../store';
import { useEffect } from 'react';

export const useOnline = () => {
    const { setStateApp } = useAppAction();
    const isActiveTab = useAppSelector((state) => state.app.isActiveTab);

    useEffect(() => {
        if (!isActiveTab) return;

        const updateOnlineStatus = () => {
            setStateApp({ isOnline: navigator.onLine });
        };

        updateOnlineStatus();

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, [isActiveTab]);
};
