import { FC } from 'react';
import styles from './index.module.css';
import { PropsType } from './types/props.type.ts';

export const Button: FC<PropsType> = ({ text, onClick }) => {
    return (
        <div className={`text_translate ${styles.background}`} onClick={onClick}>
            {text}
        </div>
    );
};
