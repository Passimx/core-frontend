import { store } from '../../store';
import { AppActions } from '../../store/app/app.slice.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { UserStateType } from '../../store/user/types/state.type.ts';
import { rawApp } from '../../store/app/app.raw.ts';

export const deleteAccount = async (payload: Partial<UserStateType>) => {
    const { accounts, activeAccount } = store.getState().app;

    const accountDeleted = accounts?.find(
        (account) =>
            account.token === payload.token || account.id === payload.id || account.sessionId === payload.sessionId,
    );
    const accountActive = accounts?.find((account) => account.id === activeAccount);
    if (!accountActive || !accountDeleted) return;
    const newAccountList = [...accounts!]?.filter((account) => account.token !== accountDeleted.token);

    if (rawApp.isMainTab) indexedDB.deleteDatabase(accountDeleted.id!);

    store.dispatch(
        AppActions.postMessageToBroadCastChannel({
            event: EventsEnum.SET_STATE_APP,
            data: { accounts: newAccountList },
        }),
    );

    if (newAccountList?.length === 0) {
        store.dispatch(
            AppActions.postMessageToBroadCastChannel({
                event: EventsEnum.SET_STATE_APP,
                data: { activeAccount: undefined },
            }),
        );
        store.dispatch(
            AppActions.postMessageToBroadCastChannel({
                event: EventsEnum.SET_STATE_USER,
                data: null,
            }),
        );

        return;
    }

    if (accountActive.token === accountDeleted.token) {
        const account = newAccountList[0];

        store.dispatch(
            AppActions.postMessageToBroadCastChannel({
                event: EventsEnum.SET_STATE_USER,
                data: account,
            }),
        );

        store.dispatch(
            AppActions.postMessageToBroadCastChannel({
                event: EventsEnum.SET_STATE_APP,
                data: { activeAccount: account.id },
            }),
        );
    }
};
