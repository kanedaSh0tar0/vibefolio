import { SVGProps, useEffect, useRef, useState } from "react";
import { IconContainer, IconText } from "./styles";

function Icon({
  SvgIcon,
  text,
  onClick,
  textColor,
  highlightColor,
}: {
  SvgIcon: React.FC<SVGProps<SVGSVGElement>>;
  text: string;
  onClick: () => void;
  textColor?: string;
  highlightColor?: string;
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
      $chosen={chosen}
      highlightColor={highlightColor}
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
      <IconText color={textColor}>{text}</IconText>
    </IconContainer>
  );
}

export default Icon;
