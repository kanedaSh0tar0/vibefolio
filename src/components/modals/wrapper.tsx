import Header from "./header";
import {
  Modal,
  bringToFront,
  closeModal,
  setLastCoordinates,
  setPosition,
} from "../../store/modalSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Container, Content, InnerWrapper, Panel } from "./styles";
import ModalButton from "./panel-button";
import { useWindowSize } from "../../store/hooks/window-size";

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
  const coordinatesRef = useRef(coordinates);
  const dispatch = useAppDispatch();
  const { modals, lastX, lastY } = useAppSelector((state) => state.modals);

  const { cellSize, width, height, gap, columns, rows } = useWindowSize();

  const INITIAL_LEFT_OFFSET = cellSize;
  const INITIAL_TOP_OFFSET = cellSize;

  const doesOverlap = useCallback(
    (a: Modal, b: Modal): boolean => {
      return (
        a.position.x < b.position.x + b.dimensions.width * cellSize + gap &&
        a.position.x + a.dimensions.width * cellSize + gap > b.position.x &&
        a.position.y < b.position.y + b.dimensions.height * cellSize + gap &&
        a.position.y + a.dimensions.height * cellSize + gap > b.position.y
      );
    },
    [cellSize, gap]
  );

  const handleSetLastCoordinates = useCallback(
    (x: number, y: number) => {
      if (
        lastX + modal.dimensions.width * cellSize > width ||
        lastY + modal.dimensions.height * cellSize > height
      ) {
        dispatch(setLastCoordinates({ x: cellSize, y: cellSize }));
      } else {
        dispatch(setLastCoordinates({ x, y }));
      }
    },
    [
      cellSize,
      dispatch,
      height,
      lastX,
      lastY,
      modal.dimensions.height,
      modal.dimensions.width,
      width,
    ]
  );

  const packWithinArea = useCallback(
    (modals: Modal[], modal: Modal): Modal => {
      const openedModals = modals.filter(
        (m) => m.isOpen && m.type !== modal.type
      );

      const newItemSize = modal.dimensions;

      for (
        let y = INITIAL_TOP_OFFSET;
        y <= height - newItemSize.height * cellSize;
        y += gap
      ) {
        for (
          let x = INITIAL_LEFT_OFFSET;
          x <= width - newItemSize.width * cellSize;
          x += gap
        ) {
          const candidate = {
            ...modal,
            position: { x, y },
          };

          const overlaps = openedModals.some((item) =>
            doesOverlap(candidate, item)
          );

          if (!overlaps) {
            return candidate;
          }
        }
      }

      handleSetLastCoordinates(lastX, lastY);

      return {
        ...modal,
        position: {
          x: INITIAL_LEFT_OFFSET + lastX,
          y: INITIAL_TOP_OFFSET + lastY,
        },
      };
    },
    [
      INITIAL_LEFT_OFFSET,
      INITIAL_TOP_OFFSET,
      cellSize,
      doesOverlap,
      gap,
      handleSetLastCoordinates,
      height,
      lastX,
      lastY,
      width,
    ]
  );

  const handleClose = useCallback(() => {
    const gridPosition = {
      x: coordinates.x / (cellSize * columns),
      y: coordinates.y / (cellSize * rows),
    };

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

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging.current) return;

    const newX = e.clientX - offset.current.x;
    const newY = e.clientY - offset.current.y;

    if (coordinates.x !== newX || coordinates.y !== newY) {
      const newCoords = { x: newX, y: newY };
      setCoordinates(newCoords);
      coordinatesRef.current = newCoords;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);

    if (dragging.current) {
      dispatch(
        setPosition({
          type: modal.type,
          position: { ...coordinatesRef.current },
          gridPosition: {
            x: coordinatesRef.current.x / (cellSize * columns),
            y: coordinatesRef.current.y / (cellSize * rows),
          },
        })
      );
    }

    dragging.current = false;
  }, [handleMouseMove, dispatch, modal.type, cellSize, columns, rows]);

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
    if (
      !modal.gridPosition &&
      modal.position.x === 0 &&
      modal.position.y === 0
    ) {
      const positionedModal = packWithinArea(modals, modal);

      setCoordinates(positionedModal.position);
      dispatch(
        setPosition({
          type: modal.type,
          position: positionedModal.position,
          gridPosition: {
            x: positionedModal.position.x / (cellSize * columns),
            y: positionedModal.position.y / (cellSize * rows),
          },
        })
      );
    }
  }, [cellSize, columns, dispatch, modal, modals, packWithinArea, rows]);

  useEffect(() => {
    if (!modal.gridPosition || dragging.current) return;

    const newPosition = {
      x: modal.gridPosition.x * (cellSize * columns),
      y: modal.gridPosition.y * (cellSize * rows),
    };

    setCoordinates(newPosition);
  }, [cellSize, columns, modal.gridPosition, rows]);

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
  );
}

export default Wrapper;
