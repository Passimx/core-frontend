import { EventsEnum } from './events.enum.ts';
import { UserStateType } from '../../store/user/types/state.type.ts';

type Logout = {
    readonly event: EventsEnum.LOGOUT;
    readonly data?: unknown;
};

type UpdateUser = {
    readonly event: EventsEnum.UPDATE_USER;
    readonly data: Partial<UserStateType>;
};

export type ServerEventsType = Logout | UpdateUser;
