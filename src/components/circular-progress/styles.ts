import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: clamp(2rem, 4vw, 4rem);
  height: clamp(2rem, 4vw, 4rem);
`;

export const CircleWrapper = styled.svg`
  width: 100%;
  height: 100%;
`;

export const InnerCircle = styled.div<{ strokeWidth: number }>`
  position: absolute;
  top: ${({ strokeWidth }) => strokeWidth}px;
  left: ${({ strokeWidth }) => strokeWidth}px;
  right: ${({ strokeWidth }) => strokeWidth}px;
  bottom: ${({ strokeWidth }) => strokeWidth}px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;

  svg {
    width: clamp(1rem, 2vw, 2rem);
    height: clamp(1rem, 2vw, 2rem);
  }
`;
