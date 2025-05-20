import "styled-components";
import { ThemeType } from "./store/themeSlice";

declare module "styled-components" {
  export interface DefaultTheme {
    name: ThemeType;
    fontFamily: string;
    pallet: {
      mainColor: string;
      secondColor: string;
      thirdColor: string;
      textColor: string;
    };
  }
}
