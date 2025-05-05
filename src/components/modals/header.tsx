import styled from "styled-components";
import Close from "../../assets/icons/close";
import Resize from "../../assets/icons/resize";
import HeaderButton from "./header-button";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  height: 30px;
  padding: 0 10px;
  border-bottom: 2px solid ${({ theme }) => theme.textColor};
  border-radius: 10px 10px 0 0;
  background-color: ${({ theme }) => theme.thirdColor};
  cursor: move;
`;

function Header({
  handleClose,
  handleResize,
  handleDrag,
}: {
  handleClose: () => void;
  handleResize: () => void;
  handleDrag: (e: React.MouseEvent) => void;
}) {
  return (
    <HeaderContainer onMouseDown={handleDrag}>
      <HeaderButton Icon={Resize} onClick={handleResize} />
      <HeaderButton Icon={Close} onClick={handleClose} />
    </HeaderContainer>
  );
}

export default Header;
