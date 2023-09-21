import { RefObject, createContext, forwardRef, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaExpand, FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import { getSecondFormat } from 'utils/Time';

const VideoContext = createContext<React.ForwardedRef<HTMLVideoElement>>({} as any);

const Video = forwardRef<HTMLVideoElement>((props: {}, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [controlsVisible, setControlsVisible] = useState<boolean>(true);
    const controlsTimerRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        mouseOutHandler();
    }, [])

    const mouseOutHandler = () => {
        clearTimeout(controlsTimerRef.current);
        controlsTimerRef.current = 
        setTimeout(() => {
            setControlsVisible(false);
        }, 2000);
    }

    return (
        <Container ref={containerRef}>
            <video ref={ref} onClick={(e) => {if(e.currentTarget.paused) e.currentTarget.play(); else e.currentTarget.pause();}}/>
            <VideoContext.Provider value={ref}>
                <Controls visible={controlsVisible} onMouseOver={() => {clearTimeout(controlsTimerRef.current); setControlsVisible(true)}} onMouseOut={mouseOutHandler}>
                    <ProgressBar />
                    <Play />
                    <Volume />
                    <PlayTime />
                    <FullScreen containerRef={containerRef} />
                </Controls>
            </VideoContext.Provider>
        </Container>
    )
});

const Container = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background-color: #000;
    line-height: 0;
    overflow: hidden;
    video {
        width: 100%;
        height: 100%;
    }
`

const Controls = styled.div<{visible: boolean}>`
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.33);
    opacity: ${(props) => props.visible ? 1 : 0};
    transition: opacity 300ms ease;
`

const ProgressBar = () => {
    const videoRef = useContext(VideoContext);
    const downPos = useRef<{active: boolean, x: number}>({active: false, x: 0});
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        if(typeof videoRef !== 'function' && videoRef?.current){
            let videoRefCurrent = videoRef.current;
            const timeHandler = (e: Event) => {
                setProgress((videoRef.current?.currentTime || 0) / (videoRef.current?.duration || 1));
            }

            const moveHandler = (e: MouseEvent) => {
                if(downPos.current.active) {
                    if(!videoRef.current || !isFinite(videoRef.current.duration)) return;
                    const progress = Math.min(1, Math.max(0, (e.screenX - downPos.current.x) / (videoRef.current?.clientWidth || 0)));

                    videoRef.current.currentTime = videoRef.current.duration * progress;
                }
            }

            const upHandler = (e: MouseEvent) => {
                if(e.button === 0)
                    downPos.current.active = false;
            }

            document.addEventListener('mousemove', moveHandler);
            document.addEventListener('mouseup', upHandler);
            videoRefCurrent.addEventListener('timeupdate', timeHandler);

            return () => {
                document.removeEventListener('mousemove', moveHandler);
                document.removeEventListener('mouseup', upHandler);
                videoRefCurrent.removeEventListener('timeupdate', timeHandler);
            }
        }
    }, [videoRef])

    const downHandler = (e: React.MouseEvent) => {
        if(e.button === 0 && typeof videoRef !== 'function' && videoRef?.current) {
            if(!isFinite(videoRef.current.duration)) return;
            downPos.current.active = true;
            downPos.current.x = e.screenX - e.nativeEvent.offsetX;
            
            const progress = Math.min(1, Math.max(0, (e.screenX - downPos.current.x) / (videoRef.current?.clientWidth || 0)));
            videoRef.current.currentTime = videoRef.current.duration * progress;
        }
    }

    return (
        <ProgressBar.Container progress={progress} onMouseDown={(e) => downHandler(e)}/>
    )
}

ProgressBar.Container = styled.div<{progress: number}>`
    position: absolute;
    bottom: 40px;
    width: 100%;
    height: 6px;
    background: linear-gradient(to left, #00d368 50%, rgba(255, 255, 255, 0.66) 50%) right;
    background-size: 200%;
    background-position-x: ${(props) => 200 - props.progress * 100}%;
    cursor: pointer;
    transition: height 150ms ease;
    :hover {
        height: 12px;
    }
    ::after {
        position: absolute;
        top: -12px;
        bottom: 0;
        left: 0;
        right: 0;
        content: '';
    }
`

const Play = () => {
    const videoRef = useContext(VideoContext);
    const [pause, setPause] = useState<boolean>(true);

    const play = () => {
        if(typeof videoRef !== 'function' && videoRef?.current){
            if(videoRef.current?.paused)
                videoRef.current?.play();
            else
                videoRef.current?.pause();
        }
    }

    useEffect(() => {
        if(typeof videoRef !== 'function' && videoRef?.current){
            let videoRefCurrent = videoRef.current;
            const playHandler = (e: Event) => {
                setPause(false);
            }

            const pauseHandler = (e: Event) => {
                setPause(true);
            }

            videoRefCurrent.addEventListener('play', playHandler);
            videoRefCurrent.addEventListener('pause', pauseHandler);

            return () => {
                videoRefCurrent?.removeEventListener('play', playHandler);
                videoRefCurrent?.removeEventListener('pause', pauseHandler);
            }
        }
    }, [videoRef])

    return (
        <Play.Wrapper onClick={play}>
            {pause ? <FaPlay size={20} /> : <FaPause size={20} />}
        </Play.Wrapper>
    )
}

Play.Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-left: 6px;
    color: rgba(255, 255, 255, 0.80);
    cursor: pointer;
    transition: all 150ms ease;
    :hover {
        color: #fff;
    }
`

const Volume = () => {
    const videoRef = useContext(VideoContext);
    const sliderRef = useRef<HTMLInputElement>(null);
    const [mute, setMute] = useState<boolean>(false);

    const setVolume = (value: number) => {
        if(typeof videoRef !== 'function' && videoRef?.current){
            videoRef.current.volume = value / 100;
            videoRef.current.muted = false;
        }
    }
    
    const clickHandler = () => {
        if(typeof videoRef !== 'function' && videoRef?.current){
            videoRef.current.muted = !videoRef.current.muted;
            if(videoRef.current.volume === 0) {
                videoRef.current.muted = false;
                videoRef.current.volume = 1;
                if(typeof sliderRef !== 'function' && sliderRef.current)
                    sliderRef.current.value = '100';
            } else
                setMute(videoRef.current.muted || false);
        }
    }

    useEffect(() => {
        if(typeof videoRef !== 'function' && videoRef?.current){
            let videoRefCurrent = videoRef.current;
            const volumeHandler = (e: Event) => {
                setMute(videoRef.current?.volume === 0 || (videoRef.current?.muted || false));
            }

            videoRefCurrent?.addEventListener('volumechange', volumeHandler);

            return () => {
                videoRefCurrent?.removeEventListener('volumechange', volumeHandler);
            }
        }
    }, [videoRef]);

    return (
        <Volume.Wrapper>
            <Volume.IconWrapper onClick={clickHandler}>
                {mute ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
            </Volume.IconWrapper>
            <Volume.Slider ref={sliderRef} mute={mute} type="range" onChange={(e) => setVolume(parseInt(e.target.value))} className="volume-slider" min="0" max="100" />
        </Volume.Wrapper>
    )
}

Volume.Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 6px;
    color: rgba(255, 255, 255, 0.80);
    cursor: pointer;
    transition: all 150ms ease;
    :hover, :active {
        color: #fff;
        .volume-slider {
            width: 80px;
        }
    }
`

Volume.IconWrapper = styled.div`
    
`

Volume.Slider = styled.input<{mute: boolean}>`
    position: relative;
    width: 0;
    height: 10px;
    margin-left: 6px;
    border-radius: 2px;
    background-color: rgba(180, 180, 180, 0.66);
    appearance: none;
    overflow: hidden;
    cursor: pointer;
    transition: all 150ms ease;
    ::-webkit-slider-thumb {
        appearance: none;
        width: 0;
        height: 0;
        ${(props) => !props.mute && `box-shadow: -100vw 0 0 100vw #fff;`}
        cursor: pointer;
    }
`

const PlayTime = () => {
    const videoRef = useContext(VideoContext);
    const [time, setTime] = useState('00:00 / 00:00');

    useEffect(() => {
        if(typeof videoRef !== 'function' && videoRef?.current){
            let videoRefCurrent = videoRef.current;
            const timeUpdate = () => {
                const duration: number = isFinite(videoRef.current?.duration || NaN) ? (videoRef.current?.duration || 0) : (videoRef.current?.currentTime || 0);
                setTime(`${getSecondFormat(Math.floor(videoRef.current?.currentTime || 0))} / ${getSecondFormat(Math.floor(duration || 0))}`);
            }
            videoRefCurrent.addEventListener('timeupdate', timeUpdate);
            videoRefCurrent.addEventListener('canplay', timeUpdate);
            return () => {
                videoRefCurrent?.removeEventListener('timeupdate', timeUpdate);
                videoRefCurrent?.removeEventListener('canplay', timeUpdate);
            }
        }
    }, [videoRef])

    return (
        <PlayTime.Container>{time}</PlayTime.Container>
    )
}

PlayTime.Container = styled.div`
    color: #fff;
    font-weight: 500;
`

const FullScreen = (props: {containerRef: RefObject<HTMLDivElement>}) => {
    const requestFullScreen = () => {
        if(typeof props.containerRef !== 'function' && props.containerRef.current){
            if(document.fullscreenElement === null)
                props.containerRef.current.requestFullscreen();
            else
                document.exitFullscreen();
        }
    }

    return (
        <FullScreen.Wrapper onClick={requestFullScreen}>
            <FaExpand size={20} />
        </FullScreen.Wrapper>
    )
}

FullScreen.Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    width: 40px;
    height: 40px;
    color: rgba(255, 255, 255, 0.80);
    cursor: pointer;
    transition: all 150ms ease;
    :hover {
        color: #fff;
    }
`

export default Video;