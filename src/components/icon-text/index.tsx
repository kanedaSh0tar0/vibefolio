import styled from "styled-components";

type TextSize = "small" | "medium";

const Text = styled.span<{ color?: string; textSize?: number }>`
  font-family: "Segoe UI", sans-serif;
  font-size: ${({ textSize }) => `${textSize}px`};
  color: ${({ theme, color }) => (color ? color : theme.whiteColor)};
  text-align: center;
  text-shadow: ${({ color }) =>
    color ? "none" : "1px 1px 2px rgba(0, 0, 0, 0.7)"};
  user-select: none;
`;

function IconText({
  text,
  color,
  size,
}: {
  text: string;
  color?: string;
  size?: TextSize;
}) {
  let textSize;

  switch (size) {
    case "small":
      textSize = 12;
      break;
    case "medium":
      textSize = 18;
      break;
    default:
      textSize = 12;
      break;
  }

  return (
    <Text color={color} textSize={textSize}>
      {text}
    </Text>
  );
}

export default IconText;
