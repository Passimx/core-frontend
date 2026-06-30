import { FC } from 'react';
import { PageTitle } from '../../components/page-title';
import { useTranslation } from 'react-i18next';
import styles from './index.module.css';
import { Card } from '../../components/card';
import { useAppSelector } from '../../store';

export const Notifications: FC = () => {
    const { t } = useTranslation();
    const allowNotifications = useAppSelector((state) => state.app.allowNotifications);

    const NotificationRequestPermission = () => {
        if (['default', 'prompt'].includes(allowNotifications!)) Notification.requestPermission();
    };

    return (
        <div className={styles.div0}>
            <PageTitle title={t('t79')} />
            <div className={styles.div1}>
                {allowNotifications !== 'granted' && (
                    <Card onClick={NotificationRequestPermission}>
                        <div className={styles.div2}>
                            <div className={styles.div3}>{t('t80')}</div>
                            <div>{t('t81')}</div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};
