import React, { useRef, Dispatch, SetStateAction, ReactNode, useEffect, useContext, createContext } from 'react';
import { AiFillHome, AiFillFolder, AiFillStar, AiFillVideoCamera } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import useRippleEffect from 'hooks/useRippleEffect';

const ItemContext = createContext<{pathname: string, setShow: React.Dispatch<React.SetStateAction<boolean>>, selectionBar: React.RefObject<HTMLDivElement>}>({} as any);

interface OffCanvasProps {
  show: boolean,
  setShow: Dispatch<SetStateAction<boolean>>
}

interface ItemProps {
  path: string,
  children: ReactNode,
}

const Item = ({path, children}: ItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const ripple = useRippleEffect(ref, 'var(--navbar-menu-ripple)');
  const navigate = useNavigate();
  const {pathname, setShow, selectionBar} = useContext(ItemContext);

  const onClick = () => {
    navigate(path);
    if(window.innerWidth <= 1024) setShow(false);
  }

  useEffect(() => {
    if(pathname === path){
      const SelectionBar = selectionBar.current;
      if(ref.current && SelectionBar && SelectionBar.parentElement){
        if(parseInt(SelectionBar.style.top, 10) < ref.current.offsetTop + ref.current.offsetHeight / 2)
          SelectionBar.style.transition = 'top 500ms ease-in-out, bottom 200ms ease-in-out';
        else
          SelectionBar.style.transition = 'bottom 500ms ease-in-out, top 200ms ease-in-out';
        SelectionBar.style.top = `${ref.current.offsetTop + ref.current.offsetHeight / 2}px`;
        SelectionBar.style.bottom = `${SelectionBar.parentElement.offsetHeight - (ref.current.offsetTop + ref.current.offsetHeight / 2 + 10)}px`;
        SelectionBar.style.display = 'block';
        
        const onResize = () => {
          const SelectionBar = selectionBar.current;
          if(ref.current && SelectionBar && SelectionBar.parentElement){
            SelectionBar.style.display = 'none';
            SelectionBar.style.bottom = `${SelectionBar.parentElement.offsetHeight - (ref.current.offsetTop + ref.current.offsetHeight / 2 + 10)}px`;
            SelectionBar.style.display = 'block';
          }
        }
        window.addEventListener('resize', onResize);

        return () => {
          window.removeEventListener('resize', onResize);
        }
      }
    }
  }, [ref, selectionBar, path, pathname]);
  return <MenuItem ref={ref} onClick={onClick} selected={pathname === path}>{children}{ripple}</MenuItem>
}

const OffCanvas = ({show, setShow}: OffCanvasProps) => {
  const pathname = useLocation().pathname.replace(/\/+$/, '');
  const selectionBarRef = useRef<HTMLDivElement>(null);
  if(show)
    document.body.classList.add('preventScroll');
  else
    document.body.classList.remove('preventScroll');

  useEffect(() => {
    const paths = ['', '/library', '/subscription', '/live'];
    if(selectionBarRef.current){
      selectionBarRef.current.style.display = paths.indexOf(pathname) === -1 ? 'none' : 'block';
    }
  }, [pathname])

  return (
    <Container show={show}>
      <Wrap show={show}>
        <ItemContext.Provider value={{pathname: pathname, setShow: setShow, selectionBar: selectionBarRef}}>
          <Group>Menu</Group>
          <Item path=""><AiFillHome size="24" />홈</Item>
          <Item path="/library"><AiFillFolder size="24" />보관함</Item>
          <Item path="/subscription"><AiFillStar size="24" />구독</Item>
          <Item path="/live"><AiFillVideoCamera size="24" />라이브 스트리밍</Item>
        </ItemContext.Provider>
        <SelectionBar ref={selectionBarRef} />
      </Wrap>
      <Shadow show={show} onClick={() => setShow(false)}/>
    </Container>
  )
}

export default React.memo(OffCanvas);

const SelectionBar = styled.div`
  display: none;
  position: absolute;
  top: 0; right: 0;
  width: 0.375rem;
  margin-top: -10px;
  background-color: var(--navbar-menu-icon-color-active);
  border-radius: 3px;
`

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
    z-index: 99;
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
    z-index: 101;
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
  transition: all 300ms ease;
  @media screen and (min-width: 481px) {
    :hover {
      background-color: var(--navbar-menu-hover);
    }
  }
  svg {
    margin-right: 1.0rem;
    transition: all 150ms ease;
  }

  ${(props) => 
      props.selected &&
      css `
        color: var(--navbar-menu-text-color-active);
        svg {
          color: var(--navbar-menu-icon-color-active);
        }
      `
  }
`