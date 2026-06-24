import { FC, useCallback, useState } from 'react';
import styles from './index.module.css';
import { IDetectedBarcode, Scanner, useDevices } from '@yudiel/react-qr-scanner';
import { useTranslation } from 'react-i18next';
import { useAppAction, useAppSelector } from '../../store';
import { ScanEventEnum } from './types/scan-event.enum.ts';
import { getConnectionKeyWs } from '../../api/notifications/methods.ts';
import { CryptoService } from '../../services/crypto.service.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';

export const ScanQrCode: FC = () => {
    const { t } = useTranslation();
    const devices = useDevices();
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const { setStateApp, postMessageToBroadCastChannel } = useAppAction();
    const { id, seedPhrase } = useAppSelector((state) => state.user);

    const onScan = useCallback(async ([{ rawValue }]: IDetectedBarcode[]) => {
        setIsPaused(true);
        setStateApp({ foreground: undefined });

        const destinationUrl = new URL(rawValue);
        const path = destinationUrl.pathname;
        const params = destinationUrl.searchParams;

        switch (path) {
            case ScanEventEnum.ADD_DEVICE:
                const connectionId = params.get('connectionId');
                if (!connectionId) return postMessageToBroadCastChannel({ event: EventsEnum.SHOW_TEXT, data: 'error' });

                const key = await getConnectionKeyWs(connectionId);
                if (!key) return postMessageToBroadCastChannel({ event: EventsEnum.SHOW_TEXT, data: 'error' });

                const rsaPublicKey = await CryptoService.importRSAKey(key, ['encrypt']);
                if (!rsaPublicKey) return postMessageToBroadCastChannel({ event: EventsEnum.SHOW_TEXT, data: 'error' });

                const encryptedSeedPhrase = await CryptoService.encryptByRSAKey(rsaPublicKey, seedPhrase);
                if (!encryptedSeedPhrase)
                    return postMessageToBroadCastChannel({ event: EventsEnum.SHOW_TEXT, data: 'error' });

                postMessageToBroadCastChannel({
                    event: EventsEnum.SEND_MESSAGE,
                    data: {
                        event: EventsEnum.SEND_MESSAGE_TO_CONNECTION,
                        connectionId,
                        data: { event: EventsEnum.SEND_ENCRYPTED_SEED_PHRASE, data: { id, encryptedSeedPhrase } },
                    },
                });

                break;
        }
    }, []);

    if (devices.length)
        return (
            <div className={styles.background}>
                <div className={styles.container}>
                    <Scanner
                        onScan={onScan}
                        paused={isPaused}
                        scanDelay={1000}
                        components={{ torch: true, zoom: true, finder: true }}
                        sound={false}
                        styles={{
                            container: { width: '100%' },
                            video: { width: '100%' },
                        }}
                    >
                        <div className={`${styles.qr_hint} ${styles.show} text_translate`}>{t('t76')}</div>
                    </Scanner>
                </div>
            </div>
        );
};
