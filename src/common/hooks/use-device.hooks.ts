import { useIsIos } from './use-is-ios.hook.ts';
import { useIsPhone } from './use-is-phone.hook.ts';
import { useOnline } from './use-online.ts';
import { useRegisterServiceWorkerWorker } from './use-register-service-worker.hook.ts';
import { useGetPermissions } from './use-get-permissions.hook.ts';

export const useDevice = () => {
    useIsIos();
    useOnline();
    useIsPhone();
    useGetPermissions();
    useRegisterServiceWorkerWorker();
};
