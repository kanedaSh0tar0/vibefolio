import { useState } from "react";
import { PanelButton } from "./styles";

function ModalButton({
  Icon,
  onClick,
}: {
  Icon: React.ReactNode;
  onClick: () => void;
}) {
  const [clicked, setClicked] = useState(false);

  return (
    <PanelButton
      className="cursor-pointer"
      clicked={clicked}
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={() => setClicked(true)}
      onPointerUp={() => setClicked(false)}
      onPointerOut={() => setClicked(false)}
      onClick={onClick}
    >
      {Icon}
    </PanelButton>
  );
}

export default ModalButton;
