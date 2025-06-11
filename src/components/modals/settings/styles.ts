import styled from "styled-components";

export const ColorsGrid = styled.div`
  display: grid;
  gap: 0.5rem;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

export const CoolorTile = styled.div<{ tileColor: string }>`
  width: 1fr;
  height: 1fr;
  border-radius: 0.3rem;
  background-color: ${({ tileColor }) => tileColor};
  border: 0.15rem solid ${({ theme }) => theme.pallet.textColor};
`;
