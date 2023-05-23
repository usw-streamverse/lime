import styled, { keyframes } from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading = () => {
    return (
        <Container>
            <AiOutlineLoading3Quarters size={48} />
        </Container>
    )
}

const rotate = keyframes`
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
`

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    svg {
        margin: 1.0rem;
        color: #3d94ef;
        animation: 1s ${rotate} linear infinite;
    }
`

export default Loading;