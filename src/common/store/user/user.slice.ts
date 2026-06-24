import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { UserStateType } from './types/state.type.ts';
import { upsertAccountIndexDb } from './index-db/hooks.ts';

const initialState: Partial<UserStateType> = {};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setStateUser(state, { payload }: PayloadAction<Partial<UserStateType | null>>) {
            if (payload === null || (payload.id && payload.id !== state.id)) {
                for (const [key] of Object.entries(current(state)) as [
                    keyof UserStateType,
                    UserStateType[keyof UserStateType],
                ][]) {
                    state[key] = undefined;
                }
            }

            if (payload === null) return;

            for (const [key, value] of Object.entries(payload) as [
                keyof UserStateType,
                UserStateType[keyof UserStateType],
            ][]) {
                state[key] = value as never;
            }

            upsertAccountIndexDb(current(state));
        },
    },
});

export const UserActions = UserSlice.actions;
export const UserReducers = UserSlice.reducer;
