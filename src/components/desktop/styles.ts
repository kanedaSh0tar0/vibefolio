import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const IconsContainer = styled.div<{ flow?: "row" | "column" }>`
  display: grid;
  gap: 20px;
  padding: 20px;
  height: 100%;

  grid-auto-flow: ${({ flow }) => flow || "column"};

  ${({ flow }) =>
    flow === "row"
      ? `
    grid-template-columns: repeat(auto-fill, 80px);
    grid-template-rows: repeat(auto-fill, 120px);
  `
      : `
    grid-template-columns: repeat(auto-fill, 120px);
    grid-template-rows: repeat(auto-fill, 80px);
  `}
`;
