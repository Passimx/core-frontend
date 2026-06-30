import { EventsEnum } from '../../types/events/events.enum.ts';
import { notificationPromise } from './promise.ts';
import { UserStateType } from '../../store/user/types/state.type.ts';
import { SessionType } from '../../types/sessions/session.type.ts';
import { CreatePassimXAccountRequest } from '../../types/api/user.ts';
import { AppType } from '../../components/apps/types/app.type.ts';

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

export const createUser = (data: CreatePassimXAccountRequest) => {
    return notificationPromise<Partial<UserStateType>>({
        event: EventsEnum.CREATE_USER,
        data,
    });
};

export const getApps = () => {
    return notificationPromise<AppType[]>({
        event: EventsEnum.GET_APPS,
    });
};
