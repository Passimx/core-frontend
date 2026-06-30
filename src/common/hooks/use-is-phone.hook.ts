import { useEffect } from 'react';
import { useAppAction, useAppSelector } from '../store';

export const useIsPhone = () => {
    const { setStateApp } = useAppAction();
    const isActiveTab = useAppSelector((state) => state.app.isActiveTab);

    useEffect(() => {
        if (!isActiveTab) return;

        const resize = () => {
            const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
            const isPhone = toMatch.some((toMatchItem) => navigator.userAgent.match(toMatchItem));
            setStateApp({ isPhone });
        };

        resize();

        window.addEventListener('resize', resize);

        return () => window.removeEventListener('resize', resize);
    }, [isActiveTab]);
};
