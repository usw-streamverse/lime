import { ReactNode } from 'react'
import styled from 'styled-components'

const MenuStyle = styled.div`
  display: flex;
  justify-content: right;
  padding: 1.0rem 1.0rem 0 0;
`

const Menu = (props: {children: ReactNode}) => {
  return <MenuStyle>{props.children}</MenuStyle>
}

Menu.Button = styled.button`
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.875rem;
  background: linear-gradient(to left, var(--main-bg-color) 50%, var(--navbar-menu-hover) 50%) right;
  background-size: 200%;
  border: 0;
  border-radius: 0.25rem;
  color: var(--main-text-color);
  cursor: pointer;
  font-size: 1.0rem;
  font-weight: 500;
  transition: all 150ms ease-in-out;
  :hover {
    background-position: left;
  }
`

export default Menu