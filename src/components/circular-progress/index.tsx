import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { CircleWrapper, Container, InnerCircle } from "./styles";

const size = 50;
const strokeWidth = 4;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

type CircularProgressIconProps = {
  progress: number;
  Icon?: React.ReactNode;
};

export const CircularProgressIcon: React.FC<CircularProgressIconProps> = ({
  progress,
  Icon,
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    setAnimatedProgress(progress);

    let start: number | null = null;
    const duration = 1000;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const nextProgress = Math.min(progress, (elapsed / duration) * progress);
      setAnimatedProgress(nextProgress);
      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        setAnimatedProgress(progress);
      }
    };

    requestAnimationFrame(step);
  }, [progress]);

  const offset = circumference * (1 - animatedProgress / 100);

  return (
    <Container>
      <CircleWrapper width={size} height={size}>
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={theme.pallet.secondColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={-offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: "linear 0.3s ease",
          }}
        />
      </CircleWrapper>

      <InnerCircle strokeWidth={strokeWidth} size={size}>
        {Icon}
      </InnerCircle>
    </Container>
  );
};
