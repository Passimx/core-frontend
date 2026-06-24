import { FC, memo, useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { PropsType } from './types/props.type.ts';
import { RotateLoading } from '../rotate-loading';

function setupHiDPICanvas(canvas: HTMLCanvasElement, width: number, height: number) {
    const ratio = window.devicePixelRatio || 2;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    canvas.style.width = '100%';
    canvas.style.height = 'auto';

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.scale(ratio, ratio);
    return ctx;
}

export const QrCodeImage: FC<PropsType> = memo(({ url }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [parentSize, setParentSize] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const width = entry.contentRect.width;
                if (width > 0) {
                    setParentSize(width);
                }
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        setIsLoading(!url);
    }, [url]);

    useEffect(() => {
        if (!canvasRef.current || parentSize === 0 || !url) {
            canvasRef.current = null;
            return;
        }

        let isCancelled = false;

        const canvas = canvasRef.current;
        const ctx = setupHiDPICanvas(canvas, parentSize, parentSize);

        if (!ctx) return;

        const qrCanvas = document.createElement('canvas');

        QRCode.toCanvas(qrCanvas, url, {
            errorCorrectionLevel: 'H',
            width: parentSize,
            margin: 0,
            color: {
                light: '#ffffff',
                dark: '#062846',
            },
        })
            .then(() => {
                if (isCancelled) return;

                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, parentSize, parentSize);

                ctx.drawImage(qrCanvas, 0, 0);

                const logo = new Image();
                logo.src = '/assets/icons/icon.svg';

                logo.onload = () => {
                    if (isCancelled) return;

                    const logoSize = parentSize * 0.25;
                    const logoPosition = (parentSize - logoSize) / 2;
                    const borderRadius = logoSize * 0.25;

                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.roundRect(logoPosition, logoPosition, logoSize, logoSize, borderRadius);
                    ctx.fill();

                    ctx.strokeStyle = '#062846';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.roundRect(logoPosition, logoPosition, logoSize, logoSize, borderRadius);
                    ctx.stroke();

                    ctx.globalAlpha = 1.0;
                    ctx.drawImage(logo, logoPosition, logoPosition, logoSize, logoSize);
                };

                logo.onerror = () => {
                    console.error('Failed to load QR logo');
                };
            })
            .catch((err) => console.error(err));

        return () => {
            isCancelled = true;
        };
    }, [url, parentSize, isLoading]);

    useEffect(() => {
        if (parentSize > 0 && url && isLoading) {
            setIsLoading(false);
        }
    }, [parentSize, url, isLoading]);

    return (
        <div ref={containerRef}>
            {isLoading ? <RotateLoading /> : <canvas ref={canvasRef} style={{ display: 'block' }} />}
        </div>
    );
});
