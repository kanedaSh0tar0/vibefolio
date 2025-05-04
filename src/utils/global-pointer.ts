import { useEffect } from "react";

export function useGlobalPointer(callback: (pos: { x: number; y: number }) => void) {
    useEffect(() => {
      const handle = (e: PointerEvent) => {
        callback({ x: e.clientX, y: e.clientY });
      };
  
      window.addEventListener("pointermove", handle);
      return () => window.removeEventListener("pointermove", handle);
    }, [callback]);
  }
  