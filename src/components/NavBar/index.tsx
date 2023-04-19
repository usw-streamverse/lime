import { CiLight, CiDark, CiMenuBurger } from 'react-icons/ci';
import styled, { css } from 'styled-components';
import { ReactNode, useState } from 'react';
import OffCanvas from './OffCanvas';
import { useNavigate } from 'react-router-dom';
import Sign from 'pages/Sign';
import Modal from 'components/Modal';

interface NavBarProps {
    children: ReactNode
}

interface MenuProps {
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const toggleTheme = () => {
    document.body.classList.toggle('dark');
    return document.body.classList.contains('dark');
}

const Menu = ({onClick}: MenuProps) => {
    return (
        <MenuButton onClick={onClick}>
            <CiMenuBurger size="1.5rem" />
        </MenuButton>
    )
}

const NavBar = ({children}: NavBarProps) => {
    const navigate = useNavigate();
    const [dark, setDark] = useState(false);
    const [offCanvas, setOffCanvas] = useState<boolean>(window.innerWidth > 1024);
    const [signIn, setSignIn] = useState(false);
    return (
        <>
            <Modal show={signIn} setShow={setSignIn}><Sign setShow={setSignIn} /></Modal>
            <Wrap>
                <LeftSide>
                    <Menu onClick={() => setOffCanvas(!offCanvas)}/>
                    <Logo onClick={() => navigate('')}>LIME</Logo>
                </LeftSide>
                <Item data-text="Theme" onClick={() => setDark(toggleTheme)}>{dark ? <CiLight size="1.75rem" /> : <CiDark size="1.75rem" />}</Item>
                <Item onClick={() => setSignIn(true)}>로그인</Item>
            </Wrap>
            <Container>
                <OffCanvas show={offCanvas} setShow={setOffCanvas} />
                {children}
            </Container>
        </>
    )
}

export default NavBar;

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
    z-index: 97;
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
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25);
        opacity: 0;
        transition: all 200ms ease;
        content: '';
    }

    ::after {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -2.5rem;
        opacity: 0;
        height: 2.5rem;
        background-color: var(--navbar-item-bg-color);
        font-size: 0.9rem;
        font-weight: 300;
        transition: all 200ms ease;
        transform: scaleY(0);
        transform-origin: 50% 0;
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
                transform: scaleY(1);
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
            ::after {
                display: none;
            }
        `
    }

    :active {
        transform: scale(1.05);
    }
`