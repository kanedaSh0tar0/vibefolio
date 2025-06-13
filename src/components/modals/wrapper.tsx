import Header from "./header";
import {
  Modal,
  PositionType,
  bringToFront,
  closeModal,
  setPosition,
} from "../../store/modalSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { Container, Content, InnerWrapper, Panel } from "./styles";
import ModalButton from "./panel-button";
import { useWindowSize } from "./hooks/window-size";
import useModalPositioning from "./hooks/modal-positioning";
import { toGrid, toPosition } from "./utils";

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
  const [ghostPosition, setGhostPosition] = useState<PositionType | null>(null);
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const coordinatesRef = useRef(coordinates);
  const dispatch = useAppDispatch();
  const { cellSize, columns, rows } = useWindowSize();
  useModalPositioning(modal);

  const handleClose = useCallback(() => {
    const gridPosition = toGrid(coordinates, { cellSize, columns, rows });
    setIsClosing(true);

    setTimeout(() => {
      dispatch(
        closeModal({
          type: modal.type,
          position: coordinates,
          gridPosition,
        })
      );
    }, 250);
  }, [coordinates, cellSize, columns, rows, dispatch, modal.type]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging.current) return;

      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;

      if (coordinates.x !== newX || coordinates.y !== newY) {
        const newCoords = { x: newX, y: newY };
        setGhostPosition(newCoords);
        coordinatesRef.current = newCoords;
      }
    },
    [coordinates.x, coordinates.y]
  );

  const handleMouseUp = useCallback(() => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);

    if (dragging.current) {
      const final = { ...coordinatesRef.current };
      setCoordinates(final);

      dispatch(
        setPosition({
          type: modal.type,
          position: final,
          gridPosition: toGrid(final, {
            cellSize,
            columns,
            rows,
          }),
        })
      );
    }

    dragging.current = false;
    setGhostPosition(null);
  }, [handleMouseMove, dispatch, modal.type, cellSize, columns, rows]);

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    dragOffset.current = {
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
    if (!modal.gridPosition || dragging.current) return;

    const newPosition = toPosition(modal.gridPosition, {
      cellSize,
      columns,
      rows,
    });

    setCoordinates(newPosition);
    coordinatesRef.current = newPosition;
  }, [cellSize, columns, modal.gridPosition, rows]);

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {dragging.current && ghostPosition && (
        <div
          className="cursor-move"
          style={{
            position: "absolute",
            border: "2px dashed white",
            left: ghostPosition.x,
            top: ghostPosition.y,
            width: modal.dimensions.width * cellSize,
            height: modal.dimensions.height * cellSize,
            zIndex: 9999,
          }}
        />
      )}

      <Container
        index={modal.index || 1}
        isClosing={isClosing}
        dimensions={{
          width: modal.dimensions.width * cellSize,
          height: modal.dimensions.height * cellSize,
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
    </>
  );
}

export default Wrapper;
