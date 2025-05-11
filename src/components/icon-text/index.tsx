import { Text } from "./styles";

type TextSize = "small" | "medium";

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
