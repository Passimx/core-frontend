import { EventsEnum } from '../../types/events/events.enum.ts';
import { notificationPromise } from './promise.ts';
import { UserStateType } from '../../store/user/types/state.type.ts';
import { SessionType } from '../../types/sessions/session.type.ts';

export const getConnectionKeyWs = (data: string) => {
    return notificationPromise<string>({
        event: EventsEnum.GET_CONNECTION_RSA_PUBLIC_KEY_STRING,
        data,
    });
};

export const loginWs = (data: Partial<UserStateType & SessionType>) => {
    return notificationPromise<Partial<UserStateType>>({
        event: EventsEnum.LOGIN,
        data,
    });
};
