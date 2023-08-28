import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Select = (props) => {
    const [selected, setSelected] = useState(0);
    const [show, setShow] = useState(false);

    const Click = (index) => {
        if(props.value)
            props.value.current = props.option[index][1];
        setSelected(index);
        setShow(false);
    }

    useEffect(() => {
        if(props.value)
            props.value.current = props.option[0][1];
    }, [props.value, props.option])

    return (
        <SelectBox style={{width: props.width}} show={show}>
            <div onClick={() => setShow(!show)}>{props.option.length > 0 ? props.option[selected][0] : ''}</div>
            <ul style={{display: show ? 'block' : 'none'}}>
                {
                    props.option.map((i, index) => {
                        return (
                            <li key={i[1]} onClick={() => Click(index)}>{i[0]}</li>
                        );
                    })
                }
            </ul>
        </SelectBox>
    )
}

export default Select;

const slide_animation = keyframes `
  0%{
    transform: scaleY(0);
    opacity: 0;
  }
  100%{
    transform: scaleY(1);
    opacity: 1;
  }
`;

const SelectBox = styled.div`
    position: relative;
    height: 3.75rem;
    background-color: var(--select-bg-color);
    border: 1px solid var(--select-border-color);
    border-radius: 0.25em;
    color: var(--main-text-color);
    font-size: 1.0rem;
    cursor: pointer;
    box-shadow: ${props =>
        (props.show ? '0 0 0 1px var(--select-shadow-inset) inset, 0 0 5px 2px var(--select-shadow-hover) inset'
        : '0 0 0 1px var(--select-shadow-inset) inset')
    };
    transition: all 150ms ease;
    :hover {
        box-shadow: 0 0 0 1px var(--select-shadow-inset) inset, 0 0 5px 2px var(--select-shadow-hover) inset;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: absolute;
        left: 0; right: 0;
        top: 0; bottom: 0;
        padding: 0 1rem;
    }

    ul {
        position: absolute;
        display: none;
        top: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        border: 1px solid var(--select-border-color);
        list-style: none;
        transform-origin: 50% 0;
        z-index: 99;
        animation: ${slide_animation} 150ms ease 1;
        li {
            width: 100%;
            padding: 1rem;
            background-color: var(--select-bg-color);
            border: 1px solid var(--select-shadow-inset);
            border-top: 0;
            border-bottom: 1px solid var(--select-option-border-color);
            transition: all 200ms ease;
            :hover {
                background-color: var(--select-option-bg-color-hover);
            }
            :first-child {
                border-top: 1px solid var(--select-shadow-inset);
            }
            :last-child {
                border-bottom: 1px solid var(--select-shadow-inset);
            }
        }
    }
`;