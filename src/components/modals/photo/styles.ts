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

export const Thumb = styled.div<{
  loaded: boolean;
  width?: number;
  height?: number;
}>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: ${(props) => `${props.width}px`};
  max-height: ${(props) => `${props.height}px`};
  background-image: url("pics/My_photo_thumb.jpg");
  background-size: cover;
  background-position: center;
  filter: blur(10px);
`;

export const Image = styled.img<{ loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: 100%;
  display: block;
  opacity: ${(props) => (props.loaded ? 1 : 0)};
  transition: opacity 1s;
  position: relative;
  z-index: 100;
`;
