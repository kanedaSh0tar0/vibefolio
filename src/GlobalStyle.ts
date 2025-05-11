import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    font-family: 'Manrope', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.mainColor};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    letter-spacing: -0.5px;
  }

  img, picture, video, svg {
    display: block;
    max-width: 100%;
  }

  svg {
    fill: ${({ theme }) => theme.textColor};
  }

  canvas {4
    min-width: 100vw;
    min-height: 100vh;
  }

  input, button, textarea, select {
    font: inherit;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
