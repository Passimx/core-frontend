import { useEffect } from 'react';
import { useAppAction, useAppSelector } from '../../store';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { rawApp } from '../../store/app/app.raw.ts';
import { CryptoService } from '../../services/crypto.service.ts';

export const useNotifications = () => {
    const { setStateApp } = useAppAction();
    const { isActiveTab, accounts, connectionId } = useAppSelector((state) => state.app);

    const start = async () => {
        if (!isActiveTab) {
            rawApp.worker?.terminate();
            rawApp.worker = undefined;
            setStateApp({ connectionId: undefined, connectionRsaPrivateKey: undefined });

            return;
        }

        if (!rawApp.worker) {
            rawApp.worker = new Worker(new URL('../../api/notifications/index.ts', import.meta.url), {
                type: 'module',
            });
        }

        const tokens = accounts?.map((account) => account.token);

        if (connectionId) {
            if (tokens?.length) {
                rawApp.worker.postMessage({
                    event: EventsEnum.SEND_MESSAGE,
                    data: { event: EventsEnum.VERIFY, data: tokens },
                });
            }

            const keys = await CryptoService.generateRSAKeys();
            const publicKeyString = await CryptoService.exportKey(keys.publicKey);

            rawApp.worker.postMessage({
                event: EventsEnum.SEND_MESSAGE,
                data: {
                    event: EventsEnum.SET_CONNECTION_RSA_PUBLIC_KEY_STRING,
                    data: publicKeyString,
                },
            });
            setStateApp({ connectionRsaPrivateKey: keys.privateKey });
        }
    };

    useEffect(() => {
        start();
    }, [isActiveTab, accounts?.length, connectionId]);
};
