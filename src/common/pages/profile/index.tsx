import { FC } from 'react';
import styles from './index.module.css';
import { Card } from '../../components/card';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store';
import { IoNotifications, IoPersonAddOutline } from 'react-icons/io5';
import { useSetPage } from '../../hooks/use-set-page.hook.ts';
import { GrLanguage } from 'react-icons/gr';
import { Languages } from '../../components/languages';
import { PiDevicesBold } from 'react-icons/pi';
import { Devices } from '../devices';
import { LoginPage } from '../login';
import { MdSupervisorAccount } from 'react-icons/md';
import { Accounts } from '../accounts';
import { Envs } from '../../config/envs/envs.ts';
import { Notifications } from '../notifications';

export const Profile: FC = () => {
    const { t } = useTranslation();
    const setPage = useSetPage();
    const sessions = useAppSelector((state) => state.user.sessions);
    const accounts = useAppSelector((state) => state.app.accounts);
    const pushSubscriptionPayload = useAppSelector((state) => state.app.settings?.pushSubscriptionPayload);

    return (
        <div className={styles.background}>
            <div className={styles.div1} onClick={() => setPage(<LoginPage />)}>
                <div className={styles.divn1}>
                    <div className={styles.div0}>
                        <div className={styles.div2} style={{ color: '#439fef' }}>
                            <div className={styles.div3}>
                                <IoPersonAddOutline className={styles.div4} />
                            </div>
                            <div>{t('add_account')}</div>
                            <div className={styles.div5}></div>
                        </div>
                    </div>
                </div>
            </div>
            {accounts && accounts.length > 1 && (
                <div className={styles.div1} onClick={() => setPage(<Accounts />)}>
                    <Card>
                        <div className={styles.div0}>
                            <div className={styles.div2}>
                                <div className={styles.div3} style={{ backgroundColor: 'var(--color-5)' }}>
                                    <MdSupervisorAccount className={styles.div4} />
                                </div>
                                <div>{t('accounts')}</div>
                                <div className={styles.div5}>{accounts.length}</div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
            <div className={styles.div1} onClick={() => setPage(<Devices />)}>
                <Card>
                    <div className={styles.div0}>
                        <div className={styles.div2}>
                            <div className={styles.div3} style={{ backgroundColor: 'var(--color-5)' }}>
                                <PiDevicesBold className={styles.div4} />
                            </div>
                            <div>{t('t31')}</div>
                            <div className={styles.div5}>{sessions?.length}</div>
                        </div>
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
            <div className={styles.div1}>
                <Card className={styles.nonClick}>
                    <div className={styles.div0}>
                        <div className={styles.div2} onClick={() => setPage(<Notifications />)}>
                            <div className={styles.div3} style={{ backgroundColor: '#ff1ac6' }}>
                                <IoNotifications className={styles.div4} />
                            </div>
                            <div>{t('t79')}</div>
                            <div className={styles.div5}>{pushSubscriptionPayload ? t('t47') : t('t48')}</div>
                        </div>
                        <div className={styles.div2} onClick={() => setPage(<Languages />)}>
                            <div className={styles.div3} style={{ backgroundColor: '#ff8533' }}>
                                <GrLanguage className={styles.div4} />
                            </div>
                            <div>{t('language')}</div>
                            <div className={styles.div5}>{t('language_native')}</div>
                        </div>
                    </div>
                </Card>
            </div>
            <Card
                className={styles.div6}
                onClick={() => window.open(`https://github.com/Passimx/core-frontend/tree/${Envs.version}`, '_blank')}
            >
                <div className={styles.div7}>PassimX Web {Envs.version}</div>
            </Card>
        </div>
    );
};
