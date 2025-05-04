import styled from "styled-components";
import Header from "../header";
import ComputerIcon from "../../assets/icons/computer";
import FolderIcon from "../../assets/icons/folder";
import MusicIcon from "../../assets/icons/music";
import Icon from "../icon";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const IconsContainer = styled.div`
  display: grid;
  gap: 20px;
`;

function Desktop() {
  return (
    <Container className="cursor">
      <Header />

      <IconsContainer>
        <Icon SvgIcon={ComputerIcon} text='MyComputer' />
        <Icon SvgIcon={FolderIcon} text='New Folder' />
        <Icon SvgIcon={MusicIcon} text='Music' />
      </IconsContainer>
    </Container>
  );
}

export default Desktop;
