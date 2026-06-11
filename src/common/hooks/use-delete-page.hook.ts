import { useAppAction, useAppSelector } from '../store';
import { TabEnum } from '../store/app/types/state.type.ts';
import { JSX } from 'react';

export const useDeletePage = () => {
    const { setStateApp } = useAppAction();
    const { pages, activeTab } = useAppSelector((state) => state.app);

    return () => {
        const actualPages = pages!.get(activeTab!) || [];
        const newPages = [...actualPages];
        newPages.pop();
        setStateApp({ pages: new Map<TabEnum, JSX.Element[]>([[activeTab!, newPages]]) });
    };
};
