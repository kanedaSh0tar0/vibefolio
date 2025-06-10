import { Modal } from "../../../store/modalSlice";
import Wrapper from "../wrapper";
import { ImageWrapper } from "./styles";
// import ThumbImage from "/pics/My_photo_thumb.webp";
import ImageComponent from "./image";

import MainImage from "/pics/My_photo.webp";
import imageThumbs from "../../../assets/pics-thumbs";

function Photo({ modal }: { modal: Modal }) {
  const { width = 200, height = 200 } = modal?.dimensions || {};

  return (
    <Wrapper modal={modal}>
      <ImageWrapper width={width} height={height}>
        <ImageComponent
          width={width}
          height={height}
          src={MainImage}
          thumb={imageThumbs.MyPhoto}
        />
      </ImageWrapper>
    </Wrapper>
  );
}

export default Photo;
