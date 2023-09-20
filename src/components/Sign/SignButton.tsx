import styled from "styled-components";
import { useRef, ReactNode, MouseEventHandler } from 'react';
import useRippleEffect from "hooks/useRippleEffect";

interface ButtonProps {
    children: ReactNode,
    onClick?: MouseEventHandler,
    disabled?: boolean,
    type?: string,
}

const SignButton = ({children, onClick, disabled = false, type = 'button'}: ButtonProps) => {
    const ref = useRef(null);
    const ripple = useRippleEffect(ref, 'rgba(255, 255, 255, 0.2)');

    return (
        <StyledButton ref={ref} type={type === 'submit' ? 'submit' : 'button'} onClick={onClick} disabled={disabled}>{children}{ripple}</StyledButton>
    )
}

const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 120px;
    height: 48px;
    max-width: 100%;
    background-color: var(--sign-signin-bg-color);
    border: 0;
    border-radius: 2px;
    color: #fff;
    font-size: 1.125rem;
    font-weight: 500;
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
        //background-color: var(--sign-signin-bg-color-active);
    }
`

export default SignButton;