import type { FC } from 'react';
import type { PropsType } from './types/props.type.ts';
import { useSettings } from '../../hooks/use-settings.hook.ts';
import { useTranslation } from '../../hooks/translations/use-translation.ts';
import { useIsIos } from '../../hooks/use-is-ios.hook.ts';
import { useIsPhone } from '../../hooks/use-is-phone.hook.ts';

export const App: FC<PropsType> = ({ children }) => {
    useIsIos();
    useIsPhone();
    useSettings();
    useTranslation();

    return <>{children}</>;
};
