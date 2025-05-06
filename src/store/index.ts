import { configureStore } from "@reduxjs/toolkit";
import modalsRducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    modals: modalsRducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
