import { useIsIos } from './use-is-ios.hook.ts';
import { useIsPhone } from './use-is-phone.hook.ts';
import { useOnline } from './use-online.ts';

export const useDevice = () => {
    useIsIos();
    useIsPhone();
    useOnline();
};
