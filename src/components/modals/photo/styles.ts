import styled from "styled-components";

export const ImageWrapper = styled.div<{ width?: number; height?: number }>`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: ${(props) => `${props.width}px`};
  max-height: ${(props) => `${props.height}px`};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: 100%;
  display: block;
  transition: opacity 1s;
  position: relative;
  z-index: 100;
`;
