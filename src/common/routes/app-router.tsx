import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import type { FC } from 'react';
import { App } from '../components/app';
import { MainPage } from '../pages/main';

const router = createBrowserRouter([
    {
        element: (
            <App>
                <Outlet />
            </App>
        ),
        children: [
            {
                path: '*',
                element: <MainPage />,
            },
        ],
    },
]);

const AppRouter: FC = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
