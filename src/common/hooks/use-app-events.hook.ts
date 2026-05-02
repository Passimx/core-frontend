import { EventsEnum } from '../types/events/events.enum.ts';
import { useAppAction } from '../store';
import { EventsType } from '../types/events/event-data.type.ts';

export const useAppEvents = () => {
    const { changeSettings, logout, setStateUser } = useAppAction();

    return async (dataEvent: EventsType) => {
        const { event, data } = dataEvent;

        switch (event) {
            case EventsEnum.UPDATE_SETTING:
                changeSettings(data);
                break;
            case EventsEnum.UPDATE_USER:
                setStateUser(data);
                break;
            case EventsEnum.LOGOUT:
                logout();
                break;
        }
    };
};
