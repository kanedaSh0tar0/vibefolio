import { useEffect, useRef, useState } from "react";
import { Container, Image } from "./styles";

import Loading1 from "/loader/Loading1.png";
import Loading2 from "/loader/Loading2.png";
import Loading3 from "/loader/Loading3.png";
import Loading4 from "/loader/Loading4.png";
import Loading5 from "/loader/Loading5.png";
import Loading6 from "/loader/Loading6.png";

const loaderAnimations = [
  Loading1,
  Loading2,
  Loading3,
  Loading4,
  Loading5,
  Loading6,
];

const FRAME_DURATION = 300;

function Loader() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const lastFrameTimeRef = useRef(performance.now());
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const animate = (time: number) => {
      const timeSinceLastFrame = time - lastFrameTimeRef.current;

      if (timeSinceLastFrame >= FRAME_DURATION) {
        setCurrentFrame((prev) => (prev + 1) % loaderAnimations.length);
        lastFrameTimeRef.current = time;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <Container>
      <Image src={loaderAnimations[currentFrame]} alt="Loading frame" />
    </Container>
  );
}

export default Loader;
