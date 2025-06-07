import styled from "styled-components";
import { ThemeType } from "../../store/themeSlice";

export const Container = styled.header<{ themeName: ThemeType }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 10px;

  font-size: 18px;
  font-weight: 800;

  svg {
    fill: ${({ theme }) => theme.pallet.textColor};
  }

  ${({ themeName, theme }) => {
    if (themeName === "pastel") {
      return `
        margin: 10px 20px;
        border: 2px solid ${theme.pallet.textColor};
        border-radius: 10px;
        background-color: ${theme.pallet.thirdColor};
      `;
    }

    if (themeName === "code") {
      return `
        background-color: ${theme.pallet.thirdColor};
      `;
    }
  }}
`;

export const ClockContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SocialContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
