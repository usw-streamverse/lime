import { useRef, useState } from 'react';
import styled, { css } from 'styled-components';

interface FormTextBoxProps {
    label: string
    type?: string
}

const FormTextBox = ({label, type = 'text'}: FormTextBoxProps) => {
    const [focus, setFocus] = useState<boolean>(false);
    const refText = useRef<HTMLInputElement>(null);
    return (
        <Wrap focus={focus} onClick={() => refText.current?.focus()}>
            <Label>{label}</Label>
            <Input type={type} ref={refText} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
        </Wrap>
    )
}

export default FormTextBox;

const Wrap = styled.div<{focus: Boolean}>`
    width: 100%;
    color: #797979;
    ${(props) => props.focus && css `
        div {
            color: var(--main-text-color);
        }
        input {
            border-bottom: 1px solid var(--sign-textbox-border-color-focus);
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

const Input = styled.input`
    width: 100%;
    height: 3.0rem;
    padding: 0 1.0rem;
    margin-bottom: 2.0rem;
    background-color: transparent;
    border: 0;
    border-bottom: 1px solid var(--sign-textbox-border-color);
    color: var(--main-text-color);
    font-weight: 400;
    transition: all 200ms ease;
`;
