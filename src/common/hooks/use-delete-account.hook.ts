import { EventsEnum } from '../types/events/events.enum.ts';
import { store, useAppAction } from '../store';

export const useDeleteAccount = () => {
    const { postMessageToBroadCastChannel } = useAppAction();

    return (id?: string) => {
        const { accounts, activeAccount } = store.getState().app;
        const userId = id ?? activeAccount!;
        const accountsCopy = [...accounts!]?.filter((account) => account.id !== userId);
        indexedDB.deleteDatabase(userId);

        if (accountsCopy?.length > 0) {
            const account = accountsCopy[0];
            postMessageToBroadCastChannel({
                event: EventsEnum.SET_STATE_APP,
                data: { accounts: accountsCopy, activeAccount: account.id },
            });
            postMessageToBroadCastChannel({ event: EventsEnum.SET_STATE_USER, data: account });
        } else {
            postMessageToBroadCastChannel({
                event: EventsEnum.SET_STATE_APP,
                data: { accounts: [], activeAccount: undefined },
            });
            postMessageToBroadCastChannel({ event: EventsEnum.SET_STATE_USER, data: null });
        }
    };
};
