import type { FC } from 'react';
import { Apps } from '../../components/apps';

export const MainPage: FC = () => {
    return (
        <div>
            <Apps />
            {/*<VpnApp />*/}
        </div>
    );
};
