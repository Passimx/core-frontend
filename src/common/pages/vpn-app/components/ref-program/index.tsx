import { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { PageTitle } from '../../../../components/page-title';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../../components/card';
import { useShortText } from '../../../../hooks/use-short-text.hook.ts';
import { RotateLoading } from '../../../../components/rotate-loading';
import { getRefRating } from '../../../../api/users';
import { RatingUserType } from '../../../../types/api/rating.ts';
import { CopyText } from '../../../../components/copy-text';

export const RefProgram: FC = () => {
    const { t } = useTranslation();
    const shortText = useShortText;
    const [data, setData] = useState<RatingUserType>();

    useEffect(() => {
        const getRating = async () => {
            const result = await getRefRating();
            if (!result.success) return;

            setData(result.data);
        };

        getRating();
    }, []);

    return (
        <div className={styles.background}>
            <PageTitle title={t('ref_program')} />
            {data?.users?.length ? (
                <div className={styles.div0}>
                    <div className={styles.div1}>
                        <div className={styles.div2}>{t('t4')}</div>
                        <Card>
                            <div className={styles.div4}>
                                {data.users.map(({ id, count }) => (
                                    <div key={id} className={styles.div5}>
                                        <div className={styles.div6}>{shortText(id)}</div>
                                        <div className={styles.div7}>
                                            <div></div>
                                            <div className={styles.div8}>{count}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                    <div className={styles.div1}>
                        <div className={styles.div2}>{t('t3')}</div>
                        <Card>
                            <div className={styles.div3}>{data.me.count}</div>
                        </Card>
                    </div>
                    <div className={styles.div1}>
                        <div className={styles.div2}>{t('t5')}</div>
                        <Card>
                            <CopyText text={`https://t.me/passimx_vpn_bot?start=${data.me.id}`} />
                        </Card>
                    </div>
                </div>
            ) : (
                <RotateLoading />
            )}
        </div>
    );
};
