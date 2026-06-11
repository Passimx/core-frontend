import { FC } from 'react';
import { resources } from '../../hooks/translations/use-translation.ts';
import { useAppAction, useAppSelector } from '../../store';
import { useTranslation } from 'react-i18next';
import { EventsEnum } from '../../types/events/events.enum.ts';
import styles from './index.module.css';
import { PageTitle } from '../page-title';

export const Languages: FC = () => {
    const { t } = useTranslation();
    const languages = Object.keys(resources);
    const { postMessageToBroadCastChannel } = useAppAction();
    const lang = useAppSelector((state) => state.app.settings?.lang);
    const settings = useAppSelector((state) => state.app.settings)!;

    return (
        <div className={styles.background}>
            <PageTitle title={t('language')} />
            <div className={styles.languages}>
                {languages.map((language) => (
                    <div
                        key={language}
                        className={`${styles.language_item} ${lang === language && styles.language_item_active}`}
                        onClick={() =>
                            postMessageToBroadCastChannel({
                                event: EventsEnum.SET_STATE_APP,
                                data: { settings: { ...settings, lang: language } },
                            })
                        }
                    >
                        {t('language_native_flag', { lng: language })} {t('language_native', { lng: language })}
                        <div
                            className={`${styles.language_item_round} ${lang === language && styles.language_item_round_active}`}
                        >
                            <div className={`${lang === language && styles.language_item_small_round_active}`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
