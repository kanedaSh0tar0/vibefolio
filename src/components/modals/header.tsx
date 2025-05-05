import styled from "styled-components";
import { ModalType } from "../../store/modalSlice";
import { closeModal } from "../../store/modalSlice";
import { useAppDispatch } from "../../store/hooks";
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
`;

function Header({ type }: { type: ModalType }) {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeModal(type));
  };

  return (
    <HeaderContainer>
      <HeaderButton Icon={Resize} onClick={() => {}} />
      <HeaderButton Icon={Close} onClick={handleClose} />
    </HeaderContainer>
  );
}

export default Header;
