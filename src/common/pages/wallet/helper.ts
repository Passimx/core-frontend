import { CurrencyPrice } from '../../types/api/currency-price.ts';
import { BalanceAccountType } from '../../store/user/types/state.type.ts';

export function formatNumber(value: number, symdol?: string) {
    const result = value.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
    return `${result} ${symdol ?? ''}`;
}

export function convert(amount: number, from: string, to: string, rates: CurrencyPrice) {
    let result = 0;

    if (from === to) result = amount;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    else if (rates[from]?.[to]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        result = amount * rates[from][to];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
    } else if (rates[to]?.[from]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        result = amount / rates[to][from];
    } else if (from !== 'usd' && to !== 'usd') {
        const inUsd = convert(amount, from, 'usd', rates);
        result = convert(inUsd, 'usd', to, rates);
    }

    return Math.floor(result * 100) / 100;
}

export const getTotalBalance = (balance: BalanceAccountType, selectedCurrency: string, rates: CurrencyPrice) =>
    Object.entries(balance).reduce((sum, [key, value]) => {
        const currencyMap = {
            rub: 'rub',
            cny: 'cny',
            ton: 'the-open-network',
            tonUsdt: 'usd',
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const fromCurrency = currencyMap[key];
        const converted = convert(value, fromCurrency, selectedCurrency, rates);

        return Math.floor((sum + converted) * 100) / 100;
    }, 0);
