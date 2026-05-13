import { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { Props } from './types/props.type.ts';
import { extendKey, getTariffs } from '../../../../api/tariffs';
import { TariffsResponse } from '../../../../types/api/tariffs.ts';
import { Card } from '../../../../components/card';
import { convert, formatNumber } from '../../../wallet/helper.ts';
import { useAppAction, useAppSelector } from '../../../../store';
import { useTranslation } from 'react-i18next';
import { RotateLoading } from '../../../../components/rotate-loading';
import { EventsEnum } from '../../../../types/events/events.enum.ts';
import { useScrollPage } from '../../../../hooks/use-scroll-page.hook.ts';

export const Extending: FC<Props> = ({ kind, keyId }) => {
    const { t } = useTranslation();
    const { postMessageToBroadCastChannel, setStateUser } = useAppAction();
    const [tariffs, setTariffs] = useState<TariffsResponse[]>([]);
    const scrollPage = useScrollPage();
    const currencyPrice = useAppSelector((state) => state.app.settings?.currencyPrice)!;
    const keys = useAppSelector((state) => state.user.keys)!;

    useEffect(() => {
        const updateTariffs = async () => {
            const response = await getTariffs({ kind });
            if (response.success) {
                setTariffs(response.data);
            }
        };

        updateTariffs();
    }, [kind]);

    const onPay = async (tariffId: string) => {
        const result = await extendKey({ keyId, tariffId });

        if (result.success) {
            const updatedKeys = keys.map((key) => (key.id === result.data.id ? result.data : key));
            setStateUser({ keys: updatedKeys });
        } else postMessageToBroadCastChannel({ event: EventsEnum.SHOW_TEXT, data: result.data });

        scrollPage();
    };

    return (
        <div className={styles.background}>
            {tariffs?.length ? (
                tariffs?.map(({ id, price, expirationDays }) => (
                    <div key={id}>
                        <Card onClick={() => onPay(id)}>
                            <div className={styles.div1}>
                                <div>
                                    {expirationDays}&nbsp;{t('days')}
                                </div>
                                <div></div>
                                <div className={styles.div2}>
                                    {formatNumber(convert(price, 'rub', t('t11'), currencyPrice), t('t10'))}
                                </div>
                            </div>
                        </Card>
                    </div>
                ))
            ) : (
                <RotateLoading />
            )}
        </div>
    );
};
