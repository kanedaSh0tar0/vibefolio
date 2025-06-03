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
          text="Folder"
        />
      </IconsContainer>
    </Container>
  );
}

export default Desktop;
