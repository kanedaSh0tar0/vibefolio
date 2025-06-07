import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeAllModals } from "../../store/modalSlice";
import CloseAll from "../../assets/icons/close-all";
import Clock from "./clock";
import { ButtonsContainer, Container, LeftSide } from "./styles";
// import ChangeTheme from "../../assets/icons/change-theme";
// import { changeTheme, themeTypes } from "../../store/themeSlice";
import VolumeButton from "./volume-button";
import { showToast } from "../../store/popupSlice";
import Socials from "./socials";

function Header() {
  const themeName = useAppSelector((state) => state.themes.name);
  const dispatch = useAppDispatch();

  const handleCloseAll = () => dispatch(closeAllModals());

  const greetings = () => {
    dispatch(showToast("Hello there 😊"));
  };

  // const handleChangeTheme = () => {
  //   const currentThemeIndex = themeTypes.findIndex(
  //     (theme) => theme === themeName
  //   );

  //   console.log(currentThemeIndex, "currentThemeIndex");

  //   if (themeTypes.length - 1 === currentThemeIndex) {
  //     dispatch(changeTheme(themeTypes[0]));
  //   } else {
  //     dispatch(changeTheme(themeTypes[currentThemeIndex + 1]));
  //   }
  // };

  return (
    <Container themeName={themeName}>
      <LeftSide>
        <span className="cursor-pointer" onClick={greetings}>
          Antonov Mykyta
        </span>

        <ButtonsContainer>
          <CloseAll
            className="cursor-pointer"
            onClick={handleCloseAll}
            width={25}
            height={25}
          />
          {/* <ChangeTheme 
            className="cursor-pointer"
            onClick={handleChangeTheme}
            width={25}
            height={25}
          /> */}
          <VolumeButton className="cursor-pointer" width={25} height={25} />
        </ButtonsContainer>
      </LeftSide>

      <Socials />

      <Clock />
    </Container>
  );
}

export default Header;
