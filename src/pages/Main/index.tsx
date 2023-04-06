import styled from 'styled-components';
import Search from "./Search";

const Main = () => {
    return (
        <div>
            <SearchWrap><Search /></SearchWrap>
            <Wrap>
                <Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail /><Thumbnail />
            </Wrap>
        </div>
    )
}

const Thumbnail = styled.div`
    display: inline-block;
    width: calc(50% - 12px);
    aspect-ratio: 16/9;
    margin: 6px;
    background-color: #000;
`

const Wrap = styled.div`
    padding: 1.5rem;
    padding-top: 0.5rem;
    @media screen and (max-width: 480px) {
        padding: 1.0rem;
    }
`

const SearchWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    position: sticky;
    top: 3.5rem;
    padding: 1.5rem;
    padding-bottom: 1.0rem;
    background-color: var(--main-bg-color);
`

export default Main;