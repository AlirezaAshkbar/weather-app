import React from "react";
import { SingleWeatherData } from "../Props/weatherProps";

const SingleWeatherdetails = ({
  information,
  icon,
  value,
}: SingleWeatherData) => {
  return (
    <div className="flex  flex-col justify-between gap-2 items-center  font-semibold text-black/80">
      <p className="whitespace-nowrap">{information}</p>
      <div className="text-3xl">{icon}</div>
      <p>{value}</p>
    </div>
  );
};

export default SingleWeatherdetails;
