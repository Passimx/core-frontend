import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {type StateType} from './types/state.type.ts';
import type {EventsType} from "../../types/events/event-data.type.ts";

const channel = new BroadcastChannel('ws-channel');

const initialState: StateType = {
    isOnline: navigator.onLine,
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
    },
});

export const AppActions = AppSlice.actions;
export const AppReducers = AppSlice.reducer;
