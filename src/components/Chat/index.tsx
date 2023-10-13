import styled from 'styled-components';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import { useEffect, useRef } from 'react';
import TextBox from 'components/TextBox';

const Chat = (props: {chatMessage: ChatMessageProps[], socket: WebSocket | undefined}) => {
    const refChat = useRef<HTMLInputElement>(null);
    const refBody = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== 'Enter' || !refChat.current || !props.socket || refChat.current.value.trim() === '') return;
        props.socket.send(JSON.stringify({'type': 'chat', 'text': refChat.current.value}));    
        refChat.current.value = '';
    }

    useEffect(() => {
        if(!refBody.current) return;
        //console.log(refBody.current.scrollTop, refBody.current.scrollHeight, refBody.current.offsetHeight);
        refBody.current.scrollTop = refBody.current.scrollHeight - refBody.current.offsetHeight;
    }, [props.chatMessage, refBody]);

    return (
        <Container>
            <Header>실시간 채팅</Header>
            <Body ref={refBody}>
            {
                props.chatMessage.map((message, index) => <ChatMessage key={index} {...message} />)
            }
            </Body>
            <ChatWrapper>
                <TextBox width="100%" ref={refChat} onKeyDown={handleKeyDown} placeholder="채팅 내용을 입력하세요." />
            </ChatWrapper>
        </Container>
    )
}

const Container = styled.div`
    border: 1px solid #dddddd;
    border-radius: 0.25rem;
`

const Header = styled.div`
    padding: 1.0rem;
    border-bottom: 1px solid #dddddd;
    font-weight: 400;
    font-size: 1.25rem;
`

const Body = styled.div`
    height: 400px;
    padding: 1.0rem;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: #cecece;
    }
`

const ChatWrapper = styled.div`
    padding: 1.0rem;
    border-top: 1px solid #dddddd;
`

export default Chat;