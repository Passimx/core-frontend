import json from '../../../../package.json';
import type { SettingsType } from '../../store/app/types/state.type.ts';

export enum EnvironmentEnum {
    STAGING = 'staging',
    PRODUCTION = 'production',
}

type EnvsType = {
    apiUrl: string;
    environment: EnvironmentEnum;
    settings?: Partial<SettingsType>;
    version: string;
};

export const Envs: EnvsType = {
    apiUrl: import.meta.env.VITE_API_URL,
    environment: import.meta.env.VITE_ENVIRONMENT,
    version: import.meta.env.VITE_APP_VERSION ?? json.version,
};
