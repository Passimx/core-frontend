import { FC } from 'react';
import styles from './index.module.css';
import { useAppAction, useAppSelector } from '../../../../store';
import { PageTitle } from '../../../../components/page-title';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../../components/card';
import { EventsEnum } from '../../../../types/events/events.enum.ts';
import { useSetPage } from '../../../../hooks/use-set-page.hook.ts';
import { Extending } from '../extending';
import { ChangeServer } from '../change-server';
import { IoIosAddCircle } from 'react-icons/io';
import { SelectTariff } from '../select-tariff';
import { changeAutoRenewKey, deleteKey } from '../../../../api/tariffs';

export const Keys: FC = () => {
    const { t } = useTranslation();
    const setPage = useSetPage();
    const { postMessageToBroadCastChannel, setStateUser } = useAppAction();
    const keys = useAppSelector((state) => state.user.keys);

    const onDelete = async (keyId: string) => {
        const result = await deleteKey({ keyId });

        if (result.success) setStateUser(result.data);
        else postMessageToBroadCastChannel({ event: EventsEnum.SHOW_TEXT, data: result.data });
    };

    const onChangeAutoRenew = async (keyId: string) => {
        const result = await changeAutoRenewKey({ keyId });

        if (result.success) setStateUser(result.data);
        else postMessageToBroadCastChannel({ event: EventsEnum.SHOW_TEXT, data: result.data });
    };

    return (
        <div className={styles.background}>
            <PageTitle title={t('t18')} />
            <div className={styles.div1}>
                <div className={styles.div1o} onClick={() => setPage(<SelectTariff />)}>
                    <Card>
                        <div className={styles.div2o}>
                            <div className={styles.div3o} style={{ backgroundColor: '#00b300' }}>
                                <IoIosAddCircle className={styles.div4o} />
                            </div>
                            <div>{t('buy_key')}</div>
                        </div>
                    </Card>
                </div>

                {keys?.map(({ id, serverCode, status, expiresAt, key, autoRenewEnabled }) => (
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
                                        <div
                                            className={styles.div12}
                                            onClick={() => setPage(<ChangeServer keyId={id} />)}
                                        >
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
                                    <div className={styles.div12} onClick={() => onChangeAutoRenew(id)}>
                                        <div
                                            className={`${styles.div13} ${autoRenewEnabled ? styles.div14 : styles.div15}`}
                                        >
                                            {t(autoRenewEnabled ? 'disable_auto_renew' : 'enable_auto_renew')}
                                        </div>
                                    </div>
                                    {status === 'expired' && (
                                        <div className={styles.div12} onClick={() => onDelete(id)}>
                                            <div className={`${styles.div13} ${styles.div14}`}>{t('delete_key')}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};
