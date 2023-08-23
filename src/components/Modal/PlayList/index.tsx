import PlayList from 'components/PlayList';
import { HiOutlineX } from 'react-icons/hi';
import styled from 'styled-components';

const PlayListModal = (props: {setShow: React.Dispatch<React.SetStateAction<boolean>>}) => {
    return (
        <Container>
            <Head>내 재생목록</Head>
            <Close onClick={() => props.setShow(false)}><HiOutlineX size={32} /></Close>
            <ListWrapper>
                <PlayList />
            </ListWrapper>
        </Container>
    )
}

const Button = styled.div`
    display: flex;
    align-items: center;
    padding: 1.0rem 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 200ms ease;
    :hover {
        background-color: var(--navbar-menu-hover);
    }
    svg {
        margin-right: 0.25rem;
    }
`

const ListWrapper = styled.div`
    margin-top: 1.0rem;
`

const Container = styled.div`
    position: relative;
    width: 450px;
    max-width: 100%;
    height: 500px;
    max-height: 100vh;
    background-color: var(--main-bg-color);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
    @media screen and (max-width: 480px) {
        width: 100%;
        height: 100%;
    }
`

const Head = styled.div`
    margin-top: 26px;
    padding: 1.0rem;
    border-left: 0.5rem solid var(--sign-signin-bg-color);
    color: var(--main-text-color);
    font-weight: 400;
    font-size: 1.5rem;
    letter-spacing: 0.1em;
`

const Close = styled.div`
    position: absolute;
    top: 26px;
    right: 18px;
    line-height: 0;
    color: #bebebe;
    cursor: pointer;
    transition: color 200ms ease;
    :hover {
        color: var(--main-text-color);
    }
`

export default PlayListModal;