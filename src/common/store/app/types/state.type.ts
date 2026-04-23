export type SettingsType = {
    lang?: string;
};

export type StateType = {
    isOnline: boolean;
    isPhone?: boolean;
    isStandalone: boolean;
    isIos?: boolean;
    isActiveTab?: boolean;
    settings?: SettingsType;
};
