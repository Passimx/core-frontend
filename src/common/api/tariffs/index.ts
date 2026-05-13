import { Api, IData } from '../index.ts';
import { ExtendKeyBodyType, getTariffsType, TariffsResponse } from '../../types/api/tariffs.ts';
import { UserKeyType } from '../../store/user/types/state.type.ts';

export const getTariffs = (body: getTariffsType): Promise<IData<TariffsResponse[]>> => {
    return Api<TariffsResponse[]>('/tariffs', { method: 'POST', body });
};

export const extendKey = (body: ExtendKeyBodyType): Promise<IData<UserKeyType>> => {
    return Api<UserKeyType>('/extend-key', { method: 'POST', body });
};
