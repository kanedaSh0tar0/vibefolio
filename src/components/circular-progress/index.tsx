import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

const size = 50;
const strokeWidth = 4;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

const Container = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
`;

const CircleWrapper = styled.svg<{ width: number; height: number }>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
`;

const InnerCircle = styled.div`
  position: absolute;
  top: ${strokeWidth}px;
  left: ${strokeWidth}px;
  width: ${size - strokeWidth * 2}px;
  height: ${size - strokeWidth * 2}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;

  svg {
    width: 25px;
    height: 25px;
  }
`;

type CircularProgressIconProps = {
  progress: number;
  // Icon?: React.FC<SVGProps<SVGSVGElement>>;
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
          stroke={theme.secondColor}
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
      {/* <InnerCircle>{Icon && <Icon width={25} height={25} />}</InnerCircle> */}
      <InnerCircle>{Icon}</InnerCircle>
    </Container>
  );
};
