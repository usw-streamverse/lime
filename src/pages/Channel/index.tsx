import styled from 'styled-components';
import { Outlet, useHref, useNavigate, useParams } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from 'api';
import { AxiosError } from 'axios';
import { IoCloudUploadSharp } from 'react-icons/io5';
import Tab from './Tab';

const Channel = () => {
    const userid = useParams()['id'];
    const [page, setPage] = useState<string>(useParams()['page'] || '');
    const url = useHref(`/@/${userid}`);
    const navigate = useNavigate();
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

    useEffect(() => {
        window.history.replaceState(null, page, page === '' ? url : url + '/' + page)
    }, [page, url])

    return (
        <>
            {
            localStorage.userid === userid &&
            <MyMenu>
                <MyMenu.Button onClick={() => navigate('/video/upload')}><IoCloudUploadSharp size={24} />동영상 업로드</MyMenu.Button>
            </MyMenu>
            }
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
            <Tab selected={page}>
                <Tab.Item name="" onClick={() => setPage('')}>홈</Tab.Item>
                <Tab.Item name="playlist" onClick={() => setPage('playlist')}>재생목록</Tab.Item>
                <Tab.Item name="about" onClick={() => setPage('about')}>정보</Tab.Item>
            </Tab>
            <Outlet />
        </>
    )
}

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap : wrap;
    justify-content: flex-end;
    width: 100%;
    padding: 3.0rem;
    @media screen and (max-width: 480px) {
        padding: 2.0rem;
    }
`
const ChannelInfoStyle = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex: 1 1 auto;
    margin-left: 2.0rem;
    @media screen and (max-width: 480px) {
        margin-left: 1.5rem;
    }
`
const ChannelInfo = (props: {children: ReactNode}) => {
    return <ChannelInfoStyle>{props.children}</ChannelInfoStyle>
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

const MyMenuStyle = styled.div`
    padding: 1.0rem 1.0rem 0 0;
    float: right;
`

const MyMenu = (props: {children: ReactNode}) => {
    return <MyMenuStyle>{props.children}</MyMenuStyle>
}

MyMenu.Button = styled.button`
    display: flex;
    align-items: center;
    padding: 0.75rem;
    background-color: #e5e9eb;
    border: 0;
    border-radius: 1.0rem;
    cursor: pointer;
    font-size: 1.125rem;
    font-weight: 600;
    svg {
        margin-right: 0.5rem;
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