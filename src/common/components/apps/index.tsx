import { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useSetPage } from '../../hooks/use-set-page.hook.ts';
import { Image } from '../image';
import { useTranslation } from 'react-i18next';
import { Iframe } from '../iframe';
import { AppType } from './types/app.type.ts';
import { getApps } from '../../api/notifications/methods.ts';
import { useAppSelector } from '../../store';

export const Apps: FC = () => {
    const { t } = useTranslation();
    const [apps, setApps] = useState<AppType[]>([]);
    const setPage = useSetPage();
    const connectionId = useAppSelector((state) => state.app.connectionId);

    useEffect(() => {
        if (!connectionId) return;
        const get = async () => {
            const response = await getApps();
            if (!response) return;

            setApps(response);
        };
        get();
    }, [connectionId]);

    return (
        <div className={styles.background}>
            {apps.map(({ id, name, iconUrl, homeUrl }) => (
                <div className={styles.div1} key={id} onClick={() => setPage(<Iframe src={homeUrl} />)}>
                    <div className={styles.div11}>
                        <Image src={iconUrl} className={styles.div2} />
                    </div>
                    <div className={styles.div3}>{t(name)}</div>
                </div>
            ))}
        </div>
    );
};
