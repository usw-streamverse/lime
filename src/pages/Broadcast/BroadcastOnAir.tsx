import Button from 'components/Button';
import FormTextBox from 'components/FormTextBox';
import VideoContainer from 'components/VideoContainer';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BroadcastFormStateContext } from '.';
import BroadcastStatus from 'components/Broadcast/BroadcastStatus';

const BroadcastOnAir = () => {
    const refVideo = useRef<HTMLVideoElement>(null);
    const context = useContext(BroadcastFormStateContext);

    useEffect(() => {
        context.broadcast.setVideo(refVideo);
    }, []);

    return (
        <Container>
            <TitleContainer>
                <FormTextBox placeholder="라이브 스트리밍 제목" />
                <ButtonWrapper>
                    <Button borderColor="var(--sign-textbox-border-color)" color="var(--navbar-menu-text-color-active)" bgColor="var(--button1-bg-color)" bgColorOver="var(--navbar-menu-hover)">제목 변경</Button>
                </ButtonWrapper>
            </TitleContainer>
            <Body>
                <Preview refVideo={refVideo}/>
            </Body>
        </Container>
    )
}

const Preview = (props: {refVideo: React.RefObject<HTMLVideoElement>}) => {
    const [visible, setVisible] = useState<Boolean>(true);

    return (
        <Preview.Container>
            <Preview.VideoWrapper style={{display: visible ? 'block' : 'none'}}>
                <VideoContainer>
                    <VideoContainer.Text>방송 송출화면 미리보기</VideoContainer.Text>
                    <video width="100%" height="100%" ref={props.refVideo} muted>
                        <source />
                    </video>
                </VideoContainer>
            </Preview.VideoWrapper>
            <Preview.Infor>
                <BroadcastStatus refVideo={props.refVideo} />
                <Button onClick={() => setVisible(visible => !visible)} borderColor="var(--button1-border-color)" color="var(--navbar-menu-text-color-active)" bgColor="var(--button1-bg-color)" bgColorOver="var(--navbar-menu-hover)">{visible ? '송출 화면 숨기기' : '송출 화면 표시'}</Button>
            </Preview.Infor>
        </Preview.Container>
    )
}

Preview.Container = styled.div`

`

Preview.VideoWrapper = styled.div`
    margin-bottom: 1.0rem;
`

Preview.Infor = styled.div`
    display: flex;
    justify-content: space-between;
`



const Container = styled.div`
    position: relative;
    padding: 1.5rem;
    margin: 0 auto;
    max-width: 1024px;
`

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
`

const ButtonWrapper = styled.div`
    position: relative;
    margin-left: 1.0rem;
    > button {
        width: 7.0rem;
        height: 3.0rem;
        padding: 0.5rem;
    }
`

const Body = styled.div`
    margin-top: 1.0rem;
`

export default BroadcastOnAir;