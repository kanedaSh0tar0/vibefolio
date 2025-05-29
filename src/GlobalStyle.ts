import styled, { createGlobalStyle, keyframes } from "styled-components";

const textFlicker = keyframes`
    from {
      text-shadow: 0.5px 0 0 #ea36af, -1px 0 0 #75fa69;
    }
    to {
      text-shadow: 1px 0.5px 1px #ea36af, -0.5px -0.5px 1px #75fa69;
    }
`;

export const GlobalStyle = createGlobalStyle`
  :root {
    --white-color: #F8F8FF;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    animation-duration: 0.01s;
    animation-name: ${textFlicker};
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  html, body {
    user-select: none; 
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    font-family: ${({ theme }) => theme.fontFamily};
    letter-spacing: 0.1em;
    font-size: 16px;
    line-height: 1.5;
    color: ${({ theme }) => theme.pallet.textColor};
    background-color: ${({ theme }) => theme.pallet.mainColor};
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

export const CRTOverlay = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.1) 1px,
      transparent 2px,
      transparent 4px
    );
    pointer-events: none;
    mix-blend-mode: overlay;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0.4) 100%
    );
    pointer-events: none;
    mix-blend-mode: multiply;
  }
`;
