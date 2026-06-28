import { useEffect, useState } from 'react';
import { useAppAction } from '../../../store';
import { EventsEnum } from '../../../types/events/events.enum.ts';
import { logger } from '../../../services/logger.service.ts';
import styles from '../index.module.css';
import { logIn } from '../../../hooks/functions/log-in.ts';

export const useLoadKey = () => {
    const [file, setFile] = useState<File>();
    const { postMessageToBroadCastChannel } = useAppAction();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    useEffect(() => {
        if (!file) return;

        const postError = () => {
            postMessageToBroadCastChannel({ event: EventsEnum.SHOW_TEXT, data: EventsEnum.ERROR });
            setIsLoading(false);
        };

        try {
            const reader = new FileReader();
            reader.readAsText(file);

            reader.onerror = postError;
            reader.onabort = postError;

            reader.onload = async (e) => {
                setIsLoading(true);
                const content = e.target?.result;
                if (typeof content !== 'string' || !content) return postError();

                try {
                    const userData = JSON.parse(content);
                    if (!userData.id || !userData.seedPhrase) return postError();

                    await logIn({ id: userData.id, seedPhrase: userData.seedPhrase });
                    setIsLoading(false);
                } catch (e) {
                    logger.error(e);
                    postError();
                }
            };
        } catch (e) {
            logger.error(e);
            postError();
        }
    }, [file]);

    useEffect(() => {
        const element = document.getElementById(styles.div2);
        if (!element) return;

        const dragover = (e: DragEvent) => {
            setIsDragOver(true);
            e.preventDefault();
        };
        const dragleave = (e: DragEvent) => {
            setIsDragOver(false);
            e.preventDefault();
        };
        const drop = (e: DragEvent) => {
            setIsDragOver(false);
            e.preventDefault();

            const files = e.dataTransfer?.files;
            if (files?.length) setFile(files[0]);
        };

        const click = () =>
            new Promise((resolve) => {
                const input = document.createElement('input');
                input.value = '';
                input.type = 'file';
                input.multiple = true;

                document.body.appendChild(input);

                input.onchange = async (e: Event) => {
                    const target = e.target as HTMLInputElement;
                    const files = target.files;
                    if (!files?.length) {
                        document.body.removeChild(input);
                        return resolve(false);
                    }

                    if (files?.length) setFile(files[0]);
                    document.body.removeChild(input);
                    resolve(true);
                };

                setTimeout(() => {
                    input.click();
                }, 0);
            });

        element.addEventListener('drop', drop);
        element.addEventListener('click', click);
        element.addEventListener('dragover', dragover);
        element.addEventListener('dragleave', dragleave);

        return () => {
            element.removeEventListener('drop', drop);
            element.removeEventListener('click', click);
            element.removeEventListener('dragover', dragover);
            element.removeEventListener('dragleave', dragleave);
        };
    }, []);

    return [isDragOver, isLoading];
};
