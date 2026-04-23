export type SettingsType = {
    lang?: string;
}

export type StateType = {
    isOnline: boolean;
    isActiveTab?: boolean;
    settings?: SettingsType;
};
