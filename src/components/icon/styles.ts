import styled from "styled-components";

export const IconContainer = styled.div<{
  chosen?: boolean;
  borderColor?: string;
}>`
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  position: relative;

  svg {
    min-width: 50px;
    min-height: 50px;
    min-width: 50px;
    min-height: 50px;
  }

  &::after {
    content: "";
    position: absolute;
    inset: -2px;
    border: ${({ chosen, borderColor }) =>
      chosen ? `2px dashed ${borderColor || "var(--white-color)"}` : "none"};
    pointer-events: none;
    border-radius: 4px;
  }
`;
