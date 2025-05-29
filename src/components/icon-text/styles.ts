import styled from "styled-components";

export const Text = styled.span<{ color?: string; textSize?: number }>`
  font-family: "Segoe UI", sans-serif;
  font-size: ${({ textSize }) => `${textSize}px`};
  color: ${({ color }) => color || "var(--white-color)"};
  text-align: center;
  user-select: none;
`;
