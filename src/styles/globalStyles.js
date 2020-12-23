import { createGlobalStyle } from 'styled-components/macro';
import 'react-toastify/dist/ReactToastify.css';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --textPrimary: rgba(0, 0, 0, 0.8);
    --textSecondary: rgba(0, 0, 0, 0.60);
    --textDisabled:rgba(0, 0, 0, 0.38);
    --nearWhite: #ffffff73;
    --backgroundPrimary: #dde1e7;
    --gloomBlue: #536791;
    --shadow: rgba(94, 104, 121, 0.288);
    --primary: rgba(188, 0, 45, 1);
  }

  #root {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1, h2, h3 {
    margin: 0.5em 0;
    --textPrimary: rgba(0, 0, 0, 0.87);
  }

  .material-icons-round {
    color: var(--textSecondary);
    font-size: 18px;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Noto Sans', sans-serif;
    color: var(--textPrimary);
    background: var(--backgroundPrimary);
  }

  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  a {
    text-decoration: none;
  }

  ul {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    padding-inline-start: 40px;
  }

  li {
    padding-bottom: 0.5em;
  }

  input, textarea, select, button {
    outline: none;
    border: none;
    background: var(--backgroundPrimary);
    font-family: inherit;
  }

  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  .Toastify__toast {
    font-family: 'Noto Sans', sans-serif;
    font-size: 0.8em;
  }
}
`;

export default GlobalStyle;
