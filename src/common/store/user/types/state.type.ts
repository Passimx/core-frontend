import { SessionType } from '../../../types/sessions/session.type.ts';

export type UserKeyType = {
    id: string;
    key: string;
    expiresAt: Date;
    createdAt: Date;
    status: string;
    serverCode: string;
    serverId: string;
    autoRenewEnabled: boolean;
    countTrafficLimit: number;
    countTrafficUsed: number;
};

export type BalanceAccountType = {
    rub: number;
    cny: number;
    ton: number;
    usd: number;
};

export type UserStateType = {
    id: string;
    updatedAt: number;
    aesKey: CryptoKey;
    encryptedRsaPrivateKey: string;
    encryptedToken: string;
    rsaPublicKey: CryptoKey;

    token: string;
    rsaPrivateKey: CryptoKey;

    balanceAccount: BalanceAccountType;
    keys: UserKeyType[];
    sessionId: string;
    sessions: SessionType[];
};
