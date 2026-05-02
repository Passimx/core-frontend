import { useEffect } from 'react';
import { useAppAction } from '../store';
import { SettingsType } from '../store/app/types/state.type.ts';
import { resources } from './translations/use-translation.ts';
import { Envs } from '../config/envs/envs.ts';
import { UserStateType } from '../store/user/types/state.type.ts';

export const useSettings = () => {
    const { changeSettings, setStateUser } = useAppAction();

    useEffect(() => {
        const payload = localStorage.getItem('settings');
        const payload2 = localStorage.getItem('user');

        const settings: SettingsType = payload ? JSON.parse(payload) : {};
        const user: UserStateType = payload2 ? JSON.parse(payload2) : {};

        if (user.id) setStateUser(user);

        if (!settings.lang) {
            const browserLang = navigator.language.slice(0, 2).toLowerCase();
            const languages: string[] = Object.keys(resources);
            settings.lang = languages.find((lang) => lang === browserLang) ?? 'en';
        }

        Envs.settings = settings;
        changeSettings({ ...settings });
    }, []);
};
