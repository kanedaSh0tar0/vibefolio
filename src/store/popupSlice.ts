import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

export type PopupType = "toast" | "confirm";

export type ResultType = "success" | "fail";

export interface Popup {
  id: number;
  type: PopupType;
  result?: ResultType;
  text: string;
}

let idCounter = 0;

const initialState: { popups: Popup[] } = {
  popups: [],
};

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup: (state, action: PayloadAction<Omit<Popup, "id">>) => {
      state.popups.push({
        id: ++idCounter,
        result: "success",
        ...action.payload,
      });
    },
    openThunkPopup: (state, action: PayloadAction<Popup>) => {
      state.popups.push({ result: "success", ...action.payload });
    },
    closePopup: (state, action: PayloadAction<number>) => {
      state.popups = state.popups.filter((p) => p.id !== action.payload);
    },
    closeAllPopups: (state) => {
      state.popups = [];
    },
  },
});

export const { openPopup, closePopup, closeAllPopups, openThunkPopup } =
  popupSlice.actions;

export const showToast =
  (text: string, result: ResultType = "success") =>
  (dispatch: AppDispatch) => {
    const id = ++idCounter;
    dispatch(openThunkPopup({ type: "toast", text, id, result }));
  };

export default popupSlice.reducer;
