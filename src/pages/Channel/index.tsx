import styled, { keyframes, css } from 'styled-components';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from 'api';
import { AxiosError } from 'axios';
import Tab from './Tab';

const Channel = () => {
    const navigate = useNavigate();
    const userid = useParams()['id'];
    const { data, status } = useQuery({
        queryKey: ['channel'],
        staleTime: 0,
        retry: false,
        queryFn: () => User().channel(userid || ''),
        onError: (error: AxiosError) => {
            switch(error.response?.status){
                case 404:
                    //navigate('/404');
                    break;
            }
        }
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
            <Tab>
                <Tab.Item>홈</Tab.Item>
                <Tab.Item>재생목록</Tab.Item>
                <Tab.Item>정보</Tab.Item>
            </Tab>
        </>
    )
}

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 3.0rem;
    @media screen and (max-width: 480px) {
        padding: 2.0rem;
    }
`
const ChannelInfo = (props: {children: ReactNode}) => {
    const ChannelInfo = styled.div`
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-left: 2.0rem;
        @media screen and (max-width: 480px) {
            margin-left: 1.5rem;
        }
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
    @media screen and (max-width: 480px) {
        flex-direction: column;
    }
`

ChannelInfo.Id = styled.div`
    margin-right: 0.5rem;
    color: var(--main-text-color-light);
    font-weight: 600;
`

ChannelInfo.Info = styled.div`
    color: var(--main-text-color-light);
    font-weight: 400;
    @media screen and (max-width: 480px) {
        margin-top: 0.25rem;
    }
`


const ProfileImage = styled.div`
    width: 10.0rem;
    height: 10.0rem;
    background-color: #aaa;
    border-radius: 50%;

    @media screen and (max-width: 768px) {
        width: 6.0rem;
        height: 6.0rem;
    }
`

export default Channel;