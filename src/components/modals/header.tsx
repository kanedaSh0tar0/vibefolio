import Close from "../../assets/icons/close";
import HeaderButton from "./header-button";
import { ButtonsContainer, HeaderContainer, Title } from "./styles";

function Header({
  handleClose,
  handleDrag,
  title,
}: {
  handleClose: () => void;
  handleDrag: (e: React.MouseEvent) => void;
  title?: string;
}) {
  return (
    <HeaderContainer className="cursor-move" onMouseDown={handleDrag}>
      <Title>{title}</Title>

      <ButtonsContainer>
        <HeaderButton Icon={Close} onClick={handleClose} />
      </ButtonsContainer>
    </HeaderContainer>
  );
}

export default Header;
