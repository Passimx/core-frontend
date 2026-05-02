import { EventsEnum } from './events.enum.ts';
import { SettingsType } from '../../store/app/types/state.type.ts';

type ShowText = {
    readonly event: EventsEnum.SHOW_TEXT;
    readonly data: string;
};

type ChangeSettings = {
    readonly event: EventsEnum.UPDATE_SETTING;
    readonly data: Partial<SettingsType>;
};

export type LocalEvents = ShowText | ChangeSettings;
