import { EventsEnum } from './events.enum.ts';

type Logout = {
    event: EventsEnum.LOGOUT;
    data: string;
};

export type SendMessageType = Logout;
