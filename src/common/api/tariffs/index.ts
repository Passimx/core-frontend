import { Api, IData } from '../index.ts';
import {
    CreateKeyBodyType,
    DeleteKeyBodyType,
    ExtendKeyBodyType,
    getTariffsType,
    TariffsResponse,
} from '../../types/api/tariffs.ts';
import { UserKeyType } from '../../store/user/types/state.type.ts';

export const getTariffs = (body: getTariffsType): Promise<IData<TariffsResponse[]>> => {
    return Api<TariffsResponse[]>('/tariffs', { method: 'POST', body });
};

export const extendKey = (body: ExtendKeyBodyType): Promise<IData<UserKeyType>> => {
    return Api<UserKeyType>('/extend-key', { method: 'POST', body });
};

export const createKey = (body: CreateKeyBodyType): Promise<IData<UserKeyType>> => {
    return Api<UserKeyType>('/create-key', { method: 'POST', body });
};

export const deleteKey = (body: DeleteKeyBodyType): Promise<IData<boolean>> => {
    return Api<boolean>('/delete-key', { method: 'POST', body });
};
