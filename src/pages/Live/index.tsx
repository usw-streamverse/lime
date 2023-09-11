import { useQuery } from '@tanstack/react-query';
import live from 'apis/Live';
import LiveList from 'components/Live/LiveList';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Live = () => {
    const navigate = useNavigate();
    const list = useQuery(['videoList'], live().list);
    return (
        <Container>
            <a onClick={() => navigate('/broadcast')}>라이브 스트리밍 송출</a>
            <LiveList item={list.status === 'success' ? list.data?.data : []} />
        </Container>
    )
}

const Container = styled.div`
    position: relative;
`

export default Live;