import { store } from '../../store';
import { AppActions } from '../../store/app/app.slice.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { SendAsyncMessageType } from '../../types/events/send-async-message.type.ts';

const channel = new BroadcastChannel('ws-channel');

export const notificationPromise = <D>(data: SendAsyncMessageType) =>
    new Promise<D | null>((resolve) => {
        const queryId = window.crypto.randomUUID();

        store.dispatch(
            AppActions.postMessageToBroadCastChannel({
                event: EventsEnum.SEND_ASYNC_MESSAGE,
                data,
                queryId,
            }),
        );

        channel.onmessage = ({ data }: MessageEvent<{ event: string; data: { queryId: string; data: D } }>) => {
            if (data.event !== EventsEnum.RESEND_ASYNC_MESSAGE || data.data.queryId !== queryId) return;
            resolve(data.data.data);
        };
    });
