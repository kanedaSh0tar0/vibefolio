import { useCallback, useEffect, useMemo } from "react";
import {
  Modal,
  setLastCoordinates,
  setPosition,
} from "../../../store/modalSlice";
import { useWindowSize } from "./window-size";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { toGrid } from "../utils";

function useModalPositioning(modal: Modal) {
  const dispatch = useAppDispatch();
  const { cellSize, width, height, gap, columns, rows } = useWindowSize();
  const { modals, lastX, lastY } = useAppSelector((state) => state.modals);

  const INITIAL_LEFT_OFFSET = useMemo(() => cellSize * 1.5, [cellSize]);
  const INITIAL_TOP_OFFSET = useMemo(() => cellSize, [cellSize]);

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

  useEffect(() => {
    if (
      !modal.gridPosition &&
      modal.position.x === 0 &&
      modal.position.y === 0
    ) {
      const positionedModal = packWithinArea(modals, modal);

      dispatch(
        setPosition({
          type: modal.type,
          position: positionedModal.position,
          gridPosition: toGrid(positionedModal.position, {
            cellSize,
            columns,
            rows,
          }),
        })
      );
    }
  }, [cellSize, columns, dispatch, modal, modals, packWithinArea, rows]);
}

export default useModalPositioning;
