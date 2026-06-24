import { FC } from 'react';
import styles from './index.module.css';
import { useAppAction, useAppSelector } from '../../store';
import { PageTitle } from '../../components/page-title';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/card';
import { useShortText } from '../../hooks/use-short-text.hook.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { MdOutlineCancel } from 'react-icons/md';

export const Accounts: FC = () => {
    const { t } = useTranslation();
    const { postMessageToBroadCastChannel } = useAppAction();
    const shortText = useShortText;
    const activeAccount = useAppSelector((state) => state.app.activeAccount);
    const accounts = useAppSelector((state) => state.app.accounts);

    const changeAccount = (id: string) => {
        if (id === activeAccount) return;
        const account = accounts?.find((account) => account.id === id);
        if (!account) return;

        postMessageToBroadCastChannel({ event: EventsEnum.SET_STATE_APP, data: { activeAccount: id } });
        postMessageToBroadCastChannel({ event: EventsEnum.SET_STATE_USER, data: account });
    };

    const deleteAccount = (id: string) => {
        const account = accounts!.find((account) => account.id === id)!;

        postMessageToBroadCastChannel({
            event: EventsEnum.SEND_MESSAGE,
            data: { event: EventsEnum.LOGOUT, data: [{ id: account.sessionId }] },
        });
    };

    return (
        <div className={styles.div0}>
            <PageTitle title={t('accounts')} />
            {accounts?.map(({ id }) => (
                <div key={id} className={styles.div1}>
                    <Card
                        className={`${styles.div2} ${id === activeAccount && styles.div22}`}
                        onClick={() => changeAccount(id!)}
                    >
                        <div>{shortText(id)}</div>
                    </Card>
                    <div className={styles.div11} onClick={() => deleteAccount(id!)}>
                        <MdOutlineCancel className={styles.div12} />
                    </div>
                </div>
            ))}
        </div>
    );
};
