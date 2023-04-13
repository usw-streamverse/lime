import { createGlobalStyle } from 'styled-components'
import Pretendard_Regular from 'assets/fonts/Pretendard-Regular.woff2'
import Pretendard_SemiBold from 'assets/fonts/Pretendard-SemiBold.woff2'
import Pretendard_Light from 'assets/fonts/Pretendard-Light.woff2'

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Pretendard';
        src: local('Pretendard Light'), url(${Pretendard_Light}) format('woff');
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pretendard';
        src: local('Pretendard Regular'), url(${Pretendard_Regular}) format('woff');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pretendard';
        src: local('Pretendard SemiBold'), url(${Pretendard_SemiBold}) format('woff');
        font-weight: 600;
        font-style: normal;
    }
    
    *, *::before, *::after {
        box-sizing: border-box;
        font-family: 'Pretendard', sans-serif;
        font-weight: bold;
        user-select: none;
        outline: none;
        -webkit-tap-highlight-color: transparent;
    }

    html {
        font-size: 14px;
    }
    
    body {
        --main-bg-color: #fff;
        --main-text-color: #000;
        --button-text-color: #000;
        --navbar-bg-color: #fff;
        --navbar-border-color: #e5e5e5;
        --navbar-item-bg-color: #fff;
        --navbar-menu-hover: #ededed;
        --navbar-menu-active: #bdbdbd;
        --navbar-menu-text-color-inactive: #778495;
        --navbar-menu-text-color-active: #000;
        --navbar-menu-icon-color-active: #03cb00;
        --select-bg-color: #fff;
        --select-shadow-inset: #e9e9e9;
        --select-shadow-hover: #668ddd33;
        --select-border-color: #747474;
        --select-option-border-color: #efefef;
        --select-option-bg-color-hover: #eaf2ff;
        --textbox-bg-color: #fff;
        --textbox-border-color: #878787;
        --textbox-border-color-focus: #e5e5e5;
        --textbox-shadow: #e5e5e5;
        --textbox-shadow-focus: #0049ed;
        --sign-textbox-border-color: #bbbbbb;
        --sign-textbox-border-color-focus: #585858;
        --sign-signin-bg-color: #2486ff;
        --sign-signin-bg-color-hover: #4b9bff;
        --sign-signin-bg-color-active: #0068eb;
    }

    body.dark {
        --main-bg-color: #292a2c;
        --main-text-color: #fff;
        --button-text-color: #fff;
        --navbar-bg-color: #141414;
        --navbar-border-color: #101010;
        --navbar-item-bg-color: #141414;
        --navbar-menu-hover: #383838;
        --navbar-menu-active: #0e0e0e;
        --navbar-menu-text-color-inactive: #77797c;
        --navbar-menu-text-color-active: #fff;
        --navbar-menu-icon-color-active: #029d00;
        --select-bg-color: #161616;
        --select-shadow-inset: #343434;
        --select-shadow-hover: #d2d2d21a;
        --select-border-color: #101010;
        --select-option-border-color: #1e1e1e;
        --select-option-bg-color-hover: #2a2a2a;
        --textbox-bg-color: #141414;
        --textbox-border-color: #111;
        --textbox-border-color-focus: #111;
        --textbox-shadow: #181818;
        --textbox-shadow-focus: #0041b7;
        --sign-textbox-border-color: #666666;
        --sign-textbox-border-color-focus: #e4e4e4;
        --sign-signin-bg-color: #006aef;
        --sign-signin-bg-color-hover: #2486ff;
        --sign-signin-bg-color-active: #0052b9;
    }

    body {
        margin: 0;
        background: var(--main-bg-color);
        color: var(--main-text-color);
        overflow: hidden overlay;
        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            background-color: #e6e6e6;
        }
        ::-webkit-scrollbar-thumb {
            background: #979cab;
            border-radius: 4px;
        }

        &.preventScroll {
            @media screen and (max-width: 1024px) {
                overflow-y: hidden !important; // preventScroll for offCanvas
            }
        }
    }

    /*
    <!-- transition-animation
    */

    .fade-enter {
        position: absolute;
        width: 100%; height: 100%;
        transform: scale(0.95);
        opacity: 0;
        transition: all 200ms ease;
    }
    
    .fade-enter-active {
        position: absolute;
        width: 100%; height: 100%;
        transform: scale(1);
        opacity: 1;
        transition: all 200ms ease;
    }
    
    .fade-exit {
        position: absolute;
        width: 100%; height: 100%;
        opacity: 1;
        transition: all 200ms ease;
        pointer-events: none;
    }
    
    .fade-exit-active {
        position: absolute;
        width: 100%; height: 100%;
        opacity: 0;
        transition: all 200ms ease;
        pointer-events: none;
    }

    .transition-wrap {
        position: relative;
        height: 100%;
        > div {
            height: 100%;
        }
    }

    .modal-enter {
        opacity: 0;
        > div {
            transform: scale(0.9);
        }
    }

    .modal-enter-active {
        opacity: 1;
        transition: all 200ms ease;
        > div {
            transform: scale(1);
            transition: all 200ms ease;
        }
    }

    .modal-exit {
        opacity: 1;
    }

    .modal-exit-active {
        opacity: 0;
        transition: all 200ms ease;
        > div {
            transform: scale(0.9);
            transition: all 200ms ease;
        }
    }

    .left-swipe-enter {
        transform: translateX(-100%);
    }

    .left-swipe-enter-active {
        transform: translateX(0);
        transition: transform 200ms ease;
    }

    .left-swipe-exit {
        transform: translateX(0);
    }

    .left-swipe-exit-active {
        transform: translateX(-100%);
        transition: transform 200ms ease;
    }

    .right-swipe-enter {
        transform: translateX(100%);
    }

    .right-swipe-enter-active {
        transform: translateX(0);
        transition: transform 200ms ease;
    }

    .right-swipe-exit {
        transform: translateX(0);
    }

    .right-swipe-exit-active {
        transform: translateX(100%);
        transition: transform 200ms ease;
    }

    /*
    transition-animaiton -->
    */


`;

export default GlobalStyle;