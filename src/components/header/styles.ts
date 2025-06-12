import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
  padding: 1rem;
  font-weight: 800;

  border: 0.15rem solid ${({ theme }) => theme.pallet.textColor};
  border-radius: 0.3rem;
  background-color: ${({ theme }) => theme.pallet.thirdColor};

  svg {
    fill: ${({ theme }) => theme.pallet.textColor};
  }
`;

export const ClockContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

export const SocialContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 1rem 2rem 0.5rem;
`;

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ControlButton = styled.button<{ isOpen: boolean }>`
  position: relative;
  width: clamp(2rem, 1vw, 3rem);
  height: clamp(2rem, 1vw, 3rem);
  z-index: ${({ isOpen }) => (isOpen ? 100 : 1)};
`;

export const SettingsButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.1rem;
  border: 0.15rem solid ${({ theme }) => theme.pallet.textColor};
  border-radius: 0.3rem;
  background-color: ${({ theme }) => theme.pallet.thirdColor};
  z-index: 2;
`;

export const RadialButton = styled.button<{
  x: number;
  y: number;
  visible: boolean;
  index: number;
}>`
  position: absolute;
  inset: 0.35rem;
  transform: ${({ visible, x, y }) =>
    visible ? `translate(${x}rem, ${y}rem)` : "translate(0, 0)"};
  transition: transform 0.4s ease ${({ index }) => index * 0.05}s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.15rem;
  border: 0.15rem solid ${({ theme }) => theme.pallet.textColor};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.pallet.thirdColor};
  z-index: 1;
`;
