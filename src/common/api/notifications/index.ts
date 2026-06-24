import { EventsType } from '../../types/events/event-data.type.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { Envs } from '../../config/envs/envs.ts';
import { ServerEventsType } from '../../types/events/server-events.type.ts';
import { logger } from '../../services/logger.service.ts';

let tokens: string[] | undefined;
let ws: WebSocket | null = null;

let pingIntervalTimer: NodeJS.Timeout | undefined;
let pongTimeoutTimer: NodeJS.Timeout | undefined;
let reconnectTimer: NodeJS.Timeout | undefined;

let reconnectDelay = 2000;
const MAX_RECONNECT_DELAY = 30000;

const channel = new BroadcastChannel('ws-channel');
const postMessageToBroadCastChannel = (payload: EventsType) => {
    channel.postMessage(payload);
};

function clearAllTimeouts() {
    clearTimeout(pingIntervalTimer);
    clearTimeout(pongTimeoutTimer);
    clearTimeout(reconnectTimer);
}

function sendPing() {
    if (!ws || ws.readyState !== WebSocket.OPEN) return;

    ws.send(JSON.stringify({ event: 'ping' }));
    clearTimeout(pongTimeoutTimer);
    pongTimeoutTimer = setTimeout(() => {
        logger.error('[WS Worker] Pong timeout expiration. Closing...');
        ws?.close();
    }, Envs.waitPong);
}

async function connect() {
    if (ws) return;

    ws = new WebSocket(`${Envs.notificationsUrl}`);

    ws.onopen = () => {
        reconnectDelay = 2000;
        clearTimeout(reconnectTimer);
        postMessageToBroadCastChannel({
            event: EventsEnum.SET_STATE_APP,
            data: { connectionId: undefined, connectionRsaPrivateKey: undefined },
        });
    };

    ws.onmessage = (event: MessageEvent<string>) => {
        try {
            const payload = JSON.parse(event.data) as ServerEventsType;

            if (payload.event === EventsEnum.PONG) {
                clearTimeout(pongTimeoutTimer);
                clearTimeout(pingIntervalTimer);
                pingIntervalTimer = setTimeout(sendPing, Envs.intervalPing);
                return;
            }

            postMessageToBroadCastChannel(payload);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            logger.error('[WS Worker] Pong timeout expiration. Closing...');
        }
    };

    ws.onclose = () => {
        ws = null;
        clearAllTimeouts();

        postMessageToBroadCastChannel({
            event: EventsEnum.SET_STATE_APP,
            data: { connectionId: undefined, connectionRsaPrivateKey: undefined },
        });

        if (navigator.onLine) {
            reconnectTimer = setTimeout(connect, reconnectDelay);
            reconnectDelay = Math.min(reconnectDelay * 2, MAX_RECONNECT_DELAY);
        }
    };

    ws.onerror = (error) => {
        console.error('[WS Worker] Socket error:', error);
    };
}

connect();

self.onmessage = async (dataEvent: MessageEvent<EventsType>) => {
    const event = dataEvent.data?.event;

    switch (event) {
        case EventsEnum.SEND_MESSAGE:
        case EventsEnum.SEND_ASYNC_MESSAGE:
            ws?.send(JSON.stringify({ event, data: dataEvent?.data }));
            break;
        case EventsEnum.VERIFY:
            const newTokens = dataEvent?.data?.data;

            if (tokens?.join('') === newTokens?.join('') && ws) return;
            tokens = newTokens;

            connect();
            ws?.send(JSON.stringify({ event: EventsEnum.SEND_MESSAGE, data: dataEvent?.data }));
            break;
    }
};

self.addEventListener('online', () => {
    reconnectDelay = 2000;
    if (!ws) connect();
});

self.addEventListener('offline', () => {
    clearAllTimeouts();
    if (ws) {
        ws.close();
    }
});
