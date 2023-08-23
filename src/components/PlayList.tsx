import { CiSquarePlus } from 'react-icons/ci'
import styled from 'styled-components'
import FormTextBox from './FormTextBox'
import { useRef } from 'react'

const PlayList = () => {
    return (
        <Container>
            <NewPlayList />
        </Container>
    )
}

const Container = styled.div`

`

const NewPlayList = () => {
    const playListName = useRef(null);
    return (
        <NewPlayList.Container>
            <FormTextBox ref={playListName} placeholder="새로운 플레이리스트" />
            <NewPlayList.Button><CiSquarePlus size={32} /></NewPlayList.Button>
        </NewPlayList.Container>
    )
}

NewPlayList.Container = styled.div`
    display: flex;
    align-items: center;
    padding: 1.0rem;
`

NewPlayList.Button = styled.div`
    
`

export default PlayList;