import { useAppAction, useAppSelector } from '../store';
import { useEffect } from 'react';
import { getUserMe } from '../api/auth';

export const useUpdateUser = () => {
    const time = 1000 * 10;
    const { token, updatedAt } = useAppSelector((state) => state.user);
    const { setStateUser } = useAppAction();

    const updateUserInf = async () => {
        const payload = await getUserMe();
        if (!payload.success) return;
        const { balance, id, keys } = payload.data;

        setStateUser({
            id,
            balance,
            keys,
            updatedAt: Date.now(),
        });
    };

    useEffect(() => {
        if (!token) return;
        if (updatedAt && Date.now() - updatedAt < time) {
            setTimeout(updateUserInf, time);
            return;
        }

        updateUserInf();
    }, [token, updatedAt]);
};
