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

        const onScrollEnd = () => {
            const pageWidth = element.clientWidth;
            const scrollLeft = element.scrollLeft;
            const scrollWidth = element.scrollWidth;

            if (pageWidth + scrollLeft === scrollWidth) return;
            const leftSide = scrollWidth - scrollLeft - pageWidth < pageWidth / 2;

            if (leftSide)
                element.scrollTo({
                    left: element.scrollWidth,
                    behavior: 'smooth',
                });
            else
                element.scrollTo({
                    left: element.scrollWidth - pageWidth - pageWidth + 8,
                    behavior: 'smooth',
                });
        };

        element.addEventListener('scrollend', onScrollEnd);

        return () => {
            element.removeEventListener('scrollend', onScrollEnd);
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
