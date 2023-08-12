import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import Video, { VideoComment } from 'apis/Video';
import { MdArrowDropUp } from 'react-icons/md';
import LoadingPage from 'components/Loading';
import { getDifferenceTimeFormat, getKSTfromUTC } from 'utils/Time';
import WriteComment from './WriteComment';
import WriteReply from './WriteReply';
import { CiChat1, CiHeart } from 'react-icons/ci';

const Comment = (props: {id: string}) => {
    const [show, setShow] = useState<boolean>(false);
    const { isFetchedAfterMount, data, status } = useQuery({
        queryKey: ['comment'],
        staleTime: 0,
        queryFn: () => Video().get_comment(props.id),
        onError: (error: AxiosError) => {
            console.log(error.response?.status);
        }
    });

    if(isFetchedAfterMount && status === 'success'){
        return (
            <Container>
                <Header onClick={() => setShow(!show)}>댓글 {data.data.length}개
                    <HeaderIcon show={show}><MdArrowDropUp size={24} /></HeaderIcon>
                </Header>
                <CommentContainer show={show}>
                    <WriteComment videoId={props.id} />
                    <CommentItemContainer>
                    {
                        data.data.filter(i => i.parent_id === 0).map(i => {
                            return <CommentItem videoId={props.id} key={i.id} {...i} />
                        })
                    }
                    </CommentItemContainer>
                </CommentContainer>
            </Container>
        )
    } else
        return (
            <Container>
                <LoadingPage />
            </Container>
        )
}

const Container = styled.div`
    position: relative;
    margin: 1.0rem;
    transition: all 200ms ease;
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

const CommentItemContainer = styled.div`

`

const CommentItem = (props: {videoId: string} & VideoComment) => {
    const queryClient = useQueryClient();
    const [reply, setReply] = useState<boolean>(false);
    const deleteComment = useMutation<AxiosResponse<{success: boolean}>, AxiosError<{success: boolean}>, {video_id: string, comment_id: string}>(Video().delete_comment, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['comment']);
        },
        onError: (error) => {
        }
    });

    const likeComment = useMutation<AxiosResponse<{active: boolean}>, AxiosError<{active: boolean}>, {comment_id: number}>(Video().like_comment, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['comment']);
        },
        onError: (error) => {
        }
    });

    return (
        <>
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
                        <CommentItem.Menu onClick={() => likeComment.mutate({comment_id: props.id})} style={{marginLeft: '-0.5rem'}}><CiHeart size={16} />{props.like_count}</CommentItem.Menu>
                        {
                            props.parent_id === 0 &&
                            <CommentItem.Menu onClick={() => setReply(!reply)}><CiChat1 size={16} />{props.reply_count}</CommentItem.Menu>
                        }
                        {
                            props.writer === parseInt(localStorage.id) &&
                            <CommentItem.Menu onClick={() => deleteComment.mutate({video_id: props.videoId, comment_id: props.id.toString()})}>삭제</CommentItem.Menu>
                        }
                    </CommentItem.MenuContainer>
                </CommentItem.Content>
            </CommentItem.Container>
            {/*reply && <WriteReply videoId={props.videoId} parent={props.id.toString()} />*/}
            {
                reply &&
                <Reply videoId={props.videoId} id={props.id} />
            }
        </>
    )
}

const Reply = (props: {videoId: string, id: number}) => {
    const { data, status } = useQuery({
        queryKey: ['comment', props.id],
        staleTime: 0,
        queryFn: () => Video().get_reply(props.videoId, props.id),
        onError: (error: AxiosError) => {
            console.log(error.response?.status);
        }
    });

    return (
        <CommentItem.ReplyContainer>
            <WriteReply videoId={props.videoId} parent={props.id.toString()} />
            {
                status === 'success' &&
                data.data.map(i => {
                    return <CommentItem videoId={props.videoId} key={i.id} {...i} />
                })
            }
        </CommentItem.ReplyContainer>
    )
}

CommentItem.ReplyContainer = styled.div`
    padding: 1.5rem;
    background-color: var(--watch-comment-reply-bg-color);
    border-radius: 0.5rem;
`

CommentItem.Container = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    margin: 2.0rem 0;
    padding: 1.0rem 0;
    :first-child {
        margin-top: 0;
    }
    :last-child {
        margin-bottom: 0;
    }
`

CommentItem.MenuContainer = styled.div`
    display: flex;
    margin-top: 0.5rem;
`

CommentItem.Menu = styled.div`
    display: flex;
    align-items: center;
    margin-right: 0.75rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 400;
    cursor: pointer;
    transition: all 150ms ease;
    :hover {
        background-color: var(--watch-comment-reply-bg-color);
    }
    svg {
        margin-right: 0.25rem;
    }
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
    margin-left: 1.0rem;
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

export default Comment;