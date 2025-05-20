import styled, { keyframes } from "styled-components";
import { PositionType } from "../../store/modalSlice";
import { ModalSize } from "./wrapper";

export const Button = styled.button<{ clicked?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.pallet.textColor};
  background-color: ${({ theme }) => theme.pallet.secondColor};
  padding: 4px;

  svg {
    transform: ${({ clicked }) => (clicked ? "scale(0.9)" : "scale(1)")};
    color: ${({ theme }) => theme.pallet.textColor};
  }
`;

export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  width: 100%;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.pallet.thirdColor};

  ${({ theme }) => {
    if (theme.name === "pastel") {
      return `
        border-radius: 10px 10px 0 0;

      `;
    }

    if (theme.name === "code") {
      return `
        height: 0px;
        padding-top: 30px;
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
      `;
    }
  }}
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-center: center;
  gap: 5px;
`;

export const Title = styled.span`
  font-family: "Segoe UI", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.pallet.textColor};
  text-align: center;
  user-select: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const scaleIn = keyframes`
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const scaleOut = keyframes`
  to {
    opacity: 0;
    transform: scale(0);
  }
`;

export const Container = styled.div<{
  position: PositionType;
  size: ModalSize;
  dimensions: { width: number; height: number };
  isClosing: boolean;
  index: number;
}>`
  position: absolute;
  display: flex;
  flex-direction: column;

  width: ${({ size, dimensions }) =>
    size === "small" ? `${dimensions.width}px` : "100vw"};
  height: ${({ size, dimensions }) =>
    size === "small" ? `${dimensions.height}px` : "100vh"};
  left: ${({ position }) => (position ? position.x : 0)}px;
  top: ${({ position }) => (position ? position.y : 0)}px;

  z-index: ${({ index }) => 10 * (index + 1)};

  opacity: ${({ isClosing }) => (isClosing ? "1" : "0")};
  transform: ${({ isClosing }) => (isClosing ? "scale(1)" : "scale(0)")};
  animation: ${({ isClosing }) => (isClosing ? scaleOut : scaleIn)} 0.25s
    cubic-bezier(0.39, 0.575, 0.565, 1) both;

  ${({ theme }) => {
    if (theme.name === "pastel") {
      return `
        border-radius: 10px;
        border: 2px solid ${theme.pallet.textColor};
        box-shadow: 5px 5px 0px 2px rgba(0, 0, 0, 0.75);
      `;
    }

    if (theme.name === "code") {
      return `
        
      `;
    }
  }}
`;

export const Content = styled.div<{ title?: string }>`
  background-color: ${({ theme }) => theme.pallet.thirdColor};
  flex: 1;
  display: flex;
  overflow: hidden;

  ${({ theme, title }) => {
    if (theme.name === "pastel") {
      return `
        border-radius: 0 0 10px 10px;
        padding: 4px;
      `;
    }

    if (theme.name === "code") {
      const getAfterContent = (title?: string) =>
        `"${(title || "").replace(/"/g, '\\"')}"`;

      return `
        padding: 10px;

        &:after {
          content: ${getAfterContent(title)};
          background-color: ${theme.pallet.thirdColor};
          position: absolute;
          left: 25px;
          top: 0;
          padding: 0 5px;
        }
      `;
    }
  }}
`;

export const InnerWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: auto;

  border: 2px solid ${({ theme }) => theme.pallet.textColor};

  ${({ theme }) => {
    if (theme.name === "pastel") {
      return `
        background-color: var(--white-color);
        border-radius: 6px;
      `;
    }

    if (theme.name === "code") {
      return `
        padding: 10px;
      `;
    }
  }}
`;
