import styled from 'styled-components';
import { useHref, useNavigate, useParams } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from 'apis';
import { AxiosError } from 'axios';
import Tab from 'components/Tab';
import VideoList from './VideoList';
import Menu from 'components/Menu';

const Channel = () => {
    const userid = useParams()['id'] || '';
    const [page, setPage] = useState<string>(useParams()['page'] || '');
    const url = useHref(`/@/${userid}`);
    const navigate = useNavigate();
    const { data } = useQuery({
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
        window.history.replaceState(null, page, page === '' ? url : url + '/' + page);
        console.log(page);
    }, [page, url])

    return (
        <Container>
            {
            localStorage.userid === userid &&
            <Menu>
                <Menu.Button onClick={() => navigate('/video/upload')}>동영상 업로드</Menu.Button>
            </Menu>
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
            <Tab selected={{'playlist': 1, 'about': 2}[page] || 0}>
                <Tab.Item index={0} onClick={() => setPage('')}>홈</Tab.Item>
                <Tab.Item index={1} onClick={() => setPage('playlist')}>재생목록</Tab.Item>
                <Tab.Item index={2} onClick={() => setPage('about')}>정보</Tab.Item>
            </Tab>
            {
                (() => {
                    switch(page){
                        case 'playlist':
                        case 'about':
                            return <></>
                        default:
                            return <VideoList id={userid} />
                    }
                })()
            }
        </Container>
    )
}

const Container = styled.div`
    
`

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap : wrap;
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