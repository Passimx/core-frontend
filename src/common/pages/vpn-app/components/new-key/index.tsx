import { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { PropsType } from './types/props.type.ts';
import { getTariffs } from '../../../../api/tariffs';
import { TariffsResponse } from '../../../../types/api/tariffs.ts';
import { Card } from '../../../../components/card';
import { convert, formatNumber } from '../../../wallet/helper.ts';
import { useAppSelector } from '../../../../store';
import { useTranslation } from 'react-i18next';
import { RotateLoading } from '../../../../components/rotate-loading';

export const NewKey: FC<PropsType> = ({ kind }) => {
    const { t } = useTranslation();
    const [tariffs, setTariffs] = useState<TariffsResponse[]>([]);
    const currencyPrice = useAppSelector((state) => state.app.settings?.currencyPrice)!;

    useEffect(() => {
        const updateTariffs = async () => {
            const response = await getTariffs({ kind });
            if (response.success) setTariffs(response.data);
        };

        updateTariffs();
    }, [kind]);

    return (
        <div className={styles.background}>
            {tariffs?.length ? (
                tariffs?.map(({ id, price, expirationDays }) => (
                    <div key={id} className={styles.div0}>
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
