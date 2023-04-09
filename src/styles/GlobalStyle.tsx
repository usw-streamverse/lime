import { createGlobalStyle } from 'styled-components'
import Pretendard_Regular from 'assets/fonts/Pretendard-Regular.woff2'
import Pretendard_SemiBold from 'assets/fonts/Pretendard-SemiBold.woff2'

const GlobalStyle = createGlobalStyle`    
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
        --sign-text-border-color: #bbbbbb;
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
        --sign-text-border-color: #e4e9ed;
    }

    body {
        margin: 0;
        background: var(--main-bg-color);
        color: var(--main-text-color);
        transition: background-color 200ms ease, border 200ms ease, color 100ms ease;
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
`;

export default GlobalStyle;