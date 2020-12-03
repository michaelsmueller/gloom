import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --textPrimary: rgba(0, 0, 0, 0.87);
    --textSecondary: rgba(0, 0, 0, 0.60);
    --textDisabled:rgba(0, 0, 0, 0.38);
    --nearWhite: #ffffff73;
    --backgroundPrimary: #dde1e7;
    --shadow: rgba(94, 104, 121, 0.288);
    --primary: rgba(188, 0, 45, 1);
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
    padding: 30px;
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

  input, select {
    border-radius: 20px;
    padding: 8px 15px;
    box-shadow: inset -3px -3px 5px var(--nearWhite), inset  3px  3px 3px var(--shadow);
  }

  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
}
`;

export default GlobalStyle;
