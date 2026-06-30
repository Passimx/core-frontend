import { BalanceAccountType, UserKeyType } from '../../store/user/types/state.type.ts';

export type LoginRequest = {
    key: string;
};

export type UserResponse = {
    id: string;
    balanceAccount: BalanceAccountType;
    keys: UserKeyType[];
};

export type CreatePassimXAccountRequest = {
    rsaPublicKey: string;
    encryptedRsaPrivateKey: string;
    encryptionUserAgent: string;
    seedPhraseHash: string;
    pushSubscriptionPayload?: PushSubscriptionJSON;
    lang?: string;
};
