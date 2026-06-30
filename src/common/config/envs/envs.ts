import json from '../../../../package.json';

export enum EnvironmentEnum {
    STAGING = 'staging',
    PRODUCTION = 'production',
}

type EnvsType = {
    waitPong: number;
    intervalPing: number;

    apiUrl: string;
    notificationsUrl: string;
    environment: EnvironmentEnum;
    version: string;
    appSalt: string;
    publicVapidKey: string;
};

export const Envs: EnvsType = {
    waitPong: 4 * 1000,
    intervalPing: 4 * 1000,

    apiUrl: import.meta.env.VITE_API_URL,
    notificationsUrl: import.meta.env.VITE_NOTIFICATIONS_URL,
    environment: import.meta.env.VITE_ENVIRONMENT,
    publicVapidKey: import.meta.env.VITE_PUBLIC_VAPID_KEY,
    version: import.meta.env.VITE_APP_VERSION ?? json.version,
    appSalt: 'sha256',
};
