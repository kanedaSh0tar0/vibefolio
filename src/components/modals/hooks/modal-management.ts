import { useCallback, useEffect, useRef, useState } from "react";
import {
  closeModal,
  Modal,
  PositionType,
  setPosition,
} from "../../../store/modalSlice";
import { toGrid, toPosition } from "../utils";
import { useAppDispatch } from "../../../store/hooks";
import { useWindowSize } from "./window-size";

function useModalManagement(modal: Modal) {
  const [coordinates, setCoordinates] = useState(modal.position);
  const [ghostPosition, setGhostPosition] = useState<PositionType | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const coordinatesRef = useRef(coordinates);
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dispatch = useAppDispatch();
  const { cellSize, columns, rows } = useWindowSize();

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
    [coordinatesRef.current]
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

  return {
    handleMouseDown,
    handleClose,
    ghostPosition,
    coordinates,
    dragging: dragging.current,
    isClosing,
    convertedWidth: modal.dimensions.width * cellSize,
    convertedHeight: modal.dimensions.height * cellSize,
  };
}

export default useModalManagement;
