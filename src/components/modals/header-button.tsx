import { useState } from "react";
import { Button } from "./styles";

function HeaderButton({
  Icon,
  onClick,
}: {
  Icon: React.ComponentType;
  onClick?: () => void;
}) {
  const [clicked, setClicked] = useState(false);

  return (
    <Button
      clicked={clicked}
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={() => setClicked(true)}
      onPointerUp={() => setClicked(false)}
      onPointerOut={() => setClicked(false)}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Icon />
    </Button>
  );
}

export default HeaderButton;
