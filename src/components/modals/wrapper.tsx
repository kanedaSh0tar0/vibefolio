import Header from "./header";
import { Modal, bringToFront, closeModal } from "../../store/modalSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { Container, Content, InnerWrapper, Panel } from "./styles";
import ModalButton from "./panel-button";

function Wrapper({
  children,
  modal,
  buttons,
}: {
  children: React.ReactNode;
  modal: Modal;
  buttons?: { Icon: React.ReactNode; onClick: () => void; key: string }[];
}) {
  const [isClosing, setIsClosing] = useState(false);
  const [coordinates, setCoordinates] = useState(modal.position);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    setIsClosing(true);

    setTimeout(() => {
      dispatch(closeModal({ type: modal.type, position: coordinates }));
    }, 250);
  }, [coordinates, dispatch, modal.type]);

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
    dragging.current = true;
    offset.current = {
      x: e.clientX - coordinates.x,
      y: e.clientY - coordinates.y,
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (modal.isClosing) {
      handleClose();
    }
  }, [handleClose, modal.isClosing]);

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <Container
      index={modal.index || 1}
      isClosing={isClosing}
      dimensions={{
        width: modal.dimensions.width,
        height: modal.dimensions.height,
      }}
      position={coordinates}
      className="cursor"
      onMouseDown={() => dispatch(bringToFront(modal.type))}
    >
      <Header
        title={modal.title}
        handleClose={handleClose}
        handleDrag={handleMouseDown}
      />
      {buttons && (
        <Panel>
          {buttons.map(({ Icon, onClick, key }) => (
            <ModalButton Icon={Icon} onClick={onClick} key={key} />
          ))}
        </Panel>
      )}
      <Content title={modal.title}>
        <InnerWrapper>{children}</InnerWrapper>
      </Content>
    </Container>
  );
}

export default Wrapper;
