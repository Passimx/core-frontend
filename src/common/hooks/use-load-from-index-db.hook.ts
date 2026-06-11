import { useEffect } from 'react';
import { AppStateType } from '../store/app/types/state.type.ts';
import { useAppAction, useAppSelector } from '../store';
export const useLoadFromIndexDbHook = () => {
    const { setStateApp } = useAppAction();
    const { isLoadedFromIndexDb, isActiveTab } = useAppSelector((state) => state.app);

    useEffect(() => {
        if (!isActiveTab) return;
        if (isLoadedFromIndexDb) return;

        const openRequest = indexedDB?.open('store', 2);

        openRequest.onupgradeneeded = () => {
            const db = openRequest.result;
            if (!db.objectStoreNames.contains('data')) {
                db.createObjectStore('data');
            }
        };

        openRequest.onsuccess = () => {
            const db = openRequest.result;
            const transaction = db.transaction('data', 'readonly');
            const objectStore = transaction.objectStore('data');

            const request = objectStore.get('data');

            request.onsuccess = async () => {
                const data = request.result as Partial<AppStateType>;
                setStateApp({ ...data, isLoadedFromIndexDb: true });
            };
        };

        openRequest.onerror = () => {
            console.error('Failed to open IndexedDB:', openRequest.error);
        };
    }, [isLoadedFromIndexDb, isActiveTab]);
};
