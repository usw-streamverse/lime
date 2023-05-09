import styled from 'styled-components';
import Search from "./Search";
import VideoItem from './VideoItem';
import { useState } from 'react';
const Main = () => {
    return (
        <div>
            <SearchWrap><Search /></SearchWrap>
            <Wrap>
                <VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem /><VideoItem />
            </Wrap>
        </div>
    )
}

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