import styled, { keyframes } from "styled-components";
import { PositionType } from "../../store/modalSlice";

export const Button = styled.button<{ clicked?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 0.1rem solid ${({ theme }) => theme.pallet.textColor};
  background-color: ${({ theme }) => theme.pallet.secondColor};
  padding: 0.2rem;

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
  width: 100%;
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem 0.3rem 0 0;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-center: center;
  gap: 0.25rem;
`;

export const Title = styled.span`
  font-family: "Segoe UI", sans-serif;
  font-size: 0.8rem;
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
  dimensions: { width: number; height: number };
  isClosing: boolean;
  index: number;
}>`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.pallet.thirdColor};

  width: ${({ dimensions }) => `${dimensions.width}px`};
  height: ${({ dimensions }) => `${dimensions.height}px`};
  left: ${({ position }) => (position ? position.x : 0)}px;
  top: ${({ position }) => (position ? position.y : 0)}px;

  z-index: ${({ index }) => 10 * (index + 1)};

  opacity: ${({ isClosing }) => (isClosing ? "1" : "0")};
  transform: ${({ isClosing }) => (isClosing ? "scale(1)" : "scale(0)")};
  animation: ${({ isClosing }) => (isClosing ? scaleOut : scaleIn)} 0.25s
    cubic-bezier(0.39, 0.575, 0.565, 1) both;

  border-radius: 0.3rem;
  border: 0.15rem solid ${({ theme }) => theme.pallet.textColor};
  box-shadow: 2.5px 2.5px 0px 2px rgba(0, 0, 0, 0.75);
`;

export const Content = styled.div<{ title?: string }>`
  background-color: ${({ theme }) => theme.pallet.thirdColor};
  flex: 1;
  display: flex;
  overflow: hidden;
  padding: 0.2rem;
  border-radius: 0 0 0.3rem 0.3rem;
`;

export const InnerWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border: 0.15rem solid ${({ theme }) => theme.pallet.textColor};
  background-color: var(--white-color);
  border-radius: 0.2rem;
`;

export const Panel = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 2rem;
  padding: 0 0.5rem;
  gap: 0.5rem;
`;

export const PanelButton = styled.button<{ clicked?: boolean }>`
  box-shadow: ${({ clicked }) =>
    clicked
      ? "inset 2px 2px 4px rgba(0, 0, 0, 0.6), inset -2px -2px 4px rgba(255, 255, 255, 0.2)"
      : "2px 2px 0px 1px rgba(0, 0, 0, 0.75)"};
  padding: 0.2rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.3rem;
  display: grid;
  place-items: center;

  svg {
    transform: ${({ clicked }) => (clicked ? "scale(0.9)" : "scale(1)")};
    color: ${({ theme }) => theme.pallet.textColor};
  }
`;
