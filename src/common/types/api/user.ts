import { BalanceAccountType, UserKeyType } from '../../store/user/types/state.type.ts';

export type LoginResponse = {
    token: string;
};

export type LoginRequest = {
    key: string;
};

export type UserResponse = {
    id: string;
    balanceAccount: BalanceAccountType;
    keys: UserKeyType[];
};

export type CreateAccountRequest = {
    languageCode: string;
};

export type CreatePassimXAccountRequest = {
    rsaPublicKey: string;
    encryptedRsaPrivateKey: string;
    languageCode: string;
    encryptionUserAgent: string;
};
