import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', 'Lato';
    text-rendering: optimizeLegibility;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    transition: background .2s ease-in-out, color .2s ease-in-out, border .2s ease-in-out, border-color .2s ease-in-out;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    background: ${({ theme }) => theme.global.background};
  }

  html {
    overflow-y: overlay;
    overflow-x: hidden;
  }

  .noSelect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  body::-webkit-scrollbar {
    width: 10px;
    @media (max-width: 768px) {
      display: none;
    }
  }

  body::-webkit-scrollbar-thumb {
    border: 1px solid #000;
  }

  #privateKeys {
    width: 750px
	}
  #walletModal {
    width: 500px;
  }
`;
