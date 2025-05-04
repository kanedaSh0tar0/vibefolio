import { createPortal } from "react-dom";
import { useAppSelector } from "../../store/hooks";
import InfoModal from "./info";

const modalRoot = document.getElementById("modal-root");

function ModalManager() {
  const modals = useAppSelector((state) => state.modals);

  if (!modalRoot || modals.modals.length === 0) return null;

  return createPortal(
    <>
      {modals.modals.map((type) => {
        switch (type) {
          case "info":
            return <InfoModal key={type} type={type} />;
          // ...
          default:
            return null;
        }
      })}
    </>,
    modalRoot
  );
}

export default ModalManager;
