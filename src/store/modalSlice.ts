import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "info" | "other";

interface ModalStackState {
  modals: ModalType[];
}

const initialState: ModalStackState = {
  modals: [],
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalType>) => {
      if (state.modals.includes(action.payload)) {
        return;
      }

      state.modals.push(action.payload);
    },
    closeModal: (state, action: PayloadAction<ModalType>) => {
      state.modals = state.modals.filter(
        (modal) => modal !== action.payload
      );
    },
    closeAllModals: (state) => {
      state.modals = [];
    },
  },
});

export const { openModal, closeModal, closeAllModals } = modalsSlice.actions;
export default modalsSlice.reducer;
