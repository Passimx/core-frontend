import { EventsEnum } from './events.enum.ts';
import { UserStateType } from '../../store/user/types/state.type.ts';

type GetConnectionRsaPublicKeyString = {
    event: EventsEnum.GET_CONNECTION_RSA_PUBLIC_KEY_STRING;
    data: string;
};

type Login = {
    event: EventsEnum.LOGIN;
    data: Partial<UserStateType>;
};

export type SendAsyncMessageType = GetConnectionRsaPublicKeyString | Login;
