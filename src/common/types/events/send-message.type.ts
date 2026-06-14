import { EventsEnum } from './events.enum.ts';
import { UserStateType } from '../../store/user/types/state.type.ts';
import { SessionType } from '../sessions/session.type.ts';

type Logout = {
    event: EventsEnum.LOGOUT;
    data: Partial<SessionType>;
};

type UpdateUser = {
    event: EventsEnum.UPDATE_USER;
    data: Partial<UserStateType>;
};

export type SendMessageType = Logout | UpdateUser;
