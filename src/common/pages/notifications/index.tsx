import { FC } from 'react';
import { PageTitle } from '../../components/page-title';
import { useTranslation } from 'react-i18next';
import styles from './index.module.css';
import { Card } from '../../components/card';
import { useAppSelector } from '../../store';
import { setPushSubscriptionPayload } from '../../hooks/functions/set-push-subscription-payload.ts';

export const Notifications: FC = () => {
    const { t } = useTranslation();
    const { allowNotifications } = useAppSelector((state) => state.app);

    const handleNotificationClick = async () => {
        if (['default', 'prompt'].includes(allowNotifications!)) {
            await Notification.requestPermission();
            setPushSubscriptionPayload();
        }

        if (Notification.permission === 'granted') {
            new Notification('Заголовок уведомления', {
                body: 'Текст уведомления...',
                icon: 'https://png.pngtree.com/recommend-works/png-clipart/20250321/ourmid/pngtree-green-check-mark-icon-png-image_15808519.png',
                badge: 'https://png.pngtree.com/recommend-works/png-clipart/20250321/ourmid/pngtree-green-check-mark-icon-png-image_15808519.png',
            });
        }
    };

    // const handleNotificationClick = async () => {
    //
    //     // КРИТИЧНО ДЛЯ SAFARI №1: Сервис-воркер ДОЛЖЕН быть готов до любых действий
    //     const registration = rawApp.serviceWorkerRegistration;
    //     if (!registration) {
    //         console.error('Сервис-воркер не найден в rawApp');
    //         return;
    //     }
    //
    //     console.log(window.safari.pushNotification);
    //     console.log(registration.pushManager);
    //
    //     // Если воркер ещё активируется, дожидаемся его готовности через нативный API
    //     if (registration.active?.state !== 'activated') {
    //         await navigator.serviceWorker.ready;
    //     }
    //
    //     const pushManager = registration.pushManager;
    //     if (!pushManager) {
    //         console.error('PushManager не поддерживается данным браузером');
    //         return;
    //     }
    //
    //     // КРИТИЧНО ДЛЯ SAFARI №2: Запрос разрешения и подписка идут синхронным паровозом
    //     try {
    //         // Запрашиваем/проверяем окно (даже если уже granted, это подтверждает жест для Safari)
    //         const permission = await Notification.requestPermission();
    //         setStateApp({ allowNotifications: permission });
    //
    //         if (permission !== 'granted') {
    //             console.warn('Пользователь отклонил запрос на уведомления');
    //             return;
    //         }
    //
    //         console.log(1); // Лог 1 отобразится
    //
    //         // Вызываем подписку сразу же
    //         const subscription = await pushManager.subscribe({
    //             userVisibleOnly: true,
    //             applicationServerKey: urlBase64ToUint8Array(Envs.publicVapidKey),
    //         });
    //
    //         console.log(2); // Теперь Safari успешно дойдет до Лога 2!
    //         logger.info(subscription);
    //
    //         // Сохраняем payload в стор только после успешного завершения всей операции
    //         setStateApp({ pushSubscriptionPayload: subscription.toJSON() });
    //     } catch (error) {
    //         console.error('Ошибка в процессе подписки Safari:', error);
    //     }
    // };

    return (
        <div className={styles.div0}>
            <PageTitle title={t('t79')} />
            <div className={styles.div1}>
                {/* {(allowNotifications !== 'granted' || !pushSubscriptionPayload) && (*/}
                <Card onClick={handleNotificationClick}>
                    <div className={styles.div2}>
                        <div className={styles.div3}>{t('t80')}</div>
                        <div>{t('t81')}</div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
