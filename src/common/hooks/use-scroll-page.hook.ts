import styles from '../components/pages/index.module.css';
import { MouseEvent } from 'react';

export const useScrollPage = () => {
    return (event?: MouseEvent<HTMLDivElement>) => {
        const element = document.getElementById(styles.background)!;
        element.scrollTo({ left: element.scrollLeft - element.clientWidth + 8, behavior: 'smooth' });
        event?.currentTarget.blur();
    };
};
