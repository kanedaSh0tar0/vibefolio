import { useEffect, useState } from "react";
import { ClockContainer } from "./styles";

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState("");

  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const formattedHours = (+hours % 12 || 12).toString().padStart(2, "0");
  const ampm = +hours >= 12 ? "PM" : "AM";

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
    };
    setCurrentDate(currentTime.toLocaleDateString("en-US", options));
  }, [currentTime]);

  return (
    <ClockContainer>
      <div>{currentDate}</div>
      <div>{`${formattedHours}:${minutes} ${ampm}`}</div>
    </ClockContainer>
  );
}

export default Clock;
