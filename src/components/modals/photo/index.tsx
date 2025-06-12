import { Modal } from "../../../store/modalSlice";
import Wrapper from "../wrapper";
import { ImageWrapper } from "./styles";
// import ThumbImage from "/pics/My_photo_thumb.webp";
import ImageComponent from "./image";

import MainImage from "/pics/My_photo.webp";
import imageThumbs from "../../../assets/pics-thumbs";
import { useWindowSize } from "../../../store/hooks/window-size";

function Photo({ modal }: { modal: Modal }) {
  const { cellSize } = useWindowSize();
  const { width = 2, height = 2 } = modal?.dimensions || {};

  return (
    <Wrapper modal={modal}>
      <ImageWrapper width={width * cellSize} height={height * cellSize}>
        <ImageComponent src={MainImage} thumb={imageThumbs.MyPhoto} />
      </ImageWrapper>
    </Wrapper>
  );
}

export default Photo;
