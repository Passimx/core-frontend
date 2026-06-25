import { FC, memo } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '../../components/page-title';
import { useAppAction, useAppSelector } from '../../store';
import { Card } from '../../components/card';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { PeriodEnum } from '../../store/app/types/state.type.ts';
import { SessionItem } from '../../components/session-item';
import { LuFileDown, LuQrCode } from 'react-icons/lu';
import { MimetypeEnum } from '../../types/files/types.ts';
import { shareFile } from '../../components/qr-code/helper.ts';
import { ScanQrCode } from '../../components/scan-qr-code';

export const Devices: FC = memo(() => {
    const { t } = useTranslation();
    const { postMessageToBroadCastChannel, setStateApp } = useAppAction();
    const { sessions, id, autoTerminateSession, sessionId, seedPhrase } = useAppSelector((state) => state.user);

    const currentSession = sessions?.find((session) => session.id === sessionId);
    const otherSessions = sessions?.filter((session) => session.id !== sessionId);

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

    const terminateAllSessions = () => {
        if (!otherSessions?.length) return;

        postMessageToBroadCastChannel({
            event: EventsEnum.SEND_MESSAGE,
            data: { event: EventsEnum.LOGOUT, data: otherSessions },
        });
    };

    const downloadKey = () => {
        if (!seedPhrase || !id) return;
        const blob = new Blob([JSON.stringify({ id, seedPhrase })], { type: 'text/plain' });
        shareFile({ originalName: `${id}`, mimeType: MimetypeEnum.TXT }, blob);
    };

    return (
        <div className={styles.background}>
            <PageTitle title={t('t31')} />
            <div className={styles.div11} onClick={() => setStateApp({ foreground: <ScanQrCode /> })}>
                <div className={styles.div12}>
                    <LuQrCode className={styles.div13} />
                    <div>{t('t46')}</div>
                </div>
            </div>
            <div className={styles.div1}>
                <div className={styles.div2}>{t('t36')}</div>
                <Card className={styles.div20}>
                    <div className={styles.div01}>
                        <div className={styles.div011}>
                            <SessionItem session={currentSession} />
                        </div>
                        {!!otherSessions?.length && (
                            <div className={styles.div1} onClick={terminateAllSessions}>
                                {t('t38')}
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            <div className={styles.div1}>
                <div className={styles.div2}>{t('t39')}</div>
                <Card className={styles.div3} onClick={downloadKey}>
                    <div className={styles.div4}>{t('t40')}</div>
                    <div className={styles.div5}>
                        <LuFileDown className={styles.div6} />
                    </div>
                </Card>
            </div>

            {!!otherSessions?.length && (
                <div className={styles.div1}>
                    <div className={styles.div2}>{t('t37')}</div>
                    <Card className={styles.div20}>
                        <div className={styles.div22}>
                            {otherSessions?.map((session) => (
                                <div key={session.id} className={styles.div23}>
                                    <SessionItem session={session} />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

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
