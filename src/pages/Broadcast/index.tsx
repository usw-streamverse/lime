import Record from 'components/Broadcast/Record';
import Button from 'components/Button';
import FormTextBox from 'components/FormTextBox';
import Select from 'components/Select';
import useBroadcast from 'hooks/useBroadcast';
import { useRef } from 'react';
import { BsPlay, BsRecordCircle } from 'react-icons/bs';
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
    const refResolution = useRef<number>(0);
    const broadcast = useBroadcast();
    const refVideo = useRef<HTMLVideoElement>(null);

    const items = [
        {name: 'Low quality', value: 1},
        {name: 'Medium quality', value: 2},
        {name: 'High quality', value: 3},
    ];

    const handleClick = () => {
        broadcast.run(refVideo);
    }

    return (
        <Container>
            <Head>
                <FormTextBox placeholder="라이브 스트리밍 제목" />
                <RecordWrapper>
                    <Button color="var(--navbar-menu-text-color-active)" bgColor="var(--navbar-bg-color)" bgColorOver="var(--navbar-menu-hover)" onClick={handleClick}><BsPlay size={32} />스트리밍 시작</Button>
                </RecordWrapper>
            </Head>
            <Body>
                <Select width="200px" value={refResolution} option={items} />

                <div style={{marginTop: '1.0rem'}}></div>
                <FormTextBox label="Video bits per second" style={{marginBottom: '1.0rem'}} value="150000" />
                <FormTextBox label="Video frames per second" style={{marginBottom: '1.0rem'}} value="30" />
                <FormTextBox label="Audio bits per second" style={{marginBottom: '1.0rem'}} value="18000" />                   

                <video width="100%" height="100%" ref={refVideo} controls>
                    <source />
                </video>
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

const RecordWrapper = styled.div`
    position: relative;
    margin-left: 1.0rem;
    > button {
        width: 11.0rem;
        padding: 0.5rem;
        > svg {
            margin-right: 0.5rem;
        }
    }
`

const Body = styled.div`
    margin-top: 1.0rem;
`

export default Broadcast;