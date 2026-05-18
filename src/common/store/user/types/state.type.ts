export type UserKeyType = {
    id: string;
    key: string;
    expiresAt: Date;
    createdAt: Date;
    status: string;
    serverCode: string;
    serverId: string;
    autoRenewEnabled: boolean;
};

export type BalanceAccountType = {
    rub: number;
    cny: number;
    ton: number;
    tonUsdt: number;
};

export type UserStateType = {
    id: string;
    token: string;
    balanceAccount: BalanceAccountType;
    updatedAt: number;
    keys: UserKeyType[];
};
