export type SessionType = {
    id: string;
    encryptionUserAgent: string;
    userAgent: string;
    isOnline: boolean;
    userId: string;
    lang: string;
    pushSubscriptionPayload: PushSubscriptionJSON;
    updatedAt: Date;
    createdAt: Date;
};
