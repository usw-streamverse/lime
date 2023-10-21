import React, { ReactNode, createContext, useContext } from 'react';
import styled, { css } from 'styled-components';

interface TabItemProps extends React.DOMAttributes<HTMLDivElement> {
  index: number
}

const SelectedContext = createContext<number>(0);

const Tab = (props: {children: ReactNode, selected: number}) => {
  return (
    <SelectedContext.Provider value={props.selected}>
      <Container>
        {props.children}
      </Container>
    </SelectedContext.Provider>
  );
}

const ItemStyle = styled.div<{index: number, selected: number}>`
  position: relative;
  padding: 1.25rem 1.5rem;
  color: var(--main-text-color-light);
  font-weight: 400;
  cursor: pointer;
  transition: all 200ms ease;
  z-index: 0;

  :hover {
    color: var(--main-text-color);
    font-weight: 600;
    ::after {
      left: 0;
      right: 0;
    }
  }

  ::after {
    position: absolute;
    ${(props) => 
      props.selected > props.index ?
      css `
        left: 100%;
        right: 0;
      ` :
      css `
        left: 0;
        right: 100%;
      `
    }
    bottom: 0;
    height: 2px;
    background-color: var(--main-text-color);
    transition: all 200ms ease;
    content: '';
  }

  ${(props) => 
    props.selected === props.index &&
    css `
      color: var(--main-text-color);
      font-weight: 600;
      ::after {
        right: 0;
      }
    `
  }
`

const Item = (props: TabItemProps) => {
  const selected = useContext(SelectedContext);

  return (
    <ItemStyle selected={selected} {...props}>{props.children}</ItemStyle>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 1.0rem;
  border-bottom: 1px solid var(--tab-border-color);
`

export default Object.assign(Tab, {Item: Item});