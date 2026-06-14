import { FC } from 'react';
import styles from './index.module.css';
import { PropsType } from './types/props.type.ts';

export const Button: FC<PropsType> = ({ text, onClick, className }) => {
    return (
        <div className={`text_translate ${styles.background} ${className}`} onClick={onClick}>
            {text}
        </div>
    );
};
