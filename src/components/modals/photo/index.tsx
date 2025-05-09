import styled from "styled-components";
import { Modal } from "../../../store/modalSlice";
import Wrapper from "../wrapper";
import { useState } from "react";

const ImageWrapper = styled.div<{ width?: number; height?: number }>`
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

const Thumb = styled.div<{ loaded: boolean; width?: number; height?: number }>`
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
// opacity: ${(props) => (props.loaded ? 0 : 1)};

const Image = styled.img<{ loaded: boolean }>`
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

function Photo({ modal }: { modal?: Modal }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { width = 200, height = 200 } = modal?.dimensions || {};

  return (
    <Wrapper modal={modal}>
      <ImageWrapper width={width} height={height}>
        <Thumb width={width} height={height} loaded={isImageLoaded} />
        <Image
          width={width}
          height={height}
          loaded={isImageLoaded}
          onLoad={() => setIsImageLoaded(true)}
          src="pics/My_photo.webp"
          alt="My photo"
          loading="lazy"
        />
      </ImageWrapper>
    </Wrapper>
  );
}

export default Photo;
