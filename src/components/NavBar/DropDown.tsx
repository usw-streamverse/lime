import useUserQuery from 'hooks/useUserQuery';
import { useRef } from 'react';
import { CiLogin, CiUser, CiVideoOn } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

interface DropDownProps {
    show: boolean
}

const DropDown = (props: DropDownProps) => {
    const navigate = useNavigate();
    const profile = useUserQuery().Profile();
    const nodeRef = useRef<HTMLDivElement>(null);
    return (
        <>
            <CSSTransition in={props.show} nodeRef={nodeRef} timeout={200} classNames="dropdown" unmountOnExit>
                <Container ref={nodeRef}>
                    <Item onClick={() => navigate('/myinfo')}><CiUser size={24} />내 정보</Item>
                    <Item onClick={() => navigate('/@/' + profile.data?.userid)}><CiVideoOn size={24} />내 채널</Item>
                    <Item onClick={(e) => {localStorage.clear(); profile.update()}}><CiLogin size={24} />로그아웃</Item>
                </Container>
            </CSSTransition>
            <Shadow show={props.show} />
        </>
    );
}

const Container = styled.div`
    position: absolute;
    width: 200px;
    top: calc(4.0rem - 1px);
    right: 0;
    background-color: var(--navbar-bg-color);
    box-shadow: 0 4px 7px 1px rgba(80, 80, 80, 0.1);
    border: 1px solid var(--navbar-border-color);
    border-top: 0;
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    cursor: default;
    transform-origin: 100% 0;
    z-index: 100;

    @media screen and (max-width: 480px) {
        position: fixed;
        left: 0;
        width: 100%;
        border-left: 0;
        border-right: 0;
    }
`

const Shadow = styled.div<{show: boolean}>`
    display: none;
    position: fixed;
    top: 4.0rem; bottom: 0;
    left: 0; right: 0;
    background-color: transparent;
    z-index: 99;
    transition: background-color 200ms ease;
    @media screen and (max-width: 480px) {
        display: block;
        background-color: #000000b3;
        
        ${(props) => 
            !props.show &&
            `
              background-color: transparent;
              pointer-events: none;
            `
        }
    }
`

const Item = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    padding: 1.25rem;
    background: linear-gradient(to left, var(--navbar-bg-color) 50%, var(--navbar-menu-hover) 50%) right;
    background-size: 200%;
    border-bottom: 1px solid var(--navbar-border-color);
    font-weight: 400;
    cursor: pointer;
    transition: all 200ms ease-in-out;

    svg {
        margin-right: 8px;
    }

    :last-child {
        border-bottom: 0;
    }

    :hover {
        background-position: left;
    }
`

export default DropDown;