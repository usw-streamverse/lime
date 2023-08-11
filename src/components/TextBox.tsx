import { ReactNode, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

interface TextBoxProps {
    width: string,
    icon: ReactNode,
    placeholder: string
}

const TextBox = ({width, icon, placeholder}: TextBoxProps) => {
    const [focus, setFocus] = useState<boolean>(false);
    const refText = useRef<HTMLInputElement>(null);
    return (
        <div style={{width: width}}>
            <Wrap focus={focus} onClick={() => refText.current?.focus()}>
                {
                    {icon} && <Icon>{icon}</Icon>
                }
                <Input type="text" ref={refText} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} placeholder={placeholder} />
            </Wrap>
        </div>
    )
}

export default TextBox;

const Wrap = styled.div<{focus: Boolean}>`
    display: flex;
    background-color: var(--textbox-bg-color);
    box-shadow: var(--textbox-shadow) 0 0 2px 1px;
    border: 1px solid var(--textbox-border-color);
    transition: all 200ms ease;
    ${(props) => props.focus && css `
        box-shadow: var(--textbox-shadow-focus) 0 0 1px 1px;
        border: 1px solid var(--textbox-border-color-focus);
    `}
`

const Icon = styled.div`
    display: flex;
    align-items: center;
    margin-left: 0.75rem;
    color: var(--main-text-color);
`

const Input = styled.input`
    height: 3.25rem;
    width: 100%;
    padding: 0 0.75rem;
    background-color: transparent;
    border: 0;
    color: var(--main-text-color);
    font-size: 1rem;
    font-weight: 400;
    cursor: text;

`;
