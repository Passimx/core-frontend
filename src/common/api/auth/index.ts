import { Api, IData } from '../index.ts';
import { LoginRequest, LoginResponse, UserResponse } from '../../types/api/user.ts';

export const login = (body: LoginRequest): Promise<IData<LoginResponse>> => {
    return Api<LoginResponse>('/login-by-telegram', { method: 'POST', body });
};

export const getUserMe = (): Promise<IData<UserResponse>> => {
    return Api<UserResponse>('/users/me', { method: 'GET' });
};
