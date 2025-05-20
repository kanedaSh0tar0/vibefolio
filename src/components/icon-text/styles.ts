import styled from "styled-components";

export const Text = styled.span<{ color?: string; textSize?: number }>`
  font-family: "Segoe UI", sans-serif;
  font-size: ${({ textSize }) => `${textSize}px`};
  color: var(--white-color);
  text-align: center;
  text-shadow: ${({ color }) =>
    color ? "none" : "1px 1px 2px rgba(0, 0, 0, 0.7)"};
  user-select: none;
`;
