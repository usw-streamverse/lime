import { SlMagnifier } from 'react-icons/sl';
import TextBox from 'components/TextBox';
import styled from 'styled-components';

const Search = () => {
    return (
        <Wrap>
            <TextBox width="100%" icon={<SlMagnifier size={14} />} placeholder="검색어를 입력하세요." />
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 350px;
    @media screen and (max-width: 480px) {
        width: 100%;
    }
`

export default Search;