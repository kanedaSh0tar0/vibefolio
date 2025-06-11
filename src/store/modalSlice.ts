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
  | "folder";
export type PositionType = { x: number; y: number };
export type ProgramType = keyof typeof programs;
type ModalDimension = { width: number; height: number };

// TODO: Replace from redux
const DESKTOP_HEIGHT = document.documentElement.clientHeight;
const DESKTOP_WIDTH = document.documentElement.clientWidth;

const MODAL_GAP = 10;
const COLUMNS = 12;
const ROWS = 6;

const cellSize =
  Math.min(DESKTOP_WIDTH / COLUMNS, DESKTOP_HEIGHT / ROWS) - MODAL_GAP / 2;

// TODO: This is really bad :(
const MARGIN_LEFT = cellSize + 2 * MODAL_GAP;
const MARGIN_TOP = cellSize / 1.5;

export interface Modal {
  type: ModalType;
  title?: string;
  isOpen: boolean;
  index: number;
  position: PositionType;
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
      dimensions: { width: 2 * cellSize, height: 2 * cellSize },
      isClosing: false
    },
    {
      type: "about_me",
      title: "About_me.txt",
      isOpen: false,
      index: 0,
      position: { x: 0, y: 0 },
      dimensions: { width: 5 * cellSize, height: 2.5 * cellSize },
      isClosing: false
    },
    {
      type: "skills",
      title: "Skills.exe",
      isOpen: false,
      index: 0,
      position: { x: 0, y: 0 },
      dimensions: { width: 2.5 * cellSize, height: 4 * cellSize },
      isClosing: false
    },
    {
      type: "experience",
      title: "Work_experience.exe",
      isOpen: false,
      index: 0,
      position: { x: 0, y: 0 },
      dimensions: { width: 3.5 * cellSize, height: 4.5 * cellSize },
      isClosing: false
    },
    {
      type: "pdf",
      title: "Resume.pdf",
      isOpen: false,
      index: 0,
      position: { x: 0, y: 0 },
      dimensions: { width: 6.5 * cellSize, height: 5 * cellSize },
      isClosing: false
    },
    {
      type: "contact_me",
      title: "Email",
      isOpen: false,
      index: 0,
      position: { x: 0, y: 0 },
      dimensions: { width: 6 * cellSize, height: 5 * cellSize },
      isClosing: false
    },
    {
      type: "folder",
      title: "New Folder",
      isOpen: false,
      index: 0,
      position: { x: 0, y: 0 },
      dimensions: { width: 6 * cellSize, height: 4 * cellSize },
      isClosing: false
    },
  ],
  topIndex: 0,
  lastX: MARGIN_LEFT,
  lastY: MARGIN_TOP,
};

const programs: Record<string, ModalType[]> = {
  info: ["photo", "about_me", "skills", "experience"],
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

function isOverlapping(r1: Modal, r2: Modal): boolean {
  return (
    r1.position.x < r2.position.x + r2.dimensions.width + MODAL_GAP &&
    r1.position.x + r1.dimensions.width + MODAL_GAP > r2.position.x &&
    r1.position.y < r2.position.y + r2.dimensions.height + MODAL_GAP &&
    r1.position.y + r1.dimensions.height + MODAL_GAP > r2.position.y
  );
}

function findPosition(
  placed: Modal[],
  modal: Modal
): { x: number; y: number } | null {
  for (
    let y = MARGIN_TOP;
    y <= DESKTOP_HEIGHT - modal.dimensions.height;
    y += MODAL_GAP
  ) {
    for (
      let x = MARGIN_LEFT;
      x <= DESKTOP_WIDTH - modal.dimensions.width;
      x += MODAL_GAP
    ) {
      const candidate: Modal = { ...modal, position: { x, y } };
      const overlaps = placed.some((r) => isOverlapping(r, candidate));
      if (!overlaps) {
        return { x, y };
      }
    }
  }

  return null;
}

function packWithinArea(state: ModalStackState, modal: Modal) {
  const openedModals = state.modals.filter((m) => m.isOpen);
  const pos = findPosition(openedModals, modal);

  if (pos) {
    modal.position = pos;
  } else {
    state.lastX += MODAL_GAP;
    state.lastY += MODAL_GAP;

    if (
      state.lastX + modal.dimensions.width > DESKTOP_WIDTH ||
      state.lastY + modal.dimensions.height > DESKTOP_HEIGHT
    ) {
      state.lastX = MARGIN_LEFT;
      state.lastY = MARGIN_TOP;
    }

    modal.position = { x: state.lastX, y: state.lastY };
  }

  modal.isOpen = true;
}

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
    packWithinArea(state, modal);
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

      state.topIndex += 1;
      state.modals[modalIndex].index = state.topIndex;
    },
  },
});

export const { openModal, closeModal, closeAllModals, bringToFront } =
  modalsSlice.actions;
export default modalsSlice.reducer;
