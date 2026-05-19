export const useShortText = (text?: string) => {
    if (!text) return '';
    if (text.length <= 20) return text;
    return text.slice(0, 6) + '...' + text.slice(-6);
};
