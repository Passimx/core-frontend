import { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '../../components/page-title';
import { Card } from '../../components/card';
import wechat from '../../../../public/assets/images/wechat.png';
import ton from '../../../../public/assets/images/ton.svg';
import sber from '../../../../public/assets/images/sber.png';
import tonkeeper from '../../../../public/assets/images/tonkeeper.png';
import mytonwallet from '../../../../public/assets/images/mytonwallet.png';
import tonhub from '../../../../public/assets/images/tonhub.png';
import Input from '../../components/input';
import { useAppAction, useAppSelector } from '../../store';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { convert, formatNumber } from '../wallet/helper.ts';
import { createSberInvoice, createTonInvoice, createWechatInvoice } from '../../api/invoices';
import { InvoicePage } from '../../components/invoice-page';
import { CurrencyEnum } from '../../types/api/currency.enum.ts';
import { AppWalletEnum } from '../../types/api/app-wallet.enum.ts';
import { Image } from '../../components/image';

export const AddMoneyPage: FC = () => {
    const id = 'id';
    const { t } = useTranslation();
    const [amount, setAmount] = useState<number>(0);
    const { postMessageToBroadCastChannel, setStateApp } = useAppAction();
    const currencyPrice = useAppSelector((state) => state.app.settings?.currencyPrice)!;

    const checkBalance = () => {
        if (amount && amount > 0) return true;

        postMessageToBroadCastChannel({ event: EventsEnum.SHOW_TEXT, data: 't15' });

        const element = document.getElementById(id);
        element?.focus();

        return false;
    };

    useEffect(() => {
        const element = document.getElementById(id);
        if (!element) return;

        const onInput = (e: any) => setAmount(Number(e.target.value));
        element.addEventListener('input', onInput);

        return () => element.removeEventListener('input', onInput);
    }, []);

    const onWechat = async () => {
        const result = checkBalance();
        if (!result) return;

        setStateApp({ foreground: <InvoicePage request={createWechatInvoice({ amount })} /> });
    };

    const onSber = () => {
        const result = checkBalance();
        if (!result) return;

        setStateApp({ foreground: <InvoicePage request={createSberInvoice({ amount })} /> });
    };

    const onTon = (app: AppWalletEnum) => {
        const result = checkBalance();
        if (!result) return;

        setStateApp({
            foreground: <InvoicePage request={createTonInvoice({ amount, currency: CurrencyEnum.TON, app })} />,
        });
    };

    return (
        <div className={styles.background}>
            <PageTitle title={t('t13')} />
            <Card>
                <div className={styles.div11}>
                    <Input id={id} placeholder={t('t14')} type={'number'} />
                    <div className={styles.div12}>{t('t10')}</div>
                </div>
            </Card>
            <div className={styles.div30}>
                <div className={styles.div31}>
                    <Card onClick={onWechat}>
                        <div className={styles.div1}>
                            <div className={styles.div2}>
                                <Image src={wechat} className={styles.div3} />
                            </div>
                            <div className={styles.div6}>
                                <div className={styles.div7}>WeChat</div>
                                <div className={styles.div8}>
                                    {formatNumber(convert(amount, t('t11'), 'cny', currencyPrice), '¥')}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className={styles.div31}>
                    <Card onClick={onSber}>
                        <div className={styles.div1}>
                            <div className={styles.div2}>
                                <Image src={sber} className={styles.div3} />
                            </div>
                            <div className={styles.div6}>
                                <div className={styles.div7}>{t('t16')}</div>
                                <div className={styles.div8}>
                                    {formatNumber(convert(amount, t('t11'), 'rub', currencyPrice), '₽')}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className={styles.div31}>
                    <Card>
                        <div className={styles.div1_1}>
                            <div className={styles.div4} style={{ backgroundColor: 'var(--color-5)' }}>
                                <Image src={ton} className={styles.div5} />
                            </div>
                            <div className={styles.div6}>
                                <div className={styles.div7}>TON</div>
                                <div className={styles.div8}>
                                    {formatNumber(convert(amount, t('t11'), 'the-open-network', currencyPrice), 'TON')}
                                </div>
                            </div>
                            <div className={styles.div1_2}>
                                <Image
                                    src={tonkeeper}
                                    className={styles.div3}
                                    onClick={() => onTon(AppWalletEnum.TON_KEEPER)}
                                />
                                <Image
                                    src={mytonwallet}
                                    className={styles.div3}
                                    onClick={() => onTon(AppWalletEnum.MY_TON_WALLET)}
                                />
                                <Image
                                    src={tonhub}
                                    className={styles.div3}
                                    onClick={() => onTon(AppWalletEnum.TON_HUB)}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
