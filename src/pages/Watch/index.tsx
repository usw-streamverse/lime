import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Hls from 'hls.js'
import React, { ReactEventHandler, ReactNode, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Video from 'apis/Video';
import { AxiosError } from 'axios';
import { getKSTfromUTC, getTimeFormat } from 'utils/Time';
import { MdThumbUp } from 'react-icons/md';

const Watch = () => {
    const navigate = useNavigate();
    const id = useParams()['id'];
    const videoRef = useRef<HTMLVideoElement>(null);
    const [like, setLike] = useState<boolean>(false);

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
            <>
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
                        <ChannelInfo.Subscribe onClick={() => alert('not supported yet')}>구독</ChannelInfo.Subscribe>
                    </ChannelInfo.Container>
                    <ChannelInfo.ButtonContainer>
                        <Like active={data?.data.like} />
                    </ChannelInfo.ButtonContainer>
                </ChannelInfo>
                <Body>{data?.data.explanation}</Body>
            </>
            }
        </Container>
    )
}

const LikeButton = styled.button<{active: boolean}>`
    border: 0;
    background-color: transparent;
    color: var(${(props) => props.active ? '--blue' : '--gray'});
    cursor: pointer;
    transition: all 150ms ease;
    :hover {
       color: var(--blue);
    }
`

interface LikeProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active: boolean
}

const Like = (props: LikeProps) => {
    return (
        <LikeButton {...props}>
            <MdThumbUp size={32} />
        </LikeButton>
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

ChannelInfo.Subscribe =styled.button`
    margin-left: 1.0rem;
    padding: 0.5rem;
    background-color: #000;
    border: 0;
    border-radius: 0.25rem;
    color: #fff;
    font-size: 1.0rem;
    font-weight: 400;
    cursor: pointer;
    @media screen and (max-width: 480px) {
        position: absolute;
        right: 0;
    }
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
        margin-top: 1.0rem;
    }
`

export default Watch;