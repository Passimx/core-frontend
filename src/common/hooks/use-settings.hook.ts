import { useEffect } from 'react';
import { useAppAction } from '../store';
import { SettingsType } from '../store/app/types/state.type.ts';
import { resources } from './translations/use-translation.ts';
import { Envs } from '../config/envs/envs.ts';

export const useSettings = () => {
    const { changeSettings } = useAppAction();

    useEffect(() => {
        const payload = localStorage.getItem('settings');
        const settings: SettingsType = payload ? JSON.parse(payload) : {};

        if (!settings.lang) {
            const browserLang = navigator.language.slice(0, 2).toLowerCase();
            const languages: string[] = Object.keys(resources);
            settings.lang = languages.find((lang) => lang === browserLang) ?? 'en';
        }

        Envs.settings = settings;
        changeSettings({ ...settings });
    }, []);
};
