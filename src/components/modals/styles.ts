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
  border: 2px solid ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.forthColor};
  padding: 4px;

  svg {
    transform: ${({ clicked }) => (clicked ? "scale(0.9)" : "scale(1)")};
    color: ${({ theme }) => theme.textColor};
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  width: 100%;
  padding: 0 10px;
  border-radius: 10px 10px 0 0;
  background-color: ${({ theme }) => theme.thirdColor};
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
  color: ${({ theme }) => theme.textColor};
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

  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.textColor};
  box-shadow: 5px 5px 0px 2px rgba(0, 0, 0, 0.75);

  left: ${({ position }) => (position ? position.x : 0)}px;
  top: ${({ position }) => (position ? position.y : 0)}px;

  opacity: ${({ isClosing }) => (isClosing ? "1" : "0")};
  transform: ${({ isClosing }) => (isClosing ? "scale(1)" : "scale(0)")};
  animation: ${({ isClosing }) => (isClosing ? scaleOut : scaleIn)} 0.25s
    cubic-bezier(0.39, 0.575, 0.565, 1) both;

  z-index: ${({ index }) => 10 * (index + 1)};
`;

export const Content = styled.div`
  background-color: ${({ theme }) => theme.thirdColor};
  padding: 4px;
  flex: 1;
  display: flex;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
`;

export const InnerWrapper = styled.div`
  width: 100%;
  border-radius: 6px;
  border: 2px solid ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.whiteColor};
  overflow: auto;
`;
