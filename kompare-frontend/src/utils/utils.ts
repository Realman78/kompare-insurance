export const isValidDate = (dateStr: string) => {
    try {
        return !isNaN(new Date(dateStr).getTime());
    } catch (_) {
        return false;
    }
};
