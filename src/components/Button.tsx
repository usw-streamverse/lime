import styled from "styled-components";
import { useRef, ReactNode, MouseEventHandler } from 'react';
import useRippleEffect from "hooks/useRippleEffect";

interface ButtonProps {
    children: ReactNode,
    onClick?: MouseEventHandler,
    disabled?: boolean,
    type?: string,
    bgColor: string,
    borderColor?: string,
    color: string,
    bgColorOver: string,
}

const Button = ({children, onClick, disabled = false, type = 'button', bgColor, borderColor='#575757', color, bgColorOver}: ButtonProps) => {
    const ref = useRef(null);
    const ripple = useRippleEffect(ref, 'rgba(255, 255, 255, 0.2)');

    return (
        <StyledButton ref={ref} type={type === 'submit' ? 'submit' : 'button'} bgColor={bgColor} borderColor={borderColor} color={color} bgColorOver={bgColorOver} onClick={onClick} disabled={disabled}>{children}{ripple}</StyledButton>
    )
}

Button.Group = styled.div`
    display: flex;
    button:first-child {
        border-radius: 0;
        border-top-left-radius: 0.125rem;
        border-bottom-left-radius: 0.125rem;
        border-right: 0;
    }
    button:last-child {
        border-radius: 0;
        border-top-right-radius: 0.125rem;
        border-bottom-right-radius: 0.125rem;
        border-left: 0;
    }
`

const StyledButton = styled.button<{bgColor: string, borderColor: string, color: string, bgColorOver: string}>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    max-width: 100%;
    padding: 1.0rem 1.75rem;
    border: 1px solid ${(props) => props.borderColor};
    border-radius: 2px;
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.color};
    font-size: 1.0625rem;
    font-weight: 400;
    cursor: pointer;
    overflow: hidden;
    transition: all 200ms ease;
    @media screen and (min-width: 481px) {
        :hover {
            background-color: ${(props) => props.bgColorOver};
        }
    }
    :active {
        //background-color: var(--sign-signin-bg-color-active);
    }
`

export default Button;