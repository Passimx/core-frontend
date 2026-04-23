import { bindActionCreators, configureStore } from '@reduxjs/toolkit';
import { AppActions, AppReducers } from './app/app.slice.ts';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        app: AppReducers,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).prepend(),
});

type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const actions = {
    ...AppActions,
};

export const useAppAction = () => {
    const dispatch = useDispatch<AppDispatch>();
    return bindActionCreators(actions, dispatch);
};
