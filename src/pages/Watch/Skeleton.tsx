import styled, {keyframes} from 'styled-components';

const WatchSkeleton = () => {
    return (
        <>
            <Skeleton style={{width: '100%', aspectRatio: '16 / 9'}} />
            <InnerContainer>
                <Skeleton style={{width: '220px', fontSize: '1.875rem', marginTop: '1.5rem'}}>Title</Skeleton>
                <Skeleton style={{width: '120px', fontSize: '1.0rem', margin: '0.5rem 0'}}>Date</Skeleton>
                <Skeleton style={{width: '100%', lineHeight: '1.5rem', marginTop: '1.5rem', padding: '1.0rem'}}>Body</Skeleton>
                <ChannelInfo />
            </InnerContainer>
        </>
    )
}

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
    color: transparent;
    animation: ${loading} 1500ms infinite linear;
`

const InnerContainer = styled.div`
    @media screen and (max-width: 480px) {
        padding: 1.25rem;
        padding-top: 0;
    }
`
const ChannelInfo = () => {
    return (
        <ChannelInfoStyle>
            <ChannelInfo.Container>
                <ChannelInfo.ProfileIcon />
                <ChannelInfo.Detail>
                    <Skeleton style={{width: '80px'}}>Channel</Skeleton>
                    <Skeleton style={{width: '100px'}}>Readership</Skeleton>
                </ChannelInfo.Detail>
            </ChannelInfo.Container>
            <ChannelInfo.ButtonListContainer>
                <Skeleton style={{width: '5.25rem', height: '5.25rem'}} />
                <Skeleton style={{width: '5.25rem', height: '5.25rem'}} />
                <Skeleton style={{width: '5.25rem', height: '5.25rem'}} />
                <Skeleton style={{width: '5.25rem', height: '5.25rem'}} />
            </ChannelInfo.ButtonListContainer>
        </ChannelInfoStyle>
    )
}

const ChannelInfoStyle = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    margin: 1.75rem 0;
`

ChannelInfo.Container = styled.div`
    display: flex;
    align-items: center;
`

ChannelInfo.Detail = styled.div`
    width: 13.0rem;
    font-size: 1.0625rem;
    @media screen and (max-width: 480px) {
        font-size: 1.0rem;
    }
`

ChannelInfo.ProfileIcon = styled(Skeleton)`
    width: 48px;
    height: 48px;
    margin-right: 12px;
    border-radius: 50%;
    @media screen and (max-width: 480px) {
        width: 32px;
        height: 32px;
        margin-right: 8px;
    }
`

ChannelInfo.ButtonListContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
    @media screen and (max-width: 480px) {
        flex: 1 0 100%;
        justify-content: center;
        margin-top: 1.0rem;
    }
`

export default WatchSkeleton;