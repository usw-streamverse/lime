import Card from 'components/Card'
import { useContext } from 'react'
import { BsCameraFill, BsDisplay } from 'react-icons/bs'
import { BroadcastFormStateContext } from '.';
import styled from 'styled-components';

const BroadcastSetup = () => {
    const context = useContext(BroadcastFormStateContext);
    const runBroadcast = (isDisplayMedia: boolean) => {
        context.broadcast.run(null, isDisplayMedia)
        .then(() => {
            context.setStep(1);
        })
        .catch((error) => {
            if(error instanceof Error)
                console.log(error.message);
        })
    }

    return (
        <Container>
            <Head>라이브 스트리밍을 송출할 내용을 선택해 주세요.</Head>
            <Card.Container>
                <Card onClick={() => runBroadcast(true)}>
                    <Card.Icon>
                        <BsDisplay size={72} />
                    </Card.Icon>
                    <Card.Description>
                        컴퓨터의 화면을 송출합니다.
                    </Card.Description>
                </Card>
                <Card onClick={() => runBroadcast(false)}>
                    <Card.Icon>
                        <BsCameraFill size={72} />
                    </Card.Icon>
                    <Card.Description>
                        스마트폰의 카메라 또는 PC의 웹캠을 송출합니다.
                    </Card.Description>
                </Card>
            </Card.Container>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
`

const Head = styled.div`
    margin-bottom: 1.0rem;
    font-size: 1.125rem;
    font-weight: 400;
    text-align: center;
`

export default BroadcastSetup