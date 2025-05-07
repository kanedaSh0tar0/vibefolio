import { createPortal } from "react-dom";
import { useAppSelector } from "../../store/hooks";
import InfoModal from "./info";
import Wrapper from "./wrapper";

const modalRoot = document.getElementById("modal-root");

function ModalManager() {
  const modals = useAppSelector((state) => state.modals);

  console.log(modals, "modals");

  if (!modalRoot || modals.modals.length === 0) return null;

  return createPortal(
    <>
      {modals.modals
        .filter(({ isOpen }) => isOpen)
        .map((modal) => {
          switch (modal.type) {
            case "info":
              return <InfoModal modal={modal} key={modal.type} />;
            case "other":
              return (
                <Wrapper modal={modal} key={modal.type} type={modal.type}>
                  Test other Modal
                </Wrapper>
              );
            case "other_0":
              return (
                <Wrapper modal={modal} key={modal.type} type={modal.type}>
                  Test other_0 Modal
                </Wrapper>
              );
            case "other_1":
              return (
                <Wrapper modal={modal} key={modal.type} type={modal.type}>
                  Test other_1 Modal
                </Wrapper>
              );
            case "other_2":
              return (
                <Wrapper modal={modal} key={modal.type} type={modal.type}>
                  Test other_2 Modal
                </Wrapper>
              );
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
