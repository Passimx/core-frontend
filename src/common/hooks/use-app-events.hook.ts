import { EventsEnum } from '../types/events/events.enum.ts';
import { useAppAction } from '../store';
import { EventsType } from '../types/events/event-data.type.ts';
import { updateUser } from './functions/update-user.ts';
import { rawApp } from '../store/app/app.raw.ts';
import { deleteAccount } from './functions/delete-account.ts';
import { logIn } from './functions/log-in.ts';

export const useAppEvents = () => {
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
            case EventsEnum.UPDATE_USER:
                await updateUser(data);
                break;
            case EventsEnum.LOGOUT:
                await deleteAccount(data);
                break;
            case EventsEnum.SEND_ENCRYPTED_SEED_PHRASE:
                await logIn(data);
                break;
            case EventsEnum.SEND_MESSAGE:
            case EventsEnum.SEND_ASYNC_MESSAGE:
                rawApp.worker?.postMessage(dataEvent);
                break;
        }
    };
};
