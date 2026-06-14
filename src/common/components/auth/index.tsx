import { FC, useEffect } from 'react';
import { ChildrenPropsType } from '../../types/props/children-props.type.ts';
import { useAppAction, useAppSelector } from '../../store';
import { LoginPage } from '../../pages/login';
import { MainPage } from '../../pages/main';
import { TabEnum } from '../../store/app/types/state.type.ts';

export const Auth: FC<ChildrenPropsType> = ({ children }) => {
    const { setStateApp } = useAppAction();
    const userId = useAppSelector((state) => state.user?.id);

    useEffect(() => {
        if (!userId) setStateApp({ pages: new Map([[TabEnum.MAIN, [<LoginPage />]]]) });
        else setStateApp({ pages: new Map([[TabEnum.MAIN, [<MainPage />]]]) });
    }, [userId]);

    return children;
};
