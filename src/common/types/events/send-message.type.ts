import { EventsEnum } from './events.enum.ts';
import { UserStateType } from '../../store/user/types/state.type.ts';
import { SessionType } from '../sessions/session.type.ts';
import { SendMessageToConnectionType } from './send-message-to-connection.type.ts';

type Logout = {
    event: EventsEnum.LOGOUT;
    data: Partial<SessionType>[];
};

type Login = {
    event: EventsEnum.LOGIN;
    data: Partial<UserStateType>;
};

type UpdateUser = {
    event: EventsEnum.UPDATE_USER;
    data: Partial<UserStateType>;
};

type SendMessageToConnection = {
    event: EventsEnum.SEND_MESSAGE_TO_CONNECTION;
    connectionId: string;
    data: SendMessageToConnectionType;
};

export type SendMessageType = Logout | UpdateUser | SendMessageToConnection | Login;
