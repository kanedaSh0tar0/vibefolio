import styled from "styled-components";

export const IconContainer = styled.div<{
  $chosen?: boolean;
  $highlightColor?: string;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  position: relative;
  box-sizing: border-box;

  svg {
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    object-fit: contain;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 0.2rem;
    backdrop-filter: ${({ $chosen }) => ($chosen ? "blur(6px)" : "none")};
    background-color: ${({ $chosen }) =>
      $chosen ? "var(--white-color)" : "transparent"};
    opacity: 0.25;
    transition: all 0.2s ease;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    inset: -2px;
    border: ${({ $chosen, $highlightColor }) =>
      $chosen
        ? `0.15rem dashed ${$highlightColor || "var(--white-color)"}`
        : "none"};
    outline-offset: -4px;
    border-radius: 0.2rem;
    pointer-events: none;
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

export const IconText = styled.span<{
  color?: string;
  highlightColor?: string;
}>`
  position: relative;
  font-family: "Segoe UI", sans-serif;
  font-size: 0.6rem;
  color: ${({ color }) => color || "var(--white-color)"};
  text-align: center;
  padding: 0.2rem 0.4rem;
  border-radius: 0.2rem;
  user-select: none;
  margin: auto 0;
  display: inline-block;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: ${({ highlightColor }) => highlightColor || "black"};
    opacity: 0.4;
    pointer-events: none;
    z-index: -1;
    border-radius: 0.2rem;
  }
`;
