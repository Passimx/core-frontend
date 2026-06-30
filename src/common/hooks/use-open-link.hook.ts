import { useAppSelector } from '../store';
import { useSetPage } from './use-set-page.hook.ts';
import * as React from 'react';
import { Iframe } from '../components/iframe';

export const useOpenLink = () => {
    const isPhone = useAppSelector((state) => state.app.isPhone);
    const setPage = useSetPage();

    return (src: string) => {
        if (!isPhone) return window.open(src, '_blank');
        setPage(React.createElement(Iframe, { src }));
    };
};
