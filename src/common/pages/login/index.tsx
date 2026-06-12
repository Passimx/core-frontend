import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { useSetPage } from '../../hooks/use-set-page.hook.ts';
import { PageTitle } from '../../components/page-title';
import { CreateAccountPage } from '../../components/create-account-page';
import iconPassimX from '../../../../public/assets/icons/256.png';
import { Image } from '../../components/image';
import { LoginPassimxAccount } from '../login-passimx-account';

export const LoginPage = () => {
    const { t } = useTranslation();
    const setPage = useSetPage();

    // const loginTelegram = () => setPage(<TelegramLogin />);
    const loginPassimXAccount = () => setPage(<LoginPassimxAccount />);
    const createAccount = () => setPage(<CreateAccountPage />);

    return (
        <div className={styles.background1}>
            <PageTitle title={t('login_to_PassimX')} />
            <div className={styles.background3}>
                {/*<div className={styles.background31} onClick={loginTelegram}>*/}
                {/*    <FaTelegramPlane />*/}
                {/*    <div>{t('login_by_telegram')}</div>*/}
                {/*</div>*/}
                {/*<div></div>*/}
                <div className={styles.background31} onClick={loginPassimXAccount}>
                    <Image src={iconPassimX} className={styles.background32} />
                    <div>{t('passimx_account')}</div>
                </div>
                <div className={styles.background31} onClick={createAccount}>
                    <Image src={iconPassimX} className={styles.background32} />
                    <div>{t('create_by_passimx')}</div>
                </div>
            </div>
        </div>
    );
};
