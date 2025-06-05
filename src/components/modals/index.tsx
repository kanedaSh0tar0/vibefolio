import { createPortal } from "react-dom";
import { useAppSelector } from "../../store/hooks";
import Photo from "./photo";
import AboutMe from "./about-me";
import Skills from "./skills";
import Experience from "./experience";
import Folder from "./folder";
import PDFResume from "./pdf-resume";
import ContactMe from "./contact-me";

const modalRoot = document.getElementById("modal-root");

function ModalManager() {
  const modals = useAppSelector((state) => state.modals);

  if (!modalRoot || modals.modals.length === 0) return null;

  return createPortal(
    <>
      {modals.modals
        .filter(({ isOpen }) => isOpen)
        .map((modal) => {
          switch (modal.type) {
            case "photo":
              return <Photo modal={modal} key={modal.type} />;
            case "about_me":
              return <AboutMe modal={modal} key={modal.type} />;
            case "skills":
              return <Skills modal={modal} key={modal.type} />;
            case "experience":
              return <Experience modal={modal} key={modal.type} />;
            case "folder":
              return <Folder modal={modal} key={modal.type} />;
            case "pdf":
              return <PDFResume modal={modal} key={modal.type} />;
            case "contact_me":
              return <ContactMe modal={modal} key={modal.type} />;
            default:
              return null;
          }
        })}
    </>,
    modalRoot
  );
}

export default ModalManager;
