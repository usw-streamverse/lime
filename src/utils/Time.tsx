const Time = () => {
    const getDurationFormat = (time: number): string => {
        return `${Math.floor(time/60)}:${(time%60<10 ? '0' : '') + time%60}`;
    }
    return { getDurationFormat }
}

export default Time;