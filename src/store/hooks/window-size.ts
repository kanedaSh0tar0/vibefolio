import { useEffect, useState } from "react";

const MODAL_GAP = 20;
const COLUMNS = 12;
const ROWS = 6;

export function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    cellSize:
      Math.min(window.innerWidth / COLUMNS, window.innerHeight / ROWS) -
      MODAL_GAP / 2,
  });

  useEffect(() => {
    const onResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
        cellSize:
          Math.min(window.innerWidth / COLUMNS, window.innerHeight / ROWS) -
          MODAL_GAP / 2,
      });
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return { ...size, columns: COLUMNS, rows: ROWS, gap: MODAL_GAP };
}
