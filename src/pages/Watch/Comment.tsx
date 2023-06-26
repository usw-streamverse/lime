import { useContext, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { VideoContext } from '.';
import FormTextBox from 'components/FormTextBox';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import Video, { VideoComment } from 'apis/Video';
import { BsSend } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdArrowDropUp } from 'react-icons/md';
import LoadingPage from 'components/Loading';
import { getDifferenceTimeFormat, getKSTfromUTC } from 'utils/Time';

const Comment = () => {
    const videoContext = useContext(VideoContext);
    
    const [show, setShow] = useState<boolean>(false);
    const { isFetchedAfterMount, data, status } = useQuery({
        queryKey: ['video', 'comment'],
        staleTime: 0,
        queryFn: () => Video().get_comment(videoContext),
        onError: (error: AxiosError) => {
            console.log(error.response?.status);
        }
    });

    if(isFetchedAfterMount && status === 'success')
        return (
            <Container>
                <Header onClick={() => setShow(!show)}>댓글 {data.data.length}개
                    <HeaderIcon show={show}><MdArrowDropUp size={24} /></HeaderIcon>
                </Header>
                <CommentContainer show={show}>
                    <Write />
                    <CommentItemContainer>
                    {
                        data.data.map(i => {
                            return <CommentItem key={i.id} {...i} />
                        })
                    }
                    </CommentItemContainer>
                </CommentContainer>
            </Container>
        )
    else
        return (
            <Container>
                <LoadingPage />
            </Container>
        )
}

const Container = styled.div`
    position: relative;
    min-height: 100px;
    padding: 1.0rem 0;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    position: sticky;
    top: -1px;
    padding: 1.0rem;
    background-color: var(--main-bg-color);
    font-size: 1.125rem;
    font-weight: 500;
    cursor: pointer;

    @media screen and (max-width: 480px) {
        top: calc(100vw / 16 * 9);
    }
`

const HeaderIcon = styled.div<{show: boolean}>`
    line-height: 0;
    transform: rotate(${(props) => props.show ? '180deg' : '0deg'});
    transition: all 200ms ease;
`

const CommentContainer = styled.div<{show: boolean}>`
    display: ${(props) => props.show ? 'block' : 'none'};
    margin: 0 1.25rem;
`

const Write = () => {
    const videoContext = useContext(VideoContext);
    const commentRef = useRef<HTMLTextAreaElement>(null);
    const queryClient = useQueryClient();
    const [warning, setWarning] = useState<boolean>(false);

    const { mutate, status } = useMutation<AxiosResponse<{success: boolean}>, AxiosError<{success: boolean}>, {id: string, parent_id: string, comment: string}>(Video().write_comment, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['video', 'comment']);
            setWarning(false);
        },
        onError: (error) => {
            setWarning(true);
        }
    });

    const postComment = () => {
        if(status !== 'loading'){
            mutate({id: videoContext, parent_id: '0', comment: commentRef.current?.value || ''});
            if(commentRef.current?.value)
                commentRef.current.value = '';
        }
    }

    return (
        <Write.Container>
            <FormTextBox warning={warning} ref={commentRef} type="textarea" height="45px" borderBottomOnly textarea />
            <Write.ButtonWrapper onClick={postComment}>
                {status === 'loading' ? <Loading><AiOutlineLoading3Quarters size={20} /></Loading> : <BsSend size={20} />}
            </Write.ButtonWrapper>
        </Write.Container>
    )
}

const CommentItemContainer = styled.div`

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

const CommentItem = (props: VideoComment) => {
    const videoContext = useContext(VideoContext);
    const queryClient = useQueryClient();
    const { mutate, status } = useMutation<AxiosResponse<{success: boolean}>, AxiosError<{success: boolean}>, {video_id: string, comment_id: string}>(Video().delete_comment, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['video', 'comment']);
        },
        onError: (error) => {
        }
    });

    return (
        <CommentItem.Container>
            <CommentItem.ProfileIcon />
            <CommentItem.Content>
                <CommentItem.Detail>
                    <CommentItem.Nickname>{props.nickname}</CommentItem.Nickname>
                    <CommentItem.Date>{getDifferenceTimeFormat(getKSTfromUTC(props.created))}</CommentItem.Date>
                </CommentItem.Detail>
                <CommentItem.Body>
                    {
                        props.comment.split('\n').map((i, idx) => {
                            return <div key={idx}>{i}</div>
                        })
                    }
                </CommentItem.Body>
                <CommentItem.MenuContainer>
                    <CommentItem.Menu>답글</CommentItem.Menu>
                    {
                        props.writer == localStorage.id &&
                        <CommentItem.Menu onClick={() => mutate({video_id: videoContext, comment_id: props.id.toString()})}>삭제</CommentItem.Menu>
                    }
                </CommentItem.MenuContainer>
            </CommentItem.Content>
        </CommentItem.Container>
    )
}

CommentItem.Container = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    margin: 2.0rem 0;
`

CommentItem.MenuContainer = styled.div`
    display: flex;
`

CommentItem.Menu = styled.div`
    margin-right: 0.5rem;
    font-weight: 400;
    cursor: pointer;
`

CommentItem.ProfileIcon = styled.div`
    flex: 1 1 1;
    width: 32px;
    height: 32px;
    margin-right: 8px;
    background-color: #a0a0a0;
    border-radius: 50%;
`

CommentItem.Content = styled.div`
    flex: 1 1 0;
    margin-left: 0.5rem;    
`

CommentItem.Detail = styled.div`
    display: flex;
    align-items: center;
`

CommentItem.Nickname = styled.div`
    font-weight: 600;
`

CommentItem.Date = styled.div`
    margin-left: 0.5rem;
    color: var(--main-text-color-light);
    font-size: 0.875rem;
    font-weight: 400;
`

CommentItem.Body = styled.div`
    padding: 0.75rem 0;
    div {
        line-height: 1.375rem;
        font-weight: 400;
    }
`

Write.Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

Write.ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0.375rem;
    color: var(--main-text-color-light);
    cursor: pointer;
    transition: all 200ms ease-in-out;
    :hover {
        color: var(--main-text-color);
    }
`

export default Comment;