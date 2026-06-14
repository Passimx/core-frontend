import { UserStateType } from '../../store/user/types/state.type.ts';
import { SessionType } from '../../types/sessions/session.type.ts';
import { store } from '../../store';
import { SessionFromServerType } from '../../types/sessions/session-from-server.type.ts';
import { CryptoService } from '../../services/crypto.service.ts';
import { AppActions } from '../../store/app/app.slice.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';

export const updateUser = async (payload: Partial<UserStateType>) => {
    const { accounts, activeAccount } = store.getState().app;
    let account = accounts?.find((user) => user.id === payload.id);

    if (payload?.sessions?.length) {
        const sessions: SessionType[] = [];

        if (account) {
            for (const session of payload.sessions as unknown as SessionFromServerType[]) {
                const { encryptionUserAgent, ...data } = session;
                const userAgent = (await CryptoService.decryptByRSAKey(account.rsaPrivateKey!, encryptionUserAgent))!;
                sessions.push({ ...data, userAgent });
            }

            payload.sessions = sessions;
            account = { ...account, sessions };
        }
    }

    const updated = accounts!.map((ac) => (ac.id === account?.id ? account! : ac));

    if (payload.id === activeAccount)
        store.dispatch(AppActions.postMessageToBroadCastChannel({ event: EventsEnum.SET_STATE_USER, data: payload }));

    store.dispatch(
        AppActions.postMessageToBroadCastChannel({ event: EventsEnum.SET_STATE_APP, data: { accounts: updated } }),
    );
};
