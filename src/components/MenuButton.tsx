import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

const MenuButton = (props: { children: ReactNode, size: number, onClick?: () => void }) => {
  return (
  <Container {...props} />
  )
}

const Container = styled.div<{size: number}>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => css `
  width: ${props.size}px;
  height: ${props.size}px;
  `}
  border-radius: 50%;
  cursor: pointer;
  transition: all 150ms ease;
  :hover {
  background-color: var(--menubutton-bg-color-hover);
  }
  :active {
  background-color: var(--menubutton-bg-color-active);
  }
`

export default MenuButton;