import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Hls from 'hls.js'
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Video from 'apis/Video';
import { AxiosError, AxiosResponse } from 'axios';
import { getDifferenceTimeFormat, getKSTfromUTC } from 'utils/Time';
import { VscBell, VscHeart, VscHeartFilled } from 'react-icons/vsc'
import ChannelInfo from './ChannelInfo';

const VideoContext = createContext<string>('');

const Watch = () => {
    const navigate = useNavigate();
    const id = useParams()['id'];
    const videoRef = useRef<HTMLVideoElement>(null);

    const { isFetchedAfterMount, data, status } = useQuery({
        queryKey: ['watch'],
        staleTime: 0,
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
            {isFetchedAfterMount && status === 'success' &&
                <VideoContext.Provider value={id || ''}>
                    <VideoPlayer ref={videoRef} onClick={() => videoRef.current?.play()} controls />
                    <Title>{data?.data.title}</Title>
                    <Date>조회수 {data?.data.views}회 · {getDifferenceTimeFormat(getKSTfromUTC(data?.data.created))}</Date>
                    <ChannelInfo>
                        <ChannelInfo.Container>
                            <ChannelInfo.ProfileIcon />
                            <ChannelInfo.Detail>
                                <ChannelInfo.Name>{data?.data.nickname}</ChannelInfo.Name>
                                <ChannelInfo.Readership>구독자 0명</ChannelInfo.Readership>
                            </ChannelInfo.Detail>
                        </ChannelInfo.Container>
                        <ChannelInfo.ButtonListContainer>
                            <Subscribe />
                            <Like active={data?.data.like} />
                        </ChannelInfo.ButtonListContainer>
                    </ChannelInfo>
                </VideoContext.Provider>
            }
        </Container>
    )
}

const Subscribe = () => {
    const videoId = useContext(VideoContext);

    return (
        <ChannelInfo.ButtonContainer>
            <ChannelInfo.ButtonIcon><VscBell size={32} /></ChannelInfo.ButtonIcon>
            <ChannelInfo.ButtonName>구독</ChannelInfo.ButtonName>
        </ChannelInfo.ButtonContainer>
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

    useEffect(() => {
        setActive(props.active);
    }, [props.active])

    return (
        <ChannelInfo.ButtonContainer active={active} onClick={() => mutate({id: videoId})}>
            <ChannelInfo.ButtonIcon>{active ? <VscHeartFilled size={32} /> : <VscHeart size={32} />}</ChannelInfo.ButtonIcon>
            <ChannelInfo.ButtonName>좋아요</ChannelInfo.ButtonName>
        </ChannelInfo.ButtonContainer>
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

export default Watch;