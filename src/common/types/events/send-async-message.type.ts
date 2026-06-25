import { EventsEnum } from './events.enum.ts';
import { UserStateType } from '../../store/user/types/state.type.ts';
import { CreatePassimXAccountRequest } from '../api/user.ts';

type GetConnectionRsaPublicKeyString = {
    event: EventsEnum.GET_CONNECTION_RSA_PUBLIC_KEY_STRING;
    data: string;
};

type Login = {
    event: EventsEnum.LOGIN;
    data: Partial<UserStateType>;
};

type CreateUser = {
    event: EventsEnum.CREATE_USER;
    data: CreatePassimXAccountRequest;
};

export type SendAsyncMessageType = GetConnectionRsaPublicKeyString | Login | CreateUser;
