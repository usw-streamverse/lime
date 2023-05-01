import styled, { keyframes, css } from 'styled-components';
import { useParams } from 'react-router-dom';
import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from 'api';

const Channel = () => {
    const userid = useParams()['id'];
    const { data, status } = useQuery({
        queryKey: ['channel'],
        staleTime: 1000 * 3600,
        retry: false,
        queryFn: () => User().channel(userid || '')
    });

    return (
        <>
        <HeaderContainer>
            <ProfileImage />
            <ChannelInfo>
                <ChannelInfo.Nickname>{data?.data.nickname}</ChannelInfo.Nickname>
                <ChannelInfo.InfoContainer>
                    <ChannelInfo.Id>@{data?.data.userid}</ChannelInfo.Id>
                    <ChannelInfo.Info>구독자 0명 동영상 없음</ChannelInfo.Info>
                </ChannelInfo.InfoContainer>
            </ChannelInfo>
        </HeaderContainer>
        </>
    )
}

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 3.0rem;
`
const ChannelInfo = (props: {children: ReactNode}) => {
    const ChannelInfo = styled.div`
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-left: 2.0rem;
    `
    return <ChannelInfo>{props.children}</ChannelInfo>
}

ChannelInfo.Nickname = styled.div`
    margin-bottom: 0.75rem;
    font-size: 1.5rem;
    font-weight: 400;
`
ChannelInfo.InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 1.125rem;
`

ChannelInfo.Id = styled.div`
    margin-right: 0.5rem;
    color: var(--main-text-color-light);
    font-weight: 600;
`

ChannelInfo.Info = styled.div`
    color: var(--main-text-color-light);
    font-weight: 400;
`


const ProfileImage = styled.div`
    width: 10.0rem;
    height: 10.0rem;
    background-color: #aaa;
    border-radius: 50%;
`

export default Channel;