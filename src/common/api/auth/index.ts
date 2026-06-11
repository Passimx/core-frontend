import { Api, IData } from '../index.ts';
import {
    CreateAccountRequest,
    CreatePassimXAccountRequest,
    LoginRequest,
    LoginResponse,
    UserResponse,
} from '../../types/api/user.ts';

export const login = (body: LoginRequest): Promise<IData<LoginResponse>> => {
    return Api<LoginResponse>('/login-by-telegram', { method: 'POST', body });
};

export const getUserMe = (): Promise<IData<UserResponse>> => {
    return Api<UserResponse>('/users/me', { method: 'GET' });
};

export const createAccount = (body: CreateAccountRequest): Promise<IData<LoginResponse>> => {
    return Api<LoginResponse>('/create-account', { method: 'POST', body });
};

export const createPassimXAccount = (body: CreatePassimXAccountRequest): Promise<IData<LoginResponse>> => {
    return Api<LoginResponse>('/auth/create', { method: 'POST', body });
};
