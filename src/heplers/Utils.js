export const getUTCPlus7DateFormatted = () => {
        const now = new Date();

        const utcPlus7 = new Date(now.getTime() + 7 * 60 * 60 * 1000);

        const day = String(utcPlus7.getUTCDate()).padStart(2, '0');
        const month = String(utcPlus7.getUTCMonth() + 1).padStart(2, '0');
        const year = utcPlus7.getUTCFullYear();

        return `${day}.${month}.${year}`;
    }