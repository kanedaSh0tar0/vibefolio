import { useEffect, useRef, useState } from "react";
import { Container, Image } from "./styles";
import loaderFrames from "../../assets/loader";

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
        setCurrentFrame((prev) => (prev + 1) % loaderFrames.length);
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
      <Image src={loaderFrames[currentFrame]} alt="Loading frame" />
    </Container>
  );
}

export default Loader;
