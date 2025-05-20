import Header from "./header";
import {
  Modal,
  PositionType,
  bringToFront,
  closeModal,
} from "../../store/modalSlice";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { Container, Content, InnerWrapper } from "./styles";

const DEFAULT_WIDTH = window.innerWidth * 0.75;
const DEFAULT_HEIGHT = window.innerHeight * 0.75;

export type ModalSize = "small" | "full";

function Wrapper({
  children,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  position,
  modal,
}: {
  children: React.ReactNode;
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
  const type = modal?.type || "info"; // TODO: default modal type

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
        title={modal?.title}
        handleClose={handleClose}
        handleResize={handleResize}
        handleDrag={handleMouseDown}
      />
      <Content title={modal?.title}>
        <InnerWrapper>{children}</InnerWrapper>
      </Content>
    </Container>
  );
}

export default Wrapper;
