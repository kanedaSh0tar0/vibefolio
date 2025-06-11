import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultTheme } from "styled-components";

export type ThemeType = "pastel" | "code";
export const themeTypes: ThemeType[] = ["pastel", "code"];

const pastelBackgrounds = {
  uraniumBlue: "#BFECFF",
  cerulean: "#0B7189",
  cinnabar: "#E55934",
  roseRed: "#C33C54",
  davysGray: "#50514F",
  darkGreen: "#17301C",
};

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
    changeBackground: (state, action: PayloadAction<keyof typeof pastelBackgrounds>) => {
      state.pallet = {...state.pallet , mainColor: pastelBackgrounds[action.payload]}
    }
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
