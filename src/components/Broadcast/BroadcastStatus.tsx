import { BroadcastFormStateContext } from 'pages/Broadcast';
import { useContext, useEffect, useRef, useState } from 'react';
import { BsClockFill, BsPersonFill } from 'react-icons/bs';
import styled from 'styled-components';
import { getSecondFormat } from 'utils/Time';

const BroadcastStatus = (props: {refVideo: React.RefObject<HTMLVideoElement>}) => {
    const context = useContext(BroadcastFormStateContext);
    const [duration, setDuration] = useState<number>(0);
    const [viewer, setViewer] = useState<number>(0);
    const timerRef = useRef<NodeJS.Timer>();
    useEffect(() => {
        if(!props.refVideo.current) return;
        timerRef.current = setInterval(() => {
            if(props.refVideo.current) setDuration(Math.floor(props.refVideo.current.currentTime));
            setViewer(context.broadcast.viewer);
        }, 100);
        return () => {
            clearInterval(timerRef.current);
        }
    }, [props.refVideo])

    return (
        <Container>
            <Item><BsPersonFill size={16} />{viewer}</Item>
            <Item><BsClockFill size={16} />{getSecondFormat(duration)}</Item>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
`

const Item = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0.5rem;
    font-weight: 400;
    :first-child {
        margin-left: 0;
    }
    :last-child {
        margin-right: 0;
    }
    svg {
        margin-right: 0.25rem;
    }

`

export default BroadcastStatus;