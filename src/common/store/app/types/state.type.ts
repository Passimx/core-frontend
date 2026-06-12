import { JSX } from 'react';
import { CurrencyPrice } from '../../../types/api/currency-price.ts';
import { UserStateType } from '../../user/types/state.type.ts';

export type SettingsType = {
    lang: string;
    currency: string;
    currencyPrice: CurrencyPrice;
};

export enum TabEnum {
    MAIN = 'main',
}

export type AppStateType = {
    isOnline: boolean;
    isPhone: boolean;
    isStandalone: boolean;
    isIos: boolean;

    isLoadedFromIndexDb: boolean;
    isActiveTab: boolean;
    isListenNotifications: boolean;

    activeTab: TabEnum;
    pages: Map<TabEnum, JSX.Element[]>;
    foreground?: JSX.Element;

    settings: Partial<SettingsType>;
    activeAccount: string;
    accounts: Partial<UserStateType>[];
};
