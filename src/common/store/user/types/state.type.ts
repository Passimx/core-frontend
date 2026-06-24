import { SessionType } from '../../../types/sessions/session.type.ts';
import { PeriodEnum } from '../../app/types/state.type.ts';

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
    rsaPublicKey: CryptoKey;
    autoTerminateSession: PeriodEnum;

    encryptedRsaPrivateKey: string;
    encryptedToken: string;
    encryptedSeedPhrase: string;

    rsaPrivateKey: CryptoKey;
    token: string;
    seedPhraseHash: string;
    seedPhrase: string;

    balanceAccount: BalanceAccountType;
    keys: UserKeyType[];
    sessionId: string;
    sessions: Partial<SessionType>[];
};
