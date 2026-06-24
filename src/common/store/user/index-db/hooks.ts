import { rawApp } from '../../app/app.raw.ts';
import rawChats from '../../raw/chats.raw.ts';
import { UserStateType } from '../types/state.type.ts';

export const upsertAccountIndexDb = (payload: Partial<UserStateType>) => {
    if (!rawApp.isMainTab) return;
    if (!payload || !payload.id) return;

    const requiredTables = ['session'];
    const plainPayload = { ...payload };

    delete plainPayload.rsaPrivateKey;
    delete plainPayload.token;
    delete plainPayload.seedPhrase;

    payload.sessions = payload.sessions?.map((session) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { userAgent, ...data } = session;

        return data;
    });

    const openRequest = indexedDB?.open(payload.id, 1);

    openRequest.onsuccess = () => {
        const IndexDb = openRequest.result;
        const request = IndexDb.transaction('session', 'readwrite');
        const sessionStore = request.objectStore('session');

        sessionStore.put(plainPayload, 'user');
    };

    openRequest.onupgradeneeded = () => {
        const db = openRequest.result;
        requiredTables.forEach((table) => {
            if (!db.objectStoreNames.contains(table)) db.createObjectStore(table);
        });
    };
};

export const deleteAccountIndexDb = (key: number) => {
    const IndexDb = rawChats.indexDb;
    if (!IndexDb) return; // только главная вкладка может делать операции с IndexDb
    if (!IndexDb || !rawApp.isMainTab) return; // только главная вкладка может делать операции с IndexDb

    const tx = IndexDb.transaction(['accounts'], 'readwrite');
    const accountsStore = tx.objectStore('accounts');

    accountsStore.delete(key);
};
