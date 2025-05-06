import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "info" | "other";
export type PositionType = { x: number; y: number };
export type ModalDimansion = { width: number; height: number };

export interface Modal {
  type: ModalType;
  title?: string;
  isOpen: boolean;
  index: number;
  position: PositionType;
  dimensions: ModalDimansion;
}

interface ModalStackState {
  modals: Modal[];
  topIndex: number;
}

const initialState: ModalStackState = {
  modals: [
    {
      type: "info",
      title: 'Info.txt',
      isOpen: false,
      index: 0,
      position: { x: 200, y: 200 },
      dimensions: { width: 200, height: 200 },
    },
    {
      type: "other",
      isOpen: false,
      index: 0,
      position: { x: 220, y: 220 },
      dimensions: { width: 400, height: 200 },
    },
  ],
  topIndex: 0,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalType>) => {
      const modalIndex = state.modals.findIndex(
        (modal) => modal.type === action.payload
      );

      if (modalIndex === -1) return;

      const modal = state.modals[modalIndex];

      if (!modal.isOpen) {
        state.topIndex += 1;
        modal.isOpen = true;
        modal.index = state.topIndex;
      } else {
        state.topIndex += 1;
        modal.index = state.topIndex;
      }
    },
    closeModal: (
      state,
      action: PayloadAction<{ type: ModalType; position?: PositionType }>
    ) => {
      const modalIndex = state.modals.findIndex(
        (modal) => modal.type === action.payload.type
      );

      if (modalIndex === -1) return;

      const modal = state.modals[modalIndex];

      modal.isOpen = false;

      if (action.payload.position) {
        modal.position = action.payload.position;
      }
    },
    closeAllModals: (state) => {
      for (const modal of state.modals) {
        modal.isOpen = false;
      }
      state.topIndex = 0;
    },
    bringToFront: (state, action: PayloadAction<ModalType>) => {
      const modalIndex = state.modals.findIndex(
        (modal) => modal.type === action.payload
      );

      if (modalIndex === -1) return;

      state.topIndex += 1;
      state.modals[modalIndex].index = state.topIndex;
    },
  },
});

export const { openModal, closeModal, closeAllModals, bringToFront } =
  modalsSlice.actions;
export default modalsSlice.reducer;
