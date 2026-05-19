import { Api, IData } from '../index.ts';
import { RatingUserType } from '../../types/api/rating.ts';

export const getRefRating = (): Promise<IData<RatingUserType>> => {
    return Api<RatingUserType>('/ref-info', { method: 'GET' });
};
