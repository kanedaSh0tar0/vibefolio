import Header from "../header";
import Icon from "../icon";
import { useAppDispatch } from "../../store/hooks";
import {
  ModalType,
  openModal,
  ProgramType,
  openProgramThunk,
} from "../../store/modalSlice";
import { Container, IconsContainer } from "./styles";
import FileUserIcon from "../../assets/icons/file-user";
import FolderIcon from "../../assets/icons/folder";
import EnvelopIcon from "../../assets/icons/envelop";
import PDF from "../../assets/icons/pdf";

function Desktop() {
  const dispatch = useAppDispatch();

  const handleOpenSingleModal = (modal: ModalType) => {
    dispatch(openModal(modal));
  };

  const handleOpenProgram = (program: ProgramType) => {
    dispatch(openProgramThunk(program));
  };

  return (
    <Container>
      <Header />

      <IconsContainer>
        <Icon
          onClick={() => handleOpenProgram("info")}
          SvgIcon={FileUserIcon}
          text="My CV"
        />
        <Icon
          onClick={() => handleOpenSingleModal("pdf")}
          SvgIcon={PDF}
          text="Resume.pdf"
        />
        <Icon
          onClick={() => handleOpenSingleModal("folder")}
          SvgIcon={FolderIcon}
          text="New Folder"
        />
        <Icon
          onClick={() => handleOpenSingleModal("contact_me")}
          SvgIcon={EnvelopIcon}
          text="Email"
        />
      </IconsContainer>
    </Container>
  );
}

export default Desktop;
