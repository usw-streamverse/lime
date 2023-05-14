export const getDurationFormat = (time: number): string => {
    return `${Math.floor(time/60)}:${(time%60<10 ? '0' : '') + time%60}`;
}

export const getKSTfromUTC = (time: string): number => {
    const date = new Date(time);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).getTime();
}

export const getTimeFormat = (time: number): string => {
    const date = new Date(time);
    return `${date.getFullYear()}-${('0' + (date.getMonth()+1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
}