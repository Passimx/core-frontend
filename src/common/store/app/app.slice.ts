import { createSlice, current, type PayloadAction } from '@reduxjs/toolkit';
import { AppStateType, SettingsType, TabEnum } from './types/state.type.ts';
import type { EventsType } from '../../types/events/event-data.type.ts';
import { JSX } from 'react';
import { upsertAppIndexDb } from './index-db/hooks.ts';

const channel = new BroadcastChannel('ws-channel');

const initialState: Partial<AppStateType> = {
    activeTab: TabEnum.MAIN,
    isActiveTab: false,
    pages: new Map<TabEnum, JSX.Element[]>([]),
    isStandalone: window.matchMedia('(display-mode: standalone)').matches,
    accounts: [],
};

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        postMessageToBroadCastChannel(_state, { payload }: PayloadAction<EventsType>) {
            channel.postMessage(payload);
        },

        setStateApp(state, { payload }: PayloadAction<Partial<AppStateType>>) {
            for (const [key, value] of Object.entries(payload) as [
                keyof AppStateType,
                AppStateType[keyof AppStateType],
            ][]) {
                if (key === 'settings')
                    state.settings = { ...current(state).settings, ...(value as Partial<SettingsType>) };
                else state[key] = value as never;
            }
            if (state.activeTab && state.isLoadedFromIndexDb) upsertAppIndexDb(current(state));
        },
    },
});

export const AppActions = AppSlice.actions;
export const AppReducers = AppSlice.reducer;
