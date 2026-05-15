export type getTariffsType = {
    kind: string;
};

export type TariffsResponse = {
    id: string;
    expirationDays: number;
    price: number;
    trafficLimit: number | null;
};

export type ExtendKeyBodyType = {
    keyId: string;
    tariffId: string;
};

export type CreateKeyBodyType = {
    tariffId: string;
};

export type DeleteKeyBodyType = {
    keyId: string;
};
