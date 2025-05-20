import { configureStore } from "@reduxjs/toolkit";
import modalsRducer from "./modalSlice";
import themeSlice from "./themeSlice";

export const store = configureStore({
  reducer: {
    modals: modalsRducer,
    themes: themeSlice,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
