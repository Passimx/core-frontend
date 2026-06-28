import { FC } from 'react';
import styles from './index.module.css';
import { Card } from '../../components/card';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store';
import { IoPersonAddOutline } from 'react-icons/io5';
import { useSetPage } from '../../hooks/use-set-page.hook.ts';
import { GrLanguage } from 'react-icons/gr';
import { Languages } from '../../components/languages';
import { PiDevicesBold } from 'react-icons/pi';
import { Devices } from '../devices';
import { LoginPage } from '../login';
import { MdSupervisorAccount } from 'react-icons/md';
import { Accounts } from '../accounts';

export const Profile: FC = () => {
    const { t } = useTranslation();
    const setPage = useSetPage();
    const sessions = useAppSelector((state) => state.user.sessions);
    const accounts = useAppSelector((state) => state.app.accounts);

    // const currencyPrice = useAppSelector((state) => state.app.settings?.currencyPrice);
    // const balanceAccount = useAppSelector((state) => state.user.balanceAccount);
    // const { postMessageToBroadCastChannel } = useAppAction();
    // const sessionId = useAppSelector((state) => state.user.sessionId)!;
    //
    // const onLogout = () => {
    //     postMessageToBroadCastChannel({
    //         event: EventsEnum.SEND_MESSAGE,
    //         data: { event: EventsEnum.LOGOUT, data: sessionId },
    //     });
    // };

    return (
        <div className={styles.background}>
            <div className={styles.div1} onClick={() => setPage(<LoginPage />)}>
                <div className={styles.divn1}>
                    <div className={styles.div2} style={{ color: '#439fef' }}>
                        <div className={styles.div3}>
                            <IoPersonAddOutline className={styles.div4} />
                        </div>
                        <div>{t('add_account')}</div>
                        <div className={styles.div5}></div>
                    </div>
                </div>
            </div>
            {accounts && accounts.length > 1 && (
                <div className={styles.div1} onClick={() => setPage(<Accounts />)}>
                    <Card>
                        <div className={styles.div2}>
                            <div className={styles.div3} style={{ backgroundColor: 'var(--color-5)' }}>
                                <MdSupervisorAccount className={styles.div4} />
                            </div>
                            <div>{t('accounts')}</div>
                            <div className={styles.div5}>{accounts.length}</div>
                        </div>
                    </Card>
                </div>
            )}
            <div className={styles.div1} onClick={() => setPage(<Devices />)}>
                <Card>
                    <div className={styles.div2}>
                        <div className={styles.div3} style={{ backgroundColor: 'var(--color-5)' }}>
                            <PiDevicesBold className={styles.div4} />
                        </div>
                        <div>{t('t31')}</div>
                        <div className={styles.div5}>{sessions?.length}</div>
                    </div>
                </Card>
            </div>
            {/*<div className={styles.div1} onClick={() => setPage(<Wallet />)}>*/}
            {/*    <Card>*/}
            {/*        <div className={styles.div2}>*/}
            {/*            <div className={styles.div3} style={{ backgroundColor: 'rgb(0, 204, 204)' }}>*/}
            {/*                <IoWallet className={styles.div4} />*/}
            {/*            </div>*/}
            {/*            <div>{t('text7')}</div>*/}
            {/*            <div className={styles.div5}>*/}
            {/*                {balanceAccount &&*/}
            {/*                    currencyPrice &&*/}
            {/*                    formatNumber(getTotalBalance(balanceAccount, t('t11'), currencyPrice), t('t10'))}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </Card>*/}
            {/*</div>*/}
            <div className={styles.div1} onClick={() => setPage(<Languages />)}>
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
        </div>
    );
};
