import { SVGProps, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const IconContainer = styled.div<{ chosen?: boolean }>`
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 5px 5px;

  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border: ${(props) => (props.chosen ? "2px dashed white" : "none")};
    pointer-events: none;
    border-radius: 4px;
  }

  .svg {
    width: 100%;
    height: 100%;
    padding: 10px;
  }

  span {
    font-family: "Segoe UI", sans-serif;
    font-size: 12px;
    color: white;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    user-select: none;
  }
`;

function Icon({
  SvgIcon,
  text,
  onClick,
}: {
  SvgIcon: React.FC<SVGProps<SVGSVGElement>>;
  text: string;
  onClick: () => void;
}) {
  const [chosen, setChosen] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (iconRef.current && !iconRef.current.contains(e.target as Node)) {
        setChosen(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <IconContainer
      ref={iconRef}
      className="cursor-pointer"
      chosen={chosen}
      onClick={() => {
        if (chosen) {
          onClick();
          console.log("clicked", text);
          
          setChosen(false);
        } else {
          setChosen(true);
        }
      }}
    >
      <div className="svg">
        <SvgIcon width="100%" height="100%" />
      </div>
      <span>{text}</span>
    </IconContainer>
  );
}

export default Icon;
