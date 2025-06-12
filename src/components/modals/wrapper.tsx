import Header from "./header";
import {
  Modal,
  PositionType,
  bringToFront,
  closeModal,
  setLastCoordinates,
  setPosition,
} from "../../store/modalSlice";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const [ghostPosition, setGhostPosition] = useState<PositionType | null>(null);
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const coordinatesRef = useRef(coordinates);
  const dispatch = useAppDispatch();
  const { modals, lastX, lastY } = useAppSelector((state) => state.modals);
  const { cellSize, width, height, gap, columns, rows } = useWindowSize();

  const INITIAL_LEFT_OFFSET = useMemo(() => cellSize * 1.5, [cellSize]);
  const INITIAL_TOP_OFFSET = useMemo(() => cellSize, [cellSize]);

  const toGrid = useCallback(
    ({ x, y }: PositionType) => ({
      x: x / (cellSize * columns),
      y: y / (cellSize * rows),
    }),
    [cellSize, columns, rows]
  );

  const toPosition = useCallback(
    ({ x, y }: PositionType) => ({
      x: x * (cellSize * columns),
      y: y * (cellSize * rows),
    }),
    [cellSize, columns, rows]
  );

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

      const newLastX = lastX + gap;
      const newLastY = lastY + gap;

      handleSetLastCoordinates(newLastX, newLastY);

      return {
        ...modal,
        position: {
          x: INITIAL_LEFT_OFFSET + newLastX,
          y: INITIAL_TOP_OFFSET + newLastY,
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
    const gridPosition = toGrid(coordinates);
    // const gridPosition = {
    //   x: coordinates.x / (cellSize * columns),
    //   y: coordinates.y / (cellSize * rows),
    // };

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
  }, [toGrid, coordinates, dispatch, modal.type]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging.current) return;

      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;

      if (coordinates.x !== newX || coordinates.y !== newY) {
        const newCoords = { x: newX, y: newY };
        setGhostPosition(newCoords);
        // setCoordinates(newCoords);
        coordinatesRef.current = newCoords;
      }
      // cancelAnimationFrame(frame.current);
      // frame.current = requestAnimationFrame(() => {
      //   const newX = e.clientX - offset.current.x;
      //   const newY = e.clientY - offset.current.y;

      //   const newCoords = { x: newX, y: newY };
      //   setGhostPos(newCoords);
      //   coordinatesRef.current = newCoords;
      // });
    },
    [coordinates.x, coordinates.y]
  );

  const handleMouseUp = useCallback(() => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);

    if (dragging.current) {
      dispatch(
        setPosition({
          type: modal.type,
          position: { ...coordinatesRef.current },
          gridPosition: toGrid(coordinatesRef.current),
        })
      );
    }

    dragging.current = false;
    setGhostPosition(null);
  }, [handleMouseMove, dispatch, modal.type, toGrid]);

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
          gridPosition: toGrid(positionedModal.position),
        })
      );
    }
  }, [
    cellSize,
    columns,
    dispatch,
    modal,
    modals,
    packWithinArea,
    rows,
    toGrid,
  ]);

  useEffect(() => {
    if (!modal.gridPosition || dragging.current) return;

    const newPosition = toPosition(modal.gridPosition);

    setCoordinates(newPosition);
  }, [cellSize, columns, modal.gridPosition, rows, toPosition]);

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {dragging && ghostPosition && (
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
