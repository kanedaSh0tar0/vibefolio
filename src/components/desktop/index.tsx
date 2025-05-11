import Header from "../header";
import ComputerIcon from "../../assets/icons/computer";
import FolderIcon from "../../assets/icons/folder";
import MusicIcon from "../../assets/icons/music";
import Icon from "../icon";
import { useAppDispatch } from "../../store/hooks";
import {
  ModalType,
  openModal,
  ProgramType,
  openProgramThunk,
} from "../../store/modalSlice";
import { Container, IconsContainer } from "./styles";

function Desktop() {
  const dispatch = useAppDispatch();

  const handleOpenSingleModal = (modal: ModalType) => {
    dispatch(openModal(modal));
  };

  const handleOpenProgram = (program: ProgramType) => {
    dispatch(openProgramThunk(program));
  };

  return (
    <Container className="cursor">
      <Header />

      <IconsContainer>
        <Icon
          onClick={() => handleOpenSingleModal("info")}
          SvgIcon={ComputerIcon}
          text="MyComputer"
        />
        <Icon
          onClick={() => handleOpenSingleModal("other")}
          SvgIcon={FolderIcon}
          text="New Folder"
        />
        <Icon
          onClick={() => handleOpenProgram("other")}
          SvgIcon={MusicIcon}
          text="Music"
        />
        <Icon
          onClick={() => handleOpenProgram("info")}
          SvgIcon={MusicIcon}
          text="Music 2"
        />
      </IconsContainer>
    </Container>
  );
}

export default Desktop;
