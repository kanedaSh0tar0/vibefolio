import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { SoundProvider } from "./context/sound.tsx";
import { CameraProvider } from "./context/camera.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <SoundProvider>
        <CameraProvider>
          <App />
        </CameraProvider>
      </SoundProvider>
    </Provider>
  </StrictMode>
);
