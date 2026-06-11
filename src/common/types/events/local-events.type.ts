import { EventsEnum } from './events.enum.ts';
import { AppStateType } from '../../store/app/types/state.type.ts';

type ShowText = {
    readonly event: EventsEnum.SHOW_TEXT;
    readonly data: string;
};

type SetStateApp = {
    readonly event: EventsEnum.SET_STATE_APP;
    readonly data: Partial<AppStateType>;
};

export type LocalEvents = ShowText | SetStateApp;
