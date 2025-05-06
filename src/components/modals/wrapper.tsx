import styled, { keyframes } from "styled-components";
import Header from "./header";
import {
  Modal,
  ModalType,
  PositionType,
  bringToFront,
  closeModal,
} from "../../store/modalSlice";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch } from "../../store/hooks";

const DEFAULT_WIDTH = window.innerWidth * 0.75;
const DEFAULT_HEIGHT = window.innerHeight * 0.75;

type ModalSize = "small" | "full";

const scaleIn = keyframes`
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const scaleOut = keyframes`
  to {
    opacity: 0;
    transform: scale(0);
  }
`;

const Container = styled.div<{
  position: PositionType;
  size: ModalSize;
  dimensions: { width: number; height: number };
  isClosing: boolean;
  index: number;
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

  opacity: ${({ isClosing }) => (isClosing ? "1" : "0")};
  transform: ${({ isClosing }) => (isClosing ? "scale(1)" : "scale(0)")};
  animation: ${({ isClosing }) => (isClosing ? scaleOut : scaleIn)} 0.25s
    cubic-bezier(0.39, 0.575, 0.565, 1) both;

  z-index: ${({ index }) => 10 * (index + 1)};
`;

const Content = styled.div`
  padding: 10px;
`;

function Wrapper({
  children,
  type,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  position,
  modal,
}: {
  children: React.ReactNode;
  type: ModalType;
  width?: number;
  height?: number;
  position?: PositionType;
  modal?: Modal;
}) {
  const defaultPositionX = useMemo(() => {
    if (modal) {
      return modal.position.x;
    }

    if (position) {
      return position.x;
    }

    return window.innerWidth / 2 - width / 2;
  }, [width]);
  const defaultPositionY = useMemo(() => {
    if (modal) {
      return modal.position.y;
    }

    if (position) {
      return position.y;
    }

    return window.innerHeight / 2 - height / 2;
  }, [height]);
  const defaultCoordinates = useMemo<PositionType>(
    () => ({
      x: defaultPositionX,
      y: defaultPositionY,
    }),
    [defaultPositionX, defaultPositionY]
  );
  const [isClosing, setIsClosing] = useState(false);
  const prevPosition = useRef(defaultCoordinates);
  const [coordinates, setCoordinates] = useState(defaultCoordinates);
  const [size, setSize] = useState<ModalSize>("small");
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      dispatch(closeModal({ type, position: coordinates }));
    }, 250);
  };

  const handleResize = () => {
    dispatch(bringToFront(type));
    const isSmall = size === "small";
    setSize(isSmall ? "full" : "small");
    setCoordinates(isSmall ? { x: 0, y: 0 } : prevPosition.current);

    if (isSmall) {
      prevPosition.current = coordinates;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    setCoordinates({
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
    dispatch(bringToFront(type));
    dragging.current = true;
    offset.current = {
      x: e.clientX - coordinates.x,
      y: e.clientY - coordinates.y,
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
      index={modal?.index || 1}
      isClosing={isClosing}
      dimensions={{
        width: modal?.dimensions.width || width,
        height: modal?.dimensions.height || height,
      }}
      position={coordinates}
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
