import { createPortal } from "react-dom";
import ToastPopup from "./toast";
import { useAppSelector } from "../../store/hooks";
import { FC } from "react";
import {
  PopupType,
  ResultType,
  selectToastPopups,
} from "../../store/popupSlice";
import { PopupManagerContainer } from "./styles";
import { useSoundContext } from "../../context/sound";

export interface PopupComponent {
  text: string;
  id: number;
  result?: ResultType;
  sound?: () => void;
}

const popupRoot = document.getElementById("popup-root");

const popupComponents: {
  [K in PopupType]: FC<PopupComponent>;
} = {
  confirm: () => <div />,
  toast: ToastPopup,
};

function SnackbarManager() {
  // TODO: different sounds for different results
  const { playNotification } = useSoundContext();

  const popups = useAppSelector(selectToastPopups);

  if (!popupRoot || popups.length === 0) return null;

  return createPortal(
    <PopupManagerContainer>
      {popups.map((popup) => {
        const { type, id, text, result } = popup;
        const Component = popupComponents[type];

        return Component ? (
          <Component
            sound={playNotification}
            result={result}
            key={id}
            text={text}
            id={id}
          />
        ) : null;
      })}
    </PopupManagerContainer>,
    popupRoot
  );
}

export default SnackbarManager;
