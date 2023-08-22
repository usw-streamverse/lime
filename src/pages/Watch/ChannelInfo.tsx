import { ReactNode } from 'react'
import styled from 'styled-components'

const ChannelInfo = (props: {children: ReactNode}) => {
    return <ChannelInfoStyle>{props.children}</ChannelInfoStyle>
}

const ChannelInfoStyle = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    margin: 1.75rem 1.25rem;
`

ChannelInfo.Detail = styled.div`
    width: 13.0rem;
    font-size: 1.0625rem;
    @media screen and (max-width: 480px) {
        font-size: 1.0rem;
    }
`

ChannelInfo.Name = styled.div`
    font-weight: 400;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

ChannelInfo.Readership = styled.div`
    color: var(--main-text-color-light);
    font-weight: 400;   
`

ChannelInfo.ProfileIcon = styled.div`
    width: 48px;
    height: 48px;
    margin-right: 12px;
    background-color: #a0a0a0;
    border-radius: 50%;
    @media screen and (max-width: 480px) {
        width: 32px;
        height: 32px;
        margin-right: 8px;
    }
`

ChannelInfo.Container = styled.div`
    display: flex;
    align-items: center;
`

ChannelInfo.ButtonListContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
    @media screen and (max-width: 600px) {
        flex: 1 0 100%;
        justify-content: center;
        margin-top: 1.0rem;
    }
`
ChannelInfo.ButtonContainer = styled.div<{active?: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 5.25rem;
    height: 5.25rem;
    color: var(${(props) => props.active ? '--blue' : '--gray'});
    cursor: pointer;
    transition: all 150ms ease;
    z-index: 0;
    ::after {
        position: absolute;
        border-radius: 50%;
        background-color: var(--watch-channel-menu-ripple);
        width: 100%;
        height: 100%;
        opacity: 0;
        transform: scale(1);
        transition: transform 400ms ease, opacity 800ms ease;
        z-index: -1;
        content: '';
    }

    :active {
        ::after {
            opacity: 0.66;
            transform: scale(0);
            transition: all 0ms;
        }
        svg {
            transform: scale(0.85);
            transition: all 200ms ease;
        }
    }


    ${(props) => !props.active && `
        @media screen and (min-width: 481px) {
            :hover {
                color: var(--main-text-color-light);
            }
        }
    `};
`
 
ChannelInfo.IconWrapper = styled.div<{size: number}>`
    position: relative;
    margin-bottom: 0.5rem;
    ${(props) => 
    `
    width: ${props.size}px;
    height: ${props.size}px;
    `
    }
`

ChannelInfo.ButtonIcon = styled.div<{show: boolean}>`
    position: absolute;
    ${(props) => props.show ? 
    `
        opacity: 1.0;
        transition: all 400ms ease;
    `:
    `
        opacity: 0;
        transform: scale(0) rotateX(180deg);
        transition: all 400ms ease;
    `}
`

ChannelInfo.ButtonName = styled.div`
    margin-top: 0.25rem;
    color: var(--main-text-color);
    font-weight: 400;
`

export default ChannelInfo;