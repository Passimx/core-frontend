import { Api, IData } from '../index.ts';
import {
    CreateKeyBodyType,
    ExtendKeyBodyType,
    getTariffsType,
    KeyIdBodyType,
    TariffsResponse,
} from '../../types/api/tariffs.ts';
import { UserResponse } from '../../types/api/user.ts';

export const getTariffs = (body: getTariffsType): Promise<IData<TariffsResponse[]>> => {
    return Api<TariffsResponse[]>('/tariffs', { method: 'POST', body });
};

export const extendKey = (body: ExtendKeyBodyType): Promise<IData<UserResponse>> => {
    return Api<UserResponse>('/extend-key', { method: 'POST', body });
};

export const createKey = (body: CreateKeyBodyType): Promise<IData<UserResponse>> => {
    return Api<UserResponse>('/create-key', { method: 'POST', body });
};

export const deleteKey = (body: KeyIdBodyType): Promise<IData<UserResponse>> => {
    return Api<UserResponse>('/delete-key', { method: 'POST', body });
};

export const changeAutoRenewKey = (body: KeyIdBodyType): Promise<IData<UserResponse>> => {
    return Api<UserResponse>('/change-auto-renew', { method: 'POST', body });
};
