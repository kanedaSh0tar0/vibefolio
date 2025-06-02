import { createContext, useContext, useState } from "react";

interface CameraContextInterface {
  started: boolean;
  start: () => void;
}

const CameraContext = createContext<CameraContextInterface | null>(null);

export const useCameraContext = () => {
  const context = useContext(CameraContext);
  if (!context)
    throw new Error("useCameraContext must be used within CameraProvider");
  return context;
};

export function CameraProvider({ children }: { children: React.ReactNode }) {
  const [started, setStarted] = useState(false);

  return (
    <CameraContext.Provider value={{ started, start: () => setStarted(true) }}>
      {children}
    </CameraContext.Provider>
  );
}
