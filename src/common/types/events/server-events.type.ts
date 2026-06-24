import { EventsEnum } from './events.enum.ts';
import { UserStateType } from '../../store/user/types/state.type.ts';
import { SendMessageType } from './send-message.type.ts';
import { SendAsyncMessageType } from './send-async-message.type.ts';

type Logout = {
    readonly event: EventsEnum.LOGOUT;
    readonly data: Partial<UserStateType>;
};

type LOGIN = {
    readonly event: EventsEnum.LOGIN;
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

type SendAsyncMessage = {
    readonly event: EventsEnum.SEND_ASYNC_MESSAGE;
    readonly data: SendAsyncMessageType;
    readonly queryId?: string;
};

type SendEncryptedSeedPhrase = {
    readonly event: EventsEnum.SEND_ENCRYPTED_SEED_PHRASE;
    readonly data: Partial<UserStateType>;
};

type Verify = {
    event: EventsEnum.VERIFY;
    data: string[];
};

export type ServerEventsType =
    | Logout
    | SetStateUser
    | Pong
    | UpdateUser
    | SendMessage
    | Verify
    | SendAsyncMessage
    | SendEncryptedSeedPhrase
    | LOGIN;
