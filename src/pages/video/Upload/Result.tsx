import styled from 'styled-components';
import Upload, { StepContext, iStep } from '.';
import { useContext } from 'react';

const Result = () => {
    const {step, setStep, uploadResult}: iStep = useContext(StepContext);
    return (
        <Wrap>
            <a href={uploadResult.current.url} target="_blank">{uploadResult.current.url}</a>
            <button onClick={() => setStep(0)}>뒤로가기</button>
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 350px;
    @media screen and (max-width: 480px) {
        width: 100%;
    }
`

export default Result;