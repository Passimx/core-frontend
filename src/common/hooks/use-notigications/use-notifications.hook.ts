import { useEffect } from 'react';
import { useAppAction, useAppSelector } from '../../store';
import { EventsEnum } from '../../types/events/events.enum.ts';

let worker: Worker | undefined;

export const useNotifications = () => {
    const { setStateApp } = useAppAction();

    const { isActiveTab } = useAppSelector((state) => state.app);
    const { token } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (!isActiveTab || !token) {
            worker?.terminate();
            worker = undefined;
            setStateApp({ isListenNotifications: false });
        } else if (!worker) {
            worker = new Worker(new URL('../../api/notifications/index.ts', import.meta.url), {
                type: 'module',
            });

            worker.postMessage({
                event: EventsEnum.CONNECT_NOTIFICATIONS,
                data: { token },
            });
        }
    }, [isActiveTab, token]);
};
