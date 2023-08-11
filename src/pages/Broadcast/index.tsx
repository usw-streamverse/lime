import Button from 'components/Button';
import styled from 'styled-components';

const getUserMedia = () => {
    navigator.mediaDevices
    .getDisplayMedia({
        audio: true,
        video: true,
    })
    .then((stream) => {
        console.log(stream);
    })
    .catch((err) => {
        console.log(err);
    });
}

const Broadcast = () => {
    return (
        <Container>
            <Button onClick={getUserMedia} bgColor="blue" bgColorOver="red" color="white">송출화면 선택</Button>
        </Container>
    )
}

const Container = styled.div`

`

export default Broadcast;