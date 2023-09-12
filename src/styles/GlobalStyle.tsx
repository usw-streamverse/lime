import { createGlobalStyle } from 'styled-components'
import Pretendard from 'assets/fonts/PretendardVariable.woff2'

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Pretendard';
        src: local('Pretendard'), url(${Pretendard}) format('woff');
    }
    
    *, *::before, *::after {
        box-sizing: border-box;
        font-family: 'Pretendard', sans-serif;
        font-weight: bold;
        user-select: none;
        outline: none;
        -webkit-tap-highlight-color: transparent;

        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            background-color: #e6e6e6;
        }
        ::-webkit-scrollbar-thumb {
            background: #979cab;
            border-radius: 4px;
        }
    }

    html {
        font-size: 14px;
    }

    div {
        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            background-color: #e6e6e6;
        }
        ::-webkit-scrollbar-thumb {
            background: #979cab;
            border-radius: 4px;
        }
    }
    
    body {
        --red: red;
        --blue: #3988ff;
        --gray: #9e9e9e;
        --main-bg-color: #fff;
        --main-text-color: #000;
        --main-text-color-light: #6d6d6d;
        --button-text-color: #000;
        --navbar-bg-color: #fff;
        --navbar-border-color: #e5e5e5;
        --navbar-item-bg-color: #fff;
        --navbar-item-ripple: #dcffce;
        --navbar-menu-hover: #edeff3;
        --navbar-menu-ripple: #bdbdbd;
        --navbar-menu-text-color-inactive: #778495;
        --navbar-menu-text-color-active: #000;
        --navbar-menu-icon-color-active: #03cb00;
        --select-bg-color: #fff;
        --select-shadow-inset: #eeeeee;
        --select-shadow-hover: #7f96c533;
        --select-border-color: #656565;
        --select-option-border-color: #efefef;
        --select-option-bg-color-hover: #eaf2ff;
        --textbox-bg-color: #fff;
        --textbox-border-color: #878787;
        --textbox-border-color-focus: #e5e5e5;
        --textbox-shadow: #e5e5e5;
        --textbox-shadow-focus: #0049ed;
        --sign-textbox-border-color: #bbbbbb;
        --sign-textbox-border-color-focus: #2786ff;
        --sign-signin-bg-color: #2486ff;
        --sign-signin-bg-color-hover: #4b9bff;
        --sign-signin-bg-color-active: #0068eb;
        --tab-border-color: #bebebe;
        --watch-body-bg-color: #f2f4f6;
        --watch-comment-bg-color: #f2f4f6;
        --watch-comment-reply-bg-color: #f2f3f6;
        --watch-comment-button-bg-color: #e8eaec;
        --watch-comment-like-active: #ff5050;
        --watch-channel-menu-ripple: #797d83;
        --skeleton-bg-color: #fdfdfd;
        --skeleton-bg-color-animation: #ececec;
    }

    body.dark {
        --red: #ff2323;
        --blue: #3988ff;
        --gray: #8a8a8a;
        --main-bg-color: #292a2c;
        --main-text-color: #fff;
        --main-text-color-light: #d1d1d1;
        --button-text-color: #fff;
        --navbar-bg-color: #141414;
        --navbar-border-color: #101010;
        --navbar-item-bg-color: #141414;
        --navbar-item-ripple: #303030;
        --navbar-menu-hover: #383838;
        --navbar-menu-ripple: #0e0e0e;
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
        --tab-border-color: #666666;
        --watch-body-bg-color: #505050;
        --watch-comment-bg-color: #333;
        --watch-comment-reply-bg-color: #333;
        --watch-comment-button-bg-color: #3737;
        --watch-comment-like-active: #ff5757;
        --watch-channel-menu-ripple: #d6d6d6;
        --skeleton-bg-color: #202020;
        --skeleton-bg-color-animation: #272727;
    }

    body {
        margin: 0;
        background: var(--main-bg-color);
        color: var(--main-text-color);
        overflow: hidden overlay;
        overscroll-behavior-y: none;
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

    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(16);
        }
    }

    /*
    <!-- transition-animation
    */

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

    .modal2-enter {
        opacity: 0;
    }

    .modal2-enter-active {
        top: 0 !important;
        left: 0 !important;
        max-width: 100% !important;
        max-height: 100% !important;
        opacity: 1;
        transition: all 300ms ease;
    }

    .modal2-enter-done {
        top: 0 !important;
        left: 0 !important;
        max-width: 100% !important;
        max-height: 100% !important;
    }

    .modal2-exit {
        top: 0 !important;
        left: 0 !important;
        max-width: 100% !important;
        max-height: 100% !important;
        opacity: 1;
    }

    .modal2-exit-active {
        opacity: 0;
        transition: all 300ms ease-in-out;
    }

    .left-swipe-enter {
        transform: translateX(-100%);
    }

    .left-swipe-enter-active {
        transform: translateX(0);
        transition: transform 200ms ease-in-out;
    }

    .left-swipe-exit {
        transform: translateX(0);
    }

    .left-swipe-exit-active {
        transform: translateX(-100%);
        transition: transform 200ms ease-in-out;
    }

    .right-swipe-enter {
        transform: translateX(100%);
    }

    .right-swipe-enter-active {
        transform: translateX(0);
        transition: transform 200ms ease-in-out;
    }

    .right-swipe-exit {
        transform: translateX(0);
    }

    .right-swipe-exit-active {
        transform: translateX(100%);
        transition: transform 200ms ease-in-out;
    }

    .up-swipe-enter {
        transform: translateY(-100%);
    }

    .up-swipe-enter-active {
        transform: translateY(0);
        transition: transform 300ms ease-in-out;
    }

    .up-swipe-exit {
        transform: translateY(0);
    }

    .up-swipe-exit-active {
        transform: translateY(-100%);
        transition: transform 300ms ease-in-out;
    }

    .down-swipe-enter {
        transform: translateY(100%);
    }

    .down-swipe-enter-active {
        transform: translateY(0);
        transition: transform 300ms ease-in-out;
    }

    .down-swipe-exit {
        transform: translateY(0);
    }

    .down-swipe-exit-active {
        transform: translateY(100%);
        transition: transform 300ms ease-in-out;
    }

    .dropdown-enter {
        opacity: 0;
        transform: scaleY(0);
    }

    .dropdown-enter-active {
        opacity: 1;
        transform: scaleY(1);
        transition: all 200ms ease-in-out;
    }

    .dropdown-exit {
        opacity: 1;
    }

    .dropdown-exit-active {
        opacity: 0;
        transition: all 200ms ease;
        pointer-events: none;
    }

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

    /*
    transition-animaiton -->
    */

    textarea {
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            background-color: #ebebeb;
        }
        ::-webkit-scrollbar-thumb {
            background: #babdc7;
        }
    }
`;

export default GlobalStyle;