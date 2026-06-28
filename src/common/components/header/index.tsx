import { FC, useEffect } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { useAppAction, useAppSelector } from '../../store';
import { Languages } from '../languages';
import { FaUserCircle } from 'react-icons/fa';
import { useSetPage } from '../../hooks/use-set-page.hook.ts';
import { Profile } from '../../pages/profile';
import { useScrollPage } from '../../hooks/use-scroll-page.hook.ts';
import { IoIosArrowBack } from 'react-icons/io';

export const Header: FC = () => {
    const { t } = useTranslation();
    const { setStateApp } = useAppAction();
    const setPage = useSetPage();
    const scrollPage = useScrollPage();
    const user = useAppSelector((state) => state.user);

    const activeTab = useAppSelector((state) => state.app.activeTab);
    const pages = useAppSelector((state) => state.app.pages);

    const onClickLang = () => {
        if (!user?.id) setStateApp({ foreground: <Languages /> });
    };

    const onClickProfile = () => {
        if (user?.id) setPage(<Profile />);
    };

    const onClickBack = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        scrollPage();
    };

    useEffect(() => {
        if (!activeTab || !pages) return;
        const lists = pages.get(activeTab);
        if (!lists) return;
        const size = lists?.length;
        const element = document.getElementById(styles.div22);
        if (!element) return;

        if (size >= 2) element.style.transform = 'scale(1)';
        else element.style.transform = 'scale(0)';
    }, [pages, activeTab]);

    return (
        <div className={styles.background} onClick={onClickProfile}>
            <div className={styles.div1} onClick={onClickBack}>
                <IoIosArrowBack id={styles.div22} />
            </div>
            <div className={styles.div2}>
                {!user.id && (
                    <div className={`${styles.background_2} text_translate`} onClick={onClickLang}>
                        <div className={styles.flag}> {t('language_native_flag')}</div>
                        <div>{t('language')}</div>
                    </div>
                )}
                {user?.id && (
                    <div className={styles.background_4}>
                        <div></div>
                        <FaUserCircle className={styles.background_3} />
                    </div>
                )}
            </div>
        </div>
    );
};
