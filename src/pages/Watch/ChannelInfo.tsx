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
    margin: 0 0.25rem;
    padding: 0.625rem;
    border-radius: 0.5rem;
    color: var(${(props) => props.active ? '--blue' : '--gray'});
    cursor: pointer;
    transition: all 150ms ease;
    
    :hover {
        background-color: rgb(170, 170, 170, 0.15);
    }
    :active {
        background-color: rgb(170, 170, 170, 0.3);
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