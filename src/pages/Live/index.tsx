import { useQuery } from '@tanstack/react-query';
import live from 'apis/Live';
import LiveList from 'components/Live/LiveList';
import Menu from 'components/Menu';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Live = () => {
    const navigate = useNavigate();
    const list = useQuery(['videoList'], live().list);
    return (
        <Container>
            <Menu>
                <Menu.Button onClick={() => navigate('/broadcast')}>라이브 스트리밍 하기</Menu.Button>
            </Menu>
            <LiveList item={list.status === 'success' ? list.data?.data : []} />
        </Container>
    )
}

const Container = styled.div`
    position: relative;
`

export default Live;