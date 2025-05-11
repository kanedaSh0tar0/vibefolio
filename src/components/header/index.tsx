import { useAppDispatch } from "../../store/hooks";
import { closeAllModals } from "../../store/modalSlice";
import CloseAll from "../../assets/icons/close-all";
import Clock from "./clock";
import { ButtonsContainer, Container, LeftSide } from "./styles";

function Header() {
  const dispatch = useAppDispatch();

  const handleCloseAll = () => dispatch(closeAllModals());

  return (
    <Container>
      <LeftSide>
        <span>Antonov Mykyta</span>

        <ButtonsContainer>
          <CloseAll
            className="cursor-pointer"
            onClick={handleCloseAll}
            width={25}
            height={25}
          />
        </ButtonsContainer>
      </LeftSide>

      <Clock />
    </Container>
  );
}

export default Header;
