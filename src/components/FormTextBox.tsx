import { RefObject, forwardRef, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

interface FormTextBoxProps {
    label: string,
    type?: string,
    warning?: boolean,
    labelSize?: number,
    labelWeight?: number
}

const FormTextBox = forwardRef<HTMLInputElement, FormTextBoxProps>(({label, type = 'text', warning = false, labelSize = 0.875, labelWeight = 600}: FormTextBoxProps, ref) => {
    const [focus, setFocus] = useState<boolean>(false);

    return (
        <Wrap focus={focus} onClick={() => {if(typeof ref !== 'function' && ref) ref.current?.focus()}} warning={warning}>
            <Label size={labelSize} weight={labelWeight}>{label}</Label>
            <Input type={type} ref={ref} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} warning={warning} />
        </Wrap>
    )
});

export default FormTextBox;

const Wrap = styled.div<{focus: Boolean, warning: boolean}>`
    width: 100%;
    color: ${(props) => props.warning ? 'var(--red)' : '#797979'};
    ${(props) => props.focus && css `
        div {
            color: var(${props.warning ? '--red' : '--sign-textbox-border-color-focus'});
        }
        input {
            border: 1px solid var(${props.warning ? '--red' : '--sign-textbox-border-color-focus'});
        }
    `}
`

const Label = styled.div<{size: number, weight: number}>`
    margin-bottom: 0.75rem;
    font-size: ${(props) => props.size}rem;
    font-weight: ${(props) => props.weight};
    letter-spacing: 1px;
    text-align: left;
    transition: all 200ms ease;
`

const Input = styled.input<{warning: boolean}>`
    width: 100%;
    height: 3.5rem;
    padding: 0 1.0rem;
    margin-bottom: 2.0rem;
    background-color: transparent;  
    border-radius: 2px;
    ${(props) => props.warning ? css `
        border: 1px solid var(--red);
        color: var(--red);
    `: css `
        border: 1px solid var(--sign-textbox-border-color);
        color: var(--main-text-color);
    ` 
    }
    font-weight: 400;
    transition: all 200ms ease;
`;
