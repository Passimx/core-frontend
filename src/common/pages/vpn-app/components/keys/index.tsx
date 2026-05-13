import { FC } from 'react';
import styles from './index.module.css';
import { useAppAction, useAppSelector } from '../../../../store';
import { PageTitle } from '../../../../components/page-title';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../../components/card';
import { EventsEnum } from '../../../../types/events/events.enum.ts';
import { useSetPage } from '../../../../hooks/use-set-page.hook.ts';
import { Extending } from '../extending';
import { ChangeCountries } from '../change-countries';

export const Keys: FC = () => {
    const { t } = useTranslation();
    const setPage = useSetPage();
    const { postMessageToBroadCastChannel } = useAppAction();
    const keys = useAppSelector((state) => state.user.keys);

    return (
        <div className={styles.background}>
            <PageTitle title={t('t18')} />
            <div className={styles.div1}>
                {keys?.map(({ id, serverCode, status, expiresAt, key }) => (
                    <div key={id}>
                        <Card>
                            <div className={styles.div5}>
                                <div className={styles.div6}>
                                    <div>ID:</div>
                                    <div>{id}</div>
                                </div>
                                <div className={styles.div6}>
                                    <div>{t('t19')}:</div>
                                    <div>
                                        {t(`${serverCode}_flag`)}&nbsp;{t(`${serverCode}_name`)}
                                    </div>
                                </div>
                                <div className={styles.div6}>
                                    <div>{t('status')}:</div>
                                    <div className={status === 'active' ? styles.div7 : styles.div8}>{t(status)}</div>
                                </div>
                                <div className={styles.div6}>
                                    <div>{t('active_until')}:</div>
                                    <div>
                                        {new Date(expiresAt).toLocaleDateString('ru-RU', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        })}
                                    </div>
                                </div>
                                <div className={styles.div11}>
                                    <div
                                        className={styles.div12}
                                        onClick={() =>
                                            setPage(
                                                <Extending
                                                    keyId={id}
                                                    kind={serverCode === 'white' ? 'premium' : 'base'}
                                                />,
                                            )
                                        }
                                    >
                                        <div className={styles.div13}>{t('extend_key')}</div>
                                    </div>
                                    {status === 'active' && serverCode !== 'white' && (
                                        <div className={styles.div12} onClick={() => setPage(<ChangeCountries />)}>
                                            <div className={styles.div13}>{t('change_server')}</div>
                                        </div>
                                    )}
                                    <div
                                        className={styles.div12}
                                        onClick={() => {
                                            navigator.clipboard.writeText(key);
                                            postMessageToBroadCastChannel({
                                                event: EventsEnum.SHOW_TEXT,
                                                data: 'copied',
                                            });
                                        }}
                                    >
                                        <div className={styles.div13}>{t('copy_key')}</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};
