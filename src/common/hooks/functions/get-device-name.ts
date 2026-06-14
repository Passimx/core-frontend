export const getDeviceName = (userAgent: string) => {
    if (userAgent.indexOf('Android') > -1) return 'Android';
    if (userAgent.indexOf('iPhone') > -1) return 'iPhone';
    if (userAgent.indexOf('iPad') > -1) return 'iPad';
    if (userAgent.indexOf('iPod') > -1) return 'iPod';
    if (userAgent.indexOf('Mobi') > -1) return 'Mobile';
    if (userAgent.indexOf('YaBrowser') > -1) return 'Yandex Browser';
    if (userAgent.indexOf('Chrome') > -1) return 'Google Chrome';
    if (userAgent.indexOf('Firefox') > -1) return 'Mozilla Firefox';
    if (userAgent.indexOf('Safari') > -1) return 'Safari';
    if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) return 'Opera';
    if (userAgent.indexOf('Edg') > -1) return 'Microsoft Edge';
    if (userAgent.indexOf('Trident') > -1) return 'Internet Explorer';
    return 'Browser';
};
