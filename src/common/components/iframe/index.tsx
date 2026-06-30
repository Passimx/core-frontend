import { FC, useState } from 'react';
import { PropsType } from './types/props.type.ts';
import styles from './index.module.css';
import { RotateLoading } from '../rotate-loading';

export const Iframe: FC<PropsType> = ({ src }) => {
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <div className={styles.div0}>
            {loading && (
                <div className={styles.loading}>
                    <RotateLoading />
                </div>
            )}
            <iframe
                src={src}
                className={styles.div0}
                style={loading ? { visibility: 'hidden', height: 0 } : {}}
                onLoad={() => setLoading(false)}
            />
        </div>
    );
};
