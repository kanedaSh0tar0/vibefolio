import styled, { keyframes } from "styled-components";

const turnOn = keyframes`
  0%{
    animation-timing-function:$ease-in-quint;
    transform:scale(0.000,0.0001) translate3d(0,0,0);
    -webkit-filter:brightness(50);
    filter:brightness(50);
  }

  60%{
    transform:scale(1.3,0.001) translate3d(0,0,0);
    -webkit-filter:brightness(10);
    filter:brightness(10);
  }

  100%{
    transform:scale(1,1.3) translate3d(0,0,0);
    -webkit-filter:brightness(1);
    filter:brightness(1);
    opacity:1;
  }
`;

export const Container = styled.div`
  position: absolute;
  inset: 0;
  z-index: 9999;
  background-color: black;
`;

export const Screen = styled.div`
  width: 100%;
  height: 100%;
  animation: ${turnOn} 1s linear forwards;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

export const Text = styled.pre`
  font-family: monospace;
  color: #00ffcc;
`;

export const ErrorText = styled.span`
  color: #ff6347;
`;

export const WarningText = styled.span`
  color: #ffa500;
`;
