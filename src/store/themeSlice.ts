import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultTheme } from "styled-components";

export type ThemeType = "pastel" | "code";
export const themeTypes: ThemeType[] = ["pastel", "code"];

export const pastelBackgrounds = [
  "#BFECFF",
  "#0B7189",
  "#E55934",
  "#C33C54",
  "#50514F",
  "#17301C",
];

const pastel = {
  mainColor: "#BFECFF",
  secondColor: "#FFCCEA",
  thirdColor: "#FFF6E3",
  textColor: "#1D1C1A ",
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
  backgroundColors: pastelBackgrounds,
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
            backgroundColors: pastelBackgrounds,
          };
        case "code":
          return {
            name: "code",
            fontFamily: "'VT323', monospace;",
            pallet: code,
            backgroundColors: [],
          };
        default:
          break;
      }
    },
    changeBackground: (state, action: PayloadAction<string>) => {
      state.pallet.mainColor = action.payload;
    },
  },
});

export const { changeTheme, changeBackground } = themeSlice.actions;
export default themeSlice.reducer;
