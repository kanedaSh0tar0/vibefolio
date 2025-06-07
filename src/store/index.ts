import { configureStore } from "@reduxjs/toolkit";
import modalsRducer from "./modalSlice";
import themeSlice from "./themeSlice";
import popupSlice from "./popupSlice";

export const store = configureStore({
  reducer: {
    modals: modalsRducer,
    themes: themeSlice,
    popups: popupSlice,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
