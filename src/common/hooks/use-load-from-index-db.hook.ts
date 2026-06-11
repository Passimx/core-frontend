import { useEffect } from 'react';
import { AppStateType } from '../store/app/types/state.type.ts';
import { useAppAction, useAppSelector } from '../store';
import { UserStateType } from '../store/user/types/state.type.ts';
import { CryptoService } from '../services/crypto.service.ts';
import { resources } from './translations/use-translation.ts';

export const useLoadFromIndexDbHook = () => {
    const { setStateApp, setStateUser } = useAppAction();
    const { isLoadedFromIndexDb, isActiveTab } = useAppSelector((state) => state.app);

    const loadUser = async (userId: string): Promise<boolean> =>
        new Promise((resolve) => {
            const openRequest = indexedDB?.open(userId, 1);

            openRequest.onerror = () => resolve(false);
            openRequest.onsuccess = () => {
                const db = openRequest.result;
                const transaction = db.transaction('session', 'readonly');
                const objectStore = transaction.objectStore('session');

                const request = objectStore.get('user');

                request.onerror = () => resolve(false);
                request.onsuccess = async () => {
                    const data = request.result as Partial<UserStateType>;

                    const rsaPrivateKeyString = await CryptoService.decryptByAESKey(
                        data.aesKey!,
                        data.encryptedRsaPrivateKey!,
                    )!;
                    const rsaPrivateKey = await CryptoService.importRSAKey(rsaPrivateKeyString!, ['decrypt']);
                    const token = await CryptoService.decryptByAESKey(data.aesKey!, data.encryptedToken!);

                    setStateUser({ ...data, rsaPrivateKey, token });
                    resolve(true);
                };
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
                    const lang = languages.find((lang) => lang === browserLang) ?? 'en';

                    data.settings.lang = lang;
                }

                if (data?.activeAccount) {
                    const result = await loadUser(data.activeAccount);
                    if (!result) delete data.activeAccount;
                }

                setStateApp({ ...data, isLoadedFromIndexDb: true });
            };
        };

        openRequest.onerror = () => {
            console.error('Failed to open IndexedDB:', openRequest.error);
        };
    }, [isLoadedFromIndexDb, isActiveTab]);
};
