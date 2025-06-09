import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
  padding: 1rem;
  font-weight: 800;

  margin: 1rem 2rem 0.5rem;
  border: 0.15rem solid ${({ theme }) => theme.pallet.textColor};
  border-radius: 10px;
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
