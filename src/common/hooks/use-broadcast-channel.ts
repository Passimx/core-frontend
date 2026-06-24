import { useEffect } from 'react';
import { useAppEvents } from './use-app-events.hook.ts';

export const useBroadcastChannel = () => {
    const sendMessage = useAppEvents();

    /** App events */
    useEffect(() => {
        const channel = new BroadcastChannel('ws-channel');
        channel.onmessage = ({ data }: MessageEvent<any>) => sendMessage(data);

        return () => channel?.close();
    }, []);
};
