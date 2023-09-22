import ChannelInfo from 'components/Watch/ChannelInfo';
import { BsShare, BsStar, BsStarFill } from 'react-icons/bs';
import styled, { keyframes } from 'styled-components';

const LiveChannelInfoSkeleton = () => {
    return (
        <ChannelInfo>
            <ChannelInfo.Container>
                <ProfileIcon />
                <ChannelInfo.Detail>
                    <ChannelInfo.Name><Skeleton>Nickname</Skeleton></ChannelInfo.Name>
                    <ChannelInfo.Readership><Skeleton>구독자 1000명</Skeleton></ChannelInfo.Readership>
                </ChannelInfo.Detail>
            </ChannelInfo.Container>
            <ChannelInfo.ButtonListContainer>
                <Subscribe />
                <Share />
            </ChannelInfo.ButtonListContainer>
        </ChannelInfo>
    )
}

const Subscribe = () => {
    return (
        <ChannelInfo.ButtonContainer active={false}>
            <ChannelInfo.IconWrapper size={24}>
                <ChannelInfo.ButtonIcon show={false}>
                    <BsStarFill size={24} />
                </ChannelInfo.ButtonIcon>
                <ChannelInfo.ButtonIcon show={true}>
                    <BsStar size={24} />
                </ChannelInfo.ButtonIcon>
            </ChannelInfo.IconWrapper>
            <ChannelInfo.ButtonName>구독</ChannelInfo.ButtonName>
        </ChannelInfo.ButtonContainer>
    )
}

const Share = () => {
    return (
        <ChannelInfo.ButtonContainer>
            <ChannelInfo.IconWrapper size={24}>
                <ChannelInfo.ButtonIcon show={true}>
                    <BsShare style={{color: 'var(--main-text-color)'}} size={24} />
                </ChannelInfo.ButtonIcon>
            </ChannelInfo.IconWrapper>
            <ChannelInfo.ButtonName>공유</ChannelInfo.ButtonName>
        </ChannelInfo.ButtonContainer>
    )
}

const loading = keyframes`
    0% {
        background-position-x: 0%;
    }
    100% {
        background-position-x: 200%;
    }
`

const Skeleton = styled.div`
    position: relative;
    background-color: var(--skeleton-bg-color);
    background: linear-gradient(90deg, var(--skeleton-bg-color) 0%, var(--skeleton-bg-color-animation) 50%, var(--skeleton-bg-color) 100%) #fdfdfd;
    background-size: 200% 100%;
    color: transparent;
    animation: ${loading} 1500ms infinite linear;
`

const ProfileIcon = styled(Skeleton)`
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

export default LiveChannelInfoSkeleton