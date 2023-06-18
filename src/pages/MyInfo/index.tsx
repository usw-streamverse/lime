import styled from 'styled-components';
import { Outlet, useHref, useNavigate, useParams } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from 'apis';
import { AxiosError } from 'axios';
import useUserQuery from 'hooks/useUserQuery';

const MyInfo = () => {
    const profile = useUserQuery().Profile();
    /*const { data, status } = useQuery({
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
    });*/

    return (
        <Container>
            <Header>아이디</Header>
            <Body>{profile.data?.userid}</Body>
            <Header>닉네임</Header>
            <Body>{profile.data?.nickname}</Body>
        </Container>
    )
}

const Container = styled.div`
    padding: 1.0rem;
`

const Header = styled.div`
    
`

const Body = styled.div`
    
`


export default MyInfo;