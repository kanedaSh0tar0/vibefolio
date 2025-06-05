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

const hourglassClasses = [
  "cursor-loading-start",
  "cursor-loading-mid",
  "cursor-loading-end",
];
const FRAME_DURATION = 300;

function Loader() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentCursorFrame, setCurrentCursorFrame] = useState(0);
  const lastFrameTimeRef = useRef(performance.now());
  const lastCursorFrameTimeRef = useRef(performance.now());
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const animate = (time: number) => {
      const timeSinceLastFrame = time - lastFrameTimeRef.current;
      const timeSinceCursorLastFrame = time - lastCursorFrameTimeRef.current;

      if (timeSinceLastFrame >= FRAME_DURATION) {
        setCurrentFrame((prev) => (prev + 1) % loaderAnimations.length);
        lastFrameTimeRef.current = time;
      }
      if (timeSinceCursorLastFrame >= FRAME_DURATION * 2) {
        setCurrentCursorFrame((prev) => (prev + 1) % hourglassClasses.length);
        lastCursorFrameTimeRef.current = time;
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
    <Container className={hourglassClasses[currentCursorFrame]}>
      <Image src={loaderAnimations[currentFrame]} alt="Loading frame" />
    </Container>
  );
}

export default Loader;
