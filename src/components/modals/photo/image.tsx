import { useEffect, useState } from "react";
import { Image as StyledImage } from "./styles";

function ImageComponent({
  src,
  thumb,
}: {
  src: string;
  thumb: string;
  width?: number;
  height?: number;
}) {
  const [imageSrc, setImageSrc] = useState(thumb);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fullImg = new Image();
    fullImg.src = src;
    fullImg.onload = () => {
      setImageSrc(src);
      setLoaded(true);
    };
  }, [src]);

  return (
    <StyledImage
      src={imageSrc}
      alt="My photo"
      loading="lazy"
      style={{
        transition: "filter 0.3s ease",
        filter: loaded ? "none" : "blur(5px)",
      }}
    />
  );
}

export default ImageComponent;
