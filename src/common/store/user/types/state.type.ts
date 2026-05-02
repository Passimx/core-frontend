export type UserKeyType = {
    id: string;
    key: string;
    expiresAt: Date;
    createdAt: Date;
    status: string;
    serverCode: string;
};

export type UserStateType = {
    id: string;
    token: string;
    balance: number;
    updatedAt: number;
    keys: UserKeyType[];
};
