import styled, { css } from 'styled-components';
import { HiOutlineX } from 'react-icons/hi';
import React, { useRef, useState, Dispatch, SetStateAction, useEffect } from 'react';
import FormTextBox from 'components/FormTextBox';
import CheckBox from 'components/CheckBox';
import { CSSTransition } from 'react-transition-group';
import Button from './Button';
import { useMutation } from '@tanstack/react-query';
import { Auth } from 'apis';
import { TailSpin } from  'react-loader-spinner'
import { AxiosError, AxiosResponse } from 'axios';
import { LoginParam, LoginResult } from 'apis/Auth';
import useUserQuery from 'hooks/useUserQuery';

interface SignInProps {
    setPage: Dispatch<SetStateAction<number>>,
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
}

const SignIn = ({setPage, show, setShow}: SignInProps) => {
    const id = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const auth = Auth();
    const profile = useUserQuery().Profile();

    useEffect(() => {
        switch(error){
            case 2:
                setErrorMessage('아이디 또는 비밀번호를 확인해 주세요.');
                break;
            case 3:
                id?.current?.focus();
                setErrorMessage('아이디를 입력해 주세요.');
                break;
            case 4:
                password?.current?.focus();
                setErrorMessage('비밀번호를 입력해 주세요.');
                break;
            case 99:
                setErrorMessage('알 수 없는 오류가 발생하였습니다.');
                break;
            default:
                setErrorMessage('');
        }
    }, [error])

    const { mutate, status } = useMutation<AxiosResponse<LoginResult>, AxiosError<LoginResult>, LoginParam>(auth.login, {
        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.data.token);
            localStorage.setItem('id', data.data.id);
            localStorage.setItem('userid', data.data.userid);
            localStorage.setItem('nickname', data.data.nickname);            
            profile.update();
            setShow(false);
        },
        onError: (error) => {
            setError(error.response?.data?.code || 99);
        }
    });

    const loginAttempt = () => {
        setError(0);
        mutate({id: id?.current?.value || '', password: password?.current?.value || ''});
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(status === 'loading') return;
        loginAttempt();
    }

    const nodeRef = useRef<HTMLDivElement>(null);
    return (
        <CSSTransition in={show} nodeRef={nodeRef} timeout={300} classNames="up-swipe" unmountOnExit>
            <Container ref={nodeRef}>
                <Form onSubmit={handleSubmit}>
                    <Head>로그인</Head>
                    <Close onClick={() => setShow(false)}><HiOutlineX size={32} /></Close>
                    <FormTextBox warning={error === 3} ref={id} label="ID" />
                    <FormTextBox warning={error === 4} ref={password} type="password" label="PASSWORD" />
                    <Error visible={error !== 0}>{errorMessage}</Error>
                    <SignInContainer>
                        <CheckBox id="auto_login">자동 로그인</CheckBox>
                        <Button type="submit" disabled={status === 'loading'}>{status === 'loading' ? <TailSpin height={24} width={24} color="#fff" visible={true} /> : '로그인'}</Button>
                    </SignInContainer>
                    
                    <SignUp onClick={() => setPage(1)}>회원가입</SignUp>
                </Form>
            </Container>
        </CSSTransition>
    )
}

const Form = styled.form`
    width: 100%;
`

const Error = styled.div<{visible: boolean}>`
    height: 1.0rem;
    margin-top: -0.5rem;
    margin-bottom: 1.0rem;
    color: var(--red);
    font-weight: 400;

    ${(props) => props.visible ? css `
        opacity: 1;
        transition: all ease-in-out 200ms;
    ` : css `
        opacity: 0;
    `}
`

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0 3.0rem;
    background-color: var(--main-bg-color);
`

const Head = styled.div`
    position: absolute;
    top: 26px;
    left: 0;
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

const SignInContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    width: 100%;
`

const SignUp = styled.div`
    display: inline;
    color: #0066ff;
    font-weight: 400;
    letter-spacing: 1px;
    cursor: pointer;
`

export default React.memo(SignIn);