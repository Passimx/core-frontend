import { Api, IData } from '../index.ts';
import { CreateAccountRequest, CreatePassimXAccountRequest, LoginRequest, UserResponse } from '../../types/api/user.ts';
import { UserStateType } from '../../store/user/types/state.type.ts';

export const login = (body: LoginRequest): Promise<IData<Partial<UserStateType>>> => {
    return Api<Partial<UserStateType>>('/login-by-telegram', { method: 'POST', body });
};

export const getUserMe = (): Promise<IData<UserResponse>> => {
    return Api<UserResponse>('/users/me', { method: 'GET' });
};

export const createAccount = (body: CreateAccountRequest): Promise<IData<Partial<UserStateType>>> => {
    return Api<Partial<UserStateType>>('/create-account', { method: 'POST', body });
};

export const createPassimXAccount = (body: CreatePassimXAccountRequest): Promise<IData<Partial<UserStateType>>> => {
    return Api<Partial<UserStateType>>('/auth/create', { method: 'POST', body });
};
