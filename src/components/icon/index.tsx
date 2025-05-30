import { SVGProps, useEffect, useRef, useState } from "react";
import IconText from "../icon-text";
import { IconContainer } from "./styles";

function Icon({
  SvgIcon,
  text,
  onClick,
  textColor,
}: {
  SvgIcon: React.FC<SVGProps<SVGSVGElement>>;
  text: string;
  onClick: () => void;
  textColor?: string;
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
      borderColor={textColor}
      onClick={() => {
        if (chosen) {
          onClick();
          setChosen(false);
        } else {
          setChosen(true);
        }
      }}
    >
      <SvgIcon width="100%" height="100%" />
      <IconText color={textColor} text={text} />
    </IconContainer>
  );
}

export default Icon;
