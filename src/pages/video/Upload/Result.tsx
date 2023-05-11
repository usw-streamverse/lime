import styled from 'styled-components';
import Upload, { StepContext, iStep } from '.';
import { useContext } from 'react';

const Result = () => {
    const {step, setStep, uploadResult}: iStep = useContext(StepContext);
    return (
        <Wrap>
            <a href={uploadResult.current.m3u8} target="_blank">링크 : {uploadResult.current.m3u8}</a>
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