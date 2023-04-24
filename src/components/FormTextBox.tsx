import { forwardRef, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

interface FormTextBoxProps {
    label: string,
    type?: string,
    warning?: boolean
}

const FormTextBox = forwardRef<HTMLInputElement, FormTextBoxProps>(({label, type = 'text', warning = false}: FormTextBoxProps, ref) => {
    const [focus, setFocus] = useState<boolean>(false);

    return (
        <Wrap focus={focus} onClick={() => {if(typeof ref !== 'function' && ref) ref.current?.focus()}} warning={warning}>
            <Label>{label}</Label>
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

const Label = styled.div`
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
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
    border: 1px solid var(--sign-textbox-border-color);  
    border-radius: 2px;
    color: var(--main-text-color);
    font-weight: 400;
    transition: all 200ms ease;
`;
