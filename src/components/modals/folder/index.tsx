import { useAppDispatch } from "../../../store/hooks";
import { Modal, ModalType, openModal } from "../../../store/modalSlice";
import { IconsContainer } from "../../desktop/styles";
import Icon from "../../icon";
import Wrapper from "../wrapper";

import PhotoIcon from "../../../assets/icons/photo";
import BookIcon from "../../../assets/icons/book";
import ExperienceIcon from "../../../assets/icons/experience";
import AboutMeIcon from "../../../assets/icons/about-me";
import { useTheme } from "styled-components";

function Folder({ modal }: { modal: Modal }) {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleOpenSingleModal = (modal: ModalType) => {
    dispatch(openModal(modal));
  };

  return (
    <Wrapper modal={modal}>
      <IconsContainer flow="row">
        <Icon
          onClick={() => handleOpenSingleModal("photo")}
          SvgIcon={PhotoIcon}
          text="My_photo"
          textColor={theme.pallet.textColor}
        />
        <Icon
          onClick={() => handleOpenSingleModal("experience")}
          SvgIcon={ExperienceIcon}
          text="Experience"
          textColor={theme.pallet.textColor}
        />
        <Icon
          onClick={() => handleOpenSingleModal("about_me")}
          SvgIcon={AboutMeIcon}
          text="About_me"
          textColor={theme.pallet.textColor}
        />
        <Icon
          onClick={() => handleOpenSingleModal("skills")}
          SvgIcon={BookIcon}
          text="Skills"
          textColor={theme.pallet.textColor}
        />
      </IconsContainer>
    </Wrapper>
  );
}

export default Folder;
