import styled from "styled-components";
import { useRef, ReactNode } from 'react';
import useRippleEffect from "hooks/useRippleEffect";

interface ButtonProps {
    children: ReactNode
}

const Button = ({children}: ButtonProps) => {
    const ref = useRef(null);
    const ripple = useRippleEffect(ref, 'rgba(255, 255, 255, 0.2)');
    return (
        <StyledButton ref={ref}>{children}{ripple}</StyledButton>
    )
}

const StyledButton = styled.button`
    justify-content: flex-end;
    position: relative;
    width: 120px;
    height: 48px;
    max-width: 100%;
    background-color: var(--sign-signin-bg-color);
    border: 0;
    border-radius: 2px;
    color: #fff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    font-size: 1.25rem;
    font-weight: 400;
    letter-spacing: 1px;
    cursor: pointer;
    overflow: hidden;
    transition: all 200ms ease;
    @media screen and (min-width: 481px) {
        :hover {
            background-color: var(--sign-signin-bg-color-hover);
        }
    }
    :active {
        background-color: var(--sign-signin-bg-color-active);
    }
`

export default Button;