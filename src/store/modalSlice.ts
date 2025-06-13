import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import { AppDispatch, RootState } from ".";

export type ModalType =
  | "about_me"
  | "skills"
  | "photo"
  | "experience"
  | "pdf"
  | "contact_me"
  | "settings"
  | "folder";
export type PositionType = { x: number; y: number };
export type ProgramType = keyof typeof programs;
type ModalDimension = { width: number; height: number };

export interface Modal {
  type: ModalType;
  title?: string;
  isOpen: boolean;
  index: number;
  position: PositionType;
  gridPosition?: PositionType;
  dimensions: ModalDimension;
  isClosing: boolean;
}
interface ModalStackState {
  modals: Modal[];
  topIndex: number;
  lastX: number;
  lastY: number;
}

const initialState: ModalStackState = {
  modals: [
    {
      type: "photo",
      title: "My_photo.jpg",
      isOpen: false,
      index: 0,
      position: { x: 0, y: 0 },
      dimensions: { width: 2, height: 2 },
      isClosing: false,
    },
    {
      type: "about_me",
      title: "About_me.txt",
      isOpen: false,
      index: 0,
      position: { x: 0, y: 0 },
      dimensions: { width: 5, height: 2.5 },
      isClosing: false,
    },
    {
      type: "skills",
      title: "Skills.exe",
      isOpen: false,
      index: 0,
      position: { x: 0, y: 0 },
      dimensions: { width: 2.5, height: 4 },
      isClosing: false,
    },
    {
      type: "experience",
      title: "Work_experience.exe",
      isOpen: false,
      index: 0,
      position: { x: 0, y: 0 },
      dimensions: { width: 3.5, height: 4.5 },
      isClosing: false,
    },
    {
      type: "pdf",
      title: "Resume.pdf",
      isOpen: false,
      index: 0,
      position: { x: 0, y: 0 },
      dimensions: { width: 6.5, height: 5 },
      isClosing: false,
    },
    {
      type: "contact_me",
      title: "Email",
      isOpen: false,
      index: 0,
      position: { x: 0, y: 0 },
      dimensions: { width: 6, height: 5 },
      isClosing: false,
    },
    {
      type: "folder",
      title: "New Folder",
      isOpen: false,
      index: 0,
      position: { x: 0, y: 0 },
      dimensions: { width: 6, height: 4 },
      isClosing: false,
    },
    {
      type: "settings",
      title: "Settings",
      isOpen: false,
      index: 0,
      position: { x: 0, y: 0 },
      dimensions: { width: 3, height: 2 },
      isClosing: false,
    },
  ],
  topIndex: 0,
  lastX: 0,
  lastY: 0,
};

const programs: Record<string, ModalType[]> = {
  info: ["experience", "about_me", "skills", "photo"],
};

export const openProgramThunk =
  (program: ProgramType) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const modalList = programs[program];
    const modalsMap = state.modals.modals;

    const sortedItems = [...modalList]
      .map((type) => modalsMap.find((m) => m.type === type))
      .filter(Boolean)
      .sort((a, b) => {
        const areaA = a!.dimensions.width * a!.dimensions.height;
        const areaB = b!.dimensions.width * b!.dimensions.height;
        return areaB - areaA;
      })
      .map((m) => m!.type);

    sortedItems.forEach((item, index) => {
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

  if (!modal.isOpen) {
    modal.isClosing = false;
    modal.isOpen = true;

    const openModals = state.modals.filter((m) => m.isOpen);
    const maxIndex = Math.max(...openModals.map((m) => m.index ?? 0), 0);
    const newTopIndex = maxIndex + 1;
    state.topIndex = newTopIndex;
    modal.index = state.topIndex;
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
      action: PayloadAction<{
        type: ModalType;
        position?: PositionType;
        gridPosition?: PositionType;
      }>
    ) => {
      const modalIndex = state.modals.findIndex(
        (modal) => modal.type === action.payload.type
      );

      if (modalIndex === -1) return;

      const modal = state.modals[modalIndex];

      modal.isOpen = false;
      modal.isClosing = false;
      modal.index = 0;

      if (action.payload.position) {
        modal.position = action.payload.position;
      }
    },
    closeAllModals: (state) => {
      for (const modal of state.modals) {
        modal.isClosing = true;
      }
      state.topIndex = 0;
    },
    bringToFront: (state, action: PayloadAction<ModalType>) => {
      const modalIndex = state.modals.findIndex(
        (modal) => modal.type === action.payload
      );

      if (modalIndex === -1) return;

      const targetModal = state.modals[modalIndex];
      const prevIndex = targetModal.index ?? 0;

      const openModals = state.modals.filter((m) => m.isOpen);

      const maxIndex = Math.max(...openModals.map((m) => m.index ?? 0), 0);
      const newTopIndex = maxIndex + 1;

      state.modals = state.modals.map((modal) => {
        if (!modal.isOpen) return modal;

        if ((modal.index ?? 0) > prevIndex) {
          return { ...modal, index: (modal.index ?? 0) - 1 };
        }

        return modal;
      });

      state.modals[modalIndex].index = maxIndex;

      state.topIndex = newTopIndex;
    },
    setLastCoordinates: (state, action: PayloadAction<PositionType>) => {
      state.lastX = action.payload.x;
      state.lastY = action.payload.y;
    },
    setPosition: (
      state,
      action: PayloadAction<{
        type: ModalType;
        position: PositionType;
        gridPosition: PositionType;
      }>
    ) => {
      const modalIndex = state.modals.findIndex(
        (modal) => modal.type === action.payload.type
      );

      if (modalIndex === -1) return;

      state.modals[modalIndex].position = action.payload.position;
      state.modals[modalIndex].gridPosition = action.payload.gridPosition;
    },
  },
});

export const {
  openModal,
  closeModal,
  closeAllModals,
  bringToFront,
  setPosition,
  setLastCoordinates,
} = modalsSlice.actions;
export default modalsSlice.reducer;
