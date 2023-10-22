import { useMutation, useQueryClient } from '@tanstack/react-query';
import Video from 'apis/Video';
import { AxiosError, AxiosResponse } from 'axios';
import FormTextBox from 'components/FormTextBox';
import { useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import styled, { keyframes } from 'styled-components';

const WriteComment = (props: {videoId: string}) => {
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const [warning, setWarning] = useState<boolean>(false);

  const { mutate, status } = useMutation<AxiosResponse<{success: boolean}>, AxiosError<{success: boolean}>, {id: string, parent_id: string, comment: string}>(Video().writeComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['comment', props.videoId]);
      setWarning(false);
    },
    onError: (error) => {
      setWarning(true);
    }
  });

  const postComment = () => {
    if(status !== 'loading'){
      mutate({id: props.videoId, parent_id: '0', comment: commentRef.current?.value || ''});
      if(commentRef.current?.value)
        commentRef.current.value = '';
    }
  }

  return (
    <Container>
      <FormTextBox warning={warning} ref={commentRef} type='textarea' height='45px' borderBottomOnly textarea />
      <ButtonWrapper onClick={postComment}>
        {status === 'loading' ? <Loading><AiOutlineLoading3Quarters size={20} /></Loading> : <>댓글 쓰기</>}
      </ButtonWrapper>
    </Container>
  )
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.375rem;
  color: var(--main-text-color-light);
  font-weight: 400;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  :hover {
    color: var(--main-text-color);
  }
`

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Loading = styled.div`
  line-height: 0;
  svg {
    color: var(--main-text-color);
    animation: 1s ${rotate} linear infinite;
  }
`

export default WriteComment;