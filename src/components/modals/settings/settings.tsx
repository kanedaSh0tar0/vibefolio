import { useTheme } from "styled-components";
import { Modal } from "../../../store/modalSlice";
import Wrapper from "../wrapper";
import { ColorsGrid, CoolorTile } from "./styles";
import { useAppDispatch } from "../../../store/hooks";
import { changeBackground } from "../../../store/themeSlice";

function Settings({ modal }: { modal: Modal }) {
  const { backgroundColors } = useTheme();
  const dispatch = useAppDispatch();

  const handleColorClick = (color: string) => {
    dispatch(changeBackground(color));
  };

  return (
    <Wrapper modal={modal}>
      <ColorsGrid>
        {backgroundColors.map((color) => (
          <CoolorTile
            key={color}
            tileColor={color}
            className="cursor-pointer"
            onClick={() => handleColorClick(color)}
          />
        ))}
      </ColorsGrid>
    </Wrapper>
  );
}

export default Settings;
