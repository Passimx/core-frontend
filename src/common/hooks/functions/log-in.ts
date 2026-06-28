import { store } from '../../store';
import { AppActions } from '../../store/app/app.slice.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { UserStateType } from '../../store/user/types/state.type.ts';
import { CryptoService } from '../../services/crypto.service.ts';
import { loginWs } from '../../api/notifications/methods.ts';

export const logIn = async (payload: Partial<UserStateType>) => {
    const error = () =>
        store.dispatch(
            AppActions.postMessageToBroadCastChannel({
                event: EventsEnum.SHOW_TEXT,
                data: 'error',
            }),
        );

    const userId = payload.id;
    if (!(payload.encryptedSeedPhrase || payload.seedPhrase) || !userId) return error();

    const connectionRsaPrivateKey = store.getState().app.connectionRsaPrivateKey;
    if (!connectionRsaPrivateKey) return error();

    let seedPhrase = payload.seedPhrase;
    if (payload.encryptedSeedPhrase)
        seedPhrase = await CryptoService.decryptByRSAKey(connectionRsaPrivateKey, payload.encryptedSeedPhrase);

    if (!seedPhrase) return error();

    const seedPhraseHash = CryptoService.getHash(seedPhrase);
    const aesKey = await CryptoService.generateAESKey(seedPhrase);

    const encryptionUserAgent = (await CryptoService.encryptByAESKey(aesKey, navigator.userAgent))!;

    const response = await loginWs({ seedPhraseHash, id: userId, encryptionUserAgent });
    if (!response) return error();

    const rsaPublicKey = await CryptoService.importRSAKey(response.rsaPublicKey as unknown as string, ['encrypt']);
    if (!rsaPublicKey) return error();

    const rsaPrivateKeyString = await CryptoService.decryptByAESKey(aesKey, response.encryptedRsaPrivateKey!);
    if (!rsaPrivateKeyString) return error();

    const rsaPrivateKey = await CryptoService.importRSAKey(rsaPrivateKeyString, ['decrypt']);
    if (!rsaPrivateKey) return error();

    const encryptedToken = await CryptoService.encryptByAESKey(aesKey, response.token!);
    if (!encryptedToken) return error();

    const encryptedSeedPhrase = await CryptoService.encryptByAESKey(aesKey, seedPhrase);

    const accounts = store.getState().app.accounts ?? [];

    const account: Partial<UserStateType> = {
        ...response,
        aesKey,
        rsaPublicKey,
        rsaPrivateKey,
        seedPhrase,

        encryptedToken,
        encryptedSeedPhrase,
    };

    const newAccounts = [...accounts, account];

    store.dispatch(
        AppActions.postMessageToBroadCastChannel({
            event: EventsEnum.SET_STATE_APP,
            data: { activeAccount: payload.id, accounts: newAccounts },
        }),
    );

    store.dispatch(
        AppActions.postMessageToBroadCastChannel({
            event: EventsEnum.SET_STATE_USER,
            data: account,
        }),
    );
};
