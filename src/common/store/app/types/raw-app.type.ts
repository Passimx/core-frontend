export type RawAppType = {
    isMainTab: boolean;
    tabs: number[];
    worker?: Worker;
    serviceWorkerRegistration?: ServiceWorkerRegistration;
};
