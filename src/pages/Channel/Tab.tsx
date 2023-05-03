import React, { ReactNode, createContext, useContext } from 'react';
import styled, { css } from 'styled-components';

interface TabItemProps extends React.DOMAttributes<HTMLDivElement> {
    name: string
}

const SelectedContext = createContext<string>('');

const Tab = (props: {children: ReactNode, selected: string}) => {
    return (
        <SelectedContext.Provider value={props.selected}>
            <Container>
                {props.children}
            </Container>
        </SelectedContext.Provider>
    );
}

const Item = (props: TabItemProps) => {
    const selected = useContext(SelectedContext);
    const Item = styled.div<{name: string}>`
        padding: 1.25rem 1.5rem;
        color: var(--main-text-color-light);
        font-weight: 400;
        cursor: pointer;
        transition: all 200ms ease;
        :hover {
            color: var(--main-text-color);
            font-weight: 600;
            box-shadow: 0 -2px 0 0 var(--main-text-color) inset;
        }
        ${(props) => 
            props.name === selected &&
            css `
                color: var(--main-text-color);
                font-weight: 600;
                box-shadow: 0 -2px 0 0 var(--main-text-color) inset;
            `
        }
    `
    return (
        <Item {...props}>{props.children}</Item>
    )
}
Tab.Item = Item;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 1.0rem;
    border-bottom: 1px solid var(--tab-border-color);
`

export default Tab;