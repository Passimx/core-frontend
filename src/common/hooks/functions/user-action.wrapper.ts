export const userActionWrapper = (func: (...args: unknown[]) => unknown) => {
    const onClick = () => {
        window.removeEventListener('click', onClick);
        func();
    };

    window.addEventListener('click', onClick);
};
