import { ReactNode } from 'react';
import styled from 'styled-components';

const Tab = (props: {children: ReactNode}) => {
    return (
        <Container>
            {props.children}
        </Container>
    )
}

Tab.Item = styled.div`
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
`

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 1.0rem;
    border-bottom: 1px solid var(--tab-border-color);
`

export default Tab;