import { FC, useState } from 'react';
import styles from './index.module.css';
import { PageTitle } from '../page-title';
import { useTranslation } from 'react-i18next';
import { Card } from '../card';
import { Button } from '../button';
import { RotateLoading } from '../rotate-loading';
import { useAppAction, useAppSelector } from '../../store';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { mnemonicNew } from 'ton-crypto';
import { CryptoService } from '../../services/crypto.service.ts';
import { UserStateType } from '../../store/user/types/state.type.ts';
import { createUser } from '../../api/notifications/methods.ts';

export const CreateAccountPage: FC = () => {
    const { t } = useTranslation();
    const { postMessageToBroadCastChannel } = useAppAction();
    const [loading, setLoading] = useState<boolean>(false);
    const accounts = useAppSelector((state) => state.app.accounts)!;
    const appState = useAppSelector((state) => state.app);

    const create = async () => {
        setLoading(true);
        const words = await mnemonicNew(24);
        const seedPhrase = words.join(' ');
        const seedPhraseHash = CryptoService.getHash(seedPhrase);

        const aesKey = await CryptoService.generateAESKey(seedPhrase, false);
        const rsaKeysPair = await CryptoService.generateRSAKeys();

        const rsaPublicKey = await CryptoService.exportKey(rsaKeysPair.publicKey);
        const privateKeyString = await CryptoService.exportKey(rsaKeysPair.privateKey);

        const encryptionUserAgent = (await CryptoService.encryptByAESKey(aesKey, navigator.userAgent))!;
        const encryptedRsaPrivateKey = (await CryptoService.encryptByAESKey(aesKey, privateKeyString))!;

        const response = await createUser({
            encryptedRsaPrivateKey,
            rsaPublicKey,
            encryptionUserAgent,
            seedPhraseHash,
            pushSubscriptionPayload: appState.settings?.pushSubscriptionPayload,
            lang: appState.settings?.lang,
        });

        if (!response) {
            setLoading(false);
            return postMessageToBroadCastChannel({ event: EventsEnum.SHOW_TEXT, data: EventsEnum.ERROR });
        }

        const encryptedToken = (await CryptoService.encryptByAESKey(aesKey, response.token))!;
        const encryptedSeedPhrase = (await CryptoService.encryptByAESKey(aesKey, seedPhrase))!;

        const account: Partial<UserStateType> = {
            ...response,
            aesKey,
            rsaPublicKey: rsaKeysPair.publicKey,
            rsaPrivateKey: rsaKeysPair.privateKey,
            seedPhrase,

            encryptedRsaPrivateKey,
            encryptedToken,
            encryptedSeedPhrase,
        };

        const newAccounts = [...accounts, account];

        postMessageToBroadCastChannel({
            event: EventsEnum.SET_STATE_APP,
            data: { activeAccount: response.id, accounts: newAccounts },
        });
        postMessageToBroadCastChannel({
            event: EventsEnum.SET_STATE_USER,
            data: account,
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
                        <br />
                        <div>{t('t49')}</div>
                    </Card>
                    <Button text={t('create_by_passimx')} className={styles.div2} onClick={create} />
                </div>
            )}
        </div>
    );
};
