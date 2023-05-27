import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Hls from 'hls.js'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Video from 'apis/Video';
import { AxiosError, AxiosResponse } from 'axios';
import { getDifferenceTimeFormat, getKSTfromUTC } from 'utils/Time';
import { VscBell, VscHeart, VscHeartFilled } from 'react-icons/vsc'
import ChannelInfo from './ChannelInfo';
import Loading from 'components/Loading';
import VideoPlayer from 'components/Video';

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

    if(isFetchedAfterMount && status === 'success')
        return (
            <Container>
                <VideoContext.Provider value={id || ''}>
                    <VideoWrapper><VideoPlayer ref={videoRef} /></VideoWrapper>
                    <InnerContainer>
                        <Title>{data?.data.title}</Title>
                        <Date>조회수 {data?.data.views}회 · {getDifferenceTimeFormat(getKSTfromUTC(data?.data.created))}</Date>
                        <Body text={data?.data.explanation} />
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
                    </InnerContainer>
                </VideoContext.Provider>
            </Container>
        )
    else
        return (
            <>
                <Loading />
            </>
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
    position: relative;
    width: 100%;
    height: 100%;
    padding: 1.25rem;
    background-color: var(--main-bg-color);
    overflow-x: auto;
    @media screen and (max-width: 480px) {
        padding: 0;
    }
`

const InnerContainer = styled.div`
    @media screen and (max-width: 480px) {
        padding: 1.25rem;
        padding-top: 0;
    }
`

const VideoWrapper = styled.div`
    @media screen and (max-width: 480px) {
        position: sticky;
        top: 0;
        z-index: 97;
    }
`

const Title = styled.div`
    margin-top: 1.5rem;
    font-size: 1.875rem;
`

const Body = (props: {text: string}) => {
    const BodyRef = useRef<HTMLDivElement>(null);
    const [full, setFull] = useState<number>(props.text.split('\n').length > 1 ? 1 : 0); 
    useEffect(() => {
        if(full === 0 && BodyRef.current && BodyRef.current.offsetWidth < BodyRef.current.scrollWidth){
            setFull(1);
        }
    }, [BodyRef, full])

    return (
        <Body.Container>
            <Body.Wrapper ref={BodyRef} full={full === 2}>
                {props.text.split('\n').map((i, idx) => {
                    if(full === 1 && idx > 0)
                        return <React.Fragment key={idx}></React.Fragment>
                    else
                        return <React.Fragment key={idx}>{i}<br /></React.Fragment>
                })}
            </Body.Wrapper>
            {full === 1 && <Body.FullText onClick={() => setFull(2)}>더 보기</Body.FullText>}
        </Body.Container>
    )
}

Body.Container = styled.div`
    position: relative;
    margin-top: 1.5rem;
    padding: 1.0rem;
    border-radius: 0.5rem;
    background-color: var(--watch-body-bg-color);
    line-height: 1.5rem;
`

Body.Wrapper = styled.div<{full: boolean}>`
    font-weight: 500;
    word-break: break-all;
    ${(props) => !props.full && `
        width: calc(100% - 4.0rem);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden; 
    `}
`

Body.FullText = styled.div`
    position: absolute;
    top: 1.0rem; right: 1.0rem;
    font-weight: 500;
    text-align: right;
    cursor: pointer;
`

const Date = styled.div`
    margin: 0.5rem 0;
    color: var(--main-text-color-light);
    font-weight: 400;
`

export default Watch;