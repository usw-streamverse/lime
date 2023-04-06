import React, { Dispatch, SetStateAction } from 'react';
import { AiFillHome, AiFillFolder, AiFillStar, AiFillSetting } from 'react-icons/ai';
import styled, { css } from 'styled-components';

interface IOffCanvas {
  show: Boolean,
  setShow: Dispatch<SetStateAction<Boolean>>
}

const OffCanvas = ({show, setShow}: IOffCanvas) => {
    return (
        <Container show={show}>
            <Wrap show={show}>
                <Group>Menu</Group>
                <Item selected={true}><AiFillHome size="24" />홈</Item>
                <Item selected={false}><AiFillFolder size="24" />보관함</Item>
                <Item selected={false}><AiFillStar size="24" />구독</Item>
                <Group>General</Group>
                <Item selected={false}><AiFillSetting size="24" />설정</Item>
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

const Container = styled.div<{show: Boolean}>`
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

const Shadow = styled.div<{show: Boolean}>`
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

const Wrap = styled.div<{show: Boolean}>`
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

const Item = styled.div<{selected: Boolean}>`
  display: flex;
  align-items: center;
  position: relative;
  width: 250px;
  padding: 1.25rem 1.75rem;
  color: var(--navbar-menu-text-color-inactive);
  font-size: 1.1rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 150ms ease;
  @media screen and (min-width: 481px) {
    :hover {
      background-color: var(--navbar-menu-hover);
    }
  }
  :active {
    background-color: var(--navbar-menu-active);
  }
  svg {
    margin-right: 1.0rem;
  }

  ${(props) => 
      props.selected &&
      css `
        color: var(--navbar-menu-text-color-active);
        ::after {
          position: absolute;
          top: 16px; bottom: 16px;
          right: 0px;
          width: 6px;
          background-color: var(--navbar-menu-icon-color-active);
          content: '';
        }
        svg {
          color: var(--navbar-menu-icon-color-active);
        }
      `
  }
`