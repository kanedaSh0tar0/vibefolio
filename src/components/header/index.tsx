import { useAppDispatch } from "../../store/hooks";
import Clock from "./clock";
import {
  Container,
  ContainerWrapper,
  LeftSide,
  ControlsContainer,
} from "./styles";
import { showToast } from "../../store/popupSlice";
import Socials from "./socials";
import RadialSettings from "./radial-settings";

function Header() {
  const dispatch = useAppDispatch();

  const greetings = () => {
    dispatch(showToast("Hello there 😊"));
  };

  return (
    <ContainerWrapper>
      <Container>
        <LeftSide>
          <span className="cursor-pointer" onClick={greetings}>
            Antonov Mykyta
          </span>
        </LeftSide>

        <Socials />

        <Clock />
      </Container>

      <ControlsContainer>
        <RadialSettings />
      </ControlsContainer>
    </ContainerWrapper>
  );
}

export default Header;
