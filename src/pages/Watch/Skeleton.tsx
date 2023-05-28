import styled, {keyframes} from 'styled-components';


const WatchSkeleton = () => {
    return (
        <>
            <Skeleton style={{width: '100%', aspectRatio: '16 / 9'}} />
            <InnerContainer>
                <Skeleton style={{width: '220px', height: '1.875rem', marginTop: '1.5rem'}} />
                <Skeleton style={{width: '120px', height: '1.0rem', margin: '0.5rem 0'}} />
                <Skeleton style={{width: '100%', height: '3.5rem', marginTop: '1.5rem', padding: '1.0rem'}} />
            </InnerContainer>
        </>
    )
}

const InnerContainer = styled.div`
    @media screen and (max-width: 480px) {
        padding: 1.25rem;
        padding-top: 0;
    }
`

const loading = keyframes`
    0% {
        background-position-x: 0%;
    }
    100% {
        background-position-x: 200%;
    }
`;

const Skeleton = styled.div`
    position: relative;
    background-color: #fdfdfd;
    background: linear-gradient(90deg, #fdfdfd 0%, #ececec 50%, #fdfdfd 100%) #fdfdfd;
    background-size: 200% 100%;
    animation: ${loading} 1500ms infinite linear;
`

export default WatchSkeleton;