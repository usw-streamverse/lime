import React, { useRef, Dispatch, SetStateAction, ReactNode } from 'react';
import { AiFillHome, AiFillFolder, AiFillStar, AiFillFileAdd, AiFillSetting } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import useRippleEffect from 'hooks/useRippleEffect';

interface OffCanvasProps {
  show: boolean,
  setShow: Dispatch<SetStateAction<boolean>>
}

interface ItemProps {
  pathname: string,
  path: string,
  setShow: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

const Item = ({pathname, path, setShow, children}: ItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const ripple = useRippleEffect(ref, 'var(--navbar-menu-ripple)');
  const navigate = useNavigate();
  return <MenuItem ref={ref} onClick={() => {navigate(path); if(window.innerWidth <= 1024) setShow(false)}} selected={pathname === path}>{children}{ripple}</MenuItem>
}

const OffCanvas = ({show, setShow}: OffCanvasProps) => {
  const pathname = useLocation().pathname.replace(/\/+$/, '');
  if(show)
    document.body.classList.add('preventScroll');
  else
    document.body.classList.remove('preventScroll');

  return (
      <Container show={show}>
          <Wrap show={show}>
              <Group>Menu</Group>
              <Item pathname={pathname} setShow={setShow} path=""><AiFillHome size="24" />홈</Item>
              <Item pathname={pathname} setShow={setShow} path="/feed/library"><AiFillFolder size="24" />보관함</Item>
              <Item pathname={pathname} setShow={setShow} path="/feed/subscriptions"><AiFillStar size="24" />구독</Item>
              <Item pathname={pathname} setShow={setShow} path="/video/upload"><AiFillFileAdd size="24" />동영상 업로드</Item>
              <Group>General</Group>
              <Item pathname={pathname} setShow={setShow} path="/setting"><AiFillSetting size="24" />설정</Item>
          </Wrap>
          <Shadow show={show} onClick={() => setShow(false)}/>
      </Container>
  )
}

export default React.memo(OffCanvas);

const Group = styled.div`
  padding: 1.25rem 1.5rem;
  padding-top: 2.0rem;
  color: var(--navbar-menu-text-color-inactive);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
`

const Container = styled.div<{show: boolean}>`
    width: 250px;
    left: -250px;
    overflow-x: hidden;
    transition: all 200ms ease;
    @media screen and (max-width: 1024px) {
        position: absolute;
        left: 0;
    }
    ${(props) => 
        !props.show &&
        css `
          width: 0;      
        `
    }
`

const Shadow = styled.div<{show: boolean}>`
    display: none;
    position: fixed;
    top: 0; bottom: 0;
    left: 0; right: 0;
    background-color: transparent;
    z-index: 95;
    transition: background-color 200ms ease;
    @media screen and (max-width: 1024px) {
        display: block;
        background-color: #000000b3;
        
        ${(props) => 
            !props.show &&
            css `
              background-color: transparent;
              pointer-events: none;
            `
        }
    }
`

const Wrap = styled.div<{show: boolean}>`
    position: fixed;
    top: calc(4.0rem - 1px);
    left: -250px;
    width: 250px;
    height: 100%;
    background-color: var(--navbar-bg-color);
    border-right: 1px solid var(--navbar-border-color);
    overflow-x: hidden;
    z-index: 98;
    transition: left 200ms ease;
    ${(props) => 
        props.show &&
        css `
           left: 0px;
        `
    }
`;

const MenuItem = styled.div<{selected: boolean}>`
  display: flex;
  align-items: center;
  position: relative;
  width: 250px;
  padding: 1.25rem 1.75rem;
  color: var(--navbar-menu-text-color-inactive);
  font-size: 1.1rem;
  font-weight: 400;
  overflow: hidden;
  cursor: pointer;
  transition: all 150ms ease;
  @media screen and (min-width: 481px) {
    :hover {
      background-color: var(--navbar-menu-hover);
    }
  }
  svg {
    margin-right: 1.0rem;
    transition: all 150ms ease;
  }

  ::after {
    position: absolute;
    top: 16px; bottom: 16px;
    right: 0;
    width: 6px;
    background-color: var(--navbar-menu-icon-color-active);
    transform: scale(0);
    transition: transform 150ms ease;
    content: '';
  }

  ${(props) => 
      props.selected &&
      css `
        color: var(--navbar-menu-text-color-active);
        ::after {
          transform: scale(1);
        }
        svg {
          color: var(--navbar-menu-icon-color-active);
        }
      `
  }
`