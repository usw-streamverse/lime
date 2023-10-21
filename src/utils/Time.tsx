export const getDurationFormat = (time: number): string => {
  return `${Math.floor(time/60)}:${(time%60<10 ? '0' : '') + time%60}`;
}

export const getKSTfromUTC = (time: string): number => {
  const date = new Date(time);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).getTime();
}

export const getDifferenceTimeFormat = (time: number): string => {
  const date = new Date();
  let diff = date.getTime() - time;
  diff /= 1000;
  if(diff < 60)
    return Math.floor(diff) + '초 전';
  else if(diff < 3600)
    return Math.floor(diff / 60) + '분 전';
  else if(diff < 3600*24)
    return Math.floor(diff / 3600) + '시간 전';
  else if(diff < 3600*24*7)
    return Math.floor(diff / 3600 / 24) + '일 전';
  else if(diff < 3600*24*7*4)
    return Math.floor(diff / 3600 / 24 / 7) + '주 전';
  else if(diff < 3600*24*7*4*12)
    return Math.floor(diff / 3600 / 24 / 7 / 4) + '개월 전';
  else
    return Math.floor(diff / 3600 / 24 / 7 / 4 / 12) + '년 전';
}


export const getTimeFormat = (time: number): string => {
  const date = new Date(time);
  return `${date.getFullYear()}-${('0' + (date.getMonth()+1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
}

export const getSecondFormat = (second: number): string => {
  const date = new Date(0);
  date.setSeconds(second);
  const date_string = date.toISOString();
  return date_string.substring(11,13) === '00' ? date_string.slice(14, 19) : date_string.slice(11, 19);  
}