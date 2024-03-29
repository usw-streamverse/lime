import { CiLight, CiDark, CiMenuBurger } from 'react-icons/ci';
import styled, { css } from 'styled-components';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import OffCanvas from './OffCanvas';
import { useNavigate } from 'react-router-dom';
import Sign from 'pages/Sign';
import useUserQuery from 'hooks/useUserQuery';
import DropDown from './DropDown';
import { OverlayContext } from 'components/Overlay';

interface NavBarProps {
  children: ReactNode
}

interface MenuProps {
  children: ReactNode,
  tooltip?: string,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void
}

const toggleTheme = () => {
  document.body.classList.toggle('dark');
  return document.body.classList.contains('dark');
}

const Menu = ({children, tooltip='', onClick, onMouseEnter, onMouseLeave}: MenuProps) => {
  return (
    <Item data-text={tooltip} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{children}</Item>
  )
}

const NavBar = ({children}: NavBarProps) => {
  const overlayContext = useContext(OverlayContext);
  const profile = useUserQuery().Profile();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [offCanvas, setOffCanvas] = useState<boolean>(window.innerWidth > 1024);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    overlayContext.push(<Sign />, 'Sign');
  }, []);

  return (
    <>
      <Wrap>
        <LeftSide>
          <MenuButton onClick={() => setOffCanvas(!offCanvas)}>
            <CiMenuBurger size="1.5rem" />
          </MenuButton>
          <Logo onClick={() => navigate('')}>LIME</Logo>
        </LeftSide>
        <Menu tooltip="Theme" onClick={() => setDark(toggleTheme)}>{dark ? <CiLight size="1.75rem" /> : <CiDark size="1.75rem" />}</Menu>
        {
          profile.loggedIn ?
          <Menu onClick={(e) => {if(window.innerWidth <= 1024) setOffCanvas(false); setDropdown(!dropdown); e.preventDefault()}} onMouseEnter={() => {if(window.innerWidth > 1024 || !offCanvas) setDropdown(true)}} onMouseLeave={() => setDropdown(false)}>
            <ProfileIcon profileColor={profile.data?.profile || '#aaa'} />{profile.data?.nickname}
            <DropDown show={dropdown} />
          </Menu>
          :
          <Menu onClick={() => overlayContext.show('Sign')}>로그인</Menu>
        }
      </Wrap>
      <Container>
        <OffCanvas show={offCanvas} setShow={setOffCanvas} />
        {children}
      </Container>
    </>
  )
}

export default NavBar;

const ProfileIcon = styled.div<{profileColor: string}>`
  width: 28px;
  height: 28px;
  margin-right: 8px;
  background-color: ${props => props.profileColor};
  border-radius: 50%;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  position: absolute;
  top: 4.0rem;
  width: 100%;
  height: calc(100% - 4.0rem);
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  position: fixed;
  top: 0;
  width: 100%;
  height: 4.0rem;
  padding: 0 1.5rem;
  border-bottom: 1px solid var(--navbar-border-color);
  background-color: var(--navbar-bg-color);
  transition: all 100ms ease;
  z-index: 100;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 1.5rem;
`

const Logo = styled.div`
  margin-left: 0.75rem;
  font-size: 1.25rem;
  cursor: pointer;
`

const MenuButton = styled.div<MenuProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 200ms ease;
  @media screen and (min-width: 481px) {
    :hover {
      background-color: var(--navbar-menu-hover);
    }
  }
  :active {
    background-color: var(--navbar-menu-active);
  }
`

const Item = styled.div<{'data-text'?: string}>`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  padding: 0 1.5rem;
  background-color: var(--navbar-item-bg-color);
  color: var(--main-text-color);
  font-weight: 400;
  cursor: pointer;
  transition: all 200ms ease;
  ::before {
    position: absolute;
    left: 0; right: 0;
    top: 0; bottom: 0;
    border: 1px solid var(--navbar-border-color);
    border-top: 0;
    opacity: 0;
    transition: all 200ms ease;
    content: '';
  }
  ::after {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 1px;
    right: 1px;
    bottom: calc(-2.5rem + 1px);
    opacity: 0;
    height: 2.5rem;
    background-color: var(--navbar-item-bg-color);
    font-size: 0.9rem;
    font-weight: 300;
    transition: all 200ms ease;
    overflow-y: hidden;
    transform: translateY(-100%);
    content: attr(data-text);
  }

  
  @media screen and (min-width: 481px) {
    :hover {
      ::before {
        bottom: -2.5rem;
        opacity: 1;
      }
      ::after {
        opacity: 1;
        transform: translateY(0);
      }
      z-index: 2;
    }
  }

  ${(props) => 
    !props['data-text'] &&
    css `
      :hover {
        ::before {
          bottom: 0;
        }
      }
      ::before {
        display: none;
      }
      ::after {
        display: none;
      }
    `
  }
`