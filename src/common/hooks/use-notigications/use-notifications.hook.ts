import { useEffect } from 'react';
import { useAppAction, useAppSelector } from '../../store';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { rawApp } from '../../store/app/app.raw.ts';

export const useNotifications = () => {
    const { setStateApp } = useAppAction();

    const { isActiveTab, accounts } = useAppSelector((state) => state.app);

    useEffect(() => {
        if (!isActiveTab || !accounts?.length) {
            rawApp.worker?.terminate();
            rawApp.worker = undefined;
            setStateApp({ isListenNotifications: false });
        } else if (!rawApp.worker) {
            const tokens = accounts?.map((account) => account.token);

            rawApp.worker = new Worker(new URL('../../api/notifications/index.ts', import.meta.url), {
                type: 'module',
            });

            rawApp.worker.postMessage({
                event: EventsEnum.CONNECT_NOTIFICATIONS,
                data: tokens,
            });
        }

        return () => {
            rawApp.worker?.terminate();
            rawApp.worker = undefined;
        };
    }, [isActiveTab, accounts?.length]);
};
