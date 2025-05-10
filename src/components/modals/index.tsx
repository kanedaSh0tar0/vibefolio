import { createPortal } from "react-dom";
import { useAppSelector } from "../../store/hooks";
import InfoModal from "./info";
import Wrapper from "./wrapper";
import Photo from "./photo";
import AboutMe from "./about-me";
import Skills from "./skills";
import Experience from "./experience";

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
            case "photo":
              return <Photo modal={modal} key={modal.type} />;
            case "about_me":
              return <AboutMe modal={modal} key={modal.type} />;
            case "skills":
              return <Skills modal={modal} key={modal.type} />;
            case "experience":
              return <Experience modal={modal} key={modal.type} />;
            case "other":
              return (
                <Wrapper modal={modal} key={modal.type}>
                  Test other Modal
                </Wrapper>
              );
            case "other_0":
              return (
                <Wrapper modal={modal} key={modal.type}>
                  Test other_0 Modal
                </Wrapper>
              );
            case "other_1":
              return (
                <Wrapper modal={modal} key={modal.type}>
                  Test other_1 Modal
                </Wrapper>
              );
            case "other_2":
              return (
                <Wrapper modal={modal} key={modal.type}>
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
