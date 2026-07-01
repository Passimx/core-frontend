import { FC } from 'react';
import { PageTitle } from '../../components/page-title';
import { useTranslation } from 'react-i18next';
import styles from './index.module.css';
import { Card } from '../../components/card';
import { addPushSubscription } from '../../hooks/functions/add-push-subscription.ts';
import { useAppAction, useAppSelector } from '../../store';
import { Checkbox } from '../../components/checkbox';
import { hidePushSubscription } from '../../hooks/functions/hide-push-subscription.ts';
import { RiErrorWarningFill } from 'react-icons/ri';

export const Notifications: FC = () => {
    const { t } = useTranslation();
    const { setStateApp } = useAppAction();
    const pushAllAccounts = useAppSelector((state) => state.app.settings?.pushAllAccounts);
    const notificationsSilent = useAppSelector((state) => state.app.settings?.notificationsSilent);
    const pushSubscriptionPayload = useAppSelector((state) => state.app.settings?.pushSubscriptionPayload);

    const handleNotificationClick = async () => {
        const permission = Notification?.permission;

        if (permission !== 'granted') await Notification.requestPermission();

        if (!pushSubscriptionPayload) addPushSubscription();
        else hidePushSubscription();
    };

    const onNotificationsSilent = () => {
        setStateApp({ settings: { notificationsSilent: !notificationsSilent } });
    };

    const onPushAllAccounts = () => {
        setStateApp({ settings: { pushAllAccounts: !pushAllAccounts } });
    };

    return (
        <div className={styles.div0}>
            <PageTitle title={t('t79')} />
            <div className={styles.div1}>
                {!pushSubscriptionPayload && (
                    <Card onClick={handleNotificationClick}>
                        <div className={styles.div2}>
                            <div className={styles.div3}>{t('t80')}</div>
                            <div>{t('t81')}</div>
                        </div>
                    </Card>
                )}
                {Notification.permission === 'denied' && (
                    <Card className={styles.div6}>
                        <div className={styles.div7}>
                            <RiErrorWarningFill className={styles.div5} />
                            <div>{t('t52')}</div>
                        </div>
                        <div>{t('t53')}</div>
                    </Card>
                )}
                <br />
                <Card className={styles.div4}>
                    <div>{t('t79')}</div>
                    <Checkbox checked={!!pushSubscriptionPayload} onChange={handleNotificationClick} />
                </Card>
                <br />
                <Card className={styles.div4}>
                    <div>{t('t51')}</div>
                    <Checkbox checked={!!pushAllAccounts} onChange={onPushAllAccounts} />
                </Card>
                <Card className={styles.div4}>
                    <div>{t('t50')}</div>
                    <Checkbox checked={!!notificationsSilent} onChange={onNotificationsSilent} />
                </Card>
            </div>
        </div>
    );
};
