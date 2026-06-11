import { useAppAction } from '../store';

export const useOnline = () => {
    const { setStateApp } = useAppAction();

    const updateOnlineStatus = () => {
        setStateApp({ isOnline: navigator.onLine });
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
};
