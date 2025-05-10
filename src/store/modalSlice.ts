import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import { AppDispatch } from ".";

export type ModalType =
  | "info"
  | "about_me"
  | "skills"
  | "photo"
  | "experience"
  | "other"
  | "other_0"
  | "other_1"
  | "other_2";
export type PositionType = { x: number; y: number };
type ModalDimension = { width: number; height: number };

export interface Modal {
  type: ModalType;
  title?: string;
  isOpen: boolean;
  index: number;
  position: PositionType;
  dimensions: ModalDimension;
}

interface ModalStackState {
  modals: Modal[];
  topIndex: number;
}

const initialState: ModalStackState = {
  modals: [
    {
      type: "info",
      title: "Info.txt",
      isOpen: false,
      index: 0,
      position: { x: 200, y: 200 },
      dimensions: { width: 200, height: 200 },
    },
    {
      type: "photo",
      title: "My_photo.jpg",
      isOpen: false,
      index: 0,
      position: { x: 200, y: 200 },
      dimensions: { width: 200, height: 200 },
    },
    {
      type: "about_me",
      title: "About_me.txt",
      isOpen: false,
      index: 0,
      position: { x: 600, y: 250 },
      dimensions: { width: 600, height: 250 },
    },
    {
      type: "skills",
      title: "Skills",
      isOpen: false,
      index: 0,
      position: { x: 400, y: 100 },
      dimensions: { width: 300, height: 450 },
    },
    {
      type: "experience",
      title: "Work_experience.txt",
      isOpen: false,
      index: 0,
      position: { x: 600, y: 200 },
      dimensions: { width: 400, height: 300 },
    },
    {
      type: "other",
      title: "other",
      isOpen: false,
      index: 0,
      position: { x: 220, y: 220 },
      dimensions: { width: 400, height: 200 },
    },
    {
      type: "other_0",
      title: "other_0",
      isOpen: false,
      index: 0,
      position: { x: 420, y: 110 },
      dimensions: { width: 100, height: 400 },
    },
    {
      type: "other_1",
      title: "other_1",
      isOpen: false,
      index: 0,
      position: { x: 120, y: 620 },
      dimensions: { width: 600, height: 100 },
    },
    {
      type: "other_2",
      title: "other_2",
      isOpen: false,
      index: 0,
      position: { x: 520, y: 520 },
      dimensions: { width: 500, height: 500 },
    },
  ],
  topIndex: 0,
};

const programs: Record<string, ModalType[]> = {
  info: ["photo", "about_me", "skills", "experience"],
  other: ["other", "other_0", "other_1", "other_2"],
};

export type ProgramType = keyof typeof programs;

export const openProgramThunk =
  (program: ProgramType) => (dispatch: AppDispatch) => {
    programs[program].forEach((item, index) => {
      setTimeout(() => dispatch(openModal(item)), 200 * index);
    });
  };

const openModalFunction = (
  state: WritableDraft<ModalStackState>,
  type: ModalType
) => {
  const modalIndex = state.modals.findIndex((modal) => modal.type === type);

  if (modalIndex === -1) return;

  const modal = state.modals[modalIndex];

  state.topIndex += 1;
  modal.index = state.topIndex;

  if (!modal.isOpen) {
    modal.isOpen = true;
  }
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal: (
      state: WritableDraft<ModalStackState>,
      action: PayloadAction<ModalType>
    ) => openModalFunction(state, action.payload),
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
      modal.index = 0;

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
