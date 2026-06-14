import { useEffect } from 'react';
import { AppStateType } from '../store/app/types/state.type.ts';
import { useAppAction, useAppSelector } from '../store';
import { UserStateType } from '../store/user/types/state.type.ts';
import { CryptoService } from '../services/crypto.service.ts';
import { resources } from './translations/use-translation.ts';

export const useLoadFromIndexDbHook = () => {
    const { setStateApp, setStateUser } = useAppAction();
    const { isLoadedFromIndexDb, isActiveTab } = useAppSelector((state) => state.app);

    const loadUser = async (userId: string): Promise<Partial<UserStateType> | null> =>
        new Promise((resolve) => {
            const openRequest = indexedDB?.open(userId, 1);
            openRequest.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains('session')) {
                    db.createObjectStore('session');
                }
            };

            openRequest.onerror = () => resolve(null);
            openRequest.onsuccess = () => {
                const db = openRequest.result;

                if (!db.objectStoreNames.contains('session')) {
                    resolve(null);
                    return;
                }

                try {
                    const transaction = db.transaction('session', 'readonly');
                    transaction.onerror = () => resolve(null);

                    const objectStore = transaction.objectStore('session');
                    const request = objectStore.get('user');

                    request.onerror = () => resolve(null);
                    request.onsuccess = async () => {
                        const data = request.result as Partial<UserStateType>;

                        if (!data) {
                            resolve(null);
                            return;
                        }

                        try {
                            const rsaPrivateKeyString = await CryptoService.decryptByAESKey(
                                data.aesKey!,
                                data.encryptedRsaPrivateKey!,
                            );
                            const rsaPrivateKey = await CryptoService.importRSAKey(rsaPrivateKeyString!, ['decrypt']);
                            const token = await CryptoService.decryptByAESKey(data.aesKey!, data.encryptedToken!);

                            resolve({ ...data, rsaPrivateKey, token });
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        } catch (cryptoError) {
                            resolve(null);
                        }
                    };
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (transactionError) {
                    resolve(null);
                }
            };
        });

    useEffect(() => {
        if (!isActiveTab) return;
        if (isLoadedFromIndexDb) return;

        const openRequest = indexedDB?.open('store', 1);

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
                const data = (request.result as Partial<AppStateType>) ?? {};

                if (!data?.settings) data.settings = {};

                if (!data?.settings?.lang) {
                    const browserLang = navigator.language.slice(0, 2).toLowerCase();
                    const languages: string[] = Object.keys(resources);
                    data.settings.lang = languages.find((lang) => lang === browserLang) ?? 'en';
                }

                const databases = await indexedDB.databases();

                const usersDataOrNull = await Promise.all(databases.map((database) => loadUser(database.name!)));
                const accounts = usersDataOrNull.filter((usersData) => !!usersData);
                const account = accounts.find((account) => account.id === data.activeAccount);

                if (!account) delete data.activeAccount;
                if (account) setStateUser(account);

                setStateApp({ accounts });
                setStateApp({ ...data, isLoadedFromIndexDb: true });
            };
        };

        openRequest.onerror = () => {
            console.error('Failed to open IndexedDB:', openRequest.error);
        };
    }, [isLoadedFromIndexDb, isActiveTab]);
};
