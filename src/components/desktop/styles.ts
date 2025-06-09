import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const IconsContainer = styled.div<{ flow?: "row" | "column" }>`
  display: grid;
  gap: 0.5rem;
  padding: 0.5rem;
  height: 100%;
  width: 100%;

  grid-auto-flow: ${({ flow }) => flow || "column"};
  justify-content: start;

  grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(6rem, 1fr));
  align-items: start;
`;
