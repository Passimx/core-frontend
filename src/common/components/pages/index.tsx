import { FC, useEffect } from 'react';
import { useAppSelector } from '../../store';
import { NavigationItem } from '../navigation-item';
import styles from './index.module.css';

export const Pages: FC = () => {
    const { pages, activeTab } = useAppSelector((state) => state.app);
    const actualPages = pages?.get(activeTab);

    useEffect(() => {
        const actualPages = pages.get(activeTab) || [];
        if (!actualPages?.length) return;

        const element = document.getElementById(styles.background)!;
        element?.scrollTo({ left: element.clientWidth * actualPages.length, behavior: 'smooth' });
    }, [pages]);

    useEffect(() => {
        const element = document.getElementById(styles.background);
        if (!element) return;
        let touched = false;

        const onScrollEnd = () => {
            if (touched === false) return;
            touched = false;

            const pageWidth = element.clientWidth;

            console.log(pageWidth / 2);

            element.scrollTo({
                left: element.scrollWidth - pageWidth - pageWidth + 8,
                behavior: 'smooth',
            });
        };

        const onTouched = () => {
            touched = true;
        };

        element.addEventListener('scrollend', onScrollEnd);
        element.addEventListener('touchstart', onTouched);

        return () => {
            element.removeEventListener('scrollend', onScrollEnd);
            element.removeEventListener('touchstart', onTouched);
        };
    }, [pages]);

    return (
        <div id={styles.background}>
            {actualPages?.map((page, index) => (
                <NavigationItem key={index} index={index}>
                    {page}
                </NavigationItem>
            ))}
        </div>
    );
};
