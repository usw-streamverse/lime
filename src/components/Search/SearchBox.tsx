import { SlMagnifier } from 'react-icons/sl';
import TextBox from 'components/TextBox';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { KeyboardEvent, useRef } from 'react';

const SearchBox = (props: {defaultValue?: string}) => {
    const navigate = useNavigate();
    const refTextbox = useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.keyCode === 13 && refTextbox.current?.value.trim() !== '')
            navigate(`/search/${refTextbox.current?.value}`);
    }

    return (
        <Wrap>
            <TextBox width="100%" ref={refTextbox} onKeyDown={handleKeyDown} icon={<SlMagnifier size={14} />} placeholder="검색어를 입력하세요." defaultValue={props.defaultValue} />
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 350px;
    @media screen and (max-width: 480px) {
        width: 100%;
    }
`

export default SearchBox;