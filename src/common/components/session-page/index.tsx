import { FC } from 'react';
import styles from './index.module.css';
import { PropsType } from './types/props.ts';
import { Button } from '../button';
import { useAppAction } from '../../store';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { DeviceIcon } from '../device-icon';
import { getDeviceName } from '../../hooks/functions/get-device-name.ts';
import { useTranslation } from 'react-i18next';
import moment from 'moment/min/moment-with-locales';
import { PageTitle } from '../page-title';

export const SessionPage: FC<PropsType> = ({ session }) => {
    const { t } = useTranslation();
    const { postMessageToBroadCastChannel, setStateApp } = useAppAction();

    const logout = () => {
        postMessageToBroadCastChannel({
            event: EventsEnum.SEND_MESSAGE,
            data: { event: EventsEnum.LOGOUT, data: [{ id: session.id }] },
        });
        setStateApp({ foreground: undefined });
    };

    return (
        <div className={styles.div1}>
            <PageTitle title={t('t32')} />
            <div className={styles.div2}>
                <DeviceIcon userAgent={session.userAgent} className={styles.div3} />
            </div>
            <div className={styles.div11}>
                <div className={styles.div12}>{getDeviceName(session.userAgent)}</div>
                <div className={styles.div13}>
                    {session.isOnline
                        ? t('online')
                        : moment(session.updatedAt).calendar(null, {
                              sameDay: 'HH:mm',
                              lastDay: 'dd',
                              lastWeek: 'dd',
                              sameElse: 'DD.MM.YYYY',
                          })}
                </div>
            </div>
            <div className={styles.div11}>
                <div className={styles.div12}>{t('created_at')}</div>
                <div className={styles.div13}>{moment(session.createdAt).calendar()}</div>
            </div>
            <Button text={t('t33')} onClick={logout} className={styles.div20} />
        </div>
    );
};
