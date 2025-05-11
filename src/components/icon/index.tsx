import { SVGProps, useEffect, useRef, useState } from "react";
import IconText from "../icon-text";
import { IconContainer } from "./styles";

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
          setChosen(false);
        } else {
          setChosen(true);
        }
      }}
    >
      <SvgIcon width="100%" height="100%" />
      <IconText text={text} />
    </IconContainer>
  );
}

export default Icon;
