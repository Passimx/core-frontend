import { useAppAction, useAppSelector } from '../store';
import { JSX } from 'react';
import { TabEnum } from '../store/app/types/state.type.ts';
import { useScrollPage } from './use-scroll-page.hook.ts';

export const useSetPage = () => {
    const { setStateApp } = useAppAction();
    const activeTab = useAppSelector((state) => state.app.activeTab)!;
    const pages = useAppSelector((state) => state.app.pages)!;
    const scrollPage = useScrollPage();

    return (element: JSX.Element) => {
        const actualPages = pages.get(activeTab) || [];

        const index = actualPages.findIndex((page) => page.type === element.type);
        if (index === actualPages.length - 1) return;
        if (index !== -1) return scrollPage();

        const newPages = [...actualPages, element];
        const updatedPages = new Map<TabEnum, React.JSX.Element[]>([...pages, [activeTab, newPages]]);
        setStateApp({ pages: updatedPages });
    };
};
