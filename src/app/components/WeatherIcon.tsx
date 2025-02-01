import Image from "next/image";
import React from "react";
import { cn } from "../utils/cn";

const WeatherIcon = ({
  iconName,
  ...props // ✅ Spread remaining props after destructuring `iconName`
}: React.HTMLProps<HTMLDivElement> & { iconName: string }) => {
  return (
    <div {...props} className={cn("relative h-20 w-20")}>
      <Image
        src={`https://openweathermap.org/img/wn/${iconName}@4x.png`.trim()}
        width={100}
        height={100}
        alt="weather-icon"
        className="absolute h-full w-full"
      />
    </div>
  );
};

export default WeatherIcon;
