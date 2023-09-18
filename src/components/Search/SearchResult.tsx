import styled from 'styled-components';
import { SearchItem as searchItem } from 'apis/Search';
import { useNavigate } from 'react-router-dom';
import { getDifferenceTimeFormat, getDurationFormat, getKSTfromUTC } from 'utils/Time';
import { CiCloudDrizzle } from 'react-icons/ci';

const NoResult = () => {
    return (
        <NoResult.Container>
            <CiCloudDrizzle size={64} />
            <NoResult.Text>검색 결과가 존재하지 않습니다.</NoResult.Text>
        </NoResult.Container>
    )
}

NoResult.Container = styled.div`
    text-align: center;
`

NoResult.Text = styled.div`
    margin-top: 0.5rem;
    font-weight: 500;
`

const SearchResult = (props: {item: searchItem[]}) => {
    return (
        <ResultContainer>
        {
            props.item.length ? 
            props.item.map((e) => {
                return <SearchItem key={e.id} {...e} />
            })
            : <NoResult />
        }
        </ResultContainer>
    )
}

const ResultContainer = styled.div`
    position: relative;
`

const SearchItem = (props: searchItem) => {
    const navigate = useNavigate();
    return (
        <Container onClick={(e) => navigate(`/watch/${props.id}`)}>
            <Thumbnail>
                <img src={props.thumbnail} alt="Thumbnail" />
                <Duration>{getDurationFormat(props.duration)}</Duration>
            </Thumbnail>
            <Infor>
                <Title>{props.title}</Title>
                <Detail>조회수 {props.view_count}회 · {getDifferenceTimeFormat(getKSTfromUTC(props.created))}</Detail>
                <Uploader><ProfileIcon profileColor={props.profile} />{props.nickname}</Uploader>
                <Explanation>{props.explanation}</Explanation>
            </Infor>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    padding: 1.0rem 0;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all 200ms ease;
    @media screen and (max-width: 768px) {
        display: block;
        padding: 0;
    }
    
`

const ProfileIcon = styled.div<{profileColor: string}>`
    width: 2.0rem;
    height: 2.0rem;
    margin-right: 0.5rem;
    background-color: ${props => props.profileColor};
    border-radius: 50%;
`

const Thumbnail = styled.div`
    position: relative;
    width: 400px;
    aspect-ratio: 16/9;
    line-height: 0;
    img {
        width: 100%;
        height: 100%;
        border-radius: 0.25rem;
        pointer-events: none;
    }
    @media screen and (max-width: 1024px) {
        width: 300px;
    }
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`

const Infor = styled.div`
    padding: 0 1.0rem;
    width: calc(100% - 400px);
    @media screen and (max-width: 1024px) {
        width: calc(100% - 300px);
    }
    @media screen and (max-width: 768px) {
        width: 100%;
        margin: 0.5rem 0 1.0rem 0;
        padding: 0;
    }
`

const Duration = styled.span`
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    padding: 0.75rem 0.5rem;
    background-color: rgba(0, 0, 0, 0.66);
    border-radius: 0.25rem;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 400;
`

const Title = styled.div`
    font-size: 1.25rem;
    font-weight: 400;
`

const Uploader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
    color: var(--main-text-color-light);
    font-size: 1.125rem;
    font-weight: 500;
`

const Detail = styled.div`
    margin-top: 0.375rem;
    margin-bottom: 0.75rem;
    color: var(--main-text-color-light);
    font-size: 1.0rem;
    font-weight: 300;
`

const Explanation = styled.div`
    margin-bottom: 0.25rem;
    color: var(--main-text-color-light);
    font-size: 1.125rem;
    font-weight: 300;
    word-break: break-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    @media screen and (max-width: 768px) {
        display: none;
    }
 `

export default SearchResult;