import { FC } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { useAppAction, useAppSelector } from '../../store';
import { Languages } from '../languages';
import { FaUserCircle } from 'react-icons/fa';
import { useShortText } from '../../hooks/use-short-text.hook.ts';
import { useSetPage } from '../../hooks/use-set-page.hook.ts';
import { Profile } from '../../pages/profile';

export const Header: FC = () => {
    const { t } = useTranslation();
    const { setStateApp } = useAppAction();
    const setPage = useSetPage();
    const user = useAppSelector((state) => state.user);
    const shortId = useShortText(user.id);

    const onClickLang = () => {
        setStateApp({ foreground: <Languages /> });
    };

    const onClickProfile = () => {
        setPage(<Profile />);
    };

    return (
        <div className={styles.background}>
            {user?.id ? (
                <div className={styles.background_4} onClick={onClickProfile}>
                    <FaUserCircle className={styles.background_3} />
                    <div>{shortId}</div>
                </div>
            ) : (
                <div></div>
            )}
            <div></div>
            <div className={`${styles.background_2} text_translate`} onClick={onClickLang}>
                <div className={styles.flag}> {t('language_native_flag')}</div>
                <div>{t('language')}</div>
            </div>
        </div>
    );
};
