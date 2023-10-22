import { useMutation, useQueryClient } from '@tanstack/react-query';
import Video from 'apis/Video';
import { AxiosError, AxiosResponse } from 'axios';
import FormTextBox from 'components/FormTextBox';
import { useRef } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import styled, { keyframes } from 'styled-components';

const WriteReply = (props: {videoId: string, parent: string}) => {
  const queryClient = useQueryClient();
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const { mutate, status } = useMutation<AxiosResponse<{success: boolean}>, AxiosError<{success: boolean}>, {id: string, parent_id: string, comment: string}>(Video().writeComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['comment', props.videoId]);
      queryClient.invalidateQueries(['comment', props.videoId, props.parent]);
    },
    onError: (error) => {
    }
  });

  const postReply = () => {
    if(status !== 'loading'){
      mutate({id: props.videoId, parent_id: props.parent, comment: commentRef.current?.value || ''});
      if(commentRef.current?.value)
        commentRef.current.value = '';
    }
  }

  return (
    <Container>
      <FormTextBox ref={commentRef} type='textarea' height='45px' borderBottomOnly textarea />
      <PostButton onClick={postReply}>
        {status === 'loading' ? <Loading><AiOutlineLoading3Quarters size={12} /></Loading> : <>답글 작성</>}
      </PostButton>
    </Container>
  )
}


const PostButton = styled.button`
  width: 5.0rem;
  height: 2.25rem;
  border: 0;
  border-radius: 0.25rem;
  background-color: transparent;
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

const Container = styled.div`
  background-color: var(--watch-comment-reply-bg-color);
  text-align: right;
`

export default WriteReply;