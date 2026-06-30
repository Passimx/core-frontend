import { AppStateType } from '../types/state.type.ts';

export const upsertAppIndexDb = (payload: Partial<AppStateType>) => {
    const openRequest = indexedDB?.open('store', 1);
    const copyPayload: Partial<AppStateType> = {
        activeAccount: payload.activeAccount,
        settings: payload.settings,
        pushSubscriptionPayload: payload.pushSubscriptionPayload,
    };

    openRequest.onupgradeneeded = () => {
        const db = openRequest.result;
        if (!db.objectStoreNames.contains('data')) {
            db.createObjectStore('data');
        }
    };

    openRequest.onsuccess = () => {
        const db = openRequest.result;
        const transaction = db.transaction('data', 'readwrite');
        const objectStore = transaction.objectStore('data');

        objectStore.put(copyPayload, 'data');

        transaction.onerror = (event) => {
            console.error('Transaction failed:', (event.target as IDBRequest).error);
        };
    };

    openRequest.onerror = () => {
        console.error('Failed to open IndexedDB:', openRequest.error);
    };
};
