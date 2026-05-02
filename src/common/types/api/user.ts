import { UserKeyType } from '../../store/user/types/state.type.ts';

export type LoginResponse = {
    token: string;
};

export type LoginRequest = {
    key: string;
};

export type UserResponse = {
    id: string;
    balance: number;
    keys: UserKeyType[];
};
