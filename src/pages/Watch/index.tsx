import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Hls from 'hls.js'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Video from 'apis/Video';
import { AxiosError, AxiosResponse } from 'axios';
import { getDifferenceTimeFormat, getKSTfromUTC } from 'utils/Time';
import ChannelInfo from './ChannelInfo';
import VideoPlayer from 'components/Video';
import Comment from 'components/Comment/Comment';
import WatchSkeleton from './Skeleton';
import Channel from 'apis/Channel';
import PlayList from 'components/Modal/PlayList';
import { BsCollectionPlay, BsHeart, BsHeartFill, BsShare, BsStar, BsStarFill } from 'react-icons/bs';
import { OverlayContext } from 'components/Overlay';

export const VideoContext = createContext<string>('');

const Watch = (props: {id?: string}) => {
    const navigate = useNavigate();
    const paramId = useParams()['id'];
    const id = props.id || paramId;
    const videoRef = useRef<HTMLVideoElement>(null);
    const { isFetchedAfterMount, data, status } = useQuery({
        queryKey: ['video'],
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
            videoRef.current.poster = data?.data.thumbnail;
        }
    }, [videoRef, status, data]);

    if(isFetchedAfterMount && status === 'success')
        return (
            <Container>
                <VideoContext.Provider value={id || ''}>
                    <VideoWrapper><VideoPlayer ref={videoRef} /></VideoWrapper>
                    <Title>{data?.data.title}</Title>
                    <Date>조회수 {data?.data.view_count}회 · {getDifferenceTimeFormat(getKSTfromUTC(data?.data.created))}</Date>
                    <Body text={data?.data.explanation} />
                    <ChannelInfo>
                        <ChannelInfo.Container>
                            <ChannelInfo.ProfileIcon profileColor={data.data.profile} />
                            <ChannelInfo.Detail>
                                <ChannelInfo.Name>{data?.data.nickname}</ChannelInfo.Name>
                                <ChannelInfo.Readership>구독자 0명</ChannelInfo.Readership>
                            </ChannelInfo.Detail>
                        </ChannelInfo.Container>
                        <ChannelInfo.ButtonListContainer>
                            <Subscribe active={data?.data.subscribe} channelId={data?.data.channel_id} />
                            <Like active={data?.data.like} />
                            <Share />
                            <AddPlayList id={id || ''} />
                        </ChannelInfo.ButtonListContainer>
                    </ChannelInfo>
                    <Comment id={id || ''} />
                </VideoContext.Provider>
            </Container>
        )
    else
        return (
            <Container>
                <WatchSkeleton />
            </Container>
        )
}

const Subscribe = (props: {active: boolean, channelId: number}) => {
    const [active, setActive] = useState<boolean>(props.active);
    const { mutate } = useMutation<AxiosResponse<{active: boolean}>, AxiosError<{active: boolean}>, {id: number}>(Channel().subscribe, {
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
        <ChannelInfo.ButtonContainer active={active} onClick={() => mutate({id: props.channelId})}>
            <ChannelInfo.IconWrapper size={24}>
                <ChannelInfo.ButtonIcon show={active}>
                    <BsStarFill size={24} />
                </ChannelInfo.ButtonIcon>
                <ChannelInfo.ButtonIcon show={!active}>
                    <BsStar size={24} />
                </ChannelInfo.ButtonIcon>
            </ChannelInfo.IconWrapper>
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
            <ChannelInfo.IconWrapper size={24}>
                <ChannelInfo.ButtonIcon show={active}>
                    <BsHeartFill size={24} />
                </ChannelInfo.ButtonIcon>
                <ChannelInfo.ButtonIcon show={!active}>
                    <BsHeart size={24} />
                </ChannelInfo.ButtonIcon>
            </ChannelInfo.IconWrapper>
            <ChannelInfo.ButtonName>좋아요</ChannelInfo.ButtonName>
        </ChannelInfo.ButtonContainer>
    )
}

const Share = () => {
    return (
        <ChannelInfo.ButtonContainer>
            <ChannelInfo.IconWrapper size={24}>
                <ChannelInfo.ButtonIcon show={true}>
                    <BsShare style={{color: 'var(--main-text-color)'}} size={24} />
                </ChannelInfo.ButtonIcon>
            </ChannelInfo.IconWrapper>
            <ChannelInfo.ButtonName>공유</ChannelInfo.ButtonName>
        </ChannelInfo.ButtonContainer>
    )
}

const AddPlayList = (props: {id: string}) => {
    const id = props.id;
    const overlayContext = useContext(OverlayContext);

    useEffect(() => {
        if(id)
            overlayContext.push(<VideoContext.Provider value={id}><PlayList /></VideoContext.Provider>, 'PlayList')

        return () => {
            if(id)
                overlayContext.hide('PlayList');
        }
    }, [id]);

    return (
        <>
            <ChannelInfo.ButtonContainer onClick={() => overlayContext.show('PlayList')}>
                <ChannelInfo.IconWrapper size={24}>
                    <ChannelInfo.ButtonIcon show={true}>
                        <BsCollectionPlay style={{color: 'var(--main-text-color)'}} size={24} />
                    </ChannelInfo.ButtonIcon>
                </ChannelInfo.IconWrapper>
                <ChannelInfo.ButtonName>재생목록</ChannelInfo.ButtonName>
            </ChannelInfo.ButtonContainer>
        </>
    )
}

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    background-color: var(--main-bg-color);
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`

const VideoWrapper = styled.div`
    margin: 1.25rem;
    @media screen and (max-width: 480px) {
        position: sticky;
        top: 0;
        z-index: 97;
        margin: 0;
    }
`

const Title = styled.div`
    margin-top: 1.5rem;
    padding: 0 1.25rem;
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
    margin: 1.5rem 1.0rem 0 1.0rem;
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
    margin: 0.5rem 1.25rem;
    color: var(--main-text-color-light);
    font-weight: 400;
`

export default Watch;