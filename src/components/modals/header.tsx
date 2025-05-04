import styled from "styled-components";
import { ModalType } from "../../store/modalSlice";
import { closeModal } from "../../store/modalSlice";
import { useAppDispatch } from "../../store/hooks";

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

const Button = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.forthColor};
`;

function Header({ type }: { type: ModalType }) {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeModal(type));
  };

  return (
    <HeaderContainer>
      <Button className="cursor-pointer" onClick={() => {}} />
      <Button className="cursor-pointer" onClick={handleClose} />
    </HeaderContainer>
  );
}

export default Header;
