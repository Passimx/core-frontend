import { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { PropsType } from './types/props.type.ts';
import { createKey, getTariffs } from '../../../../api/tariffs';
import { TariffsResponse } from '../../../../types/api/tariffs.ts';
import { Card } from '../../../../components/card';
import { convert, formatNumber } from '../../../wallet/helper.ts';
import { useAppAction, useAppSelector } from '../../../../store';
import { useTranslation } from 'react-i18next';
import { RotateLoading } from '../../../../components/rotate-loading';
import { useScrollPage } from '../../../../hooks/use-scroll-page.hook.ts';
import { EventsEnum } from '../../../../types/events/events.enum.ts';

export const NewKey: FC<PropsType> = ({ kind }) => {
    const { t } = useTranslation();
    const [tariffs, setTariffs] = useState<TariffsResponse[]>([]);
    const { postMessageToBroadCastChannel, setStateUser } = useAppAction();
    const scrollPage = useScrollPage();
    const keys = useAppSelector((state) => state.user.keys)!;
    const currencyPrice = useAppSelector((state) => state.app.settings?.currencyPrice)!;

    useEffect(() => {
        const updateTariffs = async () => {
            const response = await getTariffs({ kind });
            if (response.success) setTariffs(response.data);
        };

        updateTariffs();
    }, [kind]);

    const onPay = async (tariffId: string) => {
        setTariffs([]);
        const result = await createKey({ tariffId });

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
                    <div key={id} className={styles.div0} onClick={() => onPay(id)}>
                        <Card>
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
