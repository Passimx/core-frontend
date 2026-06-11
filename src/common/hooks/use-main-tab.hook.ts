import { useEffect, useRef } from 'react';
import { rawApp } from '../store/app/app.raw';
import { TabsEnum } from '../types/events/tabs.enum.ts';
import { useAppAction, useAppSelector } from '../store';
import { EventsEnum } from '../types/events/events.enum.ts';

export const useMainTab = () => {
    const { setStateApp, postMessageToBroadCastChannel } = useAppAction();
    const app = useAppSelector((state) => state.app);

    const appRef = useRef(app);
    useEffect(() => {
        appRef.current = app;
    }, [app]);

    useEffect(() => {
        const channel = new BroadcastChannel('ws-channel');
        const instanceId = Date.now() + Math.random();
        let electionTimeout: NodeJS.Timeout | undefined = undefined;

        rawApp.tabs = [instanceId];

        const updateMainTabStatus = () => {
            const isCurrentMain = rawApp.tabs[0] === instanceId;

            if (isCurrentMain === rawApp.isMainTab) return;

            rawApp.isMainTab = isCurrentMain;
            setStateApp({ isActiveTab: isCurrentMain });
        };

        channel.onmessage = ({ data }: MessageEvent<any>) => {
            switch (data.event) {
                case TabsEnum.CREATE_TAB:
                    rawApp.tabs = Array.from(new Set([...rawApp.tabs, data.data])).sort((a, b) => a - b);

                    if (rawApp.tabs[0] === instanceId) {
                        channel.postMessage({ event: TabsEnum.SYNC_TAB, data: rawApp.tabs });

                        postMessageToBroadCastChannel({
                            event: EventsEnum.SET_STATE_APP,
                            data: { settings: appRef.current.settings, activeAccount: appRef.current.activeAccount },
                        });
                    }
                    break;

                case TabsEnum.SYNC_TAB:
                    clearTimeout(electionTimeout);
                    rawApp.tabs = Array.from(new Set([...rawApp.tabs, ...data.data])).sort((a, b) => a - b);
                    updateMainTabStatus();
                    break;

                case TabsEnum.DELETE_TAB:
                    rawApp.tabs = rawApp.tabs.filter((id) => id !== data.data);
                    updateMainTabStatus();
                    break;
            }
        };

        channel.postMessage({ event: TabsEnum.CREATE_TAB, data: instanceId });

        electionTimeout = setTimeout(() => {
            updateMainTabStatus();
        }, 60);

        const handleUnload = () => {
            clearTimeout(electionTimeout);
            channel.postMessage({ event: TabsEnum.DELETE_TAB, data: instanceId });
            channel.close();
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleUnload);
            handleUnload();
        };
    }, [setStateApp, postMessageToBroadCastChannel]);
};
