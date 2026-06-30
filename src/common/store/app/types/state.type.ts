import { JSX } from 'react';
import { CurrencyPrice } from '../../../types/api/currency-price.ts';
import { UserStateType } from '../../user/types/state.type.ts';

export enum TabEnum {
    MAIN = 'main',
}

// Если что-то будет меняться - не забудьте поменять хук useAutoTerminate
export enum PeriodEnum {
    NEVER = 'never',
    WEEK = 'week',
    MONTH = 'month',
    THREE_MONTH = 'three_month',
    SIX_MONTH = 'six_month',
}

export type SettingsType = {
    lang: string;
    currency: string;
    currencyPrice: CurrencyPrice;
};

export type IframeType = {
    url: string;
};

export type AppStateType = {
    isOnline: boolean;
    isPhone: boolean;
    isStandalone: boolean;
    isIos: boolean;

    isLoadedFromIndexDb: boolean;
    isActiveTab: boolean;

    connectionId: string;
    connectionRsaPrivateKey: CryptoKey;

    activeTab: TabEnum;
    pages: Map<TabEnum, JSX.Element[]>;
    foreground?: JSX.Element;
    iframes: IframeType[];

    settings: Partial<SettingsType>;
    activeAccount: string;
    accounts: Partial<UserStateType>[];

    allowNotifications: PermissionState | NotificationPermission;
    pushSubscriptionPayload: PushSubscriptionJSON;
};
