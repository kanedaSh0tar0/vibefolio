import { Modal } from "../../../store/modalSlice";
import Wrapper from "../wrapper";
import { useState } from "react";
import { ImageWrapper, Thumb, Image } from "./styles";

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
