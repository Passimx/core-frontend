export type CreatePassimXAccountRequest = {
    rsaPublicKey: string;
    encryptedRsaPrivateKey: string;
    encryptionUserAgent: string;
    seedPhraseHash: string;
    pushSubscriptionPayload?: PushSubscriptionJSON;
    lang?: string;
};
