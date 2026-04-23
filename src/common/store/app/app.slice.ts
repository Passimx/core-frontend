import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { SettingsType, type StateType } from './types/state.type.ts';
import type { EventsType } from '../../types/events/event-data.type.ts';
import { Envs } from '../../config/envs/envs.ts';

const channel = new BroadcastChannel('ws-channel');

const initialState: StateType = {
    isOnline: navigator.onLine,
    isStandalone: window.matchMedia('(display-mode: standalone)').matches,
};

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        postMessageToBroadCastChannel(_state, { payload }: PayloadAction<EventsType>) {
            channel.postMessage(payload);
        },

        setStateApp(state, { payload }: PayloadAction<Partial<StateType>>) {
            for (const [key, value] of Object.entries(payload) as [keyof StateType, StateType[keyof StateType]][]) {
                state[key] = value as never;
            }
        },

        changeSettings(state, { payload }: PayloadAction<Partial<SettingsType>>) {
            Envs.settings = { ...Envs.settings, ...state.settings, ...payload };
            localStorage.setItem('settings', JSON.stringify(Envs.settings));
            state.settings = Envs.settings as SettingsType;
        },
    },
});

export const AppActions = AppSlice.actions;
export const AppReducers = AppSlice.reducer;
