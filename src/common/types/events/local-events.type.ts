import { EventsEnum } from './events.enum.ts';
import { AppStateType } from '../../store/app/types/state.type.ts';
import { UserStateType } from '../../store/user/types/state.type.ts';

type ShowText = {
    readonly event: EventsEnum.SHOW_TEXT;
    readonly data: string;
};

type SetStateApp = {
    readonly event: EventsEnum.SET_STATE_APP;
    readonly data: Partial<AppStateType>;
};

type ConnectNotification = {
    readonly event: EventsEnum.CONNECT_NOTIFICATIONS;
    readonly data: Partial<UserStateType>;
};

export type LocalEvents = ShowText | SetStateApp | ConnectNotification;
