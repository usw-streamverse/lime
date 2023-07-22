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
import { CiEraser, CiTurnL1 } from 'react-icons/ci';

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
        let replyList = {} as VideoComment[][];
        data.data.forEach(i => {
            if(i.parent_id !== 0){
                if(!replyList[i.parent_id]) replyList[i.parent_id] = [];
                replyList[i.parent_id].push(i);
            }
        })
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
                            return <CommentItem videoId={props.id} reply={false} replyList={replyList[i.id]} key={i.id} {...i} />
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

const CommentItemContainer = styled.div`

`

const CommentItem = (props: {videoId: string, reply: boolean, replyList?: VideoComment[]} & VideoComment) => {
    const queryClient = useQueryClient();
    const [reply, setReply] = useState<boolean>(false);
    const { mutate } = useMutation<AxiosResponse<{success: boolean}>, AxiosError<{success: boolean}>, {video_id: string, comment_id: string}>(Video().delete_comment, {
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
                        {
                            props.parent_id === 0 &&
                            <CommentItem.Menu onClick={() => setReply(!reply)}><CiTurnL1 size={16} />답글</CommentItem.Menu>
                        }
                        {
                            props.writer === parseInt(localStorage.id) &&
                            <CommentItem.Menu onClick={() => mutate({video_id: props.videoId, comment_id: props.id.toString()})}><CiEraser size={16} />삭제</CommentItem.Menu>
                        }
                    </CommentItem.MenuContainer>
                </CommentItem.Content>
            </CommentItem.Container>
            {reply && <WriteReply videoId={props.videoId} parent={props.id.toString()} />}
            {
                props.replyList &&
                <CommentItem.ReplyContainer>
                {
                    props.replyList.map(i => {
                        return <CommentItem videoId={props.videoId} reply={true} key={i.id} {...i} />
                    })
                }
                </CommentItem.ReplyContainer>
            }
        </>
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
    margin-right: 0.5rem;
    font-size: 0.875rem;
    font-weight: 400;
    cursor: pointer;
    svg {
        margin-right: 0.125rem;;
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

export default Comment;