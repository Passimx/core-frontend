import { Api, IData } from '../index.ts';
import { LoginRequest, UserResponse } from '../../types/api/user.ts';
import { UserStateType } from '../../store/user/types/state.type.ts';

export const login = (body: LoginRequest): Promise<IData<Partial<UserStateType>>> => {
    return Api<Partial<UserStateType>>('/login-by-telegram', { method: 'POST', body });
};

export const getUserMe = (): Promise<IData<UserResponse>> => {
    return Api<UserResponse>('/users/me', { method: 'GET' });
};
