import styled from "styled-components";

export const IconContainer = styled.div<{ chosen?: boolean }>`
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border: ${(props) =>
      props.chosen ? `2px dashed ${props.theme.whiteColor}` : "none"};
    pointer-events: none;
    border-radius: 4px;
  }
`;
