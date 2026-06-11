import type { FC } from 'react';
import { useTranslation } from '../../hooks/translations/use-translation.ts';
import { useIsIos } from '../../hooks/use-is-ios.hook.ts';
import { useIsPhone } from '../../hooks/use-is-phone.hook.ts';
import styles from './index.module.css';
import { Auth } from '../auth';
import { ChildrenPropsType } from '../../types/props/children-props.type.ts';
import { Header } from '../header';
import { TopElements } from '../top-elements';
import { useBroadcastChannel } from '../../hooks/use-broadcast-channel.ts';
import { Pages } from '../pages';
import { useLoadFromIndexDbHook } from '../../hooks/use-load-from-index-db.hook.ts';
import { useMainTab } from '../../hooks/use-main-tab.hook.ts';
import { RotateLoading } from '../rotate-loading';
import { useAppSelector } from '../../store';

export const App: FC<ChildrenPropsType> = () => {
    const lang = useAppSelector((state) => state.app?.settings?.lang);

    useIsIos();
    useIsPhone();
    useMainTab();
    useLoadFromIndexDbHook();
    useBroadcastChannel();
    useTranslation();

    if (!lang)
        return (
            <div className={styles.background}>
                <RotateLoading />
            </div>
        );

    return (
        <div className={styles.background}>
            <TopElements />
            <div className={styles.background_2}>
                <Header />
                <Auth>
                    <Pages />
                </Auth>
            </div>
        </div>
    );
};
