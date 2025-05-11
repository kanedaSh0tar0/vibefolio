import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  padding: 0 10px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.thirdColor};

  font-weight: 600;
`;

export const ClockContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    transition: linear 0.3s;
  }

  &:hover {
    svg {
      fill: ${({ theme }) => theme.secondColor};
    }
  }
`;
