import styled from "styled-components";
import Close from "../../assets/icons/close";
import Resize from "../../assets/icons/resize";
import HeaderButton from "./header-button";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  width: 100%;
  padding: 0 10px;
  border-radius: 10px 10px 0 0;
  background-color: ${({ theme }) => theme.thirdColor};
  cursor: move;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-center: center;
  gap: 5px;
`;

const Title = styled.span`
  font-family: "Segoe UI", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  user-select: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

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
  return (
    <HeaderContainer onMouseDown={handleDrag}>
      <Title>{title}</Title>
      <ButtonsContainer>
        <HeaderButton Icon={Resize} onClick={handleResize} />
        <HeaderButton Icon={Close} onClick={handleClose} />
      </ButtonsContainer>
    </HeaderContainer>
  );
}

export default Header;
