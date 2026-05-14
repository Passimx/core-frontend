import { FC } from 'react';
import styles from './index.module.css';
import { Card } from '../../../../components/card';
import { useTranslation } from 'react-i18next';
import { NewKey } from '../new-key';
import { useSetPage } from '../../../../hooks/use-set-page.hook.ts';

export const SelectTariff: FC = () => {
    const { t } = useTranslation();
    const setPage = useSetPage();

    return (
        <div className={styles.background}>
            <div className={styles.div1} onClick={() => setPage(<NewKey kind={'base'} />)}>
                <Card>
                    <div className={styles.div2}>
                        <div className={styles.div3}>{t('t21')}</div>
                        <div className={styles.div4}>
                            <pre>{t('t23')}</pre>
                        </div>
                    </div>
                </Card>
            </div>
            <div className={styles.div1} onClick={() => setPage(<NewKey kind={'premium'} />)}>
                <Card>
                    <div className={styles.div2}>
                        <div className={styles.div3}>{t('t22')}</div>
                        <div className={styles.div4}>
                            <pre>{t('t24')}</pre>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
