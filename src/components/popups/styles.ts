import styled, { css, keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`;

export const PopupManagerContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 0 10px 10px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-end;
  z-index: 1000;
  pointer-events: none;
`;

export const ToastWrapper = styled.div<{ isVisible: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.pallet.textColor};
  background-color: ${({ theme }) => theme.pallet.thirdColor};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  width: 250px;
  min-height: 80px;
  pointer-events: auto;
  transition: transform 0.3s ease;

  animation: ${({ isVisible }) =>
    isVisible
      ? css`
          ${slideIn} 0.4s ease-out forwards
        `
      : css`
          ${slideOut} 0.4s ease-in forwards
        `};
`;

export const MarkContainer = styled.div`
  min-width: 25px;
  min-height: 25px;
  max-width: 25px;
  max-height: 25px;
`;

export const ToastContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.span`
  font-weight: 900;
`;

export const Description = styled.span`
  font-size: 12px;
  white-space: pre-line;
`;
