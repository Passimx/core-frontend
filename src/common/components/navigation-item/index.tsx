import { FC, JSX, memo, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useVisibility } from '../../hooks/use-visibility.hook.ts';
import styles2 from '../pages/index.module.css';
import { useDeletePage } from '../../hooks/use-delete-page.hook.ts';

export const NavigationItem: FC<{ children: JSX.Element; index: number }> = memo(({ children, index }) => {
    const id = `navigation_item_${index}`;

    const deletePage = useDeletePage();
    const [observerTarget, visible] = useVisibility();
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        if (visible) setIsActive(true);
    }, [visible]);

    useEffect(() => {
        if (visible) return;
        if (!isActive) return;

        const element = document.getElementById(styles2.background)!;
        const activePageIndex = element.scrollLeft / element.clientWidth;
        if (activePageIndex >= index) return;

        deletePage();
    }, [index, visible, isActive]);

    return (
        <div id={id} ref={observerTarget} className={styles.background}>
            <div className={styles.background1}>{children}</div>
        </div>
    );
});
