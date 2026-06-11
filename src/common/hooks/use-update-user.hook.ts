export const useUpdateUser = () => {
    // const time = 1000 * 10;
    // const { token, updatedAt } = useAppSelector((state) => state.user);
    // const { setStateUser, changeSettings } = useAppAction();
    //
    // const updateUserInf = async () => {
    //     const payload = await getUserMe();
    //     if (!payload.success) return;
    //     const { balanceAccount, id, keys } = payload.data;
    //
    //     setStateUser({
    //         id,
    //         balanceAccount,
    //         keys,
    //         updatedAt: Date.now(),
    //     });
    //
    //     const payload2 = await getCurrencyPrice();
    //     if (payload2.success) changeSettings({ currencyPrice: payload2.data });
    // };
    //
    // useEffect(() => {
    //     if (!token) return;
    //     if (updatedAt && Date.now() - updatedAt < time) {
    //         setTimeout(updateUserInf, time);
    //         return;
    //     }
    //
    //     updateUserInf();
    // }, [token, updatedAt]);
};
