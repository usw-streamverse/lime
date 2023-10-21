import { SlMagnifier } from 'react-icons/sl';
import TextBox from 'components/TextBox';
import styled from 'styled-components';
import { useHref, useNavigate } from 'react-router-dom';
import { KeyboardEvent, useRef } from 'react';

const SearchBox = (props: {defaultValue?: string, replaceState?: boolean, onSearch?: (query: string) => void}) => {
  const navigate = useNavigate();
  const refTextbox = useRef<HTMLInputElement>(null);
  const hrefSearch = useHref('/search');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const query = refTextbox.current?.value.trim() || '';
    if(e.keyCode === 13 && query !== ''){
      props.replaceState ? window.history.replaceState('', '', `${hrefSearch}/${query}`) : navigate(`/search/${query}`);
      props.onSearch && props.onSearch(query);
    }
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