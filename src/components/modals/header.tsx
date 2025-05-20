import { useTheme } from "styled-components";
import Close from "../../assets/icons/close";
import Resize from "../../assets/icons/resize";
import HeaderButton from "./header-button";
import { ButtonsContainer, HeaderContainer, Title } from "./styles";

function Header({
  handleClose,
  handleResize,
  handleDrag,
  title,
}: {
  handleClose: () => void;
  handleResize: () => void;
  handleDrag: (e: React.MouseEvent) => void;
  title?: string;
}) {
  const theme = useTheme();

  return (
    <HeaderContainer className="cursor-move" onMouseDown={handleDrag}>
      {theme.name !== "code" && (
        <>
          <Title>{title}</Title>

          <ButtonsContainer>
            <HeaderButton Icon={Resize} onClick={handleResize} />
            <HeaderButton Icon={Close} onClick={handleClose} />
          </ButtonsContainer>
        </>
      )}
    </HeaderContainer>
  );
}

export default Header;
