import { HTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

const Card = (props: HTMLAttributes<HTMLDivElement>) => {
    return (
        <Container {...props}>
            {props.children}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 250px;
    height: 200px;
    margin: 0 0.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 200ms ease;
    :hover {
        .description {
            margin-top: 72px;
            opacity: 1;
        }
    }
    :active {
        svg {
            transform: scale(0.9);
        }
    }
    :first-child {
        margin-left: 0;
    }
    :last-child {
        margin-right: 0;
    }
    @media screen and (max-width: 480px) {
        .description {
            margin-top: 72px;
            opacity: 1;
        }
    }
`

Card.Container = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
`

Card.Icon = styled.div`
    position: absolute;
    top: 24px;
    color: #535353;
    svg {
        transition: all 200ms ease;
    }
`

const Description = (props: {children: ReactNode}) => {
    return (
        <Description.Container className="description">{props.children}</Description.Container>
    )
}

Description.Container = styled.div`
    padding: 0 1.0rem;
    margin-top: 108px;
    font-weight: 300;
    word-break: keep-all;
    opacity: 0;
    transition: all 200ms ease;
`

Card.Description = Description;

export default Card