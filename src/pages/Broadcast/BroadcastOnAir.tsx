import Button from 'components/Button';
import FormTextBox from 'components/FormTextBox';
import VideoContainer from 'components/VideoContainer';
import { useContext, useEffect, useRef } from 'react';
import { BsCheck } from 'react-icons/bs';
import styled from 'styled-components';
import { BroadcastFormStateContext } from '.';

const BroadcastOnAir = () => {
    const refVideo = useRef<HTMLVideoElement>(null);
    const context = useContext(BroadcastFormStateContext);

    useEffect(() => {
        context.broadcast.setVideo(refVideo);
    }, []);

    return (
        <Container>
            <Head>
                <FormTextBox placeholder="라이브 스트리밍 제목" />
                <ButtonWrapper>
                    <Button color="var(--navbar-menu-text-color-active)" bgColor="var(--navbar-bg-color)" bgColorOver="var(--navbar-menu-hover)"><BsCheck size={32} /></Button>
                </ButtonWrapper>
            </Head>
            <Body>
                <VideoContainer>
                    <VideoContainer.Text>방송 송출화면 미리보기</VideoContainer.Text>
                    <video width="100%" height="100%" ref={refVideo} muted>
                        <source />
                    </video>
                </VideoContainer>
            </Body>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    padding: 1.0rem;
`

const Head = styled.div`
    display: flex;
    align-items: center;
`

const ButtonWrapper = styled.div`
    position: relative;
    margin-left: 1.0rem;
    > button {
        width: 6.0rem;
        padding: 0.5rem;
    }
`

const Body = styled.div`
    margin-top: 1.0rem;
`

export default BroadcastOnAir;