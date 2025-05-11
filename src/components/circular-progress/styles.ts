import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
`;

export const CircleWrapper = styled.svg<{ width: number; height: number }>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
`;

export const InnerCircle = styled.div<{ strokeWidth: number; size: number }>`
  position: absolute;
  top: ${({ strokeWidth }) => strokeWidth}px;
  left: ${({ strokeWidth }) => strokeWidth}px;
  width: ${({ strokeWidth, size }) => size - strokeWidth * 2}px;
  height: ${({ strokeWidth, size }) => size - strokeWidth * 2}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;

  svg {
    width: 25px;
    height: 25px;
  }
`;
