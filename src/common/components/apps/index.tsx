import { FC } from 'react';
import styles from './index.module.css';
import vpnIcon from '../../../../public/assets/images/vpn-icon.png';
import chatsIcon from '../../../../public/assets/images/chat-icon.png';
import callsIcon from '../../../../public/assets/images/calls-icon.png';
import { AppType } from './types/app.type.ts';
import { useSetPage } from '../../hooks/use-set-page.hook.ts';
import { VpnApp } from '../../pages/vpn-app';
import { Image } from '../image';
import { Messenger } from '../../pages/messenger';
import { useTranslation } from 'react-i18next';

export const Apps: FC = () => {
    const { t } = useTranslation();
    const setPage = useSetPage();
    const apps: AppType[] = [
        { id: 'asd', name: 't27', icon: vpnIcon, app: <VpnApp /> },
        { id: 'asd2', name: 't28', icon: chatsIcon, app: <Messenger /> },
        { id: 'asd3', name: 't29', icon: callsIcon, app: <Messenger /> },
    ];

    return (
        <div className={styles.background}>
            {apps.map(({ id, name, icon, app }) => (
                <div className={styles.div1} key={id} onClick={() => setPage(app)}>
                    <div className={styles.div11}>
                        <Image src={icon} className={styles.div2} />
                    </div>
                    <div className={styles.div3}>{t(name)}</div>
                </div>
            ))}
        </div>
    );
};
