import { PositionType } from "../../../store/modalSlice";

export const toGrid = (
  { x, y }: PositionType,
  {
    cellSize,
    columns,
    rows,
  }: { cellSize: number; columns: number; rows: number }
) => ({
  x: x / (cellSize * columns),
  y: y / (cellSize * rows),
});

export const toPosition = (
  { x, y }: PositionType,
  {
    cellSize,
    columns,
    rows,
  }: { cellSize: number; columns: number; rows: number }
) => ({
  x: x * (cellSize * columns),
  y: y * (cellSize * rows),
});
