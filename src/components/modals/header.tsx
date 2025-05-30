import { useTheme } from "styled-components";
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
  const theme = useTheme();

  return (
    <HeaderContainer className="cursor-move" onMouseDown={handleDrag}>
      {theme.name !== "code" && (
        <>
          <Title>{title}</Title>

          <ButtonsContainer>
            <HeaderButton Icon={Close} onClick={handleClose} />
          </ButtonsContainer>
        </>
      )}
    </HeaderContainer>
  );
}

export default Header;
