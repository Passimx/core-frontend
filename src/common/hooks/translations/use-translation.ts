import { useEffect } from 'react';
import moment from 'moment/min/moment-with-locales';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import CH from './languages/zh/translation.json';
import EN from './languages/en/translation.json';
import RU from './languages/ru/translation.json';
import { useAppAction, useAppSelector } from '../../store';

export const resources = {
    en: {
        translation: EN,
    },
    ru: {
        translation: RU,
    },
    zh: {
        translation: CH,
    },
};

export const useTranslation = () => {
    const { settings, isActiveTab } = useAppSelector((state) => state.app);
    const { setStateApp } = useAppAction();

    useEffect(() => {
        if (!isActiveTab) return;
        if (settings?.lang) return;

        const browserLang = navigator.language.slice(0, 2).toLowerCase();
        const languages: string[] = Object.keys(resources);
        const lang = languages.find((lang) => lang === browserLang) ?? 'en';

        setStateApp({ settings: { ...settings!, lang } });
    }, [isActiveTab, settings?.lang]);

    useEffect(() => {
        if (i18n.language?.split('-')[0] === settings?.lang?.split('-')[0].split('-')[0]) return;
        const elements = document.querySelectorAll<HTMLDivElement>('.text_translate');
        elements.forEach((el) => {
            el.style.animation = 'none';
            el.style.filter = 'blur(4px)';
        });

        let lang = settings?.lang || 'en';

        if (['uk', 'uz', 'kz'].includes(lang)) lang = 'ru'; // uz, uk, kz -> ru
        lang = lang?.toLowerCase().split('-')[0]; // zh-hans -> zh
        if (!(lang in resources)) lang = 'en';

        if (lang === 'zh') moment.locale('zh-cn');
        else moment.locale(lang);

        i18n.use(initReactI18next)
            .init({
                resources,
                lng: lang,
                fallbackLng: lang,
                interpolation: {
                    escapeValue: false,
                },
            })
            .then(() => {
                elements.forEach((el) => {
                    const time = 200;
                    el.style.animation = `show ${time}ms ease forwards`;

                    setTimeout(() => {
                        el.style.filter = 'none';
                        el.style.animation = 'none';
                    }, time);
                });
            });
    }, [settings?.lang, isActiveTab]);
};
