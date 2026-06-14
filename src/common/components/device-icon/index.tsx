import { FC } from 'react';
import styles from './index.module.css';
import { PropsType } from './types/props.type.ts';
import { ImMobile } from 'react-icons/im';
import { FaChrome, FaEdge, FaFirefoxBrowser, FaInternetExplorer, FaOpera, FaSafari, FaYandex } from 'react-icons/fa';
import { IoMdBrowsers } from 'react-icons/io';

export const DeviceIcon: FC<PropsType> = ({ userAgent, className }) => {
    if (userAgent.indexOf('Android') > -1) return <ImMobile className={className} />;
    if (userAgent.indexOf('iPhone') > -1) return <ImMobile className={className} />;
    if (userAgent.indexOf('iPad') > -1) return <ImMobile className={className} />;
    if (userAgent.indexOf('iPod') > -1) return <ImMobile className={className} />;
    if (userAgent.indexOf('Mobi') > -1) return <ImMobile className={className} />;
    if (userAgent.indexOf('Mobi') > -1) return <ImMobile className={className} />;
    if (userAgent.indexOf('YaBrowser') > -1) return <FaYandex className={className} />;
    if (userAgent.indexOf('Chrome') > -1) return <FaChrome className={className} />;
    if (userAgent.indexOf('Firefox') > -1) return <FaFirefoxBrowser className={className} />;
    if (userAgent.indexOf('Safari') > -1) return <FaSafari className={className} />;
    if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) return <FaOpera className={className} />;
    if (userAgent.indexOf('Edg') > -1) return <FaEdge className={className} />;
    if (userAgent.indexOf('Trident') > -1) return <FaInternetExplorer className={className} />;

    return <IoMdBrowsers className={styles.item_logo} />;
};
