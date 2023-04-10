import { ReactNode, useRef } from 'react';
import styled, { css } from 'styled-components';
import { RxCheck } from 'react-icons/rx';

interface CheckBoxProps {
    id: string,
    children: ReactNode
}

const CheckBox = ({id, children}: CheckBoxProps) => {
    const refCheckBox = useRef<HTMLInputElement>(null);
    return (
        <Container>
            <label htmlFor={id}>
                <input id={id} ref={refCheckBox} type="checkbox" />
                <span><RxCheck /></span>
                {children}
            </label>
        </Container>
    )
}

const Container = styled.div`
    label {
        display: flex;
        align-items: center;
        font-weight: 400;
        cursor: pointer;
    }
    input {
        display: none;

        + span {
            display: inline-block;            
            width: 1.5rem;
            height: 1.5rem; 
            margin-right: 0.5rem;
            border: 1px solid #919191;
            border-radius: 2px;
            svg {
                width: 100%;
                height: 100%;
                transform: scale(0);
                transition: all 50ms ease;
            }
        }

        :checked + span {   
            svg {
                transform: scale(1);
            }
        }
    }

`

export default CheckBox;
