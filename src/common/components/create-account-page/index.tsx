import { FC, useState } from 'react';
import styles from './index.module.css';
import { PageTitle } from '../page-title';
import { useTranslation } from 'react-i18next';
import { Card } from '../card';
import { Button } from '../button';
import { RotateLoading } from '../rotate-loading';
import { createPassimXAccount } from '../../api/auth';
import { useAppAction, useAppSelector } from '../../store';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { mnemonicNew } from 'ton-crypto';
import { CryptoService } from '../../services/crypto.service.ts';

export const CreateAccountPage: FC = () => {
    const { t } = useTranslation();
    const { postMessageToBroadCastChannel } = useAppAction();
    const [loading, setLoading] = useState<boolean>(false);
    const lang = useAppSelector((state) => state.app.settings?.lang)!;

    const create = async () => {
        setLoading(true);
        const words = await mnemonicNew(24);
        const seedPhrase = words.join(' ');

        const aesKey = await CryptoService.generateAESKey(seedPhrase, false);
        const rsaKeysPair = await CryptoService.generateRSAKeys();

        const rsaPublicKey = await CryptoService.exportKey(rsaKeysPair.publicKey);
        const privateKeyString = await CryptoService.exportKey(rsaKeysPair.privateKey);

        const encryptionUserAgent = (await CryptoService.encryptByRSAKey(rsaKeysPair.publicKey, navigator.userAgent))!;
        const encryptedRsaPrivateKey = (await CryptoService.encryptByAESKey(aesKey, privateKeyString))!;

        const response = await createPassimXAccount({
            encryptedRsaPrivateKey,
            rsaPublicKey,
            encryptionUserAgent,
            languageCode: lang,
        });

        if (!response.success) {
            setLoading(false);
            return postMessageToBroadCastChannel({ event: EventsEnum.SHOW_TEXT, data: response.data });
        }

        const encryptedToken = await CryptoService.encryptByAESKey(aesKey, response.data.token);
        const id = CryptoService.getHash(rsaPublicKey);

        postMessageToBroadCastChannel({ event: EventsEnum.SET_STATE_APP, data: { activeAccount: id } });
        postMessageToBroadCastChannel({
            event: EventsEnum.SET_STATE_USER,
            data: {
                id,
                aesKey,
                token: response.data.token,
                rsaPublicKey: rsaKeysPair.publicKey,
                rsaPrivateKey: rsaKeysPair.privateKey,

                encryptedRsaPrivateKey,
                encryptedToken,
            },
        });
    };

    return (
        <div className={styles.background}>
            <PageTitle title={t('creation_account')} />
            {loading ? (
                <RotateLoading />
            ) : (
                <div className={styles.div1}>
                    <Card>
                        <div>{t('t26')}</div>
                    </Card>
                    <Card>
                        <Button text={t('create_by_passimx')} onClick={create} />
                    </Card>
                </div>
            )}
        </div>
    );
};
