import styled from "styled-components";
import Header from "./header";
import { ModalType } from "../../store/modalSlice";
import { useEffect, useMemo, useRef, useState } from "react";
import { closeModal } from "../../store/modalSlice";
import { useAppDispatch } from "../../store/hooks";

const DEFAULT_WIDTH = window.innerWidth * 0.75;
const DEFAULT_HEIGHT = window.innerHeight * 0.75;

type ModalSize = "small" | "full";

const Container = styled.div<{
  position: { x: number; y: number };
  size: ModalSize;
  dimensions: { width: number; height: number };
}>`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: ${({ size, dimensions }) =>
    size === "small" ? `${dimensions.width}px` : "100vw"};
  height: ${({ size, dimensions }) =>
    size === "small" ? `${dimensions.height}px` : "100vh"};

  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.mainColor};
  box-shadow: 5px 5px 0px 2px rgba(0, 0, 0, 0.75);

  left: ${({ position }) => (position ? position.x : 0)}px;
  top: ${({ position }) => (position ? position.y : 0)}px;
`;

const Content = styled.div`
  padding: 10px;
`;

function Wrapper({
  children,
  type,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
}: {
  children: React.ReactNode;
  type: ModalType;
  width?: number;
  height?: number;
}) {
  const defaultPositionX = useMemo(
    () => window.innerWidth / 2 - width / 2,
    [width]
  );
  const defaultPositionY = useMemo(
    () => window.innerHeight / 2 - height / 2,
    [height]
  );
  const defaultCoordinates = useMemo(
    () => ({
      x: defaultPositionX,
      y: defaultPositionY,
    }),
    [defaultPositionX, defaultPositionY]
  );
  const prevPosition = useRef(defaultCoordinates);
  const [position, setPosition] = useState(defaultCoordinates);
  const [size, setSize] = useState<ModalSize>("small");
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeModal(type));
  };

  const handleResize = () => {
    const isSmall = size === "small";
    setSize(isSmall ? "full" : "small");
    setPosition(isSmall ? { x: 0, y: 0 } : prevPosition.current);

    if (isSmall) {
      prevPosition.current = position;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    dragging.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <Container
      dimensions={{ width, height }}
      position={position}
      size={size}
      className="cursor"
    >
      <Header
        handleClose={handleClose}
        handleResize={handleResize}
        handleDrag={handleMouseDown}
      />
      <Content>{children}</Content>
    </Container>
  );
}

export default Wrapper;
