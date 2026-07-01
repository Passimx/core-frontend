import { FC } from 'react';
import styles from './index.module.css';
import { ChildrenPropsType } from '../../types/props/children-props.type.ts';

export const Card: FC<ChildrenPropsType> = ({ children, onClick, className }) => {
    return (
        <div className={`${styles.background} ${className ?? ''}`} onClick={onClick}>
            {children}
        </div>
    );
};
