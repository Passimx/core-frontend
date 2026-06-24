import { FC } from 'react';
import { PropsType } from './types/props.type.ts';
import { SessionPage } from '../session-page';
import { useAppAction } from '../../store';
import styles from './index.module.css';
import { DeviceIcon } from '../device-icon';
import { getDeviceName } from '../../hooks/functions/get-device-name.ts';
import { useTranslation } from 'react-i18next';
import moment from 'moment/min/moment-with-locales';

export const SessionItem: FC<PropsType> = ({ session }) => {
    const { t } = useTranslation();
    const { setStateApp } = useAppAction();

    if (session)
        return (
            <div className={styles.div1} onClick={() => setStateApp({ foreground: <SessionPage session={session} /> })}>
                <div className={styles.div4}>
                    <DeviceIcon userAgent={session.userAgent} className={styles.div2} />
                </div>
                <div className={styles.div3}>
                    <div>{getDeviceName(session.userAgent)}</div>
                    <div className={styles.div33}>
                        <div>{t('created_at')}</div>
                        <div className={styles.div333}>{moment(session.createdAt).calendar()}</div>
                    </div>
                </div>
                <div>
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
        );
};
