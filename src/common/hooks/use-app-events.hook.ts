import { EventsEnum } from '../types/events/events.enum.ts';
import { useAppAction } from '../store';
import { EventsType } from '../types/events/event-data.type.ts';
import { useDeleteAccount } from './use-delete-account.hook.ts';

export const useAppEvents = () => {
    const deleteAccount = useDeleteAccount();
    const { setStateUser, setStateApp } = useAppAction();

    return async (dataEvent: EventsType) => {
        const { event, data } = dataEvent;

        switch (event) {
            case EventsEnum.SET_STATE_USER:
                setStateUser(data);
                break;
            case EventsEnum.SET_STATE_APP:
                setStateApp(data);
                break;
            case EventsEnum.LOGOUT:
                deleteAccount();
                break;
        }
    };
};
