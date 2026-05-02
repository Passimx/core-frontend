import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStateType } from './types/state.type.ts';

const initialState: Partial<UserStateType> = {};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setStateUser(state, { payload }: PayloadAction<Partial<UserStateType>>) {
            for (const [key, value] of Object.entries(payload) as [
                keyof UserStateType,
                UserStateType[keyof UserStateType],
            ][]) {
                state[key] = value as never;
            }
            localStorage.setItem('user', JSON.stringify(state));
        },

        logout(state) {
            for (const [key] of Object.entries(state) as [keyof UserStateType, UserStateType[keyof UserStateType]][]) {
                state[key] = undefined;
            }
            localStorage.removeItem('user');
        },
    },
});

export const UserActions = UserSlice.actions;
export const UserReducers = UserSlice.reducer;
