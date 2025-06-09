import { useAppDispatch } from "../../store/hooks";
import Clock from "./clock";
import { Container, LeftSide } from "./styles";
import { showToast } from "../../store/popupSlice";
import Socials from "./socials";

function Header() {
  const dispatch = useAppDispatch();

  const greetings = () => {
    dispatch(showToast("Hello there 😊"));
  };

  return (
    <Container>
      <LeftSide>
        <span className="cursor-pointer" onClick={greetings}>
          Antonov Mykyta
        </span>
      </LeftSide>

      <Socials />

      <Clock />
    </Container>
  );
}

export default Header;
