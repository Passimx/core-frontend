import { JSX } from 'react';
import { CurrencyPrice } from '../../../types/api/currency-price.ts';

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

    activeTab: TabEnum;
    pages: Map<TabEnum, JSX.Element[]>;
    isActiveTab?: boolean;
    foreground?: JSX.Element;

    settings: Partial<SettingsType>;
    activeAccount: string;
};
