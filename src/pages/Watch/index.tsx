import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Hls from 'hls.js'
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Video from 'apis/Video';
import { AxiosError, AxiosResponse } from 'axios';
import { getKSTfromUTC, getTimeFormat } from 'utils/Time';
import { VscBell, VscHeart, VscHeartFilled } from 'react-icons/vsc'

const VideoContext = createContext<string>('');

const Watch = () => {
    const navigate = useNavigate();
    const id = useParams()['id'];
    const videoRef = useRef<HTMLVideoElement>(null);

    const { data, status } = useQuery({
        queryKey: ['watch'],
        staleTime: 0,
        retry: false,
        queryFn: () => Video().watch(id || ''),
        onError: (error: AxiosError) => {
            console.log(error.response?.status);
            switch(error.response?.status){
                case 404:
                    navigate('/404');
                    break;
            }
        }
    });

    useEffect(() => {
        if(videoRef.current && status === 'success'){
            const hls = new Hls();
            hls.loadSource(JSON.parse(data?.data.url).m3u8);
            
            hls.attachMedia(videoRef.current);
        }
    }, [videoRef, status, data]);

    
    return (
        <Container>
            {status === 'success' &&
                <VideoContext.Provider value={id || ''}>
                    <VideoPlayer ref={videoRef} onClick={() => videoRef.current?.play()} controls />
                    <Title>{data?.data.title}</Title>
                    <Date>{getTimeFormat(getKSTfromUTC(data?.data.created))}</Date>
                    <ChannelInfo>
                        <ChannelInfo.Container>
                            <ChannelInfo.ProfileIcon />
                            <ChannelInfo.Detail>
                                <ChannelInfo.Name>{data?.data.nickname}</ChannelInfo.Name>
                                <ChannelInfo.Readership>구독자 0명</ChannelInfo.Readership>
                            </ChannelInfo.Detail>
                        </ChannelInfo.Container>
                        <ChannelInfo.ButtonContainer>
                            <Subscribe />
                            <Like active={data?.data.like} />
                        </ChannelInfo.ButtonContainer>
                    </ChannelInfo>
                    <Body>{data?.data.explanation}</Body>
                </VideoContext.Provider>
            }
        </Container>
    )
}


const ButtonContainer = styled.div<{active?: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0.25rem;
    padding: 0.625rem;
    border-radius: 0.5rem;
    color: var(${(props) => props.active ? '--blue' : '--gray'});
    cursor: pointer;
    transition: all 150ms ease;
    
    :hover {
        background-color: rgb(170, 170, 170, 0.15);
    }
    :active {
        background-color: rgb(170, 170, 170, 0.3);
    }
`
 

const ButtonIcon = styled.div`
    
`

const ButtonName = styled.div`
    margin-top: 0.25rem;
    color: var(--main-text-color);
    font-weight: 500;
`

const Subscribe = () => {
    const videoId = useContext(VideoContext);

    return (
        <ButtonContainer>
            <ButtonIcon><VscBell size={32} /></ButtonIcon>
            <ButtonName>구독</ButtonName>
        </ButtonContainer>
    )
}

const Like = (props: {active: boolean}) => {
    const videoId = useContext(VideoContext);
    const [active, setActive] = useState<boolean>(props.active);
    const { mutate } = useMutation<AxiosResponse<{active: boolean}>, AxiosError<{active: boolean}>, {id: string}>(Video().like, {
        onSuccess: (data) => {
            setActive(data.data.active);
        },
        onError: (error) => {
            alert(error.response?.status);
        }
    });
    return (
        <ButtonContainer active={active} onClick={() => mutate({id: videoId})}>
            <ButtonIcon>{active ? <VscHeartFilled size={32} /> : <VscHeart size={32} />}</ButtonIcon>
            <ButtonName>좋아요</ButtonName>
        </ButtonContainer>
    )
}

const Container = styled.div`
    padding: 1.25rem;
`

const VideoPlayer = styled.video`
    width: 100%;
`

const Title = styled.div`
    margin-top: 1.5rem;
    font-size: 1.875rem;
`

const Date = styled.div`
    margin-top: 0.5rem;
    color: var(--main-text-color-light);
    font-weight: 400;
`

const Body = styled.div`
    padding: 1.0rem;
    background-color: rgb(232, 232, 232);
    border-radius: 0.75rem;
    font-weight: 600;
`

const ChannelInfoStyle = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    margin: 1.75rem 0;
`

const ChannelInfo = (props: {children: ReactNode}) => {
    return <ChannelInfoStyle>{props.children}</ChannelInfoStyle>
}

ChannelInfo.Detail = styled.div`
    width: 13.0rem;
    
`

ChannelInfo.Name = styled.div`
    font-weight: 400;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
`

ChannelInfo.Readership = styled.div`
    color: var(--main-text-color-light);
    font-weight: 400;   
`

ChannelInfo.ProfileIcon = styled.div`
    width: 32px;
    height: 32px;
    margin-right: 8px;
    background-color: #a0a0a0;
    border-radius: 50%;
`

ChannelInfo.Container = styled.div`
    display: flex;
`

ChannelInfo.ButtonContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
    @media screen and (max-width: 480px) {
        flex: 1 0 100%;
        justify-content: center;
        margin-top: 1.0rem;
    }
`

export default Watch;