import { useState } from "react";
import styled from "styled-components";

const Button = styled.button<{ clicked?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.forthColor};

  svg {
    transform: ${({ clicked }) => (clicked ? "scale(0.9)" : "scale(1)")};
    color: ${({ theme }) => theme.textColor};
  }
`;

function HeaderButton({ Icon, onClick }: { Icon: React.ComponentType, onClick?: () => void }) {
  const [clicked, setClicked] = useState(false);

  return (
    <Button
      clicked={clicked}
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