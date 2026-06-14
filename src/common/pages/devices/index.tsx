import { FC, memo } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '../../components/page-title';
import { useAppAction, useAppSelector } from '../../store';
import moment from 'moment/min/moment-with-locales';
import { SessionPage } from '../../components/session-page';
import { DeviceIcon } from '../../components/device-icon';
import { getDeviceName } from '../../hooks/functions/get-device-name.ts';
import { Card } from '../../components/card';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { PeriodEnum } from '../../store/app/types/state.type.ts';

export const Devices: FC = memo(() => {
    const { t } = useTranslation();
    const { setStateApp } = useAppAction();
    const { postMessageToBroadCastChannel } = useAppAction();
    const { sessions, id, autoTerminateSession } = useAppSelector((state) => state.user);

    const changeAutoTerminateSession = () => {
        const values = Object.values(PeriodEnum);
        const currentIndex = values.findIndex((value) => value === autoTerminateSession);
        const index = (currentIndex + 1) % values.length;
        const currentValue = values[index];

        postMessageToBroadCastChannel({
            event: EventsEnum.SEND_MESSAGE,
            data: { event: EventsEnum.UPDATE_USER, data: { id, autoTerminateSession: currentValue } },
        });
    };

    return (
        <div className={styles.background}>
            <PageTitle title={t('t31')} />
            <div className={styles.settings_background}>
                {sessions?.map((session) => (
                    <div
                        key={session.id}
                        className={styles.item}
                        onClick={() => setStateApp({ foreground: <SessionPage session={session} /> })}
                    >
                        <DeviceIcon userAgent={session.userAgent} className={styles.item_logo} />
                        <div>{getDeviceName(session.userAgent)}</div>

                        <div className="text_translate">
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
                ))}
            </div>

            <div className={styles.div1}>
                <div className={styles.div2}>{t('t34')}</div>
                <Card className={styles.div3} onClick={changeAutoTerminateSession}>
                    <div className={styles.div4}>{t('t35')}</div>
                    <div className={styles.div5}>{t(autoTerminateSession ?? '')}</div>
                </Card>
            </div>
            <div></div>
        </div>
    );
});
