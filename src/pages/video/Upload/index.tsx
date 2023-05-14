import styled, { keyframes, css } from 'styled-components';
import { FiArrowUp } from 'react-icons/fi';
import { useState, useRef, createContext, useContext } from 'react';
import Video, { UploadResult } from 'apis/Video';
import Result from './Result';

export interface iStep {
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    uploadResult: React.MutableRefObject<UploadResult>
}

export const StepContext = createContext<iStep>({} as any);

const Upload = () => {
    const [step, setStep] = useState<number>(0);
    const uploadResult = useRef<UploadResult>({} as any);
    return (
        <StepContext.Provider value={{step, setStep, uploadResult}}>
        {{
            0:
                <VideoUpload />,
            1:
                <Result />
        }[step]}
        </StepContext.Provider>
    )
}

const VideoUpload = () => {
    const {step, setStep, uploadResult}: iStep = useContext(StepContext);
    const [drop, setDrop] = useState<boolean>(false);
    const fileRef = useRef<HTMLInputElement>(null);
    const countRef = useRef<number>(0);

    const UploadVideo = (file: FileList | null) => {
        if(!file) return;
        const formData = new FormData();
        formData.append('enctype', 'multipart/form-data');
        Array.from(file).forEach((el) => {
            formData.append('video', el);
        });
        Video().upload(formData).then((e) => {
            uploadResult.current = e.data;
            setStep(1);
        })
    }

    return (
        <Container onDragOver={(e) => e.preventDefault()} onDrop={(e) => {setDrop(false); countRef.current = 0; UploadVideo(e.dataTransfer.files); e.preventDefault()}} onDragEnter={(e) => {if(countRef.current++ === 0) setDrop(true)}} onDragLeave={(e) => {if(--countRef.current === 0) setDrop(false)}} drop={drop}>
            <div>
                <UploadIcon drop={drop} onClick={() => fileRef.current?.click()}>
                    <FiArrowUp />
                </UploadIcon>
                <TextContainer show={!drop}>
                    <H1>동영상 업로드</H1>
                    <H3>업로드할 동영상을 선택하거나 Drag & Drop 하세요.</H3>
                </TextContainer>
                <input style={{'display': 'none'}} name="video" type="file" ref={fileRef} onChange={(e) => UploadVideo(e.target.files)}/>
            </div>
        </Container>
    )
}

const Container = styled.div<{drop: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    text-align: center;
    ${(props) => props.drop && css `div { pointer-events: none; }`}
`

const upload_animation = keyframes `
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(1.0rem);
  }
`;

const TextContainer = styled.div<{show: boolean}>`
    transition: all 300ms ease;
    ${(props) => !props.show && css `
        opacity: 0;
        transform: translateY(-8.0rem) scale(0.66);
        pointer-events: none;
    `}
`

const H1 = styled.div`
    margin: 2.0rem 0 1.0rem 0;
    font-size: 1.5rem;
    font-weight: 600;
`

const H3 = styled.div`
    font-size: 1.0rem;
    font-weight: 400;
`

const UploadIcon = styled.div<{drop: boolean}>`
    position: relative;
    margin: 0 auto;
    line-height: 0;
    cursor: pointer;
    ${(props) => props.drop ? 
    css `
        width: 10.0rem;
        height: 10.0rem;
        padding: 2.0rem;
        background-color: #6cff97;
        border-radius: 50%;
        color: #fff;
        animation: ${upload_animation} 1s ease infinite;
        animation-direction: alternate;
        pointer-events: none;
    `
    :
    css `
        width: 6.0rem;
        height: 6.0rem;
        padding: 1.0rem;
        background-color: #e9f0ff;
        border-radius: 2.0rem;
        color: #6092cf;
    `
    }
    transition: all 200ms ease;
    svg {
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
`

export default Upload;