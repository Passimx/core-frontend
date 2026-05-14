import { FC } from 'react';
import styles from './index.module.css';
import { Card } from '../../components/card';
import { useTranslation } from 'react-i18next';
import { useSetPage } from '../../hooks/use-set-page.hook.ts';
import { Keys } from './components/keys';
import { IoKeySharp } from 'react-icons/io5';
import { IoMdCloudDownload } from 'react-icons/io';
import { useAppSelector } from '../../store';
import { BiSupport } from 'react-icons/bi';

export const VpnApp: FC = () => {
    const { isIos, isPhone } = useAppSelector((state) => state.app);
    const { t } = useTranslation();
    const setPage = useSetPage();

    const onAppRedirect = () => {
        let link = '';

        if (isIos && isPhone) link = 'https://apps.apple.com/ru/app/defaultvpn/id6744725017';
        else if (isIos && !isPhone)
            link =
                'https://github.com/amnezia-vpn/amnezia-client/releases/download/4.8.12.9/AmneziaVPN_4.8.12.9_macos.pkg';
        else if (!isIos && isPhone)
            link =
                'https://play.google.com/store/apps/details?id=org.amnezia.vpn&utm_source=amnezia.org&utm_campaign=organic&utm_medium=referral';
        else if (!isIos && !isPhone)
            link =
                'https://github.com/amnezia-vpn/amnezia-client/releases/download/4.8.12.9/AmneziaVPN_4.8.12.9_x64.exe';

        window.open(link);
    };

    const onSupportRedirect = () => {
        window.open('https://t.me/passimx');
    };

    return (
        <div className={styles.background}>
            <div className={styles.div1} onClick={() => setPage(<Keys />)}>
                <Card>
                    <div className={styles.div2}>
                        <div className={styles.div3} style={{ backgroundColor: '#00cccc' }}>
                            <IoKeySharp className={styles.div4} />
                        </div>
                        <div>{t('t18')}</div>
                    </div>
                </Card>
            </div>
            <div className={styles.div1} onClick={onAppRedirect}>
                <Card>
                    <div className={styles.div2}>
                        <div className={styles.div3} style={{ backgroundColor: '#b3b300' }}>
                            <IoMdCloudDownload className={styles.div4} />
                        </div>
                        <div>{t('t20')}</div>
                    </div>
                </Card>
            </div>
            <div className={styles.div1} onClick={onSupportRedirect}>
                <Card>
                    <div className={styles.div2}>
                        <div className={styles.div3} style={{ backgroundColor: '#ff6600' }}>
                            <BiSupport className={styles.div4} />
                        </div>
                        <div>{t('support')}</div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
