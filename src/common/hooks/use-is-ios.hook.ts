import { useEffect } from 'react';
import { useAppAction, useAppSelector } from '../store';

export const useIsIos = () => {
    const { setStateApp } = useAppAction();
    const isActiveTab = useAppSelector((state) => state.app.isActiveTab);

    useEffect(() => {
        if (!isActiveTab) return;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const ua = navigator.userAgent || navigator.vendor || window.opera;

        const isIOS = /iPad|iPhone|iPod/.test(ua);
        const isMac = /Macintosh|Mac OS X/.test(ua);
        const isIPadOS = isMac && 'ontouchend' in document;

        setStateApp({ isIos: isIOS || isMac || isIPadOS });
    }, [isActiveTab]);
};
