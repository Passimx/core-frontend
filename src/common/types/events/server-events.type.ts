import { EventsEnum } from './events.enum.ts';
import { UserStateType } from '../../store/user/types/state.type.ts';

type Logout = {
    readonly event: EventsEnum.LOGOUT;
    readonly data?: unknown;
};

type UpdateUser = {
    readonly event: EventsEnum.SET_STATE_USER;
    readonly data: Partial<UserStateType>;
};

type Pong = {
    readonly event: EventsEnum.PONG;
    readonly data: unknown;
};

export type ServerEventsType = Logout | UpdateUser | Pong;
