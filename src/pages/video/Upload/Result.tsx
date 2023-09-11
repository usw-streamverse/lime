import styled from 'styled-components';
import { StepContext, iStep } from '.';
import { useContext, useRef } from 'react';
import FormTextBox from 'components/FormTextBox';
import Button from 'components/Button';
import { getDurationFormat } from 'utils/Time';
import { useMutation } from '@tanstack/react-query';
import Video, { VideoUpdate, VideoUpdateResult } from 'apis/Video';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

const Result = () => {
    const {uploadResult}: iStep = useContext(StepContext);
    const titleRef = useRef<HTMLInputElement>(null);
    const explanationRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();
    
    const video = Video();
    const { mutate } = useMutation<AxiosResponse<VideoUpdateResult>, AxiosError<VideoUpdateResult>, VideoUpdate>(video.update, {
        onSuccess: () => {
            navigate('/');
        },
        onError: (error) => {
            console.error(error.response?.status);
        }
    });

    const post = () => {
        mutate({id: uploadResult.current.id, title: titleRef?.current?.value || '', explanation: explanationRef.current?.value || ''});
    }

    return (
        <Container>
            <MenuContainer>
                <Button.Group>
                    <Button color="var(--navbar-menu-text-color-active)" bgColor="var(--navbar-bg-color)" bgColorOver="var(--navbar-menu-hover)">취소</Button>
                    <Button color="#fff" bgColor="#2c7fe5" bgColorOver="#0e5ab9" onClick={post}>게시하기</Button>
                </Button.Group>
            </MenuContainer>
            <FlexContainer>
                <VideoDetail>
                    <Thumbnail src={uploadResult.current.thumbnail} />
                    <H2>주소</H2>
                    <H3><a href={`http://lime.k2e.shop/lime/watch/${uploadResult.current.id}`} target="_blank" rel="noreferrer">http://lime.k2e.shop/lime/watch/{uploadResult.current.id}</a></H3>
                    <H2>파일 이름</H2>
                    <H3>{uploadResult.current.filename}</H3>
                    <H2>동영상 길이</H2>
                    <H3>{getDurationFormat(uploadResult.current.duration)}</H3>
                </VideoDetail>
                <FormContainer>
                    <FormTextBox ref={titleRef}type="text" label="제목" labelSize={1.125} labelWeight={500} />
                    <FormTextBox ref={explanationRef} type="textarea" label="설명" labelSize={1.125} labelWeight={500} height="250px" textarea />
                </FormContainer>
            </FlexContainer>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: 1200px;
    padding: 1.5rem;
    margin: 0 auto;
`

const MenuContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1.5rem;
`

const FlexContainer = styled.div`
    display: flex;
    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`

const FormContainer = styled.div`
    margin-top: 1.5rem;
    @media screen and (min-width: 769px) {
        flex: 1;
        margin-top: 0;
        margin-left: 1.25rem;
    }
`

const VideoDetail = styled.div`
    max-width: 320px;
    @media screen and (max-width: 768px) {
        max-width: calc(100vw - 3.0rem);
    }
`

const Thumbnail = styled.img`
    margin-bottom: 0.5rem;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`

const H2 = styled.div`
    margin-top: 0.75rem;
    color: var(--main-text-color-light);
    font-size: 1.125rem;
    font-weight: 400;
`

const H3 = styled.div`
    margin: 0.25rem 0;
    font-size: 1.125rem;    
    font-weight: 500;
    a {
        color: #2564c4;
        font-weight: 500;
        text-decoration: none;
    }
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
`

export default Result;