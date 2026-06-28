import json from '../../../../package.json';
import type { SettingsType } from '../../store/app/types/state.type.ts';

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
    settings?: Partial<SettingsType>;
    version: string;
    appSalt: string;
};

export const Envs: EnvsType = {
    waitPong: 4 * 1000,
    intervalPing: 4 * 1000,

    apiUrl: import.meta.env.VITE_API_URL,
    notificationsUrl: import.meta.env.VITE_NOTIFICATIONS_URL,
    environment: import.meta.env.VITE_ENVIRONMENT,
    version: import.meta.env.VITE_APP_VERSION ?? json.version,
    appSalt: 'sha256',
};
