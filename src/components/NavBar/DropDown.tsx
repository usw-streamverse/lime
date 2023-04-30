import useUserQuery from 'hooks/useUserQuery';
import { useRef } from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

interface DropDownProps {
    show: boolean
}

const DropDown = (props: DropDownProps) => {
    const profile = useUserQuery().Profile();
    const nodeRef = useRef<HTMLDivElement>(null);
    return (
        <CSSTransition in={props.show} nodeRef={nodeRef} timeout={200} classNames="dropdown" unmountOnExit>
            <Container ref={nodeRef}>
                <Item><RiArrowDropRightLine size={16} />내 정보</Item>
                <Item onClick={(e) => {localStorage.clear(); profile.update()}}><RiArrowDropRightLine size={16} />로그아웃</Item>
            </Container>
        </CSSTransition>
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

    @media screen and (max-width: 480px) {
        position: fixed;
        left: 0;
        width: 100%;
        border-left: 0;
        border-right: 0;
    }
`

const Item = styled.div`
    display: flex;
    align-items: center;
    padding: 1.25rem;
    border-bottom: 1px solid var(--navbar-border-color);
    font-weight: 400;
    cursor: pointer;
    transition: all 200ms ease;

    :last-child {
        border-bottom: 0;
    }

    svg {
        width: 0;
        overflow: hidden;
        transition: all 200ms ease;
    }

    :hover {
        svg {
            width: 1.25rem;
            margin-right: 0.5rem;
        }
    }
`

export default DropDown;