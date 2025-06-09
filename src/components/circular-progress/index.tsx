import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { CircleWrapper, Container, InnerCircle } from "./styles";

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
    let start: number | null = null;
    const duration = 1500;

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

  const size = 100;
  const strokeWidth = size * 0.06;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - animatedProgress / 100);

  return (
    <Container>
      <CircleWrapper viewBox={`0 0 ${size} ${size}`}>
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
            transition: "stroke-dashoffset 0.3s linear",
          }}
        />
      </CircleWrapper>

      <InnerCircle strokeWidth={strokeWidth}>{Icon}</InnerCircle>
    </Container>
  );
};
