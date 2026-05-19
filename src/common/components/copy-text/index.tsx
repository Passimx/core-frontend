import { FC } from 'react';
import styles from './index.module.css';
import { PropsType } from './types/props.type.ts';
import { useAppAction } from '../../store';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { IoCopyOutline } from 'react-icons/io5';

export const CopyText: FC<PropsType> = ({ text }) => {
    const { postMessageToBroadCastChannel } = useAppAction();

    return (
        <div
            className={styles.div1}
            onClick={() => {
                navigator.clipboard.writeText(text);
                postMessageToBroadCastChannel({ event: EventsEnum.SHOW_TEXT, data: 'copied' });
            }}
        >
            <div className={styles.div2}>
                <IoCopyOutline className={styles.log_item_logo} />
            </div>
            <div>{text}</div>
        </div>
    );
};
