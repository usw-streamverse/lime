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
    margin: 1.75rem 0;
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
    white-space:nowrap;
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
    @media screen and (max-width: 480px) {
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

    ::after {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        z-index: -1;
        transition: all 150ms ease-in-out;
        content: '';
    }

    :active {
        ::after {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 0.5rem;
            background-color: rgb(170, 170, 170, 0.3);
        }
    }

    @media screen and (min-width: 481px) {
        :hover {
            ::after {
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 0.5rem;
                background-color: rgb(170, 170, 170, 0.15);
            }
        }
    }
`
 

ChannelInfo.ButtonIcon = styled.div`
    
`

ChannelInfo.ButtonName = styled.div`
    margin-top: 0.25rem;
    color: var(--main-text-color);
    font-weight: 500;
`

export default ChannelInfo;