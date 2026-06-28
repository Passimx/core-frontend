import { FC, useState } from 'react';
import styles from './index.module.css';
import { PageTitle } from '../../components/page-title';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/card';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { useAppAction } from '../../store';
import crypto from 'crypto';
import { Button } from '../../components/button';
import { login } from '../../api/auth';
import { CopyText } from '../../components/copy-text';

export const TelegramLogin: FC = () => {
    const { t } = useTranslation();
    const { postMessageToBroadCastChannel } = useAppAction();

    const [key, setKey] = useState<string>(
        crypto.createHash('sha256').update(window.crypto.randomUUID()).digest('hex'),
    );

    const confirm = async () => {
        const response = await login({ key });
        if (!response.success) {
            postMessageToBroadCastChannel({ event: EventsEnum.SHOW_TEXT, data: 'text5' });
            return setKey(crypto.createHash('sha256').update(window.crypto.randomUUID()).digest('hex'));
        }

        const data = response.data;
        postMessageToBroadCastChannel({
            event: EventsEnum.SET_STATE_USER,
            data: { token: data.token },
        });
    };

    const message = `/loginFromWeb=${key}`;

    return (
        <div className={styles.background}>
            <PageTitle title={t('telegram_login')} />
            <div className={styles.background1}>
                <Card>
                    {t('text1')}
                    <br />
                    <CopyText text={message} />
                    <br />
                    {t('text2')}
                    &nbsp;
                    {/*<Link href={Envs.telegram.botLink}>PassimX VPN</Link>*/}
                </Card>
                <Card>
                    {t('text3')}
                    <Button text={t('text4')} onClick={confirm} />
                </Card>
            </div>
        </div>
    );
};
