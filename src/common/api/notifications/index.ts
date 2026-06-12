import { EventsType } from '../../types/events/event-data.type.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { Envs } from '../../config/envs/envs.ts';
import { ServerEventsType } from '../../types/events/server-events.type.ts';

let token: string | undefined;
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

    ws.send(JSON.stringify({ event: 'ping', data: Date.now() }));
    clearTimeout(pongTimeoutTimer);
    pongTimeoutTimer = setTimeout(() => {
        console.warn('[WS Worker] Pong timeout expiration. Closing...');
        ws?.close();
    }, Envs.waitPong);
}

async function connect() {
    if (!token?.length || ws) return;

    ws = new WebSocket(`${Envs.notificationsUrl}?token=${token}`);

    ws.onopen = () => {
        postMessageToBroadCastChannel({ event: EventsEnum.SET_STATE_APP, data: { isListenNotifications: true } });
        reconnectDelay = 2000;
        clearTimeout(reconnectTimer);
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
        } catch (error) {
            console.error('[WS Worker] Critical payload parse error:', error);
        }
    };

    ws.onclose = () => {
        ws = null;
        clearAllTimeouts();

        postMessageToBroadCastChannel({ event: EventsEnum.SET_STATE_APP, data: { isListenNotifications: false } });

        if (navigator.onLine) {
            console.log(`[WS Worker] Reconnecting in ${reconnectDelay}ms...`);
            reconnectTimer = setTimeout(connect, reconnectDelay);
            reconnectDelay = Math.min(reconnectDelay * 2, MAX_RECONNECT_DELAY);
        }
    };

    ws.onerror = (error) => {
        console.error('[WS Worker] Socket error:', error);
    };
}

self.onmessage = async (dataEvent: MessageEvent<EventsType>) => {
    const event = dataEvent.data?.event;

    switch (event) {
        case EventsEnum.CONNECT_NOTIFICATIONS:
            const newToken = dataEvent?.data?.data?.token;

            if (token !== newToken && ws) {
                token = newToken;
                ws.close();
            } else {
                token = newToken;
                await connect();
            }
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
