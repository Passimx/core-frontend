import { FC } from 'react';
import styles from './index.module.css';
import { PageTitle } from '../../components/page-title';
import { useTranslation } from 'react-i18next';
import { useLoadKey } from './hooks/use-load-key.hook.ts';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { RotateLoading } from '../../components/rotate-loading';

export const LoginKey: FC = () => {
    const { t } = useTranslation();
    const [isDragOver, isLoading] = useLoadKey();

    return (
        <div id={styles.background}>
            <PageTitle title={t('login_to_PassimX')} />
            <div id={styles.div2} className={`${isDragOver && styles.isDragOver}`}>
                {isLoading ? (
                    <RotateLoading />
                ) : (
                    <div className={styles.div1}>
                        <AiOutlineCloudUpload className={styles.div3} />
                        <div className={styles.div4}>{t('t78')}</div>
                    </div>
                )}
            </div>
        </div>
    );
};
