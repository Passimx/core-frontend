import { FC } from 'react';
import styles from './index.module.css';
import { Card } from '../../components/card';
import { useTranslation } from 'react-i18next';
import { useAppAction, useAppSelector } from '../../store';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { IoWallet } from 'react-icons/io5';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { useSetPage } from '../../hooks/use-set-page.hook.ts';
import { Wallet } from '../wallet';
import { formatNumber, getTotalBalance } from '../wallet/helper.ts';
import { GrLanguage } from 'react-icons/gr';
import { Languages } from '../../components/languages';

export const Profile: FC = () => {
    const { t } = useTranslation();
    const setPage = useSetPage();
    const { postMessageToBroadCastChannel } = useAppAction();
    const balanceAccount = useAppSelector((state) => state.user.balanceAccount);
    const currencyPrice = useAppSelector((state) => state.app.settings?.currencyPrice);

    const onLogout = () => {
        postMessageToBroadCastChannel({ event: EventsEnum.LOGOUT });
    };

    const onWallet = () => {
        setPage(<Wallet />);
    };

    const onClickLang = () => {
        setPage(<Languages />);
    };

    return (
        <div className={styles.background}>
            <div className={styles.div1} onClick={onWallet}>
                <Card>
                    <div className={styles.div2}>
                        <div className={styles.div3} style={{ backgroundColor: 'var(--color-5)' }}>
                            <IoWallet className={styles.div4} />
                        </div>
                        <div>{t('text7')}</div>
                        <div className={styles.div5}>
                            {balanceAccount &&
                                currencyPrice &&
                                formatNumber(getTotalBalance(balanceAccount, t('t11'), currencyPrice), t('t10'))}
                        </div>
                    </div>
                </Card>
            </div>
            <div className={styles.div1} onClick={onClickLang}>
                <Card>
                    <div className={styles.div2}>
                        <div className={styles.div3} style={{ backgroundColor: '#ff8533' }}>
                            <GrLanguage className={styles.div4} />
                        </div>
                        <div>{t('language')}</div>
                        <div className={styles.div5}>{t('language_native')}</div>
                    </div>
                </Card>
            </div>
            <div className={styles.div1} onClick={onLogout}>
                <Card>
                    <div className={styles.div2}>
                        <div className={styles.div3} style={{ backgroundColor: '#ff8080' }}>
                            <RiLogoutBoxFill className={styles.div4} />
                        </div>
                        <div>{t('text6')}</div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
