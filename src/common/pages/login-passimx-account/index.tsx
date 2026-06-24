import { FC } from 'react';
import styles from './index.module.css';
import { PageTitle } from '../../components/page-title';
import { useTranslation } from 'react-i18next';
import { QrCodeImage } from '../../components/qr-code-image';
import { Button } from '../../components/button';
import { useAppSelector } from '../../store';
import { ScanEventEnum } from '../../components/scan-qr-code/types/scan-event.enum.ts';

export const LoginPassimxAccount: FC = () => {
    const { t } = useTranslation();
    const instructions = ['t42', 't43', 't44'];
    const connectionId = useAppSelector((state) => state.app.connectionId);
    const url = connectionId
        ? `${window.location.origin}${ScanEventEnum.ADD_DEVICE}?connectionId=${connectionId}`
        : undefined;

    return (
        <div className={styles.background}>
            <div className={styles.div111}>
                <PageTitle title={t('login_to_PassimX')} />
                <div className={styles.div1}>
                    <QrCodeImage url={url!} />
                </div>
                <div className={styles.div11}>{t('t41')}</div>
                <div className={styles.div2}>
                    {instructions?.map((word, index) => (
                        <div key={index} className={styles.div3}>
                            <div className={styles.div4}>{index + 1}</div>
                            <div className={styles.div5}>{t(word)}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.div112}>
                <Button text={t('t45')} onClick={() => {}} />
            </div>
        </div>
    );
};
