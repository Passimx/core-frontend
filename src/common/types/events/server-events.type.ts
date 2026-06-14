import { EventsEnum } from './events.enum.ts';
import { UserStateType } from '../../store/user/types/state.type.ts';
import { SendMessageType } from './send-message.type.ts';

type Logout = {
    readonly event: EventsEnum.LOGOUT;
    readonly data: Partial<UserStateType>;
};

type SetStateUser = {
    readonly event: EventsEnum.SET_STATE_USER;
    readonly data: Partial<UserStateType> | null;
};

type Pong = {
    readonly event: EventsEnum.PONG;
    readonly data: unknown;
};

type UpdateUser = {
    readonly event: EventsEnum.UPDATE_USER;
    readonly data: Partial<UserStateType>;
};

type SendMessage = {
    readonly event: EventsEnum.SEND_MESSAGE;
    readonly data: SendMessageType;
};

export type ServerEventsType = Logout | SetStateUser | Pong | UpdateUser | SendMessage;
