import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultTheme } from "styled-components";

export type ThemeType = "pastel" | "code";
export const themeTypes: ThemeType[] = ["pastel", "code"];

const pastel = {
  mainColor: "#BFECFF",
  secondColor: "#FFCCEA",
  thirdColor: "#FFF6E3",
  textColor: "#4A4A4A",
};

const code = {
  mainColor: "#000000",
  secondColor: "#CD1715",
  thirdColor: "#19260A",
  textColor: "#7DBB02",
};

const initialState: DefaultTheme = {
  name: "pastel",
  fontFamily: "'Manrope', sans-serif",
  pallet: pastel,
};

const themeSlice = createSlice({
  name: "themes",
  initialState,
  reducers: {
    changeTheme: (_, action: PayloadAction<ThemeType>) => {
      switch (action.payload) {
        case "pastel":
          return {
            name: "pastel",
            fontFamily: "'Manrope', sans-serif",
            pallet: pastel,
          };
        case "code":
          return {
            name: "code",
            fontFamily: "'VT323', monospace;",
            pallet: code,
          };
        default:
          break;
      }
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
